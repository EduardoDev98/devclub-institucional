import type { Variants } from "framer-motion";

/**
 * Variantes reutilizáveis do Framer Motion.
 * Centralizar aqui garante consistência de timing/easing em toda a página
 * e evita repetir objetos de animação espalhados pelos componentes.
 * Só animamos opacity + transform (translate) → 60fps, sem reflow.
 */

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutExpo suave

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Container que orquestra o stagger dos filhos ao entrar na viewport. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Props padrão para revelar seções ao rolar (usado com whileInView). */
export const revealOnScroll = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
} as const;

/**
 * Variante à prova de falha: opacity SEMPRE 1 (nunca esconde conteúdo),
 * anima só um leve translateY. Mesmo se o whileInView nunca disparar, o
 * conteúdo já está visível — não há estado "preso invisível" possível.
 * Usar em seções onde uma seção anteriormente presa/invisível é inaceitável.
 */
export const fadeUpSafe: Variants = {
  hidden: { opacity: 1, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Como revealOnScroll, mas com threshold baixo (dispara mais cedo/fácil). */
export const revealOnScrollSafe = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.1 },
} as const;

/**
 * Entrada "compilando" — versão "grade viva" reutilizada por Formações,
 * Método, Timeline e Alunos (ver hooks/useLiveCardMotion.ts). Repete a cada
 * passagem pela viewport (once:false), direção conforme o sentido do scroll
 * (`custom.direction`) e um pequeno delay em cascata por índice
 * (`custom.delay`). ATENÇÃO: aqui opacity vai a 0 de verdade (pedido
 * explícito, risco aceito) — a rede de segurança fica no self-heal poll de
 * hooks/useLiveGrid.ts (getBoundingClientRect, independente do Framer Motion).
 */
export const liveCardReveal: Variants = {
  hidden: (custom: { direction?: "down" | "up" } = {}) => ({
    opacity: 0,
    y: custom.direction === "up" ? -24 : 24,
    scale: 0.94,
  }),
  visible: (custom: { delay?: number } = {}) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: custom.delay ?? 0 },
  }),
};

/**
 * Contorno neon "desenhando" ao redor do card (SVG pathLength), que depois
 * assenta na borda normal (opacity some, revelando o border-subtle estático
 * que já existe por baixo). Puramente decorativo/aria-hidden.
 */
export const borderDrawVariant: Variants = {
  hidden: { pathLength: 0, opacity: 1 },
  visible: {
    pathLength: 1,
    opacity: [1, 1, 0],
    transition: {
      pathLength: { duration: 0.5, ease: EASE },
      opacity: { duration: 0.9, times: [0, 0.6, 1], ease: "easeInOut" },
    },
  },
};

/**
 * Pulso rápido de glow verde-neon (badge da categoria e seta "→"), assentando
 * na aparência normal. Só `filter`, sobre elementos pequenos — barato.
 */
export const accentGlowPulse: Variants = {
  hidden: { filter: "drop-shadow(0 0 0px rgba(74, 222, 128, 0))" },
  visible: {
    filter: [
      "drop-shadow(0 0 0px rgba(74, 222, 128, 0))",
      "drop-shadow(0 0 8px rgba(74, 222, 128, 0.85))",
      "drop-shadow(0 0 0px rgba(74, 222, 128, 0))",
    ],
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
