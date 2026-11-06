'use client';
import { useState } from 'react';
import { Bell, Check, X, ShieldCheck, MapPin } from 'lucide-react';

export default function AlertaBairroWhatsApp({ isOpen, onClose }) {
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !cep) return;
    setSubscribed(true);
  };

  return (
    <div className="alert-modal-backdrop">
      <style jsx>{`
        .alert-modal-backdrop {
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

        .alert-card {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 18px;
          padding: 1.75rem;
          width: 100%;
          max-width: 480px;
          position: relative;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }

        .btn-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #1A1D27;
          border: none;
          color: #94A3B8;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .alert-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 0.4rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .alert-desc {
          font-size: 0.85rem;
          color: #94A3B8;
          line-height: 1.45;
          margin: 0 0 1.25rem 0;
        }

        .alert-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .input-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #CBD5E1;
        }

        .input-field {
          background: #0E1017;
          border: 1px solid #1E2230;
          border-radius: 10px;
          padding: 0.7rem 0.85rem;
          color: #FFFFFF;
          font-size: 0.9rem;
          outline: none;
        }

        .input-field:focus {
          border-color: #38BDF8;
        }

        .btn-submit {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.8rem;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .success-box {
          text-align: center;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
      `}</style>

      <div className="alert-card">
        <button className="btn-close" onClick={onClose}>
          <X size={16} />
        </button>

        {!subscribed ? (
          <>
            <h3 className="alert-title">
              <Bell color="#38BDF8" size={22} />
              Alertas do Seu Bairro no WhatsApp
            </h3>
            <p className="alert-desc">
              Receba avisos automáticos e gratuitos sempre que uma lei, emenda parlamentar ou obra do deputado impactar um raio de até <strong>2 km do seu CEP</strong>.
            </p>

            <form className="alert-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Seu WhatsApp com DDD:</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="(61) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Seu CEP (para calcular o raio de 2km):</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="70000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Ativar Alertas no Meu WhatsApp
              </button>
            </form>
          </>
        ) : (
          <div className="success-box">
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={28} color="#10B981" />
            </div>
            <h4 style={{ color: '#F8FAFC', margin: 0, fontSize: '1.2rem' }}>Alertas Ativados com Sucesso!</h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>
              Você receberá atualizações no número <strong>{phone}</strong> sempre que ações forem executadas na sua vizinhança.
            </p>
            <button 
              className="btn-submit" 
              style={{ background: '#2563EB', width: '100%' }}
              onClick={onClose}
            >
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

