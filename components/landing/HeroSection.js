'use client';
import { Sparkles, MapPin, Zap, MessageSquare } from 'lucide-react';

export default function HeroSection({ onCTA }) {
  const differentials = [
    { icon: Sparkles, label: 'IA Gemini Integrada', desc: 'Geração de documentos e análise de dados em tempo real' },
    { icon: MapPin, label: 'Geomapeamento Eleitoral', desc: 'Visualize eleitores no mapa interativo por bairro e região' },
    { icon: Zap, label: 'Automação com n8n', desc: 'Fluxos visuais sem código conectados a centenas de APIs' },
    { icon: MessageSquare, label: 'WhatsApp API Oficial', desc: 'Envios em massa com zero risco de bloqueio de conta' },
  ];

  const badges = ['Gestão de Gabinete','Campanhas Eleitorais','WhatsApp Oficial','Arrecadação PIX','IA Integrada','Mandatos Políticos'];

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 5% 6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, color: '#60a5fa', marginBottom: '2rem' }}>
        <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
        Plataforma atualizada · 2026 · IA Gemini Integrada
      </div>

      <h1 style={{ fontSize: 'clamp(2.5rem,5vw,5rem)', fontWeight: 900, lineHeight: 1.05, maxWidth: 900, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
        Gestão Política Inteligente com{' '}
        <span style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>novo módulo de Campanhas</span>{' '}
        e Mandatos Políticos
      </h1>

      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: 620, lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Unifique seu gabinete, eleitores, WhatsApp Oficial, arrecadação e legislativo em um único ecossistema — com Inteligência Artificial e automação visual integradas.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onCTA} style={{ padding: '0.9rem 2rem', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}>
          Começar Gratuitamente
        </button>
        <button style={{ padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
          Agendar Demonstração
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5rem' }}>
        {badges.map(b => (
          <span key={b} style={{ padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, fontSize: '0.8rem', color: '#94a3b8' }}>{b}</span>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 1000, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', backdropFilter: 'blur(10px)', boxShadow: '0 0 80px rgba(59,130,246,0.1)', marginBottom: '5rem' }}>
        <img src="/hero-illustration.png" alt="Dashboard Elegiv Gestão 360" style={{ width: '100%', borderRadius: 12, opacity: 0.9 }} />
      </div>

      {/* Diferenciais reais em estilo Ícones Único Monocromático (Ref. Dashboard) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: 960 }}>
        {differentials.map((d, idx) => {
          const IconComp = d.icon;
          return (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem', textAlign: 'left', backdropFilter: 'blur(10px)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <IconComp size={22} color="#38bdf8" />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#e2e8f0', marginBottom: '0.4rem' }}>{d.label}</div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
