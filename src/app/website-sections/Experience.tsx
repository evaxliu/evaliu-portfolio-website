import { ArrowRight } from "lucide-react";
import ExperienceCard from "../components/Experience-Card";
import ProjectCard from "../components/Project-Card";
import SectionHeader from "../components/Section-Header";
import LetsWorkTogether from "./Lets-Work-Together";
import Link from "next/link";

export default function Experience() {
  const CRBMProjects = [
    [
      "VSCode-Antimony Extension",
      "Oxford Software Publication ↗",
      "https://academic.oup.com/bioinformatics/article/39/12/btad753/7473373",
      "https://github.com/sys-bio/vscode-antimony",
    ],
    [
      "Antimony Web Editor",
      "Live Editor ↗",
      "https://sys-bio.github.io/AntimonyEditor/",
      "https://github.com/sys-bio/AntimonyEditor",
    ],
  ];

  const FreelanceProjects = [
    [
      "ZV Homeconstruction LLC",
      "zvhomes.org ↗",
      "https://www.zvhomes.org",
      "",
      "/projects/preview-zv.webp",
      "ZV Homeconstruction company website preview",
    ],
    [
      "Rice Thoughts Blog",
      "ricethoughts.com ↗",
      "https://www.ricethoughts.com/",
      "",
      "/projects/rice-thoughts.webp",
      "Rice Thoughts blog homepage and article layout",
    ],
  ];

  const sideProjects = [
    [
      "This Website!",
      "",
      "",
      "https://github.com/evaxliu/personal-website",
    ],
  ];

  return(
    <section className="flex flex-col gap-7 w-full max-w-3xl px-10">
      <SectionHeader label={"FOR ENGINEERING TEAMS"} color={"violet"} id={"engineering"} />

      <ExperienceCard 
        company={"Center for Reproducible Biomedical Modeling"}
        role={"Software Engineer → Software Engineer Lead"}
        descriptions={[
          "Led a team of 3 student engineers developing a browser-based computational-biology modeling editor — researchers now design simulation models without any local setup.",
          "Owned end-to-end execution — roadmap, sprint planning, and delivery — turning research requirements into shipped features.",
          "Presented research software at international conferences (COMBINE, HARMONY), shaping standards and interoperability practices.",
          "Co-authored a peer-reviewed Oxford Bioinformatics publication on a VSCode extension for Antimony — now at 6,000+ Marketplace downloads."
        ]}
        techStack={[
          "React",
          "TypeScript",
          "Python",
          "HTML / CSS",
          "VSCode API",
          "ANTLR",
        ]}
        accentColor={"violet"}
        projects={CRBMProjects}
      />

      <ExperienceCard 
        company={"Independent Contractor"}
        role={"Freelance Software Engineer"}
        descriptions={[
          "Sole engineer on client projects — scoping, building, launching, and supporting production software end to end. Details in Client Work below."
        ]}
        techStack={[]}
        accentColor={"violet"}
      />

      <SectionHeader label={"EDUCATION"} color={"violet"} />

      <ExperienceCard 
        company={"University of Washington"}
        role={"B.S. in Computer Science — Paul G. Allen School of Computer Science & Engineering"}
        descriptions={[]}
        techStack={[]}
        accentColor={"violet"}
        projects={sideProjects}
      />

      <SectionHeader label={"FOR YOUR BUSINESS"} color={"green"} id={"freelance"} />

      <section className="flex flex-col gap-4 grow w-full">
        <h3 className="text-xl text-white font-semibold">
          Featured Client Work
        </h3>

        <p className="text-[#8f82b0] font-medium">
          Built, launched, and running in production today.
        </p>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 text-green-300">
          {FreelanceProjects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project[0]}
              projLinkTitle={project[1]}
              projectLink={project[2]}
              codeLink={project[3]}
              imageSrc={project[4]}
              imageAlt={project[5]}
            />
          ))}
        </div>
        
        <Link
          href="/freelance-software-development"
          className="inline-flex items-center self-start gap-2 h-11 px-5 rounded-xl
            bg-[#221b39] border border-[#322851] text-green-300 text-sm font-bold
            hover:-translate-y-1 duration-300 ease-in-out group"
        >
          Services & how it works
          <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
        </Link>
      </section>

      <LetsWorkTogether heading={"Get in touch"} subheading={"Freelance project or full-time opportunity — let's talk."} />
    </section>
  );
}