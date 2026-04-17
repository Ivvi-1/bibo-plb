"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

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
  r?: number;
};

type CommLink = {
  d: string;
  duration: number;
  delay: number;
};

// ==================== DESKTOP constellation (viewBox 1000x500) ====================

const LIVE_DESKTOP: LiveProduct[] = [
  { key: "Reputar", tag: "Reputation AI", href: "https://reputar.tech", pos: { x: 160, y: 120 }, curve: "M 160 120 C 300 180, 400 230, 500 250", duration: 16, delay: 0 },
  { key: "Mooly", tag: "Real Estate AI", href: "https://mooly.tech", pos: { x: 840, y: 120 }, curve: "M 840 120 C 700 180, 600 230, 500 250", duration: 18, delay: 4 },
  { key: "Gedell", tag: "Investment AI", href: "https://gedell.tech", pos: { x: 160, y: 380 }, curve: "M 160 380 C 300 320, 400 270, 500 250", duration: 17, delay: 8 },
  { key: "Lem", tag: "Group Monitoring AI", href: "https://lem.in.ua", pos: { x: 840, y: 380 }, curve: "M 840 380 C 700 320, 600 270, 500 250", duration: 15, delay: 12 },
];

const GHOSTS_DESKTOP: GhostProduct[] = [
  { label: "HR AI", pos: { x: 70, y: 230 } },
  { label: "Legal AI", pos: { x: 260, y: 50 } },
  { label: "Logistics AI", pos: { x: 500, y: 40 } },
  { label: "Finance AI", pos: { x: 740, y: 50 } },
  { label: "Health AI", pos: { x: 930, y: 230 } },
  { label: "Retail AI", pos: { x: 740, y: 450 } },
  { label: "Travel AI", pos: { x: 500, y: 460 } },
  { label: "Education AI", pos: { x: 260, y: 450 } },
  { label: "", pos: { x: 340, y: 150 }, r: 1.3 },
  { label: "", pos: { x: 620, y: 130 }, r: 1.3 },
  { label: "", pos: { x: 380, y: 380 }, r: 1.3 },
  { label: "", pos: { x: 660, y: 370 }, r: 1.3 },
  { label: "", pos: { x: 200, y: 290 }, r: 1.1 },
  { label: "", pos: { x: 800, y: 280 }, r: 1.1 },
  { label: "", pos: { x: 450, y: 110 }, r: 1.1 },
  { label: "", pos: { x: 560, y: 420 }, r: 1.1 },
];

const LINKS_DESKTOP: string[] = [
  "M 70 230 L 260 50",
  "M 260 50 L 500 40",
  "M 500 40 L 740 50",
  "M 740 50 L 930 230",
  "M 930 230 L 740 450",
  "M 740 450 L 500 460",
  "M 500 460 L 260 450",
  "M 260 450 L 70 230",
  "M 340 150 L 620 130",
  "M 380 380 L 660 370",
  "M 340 150 L 380 380",
  "M 620 130 L 660 370",
  "M 260 50 L 500 250",
  "M 740 50 L 500 250",
  "M 260 450 L 500 250",
  "M 740 450 L 500 250",
];

const COMM_DESKTOP: CommLink[] = [
  { d: "M 260 50 L 500 40 L 740 50", duration: 22, delay: 0 },
  { d: "M 930 230 L 740 450 L 500 460", duration: 26, delay: 6 },
  { d: "M 70 230 L 260 450 L 500 460", duration: 24, delay: 11 },
  { d: "M 340 150 L 620 130 L 660 370 L 380 380 Z", duration: 28, delay: 3 },
  { d: "M 70 230 L 260 50 L 500 40", duration: 30, delay: 14 },
];

const RING_DESKTOP = "M 70 230 L 260 50 L 500 40 L 740 50 L 930 230 L 740 450 L 500 460 L 260 450 Z";

// ==================== MOBILE constellation (viewBox 420x540, roomier) ====================

