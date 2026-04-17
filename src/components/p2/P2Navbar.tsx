"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const LOCALES: { code: "en" | "ru" | "uk"; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uk", label: "UK" },
];

export default function P2Navbar() {
  const t = useTranslations("p2.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (code: string) => {
    const segs = pathname.split("/");
    segs[1] = code;
    return segs.join("/");
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#efede6]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}/p2`}
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#0a0a0a]"
        >
          <span className="inline-block w-6 h-6 rounded-md bg-[#0a0a0a] relative overflow-hidden">
            <span className="absolute inset-[3px] rounded-sm bg-white" />
            <span className="absolute inset-0 m-auto w-[6px] h-[6px] rounded-full bg-[#2d5bff]" />
          </span>
          BIBO PLB
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#2a2a2a]">
          <a href="#capabilities" className="hover:text-[#2d5bff] transition-colors">
            {t("capabilities")}
          </a>
          <a href="#products" className="hover:text-[#2d5bff] transition-colors">
            {t("products")}
          </a>
          <a href="#process" className="hover:text-[#2d5bff] transition-colors">
            {t("process")}
          </a>
          <a href="#partnership" className="hover:text-[#2d5bff] transition-colors">
            {t("partnership")}
          </a>
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#6b6b6b]">
            {LOCALES.map((l, i) => (
              <span key={l.code} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#d8d6cf]">/</span>}
                <Link
                  href={switchLocale(l.code)}
                  className={`transition-colors ${
                    locale === l.code
                      ? "text-[#0a0a0a] font-medium"
                      : "hover:text-[#0a0a0a]"
                  }`}
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[#2d5bff] transition-colors"
          >
            {t("contact")}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
