import type { ReactNode } from "react";
import SectionHeader from "../components/Section-Header";
import ExperienceCard from "../components/Experience-Card";
import ProjectCard, { type ProjectLink } from "../components/Project-Card";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const projects: {
  name: string;
  description: string;
  color: string;
  iconTitle: string;
  icon: ReactNode;
  tag?: string;
  links: ProjectLink[];
}[] = [
  {
    name: "Nodemic",
    tag: "In progress",
    description: "Build epidemic models on a visual canvas and watch them simulate live",
    color: "#86efac",
    iconTitle: "a line graph",
    icon: <Icon><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></Icon>,
    links: [
      { label: "Website", href: "https://nodemic.org" },
      { label: "Code", href: "https://github.com/evaxliu/nodemic" },
    ],
  },
  {
    name: "Antimony Web Editor",
    description: "Write and edit Antimony biology models in the browser",
    color: "#c4b5fd",
    iconTitle: "an editor in the browser",
    icon: <Icon><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18" /><path d="M10 12.5l-2 2 2 2" /><path d="M14 12.5l2 2-2 2" /></Icon>,
    links: [
      { label: "Website", href: "https://sys-bio.github.io/AntimonyEditor/" },
      { label: "Code", href: "https://github.com/sys-bio/AntimonyEditor" },
    ],
  },
  {
    name: "VSCode-Antimony",
    description: "Antimony language support for building systems biology models in VS Code",
    color: "#c4b5fd",
    iconTitle: "Sb — the element Antimony is named after",
    icon: <span className="font-space-grotesk text-[13px] font-bold leading-none tracking-[-0.02em]">Sb</span>,
    links: [
      { label: "Website", href: "https://marketplace.visualstudio.com/items?itemName=stevem.vscode-antimony" },
      { label: "Code", href: "https://github.com/sys-bio/vscode-antimony" },
      { label: "Paper", href: "https://academic.oup.com/bioinformatics/article/39/12/btad753/7473373" },
    ],
  },
  {
    name: "ZV Homeconstruction",
    description: "Custom website for a home construction company",
    color: "#fde68a",
    iconTitle: "a home builder",
    icon: <Icon><path d="M3 10a2 2 0 0 1 .7-1.53l7-6a2 2 0 0 1 2.6 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M15 21v-7a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v7" /></Icon>,
    links: [
      { label: "Website", href: "https://www.zvhomes.org" },
      { label: "Code", href: "https://github.com/evaxliu/zv-homeconstruction-website" },
    ],
  },
  {
    name: "Rice Thoughts",
    description: "Blog site for a writer's opinion pieces on personal interests and current events",
    color: "#f9a8d4",
    iconTitle: "opinion pieces",
    icon: <Icon><path d="M12 20h9" /><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7.4 18.6a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z" /></Icon>,
    links: [
      { label: "Website", href: "https://www.ricethoughts.com/" },
      { label: "Code", href: "https://github.com/evaxliu/rice-thoughts-blog" },
    ],
  },
  {
    name: "Pet My Dog",
    description: "Find dog owners walking nearby in real time and go pet their dogs",
    color: "#fde68a",
    iconTitle: "a paw to pet",
    icon: <Icon><circle cx="11" cy="4.5" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="15.5" r="2" /><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.05Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10z" /></Icon>,
    links: [{ label: "Code", href: "https://github.com/evaxliu/pet-my-dog" }],
  },
  {
    name: "Find Your Needs",
    description: "iOS app mapping free food, hygiene, and library resources around Seattle",
    color: "#86efac",
    iconTitle: "resources nearby",
    icon: <Icon><path d="M20 10c0 5-5.54 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.2 4 15 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></Icon>,
    links: [{ label: "Code", href: "https://github.com/evaxliu/find-your-needs" }],
  },
];

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-5 flex-col items-center pt-[100px]">
      {children}
    </section>
  );
}

export default function Experience() {
  return (
    <>
      <Section id="education">
        <SectionHeader title="Education" color="#86efac" />
        <div className="flex w-full max-w-[640px] flex-col px-1">
          <ExperienceCard date="Incoming Jan 2027" dateColor="#86efac" title="Georgia Tech" org="M.S. Computer Science" />
          <ExperienceCard date="Sep 2020 – Dec 2024" title="University of Washington" org="B.S. Computer Science" />
        </div>
      </Section>

      <Section id="experience">
        <SectionHeader title="Experience" color="#c4b5fd" />
        <div className="flex w-full max-w-[640px] flex-col px-1">
          <ExperienceCard
            date="Jun 2026 – Present"
            dateColor="#c4b5fd"
            title="Contract Software Engineer"
            org="Z&V Home Construction"
            body="Designed, built, and launched the company's Next.js website end to end, from requirements through deployment, SEO, and ongoing support."
          />
          <ExperienceCard
            date="Jul 2022 – Dec 2024"
            title="Software Engineer"
            org="CRBM @ UW"
            body="Led a team building a browser-based computational-biology modeling editor, and co-authored an Oxford Bioinformatics paper on a VSCode extension with 7,000+ downloads."
          />
        </div>
      </Section>

      <Section id="projects">
        <SectionHeader title="Projects" color="#f9a8d4" />
        <div className="grid w-full max-w-[640px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-10 gap-y-7">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </Section>
    </>
  );
}
