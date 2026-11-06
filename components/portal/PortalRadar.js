'use client';
import { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  CheckCircle2, 
  ArrowUpRight, 
  FileText,
  AlertCircle,
  Filter
} from 'lucide-react';

export default function PortalRadar({ selectedCity, onOpenDemandModal }) {
  const [upvotes, setUpvotes] = useState({ 1: 142, 2: 98, 3: 76, 4: 54, 5: 39 });
  const [userVoted, setUserVoted] = useState({});

  const handleUpvote = (id) => {
    if (userVoted[id]) return;
    setUpvotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setUserVoted(prev => ({ ...prev, [id]: true }));
  };

  const cityCards = [
    {
      cidade: 'Ceilândia',
      badge: '● Relatório de Cidade • Hoje',
      titulo: 'R$ 1,2 mi em recapeamento asfáltico',
      resumo: 'Obras na Avenida Hélio Prates em fase final após ofício nº 402/2026.',
      statusTag: '94% Executado',
      corBadge: '#10B981',
      kpiNum: '18',
      kpiLabel: 'Ofícios Ativos'
    },
    {
      cidade: 'Taguatinga',
      badge: '● Relatório de Cidade • 5 Nov',
      titulo: 'Reforma da UPA e reforço pediátrico',
      resumo: 'Destinação de R$ 650 mil para novos leitos e compra de equipamentos de triagem.',
      statusTag: 'Em Execução',
      corBadge: '#3B82F6',
      kpiNum: 'R$ 650k',
      kpiLabel: 'Destinados'
    },
    {
      cidade: 'Samambaia',
      badge: '● Relatório de Cidade • 4 Nov',
      titulo: 'Iluminação em LED na QS 406',
      resumo: 'Troca de 120 postes atendendo a pedido com mais de 80 apoios comunitários.',
      statusTag: 'Concluído',
      corBadge: '#F59E0B',
      kpiNum: '120',
      kpiLabel: 'Pontos de Luz'
    },
    {
      cidade: 'Plano Piloto',
      badge: '● Relatório de Cidade • 3 Nov',
      titulo: 'Fiscalização de transporte coletivo',
      resumo: 'Vistoria surpresa nas linhas da W3 Sul com apresentação de requerimento na Câmara.',
      statusTag: 'Em Tramitação',
      corBadge: '#8B5CF6',
      kpiNum: '6',
      kpiLabel: 'Linhas Cobradas'
    }
  ];

  const demandasPrioritarias = [
    {
      id: 1,
      rank: '01',
      categoria: 'Infraestrutura',
      categoriaCor: '#EF4444',
      titulo: 'Cratera aberta em frente à Escola Classe 15 de Ceilândia Norte',
      bairro: 'Ceilândia • QNM 18',
      tempo: 'Há 2 horas',
      status: 'Ofício Gerado'
    },
    {
      id: 2,
      rank: '02',
      categoria: 'Saúde',
      categoriaCor: '#3B82F6',
      titulo: 'Falta de médicos clínicos no plantão noturno da UPA de Taguatinga',
      bairro: 'Taguatinga Sul',
      tempo: 'Há 4 horas',
      status: 'Em Triagem'
    },
    {
      id: 3,
      rank: '03',
      categoria: 'Segurança',
      categoriaCor: '#F59E0B',
      titulo: 'Parada de ônibus escura e sem policiamento na entrada de Samambaia',
      bairro: 'Samambaia Sul • 1ª Entrada',
      tempo: 'Há 6 horas',
      status: 'Encaminhado PM'
    },
    {
      id: 4,
      rank: '04',
      categoria: 'Mobilidade',
      categoriaCor: '#10B981',
      titulo: 'Semáforo queimado no cruzamento central da Av. Araucárias',
      bairro: 'Águas Claras',
      tempo: 'Há 8 horas',
      status: 'Resolvido pelo Detran'
    },
    {
      id: 5,
      rank: '05',
      categoria: 'Educação',
      categoriaCor: '#8B5CF6',
      titulo: 'Reforma da quadra poliesportiva do CED 02 do Gama',
      bairro: 'Gama Setor Sul',
      tempo: 'Ontem',
      status: 'Emenda Cadastrada'
    }
  ];

  const feedTempoReal = [
    { hora: '14:20', texto: 'Ofício nº 489 protocolado na Novacap cobrando recapeamento na QNM 18.' },
    { hora: '13:45', texto: 'Nova demanda registrada por morador de Águas Claras com foto.' },
    { hora: '11:15', texto: 'Reunião com lideranças de Samambaia sobre segurança nas escolas.' },
    { hora: '10:02', texto: 'Empenho de R$ 300.000 liberado para iluminação pública.' },
    { hora: '08:30', texto: 'Vistoria presencial da equipe na UPA de Taguatinga.' },
  ];

  return (
    <div className="portal-radar">
      <style jsx>{`
        .portal-radar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 1rem;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .live-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #EF4444;
          box-shadow: 0 0 8px #EF4444;
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        /* GRID SUPERIOR DE RELATÓRIOS */
        .city-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 1100px) {
          .city-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .city-grid {
            grid-template-columns: 1fr;
          }
        }

        .city-bicolor-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .city-bicolor-card:hover {
          transform: translateY(-2px);
          border-color: #C7D2FE;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .card-top-header {
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          padding: 1.1rem 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-city-name {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .card-kpi-large {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1;
          margin-top: 0.4rem;
        }

        .card-kpi-sub {
          font-size: 0.72rem;
          color: #64748B;
          font-weight: 600;
        }

        .card-bottom-body {
          background: #FFFFFF;
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .card-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .card-badge {
          font-size: 0.7rem;
          font-weight: 600;
        }

        .card-status-pill {
          font-size: 0.68rem;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          background: #F1F5F9;
          color: #475569;
          font-weight: 600;
        }

        .card-news-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.35rem 0;
          line-height: 1.35;
        }

        .card-news-desc {
          font-size: 0.78rem;
          color: #64748B;
          margin: 0;
          line-height: 1.4;
        }

        /* SEÇÃO DIVIDIDA 65% / 35% */
        .radar-split-section {
          display: grid;
          grid-template-columns: 1.9fr 1.1fr;
          gap: 1.5rem;
        }

        @media (max-width: 950px) {
          .radar-split-section {
            grid-template-columns: 1fr;
          }
        }

        .split-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .split-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .split-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        /* LISTA NUMERADA DE DEMANDAS */
        .demands-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .demand-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.85rem;
          border-radius: 10px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          transition: border-color 0.2s ease;
        }

        .demand-item:hover {
          border-color: #CBD5E1;
        }

        .demand-rank {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0038FF;
          line-height: 1;
          min-width: 28px;
        }

        .demand-body {
          flex: 1;
        }

        .demand-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          color: #64748B;
          margin-bottom: 0.25rem;
        }

        .demand-category-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .demand-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: #1E293B;
          margin: 0 0 0.35rem 0;
          line-height: 1.35;
        }

        .demand-sub {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748B;
        }

        .btn-upvote {
          background: #EEF2FF;
          border: 1px solid #C7D2FE;
          color: #1D4ED8;
          border-radius: 8px;
          padding: 0.35rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.2s ease;
        }

        .btn-upvote.voted {
          background: #0038FF;
          color: #FFFFFF;
          border-color: #0038FF;
        }

        /* TIMELINE TEMPO REAL */
        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          position: relative;
          padding-left: 1.25rem;
        }

        .timeline-list::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: #E5E7EB;
        }

        .timeline-item {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .timeline-dot {
          position: absolute;
          left: -1.25rem;
          top: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10B981;
          border: 2px solid #FFFFFF;
        }

        .timeline-time {
          font-size: 0.75rem;
          font-weight: 700;
          color: #0038FF;
        }

        .timeline-text {
          font-size: 0.82rem;
          color: #374151;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>

      {/* CABEÇALHO DA SEÇÃO */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="live-dot" />
          Radar de Ações nas Cidades
        </h2>
        <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
          Filtrado por: <strong style={{ color: '#111827' }}>{selectedCity}</strong>
        </span>
      </div>

      {/* GRID DE CARDS */}
      <div className="city-grid">
        {cityCards.map((c, idx) => (
          <div key={idx} className="city-bicolor-card">
            <div className="card-top-header">
              <div className="card-city-name">
                <MapPin size={13} color="#64748B" />
                {c.cidade}
              </div>
              <div>
                <div className="card-kpi-large">{c.kpiNum}</div>
                <div className="card-kpi-sub">{c.kpiLabel}</div>
              </div>
            </div>

            <div className="card-bottom-body">
              <div>
                <div className="card-badge-row">
                  <span className="card-badge" style={{ color: c.corBadge }}>
                    {c.badge}
                  </span>
                  <span className="card-status-pill">{c.statusTag}</span>
                </div>
                <h4 className="card-news-title">{c.titulo}</h4>
                <p className="card-news-desc">{c.resumo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEÇÃO DIVIDIDA */}
      <div className="radar-split-section">
        {/* ESQUERDA: DEMANDAS MAIS VOTADAS */}
        <div className="split-card">
          <div className="split-header">
            <h3 className="split-title">🔥 Demandas Mais Apoiadas da População</h3>
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Atualizado a cada 15 min</span>
          </div>

          <div className="demands-list">
            {demandasPrioritarias.map((d) => (
              <div key={d.id} className="demand-item">
                <span className="demand-rank">{d.rank}</span>
                <div className="demand-body">
                  <div className="demand-meta">
                    <span 
                      className="demand-category-dot" 
                      style={{ background: d.categoriaCor }} 
                    />
                    <strong style={{ color: '#1E293B' }}>{d.categoria}</strong>
                    <span>•</span>
                    <span>{d.bairro}</span>
                    <span>•</span>
                    <span>{d.tempo}</span>
                  </div>
                  <h4 className="demand-title">{d.titulo}</h4>
                  <div className="demand-sub">
                    <span style={{ color: '#059669', fontWeight: 600 }}>
                      ✓ {d.status}
                    </span>
                    <button 
                      className={`btn-upvote ${userVoted[d.id] ? 'voted' : ''}`}
                      onClick={() => handleUpvote(d.id)}
                    >
                      <ThumbsUp size={13} />
                      {userVoted[d.id] ? 'Apoiado' : '+1 Eu Também Sofro'} ({upvotes[d.id]})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIREITA: TEMPO REAL DO GABINETE */}
        <div className="split-card">
          <div className="split-header">
            <h3 className="split-title">⚡ Gabinete em Tempo Real</h3>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
              ● Ao Vivo
            </span>
          </div>

          <div className="timeline-list">
            {feedTempoReal.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <span className="timeline-dot" />
                <span className="timeline-time">{item.hora}</span>
                <p className="timeline-text">{item.texto}</p>
              </div>
            ))}
          </div>

          <button 
            style={{ 
              marginTop: '1.5rem', 
              width: '100%', 
              background: '#0038FF', 
              border: 'none',
              color: '#FFFFFF',
              padding: '0.65rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={onOpenDemandModal}
          >
            + Reportar Problema na Minha Região
          </button>
        </div>
      </div>
    </div>
  );
}
