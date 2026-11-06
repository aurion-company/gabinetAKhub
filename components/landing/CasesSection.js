'use client';
import { Zap, Check } from 'lucide-react';

const cases = [
  { name: 'Dep. Federal Jorge Goetten', state: 'Santa Catarina, SC', initials: 'JG', color: '#3b82f6' },
  { name: 'Dep. Federal Gutemberg Reis', state: 'Rio de Janeiro, RJ', initials: 'GR', color: '#06b6d4' },
  { name: 'Dep. Estadual Joana D\'arc Cordeiro', state: 'Amazonas, AM', initials: 'JC', color: '#8b5cf6' },
  { name: 'Dep. Estadual Delegado Eduardo Prado', state: 'Goiânia, GO', initials: 'EP', color: '#ec4899' },
  { name: 'Dep. Distrital Robério Negreiros', state: 'Brasília, DF', initials: 'RN', color: '#f59e0b' },
  { name: 'Dep. Federal Pedro Uczai', state: 'Santa Catarina, SC', initials: 'PU', color: '#22c55e' },
];

export default function CasesSection() {
  return (
    <section id="cases" style={{ padding: '6rem 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-block', padding: '0.3rem 1rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600, marginBottom: '1rem' }}>CASES DE SUCESSO</div>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', fontWeight: 900, letterSpacing: '-1px' }}>
          Líderes que confiam não <span style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GabinetAK</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
        {cases.map(c => (
          <div key={c.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, background: `linear-gradient(135deg,${c.color},${c.color}88)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', flexShrink: 0, color: '#fff' }}>{c.initials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0' }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{c.state}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, fontStyle: 'italic' }}>
              "Transformamos completamente a gestão do nosso mandato com o GabinetAK HUB. Produtividade e conexão com eleitores em outro nível."
            </p>
            <div style={{ display: 'flex', gap: '0.2rem' }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '0.9rem' }}>★</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* n8n Integration banner */}
      <div style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(6,182,212,0.1))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Zap size={14} color="#38bdf8" /> INTEGRAÇÃO N8N
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>Automatize sem escrever código</h3>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Conecte o gabinete ao n8n e monte fluxos visuais que sincronizam dados com WhatsApp, planilhas, CRMs, e-mail e centenas de ferramentas.
          </p>
          {['Cadastros sob demanda: liste, filtre e crie registros', 'Orquestração visual: arraste, conecte e teste', 'Gatilhos inteligentes: por evento, horário ou manual', 'Ecossistema aberto: una o mandato a qualquer API'].map(item => (
            <div key={item} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', alignItems: 'center' }}>
              <Check size={14} color="#22c55e" /> {item}
            </div>
          ))}
        </div>
        <div style={{ flex: '0 0 220px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.8rem' }}>
            <Zap size={24} color="#38bdf8" />
          </div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.3rem', color: '#fff' }}>n8n</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Automação Visual</div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#22c55e', fontWeight: '600' }}>● Integração Nativa</div>
        </div>
      </div>
    </section>
  );
}
