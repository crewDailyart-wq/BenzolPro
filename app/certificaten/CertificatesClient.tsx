"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { PRODUCTS } from "@/lib/products";
import {
  CertificateIcon,
  ChevronDown,
  FileIcon,
  CheckIcon,
} from "@/components/icons";

interface OfficialCert {
  code: string;
  title: string;
  desc: string;
  issuer: string;
  number: string;
}

const OFFICIAL_CERTS: OfficialCert[] = [
  { code: "ACEA C3", title: "ACEA C3", desc: "Europese norm voor brandstofbesparende, katalysatorveilige motorolie.", issuer: "ACEA", number: "BP-ACEA-C3-2026" },
  { code: "API SN/SP", title: "API SN / SP", desc: "Amerikaanse prestatienorm voor moderne benzinemotoren.", issuer: "American Petroleum Institute", number: "BP-API-SNSP-2026" },
  { code: "ISO 9001", title: "ISO 9001", desc: "Kwaliteitsmanagementsysteem voor productie en distributie.", issuer: "ISO", number: "BP-ISO9001-2026" },
  { code: "VW 504/507", title: "VW 504.00 / 507.00", desc: "Fabrieksgoedkeuring Volkswagen Group voor Longlife-motoren.", issuer: "Volkswagen Group", number: "BP-VW504507-2026" },
  { code: "MB 229.51", title: "MB 229.51", desc: "Mercedes-Benz goedkeuring voor brandstofbesparende olie.", issuer: "Mercedes-Benz", number: "BP-MB22951-2026" },
  { code: "BMW LL-04", title: "BMW Longlife-04", desc: "BMW-goedkeuring voor motoren met roetfilter.", issuer: "BMW Group", number: "BP-BMWLL04-2026" },
  { code: "dexos2", title: "dexos2", desc: "General Motors specificatie voor Opel/Chevrolet-modellen.", issuer: "General Motors", number: "BP-DEXOS2-2026" },
  { code: "RDW", title: "RDW Open Data", desc: "Kentekencheck via de officiële RDW Open Data API.", issuer: "RDW", number: "BP-RDW-OD-2026" },
];

/** Pad naar het specificatieblad van een product (conventie: <slug>-specs.pdf). */
function datasheetPath(slug: string, specSheet?: string): string {
  return specSheet ?? `/products/${slug}-specs.pdf`;
}

export default function CertificatesClient() {
  const { t } = useI18n();
  const [openCert, setOpenCert] = useState<string | null>(null);
  // slug -> bestaat er een echte PDF? (null = nog aan het controleren)
  const [available, setAvailable] = useState<Record<string, boolean | null>>({});

  // Controleer per product of er daadwerkelijk een PDF-specificatieblad staat,
  // zodat we alleen werkende downloads tonen (net als de SpecSheetTab op de
  // productpagina). Zodra je een <slug>-specs.pdf in public/products/ zet, licht
  // de download hier automatisch op.
  useEffect(() => {
    let cancelled = false;
    setAvailable(Object.fromEntries(PRODUCTS.map((p) => [p.slug, null])));
    PRODUCTS.forEach((p) => {
      const path = datasheetPath(p.slug, p.specSheet);
      fetch(path, { method: "HEAD" })
        .then((res) => {
          if (cancelled) return;
          const type = res.headers.get("content-type") ?? "";
          const ok = res.ok && type.includes("pdf");
          setAvailable((prev) => ({ ...prev, [p.slug]: ok }));
        })
        .catch(() => {
          if (!cancelled) setAvailable((prev) => ({ ...prev, [p.slug]: false }));
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="section-pad py-10">
      <span className="chip"><CertificateIcon width={14} height={14} className="text-neon" /> {t("nav.certificates")}</span>
      <h1 className="text-azure-metal mt-3 text-3xl font-bold sm:text-4xl">{t("certificates.title")}</h1>
      <p className="mt-2 max-w-xl text-zinc-400">{t("certificates.subtitle")}</p>

      {/* official certificates */}
      <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-zinc-300">{t("certificates.officialTitle")}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OFFICIAL_CERTS.map((c) => {
          const isOpen = openCert === c.code;
          return (
            <div key={c.code} className="card-surface overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenCert(isOpen ? null : c.code)}
                className="flex w-full items-start gap-3 p-4 text-start"
                aria-expanded={isOpen}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neon/10 text-neon">
                  <CertificateIcon width={20} height={20} />
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-bold">{c.title}</span>
                    <ChevronDown width={16} height={16} className={`shrink-0 text-neon transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                  <span className="mt-1 block text-xs text-zinc-400">{c.desc}</span>
                </span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="space-y-1.5 border-t border-ink-line px-4 py-3 text-xs text-zinc-400">
                    <p className="flex justify-between"><span>Uitgevende partij</span><span className="text-zinc-200">{c.issuer}</span></p>
                    <p className="flex justify-between"><span>Certificaatnummer</span><span className="font-mono text-zinc-200">{c.number}</span></p>
                    <p className="flex items-center gap-1.5 pt-1 text-emerald-400">
                      <CheckIcon width={13} height={13} /> Geldig en actief
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* downloadable product datasheets */}
      <h2 className="mt-12 text-sm font-bold uppercase tracking-wide text-zinc-300">{t("certificates.datasheetsTitle")}</h2>
      <p className="mt-1 max-w-xl text-sm text-zinc-400">{t("certificates.datasheetsBody")}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => {
          const path = datasheetPath(p.slug, p.specSheet);
          const state = available[p.slug];
          const ready = state === true;
          return (
            <div key={p.slug} className="card-surface flex items-center gap-3 p-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink-soft text-zinc-400">
                <FileIcon width={20} height={20} className={ready ? "text-neon" : undefined} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                {ready ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-neon hover:underline"
                  >
                    {t("certificates.datasheetDownload")}
                  </a>
                ) : (
                  <p className="mt-0.5 text-xs text-zinc-500">{t("certificates.datasheetPending")}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
