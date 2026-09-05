import test from "node:test";
import assert from "node:assert/strict";

import { business } from "../src/config/business";
import { services } from "../src/config/services";
import { journeyWhatsAppMessage } from "../src/config/journey";
import {
  createWhatsAppUrl,
  formatPhoneForDisplay,
  formatPhoneForTel,
  generalInfoMessage,
  resolvePageContext,
  serviceInfoMessage,
} from "../src/lib/contact";

/** Test süresince geçici numara enjekte eder, sonra geri alır. */
function withPhone<T>(fn: () => T): T {
  const phone = business.phone;
  const wa = business.whatsapp;
  (business as { phone: string }).phone = "+905321234567";
  (business as { whatsapp: string }).whatsapp = "905321234567";
  try {
    return fn();
  } finally {
    (business as { phone: string }).phone = phone;
    (business as { whatsapp: string }).whatsapp = wa;
  }
}

test("formatPhoneForDisplay tüm yaygın biçimleri okunabilir hale getirir", () => {
  assert.equal(formatPhoneForDisplay("+905321234567"), "0532 123 45 67");
  assert.equal(formatPhoneForDisplay("905321234567"), "0532 123 45 67");
  assert.equal(formatPhoneForDisplay("05321234567"), "0532 123 45 67");
  assert.equal(formatPhoneForDisplay("5321234567"), "0532 123 45 67");
  // Geçersiz girdi uydurulmaz, olduğu gibi döner
  assert.equal(formatPhoneForDisplay("123"), "123");
});

test("formatPhoneForTel geçerli tel: hedefi üretir, eksik numarada boş döner", () => {
  assert.equal(formatPhoneForTel("+905321234567"), "+905321234567");
  assert.equal(formatPhoneForTel("05321234567"), "+905321234567");
  assert.equal(formatPhoneForTel(""), "", "numara yoksa tel: linki üretilmemeli");
  assert.equal(formatPhoneForTel("123"), "", "eksik numara link üretmemeli");
});

test("WhatsApp numarası yoksa link üretilmez (ölü buton engeli)", () => {
  if (business.whatsapp.replace(/\D/g, "").length < 10) {
    assert.equal(createWhatsAppUrl("test"), "");
  }
});

test("createWhatsAppUrl mesajı doğru kodlar", () => {
  withPhone(() => {
    const url = createWhatsAppUrl(generalInfoMessage);
    assert.ok(url.startsWith("https://wa.me/905321234567?text="));
    assert.ok(url.includes("%0A"), "satır sonu %0A olmalı");
    assert.ok(!url.includes(" "), "kodlanmamış boşluk kalmamalı");
    assert.equal(decodeURIComponent(url.split("?text=")[1]), generalInfoMessage);
  });
});

test("genel bilgi mesajı marka adını ve 'bilgi almak' niyetini taşır", () => {
  assert.ok(generalInfoMessage.includes(business.name));
  assert.ok(generalInfoMessage.includes("bilgi almak istiyorum"));
});

test("hizmete özel mesaj bağlama göre değişir", () => {
  const msg = serviceInfoMessage("Evden Eve Nakliyat");
  assert.equal(
    msg,
    `Merhaba ${business.name},\nevden eve nakliyat hizmetiniz için bilgi almak istiyorum.`,
  );
  // Türkçe küçültme: I -> ı dönüşümü doğru olmalı
  assert.ok(!serviceInfoMessage("Şehirler Arası").includes("ArasI"));
});

test("resolvePageContext ana sayfa / hizmet / diğer ayrımını yapar", () => {
  const home = resolvePageContext("/");
  assert.equal(home.context, "homepage");
  assert.equal(home.whatsappMessage, journeyWhatsAppMessage);
  assert.equal(home.service, undefined);

  const svc = resolvePageContext("/evden-eve-nakliyat");
  assert.equal(svc.context, "evden-eve-nakliyat");
  assert.equal(svc.service, "evden-eve-nakliyat");
  assert.ok(svc.whatsappMessage.includes("evden eve nakliyat hizmetiniz"));

  const other = resolvePageContext("/iletisim");
  assert.equal(other.context, "iletisim");
  assert.equal(other.service, undefined);
  assert.equal(other.whatsappMessage, generalInfoMessage);

  const district = resolvePageContext("/mezitli-nakliye");
  assert.equal(district.context, "mezitli-nakliye");
  assert.equal(district.whatsappMessage, journeyWhatsAppMessage);
});

test("her hizmet sayfası için benzersiz kalıcı-CTA mesajı üretilir", () => {
  const messages = services.map((s) => resolvePageContext(`/${s.slug}`).whatsappMessage);
  assert.equal(new Set(messages).size, messages.length);
  for (const m of messages) {
    assert.ok(m.includes(business.name));
    assert.ok(m.includes("bilgi almak istiyorum"));
  }
});

test("sondaki eğik çizgi bağlam çözümlemesini bozmaz", () => {
  assert.equal(resolvePageContext("/ofis-tasima/").service, "ofis-tasima");
  assert.equal(resolvePageContext("").context, "homepage");
});
