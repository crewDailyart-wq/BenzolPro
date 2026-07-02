"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { ChatIcon, CloseIcon, SendIcon, BoltIcon } from "./icons";

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
}

/** Simple keyword-matched canned assistant — fully client-side, no external API. */
function botReply(input: string): string {
  const q = input.toLowerCase();
  if (/(kenteken|rdw|plaat)/.test(q)) {
    return "Vul je kenteken in bij 'Vind jouw olie' bovenaan de homepage — wij zoeken je auto op via de officiële RDW-data en tonen direct de juiste olie.";
  }
  if (/(bezorg|lever|verzend|shipping|pakket)/.test(q)) {
    return "Voor 22:00 besteld = morgen in huis. Vanaf €50 en bij elke bundeldeal is de verzending altijd gratis.";
  }
  if (/(betaal|ideal|apple ?pay|afreken|checkout)/.test(q)) {
    return "Je kunt razendsnel afrekenen met iDEAL, Apple Pay, creditcard of PayPal — in slechts een paar seconden.";
  }
  if (/(garage|zakelijk|offerte|bulk|groothand|vat|208|60l|20l)/.test(q)) {
    return "Voor garages hebben we scherpe staffelprijzen en groothandelmaten (20L, 60L, 208L). Zet de knop op 'Garage' voor directe kortingen of vraag een offerte aan via /offerte.";
  }
  if (/(retour|terug|geld ?terug)/.test(q)) {
    return "Niet goed? 30 dagen gratis retour, zolang de verpakking ongeopend is.";
  }
  if (/(bundel|korting|deal|actie)/.test(q)) {
    return "Kijk op onze bundeldeals-pagina — pakketten met altijd gratis verzending en een leuk cadeautje erbij.";
  }
  if (/(certificaat|keurmerk|norm|acea|api|iso)/.test(q)) {
    return "Al onze olie voldoet aan officiële ACEA-, API- en OEM-specificaties. Bekijk alle certificaten op de certificatenpagina.";
  }
  if (/(hoi|hallo|hey)/.test(q)) {
    return "Hoi! Waar kan ik je mee helpen — kenteken, bezorging, betalen, garageprijzen of retourneren?";
  }
  return "";
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return idCounter;
}

export default function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), from: "bot", text: t("chat.greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const reply = botReply(text) || t("chat.fallback");
      setMessages((m) => [...m, { id: nextId(), from: "bot", text: reply }]);
      setTyping(false);
    }, 700);
  }

  return (
    <>
      {/* panel */}
      <div
        className={`fixed bottom-24 end-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-card shadow-card transition-all duration-300 sm:end-6 ${
          open ? "pointer-events-auto h-[26rem] opacity-100" : "pointer-events-none h-0 opacity-0"
        }`}
      >
        <div className="blue-sheen flex items-center gap-2 border-b border-ink-line bg-ink-soft p-4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-azure/15 text-azure">
            <ChatIcon width={18} height={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{t("chat.title")}</p>
            <p className="flex items-center gap-1 truncate text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t("chat.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-zinc-400 hover:text-neon"
            aria-label={t("chat.closeLabel")}
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                m.from === "bot"
                  ? "self-start rounded-bl-sm bg-ink-soft text-zinc-200"
                  : "ms-auto self-end rounded-br-sm bg-neon text-ink"
              }`}
              style={{ marginInlineStart: m.from === "user" ? "auto" : undefined }}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-ink-soft px-3.5 py-2.5">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-zinc-400" />
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-zinc-400 [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-zinc-400 [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        <form onSubmit={send} className="flex items-center gap-2 border-t border-ink-line p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="input-field flex-1 !py-2.5"
          />
          <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neon text-ink transition hover:brightness-110" aria-label={t("chat.send")}>
            <SendIcon width={18} height={18} />
          </button>
        </form>
      </div>

      {/* launcher bubble */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 end-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon text-ink shadow-neon-lg transition hover:scale-105 active:scale-95 sm:end-6"
        aria-label={open ? t("chat.closeLabel") : t("chat.openLabel")}
      >
        {open ? <CloseIcon width={24} height={24} /> : <ChatIcon width={24} height={24} />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-azure text-[9px] font-bold text-white">
            <BoltIcon width={9} height={9} />
          </span>
        )}
      </button>
    </>
  );
}
