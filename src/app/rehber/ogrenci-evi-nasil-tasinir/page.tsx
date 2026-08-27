import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("ogrenci-evi-nasil-tasinir")!;
const city = business.primaryCity;

/**
 * Arama amacı: "öğrenci evi taşıma", "öğrenci evi nasıl taşınır",
 * "dönem sonu eşya taşıma", "stüdyo taşıma".
 *
 * Yerel bağlam: Çiftlikköy / MEÜ çevresi firmanın adresine komşu; dönem
 * başı-sonu yoğunluğu gerçek. İlçe doorway sayfası değil, durum rehberi.
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
        Öğrenci evi taşımak, 4+1 aile evini küçültmek değildir. Çoğu zaman az
        eşya, kısa süre, paylaşımlı daire ve{" "}
        <strong>dönem sonuna yığılan aynı gün</strong> vardır. {city}&apos;de
        bu yığılma özellikle eylül başı ile dönem bitiminde görülür; yer
        ayırmak için tarihi netleştirmek, fiyat pazarlığından önce gelir.
      </p>

      <h2>Parça eşya mı, tam ev mi?</h2>
      <p>
        Karar eşya listesine göre. Tipik ayrım:
      </p>
      <ul>
        <li>
          <strong>Parça eşya:</strong> yatak, masa, buzdolabı, birkaç koli.
          Ev arkadaşı kalıyor, siz çıkıyorsunuz.
        </li>
        <li>
          <strong>Tam ev:</strong> stüdyo veya 1+1&apos;in tamamı sizin; dolap,
          koltuk, mutfak da gidiyor.
        </li>
      </ul>
      <p>
        Emin değilseniz listeyi yazın. {city} için iki hizmet sayfası:{" "}
        <Link href="/parca-esya-tasima">parça eşya taşıma</Link> ve{" "}
        <Link href="/evden-eve-nakliyat">evden eve nakliyat</Link>. Yanlış
        ölçek seçmek, ya fazla ödemek ya da güne sığmamak demektir.
      </p>

      <h2>Paylaşımlı evde kim neyi taşır?</h2>
      <ul>
        <li>
          Ortak koltuk/buzdolabı kimin? Bunu ev arkadaşlarıyla yazılı netleştirin.
          Taşınma sabahı &ldquo;o da gitsin&rdquo; tartışması ekibi bekletir.
        </li>
        <li>
          Kapı parolası, site kaydı ve asansör izni çıkan kişiye aittir; yeni
          gelen ev arkadaşı bunu bilmeyebilir.
        </li>
        <li>
          Depozito fotoğraflarını (duvar, dolap, sayaç) yüklemeden önce çekin.
          Nakliye hasarı ile kira hasarı karışmasın.
        </li>
      </ul>

      <h2>Dönem sonu zamanlaması</h2>
      <p>
        Aynı hafta çok öğrenci çıkar. Cuma öğleden sonra ve cumartesi dolu
        olur. Mümkünse:
      </p>
      <ul>
        <li>Tarihi bir hafta öne veya içine kaydırın.</li>
        <li>
          Sabah erken yükleme isteyin; öğleden sonra park ve asansör kuyruğu
          uzar.
        </li>
        <li>
          Kampüs çevresi (ör. Çiftlikköy) dar sokak ve öğrenci sitesi
          otoparkıyla bilinir. Aracın yanaşacağı yer baştan bakılmalı.
        </li>
      </ul>

      <h2>Az eşyada bile atlanmaması gerekenler</h2>
      <ul>
        <li>
          Buzdolabı ve çamaşır makinesi varsa su/buz hazırlığı{" "}
          <Link href="/rehber/beyaz-esya-nasil-tasinir">
            beyaz eşya nasıl taşınır
          </Link>{" "}
          yazısındaki gibidir. &ldquo;Öğrenci evi, az eşya&rdquo; bu adımı
          iptal etmez.
        </li>
        <li>
          Kitap ve mutfak eşyası ağırdır; büyük koli kullanmayın. Koli yöntemi{" "}
          <Link href="/rehber/esyalar-nasil-paketlenir">
            eşyalar nasıl paketlenir
          </Link>
          .
        </li>
        <li>
          Kimlik, laptop ve evrak yanınızda. Araç bir tur yaparken siz otobüse
          binseniz de bu çanta sizinle kalır.
        </li>
      </ul>

      <h2>Başka ile giden öğrenci</h2>
      <p>
        Dönem bitiminde {city}&apos;den memlekete giden tam ev veya kısmi yük,
        şehirler arası plana girer. Aynı gün teslim her rotada mümkün değil.{" "}
        <Link href="/rehber/sehirler-arasi-ev-tasima">
          Şehirler arası ev nasıl taşınır
        </Link>{" "}
        yazısındaki yükleme-teslim ayrımına bakın.
      </p>

      <h2>Teklif için kısa mesaj şablonu</h2>
      <p>WhatsApp&apos;ta şu dörtlü yeter:</p>
      <ol>
        <li>Çıkış–varış (ilçe veya il)</li>
        <li>Ne gidiyor? (ör. yatak, masa, 8 koli, mini buzdolabı)</li>
        <li>Kat / asansör</li>
        <li>Tarih</li>
      </ol>
      <p>
        Fiyatın neden değiştiğini merak ediyorsanız{" "}
        <Link href="/rehber/nakliyat-fiyati-nasil-hesaplanir">
          nakliyat fiyatı neye göre belirlenir
        </Link>
        . Öğrenci evi &ldquo;otomatik ucuz&rdquo; değildir; 4. kat asansörsüz
        stüdyo, zemin kattaki 2+1&apos;den uzun sürebilir.
      </p>
    </GuideShell>
  );
}
