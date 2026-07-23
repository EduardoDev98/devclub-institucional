/**
 * Camada de fundo com o padrão hexagonal (favo de mel) — assinatura visual do
 * DevClub. É puramente decorativa (aria-hidden) e não recebe eventos de ponteiro.
 * O pulsar suave vem da animação `hex-pulse` definida no tailwind.config.
 */
export function HexBackground({
  className = "",
  glow = true,
}: {
  readonly className?: string;
  readonly glow?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="hex-pattern absolute inset-0 animate-hex-pulse" />
      {glow && <div className="glow-radial absolute inset-0" />}
    </div>
  );
}
