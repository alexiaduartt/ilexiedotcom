# Validação da implementação

## Preparação de produção — 3 de novembro de 2026

Repositório confirmado como `alexiaduartt/ilexiedotcom`, branch `feat/portfolio-redesign`. O fetch confirmou HEAD alinhado à main remota antes dos novos commits. Nenhum outro projeto local foi acessado. O currículo atualizado pela autora e todas as alterações existentes foram preservados.

O controle Redis passou a aplicar quatro contadores atômicos: IP/minuto, rajada por IP, global/minuto e global/dia. Valores são configuráveis com tetos; erros de Redis bloqueiam geração com 503, limites com 429. Não houve alteração de design, conteúdo pessoal ou instruções de personalidade nesta rodada. Node.js 24.x foi declarado para compatibilidade com a Vercel.

Validações concluídas: 21 testes automatizados; TypeScript; ESLint; build Next.js de produção com 11 páginas e API dinâmica; navegador em 1440, 820, 390 e 320 px; quatro projetos; download PDF; 404; chat indisponível sem credenciais e estados disponíveis com fixtures exclusivas de teste; Escape, carregamento, links, HTML escapado e movimento reduzido. As verificações no navegador usaram um servidor local isolado com provedor desabilitado, sem consumir Groq. A checagem de segredos nos arquivos versionáveis e histórico passou; `.env.local` está ignorado.

Auditoria: nenhuma vulnerabilidade nas dependências de produção; a auditoria completa reportou 16 alertas moderados na cadeia de desenvolvimento do ESLint, derivados de minimatch. Nenhum alerta alto ou crítico. A correção automática sugeria downgrade incompatível; não foi aplicada. O alerta é de processamento de padrões glob não confiáveis nas ferramentas locais, e não da rota de geração. A auditoria não é garantia de ausência de outras vulnerabilidades.

O segredo HMAC foi gerado apenas no arquivo local privado. Redis real, variáveis na Vercel, integração main, push e novo deploy permanecem pendentes enquanto as credenciais obrigatórias e o acesso à produção não forem confirmados. Não se deve interpretar build local aprovada como publicação concluída. O guia está em `docs/publicar-vercel.md`.

## Preferências pessoais autorizadas

A base `data/ilexie-personal.json` contém os gostos, origem, personalidade e planos fornecidos pela autora para a conversa. É incorporada no servidor de `/api/ask`; os detalhes não foram adicionados às seções visíveis da página. Idade permanece vinculada a novembro de 2026, sem inferir aniversário; mestrado e docência são planos. As sugestões iniciais agora combinam trajetória e interesses. Os 16 testes, TypeScript e ESLint passaram. A qualidade dessas novas respostas pessoais ainda requer avaliação com o modelo real.

## Voz da autora na ILexie

As instruções de servidor passaram a pedir primeira pessoa, minúsculas, português natural e expressões como “tô” e “pra” com moderação. A assistente continua identificada como IA na abertura e deve esclarecer sua identidade se perguntarem; não deve alegar que a autora está respondendo em tempo real. Os limites de contexto, de uso e de acesso permanecem intactos.

A formação técnica foi recuperada do currículo público atual em `public/resume.pdf`: Técnico em Administração, Escola Técnica Estadual Edson Mororó Moura, período 2020–2022. Esses dados e Engenharia de Software em andamento no IFPE — Campus Belo Jardim foram incluídos em `profile.education`. Previsão de formatura e período atual da graduação continuam fora da base. O arquivo do currículo não foi modificado.

A abertura do painel também passou a usar minúsculas. Os 13 testes e o lint passaram após a alteração. Esses testes verificam a integração e seus limites, não certificam a qualidade linguística de um modelo real. Não foi feita chamada faturável nesta rodada; a verificação de tom, fidelidade factual e resistência a instruções adversariais deve ocorrer com a conta configurada.

Arquivos desta rodada: `lib/ask.ts`, `data/portfolio.json`, `components/Chat.tsx`, `README.md` e este relatório. Sem push ou deploy.

