// ============================================================
// Sporting CP - Mock Data for initial development & fallback
// Real data will come from external APIs
// ============================================================

import { Match, NewsArticle, Player, Standing, Modality } from "@/types";

export const mockMatches: Match[] = [
  {
    id: "1",
    competition: "Liga Portugal Betclic",
    modality: "Futebol",
    homeTeam: "Sporting CP",
    awayTeam: "FC Porto",
    homeScore: 2,
    awayScore: 1,
    date: "2026-06-28",
    time: "20:30",
    stadium: "Estádio José Alvalade",
    status: "scheduled",
    round: "Jornada 34",
  },
  {
    id: "2",
    competition: "Liga Portugal Betclic",
    modality: "Futebol",
    homeTeam: "SL Benfica",
    awayTeam: "Sporting CP",
    homeScore: 1,
    awayScore: 2,
    date: "2026-06-22",
    time: "20:00",
    stadium: "Estádio da Luz",
    status: "finished",
    round: "Jornada 30",
  },
  {
    id: "3",
    competition: "Liga Portugal Betclic",
    modality: "Futebol",
    homeTeam: "Sporting CP",
    awayTeam: "SC Braga",
    date: "2026-07-05",
    time: "18:00",
    stadium: "Estádio José Alvalade",
    status: "scheduled",
    round: "Jornada 35",
  },
  {
    id: "4",
    competition: "Liga Placard (Futsal)",
    modality: "Futsal",
    homeTeam: "Sporting CP",
    awayTeam: "SL Benfica",
    homeScore: 4,
    awayScore: 3,
    date: "2026-06-20",
    time: "19:00",
    stadium: "Pavilhão João Rocha",
    status: "finished",
  },
  {
    id: "5",
    competition: "Andebol 1",
    modality: "Andebol",
    homeTeam: "Sporting CP",
    awayTeam: "FC Porto",
    date: "2026-07-01",
    time: "17:00",
    stadium: "Pavilhão João Rocha",
    status: "scheduled",
  },
  {
    id: "6",
    competition: "Liga Portugal Betclic",
    modality: "Futebol",
    homeTeam: "Sporting CP",
    awayTeam: "Rio Ave FC",
    homeScore: 3,
    awayScore: 0,
    date: "2026-06-15",
    time: "20:30",
    stadium: "Estádio José Alvalade",
    status: "finished",
  },
  {
    id: "7",
    competition: "Taça de Portugal",
    modality: "Futebol",
    homeTeam: "Sporting CP",
    awayTeam: "SL Benfica",
    date: "2026-07-10",
    time: "21:00",
    stadium: "Estádio José Alvalade",
    status: "scheduled",
  },
  {
    id: "8",
    competition: "Liga Portugal Betclic",
    modality: "Futebol",
    homeTeam: "Vitória SC",
    awayTeam: "Sporting CP",
    date: "2026-07-12",
    time: "18:00",
    stadium: "Estádio D. Afonso Henriques",
    status: "scheduled",
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Sporting vence clássico e assume liderança isolada",
    description:
      "O Sporting CP venceu o FC Porto por 2-1 no Estádio José Alvalade e isolou-se na liderança do campeonato.",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    source: "Sporting CP",
    publishedAt: "2026-06-24T10:30:00Z",
    category: "Futebol",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Futsal: Sporting garante vaga na final do campeonato",
    description:
      "A equipa de futsal do Sporting CP venceu o Benfica por 4-3 num jogo emocionante.",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1577223625816-7540f056285b?w=800&q=80",
    source: "Sporting CP",
    publishedAt: "2026-06-23T15:00:00Z",
    category: "Futsal",
  },
  {
    id: "3",
    title: "Andebol: Sporting prepara final four da Taça",
    description:
      "A equipa de andebol do Sporting CP está nos finalistas da Taça de Portugal.",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109acb4b9?w=800&q=80",
    source: "Record",
    publishedAt: "2026-06-22T09:15:00Z",
    category: "Andebol",
  },
  {
    id: "4",
    title: "Gyökeres eleito melhor marcador da Liga",
    description:
      "O avançado sueco do Sporting CP foi eleito o melhor marcador da temporada.",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=800&q=80",
    source: "A Bola",
    publishedAt: "2026-06-21T14:00:00Z",
    category: "Futebol",
    isFeatured: true,
  },
  {
    id: "5",
    title: "Formação: Sporting Sub-19 vence torneio internacional",
    description:
      "A equipa sub-19 do Sporting CP conquistou o torneio internacional de Algarve.",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    source: "O Jogo",
    publishedAt: "2026-06-20T11:00:00Z",
    category: "Formação",
  },
  {
    id: "6",
    title: "Atletismo: Sporting domina campeonato nacional",
    description:
      "Os atletas do Sporting CP conquistaram 15 medalhas no campeonato nacional.",
    url: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-8faf68aa5c6a?w=800&q=80",
    source: "Sporting CP",
    publishedAt: "2026-06-19T16:30:00Z",
    category: "Atletismo",
  },
];

