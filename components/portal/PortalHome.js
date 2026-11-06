'use client';
import { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Camera, 
  Search, 
  ArrowRight, 
  Compass, 
  ChevronDown,
  Layers, 
  FileText
} from 'lucide-react';

export default function PortalHome({ 
  onOpenDemandModal, 
  onOpenTrackModal, 
  onNavigate, 
  onAskAI,
  selectedCity 
}) {
  const [promptText, setPromptText] = useState('');

  const chips = [
    { label: 'A abstenção aumentou no 2º turno no meu bairro?', query: 'Como foi a abstenção nas últimas eleições no meu bairro?' },
    { label: 'Que emendas o mandato destinou para a Saúde?', query: 'Quais emendas parlamentares foram destinadas para a saúde pública?' },
    { label: 'Em que obras e áreas o gabinete mais investiu?', query: 'Em que obras e áreas temáticas o gabinete mais investiu recursos?' },
    { label: 'Quanto o mandato economizou de cota?', query: 'Quanto o mandato economizou de cota parlamentar este ano?' },
  ];

  const handleChipClick = (chip) => {
    setPromptText(chip.query);
    onAskAI(chip.query);
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    onAskAI(promptText);
  };

  return (
    <div className="portal-home">
      <style jsx>{`
        .portal-home {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
          padding-top: 2.5rem;
        }

        /* HERO TITLE (CLONE EXATO PRINT 2) */
        .hero-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }

        .portal-headline {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #111827;
          margin: 0;
          line-height: 1.25;
        }

        /* COMMAND BOX COM GLOW AZUL CLARO SUAVE (PRINT 2) */
        .command-box-container {
          width: 100%;
          max-width: 740px;
          position: relative;
        }

        .command-box {
          width: 100%;
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid #C7D2FE;
          padding: 1.25rem 1.4rem 0.85rem 1.4rem;
          box-shadow: 0 4px 25px -2px rgba(99, 102, 241, 0.18), 0 0 0 1px rgba(199, 210, 254, 0.5);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-sizing: border-box;
        }

        .command-box:focus-within {
          border-color: #6366F1;
          box-shadow: 0 6px 30px -2px rgba(99, 102, 241, 0.28), 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .prompt-textarea {
          width: 100%;
          background: transparent;
          border: none;
          color: #1F2937;
          font-size: 1rem;
          font-family: inherit;
          resize: none;
          min-height: 52px;
          outline: none;
          line-height: 1.5;
        }

        .prompt-textarea::placeholder {
          color: #6B7280;
        }

        .command-box-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
        }

        .model-selector-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #4B5563;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn-prompt-send {
          background: #0038FF;
          border: none;
          color: #FFFFFF;
          padding: 0.45rem 1.1rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: background 0.2s;
        }

        .btn-prompt-send:hover {
          background: #0028CC;
        }

        /* CHIPS RÁPIDOS ARREDONDADOS (PRINT 2) */
        .chips-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          max-width: 820px;
        }

        .suggestion-chip {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          color: #4B5563;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .suggestion-chip:hover {
          background: #F9FAFB;
          border-color: #6366F1;
          color: #111827;
          transform: translateY(-1px);
        }

        /* BENTO GRID DE 3 CARDS LIMPOS (PRINT 2) */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
        }

        .bento-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 170px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }

        .bento-card:hover {
          border-color: #C7D2FE;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .bento-top-visual {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        /* Card 1: 4 Círculos Creme estilo Print 2 */
        .eixos-circles-row {
          display: flex;
          gap: 10px;
        }
        .mini-eixo-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #F5F2EB;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }

        /* Card 2: Mapa coroplético mini */
        .map-preview-img {
          height: 75px;
          width: 140px;
          background: radial-gradient(circle, #EF4444 20%, #DC2626 40%, #B91C1C 70%);
          border-radius: 10px;
          opacity: 0.85;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 0.8rem;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
        }

        /* Card 3: Mosaico de fotos / candidatos */
        .mosaico-fotos {
          display: flex;
          gap: 4px;
        }
        .mosaico-avatar {
          width: 38px;
          height: 52px;
          border-radius: 6px;
          background: #E5E7EB;
          overflow: hidden;
        }
        .mosaico-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bento-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.25rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .bento-card-desc {
          font-size: 0.78rem;
          color: #6B7280;
          margin: 0;
          line-height: 1.4;
        }

        /* SEÇÃO INFERIOR: CONTEÚDOS ESPECIAIS (PRINT 2) */
        .special-contents-section {
          width: 100%;
          margin-top: 1.5rem;
        }

        .special-contents-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .special-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .link-see-all {
          font-size: 0.8rem;
          color: #0038FF;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .special-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        @media (max-width: 800px) {
          .special-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .special-card {
          height: 110px;
          border-radius: 12px;
          padding: 1rem;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .special-card:hover {
          transform: translateY(-2px);
        }

        .special-card-tag {
          font-size: 0.68rem;
          opacity: 0.85;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .special-card-title {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0.2rem 0 0 0;
        }
      `}</style>

      {/* HERO SECTION COM TÍTULO E COMANDO */}
      <section className="hero-section">
        <h1 className="portal-headline">
          Tudo sobre política e sua cidade. É só perguntar!
        </h1>

        <div className="command-box-container">
          <form className="command-box" onSubmit={handlePromptSubmit}>
            <textarea 
              className="prompt-textarea"
              placeholder="Onde o mandato mais investiu recursos em Taguatinga? Quero reportar um buraco..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePromptSubmit(e);
                }
              }}
            />

            <div className="command-box-footer">
              <div className="model-selector-pill">
                <Sparkles size={12} color="#6366F1" />
                <span>Rápido • Inteligência GabinetAK</span>
                <ChevronDown size={11} />
              </div>

              <button type="submit" className="btn-prompt-send">
                Perguntar
                <ArrowRight size={13} />
              </button>
            </div>
          </form>
        </div>

        {/* CHIPS DE SUGESTÃO */}
        <div className="chips-container">
          {chips.map((chip, idx) => (
            <button 
              key={idx}
              className="suggestion-chip"
              onClick={() => handleChipClick(chip)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* BENTO GRID DE 3 CARDS (CLONE PRINT 2) */}
      <section className="bento-grid">
        {/* CARD 1: TESTE POLÍTICO / EIXOS */}
        <div className="bento-card" onClick={() => onNavigate('eixos')}>
          <div className="bento-top-visual">
            <div className="eixos-circles-row">
              <div className="mini-eixo-circle">⚓</div>
              <div className="mini-eixo-circle">🦅</div>
              <div className="mini-eixo-circle">🐂</div>
              <div className="mini-eixo-circle">🌅</div>
            </div>
          </div>
          <div>
            <h3 className="bento-card-title">
              🧭 Os 12 Eixos do Mandato
            </h3>
            <p className="bento-card-desc">
              Descubra sua posição e fiscalize projetos por área temática
            </p>
          </div>
        </div>

        {/* CARD 2: MAPA DE VOTAÇÃO & DEMANDAS */}
        <div className="bento-card" onClick={() => onNavigate('radar')}>
          <div className="bento-top-visual">
            <div className="map-preview-img">
              DF & Regiões
            </div>
          </div>
          <div>
            <h3 className="bento-card-title">
              🗺️ Mapa de Demandas & Obras
            </h3>
            <p className="bento-card-desc">
              A mancha de pedidos e obras de cada cidade, rua por rua
            </p>
          </div>
        </div>

        {/* CARD 3: VEJA VOTAÇÕES & LEIS */}
        <div className="bento-card" onClick={() => onNavigate('tinder')}>
          <div className="bento-top-visual">
            <div className="mosaico-fotos">
              <div className="mosaico-avatar">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" alt="" />
              </div>
              <div className="mosaico-avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" alt="" />
              </div>
              <div className="mosaico-avatar">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" alt="" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="bento-card-title">
              🗳️ Veja votações e leis
            </h3>
            <p className="bento-card-desc">
              Cada projeto, posição oficial do deputado e voto popular
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO CONTEÚDOS ESPECIAIS (CLONE DA BASE DO PRINT 2) */}
      <section className="special-contents-section">
        <div className="special-contents-header">
          <h3 className="special-title">Conteúdos especiais</h3>
          <span className="link-see-all" onClick={() => onNavigate('relatorio')}>
            Ver todos os relatórios →
          </span>
        </div>

        <div className="special-grid">
          <div 
            className="special-card" 
            style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}
            onClick={() => onNavigate('relatorio')}
          >
            <span className="special-card-tag">Relatório Especial</span>
            <h4 className="special-card-title">Balanço Anual de Emendas</h4>
          </div>

          <div 
            className="special-card" 
            style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
            onClick={() => onNavigate('economometro')}
          >
            <span className="special-card-tag">Transparência</span>
            <h4 className="special-card-title">Economômetro de Cota</h4>
          </div>

          <div 
            className="special-card" 
            style={{ background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}
            onClick={() => onNavigate('radar')}
          >
            <span className="special-card-tag">Cidades DF</span>
            <h4 className="special-card-title">Radar de Taguatinga e Ceilândia</h4>
          </div>

          <div 
            className="special-card" 
            style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
            onClick={() => onNavigate('antes_depois')}
          >
            <span className="special-card-tag">Fiscal da Obra</span>
            <h4 className="special-card-title">Antes & Depois Entregues</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
