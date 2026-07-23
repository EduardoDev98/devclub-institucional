"use client";

import { motion } from "framer-motion";
import { impactos } from "@/lib/data";

/**
 * Seção "Impacto" — três mensagens fortes que APARECEM conforme o usuário rola
 * (reveal encadeado). Cada bloco entra com fade + subida quando cruza a
 * viewport (Framer Motion whileInView). Sem pin → não trava, sempre fluido.
 * Layout alternado (esquerda/direita) dá ritmo visual.
 */
export function Impacto() {
  return (
    <section id="impacto" className="relative overflow-hidden py-28">
      <div className="glow-radial absolute inset-0" aria-hidden="true" />

      <div className="container-dev relative z-10 flex flex-col gap-24 md:gap-40">
        {impactos.map((item, i) => (
          <motion.div
            key={item.numero}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`flex max-w-2xl flex-col gap-4 ${
              i % 2 === 1 ? "md:ml-auto md:items-end md:text-right" : ""
            }`}
          >
            <span className="font-display text-7xl font-bold text-gradient-green md:text-9xl">
              {item.numero}
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-6xl">
              {item.titulo}
            </h2>
            <p className="text-lg text-text-muted md:text-2xl">{item.texto}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
