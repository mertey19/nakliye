/**
 * SEO QA MATRİSİ — çalışan siteye HTTP isteği atarak doğrular.
 *
 * Kullanım:
 *   npm run build && npm start   (ayrı terminalde)
 *   node scripts/seo-audit.mjs [http://localhost:3000]
 *
 * Kontrol edilenler: HTTP durumu, tek H1, benzersiz title/description,
 * kanonik URL, JSON-LD geçerliliği, dönüşüm CTA'sı, iç link, kelime sayısı.
 */

const base = (process.argv[2] || "http://localhost:3000").replace(/\/+$/, "");

const routes = [
  "/",
  "/evden-eve-nakliyat",
  "/sehirler-arasi-nakliyat",
  "/ofis-tasima",
  "/parca-esya-tasima",
  "/esya-paketleme",
  "/hizmet-bolgeleri",
  "/teklif-al",
  "/iletisim",
  "/hakkimizda",
  "/rehber",
  "/rehber/ev-tasirken-yapilmasi-gerekenler",
  "/rehber/asansorsuz-ev-nasil-tasinir",
  "/rehber/nakliye-firmasi-secerken",
  "/rehber/esyalar-nasil-paketlenir",
  "/rehber/nakliyat-fiyati-nasil-hesaplanir",
  "/rehber/sehirler-arasi-ev-tasima",
  "/rehber/ofis-tasirken-nelere-dikkat",
  "/rehber/beyaz-esya-nasil-tasinir",
  "/rehber/ogrenci-evi-nasil-tasinir",
  "/rehber/tasinma-gunu-kontrol-listesi",
  "/rehber/yenisehir-ev-tasima",
  "/rehber/mezitli-ev-tasima",
  "/rehber/toroslar-ev-tasima",
  "/rehber/akdeniz-ev-tasima",
  "/gizlilik-politikasi",
  "/kvkk-aydinlatma-metni",
];

const between = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

const decode = (s) =>
  s
    ? s
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&apos;/g, "'")
        .replace(/&ldquo;|&rdquo;/g, '"')
    : s;

const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const problems = [];
const rows = [];
const titles = new Map();
const descriptions = new Map();

