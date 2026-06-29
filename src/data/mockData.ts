// ============================================================
// Directivo Algarve - Mock Data
// Claque oficial do Sporting Clube de Portugal no Algarve
// ============================================================

import { Match, NewsArticle, Player, Standing, Modality } from "@/types";

// ---- CLAQUE DATA ----
export const claqueTimeline = [
  { year: 2002, title: "Fundação do Directivo Ultras XXI", description: "A 17 de maio de 2002 nasce o Directivo Ultras XXI (DUXXI). O grupo começa no topo Norte do antigo Estádio José Alvalade, deslocando-se mais tarde para o sector A18 do topo Sul do novo estádio." },
  { year: 2010, title: "Nascimento do núcleo do Algarve", description: "No início da década de 2010, sportinguistas do Algarve com ligação ao DUXXI começam a organizar-se como núcleo regional. O Directivo Algarve dá os primeiros passos como polo de apoio no sul do país." },
  { year: 2019, title: "Estruturação do Directivo Algarve", description: "O núcleo algarvio consolida-se como referência regional, organizando deslocações regulares a Alvalade e a todo o país. A presença nos jogos do Sporting no Algarve torna-se constante." },
  { year: 2022, title: "Expansão e presença nacional", description: "O Directivo Algarve marca presença em todos os estádios nacionais e começa a acompanhar o Sporting nas competições europeias. O núcleo torna-se um dos polos mais ativos do DUXXI." },
  { year: 2024, title: "Presença internacional", description: "Acompanhamos o Sporting na Champions League e em deslocações internacionais. O núcleo algarvio continua a crescer e a afirmar-se como a extensão sul da família ultra leonina." },
  { year: 2025, title: "Fortalecimento e comunidade", description: "O Directivo Algarve reforça a sua presença digital, organiza ações de solidariedade social e continua a ser o principal motor da mobilização sportinguista na região sul." },
];

export const claqueStats = [
  { value: "200+", label: "Membros Ativos" },
  { value: "50+", label: "Deslocações" },
  { value: "7", label: "Anos de História" },
  { value: "16", label: "Concelhos do Algarve" },
];

export const claqueBenefits = [
  { title: "AMOR AO CLUBE", description: "O verdadeiro benefício de pertencer a uma claque ultra é sentir o amor incondicional pelo Sporting Clube de Portugal. Coerência, honra e fidelidade — eis a nossa mentalidade." },
  { title: "UNIÃO", description: "Fazer parte de algo maior que nós. O Directivo Algarve é uma família sportinguista onde todos se apoiam dentro e fora dos estádios." },
  { title: "VOZ ATIVA", description: "Direito a voto nas decisões importantes da claque. A tua opinião conta para definir o rumo do Directivo Algarve." },
  { title: "EVENTOS E CONVÍVIOS", description: "Participação em festas, jantares e encontros de membros. O espírito sportinguista vive-se dentro e fora do estádio." },
  { title: "GRUPO EXCLUSIVO", description: "Acesso ao grupo privado de WhatsApp e redes sociais da claque. Onde a verdadeira comunicação acontece." },
];


// ---- GALLERY ----
export const galleryAlbums = [
  { id: "epoca-2025-26", title: "Época 2025/26", cover: "/site-images/imagem5.jpg", count: 24 },
  { id: "epoca-2024-25", title: "Época 2024/25", cover: "/site-images/imagem6.jpg", count: 42 },
  { id: "deslocacoes", title: "Deslocações", cover: "/site-images/imagem7.jpg", count: 36 },
  { id: "convivios", title: "Convívios", cover: "/site-images/imagem8.jpg", count: 18 },
  { id: "coreografias", title: "Coreografias", cover: "/site-images/imagem9.jpg", count: 15 },
];

export const galleryPhotos = [
  { id: "1", src: "/site-images/imagem5.jpg", alt: "Jogo no Estádio José Alvalade", album: "epoca-2025-26" },
  { id: "2", src: "/site-images/imagem6.jpg", alt: "Deslocação ao Porto", album: "epoca-2025-26" },
  { id: "3", src: "/site-images/imagem7.jpg", alt: "Convívio de Verão", album: "convivios" },
  { id: "4", src: "/site-images/imagem8.jpg", alt: "Coreografia no Algarve", album: "coreografias" },
  { id: "5", src: "/site-images/imagem9.jpg", alt: "Viagem a Braga", album: "deslocacoes" },
  { id: "6", src: "/site-images/background.jpg", alt: "Grupo de membros", album: "epoca-2024-25" },
];

