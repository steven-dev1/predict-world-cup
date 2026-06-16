import useSWR from "swr";
import type { Match, Prediction, LeaderboardEntry } from "@/types/database";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Hook para obtener todos los matches
export function useMatches() {
  const { data, error, isLoading } = useSWR<Match[]>(
    "/api/matches",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30 seconds (for live scores)
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
    }
  );

  return {
    matches: data ?? [],
    isLoading,
    isError: error,
  };
}

// Hook para obtener predicciones (opcionalmente filtrado por user_id)
export function usePredictions(userId?: string) {
  const url = userId
    ? `/api/predictions?user_id=${userId}`
    : "/api/predictions";

  const { data, error, isLoading } = useSWR<Prediction[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  return {
    predictions: data ?? [],
    isLoading,
    isError: error,
  };
}

// Hook para obtener el leaderboard
export function useLeaderboard() {
  const { data, error, isLoading } = useSWR<LeaderboardEntry[]>(
    "/api/leaderboard",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 60000, // Refresh every minute
      dedupingInterval: 10000,
    }
  );

  return {
    leaderboard: data ?? [],
    isLoading,
    isError: error,
  };
}
