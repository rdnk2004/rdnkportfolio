import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";

const experienceData = [
  {
    role: "Automation and Platform Developer",
    company: "Kumaraguru College of Liberal Arts and Science",
    duration: "12/2024 - 03/2025",
    tasks: [
      "Designed and developed an integrated academic automation platform combining multiple internal tools into a single role-based system.",
      "Built end-to-end automation for documentation, result processing, and report generation, significantly reducing manual administrative effort.",
      "Integrated high-volume Excel data processing pipelines with secure role-based access for Admin, HOD, and Faculty users.",
      "Developed real-time result analysis dashboards, faculty management workflows, and structured reporting modules.",
      "Unified previously independent automation tools into a centralised web interface, improving usability and operational consistency.",
      "Delivered a deployment-ready system used in real academic workflows, ensuring scalability and minimal manual intervention.",
    ],
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_automation-python-streamlit-activity-7356642080330297344-GOF2",
    linkText: "How this system evolved in practice →",
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
    link: "https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_internshipexperience-dataanalytics-automation-activity-7330781364402769920-IgqH",
    linkText: "Reflections from this experience →",
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

                  {/* Contextual LinkedIn Link */}
                  {/* @ts-ignore */}
                  {job.link && (
                    <div className="pt-4 mt-2 border-t border-border/30">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4"
                      >
                        {job.linkText}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
