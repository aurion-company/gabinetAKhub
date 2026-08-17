import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { planId, billingCycle, cabinetId } = body;

    // Simulate mapping plans to prices and names
    const planDetails = {
      basic: { name: 'Basic (Gabinete Inicial)', value: billingCycle === 'anual' ? 99.90 : billingCycle === 'trimestral' ? 129.90 : 149.90 },
      pro: { name: 'Pro (Gabinete Profissional)', value: billingCycle === 'anual' ? 199.90 : billingCycle === 'trimestral' ? 259.90 : 299.90 },
      political: { name: 'Political (Gestão Eleitoral)', value: billingCycle === 'anual' ? 349.90 : billingCycle === 'trimestral' ? 429.90 : 499.90 },
      enterprise: { name: 'MAX Enterprise', value: billingCycle === 'anual' ? 749.90 : billingCycle === 'trimestral' ? 849.90 : 999.90 },
    };

    const selectedPlan = planDetails[planId];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }

    // In a real scenario, you would fetch from Asaas API:
    // 1. Create or GET Asaas Customer (asaasCustomerId)
    // 2. Create Asaas Subscription (asaasSubscriptionId)
    // 3. Save IDs to Prisma Cabinet
    // 4. Get invoiceUrl for redirect

    /*
    const response = await fetch('https://sandbox.asaas.com/api/v3/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': process.env.ASAAS_API_KEY
      },
      body: JSON.stringify({
        customer: asaasCustomerId,
        billingType: 'CREDIT_CARD', // PIX, BOLETO
        value: selectedPlan.value,
        nextDueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        cycle: billingCycle === 'anual' ? 'YEARLY' : billingCycle === 'trimestral' ? 'QUARTERLY' : 'MONTHLY',
        description: `Assinatura ${selectedPlan.name} Elegiv Gestão 360`
      })
    });
    const data = await response.json();
    */

    // MOCK RESPONSE
    console.log(`[Asaas Mock] Criando assinatura para Plano: ${selectedPlan.name} - R$ ${selectedPlan.value} (${billingCycle})`);
    
    return NextResponse.json({
      success: true,
      message: 'Checkout gerado com sucesso',
      checkoutUrl: 'https://sandbox.asaas.com/c/mocked-checkout-url-12345'
    });

  } catch (error) {
    console.error('Asaas Checkout Error:', error);
    return NextResponse.json({ error: 'Erro ao gerar checkout' }, { status: 500 });
  }
}
