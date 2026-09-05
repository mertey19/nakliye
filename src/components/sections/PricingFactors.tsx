import { QuoteButton, WhatsAppButton } from "../cta/ConversionButtons";

/**
 * "Fiyat nasıl hesaplanır?" bölümü.
 * Fiyat arama niyetini (mersin evden eve nakliyat fiyatları vb.) karşılar
 * AMA uydurma rakam yayınlamaz: fiyatı belirleyen gerçek değişkenleri anlatır,
 * ardından net fiyat için teklife yönlendirir.
 */
export function PricingFactors({
  factors,
  whatsappMessage,
  service,
  note,
}: {
  factors: { title: string; text: string }[];
  whatsappMessage: string;
  service?: string;
  note?: string;
}) {
  return (
    <div className="mt-6">
      <div className="table-scroll rounded-card border border-line">
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
          <caption className="sr-only">
            Nakliyat fiyatını belirleyen etkenler
          </caption>
          <thead>
            <tr className="bg-surface">
              <th scope="col" className="w-1/3 px-4 py-3 font-bold text-white">
                Etken
              </th>
              <th scope="col" className="px-4 py-3 font-bold text-white">
                Fiyatı neden değiştirir?
              </th>
            </tr>
          </thead>
          <tbody>
            {factors.map((f) => (
              <tr key={f.title} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-white">
                  {f.title}
                </th>
                <td className="px-4 py-3 text-ink-500">{f.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-ink-700">
        {note ??
          "Bu etkenler her taşınmada farklı birleştiği için sabit bir liste fiyatı yayınlamıyoruz. Net fiyat, taşınacak eşyalar ve iki adresin koşulları netleştikten sonra veriliyor."}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <QuoteButton
          location="after_pricing"
          service={service}
          label="Fiyat Teklifi Al"
        />
        <WhatsAppButton
          message={whatsappMessage}
          location="after_pricing"
          service={service}
          label="WhatsApp'tan Fiyat Sor"
        />
      </div>
    </div>
  );
}
