import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_segura_vps_2026';

/**
 * Lê o cookie de sessão, decodifica o JWT e retorna as informações do usuário logado.
 * Retorna nulo se o token for inválido ou não existir.
 */
export function getSession() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('gp360_session')?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // { userId, email, role, cabinetId, iat, exp }
  } catch (error) {
    return null;
  }
}

/**
 * Verifica se a sessão atual possui uma das roles permitidas.
 */
export function requireRole(session, allowedRoles) {
  if (!session || !session.role) return false;
  return allowedRoles.includes(session.role);
}
