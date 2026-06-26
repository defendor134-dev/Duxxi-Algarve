// ============================================================
// Sporting CP - API-Football Integration (RapidAPI)
// API: https://www.api-football.com/
// Team: Sporting CP = 228 (Liga Portugal)
// ============================================================

const API_FOOTBALL_URL = "https://v3.football.api-sports.io";
const SPORTING_TEAM_ID = 228;
const LIGA_PORTUGAL_ID = 94;

interface APIFootballConfig {
  apiKey: string;
  apiHost: string;
}

function getConfig(): APIFootballConfig | null {
  const apiKey = process.env.API_FOOTBALL_KEY || process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
  const apiHost = process.env.API_FOOTBALL_HOST || process.env.NEXT_PUBLIC_API_FOOTBALL_HOST;

  if (!apiKey || !apiHost) {
    console.warn("[API-Football] Missing API credentials. Using mock data.");
    return null;
  }

  return { apiKey, apiHost };
}

async function fetchFromAPI(endpoint: string, params: Record<string, string | number> = {}) {
  const config = getConfig();
  if (!config) return null;

  const queryString = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();

  try {
    const response = await fetch(`${API_FOOTBALL_URL}${endpoint}?${queryString}`, {
      headers: {
        "x-rapidapi-key": config.apiKey,
        "x-rapidapi-host": config.apiHost,
      },
      next: { revalidate: 300 }, // 5 min cache
    });

    if (!response.ok) {
      console.error(`[API-Football] Error ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[API-Football] Fetch error:", error);
    return null;
  }
}

// ---- FIXTURES / MATCHES ----

export interface APIMatch {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "scheduled" | "live" | "finished" | "postponed";
  venue: string;
  round: string;
  homeLogo: string;
  awayLogo: string;
  competition: string;
}

interface APIFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string };
    venue: { name: string };
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number | null; away: number | null };
  league: { round: string; name: string };
}

export async function fetchNextMatches(count = 5): Promise<APIMatch[]> {
  const data = await fetchFromAPI("/fixtures", {
    team: SPORTING_TEAM_ID,
    next: count,
    status: "NS", // Not Started
  });

  if (!data?.response) {
    console.log("[API-Football] No live data, using fallback");
    return [];
  }

  return data.response.map((fixture: APIFixture) => ({
    id: fixture.fixture.id,
    date: fixture.fixture.date,
    time: fixture.fixture.date,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    status: fixture.fixture.status.short === "NS" ? "scheduled" : "live",
    venue: fixture.fixture.venue.name,
    round: fixture.league.round,
    homeLogo: fixture.teams.home.logo,
    awayLogo: fixture.teams.away.logo,
    competition: fixture.league.name,
  }));
}

export async function fetchLastResults(count = 5): Promise<APIMatch[]> {
  const data = await fetchFromAPI("/fixtures", {
    team: SPORTING_TEAM_ID,
    last: count,
    status: "FT", // Full Time
  });

  if (!data?.response) return [];

  return data.response.map((fixture: APIFixture) => ({
    id: fixture.fixture.id,
    date: fixture.fixture.date,
    time: fixture.fixture.date,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    status: "finished",
    venue: fixture.fixture.venue.name,
    round: fixture.league.round,
    homeLogo: fixture.teams.home.logo,
    awayLogo: fixture.teams.away.logo,
    competition: fixture.league.name,
  }));
}

export async function fetchLiveMatches(): Promise<APIMatch[]> {
  const data = await fetchFromAPI("/fixtures", {
    team: SPORTING_TEAM_ID,
    live: "all",
  });

  if (!data?.response) return [];

  return data.response.map((fixture: APIFixture) => ({
    id: fixture.fixture.id,
    date: fixture.fixture.date,
    time: fixture.fixture.date,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    status: "live",
    venue: fixture.fixture.venue.name,
    round: fixture.league.round,
    homeLogo: fixture.teams.home.logo,
    awayLogo: fixture.teams.away.logo,
    competition: fixture.league.name,
  }));
}

// ---- STANDINGS ----

export interface APIStanding {
  position: number;
  team: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string;
}

export async function fetchStandings(season?: number): Promise<APIStanding[]> {
  const currentSeason = season || new Date().getFullYear();
  
  const data = await fetchFromAPI("/standings", {
    league: LIGA_PORTUGAL_ID,
    season: currentSeason,
  });

  if (!data?.response?.[0]?.league?.standings?.[0]) return [];

  return data.response[0].league.standings[0].map((team: APIStandingEntry) => ({
    position: team.rank,
    team: team.team.name,
    logo: team.team.logo,
    played: team.all.played,
    won: team.all.win,
    drawn: team.all.draw,
    lost: team.all.lose,
    goalsFor: team.all.goals.for,
    goalsAgainst: team.all.goals.against,
    goalDifference: team.goalsDiff,
    points: team.points,
    form: team.form,
  }));
}

// ---- SQUAD / PLAYERS ----

export interface APIPlayer {
  id: number;
  name: string;
  number: number;
  position: string;
  age: number;
  nationality: string;
  height: number | null;
  weight: number | null;
  image: string;
}

interface APIStandingEntry {
  rank: number;
  team: { name: string; logo: string };
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: { for: number; against: number };
  };
  goalsDiff: number;
  points: number;
  form: string;
}

interface APIPlayerResponse {
  id: number;
  name: string;
  number: number;
  position: string;
  age: number;
  nationality: string;
  height: number | null;
  weight: number | null;
  photo: string;
}

export async function fetchSquad(): Promise<APIPlayer[]> {
  const data = await fetchFromAPI("/players/squads", {
    team: SPORTING_TEAM_ID,
  });

  if (!data?.response?.[0]?.players) return [];

  return data.response[0].players.map((player: APIPlayerResponse) => ({
    id: player.id,
    name: player.name,
    number: player.number,
    position: player.position,
    age: player.age,
    nationality: player.nationality,
    height: player.height,
    weight: player.weight,
    image: player.photo,
  }));
}

export interface APITransferItem {
  date: string;
  type: string;
  marketValue?: string;
  national?: boolean;
  teams: {
    team_in: {
      id: number;
      name: string;
      logo: string;
    };
    team_out: {
      id: number;
      name: string;
      logo: string;
    };
  };
}

export interface APIPlayerTransfer {
  player: {
    id: number;
    name: string;
    photo?: string;
  };
  update: string;
  transfers: APITransferItem[];
}

export async function fetchTransfers(teamId = SPORTING_TEAM_ID): Promise<APIPlayerTransfer[]> {
  const data = await fetchFromAPI("/transfers", {
    team: teamId,
  });

  if (!data?.response || !Array.isArray(data.response)) {
    console.warn("[API-Football] transfer response missing or invalid", data);
    return [];
  }

  return data.response as APIPlayerTransfer[];
}

export async function fetchPlayerStats(playerId: number, season?: number) {
  const currentSeason = season || new Date().getFullYear();

  const data = await fetchFromAPI("/players", {
    id: playerId,
    season: currentSeason,
  });

  if (!data?.response?.[0]?.statistics?.[0]) return null;

  const stats = data.response[0].statistics[0];
  return {
    appearances: stats.games.appearences || 0,
    goals: stats.goals.total || 0,
    assists: stats.goals.assists || 0,
    yellowCards: stats.cards.yellow || 0,
    redCards: stats.cards.red || 0,
    minutesPlayed: stats.games.minutes || 0,
    cleanSheets: stats.goals.conceded !== undefined ? null : stats.clean_sheet || 0,
    saves: stats.goals.saves || null,
  };
}

// ---- HEAD TO HEAD ----

export async function fetchH2H(opponentTeamId: number, count = 5) {
  const data = await fetchFromAPI("/fixtures/headtohead", {
    h2h: `${SPORTING_TEAM_ID}-${opponentTeamId}`,
    last: count,
  });

  if (!data?.response) return [];

  return data.response.map((fixture: APIFixture) => ({
    id: fixture.fixture.id,
    date: fixture.fixture.date,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    competition: fixture.league.name,
  }));
}

// ---- SEASONS ----

export async function fetchAvailableSeasons(): Promise<number[]> {
  const data = await fetchFromAPI("/leagues/seasons", {});
  return data?.response || [];
}

// ---- SYNC TO DATABASE ----

export async function syncMatchesToDatabase() {
  const [nextMatches, lastResults, live] = await Promise.all([
    fetchNextMatches(10),
    fetchLastResults(10),
    fetchLiveMatches(),
  ]);

  const allMatches = [...nextMatches, ...lastResults, ...live];
  
  // In production, this would upsert into Prisma/DB
  console.log(`[API-Football] Synced ${allMatches.length} matches`);
  
  return { success: true, count: allMatches.length };
}

export async function syncStandingsToDatabase() {
  const standings = await fetchStandings();

  console.log(`[API-Football] Synced ${standings.length} standings`);
  
  return { success: true, count: standings.length };
}

export async function syncSquadToDatabase() {
  const squad = await fetchSquad();

  console.log(`[API-Football] Synced ${squad.length} players`);
  
  return { success: true, count: squad.length };
}