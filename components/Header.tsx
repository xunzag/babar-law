"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { callLines, firm, headerNav, nav } from "@/lib/content";
import { lockScroll } from "@/components/SmoothScroll";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [firmOpen, setFirmOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Solid once the hero is behind us; tuck away while scrolling down.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 320 && y > prev && !menuOpen);
  });

  // Close menus when the route changes (adjusting state during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setFirmOpen(false);
  }

  useEffect(() => {
    lockScroll(menuOpen);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled || menuOpen
            ? "bg-ink/85 backdrop-blur-xl border-cream/8"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] h-[76px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3.5 min-w-0 shrink group">
            <Image
              src="/assets/babar-law-mark.png"
              alt=""
              width={40}
              height={40}
              priority
              className="h-9 w-auto shrink-0 transition-transform duration-700 ease-out-expo group-hover:rotate-[-8deg]"
            />
            <span className="flex flex-col leading-none min-w-0">
              <span className="font-display font-semibold text-white text-[15px] tracking-[0.16em] whitespace-nowrap">
                BABAR LAW
              </span>
              <span className="font-medium text-gold text-[9.5px] tracking-[0.34em] mt-1.5 whitespace-nowrap">
                ASSOCIATES
              </span>
            </span>
          </Link>

          <div className="hidden min-[1180px]:flex items-center gap-9">
            <nav className="flex items-center gap-1">
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
                      className={`flex items-center gap-1.5 h-11 px-3.5 text-[13.5px] cursor-pointer transition-colors duration-250 ${
                        item.items.some((i) => isActive(i.href)) ? "text-white" : "text-cream/65 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <motion.svg
                        animate={{ rotate: firmOpen ? 180 : 0 }}
                        width="9"
                        height="9"
                        viewBox="0 0 10 10"
                        className="text-gold"
                      >
                        <path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.4" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {firmOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                          transition={{ duration: 0.22 }}
                          role="menu"
                          className="absolute left-0 top-full pt-2 w-60"
                        >
                          <div className="bg-ink-4/95 backdrop-blur-xl border border-cream/10 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                            {item.items.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                role="menuitem"
                                className={`flex items-center justify-between px-3.5 py-3 text-[13.5px] transition-colors duration-150 group/item ${
                                  isActive(sub.href) ? "bg-cream/6 text-white" : "text-cream/70 hover:bg-cream/5 hover:text-white"
                                }`}
                              >
                                <span>{sub.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`relative flex items-center h-11 px-3.5 text-[13.5px] transition-colors duration-250 ${
                      isActive(item.href!) ? "text-white" : "text-cream/65 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href!) && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute left-1/2 -translate-x-1/2 bottom-1 w-1 h-1 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                )
              )}
            </nav>

            <Link
              href="/contact"
              className="group/cta relative overflow-hidden border border-gold/60 text-gold-light hover:text-ink py-3 px-5 text-[13px] font-medium whitespace-nowrap transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-out-expo group-hover/cta:translate-y-0" />
              <span className="relative">Book a consultation</span>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="min-[1180px]:hidden flex items-center gap-3 text-cream cursor-pointer h-11 pl-3"
          >
            <span className="font-medium text-[11px] tracking-[0.2em] uppercase">{menuOpen ? "Close" : "Menu"}</span>
            <span className="relative w-6 h-3 block">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="absolute left-0 right-0 top-0 h-px bg-gold block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="absolute left-0 right-0 bottom-0 h-px bg-gold block"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[55] bg-ink-6 min-[1180px]:hidden overflow-y-auto overscroll-contain"
          >
            <div className="relative px-[clamp(16px,4vw,40px)] pt-[104px] pb-10 min-h-full flex flex-col">
              <nav className="grid">
                {nav.filter((n) => n.href !== "/contact").map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-cream/8"
                  >
                    <Link
                      href={item.href}
                      className={`flex items-baseline gap-4 py-3.5 font-display text-[clamp(28px,7vw,40px)] font-medium tracking-[-0.03em] ${
                        isActive(item.href) ? "text-gold" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-auto pt-10 grid gap-3"
              >
                <Link href="/contact" className="bg-gold text-ink py-4 px-6 text-center text-sm font-medium">
                  Book a consultation
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a href={callLines[0].href} className="border border-cream/15 text-cream py-3.5 text-center text-[13px]">
                    Call USA
                  </a>
                  <a href={firm.whatsapp} target="_blank" rel="noopener" className="border border-cream/15 text-cream py-3.5 text-center text-[13px]">
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
