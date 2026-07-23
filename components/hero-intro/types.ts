/**
 * Tipos da Hero Intro (responsabilidade única).
 */

/** Uma célula acesa da grade do logo, com seu comportamento individual. */
export interface PixelSpec {
  readonly id: string;
  readonly row: number;
  readonly col: number;
  readonly delay: number;
  readonly scatterX: number;
  readonly scatterY: number;
  readonly rotate: number;
  readonly vibrate: number;
  readonly glow: number;
}
