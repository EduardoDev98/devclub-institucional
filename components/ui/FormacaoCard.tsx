"use client";

import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useLiveCardMotion } from "@/hooks/useLiveCardMotion";
import { DecryptText } from "@/components/ui/DecryptText";
import { borderDrawVariant, accentGlowPulse } from "@/lib/animations";
import type { Formacao } from "@/lib/data";
import type { RefObject } from "react";

/**
 * Card de uma formação. Aplica tilt 3D reativo ao mouse (useTilt) e um glow
 * verde na borda no hover (`group`). ENTRADA "compilando as trilhas" — grade
 * viva (ver hooks/useLiveCardMotion.ts): repete a cada passagem pela
 * viewport, direção conforme o sentido do scroll. Decrypt do título dispara
 * só uma vez por card. Com `prefers-reduced-motion`, tudo fica
 * estático/visível.
 */
export function FormacaoCard({
  formacao,
  index,
  directionRef,
  reducedMotion,
}: {
  readonly formacao: Formacao;
  readonly index: number;
  readonly directionRef: RefObject<"down" | "up">;
  readonly reducedMotion: boolean;
}) {
  const tiltRef = useTilt<HTMLDivElement>(6);
  const { motionProps, entered } = useLiveCardMotion({
    index,
    directionRef,
    reducedMotion,
  });

  return (
    <motion.div
      ref={tiltRef}
      data-live-card
      {...motionProps}
      className="group relative h-full w-full rounded-2xl border border-[var(--border-subtle)] bg-bg-panel/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-green-primary/60"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow que aparece no hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-green-glow transition-opacity duration-300 group-hover:opacity-100" />

      {/* Contorno neon "desenhando" na entrada — puramente decorativo */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <motion.rect
          x="1"
          y="1"
          rx="15"
          fill="none"
          strokeWidth="1.5"
          className="h-[calc(100%-2px)] w-[calc(100%-2px)] stroke-green-neon"
          variants={reducedMotion ? undefined : borderDrawVariant}
        />
      </svg>

      <motion.span
        variants={reducedMotion ? undefined : accentGlowPulse}
        className="inline-block rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-neon"
      >
        {formacao.categoria}
      </motion.span>

      <h3 className="mt-4 font-display text-2xl font-bold">
        <DecryptText text={formacao.nome} active={entered} />
      </h3>
      <p className="mt-2 text-sm text-text-muted">{formacao.descricao}</p>

      <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <span className="text-xs text-text-muted">{formacao.nivel}</span>
        <motion.span
          variants={reducedMotion ? undefined : accentGlowPulse}
          className="text-green-neon transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}
