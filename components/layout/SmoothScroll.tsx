"use client";

/**
 * Anteriormente ativávamos smooth scroll global (Lenis). Removido: em algumas
 * máquinas ele conflitava com o pin/ScrollTrigger do GSAP, travando seções.
 * O scroll nativo do navegador é confiável e não trava — priorizamos robustez.
 * Componente mantido (vazio) para não alterar o layout que o importa.
 */
export function SmoothScroll(): null {
  return null;
}
