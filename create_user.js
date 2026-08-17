const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'bruno.machado@plazabrasilia';
  const password = await bcrypt.hash('101010', 10);
  let cabinet = await prisma.cabinet.findFirst({ where: { name: 'Master System' } });
  if (!cabinet) {
    cabinet = await prisma.cabinet.create({
      data: { name: 'Master System', candidateName: 'Plaza Admin', state: 'DF', city: 'Brasília', plan: 'ENTERPRISE' }
    });
  }
  const user = await prisma.user.upsert({
    where: { email },
    update: { password, role: 'MASTER' },
    create: { email, password, name: 'Bruno Machado', role: 'MASTER', cabinetId: cabinet.id }
  });
  console.log('User created successfully: ' + user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
