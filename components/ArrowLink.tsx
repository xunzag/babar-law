import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  solid:
    "bg-gold text-ink hover:bg-gold-light hover:text-ink",
  outline:
    "border border-cream/25 text-cream hover:border-gold hover:text-gold-light",
  dark: "bg-ink text-paper hover:bg-graphite hover:text-paper",
  outlineDark: "border border-ink/25 text-ink hover:border-ink hover:text-ink",
};

// Primary call-to-action with a sliding arrow.
export default function ArrowLink({
  href,
  children,
  variant = "solid",
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  external?: boolean;
  className?: string;
}) {
  const cls = `group/btn inline-flex items-center gap-3 py-4 pl-6.5 pr-5.5 text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 ${styles[variant]} ${className ?? ""}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="relative w-4 h-4 overflow-hidden inline-block" aria-hidden>
        <span className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-full">
          →
        </span>
        <span className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0">
          →
        </span>
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
