import type { OilRecommendation, RdwVehicle, Viscosity } from "./types";
import { PRODUCTS } from "./products";

/** Normalize a Dutch plate to the RDW format (uppercase, no dashes/spaces). */
export function normalizePlate(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/** Basic sanity check: Dutch plates are 6 alphanumeric characters. */
export function isPlausiblePlate(input: string): boolean {
  const p = normalizePlate(input);
  return p.length === 6 && /^[A-Z0-9]+$/.test(p);
}

/** Pretty-print a plate loosely grouped for display, e.g. 12ABC3 -> 12-ABC-3. */
export function formatPlate(input: string): string {
  const p = normalizePlate(input);
  const groups = p.match(/[A-Z]+|[0-9]+/g);
  return groups ? groups.join("-") : p;
}

function classifyFuel(fuel?: string): "petrol" | "diesel" | "lpg" | "electric" | "other" {
  if (!fuel) return "other";
  const f = fuel.toLowerCase();
  if (f.includes("elektr")) return "electric";
  if (f.includes("diesel")) return "diesel";
  if (f.includes("lpg") || f.includes("gas") || f.includes("cng")) return "lpg";
  if (f.includes("benzine") || f.includes("petrol")) return "petrol";
  return "other";
}

/**
 * Heuristic mapping from vehicle characteristics to a recommended viscosity.
 * This is intentionally conservative and explainable — real-world oil choice
 * should always be cross-checked with the owner's manual.
 */
export function recommendOil(vehicle: RdwVehicle): OilRecommendation {
  const fuel = classifyFuel(vehicle.fuel);
  const year = vehicle.year ?? 0;

  if (fuel === "electric") {
    return { vehicle, viscosity: null, reasonKey: "plate.electricNote", productSlug: null, isElectric: true };
  }

  let viscosity: Viscosity;
  let reasonKey: string;

  if (fuel === "diesel") {
    if (year >= 2011) {
      viscosity = "5W30";
      reasonKey = "plate.reason.dieselModern";
    } else {
      viscosity = "5W40";
      reasonKey = "plate.reason.dieselOld";
    }
  } else if (fuel === "lpg") {
    viscosity = "5W40";
    reasonKey = "plate.reason.lpg";
  } else {
    // petrol / other treated as petrol
    if (year >= 2018) {
      viscosity = "0W30";
      reasonKey = "plate.reason.petrolNew";
    } else if (year >= 2010) {
      viscosity = "5W30";
      reasonKey = "plate.reason.petrolModern";
    } else if (year >= 2000) {
      viscosity = "5W40";
      reasonKey = "plate.reason.petrolMid";
    } else if (year > 0) {
      viscosity = "10W40";
      reasonKey = "plate.reason.petrolOld";
    } else {
      viscosity = "5W40";
      reasonKey = "plate.reason.generic";
    }
  }

  // Pick the best matching product for that viscosity: prefer one whose bestFor
  // tags include the detected fuel, then fall back to any product with the viscosity.
  const candidates = PRODUCTS.filter((p) => p.viscosity === viscosity);
  const preferred =
    candidates.find((p) => (fuel !== "other" ? p.bestFor.includes(fuel) : false)) ?? candidates[0];

  return {
    vehicle,
    viscosity,
    reasonKey,
    productSlug: preferred ? preferred.slug : null,
    isElectric: false,
  };
}
