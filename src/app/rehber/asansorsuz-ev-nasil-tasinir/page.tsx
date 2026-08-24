import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("asansorsuz-ev-nasil-tasinir")!;
const city = business.primaryCity;

/**
 * Arama amacı: "asansörsüz ev taşıma", "asansör yoksa nakliyat",
 * "asansörsüz bina taşınma", "kaçıncı kata kadar merdivenle taşınır".
 *
 * Bu arama amacı için sitede birincil sayfa YOKTU: evden eve sayfasında ve
 * hizmet bölgelerinde yalnızca SSS cevabı olarak geçiyordu. Konu Türkiye'de
 * çok yaygın ve taşınma öncesi en çok endişe yaratan başlıklardan biri.
 * Yamyamlaşma riski yok; ticari sayfa /evden-eve-nakliyat olarak kalıyor,
 * bu yazı oraya besleme yapıyor.
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
        Asansörsüz binada taşınma yapılamaz diye bir şey yok; sadece işin
        planlaması değişir. Eşyalar merdivenden taşındığı için süre uzar, ekip
        sayısı artar ve bazı mobilyalar sökülmek zorunda kalır. Bunları taşınma
        günü öğrenmek yerine önceden konuşmak, hem maliyeti hem stresi
        azaltıyor.
      </p>

      <h2>Asansör yokluğu neyi değiştirir?</h2>
      <p>Üç şeyi: <strong>süre</strong>, <strong>ekip</strong> ve <strong>risk</strong>.</p>
      <ul>
        <li>
          <strong>Süre:</strong> Asansörlü bir binada 3-4 saatte biten yükleme,
          asansörsüz 4. katta iki katına çıkabilir. Her parça için merdiven
          inip çıkılır.
        </li>
        <li>
          <strong>Ekip:</strong> Ağır parçaları merdivenden indirmek en az iki,
          çoğu zaman üç kişi ister. Tek kişilik iş değildir.
        </li>
        <li>
          <strong>Risk:</strong> Dar merdiven boşluğunda duvar, korkuluk ve
          mobilya köşeleri zarar görebilir. Bu yüzden koruma malzemesi
          kullanmak asansörsüz taşımada isteğe bağlı değil, gereklidir.
        </li>
      </ul>

      <h2>Kaçıncı kata kadar merdivenle taşınır?</h2>
      <p>
        Pratikte sınır kat sayısı değil, <strong>eşya × kat</strong> birleşimidir.
        2. kattaki 4+1 bir ev, 5. kattaki 1+1 bir evden daha ağır iş olabilir.
        Genel eğilim şu:
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Kat</th>
              <th>Tipik durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1–2. kat</td>
              <td>Ek planlama çoğu zaman gerekmez, süre bir miktar uzar.</td>
            </tr>
            <tr>
              <td>3–4. kat</td>
              <td>Ekip sayısı artırılır; ağır mobilyalar sökülerek indirilir.</td>
            </tr>
            <tr>
              <td>5. kat ve üzeri</td>
              <td>
                Eşya miktarına göre iş bölünerek planlanır; bazı parçalar için
                alternatif yöntem değerlendirilir.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Merdivenden geçmeyen eşyalar</h2>
      <p>
        Asansörsüz taşımada asıl sorun ağırlık değil, <strong>ölçü</strong>.
        Şu parçalar sık sık merdiven boşluğuna sığmaz:
      </p>
      <ul>
        <li>Üç ve dört kapılı gardıroplar (sökülmeden çoğu merdivenden geçmez)</li>
        <li>Köşe koltuk takımları</li>
        <li>Büyük ekran televizyonlar (kutusu yoksa taşıması risklidir)</li>
        <li>Çift kapılı buzdolapları</li>
        <li>Yemek masası tablaları</li>
        <li>Büyük ayna ve tablolar</li>
      </ul>
      <p>
        Bunların çoğu sökülerek çözülür. Sökülemeyen bir parça varsa taşınma
        gününden önce bilmek gerekir; alternatif yöntem ancak önceden
        planlanabilir.
      </p>

      <h2>Taşınmadan önce ölçmeniz gereken üç şey</h2>
      <ol>
        <li>
          <strong>Merdiven boşluğu genişliği:</strong> Sahanlıkta dönüş yapacak
          kadar yer var mı?
        </li>
        <li>
          <strong>Kapı genişliği:</strong> Hem daire kapısı hem apartman giriş
          kapısı.
        </li>
        <li>
          <strong>En büyük eşyanın ölçüsü:</strong> Gardırop ve koltuğun
          genişlik-derinlik ölçüsü.
        </li>
      </ol>
      <p>
        Bu üç ölçüyü telefonla iletirseniz, bir parçanın sökülmesi gerekip
        gerekmediğini taşınma gününden önce söyleyebiliriz.
      </p>

      <h2>Asansörsüz taşıma daha mı pahalı?</h2>
      <p>
        Genellikle evet, çünkü işçilik ve süre artıyor. Ama fark, kat sayısı
        kadar <strong>eşya miktarına</strong> da bağlı. Fiyatı etkileyen bütün
        kalemleri{" "}
        <Link href="/evden-eve-nakliyat#fiyat">
          evden eve nakliyat sayfasında
        </Link>{" "}
        açıkça listeledik.
      </p>
      <p>
        Burada önemli olan şu: kat ve asansör bilgisini baştan doğru vermek.
        Telefonda &ldquo;asansör var&rdquo; deyip taşınma günü olmadığı anlaşılan
        işlerde fiyat yerinde değişir — kimsenin istemediği durum budur.
      </p>

      <h2>Taşınma gününü kolaylaştıran hazırlıklar</h2>
      <ul>
        <li>
          <strong>Merdiven yolunu boşaltın.</strong> Sahanlıktaki ayakkabılık,
          saksı ve bisikletler geçişi daraltır.
        </li>
        <li>
          <strong>Komşulara haber verin.</strong> Merdiven bir süre yoğun
          kullanılacak; önceden bilmek herkesi rahatlatır.
        </li>
        <li>
          <strong>Bina yönetiminin saat kuralını sorun.</strong> Bazı sitelerde
          taşımaya belirli saat aralıklarında izin veriliyor.
        </li>
        <li>
          <strong>Küçük kutu kullanın.</strong> Merdivenden taşınacak kutuların
          hafif olması, tur sayısını artırsa da hızı ve güvenliği yükseltir.
        </li>
        <li>
          <strong>Araç için yer ayırın.</strong> Aracın kapıya yakın park
          etmesi, merdiven yükünün üstüne bir de uzun yürüme mesafesi
          eklenmesini önler.
        </li>
      </ul>

      <h2>Yeni ev de asansörsüzse</h2>
      <p>
        İki adres de asansörsüzse süre iki kat etkilenir; bunu planlamaya
        baştan katmak gerekir. Böyle işlerde taşınmayı sabah erken başlatmak,
        günü yetiştirmek açısından belirgin fark yaratıyor.
      </p>

      <p>
        {city} içinde asansörsüz binadan taşınacaksanız kat, eşya ve merdiven
        bilgisini paylaşmanız yeterli; işin kaç kişiyle ve kaç saatte
        biteceğini önceden çıkarıp size söyleyelim.
      </p>
    </GuideShell>
  );
}
