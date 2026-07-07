"use client";

import { useState } from "react";
import Link from "next/link";
import { normalizePlate, isPlausiblePlate, formatPlate } from "@/lib/rdw";
import { getProductBySlug } from "@/lib/products";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import type { VehicleInfo, ApkStatus } from "@/lib/rdwVehicle";
import type { ToolVariant } from "@/lib/tools";
import LicensePlate from "./LicensePlate";
import { ArrowRight, CarIcon, CheckIcon, BoltIcon, ShieldIcon } from "./icons";

interface OilRec {
  isElectric: boolean;
  viscosity: string | null;
  productSlug: string | null;
  carPage: { makeSlug: string; modelSlug: string; makeName: string; modelName: string } | null;
}
interface ApiResult {
  found: boolean;
  vehicle: VehicleInfo;
  apk: ApkStatus;
  oil: OilRec;
}

type Status = "idle" | "loading" | "error" | "invalid" | "notfound" | "done";

function fmtDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}
function pk(kw?: number): string {
  return kw ? `${Math.round(kw * 1.36)} pk (${kw} kW)` : "—";
}
function n(v?: number, unit = ""): string {
  return v != null ? `${v.toLocaleString("nl-NL")}${unit}` : "—";
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink-line/60 py-2 text-sm">
      <span className="text-zinc-400">{label}</span>
      <span className="text-right font-semibold text-zinc-100">{value}</span>
    </div>
  );
}

