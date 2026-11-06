const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cabinets = await prisma.cabinet.findMany();
  console.log("Cabinets in database:", cabinets);
  const users = await prisma.user.findMany();
  console.log("Users in database:", users);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
