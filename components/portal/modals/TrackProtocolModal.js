'use client';
import { useState } from 'react';
import { X, SearchCheck, ArrowRight, FileText } from 'lucide-react';
import PizzaTracker from '../features/PizzaTracker';

export default function TrackProtocolModal({ isOpen, onClose }) {
  const [protocolCode, setProtocolCode] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!protocolCode.trim()) return;
    setSearched(true);
  };

  return (
    <div className="track-modal-backdrop">
      <style jsx>{`
        .track-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }

        .track-modal-card {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 18px;
          padding: 1.75rem;
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .btn-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #1A1D27;
          border: none;
          color: #94A3B8;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 0.4rem 0;
        }

        .search-form {
          display: flex;
          gap: 0.5rem;
          margin: 1.25rem 0;
        }

        .input-protocol {
          flex: 1;
          background: #0E1017;
          border: 1px solid #1E2230;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #FFFFFF;
          font-size: 0.95rem;
          font-family: monospace;
          outline: none;
        }

        .input-protocol:focus {
          border-color: #38BDF8;
        }

        .btn-search {
          background: #2563EB;
          color: #FFFFFF;
          border: none;
          padding: 0 1.25rem;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
      `}</style>

      <div className="track-modal-card">
        <button className="btn-modal-close" onClick={onClose}>
          <X size={16} />
        </button>

        <h3 className="modal-title">Consultar Andamento de Protocolo</h3>
        <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>
          Digite o número do seu protocolo para ver o status em tempo real e baixar o ofício gerado.
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="input-protocol" 
            placeholder="Ex: GAK-2026-8941"
            value={protocolCode}
            onChange={(e) => setProtocolCode(e.target.value)}
          />
          <button type="submit" className="btn-search">
            Consultar
            <ArrowRight size={15} />
          </button>
        </form>

        {searched ? (
          <PizzaTracker protocolId={protocolCode || 'GAK-2026-8941'} />
        ) : (
          <div style={{ padding: '1.5rem', textAlign: 'center', background: '#0E1017', borderRadius: '12px', border: '1px solid #1A1D27' }}>
            <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
              Dica de teste: use o protocolo <strong>GAK-2026-8941</strong> ou consulte qualquer código registrado hoje.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

