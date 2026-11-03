import type { Metadata } from "next";
import { Geist, DM_Serif_Display } from "next/font/google";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import Link from "next/link";
import "./globals.css";
const sans = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const serif = DM_Serif_Display({ weight: "400", style: ["normal", "italic"], variable: "--font-editorial", subsets: ["latin"], display: "swap" });
const description = "Alexia Alves: Engenharia de Software, frontend, UI/UX, segurança e pesquisa em inteligência artificial. Conheça meus projetos e a Ask ILexie.";
export const metadata: Metadata = {
  metadataBase: new URL("https://ilexiedotcom.vercel.app"),
  title: { default: "Alexia Alves — ilexiedotcom", template: "%s | ilexiedotcom" }, description,
  openGraph: { title: "Alexia Alves — ilexiedotcom", description, locale: "pt_BR", type: "website", siteName: "ilexiedotcom", images: [{ url: "/alexia-avatar.png", width: 725, height: 742, alt: "Avatar original de Alexia Alves" }] },
  twitter: { card: "summary", title: "Alexia Alves — ilexiedotcom", description, images: ["/alexia-avatar.png"] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}><body><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header />{children}<footer className="site-footer wrap"><Link className="wordmark" href="/">ilexie<span>dotcom</span></Link><span>© {new Date().getFullYear()} Alexia Alves</span></footer><Chat /></body></html>;
}
