import { Match } from "@/types/database";

export const matchesData: Omit<Match, "id">[] = [
  // ═══════════════════════════════════════════
  // GROUP STAGE - MATCHDAY 1 (M1-M18)
  // ═══════════════════════════════════════════
  { external_id: "M1", match_date: "2026-06-11T21:00:00Z", group_name: "Group A", team_home: "Mexico", team_away: "South Africa", flag_home: "🇲🇽", flag_away: "🇿🇦", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M2", match_date: "2026-06-12T00:00:00Z", group_name: "Group A", team_home: "South Korea", team_away: "Czechia", flag_home: "🇰🇷", flag_away: "🇨🇿", venue: "Estadio Akron, Zapopan", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M3", match_date: "2026-06-13T19:00:00Z", group_name: "Group B", team_home: "Qatar", team_away: "Switzerland", flag_home: "🇶🇦", flag_away: "🇨🇭", venue: "Levi's Stadium, Santa Clara", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M4", match_date: "2026-06-13T22:00:00Z", group_name: "Group C", team_home: "Brazil", team_away: "Morocco", flag_home: "🇧🇷", flag_away: "🇲🇦", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M5", match_date: "2026-06-14T01:00:00Z", group_name: "Group D", team_home: "USA", team_away: "Paraguay", flag_home: "🇺🇸", flag_away: "🇵🇾", venue: "SoFi Stadium, Los Angeles", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M6", match_date: "2026-06-14T18:00:00Z", group_name: "Group E", team_home: "Germany", team_away: "Curacao", flag_home: "🇩🇪", flag_away: "🇨🇼", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M7", match_date: "2026-06-14T21:00:00Z", group_name: "Group F", team_home: "Netherlands", team_away: "Japan", flag_home: "🇳🇱", flag_away: "🇯🇵", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M8", match_date: "2026-06-15T00:00:00Z", group_name: "Group E", team_home: "Ivory Coast", team_away: "Ecuador", flag_home: "🇨🇮", flag_away: "🇪🇨", venue: "Lincoln Financial Field, Philadelphia", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M9", match_date: "2026-06-14T01:00:00Z", group_name: "Group C", team_home: "Haiti", team_away: "Scotland", flag_home: "🇭🇹", flag_away: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", venue: "Gillette Stadium, Boston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M10", match_date: "2026-06-15T16:00:00Z", group_name: "Group H", team_home: "Spain", team_away: "Cape Verde", flag_home: "🇪🇸", flag_away: "🇨🇻", venue: "Atlanta Stadium, Atlanta", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M11", match_date: "2026-06-15T19:00:00Z", group_name: "Group G", team_home: "Belgium", team_away: "Egypt", flag_home: "🇧🇪", flag_away: "🇪🇬", venue: "Lumen Field, Seattle", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M12", match_date: "2026-06-15T22:00:00Z", group_name: "Group H", team_home: "Saudi Arabia", team_away: "Uruguay", flag_home: "🇸🇦", flag_away: "🇺🇾", venue: "Miami Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M13", match_date: "2026-06-16T19:00:00Z", group_name: "Group I", team_home: "France", team_away: "Senegal", flag_home: "🇫🇷", flag_away: "🇸🇳", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M14", match_date: "2026-06-17T01:00:00Z", group_name: "Group G", team_home: "Iran", team_away: "New Zealand", flag_home: "🇮🇷", flag_away: "🇳🇿", venue: "SoFi Stadium, Los Angeles", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M15", match_date: "2026-06-17T05:00:00Z", group_name: "Group J", team_home: "Austria", team_away: "Jordan", flag_home: "🇦🇹", flag_away: "🇯🇴", venue: "BC Place, Vancouver", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M16", match_date: "2026-06-17T21:00:00Z", group_name: "Group K", team_home: "England", team_away: "Croatia", flag_home: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag_away: "🇭🇷", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M17", match_date: "2026-06-18T00:00:00Z", group_name: "Group L", team_home: "Ghana", team_away: "Panama", flag_home: "🇬🇭", flag_away: "🇵🇦", venue: "Arrowhead Stadium, Kansas City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M18", match_date: "2026-06-18T02:00:00Z", group_name: "Group J", team_home: "Argentina", team_away: "Algeria", flag_home: "🇦🇷", flag_away: "🇩🇿", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // GROUP STAGE - MATCHDAY 2 (M19-M36)
  // ═══════════════════════════════════════════
  { external_id: "M19", match_date: "2026-06-18T05:00:00Z", group_name: "Group L", team_home: "Uzbekistan", team_away: "Colombia", flag_home: "🇺🇿", flag_away: "🇨🇴", venue: "Estadio BBVA, Monterrey", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M20", match_date: "2026-06-19T01:00:00Z", group_name: "Group B", team_home: "Canada", team_away: "Qatar", flag_home: "🇨🇦", flag_away: "🇶🇦", venue: "BC Place, Vancouver", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M21", match_date: "2026-06-19T20:00:00Z", group_name: "Group D", team_home: "USA", team_away: "Australia", flag_home: "🇺🇸", flag_away: "🇦🇺", venue: "Lumen Field, Seattle", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M22", match_date: "2026-06-19T22:00:00Z", group_name: "Group C", team_home: "Scotland", team_away: "Morocco", flag_home: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", flag_away: "🇲🇦", venue: "Gillette Stadium, Boston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M23", match_date: "2026-06-20T01:00:00Z", group_name: "Group A", team_home: "Mexico", team_away: "South Korea", flag_home: "🇲🇽", flag_away: "🇰🇷", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M24", match_date: "2026-06-20T20:00:00Z", group_name: "Group E", team_home: "Germany", team_away: "Ivory Coast", flag_home: "🇩🇪", flag_away: "🇨🇮", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M25", match_date: "2026-06-20T23:00:00Z", group_name: "Group C", team_home: "Brazil", team_away: "Haiti", flag_home: "🇧🇷", flag_away: "🇭🇹", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M26", match_date: "2026-06-21T04:00:00Z", group_name: "Group F", team_home: "Tunisia", team_away: "Japan", flag_home: "🇹🇳", flag_away: "🇯🇵", venue: "Estadio BBVA, Monterrey", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M27", match_date: "2026-06-21T16:00:00Z", group_name: "Group H", team_home: "Spain", team_away: "Saudi Arabia", flag_home: "🇪🇸", flag_away: "🇸🇦", venue: "Atlanta Stadium, Atlanta", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M28", match_date: "2026-06-21T19:00:00Z", group_name: "Group G", team_home: "Belgium", team_away: "Iran", flag_home: "🇧🇪", flag_away: "🇮🇷", venue: "SoFi Stadium, Los Angeles", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M29", match_date: "2026-06-21T22:00:00Z", group_name: "Group H", team_home: "Uruguay", team_away: "Cape Verde", flag_home: "🇺🇾", flag_away: "🇨🇻", venue: "Miami Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M30", match_date: "2026-06-22T00:00:00Z", group_name: "Group E", team_home: "Ecuador", team_away: "Curacao", flag_home: "🇪🇨", flag_away: "🇨🇼", venue: "Lincoln Financial Field, Philadelphia", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M31", match_date: "2026-06-22T04:00:00Z", group_name: "Group F", team_home: "Netherlands", team_away: "Sweden", flag_home: "🇳🇱", flag_away: "🇸🇪", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M32", match_date: "2026-06-22T17:00:00Z", group_name: "Group J", team_home: "Argentina", team_away: "Austria", flag_home: "🇦🇷", flag_away: "🇦🇹", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M33", match_date: "2026-06-23T01:00:00Z", group_name: "Group G", team_home: "New Zealand", team_away: "Egypt", flag_home: "🇳🇿", flag_away: "🇪🇬", venue: "BC Place, Vancouver", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M34", match_date: "2026-06-23T05:00:00Z", group_name: "Group I", team_home: "Norway", team_away: "Senegal", flag_home: "🇳🇴", flag_away: "🇸🇳", venue: "Gillette Stadium, Boston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M35", match_date: "2026-06-23T05:00:00Z", group_name: "Group K", team_home: "England", team_away: "Ghana", flag_home: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", flag_away: "🇬🇭", venue: "Arrowhead Stadium, Kansas City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M36", match_date: "2026-06-23T22:00:00Z", group_name: "Group L", team_home: "Panama", team_away: "Croatia", flag_home: "🇵🇦", flag_away: "🇭🇷", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // GROUP STAGE - MATCHDAY 3 (M37-M54)
  // ═══════════════════════════════════════════
  { external_id: "M37", match_date: "2026-06-24T01:00:00Z", group_name: "Group L", team_home: "Colombia", team_away: "England", flag_home: "🇨🇴", flag_away: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M38", match_date: "2026-06-24T04:00:00Z", group_name: "Group L", team_home: "Ghana", team_away: "Argentina", flag_home: "🇬🇭", flag_away: "🇦🇷", venue: "Lincoln Financial Field, Philadelphia", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M39", match_date: "2026-06-24T19:00:00Z", group_name: "Group B", team_home: "Switzerland", team_away: "Canada", flag_home: "🇨🇭", flag_away: "🇨🇦", venue: "BC Place, Vancouver", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M40", match_date: "2026-06-24T22:00:00Z", group_name: "Group C", team_home: "Scotland", team_away: "Brazil", flag_home: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", flag_away: "🇧🇷", venue: "Miami Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M41", match_date: "2026-06-24T22:00:00Z", group_name: "Group C", team_home: "Morocco", team_away: "Haiti", flag_home: "🇲🇦", flag_away: "🇭🇹", venue: "Atlanta Stadium, Atlanta", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M42", match_date: "2026-06-25T20:00:00Z", group_name: "Group E", team_home: "Curacao", team_away: "Ivory Coast", flag_home: "🇨🇼", flag_away: "🇨🇮", venue: "Lincoln Financial Field, Philadelphia", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M43", match_date: "2026-06-25T20:00:00Z", group_name: "Group E", team_home: "Ecuador", team_away: "Germany", flag_home: "🇪🇨", flag_away: "🇩🇪", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M44", match_date: "2026-06-25T23:00:00Z", group_name: "Group F", team_home: "Tunisia", team_away: "Netherlands", flag_home: "🇹🇳", flag_away: "🇳🇱", venue: "Arrowhead Stadium, Kansas City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M45", match_date: "2026-06-26T01:00:00Z", group_name: "Group A", team_home: "South Africa", team_away: "South Korea", flag_home: "🇿🇦", flag_away: "🇰🇷", venue: "Estadio BBVA, Monterrey", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M46", match_date: "2026-06-26T19:00:00Z", group_name: "Group I", team_home: "Norway", team_away: "France", flag_home: "🇳🇴", flag_away: "🇫🇷", venue: "Gillette Stadium, Boston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M47", match_date: "2026-06-27T03:00:00Z", group_name: "Group D", team_home: "Paraguay", team_away: "Australia", flag_home: "🇵🇾", flag_away: "🇦🇺", venue: "Levi's Stadium, Santa Clara", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M48", match_date: "2026-06-27T21:00:00Z", group_name: "Group L", team_home: "Croatia", team_away: "Ghana", flag_home: "🇭🇷", flag_away: "🇬🇭", venue: "Lincoln Financial Field, Philadelphia", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M49", match_date: "2026-06-27T21:00:00Z", group_name: "Group L", team_home: "Panama", team_away: "England", flag_home: "🇵🇦", flag_away: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M50", match_date: "2026-06-27T23:30:00Z", group_name: "Group K", team_home: "Colombia", team_away: "Portugal", flag_home: "🇨🇴", flag_away: "🇵🇹", venue: "Miami Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M51", match_date: "2026-06-28T00:00:00Z", group_name: "Group H", team_home: "Cape Verde", team_away: "Saudi Arabia", flag_home: "🇨🇻", flag_away: "🇸🇦", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M52", match_date: "2026-06-28T00:00:00Z", group_name: "Group H", team_home: "Uruguay", team_away: "Spain", flag_home: "🇺🇾", flag_away: "🇪🇸", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M53", match_date: "2026-06-28T03:00:00Z", group_name: "Group G", team_home: "New Zealand", team_away: "Belgium", flag_home: "🇳🇿", flag_away: "🇧🇪", venue: "BC Place, Vancouver", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M54", match_date: "2026-06-28T03:00:00Z", group_name: "Group G", team_home: "Egypt", team_away: "Iran", flag_home: "🇪🇬", flag_away: "🇮🇷", venue: "Lumen Field, Seattle", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // ROUND OF 32 (M55-M70)
  // ═══════════════════════════════════════════
  { external_id: "M55", match_date: "2026-06-28T19:00:00Z", group_name: "Round of 32", team_home: "2A", team_away: "2B", flag_home: "🏳️", flag_away: "🏳️", venue: "SoFi Stadium, Los Angeles", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M56", match_date: "2026-06-29T18:00:00Z", group_name: "Round of 32", team_home: "1E", team_away: "3 ABCDF", flag_home: "🏳️", flag_away: "🏳️", venue: "Gillette Stadium, Boston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M57", match_date: "2026-06-30T01:00:00Z", group_name: "Round of 32", team_home: "1F", team_away: "2C", flag_home: "🏳️", flag_away: "🏳️", venue: "Estadio BBVA, Monterrey", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M58", match_date: "2026-06-29T17:00:00Z", group_name: "Round of 32", team_home: "1C", team_away: "2F", flag_home: "🏳️", flag_away: "🏳️", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M59", match_date: "2026-06-30T21:00:00Z", group_name: "Round of 32", team_home: "1I", team_away: "3 CDFGH", flag_home: "🏳️", flag_away: "🏳️", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M60", match_date: "2026-06-30T17:00:00Z", group_name: "Round of 32", team_home: "2E", team_away: "2I", flag_home: "🏳️", flag_away: "🏳️", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M61", match_date: "2026-07-01T01:00:00Z", group_name: "Round of 32", team_home: "1A", team_away: "3 CEFHI", flag_home: "🏳️", flag_away: "🏳️", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M62", match_date: "2026-07-01T16:00:00Z", group_name: "Round of 32", team_home: "1L", team_away: "3 EHIJK", flag_home: "🏳️", flag_away: "🏳️", venue: "Atlanta Stadium, Atlanta", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M63", match_date: "2026-07-02T00:00:00Z", group_name: "Round of 32", team_home: "1D", team_away: "3 BEFIJ", flag_home: "🏳️", flag_away: "🏳️", venue: "Levi's Stadium, Santa Clara", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M64", match_date: "2026-07-01T20:00:00Z", group_name: "Round of 32", team_home: "1G", team_away: "3 AEHIJ", flag_home: "🏳️", flag_away: "🏳️", venue: "Lumen Field, Seattle", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M65", match_date: "2026-07-02T19:00:00Z", group_name: "Round of 32", team_home: "2K", team_away: "2L", flag_home: "🏳️", flag_away: "🏳️", venue: "BC Place, Vancouver", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M66", match_date: "2026-07-03T01:00:00Z", group_name: "Round of 32", team_home: "1H", team_away: "2J", flag_home: "🏳️", flag_away: "🏳️", venue: "SoFi Stadium, Los Angeles", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M67", match_date: "2026-07-02T23:00:00Z", group_name: "Round of 32", team_home: "1B", team_away: "3 EFIJK", flag_home: "🏳️", flag_away: "🏳️", venue: "Arrowhead Stadium, Kansas City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M68", match_date: "2026-07-03T19:00:00Z", group_name: "Round of 32", team_home: "1J", team_away: "2H", flag_home: "🏳️", flag_away: "🏳️", venue: "Hard Rock Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M69", match_date: "2026-07-03T23:00:00Z", group_name: "Round of 32", team_home: "1K", team_away: "3 DEIJL", flag_home: "🏳️", flag_away: "🏳️", venue: "Arrowhead Stadium, Kansas City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M70", match_date: "2026-07-04T01:00:00Z", group_name: "Round of 32", team_home: "2D", team_away: "2G", flag_home: "🏳️", flag_away: "🏳️", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // ROUND OF 16 (M71-M78)
  // ═══════════════════════════════════════════
  { external_id: "M71", match_date: "2026-07-04T19:00:00Z", group_name: "Round of 16", team_home: "Ganador M56", team_away: "Ganador M59", flag_home: "🏳️", flag_away: "🏳️", venue: "Gillette Stadium, Boston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M72", match_date: "2026-07-04T23:00:00Z", group_name: "Round of 16", team_home: "Ganador M58", team_away: "Ganador M57", flag_home: "🏳️", flag_away: "🏳️", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M73", match_date: "2026-07-05T19:00:00Z", group_name: "Round of 16", team_home: "Ganador M61", team_away: "Ganador M60", flag_home: "🏳️", flag_away: "🏳️", venue: "Estadio Azteca, Mexico City", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M74", match_date: "2026-07-05T23:00:00Z", group_name: "Round of 16", team_home: "Ganador M64", team_away: "Ganador M63", flag_home: "🏳️", flag_away: "🏳️", venue: "Atlanta Stadium, Atlanta", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M75", match_date: "2026-07-06T19:00:00Z", group_name: "Round of 16", team_home: "Ganador M66", team_away: "Ganador M65", flag_home: "🏳️", flag_away: "🏳️", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M76", match_date: "2026-07-06T23:00:00Z", group_name: "Round of 16", team_home: "Ganador M68", team_away: "Ganador M67", flag_home: "🏳️", flag_away: "🏳️", venue: "Lumen Field, Seattle", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M77", match_date: "2026-07-07T19:00:00Z", group_name: "Round of 16", team_home: "Ganador M69", team_away: "Ganador M70", flag_home: "🏳️", flag_away: "🏳️", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M78", match_date: "2026-07-07T23:00:00Z", group_name: "Round of 16", team_home: "Ganador M55", team_away: "Ganador M62", flag_home: "🏳️", flag_away: "🏳️", venue: "SoFi Stadium, Los Angeles", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // QUARTERFINALS (M79-M82)
  // ═══════════════════════════════════════════
  { external_id: "M79", match_date: "2026-07-09T19:00:00Z", group_name: "Quarterfinals", team_home: "Ganador M71", team_away: "Ganador M72", flag_home: "🏳️", flag_away: "🏳️", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M80", match_date: "2026-07-09T23:00:00Z", group_name: "Quarterfinals", team_home: "Ganador M73", team_away: "Ganador M74", flag_home: "🏳️", flag_away: "🏳️", venue: "NRG Stadium, Houston", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M81", match_date: "2026-07-11T19:00:00Z", group_name: "Quarterfinals", team_home: "Ganador M75", team_away: "Ganador M76", flag_home: "🏳️", flag_away: "🏳️", venue: "Hard Rock Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M82", match_date: "2026-07-11T23:00:00Z", group_name: "Quarterfinals", team_home: "Ganador M77", team_away: "Ganador M78", flag_home: "🏳️", flag_away: "🏳️", venue: "Arrowhead Stadium, Kansas City", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // SEMIFINALS (M83-M84)
  // ═══════════════════════════════════════════
  { external_id: "M83", match_date: "2026-07-14T19:00:00Z", group_name: "Semifinals", team_home: "Ganador M79", team_away: "Ganador M80", flag_home: "🏳️", flag_away: "🏳️", venue: "AT&T Stadium, Dallas", score_home: null, score_away: null, status: "upcoming" },
  { external_id: "M84", match_date: "2026-07-15T19:00:00Z", group_name: "Semifinals", team_home: "Ganador M81", team_away: "Ganador M82", flag_home: "🏳️", flag_away: "🏳️", venue: "Atlanta Stadium, Atlanta", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // THIRD PLACE (M85)
  // ═══════════════════════════════════════════
  { external_id: "M85", match_date: "2026-07-18T21:00:00Z", group_name: "Third Place", team_home: "Perdedor M83", team_away: "Perdedor M84", flag_home: "🏳️", flag_away: "🏳️", venue: "Hard Rock Stadium, Miami", score_home: null, score_away: null, status: "upcoming" },

  // ═══════════════════════════════════════════
  // FINAL (M86)
  // ═══════════════════════════════════════════
  { external_id: "M86", match_date: "2026-07-19T19:00:00Z", group_name: "Final", team_home: "Ganador M83", team_away: "Ganador M84", flag_home: "🏳️", flag_away: "🏳️", venue: "MetLife Stadium, New York", score_home: null, score_away: null, status: "upcoming" },
];

// Group matches by date for display, sorted with today first
// Las fechas en la DB ya están en hora de Colombia, se usan directamente
export function groupMatchesByDate<
  T extends { match_date: string },
>(matches: T[]) {
  const grouped: Record<string, T[]> = {};
  for (const match of matches) {
    const date = new Date(match.match_date).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(match);
  }

  // Obtener "hoy" en zona horaria de Colombia
  const nowColombia = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
  const today = new Date(nowColombia.getFullYear(), nowColombia.getMonth(), nowColombia.getDate());

  return Object.entries(grouped).sort(([, a], [, b]) => {
    const dateA = new Date(a[0].match_date);
    const dateB = new Date(b[0].match_date);
    const dayA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const dayB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

    const aIsToday = dayA.getTime() === today.getTime();
    const bIsToday = dayB.getTime() === today.getTime();
    const aIsPast = dayA < today;
    const bIsPast = dayB < today;

    // Today first
    if (aIsToday && !bIsToday) return -1;
    if (!aIsToday && bIsToday) return 1;

    // Past dates go to bottom
    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;

    // Otherwise sort chronologically
    return dateA.getTime() - dateB.getTime();
  });
}

// Format match time for display
// Las fechas en la DB ya están en hora de Colombia
export function formatMatchTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
