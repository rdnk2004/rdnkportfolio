"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/section-heading";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const principles = [
  {
    title: "Design for real users",
    description: "Many of the systems I've built are used daily by non-technical users. I prioritize clarity, guardrails, and predictable behavior over clever abstractions.",
  },
  {
    title: "Reliability over elegance",
    description: "A system that works once is easy to build. I optimize for software that continues to work months later under real constraints and scale.",
  },
  {
    title: "Automation is responsibility",
    description: "Automating a process means owning its failures. I design automation with validation, visibility, and graceful fallbacks.",
  },
  {
    title: "Systems over features",
    description: "I focus on boundaries, data flow, and long-term behavior rather than isolated features that don't survive real usage.",
  },
  {
    title: "Learn from what breaks",
    description: "Some early systems didn't scale as expected. Those failures reshaped how I approach architecture, assumptions, and maintainability.",
  },
  {
    title: "Clarity compounds",
    description: "Small decisions around naming, structure, and flow quietly compound into systems that are easier to trust and evolve.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-10 sm:py-12 lg:py-16">
      <SectionHeading>How I Work</SectionHeading>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto text-center text-lg text-foreground/90 leading-relaxed"
      >
        <p>
          I build software with the assumption that reality will challenge it.
        </p>
      </motion.div>

      {/* Principles Grid - Staggered Reveal */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
      >
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="relative rounded-lg border border-border/40 bg-card/50 p-5 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          >
            <h3 className="text-base font-semibold text-primary mb-2">
              {principle.title}
            </h3>
            <p className="text-foreground/85 leading-snug text-sm">
              {principle.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 max-w-3xl mx-auto text-center text-foreground/80"
      >
        <p>
          This mindset shapes every project I build — from automation pipelines to data systems used in the real world.
        </p>
      </motion.div>
    </section>
  );
}
