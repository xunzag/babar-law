"use client";

import { openConsentSettings } from "@/lib/consent";

export default function CookieSettingsButton({ variant = "button" }: { variant?: "button" | "link" }) {
  if (variant === "link") {
    return (
      <button onClick={openConsentSettings} className="cursor-pointer hover:text-cream transition-colors">
        Cookie settings
      </button>
    );
  }
  return (
    <button
      onClick={openConsentSettings}
      className="bg-ink text-paper px-5 py-3 text-[14px] font-medium cursor-pointer hover:bg-graphite transition-colors"
    >
      Open cookie settings
    </button>
  );
}
