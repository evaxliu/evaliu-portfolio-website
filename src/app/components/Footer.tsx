import Link from "next/link";

const links = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/el02/" },
  { name: "GitHub", href: "https://github.com/evaxliu" },
  { name: "Resume", href: "/Eva_Liu_Resume.pdf" },
];

export default function Footer() {
  return (
    <footer className="halo relative z-[2] mx-auto flex w-full max-w-[696px] flex-wrap items-center justify-between gap-5 px-7 pb-11 pt-6 text-[15px]">
      <p className="font-semibold text-[#8f82b0]">Eva Liu · evaxliu.com ✦</p>
      <div className="flex gap-3.5 font-semibold text-[#8f82b0]">
        {links.map((link) => (
          <Link key={link.name} href={link.href} rel="noopener noreferrer" target="_blank" className="hover:text-white">
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
