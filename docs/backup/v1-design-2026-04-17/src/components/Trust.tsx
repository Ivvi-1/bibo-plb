"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function Trust() {
  const t = useTranslations("trust");

  const points = [
    t("point1"),
    t("point2"),
    t("point3"),
    t("point4"),
    t("point5"),
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4 block">
              {t("label")}
            </span>
            <h2 className="text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
              {t("title")}
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-4">
            {points.map((point, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{point}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
