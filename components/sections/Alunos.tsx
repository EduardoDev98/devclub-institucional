"use client";

import { useRef } from "react";
import { depoimentos } from "@/lib/data";
import { DepoimentoCard } from "@/components/ui/DepoimentoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLiveGrid } from "@/hooks/useLiveGrid";

/**
 * Alunos / Mural da Fama — depoimentos em MOSAICO (grid multi-coluna estilo
 * Pinterest). Grade viva (ver hooks/useLiveGrid.ts): self-heal poll e
 * prefers-reduced-motion cobertos pelo hook. DepoimentoCard.tsx é o próprio
 * elemento animado.
 */
export function Alunos() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { directionRef, reducedMotion } = useLiveGrid(
    gridRef,
    "[data-live-card]",
  );

  return (
    <section id="alunos" className="relative py-24">
      <div className="glow-radial-sm absolute inset-0" aria-hidden="true" />

      <div className="container-dev relative z-10">
        <SectionHeading
          badge="Mural da Fama"
          title={
            <>
              Milhares de vidas{" "}
              <span className="text-gradient-green">transformadas</span>
            </>
          }
          subtitle="Histórias reais de quem entrou sem saber nada e saiu empregado. (Depoimentos ilustrativos.)"
        />

        <div
          ref={gridRef}
          className="mt-14 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]"
        >
          {depoimentos.map((d, index) => (
            <div key={d.nome} className="mb-4 break-inside-avoid">
              <DepoimentoCard
                depoimento={d}
                index={index}
                directionRef={directionRef}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
