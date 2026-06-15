-- World Cup 2026 Predictions App - Database Schema
-- Run this in Supabase SQL Editor

-- Profiles table (anonymous users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Matches table
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  match_date TIMESTAMPTZ NOT NULL,
  group_name TEXT NOT NULL,
  team_home TEXT NOT NULL,
  team_away TEXT NOT NULL,
  flag_home TEXT NOT NULL,
  flag_away TEXT NOT NULL,
  venue TEXT NOT NULL,
  score_home INTEGER,
  score_away INTEGER,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'finished')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Predictions table
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  score_home INTEGER NOT NULL CHECK (score_home >= 0),
  score_away INTEGER NOT NULL CHECK (score_away >= 0),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, match_id)
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only insert own profile
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (true);

-- Matches: anyone can read
CREATE POLICY "Matches are viewable by everyone" ON matches FOR SELECT USING (true);

-- Predictions: anyone can read, users can insert/update own
CREATE POLICY "Predictions are viewable by everyone" ON predictions FOR SELECT USING (true);
CREATE POLICY "Users can insert own predictions" ON predictions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own predictions" ON predictions FOR UPDATE USING (true);

-- Indexes for performance
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_matches_group ON matches(group_name);
CREATE INDEX idx_predictions_user ON predictions(user_id);
CREATE INDEX idx_predictions_match ON predictions(match_id);
CREATE INDEX idx_profiles_username ON profiles(username);
