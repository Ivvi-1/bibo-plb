"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const switchLocale = (code: string) => {
    const segs = pathname.split("/");
    segs[1] = code;
    return segs.join("/");
  };

  const closeAnd = (fn?: () => void) => () => {
    setOpen(false);
    fn?.();
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-white/90 backdrop-blur-md border-b border-[#efede6]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#0a0a0a]"
            onClick={closeAnd()}
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

          <div className="flex items-center gap-3 sm:gap-5">
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
              className="hidden sm:inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-[#2d5bff] transition-colors"
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
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#e8e6df] text-[#0a0a0a]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 8h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] z-40 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white border-b border-[#efede6] shadow-[0_8px_32px_-16px_rgba(10,10,10,0.1)]">
          <nav className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-1">
            {[
              { href: "#capabilities", label: t("capabilities") },
              { href: "#products", label: t("products") },
              { href: "#process", label: t("process") },
              { href: "#partnership", label: t("partnership") },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeAnd()}
                className="px-3 py-3 text-[17px] text-[#0a0a0a] rounded-xl hover:bg-[#fafaf7] transition-colors"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeAnd()}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white text-[14px] font-medium px-5 py-3 rounded-full"
            >
              {t("contact")}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div className="mt-5 pt-5 border-t border-[#efede6] flex items-center gap-3 text-[13px] text-[#6b6b6b]">
              <span className="text-[11px] uppercase tracking-wider text-[#9a9a9a]">Language</span>
              {LOCALES.map((l, i) => (
                <span key={l.code} className="flex items-center gap-3">
                  {i > 0 && <span className="text-[#d8d6cf]">·</span>}
                  <Link
                    href={switchLocale(l.code)}
                    onClick={closeAnd()}
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
          </nav>
        </div>
      </div>
    </>
  );
}
