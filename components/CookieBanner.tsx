"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { OPEN_SETTINGS_EVENT, saveConsent, useConsent } from "@/lib/consent";

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative w-10 h-6 rounded-full shrink-0 transition-colors duration-300 ${
        checked ? "bg-gold" : "bg-cream/20"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-ink transition-transform duration-300 ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}

// First-visit notice with a simple and a detailed mode. Re-opened from the
// footer's "Cookie settings" link.
export default function CookieBanner() {
  const consent = useConsent();
  const [forced, setForced] = useState(false);
  const [details, setDetails] = useState(false);
  const [embeds, setEmbeds] = useState(false);

  useEffect(() => {
    const open = () => {
      setEmbeds(Boolean(consent?.embeds));
      setDetails(true);
      setForced(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, [consent]);

  const visible = consent === null || forced;

  const choose = (value: boolean) => {
    saveConsent({ embeds: value });
    setForced(false);
    setDetails(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: forced ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ y: 40, opacity: 0, transition: { duration: 0.3 } }}
          className="fixed z-[95] inset-x-3 bottom-3 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[420px] bg-ink-4 border border-cream/12 shadow-[0_30px_80px_rgba(0,0,0,0.55)] text-cream"
        >
          <div className="p-5 sm:p-6">
            <div className="text-white text-[16px] font-medium mb-2">Cookies on this site</div>
            <p className="m-0 text-cream/65 text-[14px] leading-relaxed">
              We use one essential cookie to remember this choice. The office map on the contact page is provided by
              Google, which sets its own cookies, so it only loads if you allow it.{" "}
              <Link href="/cookies" className="underline underline-offset-2">
                Cookie policy
              </Link>
            </p>

            <AnimatePresence initial={false}>
              {details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 grid gap-4 border-t border-cream/10 pt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[14px] text-white">Strictly necessary</div>
                        <div className="text-[13px] text-cream/50 leading-snug mt-0.5">Stores your cookie choice. Always on.</div>
                      </div>
                      <Toggle checked disabled label="Strictly necessary cookies" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[14px] text-white">Embedded content</div>
                        <div className="text-[13px] text-cream/50 leading-snug mt-0.5">
                          Google Maps on the contact page. Google may set cookies.
                        </div>
                      </div>
                      <Toggle checked={embeds} onChange={setEmbeds} label="Embedded content cookies" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {details ? (
                <button
                  onClick={() => choose(embeds)}
                  className="col-span-2 bg-gold text-ink py-3 text-[13.5px] font-medium cursor-pointer hover:bg-gold-light transition-colors"
                >
                  Save choices
                </button>
              ) : (
                <>
                  <button
                    onClick={() => choose(false)}
                    className="border border-cream/20 text-cream py-3 text-[13.5px] font-medium cursor-pointer hover:border-cream/50 transition-colors"
                  >
                    Necessary only
                  </button>
                  <button
                    onClick={() => choose(true)}
                    className="bg-gold text-ink py-3 text-[13.5px] font-medium cursor-pointer hover:bg-gold-light transition-colors"
                  >
                    Allow all
                  </button>
                  <button
                    onClick={() => {
                      setEmbeds(Boolean(consent?.embeds));
                      setDetails(true);
                    }}
                    className="col-span-2 py-2 text-[13px] text-cream/60 hover:text-cream cursor-pointer"
                  >
                    Choose what to allow
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
