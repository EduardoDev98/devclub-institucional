/**
 * Logo do DevClub reproduzido em SVG (pixel-art), fiel à marca enviada:
 * um ícone quadrado estilo QR-code / matriz de pixels em verde, com um "DC"
 * estilizado e detalhes de código, ao lado do wordmark "DevClub".
 * Feito com <rect> numa grade → escala perfeita e cor da marca embutida.
 */

// Grade 11x11. 1 = pixel verde aceso. Cantos com "olhos" tipo QR-code,
// núcleo formando D/C e um detalhe </> na base.
const GRID: readonly (readonly number[])[] = [
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1],
];

export function Logo({ className = "" }: { readonly className?: string }) {
  const cell = 4;
  const gap = 0.6;
  const size = GRID.length * cell;

  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight ${className}`}
      aria-label="DevClub"
    >
      <span className="inline-flex items-center justify-center rounded-md bg-black/20 p-1">
        <svg
          width="34"
          height="34"
          viewBox={`0 0 ${size} ${size}`}
          className="h-[34px] w-[34px]"
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {GRID.flatMap((row, y) =>
            row.map((on, x) =>
              on ? (
                <rect
                  key={`${x}-${y}`}
                  x={x * cell + gap / 2}
                  y={y * cell + gap / 2}
                  width={cell - gap}
                  height={cell - gap}
                  rx={0.6}
                  fill="#22C55E"
                />
              ) : null,
            ),
          )}
        </svg>
      </span>
      <span className="text-xl text-text-primary">DevClub</span>
    </span>
  );
}
