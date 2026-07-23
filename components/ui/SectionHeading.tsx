"use client";

import { motion } from "framer-motion";
import { fadeUp, revealOnScroll } from "@/lib/animations";

/**
 * Cabeçalho de seção padronizado (badge opcional + título + subtítulo).
 * Reaproveitado por todas as seções para consistência tipográfica e de animação.
 */
export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  readonly badge?: string;
  readonly title: React.ReactNode;
  readonly subtitle?: string;
  readonly align?: "center" | "left";
}) {
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      {...revealOnScroll}
      variants={fadeUp}
      className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignClasses}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 rounded-full border border-green-primary/30 bg-green-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-neon">
          <span className="h-1.5 w-1.5 rounded-full bg-green-neon" />
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
