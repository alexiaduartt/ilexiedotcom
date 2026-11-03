import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { maxBuffer: 32 * 1024 * 1024 });
const names = ['GROQ_API_KEY', 'OPENAI_API_KEY', 'UPSTASH_REDIS_REST_TOKEN', 'ASK_RATE_LIMIT_SECRET', 'VERCEL_TOKEN'];
const local = existsSync('.env.local') ? readFileSync('.env.local', 'utf8') : '';
const secrets = names.map(name => local.split(/\r?\n/).find(line => line.startsWith(name + '='))?.slice(name.length + 1).trim().replace(/^(["'])(.*)\1$/, '$2')).filter(value => value && value.length >= 20);
const suspicious = [/\bgsk_[A-Za-z0-9]{24,}/, /\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}/, /\bgh[pousr]_[A-Za-z0-9]{30,}/, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
const findings = new Set();
function inspect(buffer, label) {
  const text = buffer.toString('utf8');
  if (secrets.some(secret => buffer.includes(Buffer.from(secret))) || suspicious.some(pattern => pattern.test(text))) findings.add(label);
}
const files = [...new Set(git('ls-files', '--cached', '--others', '--exclude-standard', '-z').toString().split('\0').filter(Boolean))];
for (const file of files) {
  if (/(^|\/)\.env(?:\.|$)/.test(file) && file !== '.env.example') findings.add(file);
  if (existsSync(file)) inspect(readFileSync(file), file);
}
// Scan repository history too; print only locations, never matching values.
for (const commit of git('rev-list', '--all').toString().trim().split('\n').filter(Boolean)) {
  for (const path of git('ls-tree', '-r', '--name-only', '-z', commit).toString().split('\0').filter(Boolean)) inspect(git('show', `${commit}:${path}`), `${commit.slice(0, 8)}:${path}`);
}
if (findings.size) {
  console.error('Possíveis segredos encontrados apenas nestas localizações:');
  for (const path of findings) console.error(path);
  process.exitCode = 1;
} else console.log(`Verificação concluída: ${files.length} arquivos e histórico Git sem os padrões de segredo verificados. A verificação não substitui revisão manual.`);
