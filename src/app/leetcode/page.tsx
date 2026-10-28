import Link from "next/link";
import LeetCodeStats from "../components/Leetcode-Stats";

export default function LeetCodePage() {
  return (
    <div className="halo flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[696px] px-7 pt-6">
        <Link
          href="/"
          className="inline-flex text-[14.5px] font-medium leading-none text-[#8f82b0] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          ← Back to home
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-[696px] flex-1 flex-col px-7">
        <div className="my-auto pb-12 pt-12">
          <LeetCodeStats />
        </div>
      </div>
    </div>
  );
}
