// Client-veilige helpers voor "Mijn Garage": opgeslagen auto's, olie-interval,
// APK-status en agenda-export (.ics). Geen server-imports — bruikbaar in de
// browser (localStorage) en in de reminder-cron (voor de datumlogica).

export interface SavedCar {
  plate: string;
  make?: string;
  model?: string;
  year?: number;
  apkExpiry?: string; // ISO YYYY-MM-DD
  oilViscosity?: string | null;
  productSlug?: string | null;
  isElectric?: boolean;
  /** door de gebruiker ingevuld: datum laatste olieverversing (ISO) */
  lastOilChange?: string;
  /** verversingsinterval in maanden (standaard 12) */
  oilIntervalMonths?: number;
  addedAt?: string;
}

export const STORAGE_KEY = "benzolpro.garage";
export const DEFAULT_INTERVAL_MONTHS = 12;

/** Aantal dagen tot een ISO-datum t.o.v. 'today' (negatief = verlopen). */
export function daysUntil(iso: string | undefined, today: Date): number | undefined {
  if (!iso) return undefined;
  const target = new Date(iso + "T00:00:00");
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export type DueState = "ok" | "soon" | "overdue" | "unknown";

export function stateFromDays(days: number | undefined, soonWithin = 42): DueState {
  if (days == null) return "unknown";
  if (days < 0) return "overdue";
  if (days <= soonWithin) return "soon";
  return "ok";
}

/** Volgende olieverversing = laatste verversing + interval (maanden). */
export function nextOilChange(car: Pick<SavedCar, "lastOilChange" | "oilIntervalMonths">): string | undefined {
  if (!car.lastOilChange) return undefined;
  const d = new Date(car.lastOilChange + "T00:00:00");
  d.setMonth(d.getMonth() + (car.oilIntervalMonths ?? DEFAULT_INTERVAL_MONTHS));
  return d.toISOString().slice(0, 10);
}

// -------------------- ICS (agenda) --------------------

function icsDate(iso: string): string {
  return iso.replace(/-/g, ""); // YYYYMMDD (all-day)
}

function icsEvent(opts: { uid: string; date: string; summary: string; description: string; stamp: string }): string {
  return [
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${opts.stamp}`,
    `DTSTART;VALUE=DATE:${icsDate(opts.date)}`,
    `SUMMARY:${opts.summary}`,
    `DESCRIPTION:${opts.description}`,
    "BEGIN:VALARM",
    "TRIGGER:-P14D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${opts.summary}`,
    "END:VALARM",
    "END:VEVENT",
  ].join("\r\n");
}

/**
 * Bouw een .ics-agendabestand met de APK- en olieverversing-herinneringen voor
 * één of meer auto's. `stamp` is een tijdstempel (YYYYMMDDatHHMMSSZ) die de
 * aanroeper meegeeft.
 */
export function buildIcs(cars: SavedCar[], stamp: string): string {
  const events: string[] = [];
  for (const car of cars) {
    const name = [car.make, car.model].filter(Boolean).join(" ") || car.plate;
    if (car.apkExpiry) {
      events.push(
        icsEvent({
          uid: `apk-${car.plate}@benzolpro.nl`,
          date: car.apkExpiry,
          summary: `APK ${name} (${car.plate})`,
          description: `De APK van je ${name} verloopt. Plan de keuring op tijd — en combineer het met een olieverversing via BenzolPro.`,
          stamp,
        }),
      );
    }
    const oilDue = nextOilChange(car);
    if (oilDue && !car.isElectric) {
      events.push(
        icsEvent({
          uid: `olie-${car.plate}@benzolpro.nl`,
          date: oilDue,
          summary: `Olie verversen ${name}${car.oilViscosity ? ` (${car.oilViscosity})` : ""}`,
          description: `Tijd voor een olieverversing van je ${name}. Bestel de juiste olie op benzolpro.nl.`,
          stamp,
        }),
      );
    }
  }
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//BenzolPro//Mijn Garage//NL", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR"].join("\r\n");
}
