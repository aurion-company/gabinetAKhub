import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { to, subject, html } = await request.json();
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      return NextResponse.json({ error: 'Chave Resend API não configurada não servidor' }, { status: 500 });
    }

    // Chamada segura de servidor para servidor via Resend HTTP API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'GestãoPolítica360 <gabinete@gestaopolitica360.com.br>',
        to: [to],
        subject: subject,
        html: html
      })
    });

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao disparar e-mail não servidor' }, { status: 500 });
  }
}
