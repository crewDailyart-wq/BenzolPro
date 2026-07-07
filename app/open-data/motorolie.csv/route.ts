import { buildDataset } from "@/lib/dataset";

export const dynamic = "force-static";
export const revalidate = 86400;

function csvCell(value: unknown): string {
  const s = String(value ?? "");
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Dezelfde open dataset als CSV — handig voor journalisten/onderzoekers. */
export function GET() {
  const rows = buildDataset();
  const headers = [
    "merk",
    "model",
    "uitvoering",
    "periode",
    "brandstof",
    "viscositeit",
    "norm",
    "olie_inhoud_liter",
    "inhoud_geschat",
    "url",
  ];
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => csvCell((r as unknown as Record<string, unknown>)[h])).join(","));
  }
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Content-Disposition": 'inline; filename="benzolpro-motorolie-dataset.csv"',
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
