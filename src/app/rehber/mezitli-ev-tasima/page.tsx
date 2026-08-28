import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("mezitli-ev-tasima")!;
const city = business.primaryCity;

/**
 * Arama amacı: "mezitli'de ev taşıma", "mezitli evden eve",
 * "viranşehir taşınma", "tece eşya taşıma".
 *
 * Ticari "mezitli nakliyat" /hizmet-bolgeleri. Bu yazı HOW.
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
        Mezitli&apos;de taşımayı belirleyen şey oda sayısı kadar,{" "}
        <strong>sahil sitesi mi eski mahalle mi</strong> olduğudur. Viranşehir
        ile Tece aynı ilçedir; araç yanaşması ve asansör gerçeği ayrıdır. Bu
        yazı satış sayfası değil. İlçe ticari kaydı{" "}
        <Link href="/hizmet-bolgeleri">{city} hizmet bölgeleri</Link>nde.
      </p>

      <h2>Sahil bandı: Viranşehir ve yeni siteler</h2>
      <p>
        Denize paralel sitelerde üç şey tekrarlır: bariyer, dar rampa, yazın
        dolu ziyaretçi otoparkı. Yönetim taşımayı hafta içi gündüze kilitler;
        cuma akşamı veya bayram öncesi yer bulunmaz. Asansör çoğu yeni blokta
        vardır ama perde koltuğu yine merdivenden iner.
      </p>
      <ul>
        <li>Site yönetimine gün ve saat yazın; asansör minderi isteyin.</li>
        <li>
          Rampa dönüşü kamyona yetmiyorsa eşya yürür — bunu adresi paylaşırken
          söyleyin.
        </li>
        <li>
          Yazlık / ikinci ev ise Mayıs–Eylül aynı sitelerde üst üste biner.
          Tarihi kaydırmak, fiyat kırmaktan daha işe yarar.
        </li>
      </ul>

      <h2>Tece ve Davultepe: daha eski stok</h2>
      <p>
        Burada asansörsüz 4–5 kat ve dar ara sokak daha sık. Denize inen yokuş
        yağmurda kayar; ağır beyaz eşya için ekstra el gerekir. Cihaz hazırlığı{" "}
        <Link href="/rehber/beyaz-esya-nasil-tasinir">
          beyaz eşya nasıl taşınır
        </Link>
        ; merdiven planı{" "}
        <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
          asansörsüz ev nasıl taşınır
        </Link>
        .
      </p>

      <h2>D-400 ve mesafe</h2>
      <p>
        Atatürk Caddesi (D-400) Mezitli&apos;yi doğu–batı keser. Mesai saatinde
        Yenişehir veya Akdeniz&apos;e gidiş, haritadaki kilometreden uzun sürer.
        Aynı gün teslim hâlâ şehir içidir; ama yükleme saatini trafik dalgasının
        dışına almak gerekir. Fiyat etkeni olarak mesafe{" "}
        <Link href="/rehber/nakliyat-fiyati-nasil-hesaplanir">
          nakliyat fiyatı neye göre belirlenir
        </Link>{" "}
        yazısında.
      </p>

      <h2>Parça eşya burada neden sık?</h2>
      <p>
        Sahil sitelerinde tek buzdolabı, koltuk veya birkaç koli (yazlığa ek
        eşya) tam ev paketinden sık istenir. Liste kısaysa{" "}
        <Link href="/parca-esya-tasima">{city} parça eşya taşıma</Link>; dolu
        2+1 veya 3+1 ise{" "}
        <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>.
      </p>

      <h2>Komşu ilçeler</h2>
      <p>
        Mezitli–Yenişehir hattı düz ve yoğundur; site kuralları Yenişehir
        Pozcu&apos;ya benzer —{" "}
        <Link href="/rehber/yenisehir-ev-tasima">
          Yenişehir&apos;de ev taşırken
        </Link>
        . Merkezdeki park yasağı ve eski bina için{" "}
        <Link href="/rehber/akdeniz-ev-tasima">Akdeniz rehberi</Link>; yokuş
        için{" "}
        <Link href="/rehber/toroslar-ev-tasima">Toroslar rehberi</Link>.
      </p>

      <h2>Teklifte söylemeniz gerekenler</h2>
      <ol>
        <li>Mahalle (Viranşehir, Tece, Davultepe…)</li>
        <li>Site mi apartman mı; rampa / bariyer</li>
        <li>Kat ve asansör; yazlık mı kışlık mı</li>
        <li>Tarih — özellikle yaz ayları</li>
      </ol>
    </GuideShell>
  );
}
