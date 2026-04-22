import Link from "next/link";
import { useTranslations } from "next-intl";
import P2Footer from "./P2Footer";

type Section = { heading: string; body: string };

export default function LegalPage({
  namespace,
  locale,
}: {
  namespace: "privacy" | "terms";
  locale: string;
}) {
  const t = useTranslations(`legal.${namespace}`);
  const tBase = useTranslations("legal");

  const sections: Section[] = namespace === "privacy"
    ? [
        { heading: t("h_data"), body: t("data") },
        { heading: t("h_use"), body: t("use") },
        { heading: t("h_storage"), body: t("storage") },
        { heading: t("h_rights"), body: t("rights") },
        { heading: t("h_contact"), body: t("contact") },
      ]
    : [
        { heading: t("h_use"), body: t("use") },
        { heading: t("h_ip"), body: t("ip") },
        { heading: t("h_liability"), body: t("liability") },
        { heading: t("h_changes"), body: t("changes") },
        { heading: t("h_contact"), body: t("contact") },
      ];

  return (
    <>
      <main className="min-h-screen bg-white pt-24 pb-20 px-5 sm:px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#6b6b6b] hover:text-[#2d5bff] transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M8 2L4 6l4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {tBase("back")}
          </Link>

          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#0a0a0a] mb-4">
            {t("title")}
          </h1>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[#9a9a9a] mb-8">
            {tBase("updated")}
          </p>
          <p className="text-[16px] leading-[1.65] text-[#2a2a2a] mb-10">{t("intro")}</p>

          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.01em] text-[#0a0a0a] mb-3">
                  {s.heading}
                </h2>
                <p className="text-[15.5px] leading-[1.65] text-[#4a4a4a]">{s.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <P2Footer />
    </>
  );
}
