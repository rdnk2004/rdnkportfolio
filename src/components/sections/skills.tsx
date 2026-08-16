"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BrainCircuit,
    Workflow,
    Database,
    BarChart3,
    GraduationCap,
    Sparkles,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2,
    Users,
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
    roleNumber: string;
    icon: React.ElementType;
    badge: string;
    tagline: string;
    color: {
        accentText: string;
        borderAccent: string;
        bgActive: string;
        pillBg: string;
        glow: string;
    };
    skills: SkillCluster[];
    principles: string[];
    proof: string;
}

const DOMAIN_ROLES: DomainRole[] = [
    {
        id: "ml",
        name: "ML / AI Engineer",
        roleNumber: "01",
        icon: BrainCircuit,
        badge: "Predictive & Explainable AI",
        tagline: "Validated machine learning pipelines with explainability and strict evaluation",
        color: {
            accentText: "text-violet-400 dark:text-violet-400",
            borderAccent: "border-violet-500/40",
            bgActive: "bg-violet-500/10 dark:bg-violet-500/15",
            pillBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
            glow: "from-violet-500/20 via-violet-500/5 to-transparent"
        },
        skills: [
            { label: "Core ML & XAI", items: ["scikit-learn", "XGBoost", "Prophet", "SHAP", "MLflow"] },
            { label: "Deep Learning & Vision", items: ["PyTorch", "TensorFlow", "ResNet-50", "Computer Vision"] },
            { label: "Applied AI & Validation", items: ["Gemini API", "Claude API", "Pydantic", "Walk-Forward CV"] }
        ],
        principles: [
            "Walk-forward (expanding-window) CV benchmarked against naive baselines before trusting a result",
            "SHAP attribution used to compare model rationale against documented policy logic",
            "F1 / precision-recall evaluation in place of misleading raw accuracy metrics",
            "Transfer learning with early stopping and learning rate scheduling"
        ],
        proof: "NPA Early Warning System · Industrial Defect Classifier · CPI-MPC"
    },
    {
        id: "automation",
        name: "Automation Engineer",
        roleNumber: "02",
        icon: Workflow,
        badge: "Workflow Optimization",
        tagline: "Finding the manual bottleneck, quantifying the time loss, and killing it",
        color: {
            accentText: "text-emerald-400 dark:text-emerald-400",
            borderAccent: "border-emerald-500/40",
            bgActive: "bg-emerald-500/10 dark:bg-emerald-500/15",
            pillBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
            glow: "from-emerald-500/20 via-emerald-500/5 to-transparent"
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
        ],
        proof: "CAI Mahindra Automation · Marklist Processor (2hrs → 2min) · Career OS"
    },
    {
        id: "data-eng",
        name: "Data Engineer",
        roleNumber: "03",
        icon: Database,
        badge: "Data Infrastructure",
        tagline: "Pipelines that reject bad data at ingestion instead of failing downstream",
        color: {
            accentText: "text-cyan-400 dark:text-cyan-400",
            borderAccent: "border-cyan-500/40",
            bgActive: "bg-cyan-500/10 dark:bg-cyan-500/15",
            pillBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
            glow: "from-cyan-500/20 via-cyan-500/5 to-transparent"
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
        ],
        proof: "CPI-MPC Data Pipeline · Career OS Multi-Source Sync"
    },
    {
        id: "data-analyst",
        name: "Data Analyst",
        roleNumber: "04",
        icon: BarChart3,
        badge: "Statistical Rigor",
        tagline: "Statistical rigor over surface correlations — extracting verified signals from raw data",
        color: {
            accentText: "text-sky-400 dark:text-sky-400",
            borderAccent: "border-sky-500/40",
            bgActive: "bg-sky-500/10 dark:bg-sky-500/15",
            pillBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
            glow: "from-sky-500/20 via-sky-500/5 to-transparent"
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
        ],
        proof: "CPI-MPC Analytics · NPA Early Warning System · CAI Mahindra ETBR Funnel"
    },
    {
        id: "mentor",
        name: "Mentor & Team Lead",
        roleNumber: "05",
        icon: GraduationCap,
        badge: "Leadership & Culture",
        tagline: "Building people and pipelines at the same time",
        color: {
            accentText: "text-rose-400 dark:text-rose-400",
            borderAccent: "border-rose-500/40",
            bgActive: "bg-rose-500/10 dark:bg-rose-500/15",
            pillBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
            glow: "from-rose-500/20 via-rose-500/5 to-transparent"
        },
        skills: [
            { label: "Team Leadership", items: ["Hackathon Team Leadership", "Event Ideation & Judging", "Cross-Functional Coordination"] },
            { label: "Mentorship & Coaching", items: ["Peer Mentoring", "Excel & Engineering Tooling Coaching", "Onboarding Juniors"] },
            { label: "Delivery & Rollouts", items: ["Academic Platform Development", "Stakeholder Alignment", "Faculty & Admin Rollouts"] }
        ],
        principles: [
            "Led 5+ hackathon teams from ideation through technical delivery under time pressure",
            "Mentored 30+ peers on advanced Excel and engineering tooling",
            "Organized and judged 4+ campus events and ideathons",
            "Drove adoption of an academic automation platform across faculty and administrative staff"
        ],
        proof: "5+ Hackathons Led · 30+ Peers Mentored · Academic Platform Led"
    }
];

