import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// Função auxiliar para gerar protocolo
const generateProtocol = () => {
  const date = new Date();
  const year = date.getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REQ-${year}-${randomStr}`;
};

export async function GET(request) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    const cabinetId = session.cabinetId;
    const { searchParams } = new URL(request.url);
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
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const cabinetId = session.cabinetId;
    
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
    return NextResponse.json({ error: 'Falha ao salvar não banco.' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID e Status são obrigatórios' }, { status: 400 });
    }

    // Verifica se a demanda pertence ao cabinetId da sessão
    const demandToUpdate = await prisma.demand.findUnique({ where: { id } });
    if (!demandToUpdate || demandToUpdate.cabinetId !== session.cabinetId) {
      return NextResponse.json({ error: 'Demanda não encontrada ou sem permissão' }, { status: 403 });
    }

    const updatedDemand = await prisma.demand.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updatedDemand);
  } catch (error) {
    console.error('Erro ao atualizar demanda:', error);
    return NextResponse.json({ error: 'Falha ao atualizar não banco.' }, { status: 500 });
  }
}
