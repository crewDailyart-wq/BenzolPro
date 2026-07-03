/**
 * Automerken waarvoor Benzol-olie geschikt is.
 * ------------------------------------------------------------------
 * Deze lijst mag je ZELF aanpassen. Per merk kun je invullen:
 *   name   : merknaam (bijv. "Volkswagen")
 *   logo   : (optioneel) bestandsnaam van het logo in public/merken/
 *            bijv. logo: "volkswagen.png"  → zet dat bestand in
 *            public/merken/. Zonder logo tonen we netjes de merknaam.
 *   spec   : de officiële norm / specificatie (de "gegevens")
 *   uitvoering : (optioneel) welke uitvoering/motor het betreft
 *
 * Zie public/merken/LEES-MIJ.txt voor uitleg over de logo-bestanden.
 */

export interface CarBrand {
  name: string;
  logo?: string;
  spec: string;
  uitvoering?: string;
}

export const CAR_BRANDS: CarBrand[] = [
  { name: "Volkswagen", spec: "VW 504.00 / 507.00", uitvoering: "TSI & TDI" },
  { name: "Audi", spec: "VW 504.00 / 507.00", uitvoering: "TFSI & TDI" },
  { name: "Mercedes-Benz", spec: "MB 229.51 / 229.52", uitvoering: "benzine & diesel" },
  { name: "BMW", spec: "BMW LL-04", uitvoering: "incl. M-Power" },
  { name: "Toyota", spec: "ACEA C5 / API SP", uitvoering: "Hybrid & benzine" },
  { name: "Renault", spec: "RN0710 / RN0720", uitvoering: "TCe & dCi" },
  { name: "Peugeot", spec: "PSA B71 2312", uitvoering: "PureTech & BlueHDi" },
  { name: "Opel", spec: "dexos2", uitvoering: "benzine & diesel" },
  { name: "Ford", spec: "ACEA A3/B4", uitvoering: "EcoBoost & TDCi" },
  { name: "Volvo", spec: "ACEA C3", uitvoering: "Drive-E" },
];
