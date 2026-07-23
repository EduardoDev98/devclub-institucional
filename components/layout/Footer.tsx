import { Logo } from "@/components/ui/Logo";

/**
 * Footer institucional. Server Component (sem interatividade) → zero JS enviado.
 */
const COLUNAS = [
  {
    titulo: "Formações",
    links: ["Front-End", "Back-End", "Full Stack", "Mobile", "IA & Dados"],
  },
  {
    titulo: "DevClub",
    links: ["Quem somos", "Método", "Tutores", "Faculdade", "Vagas"],
  },
  {
    titulo: "Comunidade",
    links: ["Discord", "Instagram", "YouTube", "LinkedIn", "Suporte"],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-bg-panel/40 py-16">
      <div className="container-dev">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              Vire programador de verdade. Do zero à sua primeira vaga.
            </p>
          </div>

          {COLUNAS.map((col) => (
            <div key={col.titulo}>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">
                {col.titulo}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-muted transition-colors hover:text-green-neon"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 md:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} DevClub. Todos os direitos reservados.
          </p>
          <p className="text-xs text-text-muted">
            Página institucional • Projeto de concurso
          </p>
        </div>
      </div>
    </footer>
  );
}
