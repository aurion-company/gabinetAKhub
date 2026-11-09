import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'gabinetak_hub_jwt_secret_2026_hetzner';

export async function POST(request) {
  try {
    const { name, email, phone, city, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Nome, e-mail e senha são obrigatórios.' }, { status: 400 });
    }

    let voterUser = null;

    // Tenta registrar na base de dados
    try {
      const prismaModule = await import('@/lib/prisma');
      const prisma = prismaModule.default;

      if (prisma && prisma.voter) {
        // Encontra ou cria o gabinete padrão do mandato
        let cabinet = await prisma.cabinet.findFirst();
        if (!cabinet) {
          cabinet = await prisma.cabinet.create({
            data: {
              id: 'cab_01',
              name: 'Gabinete Distrital',
              candidateName: 'Mandato Parlamentar',
              state: 'DF',
              city: city || 'Brasília'
            }
          });
        }

        // Verifica se já existe eleitor com este e-mail
        const existing = await prisma.voter.findFirst({
          where: { email }
        });

        if (existing) {
          return NextResponse.json({ error: 'Este e-mail já está cadastrado. Faça login na sua conta.' }, { status: 409 });
        }

        voterUser = await prisma.voter.create({
          data: {
            cabinetId: cabinet.id,
            name,
            email,
            phone: phone || '',
            city: city || 'Brasília',
            state: 'DF',
            neighborhood: city || 'DF',
            tags: ['CIDADAO_PORTAL', 'CADASTRO_PUBLICO']
          }
        });
      }
    } catch (dbErr) {
      console.warn('Banco indisponível para registro de cidadão, usando fallback local:', dbErr.message);
      voterUser = {
        id: 'cidadao_' + Date.now(),
        name,
        email,
        city: city || 'Brasília',
        role: 'CIDADAO'
      };
    }

    if (!voterUser) {
      voterUser = {
        id: 'cidadao_' + Date.now(),
        name,
        email,
        city: city || 'Brasília',
        role: 'CIDADAO'
      };
    }

    // Gera token de sessão cidadã
    const token = jwt.sign(
      { userId: voterUser.id, email: voterUser.email, role: 'CIDADAO', name: voterUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      message: 'Conta cidadã criada com sucesso!',
      user: {
        id: voterUser.id,
        name: voterUser.name,
        email: voterUser.email,
        city: voterUser.city
      }
    });

    response.cookies.set({
      name: 'citizen_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Erro ao cadastrar cidadão:', error);
    return NextResponse.json({ error: 'Erro interno ao processar cadastro' }, { status: 500 });
  }
}

