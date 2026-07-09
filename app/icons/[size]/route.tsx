import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Genereert het app-icoon (PWA/manifest) op de gevraagde maat. Volbloed gouden
// tegel met een zwarte "B" — maskable-veilig (vult het hele vierkant). Geen
// losse afbeeldingsbestanden nodig.
export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }, { size: "180" }];
}

export function GET(_req: Request, { params }: { params: { size: string } }) {
  const n = Number(params.size);
  const size = [180, 192, 512].includes(n) ? n : 512;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e7b53c 0%, #f6d989 55%, #d99f1f 100%)",
          color: "#0a0a0b",
          fontSize: size * 0.6,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        B
      </div>
    ),
    { width: size, height: size },
  );
}
