"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Terminal,
    Database,
    Workflow,
    BrainCircuit,
    Server,
    GitBranch,
    Cpu
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

// --- Data Structure ---

const PRIMARY_SKILLS = [
    { name: "Python", detail: "Automation & Data Processing" },
    { name: "Excel Automation", detail: "VBA & Macros" },
    { name: "Workflow Automation", detail: "End-to-End Pipelines" },
    { name: "Data Cleaning", detail: "Transformation & ETL" },
    { name: "Reporting Pipelines", detail: "Automated Insights" },
];

const SECONDARY_CATEGORIES = [
    {
        id: "backend",
        title: "Backend & Systems",
        icon: Server,
        skills: ["Django", "Flask", "FastAPI", "Node.js (Express)", "REST APIs", "RBAC"],
    },
    {
        id: "data",
        title: "Data & ML",
        icon: BrainCircuit,
        skills: ["Pandas", "NumPy", "Data Visualization", "Applied ML", "Computer Vision", "Deep Learning (ResNet-50)"],
    },
    {
        id: "database",
        title: "Databases",
        icon: Database,
        skills: ["MongoDB", "MySQL", "Oracle Database"],
    },
    {
        id: "tools",
        title: "Tools & Dev",
        icon: GitBranch,
        skills: ["Git & GitHub", "Streamlit", "Jupyter", "DOCX Processing", "Advanced Excel"],
    },
];

const STRENGTHS = [
    "System Thinking",
    "Problem Decomposition",
    "Technical Leadership",
    "Mentorship",
];

// --- Components ---

const PrimarySkillCard = ({ name, detail, index }: { name: string; detail: string; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative z-10">
            <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground font-mono">
                {detail}
            </p>
        </div>
    </motion.div>
);

const SecondaryCategory = ({ title, icon: Icon, skills, delay }: { title: string; icon: any; skills: string[]; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col space-y-4 rounded-xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
    >
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-md bg-muted text-primary">
                <Icon size={20} />
            </div>
            <h4 className="text-lg font-medium tracking-wide text-foreground">{title}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
                <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary/15 text-secondary dark:text-secondary-foreground/90 border border-secondary/20 hover:bg-secondary/25 transition-colors cursor-default"
                >
                    {skill}
                </span>
            ))}
        </div>
    </motion.div>
);

const StrengthItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3 group">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
        <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {text}
        </span>
    </div>
);

// --- Main Section ---

export default function Skills() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-16 sm:py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none">
                <Cpu size={400} />
            </div>

            <div className="container px-4 md:px-6 relative z-10" ref={containerRef}>
                <SectionHeading>Technical Expertise</SectionHeading>

                <p className="max-w-2xl text-muted-foreground mt-4 mb-8 text-lg">
                    Building scalable automation systems and robust data pipelines.
                    Focusing on clarity, efficiency, and impact.
                </p>

                {/* Primary Skills - High Visual Weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                    {PRIMARY_SKILLS.map((skill, idx) => (
                        <PrimarySkillCard
                            key={skill.name}
                            index={idx}
                            name={skill.name}
                            detail={skill.detail}
                        />
                    ))}

                    {/* Conceptual 'System' Block to fill the grid if needed, or keeping it as is */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="hidden lg:flex items-center justify-center p-6 rounded-lg border border-dashed border-border/50 text-muted-foreground/50"
                    >
                        <span className="text-sm font-mono tracking-widest uppercase">System Architecture</span>
                    </motion.div>
                </div>

                {/* Secondary Categories - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
                    {SECONDARY_CATEGORIES.map((cat, idx) => (
                        <SecondaryCategory
                            key={cat.id}
                            title={cat.title}
                            icon={cat.icon}
                            skills={cat.skills}
                            delay={0.2 + idx * 0.1}
                        />
                    ))}
                </div>

                {/* Professional Strengths - Calm Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-border pt-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-3 text-primary/80">
                            <Terminal size={24} />
                            <h4 className="text-xl font-headline font-semibold">Professional DNA</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4">
                            {STRENGTHS.map((strength) => (
                                <StrengthItem key={strength} text={strength} />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
