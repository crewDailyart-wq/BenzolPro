import { buildProductFeed } from "@/lib/feed";

// Google Shopping-productfeed op /feed.xml. Dagelijks opnieuw opgebouwd (cache).
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const xml = buildProductFeed();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
