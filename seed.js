const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding do banco de dados...');

  // 1. Limpar dados antigos se necessário
  console.log('Limpando tabelas existentes...');
  await prisma.auditLog.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.link.deleteMany({});
  await prisma.voter.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.cabinet.deleteMany({});

  // 2. Criar Cabinets (Gabinete 01 e Gabinete 02)
  console.log('Criando cabinets...');
  const cab1 = await prisma.cabinet.create({
    data: {
      id: 'cab_01',
      name: 'Gabinete Principal',
      candidateName: 'Candidato Teste',
      state: 'DF',
      city: 'Brasília',
      subscriptionStatus: 'ACTIVE',
      plan: 'PRO'
    }
  });

  const cab2 = await prisma.cabinet.create({
    data: {
      id: 'cab_02',
      name: 'Gabinete Secundário',
      candidateName: 'Candidato Demo',
      state: 'SP',
      city: 'São Paulo',
      subscriptionStatus: 'SUSPENDED',
      plan: 'ENTERPRISE'
    }
  });

  // 3. Criar Eleitores (Voters)
  console.log('Criando eleitores...');
  await prisma.voter.create({
    data: {
      cabinetId: 'cab_01',
      name: 'Safira Gomes de Moura',
      cpf: '123.456.789-00',
      phone: '(61) 99999-1111',
      email: 'safira@email.com',
      address: 'Asa Sul',
      city: 'Brasília',
      state: 'DF',
      lat: -15.803,
      lng: -47.883,
      tags: ['Lideranças']
    }
  });

  await prisma.voter.create({
    data: {
      cabinetId: 'cab_01',
      name: 'Carlos Andrade',
      cpf: '234.567.890-11',
      phone: '(61) 98888-2222',
      email: 'carlos@email.com',
      address: 'Centro',
      city: 'Brasília',
      state: 'DF',
      lat: -15.793,
      lng: -47.882,
      tags: ['Apoiadores']
    }
  });

  await prisma.voter.create({
    data: {
      cabinetId: 'cab_01',
      name: 'Ana Clara Souza',
      cpf: '345.678.901-22',
      phone: '(61) 97777-3333',
      email: 'anaclara@email.com',
      address: 'Sudoeste',
      city: 'Brasília',
      state: 'DF',
      lat: -15.798,
      lng: -47.915,
      tags: ['Voluntários']
    }
  });

  // 4. Criar Logs de Auditoria (AuditLogs)
  console.log('Criando logs de auditoria...');
  await prisma.auditLog.create({
    data: {
      cabinetId: 'cab_01',
      action: 'UPDATE_CONFIG',
      resource: 'Configuração do Pixel do Meta Ads',
      ipAddress: '192.168.1.100',
      hashData: 'b78a9c43b2f5678cd90ae1234f567890abcdef1234567890abcdef1234567890'
    }
  });

  await prisma.auditLog.create({
    data: {
      cabinetId: 'cab_01',
      action: 'EXPORT_DATA',
      resource: 'Exportação de Relatório de Eleitores',
      ipAddress: '192.168.1.101',
      hashData: 'c90a1b23c4d5678ef01ab234c567890abcdef1234567890abcdef1234567890'
    }
  });

  await prisma.auditLog.create({
    data: {
      cabinetId: 'cab_01',
      action: 'VIEW_VOTER',
      resource: 'Visualização do Eleitor: Safira Gomes',
      ipAddress: '192.168.1.102',
      hashData: 'd01b2c34d5e6789f02bc345d67890abcdef1234567890abcdef1234567890'
    }
  });

  // 5. Criar Doações (Donations)
  console.log('Criando doações...');
  await prisma.donation.create({
    data: {
      cabinetId: 'cab_01',
      donorName: 'Mariana Silva',
      donorCpf: '123.456.789-00',
      donorEmail: 'mariana@email.com',
      amount: 1500.00,
      paymentMethod: 'PIX',
      transactionId: 'tx_001',
      status: 'PAGO'
    }
  });

  await prisma.donation.create({
    data: {
      cabinetId: 'cab_01',
      donorName: 'Roberto Santos',
      donorCpf: '234.567.890-11',
      donorEmail: 'roberto@email.com',
      amount: 250.00,
      paymentMethod: 'PIX',
      transactionId: 'tx_002',
      status: 'PAGO'
    }
  });

  await prisma.donation.create({
    data: {
      cabinetId: 'cab_01',
      donorName: 'Julia Souza',
      donorCpf: '345.678.901-22',
      donorEmail: 'julia@email.com',
      amount: 50.00,
      paymentMethod: 'PIX',
      transactionId: 'tx_003',
      status: 'PAGO'
    }
  });

  // 6. Criar Links Curtos (Links)
  console.log('Criando links curtos...');
  await prisma.link.create({
    data: {
      cabinetId: 'cab_01',
      originalUrl: 'https://www.google.com',
      shortSlug: 'google-test',
      clicks: 42,
      active: true
    }
  });

  await prisma.link.create({
    data: {
      cabinetId: 'cab_01',
      originalUrl: 'https://seu-site-politico.com.br/doacao',
      shortSlug: 'doar-campanha',
      clicks: 156,
      active: true
    }
  });

  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
