"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, PICKUP_DISCOUNT } from "@/lib/cart";
import { useI18n } from "@/lib/i18n/provider";
import { euro } from "@/lib/format";
import OilBottle from "./OilBottle";
import PaymentBadges from "./PaymentBadges";
import { LockIcon, CheckIcon, BoltIcon, ArrowRight, TruckIcon, PackageIcon } from "./icons";

type PayMethod = "ideal" | "applepay" | "card" | "paypal";

const BANKS = ["ABN AMRO", "ING", "Rabobank", "bunq", "ASN Bank", "SNS", "Knab", "Revolut", "Triodos"];

// A few example collection points customers can pick up from.
const PICKUP_POINTS = [
  "Benzol Afhaalpunt — Amsterdam Noord",
  "Benzol Afhaalpunt — Rotterdam Alexander",
  "Benzol Afhaalpunt — Utrecht Lage Weide",
  "Benzol Afhaalpunt — Eindhoven De Hurk",
  "Benzol Afhaalpunt — Antwerpen Merksem",
];

export default function Checkout() {
  const { lines, subtotal, shipping, discount, total, count, deliveryMethod, setDeliveryMethod } = useCart();
  const { t } = useI18n();

  const [method, setMethod] = useState<PayMethod>("ideal");
  const [bank, setBank] = useState(BANKS[0]);
  const [email, setEmail] = useState("");
  const [pickupPoint, setPickupPoint] = useState(PICKUP_POINTS[0]);
  const [form, setForm] = useState({ firstName: "", lastName: "", address: "", postal: "", city: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isPickup = deliveryMethod === "pickup";

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(express: boolean): boolean {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("checkout.invalidEmail");
    if (!express) {
      if (!form.firstName) e.firstName = t("checkout.required");
      if (!form.lastName) e.lastName = t("checkout.required");
      // A full delivery address is only required for home delivery; when
      // picking up at a collection point just the name + pickup point suffice.
      if (!isPickup) {
        if (!form.address) e.address = t("checkout.required");
        if (!form.postal) e.postal = t("checkout.required");
        if (!form.city) e.city = t("checkout.required");
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function completeOrder(express: boolean) {
    if (!validate(express)) return;
    setApiError(null);
    setProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          method,
          deliveryMethod,
          pickupPoint: isPickup ? pickupPoint : undefined,
          customer: { ...form },
          // Alleen id/maat/aantal — de server herberekent alle prijzen zelf.
          lines: lines.map((l) => ({
            productId: l.productId,
            sizeLiter: l.sizeLiter,
            qty: l.qty,
            isBundle: Boolean(l.isBundle),
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.checkoutUrl) {
        setProcessing(false);
        setApiError(data?.error || t("checkout.payError"));
        return;
      }

      // Bewaar een korte samenvatting zodat de bedankpagina meteen iets kan tonen
      // terwijl de definitieve status bij Mollie wordt opgehaald.
      try {
        localStorage.setItem(
          "benzolpro.pendingOrder",
          JSON.stringify({ orderId: data.orderId, email, total }),
        );
      } catch {
        /* ignore */
      }
      // Door naar de beveiligde betaalpagina van Mollie (iDEAL, kaart, Apple Pay …).
      window.location.href = data.checkoutUrl;
    } catch {
      setProcessing(false);
      setApiError(t("checkout.payError"));
    }
  }

  if (count === 0 && !processing) {
    return (
      <div className="section-pad flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-xl font-semibold">{t("cart.empty")}</p>
        <p className="max-w-sm text-zinc-500">{t("cart.emptyBody")}</p>
        <Link href="/products" className="btn-neon">
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  const methods: { id: PayMethod; label: string; hint: string }[] = [
    { id: "ideal", label: t("pay.ideal"), hint: "🇳🇱" },
    { id: "applepay", label: t("pay.applepay"), hint: "" },
    { id: "card", label: t("pay.card"), hint: "💳" },
    { id: "paypal", label: t("pay.paypal"), hint: "" },
  ];

  return (
    <div className="section-pad py-10">
      <h1 className="text-3xl font-extrabold">{t("checkout.title")}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* form column */}
        <div>
          {/* express checkout */}
          <div className="card-surface p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
              <BoltIcon width={16} height={16} className="text-neon" /> {t("checkout.express")}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => completeOrder(true)}
                disabled={processing}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black transition hover:brightness-95 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16.4 12.9c0-2 1.6-3 1.7-3-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7.9 1.4 2 2.5 1.9 1-.04 1.3-.6 2.5-.6s1.5.6 2.6.6c1 0 1.7-.9 2.4-1.9.7-1 1-2 1-2-.1 0-2-.8-2-2.9zM14.6 6.6c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1z" />
                </svg>
                Pay
              </button>
              <button
                type="button"
                onClick={() => completeOrder(true)}
                disabled={processing}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cc0066] font-bold text-white transition hover:brightness-110 active:scale-95"
              >
                iDEAL
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              {t("checkout.express")} — {t("checkout.orderNote")}
            </p>
          </div>

          <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-wide text-zinc-600">
            <span className="h-px flex-1 bg-ink-line" /> {t("checkout.or")} <span className="h-px flex-1 bg-ink-line" />
          </div>

          {/* contact */}
          <Section title={t("checkout.contact")}>
            <Field label={t("checkout.email")} error={errors.email}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="jouw@email.nl"
                autoComplete="email"
              />
            </Field>
          </Section>

          {/* delivery method: home delivery vs pickup point (with discount) */}
          <Section title={t("checkout.deliveryMethod")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDeliveryMethod("home")}
                className={`relative flex flex-col items-start gap-1 rounded-xl border p-4 text-start transition ${
                  !isPickup ? "border-neon bg-neon/10" : "border-ink-line bg-ink-card hover:border-neon/50"
                }`}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <TruckIcon width={18} height={18} className="text-emerald-400" /> {t("checkout.methodHome")}
                </span>
                <span className="text-xs text-zinc-400">{t("checkout.methodHomeHint")}</span>
                <span className="mt-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
                  {t("checkout.freeLabel")}
                </span>
                {!isPickup && <CheckIcon width={16} height={16} className="absolute end-3 top-3 text-neon" />}
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod("pickup")}
                className={`relative flex flex-col items-start gap-1 rounded-xl border p-4 text-start transition ${
                  isPickup ? "border-azure bg-azure/10" : "border-ink-line bg-ink-card hover:border-azure/50"
                }`}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <PackageIcon width={18} height={18} className="text-azure" /> {t("checkout.methodPickup")}
                </span>
                <span className="text-xs text-zinc-400">
                  {t("checkout.methodPickupHint", { amount: euro(PICKUP_DISCOUNT) })}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                  <CheckIcon width={12} height={12} /> {t("checkout.methodPickupSave", { amount: euro(PICKUP_DISCOUNT) })}
                </span>
                {isPickup && <CheckIcon width={16} height={16} className="absolute end-3 top-3 text-azure" />}
              </button>
            </div>
          </Section>

          {/* address (home) or pickup point (pickup) */}
          <Section title={isPickup ? t("checkout.pickupPoint") : t("checkout.delivery")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t("checkout.firstName")} error={errors.firstName}>
                <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="input-field" autoComplete="given-name" />
              </Field>
              <Field label={t("checkout.lastName")} error={errors.lastName}>
                <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="input-field" autoComplete="family-name" />
              </Field>
            </div>

            {isPickup ? (
              <Field label={t("checkout.pickupPoint")}>
                <select value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} className="input-field cursor-pointer">
                  {PICKUP_POINTS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
            ) : (
              <>
                <Field label={t("checkout.address")} error={errors.address}>
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} className="input-field" autoComplete="street-address" />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t("checkout.postal")} error={errors.postal}>
                    <input value={form.postal} onChange={(e) => update("postal", e.target.value)} className="input-field" placeholder="1234 AB" autoComplete="postal-code" />
                  </Field>
                  <Field label={t("checkout.city")} error={errors.city}>
                    <input value={form.city} onChange={(e) => update("city", e.target.value)} className="input-field" autoComplete="address-level2" />
                  </Field>
                </div>
              </>
            )}

            <Field label={t("checkout.phone")}>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input-field" autoComplete="tel" />
            </Field>
          </Section>

          {/* payment */}
          <Section title={t("checkout.payment")}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl border text-sm font-semibold transition ${
                    method === m.id ? "border-neon bg-neon/10 text-neon" : "border-ink-line bg-ink-card text-zinc-300 hover:border-neon/50"
                  }`}
                >
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {method === "ideal" && (
              <div className="mt-3">
                <label className="mb-1 block text-sm text-zinc-400">{t("checkout.selectBank")}</label>
                <select value={bank} onChange={(e) => setBank(e.target.value)} className="input-field cursor-pointer">
                  {BANKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}
          </Section>

          {apiError && (
            <p className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
              {apiError}
            </p>
          )}

          <button
            type="button"
            onClick={() => completeOrder(false)}
            disabled={processing}
            className="btn-neon mt-6 w-full text-base"
          >
            {processing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                {t("checkout.processing")}
              </>
            ) : (
              <>
                {t("checkout.payNow")} {euro(total)} <ArrowRight width={18} height={18} />
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
            <LockIcon width={14} height={14} /> {t("checkout.secured")}
          </p>
          <PaymentBadges marquee className="mt-4" />
        </div>

        {/* summary column */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-300">{t("checkout.summary")}</h2>
            <div className="mt-4 space-y-3">
              {lines.map((line) => (
                <div key={`${line.productId}-${line.sizeLiter}`} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-lg bg-ink-soft p-1">
                    <OilBottle accent={line.accent} viscosity={line.viscosity} className="h-full w-full" />
                    <span className="absolute -end-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-neon px-1 text-[11px] font-bold text-ink">
                      {line.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-tight">{line.name}</p>
                    <p className="text-xs text-zinc-500">
                      {line.isBundle ? t("bundle.badge") : `${line.sizeLiter} ${t("product.liter")}`}
                    </p>
                  </div>
                  <span className="text-sm font-bold">{euro(line.price * line.qty)}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-1.5 border-t border-ink-line pt-4 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>{t("cart.subtotal")}</span>
                <span className="text-zinc-100">{euro(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="flex items-center gap-1.5">
                  {isPickup ? <PackageIcon width={14} height={14} className="text-azure" /> : <TruckIcon width={14} height={14} className="text-emerald-400" />}
                  {t("cart.shipping")}
                </span>
                <span className="text-zinc-100">{shipping === 0 ? t("cart.free") : euro(shipping)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-semibold text-emerald-400">
                  <span>{t("checkout.discountLabel")}</span>
                  <span>− {euro(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-ink-line pt-2 text-lg font-bold">
                <span>{t("cart.total")}</span>
                <span className="text-neon">{euro(total)}</span>
              </div>
            </div>

            <ul className="mt-4 space-y-1.5 text-xs text-zinc-500">
              <li className="flex items-center gap-1.5"><CheckIcon width={13} height={13} className="text-neon" /> {t("hero.trust2")}</li>
              <li className="flex items-center gap-1.5"><CheckIcon width={13} height={13} className="text-neon" /> {t("product.freeReturns")}</li>
            </ul>
          </div>
          <p className="mt-3 px-1 text-xs text-zinc-600">{t("checkout.orderNote")}</p>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card-surface mt-4 p-5">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-300">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-zinc-400">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
