-- Verificar partidos del 16-17 de junio en la DB
-- Argentina vs Argelia debería ser 2026-06-17T01:00:00Z (8 PM Colombia)
-- Austria vs Jordania debería ser 2026-06-17T04:00:00Z (11 PM Colombia)
-- Irak vs Noruega debería ser 2026-06-16T22:00:00Z (5 PM Colombia)

-- 1. Ver qué hay ahora mismo
SELECT external_id, team_home, team_away, match_date, 
       (match_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota') as colombia_time
FROM matches 
WHERE match_date >= '2026-06-16T00:00:00Z' 
  AND match_date <= '2026-06-18T06:00:00Z'
ORDER BY match_date;

-- 2. Actualizar Argentina vs Argelia a 8 PM Colombia (01:00 UTC jun 17)
UPDATE matches 
SET match_date = '2026-06-17T01:00:00Z'
WHERE team_home = 'Argentina' AND team_away = 'Algeria';

-- 3. Actualizar Austria vs Jordania a 11 PM Colombia (04:00 UTC jun 17)
UPDATE matches 
SET match_date = '2026-06-17T04:00:00Z'
WHERE team_home = 'Austria' AND team_away = 'Jordan';

-- 4. Agregar Irak vs Noruega si no existe (5 PM Colombia = 22:00 UTC jun 16)
INSERT INTO matches (external_id, match_date, group_name, team_home, team_away, flag_home, flag_away, venue, score_home, score_away, status)
SELECT 'M_J1_5', '2026-06-16T22:00:00Z', 'Group J', 'Iraq', 'Norway', '🇮🇶', '🇳🇴', 'BC Place, Vancouver', null, null, 'upcoming'
WHERE NOT EXISTS (
  SELECT 1 FROM matches WHERE team_home = 'Iraq' AND team_away = 'Norway'
);

-- 5. Verificar después de los cambios
SELECT external_id, team_home, team_away, match_date, 
       (match_date AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota') as colombia_time
FROM matches 
WHERE match_date >= '2026-06-16T00:00:00Z' 
  AND match_date <= '2026-06-18T06:00:00Z'
ORDER BY match_date;