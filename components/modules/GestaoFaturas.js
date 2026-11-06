import React, { useState } from 'react';
import { 
  CreditCard, Download, QrCode, CheckCircle2, Clock, AlertTriangle, FileText, 
  ExternalLink, Zap, ShieldCheck, Copy, ArrowUpRight, Plus, Minus, Sliders, 
  Sparkles, Check, X, Printer, RefreshCw, CheckCircle, Info, HelpCircle
} from 'lucide-react';

// DADOS OFICIAIS DOS PLANOS CADASTRADOS NO SITE (PlansSection.js & Asaas API)
export const SITE_PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    desc: 'Gabinete Inicial & Produtividade',
    color: '#64748b',
    prices: { mensal: 149.90, trimestral: 129.90, anual: 99.90 },
    votersLimit: 'Até 5.000 eleitores',
    disparosLimit: '5.000 envios/mês',
    features: [
      'Até 5.000 eleitores/leads',
      'Agenda & Protocolo',
      'Gestão de Documentos',
      'Disparo de E-mails (Resend)',
      'Kanban de Demandas',
      'Suporte Básico'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    desc: 'Gabinete Profissional & CRM',
    color: '#3b82f6',
    prices: { mensal: 299.90, trimestral: 249.90, anual: 199.90 },
    votersLimit: 'Até 25.000 eleitores',
    disparosLimit: '15.000 envios/mês',
    features: [
      'Até 25.000 eleitores/leads',
      'Tudo do Basic',
      'Geomapeamento Avançado',
      'Inteligência Artificial Gemini',
      'Integração Meta Ads (CAPI)',
      'Central de Relatórios BI'
    ]
  },
  political: {
    id: 'political',
    name: 'Political',
    popular: true,
    desc: 'Gestão Eleitoral Completa',
    color: '#06b6d4',
    prices: { mensal: 499.90, trimestral: 419.90, anual: 349.90 },
    votersLimit: 'Eleitores Ilimitados',
    disparosLimit: '50.000 envios/mês',
    features: [
      'Eleitores Ilimitados',
      'Tudo do Pro',
      'WhatsApp Oficial Eleitoral',
      'Módulo Legislativo Completo',
      'Arrecadação e Doações (PIX)',
      'Gestão de Campanhas'
    ]
  },
  enterprise: {
    id: 'enterprise',
    name: 'MAX Enterprise',
    desc: 'Majoritárias & Multi-Gabinete',
    color: '#8b5cf6',
    prices: { mensal: 999.90, trimestral: 849.90, anual: 749.90 },
    votersLimit: 'Eleitores Ilimitados',
    disparosLimit: 'Disparos Ilimitados',
    features: [
      'Tudo Ilimitado',
      'Painel Master Admin Multitenant',
      'Mapa de Automação n8n',
      'Ligações Automáticas',
      'API Business Avançada',
      'Suporte VIP 24/7'
    ]
  }
};

