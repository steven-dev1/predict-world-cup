"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase/client";
import { MatchCard } from "@/components/match-card";
import { matchesData, groupMatchesByDate } from "@/data/matches";
import type { Match, Prediction } from "@/types/database";
import {
  Calendar,
  Loader2,
  Filter,
  Trophy,
  Swords,
  Shield,
  ChevronDown,
  ChevronUp,
  CalendarDays,
} from "lucide-react";
import clsx from "clsx";

type StageFilter = "all" | "group" | "knockout";

export default function MatchesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<number, Prediction>>({});
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const loadData = useCallback(async (userId: string) => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const { data: dbMatches } = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true });

    let allMatches: Match[] = [];

    if (dbMatches && dbMatches.length > 0) {
      allMatches = dbMatches;
    } else {
      const inserts = matchesData.map((m) => ({
        external_id: m.external_id,
        match_date: m.match_date,
        group_name: m.group_name,
        team_home: m.team_home,
        team_away: m.team_away,
        flag_home: m.flag_home,
        flag_away: m.flag_away,
        venue: m.venue,
        status: m.status,
      }));

      const { data: seeded } = await supabase
        .from("matches")
        .insert(inserts)
        .select();

      if (seeded) allMatches = seeded;
    }

    setMatches(allMatches);

    // Auto-expand today or first upcoming date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const todayHasMatches = allMatches.some((m) => {
      const d = new Date(m.match_date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });
    if (todayHasMatches) {
      setExpandedDate(todayStr);
    } else {
      const upcoming = allMatches.find((m) => new Date(m.match_date) > new Date());
      if (upcoming) {
        setExpandedDate(
          new Date(upcoming.match_date).toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    }

    const { data: preds } = await supabase
      .from("predictions")
      .select("*")
      .eq("user_id", userId);

    if (preds) {
      const predMap: Record<number, Prediction> = {};
      for (const p of preds) {
        predMap[p.match_id] = p;
      }
      setPredictions(predMap);
    }

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
      loadData(user.id);
    }
  }, [user, loadData]);

  const handlePredictionSaved = useCallback(
    (matchId: number, prediction: Prediction) => {
      setPredictions((prev) => ({ ...prev, [matchId]: prediction }));
    },
    []
  );

  const toggleDate = useCallback((date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  }, []);

  const expandAll = useCallback(() => {
    // Not needed anymore - kept for compatibility
    const grouped = groupMatchesByDate(matches);
    if (grouped.length > 0) {
      setExpandedDate(grouped[0][0]);
    }
  }, [matches]);

  const collapseAll = useCallback(() => {
    setExpandedDate(null);
  }, []);

  const groups = [
    "all",
    "Group A",
    "Group B",
    "Group C",
    "Group D",
    "Group E",
    "Group F",
    "Group G",
    "Group H",
    "Group I",
    "Group J",
    "Group K",
    "Group L",
    "Round of 32",
    "Round of 16",
    "Quarterfinals",
    "Semifinals",
    "Third Place",
    "Final",
  ];

  let filteredMatches = matches;

  if (stageFilter === "group") {
    filteredMatches = matches.filter((m) => m.group_name.startsWith("Group"));
  } else if (stageFilter === "knockout") {
    filteredMatches = matches.filter((m) => !m.group_name.startsWith("Group"));
  }

  if (activeGroup !== "all") {
    filteredMatches = filteredMatches.filter(
      (m) => m.group_name === activeGroup
    );
  }

  const groupedMatches = groupMatchesByDate(filteredMatches);
  const predictedCount = Object.keys(predictions).length;
  const totalMatches = matches.length;
  const totalUpcoming = matches.filter(
    (m) => new Date(m.match_date) > new Date()
  ).length;

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
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-3.5 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {predictedCount}
            </div>
            <div className="text-xs text-slate-500">Mis predicciones</div>
          </div>
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-3.5 text-center">
            <div className="text-2xl font-bold text-amber-400">
              {totalUpcoming}
            </div>
            <div className="text-xs text-slate-500">Pendientes</div>
          </div>
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-3.5 text-center">
            <div className="text-2xl font-bold text-slate-300">
              {totalMatches}
            </div>
            <div className="text-xs text-slate-500">Total</div>
          </div>
        </div>

        {/* Stage filter */}
        <div className="mb-4 flex items-center gap-2">
          {([
            { key: "all", label: "Todos", icon: Swords },
            { key: "group", label: "Fase de Grupos", icon: Shield },
            { key: "knockout", label: "Eliminatorias", icon: Trophy },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setStageFilter(key);
                setActiveGroup("all");
              }}
              className={clsx(
                "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all",
                stageFilter === key
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 hover:text-white border border-slate-700/40"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Group filter */}
        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="h-4 w-4 flex-shrink-0 text-slate-600" />
          {groups
            .filter((g) => {
              if (stageFilter === "group")
                return g === "all" || g.startsWith("Group");
              if (stageFilter === "knockout")
                return (
                  g === "all" ||
                  [
                    "Round of 32",
                    "Round of 16",
                    "Quarterfinals",
                    "Semifinals",
                    "Third Place",
                    "Final",
                  ].includes(g)
                );
              return true;
            })
            .map((g) => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={clsx(
                  "flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
                  activeGroup === g
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white border border-slate-700/30"
                )}
              >
                {g === "all" ? "Todos" : g.replace("Group ", "Gr. ")}
              </button>
            ))}
        </div>

        {/* Expand/Collapse all */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            onClick={expandAll}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronDown className="h-3.5 w-3.5" />
            Expandir todo
          </button>
          <button
            onClick={collapseAll}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronUp className="h-3.5 w-3.5" />
            Colapsar todo
          </button>
        </div>

        {/* Matches by date */}
        <div className="space-y-2">
          {groupedMatches.map(([date, dateMatches]) => {
            const isExpanded = expandedDate === date;
            const matchCount = (dateMatches as Match[]).length;

            // Check if this date is today
            const firstMatchDate = new Date((dateMatches as Match[])[0].match_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const matchDay = new Date(firstMatchDate);
            matchDay.setHours(0, 0, 0, 0);
            const isToday = matchDay.getTime() === today.getTime();

            // Check if date is in the past
            const isPast = matchDay < today;

            // Count predictions for this date
            const predictedInDate = (dateMatches as Match[]).filter(
              (m) => predictions[m.id]
            ).length;

            return (
              <div
                key={date}
                className={clsx(
                  "rounded-2xl border overflow-hidden transition-all",
                  isToday
                    ? "border-blue-500/30 bg-blue-950/20"
                    : isPast
                    ? "border-slate-700/30 bg-slate-800/20"
                    : "border-slate-700/40 bg-slate-800/40"
                )}
              >
                {/* Date header - clickable */}
                <button
                  onClick={() => toggleDate(date)}
                  className={clsx(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-all",
                    isToday
                      ? "hover:bg-blue-900/20"
                      : "hover:bg-slate-700/20"
                  )}
                >
                  {isToday ? (
                    <CalendarDays className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <Calendar className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2
                        className={clsx(
                          "text-sm font-semibold capitalize truncate",
                          isToday ? "text-blue-300" : "text-slate-300"
                        )}
                      >
                        {date}
                      </h2>
                      {isToday && (
                        <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                          Hoy
                        </span>
                      )}
                      {isPast && !isToday && (
                        <span className="rounded-md bg-slate-700/50 px-2 py-0.5 text-[10px] font-medium text-slate-500 uppercase">
                          Finalizado
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                      <span>
                        {matchCount} partido{matchCount !== 1 ? "s" : ""}
                      </span>
                      {predictedInDate > 0 && (
                        <>
                          <span className="text-slate-700">·</span>
                          <span className="text-blue-400/70">
                            {predictedInDate}/{matchCount} predecido
                            {predictedInDate !== matchCount ? "s" : ""}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className={clsx(
                      "flex h-7 w-7 items-center justify-center rounded-lg transition-all",
                      isExpanded
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-slate-700/40 text-slate-500"
                    )}
                  >
                    <ChevronDown
                      className={clsx(
                        "h-4 w-4 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {/* Matches - collapsible */}
                <div
                  className={clsx(
                    "transition-all duration-300 ease-in-out",
                    isExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="space-y-2.5 px-4 pb-4">
                    {(dateMatches as Match[]).map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        prediction={predictions[match.id]}
                        onPredictionSaved={(pred) =>
                          handlePredictionSaved(match.id, pred)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMatches.length === 0 && (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/40 p-8 text-center">
            <Calendar className="mx-auto mb-3 h-12 w-12 text-slate-600" />
            <p className="text-slate-400">
              No hay partidos en esta categoria
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
