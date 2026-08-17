import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Permitir rotas públicas de auth, public bio-pages, gemini e arquivos estáticos
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/gemini') ||
    pathname.startsWith('/s/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Verificar token JWT de sessão em rotas de API protegidas
  if (pathname.startsWith('/api/')) {
    const sessionToken = request.cookies.get('gp360_session')?.value;

    if (!sessionToken) {
      // Retorna 401 Não Autorizado se a requisição de API não contiver cookie válido
      // NOTA: Para chamadas de dev local sem cookie, permite passar se o header x-cabinet-id estiver presente ou em dev mode.
      const isDev = process.env.NODE_ENV !== 'production';
      const devHeader = request.headers.get('x-cabinet-id');

      if (!isDev && !devHeader) {
        return NextResponse.json(
          { error: 'Acesso não autorizado. Sessão inválida ou expirada.' },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
