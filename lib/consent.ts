"use client";

import { useSyncExternalStore } from "react";

// Cookie consent, stored in a first-party cookie. Add a category here (and in
// the banner copy) before introducing anything else that sets cookies.
export type ConsentCategory = "embeds";
export type Consent = { v: 1; embeds: boolean; at: string };

const COOKIE = "bla_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days
const EVENT = "bla:consent";
export const OPEN_SETTINGS_EVENT = "bla:consent-open";

function read(): Consent | null {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1)));
    return parsed?.v === 1 ? (parsed as Consent) : null;
  } catch {
    return null;
  }
}

let cache: { raw: string; value: Consent | null } | null = null;
function snapshot(): Consent | null {
  const raw = document.cookie;
  if (!cache || cache.raw !== raw) cache = { raw, value: read() };
  return cache.value;
}

export function saveConsent(choice: Omit<Consent, "v" | "at">) {
  const value: Consent = { v: 1, at: new Date().toISOString(), ...choice };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(EVENT));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

/** `undefined` while rendering on the server, `null` when no choice has been made. */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, snapshot, () => undefined);
}
