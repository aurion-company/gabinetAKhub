'use client';
import { DollarSign, TrendingDown, PiggyBank, HeartPulse, GraduationCap, Building2 } from 'lucide-react';

export default function Economometro() {
  return (
    <div className="economometro-container">
      <style jsx>{`
        .economometro-container {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 18px;
          padding: 1.75rem;
          width: 100%;
          max-width: 780px;
          margin: 0 auto;
        }

        .eco-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1E2230;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .eco-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .eco-grid-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 600px) {
          .eco-grid-main {
            grid-template-columns: 1fr;
          }
        }

        .eco-card-big {
          background: #0E1017;
          border: 1px solid #1E2230;
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .eco-val {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
        }

        .eco-lbl {
          font-size: 0.82rem;
          color: #94A3B8;
        }

        /* CONVERS�O EM BENEF�CIO REAL */
        .benefits-card {
          background: #151924;
          border: 1px solid #2563EB;
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .benefits-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #38BDF8;
          margin: 0;
        }

        .benefit-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: #CBD5E1;
        }

        .benefit-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(37, 99, 235, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="eco-header">
        <h3 className="eco-title">
          <PiggyBank color="#10B981" size={24} />
          Nota Fiscal do Mandato " Econom�metro
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
          � Atualizado Nov/2026
        </span>
      </div>

      <div className="eco-grid-main">
        <div className="eco-card-big">
          <span className="eco-val" style={{ color: '#10B981' }}>R$ 412.000</span>
          <span className="eco-lbl">Economizados em Cota Parlamentar no Ano</span>
          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
            Ren�ncia a privil�gios e uso de passagens econ�micas.
          </span>
        </div>

        <div className="eco-card-big">
          <span className="eco-val" style={{ color: '#38BDF8' }}>78%</span>
          <span className="eco-lbl">Abaixo do Teto M�dio do Parlamento</span>
          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
            Entre os gabinetes mais enxutos do legislativo.
          </span>
        </div>
      </div>

      <div className="benefits-card">
        <h4 className="benefits-title">O que essa economia representa na pr�tica para a popula��o?</h4>

        <div className="benefit-row">
          <div className="benefit-icon">
            <HeartPulse size={16} color="#38BDF8" />
          </div>
          <span>Equivalente a <strong>2.800 consultas m�dicas</strong> na rede b�sica.</span>
        </div>

        <div className="benefit-row">
          <div className="benefit-icon">
            <GraduationCap size={16} color="#8B5CF6" />
          </div>
          <span>Equivalente a <strong>4.200 kits escolares</strong> completos para alunos do ensino fundamental.</span>
        </div>

        <div className="benefit-row">
          <div className="benefit-icon">
            <Building2 size={16} color="#F59E0B" />
          </div>
          <span>Equivalente a <strong>3,5 km de recapeamento</strong> de vias esburacadas em bairros.</span>
        </div>
      </div>
    </div>
  );
}

