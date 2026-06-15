"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase/client";
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

export default function TodayPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [matches, setMatches] = useState<MatchWithPredictions[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const loadedRef = useRef(false);

  const loadData = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // Get all matches
    const { data: allMatches } = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true });

    if (!allMatches) {
      setLoading(false);
      return;
    }

    // Get all predictions with user info
    const { data: allPredictions } = await supabase
      .from("predictions")
      .select("*, profiles:user_id(username, id)");

    // Group predictions by match_id
    const predictionsByMatch: Record<number, PredictionWithUser[]> = {};
    if (allPredictions) {
      for (const pred of allPredictions) {
        const matchId = pred.match_id;
        if (!predictionsByMatch[matchId]) {
          predictionsByMatch[matchId] = [];
        }
        predictionsByMatch[matchId].push({
          id: pred.id,
          score_home: pred.score_home,
          score_away: pred.score_away,
          username:
            (pred.profiles as { username: string })?.username ?? "Anonimo",
          user_id: pred.user_id,
        });
      }
    }

    // Combine matches with predictions
    const matchesWithPredictions: MatchWithPredictions[] = allMatches.map(
      (match) => ({
        ...match,
        predictions: predictionsByMatch[match.id] ?? [],
      })
    );

    setMatches(matchesWithPredictions);
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
      loadData();
    }
  }, [user, loadData]);

  // Filter matches by selected date
  const filteredMatches = matches.filter((m) => {
    const matchDate = new Date(m.match_date);
    return (
      matchDate.getFullYear() === selectedDate.getFullYear() &&
      matchDate.getMonth() === selectedDate.getMonth() &&
      matchDate.getDate() === selectedDate.getDate()
    );
  });

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
    setSelectedDate(new Date());
  };

  const isToday =
    selectedDate.toDateString() === new Date().toDateString();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

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
                {isToday && (
                  <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                    Hoy
                  </span>
                )}
              </div>
              {!isToday && (
                <button
                  onClick={goToToday}
                  className="mt-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
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
            <p className="text-slate-400">
              No hay partidos este dia
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => {
              const isKnockout = !match.group_name.startsWith("Group");
              const isLocked = new Date() >= new Date(match.match_date);

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
                            {match.score_home}
                          </span>
                        ) : (
                          <span className="text-lg font-bold text-slate-600">
                            -
                          </span>
                        )}
                        <span className="text-xs text-slate-600">VS</span>
                        {match.score_away !== null ? (
                          <span className="text-lg font-bold text-white">
                            {match.score_away}
                          </span>
                        ) : (
                          <span className="text-lg font-bold text-slate-600">
                            -
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">
                          {match.team_away}
                        </span>
                        <Flag teamName={match.team_away} className="h-5 w-7" />
                      </div>
                    </div>
                  </div>

                  {/* Predictions */}
                  <div className="px-4 py-3">
                    {match.predictions.length === 0 ? (
                      <p className="text-center text-xs text-slate-500 py-2">
                        Nadie ha predecido este partido aun
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {match.predictions.map((pred) => {
                          const isCurrentUser = pred.user_id === user?.id;
                          const predResult =
                            pred.score_home > pred.score_away
                              ? "W"
                              : pred.score_home < pred.score_away
                              ? "L"
                              : "D";
                          const actualResult =
                            match.score_home !== null &&
                            match.score_away !== null
                              ? match.score_home > match.score_away
                                ? "W"
                                : match.score_home < match.score_away
                                ? "L"
                                : "D"
                              : null;

                          const isExact =
                            match.score_home !== null &&
                            match.score_away !== null &&
                            pred.score_home === match.score_home &&
                            pred.score_away === match.score_away;

                          const isCorrect =
                            actualResult !== null && predResult === actualResult;

                          return (
                            <div
                              key={pred.id}
                              className={clsx(
                                "flex items-center justify-between rounded-xl px-3 py-2.5 transition-all",
                                isExact
                                  ? "bg-emerald-500/10 border border-emerald-500/20"
                                  : isCorrect
                                  ? "bg-amber-500/10 border border-amber-500/15"
                                  : isCurrentUser
                                  ? "bg-blue-500/10 border border-blue-500/15"
                                  : "bg-slate-800/40 border border-slate-700/20"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                {/* Avatar placeholder */}
                                <div
                                  className={clsx(
                                    "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
                                    isCurrentUser
                                      ? "bg-blue-600/30 text-blue-300"
                                      : "bg-slate-700/50 text-slate-400"
                                  )}
                                >
                                  {pred.username.slice(0, 2).toUpperCase()}
                                </div>
                                <span
                                  className={clsx(
                                    "text-sm font-medium",
                                    isCurrentUser
                                      ? "text-blue-300"
                                      : "text-slate-300"
                                  )}
                                >
                                  {pred.username}
                                  {isCurrentUser && (
                                    <span className="ml-1.5 text-[10px] text-blue-400">
                                      (tu)
                                    </span>
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Score */}
                                <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/50 px-2.5 py-1">
                                  <span className="text-sm font-bold text-white">
                                    {pred.score_home}
                                  </span>
                                  <span className="text-xs text-slate-600">
                                    -
                                  </span>
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
                                    {isExact
                                      ? "3"
                                      : isCorrect
                                      ? "1"
                                      : "0"}
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
