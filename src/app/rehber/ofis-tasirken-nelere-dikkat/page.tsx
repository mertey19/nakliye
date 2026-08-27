import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("ofis-tasirken-nelere-dikkat")!;
const city = business.primaryCity;

/**
 * Arama amacı: "ofis taşırken nelere dikkat edilmeli", "işyeri taşıma
 * kontrol listesi", "ofis nakliyat nasıl planlanır".
 *
 * Ev taşıma kontrol listesinden ayrı: kurumsal süreç, mesai kesintisi, arşiv.
 * Ticari sayfa /ofis-tasima.
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
        Ofis taşımada başarı, kutuların yeni adrese gitmesi değildir. Başarı,
        <strong> ertesi iş günü herkesin bilgisayarını açıp işine
        devam edebilmesidir.</strong> Ev taşımada yanlış kutu birkaç gün
        idare eder; ofiste yanlış kutu bir birimi durdurur.
      </p>

      <h2>Ev taşımadan kopan üç kural</h2>
      <ul>
        <li>
          <strong>Etiket birim + kişi taşır.</strong> &ldquo;Salon&rdquo; yetmez;
          &ldquo;muhasebe / 3. oda / Ayşe masa&rdquo; gerekir.
        </li>
        <li>
          <strong>Sıra, oturma planına göre kurulur.</strong> Önce çalışacak
          birim önce iner.
        </li>
        <li>
          <strong>Zamanlama mesaiye göre seçilir.</strong> Cuma akşamı veya
          hafta sonu, pazartesi açılışı kurtarır. Hafta içi öğlen taşımak nadiren
          iyi fikirdir.
        </li>
      </ul>
      <p>
        Hizmet olarak nasıl ilerlediğimizi{" "}
        <Link href="/ofis-tasima">{city} ofis taşıma</Link> sayfasında anlattık.
        Bu yazı, taşınmadan önceki sizin listenizdir.
      </p>

      <h2>Taşınmadan 3 hafta önce</h2>
      <ul>
        <li>
          Yeni ofisin krokisini çıkarın: kim nerede oturacak, dolaplar hangi
          duvarda.
        </li>
        <li>
          Arşivi eleyin. Taşınmayan evrak hem maliyet hem yer kaplar; yasal
          saklama süresi dolmuş kutuları ayırın.
        </li>
        <li>
          İnternet, santral ve güvenlik sisteminin nakil randevusunu alın. Bu
          kalem mobilyadan geç kalır.
        </li>
        <li>
          Site/plaza yönetimine taşıma saatini ve asansör kullanımını yazın.
          Birçok iş merkezinde yalnızca belirli saatlerde izin vardır.
        </li>
      </ul>

      <h2>Taşınmadan 1 hafta önce</h2>
      <ul>
        <li>
          Çalışanlara kişisel çekmece talimatı verin: kupa, bitki, çerçeve kendi
          kutularına; &ldquo;masa üstü olduğu gibi&rdquo; taşınmaz.
        </li>
        <li>
          Bilgisayarlar yedeklensin. Taşıma hasarından bağımsız, kablo kopması
          bile bir gün kaybettirir.
        </li>
        <li>
          Sunucu, NAS ve kayıt cihazı varsa bunları ayrı, kısa bir listedeyin.
          Bu parçalar genel eşya turuna karışmamalı.
        </li>
        <li>
          Tabela, klima gazı, sabit bölme gibi söküm gerektirenler baştan
          söylenmeli. Sürpriz söküm, günü uzatır.
        </li>
      </ul>

      <h2>Taşınma günü ofiste</h2>
      <ol>
        <li>Bir yetkili (ofis müdürü veya idari işler) baştan sona orada olsun.</li>
        <li>Renkli etiket veya oda kodu fiilen kutunun üzerinde olsun.</li>
        <li>
          Kırılacaklar (ekran, yazıcı camı) ayrı turda çıksın; koltuklarla aynı
          istifte ezilmesin.
        </li>
        <li>
          Eski ofiste son tur: kablo kanalı, kasa, mutfak, depo. Unutulan
          parça ertesi gün ikinci sefer demektir.
        </li>
      </ol>
      <p>
        Gün içi ritim ev taşımayla benzer. Ayrıntılı sabah listesi için{" "}
        <Link href="/rehber/tasinma-gunu-kontrol-listesi">
          taşınma günü kontrol listesi
        </Link>{" "}
        yazısına bakın. Ofiste ekstra olan, birim sırası ve IT parçalarıdır.
      </p>

      <h2>Başka ile taşınan ofis</h2>
      <p>
        Yükleme ve teslim günü ayrılır. Pazartesi açılışı için teslimin hangi
        gün biteceği baştan yazılmalıdır. Rota planı{" "}
        <Link href="/sehirler-arasi-nakliyat">
          {city} şehirler arası nakliyat
        </Link>{" "}
        ve süreç{" "}
        <Link href="/rehber/sehirler-arasi-ev-tasima">
          şehirler arası ev nasıl taşınır
        </Link>{" "}
        yazısıyla aynı mantıktadır; ofiste teslim sonrası kurulum sırası daha
        katıdır.
      </p>

      <h2>Teklif karşılaştırmasında ofise özel sorular</h2>
      <ul>
        <li>Masa ve dolap söküm-kurulum fiyata dahil mi?</li>
        <li>Hafta sonu çalışılacaksa ek ücret var mı, yok mu — yazılı?</li>
        <li>Asansör rezervasyonu kimin sorumluluğu?</li>
        <li>Arşiv kutusu tahmini doğru mu, yoksa &ldquo;bir bakıp görürüz&rdquo; mü?</li>
      </ul>
      <p>
        Genel karşılaştırma çerçevesi{" "}
        <Link href="/rehber/nakliye-firmasi-secerken">
          nakliye firması seçerken
        </Link>{" "}
        yazısında. Ofis teklifinde kapsam kayması, ev teklifinden daha pahalıya
        patlar çünkü ikinci bir sefer mesai demektir.
      </p>
    </GuideShell>
  );
}
