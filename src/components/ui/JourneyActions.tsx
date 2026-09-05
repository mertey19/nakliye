"use client";

import Link from "next/link";
import { business } from "@/config/business";
import { journeyWhatsAppMessage } from "@/config/journey";
import { createWhatsAppUrl } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { PhoneIcon, WhatsAppIcon } from "@/components/cta/ConversionButtons";

export function JourneyActions({ compact = false, location = "journey" }: { compact?: boolean; location?: string }) {
  return (
    <div className={`journey-actions${compact ? " journey-actions--compact" : ""}`}>
      <Link href="/teklif-al" className="journey-button journey-button--primary" onClick={() => track("quote_click", { cta_location: location })}>
        Ücretsiz Teklif Al <span aria-hidden="true">↗</span>
      </Link>
      {business.whatsapp && <a href={createWhatsAppUrl(journeyWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className="journey-button" onClick={() => track("whatsapp_click", { cta_location: location })}>
        <WhatsAppIcon /> <span>WhatsApp&apos;tan Yaz</span>
      </a>}
      {!compact && business.phone && <a href={`tel:${business.phone}`} className="journey-phone" onClick={() => track("phone_click", { cta_location: location })}>
        <PhoneIcon /> Hemen Ara <span>{business.phoneDisplay}</span>
      </a>}
    </div>
  );
}
