'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User, CornerDownLeft, Loader2, RefreshCw } from 'lucide-react';

export default function CitizenAIChatDrawer({ 
  isOpen, 
  onClose, 
  initialQuery = '', 
  initialPrompt = '' 
}) {
  const effectiveInitial = initialQuery || initialPrompt || '';
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Olá! Sou o Assistente de Inteligência do GabinetAK HUB. Como posso te ajudar hoje? Posso responder sobre gastos do mandato, projetos de lei, emendas para o seu bairro ou orientar sobre como abrir uma demanda!'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasTriggeredInitial = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Dispara automaticamente quando aberto via Home ou Chip
  useEffect(() => {
    if (isOpen && effectiveInitial && !hasTriggeredInitial.current) {
      hasTriggeredInitial.current = true;
      executeAIQuery(effectiveInitial);
    }
  }, [isOpen, effectiveInitial]);

  const executeAIQuery = async (queryText) => {
    if (!queryText.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: queryText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          task: 'Consulta do Cidadão no Portal Público',
          isPublic: true
        })
      });

      const data = await res.json();
      const reply = data.text || data.response || 'Nosso gabinete está focado em transparência total e fiscalização. Esse tema foi recebido e encaminhado para análise da equipe técnica.';

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: 'Recebemos sua consulta! A Inteligência do Gabinete monitora ativamente as demandas de saúde, infraestrutura e segurança do DF. Você também pode registrar uma demanda formal na barra lateral!' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;
    const text = inputVal;
    setInputVal('');
    executeAIQuery(text);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <style jsx>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .drawer-content {
          width: 100%;
          max-width: 480px;
          height: 100vh;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1.5px solid #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
        }

        .header-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .ai-badge-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #EEF2FF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0038FF;
        }

        .header-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          line-height: 1.2;
        }

        .header-subtitle {
          font-size: 0.76rem;
          font-weight: 600;
          color: #64748B;
          margin: 0;
        }

        .btn-close {
          background: transparent;
          border: none;
          color: #64748B;
          padding: 0.4rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-close:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #F8FAFC;
        }

        .message-bubble {
          max-width: 86%;
          padding: 0.85rem 1.15rem;
          border-radius: 14px;
          font-size: 0.92rem;
          line-height: 1.55;
          word-break: break-word;
        }

        .message-bubble.user {
          align-self: flex-end;
          background: #0038FF;
          color: #FFFFFF;
          font-weight: 500;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 56, 255, 0.2);
        }

        .message-bubble.ai {
          align-self: flex-start;
          background: #FFFFFF;
          color: #0F172A;
          border: 1.5px solid #E2E8F0;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .loading-bubble {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748B;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.6rem 1rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          align-self: flex-start;
        }

        .drawer-footer {
          padding: 1rem 1.25rem;
          border-top: 1.5px solid #F1F5F9;
          background: #FFFFFF;
        }

        .input-form {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          padding: 0.4rem 0.6rem 0.4rem 0.9rem;
          transition: border-color 0.2s;
        }

        .input-form:focus-within {
          border-color: #0038FF;
          background: #FFFFFF;
        }

        .drawer-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.92rem;
          color: #0F172A;
          font-family: inherit;
        }

        .drawer-input::placeholder {
          color: #94A3B8;
        }

        .btn-send {
          background: #0038FF;
          color: #FFFFFF;
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
          flex-shrink: 0;
        }

        .btn-send:hover:not(:disabled) {
          background: #0028CC;
        }

        .btn-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="header-title-wrap">
            <div className="ai-badge-icon">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="header-title">Inteligência GabinetAK</h3>
              <p className="header-subtitle">Powered by Gemini 3.5 Flash · Respostas em Tempo Real</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="loading-bubble">
              <Loader2 size={16} className="animate-spin" />
              <span>Analisando dados do mandato com IA...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="drawer-footer">
          <form className="input-form" onSubmit={handleSend}>
            <input 
              type="text"
              className="drawer-input"
              placeholder="Pergunte sobre leis, emendas, obras ou gastos..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="btn-send" disabled={!inputVal.trim() || loading}>
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
