// ============================================================
// Sporting CP - Data Service Layer
// Bridges between API routes and database/API integrations
// Falls back to mock data when no DB or external API is available
// ============================================================

import { mockMatches, mockNews, mockSquad, mockStandings, mockModalities } from "@/data/mockData";
import { fetchNextMatches, fetchLastResults, fetchLiveMatches, fetchStandings, fetchSquad, fetchTransfers } from "@/lib/integrations/api-football";
import type { APIMatch } from "@/lib/integrations/api-football";
import { getCachedRSSNews } from "@/lib/rss-parser";
import { prisma } from "@/lib/db/prisma";
import type { Match, NewsArticle, Player, Standing, Transfer } from "@/types";

// ---- MATCHES ----
export async function getMatches(params?: {
  status?: string;
  modality?: string;
  query?: string;
  limit?: number;
}): Promise<Match[]> {
  try {
    // Fetch data more granularly based on the requested status
    let apiMatchesResponse: APIMatch[] = [];
    const status = params?.status;

    if (!status || status === "all") {
      const [next, last, live] = await Promise.all([
        fetchNextMatches(10),
        fetchLastResults(10),
        fetchLiveMatches(),
      ]);
      apiMatchesResponse = [...next, ...last, ...live];
    } else if (status === "scheduled") {
      apiMatchesResponse = await fetchNextMatches(10);
    } else if (status === "finished") {
      apiMatchesResponse = await fetchLastResults(10);
    } else if (status === "live") {
      apiMatchesResponse = await fetchLiveMatches();
    }

    if (apiMatchesResponse.length > 0) {
      const apiMatches: Match[] = apiMatchesResponse.map((m: APIMatch) => ({
          id: String(m.id),
          competition: m.competition,
          modality: "Futebol",
          homeTeam: m.homeTeam,
          awayTeam: m.awayTeam,
          homeScore: m.homeScore ?? undefined,
          awayScore: m.awayScore ?? undefined,
          date: m.date,
          time: m.time,
          stadium: m.venue,
          status: m.status,
          round: m.round,
          homeLogo: m.homeLogo,
          awayLogo: m.awayLogo,
      }));

      let filtered = apiMatches;
      if (params?.modality && params.modality !== "all") {
        filtered = filtered.filter(
          (m) => m.modality.toLowerCase() === params.modality!.toLowerCase()
        );
      }
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.homeTeam.toLowerCase().includes(q) ||
            m.awayTeam.toLowerCase().includes(q) ||
            m.competition.toLowerCase().includes(q) ||
            (m.stadium?.toLowerCase().includes(q) ?? false) ||
            (m.round?.toLowerCase().includes(q) ?? false)
        );
      }
      if (params?.limit && params.limit > 0) {
        return filtered.slice(0, params.limit);
      }
      return filtered;
    }
  } catch (error) {
    console.warn("[DataService] API-Football unavailable, using mock data:", error);
  }

  // Fallback to mock data
  let matches = [...mockMatches];
  if (params?.status && params.status !== "all") {
    matches = matches.filter((m) => m.status === params.status);
  }
  if (params?.modality && params.modality !== "all") {
    matches = matches.filter(
      (m) => m.modality.toLowerCase() === params.modality!.toLowerCase()
    );
  }
  if (params?.query) {
    const q = params.query.toLowerCase();
    matches = matches.filter(
      (m) =>
        m.homeTeam.toLowerCase().includes(q) ||
        m.awayTeam.toLowerCase().includes(q) ||
        m.competition.toLowerCase().includes(q) ||
        m.stadium?.toLowerCase().includes(q) ||
        m.round?.toLowerCase().includes(q)
    );
  }
  if (params?.limit && params.limit > 0) {
    return matches.slice(0, params.limit);
  }
  return matches;
}

// ---- NEWS ----
export async function getNews(params?: {
  category?: string;
  limit?: number;
  query?: string;
}): Promise<NewsArticle[]> {
  try {
    // Try RSS feeds first
    const rssNews = await getCachedRSSNews();
    if (rssNews.length > 0) {
      let filtered = rssNews;
      if (params?.category && params.category !== "all") {
        filtered = filtered.filter(
          (a) => a.category.toLowerCase() === params.category!.toLowerCase()
        );
      }
      if (params?.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q) ||
            a.content?.toLowerCase().includes(q) ||
            a.source.toLowerCase().includes(q)
        );
      }
      filtered.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      return params?.limit ? filtered.slice(0, params.limit) : filtered;
    }
  } catch (error) {
    console.warn("[DataService] RSS unavailable, using mock data:", error);
  }

  // Fallback to mock data
  let news = [...mockNews];
  if (params?.category && params.category !== "all") {
    news = news.filter(
      (a) => a.category.toLowerCase() === params.category!.toLowerCase()
    );
  }
  if (params?.query) {
    const q = params.query.toLowerCase();
    news = news.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.content?.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
    );
  }
  news.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return params?.limit ? news.slice(0, params.limit) : news;
}

