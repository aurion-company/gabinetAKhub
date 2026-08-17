'use client';
import React, { useState } from 'react';
import { Check, Minus } from 'lucide-react';

const plans = [
  { name: 'Basic', price: { mensal: 'R$ 149,90', trimestral: 'R$ 129,90', anual: 'R$ 99,90' }, desc: 'Gabinete Inicial & Produtividade', color: '#64748b',
    features: ['Até 5.000 eleitores/leads','Agenda & Protocolo','Gestão de Documentos','Disparo de E-mails (Resend)','Kanban de Demandas','Suporte Básico'] },
  { name: 'Pro', price: { mensal: 'R$ 299,90', trimestral: 'R$ 249,90', anual: 'R$ 199,90' }, desc: 'Gabinete Profissional & CRM', color: '#3b82f6',
    features: ['Até 25.000 eleitores/leads','Tudo do Basic','Geomapeamento Avançado','Inteligência Artificial Gemini','Integração Meta Ads (CAPI)','Central de Relatórios BI'] },
  { name: 'Political', popular: true, price: { mensal: 'R$ 499,90', trimestral: 'R$ 419,90', anual: 'R$ 349,90' }, desc: 'Gestão Eleitoral Completa', color: '#06b6d4',
    features: ['Eleitores Ilimitados','Tudo do Pro','WhatsApp Oficial Eleitoral','Módulo Legislativo Completo','Arrecadação e Doações (PIX)','Gestão de Campanhas'] },
  { name: 'MAX Enterprise', price: { mensal: 'R$ 999,90', trimestral: 'R$ 849,90', anual: 'R$ 749,90' }, desc: 'Majoritárias & Multi-Gabinete', color: '#8b5cf6',
    features: ['Tudo Ilimitado','Painel Master Admin Multitenant','Mapa de Automação n8n','Ligações Automáticas','API Business Avançada','Suporte VIP 24/7'] },
];

const featureComparisons = [
  { category: 'Gestão de Eleitores e CRM', features: [
    { name: 'Limite de Eleitores', basic: 'Até 5.000', pro: 'Até 25.000', political: 'Ilimitado', max: 'Ilimitado' },
    { name: 'Importação e Exportação de Contatos', basic: true, pro: true, political: true, max: true },
    { name: 'Geomapeamento Avançado', basic: false, pro: true, political: true, max: true },
    { name: 'Rede de Indicações e Lideranças', basic: false, pro: true, political: true, max: true },
    { name: 'Ranking de Lideranças e Grupos', basic: false, pro: true, political: true, max: true },
  ]},
  { category: 'Atendimento & Demandas', features: [
    { name: 'Kanban Dinâmico de Demandas', basic: true, pro: true, political: true, max: true },
    { name: 'Emissão de Ofícios em PDF', basic: true, pro: true, political: true, max: true },
    { name: 'Gerador Dinâmico de Documentos', basic: false, pro: true, political: true, max: true },
    { name: 'Gestão de Múltiplos Gabinetes', basic: false, pro: false, political: false, max: true },
  ]},
  { category: 'Comunicação e Disparos', features: [
    { name: 'E-mail Marketing Integrado', basic: true, pro: true, political: true, max: true },
    { name: 'Conexão WhatsApp (QR Code)', basic: true, pro: true, political: true, max: true },
    { name: 'API WhatsApp Business Oficial', basic: false, pro: false, political: true, max: true },
    { name: 'Disparos em Massa e Funis', basic: false, pro: false, political: true, max: true },
  ]},
  { category: 'Automação & IA', features: [
    { name: 'Integração Google Gemini', basic: false, pro: true, political: true, max: true },
    { name: 'Redação de Discursos por IA', basic: false, pro: true, political: true, max: true },
    { name: 'Integração Meta CAPI / Ads', basic: false, pro: true, political: true, max: true },
    { name: 'Automação Visual (n8n Integrado)', basic: false, pro: false, political: false, max: true },
  ]},
  { category: 'Marketing Político & Arrecadação', features: [
    { name: 'Construtor de Páginas / Bio', basic: false, pro: true, political: true, max: true },
    { name: 'Gestor de Campanhas e Eventos', basic: false, pro: false, political: true, max: true },
    { name: 'Arrecadação Digital (Integração PIX/Asaas)', basic: false, pro: false, political: true, max: true },
    { name: 'Painel Master Multitenant (Agências)', basic: false, pro: false, political: false, max: true },
  ]}
];

