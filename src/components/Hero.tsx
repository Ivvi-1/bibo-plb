"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants, type Easing } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  const easeOut: Easing = "easeOut";

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              AI Product Platform
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight tracking-tight mb-6"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              {t("cta_primary")}
            </a>
            <a
              href="#products"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              {t("cta_secondary")}
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-6"
          >
            {[t("value1"), t("value2"), t("value3")].map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </span>
                {v}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
