"use client";

import { useTranslations } from "next-intl";
import FadeIn from "../FadeIn";

export default function P2Process() {
  const t = useTranslations("p2.process");

  return (
    <section id="process" className="py-28 px-6 bg-[#fafaf7] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="max-w-3xl mb-20">
            <div className="p2-eyebrow mb-5">{t("eyebrow")}</div>
            <h2 className="text-[36px] md:text-[48px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#0a0a0a]">
              {t("title")}
            </h2>
          </div>
        </FadeIn>

        {/* Horizontal tracer line connecting 4 steps */}
        <div className="relative">
          <div className="hidden md:block absolute top-6 left-[6%] right-[6%] pointer-events-none">
            <svg viewBox="0 0 1000 12" className="w-full h-3" preserveAspectRatio="none">
              <path d="M 0 6 L 1000 6" className="p2-base-line" strokeDasharray="4 4" />
              <path
                d="M 0 6 L 1000 6"
                stroke="#4f7fff"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="80 920"
                style={{
                  animation: "p2-dash-flow 9s linear infinite",
                  filter: "drop-shadow(0 0 4px rgba(79, 127, 255, 0.7))",
                }}
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            {[1, 2, 3, 4].map((n) => (
              <FadeIn key={n} delay={(n - 1) * 0.1}>
                <div className="relative">
                  <div className="relative z-10 flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#e8e6df] flex items-center justify-center shadow-[0_2px_12px_rgba(10,10,10,0.04)]">
                      <span className="text-[11px] font-semibold tracking-[0.1em] text-[#0a0a0a]">
                        {t(`step${n}_num` as "step1_num")}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-[20px] font-semibold tracking-tight text-[#0a0a0a] mb-2">
                    {t(`step${n}_title` as "step1_title")}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#4a4a4a]">
                    {t(`step${n}_text` as "step1_text")}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
