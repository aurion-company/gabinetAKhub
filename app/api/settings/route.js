import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cabinetId = searchParams.get('cabinetId') || 'cab_01';

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
    const body = await request.json();
    const cabinetId = 'cab_01';
    
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
