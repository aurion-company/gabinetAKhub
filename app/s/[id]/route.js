import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  let targetUrl = "https://eleger.app.br";

  // Se houver uma URL passada não query param ou cadastrada não sistema
  const urlParam = request.nextUrl.searchParams.get("url");
  if (urlParam) {
    targetUrl = urlParam;
  }

  // Corrigir URL sem protocolo
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://") && !targetUrl.startsWith("mailto:") && !targetUrl.startsWith("tel:")) {
    targetUrl = "https://" + targetUrl;
  }

  // Redirecionamento 302 Dinâmico
  return NextResponse.redirect(targetUrl, 302);
}
