import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession, requireRole } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    // Somente MASTER e POLITICO podem ver auditoria
    if (!requireRole(session, ['MASTER', 'POLITICO'])) {
      return NextResponse.json({ error: 'Permissão negada' }, { status: 403 });
    }

    const cabinetId = session.cabinetId;

    const logs = await prisma.auditLog.findMany({
      where: { cabinetId },
      orderBy: { timestamp: 'desc' }
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar audit logs' }, { status: 500 });
  }
}
