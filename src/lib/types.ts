type ProjectBase = {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  status: "in-progress" | "completed";
  featured: boolean;
  startDate: Date;
  endDate?: Date;
};

type ProjectWithImage = ProjectBase & {
  image: string;
  imageWidth: number;
  imageHeight: number;
};

type ProjectWithoutImage = ProjectBase & {
  image?: never;
  imageWidth?: never;
  imageHeight?: never;
};

export type Project = ProjectWithImage | ProjectWithoutImage;

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
  notableAchievements: {
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

export interface ValueProp {
  heading: string;
  body: string;
  icon: "Sparkles" | "Banknote" | "MessageSquare";
}

export interface CaseStudyQuote {
  text: string;
  attribution: string;
}

export interface CaseStudy {
  kind: "client" | "production";
  title: string;
  preface: string | null;
  problem: string;
  approach: string;
  outcome: string;
  quote: CaseStudyQuote | null;
  liveUrl: string | null;
  image: string | null;
}
