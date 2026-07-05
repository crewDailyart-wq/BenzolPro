"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { CloseIcon, SendIcon, WhatsAppIcon } from "./icons";

// WhatsApp business number in international format (0685163960 -> +31 6 85163960)
const WHATSAPP_NUMBER = "31685163960";

interface Msg {
  id: number;
  from: "agent" | "user";
  text: string;
}

let idCounter = 0;
const nextId = () => (idCounter += 1);

/**
 * WhatsApp-style chat. The whole conversation happens visually on the site;
 * when the visitor sends a message it opens WhatsApp (app on mobile, WhatsApp
 * Web on desktop) with their message prefilled to this shop's number. A truly
 * live in-page WhatsApp thread would require the paid WhatsApp Business API +
 * a backend — this is the standard on-site widget approach.
 */
export default function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), from: "agent", text: t("chat.greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function openWhatsApp(text: string) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    // show the visitor's message in the on-site thread, then hand off to WhatsApp
    setMessages((m) => [
      ...m,
      { id: nextId(), from: "user", text },
      { id: nextId(), from: "agent", text: t("chat.handoff") },
    ]);
    setInput("");
    openWhatsApp(text);
  }

  return (
    <>
      {/* panel */}
      <div
        className={`fixed bottom-24 end-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-ink-line shadow-card transition-all duration-300 sm:end-6 ${
          open ? "pointer-events-auto h-[26rem] opacity-100" : "pointer-events-none h-0 opacity-0"
        }`}
      >
        {/* WhatsApp-green header */}
        <div className="flex items-center gap-3 bg-[#075E54] p-4 text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]">
            <WhatsAppIcon width={22} height={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{t("chat.title")}</p>
            <p className="flex items-center gap-1 truncate text-[11px] text-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> {t("chat.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-emerald-100 hover:bg-white/10 hover:text-white"
            aria-label={t("chat.closeLabel")}
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        {/* chat area */}
        <div ref={scrollRef} className="flex flex-1 flex-col gap-2 overflow-y-auto bg-[#0b141a] p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                m.from === "agent"
                  ? "self-start rounded-tl-sm bg-[#1f2c33] text-zinc-100"
                  : "self-end rounded-tr-sm bg-[#005c4b] text-white"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* input → opens WhatsApp on send */}
        <form onSubmit={send} className="flex items-center gap-2 bg-[#0b141a] p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            className="flex-1 rounded-full border border-white/10 bg-[#1f2c33] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#25D366]"
          />
          <button
            type="submit"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition hover:brightness-110 active:scale-95"
            aria-label={t("chat.send")}
          >
            <SendIcon width={18} height={18} />
          </button>
        </form>
      </div>

      {/* launcher bubble (WhatsApp green) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 end-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-105 active:scale-95 sm:end-6"
        aria-label={open ? t("chat.closeLabel") : t("chat.openLabel")}
      >
        {open ? <CloseIcon width={24} height={24} /> : <WhatsAppIcon width={28} height={28} />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        )}
      </button>
    </>
  );
}
