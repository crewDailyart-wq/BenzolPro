/**
 * Garages die al met Benzol rijden.
 * ------------------------------------------------------------------
 * Deze lijst mag je ZELF aanvullen. Voeg gewoon regels toe of pas ze
 * aan — elke regel heeft:
 *   name    : de naam van de garage
 *   city    : de plaats
 *   country : "NL" (Nederland) of "BE" (België)
 *   logo    : (optioneel) bestandsnaam van een logo in public/garages/
 *             bijv. logo: "autoservice-jansen.png"  →
 *             zet dat bestand in public/garages/. Zonder logo tonen we
 *             automatisch de eerste letter(s) van de naam in een nette badge.
 *
 * Zie public/garages/LEES-MIJ.txt voor meer uitleg over logo's.
 */

export interface Garage {
  name: string;
  city: string;
  country: "NL" | "BE";
  logo?: string;
}

// Echte garages die — onder andere — met Benzol rijden. De plaatsen zijn per
// garage opgezocht. Twee ervan (Car Port, Auto-via) waren niet eenduidig te
// herleiden; die staan op "Nederland" en vallen op de kaart terug op het
// midden van het land. Weet je de juiste plaats? Vervang dan gewoon "Nederland".
export const GARAGES: Garage[] = [
  // ---------------- Nederland ----------------
  { name: "TA cars bv", city: "Roosendaal", country: "NL" },
  { name: "HGD Autobedrijf", city: "Delft", country: "NL" },
  { name: "Kaya Automotive Solutions", city: "Delft", country: "NL" },
  { name: "A.P.K. Keuringsstation Durak", city: "Rotterdam", country: "NL" },
  { name: "Garage AZA", city: "Alblasserdam", country: "NL" },
  { name: "Road King Autobedrijf", city: "Beek en Donk", country: "NL" },
  { name: "Garage Sorgun", city: "Rotterdam", country: "NL" },
  { name: "Ilgin Garage", city: "Dordrecht", country: "NL" },
  { name: "Autobedrijf Maassluis", city: "Maassluis", country: "NL" },
  { name: "Garagebedrijf Dynamic", city: "Delft", country: "NL" },
  { name: "All Cars", city: "Vlaardingen", country: "NL" },
  { name: "QSR Quick Services Rotterdam", city: "Rotterdam", country: "NL" },
  { name: "Autoservice Kasmeka", city: "Helmond", country: "NL" },
  { name: "Car Port", city: "Nederland", country: "NL" },
  { name: "Garage Oscar", city: "Rotterdam", country: "NL" },
  { name: "Autoservice Moes Utrecht", city: "Utrecht", country: "NL" },
  { name: "Garage Haydar", city: "Delft", country: "NL" },
  { name: "Autobedrijf Kulek", city: "Oosterhout", country: "NL" },
  { name: "APK Keurgarage Spijkenisse", city: "Spijkenisse", country: "NL" },
  { name: "Auto-via", city: "Nederland", country: "NL" },
  { name: "Garage Shad", city: "Bergen op Zoom", country: "NL" },
  { name: "Autobedrijf Kaan", city: "Rotterdam", country: "NL" },
  { name: "Autoservice Maestropoort", city: "Maasland", country: "NL" },
  { name: "Autobedrijf Sjoko", city: "Rotterdam", country: "NL" },

  // ---------------- België ----------------
  { name: "Maars Garage", city: "Antwerpen", country: "BE" },
];

/** All garages, or only those in a given country. */
export function getGarages(country?: "NL" | "BE"): Garage[] {
  return country ? GARAGES.filter((g) => g.country === country) : GARAGES;
}

/** Short badge initials (max 2 letters) used when a garage has no logo. */
export function garageInitials(name: string): string {
  const words = name.replace(/[^A-Za-z\s]/g, "").trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * [lon, lat] per plaats — gebruikt door de garagekaart én de lokale
 * "olie verversen in [stad]"-pagina's (voor geo-coördinaten in de LocalBusiness-
 * structured-data). Voeg een plaats toe om die precies te plaatsen.
 */
export const CITY_COORDS: Record<string, [number, number]> = {
  Amersfoort: [5.387, 52.156], Amsterdam: [4.895, 52.37], Rotterdam: [4.478, 51.924],
  Leeuwarden: [5.798, 53.201], Utrecht: [5.121, 52.09], "Den Haag": [4.3, 52.078],
  Zwolle: [6.09, 52.512], Eindhoven: [5.47, 51.441], Arnhem: [5.899, 51.985],
  Groningen: [6.567, 53.219], Breda: [4.776, 51.585], Alkmaar: [4.749, 52.632],
  Maastricht: [5.688, 50.851], Haarlem: [4.646, 52.383], Tilburg: [5.091, 51.56],
  Nijmegen: [5.852, 51.842], Almere: [5.214, 52.35], "De Meern": [5.03, 52.083],
  Venlo: [6.168, 51.37], Deventer: [6.163, 52.251], Dordrecht: [4.69, 51.813],
  Antwerpen: [4.402, 51.219], Gent: [3.725, 51.054], Brugge: [3.224, 51.209],
  Brussel: [4.352, 50.847], Leuven: [4.7, 50.879], Hasselt: [5.338, 50.93],
  Luik: [5.573, 50.633], Mechelen: [4.48, 51.028], Kortrijk: [3.265, 50.828],
  Oostende: [2.918, 51.233],
  // steden van de echte garages
  Roosendaal: [4.465, 51.531], Delft: [4.357, 52.011], Alblasserdam: [4.662, 51.865],
  "Beek en Donk": [5.634, 51.535], Maassluis: [4.249, 51.923], Vlaardingen: [4.341, 51.912],
  Helmond: [5.661, 51.481], Oosterhout: [4.86, 51.645], Spijkenisse: [4.329, 51.845],
  "Bergen op Zoom": [4.291, 51.494], Maasland: [4.271, 51.943],
};

export const COUNTRY_CENTROID: Record<"NL" | "BE", [number, number]> = {
  NL: [5.2, 52.2],
  BE: [4.4, 50.95],
};

/** Plaatsnaam die geen echte stad is (placeholder voor onbekende locatie). */
const PLACEHOLDER_CITY = "Nederland";

/** URL-veilige slug van een plaatsnaam, bijv. "Bergen op Zoom" → "bergen-op-zoom". */
export function citySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/ë/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface CityEntry {
  city: string;
  slug: string;
  country: "NL" | "BE";
  garages: Garage[];
  /** [lon, lat] als de plaats bekend is */
  coords?: [number, number];
}

/**
 * Alle plaatsen waar minstens één Benzol-garage zit — voor de lokale
 * "olie verversen in [stad]"-pagina's. Placeholder-locaties worden overgeslagen.
 * Gesorteerd op aantal garages (aflopend), daarna alfabetisch.
 */
export function getCities(): CityEntry[] {
  const byCity = new Map<string, CityEntry>();
  for (const g of GARAGES) {
    if (g.city === PLACEHOLDER_CITY) continue;
    const existing = byCity.get(g.city);
    if (existing) {
      existing.garages.push(g);
    } else {
      byCity.set(g.city, {
        city: g.city,
        slug: citySlug(g.city),
        country: g.country,
        garages: [g],
        coords: CITY_COORDS[g.city],
      });
    }
  }
  return [...byCity.values()].sort(
    (a, b) => b.garages.length - a.garages.length || a.city.localeCompare(b.city, "nl"),
  );
}

export function getCityBySlug(slug: string): CityEntry | undefined {
  return getCities().find((c) => c.slug === slug);
}
