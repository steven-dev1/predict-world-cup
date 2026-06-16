"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useMatches, usePredictions } from "@/hooks/use-data";
import { Flag } from "@/components/flag";
import { formatMatchTime } from "@/data/matches";
import type { Match } from "@/types/database";
import {
  Users,
  Loader2,
  CalendarDays,
  Clock,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

interface PredictionWithUser {
  id: string;
  score_home: number;
  score_away: number;
  username: string;
  user_id: string;
}

interface MatchWithPredictions extends Match {
  predictions: PredictionWithUser[];
}

// Helper to get today in Colombia timezone
function getColombiaToday(): Date {
  const now = new Date();
  const colombiaStr = now.toLocaleString("en-US", { timeZone: "America/Bogota" });
  const colombia = new Date(colombiaStr);
  return new Date(colombia.getFullYear(), colombia.getMonth(), colombia.getDate());
}

export default function TodayPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { matches, isLoading: matchesLoading } = useMatches();
  const { predictions, isLoading: predsLoading } = usePredictions();
  const [selectedDate, setSelectedDate] = useState<Date>(getColombiaToday());

  const loading = matchesLoading || predsLoading;

  // Group predictions by match_id
  const predictionsByMatch = useMemo(() => {
    const map: Record<number, PredictionWithUser[]> = {};
    for (const pred of predictions) {
      const matchId = pred.match_id;
      if (!map[matchId]) {
        map[matchId] = [];
      }
      // profiles may or may not exist depending on API response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profiles = (pred as any).profiles as { username: string } | undefined;
      map[matchId].push({
        id: pred.id,
        score_home: pred.score_home,
        score_away: pred.score_away,
        username: profiles?.username ?? "Anonimo",
        user_id: pred.user_id,
      });
    }
    return map;
  }, [predictions]);

  // Combine matches with predictions
  const matchesWithPredictions: MatchWithPredictions[] = useMemo(
    () =>
      matches.map((match) => ({
        ...match,
        predictions: predictionsByMatch[match.id] ?? [],
      })),
    [matches, predictionsByMatch]
  );

  // "Ahora" en Colombia para comparar con fechas de DB
  const nowColombia = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
  );

  // Filter matches by selected date
  const filteredMatches = useMemo(() => {
    return matchesWithPredictions.filter((m) => {
      const matchDate = new Date(m.match_date);
      return (
        matchDate.getFullYear() === selectedDate.getFullYear() &&
        matchDate.getMonth() === selectedDate.getMonth() &&
        matchDate.getDate() === selectedDate.getDate()
      );
    });
  }, [matchesWithPredictions, selectedDate]);

  // Navigate dates
  const goToPrevDate = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const goToNextDate = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const goToToday = () => {
    setSelectedDate(getColombiaToday());
  };

  const isToday = selectedDate.toDateString() === getColombiaToday().toDateString();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

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
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/15">
            <Users className="h-7 w-7 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">
            Predicciones del grupo
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Lo que predicen tus amigos
          </p>
        </div>

        {/* Date navigator */}
        <div className="mb-6 rounded-2xl border border-slate-700/40 bg-slate-800/40 p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevDate}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/40 text-slate-400 hover:bg-slate-600/40 hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <CalendarDays
                  className={clsx(
                    "h-4 w-4",
                    isToday ? "text-blue-400" : "text-slate-500"
                  )}
                />
                <span
                  className={clsx(
                    "text-sm font-semibold capitalize",
                    isToday ? "text-blue-300" : "text-slate-300"
                  )}
                >
                  {formatDate(selectedDate)}
                </span>
              </div>
              {!isToday && (
                <button
                  onClick={goToToday}
                  className="mt-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  Volver a hoy
                </button>
              )}
            </div>

            <button
              onClick={goToNextDate}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/40 text-slate-400 hover:bg-slate-600/40 hover:text-white transition-all active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Matches with predictions */}
        {filteredMatches.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-8 text-center">
            <CalendarDays className="mx-auto mb-3 h-12 w-12 text-slate-600" />
            <p className="text-slate-400">No hay partidos este dia</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => {
              const isKnockout = !match.group_name.startsWith("Group");
              const matchDate = new Date(match.match_date);
              const isLocked = nowColombia >= matchDate;

              return (
                <div
                  key={match.id}
                  className={clsx(
                    "rounded-2xl border overflow-hidden",
                    isKnockout
                      ? "border-blue-500/15 bg-gradient-to-br from-blue-950/15 to-slate-900/30"
                      : "border-slate-700/30 bg-slate-800/30"
                  )}
                >
                  {/* Match header */}
                  <div className="border-b border-slate-700/20 px-4 py-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="rounded-lg bg-slate-700/40 px-2 py-0.5 font-semibold text-slate-400">
                        {match.group_name}
                      </span>
                      <div className="flex items-center gap-2 text-slate-500">
                        {isLocked ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span>{formatMatchTime(match.match_date)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flag teamName={match.team_home} className="h-5 w-7" />
                        <span className="font-semibold text-white text-sm">
                          {match.team_home}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {match.score_home !== null ? (
                          <span className="text-lg font-bold text-white">
                            {match.score_home} - {match.score_away}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">VS</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm text-right">
                          {match.team_away}
                        </span>
                        <Flag teamName={match.team_away} className="h-5 w-7" />
                      </div>
                    </div>
                  </div>

                  {/* Predictions */}
                  <div className="px-4 py-3">
                    {match.predictions.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center">
                        Sin predicciones aun
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {match.predictions.map((pred) => {
                          const isCurrentUser = pred.user_id === user?.id;
                          const isExact =
                            match.score_home !== null &&
                            pred.score_home === match.score_home &&
                            pred.score_away === match.score_away;
                          const isCorrect =
                            match.score_home !== null &&
                            !isExact &&
                            ((pred.score_home > pred.score_away &&
                              (match.score_home ?? 0) > (match.score_away ?? 0)) ||
                              (pred.score_home < pred.score_away &&
                                (match.score_home ?? 0) < (match.score_away ?? 0)) ||
                              (pred.score_home === pred.score_away &&
                                (match.score_home ?? 0) === (match.score_away ?? 0)));

                          return (
                            <div
                              key={pred.id}
                              className={clsx(
                                "flex items-center justify-between rounded-xl px-3 py-2",
                                isCurrentUser
                                  ? "bg-blue-500/10 border border-blue-500/20"
                                  : "bg-slate-800/50"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={clsx(
                                    "text-sm",
                                    isCurrentUser
                                      ? "font-medium text-blue-300"
                                      : "text-slate-300"
                                  )}
                                >
                                  {pred.username}
                                </span>
                                {isCurrentUser && (
                                  <span className="ml-1.5 text-[10px] text-blue-400">
                                    (tu)
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Score */}
                                <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/50 px-2.5 py-1">
                                  <span className="text-sm font-bold text-white">
                                    {pred.score_home}
                                  </span>
                                  <span className="text-xs text-slate-600">-</span>
                                  <span className="text-sm font-bold text-white">
                                    {pred.score_away}
                                  </span>
                                </div>

                                {/* Result indicator */}
                                {match.score_home !== null && (
                                  <div
                                    className={clsx(
                                      "flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold",
                                      isExact
                                        ? "bg-emerald-500 text-white"
                                        : isCorrect
                                        ? "bg-amber-500/80 text-white"
                                        : "bg-slate-700/50 text-slate-500"
                                    )}
                                  >
                                    {isExact ? "3" : isCorrect ? "1" : "0"}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
