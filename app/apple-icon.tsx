import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (iOS "zet op beginscherm"). Gebrand, gegenereerd.
export default function AppleIcon() {
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
          fontSize: 108,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        B
      </div>
    ),
    { ...size },
  );
}
