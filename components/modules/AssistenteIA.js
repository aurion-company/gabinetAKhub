import React, { useState } from 'react';
import { Cpu, Send, Plus, Sparkles, MessageSquare, Bot, User, RefreshCw, Paperclip } from 'lucide-react';

export default function AssistenteIA() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Olá! Sou o Assistente IA do GabinetAK HUB. Como posso ajudar seu mandato hoje?', timestamp: 'Agora mesmo' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    "Quantos cadastros temos?",
    "Quantas pessoas são homens?",
    "Quantas pessoas moram não bairro Centro?",
    "Quantas demandas pendentes existem?"
  ];

  const handleSend = (text) => {
    const msg = text || inputMessage;
    if (!msg.trim()) return;

    // Adiciona a mensagem do usuário
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: msg, timestamp: 'Agora' }]);
    setInputMessage('');
    setIsTyping(true);

    // Simula a resposta da IA
    setTimeout(() => {
      let responseText = "Entendido. Estou analisando os dados do banco de dados para você...";
      if (msg.includes("cadastros")) responseText = "Atualmente temos 1.432 cadastros registrados não CRM, sendo 120 adicionados nos últimos 7 dias.";
      else if (msg.includes("Centro")) responseText = "Existem 437 contatos com endereço não bairro Centro.";
      else if (msg.includes("demandas")) responseText = "Temos 142 demandas não sistema. 15 estão pendentes e 10 estão em andamento.";

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText, timestamp: 'Agora' }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', height: '85vh', padding: 0, overflow: 'hidden' }}>
      
      {/* HEADER DO CHAT */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #a855f7 100%)', padding: '0.6rem', borderRadius: '12px', boxShadow: '0 0 15px rgba(0,240,255,0.3)' }}>
            <Cpu size={24} color="#000" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Assistente de IA GabinetAK HUB <Sparkles size={14} color="var(--accent)" />
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Inteligência artificial alimentada pela base do CRM e OpenAI.</p>
          </div>
        </div>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}>
          <RefreshCw size={18} />
        </button>
      </div>

      {/* ÁREA DE CONVERSAÇÃO */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'radial-gradient(circle at top right, rgba(0,240,255,0.02) 0%, transparent 50%)' }}>
        
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: '1rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            
            {msg.sender === 'ai' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={18} color="var(--accent)" />
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                background: msg.sender === 'user' ? 'var(--accent)' : 'rgba(0,0,0,0.4)', 
                color: msg.sender === 'user' ? '#000' : '#fff', 
                border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                padding: '1rem', 
                borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(0,240,255,0.2)' : 'none'
              }}>
                {msg.text}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.timestamp}</span>
            </div>

            {msg.sender === 'user' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={18} color="#fff" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={18} color="var(--accent)" />
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '16px 16px 16px 0', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <div className="typing-dot"></div>
              <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* RODAPÉ DO CHAT (Input e Sugestões) */}
      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
        
        {/* Chips de Sugestão */}
        <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
          {quickSuggestions.map((sug, i) => (
            <button key={i} onClick={() => handleSend(sug)} style={{ 
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', 
              padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s'
            }} onMouseEnter={(e) => { e.target.style.background = 'rgba(0,240,255,0.1)'; e.target.style.color = 'var(--accent)'; e.target.style.borderColor = 'var(--accent)'; }} 
               onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = 'var(--text-secondary)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
              {sug}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.5rem' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: '0.8rem', cursor: 'pointer' }}>
            <Paperclip size={20} />
          </button>
          
          <textarea 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem para a IA (ex: 'Resuma o ofício 142')..."
            style={{ 
              flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '0.8rem 0', 
              fontSize: '0.95rem', resize: 'none', height: '50px', outline: 'none'
            }}
          />
          
          <button 
            onClick={() => handleSend()}
            disabled={!inputMessage.trim()}
            style={{ 
              background: inputMessage.trim() ? 'var(--accent)' : 'rgba(255,255,255,0.1)', 
              border: 'none', color: inputMessage.trim() ? '#000' : 'rgba(255,255,255,0.3)', 
              padding: '0.8rem', borderRadius: '8px', cursor: inputMessage.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
          >
            <Send size={20} />
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
          A Inteligência Artificial pode cometer erros. Verifique os dados importantes não painel.
        </div>
      </div>

      <style>{`
        .typing-dot {
          width: 6px; height: 6px; background: var(--accent); borderRadius: 50%;
          animation: typingBounce 1.4s infinite ease-in-out both;
        }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
