import { LOGO_GRID, CONFIG } from "./config";
import type { PixelSpec } from "./types";

/**
 * Desenho do "frame" do logo no canvas, conforme o progresso do scroll (0..1).
 * Substitui os frames JPEG de vídeo do guia por frames GERADOS por código:
 * cada pixel do logo é desenhado na sua posição, com vibração (início) e
 * dispersão (fim) proporcionais ao progresso. Assim temos o efeito "scrub"
 * do PDF sem depender de vídeo/Higgsfield.
 *
 * Técnica de desenho cover-fit + devicePixelRatio (como no guia): nítido em
 * qualquer tela, sem distorção.
 */

export interface DrawContext {
  readonly ctx: CanvasRenderingContext2D;
  readonly width: number; // largura CSS (px)
  readonly height: number; // altura CSS (px)
  readonly specs: PixelSpec[];
}

const ROWS = LOGO_GRID.length;
const COLS = LOGO_GRID[0]!.length;

/** easing suave (easeOutCubic) */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function drawLogoFrame(dc: DrawContext, progress: number): void {
  const { ctx, width, height, specs } = dc;

  // Fundo transparente (o véu vem do backgroundColor do overlay em HeroIntro.tsx)
  ctx.clearRect(0, 0, width, height);

  // Tamanho do logo (cover-fit relativo à tela) e origem centralizada
  const logoSize = Math.min(width, height) * 0.42;
  const cell = logoSize / COLS;
  const gap = cell * 0.16;
  const originX = width / 2 - logoSize / 2;
  const originY = height / 2 - logoSize / 2;

  // Fases: 0–0.18 energia/vibração | 0.25–1 dispersão
  const energize = Math.min(progress / 0.18, 1);
  const scatter = easeOut(Math.max((progress - 0.25) / 0.75, 0));

  // Glow global cresce na energia
  const glowBlur = 8 + energize * 22;

  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!LOGO_GRID[r]![c]) continue;
      const s = specs[i++]!;

      // Posição base do pixel na grade
      const baseX = originX + c * cell + gap / 2;
      const baseY = originY + r * cell + gap / 2;

      // Vibração (só enquanto energiza e ainda não dispersou muito)
      const vib = energize * (1 - scatter);
      const jitterX = Math.sin((progress * 40 + i) * 2) * s.vibrate * 0.3 * vib;
      const jitterY = Math.cos((progress * 40 + i) * 2) * s.vibrate * 0.3 * vib;

      // Dispersão (cada pixel voa na sua direção, com seu delay)
      const localScatter = easeOut(
        Math.max((scatter - s.delay * 0.3) / (1 - s.delay * 0.3), 0),
      );
      const dx = s.scatterX * localScatter;
      const dy = s.scatterY * localScatter;
      const rot = (s.rotate * Math.PI) / 180 * localScatter;

      const x = baseX + jitterX + dx;
      const y = baseY + jitterY + dy;

      const size = (cell - gap) * (1 + energize * 0.12 - localScatter * 0.85);
      if (size <= 0) continue;

      const alpha = 1 - localScatter;
      if (alpha <= 0) continue;

      ctx.save();
      ctx.translate(x + size / 2, y + size / 2);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.shadowColor = CONFIG.greenNeon;
      ctx.shadowBlur = glowBlur * s.glow;
      ctx.fillStyle = CONFIG.green;
      // cantos levemente arredondados
      const rr = Math.min(2, size * 0.2);
      roundRect(ctx, -size / 2, -size / 2, size, size, rr);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
