"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const experienceData = [
  {
    role: "Automation and Platform Developer",
    company: "Kumaraguru College of Liberal Arts and Science",
    duration: "12/2024 - 03/2025",
    tasks: [
      "Designed and deployed an integrated academic automation platform consolidating multiple internal tools into a single role-based system.",
      "Automated documentation, result processing, and report generation, significantly reducing manual administrative effort.",
      "Built secure, high-volume Excel data processing pipelines and real-time result analysis dashboards for Admin, HOD, and Faculty users.",
      "Delivered a scalable, deployment-ready system actively used in real academic workflows with minimal manual intervention.",
    ],
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_automation-python-streamlit-activity-7356642080330297344-GOF2",
    linkText: "How this system evolved in practice →",
  },
  {
    role: "Data Analyst Intern",
    company: "CAI Mahindra",
    duration: "07/2024 - 08/2024",
    tasks: [
      "Analyzed automotive sales data, focusing on ETBR (Enquiry, Test Drive, Booking, Retail) pipeline.",
      "Automated 15 critical Excel reports for Sales and Telecalling departments.",
      "Developed a Flask application to streamline report generation.",
      "Collaborated with departments to understand workflows and identify opportunities for data-driven improvements.",
    ],
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_internshipexperience-dataanalytics-automation-activity-7330781364402769920-IgqH",
    linkText: "Reflections from this experience →",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-6 sm:py-8 lg:py-10">
      <SectionHeading>Work Experience</SectionHeading>
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          {experienceData.map((job, index) => (
            <motion.div key={index} variants={fadeInUp} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-primary border-4 border-background"></div>

              <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="flex justify-between items-start flex-col sm:flex-row">
                    <CardTitle className="text-primary">{job.role}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1 sm:mt-0">{job.duration}</p>
                  </div>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1.5 text-foreground/90 text-sm leading-snug">
                    {job.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>

                  {/* Contextual LinkedIn Link */}
                  {/* @ts-ignore */}
                  {job.link && (
                    <div className="pt-4 mt-2 border-t border-border/30">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                      >
                        {job.linkText}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
