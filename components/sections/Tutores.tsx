"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { tutores, type Tutor } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUpSafe, staggerContainer, revealOnScrollSafe } from "@/lib/animations";

/**
 * Card de tutor. Tenta carregar a foto real (que o usuário coloca em
 * public/tutores). Se a foto ainda não existir, cai num fallback elegante com
 * as iniciais — assim a página nunca quebra por imagem faltando.
 * Usa <img> nativo (não next/image) para permitir o onError de fallback.
 */
function TutorCard({ tutor }: { readonly tutor: Tutor }) {
  const [semFoto, setSemFoto] = useState(false);

  return (
    <motion.article
      variants={fadeUpSafe}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-panel"
    >
      {semFoto ? (
        // Fallback: iniciais sobre gradiente da marca
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-deep/40 to-bg-panel">
          <span className="font-display text-5xl font-bold text-green-neon/70">
            {tutor.iniciais}
          </span>
        </div>
      ) : (
        <img
          src={tutor.foto}
          alt={`Foto de ${tutor.nome}, ${tutor.especialidade}`}
          onError={() => setSemFoto(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Gradiente para leitura do nome */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-bg-black via-bg-black/30 to-transparent"
        aria-hidden="true"
      />

      {/* Rótulo fixo */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-lg font-bold">{tutor.nome}</h3>
        <p className="text-xs text-green-neon">{tutor.especialidade}</p>
      </div>

      {/* Overlay de bio no hover */}
      <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-green-primary/90 p-4 text-[#04120a] transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="font-display text-lg font-bold">{tutor.nome}</h3>
        <p className="mt-1 text-sm font-medium">{tutor.bio}</p>
      </div>
    </motion.article>
  );
}

/**
 * Tutores — "Aprenda com os melhores". Grid de mentores (fictícios).
 * As fotos são colocadas pelo usuário em public/tutores (rostos gerados por IA,
 * pessoas que não existem → seguro, já que os nomes são fictícios).
 * Reveal ao rolar via Framer Motion (whileInView) — conteúdo sempre visível
 * por padrão (fadeUpSafe), nunca preso invisível mesmo se a animação não disparar.
 */
export function Tutores() {
  return (
    <section id="tutores" className="relative py-24">
      <div className="container-dev">
        <SectionHeading
          badge="Tutores"
          title={
            <>
              Aprenda com os{" "}
              <span className="text-gradient-green">melhores</span>
            </>
          }
          subtitle="Profissionais que vivem o mercado e ensinam o que realmente importa."
        />

        <motion.div
          {...revealOnScrollSafe}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {tutores.map((tutor) => (
            <TutorCard key={tutor.nome} tutor={tutor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
