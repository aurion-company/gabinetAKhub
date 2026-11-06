'use client';
import { useState } from 'react';
import { X, Camera, MapPin, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewDemandModal({ isOpen, onClose, selectedCity }) {
  const [bairro, setBairro] = useState('');
  const [eixo, setEixo] = useState('Infraestrutura');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [protocolGenerated, setProtocolGenerated] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descricao) return;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const newProt = `GAK-2026-${rand}`;
    setProtocolGenerated(newProt);
  };

  const resetAndClose = () => {
    setProtocolGenerated(null);
    setTitulo('');
    setDescricao('');
    onClose();
  };

  return (
    <div className="demand-modal-backdrop">
      <style jsx>{`
        .demand-modal-backdrop {
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

        .demand-modal-card {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 18px;
          padding: 1.75rem;
          width: 100%;
          max-width: 580px;
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

        .modal-desc {
          font-size: 0.85rem;
          color: #94A3B8;
          line-height: 1.45;
          margin: 0 0 1.25rem 0;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 500px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #CBD5E1;
        }

        .form-input, .form-select, .form-textarea {
          background: #0E1017;
          border: 1px solid #1E2230;
          border-radius: 10px;
          padding: 0.65rem 0.85rem;
          color: #FFFFFF;
          font-size: 0.88rem;
          outline: none;
          font-family: inherit;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #38BDF8;
        }

        .upload-dropzone {
          border: 2px dashed #2E364F;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          background: #0B0D13;
          color: #94A3B8;
          font-size: 0.82rem;
          transition: border-color 0.2s;
        }

        .upload-dropzone:hover {
          border-color: #38BDF8;
          color: #F8FAFC;
        }

        .btn-submit-demand {
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.85rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
          margin-top: 0.5rem;
        }

        .protocol-success-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
        }

        .protocol-code {
          font-size: 1.85rem;
          font-family: monospace;
          font-weight: 800;
          color: #38BDF8;
          background: #0E1017;
          border: 1px solid #1E2230;
          padding: 0.5rem 1.5rem;
          border-radius: 10px;
        }
      `}</style>

      <div className="demand-modal-card">
        <button className="btn-modal-close" onClick={resetAndClose}>
          <X size={16} />
        </button>

        {!protocolGenerated ? (
          <>
            <h3 className="modal-title">Registrar Demanda ou Problema Cívico</h3>
            <p className="modal-desc">
              Envie fotos e detalhes da sua rua ou bairro. O gabinete analisa e protocola o ofício de cobrança em até 48 horas.
            </p>

            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Região / Cidade:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedCity !== 'Todas as Cidades' ? selectedCity : 'Ceilândia'} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bairro / Quadra / Rua:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ex: QNM 18 Conjunto B" 
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Área Temática (Eixo):</label>
                <select 
                  className="form-select"
                  value={eixo}
                  onChange={(e) => setEixo(e.target.value)}
                >
                  <option value="Infraestrutura">🏗️ Infraestrutura (Asfalto, Buracos, Calçadas)</option>
                  <option value="Saúde Pública">🏥 Saúde Pública (UPAs, Médicos, Remédios)</option>
                  <option value="Segurança">🛡️ Segurança & Iluminação Pública</option>
                  <option value="Educação">📚 Educação & Escolas</option>
                  <option value="Mobilidade">🚌 Transporte Coletivo & Trânsito</option>
                  <option value="Causa Animal">🐾 Causa Animal</option>
                  <option value="Outros">Outra Solicitação</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Título da Demanda:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: Buraco gigante impedindo passagem de pedestres"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descrição Detalhada do Problema:</label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  placeholder="Conte o que está acontecendo e há quanto tempo o problema persiste..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required 
                />
              </div>

              {/* FOTOS / VÍDEO */}
              <div className="form-group">
                <label className="form-label">Fotos ou Vídeos do Local:</label>
                <div className="upload-dropzone" onClick={() => alert('Seletor de fotos simulado.')}>
                  <Camera size={24} color="#38BDF8" />
                  <span>Clique para tirar foto com a câmera ou anexar da galeria</span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Seu Nome (Opcional):</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Para prestação de contas"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Seu WhatsApp:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Para receber o status por msg"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit-demand">
                Gerar Protocolo e Enviar ao Gabinete
              </button>
            </form>
          </>
        ) : (
          <div className="protocol-success-card">
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={36} color="#10B981" />
            </div>

            <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.4rem' }}>Demanda Registrada com Sucesso!</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, maxWidth: '400px' }}>
              Seu pedido já foi encaminhado para a equipe técnica de fiscalização do deputado. Guarde seu número de protocolo:
            </p>

            <div className="protocol-code">{protocolGenerated}</div>

            <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Você poderá acompanhar cada etapa na aba "Rastrear Demandas" a qualquer momento.
            </p>

            <button 
              className="btn-submit-demand" 
              style={{ width: '100%' }}
              onClick={resetAndClose}
            >
              Fechar e Acompanhar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

