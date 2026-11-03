"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Preview = { slug: string; title: string; category: string; summary: string };

export default function ProjectSpotlight({ projects }: { projects: Preview[] }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const project = projects[selected];

  return (
    <aside className="spotlight" aria-label="Explore os projetos">
      <div className="spotlight-tabs" role="tablist" aria-label="Projetos selecionados">
        {projects.map((item, index) => <button key={item.slug} id={`spotlight-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="spotlight-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
          const next = event.key === "ArrowRight" ? (selected + 1) % projects.length : event.key === "ArrowLeft" ? (selected + projects.length - 1) % projects.length : event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : null;
          if (next !== null) { event.preventDefault(); setSelected(next); document.getElementById(`spotlight-tab-${next}`)?.focus(); }
        }} aria-label={item.title}>0{index + 1}</button>)}
        <span>EM FOCO</span>
      </div>
      <div id="spotlight-panel" className="spotlight-panel" role="tabpanel" aria-labelledby={`spotlight-tab-${selected}`} tabIndex={0}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.slug} initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : .28, ease: [.22, 1, .36, 1] }}>
            <span className="spotlight-category">{project.category}</span>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <Link href={`/projetos/${project.slug}`}>Conhecer o projeto <ArrowUpRight size={18} /></Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="spotlight-footer"><span>TRABALHOS SELECIONADOS</span><span>{String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
    </aside>
  );
}
