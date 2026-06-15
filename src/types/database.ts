export interface Profile {
  id: string;
  username: string;
  created_at: string;
}

export interface Match {
  id: number;
  external_id: string;
  match_date: string;
  group_name: string;
  team_home: string;
  team_away: string;
  flag_home: string;
  flag_away: string;
  venue: string;
  score_home: number | null;
  score_away: number | null;
  status: "upcoming" | "live" | "finished";
}

export interface Prediction {
  id: string;
  user_id: string;
  match_id: number;
  score_home: number;
  score_away: number;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface MatchWithPrediction extends Match {
  prediction?: Prediction;
}

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_points: number;
  exact_scores: number;
  correct_results: number;
  total_predictions: number;
}
