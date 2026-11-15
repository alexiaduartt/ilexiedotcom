<div align="center">
  <img src="public/alexia-avatar.png" width="100" alt="Avatar da Alexia" />

  <h1>ilexiedotcom</h1>

  <p>meus projetos, minhas pesquisas e um pouco de quem eu sou.</p>

  <a href="https://ilexiedotcom.vercel.app/">visite o portfólio ↗</a>
  &nbsp; · &nbsp;
  <a href="https://www.linkedin.com/in/alexia-alves-525a12304/">linkedin</a>
  &nbsp; · &nbsp;
  <a href="public/resume.pdf">currículo</a>
</div>

---

## Oii, eu sou a Alexia.

Sou de Belo Jardim, Pernambuco, e estudo Engenharia de Software no IFPE. Minha trajetória passa por desenvolvimento frontend, UI/UX, infraestrutura e segurança. Na pesquisa, investigo aplicações de inteligência artificial na educação e as questões éticas que vêm junto com elas.

Gosto de construir interfaces, entender o que acontece por trás delas e cuidar dos detalhes que tornam uma experiência mais agradável. Este portfólio é um espaço para reunir essas coisas e apresentar meu trabalho com a minha cara.

Fora do código, gosto de livros, filmes de terror e viagens de carro — especialmente das paisagens pela janela. Sou bem bairrista e amo meu Pernambuco.

## o que você encontra por aqui

- **Projetos:** Esteira DevSecOps Open Source, SOC Open Source, Gradus Flow e Ask ILexie, com contexto, tecnologias e minha participação.
- **Pesquisa:** meus estudos sobre IA no ensino de inglês e uso ético de IA generativa.
- **Extensão:** o Meu Espaço na Tech, iniciativa que cofundei para aproximar meninas e mulheres do desenvolvimento web.
- **Minha trajetória:** formação, competências e caminhos para conversar comigo.

Escolhi uma estética em preto e branco, com tipografia em destaque e movimento nos detalhes. Também cuidei da adaptação para diferentes telas, da navegação por teclado e do respeito à preferência por movimento reduzido.

## uma mini eu em ia

A **Ask ILexie** nasceu da vontade de experimentar outra forma de apresentar minha trajetória. Você pode perguntar sobre meus projetos, pesquisas e formação, mas também descobrir meus livros favoritos ou meus planos para o futuro.

Ela conversa em primeira pessoa, com um jeito próximo do meu. A interface identifica que você está falando com uma assistente de IA.

### por trás da conversa

Construí a interface em React e a integração no servidor com Next.js e TypeScript. A assistente utiliza um LLM via API da Groq, com suporte a OpenAI por configuração.

O contexto vem de arquivos JSON com as informações do portfólio e os interesses pessoais que escolhi compartilhar. Essa base acompanha as instruções de sistema em cada chamada, sem busca vetorial ou treinamento de modelo próprio.

Também implementei:

- Validação de perguntas e histórico.
- Limites compartilhados de uso com Redis e operações atômicas em Lua.
- Tratamento de timeout, indisponibilidade e respostas incompletas.
- Referências para os estudos de caso mencionados na resposta.
- Testes automatizados das regras da API, dos limites e das falhas de integração.

As credenciais ficam no servidor, e o aplicativo mantém a conversa apenas na memória da aba. Perguntas e histórico recente são enviados ao provedor de IA. Mesmo com contexto e instruções, a ILexie pode errar.

## tecnologias deste portfólio

| Parte | Tecnologias |
| --- | --- |
| Interface | Next.js, React, TypeScript e Tailwind CSS |
| Movimento e ícones | Framer Motion e Lucide |
| Integração com LLM | Groq API · OpenAI como alternativa configurável |
| Contexto | Dados estruturados em JSON e instruções de sistema |
| Controle de uso | Upstash Redis e Lua |
| Testes e verificações | Node.js Test Runner, TypeScript e ESLint |
| Publicação | Vercel e GitHub |

## rodando por aí

Use Node.js 24.x e npm.

```bash
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000).

Para configurar a assistente, copie `.env.example` para `.env.local`, caso o arquivo ainda não exista, e preencha suas credenciais. Sem a configuração, o site continua navegável e o chat informa a indisponibilidade.

No PowerShell, use `npm.cmd` se a execução de scripts estiver bloqueada.

### verificações

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

Os testes da integração usam respostas simuladas e não medem a qualidade das respostas de um modelo real.

### para explorar o código

| Caminho | Conteúdo |
| --- | --- |
| `app/` | Páginas e rota da API |
| `components/` | Interface, navegação e chat |
| `data/` | Conteúdo do portfólio e contexto da assistente |
| `lib/ask.ts` | Validação, limites e integração com os provedores |
| `tests/` | Testes automatizados |
| `docs/` | Guias de configuração, publicação e validação |

Mais detalhes nos guias de [ativação da ILexie](docs/ativar-ilexie.md), [publicação na Vercel](docs/publicar-vercel.md) e [validações](docs/validation.md).

---

Se quiser conversar sobre algum projeto, pesquisa ou oportunidade, me encontre no [LinkedIn](https://www.linkedin.com/in/alexia-alves-525a12304/).

feito por **[Alexia Alves](https://github.com/alexiaduartt)**, de Belo Jardim para a web.
