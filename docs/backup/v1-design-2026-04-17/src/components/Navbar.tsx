"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-semibold text-lg tracking-tight text-gray-900">
          BIBO PLB
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#products"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("products")}
            </a>
            <a
              href="#process"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("how")}
            </a>
            <a
              href="#contact"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("contact")}
            </a>
          </div>

          <div className="flex items-center gap-1">
            {(["en", "uk", "ru"] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`text-xs font-medium transition-colors px-2 py-1 rounded-md border ${
                  locale === l
                    ? "text-gray-900 border-gray-400"
                    : "text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-200"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
