import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("toroslar-ev-tasima")!;
const city = business.primaryCity;

/**
 * Arama amacı: "toroslar'da ev taşıma", "toroslar evden eve",
 * "çağlayan taşınma", "arpaçsuyu nakliye".
 *
 * Ticari "toroslar nakliyat" /hizmet-bolgeleri. Bu yazı HOW.
 */
export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: absoluteUrl(`/rehber/${guide.slug}`) },
  openGraph: {
    title: guide.title,
    description: guide.description,
    url: absoluteUrl(`/rehber/${guide.slug}`),
    type: "article",
  },
};

export default function Page() {
  return (
    <GuideShell guide={guide}>
      <p>
        Toroslar, {city} merkezin kuzeyindeki eğimli ilçe. Burada taşımayı
        uzatan şey kilometre değil,{" "}
        <strong>yokuş, dar dönüş ve asansörsüz kat</strong>. Sahil sitelerindeki
        rampa sorunu yerine kamyonun sokağa girememesi gelir. Ticari ilçe kaydı{" "}
        <Link href="/hizmet-bolgeleri">{city} hizmet bölgeleri</Link> sayfasında;
        bu yazı plan notu.
      </p>

      <h2>Eğim neden her şeyi değiştirir?</h2>
      <p>
        Çağlayan, Arpaçsuyu, Korukent ve benzeri mahallelerde sokak hem dar hem
        meyilli. Kamyon köşeyi dönemezse eşya elde, yokuş yukarı yürür. Bu,
        düz Yenişehir caddesindeki &ldquo;40 metre yürüme&rdquo;den ağırdır:
        süre ve ekip artar. Fiyatın neden değiştiğini{" "}
        <Link href="/rehber/nakliyat-fiyati-nasil-hesaplanir">
          nakliyat fiyatı neye göre belirlenir
        </Link>{" "}
        anlatır; burada etken yokuşun kendisidir.
      </p>
      <ul>
        <li>Sokak genişliği ve dönüşü fotoğrafla iletmek işe yarar.</li>
        <li>
          Yağmurda ıslak eğim kayar. Ağır parça için kuru bir sabah seçmek
          teslimi kolaylaştırır.
        </li>
        <li>
          Üst kat asansörsüzse merdiven + yokuş üst üste biner. Ayrıntı{" "}
          <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
            asansörsüz ev nasıl taşınır
          </Link>
          .
        </li>
      </ul>

      <h2>Bina stoğu: eski mahalle ve TOKİ</h2>
      <p>
        Eski dokuda 3–5 kat, dar merdiven, küçük kapı kasası yaygındır. Gardırop
        ve köşe koltuk ölçüsü baştan alınmazsa taşınma günü söküm sürprizi olur.
        Daha yeni TOKİ / toplu konut bloklarında asansör vardır; yine de kabin
        ölçüleri mobilyaya yetmeyebilir.
      </p>

      <h2>Kış ve yaz farkı</h2>
      <p>
        Toroslar sahilden serin ve kışın daha yağışlıdır. Islak merdiven + ıslak
        yokuş, karton koli dibini çökertir. Koli seçimi{" "}
        <Link href="/rehber/esyalar-nasil-paketlenir">
          eşyalar nasıl paketlenir
        </Link>{" "}
        yazısındaki &ldquo;ağır eşya küçük koli&rdquo; kuralına daha sıkı
        uyulmalı. Yazın eğim durur ama park yeri yine dardır.
      </p>

      <h2>Merkez ve sahille karşılaştırma</h2>
      <p>
        Akdeniz ilçesindeki sorun park yasağı ve eski merkez merdivenidir —{" "}
        <Link href="/rehber/akdeniz-ev-tasima">Akdeniz rehberi</Link>. Mezitli
        sahil sitelerinde bariyer ve yazlık yığılması öne çıkar —{" "}
        <Link href="/rehber/mezitli-ev-tasima">Mezitli rehberi</Link>.
        Yenişehir&apos;de GMK ve site saati —{" "}
        <Link href="/rehber/yenisehir-ev-tasima">Yenişehir rehberi</Link>.
        Toroslar&apos;da asıl cümle: araç sokağa giriyor mu?
      </p>

      <h2>Gün planı</h2>
      <ul>
        <li>Yüklemeyi mümkünse sabah, yokuş kuruyken başlatın.</li>
        <li>Komşuya haber: dar sokakta kamyon trafiği kilitler.</li>
        <li>
          Beyaz eşya merdiven + eğimde iki kişilik iştir; tek kişi planlamayın.
          Cihaz adımları{" "}
          <Link href="/rehber/beyaz-esya-nasil-tasinir">
            beyaz eşya nasıl taşınır
          </Link>
          .
        </li>
      </ul>
      <p>
        Süreç ve teklif{" "}
        <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>{" "}
        sayfasında. Çıkış sokağının eğimli olduğunu baştan söylemek, günü
        kurtarır.
      </p>
    </GuideShell>
  );
}
