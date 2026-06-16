-- Corregir fecha de Argentina vs Argelia
-- Debe ser 8 PM Colombia = 01:00 UTC jun 17
UPDATE matches 
SET match_date = '2026-06-17T01:00:00Z'
WHERE team_home = 'Argentina' AND team_away = 'Algeria';

-- Verificar
SELECT external_id, team_home, team_away, match_date,
       (match_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota') as colombia_time
FROM matches 
WHERE team_home = 'Argentina' AND team_away = 'Algeria';