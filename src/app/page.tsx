import Landing from "./website-sections/Landing";
import Experience from "./website-sections/Experience";
import Orbits from "./components/Orbits";

export default function Page() {
  return (
    <div className="relative overflow-hidden pb-[88px]">
      <Orbits />
      <div className="halo relative z-[2] mx-auto w-full max-w-[960px] px-7">
        <div className="py-6" />
        <Landing />
        <Experience />
      </div>
    </div>
  );
}
