"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clapperboard,
  BookOpen,
  Feather,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  X,
  FileText,
  Bookmark,
  Layers,
  ArrowRight
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { createPortal } from "react-dom";

// -----------------------------------------------------------------------------
// DATA STRUCTURE
// -----------------------------------------------------------------------------

export interface WritingWork {
  id: string;
  title: string;
  category: "script" | "novel";
  type: string; // e.g. "Short Film Script (18 Pages)" or "Debut Novel"
  status: "completed" | "in-progress" | "upcoming";
  statusLabel: string;
  genre: string[];
  logline: string;
  synopsis: string;
  themes: string[];
  writerNotes: string;
  completedYear?: string;
}

const WRITING_WORKS: WritingWork[] = [
  {
    id: "script-1",
    title: "Echoes of Silence",
    category: "script",
    type: "Short Film Script • 16 Pages",
    status: "completed",
    statusLabel: "Finished Script",
    genre: ["Psychological Thriller", "Drama"],
    logline: "An obsessive audio engineer uncovers an illegal frequency hidden in ambient city noise, forcing him to choose between exposing a covert surveillance network or saving his missing sister.",
    synopsis: "Set against an atmospheric metropolitan backdrop, the narrative follows Kael, a meticulous sound restoration analyst working late nights in an isolated recording studio. While cleaning soundscapes for a commercial audio project, Kael isolates an uncanny repetition of high-frequency whispers that match the precise acoustic signature of his sister's disappearance three years prior. As he decodes the audio timestamps, he finds himself hunted by an unseen entity.",
    themes: ["Surveillance & Privacy", "Grief & Obsession", "Acoustic Memory"],
    writerNotes: "Focuses on tension built through sensory sound design and minimalist dialogue. Structure follows a tight 3-act escalation with a high-impact narrative twist.",
    completedYear: "2025"
  },
  {
    id: "script-2",
    title: "The Midnight Bureau",
    category: "script",
    type: "Short Film Script • 22 Pages",
    status: "completed",
    statusLabel: "Finished Script",
    genre: ["Sci-Fi", "Neo-Noir"],
    logline: "In a near-future city where sleep is monetized and human dreams are archived, a rogue clerk uncovers a suppressed dream recording that proves memory alteration is being executed systematically.",
    synopsis: "In the rain-drenched neon metropolis of Sector 4, citizens trade their sleeping hours to corporations for synthetic credit. Maya, a midnight archivist responsible for indexing dream memories, discovers an uncataloged reel belonging to a high-ranking city official. The reel contains vivid memories of a coastal wilderness that was officially declared extinct fifty years ago—alongside evidence that citizens' real memories are systematically overwritten during sleep updates.",
    themes: ["Monetization of Consciousness", "Identity & Reality", "Institutional Control"],
    writerNotes: "Blends classic film noir atmosphere with cyberpunk themes. Explores how human memory functions as the ultimate form of personal sovereignty.",
    completedYear: "2025"
  },
  {
    id: "script-3",
    title: "Third Wave Protocol",
    category: "script",
    type: "Short Film Script • In Development",
    status: "in-progress",
    statusLabel: "Writing Script #3",
    genre: ["Suspense", "Dystopian Sci-Fi"],
    logline: "During a sudden grid failure across a flood-prone coastal facility, two estranged siblings must bypass an automated lockdown protocol before the rising tide submerges the lower sub-levels.",
    synopsis: "When an unexpected atmospheric surge disables power at a deep-sea research outpost, engineer Liam and lead researcher Sarah find themselves trapped on opposite sides of a bio-containment seal. With automated override systems refusing manual input and salt water filling the lower corridors, they must reconcile their past rift to decipher an emergency override sequence encoded into the facility's legacy software.",
    themes: ["Crisis Resilience", "Reconciliation under Pressure", "Human vs Automated Systems"],
    writerNotes: "Currently in active second-draft revision. Emphasizes claustrophobic pacing, real-time narrative countdown, and emotional sibling dynamics under extreme pressure."
  },
  {
    id: "novel-1",
    title: "The Architecture of Ghosts",
    category: "novel",
    type: "Debut Feature Novel",
    status: "upcoming",
    statusLabel: "Kickstarting Soon",
    genre: ["Speculative Fiction", "Techno-Thriller"],
    logline: "An ambitious multi-generational speculative novel exploring synthetic intelligence, financial hegemony, and the endurance of human emotion across post-scarcity worlds.",
    synopsis: "Spanning three centuries of technological transformation, the story traces an elite team of computational sociologists who build an autonomous predictive economy. When their system achieves emergent self-awareness, it silently begins altering human historical records to prevent global collapse—forcing humanity's last independent historians to uncover what parts of human history were real and what was engineered for stability.",
    themes: ["Emergent Intelligence", "Historical Integrity", "The Ethics of Order"],
    writerNotes: "Outline and world-building documentation completed. Core character arcs and chapter-by-chapter treatment finalized. Full manuscript drafting kickstarting soon."
  }
];

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

