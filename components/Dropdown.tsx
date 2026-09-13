"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Option = { id: string; label: string };

export default function Dropdown({
  options,
  value,
  onChange,
  label,
}: {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-ink-4 border border-gold/25 text-cream text-[15px] py-3.5 px-4.5 outline-none transition-colors duration-250 flex items-center justify-between gap-3 cursor-pointer hover:border-gold/45"
      >
        <span className={selected ? "text-cream" : "text-cream/30"}>
          {selected ? selected.label : "Select"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gold text-xs shrink-0"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-20 mt-2 w-full max-h-80 overflow-y-auto bg-ink-4 border border-gold/30 shadow-[0_18px_40px_rgba(0,0,0,0.55)] py-1.5"
          >
            {options.map((o) => (
              <li key={o.id} role="option" aria-selected={o.id === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4.5 py-3 text-sm transition-colors duration-150 cursor-pointer ${
                    o.id === value
                      ? "bg-gold/12 text-gold-light"
                      : "text-cream/80 hover:bg-ink-5 hover:text-gold-light"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
