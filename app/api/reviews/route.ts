import { NextResponse } from "next/server";
import { getReviews, addReview, kvConfigured, type StoredReview } from "@/lib/reviews";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const scope = new URL(req.url).searchParams.get("scope") ?? "";
  if (!scope) return NextResponse.json({ reviews: [], persisted: false });
  const reviews = await getReviews(scope);
  return NextResponse.json({ reviews, persisted: kvConfigured() });
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const scope = String(body?.scope ?? "").trim();
  const rating = Math.round(Number(body?.rating));
  const text = String(body?.text ?? "").trim();
  const name = String(body?.name ?? "").trim().slice(0, 60) || "Anoniem";

  if (!scope) return NextResponse.json({ error: "Scope ontbreekt." }, { status: 400 });
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Ongeldige beoordeling." }, { status: 400 });
  }
  if (text.length < 3 || text.length > 1000) {
    return NextResponse.json({ error: "Schrijf een korte review (max 1000 tekens)." }, { status: 400 });
  }

  const review: StoredReview = {
    name,
    rating,
    text,
    // Datum wordt server-side gezet; alleen de dag (nl-NL ISO).
    date: new Date().toISOString().slice(0, 10),
  };

  const persisted = await addReview(scope, review);
  // persisted:false betekent dat KV niet is geconfigureerd — de client bewaart de
  // review dan lokaal, zodat de functie altijd werkt.
  return NextResponse.json({ ok: true, review, persisted });
}
