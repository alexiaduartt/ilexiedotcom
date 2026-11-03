import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio.json";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ilexiedotcom.vercel.app";
  return [{ url: base, priority: 1 }, ...projects.map(project => ({ url: `${base}/projetos/${project.slug}`, priority: .8 }))];
}
