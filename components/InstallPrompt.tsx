"use client";

import { useEffect, useState } from "react";
import { DropIcon } from "./icons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Toont een "Installeer als app"-knop zodra de browser aangeeft dat de PWA
 * installeerbaar is (beforeinstallprompt). Verdwijnt na installatie of als de
 * app al standalone draait. Rendert niets als installeren niet mogelijk is.
 */
export default function InstallPrompt({ className = "", label = "Installeer als app" }: { className?: string; label?: string }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Al geïnstalleerd / standalone? Dan niets tonen.
    if (window.matchMedia?.("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || !deferred) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }

  return (
    <button type="button" onClick={install} className={`btn-ghost ${className}`}>
      <DropIcon width={16} height={16} /> {label}
    </button>
  );
}
