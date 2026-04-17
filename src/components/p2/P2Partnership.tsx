"use client";

import { useTranslations } from "next-intl";
import FadeIn from "../FadeIn";

export default function P2Partnership() {
  const t = useTranslations("p2.partnership");

  return (
    <section id="partnership" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="max-w-3xl mb-16">
            <div className="p2-eyebrow mb-5">{t("eyebrow")}</div>
            <h2 className="text-[36px] md:text-[48px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#0a0a0a]">
              {t("title")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <FadeIn key={n} delay={(n - 1) * 0.1}>
              <div className="p2-card rounded-2xl p-8 h-full flex flex-col">
                <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#2d5bff] bg-[rgba(45,91,255,0.08)] rounded-full px-3 py-1.5 inline-block self-start mb-6">
                  {t(`way${n}_tag` as "way1_tag")}
                </span>
                <h3 className="text-[22px] font-semibold tracking-tight text-[#0a0a0a] mb-3">
                  {t(`way${n}_title` as "way1_title")}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#4a4a4a] flex-1">
                  {t(`way${n}_text` as "way1_text")}
                </p>
                <div className="mt-8 pt-6 border-t border-[#efede6]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="4" cy="12" r="2" fill="#2d5bff" />
                    <path d="M6 12h14" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M16 8l4 4-4 4" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
