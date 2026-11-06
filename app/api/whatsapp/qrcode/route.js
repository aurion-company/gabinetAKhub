import { NextResponse } from 'next/server';

export async function GET(req) {
  // MOCK: Em produção, essa rota vai se comunicar via fetch com o servidor 
  // do Evolution API ou Z-API e retornar o base64 do QR code.

  return NextResponse.json({ 
    success: true, 
    qrCodeStatus: 'ready',
    qrCodeString: 'mock_qr_code_base64_string_here'
  }, { status: 200 });
}
