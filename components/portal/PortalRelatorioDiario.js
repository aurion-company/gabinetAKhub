'use client';
import { 
  Calendar, 
  TrendingUp, 
  FileCheck2, 
  DollarSign, 
  Heart, 
  MessageSquare,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function PortalRelatorioDiario({ selectedCity }) {
  const kpis = [
    { label: 'Demandas recebidas hoje', valor: '142', sub: '+18% vs média semanal', cor: '#0038FF' },
    { label: 'Ofícios e ações geradas', valor: '89', sub: 'Protocolados em órgãos', cor: '#10B981' },
    { label: 'Recursos fiscalizados / empenhados', valor: 'R$ 15,0 mi', sub: 'Transparência total', cor: '#D97706' },
  ];

  const storiesDemandas = [
    {
      cidade: 'Ceilândia',
      bairro: 'QNM 18',
      titulo: 'Buraco gigante interditando via de ônibus',
      apoios: 124,
      atualizacoes: 3,
      imagem: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=60',
      status: 'Ofício nº 489 Protocolado'
    },
    {
      cidade: 'Taguatinga',
      bairro: 'Taguatinga Sul',
      titulo: 'Fila de 4 horas para atendimento pediátrico',
      apoios: 98,
      atualizacoes: 5,
      imagem: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&auto=format&fit=crop&q=60',
      status: 'Cobrança na Secretaria de Saúde'
    },
    {
      cidade: 'Samambaia',
      bairro: 'QS 406',
      titulo: 'Troca de lâmpadas queimadas em praça',
      apoios: 83,
      atualizacoes: 2,
      imagem: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60',
      status: 'Atendido pela CEB / Novacap'
    },
    {
      cidade: 'Plano Piloto',
      bairro: 'Asa Norte',
      titulo: 'Calçadas esburacadas próximas à escola',
      apoios: 65,
      atualizacoes: 1,
      imagem: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=500&auto=format&fit=crop&q=60',
      status: 'Requerimento Enviado'
    },
    {
      cidade: 'Águas Claras',
      bairro: 'Praça das Gaivotas',
      titulo: 'Falta de lixeiras e bebedouro comunitário',
      apoios: 52,
      atualizacoes: 2,
      imagem: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&auto=format&fit=crop&q=60',
      status: 'Em Análise Técnica'
    }
  ];

  const gargalos = [
    { tema: 'Saúde e Falta de Médicos', qtd: 107, pct: 42, cor: '#EF4444' },
    { tema: 'Asfalto e Buracos em Vias', qtd: 92, pct: 36, cor: '#F59E0B' },
    { tema: 'Iluminação Pública e Segurança', qtd: 42, pct: 16, cor: '#3B82F6' },
    { tema: 'Reforma de Escolas e Quadras', qtd: 24, pct: 9, cor: '#8B5CF6' },
    { tema: 'Transporte e Linhas de Ônibus', qtd: 19, pct: 7, cor: '#10B981' }
  ];

  return (
    <div className="portal-relatorio">
      <style jsx>{`
        .portal-relatorio {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          width: 100%;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #EEF2FF;
          border: 1px solid #C7D2FE;
          color: #1D4ED8;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .report-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* 3 KPIS HORIZONTAIS GIGANTES */
        .kpi-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
        }

        @media (max-width: 800px) {
          .kpi-row {
            grid-template-columns: 1fr;
          }
        }

        .kpi-box {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }

        .kpi-num {
          font-size: 2.3rem;
          font-weight: 800;
          line-height: 1;
        }

        .kpi-lbl {
          font-size: 0.88rem;
          color: #1F2937;
          font-weight: 600;
        }

        .kpi-sub {
          font-size: 0.75rem;
          color: #6B7280;
        }

        /* CARROSSEL VERTICAL DE STORIES */
        .stories-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        .stories-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          width: 100%;
        }

        @media (max-width: 1100px) {
          .stories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 650px) {
          .stories-grid {
            grid-template-columns: 1fr;
          }
        }

        .story-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .story-card:hover {
          transform: translateY(-2px);
          border-color: #C7D2FE;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .story-image-wrap {
          height: 140px;
          width: 100%;
          background: #F3F4F6;
          position: relative;
          overflow: hidden;
        }

        .story-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-city-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(255, 255, 255, 0.95);
          color: #1D4ED8;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .story-content {
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .story-desc {
          font-size: 0.82rem;
          font-weight: 600;
          color: #1F2937;
          line-height: 1.35;
          margin: 0 0 0.5rem 0;
        }

        .story-status {
          font-size: 0.7rem;
          color: #059669;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .story-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #F3F4F6;
          padding-top: 0.5rem;
          font-size: 0.72rem;
          color: #6B7280;
        }

        /* BLOCO INFERIOR DE GARGALOS */
        .gargalos-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
          width: 100%;
          box-sizing: border-box;
        }

        .gargalos-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 1.25rem 0;
        }

        .gargalos-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .gargalo-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .gargalo-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .gargalo-bar-track {
          width: 100%;
          height: 9px;
          background: #F1F5F9;
          border-radius: 999px;
          overflow: hidden;
        }

        .gargalo-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.4s ease;
        }
      `}</style>

      {/* HEADER DO RELATÓRIO */}
      <div>
        <span className="header-badge">
          ● Relatório do Dia • {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </span>
        <h2 className="report-title">Transparência em Números Reais</h2>
      </div>

      {/* 3 KPIS GIGANTES */}
      <div className="kpi-row">
        {kpis.map((k, idx) => (
          <div key={idx} className="kpi-box">
            <span className="kpi-num" style={{ color: k.cor }}>{k.valor}</span>
            <span className="kpi-lbl">{k.label}</span>
            <span className="kpi-sub">{k.sub}</span>
          </div>
        ))}
      </div>

      {/* CARROSSEL VERTICAL: DEMANDAS MAIS APOIADAS DA SEMANA */}
      <section className="stories-section">
        <h3 className="stories-title">📸 As Demandas Mais Apoiadas da População</h3>
        
        <div className="stories-grid">
          {storiesDemandas.map((s, idx) => (
            <div key={idx} className="story-card">
              <div className="story-image-wrap">
                <img src={s.imagem} alt={s.titulo} />
                <span className="story-city-tag">{s.cidade}</span>
              </div>
              <div className="story-content">
                <div>
                  <h4 className="story-desc">{s.titulo}</h4>
                  <div className="story-status">{s.status}</div>
                </div>
                <div className="story-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Heart size={12} color="#EF4444" fill="#EF4444" />
                    {s.apoios} apoios
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MessageSquare size={12} />
                    {s.atualizacoes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GARGALOS DAS CIDADES */}
      <div className="gargalos-card">
        <h3 className="gargalos-title">📊 Do Que as Cidades Mais Precisaram Este Mês</h3>
        
        <div className="gargalos-list">
          {gargalos.map((g, idx) => (
            <div key={idx} className="gargalo-row">
              <div className="gargalo-info">
                <span style={{ color: '#1F2937', fontWeight: 600 }}>{g.tema}</span>
                <span style={{ color: '#6B7280' }}>{g.qtd} demandas ({g.pct}%)</span>
              </div>
              <div className="gargalo-bar-track">
                <div 
                  className="gargalo-bar-fill" 
                  style={{ width: `${g.pct}%`, background: g.cor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
