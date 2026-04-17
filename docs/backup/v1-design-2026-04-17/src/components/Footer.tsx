"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const PRODUCTS = [
  { name: "Reputar", domain: "https://reputar.tech" },
  { name: "Mooly", domain: "https://mooly.tech" },
  { name: "Gedell", domain: "https://gedell.tech" },
  { name: "Lem", domain: "https://lem.in.ua" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="text-white font-semibold text-lg tracking-tight block mb-4">
              BIBO PLB
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">{t("description")}</p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">{t("products_title")}</h4>
            <ul className="flex flex-col gap-3">
              {PRODUCTS.map((p) =>
                p.domain ? (
                  <li key={p.name}>
                    <a
                      href={p.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {p.name}
                    </a>
                  </li>
                ) : (
                  <li key={p.name}>
                    <span className="text-sm">{p.name}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">{t("copyright")}</p>
          <a
            href="mailto:hello@biboplb.pro"
            className="text-xs hover:text-white transition-colors"
          >
            hello@biboplb.pro
          </a>
        </div>
      </div>
    </footer>
  );
}
