"use client";

import { useState } from "react";
import { getProductBySlug } from "@/lib/products";
import { formatPlate, isPlausiblePlate, normalizePlate } from "@/lib/rdw";
import type { OilRecommendation } from "@/lib/types";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import LicensePlate from "./LicensePlate";
import { ArrowRight, CarIcon, CheckIcon, BoltIcon } from "./icons";

type Status = "idle" | "loading" | "error" | "invalid" | "notfound" | "done";

// Absolute link terug naar de shop (opent in een nieuw tabblad op de host-site),
// met UTM zodat de winkelier ziet dat de widget verkeer oplevert.
function shopUrl(path: string): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${SITE_URL}${path}${sep}utm_source=widget&utm_medium=embed&utm_campaign=kentekencheck`;
}

/**
 * Lichte, insluitbare versie van de kentekencheck voor op andere sites (garages,
 * blogs, forums). Alle acties openen de echte BenzolPro-shop in een nieuw tabblad
 * → referral-verkeer + merkbekendheid. Zie /widget voor de insluitcode.
 */
export default function EmbedPlateChecker() {
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<OilRecommendation | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizePlate(plate);
    if (!isPlausiblePlate(normalized)) return setStatus("invalid");
    setStatus("loading");
    setResult(null);
    try {
      const res = await fetch(`/api/rdw?plate=${normalized}`);
      if (res.status === 404) return setStatus("notfound");
      if (!res.ok) return setStatus("error");
      setResult((await res.json()) as OilRecommendation);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const product = result?.productSlug ? getProductBySlug(result.productSlug) : undefined;
  const carPage = result?.carPage ?? null;

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-ink-line bg-ink-card p-5 text-white shadow-card">
      <div className="flex items-center gap-2">
        <span className="chip"><CarIcon width={14} height={14} /> RDW-check</span>
      </div>
      <h2 className="mt-3 text-xl font-bold">Welke motorolie past bij mijn auto?</h2>
      <p className="mt-1 text-sm text-zinc-400">Voer je kenteken in — direct het juiste advies.</p>

      <form onSubmit={lookup} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <LicensePlate size="lg" className="sm:min-w-[190px]">
          <input
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="12-ABC-3"
            aria-label="Kenteken"
            maxLength={8}
            className="w-full bg-transparent text-center text-2xl font-extrabold uppercase tracking-[0.12em] text-black placeholder:text-black/40 outline-none"
            style={{ fontFamily: "var(--font-sans)" }}
          />
        </LicensePlate>
        <button type="submit" className="btn-neon flex-1 sm:flex-none" disabled={status === "loading"}>
          {status === "loading" ? "Zoeken…" : "Check"}
          {status !== "loading" && <ArrowRight width={18} height={18} />}
        </button>
      </form>

      {status === "invalid" && <p className="mt-3 text-sm text-red-400">Vul een geldig kenteken in.</p>}
      {status === "notfound" && <p className="mt-3 text-sm text-red-400">Kenteken niet gevonden bij de RDW.</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-400">Er ging iets mis. Probeer het opnieuw.</p>}

      {status === "done" && result && (
        <div className="mt-4 animate-fade-up rounded-xl border border-ink-line bg-ink-soft p-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <LicensePlate size="sm">
              <span className="text-[11px] font-extrabold tracking-widest text-black">{formatPlate(result.vehicle.plate)}</span>
            </LicensePlate>
            <span className="font-semibold">{result.vehicle.make} {result.vehicle.model}</span>
            {result.vehicle.year ? <span className="text-zinc-500">· {result.vehicle.year}</span> : null}
          </div>

          {result.isElectric ? (
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <BoltIcon width={18} height={18} className="mt-0.5 shrink-0 text-neon" />
              Dit is een elektrische auto — die heeft geen motorolie nodig.
            </p>
          ) : (
            <>
              {product && (
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-neon">Aanbevolen olie</p>
                  <p className="text-lg font-bold">{product.name}</p>
                  <p className="text-sm text-zinc-400">{product.specs.slice(0, 3).join(" · ")}</p>
                </div>
              )}
              <div className="mt-4 flex flex-col gap-2">
                {product && (
                  <a href={shopUrl(`/product/${product.slug}`)} target="_blank" rel="noopener" className="btn-neon w-full">
                    Bekijk &amp; bestel <ArrowRight width={16} height={16} />
                  </a>
                )}
                {carPage && (
                  <a
                    href={shopUrl(`/olie/${carPage.makeSlug}/${carPage.modelSlug}`)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-azure hover:underline"
                  >
                    Volledig olie-advies voor de {carPage.makeName} {carPage.modelName}
                    <ArrowRight width={14} height={14} />
                  </a>
                )}
              </div>
            </>
          )}
          <p className="mt-3 flex items-start gap-1.5 text-[11px] text-zinc-500">
            <CheckIcon width={12} height={12} className="mt-0.5 shrink-0 text-neon" />
            Advies o.b.v. RDW-data. Het instructieboekje is altijd leidend.
          </p>
        </div>
      )}

      {/* Herkomst-/creditlink terug naar de shop. */}
      <p className="mt-4 text-center text-[11px] text-zinc-500">
        Gratis kentekencheck door{" "}
        <a href={shopUrl("/kenteken-check")} target="_blank" rel="noopener" className="font-semibold text-neon hover:underline">
          {SITE_NAME}
        </a>
      </p>
    </div>
  );
}