// ---- DESLOCACOES ----
export const deslocacoesData = [
  {
    id: "1",
    jogo: "Sporting CP vs FC Porto",
    data: "2026-06-28",
    hora: "20:30",
    estadio: "Estádio José Alvalade",
    localPartida: "Faro - Parque de Estacionamento do Algarve Shopping",
    horaPartida: "15:30",
    preco: "25€",
    vagas: 50,
    vagasOcupadas: 32,
    estado: "aberto",
  },
  {
    id: "2",
    jogo: "SL Benfica vs Sporting CP",
    data: "2026-09-15",
    hora: "18:00",
    estadio: "Estádio da Luz",
    localPartida: "Albufeira - Rotunda do Relógio",
    horaPartida: "12:00",
    preco: "30€",
    vagas: 40,
    vagasOcupadas: 40,
    estado: "lotado",
  },
  {
    id: "3",
    jogo: "Sporting CP vs SC Braga",
    data: "2026-07-05",
    hora: "18:00",
    estadio: "Estádio José Alvalade",
    localPartida: "Portimão - Praça da República",
    horaPartida: "13:00",
    preco: "20€",
    vagas: 35,
    vagasOcupadas: 15,
    estado: "aberto",
  },
  {
    id: "4",
    jogo: "Vitória SC vs Sporting CP",
    data: "2026-10-20",
    hora: "20:00",
    estadio: "Estádio D. Afonso Henriques",
    localPartida: "Faro - Algarve Shopping",
    horaPartida: "11:00",
    preco: "35€",
    vagas: 30,
    vagasOcupadas: 30,
    estado: "lotado",
  },
  {
    id: "5",
    jogo: "Sporting CP vs SL Benfica",
    data: "2026-11-10",
    hora: "21:00",
    estadio: "Estádio José Alvalade",
    localPartida: "Olhão - Mercado Municipal",
    horaPartida: "16:00",
    preco: "25€",
    vagas: 45,
    vagasOcupadas: 28,
    estado: "aberto",
  },
];

// ---- MATCHES ----
export const mockMatches: Match[] = [
  { id: "1", competition: "Liga Portugal Betclic", modality: "Futebol", homeTeam: "Sporting CP", awayTeam: "FC Porto", homeScore: 2, awayScore: 1, date: "2026-06-28", time: "20:30", stadium: "Estádio José Alvalade", status: "scheduled", round: "Jornada 34" },
  { id: "2", competition: "Liga Portugal Betclic", modality: "Futebol", homeTeam: "SL Benfica", awayTeam: "Sporting CP", homeScore: 1, awayScore: 2, date: "2026-06-22", time: "20:00", stadium: "Estádio da Luz", status: "finished", round: "Jornada 30" },
  { id: "3", competition: "Liga Portugal Betclic", modality: "Futebol", homeTeam: "Sporting CP", awayTeam: "SC Braga", date: "2026-07-05", time: "18:00", stadium: "Estádio José Alvalade", status: "scheduled", round: "Jornada 35" },
  { id: "4", competition: "Liga Placard (Futsal)", modality: "Futsal", homeTeam: "Sporting CP", awayTeam: "SL Benfica", homeScore: 4, awayScore: 3, date: "2026-06-20", time: "19:00", stadium: "Pavilhão João Rocha", status: "finished" },
  { id: "5", competition: "Andebol 1", modality: "Andebol", homeTeam: "Sporting CP", awayTeam: "FC Porto", date: "2026-07-01", time: "17:00", stadium: "Pavilhão João Rocha", status: "scheduled" },
  { id: "6", competition: "Liga Portugal Betclic", modality: "Futebol", homeTeam: "Sporting CP", awayTeam: "Rio Ave FC", homeScore: 3, awayScore: 0, date: "2026-06-15", time: "20:30", stadium: "Estádio José Alvalade", status: "finished" },
  { id: "7", competition: "Taça de Portugal", modality: "Futebol", homeTeam: "Sporting CP", awayTeam: "SL Benfica", date: "2026-07-10", time: "21:00", stadium: "Estádio José Alvalade", status: "scheduled" },
  { id: "8", competition: "Liga Portugal Betclic", modality: "Futebol", homeTeam: "Vitória SC", awayTeam: "Sporting CP", date: "2026-07-12", time: "18:00", stadium: "Estádio D. Afonso Henriques", status: "scheduled" },
];

