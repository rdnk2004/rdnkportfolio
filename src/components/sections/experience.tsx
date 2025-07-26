import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const experienceData = [
  {
    role: "Project Lead - University Academic Portal (Capstone Project)",
    company: "Kumaraguru College of Liberal Arts and Science",
    duration: "03/2024 - 09/2024",
    tasks: [
      "Selected and led a cross-batch team to develop a full-stack academic portal for the entire college.",
      "Coordinated sprint planning, development cycles, and cross-functional collaboration.",
      "Built Excel-style modals for internal mark entry with dynamic batch/subject filtering and automated mark conversion logic.",
      "Developed detailed admin dashboards for real-time result analysis, including top scorers and subject-wise performance.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "CAI Mahindra",
    duration: "07/2024 - 08/2024",
    tasks: [
      "Analyzed automotive sales data, focusing on ETBR (Enquiry, Test Drive, Booking, Retail) pipeline.",
      "Automated 15 critical Excel reports for Sales and Telecalling departments.",
      "Developed a Flask application to streamline report generation.",
      "Collaborated with departments to understand workflows and identify opportunities for data-driven improvements.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <SectionHeading>Work Experience</SectionHeading>
      <div className="relative mt-12 pl-6">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {experienceData.map((job, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-primary border-4 border-background"></div>
              
              <Card className="bg-card/70 backdrop-blur-sm border-secondary/20 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-start flex-col sm:flex-row">
                    <CardTitle className="text-primary">{job.role}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1 sm:mt-0">{job.duration}</p>
                  </div>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90">
                    {job.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
