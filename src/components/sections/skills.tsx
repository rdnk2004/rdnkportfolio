import { Badge } from "../ui/badge";
import { SectionHeading } from "../ui/section-heading";

const skillsData = {
    "Programming & Query Languages": ["Python", "JavaScript", "SQL", "R", "Java", "C", "HTML5", "CSS3"],
    "Frameworks & Libraries": ["Flask", "FastAPI", "Streamlit", "Pandas", "NumPy", "Matplotlib", "Node.js", "Express.js", "TailwindCSS"],
    "Databases": ["MongoDB", "Oracle", "MySQL"],
    "Tools & Platforms": ["Microsoft Apps (Excel, Word, PPT etc.)", "Word & Excel Automation", "Git & GitHub", "DOCX Processing Libraries", "Jupyter Notebooks"],
    "Core Concepts": ["Data Analytics & Visualization", "Machine Learning", "Deep Learning (ResNet-50)", "Full-Stack Web Development", "API Design", "Workflow Automation", "ETBR Analysis", "RBAC"],
    "Professional Skills": ["Team Leadership", "Project Management", "Event Management", "Agile & Sprint Planning", "Public Speaking", "Problem Solving", "Mentorship"],
};

export default function Skills() {
    return (
        <section id="skills" className="py-24 sm:py-32">
            <SectionHeading>Technical Skills</SectionHeading>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skillsData).map(([category, skills]) => (
                    <div key={category} className="bg-card/50 p-6 rounded-lg border border-secondary/20 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
                        <h3 className="text-xl font-semibold text-primary mb-4">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
