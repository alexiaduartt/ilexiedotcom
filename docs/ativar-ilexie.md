# Ativar a ILexie com Groq

1. Crie uma chave em https://console.groq.com/keys. Não envie a chave por chat.
2. No arquivo privado .env.local, preencha:

```dotenv
ASK_AI_PROVIDER=groq
GROQ_API_KEY=COLE_A_CHAVE_AQUI
GROQ_MODEL=openai/gpt-oss-20b
```

3. Reinicie npm run dev e abra a conversa. A disponibilidade indica configuração presente; a primeira resposta confirma acesso real ao provedor.
4. Se houver erro 429, aguarde: o plano gratuito possui cotas por minuto e por dia, específicas da conta. Confira https://console.groq.com/docs/rate-limits. Não há fallback automático para OpenAI nem contratação de plano pago pelo código.

O modelo usa raciocínio baixo e include_reasoning=false; somente a resposta final é devolvida. Saídas incompletas são tratadas como erro. A voz continua em primeira pessoa, minúsculas e linguagem natural, limitada aos fatos públicos.

Para produção, configure Redis REST compatível com Upstash e ASK_RATE_LIMIT_SECRET com pelo menos 32 caracteres. Sem esses controles a integração permanece indisponível em produção. Não use NEXT_PUBLIC_ em nenhuma credencial. Perguntas e histórico são enviados ao Groq e sujeitos à política do provedor; o aplicativo não registra conversas.

Referências: https://console.groq.com/docs/text-chat e https://console.groq.com/docs/reasoning.
