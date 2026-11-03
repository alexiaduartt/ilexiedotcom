import data from "@/data/portfolio.json";
import personal from "@/data/ilexie-personal.json";
import { configured, handleAsk } from "@/lib/ask";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function GET() {
  return Response.json({ available: configured(process.env) }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  const response = await handleAsk(request, { ...data, personal }, process.env);
  if (!response.ok) return response;
  const result = await response.json() as { answer: string };
  const normalized = `${result.answer}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const sources = data.projects.filter(project => normalized.includes(project.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())).map(project => ({ title: project.title, href: `/projetos/${project.slug}` }));
  return Response.json({ ...result, sources }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