export const mockSquad: Player[] = [
  { id: "1", name: "Franco Israel", number: 1, position: "Guarda-Redes", nationality: "Uruguai", age: 26, height: 186, weight: 78 },
  { id: "2", name: "Antonio Adán", number: 12, position: "Guarda-Redes", nationality: "Espanha", age: 38, height: 190, weight: 82 },
  { id: "3", name: "Diego Callai", number: 41, position: "Guarda-Redes", nationality: "Brasil", age: 20, height: 192, weight: 80 },
  { id: "4", name: "Ousmane Diomande", number: 3, position: "Defesa", nationality: "Costa do Marfim", age: 22, height: 186, weight: 75 },
  { id: "5", name: "Sebastián Coates", number: 4, position: "Defesa", nationality: "Uruguai", age: 35, height: 196, weight: 85 },
  { id: "6", name: "Jeremy St. Juste", number: 6, position: "Defesa", nationality: "Holanda", age: 28, height: 186, weight: 78 },
  { id: "7", name: "Ricardo Esgaio", number: 2, position: "Defesa", nationality: "Portugal", age: 31, height: 174, weight: 72 },
  { id: "8", name: "Nuno Santos", number: 11, position: "Médio", nationality: "Portugal", age: 29, height: 178, weight: 70 },
  { id: "9", name: "Hidemasa Morita", number: 5, position: "Médio", nationality: "Japão", age: 29, height: 177, weight: 74 },
  { id: "10", name: "Morten Hjulmand", number: 23, position: "Médio", nationality: "Dinamarca", age: 25, height: 185, weight: 78 },
  { id: "11", name: "Daniel Bragança", number: 10, position: "Médio", nationality: "Portugal", age: 25, height: 170, weight: 65 },
  { id: "12", name: "Pedro Gonçalves", number: 8, position: "Médio", nationality: "Portugal", age: 26, height: 173, weight: 68 },
  { id: "13", name: "Francisco Trincão", number: 17, position: "Avançado", nationality: "Portugal", age: 25, height: 183, weight: 72 },
  { id: "14", name: "Viktor Gyökeres", number: 9, position: "Avançado", nationality: "Suécia", age: 28, height: 188, weight: 85 },
  { id: "15", name: "Marcus Edwards", number: 7, position: "Avançado", nationality: "Inglaterra", age: 27, height: 173, weight: 68 },
  { id: "16", name: "Paulinho", number: 20, position: "Avançado", nationality: "Portugal", age: 32, height: 187, weight: 80 },
];

export const mockStandings: Standing[] = [
  { position: 1, team: "Sporting CP", played: 30, won: 24, drawn: 4, lost: 2, goalsFor: 78, goalsAgainst: 22, goalDifference: 56, points: 76 },
  { position: 2, team: "SL Benfica", played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 70, goalsAgainst: 25, goalDifference: 45, points: 71 },
  { position: 3, team: "FC Porto", played: 30, won: 20, drawn: 6, lost: 4, goalsFor: 62, goalsAgainst: 28, goalDifference: 34, points: 66 },
  { position: 4, team: "SC Braga", played: 30, won: 17, drawn: 7, lost: 6, goalsFor: 55, goalsAgainst: 33, goalDifference: 22, points: 58 },
  { position: 5, team: "Vitória SC", played: 30, won: 16, drawn: 6, lost: 8, goalsFor: 48, goalsAgainst: 35, goalDifference: 13, points: 54 },
  { position: 6, team: "Rio Ave FC", played: 30, won: 12, drawn: 8, lost: 10, goalsFor: 40, goalsAgainst: 42, goalDifference: -2, points: 44 },
];

export const mockModalities: Modality[] = [
  {
    id: "futebol",
    name: "Futebol",
    description: "A modalidade rainha do Sporting CP. Com uma história rica e cheia de glórias, a equipa principal compete na Liga Portugal Betclic e nas competições europeias.",
    imageUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    icon: "⚽",
    category: "main",
    achievements: [
      { year: 2024, title: "Campeão Nacional", description: "Conquista da Liga Portugal" },
      { year: 2021, title: "Campeão Nacional", description: "Liga Portugal" },
      { year: 2019, title: "Taça de Portugal", description: "Conquista da Taça" },
      { year: 2021, title: "Taça da Liga", description: "Vencedor" },
    ],
  },
  {
    id: "futsal",
    name: "Futsal",
    description: "O Sporting CP é uma potência do futsal nacional e europeu, com múltiplos títulos de campeão nacional e presenças na final da UEFA Futsal Champions League.",
    imageUrl: "https://images.unsplash.com/photo-1577223625816-7540f056285b?w=800&q=80",
    icon: "⚡",
    category: "main",
    achievements: [
      { year: 2024, title: "Campeão Nacional", description: "Liga Placard" },
      { year: 2023, title: "Supertaça", description: "Vencedor" },
      { year: 2021, title: "Finalista Europeu", description: "UEFA Futsal Champions League" },
    ],
  },
  {
    id: "andebol",
    name: "Andebol",
    description: "O andebol do Sporting CP tem crescido imenso nos últimos anos, afirmando-se como uma das melhores equipas do país.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109acb4b9?w=800&q=80",
    icon: "🤾",
    category: "main",
    achievements: [
      { year: 2024, title: "Taça de Portugal", description: "Vencedor" },
      { year: 2023, title: "Finalista do Campeonato", description: "Vice-campeão nacional" },
    ],
  },
  {
    id: "atletismo",
    name: "Atletismo",
    description: "O Sporting CP tem uma das mais prestigiadas secções de atletismo do país, com atletas de classe mundial em várias disciplinas.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-8faf68aa5c6a?w=800&q=80",
    icon: "🏃",
    category: "main",
    achievements: [
      { year: 2024, title: "Campeão Nacional", description: "Campeonato Nacional de Clubes" },
      { year: 2023, title: "Campeão Nacional", description: "Campeonato Nacional" },
    ],
  },
  {
    id: "basquetebol",
    name: "Basquetebol",
    description: "O basquetebol do Sporting CP compete nos campeonatos nacionais, formando jovens talentos.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109acb4b9?w=800&q=80",
    icon: "🏀",
    category: "other",
    achievements: [
      { year: 2023, title: "Subida à Liga", description: "Promoção ao principal escalão" },
    ],
  },
];