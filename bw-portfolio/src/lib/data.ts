// src/lib/data.ts
import { Project, WorkExperience, Education, PersonalInfo } from "./types";

export const projects: Project[] = [
  {
    title: "TuneDetective 2",
    description:
      "Music tracking platform. My personal project, which is a continuation of an application that I once used, called Tune Detective, but was discontinued.",
    githubUrl: "https://github.com/WhatTheShuck/Tune-Detective-2",
    liveUrl: "https://tunedetective2.shuckle.uk",
    technologies: ["Angular", "TypeScript"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2024-06-03"),
  },
  {
    title: "VIS Hub",
    description:
      "Web App made for the Victorian Institute of Sport to streamline communication between staff and atheletes. My Capstone project for university.",
    githubUrl: "https://github.com/WhatTheShuck/VISHUB-IFB399-Capstone",
    liveUrl: "https://vishub.azurewebsites.net",
    technologies: ["Angular", "TypeScript", "C#", ".NET"],
    status: "completed",
    featured: true,
    startDate: new Date("2024-03-27"),
  },
  {
    title: "Ravenswatch.pro",
    description:
      "Wiki for the game Ravenswatch, collaborative project with close friends.",
    githubUrl: "https://github.com/R-Den/ravenswatch.pro",
    liveUrl: "https://ravenswatch.pro",
    technologies: ["Next.js", "TypeScript"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2024-08-24"),
  },
  {
    title: "Portfolio",
    description: "This portfolio site. The one you're on now :)",
    githubUrl: "https://github.com/WhatTheShuck/Portfolio",
    liveUrl: "https://brandonwiedman.com",
    technologies: ["Next.js", "TypeScript"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2024-11-30"),
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "Helpdesk Officer",
    company: "KSB Australia",
    location: "Bundamba, QLD",
    startDate: new Date("2022-10-24"),
    description: "Provided technical support and solutions...",
    responsibilities: ["Resolved technical issues for 100+ users"],
    skills: ["Technical Support", "Problem Solving", "Communication"],
  },
  {
    title: "Assistant Manager",
    company: "Hungry Jacks",
    location: "Booval, QLD",
    startDate: new Date("2021-07-04"),
    endDate: new Date("2022-08-24"),
    description:
      "One of several Assistant Managers at the Booval Hungry Jacks restaurant.",
    responsibilities: [
      "Supervised a team of 10+ staff",
      "Maintained food safety standards",
      "Resolved customer issues",
    ],
    skills: ["Conflict Resolution", "Communication", "Leadership", "Teamwork"],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of IT in Computer Science (with Distinction)",
    institution: "Queensland University of Technology",
    gpa: 6.208,
    graduationDate: 2024,
    notableProjects: [
      {
        title: "Project Title",
        description: "Project description...",
        grade: "A+",
      },
    ],
  },
  {
    degree: "Queensland Certificate of Education",
    institution: "St Edmund's College",
    graduationDate: 2018,
    notableProjects: [
      {
        title: "Top Achiever",
        description: "Biological Science",
      },
    ],
  },
];

export const personalInfo: PersonalInfo = {
  name: "Brandon Wiedman",
  bio: "Passionate software developer in Brisbane, Queensland with experience in web development and a strong interest in open source.",
  interests: ["Open Source", "Linux", "Gaming", "Web Development"],
  githubUrl: "https://github.com/WhatTheShuck",
  linkedinUrl: "https://au.linkedin.com/in/brandon-wiedman-541965239",
  email: "contact@brandonwiedman.com",
};
