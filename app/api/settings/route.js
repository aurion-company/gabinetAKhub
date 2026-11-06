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
    
    // Somente MASTER pode ler/modificar configurações críticas
    if (!requireRole(session, ['MASTER'])) {
      return NextResponse.json({ error: 'Permissão negada' }, { status: 403 });
    }

    const cabinetId = session.cabinetId;

    const settings = await prisma.systemSetting.findMany({
      where: { cabinetId }
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar configurações' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    if (!requireRole(session, ['MASTER'])) {
      return NextResponse.json({ error: 'Permissão negada' }, { status: 403 });
    }

    const body = await request.json();
    const cabinetId = session.cabinetId;
    
    const newSetting = await prisma.systemSetting.upsert({
      where: {
        cabinetId_key: {
          cabinetId,
          key: body.key
        }
      },
      update: {
        value: body.value
      },
      create: {
        cabinetId,
        key: body.key,
        value: body.value
      }
    });

    return NextResponse.json(newSetting, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar configuração' }, { status: 500 });
  }
}
