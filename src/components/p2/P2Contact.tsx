"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import FadeIn from "../FadeIn";

export default function P2Contact() {
  const t = useTranslations("p2.contact");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, contact, task, role, source: "p2" }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      setName("");
      setCompany("");
      setContact("");
      setRole("");
      setTask("");
    } catch {
      setStatus("error");
    }
  };

  const roles: { value: string; label: string }[] = [
    { value: "partner", label: t("role_partner") },
    { value: "client", label: t("role_client") },
    { value: "investor", label: t("role_investor") },
    { value: "other", label: t("role_other") },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 px-5 sm:px-6 bg-[#fafaf7]">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <div className="p2-eyebrow mb-5">{t("eyebrow")}</div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#0a0a0a]">
              {t("title")}
            </h2>
            <p className="mt-5 text-[16px] text-[#4a4a4a]">{t("sub")}</p>
          </div>
        </FadeIn>

        <FadeIn>
          <form
            onSubmit={onSubmit}
            className="bg-white border border-[#e8e6df] rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(10,10,10,0.03)]"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field
                label={t("name_label")}
                placeholder={t("name_placeholder")}
                value={name}
                onChange={setName}
              />
              <Field
                label={t("company_label")}
                placeholder={t("company_placeholder")}
                value={company}
                onChange={setCompany}
              />
              <Field
                label={t("contact_label")}
                placeholder={t("contact_placeholder")}
                value={contact}
                onChange={setContact}
              />

              <div>
                <label className="block text-[12px] font-medium tracking-wide text-[#6b6b6b] mb-2">
                  {t("role_label")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button
                      type="button"
                      key={r.value}
                      onClick={() => setRole(r.value)}
                      className={`px-3.5 py-2 rounded-full text-[13px] border transition-all ${
                        role === r.value
                          ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                          : "bg-white text-[#4a4a4a] border-[#e8e6df] hover:border-[#0a0a0a]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-[12px] font-medium tracking-wide text-[#6b6b6b] mb-2">
                {t("task_label")}
              </label>
              <textarea
                rows={4}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder={t("task_placeholder")}
                className="w-full px-4 py-3 rounded-xl border border-[#e8e6df] text-[14.5px] text-[#0a0a0a] placeholder-[#9a9a9a] focus:border-[#2d5bff] focus:outline-none focus:ring-4 focus:ring-[rgba(45,91,255,0.1)] transition-all"
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white text-[14px] font-medium px-6 py-3.5 rounded-full hover:bg-[#2d5bff] transition-colors disabled:opacity-60"
              >
                {status === "sending" ? t("sending") : t("submit")}
                {status !== "sending" && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 11L11 1M11 1H3M11 1V9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {status === "sent" && (
                <span className="text-[13.5px] text-[#2d5bff]">{t("success")}</span>
              )}
              {status === "error" && (
                <span className="text-[13.5px] text-[#c0392b]">{t("error")}</span>
              )}
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium tracking-wide text-[#6b6b6b] mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-[#e8e6df] text-[14.5px] text-[#0a0a0a] placeholder-[#9a9a9a] focus:border-[#2d5bff] focus:outline-none focus:ring-4 focus:ring-[rgba(45,91,255,0.1)] transition-all"
      />
    </div>
  );
}
