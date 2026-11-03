import type { ReactNode } from "react";
const labels: Record<string, string> = { sobre: "SOBRE MIM", projetos: "PROJETOS", pesquisa: "PESQUISA", extensao: "EXTENSÃO", "ask-ilexie": "ASK ILEXIE" };
export default function Section({ id, number, title, aside, className = "", children }: { id: string; number: string; title: ReactNode; aside?: string; className?: string; children: ReactNode }) {
  return <section id={id} className={`section ${className}`} aria-labelledby={`${id}-heading`}><div className="wrap"><div className="section-heading"><div><span className="eyebrow">{number} / {labels[id]}</span><h2 id={`${id}-heading`}>{title}</h2></div>{aside && <span className="eyebrow section-aside">{aside}</span>}</div>{children}</div></section>;
}