## Rodapé, links sociais e conversa da ILexie

O currículo duplicado foi removido da capa e mantido na seção sobre. A frase de efeito do rodapé foi retirada, a marca foi reduzida e o espaço vertical foi compactado. GitHub e LinkedIn receberam animação de troca vertical do nome, sublinhado e seta; os rótulos acessíveis continuam estáveis e a preferência por redução de movimento desativa deslocamentos opcionais.

O painel da ILexie foi redesenhado com identificação editorial, avatar, status explícito, apresentação curta, sugestões em cards e um campo de mensagem integrado. Sem IA configurada, não exibe perguntas desabilitadas; oferece links de navegação, sem simular respostas. A política de privacidade está em um expansível para reduzir a altura do formulário. A lógica de conversa e seus limites foram preservados.

Foi confirmada ausência de chave/modelo no ambiente da sessão e de `.env.local` antes da preparação. O arquivo local privado foi criado com a chave vazia, o modelo `gpt-6-luna` e `OPENAI_REASONING_EFFORT=none`; foi confirmado que ele está ignorado pelo Git. A requisição do provedor aceita agora essa opção de raciocínio apenas quando explicitamente configurada, mantendo o comportamento anterior quando ausente. A documentação oficial foi consultada para modelo, chave e créditos. Não houve uso de credencial real nem chamada faturável.

Os testes do assistente agora totalizam 13, todos aprovados, incluindo a opção explícita de raciocínio. As verificações de navegador foram ampliadas para o currículo único, rodapé compacto, atalhos do estado indisponível e novos estados da conversa. A ativação real depende de ação da autora na conta e no arquivo privado; o procedimento está em `docs/ativar-ilexie.md`.

## Direção monocromática e componentes com variação

A direção atual usa exclusivamente preto, branco e cinzas, conforme o pedido mais recente. Os hexadecimais do CSS foram verificados: não há cores com canais RGB diferentes. Os nomes antigos de alguns tokens são aliases neutros para preservar a compatibilidade com os estudos de caso e o chat; não representam mais uma paleta roxa.

A coleção de projetos passou a um mosaico com cards largos e compactos, alternando fundos claros e escuros. A capa mantém o nome e a apresentação direta, com um seletor de projetos em formato de cartão sobreposto. Pesquisas têm cards deslocados e o projeto de extensão usa um cartaz tipográfico próprio, retomando variedade de componentes sem usar fotos de pessoas das referências. O avatar continua vinculado à Ask ILexie.

Interações: abas de projetos com estado selecionado, setas do teclado/Home/End e fade/deslocamento de conteúdo; fundos dos cards mudam gradualmente, com pequenos movimentos dos grafismos e setas. Foram evitadas inversões simultâneas de texto/fundo que deixassem o contraste baixo no meio da animação. O conteúdo escuro permanece com texto claro; cards claros mantêm texto escuro. A opção de reduzir movimento remove as transições e os deslocamentos opcionais. Não há animação contínua nem autoplay.

O build e o lint foram executados. A revisão no navegador cobre rolagem real, largura total, menu, seletor por clique e teclado, abertura dos estudos, tecnologias e detalhes expansíveis, chat e ausência de overflow em 1440, 820, 390 e 320 px. O roteiro inclui hover real de um card, captura de seu estado e verificação de redução de movimento. Antes de injetar roda do mouse, a aba de QA é ativada e o ponteiro é posicionado sobre a página para evitar eventos enviados a uma aba em segundo plano.

Arquivos desta rodada: `app/page.tsx`, `app/globals.css`, `components/ProjectSpotlight.tsx`, `scripts/browser-check.mjs`, `README.md` e este relatório. Sem novas dependências, alteração na API, push ou deploy. As capturas da home e das seções permanecem em `.next/qa/`, incluindo `project-hover.png`.

