import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://biboplb.pro";

const STATIC_PATHS = ["", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) languages[l] = `${SITE_URL}/${l}${path}`;

    for (const locale of routing.locales) {
      const isHome = path === "";
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: isHome ? "monthly" : "yearly",
        priority:
          isHome && locale === routing.defaultLocale ? 1
          : isHome ? 0.8
          : 0.3,
        alternates: { languages },
      });
    }
  }

  return entries;
}
