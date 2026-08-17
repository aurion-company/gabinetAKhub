import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_segura_vps';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 400 });
    }

    // Gerar JWT de Sessão
    const token = jwt.sign(
      { email, role: 'POLITICO', cabinetId: 'cab_01' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json({ success: true, user: { email, name: 'Fabiana' } });

    // Definir Cookie HttpOnly Seguro (Não acessível via JavaScript / Console do Navegador)
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
    return NextResponse.json({ error: 'Erro no servidor de autenticação' }, { status: 500 });
  }
}
