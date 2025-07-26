import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { SectionHeading } from "../ui/section-heading";
import { BookOpen, FileDown } from "lucide-react";

export default function Publications() {
  return (
    <section id="publications" className="py-24 sm:py-32">
      <SectionHeading>Publications</SectionHeading>
      <div className="mt-12 max-w-3xl mx-auto">
        <Card className="bg-card/70 backdrop-blur-sm border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <BookOpen className="text-primary w-6 h-6 flex-shrink-0 mt-1"/>
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
            <div className="flex justify-start pt-2">
                <Button asChild variant="outline">
                    <a href="/research-paper.pdf" download>
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Paper
                    </a>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
