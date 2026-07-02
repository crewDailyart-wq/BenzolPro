"use client";

import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import {
  CertificateIcon,
  ChevronDown,
  UploadIcon,
  FileIcon,
  ImageIcon,
  TrashIcon,
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

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  isImage: boolean;
  url: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CertificatesClient() {
  const { t } = useI18n();
  const [openCert, setOpenCert] = useState<string | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const counter = useRef(0);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: UploadedFile[] = Array.from(list).map((f) => {
      counter.current += 1;
      return {
        id: `f-${counter.current}-${f.name}`,
        name: f.name,
        size: f.size,
        isImage: f.type.startsWith("image/"),
        url: URL.createObjectURL(f),
      };
    });
    setFiles((prev) => [...prev, ...next]);
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
  }

  return (
    <div className="section-pad py-10">
      <span className="chip"><CertificateIcon width={14} height={14} className="text-neon" /> {t("nav.certificates")}</span>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("certificates.title")}</h1>
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

      {/* upload own certificates */}
      <h2 className="mt-12 text-sm font-bold uppercase tracking-wide text-zinc-300">{t("certificates.uploadTitle")}</h2>
      <p className="mt-1 max-w-xl text-sm text-zinc-400">{t("certificates.uploadBody")}</p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition ${
          dragOver ? "border-azure bg-azure/5" : "border-ink-line"
        }`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-azure/10 text-azure">
          <UploadIcon width={22} height={22} />
        </span>
        <p className="text-sm text-zinc-400">{t("certificates.dropText")}</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="btn-ghost">
          {t("certificates.uploadButton")}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((f) => (
            <div key={f.id} className="card-surface flex items-center gap-3 p-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-ink-soft">
                {f.isImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                ) : (
                  <FileIcon width={20} height={20} className="text-zinc-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{f.name}</p>
                <p className="text-xs text-zinc-500">{formatSize(f.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                aria-label={t("certificates.remove")}
              >
                <TrashIcon width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("certificates.empty")}</p>
      )}

      <div className="mt-6 flex gap-3 rounded-2xl border border-azure/30 bg-azure/5 p-4">
        <ImageIcon width={20} height={20} className="mt-0.5 shrink-0 text-azure" />
        <div>
          <p className="text-sm font-semibold text-azure">{t("certificates.noteTitle")}</p>
          <p className="mt-1 text-xs text-zinc-400">{t("certificates.noteBody")}</p>
        </div>
      </div>
    </div>
  );
}
