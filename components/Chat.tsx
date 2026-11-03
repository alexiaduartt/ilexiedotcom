"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, LoaderCircle, X } from "lucide-react";
import { suggestions } from "@/data/portfolio.json";

type Message = { role: "user" | "assistant"; content: string; sources?: { title: string; href: string }[] };
const greeting: Message = { role: "assistant", content: "sou um pedacinho automatizado da alexia: uma mini eu, feita com ia pra conversar com você. quer saber dos meus projetos, dos livros que eu amo ou dos meus planos? vamos conversar." };

export function OpenChat({ children, className }: { children: ReactNode; className?: string }) {
  return <button className={className} onClick={() => window.dispatchEvent(new Event("open-ilexie"))}>{children}</button>;
}

export default function Chat() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const reducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const show = () => {
      if (dialog.current?.open) return;
      dialog.current?.showModal();
      input.current?.focus();
      fetch("/api/ask", { cache: "no-store" }).then(r => r.json()).then(data => setAvailable(data.available === true)).catch(() => setAvailable(false));
    };
    window.addEventListener("open-ilexie", show);
    return () => { window.removeEventListener("open-ilexie", show); activeRequest.current?.abort(); };
  }, []);

  useEffect(() => { end.current?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "nearest" }); }, [messages, loading, error, reducedMotion]);

  async function send(text: string) {
    if (busy.current || !text.trim() || available !== true) return;
    busy.current = true;
    const next: Message[] = [...messages, { role: "user", content: text.trim() }];
    setMessages(next); setQuestion(""); setLoading(true); setError("");
    const controller = new AbortController();
    activeRequest.current = controller;
    try {
      const response = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.any([controller.signal, AbortSignal.timeout(30000)]), body: JSON.stringify({ messages: next.slice(-9).map(({ role, content }) => ({ role, content })) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não consegui responder agora. Tente novamente em instantes.");
      setMessages(previous => [...previous, { role: "assistant", content: result.answer, sources: result.sources }]);
    } catch (err) {
      if (controller.signal.aborted) return;
      setMessages(previous => previous.slice(0, -1));
      setQuestion(text);
      setError(err instanceof Error && err.name === "Error" ? err.message : "A conexão demorou ou foi interrompida. Tente novamente.");
    } finally { busy.current = false; setLoading(false); activeRequest.current = null; }
  }

  return <>
    <button className="chat-launcher" aria-haspopup="dialog" aria-controls="ilexie-dialog" onClick={() => window.dispatchEvent(new Event("open-ilexie"))}><Image src="/alexia-avatar.png" alt="" width={42} height={43} /><span>ask ilexie <span aria-hidden="true">↗</span></span></button>
    <dialog ref={dialog} id="ilexie-dialog" className="chat-dialog" aria-labelledby="chat-title" onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
      <motion.div className="chat-shell" initial={false} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : .2 }}>

        <div className="chat-header"><Image src="/alexia-avatar.png" alt="" width={54} height={55} /><div><h2 id="chat-title">ask <em>ilexie.</em></h2><small><span className={`chat-status-dot ${available ? "is-available" : ""}`} />{available === null ? "verificando a ia…" : available ? "ia disponível pra conversar" : "ia indisponível no momento"}</small></div><button onClick={() => dialog.current?.close()} aria-label="Fechar conversa"><X size={19} /></button></div>
        <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions" aria-label="Histórico da conversa">
          {[greeting, ...messages].map((message, i) => <div className={`chat-message ${message.role} ${i === 0 ? "chat-welcome" : ""}`} key={i}>{i === 0 ? <><span className="message-label">UM PEDACINHO DE MIM, EM IA</span><h3>oi! eu sou a ilexie.</h3></> : <span className="message-label">{message.role === "user" ? "você" : "ilexie"}</span>}<p>{message.content}</p>{message.sources?.map(source => <Link key={source.href} href={source.href} onClick={() => dialog.current?.close()}>{source.title} ↗</Link>)}</div>)}
          {available === null && <p className="small-note" role="status">Verificando disponibilidade…</p>}
          {available === false && <div className="chat-error chat-unavailable" role="status"><span className="message-label">UMA PAUSA NA CONVERSA</span><p>A geração com IA ainda não está disponível. Enquanto isso, você pode explorar o portfólio por aqui:</p><div className="chat-shortcuts"><Link href="/#projetos" onClick={() => dialog.current?.close()}>Projetos ↗</Link><Link href="/#pesquisa" onClick={() => dialog.current?.close()}>Pesquisas ↗</Link></div></div>}
          {!messages.length && available === true && <div className="chat-prompts"><span className="message-label">ALGUMAS IDEIAS PARA COMEÇAR</span><div className="chat-suggestions">{suggestions.map(suggestion => <button key={suggestion} disabled={loading} onClick={() => send(suggestion)}>{suggestion}<span aria-hidden="true">↗</span></button>)}</div></div>}
          {loading && <div className="generating" role="status"><LoaderCircle size={15} /> ilexie está preparando uma resposta…</div>}
          {error && <p className="chat-error" role="alert">{error}</p>}<div ref={end} />
        </div>
        <form className="chat-composer" onSubmit={e => { e.preventDefault(); void send(question); }}><label htmlFor="ilexie-question">Sua pergunta</label><div className="chat-input-row"><textarea ref={input} id="ilexie-question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={1200} disabled={available !== true || loading} rows={2} placeholder={available === false ? "A conversa abre quando a IA estiver disponível." : "o que você quer saber sobre mim?"} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(question); } }} /><button type="submit" aria-label="Enviar pergunta" disabled={available !== true || loading || !question.trim()}><ArrowUp size={20} /></button></div><div className="chat-tools"><span>{question.length}/1200 · Enter para enviar</span><button type="button" disabled={loading} onClick={() => { setMessages([]); setQuestion(""); setError(""); input.current?.focus(); }}>Limpar conversa</button></div><details className="chat-privacy"><summary>Privacidade e uso da IA <span aria-hidden="true">+</span></summary><p>O histórico fica apenas nesta aba enquanto a página estiver aberta. Ao conversar, suas perguntas são enviadas ao provedor de IA. Não envie dados sensíveis. A IA pode cometer erros.</p></details></form>
      </motion.div>
    </dialog>
  </>;
}
