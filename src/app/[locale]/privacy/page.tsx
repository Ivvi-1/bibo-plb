import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import LegalPage from "@/components/p2/LegalPage";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://biboplb.pro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${SITE_URL}/${l}/privacy`;
  languages["x-default"] = `${SITE_URL}/en/privacy`;

  return {
    title: `${t("title")} — BIBO PLB`,
    description: t("intro"),
    alternates: { canonical: `/${locale}/privacy`, languages },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage namespace="privacy" locale={locale} />;
}
