import Image from "next/image";
import { availablePhotos } from "@/lib/photos.server";

/**
 * "İşlerimizden" — SADECE firmaya ait gerçek fotoğraflar.
 *
 * Dosyası mevcut görsel yoksa bölüm hiç render edilmez; stok fotoğraf
 * kullanılmaz. Ölçüler dosyadan okunduğu için dikey/yatay fark etmeksizin
 * görsel kırpılmadan, CLS üretmeden yerleşir.
 */
export function Gallery({ title = "İşlerimizden" }: { title?: string }) {
  if (availablePhotos.length === 0) return null;

  return (
    <section aria-labelledby="galeri-baslik">
      <p className="eyebrow text-ink-500">Gerçek işlerimiz</p>
      <h2
        id="galeri-baslik"
        className="headline mt-4 text-[28px] text-ink-900 sm:text-[34px]"
      >
        {title}
      </h2>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availablePhotos.map((p) => (
          <li key={p.src}>
            <figure className="photo-zoom overflow-hidden rounded-card border border-line-soft bg-white">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="photo h-auto w-full"
              />
              {p.caption && (
                <figcaption className="px-5 py-4 text-[14px] text-ink-500">
                  {p.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
