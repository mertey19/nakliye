import type { Metadata } from "next";
import Link from "next/link";
import { ScrollExperience } from "@/components/3d/ScrollExperience";
import { JourneyActions } from "@/components/ui/JourneyActions";
import { HomeLocation } from "@/components/sections/HomeLocation";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/JsonLd";
import { featuredGuides } from "@/config/guides";
import { services } from "@/config/services";
import { districtLocationLinks } from "@/config/locations";
import { homeDescription, homeH1, homeTitle } from "@/config/home";
import { absoluteUrl } from "@/config/site";
import { breadcrumbSchema, faqSchema, serviceSchema, ORGANIZATION_ID } from "@/lib/schema";
import "./journey.css";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: homeTitle, description: homeDescription, url: absoluteUrl("/"), locale: "tr_TR", type: "website" },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription, images: [absoluteUrl("/opengraph-image")] },
};

const faqItems = [
  { question: "Mersin'de hangi bölgelere hizmet veriyorsunuz?", answer: "Yenişehir, Çiftlikköy'deki merkezimizden Akdeniz, Mezitli, Toroslar ve Yenişehir ilçelerine hizmet veriyoruz. Mersin içi ev ve ofis taşımalarının yanı sıra şehirler arası nakliyat da planlıyoruz." },
  { question: "Nakliye fiyatı nasıl belirleniyor?", answer: "Eşya miktarı, mesafe, kat ve asansör durumu, paketleme kapsamı ve aracın binaya yaklaşımı değerlendirilir. Bu bilgileri telefon, WhatsApp veya teklif formundan ilettiğinizde taşınmanıza özel ücretsiz teklif hazırlıyoruz." },
  { question: "Paketleme ve mobilya sökümü yapılıyor mu?", answer: "İhtiyacınıza göre kırılabilir eşya ve elektronik ürünlerin paketlenmesini, mobilyaların söküm ve kurulumunu planlıyoruz. Hangi işlemlerin dahil olduğu taşıma öncesinde birlikte netleştirilir." },
  { question: "Mersin'den başka şehirlere taşıma yapıyor musunuz?", answer: "Evet. Mersin çıkışlı şehirler arası ev ve ofis taşımaları için çıkış adresini, varış şehrini, eşya miktarını ve taşınma tarihinizi paylaşabilirsiniz. Rota ve teslim planını bu bilgilere göre oluşturuyoruz." },
  { question: "Makine veya motosiklet taşımak için hangi bilgiler gerekli?", answer: "Taşınacak yükün ölçüleri, ağırlığı, fotoğrafları ve iki adresin yükleme koşulları gereklidir. Uygun araç, ekipman ve sabitleme ihtiyacı değerlendirildikten sonra taşıma kapsamı ve uygunluk teyit edilir." },
];

