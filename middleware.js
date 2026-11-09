import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Redirecionamento amigável /login -> /acessar
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/acessar', request.url));
  }

  // Redirecionamento legado /app -> /painel
  if (pathname === '/app') {
    const url = new URL('/painel' + search, request.url);
    return NextResponse.redirect(url);
  }

  // Permitir rotas públicas de páginas e estáticos
  if (
    pathname === '/' ||
    pathname === '/cadastro' ||
    pathname === '/acessar' ||
    pathname.startsWith('/lgpd') ||
    pathname.startsWith('/politica-de-privacidade') ||
    pathname.startsWith('/termos-de-uso') ||
    pathname.startsWith('/uso-apis-google') ||
    pathname.startsWith('/s/') ||
    pathname.startsWith('/logo/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/gemini')
  ) {
    return NextResponse.next();
  }

  // ========================================================
  // PROTEÇÃO RIGOROSA DO PAINEL DO GABINETE (/painel)
  // Somente assessores/parlamentares autenticados podem entrar
  // ========================================================
  if (pathname.startsWith('/painel')) {
    const sessionToken = request.cookies.get('gp360_session')?.value;

    if (!sessionToken) {
      const loginUrl = new URL('/acessar', request.url);
      loginUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Verificar token JWT de sessão em rotas de API protegidas
  if (pathname.startsWith('/api/')) {
    const sessionToken = request.cookies.get('gp360_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Sessão restrita ao Gabinete.' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
