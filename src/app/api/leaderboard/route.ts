import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();

  // Fetch all predictions with user info
  const { data: predictions, error: predError } = await supabase
    .from("predictions")
    .select("*, profiles:user_id(username)");

  if (predError) {
    return NextResponse.json({ error: predError.message }, { status: 500 });
  }

  if (!predictions) {
    return NextResponse.json([]);
  }

  // Fetch all matches once
  const { data: allMatches } = await supabase
    .from("matches")
    .select("id, score_home, score_away");

  // Create a map for O(1) lookup
  const matchScores = new Map<number, { score_home: number | null; score_away: number | null }>();
  for (const m of allMatches || []) {
    matchScores.set(m.id, { score_home: m.score_home, score_away: m.score_away });
  }

  // Calculate stats
  const userStats: Record<
    string,
    {
      username: string;
      total_points: number;
      exact_scores: number;
      correct_results: number;
      total_predictions: number;
    }
  > = {};

  for (const pred of predictions) {
    const userId = pred.user_id;
    if (!userStats[userId]) {
      userStats[userId] = {
        username: (pred.profiles as { username: string })?.username ?? "Unknown",
        total_points: 0,
        exact_scores: 0,
        correct_results: 0,
        total_predictions: 0,
      };
    }

    const stats = userStats[userId];
    stats.total_predictions++;

    const match = matchScores.get(pred.match_id);

    if (match && match.score_home !== null && match.score_away !== null) {
      const predHome = pred.score_home;
      const predAway = pred.score_away;
      const actualHome = match.score_home;
      const actualAway = match.score_away;

      if (predHome === actualHome && predAway === actualAway) {
        stats.exact_scores++;
        stats.total_points += 3;
      } else {
        const predResult = predHome > predAway ? "W" : predHome < predAway ? "L" : "D";
        const actualResult = actualHome > actualAway ? "W" : actualHome < actualAway ? "L" : "D";

        if (predResult === actualResult) {
          stats.correct_results++;
          stats.total_points += 1;
        }
      }
    }
  }

  const sorted = Object.entries(userStats)
    .map(([user_id, stats]) => ({ user_id, ...stats }))
    .sort((a, b) => b.total_points - a.total_points);

  return NextResponse.json(sorted);
}
