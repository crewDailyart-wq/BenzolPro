"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { StarIcon, CheckIcon } from "./icons";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

/**
 * Write-and-read reviews block. `scope` keys the storage so each product (and
 * the homepage) keeps its own reviews. Demo-only: stored in localStorage.
 */
export default function Reviews({ scope, seedRating, seedCount }: { scope: string; seedRating?: number; seedCount?: number }) {
  const { t } = useI18n();
  const key = `benzolpro.reviews.${scope}`;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [done, setDone] = useState(false);
  // true zodra de reviews echt op de server (KV) worden bewaard; false = lokale opslag.
  const [persisted, setPersisted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      // Probeer de server (gedeelde, blijvende reviews).
      try {
        const res = await fetch(`/api/reviews?scope=${encodeURIComponent(scope)}`, { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (data?.persisted) {
          setPersisted(true);
          setReviews(Array.isArray(data.reviews) ? data.reviews : []);
          return;
        }
      } catch {
        /* val terug op lokale opslag */
      }
      // Geen server-opslag: lees uit localStorage (zoals voorheen).
      if (cancelled) return;
      try {
        const stored = window.localStorage.getItem(key);
        if (stored) setReviews(JSON.parse(stored) as Review[]);
      } catch {
        /* ignore */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [key, scope]);

  function persistLocal(list: Review[]) {
    try {
      window.localStorage.setItem(key, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const optimistic: Review = {
      name: name.trim() || t("reviews.anonymous"),
      rating,
      text: text.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    const nextList = [optimistic, ...reviews];
    setReviews(nextList);
    setName("");
    setText("");
    setRating(5);
    setDone(true);
    setTimeout(() => setDone(false), 2500);

    // Stuur naar de server; bewaart daar als KV is geconfigureerd, anders lokaal.
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope, name: optimistic.name, rating: optimistic.rating, text: optimistic.text }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.persisted) {
        setPersisted(true);
        return; // server bewaart het; niets lokaal nodig
      }
    } catch {
      /* offline of niet geconfigureerd → lokaal bewaren */
    }
    persistLocal(nextList);
  }

  const count = reviews.length + (seedCount ?? 0);
  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : seedRating ?? 0;

  return (
    <section id="reviews" className="section-pad scroll-mt-20 py-12">
      <div className="rounded-3xl border border-ink-line bg-ink-card p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">{t("reviews.title")}</h2>
            <p className="mt-1 text-sm text-zinc-400">{t("reviews.subtitle")}</p>
          </div>
          {count > 0 && (
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="flex text-neon">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} width={16} height={16} className={i < Math.round(avg) ? "" : "opacity-25"} />
                  ))}
                </span>
                <span className="text-lg font-extrabold">{avg.toFixed(1)}</span>
              </div>
              <p className="text-xs text-zinc-500">{t("reviews.based", { count })}</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* write form */}
          <form onSubmit={submit} className="rounded-2xl border border-ink-line bg-ink-soft p-5">
            <p className="font-semibold">{t("reviews.write")}</p>

            <div className="mt-3">
              <span className="mb-1 block text-sm text-zinc-400">{t("reviews.ratingLabel")}</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const val = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(val)}
                      onMouseEnter={() => setHover(val)}
                      onMouseLeave={() => setHover(0)}
                      aria-label={`${val} / 5`}
                      className="p-0.5"
                    >
                      <StarIcon
                        width={26}
                        height={26}
                        className={val <= (hover || rating) ? "text-neon" : "text-zinc-600"}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="mt-3 block">
              <span className="mb-1 block text-sm text-zinc-400">{t("reviews.name")}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder={t("reviews.namePlaceholder")} />
            </label>

            <label className="mt-3 block">
              <span className="mb-1 block text-sm text-zinc-400">{t("reviews.text")}</span>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="input-field resize-none" placeholder={t("reviews.textPlaceholder")} />
            </label>

            <button type="submit" className="btn-neon mt-4 w-full">
              {done ? (
                <><CheckIcon width={18} height={18} /> {t("reviews.thanks")}</>
              ) : (
                t("reviews.submit")
              )}
            </button>
            {!persisted && <p className="mt-2 text-[11px] text-zinc-600">{t("reviews.demoNote")}</p>}
          </form>

          {/* list */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ink-line p-6 text-center text-sm text-zinc-500">
                {t("reviews.empty")}
              </p>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="rounded-2xl border border-ink-line bg-ink-soft p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-xs text-zinc-500">{r.date}</span>
                  </div>
                  <span className="mt-1 flex text-neon">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StarIcon key={j} width={14} height={14} className={j < r.rating ? "" : "opacity-25"} />
                    ))}
                  </span>
                  <p className="mt-2 text-sm text-zinc-300">{r.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
