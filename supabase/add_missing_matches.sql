-- Agregar los 18 partidos faltantes del Mundial 2026
-- Estos son los partidos que la API encuentra pero no existen en la DB

INSERT INTO "public"."matches" ("external_id", "match_date", "group_name", "team_home", "team_away", "flag_home", "flag_away", "venue", "score_home", "score_away", "status") VALUES

-- Group B - Matchday 2 (falta Canada vs Bosnia-Herzegovina)
('M107', '2026-06-12T19:00:00Z', 'Group B', 'Canada', 'Bosnia-Herzegovina', '🇨🇦', '🇧🇦', 'BMO Field, Toronto', null, null, 'upcoming'),

-- Group D - Matchday 2 (falta Australia vs Turkiye)
('M108', '2026-06-13T04:00:00Z', 'Group D', 'Australia', 'Turkiye', '🇦🇺', '🇹🇷', 'BC Place, Vancouver', null, null, 'upcoming'),

-- Group F - Matchday 2 (falta Sweden vs Tunisia)
('M109', '2026-06-14T02:00:00Z', 'Group F', 'Sweden', 'Tunisia', '🇸🇪', '🇹🇳', 'Estadio BBVA, Monterrey', null, null, 'upcoming'),

-- Group I - Matchday 2 (falta Iraq vs Norway)
('M110', '2026-06-16T22:00:00Z', 'Group I', 'Iraq', 'Norway', '🇮🇶', '🇳🇴', 'Gillette Stadium, Boston', null, null, 'upcoming'),

-- Group K - Matchday 2 (falta Portugal vs Congo DR)
('M111', '2026-06-17T17:00:00Z', 'Group K', 'Portugal', 'Congo DR', '🇵🇹', '🇨🇩', 'NRG Stadium, Houston', null, null, 'upcoming'),

-- Group A - Matchday 3
('M112', '2026-06-25T01:00:00Z', 'Group A', 'Czechia', 'Mexico', '🇨🇿', '🇲🇽', 'Estadio Azteca, Mexico City', null, null, 'upcoming'),
('M113', '2026-06-25T01:00:00Z', 'Group A', 'South Africa', 'South Korea', '🇿🇦', '🇰🇷', 'Estadio BBVA, Monterrey', null, null, 'upcoming'),

-- Group B - Matchday 3
('M114', '2026-06-24T19:00:00Z', 'Group B', 'Switzerland', 'Canada', '🇨🇭', '🇨🇦', 'BC Place, Vancouver', null, null, 'upcoming'),
('M115', '2026-06-24T19:00:00Z', 'Group B', 'Bosnia-Herzegovina', 'Qatar', '🇧🇦', '🇶🇦', 'Lumen Field, Seattle', null, null, 'upcoming'),

-- Group C - Matchday 3
('M116', '2026-06-24T22:00:00Z', 'Group C', 'Scotland', 'Brazil', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇧🇷', 'Hard Rock Stadium, Miami', null, null, 'upcoming'),
('M117', '2026-06-24T22:00:00Z', 'Group C', 'Morocco', 'Haiti', '🇲🇦', '🇭🇹', 'Mercedes-Benz Stadium, Atlanta', null, null, 'upcoming'),

-- Group D - Matchday 3
('M118', '2026-06-26T02:00:00Z', 'Group D', 'Turkiye', 'United States', '🇹🇷', '🇺🇸', 'SoFi Stadium, Los Angeles', null, null, 'upcoming'),
('M119', '2026-06-26T02:00:00Z', 'Group D', 'Paraguay', 'Australia', '🇵🇾', '🇦🇺', 'Levi''s Stadium, Santa Clara', null, null, 'upcoming'),

-- Group E - Matchday 3
('M120', '2026-06-25T20:00:00Z', 'Group E', 'Curacao', 'Ivory Coast', '🇨🇼', '🇨🇮', 'Lincoln Financial Field, Philadelphia', null, null, 'upcoming'),
('M121', '2026-06-25T20:00:00Z', 'Group E', 'Ecuador', 'Germany', '🇪🇨', '🇩🇪', 'MetLife Stadium, New York', null, null, 'upcoming'),

-- Group F - Matchday 3
('M122', '2026-06-25T23:00:00Z', 'Group F', 'Japan', 'Sweden', '🇯🇵', '🇸🇪', 'AT&T Stadium, Dallas', null, null, 'upcoming'),
('M123', '2026-06-25T23:00:00Z', 'Group F', 'Tunisia', 'Netherlands', '🇹🇳', '🇳🇱', 'Arrowhead Stadium, Kansas City', null, null, 'upcoming'),

-- Group G - Matchday 3
('M124', '2026-06-27T03:00:00Z', 'Group G', 'Egypt', 'Iran', '🇪🇬', '🇮🇷', 'Lumen Field, Seattle', null, null, 'upcoming'),
('M125', '2026-06-27T03:00:00Z', 'Group G', 'New Zealand', 'Belgium', '🇳🇿', '🇧🇪', 'BC Place, Vancouver', null, null, 'upcoming'),

-- Group I - Matchday 3
('M126', '2026-06-26T19:00:00Z', 'Group I', 'Norway', 'France', '🇳🇴', '🇫🇷', 'Gillette Stadium, Boston', null, null, 'upcoming'),
('M127', '2026-06-26T19:00:00Z', 'Group I', 'Senegal', 'Iraq', '🇸🇳', '🇮🇶', 'BMO Field, Toronto', null, null, 'upcoming'),

-- Group J - Matchday 3
('M128', '2026-06-22T03:00:00Z', 'Group J', 'Jordan', 'Algeria', '🇯🇴', '🇩🇿', 'Levi''s Stadium, Santa Clara', null, null, 'upcoming'),
('M129', '2026-06-27T02:00:00Z', 'Group J', 'Algeria', 'Austria', '🇩🇿', '🇦🇹', 'Arrowhead Stadium, Kansas City', null, null, 'upcoming'),

-- Group K - Matchday 3
('M130', '2026-06-23T17:00:00Z', 'Group K', 'Portugal', 'Uzbekistan', '🇵🇹', '🇺🇿', 'NRG Stadium, Houston', null, null, 'upcoming'),
('M131', '2026-06-24T02:00:00Z', 'Group K', 'Colombia', 'Congo DR', '🇨🇴', '🇨🇩', 'Estadio Akron, Guadalajara', null, null, 'upcoming');
