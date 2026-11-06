import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, phoneId } = body;

    if (!token || !phoneId) {
      return NextResponse.json({ error: 'Token ou Phone ID ausente' }, { status: 400 });
    }

    // MOCK: Em produção, o sistema salvaria essas credenciais num banco de dados
    // (ex: Prisma -> SystemSettings) para a aplicação enviar mensagens futuramente.

    return NextResponse.json({ 
      success: true, 
      message: 'Conectado à API Oficial da Meta com sucesso.',
      phoneId: phoneId
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
