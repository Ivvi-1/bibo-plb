import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

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
  openGraph: {
    title: "BIBO PLB — AI products, built to ship",
    description:
      "AI product platform. End-to-end execution from first hypothesis to a live product with users.",
    url: "https://biboplb.pro/p2",
    siteName: "BIBO PLB",
    type: "website",
  },
};

export default function P2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${instrumentSerif.variable} p2-body min-h-screen`}>
      <style>{`.p2-serif{font-family: var(--font-instrument-serif), "Times New Roman", serif;}`}</style>
      {children}
    </div>
  );
}
