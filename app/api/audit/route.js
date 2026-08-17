import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';

    const logs = await prisma.auditLog.findMany({
      where: { cabinetId },
      orderBy: { timestamp: 'desc' }
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar audit logs' }, { status: 500 });
  }
}
