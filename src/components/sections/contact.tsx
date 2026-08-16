import { Button } from "../ui/button";
import { SectionHeading } from "../ui/section-heading";
import { Github, Linkedin, Mail } from "lucide-react";
import { HuggingFaceIcon } from "../ui/icons";

export default function Contact() {
  return (
    <section id="contact" className="py-6 sm:py-8 lg:py-10 text-center">
      <SectionHeading>Get In Touch</SectionHeading>
      <p className="mt-4 mb-8 max-w-2xl mx-auto text-lg text-muted-foreground">
        I'm currently seeking new opportunities and am open to collaboration. Feel free to reach out if you have a project in mind or just want to connect!
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all text-primary">
          <a href="mailto:rdnikhilkrishna2004@gmail.com">
            <Mail className="mr-2 h-4 w-4" />
            rdnikhilkrishna2004@gmail.com
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all text-primary">
          <a href="https://huggingface.co/rdnk-2004" target="_blank" rel="noopener noreferrer">
            <HuggingFaceIcon className="mr-2 h-4 w-4" />
            Hugging Face
          </a>
        </Button>
      </div>
      <div className="mt-12 flex justify-center items-center space-x-8">
        <a href="https://www.linkedin.com/in/nikhil-krishna-r-d-773b84259/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-300" aria-label="LinkedIn">
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a href="https://github.com/rdnk2004" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-300" aria-label="GitHub">
          <Github className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a href="https://huggingface.co/rdnk-2004" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-300" aria-label="Hugging Face">
          <HuggingFaceIcon className="h-6 w-6" />
          <span className="sr-only">Hugging Face</span>
        </a>
      </div>
    </section>
  );
}
