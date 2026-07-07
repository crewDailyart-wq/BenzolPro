import { NextResponse } from "next/server";
import { fetchVehicle, apkStatus } from "@/lib/rdwVehicle";
import { recommendOil } from "@/lib/rdw";
import { findCarPageByRdw } from "@/lib/carModels";
import type { RdwVehicle } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Eén endpoint dat álle gratis kentekentools voedt: uitgebreide voertuiggegevens
 * (RDW) + APK-status + een olie-advies om naar de shop te leiden.
 */
export async function GET(req: Request) {
  const plate = new URL(req.url).searchParams.get("plate") ?? "";
  const vehicle = await fetchVehicle(plate);

  if (!vehicle.found) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  const apk = apkStatus(vehicle, new Date());

  // Olie-advies (voor de cross-sell op elke tool). Alleen een VOLLEDIG
  // elektrische auto heeft geen motorolie nodig; een plug-in hybride wél. De
  // oude olie-heuristiek ziet "Elektriciteit" al als elektrisch, dus voor
  // hybrides sturen we het verbrandingsdeel mee zodat er een viscositeit uitkomt.
  const isPureElectric = vehicle.fuelClass === "electric";
  const oilFuel =
    vehicle.fuelClass === "hybrid"
      ? vehicle.fuel?.toLowerCase().includes("diesel")
        ? "Diesel"
        : "Benzine"
      : vehicle.fuel;
  const rdw: RdwVehicle = {
    plate: vehicle.plate,
    found: true,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    fuel: isPureElectric ? vehicle.fuel : oilFuel,
    cylinders: vehicle.cylinders,
    bodyType: vehicle.bodyType,
    color: vehicle.color,
  };
  const rec = recommendOil(rdw);
  const match = isPureElectric ? null : findCarPageByRdw(vehicle.make, vehicle.model);
  const oil = {
    isElectric: isPureElectric,
    viscosity: isPureElectric ? null : rec.viscosity,
    productSlug: isPureElectric ? null : rec.productSlug,
    carPage: match ? { makeSlug: match.makeSlug, modelSlug: match.modelSlug, makeName: match.make.name, modelName: match.model.model } : null,
  };

  return NextResponse.json(
    { found: true, vehicle, apk, oil },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } },
  );
}