// ---- NEWS ----
export const mockNews: NewsArticle[] = [
  { id: "1", title: "Directivo Algarve marca presença no clássico em Alvalade", description: "Mais de 40 membros da Directivo Algarve estiveram presentes no Estádio José Alvalade para apoiar o Sporting na vitória sobre o FC Porto.", url: "#", imageUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80", source: "Directivo Algarve", publishedAt: "2026-06-25T10:30:00Z", category: "Claque", isFeatured: true },
  { id: "2", title: "Inscrições abertas para deslocação a Alvalade", description: "Estão abertas as inscrições para a próxima deslocação a Lisboa. Garante o teu lugar!", url: "#", imageUrl: "https://images.unsplash.com/photo-1577223625816-7540f056285b?w=800&q=80", source: "Directivo Algarve", publishedAt: "2026-06-23T15:00:00Z", category: "Deslocações" },
  { id: "3", title: "Convívio de Verão da Directivo Algarve", description: "No próximo sábado, vai realizar-se o convívio anual de verão da claque. Haverá churrasco, música e muito espírito sportinguista.", url: "#", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109acb4b9?w=800&q=80", source: "Directivo Algarve", publishedAt: "2026-06-22T09:15:00Z", category: "Eventos" },
  { id: "4", title: "Sporting vence e isola-se na liderança", description: "O Sporting CP venceu o Rio Ave por 3-0 e isolou-se na liderança do campeonato. O Directivo Algarve marcou presença.", url: "#", imageUrl: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=800&q=80", source: "Record", publishedAt: "2026-06-21T14:00:00Z", category: "Sporting", isFeatured: true },
  { id: "5", title: "Nova camisola da claque já disponível", description: "Já está disponível a nova camisola da Directivo Algarve para a época 2026/27. Encomenda a tua!", url: "#", imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80", source: "Directivo Algarve", publishedAt: "2026-06-20T11:00:00Z", category: "Merch" },
  { id: "6", title: "Assembleia Geral da Directivo Algarve", description: "Convocamos todos os sócios para a Assembleia Geral Ordinária que se realizará no próximo mês.", url: "#", imageUrl: "https://images.unsplash.com/photo-1461896836934-8faf68aa5c6a?w=800&q=80", source: "Directivo Algarve", publishedAt: "2026-06-19T16:30:00Z", category: "Claque" },
];

// ---- SQUAD ----
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

// ---- STANDINGS ----
export const mockStandings: Standing[] = [
  { position: 1, team: "Sporting CP", played: 30, won: 24, drawn: 4, lost: 2, goalsFor: 78, goalsAgainst: 22, goalDifference: 56, points: 76 },
  { position: 2, team: "SL Benfica", played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 70, goalsAgainst: 25, goalDifference: 45, points: 71 },
  { position: 3, team: "FC Porto", played: 30, won: 20, drawn: 6, lost: 4, goalsFor: 62, goalsAgainst: 28, goalDifference: 34, points: 66 },
  { position: 4, team: "SC Braga", played: 30, won: 17, drawn: 7, lost: 6, goalsFor: 55, goalsAgainst: 33, goalDifference: 22, points: 58 },
  { position: 5, team: "Vitória SC", played: 30, won: 16, drawn: 6, lost: 8, goalsFor: 48, goalsAgainst: 35, goalDifference: 13, points: 54 },
  { position: 6, team: "Rio Ave FC", played: 30, won: 12, drawn: 8, lost: 10, goalsFor: 40, goalsAgainst: 42, goalDifference: -2, points: 44 },
];

// ---- MODALITIES ----
export const mockModalities: Modality[] = [
  { id: "futebol", name: "Futebol", description: "A modalidade rainha do Sporting CP. Com uma história rica e cheia de glórias.", imageUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80", icon: "⚽", category: "main", achievements: [{ year: 2024, title: "Campeão Nacional", description: "Liga Portugal" }, { year: 2021, title: "Campeão Nacional", description: "Liga Portugal" }] },
  { id: "futsal", name: "Futsal", description: "O Sporting CP é uma potência do futsal nacional e europeu.", imageUrl: "https://images.unsplash.com/photo-1577223625816-7540f056285b?w=800&q=80", icon: "⚡", category: "main", achievements: [{ year: 2024, title: "Campeão Nacional", description: "Liga Placard" }] },
  { id: "andebol", name: "Andebol", description: "O andebol do Sporting CP tem crescido imenso nos últimos anos.", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109acb4b9?w=800&q=80", icon: "🤾", category: "main", achievements: [{ year: 2024, title: "Taça de Portugal", description: "Vencedor" }] },
  { id: "atletismo", name: "Atletismo", description: "O Sporting CP tem uma das mais prestigiadas secções de atletismo.", imageUrl: "https://images.unsplash.com/photo-1461896836934-8faf68aa5c6a?w=800&q=80", icon: "🏃", category: "main", achievements: [{ year: 2024, title: "Campeão Nacional", description: "Campeonato Nacional de Clubes" }] },
  { id: "basquetebol", name: "Basquetebol", description: "O basquetebol do Sporting CP compete nos campeonatos nacionais.", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109acb4b9?w=800&q=80", icon: "🏀", category: "other", achievements: [{ year: 2023, title: "Subida à Liga", description: "Promoção" }] },
];