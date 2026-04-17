"use client";

import { useTranslations } from "next-intl";

export default function P2Footer() {
  const t = useTranslations("p2.footer");

  return (
    <footer className="bg-white border-t border-[#e8e6df] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-block w-6 h-6 rounded-md bg-[#0a0a0a] relative overflow-hidden">
            <span className="absolute inset-[3px] rounded-sm bg-white" />
            <span className="absolute inset-0 m-auto w-[6px] h-[6px] rounded-full bg-[#2d5bff]" />
          </span>
          <div>
            <div className="text-[14px] font-semibold tracking-tight text-[#0a0a0a]">BIBO PLB</div>
            <div className="text-[12.5px] text-[#6b6b6b]">{t("tagline")}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[12.5px] text-[#6b6b6b]">
          <a
            href="mailto:hello@biboplb.pro"
            className="hover:text-[#0a0a0a] transition-colors"
          >
            hello@biboplb.pro
          </a>
          <span>{t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}
