"use client";

import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "secondary";

interface MagneticButtonProps {
  readonly children: React.ReactNode;
  readonly href?: string;
  readonly variant?: Variant;
  readonly onClick?: () => void;
  readonly className?: string;
}

const base =
  "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-300 will-change-transform";

const styles: Record<Variant, string> = {
  primary:
    "bg-green-primary text-[#04120a] hover:bg-green-neon shadow-green-glow",
  secondary:
    "border border-[var(--border-subtle)] bg-white/5 text-text-primary hover:border-green-neon hover:text-green-neon",
};

/**
 * Botão com efeito magnético (via useMagnetic). Renderiza <a> quando há href,
 * senão <button>. O wrapper externo recebe o magnetismo para o alvo de clique
 * inteiro se mover junto.
 */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  onClick,
  className = "",
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLSpanElement>(0.4);
  const classes = `${base} ${styles[variant]} ${className}`;

  return (
    <span ref={ref} className="inline-block will-change-transform">
      {href ? (
        <a href={href} className={classes}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </span>
  );
}
