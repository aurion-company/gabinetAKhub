'use client';
import { useState } from 'react';
import { 
  Plus, 
  Map, 
  Vote, 
  FileText, 
  Radio, 
  Calendar, 
  Compass, 
  Search, 
  Send, 
  SearchCheck, 
  ShieldCheck, 
  MessageSquare, 
  Menu, 
  X,
  ExternalLink,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  BarChart3,
  Flame,
  Moon,
  MessageCircle
} from 'lucide-react';
import PortalHome from './PortalHome';
import PortalRadar from './PortalRadar';
import PortalRelatorioDiario from './PortalRelatorioDiario';
import PortalEixos from './PortalEixos';
import TinderLegislativo from './features/TinderLegislativo';
import PizzaTracker from './features/PizzaTracker';
import Economometro from './features/Economometro';
import AntesDepoisSlider from './features/AntesDepoisSlider';
import NewDemandModal from './modals/NewDemandModal';
import TrackProtocolModal from './modals/TrackProtocolModal';
import CitizenAIChatDrawer from './drawers/CitizenAIChatDrawer';
import AlertaBairroWhatsApp from './features/AlertaBairroWhatsApp';

export default function CitizenAppShell() {
  const [currentTab, setCurrentTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Todas as Cidades');
  
  // Modais e Drawers
  const [isNewDemandOpen, setIsNewDemandOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [initialAIQuery, setInitialAIQuery] = useState('');

  // Itens exatamente no estilo visual limpo do HubPolítico (Print 2)
  const menuItems = [
    { id: 'home', label: 'Nova conversa', icon: Plus, isAction: true },
    { id: 'radar', label: 'Mapa de votos & demandas', icon: Map },
    { id: 'relatorio', label: 'Apuração & Diário', icon: BarChart3 },
    { id: 'inteligencia', label: 'Inteligência do Mandato', icon: Sparkles },
    { id: 'tinder', label: 'Legislativo & Votações', icon: Vote },
    { id: 'eixos', label: 'Os 12 Eixos do Mandato', icon: Compass },
    { id: 'rastreador', label: 'Rastrear Demandas', icon: SearchCheck },
    { id: 'economometro', label: 'Economômetro', icon: TrendingUp },
    { id: 'antes_depois', label: 'Antes & Depois', icon: Award },
    { id: 'buscar', label: 'Buscar', icon: Search, shortcut: 'Ctrl K' },
  ];

  const handleOpenAIWithPrompt = (prompt) => {
    setInitialAIQuery(prompt);
    setIsAIDrawerOpen(true);
  };

  return (
    <div className="citizen-app-shell">
      <style jsx global>{`
        body {
          background-color: #FFFFFF !important;
          color: #111827 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .citizen-app-shell {
          display: flex;
          min-height: 100vh;
          background: #FFFFFF;
          position: relative;
        }

        /* SIDEBAR BRANCA LIMPA FIXA (CLONE EXATO PRINT 2) */
        .citizen-sidebar {
          width: 240px;
          background: #FFFFFF;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 900px) {
          .citizen-sidebar {
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
          }
          .citizen-sidebar.open {
            transform: translateX(0);
          }
        }

        .sidebar-brand {
          padding: 1.5rem 1.4rem 1rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }

        .brand-logo-img {
          height: 32px;
          object-fit: contain;
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          color: #4B5563;
          font-size: 0.88rem;
          font-weight: 500;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          width: 100%;
        }

        .sidebar-item:hover {
          background: #F3F4F6;
          color: #111827;
        }

        .sidebar-item.active {
          background: #EEF2FF;
          color: #1D4ED8;
          font-weight: 600;
        }

        .sidebar-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .item-shortcut {
          font-size: 0.7rem;
          color: #9CA3AF;
          background: #F3F4F6;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          border: 1px solid #E5E7EB;
        }

        /* RODAPÉ DA SIDEBAR (ESTILO PRINT 2) */
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: #FFFFFF;
        }

        .btn-sidebar-primary {
          background: #0038FF;
          color: #FFFFFF;
          border: none;
          padding: 0.65rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          transition: background 0.2s;
        }

        .btn-sidebar-primary:hover {
          background: #0028CC;
        }

        .btn-sidebar-secondary {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          color: #374151;
          padding: 0.55rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }

        .btn-sidebar-secondary:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }

        .sidebar-footer-links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          font-size: 0.8rem;
          color: #6B7280;
        }

        .link-entrar {
          color: #6B7280;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .link-entrar:hover {
          color: #111827;
        }

        /* ÁREA PRINCIPAL LIMPA BRANCA (CANVAS) */
        .citizen-main {
          flex: 1;
          margin-left: 240px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #FFFFFF;
          position: relative;
        }

        @media (max-width: 900px) {
          .citizen-main {
            margin-left: 0;
          }
        }

        /* TOPBAR DIREITA COM BOTÕES PILULA (PRINT 2) */
        .citizen-topbar {
          height: 64px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle-btn {
          display: none;
          background: #F3F4F6;
          border: 1px solid #E5E7EB;
          color: #111827;
          padding: 0.45rem;
          border-radius: 8px;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .menu-toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-left: auto;
        }

        .btn-top-outline {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          color: #374151;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-top-outline:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }

        .btn-top-primary {
          background: #0038FF;
          color: #FFFFFF;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 2px 10px rgba(0, 56, 255, 0.25);
        }

        .btn-top-primary:hover {
          background: #0028CC;
        }

        /* CONTAINER CENTRALIZADO */
        .portal-viewport {
          flex: 1;
          width: 100%;
          max-width: 1040px;
          margin: 0 auto;
          padding: 1.5rem 2rem 4rem 2rem;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .portal-viewport {
            padding: 1rem 1.25rem;
          }
        }

        /* BOTÃO FEEDBACK FLUTUANTE INFERIOR ESQUERDO (PRINT 2) */
        .btn-floating-feedback {
          position: fixed;
          bottom: 24px;
          left: 260px;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          color: #4B5563;
          border-radius: 999px;
          padding: 0.45rem 0.95rem;
          font-size: 0.8rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          z-index: 40;
          transition: all 0.2s;
        }

        @media (max-width: 900px) {
          .btn-floating-feedback {
            left: 20px;
          }
        }

        .btn-floating-feedback:hover {
          background: #F9FAFB;
          color: #111827;
        }

        /* BACKDROP MOBILE */
        .sidebar-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          z-index: 49;
        }

        @media (max-width: 900px) {
          .sidebar-backdrop.open {
            display: block;
          }
        }
      `}</style>

      {/* BACKDROP MOBILE */}
      <div 
        className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* SIDEBAR FIXA BRANCA */}
      <aside className={`citizen-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <a href="/" className="brand-logo-wrap">
            <img 
              src="/logo/logo-color.svg" 
              alt="GabinetAK HUB" 
              className="brand-logo-img" 
            />
          </a>
          <button 
            className="menu-toggle-btn"
            style={{ display: sidebarOpen ? 'flex' : 'none' }}
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (item.id === 'buscar') {
                    setIsTrackOpen(true);
                  } else if (item.id === 'inteligencia') {
                    setIsAIDrawerOpen(true);
                  } else {
                    setCurrentTab(item.id);
                  }
                  setSidebarOpen(false);
                }}
              >
                <div className="sidebar-item-content">
                  <Icon size={17} color={isActive ? '#1D4ED8' : '#6B7280'} />
                  <span>{item.label}</span>
                </div>
                {item.shortcut && <span className="item-shortcut">{item.shortcut}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="btn-sidebar-primary"
            onClick={() => setIsNewDemandOpen(true)}
          >
            Registrar Demanda
          </button>

          <button 
            className="btn-sidebar-secondary"
            onClick={() => setIsTrackOpen(true)}
          >
            Consultar Protocolo
          </button>

          <div className="sidebar-footer-links">
            <a href="/acessar" className="link-entrar">
              Entrar
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button 
                onClick={() => setIsAlertOpen(true)}
                style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '0.8rem' }}
                title="Alertas no WhatsApp"
              >
                🔔
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="citizen-main">
        {/* TOPBAR DIREITA */}
        <header className="citizen-topbar">
          <div className="topbar-left">
            <button 
              className="menu-toggle-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="topbar-right">
            <button 
              className="btn-top-outline"
              onClick={() => setCurrentTab('relatorio')}
            >
              Conheça o Mandato
            </button>
            <button 
              className="btn-top-primary"
              onClick={() => setIsNewDemandOpen(true)}
            >
              Enviar Demanda
            </button>
          </div>
        </header>

        {/* VIEWPORT DINÂMICO */}
        <div className="portal-viewport">
          {currentTab === 'home' && (
            <PortalHome 
              onOpenDemandModal={() => setIsNewDemandOpen(true)}
              onOpenTrackModal={() => setIsTrackOpen(true)}
              onNavigate={(tab) => setCurrentTab(tab)}
              onAskAI={handleOpenAIWithPrompt}
              selectedCity={selectedCity}
            />
          )}

          {currentTab === 'radar' && (
            <PortalRadar 
              selectedCity={selectedCity}
              onOpenDemandModal={() => setIsNewDemandOpen(true)}
            />
          )}

          {currentTab === 'relatorio' && (
            <PortalRelatorioDiario 
              selectedCity={selectedCity}
            />
          )}

          {currentTab === 'eixos' && (
            <PortalEixos 
              onSelectEixo={(eixo) => {
                handleOpenAIWithPrompt(`Quais são os projetos e emendas do mandato na área de ${eixo.nome}?`);
              }}
            />
          )}

          {currentTab === 'tinder' && (
            <TinderLegislativo />
          )}

          {currentTab === 'rastreador' && (
            <PizzaTracker />
          )}

          {currentTab === 'economometro' && (
            <Economometro />
          )}

          {currentTab === 'antes_depois' && (
            <AntesDepoisSlider />
          )}
        </div>
      </main>

      {/* BOTÃO FLUTUANTE FEEDBACK ESTILO PRINT 2 */}
      <button 
        className="btn-floating-feedback"
        onClick={() => setIsAIDrawerOpen(true)}
      >
        <MessageCircle size={14} color="#6B7280" />
        Feedback / Dúvidas
      </button>

      {/* MODAIS & DRAWERS */}
      <NewDemandModal 
        isOpen={isNewDemandOpen}
        onClose={() => setIsNewDemandOpen(false)}
        selectedCity={selectedCity}
      />

      <TrackProtocolModal 
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />

      <CitizenAIChatDrawer 
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        initialPrompt={initialAIQuery}
      />

      <AlertaBairroWhatsApp 
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      />
    </div>
  );
}
