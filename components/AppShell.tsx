"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import ChatWidget from "./ChatWidget";
import CookieBanner from "./CookieBanner";

/**
 * Rendert de sitechrome (header, footer, winkelwagen, chat, cookiemelding) rond
 * de pagina — behalve op /embed-routes. Die worden "kaal" getoond zodat de
 * kentekencheck-widget schoon in een iframe op andere sites past.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/embed");

  if (bare) return <>{children}</>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
