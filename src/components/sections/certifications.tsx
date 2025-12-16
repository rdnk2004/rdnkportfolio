
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const certificationData = [
  {
    name: "Oracle Certification - Data Science Professional 2025",
    provider: "Oracle",
  },
  {
    name: "Applied Data Science with Python - Level 2",
    provider: "IBM",
  },
  {
    name: "Introduction to Python",
    provider: "IBM Career Education Program",
  },
  {
    name: "Data Analytics with Excel",
    provider: "360DigiTMG",
  },
  {
    name: "Ask Questions to Make Data-Driven Decisions",
    provider: "Google (via Coursera)",
  },
  {
    name: "Database Management Essentials (Honors)",
    provider: "University of Colorado (via Coursera)",
  },
  {
    name: "Data-Driven Astronomy",
    provider: "University of Sydney (via Coursera)",
  },
  {
    name: "Data Structures",
    provider: "UC San Diego (via Coursera)",
  },
  {
    name: "Foundations - Data Everywhere",
    provider: "Google (via Coursera)",
  },
  {
    name: "Inferential Statistics",
    provider: "Duke University (via Coursera)",
  },
  {
    name: "Prepare Data for Exploration",
    provider: "Google (via Coursera)",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32">
      <SectionHeading>Certifications</SectionHeading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificationData.map((cert, index) => (
          <Card key={index} className="bg-card/70 backdrop-blur-sm border-secondary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-start gap-4">
                <Award className="w-8 h-8 flex-shrink-0" />
                <span>{cert.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {cert.provider}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
