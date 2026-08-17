import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/cabinets
// Retorna a lista de gabinetes (tenants) para o painel Master Admin
export async function GET(request) {
  try {
    const cabinets = await prisma.cabinet.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { voters: true }
        }
      }
    });

    return NextResponse.json(cabinets);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar gabinetes' }, { status: 500 });
  }
}

// POST /api/cabinets
// Provisiona um novo gabinete (tenant)
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Nome do gabinete pode ser derivado do body
    const cabinetName = data.name || 'Novo Gabinete';
    const plan = data.plan || 'BASIC';

    const newCabinet = await prisma.cabinet.create({
      data: {
        name: cabinetName,
        candidateName: data.candidateName || 'A Definir',
        politicalParty: data.party || 'A Definir',
        state: data.state || 'A Definir',
        city: data.city || 'A Definir',
        plan: plan,
        subscriptionStatus: 'ACTIVE',
        themeColor: 'cyan',
      }
    });

    return NextResponse.json(newCabinet, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar gabinete' }, { status: 500 });
  }
}

// PATCH /api/cabinets
// Atualiza o status de inscrição de um gabinete (tenant)
export async function PATCH(request) {
  try {
    const { id, subscriptionStatus } = await request.json();

    if (!id || !subscriptionStatus) {
      return NextResponse.json({ error: 'ID e Status são obrigatórios' }, { status: 400 });
    }

    const updatedCabinet = await prisma.cabinet.update({
      where: { id },
      data: { subscriptionStatus }
    });

    return NextResponse.json(updatedCabinet);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar gabinete' }, { status: 500 });
  }
}

