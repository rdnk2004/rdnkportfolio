"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/section-heading";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const educationData = [
  {
    degree: "Master of Science in Computer Science (Data Analytics)",
    institution: "Rajagiri College of Social Sciences",
    duration: "2025 - Present",
    details: "",
    status: "ongoing",
  },
  {
    degree: "Bachelor of Science in Data Science",
    institution: "Kumaraguru College of Liberal Arts and Science",
    duration: "2022 - 2025",
    details: "CGPA: 9.022",
    status: "completed",
  },
  {
    degree: "Higher Secondary Education",
    institution: "CMS Matriculation Higher Secondary School",
    duration: "2020 - 2022",
    details: "91%",
    status: "completed",
  },
  {
    degree: "SSLC",
    institution: "CMS Matriculation Higher Secondary School",
    duration: "2019 - 2020",
    details: "94%",
    status: "completed",
  }
];

export default function Education() {
  return (
    <section id="education" className="py-6 sm:py-8 lg:py-10">
      <SectionHeading>Education</SectionHeading>

      <div className="max-w-2xl mx-auto">
        <div className="relative pl-6">
          {/* Vertical Timeline Line - thinner and lighter */}
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border/50" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {educationData.map((edu, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative group">
                {/* Marker - smaller, with pulse for ongoing */}
                <div
                  className={cn(
                    "absolute left-0 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-primary/70 z-10 transition-all duration-300",
                    edu.status === "completed"
                      ? "bg-primary/80"
                      : "bg-background ring-2 ring-primary/20 ring-offset-1 ring-offset-background",
                    "group-hover:scale-125 group-hover:border-primary"
                  )}
                >
                  {/* Pulse animation for ongoing education */}
                  {edu.status === "ongoing" && (
                    <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                  )}
                </div>

                {/* Content - aligned with Experience typography */}
                <div className="pl-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-6">
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1 mt-0.5 sm:mt-0 shrink-0">
                    <span className="text-xs text-muted-foreground font-mono tabular-nums">
                      {edu.duration}
                    </span>
                    {edu.details && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                        {edu.details}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section >
  );
}

