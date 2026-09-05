import { Container } from "../Container";
import { CtaGroup } from "../cta/ConversionButtons";

/**
 * Sayfa sonu koyu dönüşüm bandı.
 * Her ticari sayfa bilgi çıkmazıyla değil, net bir sonraki adımla biter.
 */
export function CtaBand({
  title,
  text,
  whatsappMessage,
  whatsappLabel,
  service,
  location = "page_bottom",
  quoteLabel,
}: {
  title: string;
  text: string;
  whatsappMessage: string;
  whatsappLabel?: string;
  service?: string;
  location?: string;
  quoteLabel?: string;
}) {
  return (
    <section className="section-dark bg-ink-900 py-16 text-white sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="headline text-[30px] text-white sm:text-[38px]">
            {title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-300">{text}</p>
          <CtaGroup
            location={location}
            service={service}
            whatsappMessage={whatsappMessage}
            whatsappLabel={whatsappLabel}
            quoteLabel={quoteLabel}
            className="mt-8"
            onDark
          />
        </div>
      </Container>
    </section>
  );
}
