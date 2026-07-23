---
name: frontend-design
description: Regras de design e animação para a landing DevClub. Use sempre que criar, ajustar ou refinar qualquer UI, componente visual ou animação neste projeto.
---

# Design & Animação — DevClub Landing

Esta skill orienta como construir e refinar UI neste projeto. O objetivo é uma
landing com aparência de agência premium, não "site gerado por IA".

## Fonte única de verdade: os tokens já existem

NUNCA use cores mágicas (hex solto) no JSX. Todos os tokens estão em
`tailwind.config.ts`. Sempre use as classes/tokens abaixo:

### Cores
- Verde de marca: `green-primary` (#22C55E), `green-neon` (#4ADE80), `green-deep` (#16A34A)
- Fundos: `bg-black` (#0A0A0A), `bg-panel` (#111827), `bg-elevated` (#1A1A1A)
- Acentos: `accent-orange` (#F59E0B), `accent-purple` (#A855F7) — usar com parcimônia
- Texto: `text-primary` (#FFFFFF), `text-muted` (#9CA3AF)

### Tipografia
- Display (títulos/hero): `font-display` (via `--font-display`)
- Corpo/UI: `font-sans` (via `--font-sans`)
- Escala: use uma escala de tipos consistente (não tamanhos aleatórios). Prefira
  saltos claros entre nível de hero, seção, subtítulo e corpo.

### Espaçamento
- Grade base de 8px. Prefira múltiplos de 4/8 no Tailwind (p-2, p-4, gap-6, etc.).

### Sombras / brilho
- Use os tokens `shadow-green-glow` e `shadow-green-glow-lg` para o efeito neon.

## Animação (biblioteca certa para cada caso)

O projeto já tem **Framer Motion**, **GSAP** e **Lenis** instalados. Escolha:
- **Framer Motion** → entradas de componentes, hover, transições de estado
  (scroll reveals, stagger, fade/slide). É o padrão para UI declarativa.
- **GSAP** → timelines complexas, scrub por scroll, sequências coreografadas
  (ex.: a intro em canvas, seções com scroll horizontal).
- **Lenis** → smooth scroll global (hoje o wrapper `SmoothScroll` está desativado;
  não reative sem pedir confirmação).

### Padrões de animação a aplicar
- Scroll reveal: fade + leve subida (translateY 16–24px), com stagger em listas.
- Hover em elementos interativos: transição suave (200–300ms), sem exagero.
- Respeitar SEMPRE `prefers-reduced-motion`: se reduzido, pular/encurtar animações.

## Regras de arquitetura (Next.js 16 + React 19)

- `page.tsx` é Server Component; só marque `"use client"` seções que têm
  estado/animação/efeito. Não espalhe `"use client"` sem necessidade.
- Componentes que dependem do browser (canvas, matchMedia, window) devem tratar
  o caso servidor (SSR) sem quebrar hidratação.
- Prefira arquivos completos a diffs quando devolver código.

## Evitar a estética genérica de IA
- Nada de gradientes roxo→azul aleatórios, cantos excessivamente arredondados em
  tudo, ou emojis como ícones.
- Respeitar a identidade: verde neon sobre preto, tom técnico/dev, QR-code de marca.
- Contraste real, hierarquia clara, respiro (whitespace) generoso.

## Estilo de trabalho esperado
- Um passo confirmado de cada vez.
- Explicar o porquê das decisões, não só o o quê.
- Testar localmente antes de dar como pronto.
- Comunicar riscos e o que ficou incompleto com honestidade.
