"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { empresas } from "@/lib/data";
import { fadeUp, revealOnScroll } from "@/lib/animations";

/**
 * Empresas que contratam — esteira (carrossel) infinita e LENTA de nomes.
 * A animação é feita em JavaScript (requestAnimationFrame) movendo o track em
 * translateX continuamente. Optamos por JS em vez de CSS animation porque é
 * imune a configs do SO (ex.: "reduzir movimento" do Windows zerando a animação
 * CSS): aqui garantimos que SEMPRE gira. Ao chegar em -50% (fim da 1ª cópia),
 * volta a 0 sem salto, pois a 2ª metade é idêntica → loop perfeito.
 * Pausa no hover.
 */
export function Empresas() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const linha = [...empresas, ...empresas]; // duplicado p/ loop contínuo

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let paused = false;
    let raf = 0;
    let last = performance.now();
    const speed = 40; // px por segundo (lento)

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        offset -= speed * dt;
        // metade da largura total = largura de uma cópia
        const half = track.scrollWidth / 2;
        if (Math.abs(offset) >= half) offset += half; // reset invisível
        track.style.transform = `translateX(${offset}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="empresas"
      className="relative border-y border-[var(--border-subtle)] py-16"
    >
      <motion.p
        {...revealOnScroll}
        variants={fadeUp}
        className="container-dev mb-10 text-center text-sm font-semibold uppercase tracking-wider text-text-muted"
      >
        Nossos alunos estão nas maiores empresas do Brasil e do mundo
      </motion.p>

      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-16 pr-16 will-change-transform"
          aria-label="Empresas que contratam nossos alunos"
        >
          {linha.map((empresa, i) => (
            <span
              key={`${empresa.nome}-${i}`}
              className="cursor-default whitespace-nowrap font-display text-2xl font-bold text-text-muted/40 transition-colors duration-300 hover:text-green-neon"
              aria-hidden={i >= empresas.length}
            >
              {empresa.nome}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
