"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function Process() {
  const t = useTranslations("process");

  const steps = [
    { num: t("step1_num"), title: t("step1_title"), text: t("step1_text") },
    { num: t("step2_num"), title: t("step2_title"), text: t("step2_text") },
    { num: t("step3_num"), title: t("step3_title"), text: t("step3_text") },
    { num: t("step4_num"), title: t("step4_title"), text: t("step4_text") },
  ];

  return (
    <section id="process" className="py-28 bg-gray-50">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-200 -translate-y-0.5 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                    <span className="text-lg font-semibold text-blue-600">{step.num}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
