"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { label: "Formações", href: "#formacoes" },
  { label: "Método", href: "#metodo" },
  { label: "Alunos", href: "#alunos" },
  { label: "Empresas", href: "#empresas" },
  { label: "Tutores", href: "#tutores" },
] as const;

/**
 * Navbar fixa. Começa transparente sobre o hero e vira sólida com blur quando
 * o usuário rola além de 40px. Menu mobile em drawer simples.
 * Usamos scroll listener passivo (não bloqueia a thread de scroll).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border-subtle)] bg-bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container-dev flex h-16 items-center justify-between"
        aria-label="Navegação principal"
      >
        <a href="#top" aria-label="Ir para o topo">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-green-neon"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-text-primary transition-colors hover:text-green-neon"
          >
            Área do Aluno
          </a>
          <MagneticButton href="#cta" variant="primary">
            Quero ser aluno
          </MagneticButton>
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          className="md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Drawer mobile */}
      {open && (
        <div className="border-t border-[var(--border-subtle)] bg-bg-black/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-text-muted hover:text-green-neon"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <MagneticButton href="#cta" variant="primary" className="w-full">
                Quero ser aluno
              </MagneticButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
