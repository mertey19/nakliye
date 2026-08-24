import fs from "node:fs";
import path from "node:path";

import { photos, heroPhoto, type Photo } from "@/config/photos";
import { readImageSize } from "./image-size";

/**
 * GÖRSEL ÇÖZÜMLEME — yalnızca SUNUCU tarafı.
 * ==========================================
 * config/photos.ts "hangi görseller olmalı" listesidir. Burada:
 *   1. dosya `public/` altında GERÇEKTEN var mı diye bakılır,
 *   2. en/boy ölçüsü dosyanın kendi başlığından okunur.
 *
 * Sonuç:
 *   - Dosya yoksa görsel hiç render edilmez → kırık görsel yayınlanmaz.
 *   - Ölçü koda elle yazılmadığı için fotoğraf değişince CLS riski doğmaz.
 *   - İşletme sahibi için "dosyayı klasöre bırak" yeterli olur.
 *
 * Kontrol derleme sırasında bir kez yapılır (tüm sayfalar statik üretiliyor),
 * çalışma zamanı maliyeti yoktur.
 *
 * DİKKAT: `node:fs` kullanır; istemci bileşenlerinden import EDİLMEZ.
 * (config/photos.ts saf veridir ve istemciden güvenle import edilebilir.)
 */

export type ResolvedPhoto = Photo & { width: number; height: number };

function resolve(photo: Photo): ResolvedPhoto | null {
  // Yol gezinme koruması: yalnızca public/ altındaki dosyalar kabul edilir.
  const publicDir = path.join(process.cwd(), "public");
  const target = path.join(publicDir, photo.src.replace(/^\/+/, ""));
  if (!target.startsWith(publicDir)) return null;

  let buf: Buffer;
  try {
    if (!fs.statSync(target).isFile()) return null;
    // Ölçü başlıkta; tüm dosyayı okumaya gerek yok.
    const fd = fs.openSync(target, "r");
    buf = Buffer.alloc(65536);
    const read = fs.readSync(fd, buf, 0, 65536, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, read);
  } catch {
    return null;
  }

  const size = readImageSize(buf);
  if (!size) return null;

  return { ...photo, width: size.width, height: size.height };
}

const resolvedGallery = photos.map(resolve);

/** Galeride gösterilecek, dosyası mevcut ve ölçüsü okunabilen görseller. */
export const availablePhotos: ResolvedPhoto[] = resolvedGallery.filter(
  (p): p is ResolvedPhoto => p !== null,
);

/** Hero görseli — dosya yoksa null; hero marka plakasına düşer. */
export const availableHeroPhoto: ResolvedPhoto | null = heroPhoto
  ? resolve(heroPhoto)
  : null;

/**
 * Listede olup dosyası bulunamayan (veya okunamayan) görseller.
 * DevChecklist bunları geliştirme ortamında listeler.
 */
export const missingPhotoFiles: string[] = [
  ...photos.filter((_, i) => resolvedGallery[i] === null).map((p) => p.src),
  ...(heroPhoto && !availableHeroPhoto ? [heroPhoto.src] : []),
];
