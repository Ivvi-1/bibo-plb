import { ImageResponse } from "next/og";

export const alt = "BIBO PLB — AI products, built to ship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<string, { eyebrow: string; headlineA: string; headlineB: string; sub: string }> = {
  en: {
    eyebrow: "AI PRODUCT PLATFORM",
    headlineA: "We build AI products",
    headlineB: "that actually ship",
    sub: "Reputar · Mooly · Gedell · Lem",
  },
  ru: {
    eyebrow: "AI-ПРОДУКТОВАЯ ПЛАТФОРМА",
    headlineA: "Строим AI-продукты,",
    headlineB: "которые реально выходят в прод",
    sub: "Reputar · Mooly · Gedell · Lem",
  },
  uk: {
    eyebrow: "AI-ПРОДУКТОВА ПЛАТФОРМА",
    headlineA: "Будуємо AI-продукти,",
    headlineB: "які реально виходять у прод",
    sub: "Reputar · Mooly · Gedell · Lem",
  },
};

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = COPY[locale] ?? COPY.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(79,127,255,0.18), rgba(79,127,255,0) 70%), #ffffff",
          color: "#0a0a0a",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Top: logo + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 5,
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 10, background: "#2d5bff" }} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>BIBO PLB</div>
          <div
            style={{
              marginLeft: 24,
              fontSize: 14,
              letterSpacing: "0.2em",
              color: "#6b6b6b",
              textTransform: "uppercase",
            }}
          >
            {t.eyebrow}
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: "#0a0a0a",
            }}
          >
            {t.headlineA}
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              color: "#2d5bff",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {t.headlineB}
          </div>
        </div>

        {/* Bottom: product list + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6b6b6b",
            fontSize: 20,
          }}
        >
          <div style={{ letterSpacing: "0.08em" }}>{t.sub}</div>
          <div style={{ fontSize: 18, color: "#0a0a0a", fontWeight: 500 }}>biboplb.pro</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
