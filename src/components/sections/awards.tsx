import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const awardsData = [
  {
    name: "Champ of Data Science",
    institution: "Kumaraguru College of Liberal Arts and College",
    date: "03/2025",
  },
  {
    name: "Mahatma Gandhi Merit Scholarship",
    institution: "Kumaraguru Institutions",
    date: "03/2025",
  },
  {
    name: "Mahatma Gandhi Merit Scholarship",
    institution: "Kumaraguru Institutions",
    date: "10/2024",
  },
    {
    name: "Mahatma Gandhi Merit Scholarship",
    institution: "Kumaraguru Institutions",
    date: "03/2024",
  },
];

export default function Awards() {
  return (
    <section id="awards" className="py-24 sm:py-32">
      <SectionHeading>Honors & Awards</SectionHeading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {awardsData.map((award, index) => (
          <Card key={index} className="bg-card/70 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-3">
                <Trophy className="w-6 h-6"/>
                <span>{award.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground/90">Institution:</span> {award.institution}
                </p>
                <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground/90">Date:</span> {award.date}
                </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
