"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", company: "", contact: "", task: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", contact: "", task: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200";

  return (
    <section id="contact" className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4 block">
              {t("label")}
            </span>
            <h2 className="text-4xl font-semibold text-gray-900 leading-tight tracking-tight mb-10">
              {t("title")}
            </h2>

            <div className="flex flex-col gap-5">
              {[t("promise1"), t("promise2"), t("promise3")].map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">{p}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {status === "success" ? (
              <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{t("success")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col gap-5"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("name_label")}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("name_placeholder")}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("company_label")}
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder={t("company_placeholder")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("contact_label")}
                  </label>
                  <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder={t("contact_placeholder")}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    {t("task_label")}
                  </label>
                  <textarea
                    name="task"
                    value={form.task}
                    onChange={handleChange}
                    placeholder={t("task_placeholder")}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">{t("error")}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === "loading" ? "..." : t("submit")}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
