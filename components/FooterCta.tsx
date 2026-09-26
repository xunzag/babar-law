"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The footer's consultation band repeats the contact page, so hide it there.
export default function FooterCta({ children }: { children: ReactNode }) {
  return usePathname() === "/contact" ? null : <>{children}</>;
}
