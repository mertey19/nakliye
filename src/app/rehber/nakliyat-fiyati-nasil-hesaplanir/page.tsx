import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("nakliyat-fiyati-nasil-hesaplanir")!;
const city = business.primaryCity;

/**
 * Arama amacı: "nakliyat fiyatı nasıl hesaplanır", "ev taşıma fiyatı neye
 * göre değişir", "nakliyat fiyatı neye göre belirlenir".
 *
 * "mersin nakliyat fiyatları" ticari/fiyat niyeti /evden-eve-nakliyat#fiyat
 * sayfasındadır. Bu yazı HOW (bilgi) amacını karşılar; uydurma TL listesi yok.
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
        Nakliyat fiyatı, evin oda sayısına bakıp tek rakam üretmekle
        hesaplanmaz. Aynı 3+1 ev, asansörlü zemin katta başka, asansörsüz 4.
        katta başka tutar. Fiyatı belirleyen şey oda etiketi değil;{" "}
        <strong>işin süresi, ekip ihtiyacı ve aracın nasıl
        çalışacağıdır.</strong>
      </p>

      <h2>Fiyatı asıl değiştiren altı etken</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Etken</th>
              <th>Neden fiyatı değiştirir?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mesafe ve rota</td>
              <td>
                {city} içi kısa mesafe ile il dışına giden taşıma aynı yakıt,
                süre ve araç planını kullanmaz.
              </td>
            </tr>
            <tr>
              <td>Eşya miktarı ve hacim</td>
              <td>
                1+1 stüdyo ile dolu 4+1 ev aynı araca sığmaz; tur sayısı ve ekip
                büyür.
              </td>
            </tr>
            <tr>
              <td>Kat ve asansör</td>
              <td>
                Asansör yoksa veya koltuk asansöre sığmıyorsa her parça
                merdivenden iner; işçilik artar.
              </td>
            </tr>
            <tr>
              <td>Paketleme kapsamı</td>
              <td>
                Sadece taşıma ile mutfak + cam + elektronik paketleme aynı iş
                değildir.
              </td>
            </tr>
            <tr>
              <td>Araç yaklaşımı</td>
              <td>
                Dar sokak, site otoparkı veya yasağın olduğu cadde, eşyanın elde
                taşınacağı mesafeyi uzatır.
              </td>
            </tr>
            <tr>
              <td>Tarih ve aciliyet</td>
              <td>
                Ay sonu, hafta sonu ve dönem sonu (öğrenci taşınmaları) aynı
                güne yığılır; müsait araç azalır.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {city} evden eve nakliyat sayfasında bu etkenleri hizmet bağlamında da
        özetledik:{" "}
        <Link href="/evden-eve-nakliyat#fiyat">nakliyat fiyatı nasıl hesaplanır</Link>.
        Bu yazı, teklif almadan önce o tabloyu nasıl okuyacağınızı açıyor.
      </p>

      <h2>Neden internetteki sabit fiyat listesi yanıltır?</h2>
      <p>
        &ldquo;3+1 ev taşıma X bin TL&rdquo; diye yayınlanan listeler, yukarıdaki
        altı etkenden çoğunu yok sayar. İki teklif arasındaki fark çoğu zaman
        firmanın &ldquo;pahalı&rdquo; olmasından değil,{" "}
        <strong>farklı işi fiyatlamasından</strong> gelir: biri paketlemeyi
        dahil eder, diğeri etmez; biri asansörsüz katı bilir, diğeri bilmez.
      </p>
      <p>
        Bu yüzden sitede uydurma bir fiyat tablosu yayınlamıyoruz. Net rakam,
        çıkış-varış, kat, asansör ve eşya netleştikten sonra verilir. Teklifleri
        karşılaştırmadan önce kapsamın aynı olup olmadığını{" "}
        <Link href="/rehber/nakliye-firmasi-secerken">
          nakliye firması seçerken
        </Link>{" "}
        yazısındaki sorularla kontrol edin.
      </p>

      <h2>Teklif isterken vermeniz gereken minimum bilgi</h2>
      <ul>
        <li>Çıkış ve varış ilçesi (şehirler arasındaysa il)</li>
        <li>Oda sayısı ve kabaca eşya yoğunluğu (az / orta / dolu)</li>
        <li>İki adresin katı ve asansör durumu</li>
        <li>Paketlemeyi kimin yapacağı</li>
        <li>Tarih veya tarih aralığı</li>
        <li>Sökülmesi gereken özel parçalar (gardırop, piyano, büyük TV)</li>
      </ul>
      <p>
        Bu altılı olmadan verilen fiyat bir tahmindir; taşınma sabahı değişir.
        Aynı bilgiyi bütün firmalara verirseniz gelen rakamlar gerçekten
        karşılaştırılabilir olur.
      </p>

      <h2>Şehir içi ile şehirler arası neden ayrı fiyatlanır?</h2>
      <p>
        Şehir içinde araç aynı gün yükleyip teslim edebilir. İl dışına giden
        işte yol süresi, yakıt, varsa gece teslimi veya ertesi gün teslimi ve
        dönüş planı eklenir. {city}&apos;den çıkan şehirler arası ev taşımasında
        bu yüzden önce rota konuşulur; ayrıntı{" "}
        <Link href="/rehber/sehirler-arasi-ev-tasima">
          şehirler arası ev nasıl taşınır
        </Link>{" "}
        yazısında.
      </p>

      <h2>Asansörsüz kat fiyatı nasıl etkiler?</h2>
      <p>
        Etki kat sayısı kadar, eşyanın ağırlığına da bağlıdır. 2. kattaki dolu
        ev, 5. kattaki az eşyalı stüdyodan daha uzun sürebilir. Merdiven,
        koruma malzemesi ve ekip sayısını büyüttüğü için işçilik kalemi öne
        çıkar. Planın nasıl değiştiğini{" "}
        <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
          asansörsüz ev nasıl taşınır
        </Link>{" "}
        rehberinde anlattık.
      </p>

      <h2>Parça eşya neden tam evden ucuz çıkar?</h2>
      <p>
        Tek buzdolabı veya birkaç koli için tam ev ekibi ve tam kasa araç
        gerekmez. Süre kısa, tur azdır. Eşya listesi uzadıkça bir noktada parça
        taşıma, tam ev taşımasından pahalıya gelebilir; o eşiği eşyayı gördükten
        sonra söylemek daha doğrudur. Beyaz eşya özelinde hazırlık{" "}
        <Link href="/rehber/beyaz-esya-nasil-tasinir">
          beyaz eşya nasıl taşınır
        </Link>{" "}
        yazısında.
      </p>

      <h2>Fiyatı şaşırtan üç unutulan kalem</h2>
      <ol>
        <li>
          <strong>Bina–kamyon mesafesi.</strong> Araç kapının önüne yanaşamıyorsa
          her kutu ekstra yürüme demektir.
        </li>
        <li>
          <strong>&ldquo;Az eşya&rdquo; algısı.</strong> Boş görünen evde
          gardırop, kitap ve mutfak eşyası hacmi doldurur.
        </li>
        <li>
          <strong>Son anda eklenen iş.</strong> &ldquo;Madem geldiniz, balkondaki
          şeyleri de alın&rdquo; süresi ve aracı büyütür.
        </li>
      </ol>

      <h2>Net fiyat için sonraki adım</h2>
      <p>
        {city} içinde veya {city} dışına taşınıyorsanız eşya ve adres
        bilgilerini paylaşmanız yeterli. Size özel teklif{" "}
        <Link href="/teklif-al">teklif al</Link> formundan veya WhatsApp&apos;tan
        çıkar; yayınlanmış sahte bir tarife yoktur.
      </p>
    </GuideShell>
  );
}
