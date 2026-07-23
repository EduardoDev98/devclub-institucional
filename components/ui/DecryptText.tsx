"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Efeito "hacker/matrix": embaralha caracteres até revelar o texto real,
 * letra por letra. À prova de falha por construção — o estado inicial do
 * useState já É o texto real (nunca embaralhado), então:
 *  - Servidor e 1º render no cliente são idênticos (sem Math.random() no
 *    valor inicial) → zero risco de mismatch de hidratação.
 *  - Se `active` nunca virar true, ou o efeito falhar/não rodar, o texto
 *    exibido já é o correto desde sempre — nunca fica em branco/errado.
 *  - `aria-label` garante que leitores de tela sempre anunciam o texto real,
 *    mesmo durante o embaralhamento visual.
 */
export function DecryptText({
  text,
  active,
  duration = 0.7,
}: {
  readonly text: string;
  readonly active: boolean;
  readonly duration?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    let start = 0;
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / totalMs, 1);
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealCount) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(next);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text); // garante o texto final exato, sem sobra aleatória
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, text, duration]);

  return <span aria-label={text}>{display}</span>;
}
