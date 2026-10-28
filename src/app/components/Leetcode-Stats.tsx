"use client";

import { useEffect, useState } from "react";
import { Planet } from "./Section-Header";

type Difficulty = "Easy" | "Medium" | "Hard";
type ActivityDay = { date: string; count: number };
type RecentSubmission = { title: string; titleSlug: string; timestamp: number; status: string };
type Stats = {
  username: string;
  profileUrl: string;
  solved: Record<Difficulty, number>;
  activity: ActivityDay[];
  currentStreak: number;
  bestStreak: number;
  recentSubmissions: RecentSubmission[];
  fetchedAt: string;
};
type ApiResponse = { ok: true; data: Stats } | { ok: false; error: string; profileUrl?: string };
type State = { data?: Stats; error?: Extract<ApiResponse, { ok: false }> };

const TIME_ZONE = "America/Los_Angeles";
const DIFFICULTY_COLORS: Record<Difficulty, string> = { Easy: "#86efac", Medium: "#fde68a", Hard: "#f9a8d4" };
const ACTIVITY_SHADES = ["#17132e", "#2c2450", "#4c3d8a", "#8b73d6", "#ddd6fe"];

function getActivityLevel(count: number, maximum: number) {
  if (count === 0 || maximum === 0) return 0;
  const ratio = count / maximum;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function formatSubmissionDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(timestamp * 1000),
  );
}

function formatUpdated(timestamp: string) {
  const updatedAt = new Date(timestamp);
  const key = (d: Date) =>
    new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: TIME_ZONE }).format(d);
  const sameDay = key(updatedAt) === key(new Date());
  return new Intl.DateTimeFormat("en-US", {
    ...(!sameDay && { month: "short", day: "numeric" }),
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(updatedAt);
}

function BlockHeading({ title, color }: { title: string; color: string }) {
  return (
    <h3 className="mb-3 flex items-center gap-2.5 font-space-grotesk text-[19px] font-semibold leading-none text-white">
      <Planet color={color} size={18} />
      {title}
    </h3>
  );
}

function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <h1 className="font-space-grotesk text-[30px] font-semibold leading-tight tracking-[-0.015em] text-white [text-wrap:balance]">
        My LeetCode, on display, for accountability.
      </h1>
      {children}
    </header>
  );
}

function ActivityGrid({ activity }: { activity: ActivityDay[] }) {
  const maximum = Math.max(...activity.map(({ count }) => count), 0);
  return (
    <div className="border-t border-[#1d1834] pt-3">
      <div className="grid grid-cols-6 gap-1.5">
        {activity.map(({ date, count }) => {
          const formatted = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          }).format(new Date(`${date}T00:00:00Z`));
          const label = `${formatted}: ${count} submission${count === 1 ? "" : "s"}`;
          return (
            <div
              key={date}
              role="img"
              aria-label={label}
              title={label}
              className="aspect-square rounded-[7px]"
              style={{ background: ACTIVITY_SHADES[getActivityLevel(count, maximum)] }}
            />
          );
        })}
      </div>
    </div>
  );
}

