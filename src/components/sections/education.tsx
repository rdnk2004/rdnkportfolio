
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const educationData = [
  {
    degree: "Master of Science in Computer Science (Data Analytics)",
    institution: "Rajagiri College of Social Sciences",
    duration: "Graduation: 03/2027",
    details: "",
  },
  {
    degree: "Bachelor of Science in Data Science",
    institution: "Kumaraguru College of Liberal Arts and Science",
    duration: "Graduation: 06/2025",
    details: "CGPA: 9.022",
  },
  {
    degree: "High School Education",
    institution: "CMS Matriculation Higher Secondary School",
    duration: "Graduation: 04/2022",
    details: "CGPA: 9.1",
  },
  {
    degree: "SSLC",
    institution: "CMS Matriculation Higher Secondary School",
    duration: "Graduation: 04/2020",
    details: "CGPA: 9.44",
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <SectionHeading>Education</SectionHeading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {educationData.map((edu, index) => (
          <Card key={index} className="bg-card border border-white/5 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg font-bold text-foreground">{edu.degree}</CardTitle>
                <CardDescription className="text-primary font-medium">{edu.institution}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground font-mono">{edu.duration}</p>
                {edu.details && <p className="text-sm text-foreground/80 font-medium bg-secondary/10 px-2 py-0.5 rounded">{edu.details}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
