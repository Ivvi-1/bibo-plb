"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import NeonPath from "./NeonPath";

type LiveProduct = {
  key: string;
  tag: string;
  href: string;
  pos: { x: number; y: number };
  curve: string;
  duration: number;
  delay: number;
};

type GhostProduct = {
  label: string;
  pos: { x: number; y: number };
  opacity?: number;
  r?: number;
};

// 4 existing products — anchored at 4 corners, connected to hub with visible tracer
const LIVE: LiveProduct[] = [
  {
    key: "Reputar",
    tag: "Reputation AI",
    href: "https://reputar.tech",
    pos: { x: 160, y: 120 },
    curve: "M 160 120 C 300 180, 400 230, 500 250",
    duration: 4.8,
    delay: 0,
  },
  {
    key: "Mooly",
    tag: "Real Estate AI",
    href: "https://mooly.tech",
    pos: { x: 840, y: 120 },
    curve: "M 840 120 C 700 180, 600 230, 500 250",
    duration: 5.2,
    delay: 1.1,
  },
  {
    key: "Gedell",
    tag: "Investment AI",
    href: "https://gedell.tech",
    pos: { x: 160, y: 380 },
    curve: "M 160 380 C 300 320, 400 270, 500 250",
    duration: 4.4,
    delay: 2.2,
  },
  {
    key: "Lem",
    tag: "Group Monitoring AI",
    href: "https://lem.in.ua",
    pos: { x: 840, y: 380 },
    curve: "M 840 380 C 700 320, 600 270, 500 250",
    duration: 5.0,
    delay: 0.6,
  },
];

// Ghost / upcoming nodes — scattered like a constellation
const GHOSTS: GhostProduct[] = [
  { label: "HR AI", pos: { x: 70, y: 230 }, opacity: 0.35 },
  { label: "Legal AI", pos: { x: 260, y: 50 }, opacity: 0.3 },
  { label: "Logistics AI", pos: { x: 500, y: 40 }, opacity: 0.28 },
  { label: "Finance AI", pos: { x: 740, y: 50 }, opacity: 0.3 },
  { label: "Health AI", pos: { x: 930, y: 230 }, opacity: 0.35 },
  { label: "Retail AI", pos: { x: 740, y: 450 }, opacity: 0.3 },
  { label: "Travel AI", pos: { x: 500, y: 460 }, opacity: 0.28 },
  { label: "Education AI", pos: { x: 260, y: 450 }, opacity: 0.3 },
  // tiny unnamed stars to fill the constellation feel
  { label: "", pos: { x: 340, y: 150 }, opacity: 0.5, r: 1.4 },
  { label: "", pos: { x: 620, y: 130 }, opacity: 0.5, r: 1.4 },
  { label: "", pos: { x: 380, y: 380 }, opacity: 0.5, r: 1.4 },
  { label: "", pos: { x: 660, y: 370 }, opacity: 0.5, r: 1.4 },
  { label: "", pos: { x: 200, y: 280 }, opacity: 0.4, r: 1.2 },
  { label: "", pos: { x: 800, y: 270 }, opacity: 0.4, r: 1.2 },
  { label: "", pos: { x: 450, y: 100 }, opacity: 0.4, r: 1.2 },
  { label: "", pos: { x: 560, y: 420 }, opacity: 0.4, r: 1.2 },
];

// Faint constellation links — dotted lines between ghost nodes (no dots moving)
const GHOST_LINKS: string[] = [
  "M 70 230 L 260 50",
  "M 260 50 L 500 40",
  "M 500 40 L 740 50",
  "M 740 50 L 930 230",
  "M 930 230 L 740 450",
  "M 740 450 L 500 460",
  "M 500 460 L 260 450",
  "M 260 450 L 70 230",
  // inner ring small stars
  "M 340 150 L 620 130",
  "M 380 380 L 660 370",
  "M 340 150 L 380 380",
  "M 620 130 L 660 370",
];

