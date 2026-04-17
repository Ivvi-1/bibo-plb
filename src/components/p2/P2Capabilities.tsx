"use client";

import { useTranslations } from "next-intl";
import FadeIn from "../FadeIn";

const ICONS: Record<string, React.ReactNode> = {
  card1: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  card2: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 5v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  card3: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M6 15a5 5 0 01.9-9.9 6 6 0 0111.6 2A4.5 4.5 0 0118 15H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 11v6m0 0l-2-2m2 2l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  card4: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function P2Capabilities() {
  const t = useTranslations("p2.capabilities");

  return (
    <section id="capabilities" className="py-28 px-6 bg-[#fafaf7]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
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
          {[1, 2, 3, 4].map((n) => (
            <FadeIn key={n} delay={(n - 1) * 0.08}>
              <div className="p2-card rounded-2xl p-8 h-full">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[rgba(45,91,255,0.08)] text-[#2d5bff] mb-5">
                  {ICONS[`card${n}`]}
                </div>
                <h3 className="text-[19px] font-semibold tracking-tight text-[#0a0a0a] mb-2">
                  {t(`card${n}_title` as "card1_title")}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#4a4a4a]">
                  {t(`card${n}_text` as "card1_text")}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
