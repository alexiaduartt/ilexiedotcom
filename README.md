# ilexiedotcom — Alexia Alves

Portfólio pessoal em português brasileiro: desenvolvimento, UI/UX, segurança, infraestrutura, pesquisa e extensão. Identidade editorial em preto, branco e tons neutros de cinza, com Geist e DM Serif Display, preservando `public/alexia-avatar.png` e o PDF existente em `public/resume.pdf`.

A página inicial apresenta resumos compactos. Pesquisas, competências e detalhes de extensão podem ser expandidos; os estudos de caso permanecem em páginas próprias. Período do curso e previsão de formatura foram retirados da base pública, e o contato usa um botão de e-mail sem expor o endereço como texto de destaque. O endereço continua sendo o destino do link `mailto:`; não há promessa de ocultá-lo do código ou de robôs.

A composição atual usa toda a largura da tela, com margens laterais proporcionais, contornos finos e tipografia como protagonista. Não há moldura externa nem restrição de overflow no documento. A abertura destaca Alexia Alves e descreve sua atuação diretamente. O hero não exibe o avatar: sua identidade fica associada ao Ask ILexie, incluindo seu card de projeto, apresentação e chat. A capa oferece um seletor de quatro projetos por abas, utilizável por mouse e teclado, com transição de conteúdo em Framer Motion.

O ritmo visual alterna capa clara, coleção escura em mosaico assimétrico, pesquisas em cards deslocados e um cartaz tipográfico de extensão. Os hovers mudam fundos, contornos e posições gradualmente, preservando contraste do texto. `prefers-reduced-motion` remove transições e movimentos opcionais. Não há carrossel automático nem animação contínua.

Os estudos de caso combinam contexto, objetivo e contribuição visíveis com detalhes técnicos expansíveis. A ficha lateral reúne status, tecnologias e repositório; no celular, ela vem depois do conteúdo principal e tem atalho na navegação interna. O conteúdo técnico extenso do Ask ILexie fica em `data/ask-case-study.json`, preservado integralmente nas seções expansíveis. Essa organização reduz a altura inicial sem descartar informações.

## Executar localmente

Requer Node.js 22.18+ (Node 24 recomendado) e npm.

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. No PowerShell com execução de scripts bloqueada, use `npm.cmd` no lugar de `npm`.

```sh
npm run lint
npm test
npm run build
npm start
```

As fontes são baixadas pelo `next/font` no build e servidas pelo próprio site em produção. O ambiente de build precisa acessar Google Fonts. Não há requisição do navegador ao Google para carregar fontes.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `data/portfolio.json` | Conteúdo público e base de conhecimento compartilhada |
| `data/ask-case-study.json` | Textos completos das seções técnicas do estudo de caso do assistente |
| `app/page.tsx` | Início, sobre, projetos, pesquisas, extensão, IA e contato |
| `app/projetos/[slug]/page.tsx` | Quatro estudos de caso com URLs próprias |
| `app/api/ask/route.ts` | Disponibilidade, geração e referências locais |
| `lib/ask.ts` | Validação, limites, instruções e transporte de IA |
| `components/Chat.tsx` | Diálogo acessível, sugestões, histórico e estados de erro |
| `components/Header.tsx` | Navegação desktop e menu móvel |
| `components/ProjectSpotlight.tsx` | Seletor acessível de projetos e transições da capa |
| `components/Section.tsx` | Estrutura reutilizável das seções |
| `app/globals.css` | Identidade, composição e regras responsivas |
| `tests/ask.test.ts` | Regras do assistente, com transporte simulado |
| `scripts/browser-check.mjs` | Verificações locais em Chrome via CDP |

O conteúdo do Gradus Flow utiliza exclusivamente a descrição fornecida para este portfólio. Nenhum outro repositório é necessário para executar ou manter este projeto. As páginas não afirmam hospedagem concluída na OCI, resultados da pesquisa em andamento ou realização das turmas planejadas para 2027.

## Configurar Ask ILexie

