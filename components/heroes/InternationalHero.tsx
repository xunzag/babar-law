"use client";

import { motion } from "framer-motion";
import HeroFrame, { FadeIn } from "@/components/heroes/HeroFrame";
import SplitWords from "@/components/motion/SplitWords";

// Equirectangular projection over a cropped window of the northern hemisphere.
const W = 1000;
const H = 460;
const LON: [number, number] = [-100, 80];
const LAT: [number, number] = [62, 12];
const project = (lon: number, lat: number) => [
  ((lon - LON[0]) / (LON[1] - LON[0])) * W,
  ((lat - LAT[0]) / (LAT[1] - LAT[0])) * H,
];

const hub = { name: "Karachi", lon: 67.0, lat: 24.86 };
const cities = [
  { name: "New York", lon: -74.0, lat: 40.71 },
  { name: "Washington", lon: -77.04, lat: 38.9, hideLabel: true },
  { name: "Toronto", lon: -79.38, lat: 43.65 },
  { name: "Lisbon", lon: -9.14, lat: 38.72 },
  { name: "Rotterdam", lon: 4.48, lat: 51.92 },
  { name: "Bologna", lon: 11.34, lat: 44.49, hideLabel: true },
  { name: "Athens", lon: 23.73, lat: 37.98 },
  { name: "Larnaca", lon: 33.63, lat: 34.92 },
  { name: "Dubai", lon: 55.27, lat: 25.2 },
];

// A dotted field suggesting latitude/longitude, without drawing coastlines.
const dots: [number, number][] = [];
for (let x = 10; x < W; x += 22) for (let y = 10; y < H; y += 22) dots.push([x, y]);

export default function InternationalHero() {
  const [hx, hy] = project(hub.lon, hub.lat);
  return (
    <HeroFrame crumb="International">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 items-center">
        <div className="relative z-10">
          <SplitWords
            text="International cooperation."
            className="font-display font-medium text-white text-[clamp(42px,6vw,92px)] leading-[0.95] tracking-[-0.045em] mb-8"
          />
          <FadeIn delay={0.35}>
            <p className="text-cream/65 text-[clamp(16px,1.5vw,19px)] leading-[1.65] max-w-[520px]">
              Standing arrangements with firms, developers, banks and universities in the United States, Canada,
              Cyprus, Greece, Portugal, the Netherlands, the UAE and Pakistan.
            </p>
          </FadeIn>
        </div>

        <div className="relative -mx-[clamp(16px,4vw,40px)] lg:mx-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible" role="img" aria-label="Map of the firm's international network, radiating from Karachi">
            <g className="fill-cream/10">
              {dots.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={1.1} />
              ))}
            </g>
            {cities.map((c, i) => {
              const [x, y] = project(c.lon, c.lat);
              const mx = (x + hx) / 2;
              const my = Math.min(y, hy) - Math.abs(x - hx) * 0.28;
              return (
                <g key={c.name}>
                  <motion.path
                    d={`M${hx},${hy} Q${mx},${my} ${x},${y}`}
                    fill="none"
                    stroke="url(#arc)"
                    strokeWidth={1.2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={3.5}
                    className="fill-gold-light"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.12, type: "spring", stiffness: 300, damping: 16 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={3.5}
                    fill="none"
                    className="stroke-gold"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ delay: 2 + i * 0.12, duration: 2.4, repeat: Infinity, repeatDelay: 1.5 }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                  {!c.hideLabel && (
                    <motion.text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="fill-cream/70 font-medium"
                      fontSize={12}
                      letterSpacing={1.5}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 + i * 0.12 }}
                    >
                      {c.name.toUpperCase()}
                    </motion.text>
                  )}
                </g>
              );
            })}
            <circle cx={hx} cy={hy} r={7} className="fill-gold" />
            <circle cx={hx} cy={hy} r={14} fill="none" className="stroke-gold/50" />
            <text x={hx} y={hy + 32} textAnchor="middle" className="fill-gold font-medium" fontSize={13} letterSpacing={2}>
              KARACHI
            </text>
            <defs>
              <linearGradient id="arc" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#c3a066" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e0c894" stopOpacity="0.35" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </HeroFrame>
  );
}
