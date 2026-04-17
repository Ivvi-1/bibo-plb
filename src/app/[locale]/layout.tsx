import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIBO PLB — AI products, built to ship",
  description:
    "BIBO PLB is an AI product platform. We design, engineer and launch AI services end-to-end for founders, companies and investors.",
  metadataBase: new URL("https://biboplb.pro"),
  openGraph: {
    title: "BIBO PLB — AI products, built to ship",
    description:
      "AI product platform. End-to-end execution from first hypothesis to a live product with users.",
    url: "https://biboplb.pro",
    siteName: "BIBO PLB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIBO PLB — AI products, built to ship",
    description:
      "AI product platform. End-to-end execution from first hypothesis to a live product with users.",
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
    <html lang={locale} className={`${inter.className} ${instrumentSerif.variable}`}>
      <body className="p2-body">
        <style>{`.p2-serif{font-family: var(--font-instrument-serif), "Times New Roman", serif;}`}</style>
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
