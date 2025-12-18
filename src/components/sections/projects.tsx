
"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SectionHeading } from "../ui/section-heading";
import { Github, ExternalLink } from "lucide-react";

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
    skills: ["Streamlit", "Python", "DOCX Automation", "HTML5", "TailwindCSS", "UI/UX Design"],
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
  return (
    <section id="projects" className="py-24 sm:py-32">
      <SectionHeading>Projects</SectionHeading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectData.map((project, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="bg-card/70 backdrop-blur-sm border-secondary/20 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer group flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <div className="text-xs font-mono text-primary/80 mb-2 tracking-wider">{project.metadata}</div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{project.oneLiner}</p>
                  </CardContent>
                </div>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary/80 transition-colors">{tag}</Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-primary/20">
              <DialogHeader>
                <div className="text-sm font-mono text-primary mb-2">{project.metadata}</div>
                <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                <DialogDescription className="text-lg pt-2 text-foreground/80">
                  {project.oneLiner}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    ⚠️ Problem
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/20">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    💡 Solution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/20">
                    {project.solution}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    🚀 Impact
                  </h3>
                  <ul className="space-y-2 pl-6">
                    {project.impact.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex gap-2">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-primary/20 bg-primary/5">{tag}</Badge>
                    ))}
                  </div>
                </div>

                {project.link !== "#" && (
                  <div className="flex justify-end pt-2">
                    <Button asChild className="gap-2">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.link.includes("github") ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                        View Project
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
