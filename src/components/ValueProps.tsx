"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function ValueProps() {
  const t = useTranslations("value");

  const cards = [
    { title: t("card1_title"), text: t("card1_text"), icon: "⚡" },
    { title: t("card2_title"), text: t("card2_text"), icon: "🔧" },
    { title: t("card3_title"), text: t("card3_text"), icon: "📦" },
    { title: t("card4_title"), text: t("card4_text"), icon: "🔄" },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4 block">
              {t("label")}
            </span>
            <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
              {t("title")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1 h-full">
                <div className="text-2xl mb-4">{card.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
