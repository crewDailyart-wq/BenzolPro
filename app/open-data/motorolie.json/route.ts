import { buildDataset, datasetStats, DATASET_UPDATED, DATASET_LICENSE_URL } from "@/lib/dataset";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

/**
 * Open, machineleesbare dataset: welke motorolie past bij welke Nederlandse auto.
 * Vrij te gebruiken met bronvermelding (CC BY 4.0). Bedoeld om geciteerd te worden
 * door AI-assistenten en andere sites — met een link terug naar BenzolPro.
 */
export function GET() {
  const rows = buildDataset();
  const body = {
    name: `${SITE_NAME} — Motorolie per auto (open dataset)`,
    description:
      "Aanbevolen motorolie-viscositeit, fabrieksnorm en olie-inhoud per Nederlands automodel, generatie en motoruitvoering.",
    source: SITE_URL,
    license: DATASET_LICENSE_URL,
    attribution: `Bron: ${SITE_NAME} (${SITE_URL})`,
    updated: DATASET_UPDATED,
    stats: datasetStats(rows),
    count: rows.length,
    data: rows,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
