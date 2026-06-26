import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar utilizador admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@duxxialgarve.pt" },
    update: {},
    create: {
      email: "admin@duxxialgarve.pt",
      password: "admin123", // Em produção, usar hash
      name: "Administrador",
      role: "admin",
    },
  });

  console.log("Admin criado:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });