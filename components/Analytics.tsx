"use client";

import Script from "next/script";
import { ANALYTICS } from "@/lib/site";
import { useConsent } from "@/lib/consent";

/**
 * Laadt analytics privacyvriendelijk:
 *  - Google Analytics 4 wordt PAS geladen nadat de bezoeker toestemming geeft.
 *    Google Consent Mode v2 staat standaard op "denied", zodat er niets wordt
 *    getrackt vóór toestemming.
 *  - Plausible is cookieloos en laadt direct (vereist geen toestemming onder de AVG).
 * Niets geconfigureerd? Dan wordt er niets geladen.
 */
export default function Analytics() {
  const { consent } = useConsent();
  const { gaId, plausibleDomain } = ANALYTICS;

  return (
    <>
      {/* Plausible — cookieloos, mag altijd (indien geconfigureerd). */}
      {plausibleDomain && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
      )}

      {/* Google Analytics 4 — alleen na expliciete toestemming. */}
      {gaId && consent === "granted" && (
        <>
          <Script
            id="ga-consent-default"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('consent', 'default', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  analytics_storage: 'granted'
                });
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `,
            }}
          />
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        </>
      )}
    </>
  );
}
