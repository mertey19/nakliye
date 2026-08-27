import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";

const guide = guideBySlug("esyalar-nasil-paketlenir")!;

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
        Taşınmada kırılan eşyaların çoğu yolda değil, kutunun içinde kırılır.
        Sebebi neredeyse hep aynı: kutuda boşluk kalmıştır ve eşya yol boyunca
        hareket etmiştir. İyi paketlemenin tek cümlelik özeti şudur —{" "}
        <strong>kutuda boşluk bırakmayın, ağırlığı küçük kutulara dağıtın.</strong>
      </p>

      <h2>Önce malzeme</h2>
      <ul>
        <li>
          <strong>Farklı boyda koli:</strong> Küçük koli ağır eşya için, büyük
          koli hafif ve hacimli eşya için.
        </li>
        <li>
          <strong>Balonlu naylon:</strong> Cam, porselen ve elektronik için.
        </li>
        <li>
          <strong>Dolgu malzemesi:</strong> Gazete kağıdı, ambalaj kağıdı veya
          havlu/çarşaf gibi zaten taşınacak tekstiller.
        </li>
        <li>
          <strong>Streç film:</strong> Çekmeceleri ve kapakları sabitlemek için.
        </li>
        <li>
          <strong>Kalın koli bandı ve kalın uçlu kalem:</strong> Etiketleme
          olmadan paketleme yarım kalır.
        </li>
      </ul>

      <h2>Mutfak: en çok zaman alan oda</h2>
      <ul>
        <li>
          <strong>Tabaklar yan yatırılır.</strong> Üst üste değil, dik olarak
          yerleştirildiklerinde baskıya çok daha dayanıklıdır. Aralarına kağıt
          konur.
        </li>
        <li>
          <strong>Bardaklar tek tek sarılır</strong> ve kutunun üst sırasına
          konur. Alt sıraya ağır tencereler yerleşir.
        </li>
        <li>
          <strong>Bıçaklar ayrı paketlenir.</strong> Ağızları kalın kağıtla
          sarılıp bantlanır, kutunun üzerine belirtilir.
        </li>
        <li>
          <strong>Sıvılar ayrı kutuya.</strong> Yağ, sirke ve deterjan kapakları
          streçle sarılır; asla kitap veya tekstille aynı kutuya konmaz.
        </li>
        <li>
          <strong>Küçük ev aletleri</strong> mümkünse kendi kutusunda taşınır;
          değilse dolgu malzemesiyle sarılır.
        </li>
      </ul>

      <h2>Salon ve dekoratif eşya</h2>
      <ul>
        <li>Tablo ve aynaların köşeleri ayrıca korunur, dik taşınır.</li>
        <li>Televizyon ekranı yüzeye değmeyecek şekilde paketlenir ve dik konumda taşınır.</li>
        <li>Vazolar ve biblolar tek tek sarılır, kutu içinde birbirine değmez.</li>
        <li>Kablolar sökülmeden önce hangi cihaza ait olduğu etiketlenir.</li>
      </ul>

      <h2>Yatak odası ve kıyafetler</h2>
      <ul>
        <li>
          <strong>Askılı kıyafetler:</strong> Askılı koli kullanılırsa kıyafetler
          askıda kalır ve yeni evde doğrudan dolaba asılır. Yoksa askılarıyla
          birlikte gruplanıp poşetlenir.
        </li>
        <li>
          <strong>Katlanacaklar:</strong> Standart koliye konur; çok ağır
          olmadığı için büyük koli kullanılabilir.
        </li>
        <li>
          <strong>Yorgan ve yastıklar</strong> vakumlu poşetle hacim olarak
          küçültülebilir; araç içinde ciddi yer kazandırır.
        </li>
        <li>
          <strong>Takı ve değerli eşya</strong> taşıma aracına verilmez, yanınızda
          taşınır.
        </li>
      </ul>

      <h2>Kitap, evrak ve elektronik</h2>
      <ul>
        <li>
          Kitaplar <strong>küçük kolilere</strong> yatay olarak dizilir. Büyük
          koli, dolduğunda taşınamayacak ağırlığa ulaşır ve dibi patlar.
        </li>
        <li>
          Evraklar dosya düzeni bozulmadan kutulanır ve kutu üzerine içeriği
          yazılır.
        </li>
        <li>
          Bilgisayar ve harddisk gibi cihazlar dolgu malzemesiyle sarılır,
          mümkünse yanınızda taşınır.
        </li>
      </ul>

      <h2>Beyaz eşya</h2>
      <ul>
        <li>
          <strong>Buzdolabı:</strong> Taşımadan en az 12 saat önce fişi çekilir,
          boşaltılır ve buzu çözdürülür. İçi kurulanır, kapı hafif aralık
          bırakılır.
        </li>
        <li>
          <strong>Çamaşır makinesi:</strong> Suyu boşaltılır, hortumlar sökülür.
          Mümkünse taşıma vidaları takılır; yoksa tambur sabitlenerek taşınır.
        </li>
        <li>
          <strong>Bulaşık makinesi:</strong> Su hattı sökülür, filtre temizlenir,
          içine bez konur.
        </li>
      </ul>

      <h2>Etiketleme: en çok geri dönüşü olan 5 dakika</h2>
      <p>Her kutunun üstüne ve bir yan yüzüne şunlar yazılır:</p>
      <ol>
        <li>Gideceği oda (mutfak, yatak odası, salon)</li>
        <li>İçerik özeti (tabak-bardak, kitap, kışlık kıyafet)</li>
        <li>Kırılabilir ise büyük harfle &ldquo;KIRILABİLİR&rdquo;</li>
        <li>İlk açılacaksa &ldquo;İLK GÜN&rdquo;</li>
      </ol>
      <p>
        Etiket sadece kapağa yazılırsa, kutular üst üste dizildiğinde görünmez.
        Bu yüzden yan yüze de yazmak gerekir.
      </p>

      <h2>Kutuları yüklerken</h2>
      <ul>
        <li>Ağır kutular alta, hafif ve kırılabilir olanlar üste.</li>
        <li>Kutular tam dolu ve kapalı olmalı; yarım dolu kutu ezilir.</li>
        <li>Sıvı içeren kutular dik konumda kalacak şekilde yerleştirilir.</li>
      </ul>
      <p>
        Buzdolabı, çamaşır makinesi ve ekran koli gibi istiflenmez; cihaz
        hazırlığı{" "}
        <Link href="/rehber/beyaz-esya-nasil-tasinir">
          beyaz eşya nasıl taşınır
        </Link>{" "}
        yazısında.
      </p>

      <p>
        Paketlemeyi kendiniz yapmak istemiyorsanız{" "}
        <Link href="/esya-paketleme">eşya paketleme hizmeti</Link> kapsamında
        malzeme ve işçilik birlikte planlanıyor. Taşınma tarihinizi ve hangi
        odaların paketleneceğini yazmanız yeterli.
      </p>
    </GuideShell>
  );
}
