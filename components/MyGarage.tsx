"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { normalizePlate, isPlausiblePlate, formatPlate } from "@/lib/rdw";
import { getProductBySlug } from "@/lib/products";
import { euro, sizePrice, defaultSize } from "@/lib/format";
import {
  type SavedCar,
  STORAGE_KEY,
  DEFAULT_INTERVAL_MONTHS,
  daysUntil,
  stateFromDays,
  nextOilChange,
  buildIcs,
} from "@/lib/garage";
import LicensePlate from "./LicensePlate";
import InstallPrompt from "./InstallPrompt";
import { ArrowRight, CarIcon, CheckIcon, ShieldIcon, DropIcon, TrashIcon, BoltIcon } from "./icons";

type AddStatus = "idle" | "loading" | "invalid" | "notfound" | "error" | "exists";

function fmt(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

const badge = {
  ok: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  soon: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  overdue: "border-red-500/40 bg-red-500/10 text-red-300",
  unknown: "border-ink-line bg-ink-soft text-zinc-400",
};

export default function MyGarage() {
  const [cars, setCars] = useState<SavedCar[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState<AddStatus>("idle");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCars(JSON.parse(raw) as SavedCar[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  function persist(next: SavedCar[]) {
    setCars(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  async function addCar(e: React.FormEvent) {
    e.preventDefault();
    const p = normalizePlate(plate);
    if (!isPlausiblePlate(p)) return setStatus("invalid");
    if (cars.some((c) => c.plate === p)) return setStatus("exists");
    setStatus("loading");
    try {
      const res = await fetch(`/api/voertuig?plate=${p}`);
      if (res.status === 404) return setStatus("notfound");
      if (!res.ok) return setStatus("error");
      const data = await res.json();
      const v = data.vehicle;
      const car: SavedCar = {
        plate: p,
        make: v.make,
        model: v.model,
        year: v.year,
        apkExpiry: v.apkExpiry,
        oilViscosity: data.oil?.viscosity ?? null,
        productSlug: data.oil?.productSlug ?? null,
        isElectric: Boolean(data.oil?.isElectric),
        oilIntervalMonths: DEFAULT_INTERVAL_MONTHS,
        addedAt: new Date().toISOString().slice(0, 10),
      };
      persist([...cars, car]);
      setPlate("");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  function update(plateId: string, patch: Partial<SavedCar>) {
    persist(cars.map((c) => (c.plate === plateId ? { ...c, ...patch } : c)));
  }
  function remove(plateId: string) {
    persist(cars.filter((c) => c.plate !== plateId));
  }

  function downloadIcs() {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
    const ics = buildIcs(cars, stamp);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "benzolpro-herinneringen.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      await fetch("/api/garage/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cars: cars.map((c) => ({ plate: c.plate, name: [c.make, c.model].filter(Boolean).join(" "), apkExpiry: c.apkExpiry, oilDue: nextOilChange(c) })),
        }),
      });
    } catch {
      /* toon toch bevestiging */
    }
    setSubscribed(true);
  }

  const today = new Date();

  return (
    <div>
      {/* toevoegen */}
      <form onSubmit={addCar} className="card-surface flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
        <LicensePlate size="lg" className="sm:min-w-[220px]">
          <input
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="12-ABC-3"
            aria-label="Kenteken toevoegen"
            maxLength={8}
            className="w-full bg-transparent text-center text-2xl font-extrabold uppercase tracking-[0.12em] text-black placeholder:text-black/40 outline-none"
            style={{ fontFamily: "var(--font-sans)" }}
          />
        </LicensePlate>
        <button type="submit" className="btn-neon" disabled={status === "loading"}>
          {status === "loading" ? "Zoeken…" : "Auto toevoegen"} <CarIcon width={18} height={18} />
        </button>
      </form>
      {status === "invalid" && <p className="mt-2 text-sm text-red-400">Vul een geldig kenteken in.</p>}
      {status === "notfound" && <p className="mt-2 text-sm text-red-400">Kenteken niet gevonden bij de RDW.</p>}
      {status === "exists" && <p className="mt-2 text-sm text-amber-300">Deze auto staat al in je garage.</p>}
      {status === "error" && <p className="mt-2 text-sm text-red-400">Er ging iets mis. Probeer het opnieuw.</p>}

      {/* lege staat */}
      {hydrated && cars.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-line p-8 text-center text-zinc-400">
          <CarIcon width={32} height={32} className="mx-auto text-zinc-600" />
          <p className="mt-3 font-semibold text-zinc-200">Je garage is nog leeg</p>
          <p className="mt-1 text-sm">Voeg je kenteken toe en we onthouden je APK-datum en wanneer je olie toe is.</p>
        </div>
      )}

      {/* auto's */}
      {cars.length > 0 && (
        <>
          <div className="mt-6 space-y-4">
            {cars.map((car) => {
              const apkDays = daysUntil(car.apkExpiry, today);
              const apkState = stateFromDays(apkDays);
              const oilDue = nextOilChange(car);
              const oilDays = daysUntil(oilDue, today);
              const oilState = car.isElectric ? "unknown" : stateFromDays(oilDays);
              const product = car.productSlug ? getProductBySlug(car.productSlug) : undefined;
              const name = [car.make, car.model].filter(Boolean).join(" ") || car.plate;
              return (
                <div key={car.plate} className="card-surface p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <LicensePlate size="sm">
                      <span className="text-[11px] font-extrabold tracking-widest text-black">{formatPlate(car.plate)}</span>
                    </LicensePlate>
                    <span className="text-lg font-bold">{name}</span>
                    {car.year ? <span className="text-sm text-zinc-500">· {car.year}</span> : null}
                    <button onClick={() => remove(car.plate)} className="ml-auto text-zinc-500 transition hover:text-red-400" aria-label="Verwijderen">
                      <TrashIcon width={18} height={18} />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {/* APK */}
                    <div className={`rounded-xl border p-4 ${badge[apkState]}`}>
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"><ShieldIcon width={14} height={14} /> APK</p>
                      <p className="mt-1 text-sm font-semibold">
                        {apkState === "overdue" ? `Verlopen (${fmt(car.apkExpiry)})` : apkState === "unknown" ? "Datum onbekend" : `Tot ${fmt(car.apkExpiry)}`}
                      </p>
                      {apkDays != null && apkState !== "overdue" && <p className="text-xs opacity-80">nog {apkDays} dagen</p>}
                    </div>

                    {/* Olie */}
                    <div className={`rounded-xl border p-4 ${badge[oilState]}`}>
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"><DropIcon width={14} height={14} /> Olie verversen</p>
                      {car.isElectric ? (
                        <p className="mt-1 flex items-center gap-1 text-sm"><BoltIcon width={14} height={14} /> Elektrisch — geen olie</p>
                      ) : oilDue ? (
                        <p className="mt-1 text-sm font-semibold">{oilState === "overdue" ? `Nu toe (${fmt(oilDue)})` : `Volgende: ${fmt(oilDue)}`}</p>
                      ) : (
                        <p className="mt-1 text-sm">Stel je laatste verversing in ↓</p>
                      )}
                    </div>
                  </div>

                  {/* instellingen olie + product */}
                  {!car.isElectric && (
                    <div className="mt-3 flex flex-wrap items-end gap-3">
                      <label className="text-xs text-zinc-400">
                        Laatste verversing
                        <input
                          type="date"
                          value={car.lastOilChange ?? ""}
                          onChange={(e) => update(car.plate, { lastOilChange: e.target.value })}
                          className="input-field mt-1 py-1.5 text-sm"
                        />
                      </label>
                      <label className="text-xs text-zinc-400">
                        Interval
                        <select
                          value={car.oilIntervalMonths ?? DEFAULT_INTERVAL_MONTHS}
                          onChange={(e) => update(car.plate, { oilIntervalMonths: Number(e.target.value) })}
                          className="input-field mt-1 cursor-pointer py-1.5 text-sm"
                        >
                          <option value={6}>6 maanden</option>
                          <option value={12}>12 maanden</option>
                          <option value={24}>24 maanden</option>
                        </select>
                      </label>
                      {product && (
                        <Link href={`/product/${product.slug}`} className="btn-neon ml-auto px-4 py-2 text-sm">
                          {car.oilViscosity} bestellen · {euro(sizePrice(product, defaultSize(product.sizesLiter)))}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* acties */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={downloadIcs} className="btn-ghost">
              <CheckIcon width={16} height={16} /> Zet herinneringen in je agenda (.ics)
            </button>
            <InstallPrompt label="Installeer als app — herinneringen op je beginscherm" />
          </div>

          {/* e-mailherinneringen */}
          <div className="mt-6 card-surface p-5">
            <p className="font-semibold text-zinc-100">📧 Gratis e-mailherinnering</p>
            <p className="mt-1 text-sm text-zinc-400">Ontvang een seintje vóór je APK verloopt en wanneer je olie toe is. Geen spam, altijd op te zeggen.</p>
            {subscribed ? (
              <p className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
                <CheckIcon width={16} height={16} /> Aangemeld! We sturen je op tijd een herinnering.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-3 flex max-w-md gap-2">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jouw@email.nl" className="input-field flex-1" />
                <button type="submit" className="btn-neon px-4" aria-label="Aanmelden"><ArrowRight width={18} height={18} /></button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