A ILexie apresenta os fatos públicos na voz da autora: primeira pessoa, português brasileiro em minúsculas, linguagem próxima e respostas curtas. A abertura identifica explicitamente a assistente como IA; se perguntarem, ela deve esclarecer que não é Alexia respondendo ao vivo. A voz fica nas instruções do servidor, seguindo a [documentação de prompting](https://developers.openai.com/api/docs/guides/prompt-engineering), sem transformar perguntas dos visitantes em regras de sistema.

Formação está estruturada em `profile.education`, com o curso técnico, escola e período informados no currículo público, e a graduação marcada como em andamento. Não há previsão de formatura nem período atual da graduação no contexto. Anos, instituições e experiências não devem ser completados por suposição. Não há conversão automática de todo o texto em minúsculas, para evitar corromper identificadores; o estilo é orientado ao modelo e precisa ser avaliado com respostas reais.

Para a ativação inicial, siga o [passo a passo local](docs/ativar-ilexie.md). A configuração padrão usa Groq, sem fallback automático para serviços pagos.

1. Copie .env.example para .env.local apenas se o arquivo ainda não existir.
2. Defina ASK_AI_PROVIDER=groq, GROQ_API_KEY com sua chave privada e GROQ_MODEL=openai/gpt-oss-20b.
3. Reinicie o servidor de desenvolvimento. GET /api/ask informa somente a disponibilidade. O plano gratuito está sujeito às cotas da conta; não é necessário ativar um plano pago.
4. Em produção, configure também UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN e ASK_RATE_LIMIT_SECRET (segredo aleatório com pelo menos 32 caracteres). O teto diário padrão é 100 chamadas.
5. A integração antiga da OpenAI só é utilizada se ASK_AI_PROVIDER=openai for definido explicitamente com suas credenciais e modelo.

Nunca use o prefixo `NEXT_PUBLIC_` nessas variáveis. Não cole chaves em componentes, logs, README ou na conversa do assistente. A chave é utilizada exclusivamente no servidor. Sem configuração, a interface mostra indisponibilidade; não simula respostas de IA.

### Arquitetura e decisões

```text
Painel React (histórico em memória na aba)
  → POST /api/ask
  → origem, tipo e tamanho de corpo, mensagens e sequência
  → limites Redis atômicos em produção
  → instruções + base pública JSON + mensagens não confiáveis
  → Groq Chat Completions (fetch, sem ferramentas; OpenAI somente por seleção explícita)
  → texto + links locais derivados dos títulos citados
```

Foi adotada contextualização direta porque a base é pequena. Não há RAG, embeddings, banco vetorial, upload de documentos, acesso a arquivos, execução de comandos ou ações administrativas. A integração usa `fetch` nativo; nenhum SDK de IA ou de Redis foi adicionado. Next.js, React, TypeScript, Tailwind CSS, Framer Motion e Lucide já pertenciam à stack. O Next.js e seu pacote de ESLint foram atualizados na mesma versão principal para corrigir alertas encontrados na auditoria.

### Limites e privacidade

- Perguntas: até 1.200 caracteres; resposta no histórico: até 6.000; máximo de nove mensagens alternadas e 8.000 caracteres de conversa por requisição. Se o histórico crescer demais, use **Limpar conversa**.
- Corpo JSON: no máximo 24.000 bytes, verificados durante a leitura, com timeout de envio de cinco segundos.
- Timeout do provedor: 20 segundos; Redis: três segundos; limite do cliente e duração da função: 30 segundos.
- Saída: até 1.024 tokens por chamada no Groq ou 600 na OpenAI, incluindo eventuais tokens de raciocínio. Respostas incompletas são tratadas como erro.
- Seis tentativas por minuto por origem de rede e teto diário global em UTC. Chamadas com falha após reserva também contam; isso reduz risco de custos em tentativas repetidas.
- Proteção adicional contra rajadas: duas tentativas por IP a cada dez segundos e três gerações por minuto compartilhadas por todos os visitantes, por padrão. Limites e janelas são configuráveis com tetos seguros; veja `.env.example` e o [guia de produção](docs/publicar-vercel.md).
- Em Vercel, utiliza-se o cabeçalho de IP fornecido pela plataforma, transformado em HMAC antes de formar uma chave Redis. Em outros hosts, visitantes compartilham um limite conservador até que um proxy confiável seja configurado no código. Não confie em cabeçalhos de IP arbitrários.
- O Redis mantém apenas contadores e identificadores derivados, com expiração. Se Redis falhar, a geração fica indisponível. O limite em memória não é utilizado como fallback em produção e não serve para múltiplas instâncias.
- O histórico fica em memória enquanto a aba/página permanece aberta, incluindo navegações internas. Recarregar a página ou limpar a conversa o remove do cliente. Não há persistência em localStorage nem logging de perguntas/respostas no código.
- Perguntas e histórico recente são enviados ao provedor de IA. Somente no adaptador OpenAI, `store: false` desativa armazenamento da resposta como recurso da Responses API, mas não substitui a política de retenção ou monitoramento de abuso do provedor. Não envie informações sensíveis.
- O modelo recebe instruções para usar somente a base pública. Prompt injection e alucinações não são problemas resolvidos por um prompt: revise respostas e não use a IA como fonte definitiva sobre a trajetória.
- Texto do modelo é renderizado como texto React, sem HTML ou Markdown executável. Os links são construídos pelo servidor a partir de slugs conhecidos; são sugestões de leitura, não citações verificadas de cada afirmação.
- A verificação de origem limita uso pelo navegador de outros sites; não autentica visitantes nem impede clientes HTTP diretos. O teto global e o orçamento do provedor são necessários.

### Validação real antes de ativar publicamente

Os testes automatizados usam respostas simuladas **somente nos testes** e não certificam uma chamada real ao modelo. Após configurar as credenciais, valide no painel:

1. Perguntas sobre cada projeto, as duas pesquisas, formação e extensão.
2. Perguntas sem informação disponível: a IA deve admitir que não sabe.
3. Tentativas de mudar instruções, extrair segredos e inventar resultados.
4. Histórico, limpeza, fechamento por Escape e navegação por teclado.
5. Falhas de rede, orçamento, limite diário, respostas incompletas e indisponibilidade do Redis.

O estudo de caso público está em `/projetos/ask-ilexie`. Ele mantém a validação com modelo real explicitamente pendente até sua realização.

## Navegador e acessibilidade

O layout contém menu móvel, landmarks semânticos, link para pular ao conteúdo, estados de foco, diálogo nativo com contenção de foco e Escape, região de atualizações de conversa, imagens dimensionadas e respeito a `prefers-reduced-motion`. Esses recursos não substituem auditoria completa de WCAG ou revisão com leitor de tela.

Para repetir a verificação local de navegador, inicie uma build de produção sem credenciais em `127.0.0.1:3100` e um Chrome headless separado com `--remote-debugging-port=9344` e perfil exclusivo. Depois execute:

```sh
node scripts/browser-check.mjs
```

O script verifica larguras 1440, 820, 390 e 320 px, overflow, menu, chat indisponível, Escape, páginas dos projetos, PDF e erros de execução. As capturas ficam em `.next/qa/`, ignoradas pelo Git. Não execute contra um serviço de IA ativo sem adaptar a expectativa de indisponibilidade. A revisão visual e os limites conhecidos da entrega ficam em `docs/validation.md`.

## Atualizar conteúdo e publicar

O [guia de publicação na Vercel](docs/publicar-vercel.md) descreve Redis, variáveis de Production, validações, monitoramento e rollback. `npm.cmd run check:production` verifica a presença local das variáveis sem mostrar valores; `npm.cmd run check:secrets` verifica os arquivos versionáveis e o histórico Git.

Edite `data/portfolio.json` para atualizar conteúdo público e contexto do assistente juntos. Substitua `public/resume.pdf` quando houver uma versão nova; o arquivo existente foi preservado e sua atualização curricular deve ser conferida pela autora. Atualize os metadados se o domínio mudar.

Não houve push, merge ou deploy automático. Antes de publicar: configurar segredos no servidor de hospedagem, confirmar orçamento do provedor, executar as verificações, validar o modelo real e revisar currículo e conteúdo. Não é necessário publicar com Sites para manter o projeto na Vercel.

Referências técnicas: [documentação oficial da OpenAI sobre geração de texto](https://developers.openai.com/api/docs/guides/text), [Redis REST](https://upstash.com/docs/redis/features/restapi) e [cabeçalhos da Vercel](https://vercel.com/docs/headers/request-headers). Para APIs do framework, consulte a documentação da versão instalada em `node_modules/next/dist/docs/`, conforme `AGENTS.md`.