export default function HomePage() {
  return <>
    <ScrollExperience>
      <section id="baslangic" data-journey-chapter className="journey-panel journey-panel--intro" aria-labelledby="journey-title">
        <div className="journey-copy">
          <p className="journey-eyebrow"><i /> {"MERSİN'DEN TÜRKİYE'YE"}</p>
          <p className="journey-brand" aria-hidden="true">KANSU CAN<br /><span>NAKLİYE<span className="journey-period">.</span></span></p>
          <h1 id="journey-title">{homeH1}</h1>
          <p className="journey-tagline">Yükünüz bizimle güvende.</p>
          <p className="journey-description">Her eşyanın bir hikâyesi var.<br />Biz o hikâyeyi yeni adresine taşıyoruz.</p>
          <JourneyActions location="cinematic_intro" />
        </div>
        <a href="#ev-tasima" className="journey-scroll-cue"><span>↓</span> YOLCULUĞU KEŞFET</a>
        <p className="journey-scene-caption">36°46′ N · 34°33′ E<br /><span>{"AKDENİZ'DE BİR BAŞLANGIÇ"}</span></p>
      </section>
      <section id="ev-tasima" data-journey-chapter className="journey-panel" aria-labelledby="ev-baslik">
        <div className="journey-copy"><p className="journey-eyebrow">01 / EVDEN EVE NAKLİYAT</p>
          <h2 id="ev-baslik">EVİNİZİ DEĞİL,<br /><span>HAYATINIZI</span><br />TAŞIYORUZ.</h2>
          <p className="journey-description">Eşyalarınızı profesyonel ekip ve özenle planlanan taşıma süreçleriyle yeni adresinize ulaştırıyoruz.</p>
          <div className="journey-tags"><span>Özenli paketleme</span><span>Planlı yükleme</span><span>Güvenli teslim</span></div>
          <JourneyActions compact location="cinematic_home" /><Link className="journey-detail-link" href="/evden-eve-nakliyat">Evden eve nakliyat hizmetini incele ↗</Link>
        </div>
      </section>
      <section id="ofis-tasima" data-journey-chapter className="journey-panel" aria-labelledby="ofis-baslik">
        <div className="journey-copy"><p className="journey-eyebrow">02 / OFİS TAŞIMACILIĞI</p>
          <h2 id="ofis-baslik">ADRESİNİZ<br />DEĞİŞSİN.<br /><span>İŞİNİZ DURMASIN.</span></h2>
          <p className="journey-description">Masalardan elektronik ekipmanlara, ofisinizi minimum kesinti hedefiyle taşıyoruz. Her detay, işinize kaldığınız yerden devam etmeniz için.</p>
          <JourneyActions compact location="cinematic_office" /><Link className="journey-detail-link" href="/ofis-tasima">Ofis taşıma planını incele ↗</Link>
        </div>
      </section>
      <section id="fabrika-tasima" data-journey-chapter className="journey-panel" aria-labelledby="fabrika-baslik">
        <div className="journey-copy"><p className="journey-eyebrow">03 / FABRİKA & AĞIR EŞYA</p>
          <h2 id="fabrika-baslik">BÜYÜK YÜKLER.<br /><span>PROFESYONEL</span><br />ÇÖZÜMLER.</h2>
          <p className="journey-description">Endüstriyel taşımada her yükün kendi planı vardır. Makine ölçüleri, ağırlık ve saha koşullarına göre araç ve ekipman ihtiyacını birlikte değerlendiriyoruz.</p>
          <div className="journey-tags"><span>Saha değerlendirmesi</span><span>Yüke özel planlama</span></div>
          <JourneyActions compact location="cinematic_factory" />
        </div>
      </section>
      <section id="arac-tasima" data-journey-chapter className="journey-panel" aria-labelledby="arac-baslik">
        <div className="journey-copy"><p className="journey-eyebrow">04 / MOTOSİKLET & ARAÇ TAŞIMA</p>
          <h2 id="arac-baslik">ARACINIZ DA<br /><span>BİZİMLE</span><br />GÜVENDE.</h2>
          <p className="journey-description">İki teker ya da dört teker; doğru yükleme ve sabitleme planıyla yola çıkıyoruz. Aracınızın bilgilerini iletin, taşıma uygunluğunu ve koşullarını netleştirelim.</p>
          <JourneyActions compact location="cinematic_vehicle" />
        </div>
      </section>
      <section id="turkiye-rotalari" data-journey-chapter className="journey-panel" aria-labelledby="rota-baslik">
        <div className="journey-copy"><p className="journey-eyebrow">05 / ŞEHİRLER ARASI NAKLİYAT</p>
          <h2 id="rota-baslik">{"MERSİN'DEN"}<br /><span>{"TÜRKİYE'NİN"}</span><br />HER NOKTASINA.</h2>
          <p className="journey-description">Mesafeler değişir, gösterdiğimiz özen değişmez. Mersin çıkışlı taşınmanız için rotayı ve teslim sürecini beraber planlıyoruz.</p>
          <p className="journey-cities">İstanbul · Ankara · İzmir · Antalya · Adana</p>
          <JourneyActions compact location="cinematic_routes" /><Link className="journey-detail-link" href="/sehirler-arasi-nakliyat">Şehirler arası taşımayı incele ↗</Link>
        </div>
      </section>
      <section id="yola-hazir" data-journey-chapter className="journey-panel journey-panel--final" aria-labelledby="hazir-baslik">
        <div className="journey-copy"><p className="journey-eyebrow">SONRAKİ DURAK: YENİ ADRESİNİZ</p>
          <h2 id="hazir-baslik">TAŞINMAYA<br /><span>HAZIR MISINIZ?</span></h2>
          <p className="journey-description">Dakikalar içinde ücretsiz teklif alın.<br />Siz yeni başlangıcınızı düşünün, taşıma planını birlikte hazırlayalım.</p>
          <JourneyActions location="cinematic_final" /><a className="journey-detail-link" href="#iletisim-ve-detaylar">Konum, hizmet detayları ve sık sorulanlar ↓</a>
        </div>
      </section>
    </ScrollExperience>
    <div id="iletisim-ve-detaylar" className="journey-details">
      <section className="journey-local-intro" aria-labelledby="yerel-baslik">
        <div><p className="journey-eyebrow">GERÇEK EKİP. GERÇEK İLETİŞİM.</p><h2 id="yerel-baslik">{homeH1}</h2></div>
        <div><p>{"Kansu Can Nakliye, Yenişehir Çiftlikköy'deki merkezinden Mersin içi ve şehirler arası nakliye planlar. Akdeniz, Mezitli, Toroslar ve Yenişehir'de ev, ofis ve parça eşya taşıma ihtiyaçlarınız için yanınızdayız."}</p><p>Profesyonel nakliyat, doğru hazırlıkla başlar. Taşınma tarihi, adresler ve eşya bilgilerini paylaşın; paketleme, ekip ve araç ihtiyacını netleştirelim.</p><Link className="journey-detail-link" href="/hizmet-bolgeleri">Hizmet bölgelerimiz ↗</Link></div>
      </section>
      <nav className="journey-service-links" aria-label="Hizmet detayları">{services.map(service => <Link key={service.slug} href={`/${service.slug}`}>{service.navLabel}<span>↗</span></Link>)}</nav>
      <section className="journey-local-intro" aria-labelledby="bolge-baslik">
        <div>
          <p className="journey-eyebrow">HİZMET BÖLGELERİMİZ</p>
          <h2 id="bolge-baslik">Mersin ve çevre ilçeler</h2>
        </div>
        <div>
          <p>Taşımayı ilçeye indirmek, teklifi de netleştirir. Mersin, Mezitli, Yenişehir, Erdemli, Silifke ve Tarsus için ayrı ticari sayfalar var; bilgi rehberleriyle karışmaz.</p>
          <nav className="journey-service-links" aria-label="Hizmet bölgelerimiz">
            {districtLocationLinks.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`}>{location.navLabel}<span>↗</span></Link>
            ))}
          </nav>
          <Link className="journey-detail-link" href="/mersin-ucuz-nakliye">Mersin uygun fiyatlı nakliye ↗</Link>
        </div>
      </section>
      <HomeLocation />
      <section className="journey-faq" aria-labelledby="sorular-baslik"><p className="journey-eyebrow">AKLINIZDAKİ SORULAR</p><h2 id="sorular-baslik">Birlikte netleştirelim.</h2><Faq items={faqItems} /></section>
      <details className="journey-more"><summary>Ekibimiz ve taşınma rehberleri <span>+</span></summary><div className="journey-gallery"><Gallery /></div><div className="journey-guide-links">{featuredGuides.map(guide => <Link key={guide.slug} href={`/rehber/${guide.slug}`}>{guide.h1} ↗</Link>)}<Link href="/rehber">Tüm taşınma rehberleri ↗</Link></div></details>
    </div>
    <JsonLd data={faqSchema(faqItems)} />
    <JsonLd data={breadcrumbSchema([{ name: "Ana Sayfa", path: "/" }])} />
    {services.map(service => <JsonLd key={service.slug} data={serviceSchema(service)} />)}
    {["Fabrika ve Ağır Eşya Taşımacılığı", "Motosiklet ve Araç Taşımacılığı"].map((name, index) => <JsonLd key={name} data={{ "@context": "https://schema.org", "@type": "Service", name: `Mersin ${name}`, serviceType: name, provider: { "@id": ORGANIZATION_ID }, areaServed: { "@type": "City", name: "Mersin" }, url: `${absoluteUrl("/")}#${index ? "arac-tasima" : "fabrika-tasima"}`, description: "Yük ve saha bilgilerine göre uygunluğu değerlendirilerek planlanan taşıma hizmeti." }} />)}
  </>;
}
