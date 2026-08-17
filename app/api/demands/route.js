import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função auxiliar para gerar protocolo
const generateProtocol = () => {
  const date = new Date();
  const year = date.getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REQ-${year}-${randomStr}`;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01'; 
    const status = searchParams.get('status');

    let whereClause = { cabinetId };
    
    if (status) {
      whereClause.status = status;
    }

    const demands = await prisma.demand.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(demands);
  } catch (error) {
    console.error('Erro ao buscar demandas:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cabinetId = 'cab_01';
    
    // Seed automático se não existir
    await prisma.cabinet.upsert({
      where: { id: cabinetId },
      update: {},
      create: {
        id: cabinetId,
        name: 'Gabinete Principal',
        candidateName: 'Candidato Teste',
        state: 'SP',
        city: 'São Paulo'
      }
    });

    const newDemand = await prisma.demand.create({
      data: {
        cabinetId,
        protocol: generateProtocol(),
        title: body.title || 'Nova Demanda',
        description: body.description || '',
        category: body.category || 'Geral',
        status: body.status || 'ABERTO',
        priority: body.priority || 'MEDIA',
        voterId: body.voterId || null
      }
    });

    return NextResponse.json(newDemand, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar demanda:', error);
    return NextResponse.json({ error: 'Falha ao salvar no banco.' }, { status: 500 });
  }
}
