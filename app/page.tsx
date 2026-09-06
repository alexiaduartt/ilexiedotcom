"use client";

import Image from "next/image";
import { motion } from "framer-motion";


const projects = [
  {
    title: "open source\n devsecops pipeline",
    description:
      "Security automation across the development lifecycle, integrating open source tools for vulnerability analysis and secure delivery.",
    tags: ["DEVSECOPS", "SECURITY", "OPENSOURCE"],
    color: "bg-[#e5f2c5]",
  },

  {
    title: "achando bicho",
    description:
      "An application designed to support lost and found animals, vaccination monitoring and adoption processes.",
    tags: ["REACT", "COMMUNITY", "IMPACT"],
    color: "bg-[#eee3f7]",
  },

  {
    title: "generative AI in\n language education",
    description:
      "Research about how students use generative AI for English learning and their perceptions about this technology.",
    tags: ["AI", "EDUCATION", "RESEARCH"],
    color: "bg-gradient-to-br from-[#eee3f7] to-[#e5f2c5]",
  },
];


export default function Home() {

return (

<main className="min-h-screen px-8 md:px-16 lg:px-24">

{/* HEADER */}

<header className="
max-w-7xl
mx-auto
flex
items-center
justify-between
py-8
">

<div className="
font-cookie
text-4xl
tracking-wide
">
ilexiedotcom
</div>


<nav className="
hidden
md:flex
gap-12
text-sm
">

<a href="#">home</a>
<a href="#projects">projects</a>
<a href="#about">about</a>
<a href="#contact">contact</a>

</nav>


<a
href="#contact"
className="
border
border-black
px-6
py-3
text-sm
hover:bg-black
hover:text-white
transition
"
>
let's connect ☆
</a>


</header>



{/* HERO */}


<section
className="
max-w-7xl
mx-auto
grid
lg:grid-cols-2
gap-2
items-center
pt-10
pb-14
"
>


<div>


<p
className="
font-mono
tracking-[0.5em]
text-xs
mb-6
"
>
HI THERE! ꩜
</p>




<h1
className="
font-cookie
text-[#b995d8]
text-7xl
lg:text-8xl
leading-none
"
>
i'm alexia,
</h1>





<h2
className="
font-serif
text-3xl
lg:text-4xl
leading-tight
mt-5
max-w-lg
"
>

a software engineering student who believes in technology as a tool for

<span
className="
bg-[#e5f2c5]
px-2
"
>
real change.
</span>


</h2>






<p
className="
font-mono
text-sm
leading-6
mt-5
max-w-lg
text-gray-700
"
>
i explore artificial intelligence, cybersecurity and community building
to create more inclusive, accessible and meaningful experiences in tech.
</p>






<div
className="
flex
gap-7
mt-7
items-center
"
>


<a
href="#projects"
className="
bg-black
text-white
px-7
py-3
text-sm
hover:opacity-80
transition
"
>
see my work →
</a>



<a
href="/resume.pdf"
download
className="
border-b
border-black
pb-2
text-sm
"
>
download resume ↓
</a>



</div>


</div>







{/* AVATAR */}



<div
className="
relative
flex
justify-center
items-center
"
>




{/* rabiscos */}


<span
className="
absolute
top-12
left-20
text-3xl
opacity-70
"
>
꩜
</span>




<span
className="
absolute
right-16
top-24
text-2xl
opacity-70
"
>
☆
</span>




<span
className="
absolute
bottom-20
left-20
text-xl
opacity-70
"
>
✦
</span>







<div
className="
relative
w-[240px]
h-[310px]
lg:w-[290px]
lg:h-[370px]
"
>


<Image

src="/alexia-avatar.png"

alt="Alexia avatar"

fill

sizes="(max-width:768px) 240px, 290px"

className="
object-contain
"

/>


</div>







<div
className="
absolute
right-4
top-24
border
border-black
rounded-3xl
px-5
py-4
bg-[#faf9f5]
font-mono
text-xs
leading-5
"
>

good<br/>
ideas<br/>
build<br/>
better<br/>
futures

</div>




</div>




</section>


{/* PROJECTS */}



<section
id="projects"
className="
max-w-7xl
mx-auto
pb-28
"
>



<div
className="
flex
justify-between
items-end
mb-12
"
>


<h2
className="
font-serif
text-6xl
"
>
featured projects
</h2>



<p
className="
font-mono
text-sm
"
>
turning ideas into real things.
</p>



</div>





<div
className="
grid
md:grid-cols-3
gap-8
"
>


{
projects.map((project,index)=>(


<motion.article

key={index}

whileHover={{
y:-8
}}

transition={{
duration:.3
}}

className="
border
border-black/20
p-8
min-h-[470px]
flex
flex-col
"

>


{/* imagem abstrata */}

<div
className={`
${project.color}
h-44
mb-8
flex
items-center
justify-center
`}
>



<div
className="
text-5xl
font-serif
"
>

{
index === 0
?
"⌘"
:
index === 1
?
"꩜"
:
"☆"
}

</div>


</div>




<h3
className="
font-serif
text-4xl
whitespace-pre-line
leading-tight
"
>

{project.title}

</h3>




<p
className="
mt-6
text-base
leading-7
text-gray-700
"
>

{project.description}

</p>




<div
className="
mt-auto
pt-8
flex
gap-5
flex-wrap
"
>

{
project.tags.map(tag=>(

<span
key={tag}
className="
font-mono
text-xs
tracking-[0.25em]
"
>
{tag}
</span>

))
}


</div>


</motion.article>


))

}


</div>


</section>
{/* ABOUT */}


<section
id="about"
className="
max-w-7xl
mx-auto
grid
md:grid-cols-3
gap-12
border-t
border-black/10
pt-20
pb-24
"
>


<div>

<h2
className="
font-serif
text-5xl
mb-8
"
>
about me
</h2>


<p
className="
text-base
leading-8
text-gray-700
"
>

i'm a software engineering student at IFPE,
interested in the intersection between technology,
artificial intelligence and social impact.

<br/><br/>

i enjoy building digital experiences,
researching new technologies and creating
solutions that connect people and knowledge.

</p>


</div>





<div>


<h2
className="
font-serif
text-5xl
mb-8
"
>
skills
</h2>



<ul
className="
space-y-4
font-mono
text-sm
"
>


<li>
→ software engineering
</li>


<li>
→ artificial intelligence
</li>


<li>
→ cybersecurity
</li>


<li>
→ full stack development
</li>


<li>
→ cloud & devops
</li>


<li>
→ technical communication
</li>


</ul>


</div>





<div>


<h2
className="
font-serif
text-5xl
mb-8
"
>
currently
</h2>



<div
className="
space-y-8
border-l
border-black/20
pl-6
"
>


<div>

<p
className="
font-serif
text-2xl
"
>
moura tech
</p>

<p
className="
font-mono
text-xs
text-gray-600
"
>
cybersecurity & infrastructure
</p>

</div>




<div>

<p
className="
font-serif
text-2xl
"
>
research projects
</p>

<p
className="
font-mono
text-xs
text-gray-600
"
>
AI, education and technology
</p>

</div>




<div>

<p
className="
font-serif
text-2xl
"
>
building what comes next...
</p>

</div>



</div>


</div>


</section>






{/* FOOTER */}



<footer
id="contact"
className="
max-w-7xl
mx-auto
border-t
border-black/10
py-10
flex
flex-col
md:flex-row
justify-between
gap-6
"
>


<div
className="
font-cookie
text-4xl
"
>
ilexiedotcom
</div>



<div
className="
flex
gap-8
font-mono
text-sm
"
>

<a href="#">
github
</a>

<a href="#">
linkedin
</a>

<a href="mailto:seuemail@email.com">
email
</a>


</div>



<div
className="
font-mono
text-xs
"
>
belo jardim, brazil
</div>



</footer>



</main>

);

}