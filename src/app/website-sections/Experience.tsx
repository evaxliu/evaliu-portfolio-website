import ExperienceCard from "../components/Experience-Card";
import SectionHeader from "../components/Section-Header";

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

  const contractProjects = [
    [
      "ZV Homeconstruction LLC",
      "zvhomes.org ↗",
      "https://www.zvhomes.org",
      "https://github.com/evaxliu/zv-homeconstruction-website",
      "/projects/preview-zv.webp",
      "ZV Homeconstruction company website preview",
    ]
  ];

  const gtechProjects = [
    [
      "This Website!",
      "",
      "",
      "https://github.com/evaxliu/personal-website",
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

  const uwProjects = [
    [
      "Pet My Dog",
      "",
      "",
      "https://github.com/evaxliu/pet-my-dog",
    ],
    [
      "Find Your Needs",
      "",
      "",
      "https://github.com/evaxliu/find-your-needs",
    ],
  ];

  return(
    <section className="flex flex-col gap-7 w-full max-w-3xl px-10">
      <SectionHeader label={"WORK EXPERIENCE"} color={"violet"} id={"engineering"} />

      <ExperienceCard 
        company={"Center for Reproducible Biomedical Modeling"}
        role={"Software Engineer"}
        descriptions={[
          "Led a team of 3 student engineers developing a browser-based computational-biology modeling editor — researchers now design simulation models without any local setup.",
          "Owned end-to-end execution — roadmap, sprint planning, and delivery — turning research requirements into shipped features.",
          "Presented research software at international conferences (COMBINE, HARMONY), shaping standards and interoperability practices.",
          "Co-authored a peer-reviewed Oxford Bioinformatics publication on a VSCode extension for Antimony — now at 7,000+ Marketplace downloads."
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
        company={"Z&V Home Construction LLD"}
        role={"Contract Software Engineer"}
        descriptions={[
          "Designed, built, and launched the company's website end to end, replacing its previous Wix site with a custom build I owned from discovery through delivery.",
          "Developed a responsive marketing site in Next.js, React, TypeScript, and Tailwind CSS, including a project gallery, service sections, and a lead capture contact form.",
          "Translated business goals and broad requirements into a technical plan, visual direction, and delivery timeline, working directly with the owners throughout.",
          "Handled deployment, hosting, custom domain, and HTTPS setup, giving the business a self-maintaining production site with automatic builds from source control.",
          "Implemented technical SEO with page metadata, Open Graph tags, and a sitemap, then verified the site in Google Search Console and got it indexed for local search terms.",
          "Provide ongoing support for the live site through content updates, performance improvements, and feature work."
        ]}
        techStack={[]}
        accentColor={"violet"}
        projects={contractProjects}
      />

      <SectionHeader label={"EDUCATION"} color={"green"} id={"education"} />

      <ExperienceCard 
        company={"Georgia Institute of Technology"}
        role={"M.S. in Computer Science — College of Computing"}
        descriptions={[]}
        techStack={[]}
        accentColor={"green"}
        projects={gtechProjects}
      />

      <ExperienceCard 
        company={"University of Washington"}
        role={"B.S. in Computer Science — Paul G. Allen School of Computer Science & Engineering"}
        descriptions={[]}
        techStack={[]}
        accentColor={"green"}
        projects={uwProjects}
      />
    </section>
  );
}