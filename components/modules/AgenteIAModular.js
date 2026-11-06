import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, FileText, Zap, BarChart2, CheckCircle } from 'lucide-react';

export default function AgenteIAModular({ isOpen, onClose, contexto = 'Geral' }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Olá! Sou o seu Agente de IA especialista em **${contexto}**. Como posso ajudar na automação ou geração de relatórios agora?`
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Com base não contexto de **${contexto}**, analisei sua solicitação ("${input}"). As ações sugeridas e o relatório foram processados com sucesso!`
      };
      setMessages(prev => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)',
      display: 'flex', justifyContent: 'flex-end'
    }}>
      <div className="fade-in liquid-glass" style={{
        width: '450px', height: '100%',
        background: 'rgba(10, 15, 30, 0.95)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.8)'
      }}>
        
        {/* HEADER DO AGENTE */}
        <div style={{ padding: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 240, 255, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--accent)', borderRadius: '8px', color: '#000' }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>Agente IA • {contexto}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></span> Contexto Ativo & Automatizado
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* SUGESTÕES RÁPIDAS DE AUTOMAÇÃO */}
        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          <button onClick={() => setInput(`Gerar relatório sintético sobre ${contexto}`)} style={chipStyle}>
            <BarChart2 size={12} /> Gerar Relatório
          </button>
          <button onClick={() => setInput(`Automatizar rotina de ${contexto}`)} style={chipStyle}>
            <Zap size={12} /> Automação Rápida
          </button>
        </div>

        {/* CHAT MESSAGES */}
        <div style={{ flex: 1, padding: '1.2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(m => (
            <div key={m.id} style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex', gap: '0.6rem',
              flexDirection: m.sender === 'user' ? 'row-reverse' : 'row'
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: m.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'var(--accent)',
                color: m.sender === 'user' ? '#fff' : '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div style={{
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                background: m.sender === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: m.sender === 'user' ? '#000' : '#fff',
                fontSize: '0.88rem',
                lineHeight: '1.4',
                border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)'
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT DE ENVIO */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Pergunte ou ordene ao Agente de ${contexto}...`}
            style={{
              flex: 1, padding: '0.8rem 1rem',
              background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#fff', fontSize: '0.88rem', outline: 'none'
            }}
          />
          <button onClick={handleSend} className="btn-primary" style={{ padding: '0.8rem 1rem', borderRadius: '8px' }}>
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

const chipStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-secondary)',
  padding: '0.4rem 0.7rem',
  borderRadius: '20px',
  fontSize: '0.75rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem'
};
