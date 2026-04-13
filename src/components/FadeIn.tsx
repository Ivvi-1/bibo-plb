"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = 20;
  if (direction === "left") initial.x = -20;
  if (direction === "right") initial.x = 20;

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