Na conferência final, `public/resume.pdf` apresentou uma atualização local externa a esta rodada. O arquivo foi preservado e não foi editado por este trabalho de interface; essa alteração não deve ser atribuída ao refinamento visual.

## Correção de rolagem e aproveitamento da tela

Removidos `overflow: clip` do `body`, o limite de largura, a borda, o arredondamento e o espaçamento da moldura externa. A combinação anterior interferia na rolagem do documento. Os containers agora usam a largura disponível com margens proporcionais, sem um teto fixo de 1180 px. A página preserva a rolagem nativa e as áreas internas de conversa continuam tendo seu próprio scroll.

A abertura passou a destacar “Alexia Alves”, uma descrição direta da atuação e links para os projetos. Foram substituídas as frases de efeito do hero, do índice de projetos e do título da seção sobre.

Build e lint aprovados. O roteiro de navegador agora envia eventos reais de roda do mouse e exige deslocamento do documento antes de testar o restante da interface. Também confere se o `body` começa no limite esquerdo e ocupa toda a largura útil do documento, descontando apenas a barra de rolagem nativa. Essas verificações e os cenários de menu, chat e estudos de caso passaram em 1440, 820, 390 e 320 px. Arquivos desta correção: `app/globals.css`, `app/page.tsx`, `scripts/browser-check.mjs`, `README.md` e este relatório.

## Composição editorial e estudos de caso compactos

Rodada atual na mesma branch, preservando a paleta violeta. A capa passou a priorizar tipografia, nome e descrição; não contém imagens do avatar. O índice de projetos aparece ao lado no desktop e é dispensado no celular, que mantém o CTA de projetos. O avatar original permanece na identidade do Ask ILexie, sem alterações no arquivo de imagem.

A página ganhou moldura clara, contornos discretos e botões menos arredondados. Foram removidos brilhos, adesivos e o uso decorativo do avatar na capa. A seção sobre usa colunas abertas; a coleção de projetos combina miniaturas menores e descrições alinhadas. Pesquisa e extensão seguem o mesmo ritmo de divisores, tipografia e acentos contidos.

As páginas internas agora têm uma linha própria para voltar e metadados, título compacto, navegação por âncoras e duas colunas no desktop. Contexto, objetivo e contribuição permanecem visíveis. Problema, arquitetura, desafios e aprofundamentos do Ask ILexie são expansíveis nativos. A ficha mantém status visível e tecnologias expansíveis. No celular, a ficha vem após o conteúdo principal, com atalho direto no topo. Nenhum texto técnico foi descartado: os nove parágrafos das seis seções específicas da Ask ILexie foram extraídos para `data/ask-case-study.json`.

Comparação local da altura do documento no Chrome, com os expansíveis recolhidos por padrão, em viewports de 1440 × 900 e 390 × 900:

| Estudo / largura | Antes | Depois | Redução da altura inicial |
| --- | --- | --- | --- |
| DevSecOps / 1440 px | 1.714 px | 1.192 px | 30% |
| Ask ILexie / 1440 px | 3.328 px | 1.540 px | 54% |
| DevSecOps / 390 px | 2.299 px | 1.764 px | 23% |
| Ask ILexie / 390 px | 4.832 px | 2.063 px | 57% |

Ao expandir conteúdo, a página cresce normalmente; os percentuais descrevem a apresentação inicial, não remoção de conteúdo. A home manteve mais respiro no desktop e ficou ligeiramente mais curta no celular.

Validação desta rodada: lint e build aprovados; Chrome em 1440, 820, 390 e 320 px sem overflow horizontal. O roteiro testa ausência de imagem no hero, separação de títulos e conteúdo, distância entre voltar e categoria, expansão de arquitetura e tecnologias, abertura de todos os nove blocos técnicos da Ask ILexie, menu, chat, PDF e 404. A navegação de QA aguarda o evento de carregamento do documento para evitar capturar páginas ainda em transição. As capturas incluem `case-study-desktop.png` e `case-study-mobile.png` em `.next/qa/`.

