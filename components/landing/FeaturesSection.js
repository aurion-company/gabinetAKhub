'use client';

import { Building2, Users, MessageSquare, ClipboardList, CreditCard, Compass, Sparkles, Zap, BarChart3 } from 'lucide-react';

const features = [
  { icon: Building2, title: 'Gestão de Gabinete', desc: 'Controle total de ofícios, demandas, agenda e atendimentos. Mantenha seu gabinete organizado e eficiente.' },
  { icon: Users, title: 'Base de Eleitores (CRM)', desc: 'Mapeamento completo de eleitores, lideranças e apoiadores. Segmente sua base e comunique-se assertivamente.' },
  { icon: MessageSquare, title: 'WhatsApp Oficial', desc: 'Envie mensagens personalizadas em massa com API Oficial. Zero risco de bloqueio, total conformidade.' },
  { icon: ClipboardList, title: 'Kanban de Demandas', desc: 'Distribua demandas para equipe, acompanhe prazos e status. Garanta que nada fique pendente.' },
  { icon: CreditCard, title: 'Arrecadação Eleitoral', desc: 'Receba doações via PIX, cartão e boleto. Relatórios automáticos e conformidade total com a legislação.' },
  { icon: Compass, title: 'Geomapeamento', desc: 'Visualize eleitores em mapa interativo por bairro e região. Tome decisões estratégicas com dados geográficos.' },
  { icon: Sparkles, title: 'IA com Gemini', desc: 'Geração de ofícios, análise de sentimento de eleitores e sugestões estratégicas com IA integrada.' },
  { icon: Zap, title: 'Automação n8n', desc: 'Conecte o sistema ao n8n e automatize processos sem escrever código. Integre com WhatsApp, planilhas e APIs.' },
  { icon: BarChart3, title: 'Relatórios & BI', desc: 'Dashboards com gráficos interativos, mapas de calor e previsões eleitorais para tomada de decisão.' },
];

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" style={{ padding: '6rem 5%', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-block', padding: '0.3rem 1rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600, marginBottom: '1rem' }}>
          FUNCIONALIDADES
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem' }}>
          Tudo que o seu mandato precisa,{' '}
          <span style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>em um só lugar</span>
        </h2>
        <p style={{ color: '#64748b', maxWidth: 560, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Funcionalidades desenvolvidas especificamente para a realidade política brasileira.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {features.map((f, idx) => {
          const IconComp = f.icon;
          return (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.8rem', transition: 'transform 0.2s, border-color 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(56,189,248,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>
              
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                <IconComp size={24} color="#38bdf8" />
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem', color: '#e2e8f0' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
