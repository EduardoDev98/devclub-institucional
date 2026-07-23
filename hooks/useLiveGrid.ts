"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Infraestrutura compartilhada da "grade viva" (Formações, Método, Timeline,
 * Alunos): direção do scroll + self-heal poll + detecção de
 * prefers-reduced-motion. Cada seção chama isso uma vez, com seu próprio
 * `gridRef` e `selector` — polls independentes, sem interferência entre
 * seções mesmo reaproveitando o mesmo atributo de seletor.
 *
 * Direção: um listener de scroll (passive, mesmo padrão do Navbar.tsx) grava
 * a direção numa ref (sem re-render) — cada card lê isso só ao sair da
 * viewport, decidindo de que lado entrar da próxima vez.
 *
 * Self-heal: rede de segurança independente do Framer Motion. A cada ~1,5s,
 * confere via getBoundingClientRect (layout ao vivo, sem cache) se algum
 * card está fisicamente na viewport mas preso em opacity baixa — se estiver,
 * força visível. Cobre qualquer falha do observer que o once:false possa
 * introduzir.
 */
export function useLiveGrid(
  gridRef: RefObject<HTMLElement | null>,
  selector: string,
) {
  const directionRef = useRef<"down" | "up">("down");
  const lastScrollY = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      directionRef.current = y > lastScrollY.current ? "down" : "up";
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(selector);
      cards?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (inViewport && parseFloat(getComputedStyle(el).opacity) < 0.05) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [reducedMotion, gridRef, selector]);

  return { directionRef, reducedMotion };
}
