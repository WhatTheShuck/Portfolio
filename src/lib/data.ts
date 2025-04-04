// src/lib/data.ts
import { Project, WorkExperience, Education, PersonalInfo } from "./types";

export const projects: Project[] = [
  {
    title: "VIS Hub",
    description:
      "A Progressive Web App made for the Victorian Institute of Sport to streamline communication between staff and atheletes. My Capstone project for university, where I was in a group of 4 students (3 devs, 1 project manager) tasked with completing this project for the VIS. The code for this project can't be viewed, due to some of the VIS data being sensitive, however, clicking the link here will take you to the demo video produced as part of the assignment, which goes through many of the features and goals of the project.",
    githubUrl: "https://github.com/WhatTheShuck/VISHUB-IFB399-Capstone",
    liveUrl: "/VISHub",
    technologies: ["Angular", "TypeScript", "C#", ".NET", "Syncfusion"],
    status: "completed",
    featured: true,
    startDate: new Date("2024-03-27"),
    endDate: new Date("2024-11-29"),
    image: "/vishub.png",
    imageWidth: 1419,
    imageHeight: 2796,
  },
  {
    title: "Next HRT",
    description:
      "A piece of internal HR software for KSB Australia. This was a replacement for an internal software, called HRT, which was an Access Database program written in 2013. Due to numerous issues with the deployment and access around the aging software, I developed an MVP, gained approval and set out to rewrite the program with more modern concepts and to meet the current user requirements. I scoped, developed, got feedback and all the jazz on my own for this project. ",
    githubUrl: "https://github.com/WhatTheShuck/NextHRT",
    liveUrl: "https://hrt.ksb.com.au",
    technologies: ["NextJS", "TypeScript", "Prisma", "SQLite"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2025-01-17"),
    image: "/nextHRT.png",
    imageHeight: 2361,
    imageWidth: 1118,
  },
  {
    title: "Ravenswatch.pro",
    description:
      "A Wiki and builds site for the game Ravenswatch. A collaborative project with close friends.",
    githubUrl: "https://github.com/R-Den/ravenswatch.pro",
    liveUrl: "https://ravenswatch.pro",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2024-08-24"),
    image: "/rwpro.png",
    imageWidth: 1916,
    imageHeight: 1064,
  },
  {
    title: "TuneDetective 2",
    description:
      "A music tracking platform that leverages the Deezer API to search for artists and pull their recent releases. A personal project, which is a continuation of an application that I once used, called Tune Detective. It also served as an important foundation for building my understanding of the Angular framework and TypeScript, without compromising the VISHub project for the VIS.",
    githubUrl: "https://github.com/WhatTheShuck/Tune-Detective-2",
    liveUrl: "https://tunedetective2.what-the-shuck.com",
    technologies: ["Angular", "TypeScript", "Material Angular"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2024-06-03"),
    image: "/td2.png",
    imageHeight: 2361,
    imageWidth: 1118,
  },

  {
    title: "Portfolio",
    description: "This portfolio site. The one you're on now :)",
    githubUrl: "https://github.com/WhatTheShuck/Portfolio",
    liveUrl: "https://brandonwiedman.com",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "in-progress",
    featured: true,
    startDate: new Date("2024-11-30"),
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: "IT Supervisor",
    company: "KSB Australia",
    location: "Bundamba, QLD",
    startDate: new Date("2025-03-25"),
    description:
      "Promoted to the role of IT Supervisor being acting IT Manager for an extended period of time. New IT Support Officer joined the team in *TBD* to fill my role and handle the level 1 and 2 issues. Managed this little homie remotely. Wrote some policies and other stuff. Did the NextHrt Project. ",
    responsibilities: [
      "Resolved technical issues for 100+ users",
      "Administrate a hybrid Entra ID & AD environment",
      "Administrate and patch Cisco Meraki Switches & APs",
      "Administrate and patch Fortinet firewalls",
      "Coordinate between local and global IT teams to align technology initiatives while maintaining site-specific requirements",
      "2+ technical support",
      "Managed an IT Support Officer",
      "Wrote IT Policies and Procedures",
    ],
    skills: [
      "Managing",
      "Technical Support",
      "Problem Solving",
      "Communication",
    ],
  },
  {
    title: "IT Support Officer",
    company: "KSB Australia",
    location: "Bundamba, QLD",
    startDate: new Date("2022-10-24"),
    endDate: new Date("2025-03-24"),
    description:
      "Provided level 1 & 2 helpdesk technical support, as well as liaised with MSP & Global Company IT regarding level 3+ support. Acting IT Manager for 6 months, while the role was vacant (Aug-Nov 2024 & Jan-Mar 2025)",
    responsibilities: [
      "Resolved technical issues for 100+ users",
      "Administrate a hybrid Entra ID & AD environment",
      "Administrate and patch Cisco Meraki Switches & APs",
      "Administrate and patch Fortinet firewalls",
      "Coordinate between local and global IT teams to align technology initiatives while maintaining site-specific requirements",
      "Level 1 & 2 helpdesk technical support",
    ],
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
    notableAchievements: [
      {
        title:
          "4x QUT Executive Deans' Commendation for Academic Excellence (S1 2023, S2 2023, S1 2024, S2 2024)",
        description:
          "Awarded to students who achieve a GPA of 6.5 or higher for a given semester.",
      },
      {
        title: "VIS Hub Application",
        description:
          "In a team of 4 students (3 devs, 1 project manager), I made a Web App made for the Victorian Institute of Sport to streamline communication between staff and atheletes. Written in Angular and C#.",
        grade: "- Grade: 7",
      },
      {
        title: "Paper on Anonymity in Encrypted Messengers",
        description:
          "Research paper for CAB340 - Cryptography, on assessing the anonymity in Signal, WhatsApp and Session messengers.",
        grade: "- Grade: 7",
      },
      {
        title: "Murray Darling Basin Water Monitoring System in ",
        description:
          "Major Blockchain project for IFB452 - Blockchain Blockchain Technologies, on creating a blockchain-based water monitoring system for the Murray Darling Basin, to combat water theft and flood plain harvesting in the region. Written in Solidity, with a quick React front-end.",
        grade: "- Grade: 7",
      },
      {
        title: "Elevator Control System",
        description:
          "Major project for CAB403 - Systems Programming, on creating an elevator control system in C, with a safety critical section. The project was written in C, and was designed to simulate an elevator system in a building, with an elevator safety system that was required to be written in MISRA C.",
        grade: "- Grade: 7",
      },
      {
        title: "File Compression System on AWS",
        description:
          "Major project for CAB432 - Cloud Computing, on creating a file compression system on AWS, utilising Docker, S3, EC2, Elasticache, Load Balancing and Auto-scaling the system to handle large amounts of data. The project was written in React and Node.js",
        grade: "- Grade: 7",
      },
    ],
  },
  {
    degree: "Queensland Certificate of Education",
    institution: "St Edmund's College",
    graduationDate: 2018,
    notableAchievements: [
      {
        title: "OP(Overall Position): 4",
        description: "Equivalent ATAR 95",
      },
      {
        title: "Top Achiever",
        description: "Biological Science",
      },
    ],
  },
];

export const personalInfo: PersonalInfo = {
  name: "Brandon Wiedman",
  bio: "Passionate software developer in Brisbane, Queensland with experience in web development and a strong interest in open source. I'm an avid home-labber and Linux enthusiast.",
  interests: [
    "Open Source",
    "Linux",
    "Gaming",
    "Web Development",
    "Longboarding",
  ],
  githubUrl: "https://github.com/WhatTheShuck",
  linkedinUrl: "https://au.linkedin.com/in/brandon-wiedman-541965239",
  email: "contact@brandonwiedman.com",
};
