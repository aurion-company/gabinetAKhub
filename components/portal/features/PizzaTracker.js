'use client';
import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  ExternalLink, 
  Camera, 
  Search, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function PizzaTracker({ protocolId = 'GAK-2026-8941' }) {
  const [searchCode, setSearchCode] = useState(protocolId);
  const [currentStep, setCurrentStep] = useState(3); // 1 a 5

  const steps = [
    {
      step: 1,
      titulo: 'Recebido pelo Gabinete',
      data: '02/11/2026 às 09:14',
      desc: 'Fotos e localização validadas pela equipe de triagem cívica.',
      completo: true
    },
    {
      step: 2,
      titulo: 'Triagem Técnica & Jurídica',
      data: '03/11/2026 às 14:30',
      desc: 'Enquadrado como competência da Novacap / Administração Regional.',
      completo: true
    },
    {
      step: 3,
      titulo: 'Ofício Protocolado no Órgão',
      data: '04/11/2026 às 11:20',
      desc: 'Ofício nº 402/2026 protocolado oficialmente com assinatura do deputado.',
      temPdf: true,
      completo: true,
      atual: true
    },
    {
      step: 4,
      titulo: 'Em Execução pelo Governo',
      data: 'Previsão: 10 dias úteis',
      desc: 'Ordem de serviço aguardando envio de equipe técnica ao local.',
      completo: false
    },
    {
      step: 5,
      titulo: 'Problema Resolvido',
      data: 'Pendente',
      desc: 'Foto do depois enviada pelos moradores confirmando a entrega.',
      completo: false
    }
  ];

  return (
    <div className="tracker-box">
      <style jsx>{`
        .tracker-box {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 18px;
          padding: 1.75rem;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }

        .tracker-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1E2230;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .tracker-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .protocol-badge {
          background: rgba(37, 99, 235, 0.15);
          color: #60A5FA;
          border: 1px solid rgba(37, 99, 235, 0.35);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
        }

        /* LINHA DO TEMPO ESTILO PIZZA TRACKER */
        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          padding-left: 2rem;
        }

        .timeline-container::before {
          content: '';
          position: absolute;
          left: 11px;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background: #1E2230;
        }

        .step-row {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .step-node {
          position: absolute;
          left: -2rem;
          top: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          background: #1A1D27;
          border: 2px solid #2E364F;
          color: #94A3B8;
        }

        .step-node.done {
          background: #10B981;
          border-color: #10B981;
          color: #FFFFFF;
        }

        .step-node.active {
          background: #2563EB;
          border-color: #38BDF8;
          color: #FFFFFF;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
        }

        .step-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .step-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #F8FAFC;
          margin: 0;
        }

        .step-date {
          font-size: 0.72rem;
          color: #64748B;
        }

        .step-desc {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.4;
        }

        .btn-pdf-download {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(37, 99, 235, 0.3);
          color: #60A5FA;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          margin-top: 0.4rem;
          width: fit-content;
        }

        .btn-pdf-download:hover {
          background: #2563EB;
          color: #FFFFFF;
        }
      `}</style>

      <div className="tracker-header">
        <div>
          <h3 className="tracker-title">Rastreador de Demanda Cívica</h3>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Acompanhamento em tempo real</span>
        </div>
        <span className="protocol-badge">{searchCode}</span>
      </div>

      <div className="timeline-container">
        {steps.map((s) => (
          <div key={s.step} className="step-row">
            <div className={`step-node ${s.atual ? 'active' : s.completo ? 'done' : ''}`}>
              {s.completo ? '✓' : s.step}
            </div>

            <div className="step-title-row">
              <h4 className="step-title">{s.titulo}</h4>
              <span className="step-date">{s.data}</span>
            </div>

            <p className="step-desc">{s.desc}</p>

            {s.temPdf && (
              <a href="#" className="btn-pdf-download" onClick={(e) => { e.preventDefault(); alert('Download do Ofício nº 402/2026 em PDF simulado com sucesso!'); }}>
                <FileText size={13} />
                Baixar Ofício Oficial Protocolado (PDF)
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

