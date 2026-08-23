import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { absoluteUrl, site } from "@/config/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { hasEmail, hasPhone, phoneLabel } from "@/lib/business";

export const metadata: Metadata = {
  title: `Gizlilik Politikası | ${business.name}`,
  description: `${business.name} web sitesinde hangi verilerin işlendiği, çerez kullanımı ve teklif formunun nasıl çalıştığı hakkında bilgilendirme.`,
  alternates: { canonical: absoluteUrl("/gizlilik-politikasi") },
  robots: { index: true, follow: true },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Gizlilik Politikası", path: "/gizlilik-politikasi" },
];

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container>
          <Breadcrumbs crumbs={crumbs} />
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <article className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            Gizlilik Politikası
          </h1>

          <div className="prose-tr mt-6">
            <h2>Bu site hangi verileri topluyor?</h2>
            <p>
              Bu web sitesinde üyelik sistemi, kullanıcı hesabı veya veri tabanına
              kaydedilen bir iletişim formu bulunmamaktadır.
            </p>

            <h2>Teklif formu nasıl çalışıyor?</h2>
            <p>
              <Link href="/teklif-al">Teklif al</Link> sayfasındaki form,
              girdiğiniz bilgileri bu sitenin sunucusuna göndermez. Form
              tamamlandığında bilgiler, kendi cihazınızda hazır bir mesaja
              dönüştürülür ve mesajı kendi WhatsApp veya e-posta uygulamanızdan
              siz gönderirsiniz. Yani taşınma bilgileriniz, siz göndermeye karar
              vermediğiniz sürece {business.name}&apos;ye ulaşmaz.
            </p>
            <p>
              Mesajı gönderdiğinizde, ilettiğiniz bilgiler ilgili kanalın
              (WhatsApp veya e-posta) kendi koşulları altında iletilir ve
              tarafımızca yalnızca taşınma talebinizi değerlendirmek amacıyla
              kullanılır.
            </p>

            <h2>Çerezler ve ölçümleme</h2>
            {site.gaId ? (
              <>
                <p>
                  Sitede ziyaret istatistiklerini görmek için Google Analytics 4
                  kullanılmaktadır. Ölçümleme; IP anonimleştirme açık, reklam
                  kişiselleştirme sinyalleri kapalı olacak şekilde
                  yapılandırılmıştır.
                </p>
                <p>
                  Ölçümlemede yalnızca hangi sayfaların görüntülendiği, telefon /
                  WhatsApp butonlarına tıklanıp tıklanmadığı ve teklif formunun
                  hangi adımına kadar ilerlendiği gibi teknik bilgiler toplanır.
                  Formda yazdığınız <strong>ad, telefon, adres ve not
                  içerikleri ölçümleme sistemine gönderilmez.</strong>
                </p>
              </>
            ) : (
              <p>
                Bu sitede şu anda üçüncü taraf ölçümleme (analytics) aracı
                çalışmamaktadır. İleride eklenmesi durumunda bu metin
                güncellenecektir.
              </p>
            )}

            <h2>Tarayıcı depolaması</h2>
            <p>
              Siteye hangi kaynaktan geldiğinizi (örneğin bir arama motoru veya
              reklam bağlantısı) anlayabilmek için bu bilgi, oturum süresince
              tarayıcınızın oturum depolamasında tutulur. Tarayıcı sekmesini
              kapattığınızda silinir ve kimliğinizi belirleyen bir bilgi içermez.
            </p>

            <h2>Üçüncü taraf bağlantıları</h2>
            <p>
              Sitede WhatsApp, Google Haritalar ve sosyal medya hesaplarımıza
              bağlantılar bulunabilir. Bu bağlantılara tıkladığınızda ilgili
              platformun kendi gizlilik koşulları geçerli olur.
            </p>

            <h2>İletişim</h2>
            <p>
              Gizlilikle ilgili sorularınız için bize ulaşabilirsiniz:
              {hasPhone ? ` Telefon: ${phoneLabel}.` : ""}
              {hasEmail ? ` E-posta: ${business.email}.` : ""}
              {!hasPhone && !hasEmail ? (
                <>
                  {" "}
                  <Link href="/iletisim">İletişim sayfası</Link>.
                </>
              ) : null}
            </p>
            <p>
              Kişisel verilerin işlenmesine ilişkin ayrıntılı bilgilendirme için{" "}
              <Link href="/kvkk-aydinlatma-metni">KVKK aydınlatma metni</Link>
              &apos;ni inceleyebilirsiniz.
            </p>
          </div>
        </article>
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
