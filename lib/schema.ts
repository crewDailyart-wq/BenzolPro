import type { Viscosity } from "./types";

/**
 * Bouwt een schema.org HowTo-blok voor "motorolie verversen" — Google kan dit
 * als stappen-rich-result tonen. Bewust generiek en veilig; benadrukt dat de
 * fabrieksnorm leidend is.
 */
export function oilChangeHowTo(opts: {
  subject: string; // bijv. "Volkswagen Golf 1.4 TSI"
  viscosity: Viscosity;
  capacityL?: number;
  url: string;
}) {
  const { subject, viscosity, capacityL, url } = opts;
  const liters = capacityL ? `${capacityL.toLocaleString("nl-NL", { maximumFractionDigits: 2 })} liter ` : "";
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Motorolie verversen bij de ${subject}`,
    description: `Zo ververs je de motorolie van de ${subject} met ${liters}${viscosity} motorolie. Controleer altijd de fabrieksnorm in je instructieboekje.`,
    inLanguage: "nl-NL",
    mainEntityOfPage: url,
    totalTime: "PT45M",
    supply: [
      { "@type": "HowToSupply", name: `${liters}${viscosity} motorolie` },
      { "@type": "HowToSupply", name: "Nieuw oliefilter" },
      { "@type": "HowToSupply", name: "Nieuwe aftapplugring" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Opvangbak" },
      { "@type": "HowToTool", name: "Steeksleutel of dopsleutel" },
      { "@type": "HowToTool", name: "Oliefiltersleutel" },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Motor op temperatuur brengen",
        text: "Laat de motor kort warmdraaien zodat de olie dunner wordt en beter wegloopt. Zet de motor daarna uit en wacht enkele minuten.",
      },
      {
        "@type": "HowToStep",
        name: "Oude olie aftappen",
        text: "Plaats de opvangbak onder het carter, draai de aftapplug los en laat de olie volledig weglopen. Vervang de aftapplugring.",
      },
      {
        "@type": "HowToStep",
        name: "Oliefilter vervangen",
        text: "Draai het oude oliefilter eraf en monteer een nieuw filter. Vet de rubberring licht in met verse olie voor een goede afdichting.",
      },
      {
        "@type": "HowToStep",
        name: `Verse ${viscosity} olie bijvullen`,
        text: `Draai de aftapplug terug en vul ${liters}verse ${viscosity} olie bij via de vuldop. Vul in beetjes en controleer het peil met de peilstok tot tussen minimum en maximum.`,
      },
      {
        "@type": "HowToStep",
        name: "Controleren op lekkage",
        text: "Start de motor kort, controleer op lekkage bij de aftapplug en het filter, zet af, wacht en meet het peil nogmaals.",
      },
    ],
  };
}
