"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, revealOnScroll } from "@/lib/animations";

/**
 * Faculdade / Reconhecimento MEC — bloco de autoridade (ilustrativo).
 * Layout de destaque com selo e três pontos de credibilidade.
 */
const PONTOS = [
  { titulo: "Diploma Oficial", texto: "Certificação reconhecida e válida em todo o território nacional." },
  { titulo: "Reconhecida pelo MEC", texto: "Escola avaliada e chancelada pelos órgãos competentes." },
  { titulo: "Do básico à graduação", texto: "Uma trilha contínua do primeiro código ao diploma superior." },
] as const;

export function Faculdade() {
  return (
    <section id="faculdade" className="relative py-24">
      <div className="container-dev">
        <motion.div
          {...revealOnScroll}
          variants={staggerContainer}
          className="card-dark relative overflow-hidden p-10 md:p-16"
        >
          <div className="glow-radial-sm absolute inset-0" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <motion.span
              variants={fadeUp}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-primary/40 bg-green-primary/10 text-3xl"
              aria-hidden="true"
            >
              🎓
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold md:text-5xl"
            >
              Escola reconhecida pelo{" "}
              <span className="text-gradient-green">MEC</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg text-text-muted"
            >
              Aqui você não sai só sabendo programar — sai com um diploma oficial
              que o mercado respeita.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {PONTOS.map((p) => (
                <div
                  key={p.titulo}
                  className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] p-5"
                >
                  <h3 className="font-display text-lg font-bold text-green-neon">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{p.texto}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