Arquivos desta rodada: `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `components/Header.tsx`, `app/projetos/[slug]/page.tsx`, `data/ask-case-study.json`, `scripts/browser-check.mjs`, `README.md` e este relatório. Nenhuma dependência ou regra da API de IA foi alterada. Sem push ou deploy. As pendências de credencial, validação do modelo real e auditoria completa de acessibilidade continuam as mesmas.

## Refinamento editorial e paleta violeta

Mantidas a estrutura geral, as páginas internas, o avatar e a lógica do assistente. A nova apresentação usa os tons `#E9D9F4`, `#9D6ABF`, `#633484`, `#3D1D49` e `#1A052D`, com fundo quase branco lavanda e aqua em pequenos detalhes. Foram removidos os destaques verdes/amarelos e aumentados os tamanhos de navegação, descrições, tags, formulários e mensagens.

A capa mantém tipografia editorial, com apenas uma palavra decorativa ao fundo, contraste reduzido e áreas de texto protegidas. A seção sobre não usa deslocamentos negativos; os cards têm links alinhados, pesquisas/competências/extensão usam expansão nativa e o contato ficou compacto, com botão de mensagem em vez do endereço em destaque. Período e previsão de formatura também foram retirados do JSON usado pelo assistente. O currículo existente não foi alterado.

O refinamento afeta `app/page.tsx`, `app/globals.css`, `data/portfolio.json`, `scripts/browser-check.mjs`, `README.md` e este relatório. Não adiciona dependências nem altera `lib/ask.ts`, a rota de IA ou sua lógica de conversa. A estrutura dos estudos de caso é preservada, com mudanças somente em sua apresentação CSS.

O lint e a build de produção foram repetidos. A revisão de navegador cobre novamente 1440, 820, 390 e 320 px, incluindo ausência de overflow, separação entre título/avatar e heading/parágrafo, expansão das pesquisas e ausência do endereço de e-mail e calendário acadêmico no texto visível da página inicial. As capturas incluem agora a seção sobre, o diálogo de chat e uma página interna de projeto.

Branch: `feat/portfolio-redesign`, criada de `origin/main` após fetch e confirmação de árvore limpa. Repositório autorizado: `alexiaduartt/ilexiedotcom`. Nenhum push, merge ou deploy foi realizado.

## Resultado técnico

- `npm run lint`: aprovado.
- `npm test`: 12 testes aprovados.
- `npm run build`: aprovado com Next.js 16.4.4; página inicial, quatro estudos de caso, 404, sitemap e robots gerados, API dinâmica.
- `npm audit --omit=dev`: zero vulnerabilidades após atualização do Next.js e correções compatíveis no lockfile.
- Auditoria completa: permanecem 16 alertas moderados na cadeia de minimatch/ESLint. A correção automática sugerida exigiria downgrade incompatível de ESLint; não foi usado `--force`.
- `git diff --check`: sem erros de whitespace.

Os testes TypeScript usam remoção nativa de tipos no Node 24. Há um aviso não bloqueante de autodetecção de módulos ESM porque o projeto não declara `type: module`. Não foi alterado o modo de módulos de toda a aplicação apenas para remover esse aviso.

## Navegador

Chrome headless local, build de produção em `127.0.0.1:3100`, sem credenciais de IA. Verificações automatizadas pelo script `scripts/browser-check.mjs`:

- Larguras de 1440, 820, 390 e 320 pixels, sem overflow horizontal.
- Quatro cards e quatro páginas de projeto.
- Menu móvel abre e fecha corretamente.
- Chat abre, informa indisponibilidade, desabilita envio e fecha por Escape.
- PDF existente responde com status 200 e tipo PDF.
- Projeto inexistente retorna HTTP 404.
- API sem configuração retorna 503, sem simular geração.
- Nenhuma exceção de execução no navegador durante os cenários.
- Em uma aba isolada, fixtures interceptam somente o fetch do navegador para testar envio, indicador de geração, links locais, exibição segura de HTML como texto, erro 429, restauração da pergunta para nova tentativa e limpeza do histórico. Essas fixtures não fazem parte da aplicação e não representam validação do provedor real.
- `prefers-reduced-motion: reduce` desativa a rolagem animada.

