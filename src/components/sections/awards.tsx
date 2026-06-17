"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog";
import { Maximize2 } from "lucide-react";

const awardsData = [
  {
    name: "University 3rd Rank",
    institution: "Bharathiar University",
    date: "October 2025",
    note: "Awarded for academic excellence across the university",
    image: "/awards/SRI_0178.jpeg",
    imageProps: {
      sizes: "100vw",
      style: { objectPosition: "center 30%" }
    }
  },
  {
    name: "Mahatma Gandhi Merit Scholarship (3× Recipient)",
    institution: "Kumaraguru Institutions",
    date: "2024 – 2025",
    note: "Awarded multiple times for consistent academic performance",
    image: "/awards/mahatma-gandhi-scholarship.jpeg",
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_gratitude-scholarship-mahatmagandhimeritscholarship-activity-7312838333280227328-C92W",
    linkText: "Context behind this recognition →",
    imageProps: {
      sizes: "100vw", // Force browser to fetch the largest variant regardless of container size
      style: { objectPosition: "center 30%" } // Adjust focus if needed
    }
  },
  {
    name: "Champ of Data Science",
    institution: "Kumaraguru College of Liberal Arts and Science",
    date: "March 2025",
    note: "Recognized for outstanding performance and contribution in Data Science",
    image: "/awards/champ-of-data-science.jpeg",
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_gratitude-collegejourney-activity-7336019282243239937-RKZf",
    linkText: "Moment behind this recognition →",
    imageProps: {
      sizes: "100vw",
      style: { objectPosition: "center 30%" }
    }
  },
];

export default function Awards() {
  return (
    <section id="awards" className="py-6 sm:py-8 lg:py-10">
      <SectionHeading>Honors & Recognition</SectionHeading>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col gap-6 max-w-5xl mx-auto"
      >
        {awardsData.map((award, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Split Layout Container */}
              <div className={`flex flex-col-reverse ${award.image ? 'md:grid md:grid-cols-5' : ''}`}>

                {/* Text Section (Left / Full Width) */}
                <div className={`p-6 flex flex-col justify-center ${award.image ? 'md:col-span-3' : 'w-full'}`}>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {award.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 space-y-4 text-sm text-muted-foreground">
                    <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1">
                      <span className="font-medium text-foreground/80">Institution:</span>
                      <span>{award.institution}</span>

                      <span className="font-medium text-foreground/80">Period:</span>
                      <span>{award.date}</span>
                    </div>

                    {award.note && (
                      <div className="pt-3 border-t border-border/30">
                        <p className="italic leading-relaxed text-foreground/80">
                          "{award.note}"
                        </p>
                      </div>
                    )}

                    {/* Contextual LinkedIn Link */}
                    {/* @ts-ignore */}
                    {award.link && (
                      <div className="pt-4">
                        <a
                          href={award.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                        >
                          {award.linkText}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </div>

                {/* Image Section (Right Side) - Only if image exists */}
                {award.image && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="relative h-48 md:h-auto md:col-span-2 overflow-hidden border-b md:border-b-0 md:border-l border-white/10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 text-left cursor-zoom-in group/img w-full">
                        <Image
                          src={award.image}
                          alt={award.name}
                          fill
                          loading="lazy"
                          sizes={award.imageProps?.sizes || "(max-width: 768px) 100vw, 40vw"}
                          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                          style={award.imageProps?.style}
                        />
                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/img:bg-black/35 flex items-center justify-center">
                          <div className="opacity-0 scale-90 transition-all duration-300 group-hover/img:opacity-100 group-hover/img:scale-100 p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 shadow-lg">
                            <Maximize2 className="h-5 w-5" />
                          </div>
                        </div>
                        {/* Very subtle inner shadow for depth */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-[95vw] md:w-[85vw] border-none bg-black/95 p-0 overflow-hidden sm:rounded-lg">
                      <DialogTitle className="sr-only">{award.name}</DialogTitle>
                      <div className="relative w-full h-[60vh] md:h-[75vh]">
                        <Image
                          src={award.image}
                          alt={award.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 1024px"
                          priority
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
