// Server-side ordervalidatie. Cruciaal voor échte betalingen: vertrouw NOOIT de
// prijzen die de browser meestuurt. We herberekenen elke regel uit de eigen
// productdata (lib/products.ts / lib/bundles.ts), zodat een gemanipuleerde
// client geen eigen prijs kan afdwingen.
import { getProductById } from "./products";
import { BUNDLES } from "./bundles";
import { sizePrice } from "./format";
import { PICKUP_DISCOUNT } from "./cart";

export interface IncomingLine {
  productId: string;
  sizeLiter: number;
  qty: number;
  isBundle?: boolean;
}

export interface ValidatedLine {
  productId: string;
  name: string;
  sizeLiter: number;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  isBundle: boolean;
}

export interface ValidatedOrder {
  lines: ValidatedLine[];
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

const MAX_QTY = 999;

function findBundle(id: string) {
  return BUNDLES.find((b) => b.id === id);
}

/**
 * Herbereken een binnenkomende winkelwagen naar een gevalideerde bestelling.
 * Gooit een Error met een leesbare boodschap als een regel ongeldig is.
 */
export function validateOrder(
  rawLines: unknown,
  deliveryMethod: "home" | "pickup" = "home",
): ValidatedOrder {
  if (!Array.isArray(rawLines) || rawLines.length === 0) {
    throw new Error("Winkelwagen is leeg.");
  }

  const lines: ValidatedLine[] = [];

  for (const raw of rawLines as IncomingLine[]) {
    const qty = Math.floor(Number(raw?.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
      throw new Error("Ongeldig aantal in de winkelwagen.");
    }

    if (raw?.isBundle) {
      const bundle = findBundle(String(raw.productId));
      if (!bundle) throw new Error(`Onbekende bundel: ${raw?.productId}`);
      const unit = bundle.price;
      lines.push({
        productId: bundle.id,
        name: bundle.name.nl,
        sizeLiter: 0,
        qty,
        unitPrice: unit,
        lineTotal: unit * qty,
        isBundle: true,
      });
      continue;
    }

    const product = getProductById(String(raw?.productId));
    if (!product) throw new Error(`Onbekend product: ${raw?.productId}`);
    const size = Number(raw?.sizeLiter);
    if (!product.sizesLiter.includes(size)) {
      throw new Error(`Ongeldige maat ${size}L voor ${product.name}.`);
    }
    const unit = sizePrice(product, size);
    lines.push({
      productId: product.id,
      name: product.name,
      sizeLiter: size,
      qty,
      unitPrice: unit,
      lineTotal: unit * qty,
      isBundle: false,
    });
  }

  const subtotal = round2(lines.reduce((s, l) => s + l.lineTotal, 0));
  // Verzending is altijd gratis; afhalen geeft een kleine korting (zelfde regel
  // als in de winkelwagen, lib/cart.tsx).
  const discount = deliveryMethod === "pickup" && subtotal > 0 ? PICKUP_DISCOUNT : 0;
  const total = round2(Math.max(0, subtotal - discount));
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  return { lines, subtotal, discount, total, itemCount };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Genereer een leesbaar ordernummer op basis van de betaal-id. */
export function orderNumberFrom(paymentId: string): string {
  const digits = paymentId.replace(/\D/g, "").slice(-6).padStart(6, "0");
  return `BP-${digits}`;
}

/** Korte, mensvriendelijke samenvatting van de regels (voor e-mail/metadata). */
export function summarizeLines(lines: ValidatedLine[]): string {
  return lines
    .map((l) => `${l.qty}× ${l.name}${l.isBundle ? " (bundel)" : ` ${l.sizeLiter}L`}`)
    .join(", ");
}
