"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { useI18n } from "@/lib/i18n/provider";
import { UploadIcon, FileIcon, CheckIcon, ImageIcon } from "./icons";

const CATEGORY_NL: Record<string, string> = {
  fullSynthetic: "volsynthetische",
  syntheticBlend: "synthetische blend",
  mineral: "minerale",
  racing: "racing",
};

type TabKey = "omschrijving" | "specificaties" | "specsheet";

export default function ProductTabs({ product }: { product: Product }) {
  const { t } = useI18n();
  const [tab, setTab] = useState<TabKey>("omschrijving");

  // ---- Omschrijving (auto-samengesteld als er geen eigen tekst is) ----
  const bestForList = product.bestFor.map((b) => t(`bestFor.${b}`)).join(", ");
  const cat = CATEGORY_NL[product.category] ?? "";
  const description =
    product.description ??
    `De ${product.name} is een ${cat} motorolie die voldoet aan ${product.specs.join(
      ", ",
    )}. Ideaal voor ${bestForList || "dagelijks gebruik"}. Verkrijgbaar in ${product.sizesLiter.join(
      ", ",
    )} liter — met altijd gratis verzending en levering de volgende dag.`;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "omschrijving", label: "Omschrijving" },
    { key: "specificaties", label: "Specificaties" },
    { key: "specsheet", label: "Specificatieblad" },
  ];

  return (
    <section className="section-pad mt-14">
      <div className="rounded-3xl border border-ink-line bg-ink-card">
        {/* tab bar */}
        <div className="flex flex-wrap gap-1 border-b border-ink-line p-2">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                tab === tb.key
                  ? "bg-neon text-ink"
                  : "text-zinc-300 hover:bg-ink-soft hover:text-neon"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-7">
          {tab === "omschrijving" && (
            <div className="max-w-3xl">
              <p className="leading-relaxed text-zinc-300">{description}</p>
              {product.fitsNote && (
                <p className="mt-4 text-sm font-bold text-gold-metal">★ {product.fitsNote}</p>
              )}
            </div>
          )}

          {tab === "specificaties" && (
            <div className="max-w-3xl">
              <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-300">
                {t("product.specs")}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.specs.map((s) => (
                  <li key={s} className="rounded-lg bg-ink-soft px-3 py-1.5 text-sm text-zinc-200">
                    {s}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-zinc-300">
                {t("product.bestFor")}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.bestFor.map((b) => (
                  <li key={b} className="chip">
                    {t(`bestFor.${b}`)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "specsheet" && <SpecSheetTab product={product} />}
        </div>
      </div>
    </section>
  );
}

/**
 * Toont het specificatieblad (PDF). Zoekt eerst naar een echt bestand
 * (product.specSheet of /products/<slug>-specs.pdf). Bestaat dat, dan wordt het
 * netjes ingesloten met een downloadknop. Bestaat het (nog) niet, dan kun je
 * hier zelf een PDF kiezen om direct te tonen — met een uitleg hoe je die
 * permanent maakt door het bestand in public/products/ te zetten.
 */
function SpecSheetTab({ product }: { product: Product }) {
  const filePath = product.specSheet ?? `/products/${product.slug}-specs.pdf`;
  const [fileExists, setFileExists] = useState<boolean | null>(null);
  const [uploaded, setUploaded] = useState<{ name: string; url: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(filePath, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const type = res.headers.get("content-type") ?? "";
        setFileExists(res.ok && type.includes("pdf"));
      })
      .catch(() => !cancelled && setFileExists(false));
    return () => {
      cancelled = true;
    };
  }, [filePath]);

  // clean up the preview object URL when it changes / unmounts
  useEffect(() => {
    return () => {
      if (uploaded) URL.revokeObjectURL(uploaded.url);
    };
  }, [uploaded]);

  function pick(list: FileList | null) {
    const f = list?.[0];
    if (!f) return;
    if (uploaded) URL.revokeObjectURL(uploaded.url);
    setUploaded({ name: f.name, url: URL.createObjectURL(f) });
  }

  // A real, permanently uploaded spec sheet exists → show it.
  if (fileExists && !uploaded) {
    return (
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
            <FileIcon width={18} height={18} className="text-neon" /> Specificatieblad
          </p>
          <a href={filePath} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !text-sm">
            Openen / downloaden
          </a>
        </div>
        <iframe
          src={filePath}
          title="Specificatieblad"
          className="mt-4 h-[70vh] w-full rounded-xl border border-ink-line bg-white"
        />
      </div>
    );
  }

  return (
    <div>
      {uploaded ? (
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-zinc-200">
              <FileIcon width={18} height={18} className="text-neon" />
              <span className="truncate">{uploaded.name}</span>
            </p>
            <button type="button" onClick={() => setUploaded(null)} className="btn-ghost !py-2 !text-sm">
              Ander bestand
            </button>
          </div>
          <iframe
            src={uploaded.url}
            title="Specificatieblad (voorbeeld)"
            className="mt-4 h-[70vh] w-full rounded-xl border border-ink-line bg-white"
          />
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-line p-10 text-center transition hover:border-neon/60"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-neon/10 text-neon">
            <UploadIcon width={22} height={22} />
          </span>
          <p className="text-sm text-zinc-300">
            Kies een PDF met de specificaties om die hier te tonen
          </p>
          <span className="btn-ghost">PDF kiezen</span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => pick(e.target.files)}
          />
        </div>
      )}

      <div className="mt-6 flex gap-3 rounded-2xl border border-azure/30 bg-azure/5 p-4">
        <ImageIcon width={20} height={20} className="mt-0.5 shrink-0 text-azure" />
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-azure">
            {fileExists === false && !uploaded ? (
              "Zo maak je dit blad permanent"
            ) : (
              <>
                <CheckIcon width={14} height={14} /> Voorbeeld
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Wil je dat elke bezoeker dit specificatieblad ziet? Zet het PDF-bestand als{" "}
            <code className="rounded bg-ink px-1 py-0.5 text-zinc-200">
              public{filePath}
            </code>{" "}
            in de map (of vul <code className="rounded bg-ink px-1 py-0.5 text-zinc-200">specSheet</code> in
            bij dit product in <code className="rounded bg-ink px-1 py-0.5 text-zinc-200">lib/products.ts</code>).
            Een hier gekozen bestand is alleen een voorbeeld in je eigen browser.
          </p>
        </div>
      </div>
    </div>
  );
}
