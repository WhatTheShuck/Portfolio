import { projects, workExperience, personalInfo, education } from "@/lib/data";
import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Github } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-16">
        {/* About Section */}
        <section id="about" className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">About Me</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">{personalInfo.bio}</p>
            <div className="flex flex-wrap gap-2">
              {personalInfo.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.title}</CardTitle>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {project.startDate.toLocaleDateString()}
                    {project.endDate &&
                      ` - ${project.endDate.toLocaleDateString()}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* Education Section */}
        <section id="education" className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Education</h2>
          <div className="space-y-6">
            {education.map((place) => (
              <Card
                key={place.degree}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>
                    {place.degree} at {place.institution}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {place.graduationDate}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {place.gpa && (
                    <p className="text-muted-foreground">GPA: {place.gpa}</p>
                  )}
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Notable Achievements & Projects:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {place.notableAchievements.map((project, index) => (
                        <li key={index} className="text-muted-foreground">
                          {project.title} {project.grade}
                          <ul className="list-[square] pl-5 space-y-1">
                            <li key={index} className="text-muted-foreground">
                              {project.description}
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* Work Experience Section */}
        <section id="experience" className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Work Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((job) => (
              <Card
                key={job.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>
                    {job.title} at {job.company}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {job.startDate.toLocaleDateString()}
                    {job.endDate && ` - ${job.endDate.toLocaleDateString()}`}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{job.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Key Responsibilities:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="text-muted-foreground">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
