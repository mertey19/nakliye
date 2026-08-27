import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("beyaz-esya-nasil-tasinir")!;
const city = business.primaryCity;

/**
 * Arama amacı: "beyaz eşya nasıl taşınır", "buzdolabı nasıl taşınır",
 * "çamaşır makinesi nasıl taşınır", "televizyon taşıma".
 *
 * Oda oda koli rehberinden ayrı: cihaz bazlı hazırlık. Ticari sayfa
 * /parca-esya-tasima.
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
        Beyaz eşya, koli gibi istiflenmez. Ağırdır, su tutar, kapı ve asansör
        ölçüsüne takılır. Taşımadan bir gün önce yapılmayan üç iş —{" "}
        <strong>suyu boşaltmak, buzu çözmek, tamburu sabitlemek</strong> —
        hem cihazı hem merdiveni riske atar.
      </p>

      <h2>Taşımadan önce ortak hazırlık</h2>
      <ul>
        <li>Fişi çekin; arkadaki kabloyu toplayıp bantlayın.</li>
        <li>
          Kapı ve asansör net ölçüsünü alın. Cihazın eni × derinliği, kapı
          kasasından büyükse söküm veya merdiven planı gerekir.
        </li>
        <li>
          Cihazı kendiniz taşıyacaksanız bile iki kişi planlayın. Tek kişiyle
          buzdolabı indirmek hem bele hem cihaza zarar verir.
        </li>
      </ul>
      <p>
        Sadece birkaç parça gidecekse tam ev paketi gerekmez;{" "}
        <Link href="/parca-esya-tasima">{city} parça eşya taşıma</Link> bu iş
        için. Koli ve oda paketlemesi ayrı konudur:{" "}
        <Link href="/rehber/esyalar-nasil-paketlenir">
          eşyalar nasıl paketlenir
        </Link>
        .
      </p>

      <h2>Buzdolabı nasıl taşınır?</h2>
      <ul>
        <li>
          Nakliyeden <strong>en az 12 saat önce</strong> fişi çekin, buzu
          çözdürün, içini boşaltın. Islak dolap araca binmez.
        </li>
        <li>
          Rafları ve cam kapağı çıkarıp ayrı paketleyin ya da içeride
          havluyla sabitleyin.
        </li>
        <li>
          Kapıyı koli bandı veya streçle kapatın; yolda açılmasın.
        </li>
        <li>
          Mümkünse dik taşınır. Yatık taşındıysa varışta çalıştırmadan önce
          bekletmek gerekir — kompresör yağı yer değiştirmiş olabilir. Süre
          cihaz tipine göre değişir; üretici kılavuzu esas alınır.
        </li>
      </ul>

      <h2>Çamaşır makinesi</h2>
      <ul>
        <li>Su girişini kapatın, hortumları sökün, kazanı boşaltın.</li>
        <li>
          Varsa <strong>nakliye (transit) cıvatalarını</strong> takın. Bu
          cıvatalar tamburu kilitler; takılmazsa yolda tambur kasayı döver.
        </li>
        <li>
          Cıvataları kaybettiyseniz bunu firmaya söyleyin; alternatif sabitleme
          konuşulur. &ldquo;Olduğu gibi götürelim&rdquo; ucuzuna gelmez.
        </li>
      </ul>

      <h2>Bulaşık makinesi ve fırın</h2>
      <ul>
        <li>Su bağlantısı sökülür, içi kurulanır, kapak sabitlenir.</li>
        <li>
          Ankastre fırın/ocak çoğu zaman dolaptan çıkar. Bunu taşınma günü
          keşfetmek süreyi uzatır; önceden söyleyin.
        </li>
      </ul>

      <h2>Televizyon ve büyük ekran</h2>
      <ul>
        <li>Orijinal kutu varsa kullanın. Yoksa ekranı dik, yastıklı ve sabit taşıyın.</li>
        <li>Ekranın üzerine başka eşya konmaz.</li>
        <li>
          Ayak/sökülen stand ayrı paketlenir; vidalar bir poşette ayağa
          bantlanır.
        </li>
      </ul>

      <h2>Asansör sığmazsa</h2>
      <p>
        Beyaz eşyanın çoğu asansör kabinine sığmaz veya sığsa bile ağırlık
        sınırını zorlar. Merdiven planı{" "}
        <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
          asansörsüz ev nasıl taşınır
        </Link>{" "}
        yazısındaki gibi kat × ağırlık işidir. Dar merdivende köşe koruması
        isteğe bağlı değil.
      </p>

      <h2>Teklif için hangi bilgi yeterli?</h2>
      <p>
        Eşyanın ne olduğu, iki adresin kat/asansörü ve sökülüp sökülemeyeceği.
        Marka-model şart değil; ölçü ve ağır parça olduğu bilgisi yeter. Aynı
        gün içinde birkaç parça (buzdolabı + makine) parça eşya olarak
        gidebilir; liste uzadıkça{" "}
        <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link> daha
        mantıklı olabilir.
      </p>
    </GuideShell>
  );
}
