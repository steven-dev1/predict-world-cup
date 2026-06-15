"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase/client";
import { LeaderboardTable } from "@/components/leaderboard-table";
import type { LeaderboardEntry } from "@/types/database";
import { Trophy, Loader2, Info } from "lucide-react";

export default function LeaderboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const loadedRef = useRef(false);

  const loadLeaderboard = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const { data: predictions } = await supabase
      .from("predictions")
      .select("*, profiles:user_id(username)");

    if (!predictions) {
      setLoading(false);
      return;
    }

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

      const { data: match } = await supabase
        .from("matches")
        .select("score_home, score_away")
        .eq("id", pred.match_id)
        .single();

      if (match && match.score_home !== null && match.score_away !== null) {
        const predHome = pred.score_home;
        const predAway = pred.score_away;
        const actualHome = match.score_home;
        const actualAway = match.score_away;

        if (predHome === actualHome && predAway === actualAway) {
          stats.exact_scores++;
          stats.total_points += 3;
        } else {
          const predResult =
            predHome > predAway ? "W" : predHome < predAway ? "L" : "D";
          const actualResult =
            actualHome > actualAway
              ? "W"
              : actualHome < actualAway
              ? "L"
              : "D";

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

    setEntries(sorted);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadLeaderboard();
    }
  }, [user, loadLeaderboard]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-2xl px-4 py-6">
        {/* Title */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20">
            <Trophy className="h-8 w-8 text-amber-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Clasificacion</h1>
          <p className="mt-1 text-sm text-slate-400">
            El que mas acierte, mas puntos suma
          </p>
        </div>

        {/* Points system */}
        <div className="mb-6 rounded-2xl border border-slate-700/40 bg-slate-800/40 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
            <Info className="h-4 w-4 text-blue-400" />
            Sistema de puntos
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-blue-500/10 border border-blue-500/15 px-3 py-2">
              <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-sm font-bold text-blue-400">
                3 pts
              </span>
              <span className="text-xs text-slate-400">Resultado exacto</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15 px-3 py-2">
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-sm font-bold text-amber-400">
                1 pt
              </span>
              <span className="text-xs text-slate-400">Ganador correcto</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <LeaderboardTable entries={entries} currentUserId={user?.id} />
      </main>
    </div>
  );
}
