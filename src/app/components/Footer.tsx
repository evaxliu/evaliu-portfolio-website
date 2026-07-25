import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/el02/" },
    { name: "GitHub", href: "https://github.com/evaxliu" },
    { name: "Resume", href: "/EvaLiuResume.pdf" }
  ]

  return(
    <footer className="flex flex-col md:flex-row gap-7 w-full max-w-3xl px-10 py-15 justify-between text-sm">
      <div>
        <p className="text-[#8f82b0] font-semibold">
          Eva Liu · evaxliu.com ✦
        </p>
      </div>

      <div className="flex gap-3 text-[#8f82b0] font-semibold">
        {links.map(link => 
          <Link 
            key={link.name}
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.name}
          </Link>
        )}
      </div>
    </footer>
  );
}