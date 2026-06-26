// ============================================================
// Sporting CP - Database Seed Script
// Populates the database with initial data
// Run: npx tsx prisma/seed.ts
// ============================================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.match.deleteMany();
  await prisma.standing.deleteMany();
  await prisma.player.deleteMany();

  // ---- PLAYERS ----
  const playersData = [
    {
      id: "player-1",
      apiId: 101,
      name: "Franco Israel",
      number: 1,
      position: "Guarda-Redes",
      nationality: "Uruguai",
      age: 26,
      height: 186,
      weight: 78,
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    },
    {
      id: "player-2",
      apiId: 102,
      name: "Antonio Adán",
      number: 12,
      position: "Guarda-Redes",
      nationality: "Espanha",
      age: 38,
      height: 190,
      weight: 82,
      imageUrl: "https://images.unsplash.com/photo-1541983545419-29b2e9506384?w=800",
    },
    {
      id: "player-3",
      apiId: 103,
      name: "Ousmane Diomande",
      number: 3,
      position: "Defesa",
      nationality: "Costa do Marfim",
      age: 22,
      height: 186,
      weight: 75,
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    },
    {
      id: "player-4",
      apiId: 104,
      name: "Sebastián Coates",
      number: 4,
      position: "Defesa",
      nationality: "Uruguai",
      age: 35,
      height: 196,
      weight: 85,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    },
    {
      id: "player-5",
      apiId: 105,
      name: "Jeremy St. Juste",
      number: 6,
      position: "Defesa",
      nationality: "Holanda",
      age: 28,
      height: 186,
      weight: 78,
      imageUrl: "https://images.unsplash.com/photo-1542060741-8340caa385f8?w=800",
    },
    {
      id: "player-6",
      apiId: 106,
      name: "Nuno Santos",
      number: 11,
      position: "Médio",
      nationality: "Portugal",
      age: 29,
      height: 178,
      weight: 70,
      imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800",
    },
    {
      id: "player-7",
      apiId: 107,
      name: "Hidemasa Morita",
      number: 5,
      position: "Médio",
      nationality: "Japão",
      age: 29,
      height: 177,
      weight: 74,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    },
    {
      id: "player-8",
      apiId: 108,
      name: "Morten Hjulmand",
      number: 23,
      position: "Médio",
      nationality: "Dinamarca",
      age: 25,
      height: 185,
      weight: 78,
      imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800",
    },
    {
      id: "player-9",
      apiId: 109,
      name: "Pedro Gonçalves",
      number: 8,
      position: "Médio",
      nationality: "Portugal",
      age: 26,
      height: 173,
      weight: 68,
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800",
    },
    {
      id: "player-10",
      apiId: 110,
      name: "Francisco Trincão",
      number: 17,
      position: "Avançado",
      nationality: "Portugal",
      age: 25,
      height: 183,
      weight: 72,
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    },
    {
      id: "player-11",
      apiId: 111,
      name: "Viktor Gyökeres",
      number: 9,
      position: "Avançado",
      nationality: "Suécia",
      age: 28,
      height: 188,
      weight: 85,
      imageUrl: "https://images.unsplash.com/photo-1531891437562-430bca3a4203?w=800",
    },
    {
      id: "player-12",
      apiId: 112,
      name: "Marcus Edwards",
      number: 7,
      position: "Avançado",
      nationality: "Inglaterra",
      age: 27,
      height: 173,
      weight: 68,
      imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800",
    },
  ];

  for (const playerData of playersData) {
    await prisma.player.create({ data: playerData });
  }

  console.log(`✅ Created ${playersData.length} players`);

  // ---- STANDINGS ----
  const standingsData = [
    {
      position: 1,
      team: "Sporting CP",
      played: 30,
      won: 24,
      drawn: 4,
      lost: 2,
      goalsFor: 78,
      goalsAgainst: 22,
      points: 76,
      logo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=128",
    },
    {
      position: 2,
      team: "SL Benfica",
      played: 30,
      won: 22,
      drawn: 5,
      lost: 3,
      goalsFor: 70,
      goalsAgainst: 25,
      points: 71,
      logo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=128",
    },
    {
      position: 3,
      team: "FC Porto",
      played: 30,
      won: 20,
      drawn: 6,
      lost: 4,
      goalsFor: 62,
      goalsAgainst: 28,
      points: 66,
      logo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=128",
    },
    {
      position: 4,
      team: "SC Braga",
      played: 30,
      won: 17,
      drawn: 7,
      lost: 6,
      goalsFor: 55,
      goalsAgainst: 33,
      points: 58,
      logo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=128",
    },
    {
      position: 5,
      team: "Vitória SC",
      played: 30,
      won: 16,
      drawn: 6,
      lost: 8,
      goalsFor: 48,
      goalsAgainst: 35,
      points: 54,
      logo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=128",
    },
    {
      position: 6,
      team: "Rio Ave FC",
      played: 30,
      won: 12,
      drawn: 8,
      lost: 10,
      goalsFor: 40,
      goalsAgainst: 42,
      points: 44,
      logo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=128",
    },
  ];

  for (const standing of standingsData) {
    await prisma.standing.create({
      data: {
        ...standing,
        goalDifference: standing.goalsFor - standing.goalsAgainst,
      },
    });
  }

  console.log(`✅ Created ${standingsData.length} standings entries`);

  // ---- MATCHES ----
  const matchesData = [
    {
      id: "match-1",
      apiId: 201,
      competition: "Liga Portugal Betclic",
      modality: "Futebol",
      homeTeam: "Sporting CP",
      awayTeam: "FC Porto",
      homeScore: null,
      awayScore: null,
      date: new Date("2026-06-28"),
      time: "20:30",
      stadium: "Estádio José Alvalade",
      status: "scheduled",
      round: "Jornada 34",
      homeLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=64",
      awayLogo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=64",
    },
    {
      id: "match-2",
      apiId: 202,
      competition: "Liga Portugal Betclic",
      modality: "Futebol",
      homeTeam: "SL Benfica",
      awayTeam: "Sporting CP",
      homeScore: 1,
      awayScore: 2,
      date: new Date("2026-06-22"),
      time: "20:00",
      stadium: "Estádio da Luz",
      status: "finished",
      round: "Jornada 30",
      homeLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=64",
      awayLogo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=64",
    },
    {
      id: "match-3",
      apiId: 203,
      competition: "Liga Portugal Betclic",
      modality: "Futebol",
      homeTeam: "Sporting CP",
      awayTeam: "SC Braga",
      homeScore: null,
      awayScore: null,
      date: new Date("2026-07-05"),
      time: "18:00",
      stadium: "Estádio José Alvalade",
      status: "scheduled",
      round: "Jornada 35",
      homeLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=64",
      awayLogo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=64",
    },
    {
      id: "match-4",
      apiId: 204,
      competition: "Taça de Portugal",
      modality: "Futebol",
      homeTeam: "Sporting CP",
      awayTeam: "SL Benfica",
      homeScore: null,
      awayScore: null,
      date: new Date("2026-07-10"),
      time: "21:00",
      stadium: "Estádio José Alvalade",
      status: "scheduled",
      round: "Oitavos",
      homeLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=64",
      awayLogo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=64",
    },
    {
      id: "match-5",
      apiId: 205,
      competition: "Liga Placard",
      modality: "Futsal",
      homeTeam: "Sporting CP",
      awayTeam: "SL Benfica",
      homeScore: 4,
      awayScore: 3,
      date: new Date("2026-06-20"),
      time: "19:00",
      stadium: "Pavilhão João Rocha",
      status: "finished",
      round: "Jornada 28",
      homeLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=64",
      awayLogo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=64",
    },
    {
      id: "match-6",
      apiId: 206,
      competition: "Andebol 1",
      modality: "Andebol",
      homeTeam: "Sporting CP",
      awayTeam: "FC Porto",
      homeScore: null,
      awayScore: null,
      date: new Date("2026-07-01"),
      time: "17:00",
      stadium: "Pavilhão João Rocha",
      status: "scheduled",
      round: "Jornada 19",
      homeLogo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=64",
      awayLogo: "https://images.unsplash.com/photo-1508253578933-5dab4a9d1ce8?w=64",
    },
  ];

  for (const match of matchesData) {
    await prisma.match.create({ data: match });
  }

  console.log(`✅ Created ${matchesData.length} matches`);

  console.log("\n🎉 Database seeding completed successfully!");
  console.log("📊 Summary:");
  console.log(`   - 0 modalities`);
  console.log(`   - ${playersData.length} players`);
  console.log(`   - ${standingsData.length} standings`);
  console.log(`   - ${matchesData.length} matches`);
  console.log(`   - 0 articles`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });