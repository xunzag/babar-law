import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

// Section heading: a small label above a display title, with optional aside.
export default function SectionHead({
  label,
  title,
  aside,
  tone = "dark",
  className,
}: {
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal className={`flex items-end justify-between gap-x-12 gap-y-6 flex-wrap ${className ?? "mb-12 sm:mb-14"}`}>
      <div className="max-w-[760px]">
        <div className={`eyebrow mb-4 ${light ? "text-gold-deep!" : ""}`}>{label}</div>
        <h2
          className={`font-display font-medium text-[clamp(30px,4.6vw,54px)] leading-[1.04] ${
            light ? "text-ink" : "text-white"
          }`}
        >
          {title}
        </h2>
      </div>
      {aside}
    </Reveal>
  );
}