const LEADERSHIP_METRICS = [
    { value: "5+", label: "Hackathons Led", detail: "Technical direction & delivery" },
    { value: "1", label: "Academic Platform Led", detail: "Core developer for university-wide system" },
    { value: "30+", label: "Peers Mentored", detail: "Advanced Excel & engineering tooling" },
    { value: "4+", label: "Tech Events Organized", detail: "Ideathons judged & competitions led" }
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Skills() {
    const [selectedRoleId, setSelectedRoleId] = useState<string>("ml");
    const activeDomain = DOMAIN_ROLES.find((r) => r.id === selectedRoleId) || DOMAIN_ROLES[0];
    const ActiveIcon = activeDomain.icon;

    return (
        <section id="skills" className="py-16 sm:py-20 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl">
                <SectionHeading>Competencies & Impact</SectionHeading>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center text-muted-foreground -mt-2 mb-12 text-base sm:text-lg leading-relaxed font-light"
                >
                    Click any domain row to slide through the technical arsenal, applied principles, and verified track record.
                </motion.p>

                {/* ── FLUID HORIZONTAL MASTER-DETAIL INTERFACE ─────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-14">
                    
                    {/* LEFT: HORIZONTAL ROLE ROWS (4 COLS) */}
                    <div className="lg:col-span-4 flex flex-col gap-2.5">
                        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-1 pl-1 flex items-center justify-between">
                            <span>Core Domains</span>
                            <span>{DOMAIN_ROLES.length} Roles</span>
                        </div>

                        {DOMAIN_ROLES.map((role) => {
                            const Icon = role.icon;
                            const isSelected = role.id === selectedRoleId;

                            return (
                                <motion.button
                                    key={role.id}
                                    onClick={() => setSelectedRoleId(role.id)}
                                    whileHover={{ x: 3 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={cn(
                                        "group relative w-full text-left rounded-2xl p-4 transition-all duration-200 border flex items-center justify-between overflow-hidden",
                                        isSelected
                                            ? cn("border-border shadow-lg", role.color.bgActive, role.color.borderAccent)
                                            : "bg-card/30 border-border/40 hover:bg-card/60 hover:border-border/60"
                                    )}
                                >
                                    {/* Left Accent Bar on Selected */}
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activeRowBar"
                                            className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"
                                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        />
                                    )}

                                    <div className="flex items-center gap-3.5 pl-1.5">
                                        <div
                                            className={cn(
                                                "p-2.5 rounded-xl border transition-colors shrink-0",
                                                isSelected
                                                    ? cn("bg-background/80", role.color.borderAccent, role.color.accentText)
                                                    : "bg-background/40 border-border/40 text-muted-foreground group-hover:text-foreground group-hover:bg-background/70"
                                            )}
                                        >
                                            <Icon size={18} />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-mono text-muted-foreground/70">
                                                    {role.roleNumber}
                                                </span>
                                                <h4 className={cn(
                                                    "text-sm font-semibold transition-colors leading-tight",
                                                    isSelected ? "text-foreground font-bold" : "text-foreground/80 group-hover:text-foreground"
                                                )}>
                                                    {role.name}
                                                </h4>
                                            </div>
                                            <span className="text-[11px] text-muted-foreground font-light line-clamp-1 mt-0.5">
                                                {role.badge}
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={16}
                                        className={cn(
                                            "transition-transform duration-200 shrink-0",
                                            isSelected ? "translate-x-0.5 text-primary opacity-100" : "text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 opacity-60"
                                        )}
                                    />
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* RIGHT: SLIDING DETAIL STAGE (8 COLS) */}
                    <div className="lg:col-span-8">
                        <div className="relative rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl shadow-black/5 overflow-hidden min-h-[500px]">
                            {/* Ambient Top Glow Line */}
                            <div className={cn("h-1 w-full bg-gradient-to-r", activeDomain.color.glow)} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDomain.id}
                                    initial={{ opacity: 0, x: -25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 25 }}
                                    transition={{ duration: 0.24, ease: "easeOut" }}
                                    className="p-6 sm:p-8 space-y-8"
                                >
                                    {/* ── ROW 1: HEADER & DELIVERABLE PROOF ── */}
                                    <div className="space-y-3 pb-6 border-b border-border/40">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className={cn("p-2 rounded-lg border bg-background/60", activeDomain.color.borderAccent, activeDomain.color.accentText)}>
                                                    <ActiveIcon size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Domain {activeDomain.roleNumber}</span>
                                                    <h3 className="text-xl sm:text-2xl font-headline font-bold text-foreground">
                                                        {activeDomain.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <span className={cn("text-xs font-mono font-medium px-3 py-1 rounded-full border", activeDomain.color.pillBg)}>
                                                {activeDomain.badge}
                                            </span>
                                        </div>

                                        <p className="text-base sm:text-lg font-headline italic text-foreground/90 leading-relaxed pt-1">
                                            &ldquo;{activeDomain.tagline}&rdquo;
                                        </p>

                                        {/* Proof Pill */}
                                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background/60 border border-border/40 text-xs text-muted-foreground">
                                            <Sparkles size={13} className={cn("shrink-0", activeDomain.color.accentText)} />
                                            <span>
                                                Verified in: <strong className="text-foreground font-semibold">{activeDomain.proof}</strong>
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── ROW 2: TECHNICAL ARSENAL (FULL WIDTH ROW FLOW) ── */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                                            <Layers size={14} className={activeDomain.color.accentText} />
                                            <span>Technical Arsenal & Tooling</span>
                                        </div>

                                        <div className="space-y-3">
                                            {activeDomain.skills.map((cluster) => (
                                                <div
                                                    key={cluster.label}
                                                    className="rounded-2xl border border-border/40 bg-background/40 p-4 transition-colors hover:bg-background/70 hover:border-border/60"
                                                >
                                                    <div className="text-[11px] font-mono text-muted-foreground mb-2 flex items-center justify-between font-medium">
                                                        <span className="uppercase tracking-wider">{cluster.label}</span>
                                                        <span className="text-[10px] text-muted-foreground/60">{cluster.items.length} tools</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {cluster.items.map((tool) => (
                                                            <Badge
                                                                key={tool}
                                                                variant="secondary"
                                                                className="px-2.5 py-1 text-xs font-normal bg-secondary/40 text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                                                            >
                                                                {tool}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ── ROW 3: PRINCIPLES & METHODOLOGY (FULL WIDTH ROW FLOW) ── */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                                            <ShieldCheck size={14} className={activeDomain.color.accentText} />
                                            <span>{activeDomain.id === "mentor" ? "Track Record & Outcomes" : "Engineering Principles & Execution"}</span>
                                        </div>

                                        <div className="space-y-2.5">
                                            {activeDomain.principles.map((principle, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group flex items-start gap-3.5 rounded-2xl border border-border/40 bg-background/40 p-4 text-xs sm:text-sm text-foreground/90 transition-all hover:border-primary/30 hover:bg-background/80 hover:shadow-sm"
                                                >
                                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5 group-hover:scale-110 transition-transform">
                                                        <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                                                    </div>
                                                    <span className="leading-relaxed font-light">
                                                        {principle}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* ── 3. LEADERSHIP & INITIATIVE METRICS STRIP ─────────────────── */}
                <div className="border-t border-border/40 pt-10">
                    <div className="flex items-center gap-2 mb-6">
                        <Users size={16} className="text-primary" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
                            Leadership & Initiative Metrics
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {LEADERSHIP_METRICS.map((metric, idx) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.08 }}
                                className="group flex flex-col justify-between rounded-2xl border border-border/40 bg-card/25 p-5 hover:bg-card/50 hover:border-border/70 transition-all duration-300 backdrop-blur-sm"
                            >
                                <span className="block text-3xl sm:text-4xl font-headline font-bold text-primary tabular-nums tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">
                                    {metric.value}
                                </span>
                                <div>
                                    <span className="block text-xs sm:text-sm font-bold text-foreground mb-1 leading-snug">
                                        {metric.label}
                                    </span>
                                    <span className="block text-[11px] text-muted-foreground font-light leading-relaxed">
                                        {metric.detail}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}