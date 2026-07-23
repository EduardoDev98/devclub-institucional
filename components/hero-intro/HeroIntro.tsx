"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONFIG } from "./config";
import { buildPixels } from "./helpers";
import { drawLogoFrame, type DrawContext } from "./drawLogoFrame";

/**
 * HeroIntro — abertura cinematográfica (canvas + scrub por scroll).
 * O logo QR é desenhado por código e se desmonta conforme o scroll.
 *
 * Arquitetura à prova de falha:
 *  - O canvas é `position: fixed` com z-index alto → SEMPRE fica na frente do
 *    Hero enquanto a intro está ativa (some quando conclui).
 *  - Um "trilho" (spacer) de altura `scrollLength` cria o espaço de scroll.
 *  - Loop rAF lê getBoundingClientRect do trilho → progresso 0..1 → desenha.
 *  - Frame 0 desenhado imediatamente ao montar → nunca "abre no Hero".
 *  - Ao concluir (progresso 1), o overlay some suavemente e é desmontado.
 *  - scrollRestoration manual + scrollTo(0,0). Sempre exibida (nenhum skip).
 */
export function HeroIntro() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const pixels = useMemo(() => buildPixels(), []);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Marca "montado" só no cliente → servidor e 1º render batem (ambos null).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Espelha o progress (calculado abaixo) em CSS puro, pra o Hero poder
    // ficar fixo/esmaecido atrás do véu — sem GSAP, sem posição cacheada.
    document.documentElement.classList.add("intro-active");
    document.documentElement.style.setProperty("--intro-progress", "0");

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const rail = railRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!rail || !canvas || !overlay) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dc: DrawContext = { ctx, width, height, specs: pixels };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dc = { ctx, width, height, specs: pixels };
    };
    resize();

    // O trilho precisa ser sempre mais alto que a viewport, senão
    // `scrollable` (abaixo) zera e a intro conclui no 1º frame. Calculado só
    // no mount (não em todo resize) para não desestabilizar a altura do
    // documento enquanto outras seções (ex.: scroll horizontal com
    // ScrollTrigger) já mediram suas posições de pin.
    rail.style.height = `${Math.max(CONFIG.scrollLength, Math.round(window.innerHeight * 2.2))}px`;

    let raf = 0;
    let last = -1;
    let finished = false;

    const tick = () => {
      const rect = rail.getBoundingClientRect();
      const scrollable = rail.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (scrollable || 1)));

      if (progress !== last) {
        last = progress;
        drawLogoFrame(dc, progress);
        document.documentElement.style.setProperty("--intro-progress", String(progress));
        // fade do overlay nos últimos 15%
        const fade = progress > 0.85 ? (progress - 0.85) / 0.15 : 0;
        overlay.style.opacity = `${1 - fade}`;
        // ao concluir, marca done (desmonta a intro, libera o Hero)
        if (progress >= 1 && !finished) {
          finished = true;
          document.documentElement.classList.remove("intro-active");
          document.documentElement.style.setProperty("--intro-progress", "1");
          setDone(true);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    drawLogoFrame(dc, 0); // frame íntegro imediatamente
    raf = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      // Rede de segurança: garante que o Hero nunca fique preso fixo,
      // seja qual for o motivo do desmonte (conclusão, Fast Refresh, erro).
      document.documentElement.classList.remove("intro-active");
    };
  }, [mounted, pixels]);

  if (!mounted || done) return null;

  return (
    <>
      {/* Trilho invisível: cria o espaço de scroll da intro */}
      <div
        ref={railRef}
        style={{ height: `${CONFIG.scrollLength}px` }}
        aria-hidden="true"
      />

      {/* Overlay FIXO por cima de tudo (z-index alto) com o canvas */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "rgba(2, 4, 3, 0.65)",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>
    </>
  );
}
