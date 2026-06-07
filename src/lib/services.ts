import type { ValueProp, CaseStudy, Project } from "./types";
import { projects } from "./data";

export const valueProps: ValueProp[] = [
  {
    heading: "Built for your business",
    body: "Bespoke to your workflow and brand, not a template adapted to fit.",
    icon: "Sparkles",
  },
  {
    heading: "Cheaper end-to-end",
    body: "A one-off custom build plus optional managed hosting from me, for less than the off-the-shelf platforms charge.",
    icon: "Banknote",
  },
  {
    heading: "You talk to the person building it",
    body: "No agency layers, no offshore handoffs, no support tickets queued behind enterprise customers.",
    icon: "MessageSquare",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    kind: "client",
    title: "Luminous Path",
    preface: null,
    problem: "PLACEHOLDER",
    approach: "PLACEHOLDER",
    outcome: "PLACEHOLDER",
    quote: null,
    liveUrl: null,
    image: null,
  },
  {
    kind: "production",
    title: "Next HRT",
    preface: "An internal enterprise system I built end-to-end for my employer, KSB Australia.",
    problem:
      "KSB Australia's HR team had been running on an Access database built in 2013. Deployment was fragile, access was awkward across sites, and the data model no longer matched how the business worked.",
    approach:
      "I scoped, designed, and built a replacement from scratch in Next.js with Prisma and SQLite. I gathered requirements from the HR team, shipped an MVP for buy-in, and iterated through feedback rounds with the people who use it day-to-day.",
    outcome:
      "Next HRT now runs production HR workflows for the KSB Australia team, replacing the legacy Access tool with a modern, accessible web app that the business actually owns.",
    quote: null,
    liveUrl: "https://hrt.ksb.com.au",
    image: "/nextHRT.png",
  },
];

// Must match `title` values in src/lib/data.ts — renaming a project there will silently drop it from otherWork.
const OTHER_WORK_TITLES = ["VIS Hub", "Ravenswatch.pro", "TuneDetective 2"];

export const otherWork: Project[] = projects.filter((p) =>
  OTHER_WORK_TITLES.includes(p.title)
);
