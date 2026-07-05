import { ImageResponse } from "next/og";

export const alt = "BenzolPro — Premium motorolie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Gebrande social-share afbeelding (verschijnt bij delen op WhatsApp/social).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0b 0%, #14100a 60%, #0a0a0b 100%)",
          color: "#f6d989",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, color: "#e7b53c" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#e7b53c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0b",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <span style={{ fontWeight: 700, color: "#ffffff" }}>BenzolPro</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 84, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>
          De juiste olie.
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, color: "#e7b53c", lineHeight: 1.05 }}>In seconden.</div>
        <div style={{ marginTop: 30, fontSize: 34, color: "#c9c9cf" }}>
          Kentekencheck via RDW · Altijd gratis verzending
        </div>
      </div>
    ),
    { ...size },
  );
}
