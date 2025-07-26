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
      <div className="relative mt-16">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <div key={index} className="relative">
              <div className="flex items-center" style={{
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              }}>
                <div className="w-1/2 px-8">
                  <Card className="bg-card/70 backdrop-blur-sm border-secondary/20 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                    <CardHeader className={index % 2 === 0 ? 'text-left' : 'text-right'}>
                      <CardTitle className="text-primary">{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution}</CardDescription>
                    </CardHeader>
                    <CardContent className={index % 2 === 0 ? 'text-left' : 'text-right'}>
                      <p className="text-muted-foreground">{edu.duration}</p>
                      {edu.details && <p className="text-sm text-foreground/80 mt-1">{edu.details}</p>}
                    </CardContent>
                  </Card>
                </div>
                <div className="w-1/2 px-8"></div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-1/2 h-5 w-5 rounded-full bg-primary border-4 border-background flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <GraduationCap className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
