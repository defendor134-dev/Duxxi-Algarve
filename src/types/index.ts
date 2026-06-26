// ============================================================
// Sporting CP Website - TypeScript Types & Interfaces
// ============================================================

// ---- MATCHES / GAMES ----
export interface Match {
  id: string;
  competition: string;
  modality: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  stadium?: string;
  status: "scheduled" | "live" | "finished" | "postponed";
  round?: string;
  homeLogo?: string;
  awayLogo?: string;
}

// ---- NEWS ----
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
  isFeatured?: boolean;
}

// ---- PLAYER / SQUAD ----
export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  nationality: string;
  age: number;
  height: number;
  weight: number;
  imageUrl?: string;
  contractUntil?: string;
  stats?: PlayerStats;
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

// ---- STANDINGS ----
export interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  logo?: string;
}

export interface Transfer {
  id: string;
  playerName: string;
  playerPhoto: string;
  fromTeam: string;
  toTeam: string;
  transferType: string;
  transferDate: string;
  marketValue: string;
}

// ---- MODALITIES ----
export interface Modality {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon: string;
  category: "main" | "other";
  achievements: Achievement[];
}

export interface Achievement {
  year: number;
  title: string;
  description: string;
}

// ---- NAVIGATION ----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ---- COMPETITION ----
export interface Competition {
  id: string;
  name: string;
  modality: string;
  logo?: string;
  season: string;
}