import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, Code, ExternalLink } from "lucide-react";
import data from "@/data/portfolio.json";
import Section from "@/components/Section";
import { OpenChat } from "@/components/Chat";
import ProjectSpotlight from "@/components/ProjectSpotlight";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const { profile, projects, research, extension, skills } = data;

  return (
    <main id="conteudo">
      <section id="inicio" className="cover">
        <div className="wrap cover-inner">
          <div className="cover-kicker"><span>PORTFÓLIO / ALEXIA ALVES</span><span>DESENVOLVIMENTO · DESIGN · PESQUISA</span></div>
          <div className="cover-grid">
            <div className="cover-copy">
              <p className="cover-intro">Desenvolvimento frontend e UI/UX</p>
              <h1>Alexia <em>Alves.</em><span className="name-index" aria-hidden="true">(01)</span></h1>
              <p className="cover-description">Sou estudante de Engenharia de Software no IFPE. Trabalho com interfaces, infraestrutura e segurança, e desenvolvo pesquisas sobre inteligência artificial na educação.</p>
              <div className="actions"><a className="button" href="#projetos">Explorar projetos <ArrowUpRight size={16} /></a><OpenChat className="text-button">vamos conversar? <ArrowUpRight size={15} /></OpenChat></div>
            </div>
            <ProjectSpotlight projects={projects.map(({ slug, title, category, summary }) => ({ slug, title, category, summary }))} />
          </div>
          <div className="cover-base"><span>FRONTEND & UI/UX / IFPE</span><a href="#sobre">Sobre minha trajetória <ArrowDown size={14} /></a></div>
        </div>
      </section>

      <Section id="sobre" number="01" title={<>Sobre <em>mim.</em></>} className="about-section">
        <div className="about-grid">
          <div className="about-copy">
            <p>Estudante de Engenharia de Software no IFPE, com experiência em frontend, UI/UX, infraestrutura e segurança.</p>
            <p>Gosto de transformar ideias em interfaces e entender o que existe por trás delas. Na pesquisa, exploro o uso responsável de IA na educação. Na extensão, ajudo a abrir espaço para mais mulheres na tecnologia.</p>
            <div className="actions"><a className="button profile-button" href={profile.linkedin}>Vamos nos conectar <ArrowUpRight size={16} /></a><a className="text-button" href={profile.resume} download><Download size={14} /> Currículo</a></div>
          </div>
          <div className="resume-card">
            <div className="resume-facts"><h3>Trajetória</h3><ul>{profile.facts.map(fact => <li key={fact}>{fact}</li>)}</ul></div>
            <div className="compact-skills"><h3>Áreas de prática</h3><div>{skills.map(skill => <details key={skill.title}><summary>{skill.title}<span aria-hidden="true">+</span></summary><p>{skill.items}</p></details>)}</div></div>
          </div>
        </div>
      </Section>

      <Section id="projetos" number="02" title={<>Projetos <em>selecionados.</em></>} className="collection-section" aside="04 ESTUDOS DE CASO">
        <div className="projects-grid">
          {projects.map((project, i) => (
            <article className="project-card" key={project.slug}>
              <Link className={`project-visual ${project.color} visual-${project.slug}`} href={`/projetos/${project.slug}`} aria-label={`Conhecer ${project.title}`}>
                <span className="project-symbol" aria-hidden="true">{project.symbol}</span>
                {i === 0 && <div className="pipeline-art" aria-hidden="true"><span>CODE</span><i /><span>SCAN</span><i /><span>SHIP</span></div>}
                {i === 1 && <div className="radar-art" aria-hidden="true"><i /><i /><i /></div>}
                {i === 2 && <div className="gradus-art" aria-hidden="true"><span>g.</span></div>}
                {i === 3 && <Image src="/alexia-avatar.png" alt="" width={110} height={113} className="project-avatar" />}
                <span className="visual-bottom">0{i + 1}<ArrowUpRight size={18} /></span>
              </Link>
              <span className="project-category">{project.category}</span>
              <h3><Link href={`/projetos/${project.slug}`}>{project.title}</Link></h3>
              <p>{project.summary}</p>
              <Link className="text-button" href={`/projetos/${project.slug}`}>Ver estudo de caso <ArrowUpRight size={14} /></Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="pesquisa" number="03" title={<>Pesquisa <em>em IA.</em></>} className="research-section" aside="EDUCAÇÃO / ÉTICA / APRENDIZAGEM">
        <div className="research-list">
          {research.map((item, i) => (
            <details className="research-item" key={item.title}>
              <summary><span className="research-meta">0{i + 1} / {item.status}</span><h3>{item.title}</h3><span className="detail-hint">Conhecer a pesquisa <span aria-hidden="true">+</span></span></summary>
              <div className="research-content"><p>{item.description}</p><ul>{item.activities.map(activity => <li key={activity}>{activity}</li>)}</ul><p className="advisor">{item.institution} · {item.period}<br />Orientação: {item.advisor}</p></div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="extensao" number="04" title={<>Meu Espaço<br /> <em>na Tech.</em></>} className="extension-section dark">
        <div className="extension-grid">
          <div className="extension-poster"><span className="eyebrow">INTRODUÇÃO À WEB</span><p>HTML<br /><em>& CSS.</em></p><span className="extension-caption">FORMAÇÃO PARA MULHERES</span></div>
          <div className="extension-copy"><h3>{extension.subtitle}</h3><p>Cofundei o Meu Espaço na Tech para aproximar meninas e mulheres da tecnologia por meio do desenvolvimento web.</p><details className="extension-details"><summary>Meu papel e próximos passos <span aria-hidden="true">+</span></summary><p>{extension.contribution}</p><p>{extension.plan}</p><ul className="tags">{extension.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></details></div>
        </div>
      </Section>

      <section id="ask-ilexie" className="ask-section section" aria-labelledby="ask-ilexie-heading"><div className="wrap ask-strip">
        <div className="ask-identity"><Image src="/alexia-avatar.png" alt="" width={80} height={82} /><div><span className="eyebrow">05 / UM PEDACINHO DE MIM</span><h2 id="ask-ilexie-heading">ask <em>ilexie.</em></h2><p>quer saber mais sobre mim? minha mini eu em ia te conta dos projetos aos livros favoritos.</p></div></div>
        <div className="ask-actions"><OpenChat className="button">vamos conversar <ArrowUpRight size={16} /></OpenChat><Link className="text-button" href="/projetos/ask-ilexie">Como funciona ↗</Link><p className="small-note">IA sujeita à disponibilidade. Pode cometer erros.</p></div>
      </div></section>

      <section id="contato" className="contact-section"><div className="wrap contact-inner"><div><span className="eyebrow">06 / CONTATO</span><h2>Vamos criar <em>algo juntos?</em></h2></div><div className="contact-actions"><a className="button" href={`mailto:${profile.email}`}>Enviar uma mensagem <ArrowUpRight size={16} /></a><div className="contact-links"><a className="social-link" href={profile.github} aria-label="GitHub da Alexia"><Code size={15} /><span className="social-label"><span>GitHub</span><span aria-hidden="true">GitHub</span></span><ArrowUpRight className="social-arrow" size={14} /></a><a className="social-link" href={profile.linkedin} aria-label="LinkedIn da Alexia"><ExternalLink size={15} /><span className="social-label"><span>LinkedIn</span><span aria-hidden="true">LinkedIn</span></span><ArrowUpRight className="social-arrow" size={14} /></a></div></div></div></section>
    </main>
  );
}
