'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Zap, MessageSquare } from 'lucide-react';

export default function HeroSection({ onCTA }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    '/hero-illustration.png',
    'https://via.placeholder.com/1000x600/0f172a/38bdf8?text=Módulo+Campanhas+Eleitorais',
    'https://via.placeholder.com/1000x600/0f172a/10b981?text=CRM+B2G+e+Gabinete'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const differentials = [
    { icon: Sparkles, label: 'IA Gemini Integrada', desc: 'Geração de documentos e análise de dados em tempo real' },
    { icon: MapPin, label: 'Geomapeamento Eleitoral', desc: 'Visualize eleitores não mapa interativo por bairro e região' },
    { icon: Zap, label: 'Automação com n8n', desc: 'Fluxos visuais sem código conectados a centenas de APIs' },
    { icon: MessageSquare, label: 'WhatsApp API Oficial', desc: 'Envios em massa com zero risco de bloqueio de conta' },
  ];

  const badges = ['Gestão Pública', 'Relações Institucionais B2G', 'Campanhas Eleitorais', 'WhatsApp Oficial', 'IA Integrada', 'Mandatos Políticos'];

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 5% 6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, color: '#60a5fa', marginBottom: '2rem' }}>
        <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
        Plataforma atualizada · 2026 · IA Gemini Integrada
      </div>

      <h1 style={{ fontSize: 'clamp(2.5rem,5vw,5rem)', fontWeight: 900, lineHeight: 1.05, maxWidth: 900, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
        Inteligência de Dados para{' '}
        <span style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Governos e Empresas B2G</span>
      </h1>

      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: 720, lineHeight: 1.7, marginBottom: '2.5rem' }}>
        Transforme a administração pública e suas relações institucionais com IA. Otimize o atendimento aos cidadãos e expanda sua atuação com nosso <strong>novo módulo exclusivo para Campanhas e Mandatos Políticos</strong>.
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

      <div style={{ width: '100%', maxWidth: 1000, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', backdropFilter: 'blur(10px)', boxShadow: '0 0 80px rgba(59,130,246,0.1)', marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: 12 }}>
          {carouselImages.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Exemplo de Tela ${idx + 1}`} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: currentSlide === idx ? 1 : 0, 
                transition: 'opacity 0.8s ease-in-out' 
              }} 
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: currentSlide === idx ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Diferenciais reais em estilo Ícones Único Monãocromático (Ref. Dashboard) */}
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
