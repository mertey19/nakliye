import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

import { business } from "@/config/business";
import { absoluteUrl } from "@/config/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import {
  addressOneLine,
  hasAddress,
  hasEmail,
  hasPhone,
  phoneLabel,
} from "@/lib/business";

export const metadata: Metadata = {
  title: `KVKK Aydınlatma Metni | ${business.name}`,
  description: `${business.name} tarafından kişisel verilerin işlenmesine ilişkin 6698 sayılı Kanun kapsamında aydınlatma metni.`,
  alternates: { canonical: absoluteUrl("/kvkk-aydinlatma-metni") },
  robots: { index: true, follow: true },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "KVKK Aydınlatma Metni", path: "/kvkk-aydinlatma-metni" },
];

export default function KvkkPage() {
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
            KVKK Aydınlatma Metni
          </h1>

          <div className="prose-tr mt-6">
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;)
              kapsamında, kişisel verilerinizin hangi durumlarda işlendiği
              hakkında sizi bilgilendirmek isteriz.
            </p>

            <h2>Veri sorumlusu</h2>
            <p>
              {business.legalName || business.name}
              {hasAddress ? `, ${addressOneLine}` : ""}
              {hasPhone ? `, Telefon: ${phoneLabel}` : ""}
              {hasEmail ? `, E-posta: ${business.email}` : ""}.
            </p>

            <h2>Hangi veriler, hangi yolla işleniyor?</h2>
            <p>
              Bu web sitesi üzerinden doğrudan kişisel veri toplanmamaktadır.
              Sitedeki teklif formu, girdiğiniz bilgileri sunucuya göndermez;
              bilgiler kendi cihazınızda bir mesaja dönüştürülür ve siz
              göndermeye karar verirseniz WhatsApp veya e-posta yoluyla bize
              ulaşır.
            </p>
            <p>
              Bize telefon, WhatsApp veya e-posta ile ulaştığınızda; ad, iletişim
              numarası, taşınma adresleri ve taşınma talebine ilişkin
              paylaştığınız bilgiler tarafımıza iletilmiş olur.
            </p>

            <h2>İşleme amacı</h2>
            <ul>
              <li>Taşınma talebinizi değerlendirmek ve fiyat teklifi hazırlamak</li>
              <li>Hizmetin planlanması ve yürütülmesi</li>
              <li>Talebiniz doğrultusunda sizinle iletişim kurmak</li>
            </ul>

            <h2>Hukuki sebep</h2>
            <p>
              Kişisel verileriniz; KVKK m.5/2-c uyarınca bir sözleşmenin kurulması
              veya ifasıyla doğrudan doğruya ilgili olması ve KVKK m.5/2-f
              uyarınca meşru menfaat kapsamında, talebinize cevap verilebilmesi
              amacıyla işlenir.
            </p>

            <h2>Aktarım</h2>
            <p>
              Taşınma talebinizi WhatsApp üzerinden iletmeniz halinde, mesajlaşma
              ilgili platformun altyapısı üzerinden gerçekleşir ve o platformun
              kendi koşulları geçerli olur. Bunun dışında verileriniz üçüncü
              kişilerle paylaşılmaz.
            </p>

            <h2>Saklama süresi</h2>
            <p>
              Talebiniz sonuçlandıktan sonra iletişim kayıtları, ilgili mevzuatta
              öngörülen süreler ve olası uyuşmazlıklara ilişkin zamanaşımı
              süreleri boyunca saklanır; sürenin sonunda silinir veya anonim hale
              getirilir.
            </p>

            <h2>Haklarınız</h2>
            <p>KVKK m.11 uyarınca:</p>
            <ul>
              <li>Kişisel verinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>Şartları oluştuğunda silinmesini veya yok edilmesini isteme,</li>
              <li>
                İşlemenin hukuka aykırı olması sebebiyle zarara uğramanız halinde
                zararın giderilmesini talep etme
              </li>
            </ul>
            <p>
              haklarına sahipsiniz. Taleplerinizi{" "}
              <Link href="/iletisim">iletişim sayfasındaki</Link> kanallar
              üzerinden bize iletebilirsiniz.
            </p>

            <p>
              Çerez ve ölçümleme uygulamaları hakkında ayrıntılı bilgi için{" "}
              <Link href="/gizlilik-politikasi">gizlilik politikası</Link>{" "}
              sayfasına bakabilirsiniz.
            </p>
          </div>
        </article>
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
