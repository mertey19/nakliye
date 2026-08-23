import Image from "next/image";
import { photos } from "@/config/photos";

/**
 * "İşlerimizden" — SADECE firmaya ait gerçek fotoğraflar.
 * config/photos.ts boşsa bölüm hiç render edilmez; stok fotoğraf kullanılmaz.
 * Görseller lazy yüklenir ve width/height verildiği için CLS üretmez.
 */
export function Gallery({ title = "İşlerimizden" }: { title?: string }) {
  if (photos.length === 0) return null;

  return (
    <section className="mt-14" aria-labelledby="galeri-baslik">
      <h2 id="galeri-baslik" className="text-2xl font-extrabold text-ink-900">
        {title}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => (
          <li key={p.src} className="overflow-hidden rounded-card border border-line bg-white">
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
            {p.caption && (
              <p className="px-4 py-3 text-sm text-ink-500">{p.caption}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
