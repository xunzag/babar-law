// Thin wrapper around gtag. Calls are dropped unless Google Analytics has
// loaded, which only happens after the visitor allows analytics cookies.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Gtag = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (GA_ID && gtag) gtag("event", event, params);
}
