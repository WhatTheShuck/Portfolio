import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/types";
import Image from "next/image";

const ProjectCard = (project: Project) => {
  const isVerticalImage = project.image
    ? project.imageHeight > project.imageWidth
    : false;

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github size={24} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-full">
        <div className={`flex flex-col md:flex-row gap-6 h-full`}>
          <div className="flex flex-col flex-1 justify-between gap-4">
            <p className="text-muted-foreground">{project.description}</p>

            <div className="space-y-4">
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
            </div>
          </div>

          {project.image && (
            <div
              className={`
              flex items-center justify-center
              ${isVerticalImage ? "md:w-48" : "md:w-96"}
            `}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={isVerticalImage ? 200 : 400}
                height={isVerticalImage ? 400 : 250}
                className="rounded-lg shadow-md hover:scale-105 transition-transform"
                style={{
                  maxHeight: isVerticalImage ? "300px" : "200px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
