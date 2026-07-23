import { LOGO_GRID } from "./config";
import type { PixelSpec } from "./types";

/**
 * Helpers puros da Hero Intro (responsabilidade única: cálculo/derivação).
 */

/** PRNG determinístico (mulberry32) — dispersão "orgânica" porém reprodutível. */
function makeRng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deriva a lista de pixels acesos com comportamento INDIVIDUAL (delay, direção,
 * rotação, vibração, glow) — nada sincronizado. A dispersão parte do centro
 * para fora, contando a história de "o logo construindo o site".
 */
export function buildPixels(): PixelSpec[] {
  const rows = LOGO_GRID.length;
  const cols = LOGO_GRID[0]!.length;
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const rng = makeRng(20260723);

  const pixels: PixelSpec[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!LOGO_GRID[r]![c]) continue;

      // Vetor do centro para fora → dispersão "explode" de dentro
      const dx = c - cx;
      const dy = r - cy;
      const len = Math.hypot(dx, dy) || 1;
      const norm = { x: dx / len, y: dy / len };
      const dist = 220 + rng() * 560;

      // Distância ao centro normalizada → vira o delay (centro sai primeiro)
      const maxDist = Math.hypot(cx, cy) || 1;
      const delay = (len / maxDist) * 0.4 + rng() * 0.1;

      pixels.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        delay,
        scatterX: norm.x * dist + (rng() - 0.5) * 120,
        scatterY: norm.y * dist + (rng() - 0.5) * 120,
        rotate: (rng() - 0.5) * 720,
        vibrate: 4 + rng() * 8,
        glow: 0.5 + rng() * 0.5,
      });
    }
  }
  return pixels;
}
