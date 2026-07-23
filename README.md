# DevClub — Página Institucional

Landing page institucional do DevClub, construída para o concurso de vaga Full Stack.
Foco em **impacto visual**, **animações de alto nível** e **código limpo e defensável**.

> **Live demo:** _(coloque aqui o link da Vercel após o deploy)_

---

## 🚀 Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção:

```bash
npm run build && npm start
```

Requisitos: Node.js 20+.

---

## 🧱 Stack e por quê

| Tecnologia | Por que está aqui |
|---|---|
| **Next.js 16 (App Router) + TypeScript** | A página é institucional → renderizada como estática (SSG): HTML pronto, SEO forte, carregamento instantâneo. O App Router permite Server Components (zero JS onde não há interação) e deploy trivial na Vercel. |
| **React 19** | Componentização de cada seção; vem com o Next 16. |
| **Tailwind CSS** | Design system via tokens (cores da marca num só lugar), sem CSS morto. |
| **CSS puro (globals.css)** | Onde o utilitário não alcança: padrão hexagonal, gradientes de texto, glows. |
| **Framer Motion** | Animações declarativas de entrada (`whileInView` + `staggerChildren`) e microinterações. |
| **GSAP + ScrollTrigger** | Animações amarradas ao scroll: timeline do hero, scroll horizontal com pin, parallax. |
| **Lenis** | Smooth scroll global, sincronizado ao ScrollTrigger — a base da sensação "premium". |
| **Zod** | Validação tipada do formulário de contato na API Route. |

### Por que **NÃO** usei certas coisas (perguntas prováveis na entrevista)

- **Sem MongoDB / servidor Node separado:** uma landing institucional tem conteúdo fixo/fictício. Não há autenticação, dashboard ou dado dinâmico. Banco aqui seria peso morto. O único backend que faz sentido — receber um lead do formulário — é resolvido por **uma API Route do próprio Next** (`app/api/contato`), sem infra extra.
- **Sem Vite:** o Next 16 já traz o próprio bundler (**Turbopack**). Somar Vite seria redundante e conflitante.
- **Fontes locais (`next/font/local`) em vez de `next/font/google`:** build reprodutível, sem dependência de rede e sem request a terceiros (privacidade + performance).

---

## 🎨 Identidade visual

Cores extraídas da plataforma real do DevClub (ver `tailwind.config.ts`):

- Verde de marca `#22C55E`, verde neon `#4ADE80`, verde profundo `#16A34A`
- Fundo quase preto `#0A0A0A`, painéis `#111827`
- Acentos: laranja `#F59E0B`, roxo `#A855F7`

Assinatura visual: **dark mode + verde como energia + padrão hexagonal** (favo de mel) ao fundo das seções, feito 100% em CSS.

---

## ✨ Animações implementadas (os 30% da nota)

- **Smooth scroll** global (Lenis) sincronizado ao GSAP.
- **Hero:** timeline GSAP orquestrada (badge → título em stagger por palavra → subtítulo → CTAs), hexágonos pulsando e **parallax de mouse**.
- **Count-up** das métricas ao entrar na viewport (IntersectionObserver + rAF).
- **Scroll horizontal** com pin na seção de Formações (GSAP ScrollTrigger + scrub).
- **Tilt 3D** reativo ao mouse nos cards de formação + glow verde no hover.
- **Reveal on scroll** em stagger (Framer Motion `whileInView`) nas demais seções.
- **Marquee infinito** de empresas, com pausa no hover.
- **Botões magnéticos** (CTAs que puxam o cursor).
- **Navbar** transparente → sólida com blur ao rolar.
- **Overlay de bio** deslizante nos cards de tutores.

Todas respeitam **`prefers-reduced-motion`** e animam apenas `transform`/`opacity` (60fps, sem reflow).

---

## 🗂️ Arquitetura (os 20% da nota)

```
app/
  layout.tsx        # fontes locais, metadata/SEO, smooth scroll
  page.tsx          # composição das seções (Server Component)
  globals.css       # tokens, base dark, hexágonos, glows
  api/contato/      # API Route + validação Zod (sem banco)
components/
  layout/           # Navbar, Footer, SmoothScroll
  sections/         # Hero, Metrics, Formacoes, Metodo, QuemSomos,
                    # Alunos, Empresas, Tutores, Faculdade, CTA
  ui/               # Logo, MagneticButton, HexBackground, Icon,
                    # SectionHeading, FormacaoCard, DepoimentoCard
hooks/              # useLenis, useCountUp, useMagnetic, useTilt
lib/
  data.ts           # TODO o conteúdo fictício, tipado e desacoplado da UI
  animations.ts     # variantes reutilizáveis do Framer Motion
```

Princípios seguidos:

- **TypeScript estrito** (`strict: true`, `noUnusedLocals`, etc.), sem `any`.
- **Conteúdo desacoplado da UI:** nenhum texto de seção hardcoded no JSX — tudo em `lib/data.ts` tipado.
- **Fronteira `'use client'` mínima:** só seções com animação/estado são client; o resto é Server Component (menos JS no cliente).
- **Acessibilidade:** HTML semântico, `aria-label` em ícones/botões, foco visível, contraste alto.
- **Hooks de animação isolados e reutilizáveis**, com cleanup adequado (sem vazamento de ScrollTrigger).

---

## 🧩 Destaque: seção de Alunos com duas variações

O desafio pediu comparar dois layouts. A seção **Mural da Fama** traz um seletor que alterna, em runtime, entre **mosaico** (colunas estilo Pinterest) e **carrossel** (faixa com snap) — sem tocar no código.

---

## 📦 Deploy

Pensado para a **Vercel** (zero config): importe o repositório e faça deploy. O build é 100% estático exceto a API Route de contato, que roda como função serverless.

---

## 📝 Observações

- Todos os dados (nomes, depoimentos, empresas, métricas) são **fictícios**, conforme permitido pelo desafio.
- O formulário valida e registra o lead no log do servidor; em produção, o ponto de integração com e-mail/CRM está marcado em `app/api/contato/route.ts`.
