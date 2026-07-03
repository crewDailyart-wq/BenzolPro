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

export const GARAGES: Garage[] = [
  // ---------------- Nederland ----------------
  { name: "AutoService Jansen", city: "Amersfoort", country: "NL" },
  { name: "GarageBox Amsterdam", city: "Amsterdam", country: "NL" },
  { name: "PitStop Rotterdam", city: "Rotterdam", country: "NL" },
  { name: "De Vries Automotive", city: "Leeuwarden", country: "NL" },
  { name: "TurboTech Utrecht", city: "Utrecht", country: "NL" },
  { name: "Garage El Amrani", city: "Den Haag", country: "NL" },
  { name: "Van Dijk Onderhoud", city: "Zwolle", country: "NL" },
  { name: "Motoreske Eindhoven", city: "Eindhoven", country: "NL" },
  { name: "Kaya Auto", city: "Arnhem", country: "NL" },
  { name: "Noord Garage", city: "Groningen", country: "NL" },
  { name: "SpeedFix Den Haag", city: "Den Haag", country: "NL" },
  { name: "Benzine & Co", city: "Breda", country: "NL" },
  { name: "AutoHerstel Bakker", city: "Alkmaar", country: "NL" },
  { name: "Garage Het Zuiden", city: "Maastricht", country: "NL" },
  { name: "Smit & Zonen", city: "Haarlem", country: "NL" },
  { name: "APK Centrum Tilburg", city: "Tilburg", country: "NL" },
  { name: "Garage Yildirim", city: "Nijmegen", country: "NL" },
  { name: "AutoPlus Almere", city: "Almere", country: "NL" },
  { name: "Werkplaats De Meern", city: "De Meern", country: "NL" },
  { name: "Garage Van Loon", city: "Venlo", country: "NL" },
  { name: "Onderhoud Deventer", city: "Deventer", country: "NL" },
  { name: "AutoTeam Dordrecht", city: "Dordrecht", country: "NL" },

  // ---------------- België ----------------
  { name: "Garage Peeters", city: "Antwerpen", country: "BE" },
  { name: "AutoService Mertens", city: "Gent", country: "BE" },
  { name: "Garage De Smet", city: "Brugge", country: "BE" },
  { name: "PitLine Brussel", city: "Brussel", country: "BE" },
  { name: "Garage Janssens", city: "Leuven", country: "BE" },
  { name: "AutoCenter Hasselt", city: "Hasselt", country: "BE" },
  { name: "Garage Dubois", city: "Luik", country: "BE" },
  { name: "Willems Automotive", city: "Mechelen", country: "BE" },
  { name: "Garage Vandenberghe", city: "Kortrijk", country: "BE" },
  { name: "AutoFix Oostende", city: "Oostende", country: "BE" },
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
