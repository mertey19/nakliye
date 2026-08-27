import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("nakliye-firmasi-secerken")!;
const city = business.primaryCity;

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
        Nakliye firması seçerken en sık yapılan hata, üç yerden fiyat alıp en
        düşüğünü seçmek. Sorun şu: bu üç teklif çoğu zaman aynı işi kapsamıyor.
        Biri paketlemeyi dahil ediyor, diğeri etmiyor; biri asansör olmadığını
        biliyor, diğeri bilmiyor. Karşılaştırma yapabilmek için önce tekliflerin
        aynı işi tarif ettiğinden emin olmak gerekiyor.
      </p>

      <h2>Teklif isterken vermeniz gereken bilgiler</h2>
      <p>
        Aynı bilgiyi tüm firmalara verirseniz, gelen fiyatlar gerçekten
        karşılaştırılabilir olur:
      </p>
      <ul>
        <li>Evin oda sayısı (1+1, 3+1 gibi) ve yaklaşık eşya miktarı</li>
        <li>Çıkış adresinin katı ve asansör durumu</li>
        <li>Varış adresinin katı ve asansör durumu</li>
        <li>Taşınma tarihi veya tarih aralığı</li>
        <li>Paketlemeyi kimin yapacağı</li>
        <li>Sökülüp kurulması gereken özel mobilyalar</li>
      </ul>

      <h2>Telefonda sorulması gereken sorular</h2>
      <ol>
        <li>
          <strong>Fiyata tam olarak ne dahil?</strong> Paketleme malzemesi,
          işçilik, söküm-kurulum ve yerleşim ayrı ayrı sorulmalı.
        </li>
        <li>
          <strong>Fiyat neye göre değişebilir?</strong> Hangi durumda fiyatın
          artacağını baştan söyleyen firma, taşınma günü sürpriz yapmaz.
        </li>
        <li>
          <strong>Kaç kişilik ekiple geliyorsunuz?</strong> Asansörsüz katlarda
          ekip sayısı süreyi doğrudan belirler.
        </li>
        <li>
          <strong>Aynı gün teslim ediliyor mu?</strong> Özellikle şehirler arası
          taşımada bu netleşmeli.
        </li>
        <li>
          <strong>Taşımayı kim yapacak?</strong> Teklifi veren firma mı, başka
          bir ekip mi? Muhatabın değişmemesi işi kolaylaştırır.
        </li>
        <li>
          <strong>Hasar durumunda süreç nasıl işliyor?</strong> Cevabı net
          alınmalı; belirsiz geçiştirilen bir konu değil.
        </li>
      </ol>

      <h2>Düşük fiyat ne zaman risklidir?</h2>
      <p>
        Ucuz teklif her zaman kötü değildir. Firma o gün o bölgede zaten işi
        varsa, dönüş yükü olarak taşımayı ekonomik yapabilir. Ancak şu üç
        durumda düşük fiyat uyarı işaretidir:
      </p>
      <ul>
        <li>
          <strong>Hiç soru sorulmadan fiyat verilmişse.</strong> Eşyayı, katı ve
          mesafeyi bilmeden verilen rakam bir tahmindir; taşınma günü değişir.
        </li>
        <li>
          <strong>Kapsam yazılı olarak netleştirilmemişse.</strong> &ldquo;Her
          şey dahil&rdquo; ifadesi tek başına bir şey ifade etmez.
        </li>
        <li>
          <strong>Kapora istenip iletişim zorlaşıyorsa.</strong> Teklif
          aşamasında ulaşılması zor olan firma, taşınma gününde de zor bulunur.
        </li>
      </ul>
      <p>
        Tekliflerin neden farklı çıktığını fiyat etkenleriyle okumak için{" "}
        <Link href="/rehber/nakliyat-fiyati-nasil-hesaplanir">
          nakliyat fiyatı neye göre belirlenir
        </Link>{" "}
        yazısına bakın.
      </p>

      <h2>Firmanın gerçekten var olduğunu nasıl anlarsınız?</h2>
      <ul>
        <li>
          <strong>Google İşletme Profili:</strong> Gerçek bir profil, gerçek
          fotoğraflar ve zamana yayılmış yorumlar içerir.
        </li>
        <li>
          <strong>Kendi fotoğrafları:</strong> Sitede stok fotoğraf yerine
          firmanın kendi aracı ve ekibi görünüyorsa bu iyi bir işarettir.
        </li>
        <li>
          <strong>Ulaşılabilir iletişim:</strong> Telefonun açılması ve sorulara
          net cevap verilmesi, taşınma gününün habercisidir.
        </li>
        <li>
          <strong>Tutarlı bilgi:</strong> Firma adı, telefon ve adres her yerde
          aynı yazılmalı.
        </li>
      </ul>

      <h2>Yorumları okurken nelere bakmalı?</h2>
      <p>
        Beş yıldızlı kısa yorumlar tek başına çok şey söylemez. İşe yarayan
        yorum, süreci anlatandır: taşınmanın ne kadar sürdüğü, ekibin dakik olup
        olmadığı, hasar çıkıp çıkmadığı ve çıktıysa nasıl çözüldüğü. Bir
        firmanın olumsuz yoruma verdiği cevap, olumlu yorumlardan daha çok bilgi
        taşır.
      </p>

      <h2>Karar öncesi son kontrol</h2>
      <ul>
        <li>Teklifler aynı kapsamı mı içeriyor?</li>
        <li>Fiyatın değişebileceği durumlar söylendi mi?</li>
        <li>Taşınma günü ve saat aralığı netleşti mi?</li>
        <li>Muhatabınız kim, taşıma günü kime ulaşacaksınız?</li>
      </ul>
      <p>
        {city} içinde veya {city} dışına taşınıyorsanız,{" "}
        <Link href="/evden-eve-nakliyat">evden eve nakliyat</Link> sayfasında
        hizmet kapsamını ve fiyatı belirleyen etkenleri açıkça listeledik.
        Sorularınızı doğrudan sorabilirsiniz.
      </p>
    </GuideShell>
  );
}
