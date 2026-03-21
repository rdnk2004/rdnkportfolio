"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
    Terminal,
    Database,
    BrainCircuit,
    Server,
    GitBranch,
    Users,
    Cpu
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// DATA STRUCTURE
// -----------------------------------------------------------------------------

const CORE_ROLES = [
    {
        name: "Automation Engineer",
        detail: "Designing end-to-end systems that eliminate repetitive manual workflows",
        primary: true
    },
    {
        name: "Data Analyst",
        detail: "Transforming raw data into insights through structured analysis and reporting",
        primary: true
    },
    {
        name: "ML / AI Engineer",
        detail: "Building applied machine learning pipelines with real-world datasets",
        primary: true
    },
    {
        name: "Backend Engineer",
        detail: "APIs, authentication, and system logic powering automation and data products",
        primary: false
    }
];

const TECH_CATEGORIES = [
    {
        id: "languages",
        title: "Languages",
        icon: Terminal,
        skills: ["Python", "JavaScript", "R", "SQL", "HTML / CSS"],
    },
    {
        id: "ml",
        title: "Machine Learning & Data",
        icon: BrainCircuit,
        skills: [
            "PyTorch",
            "TensorFlow",
            "scikit-learn",
            "Pandas",
            "NumPy",
            "Streamlit",
            "Hugging Face"
        ],
    },
    {
        id: "backend",
        title: "Web & Databases",
        icon: Server,
        skills: [
            "FastAPI",
            "Flask",
            "Django",
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "MongoDB"
        ],
    },
    {
        id: "devops",
        title: "Cloud & DevOps",
        icon: GitBranch,
        skills: ["Git", "Docker", "Nginx"],
    },
];

const ENGINEERING_CAPABILITIES = [
    "REST API Design",
    "JWT Authentication",
    "Role-Based Access Control",
    "Business Rule Enforcement",
    "Activity Logging",
    "Data Cleaning & ETL Pipelines",
    "Workflow Automation",
];

const LEADERSHIP_IMPACT = [
    {
        metric: "5+",
        title: "Hackathons Led",
        detail: "Owned technical direction and delivery"
    },
    {
        metric: "1",
        title: "Academic System Led",
        detail: "Core developer for college automation platform"
    },
    {
        metric: "30+",
        title: "Peers Mentored",
        detail: "Guided students in Advanced Excel and tooling"
    },
    {
        metric: "4+",
        title: "Events Organized",
        detail: "Led ideathons and judged tech competitions"
    }
];

// -----------------------------------------------------------------------------
// COMPONENTS
// -----------------------------------------------------------------------------

const MotionDiv = motion.div;

const RoleCard = ({ name, detail, primary, index }: { name: string; detail: string; primary: boolean; index: number }) => (
    <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={cn(
            "group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500",
            primary
                ? "border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                : "border-border/40 bg-card/40 hover:border-border/60 hover:bg-card/60 hover:-translate-y-1"
        )}
    >
        {/* Subtle Gradient Glow */}
        {primary && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}

        <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
                <h3 className={cn(
                    "text-lg font-bold tracking-tight mb-2 transition-colors",
                    primary ? "text-foreground group-hover:text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                    {name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {detail}
                </p>
            </div>
        </div>
    </MotionDiv>
);

const TechCategory = ({ title, icon: Icon, skills, index }: { title: string; icon: React.ElementType; skills: string[]; index: number }) => (
    <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
        className="flex flex-col space-y-4 rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm hover:bg-card/50 transition-colors hover:border-border/60"
    >
        <div className="flex items-center gap-3 border-b border-border/40 pb-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Icon size={18} />
            </div>
            <h4 className="text-base font-semibold tracking-wide text-foreground">{title}</h4>
        </div>

        <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
                <Badge
                    key={skill}
                    variant="secondary"
                    className="px-2.5 py-1 font-medium bg-secondary/40 text-secondary-foreground/80 hover:bg-secondary/60 hover:text-secondary-foreground transition-colors cursor-default border-transparent hover:border-border/50"
                >
                    {skill}
                </Badge>
            ))}
        </div>
    </MotionDiv>
);

const CapabilityPill = ({ text, index }: { text: string; index: number }) => (
    <MotionDiv
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 + (index * 0.05) }}
        className="px-3 py-1.5 rounded-full border border-border/40 bg-background/50 text-xs text-muted-foreground font-medium hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
    >
        {text}
    </MotionDiv>
);

const LeadershipCard = ({ metric, title, detail, index }: { metric: string; title: string; detail: string; index: number }) => (
    <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
        className="flex flex-col gap-2 rounded-2xl border border-border/30 bg-card/20 p-5 hover:bg-card/40 transition-colors backdrop-blur-sm"
    >
        <span className="text-4xl sm:text-5xl font-headline font-bold text-primary/90 tabular-nums tracking-tight">
            {metric}
        </span>
        <div>
            <span className="block text-sm font-bold text-foreground mb-1">{title}</span>
            <span className="text-xs text-muted-foreground leading-snug block font-light">{detail}</span>
        </div>
    </MotionDiv>
);

// -----------------------------------------------------------------------------
// MAIN SECTION
// -----------------------------------------------------------------------------

export default function Skills() {
    const containerRef = useRef(null);

    return (
        <section id="skills" className="py-16 relative overflow-hidden">
            {/* Subtle decorative background gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-30 pointer-events-none" />

            {/* Icon Decoration */}
            <div className="absolute top-10 right-10 p-12 opacity-[0.03] pointer-events-none select-none rotate-12">
                <Cpu size={300} />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl" ref={containerRef}>
                <SectionHeading>Competencies & Impact</SectionHeading>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl text-muted-foreground -mt-4 mb-12 text-lg leading-relaxed font-light"
                >
                    My engineering approach is defined by <span className="text-foreground font-medium">automation</span>,
                    <span className="text-foreground font-medium"> data-driven decisions</span>, and
                    <span className="text-foreground font-medium"> measurable impact</span>.
                </motion.p>

                {/* 1. IDENTITY: Target Roles */}
                <div className="mb-14">
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 pl-1 flex items-center gap-2"
                    >
                        <span className="w-8 h-[1px] bg-primary/50 inline-block" />
                        Core Roles
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CORE_ROLES.map((role, idx) => (
                            <RoleCard key={role.name} {...role} index={idx} />
                        ))}
                    </div>
                </div>

                {/* 2. TOOLBOX: Technical Skills */}
                <div className="mb-14">
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 pl-1 flex items-center gap-2"
                    >
                        <span className="w-8 h-[1px] bg-primary/50 inline-block" />
                        Technical Arsenal
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TECH_CATEGORIES.map((cat, idx) => (
                            <TechCategory key={cat.id} {...cat} index={idx} />
                        ))}
                    </div>
                </div>

                {/* 3. METHODOLOGY + PROOF: Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 border-t border-border/40 pt-12">

                    {/* Methodology (Left - 4 cols) */}
                    <div className="col-span-1 lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <BrainCircuit size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Engineering Principles</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-light">
                            Practical concepts I apply to build robust, scalable, and maintainable systems.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {ENGINEERING_CAPABILITIES.map((cap, idx) => (
                                <CapabilityPill key={cap} text={cap} index={idx} />
                            ))}
                        </div>
                    </div>

                    {/* Proof (Right - 8 cols) */}
                    <div className="col-span-1 lg:col-span-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Users size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">Leadership Metrics</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {LEADERSHIP_IMPACT.map((item, idx) => (
                                <LeadershipCard key={item.title} {...item} index={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
