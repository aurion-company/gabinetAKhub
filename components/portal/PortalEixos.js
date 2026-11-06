'use client';
import { useState } from 'react';
import { 
  HeartPulse, 
  Shield, 
  GraduationCap, 
  HardHat, 
  Bus, 
  Coins, 
  Trees, 
  Dog, 
  Briefcase, 
  Trophy, 
  Palette, 
  Tractor,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function PortalEixos({ onSelectEixo }) {
  const [selectedEixo, setSelectedEixo] = useState(null);

  const eixos = [
    { id: 'saude', nome: 'Saúde Pública', icon: '🏥', dotCor: '#EF4444', desc: 'UPAs, hospitais, falta de médicos e emendas para compra de remédios.', projetos: 14, emendas: 'R$ 3,4 mi' },
    { id: 'seguranca', nome: 'Segurança', icon: '🛡️', dotCor: '#3B82F6', desc: 'Iluminação de ruas escuras, patrulhamento escolar e videomonitoramento.', projetos: 9, emendas: 'R$ 1,8 mi' },
    { id: 'educacao', nome: 'Educação', icon: '📚', dotCor: '#8B5CF6', desc: 'Reforma de escolas, quadras poliesportivas e creches comunitárias.', projetos: 21, emendas: 'R$ 4,2 mi' },
    { id: 'infraestrutura', nome: 'Infraestrutura', icon: '🏗️', dotCor: '#F59E0B', desc: 'Asfalto, drenagem de águas pluviais, calçadas e contenção de encostas.', projetos: 18, emendas: 'R$ 5,6 mi' },
    { id: 'mobilidade', nome: 'Mobilidade', icon: '🚌', dotCor: '#10B981', desc: 'Linhas de ônibus, ciclovias, semáforos e passe livre estudantil.', projetos: 12, emendas: 'R$ 1,2 mi' },
    { id: 'orcamento', nome: 'Orçamento & Fiscalização', icon: '💰', dotCor: '#06B6D4', desc: 'Transparência de gastos de governo, combate a privilégios e cota parlamentar.', projetos: 8, emendas: 'Economômetro' },
    { id: 'meio_ambiente', nome: 'Meio Ambiente', icon: '🌳', dotCor: '#22C55E', desc: 'Preservação de nascentes, parques urbanos e coleta seletiva.', projetos: 7, emendas: 'R$ 800k' },
    { id: 'causa_animal', nome: 'Causa Animal', icon: '🐾', dotCor: '#EC4899', desc: 'Castramóvel, hospitais veterinários públicos e apoio a abrigos.', projetos: 11, emendas: 'R$ 1,5 mi' },
    { id: 'emprego', nome: 'Emprego & Renda', icon: '💼', dotCor: '#6366F1', desc: 'Qualificação profissional, apoio ao MEI e desburocratização comercial.', projetos: 15, emendas: 'R$ 950k' },
    { id: 'esporte', nome: 'Esporte & Lazer', icon: '⚽', dotCor: '#F97316', desc: 'Areninhas, escolinhas de base nas periferias e eventos comunitários.', projetos: 16, emendas: 'R$ 2,1 mi' },
    { id: 'cultura', nome: 'Cultura & Arte', icon: '🎭', dotCor: '#A855F7', desc: 'Fomento a artistas locais, saraus de rua e preservação histórica.', projetos: 6, emendas: 'R$ 650k' },
    { id: 'agro', nome: 'Agro & Rural', icon: '🚜', dotCor: '#EAB308', desc: 'Estradas vicinais, apoio à agricultura familiar e feiras do produtor.', projetos: 10, emendas: 'R$ 1,9 mi' }
  ];

  return (
    <div className="portal-eixos">
      <style jsx>{`
        .portal-eixos {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .eixos-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .eixos-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .eixos-subtitle {
          color: #94A3B8;
          font-size: 0.95rem;
          margin: 0;
          max-width: 680px;
        }

        /* GRID DE 12 EIXOS (CLONE PRINT 6 COM CÍRCULO CREME) */
        .eixos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 1100px) {
          .eixos-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .eixos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .eixos-grid {
            grid-template-columns: 1fr;
          }
        }

        .eixo-card {
          background: #14151A;
          border: 1px solid #1E2230;
          border-radius: 16px;
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .eixo-card:hover {
          transform: translateY(-4px);
          border-color: #38BDF8;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .eixo-circle-creme {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #F5F2EB;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.25s ease;
        }

        .eixo-card:hover .eixo-circle-creme {
          transform: scale(1.08);
        }

        .eixo-title-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.4rem;
        }

        .eixo-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .eixo-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #F8FAFC;
          margin: 0;
        }

        .eixo-desc {
          font-size: 0.78rem;
          color: #94A3B8;
          line-height: 1.4;
          margin: 0 0 1rem 0;
          min-height: 44px;
        }

        .eixo-stats {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #1E2230;
          padding-top: 0.75rem;
          font-size: 0.72rem;
          color: #CBD5E1;
        }

        .eixo-btn-explorar {
          margin-top: 0.75rem;
          background: rgba(37, 99, 235, 0.15);
          color: #60A5FA;
          border: 1px solid rgba(37, 99, 235, 0.3);
          border-radius: 8px;
          padding: 0.35rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          width: 100%;
          justify-content: center;
          cursor: pointer;
        }

        .eixo-btn-explorar:hover {
          background: #2563EB;
          color: #fff;
        }
      `}</style>

      <div className="eixos-header">
        <h2 className="eixos-title">Os 12 Eixos do Mandato</h2>
        <p className="eixos-subtitle">
          Clique em qualquer bandeira para fiscalizar as leis, emendas parlamentares e pedidos da população vinculados à área.
        </p>
      </div>

      <div className="eixos-grid">
        {eixos.map((e) => (
          <div 
            key={e.id} 
            className="eixo-card"
            onClick={() => onSelectEixo(e)}
          >
            <div className="eixo-circle-creme">
              {e.icon}
            </div>

            <div className="eixo-title-row">
              <span className="eixo-dot" style={{ background: e.dotCor }} />
              <h3 className="eixo-name">{e.nome}</h3>
            </div>

            <p className="eixo-desc">{e.desc}</p>

            <div className="eixo-stats">
              <span>{e.projetos} Leis & Ações</span>
              <strong style={{ color: '#10B981' }}>{e.emendas}</strong>
            </div>

            <button className="eixo-btn-explorar">
              Perguntar sobre este Eixo
              <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

