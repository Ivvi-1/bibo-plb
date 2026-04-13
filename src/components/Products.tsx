"use client";

import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const PRODUCTS = [
  { key: "reputar", domain: "https://reputar.tech", tag: "Reputation AI" },
  { key: "mooly", domain: "https://mooly.tech", tag: "Real Estate AI" },
  { key: "gedell", domain: "https://gedell.tech", tag: "Investment AI" },
  { key: "raven", domain: null, tag: "R&D" },
];

export default function Products() {
  const t = useTranslations("products");

  return (
    <section id="products" className="py-28 bg-white">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => (
            <FadeIn key={product.key} delay={i * 0.1}>
              <div className="group rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-3 py-1">
                        {product.tag}
                      </span>
                    </div>
                    {product.domain && (
                      <a
                        href={product.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 group-hover:text-blue-500 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(`${product.key}_name` as "reputar_name")}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-4 text-sm">
                    {t(`${product.key}_desc` as "reputar_desc")}
                  </p>

                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {t(`${product.key}_value` as "reputar_value")}
                    </p>
                  </div>

                  {product.domain && (
                    <a
                      href={product.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {t("visit")}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
