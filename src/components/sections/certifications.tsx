import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const learningData = [
  {
    category: "Applied Data Science & Systems",
    items: [
      { name: "Oracle Certification - Data Science Professional 2025", provider: "Oracle" },
      { name: "Applied Data Science with Python - Level 2", provider: "IBM" },
      { name: "Database Management Essentials (Honors)", provider: "University of Colorado" },
      { name: "Data-Driven Astronomy", provider: "University of Sydney" },
      { name: "Data Analytics with Excel", provider: "360DigiTMG" },
    ]
  },
  {
    category: "Foundations & Computational Thinking",
    items: [
      { name: "Data Structures", provider: "UC San Diego" },
      { name: "Inferential Statistics", provider: "Duke University" },
      { name: "Introduction to Python", provider: "IBM Career Education Program" },
      { name: "Foundations - Data Everywhere", provider: "Google" },
    ]
  },
  {
    category: "Decision Intelligence",
    items: [
      { name: "Ask Questions to Make Data-Driven Decisions", provider: "Google" },
      { name: "Prepare Data for Exploration", provider: "Google" },
    ]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32">
      <SectionHeading>Learning & Credentials</SectionHeading>

      <div className="mt-12 max-w-4xl mx-auto space-y-12">
        {learningData.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-6">
            <h3 className="text-lg font-medium text-foreground/80 pl-1 border-l-2 border-primary/20">{group.category}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((cert, index) => (
                <div
                  key={index}
                  className="group flex flex-col p-4 rounded-lg bg-card/40 border border-white/5 hover:bg-card/60 hover:border-primary/10 transition-all duration-300"
                >
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {cert.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {cert.provider}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
