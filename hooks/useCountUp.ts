"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima um número de 0 até `target` quando o elemento entra na viewport.
 * Usa IntersectionObserver (dispara uma vez) + requestAnimationFrame para
 * um count-up suave. Suporta casas decimais (ex.: 4.9).
 * Respeita prefers-reduced-motion: mostra o valor final direto.
 */
export function useCountUp(
  target: number,
  durationMs = 1600,
): { value: number; ref: React.RefObject<HTMLSpanElement | null> } {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const decimals = target % 1 !== 0 ? 1 : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;

        if (prefersReduced) {
          setValue(target);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          // easeOutCubic para desacelerar no fim
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Number((eased * target).toFixed(decimals));
          setValue(current);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return { value, ref };
}