// One subtle tracer that slowly walks around the outer constellation ring
const OUTER_RING =
  "M 70 230 L 260 50 L 500 40 L 740 50 L 930 230 L 740 450 L 500 460 L 260 450 Z";

export default function P2Hero() {
  const t = useTranslations("p2.hero");

  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 p2-grid-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-0 p2-spotlight pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p2-eyebrow mb-6"
        >
          {t("eyebrow")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.02] font-semibold tracking-[-0.035em] text-[#0a0a0a] max-w-4xl mx-auto"
        >
          {t("headline_a")}{" "}
          <span className="p2-serif text-[#2d5bff] inline-block">
            {t("headline_b")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-[#4a4a4a] max-w-2xl mx-auto"
        >
          {t("sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[14px] font-medium px-6 py-3.5 rounded-full hover:bg-[#2d5bff] transition-colors"
          >
            {t("cta_primary")}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 text-[14px] font-medium px-6 py-3.5 rounded-full border border-[#e8e6df] hover:border-[#0a0a0a] transition-colors text-[#0a0a0a]"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>
      </div>

      {/* Constellation / neural-net hub */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative max-w-6xl mx-auto mt-16"
      >
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto"
          style={{ maxHeight: "560px" }}
          role="img"
          aria-label="BIBO PLB constellation: existing and upcoming AI products connecting to the central platform"
        >
          <defs>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(45, 91, 255, 0.22)" />
              <stop offset="100%" stopColor="rgba(45, 91, 255, 0)" />
            </radialGradient>
            <radialGradient id="sky-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(45, 91, 255, 0.06)" />
              <stop offset="100%" stopColor="rgba(45, 91, 255, 0)" />
            </radialGradient>
            <filter id="star-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>

          {/* Deep sky soft glow behind everything */}
          <rect x="0" y="0" width="1000" height="500" fill="url(#sky-glow)" />

          {/* Constellation links between ghost nodes — very faint, static */}
          {GHOST_LINKS.map((d, i) => (
            <path
              key={`ghost-${i}`}
              d={d}
              stroke="#0a0a0a"
              strokeOpacity="0.08"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              fill="none"
            />
          ))}

          {/* Slow tracer quietly travelling the outer ring */}
          <path
            d={OUTER_RING}
            fill="none"
            stroke="#4f7fff"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="40 1300"
            style={{
              animation: "p2-dash-flow 18s linear infinite",
              filter: "drop-shadow(0 0 3px rgba(79, 127, 255, 0.5))",
            }}
          />

          {/* Faint rings around hub */}
          <circle cx="500" cy="250" r="140" fill="url(#hub-glow)" />
          <circle
            cx="500"
            cy="250"
            r="95"
            fill="none"
            stroke="#e8e6df"
            strokeDasharray="3 5"
          />
          <circle cx="500" cy="250" r="56" fill="none" stroke="#efede6" />

          {/* Live tracer curves (4 products → hub) */}
          {LIVE.map((p) => (
            <NeonPath
              key={p.key}
              d={p.curve}
              duration={p.duration}
              delay={p.delay}
              dotRadius={3.5}
            />
          ))}

          {/* Ghost / upcoming product nodes */}
          {GHOSTS.map((g, i) => {
            const r = g.r ?? 3;
            const op = g.opacity ?? 0.35;
            const isNamed = !!g.label;
            return (
              <g key={`g-${i}`}>
                {/* soft star */}
                <circle
                  cx={g.pos.x}
                  cy={g.pos.y}
                  r={r * 3}
                  fill="#4f7fff"
                  opacity={op * 0.2}
                  filter="url(#star-glow)"
                />
                <circle
                  cx={g.pos.x}
                  cy={g.pos.y}
                  r={r}
                  fill="#0a0a0a"
                  opacity={op + 0.2}
                />
                {isNamed && (
                  <text
                    x={g.pos.x}
                    y={g.pos.y < 250 ? g.pos.y - 14 : g.pos.y + 22}
                    textAnchor="middle"
                    fill="#0a0a0a"
                    opacity="0.55"
                    fontSize="10.5"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.12em"
                    style={{ textTransform: "uppercase" }}
                  >
                    {g.label}
                  </text>
                )}
                {isNamed && (
                  <text
                    x={g.pos.x}
                    y={g.pos.y < 250 ? g.pos.y - 26 : g.pos.y + 36}
                    textAnchor="middle"
                    fill="#9a9a9a"
                    fontSize="8.5"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.14em"
                    style={{ textTransform: "uppercase" }}
                  >
                    · upcoming
                  </text>
                )}
              </g>
            );
          })}

          {/* Hub node */}
          <g>
            <circle cx="500" cy="250" r="32" fill="#0a0a0a" />
            <circle
              cx="500"
              cy="250"
              r="32"
              fill="none"
              stroke="#2d5bff"
              strokeOpacity="0.35"
              className="p2-pulse-ring"
            />
            <circle
              cx="500"
              cy="250"
              r="6"
              fill="#2d5bff"
              className="p2-neon-glow"
            />
            <text
              x="500"
              y="310"
              textAnchor="middle"
              fill="#0a0a0a"
              fontSize="12"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              letterSpacing="0.12em"
            >
              BIBO PLB
            </text>
          </g>

          {/* Live product labels (bold, full labels) */}
          {LIVE.map((p) => (
            <g key={`label-${p.key}`}>
              <circle cx={p.pos.x} cy={p.pos.y} r="5" fill="#0a0a0a" />
              <circle
                cx={p.pos.x}
                cy={p.pos.y}
                r="12"
                fill="none"
                stroke="#2d5bff"
                strokeOpacity="0.25"
              />
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <text
                  x={p.pos.x}
                  y={p.pos.y < 250 ? p.pos.y - 22 : p.pos.y + 32}
                  textAnchor="middle"
                  fill="#0a0a0a"
                  fontSize="15"
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                >
                  {p.key}
                </text>
                <text
                  x={p.pos.x}
                  y={p.pos.y < 250 ? p.pos.y - 6 : p.pos.y + 48}
                  textAnchor="middle"
                  fill="#6b6b6b"
                  fontSize="10.5"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.1em"
                  style={{ textTransform: "uppercase" }}
                >
                  {p.tag}
                </text>
              </a>
            </g>
          ))}

          {/* Legend (top-left, out of the constellation area) */}
          <g transform="translate(40, 24)">
            <circle cx="0" cy="0" r="4" fill="#0a0a0a" />
            <text
              x="10"
              y="3.5"
              fill="#6b6b6b"
              fontSize="10"
              fontFamily="Inter, sans-serif"
              letterSpacing="0.08em"
              style={{ textTransform: "uppercase" }}
            >
              shipped
            </text>
            <circle cx="90" cy="0" r="3" fill="#0a0a0a" opacity="0.45" />
            <text
              x="100"
              y="3.5"
              fill="#9a9a9a"
              fontSize="10"
              fontFamily="Inter, sans-serif"
              letterSpacing="0.08em"
              style={{ textTransform: "uppercase" }}
            >
              upcoming
            </text>
          </g>
        </svg>
      </motion.div>

      {/* Metric strip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 border-t border-b border-[#e8e6df] py-8"
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`text-center sm:text-left px-8 ${
              n === 2 ? "sm:border-l sm:border-r border-[#e8e6df]" : ""
            }`}
          >
            <div className="text-[34px] font-semibold tracking-tight text-[#0a0a0a] leading-none">
              {t(`metric${n}_value` as "metric1_value")}
            </div>
            <div className="mt-2 text-[13px] text-[#6b6b6b]">
              {t(`metric${n}_label` as "metric1_label")}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
