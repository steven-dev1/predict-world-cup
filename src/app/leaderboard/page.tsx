"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useLeaderboard } from "@/hooks/use-data";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { Trophy, Loader2, Info } from "lucide-react";

export default function LeaderboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { leaderboard, isLoading } = useLeaderboard();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || isLoading) {
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
          <h1 className="text-xl font-bold text-white">Clasificación</h1>
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
              <span className="flex items-baseline gap-1 rounded-md bg-blue-500/20 px-2 py-0.5">
                <span className="text-sm font-bold text-blue-400">3</span>
                <span className="text-xs text-blue-400">pts</span>
              </span>
              <span className="text-xs text-slate-400">Resultado exacto</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15 px-3 py-2">
              <span className="flex items-baseline gap-1 rounded-md bg-amber-500/20 px-2 py-0.5">
                <span className="text-sm font-bold text-amber-400">1</span>
                <span className="text-xs text-amber-400">pt</span>
              </span>
              <span className="text-xs text-slate-400">Ganador correcto</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <LeaderboardTable entries={leaderboard} currentUserId={user?.id} />
      </main>
    </div>
  );
}
