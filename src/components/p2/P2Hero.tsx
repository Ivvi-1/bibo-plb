"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import NeonPath from "./NeonPath";

const PRODUCT_LABELS = [
  { key: "Reputar", tag: "Reputation AI", href: "https://reputar.tech", pos: { x: 120, y: 80 } },
  { key: "Mooly", tag: "Real Estate AI", href: "https://mooly.tech", pos: { x: 880, y: 80 } },
  { key: "Gedell", tag: "Investment AI", href: "https://gedell.tech", pos: { x: 120, y: 420 } },
  { key: "Lem", tag: "Group Monitoring AI", href: "https://lem.in.ua", pos: { x: 880, y: 420 } },
];

const CURVES = [
  { d: "M 120 80 C 280 200, 380 240, 500 250", duration: 4.8, delay: 0 },
  { d: "M 880 80 C 720 200, 620 240, 500 250", duration: 5.2, delay: 1.1 },
  { d: "M 120 420 C 280 320, 380 280, 500 250", duration: 4.4, delay: 2.2 },
  { d: "M 880 420 C 720 320, 620 280, 500 250", duration: 5.0, delay: 0.6 },
];

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

      {/* Neon hub-and-spoke diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative max-w-5xl mx-auto mt-16"
      >
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto"
          style={{ maxHeight: "520px" }}
          role="img"
          aria-label="BIBO PLB hub diagram with four connected products"
        >
          <defs>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(45, 91, 255, 0.18)" />
              <stop offset="100%" stopColor="rgba(45, 91, 255, 0)" />
            </radialGradient>
          </defs>

          {/* Background faint circles at hub */}
          <circle cx="500" cy="250" r="140" fill="url(#hub-glow)" />
          <circle cx="500" cy="250" r="80" fill="none" stroke="#e8e6df" strokeDasharray="3 5" />
          <circle cx="500" cy="250" r="54" fill="none" stroke="#efede6" />

          {/* Tracer curves */}
          {CURVES.map((c, i) => (
            <NeonPath
              key={i}
              d={c.d}
              duration={c.duration}
              delay={c.delay}
              dotRadius={3.5}
            />
          ))}

          {/* Hub node */}
          <g>
            <circle cx="500" cy="250" r="28" fill="#0a0a0a" />
            <circle cx="500" cy="250" r="28" fill="none" stroke="#2d5bff" strokeOpacity="0.35" className="p2-pulse-ring" />
            <circle cx="500" cy="250" r="6" fill="#2d5bff" className="p2-neon-glow" />
            <text
              x="500"
              y="310"
              textAnchor="middle"
              fill="#0a0a0a"
              fontSize="12"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              letterSpacing="0.1em"
            >
              BIBO PLB
            </text>
          </g>

          {/* Product labels */}
          {PRODUCT_LABELS.map((p) => (
            <g key={p.key}>
              <circle cx={p.pos.x} cy={p.pos.y} r="5" fill="#0a0a0a" />
              <circle cx={p.pos.x} cy={p.pos.y} r="12" fill="none" stroke="#2d5bff" strokeOpacity="0.2" />
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
