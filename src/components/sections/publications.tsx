import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";
import { BookOpen, FileDown } from "lucide-react";

export default function Publications() {
  return (
    <section id="publications" className="py-6 sm:py-8 lg:py-10">
      <SectionHeading>Publications</SectionHeading>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm border-border/40 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-muted text-primary flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-lg leading-snug">AIEDUDOCS: AN INTELLIGENT FRAMEWORK FOR AUTOMATED ACADEMIC DOCUMENTATION AND ASSESSMENT ANALYTICS</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground/90">Journal:</span> Madhya Bharti - Humanities and Social Science (UGC CARE approved)
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground/90">Date:</span> 05/2025
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline" className="w-fit">
                <a href="/research-paper.pdf" download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Paper
                </a>
              </Button>

              <a
                href="https://www.linkedin.com/posts/nikhil-krishna-r-d-773b84259_aiineducation-academicinnovation-facultyfirst-activity-7328044400041693184-KLt9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4 w-fit"
              >
                Why this work mattered →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
