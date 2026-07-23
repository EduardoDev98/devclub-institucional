/**
 * Configuração central da Hero Intro (responsabilidade única).
 * Todo valor ajustável mora aqui — trocar ritmo/aparência é só editar isto.
 */

// Grade do logo DevClub (QR-code estilizado): 1 = pixel aceso.
export const LOGO_GRID: readonly (readonly number[])[] = [
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
];

export const CONFIG = {
  // Comprimento do scroll dedicado à intro (px).
  scrollLength: 1800,
  // Cor de fundo do overlay.
  bg: "#020403",
  // Largura do logo.
  logoWidth: "min(42vw, 420px)",
  // Cores neon.
  green: "#22C55E",
  greenNeon: "#4ADE80",
} as const;
