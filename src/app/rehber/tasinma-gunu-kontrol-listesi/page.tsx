import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("tasinma-gunu-kontrol-listesi")!;
const city = business.primaryCity;

/**
 * Arama amacı: "taşınma günü kontrol listesi", "taşınma günü neler yapılır",
 * "taşınma sabahı nelere dikkat".
 *
 * 4 haftalık hazırlık rehberinden ayrı: yalnızca günün kendisi. Ticari sayfa
 * /evden-eve-nakliyat.
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
        Taşınma günü yeni karar günü değildir. Kararlar önceki haftalarda
        biter; günün işi{" "}
        <strong>sırayı bozmamak ve hiçbir odayı açık unutmamaktır.</strong>{" "}
        Dört haftalık hazırlık{" "}
        <Link href="/rehber/ev-tasirken-yapilmasi-gerekenler">
          ev taşırken yapılması gerekenler
        </Link>{" "}
        yazısında. Bu liste yalnızca sabah 07:00&apos;den yeni evdeki ilk geceye
        kadar.
      </p>

      <h2>Ekip gelmeden (sabah)</h2>
      <ul>
        <li>
          &ldquo;İlk gün kutusu&rdquo; ayrı dursun: şarj, ilaç, havlu, çay,
          temizlik bezi, yatak kılıfı. Bu kutu en son biner, ilk iner.
        </li>
        <li>
          Değerli evrak ve takı çantanızda. Araca verilmez.
        </li>
        <li>
          Buzdolabı boş ve kuru olsun; çamaşır makinesi suyu boş olsun. Cihaz
          adımları{" "}
          <Link href="/rehber/beyaz-esya-nasil-tasinir">
            beyaz eşya nasıl taşınır
          </Link>
          .
        </li>
        <li>
          Araç için park yeri net olsun. Site yasağı varsa yönetimden saatlik
          izin.
        </li>
        <li>Çocuk ve evcil hayvan için ayrı plan; yükleme hattında kalmasınlar.</li>
      </ul>

      <h2>Ekip geldiğinde</h2>
      <ul>
        <li>
          Evde bir yetkili kalsın. Hangi mobilyanın söküleceği, hangisinin
          hassas olduğu ilk beş dakikada gösterilir.
        </li>
        <li>
          Asansörsüzse merdiven ve korkuluk koruması konuşulur; kat planı{" "}
          <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
            asansörsüz ev nasıl taşınır
          </Link>
          .
        </li>
        <li>
          Kutuların oda etiketleri okunabilir olsun. Etiketsiz kutu varışta
          koridora yığılır.
        </li>
      </ul>

      <h2>Yükleme biterken eski ev</h2>
      <ol>
        <li>Her oda, balkon, kiler, banyo dolabı, evye altı.</li>
        <li>Klima kumandası, kapı anahtarı yedekleri, kiler anahtarı.</li>
        <li>Sayaçların son rakamı (elektrik, su, gaz) fotoğrafı.</li>
        <li>Pencereler kapalı, vanalar kapalı, ışıklar sönük.</li>
        <li>Kapıcı/yönetime anahtar teslimi net mi?</li>
      </ol>
      <p>
        Bu tur beş dakika kazandırmaz; unutulan tek parça ikinci sefer
        kazandırır.
      </p>

      <h2>Yeni evde ilk saatler</h2>
      <ul>
        <li>
          Kutular etiket odasına insin; salon birikmesin. Siz kapıda yön
          gösterin.
        </li>
        <li>Yatak önce kurulsun. İlk gece bunun için vardır.</li>
        <li>
          Beyaz eşya yerini alınca bağlantı kontrolü; su sızıntısı o akşam
          fark edilir.
        </li>
        <li>
          Şehirler arasındaysa teslim saati yüklemeden ayrıdır; plan{" "}
          <Link href="/rehber/sehirler-arasi-ev-tasima">
            şehirler arası ev nasıl taşınır
          </Link>
          .
        </li>
      </ul>

      <h2>Gün içinde sık bozulan üç şey</h2>
      <ul>
        <li>
          <strong>&ldquo;Madem geldiniz…&rdquo;</strong> balkondaki fazlalık.
          Kapsam dışına çıkmak süreyi ve bazen fiyatı değiştirir; baştan
          konuşulmamışsa güne sığmayabilir.
        </li>
        <li>
          <strong>Yetkili kişinin markete gitmesi.</strong> Ekip kimin
          yönlendireceğini kaybeder.
        </li>
        <li>
          <strong>Paketleme bitmemiş ev.</strong> Nakliye ekibi paketçiye
          dönüşür; program kayar. Koli işi önceki günlere aittir:{" "}
          <Link href="/rehber/esyalar-nasil-paketlenir">
            eşyalar nasıl paketlenir
          </Link>
          .
        </li>
      </ul>

      <h2>Gün bittiğinde</h2>
      <p>
        Hasar fark ederseniz o gün, mümkünse fotoğrafla söyleyin. Ertesi hafta
        &ldquo;bu çizik taşımada mıydı&rdquo; tartışması her iki tarafı da
        yorar. {city} içinde evden eve süreç{" "}
        <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>{" "}
        sayfasında; günün kendisi bu listedeki sırayı korumakla biter.
      </p>
    </GuideShell>
  );
}
