import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("ev-tasirken-yapilmasi-gerekenler")!;
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
        Taşınmanın zor tarafı eşyayı taşımak değil, sırayı kaçırmaktır. Kutuları
        son güne bırakan bir ev, taşınma sabahı hâlâ paketleniyor olur ve gün
        planı bozulur. Aşağıdaki liste, taşınma tarihinden geriye doğru
        çalışılacak biçimde düzenlendi.
      </p>

      <h2>4 hafta kala: karar ve envanter</h2>
      <ul>
        <li>
          <strong>Taşınma tarihini netleştirin.</strong> Ay sonu ve hafta sonları
          nakliyat firmalarında en yoğun dönemdir. Tarih netleşir netleşmez yer
          ayırtmak, istediğiniz günü almanızı sağlar.
        </li>
        <li>
          <strong>Eşya envanteri çıkarın.</strong> Oda oda dolaşıp
          &ldquo;gidecek&rdquo;, &ldquo;satılacak/verilecek&rdquo; ve
          &ldquo;atılacak&rdquo; diye üç grup yapın. Taşınacak eşya azaldıkça
          hem işiniz hem maliyetiniz azalır.
        </li>
        <li>
          <strong>Taşımayacaklarınızı elden çıkarın.</strong> Satış ya da bağış
          süreci birkaç hafta sürebilir; erken başlamak gerekir.
        </li>
      </ul>

      <h2>3 hafta kala: firma ve teklif</h2>
      <ul>
        <li>
          <strong>Teklif alın.</strong> Teklif isterken evin oda sayısını, kat ve
          asansör durumunu, taşınma tarihini ve paketlemeyi kimin yapacağını
          söyleyin. Bu dördü olmadan verilen fiyat çoğu zaman değişir.
        </li>
        <li>
          <strong>Paketleme kararını verin.</strong> Kendiniz mi paketleyeceksiniz,
          firma mı yapacak? Bu karar hem bütçeyi hem takvimi belirler.
        </li>
        <li>
          <strong>Nelerin taşınmayacağını sorun.</strong> Yanıcı maddeler, tüp ve
          bazı kimyasallar araçla taşınmaz; bunları ayrı planlamak gerekir.
        </li>
      </ul>
      <p>
        Firma seçerken hangi soruları sormanız gerektiğini{" "}
        <Link href="/rehber/nakliye-firmasi-secerken">
          nakliye firması seçerken nelere dikkat edilmeli
        </Link>{" "}
        yazısında ayrıntılı anlattık.
      </p>

      <h2>2 hafta kala: abonelikler ve resmi işlemler</h2>
      <ul>
        <li>
          <strong>Elektrik, su, doğalgaz:</strong> Eski adreste kapama, yeni
          adreste açma işlemlerini taşınma tarihine göre planlayın. Yeni evde ilk
          gün elektriksiz kalmamak için açma işlemini bir gün önceye ayarlamak
          işe yarar.
        </li>
        <li>
          <strong>İnternet:</strong> Nakil işlemi çoğu zaman en uzun süren
          kalemdir; en az iki hafta önceden başvurun.
        </li>
        <li>
          <strong>Adres değişikliği:</strong> Banka, kargo, e-devlet ve abonelik
          kayıtlarını güncelleyin.
        </li>
        <li>
          <strong>Bina yönetimi:</strong> Bazı sitelerde taşınma için saat
          kısıtı veya izin gerekir. Hem çıkacağınız hem gireceğiniz binada bunu
          sorun.
        </li>
      </ul>

      <h2>1 hafta kala: paketlemenin ağırlığı</h2>
      <ul>
        <li>
          <strong>Az kullanılan odalardan başlayın.</strong> Misafir odası,
          kitaplık, mevsimlik kıyafetler ilk paketlenecekler.
        </li>
        <li>
          <strong>Kutuları etiketleyin.</strong> Oda adı ve içeriğin kırılabilir
          olup olmadığı yeterli. Etiketsiz kutu, yeni evde iki katı zaman
          kaybettirir.
        </li>
        <li>
          <strong>&ldquo;İlk gün kutusu&rdquo; hazırlayın.</strong> Şarj aleti,
          temizlik malzemesi, havlu, ilaç, yatak takımı ve birkaç mutfak
          gerecini ayrı bir kutuya koyun; bu kutu en son yüklenip ilk indirilir.
        </li>
        <li>
          <strong>Değerli evrak ve takıyı ayırın.</strong> Kimlik, tapu, altın ve
          benzeri eşyalar taşıma aracına verilmez, yanınızda taşınır.
        </li>
      </ul>
      <p>
        Oda oda paketleme yöntemi için{" "}
        <Link href="/rehber/esyalar-nasil-paketlenir">
          eşyalar nasıl paketlenir
        </Link>{" "}
        rehberine bakabilirsiniz.
      </p>

      <h2>Taşınmadan 1-2 gün önce</h2>
      <ul>
        <li>Buzdolabını boşaltın ve buzunu çözdürün; nakliyeden en az 12 saat önce fişini çekin.</li>
        <li>Çamaşır makinesinin suyunu boşaltın, tamburu sabitleyin.</li>
        <li>Kalan eşyaları paketleyip kutu sayısını netleştirin.</li>
        <li>Taşınma günü için araç park yerini bina yönetimiyle konuşun.</li>
        <li>Firmayla saati teyit edin ve iki adresin yol tarifini paylaşın.</li>
      </ul>

      <h2>Taşınma günü</h2>
      <ul>
        <li>Evde en az bir yetkili kişi bulunsun; hangi eşyanın hangi odaya gideceğini gösterin.</li>
        <li>Özel dikkat isteyen eşyaları ekibe önceden söyleyin.</li>
        <li>Yükleme bitince tüm odaları, dolapları ve balkonu son kez kontrol edin.</li>
        <li>Elektrik ve su sayaçlarının son değerlerini not alın.</li>
      </ul>

      <h2>Yeni evde ilk gün</h2>
      <ul>
        <li>Önce yatakları kurun; ilk gecenin rahat geçmesi işin yarısıdır.</li>
        <li>Beyaz eşyaları yerleştirip bağlantılarını kontrol edin.</li>
        <li>Mutfağı ve banyoyu açın; kalan kutular birkaç güne yayılabilir.</li>
        <li>Kutuları etiketlerine göre odalara dağıtın, hepsini birden açmayın.</li>
      </ul>

      <h2>Sık yapılan üç hata</h2>
      <ol>
        <li>
          <strong>Her şeyi son haftaya bırakmak.</strong> Paketleme, tahmin
          edilenden her zaman uzun sürer.
        </li>
        <li>
          <strong>Kutuları aşırı doldurmak.</strong> Ağır kutunun dibi dayanmaz;
          kitap gibi ağır ürünler küçük kutulara konur.
        </li>
        <li>
          <strong>Firmaya eksik bilgi vermek.</strong> Asansör yokken var demek
          ya da eşya miktarını az söylemek, taşınma günü hem süreyi hem fiyatı
          değiştirir.
        </li>
      </ol>
      <p>
        {city} içinde veya {city} dışına taşınıyorsanız, süreci baştan planlamak
        için taşınma bilgilerinizi paylaşmanız yeterli.
      </p>
    </GuideShell>
  );
}