export default function GestaoFaturas() {
  // Estado do Plano Ativo no Gabinete (Sincronizado com o site)
  const [selectedPlanId, setSelectedPlanId] = useState('political'); // Default: Political (Popular)
  const [activeCycle, setActiveCycle] = useState('anual'); // 'mensal' | 'trimestral' | 'anual'

  const [paymentInfo, setPaymentInfo] = useState({
    status: 'Ativo',
    nextBilling: '10/09/2026',
    paymentMethod: 'credit_card', // 'credit_card' | 'pix'
    cardBrand: 'MASTERCARD',
    cardLast4: '4829',
    cardHolder: 'GabinetAK OFICIAL / GABINETE',
    cardExpiry: '12/2029'
  });

  // Estado dos Itens Adicionais (Add-ons Calculator)
  const [addons, setAddons] = useState({
    votersPack: 1, // Cada pacote +10k eleitores = R$ 50,00/mês
    disparosPack: 2, // Cada pacote +5k disparos WA = R$ 40,00/mês
    iaGeminiPro: true, // +R$ 80,00/mês
    extraStorage100GB: false // +R$ 30,00/mês
  });

  // Estado dinâmico das Faturas Emitidas
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-09', date: '10/09/2026', amount: 559.90, status: 'Pendente', method: 'PIX (Aguardando)', pdfUrl: '#' },
    { id: 'INV-2026-08', date: '10/08/2026', amount: 559.90, status: 'Paga', method: 'Cartão de Crédito', pdfUrl: '#' },
    { id: 'INV-2026-07', date: '10/07/2026', amount: 349.90, status: 'Paga', method: 'PIX', pdfUrl: '#' },
    { id: 'INV-2026-06', date: '10/06/2026', amount: 349.90, status: 'Paga', method: 'Cartão de Crédito', pdfUrl: '#' },
    { id: 'INV-2026-05', date: '10/05/2026', amount: 349.90, status: 'Paga', method: 'Cartão de Crédito', pdfUrl: '#' }
  ]);

  // Filtro de Faturas
  const [filterStatus, setFilterStatus] = useState('todos');

  // Modais de Ação
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [modalCycleToggle, setModalCycleToggle] = useState('anual');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedPixInvoice, setSelectedPixInvoice] = useState(null);
  const [receiptInvoice, setReceiptInvoice] = useState(null);

  // Estados de formulário e feedback
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Dados do formulário de novo cartão
  const [newCardData, setNewCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvc: '',
    cpfCnpj: ''
  });

  // Objeto do Plano Ativo
  const activePlanData = SITE_PLANS[selectedPlanId] || SITE_PLANS.political;
  const basePlanPrice = activePlanData.prices[activeCycle];

  // Cálculo Dinâmico de Adicionais
  const votersPackCost = addons.votersPack * 50;
  const disparosPackCost = addons.disparosPack * 40;
  const iaCost = addons.iaGeminiPro ? 80 : 0;
  const storageCost = addons.extraStorage100GB ? 30 : 0;
  const totalAddonsCost = votersPackCost + disparosPackCost + iaCost + storageCost;
  
  const totalMonthlyFee = parseFloat((basePlanPrice + totalAddonsCost).toFixed(2));

  // Notificação temporária
  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  // Copiar chave PIX
  const handleCopyPix = () => {
    navigator.clipboard?.writeText('00020126580014BR.GOV.BCB.PIX013689234812-1092-4819-GabinetAK-PAY');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  // Simular confirmação de pagamento PIX
  const handleConfirmPixPayment = (invId) => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => inv.id === invId ? { ...inv, status: 'Paga', method: 'PIX (Confirmado)' } : inv));
      setIsProcessingPayment(false);
      setSelectedPixInvoice(null);
      showToast(`Pagamento da fatura ${invId} confirmado com sucesso!`);
    }, 1500);
  };

  // Salvar novo Cartão de Crédito
  const handleSaveCard = (e) => {
    e.preventDefault();
    if (!newCardData.number || !newCardData.holder) {
      alert('Por favor, preencha os dados do cartão.');
      return;
    }
    const last4 = newCardData.number.replace(/\s/g, '').slice(-4) || '9988';
    setPaymentInfo(prev => ({
      ...prev,
      cardBrand: 'MASTERCARD',
      cardLast4: last4,
      cardHolder: newCardData.holder.toUpperCase(),
      cardExpiry: newCardData.expiry || '08/2030',
      paymentMethod: 'credit_card'
    }));
    setIsCardModalOpen(false);
    showToast('Forma de pagamento principal atualizada para Cartão de Crédito!');
  };

  // Sincronizar plano salvo no localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('GabinetAK_user_plan');
      if (saved && SITE_PLANS[saved]) {
        setSelectedPlanId(saved);
      }
    }
  }, []);

  // Efetuar Upgrade/Downgrade de Plano
  const handleSelectUpgradePlan = (planId) => {
    const isDowngrade = (SITE_PLANS[planId]?.prices?.mensal || 0) < (SITE_PLANS[selectedPlanId]?.prices?.mensal || 0);
    setSelectedPlanId(planId);
    setActiveCycle(modalCycleToggle);
    setIsUpgradeModalOpen(false);

    if (typeof window !== 'undefined') {
      localStorage.setItem('GabinetAK_user_plan', planId);
      window.dispatchEvent(new Event('GabinetAK_plan_changed'));
    }

    if (isDowngrade) {
      showToast(`Downgrade realizado para o Plano ${SITE_PLANS[planId].name}. As ferramentas não inclusas neste pacote foram bloqueadas!`);
    } else {
      showToast(`Upgrade realizado para o Plano ${SITE_PLANS[planId].name} (${modalCycleToggle.toUpperCase()})!`);
    }
  };

  // Faturas filtradas
  const filteredInvoices = invoices.filter(inv => {
    if (filterStatus === 'pagas') return inv.status === 'Paga';
    if (filterStatus === 'pendentes') return inv.status === 'Pendente';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* TOAST DE SUCESSO */}
      {successToast && (
        <div style={{
          position: 'fixed', top: '80px', right: '20px', zIndex: 10000,
          background: 'rgba(34, 197, 94, 0.95)', color: '#fff', padding: '0.8rem 1.2rem',
          borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '600',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <CheckCircle2 size={20} />
          {successToast}
        </div>
      )}

      {/* CABEÇALHO DA PÁGINA */}
      <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#fff', margin: 0 }}>
            <FileText color="var(--accent)" size={28} /> Gestão de Faturas & Assinatura do Gabinete
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem', margin: 0 }}>
            Valores e recursos integrados diretamente à tabela de planos oficial do site.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button 
            className="btn-primary" 
            onClick={() => { setModalCycleToggle(activeCycle); setIsUpgradeModalOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.4rem', background: activePlanData.color, color: '#ffffff', border: 'none', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', boxShadow: `0 4px 15px ${activePlanData.color}44` }}
          >
            <Zap size={16} color="#ffffff" /> Upgrade de Plano
          </button>
        </div>
      </div>

      {/* PAINEL SUPERIOR: ASSINATURA ATUAL + FORMA DE PAGAMENTO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* CARD ASSINATURA ATUAL */}
        <div className="section-card liquid-glass" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: activePlanData.color + '22', borderRadius: '50%', filter: 'blur(20px)' }}></div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: activePlanData.color, fontWeight: 'bold' }}>
                  Assinatura Ativa (Site Oficial)
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', marginTop: '0.2rem', margin: 0 }}>
                  Plano {activePlanData.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activePlanData.desc}</span>
              </div>
              <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)', border: '1px solid var(--success)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle size={12} /> {paymentInfo.status}
              </span>
            </div>

            {/* PREÇO COMPATÍVEL COM O SITE */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '1rem 0' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fff' }}>
                R$ {totalMonthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                /{activeCycle} (Plano R$ {basePlanPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} + Extras R$ {totalAddonsCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Ciclo Contratado:</span>
                <strong style={{ color: activePlanData.color, textTransform: 'uppercase', fontWeight: 'bold' }}>
                  {activeCycle} {activeCycle === 'anual' ? '(Economia ~30%)' : activeCycle === 'trimestral' ? '(Economia ~15%)' : ''}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Próxima Renovação:</span>
                <strong style={{ color: '#fff' }}>{paymentInfo.nextBilling}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Capacidade de Eleitores:</span>
                <strong style={{ color: '#fff' }}>{activePlanData.votersLimit}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Cota Disparos WhatsApp:</span>
                <strong style={{ color: '#fff' }}>{activePlanData.disparosLimit}</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem' }}>
            <button 
              onClick={() => { setModalCycleToggle(activeCycle); setIsUpgradeModalOpen(true); }}
              style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: activePlanData.color, color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              <Zap size={14} color="#ffffff" /> Mudar Plano / Upgrade
            </button>
            <button 
              onClick={() => {
                const cycles = ['mensal', 'trimestral', 'anual'];
                const nextIdx = (cycles.indexOf(activeCycle) + 1) % cycles.length;
                const nextCycle = cycles[nextIdx];
                setActiveCycle(nextCycle);
                showToast(`Ciclo alterado para ${nextCycle.toUpperCase()}!`);
              }}
              style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: `1px solid ${activePlanData.color}`, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              <RefreshCw size={14} color="#ffffff" /> Ciclo: {activeCycle.toUpperCase()}
            </button>
          </div>
        </div>

        {/* CARD FORMA DE PAGAMENTO PRINCIPAL */}
        <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <CreditCard size={20} color="var(--accent)" /> Forma de Pagamento Principal
              </h3>
              <span style={{ fontSize: '0.75rem', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                {paymentInfo.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'PIX Recorrente'}
              </span>
            </div>

            {/* CARTÃO VISUAL EXCLUSIVO */}
            {paymentInfo.paymentMethod === 'credit_card' ? (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))', 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '16px', 
                padding: '1.2rem', 
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(0, 240, 255, 0.15)', borderRadius: '50%', filter: 'blur(15px)' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: '900', letterSpacing: '2px', color: '#fff', fontSize: '1rem', fontStyle: 'italic' }}>
                    {paymentInfo.cardBrand}
                  </div>
                  <ShieldCheck size={20} color="var(--success)" />
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '3px', color: '#fff', marginBottom: '1rem' }}>
                  •••• •••• •••• {paymentInfo.cardLast4}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase' }}>Titular</span>
                    <strong style={{ color: '#fff' }}>{paymentInfo.cardHolder}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase' }}>Validade</span>
                    <strong style={{ color: '#fff' }}>{paymentInfo.cardExpiry}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.05)', 
                border: '1px solid rgba(34, 197, 94, 0.3)', 
                borderRadius: '16px', 
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <QrCode size={40} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', margin: '0 0 0.3rem 0' }}>Pagamento Preferencial via PIX</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Chave copia e cola gerada automaticamente a cada ciclo.
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
            <button 
              onClick={() => setIsCardModalOpen(true)}
              style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem', background: activePlanData.color, color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Alterar Cartão
            </button>
            <button 
              onClick={() => {
                const newMethod = paymentInfo.paymentMethod === 'credit_card' ? 'pix' : 'credit_card';
                setPaymentInfo(prev => ({ ...prev, paymentMethod: newMethod }));
                showToast(`Forma preferencial alterada para ${newMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'}`);
              }}
              style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: `1px solid ${activePlanData.color}`, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              <QrCode size={14} color="#ffffff" /> Usar {paymentInfo.paymentMethod === 'credit_card' ? 'PIX' : 'Cartão'}
            </button>
          </div>
        </div>

      </div>

      {/* CÁLCULO DE ITENS ADICIONAIS (ADD-ONS CALCULATOR) */}
      <div className="section-card liquid-glass" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
              <Sliders size={22} color="var(--accent)" /> Cálculo de Itens Adicionais e Recursos extras
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem', margin: 0 }}>
              Personalize a capacidade do seu gabinete adicionando pacotes de eleitores, disparos no WhatsApp ou módulos de IA.
            </p>
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold', background: 'rgba(0, 240, 255, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            Adicionais: +R$ {totalAddonsCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '1.5rem' }}>
          
          {/* PACOTE DE ELEITORES */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>Pacote Eleitores Extras</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>R$ 50,00 / +10k</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Expanda seu banco de dados de eleitores cadastrados.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
              <button 
                onClick={() => setAddons(prev => ({ ...prev, votersPack: Math.max(0, prev.votersPack - 1) }))}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.2rem' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>
                +{addons.votersPack * 10}.000 Eleitores (+R$ {votersPackCost})
              </span>
              <button 
                onClick={() => setAddons(prev => ({ ...prev, votersPack: prev.votersPack + 1 }))}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.2rem' }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* PACOTE DE DISPAROS WHATSAPP */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>Disparos WhatsApp Extras</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>R$ 40,00 / +5k</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Aumente a cota de disparos de mensagens para campanhas.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
              <button 
                onClick={() => setAddons(prev => ({ ...prev, disparosPack: Math.max(0, prev.disparosPack - 1) }))}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.2rem' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>
                +{addons.disparosPack * 5}.000 Mensagens (+R$ {disparosPackCost})
              </span>
              <button 
                onClick={() => setAddons(prev => ({ ...prev, disparosPack: prev.disparosPack + 1 }))}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.2rem' }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* AGENTE IA GEMINI PRO */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} color="var(--accent)" /> IA Gemini Vision Pro
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>+R$ 80,00</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Transcrição de áudios WhatsApp e análise preditiva.
            </p>
            <button 
              onClick={() => setAddons(prev => ({ ...prev, iaGeminiPro: !prev.iaGeminiPro }))}
              style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: addons.iaGeminiPro ? activePlanData.color : 'rgba(255,255,255,0.08)', color: '#ffffff', border: addons.iaGeminiPro ? 'none' : `1px solid ${activePlanData.color}`, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {addons.iaGeminiPro ? <Check size={14} color="#ffffff" /> : <Plus size={14} color="#ffffff" />}
              {addons.iaGeminiPro ? 'Ativado no Gabinete' : 'Ativar Adicional'}
            </button>
          </div>

          {/* ARMAZENAMENTO DE 100GB */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>Nuvem 100GB Extras</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>+R$ 30,00</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Espaço em nuvem para vídeos e ofícios anexados.
            </p>
            <button 
              onClick={() => setAddons(prev => ({ ...prev, extraStorage100GB: !prev.extraStorage100GB }))}
              style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: addons.extraStorage100GB ? activePlanData.color : 'rgba(255,255,255,0.08)', color: '#ffffff', border: addons.extraStorage100GB ? 'none' : `1px solid ${activePlanData.color}`, borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {addons.extraStorage100GB ? <Check size={14} color="#ffffff" /> : <Plus size={14} color="#ffffff" />}
              {addons.extraStorage100GB ? 'Ativado no Gabinete' : 'Ativar Adicional'}
            </button>
          </div>

        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Valor total recorrente ajustado ({activeCycle.toUpperCase()}):</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>
              R$ {totalMonthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/mês</span>
            </div>
          </div>
          <button 
            onClick={() => showToast('Configuração de itens adicionais atualizada com sucesso!')}
            style={{ padding: '0.75rem 1.6rem', fontWeight: 'bold', background: activePlanData.color, color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', boxShadow: `0 4px 15px ${activePlanData.color}44` }}
          >
            Salvar Recorrência dos Adicionais
          </button>
        </div>
      </div>

      {/* HISTÓRICO DE FATURAS & RECIBOS */}
      <div className="section-card liquid-glass" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', margin: 0 }}>Histórico de Faturas & Recibos</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem', margin: 0 }}>
              Consulte faturas emitidas, emita 2ª via do PIX ou baixe recibos em PDF.
            </p>
          </div>

          {/* FILTROS DE STATUS */}
          <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button 
              onClick={() => setFilterStatus('todos')}
              style={{
                background: filterStatus === 'todos' ? activePlanData.color : 'transparent',
                color: '#ffffff',
                border: 'none', padding: '0.45rem 0.95rem', borderRadius: '6px', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '0.78rem', transition: 'all 0.2s'
              }}
            >
              Todas ({invoices.length})
            </button>
            <button 
              onClick={() => setFilterStatus('pagas')}
              style={{
                background: filterStatus === 'pagas' ? activePlanData.color : 'transparent',
                color: '#ffffff',
                border: 'none', padding: '0.45rem 0.95rem', borderRadius: '6px', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '0.78rem', transition: 'all 0.2s'
              }}
            >
              Pagas ({invoices.filter(i => i.status === 'Paga').length})
            </button>
            <button 
              onClick={() => setFilterStatus('pendentes')}
              style={{
                background: filterStatus === 'pendentes' ? activePlanData.color : 'transparent',
                color: '#ffffff',
                border: 'none', padding: '0.45rem 0.95rem', borderRadius: '6px', cursor: 'pointer',
                fontWeight: 'bold', fontSize: '0.78rem', transition: 'all 0.2s'
              }}
            >
              Pendentes ({invoices.filter(i => i.status === 'Pendente').length})
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.8rem' }}>Código Fatura</th>
                <th style={{ padding: '0.8rem' }}>Vencimento</th>
                <th style={{ padding: '0.8rem' }}>Valor Total</th>
                <th style={{ padding: '0.8rem' }}>Método de Pagamento</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
                <th style={{ padding: '0.8rem', textAlign: 'right' }}>Ações & Comprovantes</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem 0.8rem', fontWeight: 'bold', color: '#fff' }}>{inv.id}</td>
                  <td style={{ padding: '1rem 0.8rem', color: 'var(--text-secondary)' }}>{inv.date}</td>
                  <td style={{ padding: '1rem 0.8rem', fontWeight: 'bold', color: '#fff' }}>
                    R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '1rem 0.8rem', color: 'var(--text-secondary)' }}>{inv.method}</td>
                  <td style={{ padding: '1rem 0.8rem' }}>
                    {inv.status === 'Paga' ? (
                      <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', border: '1px solid var(--success)', padding: '0.25rem 0.7rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={12} /> Paga
                      </span>
                    ) : (
                      <span style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--warning)', border: '1px solid var(--warning)', padding: '0.25rem 0.7rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={12} /> Pendente
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 0.8rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      {inv.status === 'Pendente' && (
                        <button 
                          onClick={() => setSelectedPixInvoice(inv)} 
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#22c55e', border: 'none', color: '#ffffff', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <QrCode size={14} color="#ffffff" /> Pagar PIX
                        </button>
                      )}
                      <button 
                        onClick={() => setReceiptInvoice(inv)} 
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', background: activePlanData.color, border: 'none', color: '#ffffff', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <FileText size={14} color="#ffffff" /> Recibo / Detalhes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhuma fatura encontrada para o filtro selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE UPGRADE DE PLANO (COMPATÍVEL 100% COM O SITE) */}
      {isUpgradeModalOpen && (
        <div style={modalOverlayStyle}>
          <div className="section-card liquid-glass" style={{ maxWidth: '1000px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Zap color="var(--accent)" size={24} /> Tabela Oficial de Planos do Site
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem', margin: 0 }}>
                  Escolha o plano e ciclo ideal para o momento do seu gabinete ou campanha política.
                </p>
              </div>
              <button onClick={() => setIsUpgradeModalOpen(false)} style={closeBtnStyle}><X size={20} /></button>
            </div>

            {/* SELETOR DE CICLO DE COBRANÇA (MENSAL, TRIMESTRAL, ANUAL) */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
              <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.4)', borderRadius: 12, padding: '0.4rem', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  { key: 'mensal', label: 'Mensal' },
                  { key: 'trimestral', label: 'Trimestral (-15%)' },
                  { key: 'anual', label: 'Anual (-30%)' }
                ].map(c => (
                  <button 
                    key={c.key} 
                    onClick={() => setModalCycleToggle(c.key)} 
                    style={{ 
                      padding: '0.6rem 1.4rem', borderRadius: 8, border: 'none', 
                      background: modalCycleToggle === c.key ? activePlanData.color : 'transparent', 
                      color: modalCycleToggle === c.key ? '#ffffff' : '#94a3b8', 
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s',
                      boxShadow: modalCycleToggle === c.key ? `0 4px 15px ${activePlanData.color}44` : 'none' 
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
              
              {Object.values(SITE_PLANS).map(p => {
                const isCurrent = p.id === selectedPlanId && modalCycleToggle === activeCycle;
                const price = p.prices[modalCycleToggle];

                return (
                  <div 
                    key={p.id} 
                    style={{ 
                      background: p.popular ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.02)', 
                      border: `1.5px solid ${isCurrent ? 'var(--success)' : p.popular ? p.color : 'rgba(255,255,255,0.08)'}`, 
                      borderRadius: '16px', 
                      padding: '1.5rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justify: 'space-between',
                      position: 'relative'
                    }}
                  >
                    {p.popular && (
                      <span style={{ 
                        position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', 
                        background: p.color, color: '#ffffff', 
                        fontSize: '0.65rem', fontWeight: '900', padding: '0.2rem 0.8rem', 
                        borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' 
                      }}>
                        Mais Popular
                      </span>
                    )}

                    <div>
                      <div style={{ fontSize: '1rem', color: p.color, fontWeight: 900, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', minHeight: '32px' }}>
                        {p.desc}
                      </div>

                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '1rem 0 0.5rem 0' }}>
                        R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>/mês</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                        {p.features.map(f => (
                          <div key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: '#cbd5e1', alignItems: 'flex-start' }}>
                            <Check size={14} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleSelectUpgradePlan(p.id)}
                      style={{ 
                        width: '100%', padding: '0.75rem', marginTop: '1.5rem', fontSize: '0.85rem', fontWeight: 'bold',
                        background: isCurrent ? 'transparent' : p.color,
                        color: '#ffffff',
                        border: isCurrent ? `1px solid ${p.color}` : 'none',
                        borderRadius: '8px', cursor: 'pointer'
                      }}
                    >
                      {isCurrent ? 'Plano Atual Ativo' : 'Selecionar Plano'}
                    </button>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      )}

      {/* MODAL ALTERAR CARTÃO DE CRÉDITO */}
      {isCardModalOpen && (
        <div style={modalOverlayStyle}>
          <div className="section-card liquid-glass" style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <CreditCard size={20} color="var(--accent)" /> Alterar Cartão de Crédito
              </h3>
              <button onClick={() => setIsCardModalOpen(false)} style={closeBtnStyle}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Número do Cartão</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  value={newCardData.number}
                  onChange={e => setNewCardData({ ...newCardData, number: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Nome impresso no Cartão</label>
                <input 
                  type="text" 
                  placeholder="EX: MARIA S SILVA" 
                  value={newCardData.holder}
                  onChange={e => setNewCardData({ ...newCardData, holder: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Validade (MM/AA)</label>
                  <input 
                    type="text" 
                    placeholder="12/2030" 
                    value={newCardData.expiry}
                    onChange={e => setNewCardData({ ...newCardData, expiry: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>CVC / CVV</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    value={newCardData.cvc}
                    onChange={e => setNewCardData({ ...newCardData, cvc: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>CPF ou CNPJ do Titular</label>
                <input 
                  type="text" 
                  placeholder="000.000.000-00" 
                  value={newCardData.cpfCnpj}
                  onChange={e => setNewCardData({ ...newCardData, cpfCnpj: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsCardModalOpen(false)} style={{ flex: 1, padding: '0.7rem', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: '0.7rem', fontWeight: 'bold', background: activePlanData.color, color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Salvar Cartão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2ª VIA E PAGAMENTO PIX */}
      {selectedPixInvoice && (
        <div style={modalOverlayStyle}>
          <div className="section-card liquid-glass" style={{ maxWidth: '440px', width: '100%', padding: '2rem', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setSelectedPixInvoice(null)} style={{ ...closeBtnStyle, position: 'absolute', top: '15px', right: '15px' }}><X size={20} /></button>

            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: activePlanData.color, fontWeight: 'bold', letterSpacing: '1px' }}>
              Cobrança GabinetAK Pay
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', margin: '0.3rem 0' }}>
              Pagamento Instantâneo PIX
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Fatura <strong>{selectedPixInvoice.id}</strong> • Valor: <strong style={{ color: '#fff' }}>R$ {selectedPixInvoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </p>

            <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '16px', display: 'inline-block', marginBottom: '1.2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
              <QrCode size={180} color="#000" />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Abra o app do seu banco e leia o QR Code ou copie a chave abaixo:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                readOnly 
                value="00020126580014BR.GOV.BCB.PIX013689234812-1092-4819-GabinetAK-PAY" 
                style={{ ...inputStyle, fontSize: '0.75rem' }} 
              />
              <button 
                onClick={handleCopyPix} 
                style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', background: activePlanData.color, color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                <Copy size={14} color="#ffffff" /> {copiedPix ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <button 
              onClick={() => handleConfirmPixPayment(selectedPixInvoice.id)}
              disabled={isProcessingPayment}
              style={{ width: '100%', padding: '0.8rem', background: '#22c55e', border: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
            >
              {isProcessingPayment ? <RefreshCw size={18} className="spin" color="#ffffff" /> : <CheckCircle size={18} color="#ffffff" />}
              {isProcessingPayment ? 'Validando no Banco Central...' : 'Simular Confirmação de Pagamento'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL DETALHES DA FATURA / RECIBO PDF */}
      {receiptInvoice && (
        <div style={modalOverlayStyle}>
          <div className="section-card liquid-glass" style={{ maxWidth: '600px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                <FileText size={22} color={activePlanData.color} /> Recibo de Pagamento #{receiptInvoice.id}
              </h3>
              <button onClick={() => setReceiptInvoice(null)} style={closeBtnStyle}><X size={20} /></button>
            </div>

            {/* DETALHAMENTO ESTILIZADO DE RECIBO FISCAL */}
            <div style={{ background: '#fff', color: '#0f172a', padding: '1.8rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>GabinetAK HUB SAAS</strong>
                  <div>CNPJ: 42.891.023/0001-90</div>
                  <div>Suporte: financeiro@GabinetAK.com.br</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>RECIBO DE QUITAÇÃO</strong>
                  <div>Data: {receiptInvoice.date}</div>
                  <div>Status: {receiptInvoice.status.toUpperCase()}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div><strong>Cliente:</strong> Gabinete Oficial GabinetAK</div>
                <div><strong>Plano:</strong> {activePlanData.name} ({activeCycle.toUpperCase()})</div>
                <div><strong>Forma de Pagamento:</strong> {receiptInvoice.method}</div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                    <th style={{ padding: '0.4rem 0' }}>Descrição do Serviço</th>
                    <th style={{ padding: '0.4rem 0', textAlign: 'right' }}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '0.4rem 0' }}>Assinatura Licença GabinetAK 360 - Plano {activePlanData.name}</td>
                    <td style={{ padding: '0.4rem 0', textAlign: 'right' }}>R$ {basePlanPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  {totalAddonsCost > 0 && (
                    <tr>
                      <td style={{ padding: '0.4rem 0' }}>Pacote Adicional de Recursos e Eleitores</td>
                      <td style={{ padding: '0.4rem 0', textAlign: 'right' }}>R$ {totalAddonsCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  )}
                  <tr style={{ borderTop: '2px solid #0f172a', fontWeight: 'bold' }}>
                    <td style={{ padding: '0.6rem 0' }}>TOTAL PAGO:</td>
                    <td style={{ padding: '0.6rem 0', textAlign: 'right', fontSize: '1rem' }}>
                      R$ {receiptInvoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '0.8rem' }}>
                Autenticação Digital: SHA256-{receiptInvoice.id}-892347918237912837
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => window.print()}
                style={{ flex: 1, padding: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold', background: activePlanData.color, color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                <Printer size={16} color="#ffffff" /> Imprimir / Salvar PDF
              </button>
              <button 
                onClick={() => setReceiptInvoice(null)}
                style={{ flex: 1, padding: '0.7rem', background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Estilos de Auxílio dos Modais
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.82)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10000,
  padding: '1rem'
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  padding: '0.3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  color: 'var(--text-secondary)',
  marginBottom: '0.4rem',
  fontWeight: '600'
};

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.9rem',
  background: 'rgba(0,0,0,0.4)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box'
};
