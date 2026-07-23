"use client";

import { motion } from "framer-motion";
import { quemSomos } from "@/lib/data";
import { fadeUp, staggerContainer, revealOnScroll } from "@/lib/animations";

/**
 * Quem somos — bloco institucional curto e forte. Layout assimétrico:
 * título grande à esquerda, parágrafos à direita com um traço verde de apoio.
 * (A linha do tempo agora é uma seção própria: TimelineHorizontal.)
 */
export function QuemSomos() {
  return (
    <section id="quem-somos" className="relative py-24">
      <div className="container-dev">
        <motion.div
          {...revealOnScroll}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16"
        >
          <motion.div variants={fadeUp}>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-green-neon">
              Quem somos
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              {quemSomos.titulo}
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-5 border-l-2 border-green-primary/40 pl-6"
          >
            {quemSomos.paragrafos.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-text-muted">
                {p}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
