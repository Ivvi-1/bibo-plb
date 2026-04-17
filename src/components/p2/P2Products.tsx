"use client";

import { useTranslations } from "next-intl";
import FadeIn from "../FadeIn";

const PRODUCTS = [
  { key: "reputar", name: "Reputar", href: "https://reputar.tech" },
  { key: "mooly", name: "Mooly", href: "https://mooly.tech" },
  { key: "gedell", name: "Gedell", href: "https://gedell.tech" },
  { key: "lem", name: "Lem", href: "https://lem.in.ua" },
];

export default function P2Products() {
  const t = useTranslations("p2.products");

  return (
    <section id="products" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="max-w-3xl mb-16">
            <div className="p2-eyebrow mb-5">{t("eyebrow")}</div>
            <h2 className="text-[36px] md:text-[48px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#0a0a0a]">
              {t("title")}
            </h2>
            <p className="mt-5 text-[16px] md:text-[17px] text-[#4a4a4a]">
              {t("sub")}
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-5">
          {PRODUCTS.map((p, i) => (
            <FadeIn key={p.key} delay={i * 0.08}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p2-card rounded-2xl p-8 h-full block group relative overflow-hidden"
              >
                {/* Decorative neon line at top of card */}
                <svg
                  className="absolute top-0 left-0 w-full pointer-events-none"
                  viewBox="0 0 400 40"
                  preserveAspectRatio="none"
                  style={{ height: 40 }}
                >
                  <path
                    d="M 0 20 Q 100 5, 200 20 T 400 20"
                    className="p2-base-line"
                  />
                  <path
                    d="M 0 20 Q 100 5, 200 20 T 400 20"
                    stroke="#4f7fff"
                    strokeWidth="1.2"
                    fill="none"
                    strokeDasharray="40 360"
                    style={{
                      animation: `p2-dash-flow ${6 + i}s linear infinite`,
                      animationDelay: `${i * 0.7}s`,
                      filter: "drop-shadow(0 0 4px rgba(79, 127, 255, 0.7))",
                    }}
                  />
                </svg>

                <div className="flex items-start justify-between mb-6 pt-4">
                  <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#2d5bff] bg-[rgba(45,91,255,0.08)] rounded-full px-3 py-1.5">
                    {t(`${p.key}_tag` as "reputar_tag")}
                  </span>
                  <span className="text-[#c2c2c2] group-hover:text-[#2d5bff] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 15L15 1M15 1H5M15 1V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <h3 className="text-[28px] font-semibold tracking-tight text-[#0a0a0a] mb-3">
                  {p.name}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#4a4a4a] mb-6">
                  {t(`${p.key}_desc` as "reputar_desc")}
                </p>

                <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0a0a0a] group-hover:text-[#2d5bff] transition-colors">
                  {t("visit")}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 9L9 1M9 1H3M9 1V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
