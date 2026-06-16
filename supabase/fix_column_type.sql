-- Cambiar columna match_date de timestamptz a timestamp
-- para que guarde la hora tal cual se inserte (sin conversión UTC)
ALTER TABLE matches 
ALTER COLUMN match_date TYPE timestamp 
USING match_date AT TIME ZONE 'UTC';

-- Verificar que las fechas se mantienen igual
SELECT external_id, team_home, team_away, match_date
FROM matches 
WHERE team_home IN ('Argentina', 'Uzbekistan', 'England')
ORDER BY match_date;