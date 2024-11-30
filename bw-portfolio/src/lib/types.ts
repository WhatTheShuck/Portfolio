export interface Project {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  status: "in-progress" | "completed";
  featured: boolean;
  startDate: Date;
  endDate?: Date;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  responsibilities: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  gpa?: number;
  graduationDate: number;
  notableProjects: {
    title: string;
    description: string;
    grade?: string;
  }[];
}

export interface PersonalInfo {
  name: string;
  bio: string;
  interests: string[];
  githubUrl: string;
  linkedinUrl?: string;
  email: string;
}
