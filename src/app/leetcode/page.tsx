import Link from "next/link";
import LeetCodeStats from "../components/Leetcode-Stats";
import Confetti from "../components/Confetti";

export default function LeetCodePage() {
  return (
    <section className="w-full">
      <Confetti />
      <div className="mx-auto flex w-full max-w-3xl p-10 flex-col gap-7">
        <div className="flex gap-3">  
          <p className="text-3xl text-white font-bold">
            My unnecessarily public LeetCode tracker.
          </p>
        </div>
        <Link
          className="
            w-fit font-plex-mono text-sm font-semibold
            text-violet-300 transition-colors
            hover:text-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-violet-300
          "
          href="/"
        >
          ← Back to home
        </Link>

        <LeetCodeStats />
      </div>
    </section>
  );
}