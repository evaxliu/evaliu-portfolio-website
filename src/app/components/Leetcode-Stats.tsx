"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";

type ActivityDay = {
  date: string;
  count: number;
};

type RecentSubmission = {
  title: string;
  titleSlug: string;
  timestamp: number;
  status: string;
};

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

type ApiResponse =
  | {
      ok: true;
      data: Stats;
    }
  | {
      ok: false;
      error: string;
      profileUrl?: string;
    };

type State = {
  data?: Stats;
  error?: Extract<ApiResponse, { ok: false }>;
};

const TIME_ZONE = "America/Los_Angeles";

const difficultyStyles: Record<
  Difficulty,
  {
    bar: string;
    text: string;
  }
> = {
  Easy: {
    bar: "bg-green-300",
    text: "text-green-300",
  },
  Medium: {
    bar: "bg-amber-300",
    text: "text-amber-300",
  },
  Hard: {
    bar: "bg-rose-300",
    text: "text-rose-300",
  },
};

const activityColors = [
  "bg-[#120D1E]",
  "bg-[#3D2865]",
  "bg-[#6845AC]",
  "bg-[#9F70EB]",
  "bg-[#DDCCFF]",
];

const cardStyles =
  "w-full rounded-2xl border border-[#322851] border-l-4 border-l-violet-300 bg-[#1F1838] px-6 py-5";

function getActivityLevel(count: number, maximum: number) {
  if (count === 0 || maximum === 0) {
    return 0;
  }

  const ratio = count / maximum;

  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;

  return 4;
}

function formatSubmissionDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(timestamp * 1000));
}

