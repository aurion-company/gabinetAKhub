import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';

    const docs = await prisma.officialDoc.findMany({
      where: { cabinetId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar ofícios' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cabinetId = 'cab_01';
    
    const newDoc = await prisma.officialDoc.create({
      data: {
        cabinetId,
        code: `OF-${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
        type: body.type || 'OFICIO',
        subject: body.subject || 'Sem Assunto',
        content: body.content || '',
        recipient: body.recipient || 'Destinatário',
        status: body.status || 'RASCUNHO'
      }
    });

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar ofício' }, { status: 500 });
  }
}
