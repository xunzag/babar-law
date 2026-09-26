"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Shared handle so overlays (menu, lightbox) can pause scrolling.
export const lenisRef: { current: Lenis | null } = { current: null };

export function lockScroll(locked: boolean) {
  if (locked) lenisRef.current?.stop();
  else lenisRef.current?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

// Inertial wheel scrolling on desktop. Touch devices keep native scrolling,
// and it is skipped entirely when the visitor prefers reduced motion.
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -96 } });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page starts at the top, without easing through the old one.
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
