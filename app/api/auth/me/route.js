import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_segura_vps_2026';

export async function GET(request) {
  try {
    const token = request.cookies.get('gp360_session')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false, error: 'Não autenticado' }, { status: 401 });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ authenticated: true, user: decoded });
  } catch (err) {
    return NextResponse.json({ authenticated: false, error: 'Sessão inválida ou expirada' }, { status: 401 });
  }
}

