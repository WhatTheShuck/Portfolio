import { projects, workExperience, personalInfo, education } from "@/lib/data";
import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">{personalInfo.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#projects" className="text-gray-700 hover:text-gray-900">
                Projects
              </a>
              <a
                href="#experience"
                className="text-gray-700 hover:text-gray-900"
              >
                Experience
              </a>
              <a
                href="#education"
                className="text-gray-700 hover:text-gray-900"
              >
                Education
              </a>
              <div className="flex items-center space-x-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Github size={20} />
                </a>
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />

      {/* Projects Section */}
      <section id="projects" className="space-y-6">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
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
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
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
      <br />

      {/* Work Experience Section */}
      <section id="experience" className="space-y-6">
        <h2 className="text-3xl font-bold">Work Experience</h2>
        <div className="space-y-6">
          {workExperience.map((job) => (
            <Card key={job.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>
                  {job.title} at {job.company}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  {job.startDate.toLocaleDateString()}
                  {job.endDate && ` - ${job.endDate.toLocaleDateString()}`}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{job.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-600">
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
      <br />

      {/* Education Section */}
      <section id="education" className="space-y-6">
        <h2 className="text-3xl font-bold">Education</h2>
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
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  {place.graduationDate}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {place.gpa && <p className="text-gray-600">GPA: {place.gpa}</p>}
                <div>
                  <h4 className="font-semibold mb-2">Notable Projects:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {place.notableProjects.map((project, index) => (
                      <li key={index} className="text-gray-600">
                        {project.title} - {project.description} {project.grade}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. Built with
            Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
