"use client";

import { useEffect } from "react";

// Registreert de service worker (alleen in productie) zodat de site
// installeerbaar is en bij herhaalbezoek sneller laadt. Rendert niets.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* stil falen — de site werkt ook zonder SW */
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
