// Server-side: haalt uitgebreide voertuiggegevens op uit de officiële RDW Open
// Data API (twee datasets) en mapt ze naar één rijk, getypt object dat de
// gratis kentekentools (APK, voertuiggegevens, CO2, waarde, wegenbelasting)
// voedt. Alleen importeren vanuit server-routes.
import { normalizePlate, isPlausiblePlate } from "./rdw";

const VEHICLE_DS = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
const FUEL_DS = "https://opendata.rdw.nl/resource/8ys7-d773.json";

export type FuelClass = "petrol" | "diesel" | "lpg" | "electric" | "hybrid" | "other";

export interface VehicleInfo {
  plate: string;
  found: boolean;
  // identiteit
  make?: string;
  model?: string;
  vehicleType?: string; // voertuigsoort
  bodyType?: string; // inrichting
  color?: string;
  color2?: string;
  firstAdmission?: string; // ISO YYYY-MM-DD
  registration?: string; // datum tenaamstelling
  year?: number;
  // techniek
  cylinders?: number;
  displacementCc?: number;
  powerKw?: number;
  fuel?: string; // omschrijving(en), samengevoegd
  fuelClass: FuelClass;
  seats?: number;
  doors?: number;
  wheels?: number;
  // massa & maten
  massEmpty?: number; // massa ledig voertuig (kg)
  maxMass?: number; // toegestane max massa
  wheelbase?: number; // mm
  length?: number; // mm
  width?: number; // mm
  // milieu
  co2?: number; // g/km gecombineerd
  consumption?: number; // l/100km gecombineerd
  energyLabel?: string; // zuinigheidslabel A–G
  emissionClass?: string;
  // financieel
  catalogPrice?: number; // EUR
  grossBpm?: number; // EUR
  // apk
  apkExpiry?: string; // ISO YYYY-MM-DD
}

function num(v?: string): number | undefined {
  if (v == null || v === "") return undefined;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

function title(v?: string): string | undefined {
  if (!v) return undefined;
  return v
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** RDW-datum "YYYYMMDD" → "YYYY-MM-DD". */
function rdwDate(v?: string): string | undefined {
  if (!v || v.length < 8) return undefined;
  const y = v.slice(0, 4);
  const m = v.slice(4, 6);
  const d = v.slice(6, 8);
  if (y <= "1900") return undefined;
  return `${y}-${m}-${d}`;
}

function classifyFuel(desc: string): FuelClass {
  const f = desc.toLowerCase();
  const hasElec = f.includes("elektr");
  const hasCombustion = f.includes("benzine") || f.includes("diesel") || f.includes("lpg") || f.includes("gas");
  if (hasElec && hasCombustion) return "hybrid";
  if (hasElec) return "electric";
  if (f.includes("diesel")) return "diesel";
  if (f.includes("lpg") || f.includes("gas") || f.includes("cng")) return "lpg";
  if (f.includes("benzine") || f.includes("petrol")) return "petrol";
  return "other";
}

export async function fetchVehicle(rawPlate: string): Promise<VehicleInfo> {
  const plate = normalizePlate(rawPlate);
  if (!isPlausiblePlate(plate)) return { plate, found: false, fuelClass: "other" };

  const [vehRes, fuelRes] = await Promise.all([
    fetch(`${VEHICLE_DS}?kenteken=${plate}`, { headers: { Accept: "application/json" }, next: { revalidate: 86400 } }),
    fetch(`${FUEL_DS}?kenteken=${plate}`, { headers: { Accept: "application/json" }, next: { revalidate: 86400 } }),
  ]);

  if (!vehRes.ok) return { plate, found: false, fuelClass: "other" };
  const veh = (await vehRes.json()) as Array<Record<string, string>>;
  if (!Array.isArray(veh) || veh.length === 0) return { plate, found: false, fuelClass: "other" };
  const fuelRows = fuelRes.ok ? ((await fuelRes.json()) as Array<Record<string, string>>) : [];

  const v = veh[0];
  const fuelDesc = fuelRows.map((f) => f.brandstof_omschrijving).filter(Boolean).join(" / ");
  const co2 = fuelRows.map((f) => num(f.co2_uitstoot_gecombineerd)).find((x) => x != null);
  const consumption = fuelRows.map((f) => num(f.brandstofverbruik_gecombineerd)).find((x) => x != null);
  const powerKw = fuelRows.map((f) => num(f.nettomaximumvermogen)).find((x) => x != null);
  const emission = fuelRows.map((f) => f.uitstoot_deeltjes_licht || f.emissiecode_omschrijving).find(Boolean);
  const firstAdmission = rdwDate(v.datum_eerste_toelating);

  return {
    plate,
    found: true,
    make: title(v.merk),
    model: title(v.handelsbenaming),
    vehicleType: title(v.voertuigsoort),
    bodyType: title(v.inrichting),
    color: title(v.eerste_kleur),
    color2: v.tweede_kleur && v.tweede_kleur !== "Niet geregistreerd" ? title(v.tweede_kleur) : undefined,
    firstAdmission,
    registration: rdwDate(v.datum_tenaamstelling_dt) ?? rdwDate(v.datum_tenaamstelling),
    year: firstAdmission ? Number(firstAdmission.slice(0, 4)) : undefined,
    cylinders: num(v.aantal_cilinders),
    displacementCc: num(v.cilinderinhoud),
    powerKw,
    fuel: fuelDesc || undefined,
    fuelClass: classifyFuel(fuelDesc),
    seats: num(v.aantal_zitplaatsen),
    doors: num(v.aantal_deuren),
    wheels: num(v.aantal_wielen),
    massEmpty: num(v.massa_ledig_voertuig),
    maxMass: num(v.toegestane_maximum_massa_voertuig),
    wheelbase: num(v.wielbasis),
    length: num(v.lengte),
    width: num(v.breedte),
    co2,
    consumption,
    energyLabel: v.zuinigheidslabel || undefined,
    emissionClass: emission || undefined,
    catalogPrice: num(v.catalogusprijs),
    grossBpm: num(v.bruto_bpm),
    apkExpiry: rdwDate(v.vervaldatum_apk),
  };
}

export type ApkState = "geldig" | "binnenkort" | "verlopen" | "onbekend";

export interface ApkStatus {
  state: ApkState;
  expiry?: string; // ISO
  daysLeft?: number;
  label: string;
}

/**
 * Bereken de APK-status t.o.v. een referentiedatum (standaard 'today' die de
 * aanroeper meegeeft; we gebruiken geen impliciete new Date() hier zodat het
 * testbaar/voorspelbaar blijft).
 */
export function apkStatus(v: Pick<VehicleInfo, "apkExpiry">, today: Date): ApkStatus {
  if (!v.apkExpiry) return { state: "onbekend", label: "APK-datum onbekend bij de RDW" };
  const expiry = new Date(v.apkExpiry + "T00:00:00");
  const ms = expiry.getTime() - today.getTime();
  const daysLeft = Math.round(ms / 86_400_000);
  if (daysLeft < 0) return { state: "verlopen", expiry: v.apkExpiry, daysLeft, label: `APK is ${Math.abs(daysLeft)} dagen verlopen` };
  if (daysLeft <= 42) return { state: "binnenkort", expiry: v.apkExpiry, daysLeft, label: `APK verloopt over ${daysLeft} dagen` };
  return { state: "geldig", expiry: v.apkExpiry, daysLeft, label: `APK nog ${daysLeft} dagen geldig` };
}
