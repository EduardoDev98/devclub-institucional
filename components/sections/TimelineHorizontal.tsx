"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { timeline, type TimelineItem } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DecryptText } from "@/components/ui/DecryptText";
import { borderDrawVariant, accentGlowPulse } from "@/lib/animations";
import { useLiveGrid } from "@/hooks/useLiveGrid";
import { useLiveCardMotion } from "@/hooks/useLiveCardMotion";
import type { RefObject } from "react";

/**
 * Card de um marco da timeline. Grade viva (ver hooks/useLiveGrid.ts +
 * useLiveCardMotion.ts): repete a cada passagem pela viewport, direção
 * conforme o scroll. Decrypt no ANO dispara só uma vez.
 */
function TimelineCard({
  item,
  index,
  directionRef,
  reducedMotion,
}: {
  readonly item: TimelineItem;
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
    <motion.article
      data-live-card
      {...motionProps}
      className="card-dark relative p-7"
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

      <span
        className="absolute -top-2 left-8 flex h-4 w-4 items-center justify-center rounded-full bg-green-primary shadow-green-glow"
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-bg-black" />
      </span>

      <div className="flex items-center gap-3">
        <span className="font-display text-4xl font-bold text-gradient-green md:text-5xl">
          <DecryptText text={item.ano} active={entered} />
        </span>
        <motion.span
          variants={reducedMotion ? undefined : accentGlowPulse}
          className="rounded-full bg-white/5 px-3 py-1 text-xs text-green-neon"
        >
          {item.tag}
        </motion.span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold">{item.titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {item.texto}
      </p>
    </motion.article>
  );
}

/**
 * Timeline / Jornada — grid responsivo, grade viva (ver hooks/useLiveGrid.ts):
 * self-heal poll e prefers-reduced-motion cobertos pelo hook — cuidado
 * redobrado aqui, seção que já teve bug de pin/scroll antes.
 */
export function TimelineHorizontal() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { directionRef, reducedMotion } = useLiveGrid(
    gridRef,
    "[data-live-card]",
  );

  return (
    <section id="jornada" className="relative overflow-hidden py-24">
      <div className="glow-radial-sm absolute inset-0" aria-hidden="true" />

      <div className="container-dev relative z-10">
        <SectionHeading
          badge="Nossa jornada"
          title={
            <>
              De uma ideia a{" "}
              <span className="text-gradient-green">30 mil vidas</span>
            </>
          }
          align="left"
        />

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16"
        >
          {timeline.map((item, index) => (
            <TimelineCard
              key={item.ano}
              item={item}
              index={index}
              directionRef={directionRef}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
