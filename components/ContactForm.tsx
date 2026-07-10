"use client";

import { useState } from "react";
import { CheckIcon, SendIcon } from "./icons";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

/** Echt verzendend contactformulier (POST /api/contact → e-mail naar de winkelier). */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Vul je naam in";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Vul een geldig e-mailadres in";
    if (!form.message.trim()) e.message = "Schrijf een bericht";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSendError(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSending(false);
        setSendError(data?.error || "Versturen mislukt. Probeer het later opnieuw of mail ons rechtstreeks.");
        return;
      }
      setSending(false);
      setDone(true);
    } catch {
      setSending(false);
      setSendError("Versturen mislukt. Probeer het later opnieuw of mail ons rechtstreeks.");
    }
  }

  if (done) {
    return (
      <div className="card-surface flex flex-col items-center gap-3 p-8 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-neon text-ink shadow-neon-lg">
          <CheckIcon width={28} height={28} strokeWidth={2.5} />
        </div>
        <p className="text-lg font-bold">Bedankt voor je bericht!</p>
        <p className="max-w-sm text-sm text-zinc-400">
          We hebben je bericht ontvangen en reageren doorgaans binnen één werkdag.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Je naam" error={errors.name}>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input-field" autoComplete="name" />
        </Field>
        <Field label="Je e-mailadres" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="input-field"
            autoComplete="email"
            placeholder="jij@email.nl"
          />
        </Field>
      </div>

      <Field label="Onderwerp (optioneel)">
        <input value={form.subject} onChange={(e) => update("subject", e.target.value)} className="input-field" placeholder="Bijv. vraag over een bestelling" />
      </Field>

      <Field label="Je bericht" error={errors.message}>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          className="input-field resize-y"
          placeholder="Waarmee kunnen we je helpen?"
        />
      </Field>

      {sendError && <p className="text-sm text-red-400">{sendError}</p>}

      <button type="submit" disabled={sending} className="btn-neon w-full justify-center sm:w-auto">
        {sending ? "Versturen…" : (<>Verstuur bericht <SendIcon width={18} height={18} /></>)}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-300">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
