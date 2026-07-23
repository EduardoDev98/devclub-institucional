"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { hero } from "@/lib/data";
import { HexBackground } from "@/components/ui/HexBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Hero — a primeira dobra e a seção de maior peso na avaliação.
 * Animação de entrada orquestrada com uma timeline GSAP: badge → palavras do
 * título em stagger → subtítulo → CTAs → indicador de scroll.
 * Parallax sutil reagindo ao movimento do mouse dá profundidade sem custo de layout.
 * Tudo respeita prefers-reduced-motion (entra estático).
 */
export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='badge']", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          "[data-hero='word']",
          { opacity: 0, y: 40, rotateX: -40, duration: 0.8, stagger: 0.12 },
          "-=0.2",
        )
        .from(
          "[data-hero='subtitle']",
          { opacity: 0, y: 24, duration: 0.7 },
          "-=0.4",
        )
        .from(
          "[data-hero='cta']",
          { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 },
          "-=0.3",
        )
        .from(
          "[data-hero='scroll']",
          { opacity: 0, duration: 0.6 },
          "-=0.2",
        );
    }, el);

    // Parallax de mouse no orbe/gradiente do fundo
    const onMove = (e: MouseEvent) => {
      if (prefersReduced || !orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(orbRef.current, { x, y, duration: 1.2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Fundo: hexágonos + orbe de brilho com parallax */}
      <HexBackground glow={false} />
      <div
        ref={orbRef}
        aria-hidden="true"
        className="glow-radial absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />

      <div className="container-dev relative z-10 flex flex-col items-center text-center">
        <span
          data-hero="badge"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-primary/30 bg-green-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-neon"
        >
          <span className="h-1.5 w-1.5 animate-glow-breathe rounded-full bg-green-neon" />
          {hero.badge}
        </span>

        <h1
          className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-8xl"
          style={{ perspective: "1000px" }}
        >
          {hero.titulo.map((word, i) => (
            <span
              key={`${word}-${i}`}
              data-hero="word"
              className={`mr-3 inline-block will-change-transform ${
                word === hero.destaque ? "text-gradient-green" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          data-hero="subtitle"
          className="mt-7 max-w-2xl text-lg text-text-muted md:text-xl"
        >
          {hero.subtitulo}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <span data-hero="cta">
            <MagneticButton href="#cta" variant="primary">
              {hero.ctaPrimario}
            </MagneticButton>
          </span>
          <span data-hero="cta">
            <MagneticButton href="#formacoes" variant="secondary">
              {hero.ctaSecundario}
            </MagneticButton>
          </span>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        data-hero="scroll"
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-green-neon" />
        </div>
      </div>

      {/* Linha verde divisória (assinatura da plataforma) */}
      <div className="divider-green absolute bottom-0 left-0 w-full" />
    </section>
  );
}
