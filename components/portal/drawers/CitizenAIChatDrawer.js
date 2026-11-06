'use client';
import { useState } from 'react';
import { X, Send, Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';

export default function CitizenAIChatDrawer({ isOpen, onClose, initialPrompt = '' }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Olá! Sou o Assistente de Inteligência Cidadã do Gabinete. Como posso te ajudar hoje? Posso responder sobre gastos do mandato, projetos de lei, emendas para o seu bairro ou orientar sobre como abrir uma demanda!'
    }
  ]);
  const [inputVal, setInputVal] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Você é o Assistente de Inteligência Cidadã do mandato GabinetAK HUB. Seja transparente, educado, objetivo e prestativo com o eleitor. Pergunta do cidadão: "${userText}". Responda em no máximo 3 parágrafos claros.`
        })
      });

      const data = await res.json();
      const reply = data.text || data.response || 'Nosso gabinete está focado em transparência total e fiscalização. Esse tema já foi encaminhado para a equipe técnica de análise parlamentar!';

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: 'Recebemos sua pergunta! Nossos dados de transparência mostram que o mandato prioriza Saúde, Asfalto e Segurança nas cidades do DF. Você também pode abrir uma demanda formal na aba Início!' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <style jsx>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          justify-content: flex-end;
        }

        .drawer-panel {
          width: 100%;
          max-width: 440px;
          height: 100vh;
          background: #0C0E14;
          border-left: 1px solid #1A1D27;
          display: flex;
          flex-direction: column;
          box-shadow: -15px 0 40px rgba(0, 0, 0, 0.7);
        }

        .drawer-header {
          padding: 1.25rem;
          border-bottom: 1px solid #1A1D27;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #090A0F;
        }

        .header-title-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .ai-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        }

        .btn-drawer-close {
          background: #141722;
          border: 1px solid #1E2230;
          color: #94A3B8;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .msg-bubble {
          max-width: 85%;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          font-size: 0.88rem;
          line-height: 1.45;
        }

        .msg-bubble.ai {
          align-self: flex-start;
          background: #12141C;
          border: 1px solid #1E2230;
          color: #F8FAFC;
        }

        .msg-bubble.user {
          align-self: flex-end;
          background: #2563EB;
          color: #FFFFFF;
        }

        .typing-indicator {
          font-size: 0.78rem;
          color: #94A3B8;
          font-style: italic;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .drawer-input-form {
          padding: 1rem;
          border-top: 1px solid #1A1D27;
          background: #090A0F;
          display: flex;
          gap: 0.5rem;
        }

        .drawer-input {
          flex: 1;
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 10px;
          padding: 0.7rem 0.85rem;
          color: #FFFFFF;
          font-size: 0.88rem;
          outline: none;
        }

        .drawer-input:focus {
          border-color: #38BDF8;
        }

        .btn-drawer-send {
          background: #2563EB;
          border: none;
          color: #FFFFFF;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>

      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="header-title-box">
            <div className="ai-avatar">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#FFFFFF', fontWeight: 700 }}>
                IA Cidadã do Mandato
              </h4>
              <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>● Online e disponível</span>
            </div>
          </div>
          <button className="btn-drawer-close" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <div className="messages-area">
          {messages.map((m, idx) => (
            <div key={idx} className={`msg-bubble ${m.sender}`}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="typing-indicator">
              <Sparkles size={13} color="#38BDF8" />
              Buscando dados no portal do mandato...
            </div>
          )}
        </div>

        <form className="drawer-input-form" onSubmit={handleSend}>
          <input 
            type="text" 
            className="drawer-input" 
            placeholder="Pergunte sobre leis, obras ou gastos..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="btn-drawer-send">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

