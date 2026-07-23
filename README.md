# 💚 DevClub — Landing Institucional

Landing page institucional da **DevClub**, uma escola de programação. Site de página única, com animações modernas e efeitos visuais que reforçam a identidade tech da marca.

---

## 📋 Sobre o projeto

Aplicação **front-end** construída com **Next.js 16** para apresentar a DevClub: suas formações, método de ensino, história, depoimentos de alunos e empresas parceiras. O foco está na experiência visual — uma intro animada em canvas, seções que se revelam ao rolar e micro-interações que dão ao site uma cara profissional e tecnológica.

O projeto é **estático/institucional**: não há back-end, banco de dados nem área de login. Todo o conteúdo é renderizado no próprio front-end.

---

## ✨ Funcionalidades e destaques visuais

### 🎬 Intro animada

- Abertura com um logo em formato de QR code que se desenha em pixels e se desfaz conforme o scroll
- Fundo translúcido durante a intro, revelando o Hero por trás com opacidade progressiva
- Efeito de "materialização" ao rolar, sem cortes na transição para o restante do site

### 🃏 Animações "grade viva" (Formações, Método, Timeline, Alunos)

- Cards que se revelam em **cascata direcional** — entram de baixo ao descer e de cima ao subir
- **Borda neon** que se desenha ao redor de cada card ao entrar na viewport
- **Glow pulsante** no ícone / tag / avatar de cada seção
- Efeito **"decrypt"** (texto embaralhado que se resolve) nos títulos, anos e nomes
- **Tilt 3D** no hover dos cards de Formações
- Rede de segurança à prova de falha: nenhum card fica preso invisível

### 📐 Seções

- **Hero** — chamada principal com destaque de marca
- **Métricas** — números e estatísticas com contagem animada
- **Formações** — trilhas de aprendizado em grid responsivo
- **Método** — diferenciais além do código
- **Timeline** — a história da escola em marcos por ano
- **Alunos & Empresas** — depoimentos e parceiros
- **CTA** — chamada final para conversão

### 📱 Responsividade

- Layout **mobile-first**: grids que se empilham em telas pequenas
- Animações que respeitam a preferência `prefers-reduced-motion`

---

## 🛠️ Tecnologias utilizadas

**Framework & Linguagem**

- Next.js 16 (App Router + Turbopack)
- React 19
- TypeScript 5.9

**Estilização**

- Tailwind CSS 3.4 (design tokens centralizados)
- Design system verde neon (`#22C55E` / `#4ADE80`) sobre fundo quase preto (`#0A0A0A`)

**Animação**

- Framer Motion (revelação ao scroll, cascata, variantes)
- GSAP (tilt 3D nos cards)
- Canvas + requestAnimationFrame (intro do logo)

---

## 🤖 Uso de Inteligência Artificial

Ferramentas de IA foram usadas de forma pontual, como apoio ao desenvolvimento — principalmente para tirar dúvidas específicas, revisar trechos de código e agilizar a escrita de partes repetitivas da documentação. A arquitetura, as decisões técnicas e a implementação foram conduzidas e validadas manualmente.

---

## 🚀 Como executar localmente

**Requisitos:** Node.js 20+ (o projeto foi desenvolvido com Node 24) e npm.

```bash
# 1. Clone o repositório
git clone https://github.com/EduardoDev98/devclub-institucional.git
cd devclub-institucional

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** no navegador.

### 📜 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm start` | Roda a build de produção |
| `npm run lint` | Verifica o código com o ESLint |

---

## 🧠 Decisões técnicas

**Animações via IntersectionObserver** — a revelação ao scroll usa o `whileInView` do Framer Motion (baseado no bounding box vivo do elemento), evitando cache de posições que ficam desatualizadas quando o layout muda após o mount.

**Estado à prova de falha** — o conteúdo nunca pode ficar preso invisível. Se uma animação de entrada não disparar, o estado final é sempre visível por padrão. Um mecanismo de auto-correção (self-heal) reforça isso nas seções com animação repetível.

**Intro sem dependência de configuração do sistema** — a abertura animada aparece para todos os visitantes, independente de preferências de movimento do sistema operacional, garantindo consistência de apresentação.

**Efeito decrypt sem quebrar hidratação** — o texto real é sempre o estado inicial (idêntico no servidor e no cliente); o embaralhamento aleatório entra apenas depois da hidratação, no lado do cliente, evitando divergências de SSR.

**Design tokens centralizados** — cores, fontes e espaçamentos ficam no `tailwind.config.ts`, sem valores hexadecimais soltos pelo código.

**Responsividade mobile-first** — os grids das seções colapsam para uma coluna em telas pequenas, mantendo a identidade visual.

---

## 📂 Estrutura do projeto

```
devclub-institucional/
├── app/
│   ├── page.tsx            # monta a árvore de seções
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── hero-intro/         # intro animada em canvas
│   ├── sections/           # Hero, Metrics, Formações, Método,
│   │                       # Timeline, Alunos, Empresas, CTA...
│   ├── ui/                 # cards, headings, DecryptText...
│   └── layout/             # Navbar, Footer
├── hooks/
│   ├── useTilt.ts          # tilt 3D no hover
│   ├── useLiveGrid.ts      # direção do scroll + self-heal
│   ├── useLiveCardMotion.ts
│   └── useCountUp.ts, useMagnetic.ts
├── lib/
│   ├── animations.ts       # variantes do Framer Motion
│   └── data.ts             # dados das seções
├── public/                 # imagens e assets
└── tailwind.config.ts      # design tokens
```

---

Desenvolvido por **Eduardo** · 💚 DevClub
</file_text>
