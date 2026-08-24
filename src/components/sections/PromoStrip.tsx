import Image from "next/image";
import { availablePromoPhotos } from "@/lib/photos.server";

/**
 * TANITIM GÖRSELLERİ ŞERİDİ
 * =========================
 * Firmanın kendi pazarlama grafikleri. "İşlerimizden" galerisinden BİLİNÇLİ
 * olarak ayrıdır ve ayrı başlık taşır: bunlar tamamlanmış iş fotoğrafı değil,
 * tanıtım görselidir. Başlık ve alt açıklama bunu açıkça söyler.
 *
 * Görseller sayfanın altında ve `loading="lazy"` ile yüklenir; LCP'yi
 * etkilemezler. Ölçüler dosyadan okunduğu için CLS oluşmaz.
 */
export function PromoStrip() {
  if (availablePromoPhotos.length === 0) return null;

  return (
    <section aria-labelledby="tanitim-baslik">
      <p className="eyebrow text-ink-500">Marka</p>
      <h2
        id="tanitim-baslik"
        className="headline mt-4 text-[28px] text-ink-900 sm:text-[34px]"
      >
        Tanıtım Görsellerimiz
      </h2>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-700">
        Sosyal medyada ve araç kaplamamızda kullandığımız marka görselleri.
        Tamamladığımız taşımalara ait fotoğraflar{" "}
        <span className="font-semibold text-ink-900">İşlerimizden</span>{" "}
        bölümünde yer alıyor.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availablePromoPhotos.map((p) => (
          <li key={p.src}>
            <figure className="overflow-hidden rounded-card border border-line-soft bg-white">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="h-auto w-full"
              />
              {p.caption && (
                <figcaption className="border-t border-line-soft px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-500">
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
