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
