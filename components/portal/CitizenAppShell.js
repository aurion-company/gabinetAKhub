'use client';
import { useState, useEffect } from 'react';
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
  MessageCircle,
  User,
  Clock
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
  const [chatHistory, setChatHistory] = useState([]);
  
  // Modais e Drawers
  const [isNewDemandOpen, setIsNewDemandOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [initialAIQuery, setInitialAIQuery] = useState('');

  const [citizenUser, setCitizenUser] = useState(null);

  // Carrega usuário cidadão cadastrado e histórico de conversas (Print 2)
  useEffect(() => {
    try {
      const storedCitizen = localStorage.getItem('gabinetak_citizen_user');
      if (storedCitizen) {
        setCitizenUser(JSON.parse(storedCitizen));
      }
      const saved = localStorage.getItem('gabinetak_user_conversations');
      if (saved) {
        setChatHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Erro ao carregar histórico local:', e);
    }
  }, [isAIDrawerOpen]);

  const handleCitizenLogout = () => {
    try {
      localStorage.removeItem('gabinetak_citizen_user');
      setCitizenUser(null);
    } catch (e) {}
  };

  // Itens em UMA LINHA SÓ (Print 1) com tipografia bold e labels limpos
  const menuItems = [
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
    
    // Salva no histórico se for pergunta real
    if (prompt && prompt !== 'Nova conversa') {
      try {
        const item = { id: Date.now(), title: prompt.slice(0, 42), time: 'Hoje' };
        const updated = [item, ...chatHistory.filter(c => c.title !== item.title)].slice(0, 10);
        setChatHistory(updated);
        localStorage.setItem('gabinetak_user_conversations', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  return (
    <div className="citizen-app-shell">
      <style jsx global>{`
        body {
          background-color: #FFFFFF !important;
          color: #0F172A !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .citizen-app-shell {
          display: flex;
          width: 100vw;
          min-height: 100vh;
          background: #FFFFFF;
          position: relative;
          box-sizing: border-box;
        }

        /* SIDEBAR BRANCA LIMPA FIXA (260px PARA FONTE EM UMA LINHA SÓ) */
        .citizen-sidebar {
          width: 260px;
          min-width: 260px;
          background: #FFFFFF;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          box-sizing: border-box;
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
          padding: 1.25rem 1.25rem 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #F1F5F9;
        }

        .brand-logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
        }

        .brand-icon-box {
          width: 32px;
          height: 32px;
          background: #0038FF;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 56, 255, 0.25);
          overflow: hidden;
          flex-shrink: 0;
        }

        .brand-icon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand-text-wrap {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .brand-name {
          font-size: 1.22rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0F172A;
          line-height: 1;
        }

        .brand-name-accent {
          font-weight: 900;
          color: #0038FF;
        }

        .brand-hub-badge {
          font-size: 0.62rem;
          font-weight: 900;
          background: #EEF2FF;
          color: #0038FF;
          padding: 2px 5px;
          border-radius: 4px;
          letter-spacing: 0.06em;
          line-height: 1;
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.75rem 0.65rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        /* BOTÃO NOVA CONVERSA NO TOPO */
        .btn-new-conversation {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          background: #EEF2FF;
          color: #0038FF;
          font-size: 0.9rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          width: 100%;
          margin-bottom: 0.75rem;
          transition: background 0.15s;
          white-space: nowrap;
        }

        .btn-new-conversation:hover {
          background: #E0E7FF;
        }

        /* CARD DE HISTÓRICO DE CONVERSAS (PRINT 2) */
        .chat-history-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 0.75rem 0.85rem;
          margin-bottom: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }

        .chat-pill-header {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #EEF2FF;
          color: #0038FF;
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          width: fit-content;
        }

        .chat-history-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.2rem 0.1rem;
        }

        .chat-history-title {
          font-size: 0.86rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
        }

        .link-history-more {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748B;
          text-decoration: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .link-history-more:hover {
          color: #0038FF;
        }

        .history-empty-text {
          font-size: 0.82rem;
          color: #64748B;
          text-align: center;
          padding: 1.25rem 0.5rem;
          margin: 0;
          font-weight: 500;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          max-height: 140px;
          overflow-y: auto;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.5rem;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: #334155;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: background 0.15s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .history-item:hover {
          background: #F8FAFC;
          color: #0038FF;
        }

        .history-footer-link {
          border-top: 1px solid #F1F5F9;
          padding-top: 0.5rem;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          transition: color 0.15s;
        }

        .history-footer-link:hover {
          color: #0F172A;
        }

        /* ITENS DA BARRA LATERAL EM UMA LINHA SÓ (PRINT 1) */
        .sidebar-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.52rem 0.72rem;
          border-radius: 8px;
          color: #0F172A;
          font-size: 0.84rem;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          width: 100%;
          letter-spacing: -0.015em;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .sidebar-item:hover {
          background: #F1F5F9;
          color: #000000;
          font-weight: 800;
        }

        .sidebar-item.active {
          background: #EEF2FF;
          color: #0038FF;
          font-weight: 800;
        }

        .sidebar-item-content {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-item-content span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #0F172A;
        }

        .item-shortcut {
          font-size: 0.68rem;
          font-weight: 600;
          color: #64748B;
          background: #F1F5F9;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          border: 1px solid #E2E8F0;
          flex-shrink: 0;
        }

        /* RODAPÉ DA SIDEBAR */
        .sidebar-footer {
          padding: 1.1rem;
          border-top: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          background: #FFFFFF;
        }

        .btn-sidebar-primary {
          background: #0038FF;
          color: #FFFFFF;
          border: none;
          padding: 0.7rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          letter-spacing: -0.01em;
          transition: background 0.2s;
          box-shadow: 0 2px 8px rgba(0, 56, 255, 0.2);
          white-space: nowrap;
        }

        .btn-sidebar-primary:hover {
          background: #0028CC;
        }

        .btn-sidebar-secondary {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          color: #0F172A;
          padding: 0.65rem;
          border-radius: 8px;
          font-size: 0.86rem;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          letter-spacing: -0.01em;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .btn-sidebar-secondary:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .sidebar-footer-links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          font-size: 0.82rem;
          color: #475569;
        }

        .link-entrar {
          color: #334155;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.15s;
        }

        .link-entrar:hover {
          color: #000000;
        }

        /* ÁREA PRINCIPAL LIMPA BRANCA (CANVAS 100% LARGURA) */
        .citizen-main {
          flex: 1;
          width: calc(100vw - 260px);
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #FFFFFF;
          position: relative;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        @media (max-width: 900px) {
          .citizen-main {
            width: 100vw;
            margin-left: 0;
          }
        }

        /* TOPBAR DIREITA COM BOTÕES PÍLULA BOLD */
        .citizen-topbar {
          height: 68px;
          width: 100%;
          padding: 0 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          box-sizing: border-box;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle-btn {
          display: none;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #0F172A;
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
          gap: 0.85rem;
          margin-left: auto;
        }

        .btn-top-outline {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          color: #0F172A;
          padding: 0.55rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: -0.01em;
          transition: all 0.2s;
        }

        .btn-top-outline:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .btn-top-primary {
          background: #0038FF;
          color: #FFFFFF;
          border: none;
          padding: 0.55rem 1.4rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: -0.01em;
          transition: background 0.2s;
          box-shadow: 0 2px 10px rgba(0, 56, 255, 0.25);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .btn-top-primary:hover {
          background: #0028CC;
        }

        /* CONTAINER CENTRALIZADO */
        .portal-viewport {
          flex: 1;
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 1rem 2.5rem 5rem 2.5rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .portal-viewport {
            padding: 1rem 1.25rem 4rem 1.25rem;
          }
        }

        /* BOTÃO FEEDBACK FLUTUANTE DISCRETO BOLD */
        .btn-floating-feedback {
          position: fixed;
          bottom: 20px;
          left: 280px;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          color: #1E293B;
          border-radius: 9999px;
          padding: 0.45rem 0.95rem;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          z-index: 40;
          transition: all 0.2s;
        }

        @media (max-width: 900px) {
          .btn-floating-feedback {
            left: 16px;
          }
        }

        .btn-floating-feedback:hover {
          background: #F8FAFC;
          color: #000000;
          border-color: #CBD5E1;
        }

        /* BACKDROP MOBILE */
        .sidebar-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 45;
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

      {/* SIDEBAR FIXA LIMPA (260px - EM UMA LINHA SÓ) */}
      <aside className={`citizen-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <a href="/" className="brand-logo-wrap">
            <div className="brand-icon-box" style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, maxWidth: 32, maxHeight: 32, overflow: 'hidden', flexShrink: 0 }}>
              <img 
                src="/logo/icon.svg" 
                alt="GabinetAK" 
                width="32"
                height="32"
                style={{ width: '32px', height: '32px', maxWidth: '32px', maxHeight: '32px', objectFit: 'cover', display: 'block' }}
                className="brand-icon-img"
              />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">
                gabinet<span className="brand-name-accent">ak</span>
              </span>
              <span className="brand-hub-badge">HUB</span>
            </div>
          </a>
        </div>

        <nav className="sidebar-nav">
          {/* BOTÃO NOVA CONVERSA */}
          <button 
            className="btn-new-conversation"
            onClick={() => {
              setCurrentTab('home');
              handleOpenAIWithPrompt('');
              setSidebarOpen(false);
            }}
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Nova conversa</span>
          </button>

          {/* PAINEL DE HISTÓRICO DE CONVERSAS (PRINT 2 - EXCLUSIVO PARA USUÁRIOS CADASTRADOS) */}
          {citizenUser && (
            <div className="chat-history-card">
              <div className="chat-pill-header">
                <MessageCircle size={15} />
                <span>Chat</span>
              </div>

              <div className="chat-history-section-header">
                <span className="chat-history-title">Conversas</span>
                <span 
                  className="link-history-more"
                  onClick={() => handleOpenAIWithPrompt('Histórico completo de consultas')}
                >
                  Ver mais &gt;
                </span>
              </div>

              {chatHistory.length === 0 ? (
                <p className="history-empty-text">Nenhuma conversa ainda</p>
              ) : (
                <div className="history-list">
                  {chatHistory.map((chat) => (
                    <button 
                      key={chat.id} 
                      className="history-item"
                      onClick={() => handleOpenAIWithPrompt(chat.title)}
                    >
                      <MessageSquare size={13} color="#0038FF" />
                      <span>{chat.title}</span>
                    </button>
                  ))}
                </div>
              )}

              <div 
                className="history-footer-link"
                onClick={() => handleOpenAIWithPrompt('Ver todas as conversas anteriores')}
              >
                Ver todas as conversas
              </div>
            </div>
          )}

          {/* ITENS DO MENU EM UMA LINHA SÓ (PRINT 1) */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (item.id === 'buscar') {
                    handleOpenAIWithPrompt('Buscar leis, emendas e demandas');
                  } else {
                    setCurrentTab(item.id);
                  }
                  setSidebarOpen(false);
                }}
              >
                <div className="sidebar-item-content">
                  <Icon 
                    size={17} 
                    strokeWidth={isActive ? 2.5 : 2.2} 
                    color={isActive ? '#0038FF' : '#1E293B'} 
                  />
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="item-shortcut">{item.shortcut}</span>
                )}
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

          {/* RODAPÉ DO PRINT 1: Entrar à esquerda, Alternar tema à direita */}
          <div className="sidebar-footer-links">
            {citizenUser ? (
              <button 
                onClick={handleCitizenLogout}
                className="link-entrar"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                title="Sair da conta"
              >
                Sair ({citizenUser.name.split(' ')[0]})
              </button>
            ) : (
              <a href="/acessar" className="link-entrar">
                Entrar
              </a>
            )}
            <button 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              title="Alternar Tema"
            >
              <Moon size={16} />
            </button>
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
              aria-label="Abrir Menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="topbar-right">
            <button 
              className="btn-top-outline"
              onClick={() => setCurrentTab('eixos')}
            >
              Conheça o GabinetAK
            </button>
            {citizenUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', background: '#F1F5F9', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid #E2E8F0' }}>
                  Olá, {citizenUser.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <a 
                href="/cadastro" 
                className="btn-top-primary"
              >
                Criar conta
              </a>
            )}
          </div>
        </header>

        {/* VIEWPORT DINÂMICO CONFORME ABA SELECIONADA */}
        <div className="portal-viewport">
          {currentTab === 'home' && (
            <PortalHome 
              onOpenDemandModal={() => setIsNewDemandOpen(true)}
              onOpenTrackModal={() => setIsTrackOpen(true)}
              onNavigate={(tab) => setCurrentTab(tab)}
              onAskAI={(query) => handleOpenAIWithPrompt(query)}
              selectedCity={selectedCity}
            />
          )}

          {currentTab === 'radar' && (
            <PortalRadar 
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              onOpenNewDemand={() => setIsNewDemandOpen(true)}
              onOpenTrack={() => setIsTrackOpen(true)}
            />
          )}

          {currentTab === 'relatorio' && (
            <PortalRelatorioDiario 
              onOpenDemandModal={() => setIsNewDemandOpen(true)}
            />
          )}

          {currentTab === 'inteligencia' && (
            <CitizenAIChatDrawer 
              isOpen={true} 
              onClose={() => setCurrentTab('home')} 
              initialQuery={initialAIQuery || 'Como o gabinete pode me ajudar hoje?'} 
            />
          )}

          {currentTab === 'tinder' && (
            <TinderLegislativo />
          )}

          {currentTab === 'eixos' && (
            <PortalEixos onSelectAxis={(axis) => {
              handleOpenAIWithPrompt(`Quais são os projetos e propostas do mandato para o eixo de ${axis}?`);
            }} />
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

        {/* BOTÃO FEEDBACK FLUTUANTE DISCRETO */}
        <button 
          className="btn-floating-feedback"
          onClick={() => handleOpenAIWithPrompt('Gostaria de deixar um feedback sobre a plataforma')}
        >
          <MessageCircle size={15} color="#1E293B" />
          <span>Feedback</span>
        </button>
      </main>

      {/* MODAIS E DRAWERS */}
      <NewDemandModal 
        isOpen={isNewDemandOpen}
        onClose={() => setIsNewDemandOpen(false)}
        defaultCity={selectedCity}
      />

      <TrackProtocolModal 
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />

      <CitizenAIChatDrawer 
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        initialQuery={initialAIQuery}
      />

      <AlertaBairroWhatsApp 
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        selectedCity={selectedCity}
      />
    </div>
  );
}
