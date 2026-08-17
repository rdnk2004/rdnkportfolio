"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BrainCircuit,
    Workflow,
    Database,
    BarChart3,
    GraduationCap,
    ChevronRight,
    CheckCircle2,
    Layers,
    ShieldCheck
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── DOMAIN ROLE DEFINITIONS ──────────────────────────────────────────────────

interface SkillCluster {
    label: string;
    items: string[];
}

interface DomainRole {
    id: string;
    name: string;
    shortTitle: string;
    icon: React.ElementType;
    badge: string;
    color: {
        accentText: string;
        borderAccent: string;
        bgActive: string;
        pillBg: string;
    };
    skills: SkillCluster[];
    principles: string[];
}

const DOMAIN_ROLES: DomainRole[] = [
    {
        id: "ml",
        name: "ML / AI Engineer",
        shortTitle: "ML / AI",
        icon: BrainCircuit,
        badge: "Predictive & Explainable AI",
        color: {
            accentText: "text-primary",
            borderAccent: "border-primary/30",
            bgActive: "bg-primary/10",
            pillBg: "bg-primary/10 text-primary border-primary/20"
        },
        skills: [
            { label: "Core ML & XAI", items: ["scikit-learn", "XGBoost", "Prophet", "SHAP", "MLflow"] },
            { label: "Deep Learning & Vision", items: ["PyTorch", "TensorFlow", "ResNet-50", "Computer Vision"] },
            { label: "Applied AI & Validation", items: ["Gemini API", "Pydantic", "Walk-Forward CV"] }
        ],
        principles: [
            "Walk-forward (expanding-window) CV benchmarked against naive baselines before trusting a result",
            "SHAP attribution used to compare model rationale against documented policy logic",
            "F1 / precision-recall evaluation in place of misleading raw accuracy metrics",
            "Transfer learning with early stopping and learning rate scheduling"
        ]
    },
    {
        id: "automation",
        name: "Automation Engineer",
        shortTitle: "Automation",
        icon: Workflow,
        badge: "Workflow Optimization",
        color: {
            accentText: "text-primary",
            borderAccent: "border-primary/30",
            bgActive: "bg-primary/10",
            pillBg: "bg-primary/10 text-primary border-primary/20"
        },
        skills: [
            { label: "Orchestration", items: ["n8n", "Docker", "Docker Compose", "GitHub Actions"] },
            { label: "Scripting & Extraction", items: ["Playwright", "Python", "Pandas", "Streamlit"] },
            { label: "Document Output", items: ["Excel & DOCX Automation", "ReportLab PDF", "FastAPI", "Gemini API"] }
        ],
        principles: [
            "Automated 15+ operational Excel reports at CAI Mahindra, cutting reporting turnaround by 97%",
            "Cleaned unstructured Excel data and auto-split it dept/batch-wise for 1,400+ student marklists",
            "Replaced ad-hoc data requests with a real-time KPI reporting tool for sales & operations",
            "Scheduled multi-source synchronization via containerized n8n workflows"
        ]
    },
    {
        id: "data-eng",
        name: "Data Engineer",
        shortTitle: "Data Eng.",
        icon: Database,
        badge: "Data Infrastructure",
        color: {
            accentText: "text-primary",
            borderAccent: "border-primary/30",
            bgActive: "bg-primary/10",
            pillBg: "bg-primary/10 text-primary border-primary/20"
        },
        skills: [
            { label: "Storage & Migrations", items: ["PostgreSQL", "SQLAlchemy (Async)", "Alembic", "asyncpg"] },
            { label: "Validation & Ingestion", items: ["pandera", "Pydantic", "Playwright", "Docker"] },
            { label: "Orchestration & Serving", items: ["n8n", "FastAPI", "GitHub Actions"] }
        ],
        principles: [
            "Schema-enforced data contracts (pandera) that isolate ingestion errors instead of hiding them",
            "Async, connection-pooled Postgres pipelines with version-controlled Alembic migrations",
            "Headless Playwright extraction from JS-rendered sources into structured datasets",
            "Multi-source sync (GitHub, ATS boards, LinkedIn) orchestrated through containerized n8n workflows"
        ]
    },
    {
        id: "data-analyst",
        name: "Data Analyst",
        shortTitle: "Data Analysis",
        icon: BarChart3,
        badge: "Statistical Rigor",
        color: {
            accentText: "text-primary",
            borderAccent: "border-primary/30",
            bgActive: "bg-primary/10",
            pillBg: "bg-primary/10 text-primary border-primary/20"
        },
        skills: [
            { label: "Languages & Querying", items: ["Python", "SQL", "R", "pandas", "NumPy"] },
            { label: "Statistics & Econometrics", items: ["statsmodels", "ADF / STL Tests", "Bootstrap CIs", "Granger Causality"] },
            { label: "Visualization & EDA", items: ["Streamlit", "Matplotlib", "Seaborn", "Exploratory Analysis"] }
        ],
        principles: [
            "Stationarity testing (ADF + differencing) to catch spurious causality before reporting it",
            "Bootstrap confidence intervals and breach probabilities in place of bare point forecasts",
            "Fixed-effects panel econometric modeling across entity-year groups",
            "Built dealership-level conversion metrics from a raw sales funnel at CAI Mahindra"
        ]
    },
    {
        id: "mentor",
        name: "Mentor & Team Lead",
        shortTitle: "Mentorship",
        icon: GraduationCap,
        badge: "Leadership & Culture",
        color: {
            accentText: "text-primary",
            borderAccent: "border-primary/30",
            bgActive: "bg-primary/10",
            pillBg: "bg-primary/10 text-primary border-primary/20"
        },
        skills: [
            { label: "Team Leadership", items: ["Hackathon Team Leadership", "Event Ideation & Judging", "Cross-Functional Coordination"] },
            { label: "Mentorship & Coaching", items: ["Peer Mentoring", "Excel & Tooling Coaching", "Onboarding Juniors"] },
            { label: "Delivery & Rollouts", items: ["Academic Platform Development", "Stakeholder Alignment", "Faculty & Admin Rollouts"] }
        ],
        principles: [
            "Led 5+ hackathon teams from ideation through technical delivery under time pressure",
            "Mentored 30+ peers on advanced Excel and engineering tooling",
            "Organized and judged 4+ campus events and ideathons",
            "Drove adoption of an academic automation platform across faculty and administrative staff"
        ]
    }
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Skills() {
    const [selectedRoleId, setSelectedRoleId] = useState<string>("ml");
    const activeDomain = DOMAIN_ROLES.find((r) => r.id === selectedRoleId) || DOMAIN_ROLES[0];

    return (
        <section id="skills" className="py-14 sm:py-16 relative">
            <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl">
                <SectionHeading className="mb-8">Competencies & Impact</SectionHeading>

                {/* ── MOBILE VIEW: HORIZONTAL SCROLLABLE CHIP BAR (lg:hidden) ── */}
                <div className="block lg:hidden mb-5">
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-md overflow-x-auto no-scrollbar">
                        {DOMAIN_ROLES.map((role) => {
                            const Icon = role.icon;
                            const isSelected = role.id === selectedRoleId;

                            return (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRoleId(role.id)}
                                    className={cn(
                                        "relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors duration-200 select-none",
                                        isSelected
                                            ? "text-foreground font-semibold"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                                    )}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="mobileActivePill"
                                            className={cn("absolute inset-0 rounded-xl", role.color.bgActive, "border", role.color.borderAccent)}
                                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <Icon size={14} className={isSelected ? role.color.accentText : "text-muted-foreground"} />
                                        <span>{role.shortTitle}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── DESKTOP & DETAIL CONTAINER ──────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    
                    {/* DESKTOP LEFT: COMPACT ROLE SELECTOR ROWS (4 COLS) */}
                    <div className="hidden lg:flex lg:col-span-4 flex-col gap-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 pb-1 flex items-center justify-between">
                            <span>Core Domains</span>
                            <span className="text-muted-foreground/60">{DOMAIN_ROLES.length} Roles</span>
                        </div>

                        {DOMAIN_ROLES.map((role) => {
                            const Icon = role.icon;
                            const isSelected = role.id === selectedRoleId;

                            return (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRoleId(role.id)}
                                    className={cn(
                                        "group relative w-full text-left rounded-2xl p-3 transition-all duration-200 border flex items-center justify-between overflow-hidden",
                                        isSelected
                                            ? cn("border-primary/30 shadow-sm bg-card/90 dark:bg-primary/10", role.color.borderAccent)
                                            : "bg-card/50 dark:bg-card/20 border-border/40 dark:border-border/25 hover:bg-card/80 dark:hover:bg-card/40 hover:border-border/60"
                                    )}
                                >
                                    {/* Left Floating Accent Indicator on Selected */}
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activeRowBar"
                                            className="absolute left-1.5 top-2.5 bottom-2.5 w-1 rounded-full bg-primary"
                                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        />
                                    )}

                                    <div className="flex items-center gap-3 pl-2.5">
                                        <div
                                            className={cn(
                                                "p-2 rounded-lg border transition-colors shrink-0",
                                                isSelected
                                                    ? cn("bg-background border-primary/30 text-primary shadow-sm", role.color.accentText)
                                                    : "bg-muted/40 dark:bg-background/40 border-border/40 text-muted-foreground group-hover:text-foreground group-hover:bg-background/70"
                                            )}
                                        >
                                            <Icon size={16} />
                                        </div>

                                        <div>
                                            <h4 className={cn(
                                                "text-sm font-semibold transition-colors leading-tight",
                                                isSelected ? "text-foreground font-bold" : "text-foreground/85 group-hover:text-foreground"
                                            )}>
                                                {role.name}
                                            </h4>
                                            <span className="text-xs text-muted-foreground font-light line-clamp-1 mt-0.5">
                                                {role.badge}
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={15}
                                        className={cn(
                                            "transition-transform duration-200 shrink-0 pr-1",
                                            isSelected ? "translate-x-0.5 text-primary opacity-100" : "text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 opacity-60"
                                        )}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT: SLIDING DETAIL STAGE (8 COLS ON DESKTOP, FULL WIDTH ON MOBILE) */}
                    <div className="w-full lg:col-span-8 flex">
                        <div className="relative w-full rounded-3xl border border-border/40 dark:border-border/25 bg-card/60 dark:bg-card/25 backdrop-blur-md overflow-hidden flex flex-col justify-between">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDomain.id}
                                    initial={{ opacity: 0, x: -18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 18 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1 gap-5"
                                >
                                    {/* ── HEADER: DOMAIN TITLE ── */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/40">
                                        <h3 className="text-xl sm:text-2xl font-headline font-bold text-foreground">
                                            {activeDomain.name}
                                        </h3>

                                        <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full border shrink-0", activeDomain.color.pillBg)}>
                                            {activeDomain.badge}
                                        </span>
                                    </div>

                                    {/* ── BODY: SIDE-BY-SIDE SPLIT (TOOLS + PRINCIPLES) ── */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                                        
                                        {/* Left: Technical Arsenal (5 cols) */}
                                        <div className="md:col-span-5 space-y-2.5">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                <Layers size={13} className={activeDomain.color.accentText} />
                                                <span>Technical Arsenal</span>
                                            </div>

                                            <div className="space-y-2">
                                                {activeDomain.skills.map((cluster) => (
                                                    <div
                                                        key={cluster.label}
                                                        className="rounded-xl border border-border/60 bg-card/60 dark:bg-background/40 p-2.5 sm:p-3 transition-colors hover:bg-card/90 dark:hover:bg-background/70 hover:border-border/80"
                                                    >
                                                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 block">
                                                             {cluster.label}
                                                        </span>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {cluster.items.map((tool) => (
                                                                <Badge
                                                                    key={tool}
                                                                    variant="outline"
                                                                    className="px-2.5 py-0.5 text-xs font-medium bg-muted/60 text-foreground border-border/60 dark:bg-secondary/15 dark:text-foreground dark:border-border/40 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                                                                >
                                                                    {tool}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Engineering Principles (7 cols) */}
                                        <div className="md:col-span-7 space-y-2.5">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                <ShieldCheck size={13} className={activeDomain.color.accentText} />
                                                <span>{activeDomain.id === "mentor" ? "Track Record & Outcomes" : "Engineering Principles"}</span>
                                            </div>

                                            <div className="space-y-2">
                                                {activeDomain.principles.map((principle, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="group flex items-start gap-2.5 rounded-xl border border-border/60 bg-card/60 dark:bg-background/40 p-2.5 sm:p-3 text-xs sm:text-[13px] text-foreground transition-all hover:border-primary/30 hover:bg-card/90 dark:hover:bg-background/80 hover:shadow-sm"
                                                    >
                                                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5 group-hover:scale-110 transition-transform">
                                                            <CheckCircle2 size={11} />
                                                        </div>
                                                        <span className="leading-relaxed font-light">
                                                            {principle}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}