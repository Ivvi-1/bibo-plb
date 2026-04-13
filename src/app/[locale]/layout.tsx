import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "BIBO PLB — AI Product Platform for Founders and Companies",
  description:
    "BIBO PLB builds AI products and services for companies and solo founders. From infrastructure and MVP to real product execution.",
  metadataBase: new URL("https://biboplb.pro"),
  openGraph: {
    title: "BIBO PLB — AI Product Platform",
    description:
      "BIBO PLB builds AI products and services for companies and solo founders. From infrastructure and MVP to real product execution.",
    url: "https://biboplb.pro",
    siteName: "BIBO PLB",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIBO PLB — AI Product Platform",
    description: "BIBO PLB builds AI products and services for companies and solo founders.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
