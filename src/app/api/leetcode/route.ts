import { NextResponse } from "next/server";

// Set LEETCODE_USERNAME in your Vercel project env (or .env.local).
const USERNAME = process.env.LEETCODE_USERNAME ?? "";
const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;
const TIME_ZONE = "America/Los_Angeles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const QUERY = `
query stats($username: String!, $limit: Int!) {
  matchedUser(username: $username) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { submissionCalendar }
  }
  recentSubmissionList(username: $username, limit: $limit) {
    title titleSlug timestamp statusDisplay
  }
}`;

const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: TIME_ZONE }).format(d);

export async function GET() {
  if (!USERNAME) {
    return NextResponse.json({ ok: false, error: "LEETCODE_USERNAME is not set." }, { status: 500 });
  }
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME, limit: 10 } }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);
    const { data } = await res.json();
    const user = data?.matchedUser;
    if (!user) throw new Error("User not found");

    const solved = { Easy: 0, Medium: 0, Hard: 0 };
    for (const { difficulty, count } of user.submitStatsGlobal.acSubmissionNum) {
      if (difficulty in solved) solved[difficulty as keyof typeof solved] = count;
    }

    // Calendar is { unixSeconds: count }. Bucket by local day.
    const byDay = new Map<string, number>();
    const cal: Record<string, number> = JSON.parse(user.userCalendar?.submissionCalendar || "{}");
    for (const [ts, count] of Object.entries(cal)) {
      const k = dayKey(new Date(Number(ts) * 1000));
      byDay.set(k, (byDay.get(k) ?? 0) + count);
    }

    const today = new Date();
    const activity = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      const date = dayKey(d);
      return { date, count: byDay.get(date) ?? 0 };
    });

    // Streaks over the whole calendar.
    const days = [...byDay.keys()].filter((k) => (byDay.get(k) ?? 0) > 0).sort();
    let best = 0, run = 0, prev: number | null = null;
    for (const k of days) {
      const t = Date.parse(`${k}T00:00:00Z`) / 86400000;
      run = prev !== null && t - prev === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = t;
    }
    let current = 0;
    const cursor = new Date(today);
    if (!byDay.get(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (byDay.get(dayKey(cursor))) {
      current++;
      cursor.setDate(cursor.getDate() - 1);
    }

    const recentSubmissions = (data.recentSubmissionList ?? []).map(
      (s: { title: string; titleSlug: string; timestamp: string; statusDisplay: string }) => ({
        title: s.title,
        titleSlug: s.titleSlug,
        timestamp: Number(s.timestamp),
        status: s.statusDisplay,
      }),
    );

    return NextResponse.json(
      {
        ok: true,
        data: {
          username: USERNAME,
          profileUrl: PROFILE_URL,
          solved,
          activity,
          currentStreak: current,
          bestStreak: best,
          recentSubmissions,
          fetchedAt: new Date().toISOString(),
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("LeetCode fetch failed:", error);
    return NextResponse.json(
      { ok: false, error: "The live stats could not be loaded right now.", profileUrl: PROFILE_URL },
      { status: 502 },
    );
  }
}
