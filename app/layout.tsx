import type { Metadata } from "next";
import { Geist, Geist_Mono, Cookie } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const cookie = Cookie({
  weight: "400",
  variable: "--font-cookie",
  subsets: ["latin"],
});



export const metadata: Metadata = {

title: "ilexiedotcom",

description:
"Alexia Alves - Software Engineering Portfolio",

};



export default function RootLayout({

children,

}: Readonly<{

children: React.ReactNode;

}>) {


return (

<html

lang="en"

className={`
${geistSans.variable}
${geistMono.variable}
${cookie.variable}
antialiased
`}

>


<body>

{children}

</body>


</html>

);


}