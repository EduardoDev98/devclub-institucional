"use client";

import { motion } from "framer-motion";
import { metrics, type Metric } from "@/lib/data";
import { useCountUp } from "@/hooks/useCountUp";
import { fadeUp, staggerContainer, revealOnScroll } from "@/lib/animations";

/** Um card de métrica isolado para usar o hook de count-up por item. */
function MetricCard({ metric }: { readonly metric: Metric }) {
  const { value, ref } = useCountUp(metric.value);
  const display =
    metric.value % 1 !== 0 ? value.toFixed(1) : Math.round(value).toString();

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-2 text-center"
    >
      <div className="font-display text-4xl font-bold text-gradient-green md:text-6xl">
        <span ref={ref}>{display}</span>
        <span>{metric.suffix}</span>
      </div>
      <p className="text-sm text-text-muted md:text-base">{metric.label}</p>
    </motion.div>
  );
}

/**
 * Faixa de prova social: números que sobem (count-up) quando entram na tela.
 * O stagger dá um ritmo agradável de aparição.
 */
export function Metrics() {
  return (
    <section className="relative border-y border-[var(--border-subtle)] bg-bg-panel/40 py-16">
      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="container-dev grid grid-cols-2 gap-10 md:grid-cols-4"
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </motion.div>
    </section>
  );
}