function UpdatedTime({ timestamp }: { timestamp: string }) {
  const updatedAt = new Date(timestamp);
  const now = new Date();

  const dateKey = (date: Date) =>
    new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: TIME_ZONE,
    }).format(date);

  const sameDay = dateKey(updatedAt) === dateKey(now);

  const formatted = new Intl.DateTimeFormat("en-US", {
    ...(!sameDay && {
      month: "short",
      day: "numeric",
    }),
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(updatedAt);

  return (
    <p className="font-plex-mono text-sm text-violet-300/65">
      updated {formatted}
    </p>
  );
}

function ColumnLabel({ children }: { children: string }) {
  return (
    <p className="font-plex-mono text-xs font-semibold tracking-[1.5px] text-violet-300">
      {children}
    </p>
  );
}

function StatusText({ status }: { status: string }) {
  const accepted = status === "Accepted";
  const Icon = accepted ? Check : X;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap font-plex-sans text-xs font-semibold ${
        accepted ? "text-green-300" : "text-amber-300"
      }`}
    >
      <Icon
        aria-hidden="true"
        className="size-3"
        strokeWidth={3}
      />
      {status}
    </span>
  );
}

function ActivityGrid({
  activity,
}: {
  activity: ActivityDay[];
}) {
  const maximum = Math.max(
    ...activity.map(({ count }) => count),
    0,
  );

  return (
    <div className="grid grid-cols-6 gap-1.5">
      {activity.map(({ date, count }) => {
        const formattedDate =
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          }).format(new Date(`${date}T00:00:00Z`));

        const label = `${formattedDate}: ${count} submission${
          count === 1 ? "" : "s"
        }`;

        return (
          <div
            aria-label={label}
            className={`aspect-square rounded-md ${
              activityColors[
                getActivityLevel(count, maximum)
              ]
            }`}
            key={date}
            role="img"
            title={label}
          />
        );
      })}
    </div>
  );
}

function DifficultyBars({
  solved,
}: {
  solved: Record<Difficulty, number>;
}) {
  const maximum = Math.max(...Object.values(solved), 1);

  return (
    <div className="flex flex-col gap-4">
      {(Object.keys(solved) as Difficulty[]).map(
        (difficulty) => {
          const count = solved[difficulty];

          const width =
            count === 0
              ? 0
              : Math.max((count / maximum) * 100, 5);

          const style = difficultyStyles[difficulty];

          return (
            <div key={difficulty}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span
                  className={`text-sm font-semibold ${style.text}`}
                >
                  {difficulty}
                </span>

                <span className="text-sm font-bold text-white">
                  {count}
                </span>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-[#2b2148]">
                <div
                  aria-hidden="true"
                  className={`h-full rounded-full ${style.bar}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}

function SubmissionRow({
  submission,
}: {
  submission: RecentSubmission;
}) {
  return (
    <li>
      <a
        className="group flex flex-col gap-1.5 rounded-xl border border-[#2b2148] px-4 py-3.5 transition-colors hover:border-violet-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        href={`https://leetcode.com/problems/${submission.titleSlug}/`}
        rel="noreferrer"
        target="_blank"
      >
        <span className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
          {submission.title}
        </span>

        <span className="flex items-center gap-2">
          <StatusText status={submission.status} />

          <span className="font-plex-mono text-xs text-violet-300/60">
            {formatSubmissionDate(submission.timestamp)}
          </span>
        </span>
      </a>
    </li>
  );
}

function Message({
  children,
  profileUrl,
}: {
  children: string;
  profileUrl?: string;
}) {
  return (
    <section className={`${cardStyles} flex flex-col gap-3`}>
      <h2 className="text-md font-bold text-white">
        LeetCode stats
      </h2>

      <p className="text-sm font-semibold text-violet-200">
        {children}
      </p>

      {profileUrl && (
        <a
          className="font-plex-sans text-xs font-semibold text-violet-300"
          href={profileUrl}
          rel="noreferrer"
          target="_blank"
        >
          View profile on LeetCode ↗
        </a>
      )}
    </section>
  );
}

export default function LeetCodeStats() {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const controller = new AbortController();
    let requestInProgress = false;

    async function loadStats() {
      if (requestInProgress) {
        return;
      }

      requestInProgress = true;

      try {
        const response = await fetch("/api/leetcode", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
          signal: controller.signal,
        });

        const result = (await response.json()) as ApiResponse;

        if (!response.ok || !result.ok) {
          setState((currentState) => {
            // Keep displaying existing data if only a refresh failed.
            if (currentState.data) {
              return currentState;
            }

            return {
              error: result.ok
                ? {
                    ok: false,
                    error:
                      "The live stats could not be loaded right now.",
                  }
                : result,
            };
          });

          return;
        }

        setState({
          data: result.data,
        });
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Could not load LeetCode stats:", error);

        setState((currentState) => {
          // Do not replace visible data with an error during
          // a temporary refresh failure.
          if (currentState.data) {
            return currentState;
          }

          return {
            error: {
              ok: false,
              error:
                "The live stats could not be loaded right now.",
            },
          };
        });
      } finally {
        requestInProgress = false;
      }
    }

    void loadStats();

    const intervalId = window.setInterval(() => {
      void loadStats();
    }, 30_000);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void loadStats();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      controller.abort();
      window.clearInterval(intervalId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  if (state.error) {
    return (
      <Message profileUrl={state.error.profileUrl}>
        {state.error.error}
      </Message>
    );
  }

  if (!state.data) {
    return <Message>Loading live stats...</Message>;
  }

  const stats = state.data;

  return (
    <section
      aria-labelledby="leetcode-stats-heading"
      className={`${cardStyles} flex flex-col gap-4`}
    >
      <div className="flex justify-between gap-3">
        <div>
          <a
            href={stats.profileUrl}
            rel="noreferrer"
            target="_blank"
          >
            <h2
              className="text-md font-bold text-white transition-colors hover:text-violet-300"
              id="leetcode-stats-heading"
            >
              LeetCode stats
            </h2>
          </a>

          <UpdatedTime timestamp={stats.fetchedAt} />
        </div>

        <p className="font-plex-mono text-sm text-violet-300">
          streak{" "}
          <span className="font-semibold text-white">
            {stats.currentStreak}
          </span>

          <span className="mx-2 text-violet-300/40">·</span>

          best{" "}
          <span className="font-semibold text-white">
            {stats.bestStreak}
          </span>
        </p>
      </div>

      <div className="h-px w-full bg-[#2b2148]" />

      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <ColumnLabel>LAST 30 DAYS</ColumnLabel>
            <ActivityGrid activity={stats.activity} />
          </div>

          <div className="flex flex-col gap-3">
            <ColumnLabel>SOLVED</ColumnLabel>
            <DifficultyBars solved={stats.solved} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <ColumnLabel>RECENT SUBMISSIONS</ColumnLabel>

          {stats.recentSubmissions.length ? (
            <div className="relative min-h-0 flex-1">
              <ul
                className="
                  absolute inset-0 flex flex-col gap-2.5 overflow-y-auto overscroll-contain pt-2 pr-3
                  [scrollbar-color:#453465_transparent] [scrollbar-width:thin]
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-[#453465]
                  [&::-webkit-scrollbar-thumb:hover]:bg-[#6b539b]
                "
              >
                {stats.recentSubmissions.map(
                  (submission) => (
                    <SubmissionRow
                      key={submission.titleSlug}
                      submission={submission}
                    />
                  ),
                )}
              </ul>
            </div>
          ) : (
            <p className="text-sm font-semibold text-violet-200">
              No public recent submissions were returned by
              LeetCode.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}