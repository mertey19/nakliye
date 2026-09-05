"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { quoteTypes } from "@/config/services";
import {
  buildQuoteMessage,
  isValidTrPhone,
  type QuoteValues,
} from "@/lib/quote";
import { business } from "@/config/business";
import {
  hasEmail,
  hasPhone,
  hasWhatsApp,
  phoneLabel,
  telHref,
  whatsappLink,
} from "@/lib/business";

/**
 * TEKLİF HUNİSİ (3 adım)
 * ----------------------
 * Sürtünmeyi azaltmak için alanlar aşamalı açılır; ilk ekranda sadece iki soru var.
 *
 * Gönderim: form içeriği bir sunucuya GÖNDERİLMEZ. Kullanıcının kendi
 * WhatsApp'ında (yoksa e-posta istemcisinde) hazır mesaj olarak açılır.
 * Böylece backend, veri saklama ve KVKK yükü olmadan lead firmaya ulaşır.
 *
 * ÖLÇÜM: yalnızca olay adı ve adım numarası GA4'e gider.
 * Form İÇERİĞİ (ad, telefon, adres) analytics'e ASLA gönderilmez.
 */

type Values = QuoteValues;

const EMPTY: Values = {
  from: "",
  to: "",
  type: quoteTypes[0] ?? "",
  date: "",
  phone: "",
  notes: "",
};

const inputClass =
  "w-full rounded-[10px] border border-line bg-card px-4 py-3 text-[16px] text-white " +
  "placeholder:text-ink-500 transition-[border-color,box-shadow] " +
  "focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/20 " +
  "aria-invalid:border-brand aria-invalid:bg-card";