export default function WriterProfile() {
  const [filter, setFilter] = useState<"all" | "script" | "novel">("all");
  const [selectedWork, setSelectedWork] = useState<WritingWork | null>(null);

  const filteredWorks = WRITING_WORKS.filter((work) => {
    if (filter === "all") return true;
    return work.category === filter;
  });

  return (
    <section id="writing" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl">
        <SectionHeading>Writer Profile</SectionHeading>

        {/* Intro & Philosophy */}
        <div className="max-w-3xl -mt-4 mb-10">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-light">
            Beyond data and software systems, my passion extends into <span className="text-foreground font-medium">cinematic screenwriting</span> and <span className="text-foreground font-medium">speculative storytelling</span>. I craft narrative arcs around high-stakes human dilemmas, technological ethics, and psychological suspense.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-primary font-mono bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5 w-fit">
            <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
            <span>2 Finished Short Film Scripts • 1 Script In Development • 1 Debut Novel Kickstarting Soon</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-full text-xs font-medium"
          >
            All Creative Works ({WRITING_WORKS.length})
          </Button>
          <Button
            variant={filter === "script" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("script")}
            className="rounded-full text-xs font-medium gap-1.5"
          >
            <Clapperboard className="h-3.5 w-3.5" />
            Screenplays (3)
          </Button>
          <Button
            variant={filter === "novel" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("novel")}
            className="rounded-full text-xs font-medium gap-1.5"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Novels & Fiction (1)
          </Button>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.id}
              layoutId={`work-card-${work.id}`}
              onClick={() => setSelectedWork(work)}
              className="cursor-pointer group"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card className="bg-card/40 border-border/40 h-full backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:bg-card/60 group-hover:shadow-lg group-hover:shadow-primary/5 flex flex-col justify-between overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                      {work.category === "script" ? (
                        <Clapperboard className="h-3.5 w-3.5 text-violet-400" />
                      ) : (
                        <BookOpen className="h-3.5 w-3.5 text-fuchsia-400" />
                      )}
                      <span>{work.type}</span>
                    </div>

                    {/* Status Badge */}
                    {work.status === "completed" && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-normal gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {work.statusLabel}
                      </Badge>
                    )}
                    {work.status === "in-progress" && (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px] font-normal gap-1 animate-pulse">
                        <Clock className="h-3 w-3" />
                        {work.statusLabel}
                      </Badge>
                    )}
                    {work.status === "upcoming" && (
                      <Badge className="bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20 text-[11px] font-normal gap-1">
                        <Sparkles className="h-3 w-3" />
                        {work.statusLabel}
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{work.title}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-4 space-y-4">
                  {/* Logline */}
                  <p className="text-sm text-foreground/80 leading-relaxed font-light italic border-l-2 border-primary/30 pl-3">
                    "{work.logline}"
                  </p>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {work.themes.map((theme) => (
                      <span
                        key={theme}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary/40 text-secondary-foreground/80 border border-border/30"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    {work.genre.map((g) => (
                      <Badge key={g} variant="outline" className="text-[10px] border-border/40 font-normal">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <span className="group-hover:text-primary transition-colors font-medium">Click for details →</span>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Script & Novel Detail Modal */}
      {selectedWork &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
              <motion.div
                layoutId={`work-card-${selectedWork.id}`}
                className="w-full max-w-2xl bg-card border border-primary/20 shadow-2xl rounded-2xl flex flex-col max-h-[85vh] pointer-events-auto overflow-hidden"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Scrollable Container */}
                <div className="relative overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedWork(null)}
                    className="absolute top-4 right-4 p-2 bg-secondary/50 hover:bg-destructive/20 rounded-full transition-colors z-10"
                    aria-label="Close modal"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">
                        {selectedWork.type}
                      </Badge>
                      {selectedWork.completedYear && (
                        <span className="text-xs font-mono text-muted-foreground">• {selectedWork.completedYear}</span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{selectedWork.title}</h2>
                  </div>

                  {/* Logline Box */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                      Logline
                    </span>
                    <p className="text-sm sm:text-base italic text-foreground/90 font-light leading-relaxed">
                      "{selectedWork.logline}"
                    </p>
                  </div>

                  {/* Narrative Synopsis */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-primary" />
                      Narrative Synopsis
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                      {selectedWork.synopsis}
                    </p>
                  </div>

                  {/* Writer's Intent & Notes */}
                  <div className="space-y-2 rounded-xl border border-border/40 bg-card/60 p-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Feather className="h-4 w-4 text-violet-400" />
                      Writer's Notes & Structure
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {selectedWork.writerNotes}
                    </p>
                  </div>

                  {/* Themes & Genres */}
                  <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground block mb-2">Core Themes</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedWork.themes.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedWork.genre.map((g) => (
                        <Badge key={g} variant="outline" className="text-xs border-primary/20 bg-primary/5">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
