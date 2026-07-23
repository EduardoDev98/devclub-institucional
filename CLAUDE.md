# DevClub — Landing institucional (contexto para o Claude Code)

Projeto de landing single-page para concurso. Foco atual: animações e o conserto
da intro cinematográfica.

## Stack
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5.9
- Tailwind 3.4 (design tokens em `tailwind.config.ts` — usar SEMPRE, sem hex solto)
- Animação: Framer Motion, GSAP, Lenis (todos já instalados)
- Node: 20 (`.nvmrc`); funciona também em 22

## Scripts
- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm start` — servir produção
- `npm run lint` — eslint

## Regras de trabalho (importantes)
- Um passo confirmado de cada vez; explicar o raciocínio das decisões.
- Testar localmente (dev e, quando possível, `build` + `start`) antes de dar como pronto.
- Entregar arquivos completos, não diffs.
- Usar os design tokens do Tailwind; não inventar cores.
- Só marcar `"use client"` onde há estado/efeito/animação.

## Design system
Ver `.claude/skills/frontend-design/SKILL.md`. Resumo: verde de marca #22C55E /
neon #4ADE80 sobre fundo quase preto; fontes display + sans via CSS vars.

## BUG CONHECIDO — intro em canvas (HeroIntro) NÃO aparece
Arquivo: `components/hero-intro/HeroIntro.tsx` (client component).
Sintoma: build passa, mas a animação da intro (logo QR verde que cobre a tela e
se desmonta em pixels conforme o scroll) nunca aparece ao rodar.

O código de desenho (`drawLogoFrame.ts`, `helpers.ts`) já foi validado e está correto.

### Hipótese mais provável (testar primeiro — é barata)
No `tick()`, o progresso é calculado como:
```
const scrollable = rail.offsetHeight - window.innerHeight;
const progress = Math.max(0, Math.min(1, -rect.top / (scrollable || 1)));
```
O trilho tem altura `CONFIG.scrollLength = 1800px`. Se a janela do navegador for
mais alta que 1800px (telas grandes, zoom baixo), `scrollable` fica <= 0, o
progresso vira 1 imediatamente, `setDone(true)` dispara e a intro se desmonta
antes de ser vista. Isso explica "nunca aparece".
Correções candidatas: garantir `scrollLength` maior que a viewport (ex.: baseá-lo
em múltiplos de `innerHeight`), ou clampar `scrollable` a um mínimo positivo e
tratar o caso de viewport alta.

### Segunda hipótese (só se a primeira não for)
Hidratação/montagem do client component. Testar se OUTRO client component (ex.:
`Navbar`, que é `"use client"`) hidrata. Se o Navbar hidrata mas o HeroIntro não,
o problema é o padrão de montagem do HeroIntro (gate `mounted`). Possível
alternativa: carregar via `next/dynamic` com `ssr: false` através de um wrapper
`"use client"` (não pode ser usado direto no Server Component `page.tsx`).

### Como validar o conserto (critérios de aceite)
- Ao abrir a página, a intro cobre a tela imediatamente (frame 0 visível).
- Ao rolar, o logo vibra e se desmonta em pixels dispersando do centro.
- Ao concluir (~progresso 1), o overlay some suave e o Hero fica acessível.
- `prefers-reduced-motion: reduce` pula a intro sem quebrar o Hero.
- Funciona em PRODUÇÃO (`npm run build && npm start`), não só em dev.

### Não perseguir (falsos positivos já descartados)
- Lenis / smooth scroll (o wrapper `SmoothScroll` retorna null; `useLenis` não é usado).
- Erros de WebSocket/HMR em dev.
- z-index / stacking. O build passar não prova que a intro funciona (bug é de runtime).