function DifficultyBars({ solved }: { solved: Record<Difficulty, number> }) {
  const maximum = Math.max(...Object.values(solved), 1);
  return (
    <div className="flex flex-col border-b border-[#1d1834]">
      {(Object.keys(solved) as Difficulty[]).map((difficulty) => {
        const count = solved[difficulty];
        const width = count === 0 ? 0 : Math.max((count / maximum) * 100, 5);
        const color = DIFFICULTY_COLORS[difficulty];
        return (
          <div key={difficulty} className="flex flex-col gap-2 border-t border-[#1d1834] py-[7px]">
            <div className="flex justify-between text-[16px] font-medium leading-none">
              <span style={{ color }}>{difficulty}</span>
              <span className="font-semibold text-white">{count}</span>
            </div>
            <div className="h-1 overflow-hidden rounded bg-[#1d1834]">
              <div aria-hidden="true" className="h-full rounded" style={{ width: `${width}%`, background: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SubmissionRow({ submission }: { submission: RecentSubmission }) {
  const accepted = submission.status === "Accepted";
  return (
    <li className="flex flex-1 border-t border-[#1d1834]">
      <a
        href={`https://leetcode.com/problems/${submission.titleSlug}/`}
        target="_blank"
        rel="noreferrer"
        className="group flex w-full flex-col justify-center gap-1 py-[9px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
      >
        <span className="break-words text-[16px] font-medium leading-snug text-white transition-colors group-hover:text-[#c4b5fd]">
          {submission.title}
        </span>
        <span className="flex flex-wrap gap-2.5 text-[14px] leading-none">
          <span style={{ color: accepted ? "#86efac" : "#fde68a" }}>
            {accepted ? "✓" : "✕"} {submission.status}
          </span>
          <span className="text-[#8f82b0]">{formatSubmissionDate(submission.timestamp)}</span>
        </span>
      </a>
    </li>
  );
}

function Message({ children, profileUrl }: { children: string; profileUrl?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Header />
      <p className="text-[15.5px] text-[#b8aed4]">{children}</p>
      {profileUrl && (
        <a className="text-[13.5px] font-semibold text-[#c4b5fd]" href={profileUrl} rel="noreferrer" target="_blank">
          View profile on LeetCode ↗
        </a>
      )}
    </div>
  );
}

export default function LeetCodeStats() {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const controller = new AbortController();
    let inFlight = false;
    const fallback = { ok: false as const, error: "The live stats could not be loaded right now." };

    async function loadStats() {
      if (inFlight) return;
      inFlight = true;
      try {
        const response = await fetch("/api/leetcode", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
          signal: controller.signal,
        });
        const result = (await response.json()) as ApiResponse;
        if (!response.ok || !result.ok) {
          // Keep showing existing data if only a refresh failed.
          setState((s) => (s.data ? s : { error: result.ok ? fallback : result }));
          return;
        }
        setState({ data: result.data });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Could not load LeetCode stats:", error);
        setState((s) => (s.data ? s : { error: fallback }));
      } finally {
        inFlight = false;
      }
    }

    void loadStats();
    const intervalId = window.setInterval(() => void loadStats(), 30_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") void loadStats();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      controller.abort();
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (state.error) return <Message profileUrl={state.error.profileUrl}>{state.error.error}</Message>;
  if (!state.data) return <Message>Loading live stats...</Message>;

  const stats = state.data;

  return (
    <div>
      <Header>
        <div className="flex flex-wrap justify-center gap-x-[18px] gap-y-1.5 text-[15px] leading-snug text-[#8f82b0]">
          <span>updated {formatUpdated(stats.fetchedAt)}</span>
          <span>
            streak <b className="font-semibold text-white">{stats.currentStreak}</b>
          </span>
          <span>
            best <b className="font-semibold text-white">{stats.bestStreak}</b>
          </span>
          <a href={stats.profileUrl} target="_blank" rel="noreferrer" className="text-[#c4b5fd] hover:text-white">
            profile ↗
          </a>
        </div>
      </Header>

      <section aria-label="LeetCode stats" className="mt-11 flex flex-wrap gap-x-11 gap-y-9">
        <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-[22px]">
          <div>
            <BlockHeading title="Last 30 days" color="#c4b5fd" />
            <ActivityGrid activity={stats.activity} />
          </div>
          <div>
            <BlockHeading title="Solved" color="#86efac" />
            <DifficultyBars solved={stats.solved} />
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_280px] flex-col self-stretch">
          <BlockHeading title="Recent submissions" color="#f9a8d4" />
          {stats.recentSubmissions.length ? (
            <ul className="flex flex-1 flex-col border-b border-[#1d1834]">
              {stats.recentSubmissions.slice(0, 5).map((submission) => (
                <SubmissionRow key={submission.titleSlug + submission.timestamp} submission={submission} />
              ))}
            </ul>
          ) : (
            <p className="border-t border-[#1d1834] pt-3 text-[15.5px] text-[#b8aed4]">
              No public recent submissions were returned by LeetCode.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
