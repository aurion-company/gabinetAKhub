import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01'; // Mock para auth, futuramente ler do JWT HttpOnly
    const tag = searchParams.get('tag');

    // Busca eleitores do gabinete atual
    let whereClause = { cabinetId };
    
    // Se passar tag (ex: para separar leads de cadastros efetivos)
    if (tag) {
      whereClause.tags = { has: tag };
    }

    const voters = await prisma.voter.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(voters);
  } catch (error) {
    console.error('Erro ao buscar eleitores:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cabinetId = 'cab_01'; // Mock até integrar 100% o middleware JWT
    
    // Assegura que o gabinete existe antes de salvar (Seed automático se não existir)
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

    const newVoter = await prisma.voter.create({
      data: {
        cabinetId,
        name: body.name || 'Sem Nome',
        phone: body.phone || '',
        email: body.email,
        address: body.address,
        neighborhood: body.neighborhood,
        city: body.city,
        state: body.state,
        tags: body.tags || [],
      }
    });

    return NextResponse.json(newVoter, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar eleitor:', error);
    return NextResponse.json({ error: 'Falha ao salvar no banco.' }, { status: 500 });
  }
}
