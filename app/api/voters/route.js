import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { prepareVoterForSave, prepareVoterForResponse } from '@/lib/security';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';
    const tag = searchParams.get('tag');

    let whereClause = { cabinetId };
    
    if (tag) {
      whereClause.tags = { has: tag };
    }

    const voters = await prisma.voter.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    const decryptedVoters = voters.map(v => prepareVoterForResponse(v));

    return NextResponse.json(decryptedVoters);
  } catch (error) {
    console.error('Erro ao buscar eleitores:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cabinetId = body.cabinetId || 'cab_01';
    
    // Assegura que o gabinete existe antes de salvar
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

    const rawData = {
      cabinetId,
      name: body.name || body.nome || 'Sem Nome',
      cpf: body.cpf || null,
      phone: body.phone || body.celular || '',
      email: body.email || null,
      address: body.address || body.endereco || null,
      neighborhood: body.neighborhood || body.bairro || null,
      city: body.city || body.cidade || null,
      state: body.state || body.uf || null,
      tags: body.tags || (body.grupo ? [body.grupo] : []),
    };

    const secureData = prepareVoterForSave(rawData);

    const newVoter = await prisma.voter.create({
      data: secureData
    });

    return NextResponse.json(prepareVoterForResponse(newVoter), { status: 201 });
  } catch (error) {
    console.error('Erro ao criar eleitor:', error);
    return NextResponse.json({ error: 'Falha ao salvar no banco.' }, { status: 500 });
  }
}
