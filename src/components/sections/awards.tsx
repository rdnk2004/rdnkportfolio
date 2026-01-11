import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const awardsData = [
  {
    name: "University 3rd Rank",
    institution: "Bharathiar University",
    date: "October 2025",
    note: "Awarded for academic excellence across the university",
    image: null,
  },
  {
    name: "Mahatma Gandhi Merit Scholarship (3× Recipient)",
    institution: "Kumaraguru Institutions",
    date: "2024 – 2025",
    note: "Awarded multiple times for consistent academic performance",
    image: "/awards/mahatma-gandhi-scholarship.jpeg",
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_gratitude-scholarship-mahatmagandhimeritscholarship-activity-7312838333280227328-C92W",
    linkText: "Context behind this recognition →",
  },
  {
    name: "Champ of Data Science",
    institution: "Kumaraguru College of Liberal Arts and Science",
    date: "March 2025",
    note: "Recognized for outstanding performance and contribution in Data Science",
    image: "/awards/champ-of-data-science.jpeg",
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_gratitude-collegejourney-activity-7336019282243239937-RKZf",
    linkText: "Moment behind this recognition →",
  },
];

export default function Awards() {
  return (
    <section id="awards" className="py-24 sm:py-32">
      <SectionHeading>Honors & Recognition</SectionHeading>

      <div className="mt-12 flex flex-col gap-8 max-w-5xl mx-auto">
        {awardsData.map((award, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-md transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
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
                <div className="relative h-48 md:h-auto md:col-span-2 overflow-hidden border-b md:border-b-0 md:border-l border-white/10 bg-black/20">
                  <Image
                    src={award.image}
                    alt={award.name}
                    fill
                    quality={100}
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Very subtle inner shadow for depth, no dark overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
