import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";
import { BookOpen, FileDown } from "lucide-react";

export default function Publications() {
  return (
    <section id="publications" className="py-16 sm:py-24">
      <SectionHeading>Publications</SectionHeading>
      <div className="mt-8 max-w-3xl mx-auto">
        <Card className="bg-card/70 backdrop-blur-sm border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <BookOpen className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
              <span>AIEDUDOCS: AN INTELLIGENT FRAMEWORK FOR AUTOMATED ACADEMIC DOCUMENTATION AND ASSESSMENT ANALYTICS</span>
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
