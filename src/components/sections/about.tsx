import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SectionHeading } from "../ui/section-heading";
import Image from "next/image";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <SectionHeading>About Me</SectionHeading>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2 space-y-6 text-foreground/90 text-lg leading-relaxed">
          <p>
            Hi, I’m Nikhil Krishna R D, a data science professional specializing in
            data analytics and automation. My passion lies at the intersection of data
            and development, where I build practical, high-impact tools that solve
            real-world challenges, particularly within educational and administrative
            environments.
          </p>
          <p>
            During my undergraduate studies in Data Science, I focused on turning
            academic theory into tangible results. I spearheaded the development of
            several tools now in active use, including a Streamlit application that
            processes over 1,400 student marklists—reducing a two-hour manual task to
            under two minutes—and an automated report generator that saves faculty
            countless hours of work. These projects cemented my belief in the power of
            elegant automation.
          </p>
          <p>
            My leadership approach was forged by direct experience. An early project
            setback taught me a critical lesson: successful outcomes depend on clear
            communication and an empowered team, not just technical skill. I applied
            this learning when I mentored a nine-person junior and super-junior team
            in an intra-college hackathon. By guiding them through a structured
            process of ideation, debate, and development, we fostered true ownership
            and secured a top-4 finish among 20 teams.
          </p>
          <p>
            This drive to empower others is a core part of who I am. For three years,
            I’ve tutored high school students in mathematics, which has sharpened my
            ability to deconstruct complex problems and make them accessible—a skill I
            apply daily in my work. My deep and genuine curiosity for both mathematics
            and computer science fuels my desire to be a lifelong learner. I don't just
            want to use the tools; I strive to understand the foundational principles
            that make them work.
          </p>
          <p>
            I am now pursuing my M.Sc. in Computer Science with a focus on Data
            Analytics and am actively seeking internship and full-time roles where I
            can contribute my skills in a challenging, collaborative environment. I am
            eager to help a forward-thinking team solve complex problems and build
            solutions that matter.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/nikhil.jpg"
            alt="Nikhil Krishna R D"
            width={350}
            height={350}
            className="rounded-full object-cover shadow-2xl shadow-primary/20"
          />
        </div>
      </div>
    </section>
  );
}

export function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Remove Google Fonts <link> if using next/font */}
      </head>
      <body className={cn('font-body bg-background text-foreground antialiased', inter.variable, playfairDisplay.variable)}>
        {children}
      </body>
    </html>
  );
}