Revisão visual das capturas de hero desktop e móvel, projetos, extensão e Ask ILexie. A revisão identificou um conflito de seletor que reduzia o texto do cartaz da extensão; corrigido antes da build final. Capturas locais ficam em `.next/qa/` e não são versionadas. O perfil temporário exclusivo do Chrome fica em `.portfolio-qa/`, também ignorado pelo Git.

## Limites e verificações pendentes

1. **Modelo real:** não há credencial configurada. Configurar `.env.local` ou segredos do servidor, escolher modelo compatível e verificar respostas reais antes de apresentar a IA como validada. O site e o estudo de caso mantêm essa condição explícita.
2. **Redis real:** o transporte é coberto com fixtures nos testes, mas o script Lua precisa ser exercitado no serviço Redis de produção, incluindo concorrência, expiração, falha do serviço e limites diários.
3. **Custos:** definir orçamento no provedor e avaliar tamanho do contexto/modelo. O teto de chamadas e tokens não equivale a um limite monetário independente do modelo.
4. **Currículo:** o PDF existente foi preservado sem alteração. A autora deve confirmar se corresponde à versão curricular atualizada.
5. **Acessibilidade:** houve validação de recursos de teclado, foco do diálogo nativo, estados, layout e redução de movimento. Não foi realizada auditoria completa de WCAG, teste com leitor de tela ou em dispositivos físicos/Safari/Firefox.
6. **Ferramentas de desenvolvimento:** acompanhar os 16 alertas moderados remanescentes de auditoria e atualizar a cadeia de lint quando houver correção compatível.

## Isolamento e arquivos

As alterações rastreadas e arquivos novos estão dentro de `ilexiedotcom`. `public/alexia-avatar.png` e `public/resume.pdf` não têm diff. O Gradus Flow aparece somente como conteúdo descritivo fornecido para o portfólio; não houve consulta ou operação no outro projeto.

Arquivos modificados: `.gitignore`, `README.md`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `components/Section.tsx`, `eslint.config.mjs`, `package.json`, `package-lock.json` e `tsconfig.json`. O perfil temporário de navegador é excluído tanto do Git quanto do lint.

Arquivos adicionados: `.env.example`, `app/api/ask/route.ts`, `app/projetos/[slug]/page.tsx`, `app/error.tsx`, `app/loading.tsx`, `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`, `components/Chat.tsx`, `components/Header.tsx`, `data/portfolio.json`, `lib/ask.ts`, `tests/ask.test.ts`, `scripts/browser-check.mjs` e este relatório.

Nenhuma nova dependência foi acrescentada. Next.js e eslint-config-next foram atualizados de 16.3.4 para 16.4.4; as correções transitivas compatíveis estão registradas no lockfile.
# Integração Groq

Validação real concluída após preencher a chave: o fluxo handleAsk retornou HTTP 200 via Groq para uma pergunta sobre formação. A resposta apresentou a graduação em andamento e o técnico concluído com instituição e período corretos, em primeira pessoa. Não foram exibidas credenciais. Este teste confirma o acesso local ao provedor; os controles Redis continuam necessários para produção.

O backend agora seleciona Groq por padrão, com endpoint fixo, chave exclusiva e sem fallback automático para OpenAI. O arquivo local remove as variáveis OpenAI. GPT OSS 20B usa raciocínio baixo, sem exposição do raciocínio interno e teto de 1.024 tokens. Saídas vazias, truncadas ou inesperadas são rejeitadas. Os 15 testes passaram, assim como TypeScript e ESLint. Ainda falta validar uma resposta real: a última verificação privada encontrou GROQ_API_KEY vazia. Nenhuma credencial foi exibida nem houve chamada paga.

