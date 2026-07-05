import { ImageResponse } from "next/og";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import { sizePrice, defaultSize, euro } from "@/lib/format";

export const alt = "BenzolPro product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Per-product social-share afbeelding met naam, viscositeit en prijs.
export default function OpengraphImage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const name = product?.name ?? "BenzolPro motorolie";
  const stdSize = product ? defaultSize(product.sizesLiter) : 5;
  const price = product ? euro(sizePrice(product, stdSize)) : "";
  const accent = product?.accent ?? "#e7b53c";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #0a0a0b 0%, #14100a 60%, #0a0a0b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#e7b53c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0b",
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <span style={{ fontWeight: 700, color: "#ffffff" }}>BenzolPro</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: accent, fontWeight: 700 }}>
            {product?.viscosity ?? "Motorolie"}
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#ffffff", lineHeight: 1.05, marginTop: 10 }}>
            {name}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 30, color: "#c9c9cf" }}>Altijd gratis verzending · morgen in huis</div>
          {price && (
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: "#0a0a0b",
                background: accent,
                padding: "12px 28px",
                borderRadius: 18,
              }}
            >
              {price}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