export default function RdwTool({ variant }: { variant: ToolVariant }) {
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<ApiResult | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizePlate(plate);
    if (!isPlausiblePlate(normalized)) return setStatus("invalid");
    setStatus("loading");
    setData(null);
    try {
      const res = await fetch(`/api/voertuig?plate=${normalized}`);
      if (res.status === 404) return setStatus("notfound");
      if (!res.ok) return setStatus("error");
      setData((await res.json()) as ApiResult);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="card-surface p-6 sm:p-8">
      <form onSubmit={lookup} className="flex flex-col gap-3 sm:flex-row">
        <LicensePlate size="lg" className="sm:min-w-[240px]">
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
          {status === "loading" ? "Zoeken…" : "Check kenteken"}
          {status !== "loading" && <ArrowRight width={18} height={18} />}
        </button>
      </form>

      {status === "invalid" && <p className="mt-3 text-sm text-red-400">Vul een geldig Nederlands kenteken in.</p>}
      {status === "notfound" && <p className="mt-3 text-sm text-red-400">Dit kenteken is niet gevonden bij de RDW.</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-400">Er ging iets mis. Probeer het later opnieuw.</p>}

      {status === "done" && data && (
        <div className="mt-6 animate-fade-up">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <LicensePlate size="sm">
              <span className="text-[11px] font-extrabold tracking-widest text-black">{formatPlate(data.vehicle.plate)}</span>
            </LicensePlate>
            <span className="font-bold text-zinc-100">
              {data.vehicle.make} {data.vehicle.model}
            </span>
            {data.vehicle.year ? <span className="text-zinc-500">· {data.vehicle.year}</span> : null}
          </div>

          {variant === "apk" && <ApkBlock apk={data.apk} />}
          {variant === "info" && <InfoBlock v={data.vehicle} />}
          {variant === "milieu" && <MilieuBlock v={data.vehicle} />}
          {variant === "waarde" && <WaardeBlock v={data.vehicle} />}

          <OilCrossSell oil={data.oil} />
        </div>
      )}
    </div>
  );
}

function ApkBlock({ apk }: { apk: ApkStatus }) {
  const map = {
    geldig: { c: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300", icon: <CheckIcon width={22} height={22} /> },
    binnenkort: { c: "border-amber-500/40 bg-amber-500/10 text-amber-300", icon: <ShieldIcon width={22} height={22} /> },
    verlopen: { c: "border-red-500/40 bg-red-500/10 text-red-300", icon: <ShieldIcon width={22} height={22} /> },
    onbekend: { c: "border-ink-line bg-ink-soft text-zinc-300", icon: <ShieldIcon width={22} height={22} /> },
  }[apk.state];
  return (
    <div className={`rounded-2xl border p-5 ${map.c}`}>
      <div className="flex items-center gap-2 font-bold">{map.icon} {apk.label}</div>
      {apk.expiry && <p className="mt-2 text-sm">Vervaldatum APK: <strong>{fmtDate(apk.expiry)}</strong></p>}
      <p className="mt-2 text-xs opacity-80">Plan je APK op tijd en combineer het met een olieverversing.</p>
    </div>
  );
}

function InfoBlock({ v }: { v: VehicleInfo }) {
  return (
    <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
      <Row label="Merk" value={v.make ?? "—"} />
      <Row label="Model" value={v.model ?? "—"} />
      <Row label="Voertuigsoort" value={v.vehicleType ?? "—"} />
      <Row label="Carrosserie" value={v.bodyType ?? "—"} />
      <Row label="Bouwjaar" value={v.year ?? "—"} />
      <Row label="Kleur" value={[v.color, v.color2].filter(Boolean).join(" / ") || "—"} />
      <Row label="Brandstof" value={v.fuel ?? "—"} />
      <Row label="Vermogen" value={pk(v.powerKw)} />
      <Row label="Cilinders" value={v.cylinders ?? "—"} />
      <Row label="Cilinderinhoud" value={n(v.displacementCc, " cc")} />
      <Row label="Massa (leeg)" value={n(v.massEmpty, " kg")} />
      <Row label="Max. massa" value={n(v.maxMass, " kg")} />
      <Row label="Zitplaatsen" value={v.seats ?? "—"} />
      <Row label="Deuren" value={v.doors ?? "—"} />
      <Row label="Eerste toelating" value={fmtDate(v.firstAdmission)} />
      <Row label="APK tot" value={fmtDate(v.apkExpiry)} />
    </div>
  );
}

function MilieuBlock({ v }: { v: VehicleInfo }) {
  return (
    <div className="grid gap-x-8 sm:grid-cols-2">
      <Row label="CO₂-uitstoot (gecombineerd)" value={v.co2 != null ? `${v.co2} g/km` : "—"} />
      <Row label="Brandstofverbruik" value={v.consumption != null ? `${v.consumption} l/100 km` : "—"} />
      <Row label="Energielabel" value={v.energyLabel ?? "—"} />
      <Row label="Brandstof" value={v.fuel ?? "—"} />
      <Row label="Emissieklasse" value={v.emissionClass ?? "—"} />
      <Row label="Vermogen" value={pk(v.powerKw)} />
    </div>
  );
}

function WaardeBlock({ v }: { v: VehicleInfo }) {
  return (
    <div className="grid gap-x-8 sm:grid-cols-2">
      <Row label="Cataloguswaarde (nieuwprijs)" value={v.catalogPrice != null ? euro(v.catalogPrice) : "—"} />
      <Row label="Bruto BPM" value={v.grossBpm != null ? euro(v.grossBpm) : "—"} />
      <Row label="Bouwjaar" value={v.year ?? "—"} />
      <Row label="Eerste toelating" value={fmtDate(v.firstAdmission)} />
    </div>
  );
}

function OilCrossSell({ oil }: { oil: OilRec }) {
  if (oil.isElectric) {
    return (
      <div className="mt-5 flex items-start gap-2 rounded-2xl border border-ink-line bg-ink-soft p-4 text-sm text-zinc-300">
        <BoltIcon width={18} height={18} className="mt-0.5 shrink-0 text-neon" />
        Dit is een elektrische auto — die heeft geen motorolie nodig. Wél remvloeistof en koelvloeistof natuurlijk.
      </div>
    );
  }
  const product = oil.productSlug ? getProductBySlug(oil.productSlug) : undefined;
  return (
    <div className="mt-5 flex flex-col items-start gap-3 rounded-2xl border border-neon/30 bg-neon/5 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm">
        <CarIcon width={18} height={18} className="shrink-0 text-neon" />
        <span className="text-zinc-200">
          {oil.viscosity ? (
            <>Aanbevolen motorolie voor deze auto: <strong className="text-neon">{oil.viscosity}</strong>{product ? ` — ${product.name}` : ""}</>
          ) : (
            "Vind de juiste motorolie voor deze auto"
          )}
        </span>
      </div>
      <div className="flex gap-2">
        {product && (
          <Link href={`/product/${product.slug}`} className="btn-neon whitespace-nowrap px-4 py-2 text-sm">
            Bestel olie {euro(sizePrice(product, defaultSize(product.sizesLiter)))}
          </Link>
        )}
        {oil.carPage && (
          <Link href={`/olie/${oil.carPage.makeSlug}/${oil.carPage.modelSlug}`} className="btn-ghost whitespace-nowrap px-4 py-2 text-sm">
            Olie-advies
          </Link>
        )}
      </div>
    </div>
  );
}
