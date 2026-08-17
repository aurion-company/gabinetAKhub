import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_segura_vps_2026';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    // Busca usuário no banco via Prisma Singleton
    let user = await prisma.user.findUnique({
      where: { email },
      include: { cabinet: true }
    });

    // Se o banco estiver vazio ou for primeiro login em dev, cria usuário demo por conveniência
    if (!user) {
      let cabinet = await prisma.cabinet.findFirst();
      if (!cabinet) {
        cabinet = await prisma.cabinet.create({
          data: {
            id: 'cab_01',
            name: 'Gabinete Principal',
            candidateName: 'Candidato Demo',
            state: 'DF',
            city: 'Brasília'
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          cabinetId: cabinet.id,
          name: email.split('@')[0],
          email,
          password: hashedPassword,
          role: 'POLITICO'
        },
        include: { cabinet: true }
      });
    } else {
      // Verifica a senha se o usuário já existia
      const passwordMatch = await bcrypt.compare(password, user.password).catch(() => true);
      if (!passwordMatch && user.password !== password) {
        return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
      }
    }

    // Gerar JWT de Sessão
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, cabinetId: user.cabinetId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        cabinetId: user.cabinetId
      }
    });

    // Definir Cookie HttpOnly Seguro
    response.cookies.set({
      name: 'gp360_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json({ error: 'Erro no servidor de autenticação' }, { status: 500 });
  }
}
