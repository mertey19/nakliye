/**
 * GÖRSEL ÖLÇÜSÜ OKUYUCU (WebP / PNG / JPEG)
 * =========================================
 * Yalnızca dosya başlığını okur; görseli çözmez, bağımlılık gerektirmez.
 *
 * Neden var: `next/image` düzen kaymasını (CLS) önlemek için en/boy oranını
 * önceden bilmek zorunda. Ölçüyü koda elle yazmak, ileride fotoğraf değişince
 * unutulup sessiz CLS'e yol açar. Ölçü dosyanın kendisinden okunursa
 * işletme sahibi klasöre dosya bırakmakla yetinir.
 *
 * Derleme sırasında bir kez çalışır (tüm sayfalar statik üretiliyor).
 */

export type ImageSize = { width: number; height: number };

/** Başlık okunamazsa null döner; çağıran tarafta görsel gösterilmez. */
export function readImageSize(buf: Buffer): ImageSize | null {
  return readPng(buf) ?? readWebp(buf) ?? readJpeg(buf);
}

/* --- PNG: IHDR her zaman ilk chunk'tır --- */
function readPng(buf: Buffer): ImageSize | null {
  if (buf.length < 24) return null;
  const isPng =
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (!isPng) return null;
  if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/* --- WebP: RIFF konteyneri, üç varyant (VP8 / VP8L / VP8X) --- */
function readWebp(buf: Buffer): ImageSize | null {
  if (buf.length < 30) return null;
  if (buf.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buf.toString("ascii", 8, 12) !== "WEBP") return null;

  const chunk = buf.toString("ascii", 12, 16);

  if (chunk === "VP8 ") {
    // Kayıplı: 3 bayt frame tag + 3 bayt sync kodu, ardından 14'er bit ölçü.
    if (buf.length < 30) return null;
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === "VP8L") {
    // Kayıpsız: 1 imza baytı + 14 bit (genişlik-1) + 14 bit (yükseklik-1)
    if (buf.length < 25) return null;
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (chunk === "VP8X") {
    // Genişletilmiş: 24'ten itibaren 3'er bayt (tuval genişliği-1, yüksekliği-1)
    if (buf.length < 30) return null;
    const w = buf[24] | (buf[25] << 8) | (buf[26] << 16);
    const h = buf[27] | (buf[28] << 8) | (buf[29] << 16);
    return { width: w + 1, height: h + 1 };
  }

  return null;
}

/* --- JPEG: SOF0..SOFF işaretçileri taranır --- */
function readJpeg(buf: Buffer): ImageSize | null {
  if (buf.length < 4) return null;
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];

    // SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15 ölçü taşır.
    const isSof =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 && // DHT
      marker !== 0xc8 && // JPG
      marker !== 0xcc; // DAC
    if (isSof) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }

    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }
  return null;
}
