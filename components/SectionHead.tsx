import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

// Numbered section heading: "01 — Label" above a display title.
export default function SectionHead({
  index,
  label,
  title,
  aside,
  tone = "dark",
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal className={`flex items-end justify-between gap-x-12 gap-y-6 flex-wrap ${className ?? "mb-14"}`}>
      <div className="max-w-[760px]">
        <div className={`eyebrow flex items-center gap-3 mb-5 ${light ? "text-gold-deep!" : ""}`}>
          {index && <span>{index}</span>}
          {index && <span className={`w-8 h-px ${light ? "bg-gold-deep/60" : "bg-gold/60"}`} />}
          <span>{label}</span>
        </div>
        <h2
          className={`font-display font-medium text-[clamp(32px,5vw,58px)] leading-[1.02] ${
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
