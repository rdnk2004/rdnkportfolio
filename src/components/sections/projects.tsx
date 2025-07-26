
"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SectionHeading } from "../ui/section-heading";
import { Github } from "lucide-react";

const projectData = [
  {
    title: "Event Report Automated Generator",
    shortDescription: "Designed and deployed a university event report generation system, actively used by faculty and staff across departments. Reduced turnaround time from hours to minutes.",
    longDescription: [
      "Designed and deployed a university event report generation system, actively used by faculty and staff across departments.",
      "Developed a dynamic, real-time form builder with live preview functionality using FastAPI and HTML5.",
      "Integrated DOCX document processing to generate professional-grade reports adhering to university formatting standards.",
      "Built a fully responsive UI with TailwindCSS, ensuring seamless device usability.",
      "Optimized the report generation process, reducing turnaround time from hours to minutes without compromising quality.",
    ],
    tags: ["FastAPI", "HTML5", "TailwindCSS", "Automation"],
    link: "https://github.com/rdnk2004/Report",
    institution: "Kumaraguru College of Liberal Arts and College",
    dates: "02/2025 - 04/2025"
  },
  {
    title: "Anomaly Detection Using ResNet-50",
    shortDescription: "Developed an AI-powered anomaly detection system for defect classification, achieving up to 94% accuracy. Deployed with a Flask-based web application.",
    longDescription: [
        "Developed an AI-powered anomaly detection system for defect classification in bottles and hazelnuts using ResNet-50, a deep learning model pretrained on ImageNet.",
        "Achieved 87% accuracy for bottles and 94% accuracy for hazelnuts, improving defect detection efficiency in industrial settings.",
        "Implemented data balancing techniques, improving anomaly classification by reducing bias towards normal samples.",
        "Fine-tuned model performance using Adam optimizer, early stopping, and learning rate scheduling to enhance generalization.",
        "Designed and deployed a Flask-based web application with a highly responsive UI for real-time defect classification and visualization.",
    ],
    tags: ["ResNet-50", "Flask", "AI", "Deep Learning", "PyTorch"],
    link: "https://github.com/rdnk2004/Anomaly-Det",
    institution: "Capstone Project",
    dates: "12/2024 - 03/2025"
  },
  {
    title: "Smart Academic Documentation & Result Analysis Automation",
    shortDescription: "Built a report generator automating event documentation in under 30 seconds and an Admin Panel for managing faculty workloads and analyzing results in real-time.",
    longDescription: [
      "Developed an algorithm-driven report generator, automating the creation of event documentation (workshops, field visits, masterclasses) in under 30 seconds (previously taking 1–2 hours manually).",
      "Built an Admin Panel for managing departments, faculty assignments, and workload distribution.",
      "Optimized mark-splitting operations, reducing a 2–3 hour manual process to just 1–2 minutes using efficient batch processing.",
      "Designed dedicated HOD and Faculty pages to generate real-time result analysis and structured reports with minimal input.",
      "Ensured seamless data management with structured workflows for academic record-keeping, reducing errors and improving efficiency.",
      "Implemented role-based access control to enhance security and ensure user-specific functionalities.",
      "Developed a fast and intuitive UI using Flask, enabling smooth operation and accessibility for academic users.",
    ],
    tags: ["Flask", "Automation", "Admin Panel", "Access Control"],
    link: "https://github.com/rdnk2004/College-Website",
    institution: "Kumaraguru College",
    dates: "12/2024 - 03/2025"
  },
  {
    title: "Automated Semester Marklist Processor",
    shortDescription: "Created a Streamlit app to process 1,400+ student records, cutting processing time from 2+ hours to under 2 minutes with a custom data cleaning algorithm.",
    longDescription: [
      "Designed and deployed a Streamlit-based web platform for the Controller of Examinations to process semester marklists of 1,400+ students across 14+ departments and 3 academic batches.",
      "Developed a custom algorithm to clean raw, unstructured Excel datasets, insert headers, and automatically split data departments- and batch-wise, eliminating manual intervention.",
      "Reduced data processing time from 2+ hours to under 2 minutes, with output delivered as a structured ZIP file containing formatted Excel documents.",
      "Enabled efficient data analysis and archival by producing clean, analytics-ready datasets for administrative and academic review."
    ],
    tags: ["Streamlit", "Pandas", "Data Processing", "Automation"],
    link: "https://github.com/rdnk2004/Mark-Splitting",
    institution: "Controller of Examinations (In House)",
    dates: "03/2025 - 03/2025"
  },
  {
    title: "Data-Driven Bliss: Analyzing Wellness of Yoga",
    shortDescription: "Conducted in-depth data analysis on the impact of yoga on mental and physical well-being, identifying key factors and barriers to adoption.",
    longDescription: [
      "Conducted in-depth data analysis on the impact of yoga on mental and physical well-being, focusing on both experienced practitioners and nonpractitioners.",
      "Identified key factors such as mental clarity, stress reduction, and flexibility improvements associated with regular yoga practice.",
      "Presented insights on barriers to yoga adoption, highlighting the need for tailored awareness and education programs to encourage broader participation.",
      "Demonstrated multifaceted approaches to enhancing well-being, promoting yoga as a solution while recognizing the importance of alternative wellness paths."
    ],
    tags: ["Data Analysis", "Wellness", "Yoga"],
    link: "#",
    institution: "Personal Project",
    dates: "07/2023 - 10/2023"
  },
];

export default function Projects() {
  const [openProject, setOpenProject] = useState<typeof projectData[0] | null>(null);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <SectionHeading>Projects</SectionHeading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectData.map((project, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="bg-card/70 backdrop-blur-sm border-secondary/20 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer group">
                <CardHeader>
                    <CardTitle className="text-primary">{project.title}</CardTitle>
                  <CardDescription>{project.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl bg-card/80 backdrop-blur-lg border-primary/30">
              <DialogHeader>
                <DialogTitle className="text-primary text-2xl">{project.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground pt-2">
                  <span className="font-semibold text-foreground/90">{project.institution}</span> | <span className="text-sm">{project.dates}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <ul className="list-disc list-inside space-y-2 text-foreground/90">
                  {project.longDescription.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              {project.link !== "#" && (
                <div className="flex justify-end">
                    <Button asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            View on GitHub
                        </a>
                    </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
