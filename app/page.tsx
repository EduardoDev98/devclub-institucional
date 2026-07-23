import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroIntro } from "@/components/hero-intro/HeroIntro";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Impacto } from "@/components/sections/Impacto";
import { Formacoes } from "@/components/sections/Formacoes";
import { Metodo } from "@/components/sections/Metodo";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { TimelineHorizontal } from "@/components/sections/TimelineHorizontal";
import { Alunos } from "@/components/sections/Alunos";
import { Empresas } from "@/components/sections/Empresas";
import { Tutores } from "@/components/sections/Tutores";
import { Faculdade } from "@/components/sections/Faculdade";
import { CTA } from "@/components/sections/CTA";

/**
 * Composição da landing (single page com âncoras).
 * Esta página é um Server Component: ela apenas monta a árvore. Cada seção
 * decide internamente se precisa de 'use client' (só as com animação/estado).
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroIntro />
        <Hero />
        <Metrics />
        <Impacto />
        <Formacoes />
        <Metodo />
        <QuemSomos />
        <TimelineHorizontal />
        <Alunos />
        <Empresas />
        <Tutores />
        <Faculdade />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