const LIVE_MOBILE: LiveProduct[] = [
  { key: "Reputar", tag: "Reputation AI", href: "https://reputar.tech", pos: { x: 80, y: 150 }, curve: "M 80 150 C 140 200, 180 240, 210 270", duration: 16, delay: 0 },
  { key: "Mooly", tag: "Real Estate AI", href: "https://mooly.tech", pos: { x: 340, y: 150 }, curve: "M 340 150 C 280 200, 240 240, 210 270", duration: 18, delay: 4 },
  { key: "Gedell", tag: "Investment AI", href: "https://gedell.tech", pos: { x: 80, y: 390 }, curve: "M 80 390 C 140 340, 180 300, 210 270", duration: 17, delay: 8 },
  { key: "Lem", tag: "Group Monitoring AI", href: "https://lem.in.ua", pos: { x: 340, y: 390 }, curve: "M 340 390 C 280 340, 240 300, 210 270", duration: 15, delay: 12 },
];

// Upcoming nodes: fewer, not labeled (to save space), just small stars with hint labels outside the ring
const GHOSTS_MOBILE: GhostProduct[] = [
  { label: "Legal", pos: { x: 210, y: 50 } },
  { label: "Health", pos: { x: 380, y: 270 } },
  { label: "Retail", pos: { x: 210, y: 490 } },
  { label: "HR", pos: { x: 40, y: 270 } },
  { label: "", pos: { x: 130, y: 90 }, r: 1.4 },
  { label: "", pos: { x: 290, y: 90 }, r: 1.4 },
  { label: "", pos: { x: 130, y: 450 }, r: 1.4 },
  { label: "", pos: { x: 290, y: 450 }, r: 1.4 },
];

const LINKS_MOBILE: string[] = [
  "M 40 270 L 210 50",
  "M 210 50 L 380 270",
  "M 380 270 L 210 490",
  "M 210 490 L 40 270",
  "M 210 50 L 210 270",
  "M 380 270 L 210 270",
  "M 210 490 L 210 270",
  "M 40 270 L 210 270",
  "M 130 90 L 290 90",
  "M 130 450 L 290 450",
];

const COMM_MOBILE: CommLink[] = [
  { d: "M 40 270 L 210 50 L 380 270", duration: 24, delay: 0 },
  { d: "M 380 270 L 210 490 L 40 270", duration: 26, delay: 8 },
  { d: "M 130 90 L 290 90 L 290 450 L 130 450 Z", duration: 30, delay: 4 },
];

const RING_MOBILE = "M 40 270 L 210 50 L 380 270 L 210 490 Z";

// ==================================================================================

