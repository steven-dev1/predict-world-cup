"use client";

import type { LeaderboardEntry } from "@/types/database";
import { Trophy, Medal, Target, Hash } from "lucide-react";
import clsx from "clsx";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-8 text-center">
        <Trophy className="mx-auto mb-3 h-12 w-12 text-slate-600" />
        <p className="text-slate-400">Aun no hay predicciones</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, index) => {
        const isCurrentUser = entry.user_id === currentUserId;
        const rank = index + 1;

        return (
          <div
            key={entry.user_id}
            className={clsx(
              "flex items-center gap-3 rounded-2xl border p-4 transition-all",
              isCurrentUser
                ? "border-blue-500/30 bg-blue-950/30"
                : "border-slate-700/40 bg-slate-800/40",
              rank === 1 && "border-amber-500/30 bg-amber-950/15",
              rank === 2 && "border-slate-400/20 bg-slate-700/20",
              rank === 3 && "border-orange-600/20 bg-orange-950/15"
            )}
          >
            {/* Rank */}
            <div className="flex h-10 w-10 items-center justify-center flex-shrink-0">
              {rank === 1 ? (
                <Medal className="h-8 w-8 text-amber-400" />
              ) : rank === 2 ? (
                <Medal className="h-7 w-7 text-slate-300" />
              ) : rank === 3 ? (
                <Medal className="h-6 w-6 text-orange-500" />
              ) : (
                <span className="text-lg font-bold text-slate-600">#{rank}</span>
              )}
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    "font-semibold truncate",
                    isCurrentUser ? "text-blue-300" : "text-white"
                  )}
                >
                  {entry.username}
                </span>
                {isCurrentUser && (
                  <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-xs text-blue-400 font-medium">
                    TU
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {entry.exact_scores} exactos
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {entry.total_predictions} predicciones
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right flex-shrink-0">
              <div
                className={clsx(
                  "text-2xl font-bold",
                  rank === 1
                    ? "text-amber-400"
                    : rank === 2
                    ? "text-slate-300"
                    : rank === 3
                    ? "text-orange-400"
                    : "text-white"
                )}
              >
                {entry.total_points}
              </div>
              <div className="text-xs text-slate-500">pts</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
