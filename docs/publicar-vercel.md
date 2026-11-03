# Publicar o ilexiedotcom na Vercel

Este procedimento se aplica exclusivamente a `alexiaduartt/ilexiedotcom` e ao domínio `https://ilexiedotcom.vercel.app/`. Não contrate planos pagos para seguir estas instruções.

## Redis gratuito

1. Entre no [Upstash](https://console.upstash.com/), abra Redis e crie o banco `ilexiedotcom` no plano **Free**, preferencialmente em São Paulo. Deixe regiões adicionais vazias e eviction desligado: remover contadores antes de expirarem poderia reabrir limites.
2. Confira o preço zero na confirmação. Se a opção gratuita não estiver disponível, não selecione um plano pago automaticamente.
3. No banco, localize **REST API** e copie a URL HTTPS e o token padrão com permissão de escrita, EVAL, GET, INCR e EXPIRE. Não use o token somente leitura nem a conexão TCP `redis://`.
4. Preencha `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` em `.env.local`. Nunca envie os valores por chat ou inclua o arquivo no Git.
5. `ASK_RATE_LIMIT_SECRET` deve ser um valor aleatório privado com pelo menos 32 caracteres, mantido estável entre deploys. Para gerá-lo sem imprimir, escreva diretamente no arquivo local usando `node:crypto`; não use uma frase, IP ou chave do Groq como segredo.

A [integração oficial com a Vercel](https://upstash.com/docs/redis/howto/vercelintegration) também pode conectar o banco ao projeto existente. Confira os nomes das variáveis: este código usa os nomes `UPSTASH_REDIS_REST_*`, não apenas `REDIS_URL` nem variantes antigas de Vercel KV.

## Variáveis de Production

No projeto **ilexiedotcom → Settings → Environment Variables**, configure os valores privados do seu `.env.local`. Selecione **Production**. Configure Preview separadamente apenas se quiser que previews usem o serviço; um banco separado evita misturar cotas com produção.

| Variável | Valor/configuração |
| --- | --- |
| `ASK_AI_PROVIDER` | `groq` |
| `GROQ_API_KEY` | Chave privada do Groq |
| `GROQ_MODEL` | `openai/gpt-oss-20b` |
| `UPSTASH_REDIS_REST_URL` | URL HTTPS do Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Token privado com escrita |
| `ASK_RATE_LIMIT_SECRET` | Mesmo segredo aleatório privado da configuração local |
| `ASK_REQUESTS_PER_MINUTE` | `6` por IP; teto aceito `60` |
| `ASK_BURST_REQUEST_LIMIT` | `2` por IP; teto aceito `10` |
| `ASK_BURST_WINDOW_SECONDS` | `10`; teto aceito `60` |
| `ASK_GLOBAL_REQUESTS_PER_MINUTE` | `3` para todos os visitantes; teto aceito `60` |
| `ASK_DAILY_REQUEST_LIMIT` | `100` para todos os visitantes em UTC; teto aceito `1000` |

Nenhum segredo usa `NEXT_PUBLIC_`. Não configure `NODE_ENV=development` em produção nem defina manualmente `VERCEL`; a plataforma fornece essas informações. Não há fallback automático para OpenAI. As [cotas gratuitas do Groq](https://console.groq.com/docs/rate-limits) também se aplicam, incluindo limites por tokens que não são medidos pelo contador do aplicativo.

O `package.json` fixa Node.js `24.x`, [suportado pela Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). A rota usa runtime Node.js e duração máxima de 30 segundos; Redis tem timeout de 3 segundos e o Groq de 20 segundos. As páginas permanecem estáticas onde possível, enquanto `/api/ask` é dinâmica. O build precisa de acesso às fontes do Google usadas por `next/font`.

Variáveis salvas na Vercel valem para o [próximo deployment](https://vercel.com/docs/environment-variables); editar `.env.local` não configura a hospedagem. Antes de atualizar a main, confirme os nomes, o ambiente Production e a validade das credenciais.

## Limites compartilhados

Um script Lua EVAL aplica atomicamente quatro contadores: por IP/minuto, rajada por IP, global/minuto e global/dia. As janelas de minuto e rajada são fixas, portanto tráfego perto de uma mudança de janela pode usar as duas cotas em sequência; não é um limitador deslizante. Os contadores globais reservam uma vaga antes da geração. Falhas posteriores do Groq também consomem essa vaga; chamadas já bloqueadas não incrementam as cotas globais.

As chaves Redis têm expiração. O aplicativo armazena contadores e HMACs de IP, não perguntas/respostas. Na Vercel, só utiliza o cabeçalho confiável `x-vercel-forwarded-for`; fora dela, compartilha um balde conservador. Proxies externos exigem revisão específica. Requisições bloqueadas recebem HTTP 429 e Retry-After de 60 segundos. Erro de Redis resulta em HTTP 503 sem chamar o Groq. Produção nunca usa memória como alternativa ao Redis.

Os contadores em memória são exclusivos do desenvolvimento local. Tamanhos máximos de corpo, pergunta e histórico continuam ativos antes do Redis. Essa proteção não é autenticação e não substitui o monitoramento da conta ou a proteção de tráfego da plataforma.

## Validar e publicar

No PowerShell, use `npm.cmd` para evitar o bloqueio de `npm.ps1`:

```powershell
npm.cmd run check:production
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd test
npm.cmd run check:secrets
npm.cmd audit
npm.cmd audit --omit=dev
npm.cmd run build
```

`check:production` mostra apenas presença das variáveis locais e limites efetivos; não verifica valores na Vercel nem conectividade. A checagem de segredos procura padrões conhecidos e os valores privados locais nos arquivos versionáveis e no histórico, sem imprimi-los. Não garante ausência de todo tipo de segredo.

Confira o remoto, branch, estado e identidade Git antes dos commits. Nunca inclua `.env.local`, `.vercel`, `.portfolio-qa`, `node_modules` ou `.next`. Preserve o currículo atualizado pela autora e use mensagens de commit em português com a identidade Git já configurada.

Com verificações e credenciais prontas, faça fetch, confira divergências da main e integre sem reescrever histórico. O push da main aciona a integração Git da Vercel se ela estiver ativa. Aguarde o deployment referente ao SHA publicado chegar a **Ready** antes de declarar sucesso.

Após publicar, verifique página inicial, navegação, quatro estudos de caso, `/resume.pdf`, links de contato, chat e `GET /api/ask`. Faça uma única pergunta real para validar Groq. Verifique o bloqueio usando testes automatizados ou Redis isolado, sem gerar várias respostas reais apenas para alcançar o limite.

## Monitorar e reverter

- Vercel: deployment correto, estado Ready, respostas 429/503/502/504 na rota e limites de uso da conta. Não adicione logging de perguntas, respostas, cabeçalhos ou variáveis secretas.
- Upstash: comandos, consumo, erros e expiração dos contadores; mantenha o plano gratuito e eviction desligado. O TTL diário é 90.000 segundos para liberar espaço após a troca de dia UTC.
- Groq: uso, tokens e cotas na conta; não configure upgrade automático.
- Para rollback, use **Instant Rollback/Promote** de um deployment anterior na Vercel quando disponível, ou faça `git revert` do commit de integração na main e publique a reversão. Nunca use force push. Rollback de código não revoga chaves nem desfaz configurações externas: revise as variáveis do deployment selecionado.

Se faltar credencial obrigatória ou não houver acesso para verificar Production, mantenha o trabalho commitado na branch de desenvolvimento e não atualize a main até resolver a pendência.
