"use client";

import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import type { Match, Prediction } from "@/types/database";
import { formatMatchTime } from "@/data/matches";
import { Flag } from "@/components/flag";
import {
  Check,
  Loader2,
  Clock,
  MapPin,
  Lock,
  Plus,
  Minus,
} from "lucide-react";
import clsx from "clsx";

interface MatchCardProps {
  match: Match;
  prediction?: Prediction;
  onPredictionSaved: (prediction: Prediction) => void;
}

function ScoreInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const num = parseInt(value) || 0;

  const increment = () => {
    if (num < 20) onChange(String(num + 1));
  };
  const decrement = () => {
    if (num > 0) onChange(String(num - 1));
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || num <= 0}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-700/40 text-slate-400 transition-all hover:bg-slate-600/50 hover:text-white active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600/30"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        min="0"
        max="20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="0"
        className="h-12 w-14 rounded-xl bg-slate-900/60 text-center text-2xl font-bold text-white border-2 border-slate-600/30 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || num >= 20}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-700/40 text-slate-400 transition-all hover:bg-slate-600/50 hover:text-white active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600/30"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function MatchCard({
  match,
  prediction,
  onPredictionSaved,
}: MatchCardProps) {
  const { user } = useAuth();
  const [scoreHome, setScoreHome] = useState<string>(
    prediction?.score_home?.toString() ?? ""
  );
  const [scoreAway, setScoreAway] = useState<string>(
    prediction?.score_away?.toString() ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!prediction);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const matchDate = new Date(match.match_date);
    const check = () => {
      setIsLocked(new Date() >= matchDate);
    };
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [match.match_date]);

  const isKnockout = !match.group_name.startsWith("Group");

  const handleSave = useCallback(async () => {
    if (!user || scoreHome === "" || scoreAway === "" || isLocked) return;

    const home = parseInt(scoreHome);
    const away = parseInt(scoreAway);

    if (isNaN(home) || isNaN(away) || home < 0 || away < 0) return;

    setSaving(true);

    const { data, error } = await supabase
      .from("predictions")
      .upsert(
        {
          user_id: user.id,
          match_id: match.id,
          score_home: home,
          score_away: away,
        },
        { onConflict: "user_id,match_id" }
      )
      .select()
      .single();

    if (!error && data) {
      setSaved(true);
      onPredictionSaved(data);
    }

    setSaving(false);
  }, [user, scoreHome, scoreAway, match.id, onPredictionSaved, isLocked]);

  const hasScore = scoreHome !== "" || scoreAway !== "";

  return (
    <div
      className={clsx(
        "rounded-2xl border p-4 transition-all",
        isKnockout
          ? match.group_name === "Final"
            ? "border-amber-500/25 bg-gradient-to-br from-amber-950/20 to-yellow-950/10"
            : match.group_name === "Semifinals"
            ? "border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-indigo-950/10"
            : "border-blue-500/15 bg-gradient-to-br from-blue-950/20 to-slate-900/40"
          : saved
          ? "border-blue-500/20 bg-blue-950/15"
          : "border-slate-700/30 bg-slate-800/30",
        isLocked && "opacity-60"
      )}
    >
      {/* Group & Time */}
      <div className="mb-3 flex items-center justify-between text-xs">
        <span
          className={clsx(
            "rounded-lg px-2.5 py-1 font-semibold",
            isKnockout
              ? match.group_name === "Final"
                ? "bg-amber-500/10 text-amber-400"
                : match.group_name === "Semifinals"
                ? "bg-purple-500/10 text-purple-400"
                : "bg-blue-500/10 text-blue-400"
              : "bg-slate-700/40 text-slate-400"
          )}
        >
          {match.group_name}
        </span>
        <div className="flex items-center gap-2 text-slate-400">
          {isLocked ? (
            <span className="flex items-center gap-1 rounded-lg bg-red-500/10 px-2 py-0.5 text-red-400 font-medium">
              <Lock className="h-3 w-3" />
              Bloqueado
            </span>
          ) : (
            <Clock className="h-3.5 w-3.5" />
          )}
          <span>{formatMatchTime(match.match_date)}</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex flex-1 items-center gap-2.5">
          <Flag teamName={match.team_home} className="h-6 w-8" />
          <span
            className={clsx(
              "font-semibold text-sm sm:text-base truncate",
              isLocked ? "text-slate-400" : "text-white"
            )}
          >
            {match.team_home}
          </span>
        </div>
        <span
          className={clsx(
            "text-xs font-bold rounded-lg px-2.5 py-1",
            isKnockout
              ? "bg-slate-700/40 text-slate-500"
              : "bg-slate-800/50 text-slate-600"
          )}
        >
          VS
        </span>
        <div className="flex flex-1 items-center justify-end gap-2.5">
          <span
            className={clsx(
              "font-semibold text-sm sm:text-base truncate text-right",
              isLocked ? "text-slate-400" : "text-white"
            )}
          >
            {match.team_away}
          </span>
          <Flag teamName={match.team_away} className="h-6 w-8" />
        </div>
      </div>

      {/* Venue */}
      <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
        <MapPin className="h-3 w-3 flex-shrink-0" />
        <span className="truncate">{match.venue}</span>
      </div>

      {/* Score section */}
      {isLocked ? (
        match.score_home !== null && match.score_away !== null ? (
          <div className="flex items-center justify-center gap-4 rounded-xl bg-slate-800/40 py-4 border border-slate-700/20">
            <span className="text-3xl font-bold text-white">
              {match.score_home}
            </span>
            <span className="text-lg font-bold text-slate-600">-</span>
            <span className="text-3xl font-bold text-white">
              {match.score_away}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/40 py-4 border border-slate-700/20 text-sm text-slate-500">
            <Lock className="h-4 w-4" />
            <span>Partido en curso o finalizado</span>
          </div>
        )
      ) : (
        <div className="space-y-3">
          {/* Score inputs row */}
          <div className="flex items-center gap-3">
            {/* Home team input */}
            <div className="flex flex-1 items-center gap-2.5">
              <ScoreInput
                value={scoreHome}
                onChange={(v) => {
                  setScoreHome(v);
                  setSaved(false);
                }}
              />
            </div>

            {/* Separator */}
            <div className="text-sm font-bold text-slate-600">-</div>

            {/* Away team input */}
            <div className="flex flex-1 items-center justify-end gap-2.5">
              <ScoreInput
                value={scoreAway}
                onChange={(v) => {
                  setScoreAway(v);
                  setSaved(false);
                }}
              />
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving || !hasScore}
            className={clsx(
              "flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all",
              saved && hasScore
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/15"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/20 active:scale-[0.98]",
              (saving || !hasScore) && "opacity-50 cursor-not-allowed"
            )}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved && hasScore ? (
              <Check className="h-4 w-4" />
            ) : null}
            {saved && hasScore ? "Guardado" : "Guardar prediccion"}
          </button>
        </div>
      )}
    </div>
  );
}
