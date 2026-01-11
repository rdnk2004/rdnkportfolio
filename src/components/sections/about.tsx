import { SectionHeading } from "../ui/section-heading";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <SectionHeading>How I Work</SectionHeading>

      {/* Intro */}
      <div className="mt-10 max-w-3xl mx-auto text-center text-lg text-foreground/90 leading-relaxed">
        <p>
          I build software with the assumption that reality will challenge it.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Principle
          title="Design for real users"
          description="Many of the systems I’ve built are used daily by non-technical users. I prioritize clarity, guardrails, and predictable behavior over clever abstractions."
        />
        <Principle
          title="Reliability over elegance"
          description="A system that works once is easy to build. I optimize for software that continues to work months later under real constraints and scale."
        />
        <Principle
          title="Automation is responsibility"
          description="Automating a process means owning its failures. I design automation with validation, visibility, and graceful fallbacks."
        />
        <Principle
          title="Systems over features"
          description="I focus on boundaries, data flow, and long-term behavior rather than isolated features that don’t survive real usage."
        />
        <Principle
          title="Learn from what breaks"
          description="Some early systems didn’t scale as expected. Those failures reshaped how I approach architecture, assumptions, and maintainability."
        />
        <Principle
          title="Clarity compounds"
          description="Small decisions around naming, structure, and flow quietly compound into systems that are easier to trust and evolve."
        />
      </div>

      {/* Closing line */}
      <div className="mt-16 max-w-3xl mx-auto text-center text-foreground/80">
        <p>
          This mindset shapes every project I build — from automation pipelines to data systems used in the real world.
        </p>
      </div>
    </section>
  );
}

function Principle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {title}
      </h3>
      <p className="text-foreground/85 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
