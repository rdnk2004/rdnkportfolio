"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/section-heading";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const learningData = [
  {
    category: "Applied Data Science & Systems",
    items: [
      { name: "Oracle Certification - Data Science Professional 2025", provider: "Oracle" },
      { name: "Applied Data Science with Python - Level 2", provider: "IBM" },
      { name: "Database Management Essentials (Honors)", provider: "University of Colorado" },
      { name: "Data-Driven Astronomy", provider: "University of Sydney" },
      { name: "Data Analytics with Excel", provider: "360DigiTMG" },
    ]
  },
  {
    category: "Foundations & Computational Thinking",
    items: [
      { name: "Data Structures", provider: "UC San Diego" },
      { name: "Inferential Statistics", provider: "Duke University" },
      { name: "Introduction to Python", provider: "IBM Career Education Program" },
      { name: "Foundations - Data Everywhere", provider: "Google" },
    ]
  },
  {
    category: "Decision Intelligence",
    items: [
      { name: "Ask Questions to Make Data-Driven Decisions", provider: "Google" },
      { name: "Prepare Data for Exploration", provider: "Google" },
    ]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-6 sm:py-8 lg:py-10">
      <SectionHeading>Learning & Credentials</SectionHeading>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-4xl mx-auto space-y-10"
      >
        {learningData.map((group, groupIndex) => (
          <motion.div key={groupIndex} variants={fadeInUp} className="space-y-4">
            <h3 className="text-base font-medium text-foreground/80 pl-1 border-l-2 border-primary/20">{group.category}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.items.map((cert, index) => (
                <div
                  key={index}
                  className="group flex flex-col p-4 rounded-lg border border-border/30 bg-card/40 transition-all duration-300 hover:bg-card/60 hover:border-primary/20 hover:-translate-y-0.5"
                >
                  <span className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                    {cert.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {cert.provider}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

