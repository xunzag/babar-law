"use client";

import { useSyncExternalStore } from "react";

const fmt = (tz: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });

const TICK = 15_000;
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, TICK);
  return () => clearInterval(id);
};
// Snapshot is a tick bucket so it stays stable between renders.
const getSnapshot = () => Math.floor(Date.now() / TICK);
const getServerSnapshot = () => null;

// Live local time for each office city. Renders placeholders on the server
// so server and client markup agree.
export default function LocalClock({
  cities,
  className,
  tone = "dark",
}: {
  cities: { city: string; tz: string }[];
  className?: string;
  tone?: "dark" | "light";
}) {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const now = tick === null ? null : new Date();

  return (
    <div className={className}>
      {cities.map((c) => (
        <div key={c.city} className="flex items-baseline justify-between gap-6">
          <span
            className={`font-medium text-[10.5px] tracking-[0.2em] uppercase ${
              tone === "dark" ? "text-cream/60" : "text-ink/62"
            }`}
          >
            {c.city}
          </span>
          <span
            className={`font-medium text-[15px] tabular-nums ${tone === "dark" ? "text-cream" : "text-ink"}`}
          >
            {now ? fmt(c.tz).format(now) : "--:--"}
          </span>
        </div>
      ))}
    </div>
  );
}
