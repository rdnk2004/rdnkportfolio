import { Button } from "../ui/button";
import { SectionHeading } from "../ui/section-heading";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 text-center">
      <SectionHeading>Get In Touch</SectionHeading>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
        I'm currently seeking new opportunities and am open to collaboration. Feel free to reach out if you have a project in mind or just want to connect! My location is Coimbatore, Tamil Nadu.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
          <a href="mailto:rdnikhilkrishna2004@gmail.com">
            <Mail className="mr-2 h-5 w-5" />
            rdnikhilkrishna2004@gmail.com
          </a>
        </Button>
      </div>
      <div className="mt-12 flex justify-center space-x-6">
        <a href="https://www.linkedin.com/in/nikhil-krishna-r-d-773b84259/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="h-8 w-8" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a href="https://github.com/rdnk2004" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Github className="h-8 w-8" />
          <span className="sr-only">GitHub</span>
        </a>
      </div>
    </section>
  );
}
