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
  FileText,
  Send,
  Vote,
  TrendingUp,
  Award
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
          width: 100%;
          padding-top: 1.5rem;
          box-sizing: border-box;
        }

        /* HERO COM GLOW SUAVE ATRÁS (PRINT 1 HUBPOLÍTICO) */
        .hero-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          padding: 2.5rem 1rem 1.5rem 1rem;
          background: radial-gradient(circle at 50% 35%, rgba(224, 231, 255, 0.6) 0%, rgba(238, 242, 255, 0.25) 50%, transparent 80%);
          border-radius: 24px;
        }

        .portal-headline {
          font-size: 2.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .portal-headline {
            font-size: 1.75rem;
          }
        }

        /* COMMAND BOX COM BORDA LILÁS/AZUL CLARO SUAVE (PRINT 1 HUBPOLÍTICO) */
        .command-box-container {
          width: 100%;
          max-width: 760px;
          position: relative;
        }

        .command-box {
          width: 100%;
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #C7D2FE;
          padding: 1.25rem 1.4rem 0.85rem 1.4rem;
          box-shadow: 0 8px 30px -4px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(199, 210, 254, 0.4);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-sizing: border-box;
        }

        .command-box:focus-within {
          border-color: #6366F1;
          box-shadow: 0 10px 35px -2px rgba(99, 102, 241, 0.25), 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .prompt-textarea {
          width: 100%;
          background: transparent;
          border: none;
          color: #1F2937;
          font-size: 1.02rem;
          font-family: inherit;
          resize: none;
          min-height: 52px;
          outline: none;
          line-height: 1.5;
        }

        .prompt-textarea::placeholder {
          color: #9CA3AF;
        }

        .command-box-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .model-selector-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #4B5563;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          cursor: pointer;
          user-select: none;
        }

        .model-selector-pill:hover {
          background: #F3F4F6;
          border-color: #D1D5DB;
        }

        .btn-prompt-send {
          background: #0038FF;
          border: none;
          color: #FFFFFF;
          padding: 0.45rem 1.15rem;
          border-radius: 8px;
          font-size: 0.85rem;
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

        /* CHIPS RÁPIDOS ARREDONDADOS (PRINT 1) */
        .chips-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          max-width: 840px;
        }

        .suggestion-chip {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          color: #4B5563;
          padding: 0.5rem 1.1rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .suggestion-chip:hover {
          background: #F9FAFB;
          border-color: #A5B4FC;
          color: #111827;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);
        }

        /* BENTO GRID DE 3 CARDS LIMPOS (PRINT 1 HUBPOLÍTICO) */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
          max-width: 1040px;
          margin-top: 2rem;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
        }

        .bento-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 18px;
          padding: 1.35rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
        }

        .bento-card:hover {
          border-color: #C7D2FE;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
        }

        .bento-top-visual {
          height: 85px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        /* Card 1: 4 Círculos Bege dos Eixos */
        .eixos-circles-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
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
          border: 1px solid #EAE5D9;
        }

        /* Card 2: Mapa coroplético regional estilizado */
        .map-preview-img {
          height: 75px;
          width: 140px;
          background: radial-gradient(circle, #EF4444 20%, #DC2626 50%, #991B1B 80%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.8rem;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
          letter-spacing: 0.02em;
        }

        /* Card 3: Mosaico de fotos reais */
        .mosaico-fotos {
          display: flex;
          gap: 6px;
        }
        .mosaico-avatar {
          width: 42px;
          height: 54px;
          border-radius: 8px;
          background: #E5E7EB;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .mosaico-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bento-card-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.3rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .bento-card-desc {
          font-size: 0.8rem;
          color: #6B7280;
          margin: 0;
          line-height: 1.4;
        }

        /* SEÇÃO INFERIOR: CONTEÚDOS ESPECIAIS (PRINT 1 HUBPOLÍTICO) */
        .special-contents-section {
          width: 100%;
          max-width: 1040px;
          margin-top: 2.5rem;
          box-sizing: border-box;
        }

        .special-contents-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .special-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .link-see-all {
          font-size: 0.82rem;
          color: #0038FF;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .link-see-all:hover {
          text-decoration: underline;
        }

        .special-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.1rem;
          width: 100%;
        }

        @media (max-width: 850px) {
          .special-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .special-card {
          height: 115px;
          border-radius: 14px;
          padding: 1.1rem;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        }

        .special-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .special-card-tag {
          font-size: 0.68rem;
          opacity: 0.85;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        .special-card-title {
          font-size: 0.92rem;
          font-weight: 700;
          margin: 0.25rem 0 0 0;
          line-height: 1.25;
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
                <Sparkles size={13} color="#6366F1" />
                <span>Rápido · Inteligência GabinetAK</span>
                <ChevronDown size={12} color="#9CA3AF" />
              </div>

              <button type="submit" className="btn-prompt-send">
                <span>Perguntar</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>

        {/* CHIPS RÁPIDOS ARREDONDADOS (PRINT 1) */}
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

      {/* BENTO GRID 3 CARDS LADO A LADO (PRINT 1 HUBPOLÍTICO) */}
      <section className="bento-grid">
        {/* Card 1: Eixos do Mandato */}
        <div className="bento-card" onClick={() => onNavigate('eixos')}>
          <div className="bento-top-visual">
            <div className="eixos-circles-row">
              <div className="mini-eixo-circle" title="Infraestrutura">⚓</div>
              <div className="mini-eixo-circle" title="Educação">🏗️</div>
              <div className="mini-eixo-circle" title="Desenvolvimento">🐂</div>
              <div className="mini-eixo-circle" title="Social">🌅</div>
            </div>
          </div>
          <div>
            <h3 className="bento-card-title">
              <Compass size={16} color="#0038FF" />
              Os 12 Eixos do Mandato
            </h3>
            <p className="bento-card-desc">
              Descubra sua posição e fiscalize projetos por área temática
            </p>
          </div>
        </div>

        {/* Card 2: Mapa de Votos & Demandas */}
        <div className="bento-card" onClick={() => onNavigate('radar')}>
          <div className="bento-top-visual">
            <div className="map-preview-img">
              DF & Regiões
            </div>
          </div>
          <div>
            <h3 className="bento-card-title">
              <MapPin size={16} color="#0038FF" />
              Mapa de Demandas & Obras
            </h3>
            <p className="bento-card-desc">
              A mancha de pedidos e obras de cada cidade, rua por rua
            </p>
          </div>
        </div>

        {/* Card 3: Votações & Leis */}
        <div className="bento-card" onClick={() => onNavigate('tinder')}>
          <div className="bento-top-visual">
            <div className="mosaico-fotos">
              <div className="mosaico-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
                  alt="Parlamentar"
                />
              </div>
              <div className="mosaico-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" 
                  alt="Parlamentar"
                />
              </div>
              <div className="mosaico-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" 
                  alt="Parlamentar"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="bento-card-title">
              <Vote size={16} color="#0038FF" />
              Veja votações e leis
            </h3>
            <p className="bento-card-desc">
              Cada projeto, posição oficial do deputado e voto popular
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO INFERIOR: CONTEÚDOS ESPECIAIS (PRINT 1 HUBPOLÍTICO) */}
      <section className="special-contents-section">
        <div className="special-contents-header">
          <h2 className="special-title">Conteúdos especiais</h2>
          <a className="link-see-all" onClick={() => onNavigate('relatorio')}>
            Ver todos os relatórios →
          </a>
        </div>

        <div className="special-grid">
          <div 
            className="special-card" 
            style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
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