export default function PlansSection({ onCTA }) {
  const [cycle, setCycle] = useState('mensal');

  const cycleLabels = {
    mensal: 'Mensal',
    trimestral: 'Trimestral',
    anual: 'Anual (-20%)'
  };

  return (
    <section id="planos" style={{ padding: '6rem 5%', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-block', padding: '0.3rem 1rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600, marginBottom: '1rem' }}>PLANOS E PREÇOS</div>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem' }}>
          Escolha o plano <span style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ideal</span>
        </h2>
        
        {/* Toggle de Ciclo de Faturamento */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '0.4rem', marginTop: '1.5rem', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          {['mensal','trimestral','anual'].map(c => (
            <button key={c} onClick={() => setCycle(c)} style={{ padding: '0.6rem 1.5rem', borderRadius: 8, border: 'none', background: cycle===c ? 'linear-gradient(135deg,#3b82f6,#06b6d4)' : 'transparent', color: cycle===c ? '#fff' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', boxShadow: cycle===c ? '0 4px 15px rgba(59,130,246,0.3)' : 'none' }}>
              {cycleLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Cards de Preços Principais */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: 1200, margin: '0 auto 5rem' }}>
        {plans.map(p => (
          <div key={p.name} style={{ position: 'relative', background: p.popular ? 'rgba(6,182,212,0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${p.popular ? p.color+'66' : 'rgba(255,255,255,0.07)'}`, borderRadius: 16, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', transition: 'transform 0.3s' }}>
            {p.popular && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.3rem 1rem', borderRadius: 20, letterSpacing: '0.5px' }}>MAIS POPULAR</div>}
            <div>
              <div style={{ fontSize: '1rem', color: p.color, fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.name}</div>
              <div style={{ fontSize: 'clamp(1.6rem, 2vw, 2.2rem)', fontWeight: 900, whiteSpace: 'nowrap', display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>{p.price[cycle]}<span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#64748b' }}>/mês</span></div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.4 }}>{p.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.88rem', color: '#cbd5e1', alignItems: 'flex-start' }}>
                  <Check size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={onCTA} style={{ width: '100%', padding: '0.9rem', background: p.popular ? `linear-gradient(135deg,#3b82f6,#06b6d4)` : 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '1rem', transition: 'all 0.2s' }}>
              Começar Agora
            </button>
          </div>
        ))}
      </div>

      {/* Tabela Comparativa Completa */}
      <div style={{ maxWidth: 1000, margin: '0 auto', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center', color: '#f8fafc' }}>Comparativo Completo de Recursos</h3>
        
        <table style={{ width: '100%', minWidth: 800, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Funcionalidade</th>
              <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#64748b', width: '15%' }}>Basic</th>
              <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#3b82f6', width: '15%' }}>Pro</th>
              <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#06b6d4', width: '15%' }}>Political</th>
              <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#8b5cf6', width: '15%' }}>MAX</th>
            </tr>
          </thead>
          <tbody>
            {featureComparisons.map((cat, idx) => (
              <React.Fragment key={idx}>
                {/* Cabeçalho da Categoria */}
                <tr>
                  <td colSpan="5" style={{ padding: '1.5rem 1rem 0.8rem', fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {cat.category}
                  </td>
                </tr>
                {/* Linhas das Funcionalidades */}
                {cat.features.map((feat, fIdx) => (
                  <tr key={fIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{feat.name}</td>
                    
                    {['basic', 'pro', 'political', 'max'].map(planKey => (
                      <td key={planKey} style={{ textAlign: 'center', padding: '1rem' }}>
                        {typeof feat[planKey] === 'boolean' ? (
                          feat[planKey] ? <Check size={18} color="#22c55e" style={{ margin: '0 auto' }} /> : <Minus size={18} color="#475569" style={{ margin: '0 auto' }} />
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600 }}>{feat[planKey]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
}
