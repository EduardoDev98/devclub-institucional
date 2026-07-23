"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { diferenciais, type Diferencial } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HexBackground } from "@/components/ui/HexBackground";
import { DecryptText } from "@/components/ui/DecryptText";
import { borderDrawVariant, accentGlowPulse } from "@/lib/animations";
import { useLiveGrid } from "@/hooks/useLiveGrid";
import { useLiveCardMotion } from "@/hooks/useLiveCardMotion";
import type { RefObject } from "react";

/**
 * Card de diferencial. Grade viva (ver hooks/useLiveGrid.ts +
 * useLiveCardMotion.ts): repete a cada passagem pela viewport, direção
 * conforme o scroll. Decrypt no título dispara só uma vez.
 */
function DiferencialCard({
  item,
  index,
  directionRef,
  reducedMotion,
}: {
  readonly item: Diferencial;
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
      className="group card-dark relative overflow-hidden p-6 transition-all duration-300 hover:border-green-primary/50 hover:shadow-green-glow"
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

      <motion.div
        variants={reducedMotion ? undefined : accentGlowPulse}
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-green-primary/20 bg-green-primary/10 text-green-neon transition-transform duration-300 group-hover:scale-110"
      >
        <Icon name={item.icon} className="h-6 w-6" />
      </motion.div>
      <h3 className="font-display text-lg font-bold">
        <DecryptText text={item.titulo} active={entered} />
      </h3>
      <p className="mt-2 text-sm text-text-muted">{item.descricao}</p>
    </motion.article>
  );
}

/**
 * Método / Diferenciais — grid de cards espelhando a seção "Método" da
 * plataforma, com o motivo hexagonal ao fundo. Grade viva (ver
 * hooks/useLiveGrid.ts): self-heal poll e prefers-reduced-motion cobertos
 * pelo hook — cuidado redobrado aqui, seção que já teve bug de reveal antes.
 */
export function Metodo() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { directionRef, reducedMotion } = useLiveGrid(
    gridRef,
    "[data-live-card]",
  );

  return (
    <section id="metodo" className="relative overflow-hidden py-24">
      <HexBackground glow />

      <div className="container-dev relative z-10">
        <SectionHeading
          badge="Método"
          title={
            <>
              Tudo que você precisa{" "}
              <span className="text-gradient-green">além do código</span>
            </>
          }
          subtitle="Não é só aula gravada. É um ecossistema inteiro pensado para você evoluir mais rápido."
        />

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {diferenciais.map((item, index) => (
            <DiferencialCard
              key={item.titulo}
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
