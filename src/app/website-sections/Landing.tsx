import NavCard from "../components/Nav-Card";
import SocialButton from "../components/Social-Button";
import Surprise from "./Surprise";

const links = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/el02/" },
  { name: "GitHub", href: "https://github.com/evaxliu" },
  { name: "Resume", href: "/Eva_Liu_Resume.pdf" }
]

export default function Landing() {
  return(
    <section className="flex flex-col items-start justify-center gap-7 w-full max-w-3xl p-10">
      <div className="flex gap-3">
        <Surprise />

        <p className="text-5xl text-white font-bold">
          Eva Liu
        </p>
      </div>

      <div className="flex flex-col gap-5 max-w-2xl">
        <h1 className="text-xl text-white font-bold">
          Software Engineer — available for full-time and intern roles
        </h1>

        <p className="text-md leading-8 text-violet-200 font-semibold">
          Masters in Computer Science @ Georgia Institute of Technology. I build research tools, web applications, and production software.
        </p>
      </div>

      <div className="flex gap-3 text-sm flex-wrap">
        {links.map(link => 
          <SocialButton key={link.name} name={link.name} url={link.href} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NavCard 
          title={"Work Experience"}
          description={"I build research tools, web applications, and production software."}
          link={"See Experience"}
          url={"engineering"}
          accentColor={"violet"}
        />

        <NavCard 
          title={"Education"}
          description={"UW Computer Science graduate, starting my MS in Computer Science at Georgia Tech this spring."}
          link={"See Education"} 
          url={"education"}
          accentColor={"green"}
        />
      </div>
    </section>
  );
}