// ---- STANDINGS ----
export async function getStandings(): Promise<Standing[]> {
  try {
    const apiStandings = await fetchStandings();
    if (apiStandings.length > 0) {
      return apiStandings.map((s) => ({
        position: s.position,
        team: s.team,
        played: s.played,
        won: s.won,
        drawn: s.drawn,
        lost: s.lost,
        goalsFor: s.goalsFor,
        goalsAgainst: s.goalsAgainst,
        goalDifference: s.goalDifference,
        points: s.points,
        logo: s.logo,
      }));
    }
  } catch (error) {
    console.warn("[DataService] API-Football standings unavailable, using mock data:", error);
  }

  return [...mockStandings];
}

// ---- TRANSFERS ----
export async function getTransfers(): Promise<Transfer[]> {
  try {
    const apiTransfers = await fetchTransfers();
    if (apiTransfers.length > 0) {
      return apiTransfers.flatMap((playerTransfer) =>
        (playerTransfer.transfers ?? []).map((transferItem, index) => ({
          id: String(
            `${playerTransfer.player.id}-${transferItem.date}-${index}`
          ),
          playerName:
            playerTransfer.player.name ?? "Jogador desconhecido",
          playerPhoto: playerTransfer.player.photo ?? "",
          fromTeam:
            transferItem.teams?.team_out?.name ?? "Desconhecido",
          toTeam:
            transferItem.teams?.team_in?.name ?? "Desconhecido",
          transferType: transferItem.type ?? "Transferência",
          transferDate: transferItem.date ?? "",
          marketValue: transferItem.marketValue ?? "",
        }))
      );
    }
  } catch (error) {
    console.warn("[DataService] API-Football transfers unavailable, using fallback:", error);
  }

  return [];
}

// ---- SQUAD ----
export async function getSquad(params?: {
  position?: string;
  query?: string;
}): Promise<Player[]> {
  // 1. Attempt to fetch fresh data from the API
  try {
    console.log("[DataService] Attempting to fetch fresh squad from API-Football.");
    const apiSquad = await fetchSquad(); // This can throw an error if the API fails

    if (apiSquad.length > 0) {
      const playersToUpsert = apiSquad.map((p) => ({
        id: String(p.id),
        apiId: p.id,
        name: p.name,
        number: p.number,
        position: p.position,
        nationality: p.nationality,
        age: p.age,
        height: p.height ?? 0,
        weight: p.weight ?? 0,
        imageUrl: p.image,
      }));

      // 2. Asynchronously update the database cache (fire-and-forget)
      // We don't await this, so the user gets the data immediately.
      prisma.$transaction(
        playersToUpsert.map((player) =>
          prisma.player.upsert({
            where: { apiId: player.apiId },
            update: { ...player, updatedAt: new Date() },
            create: player,
          })
        )
      ).then(() => {
        console.log(`[DataService] Synced ${playersToUpsert.length} players to DB in background.`);
      }).catch((dbError: unknown) => {
        console.error("[DataService] Failed to sync squad to DB:", dbError);
      });

      // 3. Return filtered fresh data immediately
      return filterPlayers(playersToUpsert, params);
    }
  } catch (apiError) {
    console.warn("[DataService] API-Football unavailable, falling back to cache.", apiError);
  }

  // 4. If API fails, fall back to database cache
  if (process.env.DATABASE_URL) {
    try {
      console.log("[DataService] Serving squad from DB cache.");
      const cachedPlayers = await prisma.player.findMany();
      if (cachedPlayers.length > 0) {
        return filterPlayers(cachedPlayers, params);
      }
    } catch (dbError: unknown) {
      console.warn("[DataService] DB cache unavailable, falling back to mock data.", dbError);
    }
  } else {
    console.warn("[DataService] DATABASE_URL not configured, skipping DB cache.");
  }

  // 5. If both API and DB fail, fall back to mock data
  console.log("[DataService] All data sources failed, using mock data.");
  return filterPlayers(mockSquad, params);
}

function filterPlayers(players: Player[], params?: { position?: string; query?: string }): Player[] {
  let squad = [...players];
  if (params?.position && params.position !== "Todas") {
    squad = squad.filter(
      (p) => p.position.toLowerCase() === params.position!.toLowerCase()
    );
  }
  if (params?.query) {
    const lowerQuery = params.query.toLowerCase();
    squad = squad.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.nationality.toLowerCase().includes(lowerQuery)
    );
  }
  return squad;
}

// ---- MODALITIES ----
export async function getModalities() {
  return [...mockModalities];
}

// ---- Specific Selectors for Pages ----

export async function getNextMatch(): Promise<Match | null> {
  // Sort by date to ensure the very next match is first
  const matches = (await getMatches({ status: "scheduled" })).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return matches.length > 0 ? matches[0] : null;
}

export async function getRecentResults(limit: number): Promise<Match[]> {
  const matches = await getMatches({ status: "finished" });
  // Sort by date descending to get the most recent results
  return matches
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getFeaturedNews(): Promise<NewsArticle | null> {
  const news = await getNews({});
  // In a real scenario, the API/CMS would provide a featured flag.
  // Here, we fall back to the latest article if no specific one is featured.
  const featured = news.find((n) => n.isFeatured);
  return featured || (news.length > 0 ? news[0] : null);
}

export async function getLatestNews(limit: number): Promise<NewsArticle[]> {
  const news = await getNews({});
  // Exclude the featured article from the latest news list
  return news.filter((n) => !n.isFeatured).slice(0, limit);
}
