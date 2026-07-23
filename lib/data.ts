/**
 * Fonte única de conteúdo da landing.
 * Todos os dados são FICTÍCIOS (permitido pelo desafio) e ficam desacoplados da UI:
 * nenhum componente hardcoda texto de seção. Isso facilita manutenção e prova
 * organização de código na avaliação.
 */

export interface Metric {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export interface Formacao {
  readonly nome: string;
  readonly categoria: "Front-End" | "Back-End" | "Full Stack" | "Mobile" | "IA & Dados";
  readonly descricao: string;
  readonly nivel: "Do zero" | "Intermediário" | "Avançado";
}

export interface Diferencial {
  readonly titulo: string;
  readonly descricao: string;
  readonly icon: DiferencialIcon;
}

export type DiferencialIcon =
  | "video"
  | "bot"
  | "cpu"
  | "zap"
  | "book"
  | "rocket"
  | "users"
  | "heart"
  | "calendar"
  | "shield"
  | "message"
  | "briefcase";

export interface Depoimento {
  readonly nome: string;
  readonly cargo: string;
  readonly empresa: string;
  readonly texto: string;
  readonly iniciais: string;
}

export interface Tutor {
  readonly nome: string;
  readonly especialidade: string;
  readonly bio: string;
  readonly iniciais: string;
  readonly foto: string;
}

export interface Empresa {
  readonly nome: string;
}

// ---- HERO ----------------------------------------------------------------

export const hero = {
  badge: "Escola de Programação • Reconhecida pelo MEC",
  // Quebramos o título em linhas para animar o stagger palavra a palavra no GSAP.
  titulo: ["Vire", "programador", "de", "verdade."],
  destaque: "programador",
  subtitulo:
    "Do primeiro 'Hello World' à sua primeira vaga. Formações completas, IA de apoio 24h, mentorias semanais e a maior comunidade dev do Brasil.",
  ctaPrimario: "Quero ser aluno",
  ctaSecundario: "Ver formações",
} as const;

// ---- MÉTRICAS ------------------------------------------------------------

export const metrics: readonly Metric[] = [
  { value: 30, suffix: "mil+", label: "Alunos formados" },
  { value: 500, suffix: "+", label: "Empresas contratando" },
  { value: 92, suffix: "%", label: "Empregabilidade" },
  { value: 4.9, suffix: "/5", label: "Nota dos alunos" },
];

// ---- FORMAÇÕES -----------------------------------------------------------

export const formacoes: readonly Formacao[] = [
  { nome: "Front-End", categoria: "Front-End", descricao: "HTML, CSS, JS e React até projetos reais.", nivel: "Do zero" },
  { nome: "Back-End", categoria: "Back-End", descricao: "Node, APIs, bancos e arquitetura.", nivel: "Do zero" },
  { nome: "Full Stack", categoria: "Full Stack", descricao: "O caminho completo, ponta a ponta.", nivel: "Do zero" },
  { nome: "Mobile", categoria: "Mobile", descricao: "Apps nativos e híbridos com React Native.", nivel: "Intermediário" },
  { nome: "React", categoria: "Front-End", descricao: "Componentização, hooks e performance.", nivel: "Intermediário" },
  { nome: "Node", categoria: "Back-End", descricao: "Servidores, autenticação e integrações.", nivel: "Intermediário" },
  { nome: "JavaScript Completo", categoria: "Front-End", descricao: "A linguagem da web, do básico ao avançado.", nivel: "Do zero" },
  { nome: "HTML5", categoria: "Front-End", descricao: "Estrutura semântica e acessível.", nivel: "Do zero" },
  { nome: "CSS3", categoria: "Front-End", descricao: "Layouts modernos, grid, flexbox e animações.", nivel: "Do zero" },
  { nome: "Gestor de IA", categoria: "IA & Dados", descricao: "Orquestre agentes e fluxos inteligentes.", nivel: "Avançado" },
  { nome: "IA & Automações", categoria: "IA & Dados", descricao: "Automatize processos com IA de ponta.", nivel: "Intermediário" },
  { nome: "Claude & Claude Code", categoria: "IA & Dados", descricao: "Programe com IA no seu dia a dia.", nivel: "Intermediário" },
  { nome: "Trilha N8N", categoria: "IA & Dados", descricao: "Automação visual sem limites.", nivel: "Intermediário" },
  { nome: "Análise de Dados", categoria: "IA & Dados", descricao: "Transforme dados em decisão.", nivel: "Intermediário" },
  { nome: "Power BI", categoria: "IA & Dados", descricao: "Dashboards que contam histórias.", nivel: "Do zero" },
];

// ---- DIFERENCIAIS (MÉTODO) -----------------------------------------------

export const diferenciais: readonly Diferencial[] = [
  { titulo: "Aulas", descricao: "Todo o conteúdo organizado em trilhas e formações.", icon: "video" },
  { titulo: "ClubHub", descricao: "Hub de inteligência artificial para turbinar seus estudos.", icon: "bot" },
  { titulo: "Club Agents", descricao: "IAs especialistas em cada tecnologia, 24h por dia.", icon: "cpu" },
  { titulo: "Playground", descricao: "Ambiente interativo para testar CSS e JS com feedback imediato.", icon: "zap" },
  { titulo: "E-Books", descricao: "Biblioteca de materiais de apoio para acelerar.", icon: "book" },
  { titulo: "Aceleração de Carreira", descricao: "Mentoria de 12 semanas para mudar seu jogo.", icon: "rocket" },
  { titulo: "Recrutadora Semanal", descricao: "Acompanhamento de carreira toda semana.", icon: "briefcase" },
  { titulo: "Terapeuta de Performance", descricao: "Foco em alta performance e saúde mental.", icon: "heart" },
  { titulo: "Mentorias Semanais", descricao: "Com os melhores profissionais do mercado.", icon: "calendar" },
  { titulo: "Suporte Humano 7 dias", descricao: "Gente de verdade para te ajudar todos os dias.", icon: "shield" },
  { titulo: "Comunidade", descricao: "A maior e melhor comunidade dev do Brasil.", icon: "users" },
  { titulo: "Vagas Exclusivas", descricao: "Oportunidades que só chegam aqui dentro.", icon: "message" },
];

// ---- QUEM SOMOS ----------------------------------------------------------

export const quemSomos = {
  titulo: "Não é curso. É uma virada de carreira.",
  paragrafos: [
    "O DevClub nasceu de uma inconformidade: gente boa ficando pelo caminho por falta de oportunidade, não de talento.",
    "Aqui a gente ensina a programar de verdade — com projetos reais, IA de apoio e uma comunidade que não te deixa desistir. O código é só o começo; o resto é carreira.",
  ],
} as const;

// ---- DEPOIMENTOS ---------------------------------------------------------

export const depoimentos: readonly Depoimento[] = [
  { nome: "Camila Souza", cargo: "Front-End Dev", empresa: "Nubank", iniciais: "CS", texto: "Entrei sem saber ligar o VS Code. Oito meses depois assinei carteira como dev. O suporte humano fez toda a diferença." },
  { nome: "Rafael Lima", cargo: "Full Stack", empresa: "iFood", iniciais: "RL", texto: "A comunidade é surreal. Nunca fiquei travado sozinho. Sempre tinha alguém pra destravar meu código." },
  { nome: "Beatriz Alves", cargo: "Back-End Dev", empresa: "Stone", iniciais: "BA", texto: "As mentorias semanais me deram repertório pra passar em entrevista de sênior com 1 ano de estrada." },
  { nome: "Diego Martins", cargo: "Mobile Dev", empresa: "PicPay", iniciais: "DM", texto: "Os projetos reais viraram meu portfólio. Fui contratado mostrando exatamente o que construí aqui." },
  { nome: "Larissa Nunes", cargo: "Dev de IA", empresa: "Mercado Livre", iniciais: "LN", texto: "A trilha de IA me colocou à frente. Hoje automatizo processos que ninguém no meu time sabia fazer." },
  { nome: "Thiago Rocha", cargo: "Front-End Dev", empresa: "Inter", iniciais: "TR", texto: "Saí de outra área aos 34. Achei que era tarde. Não era. Melhor decisão que tomei." },
];

// ---- EMPRESAS ------------------------------------------------------------

export const empresas: readonly Empresa[] = [
  { nome: "Nubank" }, { nome: "iFood" }, { nome: "Stone" }, { nome: "PicPay" },
  { nome: "Mercado Livre" }, { nome: "Inter" }, { nome: "Magalu" }, { nome: "Globo" },
  { nome: "XP Inc" }, { nome: "Itaú" }, { nome: "Ambev Tech" }, { nome: "Locaweb" },
];

// ---- TUTORES -------------------------------------------------------------

export const tutores: readonly Tutor[] = [
  { nome: "Rodolfo Mori", especialidade: "Fundador • Full Stack", bio: "Formou milhares de devs e lidera o time por trás do DevClub.", iniciais: "RM", foto: "/tutores/rodolfo.jpg" },
  { nome: "Fernanda", especialidade: "Front-End & Design", bio: "Especialista em interfaces que encantam e convertem.", iniciais: "FE", foto: "/tutores/fernanda.jpg" },
  { nome: "Agustinho", especialidade: "Back-End & Arquitetura", bio: "APIs robustas e sistemas que escalam de verdade.", iniciais: "AG", foto: "/tutores/agustinho.jpg" },
  { nome: "Henrique", especialidade: "Mobile", bio: "Apps performáticos do protótipo à loja.", iniciais: "HE", foto: "/tutores/henrique.jpg" },
  { nome: "Márcio", especialidade: "IA & Automações", bio: "Agentes de IA e automações que economizam horas.", iniciais: "MA", foto: "/tutores/marcio.jpg" },
  { nome: "Juliana", especialidade: "Dados & BI", bio: "Transforma planilha caótica em decisão de negócio.", iniciais: "JU", foto: "/tutores/juliana.jpg" },
  { nome: "Mateus", especialidade: "DevOps & Cloud", bio: "Deploy, escala e infraestrutura sem dor de cabeça.", iniciais: "MT", foto: "/tutores/mateus.jpg" },
];

// ---- CTA FINAL -----------------------------------------------------------

export const ctaFinal = {
  titulo: "Sua vaga em tech começa com uma decisão.",
  subtitulo: "Junte-se a mais de 30 mil alunos que trocaram de vida com código.",
  botao: "Quero começar agora",
} as const;

// ---- TIMELINE / JORNADA (estilo storytelling) ----------------------------

export interface TimelineItem {
  readonly ano: string;
  readonly titulo: string;
  readonly texto: string;
  readonly tag: string;
}

export const timeline: readonly TimelineItem[] = [
  {
    ano: "2019",
    titulo: "O primeiro Hello World",
    texto:
      "Tudo começou com uma inconformidade: gente boa ficando pelo caminho por falta de oportunidade, não de talento. Nasceu a ideia de ensinar programação de um jeito diferente.",
    tag: "@início",
  },
  {
    ano: "2021",
    titulo: "A comunidade cresce",
    texto:
      "De algumas centenas para milhares de alunos. Percebemos que o código era só o começo — o que segurava as pessoas era a comunidade e o suporte de verdade.",
    tag: "@comunidade",
  },
  {
    ano: "2023",
    titulo: "Método além do código",
    texto:
      "Mentorias semanais, recrutadora, terapeuta de performance e IA de apoio 24h. Paramos de vender curso e passamos a construir carreiras.",
    tag: "@método",
  },
  {
    ano: "2024",
    titulo: "Reconhecimento oficial",
    texto:
      "Escola reconhecida pelo MEC, com diplomas oficiais. O aluno não sai só sabendo programar — sai com um certificado que o mercado respeita.",
    tag: "@MEC",
  },
  {
    ano: "2026",
    titulo: "A jornada continua",
    texto:
      "Mais de 30 mil vidas transformadas e uma fila de gente esperando a próxima turma. A obsessão é a mesma, as ferramentas evoluíram. O melhor ainda está por vir.",
    tag: "@agora",
  },
];

// ---- FRASES DE IMPACTO (scroll storytelling / reveal encadeado) ----------

export interface Impacto {
  readonly numero: string;
  readonly titulo: string;
  readonly texto: string;
}

export const impactos: readonly Impacto[] = [
  {
    numero: "01",
    titulo: "Você aprende fazendo",
    texto: "Projetos reais desde a primeira semana. Nada de teoria solta — você constrói portfólio enquanto estuda.",
  },
  {
    numero: "02",
    titulo: "Você nunca trava sozinho",
    texto: "Suporte humano 7 dias por semana, mentorias ao vivo e a maior comunidade dev do Brasil te puxando pra frente.",
  },
  {
    numero: "03",
    titulo: "Você sai empregável",
    texto: "Recrutadora dedicada, vagas exclusivas e um método pensado pra te colocar na sua primeira vaga de tech.",
  },
];
