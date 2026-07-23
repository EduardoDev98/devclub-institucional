import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

/**
 * Tipografia via next/font/local: fontes auto-hospedadas (arquivos .woff2 no
 * repositório). Vantagem sobre buscar do Google em build: zero dependência de
 * rede, build reprodutível e melhor privacidade (nenhuma request a terceiros).
 * Space Grotesk (display, geométrica e forte) para títulos;
 * Inter (altamente legível) para corpo.
 */
const display = localFont({
  src: [
    { path: "./fonts/space-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevClub — Vire programador de verdade",
  description:
    "Formações completas do zero ao avançado, IA de apoio 24h, mentorias semanais e a maior comunidade dev do Brasil. Escola reconhecida pelo MEC.",
  keywords: [
    "programação",
    "curso de programação",
    "DevClub",
    "front-end",
    "back-end",
    "full stack",
    "carreira em tech",
  ],
  openGraph: {
    title: "DevClub — Vire programador de verdade",
    description:
      "Do primeiro 'Hello World' à sua primeira vaga. Junte-se a mais de 30 mil alunos.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        {/* Ativa o smooth scroll global (client component isolado) */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