const labelClass = "block text-[15px] font-semibold text-white";

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>(
    {},
  );
  const [sent, setSent] = useState<null | { message: string; href: string }>(
    null,
  );
  const started = useRef(false);
  const headingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    track("quote_form_view", { step: 1 });
  }, []);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    if (!started.current) {
      started.current = true;
      track("quote_form_start");
    }
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function goNext() {
    const nextErrors: Partial<Record<keyof Values, string>> = {};
    if (step === 1) {
      if (!values.from.trim()) nextErrors.from = "Çıkış yerini yazın.";
      if (!values.to.trim()) nextErrors.to = "Varış yerini yazın.";
    }
    if (step === 2 && !values.type) nextErrors.type = "Taşınma türünü seçin.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      track("quote_form_error", { step, reason: "validation" });
      return;
    }
    track(step === 1 ? "quote_form_step_1" : "quote_form_step_2", { step });
    setStep((s) => Math.min(3, s + 1));
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidTrPhone(values.phone)) {
      setErrors({
        phone: "Size dönebilmemiz için 10 haneli telefon numaranızı yazın.",
      });
      track("quote_form_error", { step: 3, reason: "invalid_phone" });
      return;
    }
    track("quote_form_submit", { step: 3 });

    const message = buildQuoteMessage(values);
    let href = "";
    if (hasWhatsApp) {
      href = whatsappLink(message);
    } else if (hasEmail) {
      href = `mailto:${business.email}?subject=${encodeURIComponent(
        "Nakliyat teklif talebi",
      )}&body=${encodeURIComponent(message)}`;
    }

    setSent({ message, href });
    track("quote_form_success", { step: 3 });

    if (href) {
      // Kullanıcı mesajı kendi uygulamasında görüp gönderir.
      window.open(href, hasWhatsApp ? "_blank" : "_self", "noopener,noreferrer");
    }
  }

  if (sent) {
    return (
      <div className="rounded-card border border-line-soft bg-card p-6 shadow-[0_18px_40px_-32px_rgba(19,24,28,0.55)] sm:p-8">
        <h2 className="text-xl font-extrabold text-white">
          Taşınma bilgileriniz hazır
        </h2>
        {sent.href ? (
          <>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              {hasWhatsApp
                ? "WhatsApp penceresi açılmadıysa aşağıdaki butona dokunun. Mesaj hazır geliyor, sadece gönderin."
                : "E-posta uygulamanız açılmadıysa aşağıdaki butonu kullanın."}
            </p>
            <a
              href={sent.href}
              target={hasWhatsApp ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={() =>
                track(hasWhatsApp ? "whatsapp_click" : "quote_form_submit", {
                  cta_location: "quote_success",
                })
              }
              className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[10px] bg-wa-500 px-6 font-semibold text-white transition-colors hover:bg-wa-600"
            >
              {hasWhatsApp ? "WhatsApp'ta Gönder" : "E-posta ile Gönder"}
            </a>
          </>
        ) : (
          <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
            Aşağıdaki özeti kopyalayıp bize iletebilirsiniz.
          </p>
        )}

        <pre className="mt-6 whitespace-pre-wrap rounded-[10px] border border-line-soft bg-surface p-4 text-[14px] leading-relaxed text-ink-700">
          {sent.message}
        </pre>

        {hasPhone && (
          <p className="mt-5 text-[15px] text-ink-700">
            Acele ediyorsanız doğrudan arayın:{" "}
            <a
              href={telHref}
              className="font-bold text-white underline underline-offset-2"
            >
              {phoneLabel}
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setStep(1);
            setValues(EMPTY);
          }}
          className="mt-4 block text-sm font-semibold text-ink-500 underline underline-offset-4"
        >
          Yeni teklif isteği oluştur
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-card border border-line-soft bg-card p-6 shadow-[0_18px_40px_-32px_rgba(19,24,28,0.55)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p
          ref={headingRef}
          tabIndex={-1}
          aria-live="polite"
          className="eyebrow text-ink-500 outline-none"
        >
          Adım {step} / 3
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`h-1.5 w-10 rounded-full ${
                s <= step ? "bg-ink-900" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="mt-6 space-y-5">
          <h2 className="text-xl font-extrabold text-white">
            Nereden nereye taşınıyorsunuz?
          </h2>
          <div>
            <label className={labelClass} htmlFor="from">
              Nereden?
            </label>
            <input
              id="from"
              name="from"
              className={`${inputClass} mt-2`}
              placeholder={`Örn. ${business.primaryCity} / ${
                business.serviceAreas[0]?.name ?? "Merkez"
              }, 3. kat`}
              value={values.from}
              onChange={(e) => update("from", e.target.value)}
              autoComplete="off"
              aria-invalid={Boolean(errors.from)}
              aria-describedby={errors.from ? "from-error" : undefined}
            />
            {errors.from && (
              <p
                id="from-error"
                className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-white"
              >
                <AlertIcon />
                {errors.from}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="to">
              Nereye?
            </label>
            <input
              id="to"
              name="to"
              className={`${inputClass} mt-2`}
              placeholder="Örn. Ankara / Çankaya, asansörlü"
              value={values.to}
              onChange={(e) => update("to", e.target.value)}
              autoComplete="off"
              aria-invalid={Boolean(errors.to)}
              aria-describedby={errors.to ? "to-error" : undefined}
            />
            {errors.to && (
              <p
                id="to-error"
                className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-white"
              >
                <AlertIcon />
                {errors.to}
              </p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-5">
          <h2 className="text-xl font-extrabold text-white">
            Ne taşınacak, ne zaman?
          </h2>
          <div>
            <label className={labelClass} htmlFor="type">
              Taşınma türü
            </label>
            <select
              id="type"
              name="type"
              className={`${inputClass} mt-2`}
              value={values.type}
              onChange={(e) => update("type", e.target.value)}
            >
              {quoteTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="date">
              Tahmini taşınma tarihi{" "}
              <span className="font-normal text-ink-500">
                (net değilse boş bırakın)
              </span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className={`${inputClass} mt-2`}
              value={values.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-5">
          <h2 className="text-xl font-extrabold text-white">
            Size nasıl dönelim?
          </h2>
          <div>
            <label className={labelClass} htmlFor="phone">
              Telefon numaranız
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={`${inputClass} mt-2`}
              placeholder="05xx xxx xx xx"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-white"
              >
                <AlertIcon />
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="notes">
              Eklemek istediğiniz bilgi{" "}
              <span className="font-normal text-ink-500">(opsiyonel)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className={`${inputClass} mt-2 resize-y`}
              placeholder="Örn. 2+1 ev, beyaz eşya dahil, çıkışta asansör yok."
              value={values.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
          <p className="text-sm leading-relaxed text-ink-500">
            Bilgileriniz bu sitede saklanmaz; hazırlanan mesajı kendi{" "}
            {hasWhatsApp ? "WhatsApp" : "e-posta"} uygulamanızdan siz
            gönderirsiniz.{" "}
            <Link
              href="/kvkk-aydinlatma-metni"
              className="underline underline-offset-2"
            >
              KVKK aydınlatma metni
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse sm:justify-end">
        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] bg-ink-900 px-6 font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-ink-600"
          >
            Devam Et
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] bg-ink-900 px-6 font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-ink-600"
          >
            Taşınma Bilgilerimi Gönder
          </button>
        )}
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex min-h-[48px] items-center justify-center rounded-[10px] border border-line px-6 font-semibold text-ink-700 transition-colors hover:border-ink-500 hover:bg-surface"
          >
            Geri
          </button>
        )}
      </div>
    </form>
  );
}

/** Hata sinyali renge bağlı değildir: ikon + kalın metin + koyu kenarlık. */
function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16h.01" />
    </svg>
  );
}
