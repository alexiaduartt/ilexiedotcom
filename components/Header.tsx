"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
const links = [["inicio", "Início"], ["sobre", "Sobre mim"], ["projetos", "Projetos"], ["pesquisa", "Pesquisa"], ["extensao", "Extensão"], ["ask-ilexie", "ask ilexie"], ["contato", "Contato"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="wrap header-inner"><Link className="wordmark" href="/" aria-label="ilexiedotcom — início" onClick={() => setOpen(false)}>ilexie<span>dotcom</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="main-nav" className={open ? "nav-open" : ""} aria-label="Principal" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}>{links.map(([id, label]) => <Link onClick={() => setOpen(false)} key={id} href={`/#${id}`}>{label}</Link>)}</nav><a className="header-contact" href="mailto:lexajosielly@gmail.com">Diga olá <ArrowUpRight size={16} /></a></div></header>;
}
