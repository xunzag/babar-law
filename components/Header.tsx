"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { headerNav } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [firmOpen, setFirmOpen] = useState(false);
  const [mobileFirmOpen, setMobileFirmOpen] = useState(false);

  const go = (href: string) => {
    setMenuOpen(false);
    setFirmOpen(false);
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
            <span className="font-serif text-white text-[clamp(13px,3.4vw,19px)] tracking-[0.12em] leading-[1.15] whitespace-nowrap">
              BABAR LAW ASSOCIATES
            </span>
            <span className="hidden min-[1560px]:block text-gold/85 text-[9.5px] tracking-[0.3em] uppercase whitespace-nowrap">
              Advocates &amp; International Consultants
            </span>
          </span>
        </button>

        <div className="hidden min-[1180px]:flex items-center gap-8">
          <nav className="flex items-center gap-7">
            {headerNav.map((item) =>
              item.items ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setFirmOpen(true)}
                  onMouseLeave={() => setFirmOpen(false)}
                >
                  <button
                    onClick={() => setFirmOpen((o) => !o)}
                    aria-haspopup="menu"
                    aria-expanded={firmOpen}
                    className="relative flex items-center gap-1.5 h-11.5 cursor-pointer group"
                  >
                    <span
                      className={`text-xs tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-250 ${
                        item.items.some((i) => i.href === pathname)
                          ? "text-gold-light"
                          : "text-cream/78 group-hover:text-gold-light"
                      }`}
                    >
                      {item.label}
                    </span>
                    <motion.span
                      animate={{ rotate: firmOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gold/70 text-[9px]"
                    >
                      ▾
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {firmOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        role="menu"
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-52"
                      >
                        <div className="bg-ink-4 border border-gold/25 shadow-[0_18px_40px_rgba(0,0,0,0.55)] py-1.5">
                          {item.items.map((sub) => (
                            <button
                              key={sub.href}
                              role="menuitem"
                              onClick={() => go(sub.href)}
                              className={`w-full text-left px-4.5 py-3 text-[11.5px] tracking-[0.12em] uppercase cursor-pointer transition-colors duration-150 ${
                                pathname === sub.href
                                  ? "bg-gold/12 text-gold-light"
                                  : "text-cream/78 hover:bg-ink-5 hover:text-gold-light"
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={item.href}
                  onClick={() => go(item.href!)}
                  className="relative flex items-center h-11.5 cursor-pointer group"
                >
                  <span className="text-cream/78 text-xs tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-250 group-hover:text-gold-light">
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-2.25 h-px bg-gold block"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+19145577765"
              className="text-cream/55 text-[11.5px] tracking-[0.08em] whitespace-nowrap transition-colors duration-250 hover:text-gold-light hidden min-[1420px]:block"
            >
              +1 (914) 557 7765
            </a>
            <Link
              href="/contact"
              className="bg-gold text-ink py-2.75 px-5 text-[12px] font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 hover:bg-gold-light"
            >
              Consultation
            </Link>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex min-[1180px]:hidden items-center gap-2.5 border border-gold/50 text-gold py-2.75 px-3.5 text-[11.5px] tracking-[0.14em] uppercase cursor-pointer shrink-0 whitespace-nowrap"
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
            className="border-t border-gold/20 bg-ink/98 min-[1180px]:hidden"
          >
            <div className="max-w-[1320px] mx-auto px-[clamp(18px,4.2vw,32px)] pt-4.5 pb-6.5 grid gap-0.5">
              {headerNav.map((item) =>
                item.items ? (
                  <div key={item.label} className="border-b border-cream/7">
                    <button
                      onClick={() => setMobileFirmOpen((o) => !o)}
                      className="w-full flex items-center justify-between py-3.25 text-left text-cream/85 text-sm tracking-[0.16em] uppercase cursor-pointer transition-colors hover:text-gold-light"
                    >
                      {item.label}
                      <motion.span
                        animate={{ rotate: mobileFirmOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gold text-[10px]"
                      >
                        ▾
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileFirmOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-0.5 pb-2.5 pl-4">
                            {item.items.map((sub) => (
                              <button
                                key={sub.href}
                                onClick={() => go(sub.href)}
                                className="text-left py-2.75 text-cream/65 text-[13px] tracking-[0.14em] uppercase cursor-pointer transition-colors hover:text-gold-light"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => go(item.href!)}
                    className="text-left py-3.25 border-b border-cream/7 text-cream/85 text-sm tracking-[0.16em] uppercase cursor-pointer transition-colors hover:text-gold-light"
                  >
                    {item.label}
                  </button>
                )
              )}
              <div className="mt-4 grid gap-2.5">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gold text-ink py-3.5 px-5.5 text-[12.5px] font-medium tracking-[0.16em] uppercase text-center"
                >
                  Book a Consultation
                </Link>
                <a
                  href="tel:+19145577765"
                  className="border border-gold text-gold py-3.5 px-5.5 text-[12.5px] tracking-[0.16em] text-center"
                >
                  +1 (914) 557 7765
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
