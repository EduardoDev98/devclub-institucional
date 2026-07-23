"use client";

import { useRef } from "react";
import { formacoes } from "@/lib/data";
import { FormacaoCard } from "@/components/ui/FormacaoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLiveGrid } from "@/hooks/useLiveGrid";

/**
 * Formações — grade viva (ver hooks/useLiveGrid.ts + useLiveCardMotion.ts):
 * cards animam a cada passagem pela viewport, direção conforme o sentido do
 * scroll, self-heal poll e prefers-reduced-motion cobertos pelo hook.
 */
export function Formacoes() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { directionRef, reducedMotion } = useLiveGrid(
    gridRef,
    "[data-live-card]",
  );

  return (
    <section id="formacoes" className="relative overflow-hidden py-24">
      <div className="glow-radial-sm absolute inset-0" aria-hidden="true" />

      <div className="container-dev relative z-10">
        <SectionHeading
          badge="Formações"
          title={
            <>
              Do <span className="text-gradient-green">zero</span> ao avançado
            </>
          }
          subtitle="Trilhas completas nas tecnologias mais pedidas do mercado. Escolha por onde começar."
          align="left"
        />

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:mt-16"
        >
          {formacoes.map((formacao, index) => (
            <FormacaoCard
              key={formacao.nome}
              formacao={formacao}
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
