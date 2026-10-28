import Image from "next/image";
import Link from "next/link";
import SocialButton from "../components/Social-Button";

const SKILLS = ["React", "TypeScript", "Next.js", "Python", "HTML/CSS"];

export default function Landing() {
  return (
    <header className="mx-auto flex max-w-[560px] flex-col items-center gap-5 pt-[170px] text-center">
      <div className="flex items-center gap-3">
        <Link
          href="/leetcode"
          aria-label="View live LeetCode stats"
          title="psst — live LeetCode stats"
          className="inline-flex transition-transform duration-[250ms] hover:rotate-[-8deg] hover:scale-110"
        >
          <Image src="/purple-star.png" alt="" width={40} height={40} className="animate-bounce-star" priority />
        </Link>
        <p className="font-space-grotesk text-[42px] font-bold leading-none tracking-[-0.025em] text-white">Eva Liu</p>
      </div>

      <h1 className="font-space-grotesk text-[21px] font-medium leading-[1.5] text-white [text-wrap:balance]">
        Hi, I&apos;m{" "}
        <span className="text-[#c4b5fd] underline decoration-[#f9a8d4] decoration-wavy decoration-[1.5px] underline-offset-[6px]">
          Eva
        </span>{" "}
        — a software engineer available for full-time and intern roles.
      </h1>

      <p className="text-[17px] leading-[1.7] text-[#b8aed4] [text-wrap:balance]">
        I build research tools, web apps, and production software.
      </p>

      <p className="text-[14.5px] font-medium leading-relaxed tracking-[0.02em] text-[#8f82b0] [text-wrap:balance]">
        {SKILLS.map((skill, i) => (
          <span key={skill}>
            {i > 0 && <span className="text-[#4a3d6b]"> · </span>}
            {skill}
          </span>
        ))}
      </p>

      <div className="mt-1 flex flex-wrap justify-center gap-2.5">
        <SocialButton name="LinkedIn" href="https://www.linkedin.com/in/el02/" />
        <SocialButton name="GitHub" href="https://github.com/evaxliu" />
        <SocialButton name="Resume" href="/Eva_Liu_Resume.pdf" primary />
      </div>
    </header>
  );
}
