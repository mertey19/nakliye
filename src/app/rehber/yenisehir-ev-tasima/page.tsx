import type { Metadata } from "next";
import Link from "next/link";

import { GuideShell } from "@/components/sections/GuideShell";
import { guideBySlug } from "@/config/guides";
import { absoluteUrl } from "@/config/site";
import { business } from "@/config/business";

const guide = guideBySlug("yenisehir-ev-tasima")!;
const city = business.primaryCity;

/**
 * Arama amacı: "yenişehir'de ev taşıma", "yenişehir evden eve",
 * "çiftlikköy eşya taşıma", "pozcu taşınma".
 *
 * Ticari "[ilçe] nakliyat" /hizmet-bolgeleri'ndedir. Bu yazı HOW; H1
 * "Yenişehir Nakliyat" değildir.
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
        {business.name} adresi Yenişehir Çiftlikköy&apos;de. Bu yazı bir
        &ldquo;Yenişehir nakliyat&rdquo; satış sayfası değil; ilçede evi taşırken
        işi uzatan şeylerin listesi. Ticari teklif{" "}
        <Link href="/yenisehir-nakliye">Mersin Yenişehir nakliye</Link> sayfasında.
        Tüm ilçeler için{" "}
        <Link href="/hizmet-bolgeleri">{city} hizmet bölgeleri</Link>.
      </p>

      <h2>Mahalleye göre ne değişir?</h2>
      <ul>
        <li>
          <strong>Çiftlikköy:</strong> Kampüs çevresi ve yeni konut bir arada.
          Dönem başı ve sonunda öğrenci çıkışı aynı günlere yığılır; yer ayırmak
          fiyat pazarlığından önce gelir. Öğrenci evi ölçeği{" "}
          <Link href="/rehber/ogrenci-evi-nasil-tasinir">
            öğrenci evi nasıl taşınır
          </Link>{" "}
          yazısında.
        </li>
        <li>
          <strong>Pozcu ve Palmiye:</strong> Cadde üzeri ve ara sokak sıkışık.
          GMK / Uğur Mumcu hattında mesai saatinde kamyon için yer bulunmaz.
          Taşımayı sabah erken veya öğlen arası planlamak, tur süresini kısaltır.
        </li>
        <li>
          <strong>Güvenevler ve Batıkent:</strong> Site stoğu daha fazla. Asansör
          çoğu binada vardır ama koltuk yine sığmayabilir; ölçü baştan bakılır.
        </li>
      </ul>

      <h2>Site girişinde asıl sürpriz</h2>
      <p>
        Yenişehir&apos;de işi bozan şey yokuş değil, çoğu zaman{" "}
        <strong>bariyer ve saat kuralı</strong>. Yönetim taşımayı 09:00–17:00
        aralığına sıkıştırır; cumartesi yasak olan site az değil. Rampa dar ise
        araç kapıya yanaşamaz, her kutu yürür.
      </p>
      <ul>
        <li>Taşınma gününü yönetime yazın; asansör minderi isteyin.</li>
        <li>Ziyaretçi otoparkı doluysa kamyon için yer ayırtın.</li>
        <li>
          Alt kat depo / sığınak eşyası unutulmasın; son turda çıkar.
        </li>
      </ul>

      <h2>Trafik ve park</h2>
      <p>
        Pozcu–Müftü köprüsü–GMK üçgeni akşam saatlerinde durur. Araç binaya 40
        metre yanaşamıyorsa süre, kat sayısından bağımsız uzar. Komşu veya
        kapıcıyla yarım saatlik park yeri konuşmak, ekip beklemesinden ucuza
        gelir.
      </p>

      <h2>Asansör var diye iş bitmez</h2>
      <p>
        Yeni sitelerde asansör olsa da gardırop kabine sığmaz; merdiven
        boşluğu ayrı ölçülür. Plan{" "}
        <Link href="/rehber/asansorsuz-ev-nasil-tasinir">
          asansörsüz ev nasıl taşınır
        </Link>{" "}
        yazısındaki merdiven mantığıyla aynıdır — asansör &ldquo;var&rdquo;
        demek yetmez, eşya sığıyor mu sorulur.
      </p>

      <h2>Başka ilçeye gidiş</h2>
      <p>
        Yenişehir çıkışlı Mezitli veya Akdeniz varışları şehir içidir; aynı gün
        teslim çoğu zaman mümkün. Toroslar&apos;a yokuş ve dar sokak eklenir —{" "}
        <Link href="/rehber/toroslar-ev-tasima">
          Toroslar&apos;da ev taşırken
        </Link>{" "}
        o farkı anlatır. İl dışına gidiyorsanız{" "}
        <Link href="/rehber/sehirler-arasi-ev-tasima">
          şehirler arası ev nasıl taşınır
        </Link>
        .
      </p>

      <h2>Teklif için üç bilgi yeter</h2>
      <ol>
        <li>Çıkış mahallesi (Çiftlikköy, Pozcu…)</li>
        <li>Kat, asansör, site saati</li>
        <li>Tarih</li>
      </ol>
      <p>
        Hizmet olarak süreç{" "}
        <Link href="/evden-eve-nakliyat">{city} evden eve nakliyat</Link>{" "}
        sayfasında. Sahil bandı için{" "}
        <Link href="/rehber/mezitli-ev-tasima">Mezitli rehberi</Link>, merkez
        için{" "}
        <Link href="/rehber/akdeniz-ev-tasima">Akdeniz rehberi</Link>.
      </p>
    </GuideShell>
  );
}
