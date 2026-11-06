import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

const GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.8-flash'
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, task, isPublic = true } = body;

    // Se a chamada não for pública, valida sessão de usuário administrativo
    if (!isPublic) {
      const session = getSession();
      if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Chave Gemini AI não configurada no ambiente (GEMINI_API_KEY)' }, { status: 500 });
    }

    const systemPrompt = `Você é o Assistente Oficial de Inteligência Parlamentar e Políticas Públicas do GabinetAK HUB.
Sua missão é atender cidadãos e a equipe do mandato com transparência, precisão, postura ética, técnica e apartidária.
Contexto: Mandato parlamentar com foco em Cidades (Ceilândia, Taguatinga, Samambaia, Plano Piloto, Guará e todo o DF), Saúde, Infraestrutura, Educação e Transparência de Recursos Públicos.
Diretrizes:
- Responda em tom profissional, acolhedor, transparente e direto.
- Se for dúvida sobre emendas, obras ou fiscalização, explique as etapas do mandato (ofício, destinação de emenda, acompanhamento e entrega).
- Mantenha respostas concisas, bem formatadas (tópicos quando útil) e sem rodeios.
- Tarefa específica: ${task || 'Consulta e Análise Cidadã'}.`;

    const fullPrompt = `${systemPrompt}\n\nPergunta/Solicitação: ${prompt}`;

    let lastError = null;
    let resultText = null;

    // Tentativa com os modelos suportados pela chave AKHUB
    for (const model of GEMINI_MODELS) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: fullPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024
            }
          })
        });

        const data = await res.json();

        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          resultText = data.candidates[0].content.parts[0].text;
          break;
        } else {
          lastError = data?.error?.message || `Erro no modelo ${model} (HTTP ${res.status})`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (!resultText) {
      return NextResponse.json({
        success: false,
        error: lastError || 'Não foi possível gerar a resposta no momento.'
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      text: resultText,
      response: resultText
    });
  } catch (error) {
    console.error('Erro na rota /api/gemini:', error);
    return NextResponse.json({ error: 'Erro interno ao processar inteligência artificial' }, { status: 500 });
  }
}
