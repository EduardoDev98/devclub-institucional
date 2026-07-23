"use client";

import { motion } from "framer-motion";
import type { Depoimento } from "@/lib/data";
import { DecryptText } from "@/components/ui/DecryptText";
import { borderDrawVariant, accentGlowPulse } from "@/lib/animations";
import { useLiveCardMotion } from "@/hooks/useLiveCardMotion";
import type { RefObject } from "react";

/**
 * Card de depoimento. Avatar é gerado a partir das iniciais (sem foto real
 * de terceiros). Grade viva (ver hooks/useLiveCardMotion.ts): repete a cada
 * passagem pela viewport, direção conforme o scroll. Decrypt SÓ no nome —
 * a citação (`depoimento.texto`) nunca embaralha, fica sempre texto estático.
 */
export function DepoimentoCard({
  depoimento,
  index,
  directionRef,
  reducedMotion,
}: {
  readonly depoimento: Depoimento;
  readonly index: number;
  readonly directionRef: RefObject<"down" | "up">;
  readonly reducedMotion: boolean;
}) {
  const { motionProps, entered } = useLiveCardMotion({
    index,
    directionRef,
    reducedMotion,
  });

  return (
    <motion.figure
      data-live-card
      {...motionProps}
      className="card-dark relative flex h-full flex-col gap-4 p-6"
    >
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

      <blockquote className="flex-1 text-sm leading-relaxed text-text-primary/90">
        “{depoimento.texto}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
        <motion.span
          variants={reducedMotion ? undefined : accentGlowPulse}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-primary/15 text-sm font-bold text-green-neon"
        >
          {depoimento.iniciais}
        </motion.span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold">
            <DecryptText text={depoimento.nome} active={entered} />
          </span>
          <span className="text-xs text-text-muted">
            {depoimento.cargo} • {depoimento.empresa}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
