import type { DiferencialIcon } from "@/lib/data";

/**
 * Ícones em SVG inline (stroke), mapeados por chave tipada.
 * Inline em vez de biblioteca de ícones: zero dependência extra, controle total
 * do traço e da cor, e tree-shaking natural (só entra o que usamos).
 */
const paths: Record<DiferencialIcon, React.ReactNode> = {
  video: (
    <>
      <rect x="3" y="6" width="14" height="12" rx="2" />
      <path d="m17 10 4-2v8l-4-2" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V4M9 4h6M8 13h.01M16 13h.01M9 17h6" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </>
  ),
  zap: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  book: (
    <>
      <path d="M4 4v16a1 1 0 0 0 1 1h14V3H5a1 1 0 0 0-1 1Z" />
      <path d="M9 3v18" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1 1-2 4-2 4s3-1 4-2M12 3c4 2 6 6 6 10l-4 3H10l-4-3c0-4 2-8 6-10Z" />
      <circle cx="12" cy="9" r="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3 3-5 7-5s7 2 7 5M16 6a3 3 0 0 1 0 6M22 20c0-2-1.5-3.5-4-4.2" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 21 11c-2 4.5-9 9-9 9Z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  shield: <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />,
  message: (
    <path d="M4 5h16v11H9l-5 4V5Z" />
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
}: {
  readonly name: DiferencialIcon;
  readonly className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
