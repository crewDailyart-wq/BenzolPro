import type { Metadata } from "next";
import EmbedPlateChecker from "@/components/EmbedPlateChecker";

export const metadata: Metadata = {
  title: "Kentekencheck-widget — BenzolPro",
  // De widget zelf niet indexeren (voorkomt duplicate content); de indexeerbare
  // pagina is /kenteken-check.
  robots: { index: false, follow: true },
};

export default function EmbedKentekenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent p-3">
      <EmbedPlateChecker />
    </div>
  );
}
