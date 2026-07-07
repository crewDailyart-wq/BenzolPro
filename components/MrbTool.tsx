"use client";

import { useState } from "react";
import Link from "next/link";
import { normalizePlate, isPlausiblePlate, formatPlate } from "@/lib/rdw";
import { euro } from "@/lib/format";
import { computeMrb, PROVINCES, MRB_YEAR } from "@/lib/mrb";
import type { VehicleInfo } from "@/lib/rdwVehicle";
import LicensePlate from "./LicensePlate";
import { ArrowRight, WrenchIcon } from "./icons";

type Status = "idle" | "loading" | "error" | "invalid" | "notfound" | "done";

export default function MrbTool() {
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [province, setProvince] = useState("");

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizePlate(plate);
    if (!isPlausiblePlate(normalized)) return setStatus("invalid");
    setStatus("loading");
    setVehicle(null);
    try {
      const res = await fetch(`/api/voertuig?plate=${normalized}`);
      if (res.status === 404) return setStatus("notfound");
      if (!res.ok) return setStatus("error");
      const data = await res.json();
      setVehicle(data.vehicle as VehicleInfo);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const mrb = vehicle && province ? computeMrb(vehicle.massEmpty, vehicle.fuelClass, province) : null;

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
          {status === "loading" ? "Zoeken…" : "Ophalen"}
          {status !== "loading" && <ArrowRight width={18} height={18} />}
        </button>
      </form>

      {status === "invalid" && <p className="mt-3 text-sm text-red-400">Vul een geldig Nederlands kenteken in.</p>}
      {status === "notfound" && <p className="mt-3 text-sm text-red-400">Dit kenteken is niet gevonden bij de RDW.</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-400">Er ging iets mis. Probeer het later opnieuw.</p>}

      {status === "done" && vehicle && (
        <div className="mt-6 animate-fade-up">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <LicensePlate size="sm">
              <span className="text-[11px] font-extrabold tracking-widest text-black">{formatPlate(vehicle.plate)}</span>
            </LicensePlate>
            <span className="font-bold text-zinc-100">{vehicle.make} {vehicle.model}</span>
            <span className="text-zinc-500">· {vehicle.massEmpty ? `${vehicle.massEmpty} kg` : "gewicht onbekend"} · {vehicle.fuel ?? "—"}</span>
          </div>

          <label className="block max-w-xs">
            <span className="mb-1 block text-sm text-zinc-400">Kies je provincie</span>
            <select value={province} onChange={(e) => setProvince(e.target.value)} className="input-field cursor-pointer">
              <option value="">— provincie —</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          {!vehicle.massEmpty && (
            <p className="mt-4 text-sm text-amber-300">Het gewicht van deze auto is niet bij de RDW bekend, dus we kunnen geen indicatie berekenen.</p>
          )}

          {mrb && (
            <div className="mt-5 rounded-2xl border border-neon/30 bg-neon/5 p-5">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
                <WrenchIcon width={16} height={16} className="text-neon" /> Indicatie wegenbelasting ({MRB_YEAR})
              </div>
              <p className="mt-2 text-3xl font-extrabold text-neon">
                ± {euro(mrb.quarterLow)} – {euro(mrb.quarterHigh)}
                <span className="ml-2 text-base font-medium text-zinc-400">per kwartaal</span>
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Ongeveer {euro(mrb.yearLow)} – {euro(mrb.yearHigh)} per jaar · {mrb.province} ({mrb.opcenten}% opcenten)
              </p>
              {mrb.note && <p className="mt-2 text-xs text-amber-300">{mrb.note}</p>}
              <p className="mt-3 text-xs text-zinc-500">
                Dit is een grove indicatie op basis van gewicht, brandstof en provincie. Bereken het exacte bedrag bij de{" "}
                <a href="https://www.belastingdienst.nl/rekenhulpen/motorrijtuigenbelasting/" target="_blank" rel="noreferrer" className="text-neon underline">
                  Belastingdienst
                </a>.
              </p>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-ink-line bg-ink-soft p-4 text-sm text-zinc-300">
            <span>Bespaar op onderhoud: bestel je motorolie voordelig en verwissel zelf.</span>
            <Link href="/kenteken-check" className="ml-auto shrink-0 font-semibold text-neon hover:underline">Juiste olie →</Link>
          </div>
        </div>
      )}
    </div>
  );
}
