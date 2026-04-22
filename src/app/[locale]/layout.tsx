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

const LOCALE_COPY: Record<string, { title: string; description: string; ogDescription: string; keywords: string[] }> = {
  en: {
    title: "BIBO PLB — AI products, built to ship",
    description:
      "BIBO PLB is an AI product platform. We design, engineer and launch AI services end-to-end for founders, companies and investors.",
    ogDescription:
      "AI product platform. End-to-end execution from first hypothesis to a live product with users.",
    keywords: [
      "AI product studio",
      "AI development agency",
      "LLM engineering",
      "AI MVP",
      "AI consultancy",
      "BIBO PLB",
    ],
  },
  ru: {
    title: "BIBO PLB — AI-продукты, доведённые до результата",
    description:
      "BIBO PLB — продуктовая платформа. Проектируем, разрабатываем и запускаем AI-сервисы end-to-end для основателей, компаний и инвесторов.",
    ogDescription:
      "AI-продуктовая платформа. Полный цикл — от первой гипотезы до живого продукта с пользователями.",
    keywords: [
      "AI агентство",
      "разработка AI продуктов",
      "LLM разработка",
      "AI MVP",
      "продуктовая студия",
      "BIBO PLB",
    ],
  },
  uk: {
    title: "BIBO PLB — AI-продукти, доведені до результату",
    description:
      "BIBO PLB — продуктова платформа. Проєктуємо, розробляємо та запускаємо AI-сервіси end-to-end для засновників, компаній та інвесторів.",
    ogDescription:
      "AI-продуктова платформа. Повний цикл — від першої гіпотези до живого продукту з користувачами.",
    keywords: [
      "AI агенція",
      "розробка AI продуктів",
      "LLM інженерія",
      "AI MVP",
      "продуктова студія",
      "BIBO PLB",
    ],
  },
};

const PRODUCTS = [
  {
    name: "Reputar",
    url: "https://reputar.tech",
    category: "Reputation AI",
    description: "Monitors reviews and social mentions, flags reputation risks in real time.",
  },
  {
    name: "Mooly",
    url: "https://mooly.tech",
    category: "Real Estate AI",
    description: "Aggregates and deduplicates real estate listings from public sources.",
  },
  {
    name: "Gedell",
    url: "https://gedell.tech",
    category: "Investment AI",
    description: "Analyzes investment attractiveness of real estate in Dubai.",
  },
  {
    name: "Lem",
    url: "https://lem.in.ua",
    category: "Group Monitoring AI",
    description: "AI agent listens to Telegram and WhatsApp groups and extracts structured data.",
  },
];

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
    keywords: copy.keywords,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    authors: [{ name: "BIBO PLB" }],
    creator: "BIBO PLB",
    publisher: "BIBO PLB",
    category: "Technology",
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
  const copy = LOCALE_COPY[locale] ?? LOCALE_COPY.en;

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "BIBO PLB",
      alternateName: "BIBO Product Lab",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
        width: 256,
        height: 256,
      },
      email: "hello@biboplb.pro",
      description: copy.description,
      sameAs: PRODUCTS.map((p) => p.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "BIBO PLB",
      description: copy.description,
      inLanguage: locale,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${SITE_URL}/#products`,
      name: "BIBO PLB Products",
      itemListElement: PRODUCTS.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.name,
          url: p.url,
          applicationCategory: p.category,
          description: p.description,
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      })),
    },
  ];

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
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
