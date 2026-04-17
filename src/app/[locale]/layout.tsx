import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";
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

const SITE_URL = "https://biboplb.pro";

const LOCALE_COPY: Record<string, { title: string; description: string; ogDescription: string }> = {
  en: {
    title: "BIBO PLB — AI products, built to ship",
    description:
      "BIBO PLB is an AI product platform. We design, engineer and launch AI services end-to-end for founders, companies and investors.",
    ogDescription:
      "AI product platform. End-to-end execution from first hypothesis to a live product with users.",
  },
  ru: {
    title: "BIBO PLB — AI-продукты, доведённые до результата",
    description:
      "BIBO PLB — продуктовая платформа. Проектируем, разрабатываем и запускаем AI-сервисы end-to-end для основателей, компаний и инвесторов.",
    ogDescription:
      "AI-продуктовая платформа. Полный цикл — от первой гипотезы до живого продукта с пользователями.",
  },
  uk: {
    title: "BIBO PLB — AI-продукти, доведені до результату",
    description:
      "BIBO PLB — продуктова платформа. Проєктуємо, розробляємо та запускаємо AI-сервіси end-to-end для засновників, компаній та інвесторів.",
    ogDescription:
      "AI-продуктова платформа. Повний цикл — від першої гіпотези до живого продукту з користувачами.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = LOCALE_COPY[locale] ?? LOCALE_COPY.en;
  const path = `/${locale}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${SITE_URL}/${l}`;
  languages["x-default"] = `${SITE_URL}/en`;

  return {
    title: copy.title,
    description: copy.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      url: `${SITE_URL}${path}`,
      siteName: "BIBO PLB",
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.ogDescription,
    },
  };
}

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

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BIBO PLB",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    email: "hello@biboplb.pro",
    sameAs: [
      "https://reputar.tech",
      "https://mooly.tech",
      "https://gedell.tech",
      "https://lem.in.ua",
    ],
  };

  return (
    <html lang={locale} className={`${inter.className} ${instrumentSerif.variable}`}>
      <body className="p2-body">
        <style>{`.p2-serif{font-family: var(--font-instrument-serif), "Times New Roman", serif;}`}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        {clarityId && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`}
          </Script>
        )}
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
