
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
    details: "CGPA: 8.9",
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
      <div className="relative mt-16 pl-6">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <div key={index} className="relative pl-8">
               {/* Timeline Dot */}
               <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-primary-foreground" />
              </div>

              <Card className="bg-card/70 backdrop-blur-sm border-secondary/20 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="text-primary">{edu.degree}</CardTitle>
                  <CardDescription>{edu.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{edu.duration}</p>
                  {edu.details && <p className="text-sm text-foreground/80 mt-1">{edu.details}</p>}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
