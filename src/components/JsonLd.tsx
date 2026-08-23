/**
 * JSON-LD gömer. İçerik sunucuda üretilir; istemci JS'i gerekmez.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify çıktısı; "<" kaçırılarak script kırılması engellenir.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