function Constellation({
  viewBox,
  live,
  ghosts,
  links,
  comms,
  ring,
  hoveredKey,
  setHoveredKey,
  hubR,
  labelFontSize,
  tagFontSize,
  ghostLabelFontSize,
}: {
  viewBox: string;
  live: LiveProduct[];
  ghosts: GhostProduct[];
  links: string[];
  comms: CommLink[];
  ring: string;
  hoveredKey: string | null;
  setHoveredKey: (k: string | null) => void;
  hubR: number;
  labelFontSize: number;
  tagFontSize: number;
  ghostLabelFontSize: number;
}) {
  // Compute hub center from viewBox
  const [, , w, h] = viewBox.split(" ").map(Number);
  const cx = w / 2;
  const cy = h / 2;

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-auto"
      style={{ maxHeight: 560 }}
      role="img"
      aria-label="BIBO PLB constellation: shipped and upcoming AI products connecting to the central platform"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(45, 91, 255, 0.18)" />
          <stop offset="100%" stopColor="rgba(45, 91, 255, 0)" />
        </radialGradient>
        <radialGradient id="sky-glow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="rgba(45, 91, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(45, 91, 255, 0)" />
        </radialGradient>
        <filter id="star-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      <rect x="0" y="0" width={w} height={h} fill="url(#sky-glow)" />

      {links.map((d, i) => (
        <path
          key={`link-${i}`}
          d={d}
          stroke="#0a0a0a"
          strokeOpacity="0.07"
          strokeWidth="0.8"
          strokeDasharray="2 5"
          fill="none"
        />
      ))}

      {comms.map((c, i) => (
        <path
          key={`comm-${i}`}
          d={c.d}
          stroke="#4f7fff"
          strokeOpacity="0.45"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="22 1200"
          style={{
            animation: `p2-dash-flow ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`,
            filter: "drop-shadow(0 0 2px rgba(79, 127, 255, 0.45))",
          }}
        />
      ))}

      <path
        d={ring}
        fill="none"
        stroke="#4f7fff"
        strokeOpacity="0.28"
        strokeWidth="0.8"
        strokeDasharray="26 1600"
        style={{
          animation: "p2-dash-flow 34s linear infinite",
          filter: "drop-shadow(0 0 2px rgba(79, 127, 255, 0.4))",
        }}
      />

      <circle cx={cx} cy={cy} r={hubR * 4.4} fill="url(#hub-glow)" />
      <circle cx={cx} cy={cy} r={hubR * 3} fill="none" stroke="#e8e6df" strokeDasharray="3 5" />
      <circle cx={cx} cy={cy} r={hubR * 1.8} fill="none" stroke="#efede6" />

      {live.map((p) => {
        const isHover = hoveredKey === p.key;
        return (
          <g key={`path-${p.key}`}>
            <path
              d={p.curve}
              stroke="#0a0a0a"
              strokeOpacity={isHover ? 0.22 : 0.12}
              strokeWidth="0.8"
              strokeDasharray="2 5"
              fill="none"
              style={{ transition: "stroke-opacity 0.35s ease" }}
            />
            <path
              d={p.curve}
              stroke="#4f7fff"
              strokeOpacity={isHover ? 0.85 : 0.55}
              strokeWidth={isHover ? 1.2 : 0.9}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={isHover ? "20 60" : "18 320"}
              style={{
                animation: `p2-dash-flow ${isHover ? p.duration / 2 : p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
                filter: `drop-shadow(0 0 ${isHover ? 4 : 2.5}px rgba(79, 127, 255, ${isHover ? 0.8 : 0.5}))`,
                transition: "stroke-opacity 0.35s ease, stroke-width 0.35s ease",
              }}
            />
          </g>
        );
      })}

      {/* Hub node */}
      <g>
        <circle cx={cx} cy={cy} r={hubR} fill="#0a0a0a" />
        <circle cx={cx} cy={cy} r={hubR} fill="none" stroke="#2d5bff" strokeOpacity="0.35" className="p2-pulse-ring" />
        <circle cx={cx} cy={cy} r={hubR * 0.2} fill="#2d5bff" className="p2-neon-glow" />
        <text
          x={cx}
          y={cy + hubR + 22}
          textAnchor="middle"
          fill="#0a0a0a"
          fontSize={Math.max(11, hubR * 0.4)}
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          letterSpacing="0.12em"
        >
          BIBO PLB
        </text>
      </g>

      {/* Ghost nodes */}
      {ghosts.map((g, i) => {
        const r = g.r ?? 3;
        const isNamed = !!g.label;
        const above = g.pos.y < cy;
        return (
          <g key={`g-${i}`}>
            <circle cx={g.pos.x} cy={g.pos.y} r={r * 3} fill="#4f7fff" opacity="0.08" filter="url(#star-glow)" />
            <circle cx={g.pos.x} cy={g.pos.y} r={r} fill="#0a0a0a" opacity={isNamed ? 0.55 : 0.5} />
            {isNamed && (
              <>
                <text
                  x={g.pos.x}
                  y={above ? g.pos.y - 14 : g.pos.y + 20}
                  textAnchor="middle"
                  fill="#0a0a0a"
                  opacity="0.6"
                  fontSize={ghostLabelFontSize}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.12em"
                  style={{ textTransform: "uppercase" }}
                >
                  {g.label}
                </text>
                <text
                  x={g.pos.x}
                  y={above ? g.pos.y - 14 - ghostLabelFontSize - 2 : g.pos.y + 20 + ghostLabelFontSize + 2}
                  textAnchor="middle"
                  fill="#9a9a9a"
                  fontSize={ghostLabelFontSize * 0.82}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.14em"
                  style={{ textTransform: "uppercase" }}
                >
                  · upcoming
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Live labels — hover/tap target */}
      {live.map((p) => {
        const isHover = hoveredKey === p.key;
        const above = p.pos.y < cy;
        return (
          <g
            key={`label-${p.key}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredKey(p.key)}
            onMouseLeave={() => setHoveredKey(null)}
            onTouchStart={() => setHoveredKey(p.key)}
            onTouchEnd={() => setHoveredKey(null)}
          >
            <rect
              x={p.pos.x - 70}
              y={p.pos.y - 45}
              width="140"
              height="90"
              fill="transparent"
            />
            <circle cx={p.pos.x} cy={p.pos.y} r="5" fill="#0a0a0a" />
            <circle
              cx={p.pos.x}
              cy={p.pos.y}
              r={isHover ? 16 : 12}
              fill="none"
              stroke="#2d5bff"
              strokeOpacity={isHover ? 0.5 : 0.22}
              style={{ transition: "r 0.3s ease, stroke-opacity 0.3s ease" }}
            />
            <a href={p.href} target="_blank" rel="noopener noreferrer">
              <text
                x={p.pos.x}
                y={above ? p.pos.y - 22 : p.pos.y + 32}
                textAnchor="middle"
                fill={isHover ? "#2d5bff" : "#0a0a0a"}
                fontSize={labelFontSize}
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                style={{ transition: "fill 0.3s ease" }}
              >
                {p.key}
              </text>
              <text
                x={p.pos.x}
                y={above ? p.pos.y - 22 - labelFontSize + 2 : p.pos.y + 32 + tagFontSize + 4}
                textAnchor="middle"
                fill="#6b6b6b"
                fontSize={tagFontSize}
                fontFamily="Inter, sans-serif"
                letterSpacing="0.1em"
                style={{ textTransform: "uppercase" }}
              >
                {p.tag}
              </text>
            </a>
          </g>
        );
      })}
    </svg>
  );
}

export default function P2Hero() {
  const t = useTranslations("p2.hero");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 px-5 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 p2-grid-bg opacity-60 pointer-events-none" />
      <div className="absolute inset-0 p2-spotlight pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p2-eyebrow mb-5 sm:mb-6"
        >
          {t("eyebrow")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[38px] sm:text-[60px] md:text-[80px] leading-[1.04] sm:leading-[1.02] font-semibold tracking-[-0.03em] md:tracking-[-0.035em] text-[#0a0a0a] max-w-4xl mx-auto"
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
          className="mt-5 sm:mt-6 text-[15.5px] sm:text-[17px] md:text-[19px] leading-relaxed text-[#4a4a4a] max-w-2xl mx-auto"
        >
          {t("sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white text-[14px] font-medium px-6 py-3.5 rounded-full hover:bg-[#2d5bff] transition-colors"
          >
            {t("cta_primary")}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium px-6 py-3.5 rounded-full border border-[#e8e6df] hover:border-[#0a0a0a] transition-colors text-[#0a0a0a]"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative max-w-6xl mx-auto mt-12 sm:mt-16"
      >
        {/* Desktop / tablet */}
        <div className="hidden sm:block">
          <Constellation
            viewBox="0 0 1000 500"
            live={LIVE_DESKTOP}
            ghosts={GHOSTS_DESKTOP}
            links={LINKS_DESKTOP}
            comms={COMM_DESKTOP}
            ring={RING_DESKTOP}
            hoveredKey={hoveredKey}
            setHoveredKey={setHoveredKey}
            hubR={32}
            labelFontSize={15}
            tagFontSize={10.5}
            ghostLabelFontSize={10.5}
          />
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Constellation
            viewBox="0 0 420 540"
            live={LIVE_MOBILE}
            ghosts={GHOSTS_MOBILE}
            links={LINKS_MOBILE}
            comms={COMM_MOBILE}
            ring={RING_MOBILE}
            hoveredKey={hoveredKey}
            setHoveredKey={setHoveredKey}
            hubR={22}
            labelFontSize={15}
            tagFontSize={9.5}
            ghostLabelFontSize={11}
          />
        </div>
      </motion.div>

      {/* Metric strip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative max-w-5xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 border-t border-b border-[#e8e6df] py-6 sm:py-8"
      >
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`text-center sm:text-left px-5 sm:px-8 ${
              n === 2 ? "sm:border-l sm:border-r border-[#e8e6df]" : ""
            }`}
          >
            <div className="text-[30px] sm:text-[34px] font-semibold tracking-tight text-[#0a0a0a] leading-none">
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
