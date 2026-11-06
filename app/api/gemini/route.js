import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { prompt, task } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Chave Gemini AI não configurada não servidor' }, { status: 500 });
    }

    // Chamada segura realizada de servidor para servidor
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Você é o Assistente Político do GestãoPolítica360. Tarefa: ${task || 'Resumo'}. Prompt: ${prompt}` }] }]
      })
    });

    const data = await res.json();
    const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Processamento concluído.';

    return NextResponse.json({ success: true, response: resultText });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar chamada de IA' }, { status: 500 });
  }
}
