"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/lib/consent";
import { GA_ID, track } from "@/lib/analytics";

// Loads Google Analytics 4 only with consent, and reports every way a visitor
// can get in touch (WhatsApp, phone, email) so enquiries can be measured.
export default function Analytics() {
  const consent = useConsent();
  const allowed = Boolean(GA_ID && consent?.analytics);

  // Withdrawing consent stops collection and clears the GA cookies.
  useEffect(() => {
    if (!GA_ID) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
    if (!allowed && consent) {
      for (const c of document.cookie.split("; ")) {
        const name = c.split("=")[0];
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, "")}`]) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
          }
        }
      }
    }
  }, [allowed, consent]);

  useEffect(() => {
    if (!allowed) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      const where = location.pathname;
      if (href.includes("wa.me")) track("contact_whatsapp", { page_path: where });
      else if (href.startsWith("tel:")) track("contact_phone", { page_path: where, number: href.slice(4) });
      else if (href.startsWith("mailto:")) track("contact_email", { page_path: where });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [allowed]);

  if (!allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
