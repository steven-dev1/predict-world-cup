// Supabase Edge Function: update-scores
// Consulta football-data.org y actualiza scores en Supabase

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const API_KEY = "fc7ce457f34848d68616f148e58bef78";
const BASE_URL = "https://api.football-data.org/v4";

// Mapeo de equipos de la API a tus equipos en la DB
// football-data.org usa nombres diferentes a los de la DB
const TEAM_MAP: Record<string, string> = {
  "United States": "USA",
  "Türkiye": "Turkiye",
  "Turkey": "Turkiye",
  "IR Iran": "Iran",
  "Côte d'Ivoire": "Ivory Coast",
  "Ivory Coast": "Ivory Coast",
  "Cabo Verde": "Cape Verde",
  "Cape Verde Islands": "Cape Verde",
  "Korea Republic": "South Korea",
  "Congo DR": "DR Congo",
  "Bosnia-Herzegovina": "Bosnia Herzegovina",
  "Curaçao": "Curacao",
  "Curacao": "Curacao",
};

// Mapeo de status de la API a tu DB
// football-data.org usa: TIMED, IN_PLAY, PAUSED, FINISHED, etc.
function mapStatus(apiStatus: string): string {
  const statusMap: Record<string, string> = {
    "TIMED": "upcoming",
    "SCHEDULED": "upcoming",
    "TIMED": "upcoming",
    "IN_PLAY": "live",
    "PAUSED": "live",
    "HALFTIME": "live",
    "FINISHED": "finished",
    "SUSPENDED": "live",
    "POSTPONED": "upcoming",
    "CANCELLED": "upcoming",
    "AWARDED": "finished",
    "WO": "finished",
  };
  return statusMap[apiStatus] || "upcoming";
}

// Normalizar nombre del equipo para comparación
function normalizeTeam(name: string): string {
  return TEAM_MAP[name] || name;
}

Deno.serve(async (_req) => {
  const debugInfo: string[] = [];
  try {
    debugInfo.push("Iniciando actualización de scores...");

    // 1. Verificar variables de entorno
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      debugInfo.push(`Missing env vars: URL=${!!supabaseUrl}, KEY=${!!supabaseKey}`);
      return new Response(
        JSON.stringify({ message: "Config error", updated: 0, debug: debugInfo }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Crear cliente de Supabase con service_role key
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Consultar football-data.org: partidos del Mundial
    const today = new Date().toISOString().split("T")[0];
    debugInfo.push(`Fecha de hoy (UTC): ${today}`);

    // Obtener todos los partidos del Mundial
    debugInfo.push("Consultando partidos del Mundial...");
    let apiData;
    try {
      const apiResponse = await fetch(
        `${BASE_URL}/competitions/WC/matches`,
        {
          headers: {
            "X-Auth-Token": API_KEY,
          },
        }
      );
      debugInfo.push(`API response status: ${apiResponse.status}`);
      
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        debugInfo.push(`API error: ${apiResponse.status} - ${errorText}`);
        return new Response(
          JSON.stringify({ message: "API error", updated: 0, debug: debugInfo }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      
      apiData = await apiResponse.json();
    } catch (fetchError) {
      debugInfo.push(`Fetch error: ${String(fetchError)}`);
      return new Response(
        JSON.stringify({ message: "Fetch error", updated: 0, debug: debugInfo }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    debugInfo.push(`Partidos encontrados: ${apiData.matches?.length || 0}`);

    // Verificar si hay errores
    if (apiData.errorCode) {
      debugInfo.push(`Error de API: ${apiData.errorCode} - ${apiData.message}`);
      return new Response(
        JSON.stringify({ 
          message: "Error consultando API", 
          updated: 0,
          error: apiData.message,
          debug: debugInfo
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (!apiData.matches || apiData.matches.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: "No hay partidos para actualizar", 
          updated: 0,
          debug: debugInfo
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Obtener todos los partidos de tu DB
    const { data: dbMatches, error: dbError } = await supabase
      .from("matches")
      .select("*");

    if (dbError) {
      throw new Error(`Error consultando DB: ${dbError.message}`);
    }

    debugInfo.push(`Encontrados ${dbMatches?.length || 0} partidos en la DB`);

    // 5. Crear mapa de búsqueda por equipos
    const dbMatchMap = new Map<string, typeof dbMatches[0]>();
    for (const match of dbMatches || []) {
      // Solo mapear partidos de fase de grupos (tienen equipos reales)
      if (
        !match.team_home.startsWith("Ganador") &&
        !match.team_home.startsWith("Perdedor") &&
        !match.team_home.match(/^[12][A-L]$/)
      ) {
        const key = `${normalizeTeam(match.team_home)}_vs_${normalizeTeam(match.team_away)}`;
        dbMatchMap.set(key, match);
      }
    }

    // 6. Actualizar cada partido encontrado
    let updatedCount = 0;
    const updates: Array<{
      id: number;
      score_home: number;
      score_away: number;
      status: string;
    }> = [];

    for (const match of apiData.matches) {
      const apiHomeTeam = match.homeTeam?.name;
      const apiAwayTeam = match.awayTeam?.name;
      const apiScoreHome = match.score?.fullTime?.home;
      const apiScoreAway = match.score?.fullTime?.away;
      const apiStatus = match.status;

      if (!apiHomeTeam || !apiAwayTeam || !apiStatus) {
        continue;
      }

      // Buscar el partido en tu DB
      const key = `${normalizeTeam(apiHomeTeam)}_vs_${normalizeTeam(apiAwayTeam)}`;
      const dbMatch = dbMatchMap.get(key);

      if (!dbMatch) {
        debugInfo.push(`No encontrado en DB: ${apiHomeTeam} vs ${apiAwayTeam}`);
        continue;
      }

      // Mapear status
      const newStatus = mapStatus(apiStatus);

      // Solo actualizar si hay score o si el status cambió
      const shouldUpdate =
        apiScoreHome !== null &&
        apiScoreHome !== undefined &&
        apiScoreAway !== null &&
        apiScoreAway !== undefined
          ? true
          : newStatus !== dbMatch.status;

      if (shouldUpdate) {
        updates.push({
          id: dbMatch.id,
          score_home: apiScoreHome ?? dbMatch.score_home,
          score_away: apiScoreAway ?? dbMatch.score_away,
          status: newStatus,
        });

        debugInfo.push(
          `Actualizando: ${apiHomeTeam} ${apiScoreHome} - ${apiScoreAway} ${apiAwayTeam} (${newStatus})`
        );
      }
    }

    // 7. Aplicar actualizaciones en lote
    for (const update of updates) {
      const { error: updateError } = await supabase
        .from("matches")
        .update({
          score_home: update.score_home,
          score_away: update.score_away,
          status: update.status,
        })
        .eq("id", update.id);

      if (updateError) {
        debugInfo.push(`Error actualizando match ${update.id}: ${updateError.message}`);
      } else {
        updatedCount++;
      }
    }

    debugInfo.push(`Actualizados ${updatedCount} partidos`);

    return new Response(
      JSON.stringify({
        message: `Actualizados ${updatedCount} partidos`,
        updated: updatedCount,
        total_api: apiData.matches.length,
        total_db: dbMatches?.length || 0,
        debug: debugInfo
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});