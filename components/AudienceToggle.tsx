"use client";

import { useAudience } from "@/lib/audience";
import { useI18n } from "@/lib/i18n/provider";
import { UserIcon, WrenchIcon } from "./icons";

export default function AudienceToggle({ className = "" }: { className?: string }) {
  const { audience, setAudience } = useAudience();
  const { t } = useI18n();

  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-ink-line bg-ink-soft p-1 text-xs font-semibold ${className}`}
      role="tablist"
      aria-label={t("audience.label")}
    >
      {/* sliding pill */}
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-full bg-neon transition-transform duration-300 ease-out ${
          audience === "garage" ? "translate-x-full rtl:-translate-x-full" : "translate-x-0"
        }`}
        aria-hidden
      />
      <button
        type="button"
        role="tab"
        aria-selected={audience === "customer"}
        onClick={() => setAudience("customer")}
        className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
          audience === "customer" ? "text-ink" : "text-zinc-300"
        }`}
      >
        <UserIcon width={14} height={14} />
        {t("audience.customer")}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={audience === "garage"}
        onClick={() => setAudience("garage")}
        className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
          audience === "garage" ? "text-ink" : "text-zinc-300"
        }`}
      >
        <WrenchIcon width={14} height={14} />
        {t("audience.garage")}
      </button>
    </div>
  );
}
