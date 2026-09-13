"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-[60] bg-ink/90 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-[1320px] mx-auto px-[clamp(14px,4.2vw,32px)] py-3.5 flex items-center justify-between gap-[clamp(12px,3vw,28px)] flex-nowrap">
        <button
          onClick={() => go("/")}
          className="flex items-center gap-[clamp(9px,2.4vw,15px)] min-w-0 shrink cursor-pointer"
        >
          <Image
            src="/assets/babar-law-mark.png"
            alt="Babar Law Associates"
            width={46}
            height={46}
            className="h-[clamp(34px,9vw,46px)] w-auto shrink-0 drop-shadow-[0_2px_6px_rgba(201,162,39,0.25)]"
          />
          <span className="flex flex-col gap-0.5 min-w-0 text-left">
            <span className="font-serif text-white text-[clamp(13px,3.4vw,19px)] tracking-[0.12em] leading-[1.15]">
              BABAR LAW ASSOCIATES
            </span>
            <span className="hidden min-[1260px]:block text-gold/85 text-[9.5px] tracking-[0.3em] uppercase">
              Advocates &amp; International Consultants
            </span>
          </span>
        </button>

        <div className="hidden min-[1260px]:flex items-center gap-6.5">
          <nav className="flex items-center gap-5.5">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className="relative flex items-center h-11.5 cursor-pointer group"
                >
                  <span className="text-cream/78 text-xs tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-250 group-hover:text-gold-light">
                    {item.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-2.25 h-px bg-gold block"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <a
            href="tel:+19145577765"
            className="border border-gold text-gold py-2.75 px-5.5 text-[12.5px] tracking-[0.14em] whitespace-nowrap transition-all duration-300 hover:bg-gold hover:text-ink"
          >
            +1 (914) 557 7765
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex min-[1260px]:hidden items-center gap-2.5 border border-gold/50 text-gold py-2.75 px-3.5 text-[11.5px] tracking-[0.14em] uppercase cursor-pointer shrink-0 whitespace-nowrap"
        >
          <span className="flex flex-col gap-1">
            <span className="w-4.5 h-px bg-gold block" />
            <span className="w-4.5 h-px bg-gold block" />
            <span className="w-4.5 h-px bg-gold block" />
          </span>
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-gold/20 bg-ink/98 min-[1260px]:hidden"
          >
            <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-4.5 pb-6.5 grid gap-0.5">
              {nav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className="text-left py-3.25 border-b border-cream/7 text-cream/85 text-sm tracking-[0.16em] uppercase cursor-pointer transition-colors hover:text-gold-light"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+19145577765"
                className="mt-4 border border-gold text-gold py-3.5 px-5.5 text-[12.5px] tracking-[0.16em] text-center"
              >
                +1 (914) 557 7765
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
