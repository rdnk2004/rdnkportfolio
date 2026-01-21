"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";
import { Github, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

const projectData = [
  {
    title: "Automated Semester Marklist Processing System",
    metadata: "Controller of Examinations | In-House | Active",
    oneLiner: "Automated semester marklist processing for 1,400+ students, reducing manual effort from 2+ hours to under 2 minutes.",
    skills: ["Python", "Excel Automation", "Data Cleaning", "Streamlit", "Workflow Automation"],
    problem: "Semester marklists were received as large, unstructured Excel files that required manual cleaning, header insertion, and department-wise splitting. This process was repetitive, error-prone, and took over 2 hours per cycle, slowing academic review and reporting.",
    solution: "Built a Streamlit-based automation platform that ingests raw Excel files, cleans inconsistencies, inserts missing headers, and intelligently splits data by department and batch. The system generates clean, analytics-ready Excel files and packages them as a structured ZIP output.",
    impact: [
      "Reduced processing time from 2+ hours to < 2 minutes",
      "Processed 1,400+ student records across 14+ departments and 3 batches",
      "Eliminated manual errors and enabled faster academic review and archival"
    ],
    link: "https://github.com/rdnk2004/Mark-Splitting"
  },
  {
    title: "Smart Academic Documentation & Result Analysis Automation",
    metadata: "University Academic Portal | Capstone Project",
    oneLiner: "Built and led the development of an academic portal enabling real-time result analysis and automated faculty workflows.",
    skills: ["Flask", "MongoDB", "Data Analysis", "Role-Based Access Control", "Team Leadership", "Automation"],
    problem: "Academic workflows such as mark entry, documentation, and result analysis relied on disconnected tools and manual reporting, leading to delays, inconsistencies, and limited analytical visibility.",
    solution: "Led a cross-batch team to develop a full-stack academic portal with Excel-style mark entry, automated mark conversion, and dynamic subject/batch filtering. Designed admin dashboards providing live insights into subject-wise performance, top scorers, and arrear statistics, with role-based access for faculty, HODs, and admins.",
    impact: [
      "Enabled real-time academic performance analysis",
      "Improved data integrity using structured workflows and RBAC",
      "Reduced documentation and reporting effort across faculty and admin users"
    ],
    link: "https://github.com/rdnk2004/College-Website"
  },
  {
    title: "Event Report Automated Generator",
    metadata: "In-House | Actively Used by Faculty",
    oneLiner: "Automated academic event report creation, cutting documentation time from hours to minutes.",
    skills: ["Streamlit", "Python", "DOCX Automation"],
    problem: "Faculty spent significant time manually creating event reports, repeatedly formatting documents and ensuring compliance with institutional standards.",
    solution: "Developed a Streamlit-based report generation system with a dynamic form builder and live preview. Integrated automated DOCX generation to produce professionally formatted reports aligned with university guidelines.",
    impact: [
      "Reduced report creation time from hours to minutes",
      "Enabled non-technical users to generate standardized reports independently",
      "Improved consistency and quality of academic documentation"
    ],
    link: "https://github.com/rdnk2004/Report"
  },
  {
    title: "Anomaly Detection System for Industrial Defect Classification",
    metadata: "Deep Learning | ResNet-50",
    oneLiner: "Developed a deep learning–based defect detection system achieving up to 94% classification accuracy.",
    skills: ["Deep Learning", "ResNet-50", "Computer Vision", "Model Optimization", "Flask", "Data Balancing"],
    problem: "Industrial defect datasets often contain highly imbalanced samples, making anomaly detection unreliable and prone to bias toward normal cases.",
    solution: "Fine-tuned a ResNet-50 model pretrained on ImageNet, applying data balancing techniques and training optimizations such as Adam optimizer, early stopping, and learning rate scheduling. Deployed the model via a Flask web application for real-time prediction and visualization.",
    impact: [
      "Achieved 87% accuracy on bottle defects and 94% accuracy on hazelnut defects",
      "Reduced bias toward normal samples through balanced training",
      "Enabled real-time inference via a user-friendly web interface"
    ],
    link: "https://github.com/rdnk2004/anomaly-detection"
  },
  {
    title: "Data-Driven Wellness Analysis: Impact of Yoga Practice",
    metadata: "Exploratory Data Analysis",
    oneLiner: "Analyzed wellness survey data to identify measurable mental and physical benefits of yoga practice.",
    skills: ["Exploratory Data Analysis", "Pandas", "NumPy", "Data Visualization", "Statistical Analysis"],
    problem: "While yoga is widely recommended for wellness, measurable data-driven insights on its mental and physical benefits were limited.",
    solution: "Performed data cleaning, exploratory analysis, and visualization to compare wellness indicators between yoga practitioners and non-practitioners. Examined stress levels, mental clarity, flexibility, and participation barriers.",
    impact: [
      "Identified key wellness improvements linked to regular yoga practice",
      "Highlight barriers to adoption using data-backed insights",
      "Demonstrated data’s role in understanding human behavior and well-being"
    ],
    link: "#"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projectData[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setSelectedProject(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    }

    const header = document.querySelector('header');
    const body = document.body;

    if (selectedProject) {
      body.classList.add('body-scroll-locked');
      header?.classList.add('header-hidden');
    } else {
      body.classList.remove('body-scroll-locked');
      header?.classList.remove('header-hidden');
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Ensure classes are removed on unmount
      body.classList.remove('body-scroll-locked');
      header?.classList.remove('header-hidden');
    };
  }, [selectedProject]);


  return (
    <section id="projects" className="py-6 sm:py-8 lg:py-10 relative">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {projectData.map((project, index) => (
          <motion.div
            key={index}
            layoutId={`card-${project.title}`}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="bg-card/50 border border-border/40 h-full shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 flex flex-col justify-between">
              <div>
                <CardHeader>
                  <motion.div layoutId={`metadata-${project.title}`} className="text-xs font-mono text-muted-foreground mb-3 tracking-wide border-l-2 border-primary/20 pl-2">{project.metadata}</motion.div>
                  <motion.div layoutId={`title-${project.title}`} className="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">{project.title}</motion.div>
                </CardHeader>
                <CardContent>
                  <motion.p layoutId={`oneliner-${project.title}`} className="text-muted-foreground text-sm leading-relaxed">{project.oneLiner}</motion.p>
                </CardContent>
              </div>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground border-white/10 bg-transparent">{tag}</Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              // Increased z-index to 100 to stay above navbar (z-50)
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedProject.title}`}
                ref={ref}
                className="w-full max-w-3xl bg-card border border-primary/20 shadow-2xl overflow-hidden rounded-xl pointer-events-auto flex flex-col max-h-[90vh]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Added overflow-y-auto and scrollbar styling to ensure content is accessible */}
                <div className="relative flex-1 overflow-y-auto custom-scrollbar">

                  <div className="p-6 md:p-8">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(null);
                      }}
                      className="absolute top-4 right-4 p-2 bg-secondary/50 hover:bg-destructive/20 rounded-full transition-colors z-10"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>

                    {/* layoutId ensures these elements morph smoothly from their card position */}
                    <motion.div layoutId={`metadata-${selectedProject.title}`} className="text-sm font-mono text-primary mb-2">{selectedProject.metadata}</motion.div>
                    <motion.h2 layoutId={`title-${selectedProject.title}`} className="text-2xl md:text-3xl font-bold mb-4">{selectedProject.title}</motion.h2>
                    <motion.p layoutId={`oneliner-${selectedProject.title}`} className="text-lg text-foreground/80 mb-8 border-b border-border/50 pb-6">
                      {selectedProject.oneLiner}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-8"
                    >
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                          ⚠️ Problem
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/20">
                          {selectedProject.problem}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                          💡 Solution
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/20">
                          {selectedProject.solution}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                          🚀 Impact
                        </h3>
                        <ul className="space-y-2 pl-6">
                          {selectedProject.impact.map((item, i) => (
                            <li key={i} className="text-muted-foreground flex gap-2 text-sm md:text-base">
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 border-t border-border/50">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.skills.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-primary/20 bg-primary/5">{tag}</Badge>
                          ))}
                        </div>
                      </div>

                      {selectedProject.link !== "#" && (
                        <div className="flex justify-end pt-4">
                          <Button asChild className="gap-2">
                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                              {selectedProject.link.includes("github") ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                              View Project
                            </a>
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
