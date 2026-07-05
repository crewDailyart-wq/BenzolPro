import { NextResponse } from "next/server";
import type { RdwVehicle } from "@/lib/types";
import { isPlausiblePlate, normalizePlate, recommendOil } from "@/lib/rdw";
import { findCarPageByRdw } from "@/lib/carModels";

/**
 * Server-side proxy to the official RDW Open Data API.
 * Keeps requests off the client, lets us combine the vehicle + fuel datasets,
 * and returns a ready-to-render oil recommendation.
 *
 * Datasets:
 *   - Gekentekende voertuigen:        m9d7-ebf2
 *   - Gekentekende voertuigen brandstof: 8ys7-d773
 */

const VEHICLE_DS = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
const FUEL_DS = "https://opendata.rdw.nl/resource/8ys7-d773.json";

function parseYear(value?: string): number | undefined {
  if (!value || value.length < 4) return undefined;
  const y = Number(value.slice(0, 4));
  return Number.isFinite(y) && y > 1900 ? y : undefined;
}

function titleCase(value?: string): string | undefined {
  if (!value) return undefined;
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("plate") ?? "";
  const plate = normalizePlate(raw);

  if (!isPlausiblePlate(plate)) {
    return NextResponse.json({ found: false, reason: "invalid" }, { status: 400 });
  }

  try {
    const [vehicleRes, fuelRes] = await Promise.all([
      fetch(`${VEHICLE_DS}?kenteken=${plate}`, { headers: { Accept: "application/json" }, next: { revalidate: 86400 } }),
      fetch(`${FUEL_DS}?kenteken=${plate}`, { headers: { Accept: "application/json" }, next: { revalidate: 86400 } }),
    ]);

    if (!vehicleRes.ok) {
      return NextResponse.json({ found: false, reason: "error" }, { status: 502 });
    }

    const vehicleData = (await vehicleRes.json()) as Array<Record<string, string>>;
    const fuelData = fuelRes.ok ? ((await fuelRes.json()) as Array<Record<string, string>>) : [];

    if (!Array.isArray(vehicleData) || vehicleData.length === 0) {
      return NextResponse.json({ found: false, reason: "notFound" }, { status: 404 });
    }

    const v = vehicleData[0];
    const fuelDesc = fuelData
      .map((f) => f.brandstof_omschrijving)
      .filter(Boolean)
      .join(" / ");

    const vehicle: RdwVehicle = {
      plate,
      found: true,
      make: titleCase(v.merk),
      model: titleCase(v.handelsbenaming),
      year: parseYear(v.datum_eerste_toelating),
      fuel: fuelDesc || undefined,
      cylinders: v.aantal_cilinders ? Number(v.aantal_cilinders) : undefined,
      bodyType: titleCase(v.inrichting),
      color: titleCase(v.eerste_kleur),
    };

    const recommendation = recommendOil(vehicle);

    // Koppel de RDW-uitslag aan onze /olie-pagina (server-side, houdt de
    // auto-database uit de client-bundle).
    const match = recommendation.isElectric ? null : findCarPageByRdw(vehicle.make, vehicle.model);
    recommendation.carPage = match
      ? { makeSlug: match.makeSlug, modelSlug: match.modelSlug, makeName: match.make.name, modelName: match.model.model }
      : null;

    return NextResponse.json(recommendation, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    });
  } catch {
    return NextResponse.json({ found: false, reason: "error" }, { status: 500 });
  }
}
