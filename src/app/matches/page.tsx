"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useMatches, usePredictions } from "@/hooks/use-data";
import { MatchCard } from "@/components/match-card";
import { groupMatchesByDate } from "@/data/matches";
import type { Match, Prediction } from "@/types/database";
import {
  CalendarDays,
  Calendar,
  Loader2,
  Filter,
} from "lucide-react";
import clsx from "clsx";

type StageFilter = "all" | "group" | "knockout";

export default function MatchesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { matches, isLoading: matchesLoading } = useMatches();
  const { predictions, isLoading: predsLoading } = usePredictions(user?.id);
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const groupFilterRef = useRef<HTMLDivElement>(null);

  const loading = matchesLoading || predsLoading;

  // Enable horizontal scroll with mouse wheel on PC
  useEffect(() => {
    const el = groupFilterRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Only convert vertical scroll to horizontal when hovering the filter
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Create predictions map
  const predictionsMap = useMemo(() => {
    const map: Record<number, Prediction> = {};
    for (const p of predictions) {
      map[p.match_id] = p;
    }
    return map;
  }, [predictions]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchesGroup = activeGroup === "all" || m.group_name === activeGroup;
      const matchesStage =
        stageFilter === "all" ||
        (stageFilter === "group" && m.group_name.startsWith("Group")) ||
        (stageFilter === "knockout" && !m.group_name.startsWith("Group"));
      return matchesGroup && matchesStage;
    });
  }, [matches, activeGroup, stageFilter]);

  // Group by date
  const groupedMatches = useMemo(
    () => groupMatchesByDate(filteredMatches),
    [filteredMatches]
  );

  // Get unique groups
  const groups = useMemo(() => {
    const groupSet = new Set(matches.map((m) => m.group_name));
    return Array.from(groupSet).sort();
  }, [matches]);

  // Auto-expand today or first upcoming date
  const initialExpandedDate = useMemo(() => {
    if (loading || groupedMatches.length === 0) return null;

    const nowColombia = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
    );
    const today = new Date(
      nowColombia.getFullYear(),
      nowColombia.getMonth(),
      nowColombia.getDate()
    );
    const todayStr = today.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const todayHasMatches = groupedMatches.some(([date]) => date === todayStr);

    if (todayHasMatches) {
      return todayStr;
    } else if (groupedMatches.length > 0) {
      return groupedMatches[0][0];
    }
    return null;
  }, [loading, groupedMatches]);

  // Initialize expanded date on first load
  if (!initialLoadDone && initialExpandedDate && !expandedDate) {
    setExpandedDate(initialExpandedDate);
    setInitialLoadDone(true);
  }

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const toggleDate = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
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
            <CalendarDays className="h-7 w-7 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Calendario</h1>
          <p className="mt-1 text-sm text-slate-400">
            Haz tu predicción para cada partido
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 space-y-3">
          {/* Stage filter */}
          <div className="flex gap-2">
            {(["all", "group", "knockout"] as StageFilter[]).map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={clsx(
                  "flex-1 rounded-xl px-3 py-2 text-xs font-medium transition-all",
                  stageFilter === stage
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:bg-slate-700/40"
                )}
              >
                {stage === "all"
                  ? "Todos"
                  : stage === "group"
                  ? "Grupos"
                  : "Eliminatorias"}
              </button>
            ))}
          </div>

          {/* Group filter */}
          {stageFilter !== "knockout" && (
            <div
              ref={groupFilterRef}
              className="flex gap-2 overflow-x-auto pb-2 scroll-horizontal-wheel"
            >
              <button
                onClick={() => setActiveGroup("all")}
                className={clsx(
                  "whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
                  activeGroup === "all"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:bg-slate-700/40"
                )}
              >
                Todos
              </button>
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setActiveGroup(group)}
                  className={clsx(
                    "whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
                    activeGroup === group
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-slate-800/40 text-slate-400 border border-slate-700/30 hover:bg-slate-700/40"
                  )}
                >
                  {group}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Matches by date */}
        <div className="space-y-2">
          {groupedMatches.map(([date, dateMatches]) => {
            const isExpanded = expandedDate === date;
            const matchCount = (dateMatches as Match[]).length;

            // Check if this date is today
            const nowColombia = new Date(
              new Date().toLocaleString("en-US", {
                timeZone: "America/Bogota",
              })
            );
            const today = new Date(
              nowColombia.getFullYear(),
              nowColombia.getMonth(),
              nowColombia.getDate()
            );
            const firstMatchDate = new Date(
              (dateMatches as Match[])[0].match_date
            );
            const matchDay = new Date(
              firstMatchDate.getFullYear(),
              firstMatchDate.getMonth(),
              firstMatchDate.getDate()
            );
            const isToday = matchDay.getTime() === today.getTime();

            // Check if date is in the past
            const isPast = matchDay < today;

            // Count predictions for this date
            const predictedInDate = (dateMatches as Match[]).filter(
              (m) => predictionsMap[m.id]
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
                      <span
                        className={clsx(
                          "text-sm font-medium capitalize truncate",
                          isToday ? "text-blue-300" : "text-slate-300"
                        )}
                      >
                        {date}
                      </span>
                      {isToday && (
                        <span className="rounded-md bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                          HOY
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      {predictedInDate}/{matchCount} predicciones
                    </span>
                  </div>
                  <Filter
                    className={clsx(
                      "h-4 w-4 transition-transform",
                      isExpanded
                        ? "text-blue-400 rotate-0"
                        : "text-slate-500 -rotate-90"
                    )}
                  />
                </button>

                {/* Matches */}
                {isExpanded && (
                  <div className="border-t border-slate-700/20 p-3 space-y-3">
                    {(dateMatches as Match[]).map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        prediction={predictionsMap[match.id]}
                        onPredictionSaved={() => {
                          // SWR will auto-revalidate
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
