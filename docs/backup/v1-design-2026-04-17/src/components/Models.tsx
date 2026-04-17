"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

export default function Models() {
  const t = useTranslations("models");

  return (
    <section className="py-28 bg-gray-50">
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

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200 h-full">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("service_title")}</h3>
              <p className="text-gray-500 leading-relaxed">{t("service_text")}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200 h-full">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("startup_title")}</h3>
              <p className="text-gray-500 leading-relaxed">{t("startup_text")}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
