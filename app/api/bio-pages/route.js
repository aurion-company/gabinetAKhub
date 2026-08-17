import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';

    const bioPages = await prisma.bioPage.findMany({
      where: { cabinetId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(bioPages);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar páginas de biografia' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const cabinetId = 'cab_01';
    
    const newBio = await prisma.bioPage.create({
      data: {
        cabinetId,
        title: body.title || 'Minha Bio',
        slug: body.slug || Math.random().toString(36).substring(2, 8),
        bio: body.bio || '',
        theme: body.theme || 'dark'
      }
    });

    return NextResponse.json(newBio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar página de biografia' }, { status: 500 });
  }
}
