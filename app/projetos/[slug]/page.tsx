import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import data from "@/data/portfolio.json";
import askCase from "@/data/ask-case-study.json";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return data.projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = data.projects.find(item => item.slug === slug);
  return project ? {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projetos/${slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projetos/${slug}`,
      locale: "pt_BR",
      images: [{ url: "/alexia-avatar.png", alt: "Avatar original de Alexia Alves" }],
    },
  } : { title: "Projeto não encontrado" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = data.projects.find(item => item.slug === slug);
  if (!project) notFound();
  const index = data.projects.findIndex(item => item.slug === slug) + 1;

  return (
    <main id="conteudo" className="project-page wrap">
      <header className="case-header">
        <div className="case-topline">
          <Link href="/#projetos" className="back-link"><ArrowLeft size={15} /> Todos os projetos</Link>
          <span className="eyebrow">{project.category} / ESTUDO 0{index}</span>
        </div>
        <div className="case-title-row"><h1>{project.title}</h1><span className="case-edition" aria-hidden="true">0{index}</span></div>
        <p className="project-lead">{project.summary}</p>
        <nav className="case-navigation" aria-label="Neste estudo"><a href="#visao-geral">Visão geral</a><a href="#contribuicao">Minha contribuição</a><a href="#detalhes-tecnicos">Detalhes técnicos <ArrowUpRight size={13} /></a><a href="#ficha-tecnica">Ficha técnica</a></nav>
      </header>

      <div className="project-body">
        <aside id="ficha-tecnica" className="project-sidebar" aria-label="Ficha do projeto">
          <div className="case-state"><h2>Estado atual</h2><p>{project.status}</p></div>
          <details className="case-technologies"><summary>Tecnologias <span aria-hidden="true">+</span></summary><ul className="tags">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></details>
          {project.repository && <a className="text-button" href={project.repository}>Ver repositório <ArrowUpRight size={15} /></a>}
          <span className="case-sidebar-note">ILEXIEDOTCOM / PROJETO 0{index}</span>
        </aside>

        <article className="case-article">
          <section id="visao-geral" className="case-overview" aria-labelledby="overview-title">
            <div><h2 id="overview-title">Contexto</h2><p>{project.context}</p></div>
            <div><h2>Objetivo</h2><p>{project.objective}</p></div>
          </section>
          <section id="contribuicao" className="case-contribution" aria-labelledby="contribution-title"><span className="eyebrow">PARTICIPAÇÃO</span><h2 id="contribution-title">Minha contribuição</h2><p>{project.contribution}</p></section>
          <section id="detalhes-tecnicos" className="case-details" aria-labelledby="details-title">
            <div className="case-details-heading"><h2 id="details-title">Por dentro do projeto</h2><span>EXPLORE OS DETALHES</span></div>
            <CaseDetail number="01" title="O problema"><p>{project.problem}</p></CaseDetail>
            <CaseDetail number="02" title="Arquitetura e fluxo"><div className="architecture">{project.architecture}</div></CaseDetail>
            <CaseDetail number="03" title="Principais desafios"><p>{project.challenges}</p></CaseDetail>
            {slug === "ask-ilexie" && askCase.map((section, i) => <CaseDetail key={section.title} number={String(i + 4).padStart(2, "0")} title={section.title}>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</CaseDetail>)}
          </section>
        </article>
      </div>
      <div className="case-bottom"><Link href="/#projetos"><ArrowLeft size={15} /> Voltar à coleção</Link><Link href={`/#contato`}>Vamos conversar <ArrowUpRight size={15} /></Link></div>
    </main>
  );
}

function CaseDetail({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <details className="case-detail"><summary><span className="case-detail-number">{number}</span><h3>{title}</h3><span className="case-detail-toggle" aria-hidden="true">+</span></summary><div className="case-detail-content">{children}</div></details>;
}
