"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { ClipboardIcon, BuildingIcon, CheckIcon, ArrowRight } from "@/components/icons";

interface FormState {
  company: string;
  kvk: string;
  contact: string;
  email: string;
  phone: string;
  volume: string;
  products: string;
  message: string;
}

const EMPTY: FormState = { company: "", kvk: "", contact: "", email: "", phone: "", volume: "", products: "", message: "" };

export default function OfferteClient() {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.company) e.company = t("quote.required");
    if (!form.contact) e.contact = t("quote.required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("checkout.invalidEmail");
    if (!form.volume) e.volume = t("quote.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
    }, 1400);
  }

  if (done) {
    return (
      <div className="section-pad flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-neon text-ink shadow-neon-lg">
          <CheckIcon width={40} height={40} strokeWidth={2.5} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">{t("quote.successTitle")}</h1>
        <p className="mt-3 max-w-md text-zinc-400">{t("quote.successBody")}</p>
        <Link href="/" className="btn-neon mt-8">
          {t("quote.backHome")} <ArrowRight width={18} height={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="section-pad py-10">
      <div className="mx-auto max-w-2xl">
        <span className="chip"><BuildingIcon width={14} height={14} className="text-azure" /> {t("garages.badge")}</span>
        <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">{t("quote.title")}</h1>
        <p className="mt-2 text-zinc-400">{t("quote.subtitle")}</p>

        <form onSubmit={submit} className="card-surface mt-8 space-y-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("quote.company")} error={errors.company}>
              <input value={form.company} onChange={(e) => update("company", e.target.value)} className="input-field" />
            </Field>
            <Field label={t("quote.kvk")}>
              <input value={form.kvk} onChange={(e) => update("kvk", e.target.value)} className="input-field" placeholder="12345678" />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("quote.contact")} error={errors.contact}>
              <input value={form.contact} onChange={(e) => update("contact", e.target.value)} className="input-field" />
            </Field>
            <Field label={t("quote.phone")}>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input-field" />
            </Field>
          </div>

          <Field label={t("quote.email")} error={errors.email}>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-field" placeholder="jij@garage.nl" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("quote.volume")} error={errors.volume}>
              <input
                type="number"
                min={0}
                value={form.volume}
                onChange={(e) => update("volume", e.target.value)}
                className="input-field"
                placeholder="200"
              />
            </Field>
            <Field label={t("quote.productsLabel")}>
              <input
                value={form.products}
                onChange={(e) => update("products", e.target.value)}
                className="input-field"
                placeholder={t("quote.productsPlaceholder")}
              />
            </Field>
          </div>

          <Field label={t("quote.message")}>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="input-field min-h-[100px] resize-y"
            />
          </Field>

          <button type="submit" disabled={sending} className="btn-neon w-full">
            {sending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                {t("quote.sending")}
              </>
            ) : (
              <>
                <ClipboardIcon width={18} height={18} /> {t("quote.submit")}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
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
