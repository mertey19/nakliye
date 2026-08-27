import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("sehirler-arasi-ev-tasima")!;
const city = business.primaryCity;

/**
 * Arama amacı: "şehirler arası ev nasıl taşınır", "şehirler arası taşınma
 * planı", "il dışına ev taşıma".
 *
 * Ticari kanonik sayfa /sehirler-arasi-nakliyat. Rota sayfası (Mersin→İstanbul
 * vb.) açılmadı: programatik rota spam'i değil, süreç rehberi.
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
        Şehirler arası ev taşımak, şehir içi taşımadan daha uzun bir gün değil;{" "}
        <strong>iki ayrı gün gibi planlanan bir iştir</strong>: yükleme bir
        adreste, teslim başka bir ilde. {city}&apos;den çıkan evlerde asıl risk
        yolda kırılma değil, paketlemenin şehir içi standartta bırakılması ve
        teslim saatinin konuşulmamasıdır.
      </p>

      <h2>Şehir içi taşımadan üç fark</h2>
      <ul>
        <li>
          <strong>Süre ikiye bölünür.</strong> Yükleme sabah {city}&apos;de
          biter; teslim aynı gün akşam veya ertesi gün varış ilinde olur. Rotaya
          ve yola çıkış saatine göre değişir — her güzergâh için &ldquo;aynı gün
          teslim&rdquo; sözü gerçekçi değildir.
        </li>
        <li>
          <strong>Paketleme sıkılaşır.</strong> Araç daha uzun titrer, dur-kalk
          artar. Cam, ayna ve elektronik için boşluksuz dolgu şehir içinde
          &ldquo;olsa iyi olur&rdquo;; uzun yolda gereklidir.
        </li>
        <li>
          <strong>Sizin yanınızda kalacaklar değişir.</strong> İlaç, evrak, laptop
          ve bir gecelik çanta araca verilmez. Teslim gecikirse bu çanta ilk
          geceyi kurtarır.
        </li>
      </ul>

      <h2>Taşınmadan 10–14 gün önce</h2>
      <ol>
        <li>
          Çıkış ve varış açık adresini, kat ve asansör durumunu netleştirin.
        </li>
        <li>
          Eşya miktarını dürüstçe söyleyin. İl dışında &ldquo;biraz daha eşya
          çıktı&rdquo; ikinci bir sefer anlamına gelebilir.
        </li>
        <li>
          Varışta sizi kim karşılayacak? Anahtar teslimi ve asansör rezervasyonu
          (varsa) varış gününe bağlanmalı.
        </li>
        <li>
          Elektrik, su, internet naklini iki il için ayrı ayrı planlayın;
          internet çoğu zaman en geç kalan kalemdir.
        </li>
      </ol>
      <p>
        Dört haftalık genel takvim{" "}
        <Link href="/rehber/ev-tasirken-yapilmasi-gerekenler">
          ev taşırken yapılması gerekenler
        </Link>{" "}
        yazısında; bu rehber yalnızca il dışı farklara odaklanır.
      </p>

      <h2>Uzun yol paketlemesinde ne değişir?</h2>
      <ul>
        <li>Çekmeceler boşaltılır, kapaklar streçlenir; yolda açılmaz.</li>
        <li>
          Televizyon dikey ve sabitlenmiş taşınır; kutu yoksa ekran koruması
          şarttır.
        </li>
        <li>
          Sıvılar, tüp ve yanıcı maddeler araca alınmaz. Bunları ayrı çözün.
        </li>
        <li>
          Kutular oda + içerik + &ldquo;kırılır&rdquo; etiketi taşır. Varışta
          yabancı bir ekip kutuyu sizin hafızanızla açmaz.
        </li>
      </ul>
      <p>
        Oda oda yöntem{" "}
        <Link href="/rehber/esyalar-nasil-paketlenir">
          eşyalar nasıl paketlenir
        </Link>{" "}
        rehberinde. İl dışında o yöntemin &ldquo;sıkı&rdquo; hali kullanılır.
      </p>

      <h2>Yükleme günü ile teslim günü</h2>
      <p>
        Kısa mesafede (örneğin komşu ile) aynı gün teslim mümkün olabilir. Uzun
        rotada araç yola çıkmadan yüklemenin bitmiş olması gerekir; yolda ek
        durak planı varsa bu baştan konuşulur. Teslimde mobilya kurulumu dahil
        mi, değil mi — şehir içi teklifte varsayılan bu kalem, il dışında ayrı
        netleştirilmelidir.
      </p>
      <p>
        Hizmet kapsamı ve rota planı için kanonik sayfa{" "}
        <Link href="/sehirler-arasi-nakliyat">
          {city} şehirler arası nakliyat
        </Link>
        . Bu yazı o sayfanın yerine geçmez; taşınma kararını nasıl
        hazırlayacağınızı anlatır.
      </p>

      <h2>Yanınızda tutmanız gerekenler</h2>
      <ul>
        <li>Kimlik, tapu/kira, sözleşme ve sağlık evrakı</li>
        <li>İlaç, şarj aleti, bir değişim giysi</li>
        <li>Varış evinin anahtarı ve kapıcı/yönetim telefonu</li>
        <li>Değerli takı ve nakit — taşıma aracına verilmez</li>
      </ul>

      <h2>Fiyat neden şehir içinden farklı çıkar?</h2>
      <p>
        Yol süresi, yakıt ve aracın o güne bağlanması eklenir. Asansörsüz kat
        veya paketleme hâlâ geçerlidir; üzerine mesafe biner. Etkenlerin nasıl
        okunacağını{" "}
        <Link href="/rehber/nakliyat-fiyati-nasil-hesaplanir">
          nakliyat fiyatı neye göre belirlenir
        </Link>{" "}
        yazısında anlattık. Uydurma &ldquo;{city}–İstanbul şu kadar&rdquo;
        listesi yok: her rota ve her ev farklıdır.
      </p>

      <h2>Sık yapılan hatalar</h2>
      <ul>
        <li>
          Varışta kimsenin olmaması. Teslim için yetkili bir kişi şarttır.
        </li>
        <li>
          &ldquo;Aynı gün kurulum da biter&rdquo; varsayımı. Uzun yol + asansörsüz
          kat + kurulum aynı güne sığmayabilir.
        </li>
        <li>
          Son gece paketlemek. İl dışında eksik kutu, ikinci sefer demektir.
        </li>
      </ul>
      <p>
        Çıkış, varış ve tahmini tarihi yazın; {business.name} o rotaya göre
        yükleme-teslim planını çıkarsın.
      </p>
    </GuideShell>
  );
}
