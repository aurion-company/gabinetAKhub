import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';

    const donations = await prisma.donation.findMany({
      where: { cabinetId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar doações' }, { status: 500 });
  }
}
