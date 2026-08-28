import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("akdeniz-ev-tasima")!;
const city = business.primaryCity;

/**
 * Arama amacı: "akdeniz'de ev taşıma", "akdeniz ilçesi nakliye",
 * "çankaya taşınma mersin", "mersin merkez ev taşıma".
 *
 * Ticari "akdeniz nakliyat" /hizmet-bolgeleri. Bu yazı HOW.
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
        Akdeniz, {city} merkezin eski çekirdeği: liman, çarşı, resmi daire,
        dar cadde. Burada işi uzatan şey yokuştan çok{" "}
        <strong>park yasağı, tek yön ve dar merdiven</strong>. Ev ile dükkan /
        ofis aynı sokakta karışır. Ticari ilçe kaydı{" "}
        <Link href="/hizmet-bolgeleri">{city} hizmet bölgeleri</Link>; bu yazı
        merkezde taşınmanın pratik tarafı.
      </p>

      <h2>Merkez caddeleri: park ve yükleme</h2>
      <p>
        Uray, Atatürk Caddesi ve çarşı çevresinde kamyon durmak çoğu saatte
        yasak veya fiilen imkânsızdır. Belediye yükleme dilimi varsa ona uyulur;
        yoksa ekip eşyayı cadde köşesinden içeri taşır. Bu, Toroslar&apos;daki
        yokuştan farklı bir işçiliktir: mesafe kısa, dur-kalk çok.
      </p>
      <ul>
        <li>Taşıma saatini mümkünse sabah erken veya pazar sakinliğine alın.</li>
        <li>Kapıcı / esnaf ile 20 dakikalık durak yeri konuşun.</li>
        <li>
          Trafik polisinin sık geçtiği hatlarda &ldquo;biraz bekleriz&rdquo;
          planı tutmaz; ikinci tur gerekir.
        </li>
      </ul>

      <h2>Eski bina: Çankaya, İhsaniye, Kültür</h2>
      <p>
        Bu mahallelerde asansör yok veya asansör insanlık içindir, koltuk
        sığmaz. Merdiven boşluğu dar, kapı kasası alçak. Söküm baştan
        konuşulmazsa mobilya kapıda kalır. Plan{" "}
        <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
          asansörsüz ev nasıl taşınır
        </Link>{" "}
        yazısıyla aynıdır; merkeze eklenen, sokağın kamyona kapalı olmasıdır.
      </p>

      <h2>Ev değil, işyeri de taşınıyor</h2>
      <p>
        Akdeniz&apos;de aynı gün hem daire hem ofis / dükkan çıkışı görülür.
        Tabela, vitrin camı, kasa ve arşiv ev eşyası değildir. Mesai kesintisi
        ve etiketleme{" "}
        <Link href="/rehber/ofis-tasirken-nelere-dikkat">
          ofis taşırken nelere dikkat edilmeli
        </Link>{" "}
        listesinde. Hizmet sayfası{" "}
        <Link href="/ofis-tasima">{city} ofis taşıma</Link>.
      </p>

      <h2>Parça eşya ve birkaç koli</h2>
      <p>
        Merkezde öğrenci evi az, &ldquo;buzdolabı + çamaşır makinesi&rdquo; ve
        dükkan vitrin taşıması daha sık. Kısa liste{" "}
        <Link href="/parca-esya-tasima">{city} parça eşya taşıma</Link>; tam ev{" "}
        <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>.
        Cihazlar{" "}
        <Link href="/rehber/beyaz-esya-nasil-tasinir">
          beyaz eşya nasıl taşınır
        </Link>
        .
      </p>

      <h2>Komşu ilçeler</h2>
      <p>
        Akdeniz–Yenişehir kısa mesafedir ama GMK tıkanır —{" "}
        <Link href="/rehber/yenisehir-ev-tasima">
          Yenişehir&apos;de ev taşırken
        </Link>
        . Kuzeye çıkınca eğim başlar —{" "}
        <Link href="/rehber/toroslar-ev-tasima">Toroslar rehberi</Link>. Sahil
        siteleri başka bir dünya —{" "}
        <Link href="/rehber/mezitli-ev-tasima">Mezitli rehberi</Link>.
      </p>

      <h2>Teklifte netleşmesi gerekenler</h2>
      <ol>
        <li>Cadde mi ara sokak mı; yükleme yasağı var mı</li>
        <li>Kat, asansör, merdiven genişliği</li>
        <li>Ev mi, ofis/dükkan mı, ikisi mi</li>
        <li>Tarih ve tercih edilen saat aralığı</li>
      </ol>
      <p>
        Adresin merkezde olduğunu baştan söylemek, &ldquo;kapının önüne
        yanaşırız&rdquo; varsayımını bozar ve günü gerçekçi kurar.
      </p>
    </GuideShell>
  );
}
