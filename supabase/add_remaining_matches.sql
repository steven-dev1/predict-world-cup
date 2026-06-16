-- Agregar los 6 partidos que aún faltan
-- Ejecutar en Supabase SQL Editor

INSERT INTO "public"."matches" ("external_id", "match_date", "group_name", "team_home", "team_away", "flag_home", "flag_away", "venue", "score_home", "score_away", "status") VALUES

-- Group A - Matchday 2
('M132', '2026-06-18T16:00:00Z', 'Group A', 'Czechia', 'South Africa', '🇨🇿', '🇿🇦', 'Mercedes-Benz Stadium, Atlanta', null, null, 'upcoming'),

-- Group B - Matchday 2
('M133', '2026-06-18T19:00:00Z', 'Group B', 'Switzerland', 'Bosnia-Herzegovina', '🇨🇭', '🇧🇦', 'SoFi Stadium, Los Angeles', null, null, 'upcoming'),

-- Group D - Matchday 2
('M134', '2026-06-19T22:00:00Z', 'Group D', 'Turkiye', 'Paraguay', '🇹🇷', '🇵🇾', 'Levi''s Stadium, Santa Clara', null, null, 'upcoming'),

-- Group I - Matchday 2
('M135', '2026-06-22T21:00:00Z', 'Group I', 'France', 'Iraq', '🇫🇷', '🇮🇶', 'Lincoln Financial Field, Philadelphia', null, null, 'upcoming'),

-- Group J - Matchday 3
('M136', '2026-06-27T02:00:00Z', 'Group J', 'Jordan', 'Argentina', '🇯🇴', '🇦🇷', 'AT&T Stadium, Dallas', null, null, 'upcoming'),

-- Group K - Matchday 3
('M137', '2026-06-27T23:30:00Z', 'Group K', 'Congo DR', 'Uzbekistan', '🇨🇩', '🇺🇿', 'Mercedes-Benz Stadium, Atlanta', null, null, 'upcoming');