for (const route of routes) {
  const url = `${base}${route}`;
  const res = await fetch(url, { redirect: "manual" });
  const html = await res.text();

  const title = decode(between(html, /<title>([^<]*)<\/title>/));
  const description = decode(
    between(html, /<meta name="description" content="([^"]*)"/),
  );
  const canonical = between(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = between(html, /<meta name="robots" content="([^"]*)"/);
  const h1s = html.match(/<h1[\s>]/g) || [];
  const h2s = html.match(/<h2[\s>]/g) || [];
  const words = textOf(html).split(" ").length;

  // JSON-LD blokları ayrıştırılabiliyor mu?
  const ldBlocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  const ldTypes = [];
  for (const [, raw] of ldBlocks) {
    try {
      const parsed = JSON.parse(raw.replace(/\\u003c/g, "<"));
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        ldTypes.push(node["@type"]);
      }
    } catch {
      problems.push(`${route}: JSON-LD ayrıştırılamadı`);
    }
  }

  const hasQuoteCta = html.includes('href="/teklif-al"');
  const hasTel = html.includes('href="tel:');
  const hasWa = html.includes("wa.me/");
  const internalLinks = new Set(
    [...html.matchAll(/href="(\/[a-z0-9/-]*)"/g)].map((m) => m[1]),
  ).size;

  if (res.status !== 200) problems.push(`${route}: HTTP ${res.status}`);
  if (h1s.length !== 1)
    problems.push(`${route}: H1 sayısı ${h1s.length} (tam olarak 1 olmalı)`);
  if (!title) problems.push(`${route}: title yok`);
  if (title && title.length > 65)
    problems.push(`${route}: title ${title.length} karakter (>65)`);
  if (!description) problems.push(`${route}: meta description yok`);
  if (description && (description.length < 70 || description.length > 260))
    problems.push(`${route}: description uzunluğu ${description.length}`);
  if (!canonical) problems.push(`${route}: canonical yok`);
  if (canonical && (canonical.includes("?") || canonical.includes("#")))
    problems.push(`${route}: canonical parametre içeriyor`);
  if (canonical && canonical !== `${canonicalBase()}${route === "/" ? "" : route}`)
    problems.push(`${route}: canonical beklenenden farklı -> ${canonical}`);
  if (!robots?.includes("index")) problems.push(`${route}: robots index değil`);
  if (!hasQuoteCta && route !== "/teklif-al")
    problems.push(`${route}: teklif CTA'sı yok`);
  if (words < 250) problems.push(`${route}: içerik çok ince (${words} kelime)`);
  if (titles.has(title)) problems.push(`Yinelenen title: ${route} = ${titles.get(title)}`);
  else titles.set(title, route);
  if (descriptions.has(description))
    problems.push(`Yinelenen description: ${route} = ${descriptions.get(description)}`);
  else descriptions.set(description, route);

  rows.push({
    URL: route,
    Durum: res.status,
    H1: h1s.length,
    H2: h2s.length,
    "Title (kar.)": title ? title.length : 0,
    "Desc (kar.)": description ? description.length : 0,
    Canonical: canonical ? "var" : "YOK",
    "JSON-LD": ldTypes.join(",") || "YOK",
    Kelime: words,
    "İç link": internalLinks,
    Teklif: hasQuoteCta ? "✓" : "-",
    Tel: hasTel ? "✓" : "-",
    WA: hasWa ? "✓" : "-",
    Index: robots?.includes("noindex") ? "noindex" : "index",
  });
}

function canonicalBase() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.kansucannakliye.com.tr"
  ).replace(
    /\/+$/,
    "",
  );
}

// --- Sitemap / robots / 404 kontrolleri ---
const sitemapRes = await fetch(`${base}/sitemap.xml`);
const sitemapXml = await sitemapRes.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
);
if (sitemapRes.status !== 200) problems.push("sitemap.xml erişilemiyor");
if (sitemapUrls.length !== routes.length)
  problems.push(
    `sitemap URL sayısı ${sitemapUrls.length}, beklenen ${routes.length}`,
  );
for (const u of sitemapUrls) {
  if (u.includes("?") || u.includes("#")) problems.push(`sitemap'te parametreli URL: ${u}`);
}

const robotsRes = await fetch(`${base}/robots.txt`);
const robotsTxt = await robotsRes.text();
if (!robotsTxt.includes("Sitemap:")) problems.push("robots.txt sitemap referansı yok");
if (/^Disallow: \/$/m.test(robotsTxt)) problems.push("robots.txt kök dizini engelliyor!");

const notFound = await fetch(`${base}/olmayan-sayfa-testi`);
const notFoundHtml = await notFound.text();
if (notFound.status !== 404) problems.push(`404 sayfası HTTP ${notFound.status} döndü`);
if (!notFoundHtml.includes('href="/teklif-al"'))
  problems.push("404 sayfasında dönüşüm bağlantısı yok");

// --- Rapor ---
console.log("\n=== SEO QA MATRİSİ ===\n");
console.table(rows);
console.log(`\nsitemap.xml: ${sitemapUrls.length} URL`);
console.log(`robots.txt:\n${robotsTxt.trim()}`);
console.log(`404 durumu: HTTP ${notFound.status}, dönüşüm bağlantısı: ${
  notFoundHtml.includes('href="/teklif-al"') ? "var" : "YOK"
}`);

if (problems.length > 0) {
  console.log(`\n❌ ${problems.length} SORUN:\n`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exitCode = 1;
} else {
  console.log("\n✅ Tüm SEO kontrolleri geçti.\n");
}
