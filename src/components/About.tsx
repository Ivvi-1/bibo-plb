"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function About() {
  const t = useTranslations("about");

  const points = [
    { title: t("point1_title"), text: t("point1_text") },
    { title: t("point2_title"), text: t("point2_text") },
    { title: t("point3_title"), text: t("point3_text") },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4 block">
                {t("label")}
              </span>
              <h2 className="text-4xl font-semibold text-gray-900 leading-tight tracking-tight mb-6">
                {t("title")}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                {t("text")}
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-6">
            {points.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all duration-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
