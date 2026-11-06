import type { ReactNode } from "react";

export type ProjectLink = { label: "Website" | "Code" | "Paper"; href: string };

const LINK_COLORS: Record<ProjectLink["label"], string> = {
  Website: "#86efac",
  Code: "#f9a8d4",
  Paper: "#fde68a",
};

type Props = {
  name: string;
  description: string;
  color: string;
  icon: ReactNode;
  iconTitle: string;
  tag?: string;
  links: ProjectLink[];
};

export default function ProjectCard({ name, description, color, icon, iconTitle, tag, links }: Props) {
  return (
    <div className="grid grid-cols-[20px_minmax(0,1fr)] content-start items-start gap-x-3.5 gap-y-2 border-t border-[#1d1834] py-4">
      <span title={iconTitle} className="mt-[3px] grid size-5 place-items-center" style={{ color }}>
        {icon}
      </span>
      <div className="flex flex-col gap-[5px]">
        <h3 className="flex flex-wrap items-center gap-2 font-space-grotesk text-[18.5px] font-semibold leading-snug text-white">
          {name}
          {tag && (
            <span className="rounded-full border border-[#2f4a3a] px-2 py-[3px] font-plex-sans text-[12px] font-medium leading-tight text-[#86efac] [text-shadow:none]">
              {tag}
            </span>
          )}
        </h3>
        <p className="text-[15.5px] leading-[1.6] text-[#8f82b0] [text-wrap:pretty]">{description}</p>
      </div>
      <div className="col-start-2 flex flex-wrap gap-4 text-[13.5px] font-medium leading-none">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-75"
            style={{ color: LINK_COLORS[link.label] }}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}