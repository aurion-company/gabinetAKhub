import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';

    const links = await prisma.link.findMany({
      where: { cabinetId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar links' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cabinetId = body.cabinetId || 'cab_01';
    
    const newLink = await prisma.link.create({
      data: {
        cabinetId,
        originalUrl: body.originalUrl,
        shortSlug: body.shortSlug || Math.random().toString(36).substring(2, 8)
      }
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar link curto' }, { status: 500 });
  }
}
