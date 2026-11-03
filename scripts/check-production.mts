import { createRequire } from 'node:module';
import { configured, rateLimitSettings } from '../lib/ask.ts';

const require = createRequire(import.meta.url);
require('@next/env').loadEnvConfig(process.cwd(), false);
const names = ['GROQ_API_KEY', 'GROQ_MODEL', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'ASK_RATE_LIMIT_SECRET'];
for (const name of names) console.log(`${name}: ${process.env[name]?.trim() ? 'preenchida' : 'ausente'}`);
const ready = configured({ ...process.env, NODE_ENV: 'production' });
console.log(`Configuração de produção local: ${ready ? 'completa' : 'incompleta'}`);
console.log('Limites:', JSON.stringify(rateLimitSettings(process.env)));
console.log('Esta verificação não confirma conectividade, credenciais válidas nem as variáveis da Vercel.');
if (!ready) process.exitCode = 1;
