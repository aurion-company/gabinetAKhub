'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import AgendaWA from '../../components/modules/AgendaWA';
import DocumentosOficios from '../../components/modules/DocumentosOficios';
import AssistenteIA from '../../components/modules/AssistenteIA';
import GestaoUsuarios from '../../components/modules/GestaoUsuarios';
import AssinadorDigital from '../../components/modules/AssinadorDigital';
import ConfiguracoesGerais from '../../components/modules/ConfiguracoesGerais';
import KanbanDinamico from '../../components/modules/KanbanDinamico';
import CriadorFormularios from '../../components/modules/CriadorFormularios';
import GeradorDocumentos from '../../components/modules/GeradorDocumentos';
import GestaoDemandas from '../../components/modules/GestaoDemandas';
import GestaoCadastros from '../../components/modules/GestaoCadastros';
import GestaoLinksCurtos from '../../components/modules/GestaoLinksCurtos';
import MeuPerfil from '../../components/modules/MeuPerfil';
import GeradorMolduras from '../../components/modules/GeradorMolduras';
import GeradorEtiquetas from '../../components/modules/GeradorEtiquetas';
import GestaoTiposDocumentos from '../../components/modules/GestaoTiposDocumentos';
import GestaoDocumentosRecebidos from '../../components/modules/GestaoDocumentosRecebidos';
import GestaoDocLista from '../../components/modules/GestaoDocLista';
import AgenteIAModular from '../../components/modules/AgenteIAModular';
import GestaoLegislativo from '../../components/modules/GestaoLegislativo';
import LogsAuditoria from '../../components/modules/LogsAuditoria';
import PainelArrecadacao from '../../components/modules/PainelArrecadacao';
import MasterAdmin from '../../components/modules/MasterAdmin';
import AtendimentoProtocolo from '../../components/modules/AtendimentoProtocolo';
import SiteInstitucional from '../../components/modules/SiteInstitucional';
import GestaoFaturas from '../../components/modules/GestaoFaturas';

// Importação Dinâmica sob Demanda (Code Splitting) para Módulos Pesados
const GeradorQRCode = dynamic(() => import('../../components/modules/GeradorQRCode'), { ssr: false });
const RelatoriosBI = dynamic(() => import('../../components/modules/RelatoriosBI'), { ssr: false });
const GestaoPaginasBio = dynamic(() => import('../../components/modules/GestaoPaginasBio'), { ssr: false });
const IntegracaoMetaAds = dynamic(() => import('../../components/modules/IntegracaoMetaAds'), { ssr: false });
const Geomapeamento = dynamic(() => import('../../components/modules/Geomapeamento'), { ssr: false });
const CampanhasEmail = dynamic(() => import('../../components/modules/CampanhasEmail'), { ssr: false });
const CentralWhatsApp = dynamic(() => import('../../components/modules/CentralWhatsApp'), { ssr: false });
const CampanhasSMS = dynamic(() => import('../../components/modules/CampanhasSMS'), { ssr: false });
const AutomacaoN8N = dynamic(() => import('../../components/modules/AutomacaoN8N'), { ssr: false });

import { 
  Menu, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Home, Users, ClipboardList, Kanban, Inbox, CalendarDays, CheckSquare, FileText,
  MessageCircle, Target, Mail, Megaphone, FileSignature, Map, MapPin, Sparkles, Bell,
  Network, LineChart, Zap, HandCoins, Scale, Landmark, ShieldCheck, Wrench, Key, Settings, Crown, Search,
  LayoutDashboard, Coins, PenTool, LayoutTemplate, BoxSelect, UsersRound, Fingerprint, PieChart, Focus, Briefcase, FileSearch, HelpCircle, FileClock, Info, LayoutList, CheckCircle2, TrendingUp, UserCheck, Share2, Smartphone, Rss, BookOpen, ScrollText, Banknote, Vote, Goal, Tags, Contact, FileBox, Mails, FileBadge2, Cpu, Activity, BarChart3, Medal, QrCode, PenLine, Link, UserCog, LogOut, User, Camera, X, Pin, Calendar, Phone, Cake, Lock
} from 'lucide-react';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      if (pageParam && pageParam !== 'logout') return pageParam;
      const saved = localStorage.getItem('GabinetAK_active_page');
      if (saved && saved !== 'logout') return saved;
    }
    return 'home';
  });

  const [collapsedCategories, setCollapsedCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('GabinetAK_collapsed_cats');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  const toggleCategory = (catName) => {
    setCollapsedCategories(prev => {
      const next = { ...prev, [catName]: !prev[catName] };
      try {
        localStorage.setItem('GabinetAK_collapsed_cats', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };
  const [mounted, setMounted] = useState(false);
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  // Verificação rigorosa de autenticação do Gabinete
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          window.location.href = '/acessar?error=auth_required';
          return;
        }
        setIsAuthVerified(true);
      } catch (e) {
        const hasSession = typeof document !== 'undefined' && document.cookie.includes('gp360_session');
        if (!hasSession && process.env.NODE_ENV === 'production') {
          window.location.href = '/acessar?error=auth_required';
          return;
        }
        setIsAuthVerified(true);
      }
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
    } catch (e) {
      console.error('Erro ao encerrar sessão:', e);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('GabinetAK_active_page');
      window.location.href = '/acessar';
    }
  };

  // Carregar estado salvo apenas no cliente após a hidratação (Evita erro de Hydration do Next.js)
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      const saved = localStorage.getItem('GabinetAK_active_page');
      if (pageParam === 'logout') {
        handleLogout();
        return;
      }
      const targetPage = (pageParam && pageParam !== 'logout') ? pageParam : (saved && saved !== 'logout' ? saved : 'home');
      setActivePage(targetPage);
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get('page') !== targetPage) {
          url.searchParams.set('page', targetPage);
          window.history.replaceState(null, '', url.pathname + url.search);
        }
      } catch (e) {}
    }
  }, []);

  // Salvar no localStorage e atualizar URL ao trocar de página
  useEffect(() => {
    if (mounted && activePage) {
      if (activePage === 'logout') {
        handleLogout();
        return;
      }
      localStorage.setItem('GabinetAK_active_page', activePage);
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get('page') !== activePage) {
          url.searchParams.set('page', activePage);
          window.history.replaceState(null, '', url.pathname + url.search);
        }
      } catch (e) {}

      // Sempre garantir que a categoria da página ativa esteja aberta
      const parentCat = menuCategories.find(c => c.items.some(i => i.id === activePage));
      if (parentCat) {
        setCollapsedCategories(prev => {
          if (prev[parentCat.category]) {
            const next = { ...prev, [parentCat.category]: false };
            try {
              localStorage.setItem('GabinetAK_collapsed_cats', JSON.stringify(next));
            } catch (e) {}
            return next;
          }
          return prev;
        });
      }
    }
  }, [activePage, mounted]);

  const [userPlan, setUserPlan] = useState('enterprise'); // Default: Enterprise (SuperAdmin com acesso total aos módulos)
  const [billingCycle, setBillingCycle] = useState('mensal'); // mensal, trimestral, anual

  // Carregar e ouvir mudanças no Plano do Usuário (Sincronização com Gestão de Faturas)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem('GabinetAK_user_plan');
      if (savedPlan) setUserPlan(savedPlan);
    }
    const handlePlanChange = () => {
      if (typeof window !== 'undefined') {
        const savedPlan = localStorage.getItem('GabinetAK_user_plan');
        if (savedPlan) setUserPlan(savedPlan);
      }
    };
    window.addEventListener('GabinetAK_plan_changed', handlePlanChange);
    return () => window.removeEventListener('GabinetAK_plan_changed', handlePlanChange);
  }, []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [iaContext, setIaContext] = useState('Geral');

  // Dashboard Settings
  const [isEditDashboardOpen, setIsEditDashboardOpen] = useState(false);
  const allDashboardCards = [
    { id: 'eleitores', title: 'Eleitores / Clientes', value: '4.850', sub: '+12% este mês', subColor: 'var(--success)' },
    { id: 'demandas', title: 'Demandas Concluídas', value: '142', sub: 'SLA 98.4%', subColor: 'var(--accent)' },
    { id: 'doacoes', title: 'Arrecadação (PIX)', value: 'R$ 48,5k', sub: 'Transparência', subColor: 'var(--success)' },
    { id: 'whatsapp', title: 'Disparos WhatsApp', value: '18.400', sub: 'Bairro Target', subColor: 'var(--accent-light)' },
    { id: 'engajamento', title: 'Engajamento Meta', value: '4.2%', sub: 'Alta performance', subColor: 'var(--success)' },
    { id: 'aniversariantes', title: 'Aniversariantes do Mês', value: '234', sub: 'Hoje: 12', subColor: 'var(--accent)' },
    { id: 'bairros', title: 'Bairros Mapeados', value: '28', sub: '85% da cidade', subColor: 'var(--text-muted)' },
    { id: 'liderancas', title: 'Lideranças Ativas', value: '54', sub: '+3 esta semana', subColor: 'var(--success)' },
    { id: 'leads', title: 'Novos Leads (Ads)', value: '890', sub: 'Custo R$ 1,12', subColor: 'var(--accent-light)' },
    { id: 'sentimento', title: 'Sentimento IA', value: 'Positivo', sub: '78% aprovação', subColor: 'var(--success)' },
  ];
  const [activeCards, setActiveCards] = useState(['eleitores', 'demandas', 'doacoes', 'whatsapp']);

  const toggleDashboardCard = (id) => {
    setActiveCards(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  // Estado para Módulos (Testes/Toggle)
  const [disabledModules, setDisabledModules] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('GabinetAK_disabled_modules');
    if (saved) setDisabledModules(JSON.parse(saved));
  }, []);

  const openIAWithContext = (contextName) => {
    setIaContext(contextName || menuCategories.flatMap(c => c.items).find(i => i.id === activePage)?.label || 'Geral');
    setIsIAModalOpen(true);
  };
  // Modais e alertas
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [modalFeatureTitle, setModalFeatureTitle] = useState('');

  // Fixed/Pinned Items
  const [pinnedItems, setPinnedItems] = useState([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('GabinetAK_pinned_items');
    if (saved) setPinnedItems(JSON.parse(saved));
  }, []);

  const togglePin = (e, id) => {
    e.stopPropagation();
    let updated;
    if (pinnedItems.includes(id)) {
      updated = pinnedItems.filter(item => item !== id);
    } else {
      updated = [...pinnedItems, id];
    }
    setPinnedItems(updated);
    localStorage.setItem('GabinetAK_pinned_items', JSON.stringify(updated));
  };

  // Estados de Integração Meta & WhatsApp
  const [pixelId, setPixelId] = useState('123456789012345');
  const [capiToken, setCapiToken] = useState('EAAC_meta_capi_token_secret_hetzner_vps');
  const [adAccountId, setAdAccountId] = useState('act_9876543210');
  const [whatsappSender, setWhatsappSender] = useState('+55 (11) 98888-2026');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Centro');
  const [broadcastStatus, setBroadcastStatus] = useState(null);
  const [pixelStatus, setPixelStatus] = useState(null);

  // Estados de IA & Segurança
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);

  // Estados do PAINEL MASTER ADMIN (SaaS Governance)
  const [tenantsList, setTenantsList] = useState([
    { id: 'cab_01', name: 'Mandato Dep. Silva', party: 'PL', state: 'SP', city: 'São Paulo', plan: 'POLITICAL', status: 'Ativo', mrr: 'R$ 3.500', votersCount: 14850 },
    { id: 'cab_02', name: 'Gabinete Ver. Marcos', party: 'MDB', state: 'RJ', city: 'Rio de Janeiro', plan: 'PRO', status: 'Ativo', mrr: 'R$ 1.800', votersCount: 6200 },
    { id: 'cab_03', name: 'Campanha Prefeito Carlos', party: 'PSD', state: 'MG', city: 'Belo Horizonte', plan: 'ENTERPRISE', status: 'Ativo', mrr: 'R$ 8.900', votersCount: 42100 },
    { id: 'cab_04', name: 'CRM Comercial Imóveis', party: 'N/A', state: 'SP', city: 'Campinas', plan: 'BASIC', status: 'Ativo', mrr: 'R$ 790', votersCount: 1200 }
  ]);
  const [selectedTenantPlan, setSelectedTenantPlan] = useState('POLITICAL');
  const [newCabinetName, setNewCabinetName] = useState('');
  const [adminStatusMessage, setAdminStatusMessage] = useState(null);

  // Refs de Animação GSAP
  const pageContainerRef = useRef(null);
  const heroBannerRef = useRef(null);
  const statsGridRef = useRef(null);

  // Animação GSAP na mudança de página
  useEffect(() => {
    if (pageContainerRef.current) {
      gsap.fromTo(
        pageContainerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activePage]);

  // Animação GSAP nos cards da Home
  useEffect(() => {
    if (activePage === 'home') {
      if (heroBannerRef.current) {
        gsap.fromTo(
          heroBannerRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
      if (statsGridRef.current) {
        gsap.fromTo(
          statsGridRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
        );
      }
    }
  }, [activePage]);

  // ESTRUTURA DOS 25+ MDULOS ORGANIZADOS POR CATEGORIAS (ALINHADO COM MD + EXTRAS)
  // ESTRUTURA ORGANIZADA POR TEMAS COM CATEGORIAS RETRÁTEIS E VISÃO EM ÁRVORE
  const menuCategories = [
    {
      category: 'Gestão & Tarefas',
      items: [
        { id: 'dashboard', label: 'Dashboard', minPlan: 'basic', icon: <LayoutDashboard size={18} /> },
        { id: 'demandas', label: 'Demandas', minPlan: 'basic', icon: <ClipboardList size={18} />, badge: '1' },
        { id: 'kanban', label: 'Kanban', minPlan: 'basic', icon: <Kanban size={18} /> },
        { id: 'prod_tarefas', label: 'Tarefas', minPlan: 'basic', icon: <CheckSquare size={18} /> },
        { id: 'agenda_wa', label: 'Agenda', minPlan: 'basic', icon: <CalendarDays size={18} />, badge: '3' },
      ]
    },
    {
      category: 'Visão Geral & Cadastros',
      items: [
        { id: 'home', label: 'Home', minPlan: 'basic', icon: <Home size={18} /> },
        { id: 'cadastros', label: 'Cadastros', minPlan: 'basic', icon: <Users size={18} /> },
        { id: 'grupos_tags', label: 'Grupos (tags)', minPlan: 'basic', icon: <Tags size={18} /> },
        { id: 'rel_ranking', label: 'Rede de Indicações', minPlan: 'political', icon: <Network size={18} /> },
      ]
    },
    {
      category: 'Atendimento & CRM',
      items: [
        { id: 'crm_atendimento', label: 'Central Atendimento', minPlan: 'political', icon: <Contact size={18} /> },
        { id: 'crm_suporte', label: 'Suporte 18h', minPlan: 'political', icon: <HelpCircle size={18} /> },
        { id: 'crm_assuntos', label: 'Assuntos', minPlan: 'political', icon: <Info size={18} /> },
        { id: 'leads', label: 'Leads', minPlan: 'basic', icon: <Target size={18} /> },
      ]
    },
    {
      category: 'Geomapeamento & Território',
      items: [
        { id: 'map_eleitor', label: 'Mapeamento de Eleitor', minPlan: 'political', icon: <MapPin size={18} /> },
        { id: 'geomapeamento', label: 'Geomapeamento', minPlan: 'pro', icon: <Map size={18} /> },
        { id: 'forms', label: 'Formulários', minPlan: 'basic', icon: <FileSignature size={18} /> },
      ]
    },
    {
      category: 'Legislativo & Mandato',
      items: [
        { id: 'leg_pl', label: 'Projetos de Lei', minPlan: 'political', icon: <BookOpen size={18} /> },
        { id: 'leg_emendas', label: 'Emendas', minPlan: 'political', icon: <ScrollText size={18} /> },
        { id: 'leg_verbas', label: 'Verbas Indenizatórias', minPlan: 'political', icon: <Banknote size={18} /> },
        { id: 'leg_resultados', label: 'Resultados das eleições', minPlan: 'political', icon: <Vote size={18} /> },
      ]
    },
    {
      category: 'WhatsApp & Comunicação',
      items: [
        { id: 'whatsapp', label: 'WhatsApp', minPlan: 'political', icon: <Smartphone size={18} /> },
        { id: 'wa_oficial', label: 'WhatsApp Oficial', minPlan: 'political', icon: <MessageCircle size={18} /> },
        { id: 'wa_eleitoral', label: 'Disparo WhatsApp Eleitoral', minPlan: 'political', icon: <Smartphone size={18} /> },
        { id: 'wa_campanha', label: 'WhatsApp para Campanha', minPlan: 'political', icon: <Megaphone size={18} /> },
        { id: 'wa_massa', label: 'WhatsApp Envios (Massa)', minPlan: 'political', icon: <Rss size={18} /> },
        { id: 'wa_auto', label: 'Automação WhatsApp', minPlan: 'pro', icon: <Zap size={18} /> },
        { id: 'ligacoes_auto', label: 'Disparo Ligações Auto.', minPlan: 'enterprise', icon: <Smartphone size={18} /> },
      ]
    },
    {
      category: 'E-mail & SMS',
      items: [
        { id: 'email_envio', label: 'Campanhas de E-mail', minPlan: 'basic', icon: <Mail size={18} /> },
        { id: 'email_mensagens', label: 'Mensagens de E-mails', minPlan: 'basic', icon: <MessageCircle size={18} /> },
        { id: 'email_templates', label: 'Templates de E-mail', minPlan: 'basic', icon: <LayoutTemplate size={18} /> },
        { id: 'ia_mkt', label: 'Studio E-mail com IA', minPlan: 'pro', icon: <Sparkles size={18} /> },
        { id: 'email_provedores', label: 'Provedores de E-mail', minPlan: 'basic', icon: <Settings size={18} /> },
        { id: 'sms_envio', label: 'Campanhas SMS', minPlan: 'pro', icon: <Mail size={18} /> },
        { id: 'sms_mensagens', label: 'Mensagens SMS', minPlan: 'pro', icon: <MessageCircle size={18} /> },
      ]
    },
    {
      category: 'Documentos & Ofícios',
      items: [
        { id: 'doc_lista', label: 'Documentos', minPlan: 'basic', icon: <FileText size={18} /> },
        { id: 'doc_oficios', label: 'Ofícios', minPlan: 'basic', icon: <FileSignature size={18} /> },
        { id: 'doc_memorandos', label: 'Memorandos', minPlan: 'basic', icon: <FileText size={18} /> },
        { id: 'doc_recebidos', label: 'Documentos recebidos', minPlan: 'basic', icon: <Inbox size={18} /> },
        { id: 'doc_templates', label: 'Templates de Documentos', minPlan: 'basic', icon: <LayoutTemplate size={18} /> },
        { id: 'doc_tipos', label: 'Tipos de Documentos', minPlan: 'basic', icon: <FileBox size={18} /> },
        { id: 'doc_etiquetas', label: 'Etiquetas', minPlan: 'basic', icon: <Mails size={18} /> },
      ]
    },
    {
      category: 'Marketing & Campanhas',
      items: [
        { id: 'mkt_molduras', label: 'Gerador de Molduras', minPlan: 'basic', icon: <Camera size={18} /> },
        { id: 'mkt_digital', label: 'Marketing Político Digital', minPlan: 'political', icon: <Megaphone size={18} /> },
        { id: 'mkt_trafego', label: 'Tráfego Pago (Meta Ads)', minPlan: 'pro', icon: <Target size={18} /> },
        { id: 'mkt_gestao', label: 'Gestão de Campanha', minPlan: 'political', icon: <Briefcase size={18} /> },
        { id: 'mkt_fluxos', label: 'Fluxos & Automação', minPlan: 'pro', icon: <Network size={18} /> },
        { id: 'mkt_n8n', label: 'Mapa de Automação (n8n)', minPlan: 'enterprise', icon: <Cpu size={18} /> },
      ]
    },
    {
      category: 'Arrecadação & Doações',
      items: [
        { id: 'painel_arrecadacao', label: 'Painel Arrecadação', minPlan: 'political', icon: <HandCoins size={18} /> },
        { id: 'criador_doacao', label: 'Criador Pág. Doação', minPlan: 'political', icon: <Coins size={18} /> },
      ]
    },
    {
      category: 'Inteligência Artificial',
      items: [
        { id: 'ia_assistente', label: 'Assistente Virtual', minPlan: 'pro', icon: <Cpu size={18} /> },
        { id: 'ia_sentimento', label: 'Análise de Sentimento', minPlan: 'enterprise', icon: <Activity size={18} /> },
      ]
    },
    {
      category: 'Relatórios & BI',
      items: [
        { id: 'rel_demandas', label: 'Gráficos Demandas', minPlan: 'pro', icon: <BarChart3 size={18} /> },
        { id: 'rel_relatorio_demandas', label: 'Relatório de Demandas', minPlan: 'pro', icon: <FileText size={18} /> },
        { id: 'rel_cadastros', label: 'Relatório de Cadastros', minPlan: 'pro', icon: <LineChart size={18} /> },
        { id: 'rel_ranking', label: 'Ranking de Indicações', minPlan: 'political', icon: <Medal size={18} /> },
        { id: 'rel_grupos', label: 'Ranking de Grupos', minPlan: 'basic', icon: <Tags size={18} /> },
      ]
    },
    {
      category: 'Segurança & Auditoria',
      items: [
        { id: 'logs_auditoria', label: 'Trilha de Auditoria', minPlan: 'pro', icon: <ShieldCheck size={18} /> },
        { id: 'seg_acessos', label: 'Controle de Acessos', minPlan: 'pro', icon: <Key size={18} /> },
      ]
    },
    {
      category: 'Ferramentas',
      items: [
        { id: 'ferr_videos', label: 'Vídeos e Tutoriais', minPlan: 'basic', icon: <BookOpen size={18} /> },
        { id: 'pag_candidato', label: 'Páginas Bio', minPlan: 'pro', icon: <LayoutTemplate size={18} /> },
        { id: 'pag_conversao', label: 'Páginas de Conversão', minPlan: 'pro', icon: <Focus size={18} /> },
        { id: 'ferr_pdflab', label: 'PDF Lab', minPlan: 'basic', icon: <FileText size={18} /> },
        { id: 'ferr_assinador', label: 'Assinador Digital', minPlan: 'pro', icon: <PenLine size={18} /> },
        { id: 'ferr_links', label: 'Link Curto', minPlan: 'basic', icon: <Link size={18} /> },
        { id: 'ferr_qr', label: 'Gerador QR Code', minPlan: 'basic', icon: <QrCode size={18} /> },
      ]
    },
    {
      category: 'Ajustes & Sistema',
      items: [
        { id: 'ajustes_config', label: 'Configurações', minPlan: 'basic', icon: <Settings size={18} /> },
        { id: 'preferencias', label: 'Módulos & Preferências', minPlan: 'basic', icon: <Settings size={18} /> },
        { id: 'master_admin', label: 'Painel Master Admin', minPlan: 'basic', icon: <Crown size={18} /> },
        { id: 'ajustes_usuarios', label: 'Usuários', minPlan: 'basic', icon: <UserCog size={18} /> },
        { id: 'ajustes_setores', label: 'Setores', minPlan: 'basic', icon: <Briefcase size={18} /> },
        { id: 'conta_minha_conta', label: 'Minha Conta', minPlan: 'basic', icon: <User size={18} /> },
        { id: 'conta_perfil', label: 'Meu Perfil', minPlan: 'basic', icon: <UserCheck size={18} /> },
        { id: 'conta_minhas_contas', label: 'Minhas Contas', minPlan: 'basic', icon: <Users size={18} /> },
        { id: 'conta_assinaturas', label: 'Assinaturas', minPlan: 'basic', icon: <FileSignature size={18} /> },
        { id: 'conta_faturas', label: 'Faturas', minPlan: 'basic', icon: <Banknote size={18} /> },
        { id: 'logout', label: 'Sair / Logout', minPlan: 'basic', icon: <LogOut size={18} /> },
      ]
    }
  ];

  const planLevels = { basic: 1, pro: 2, political: 3, enterprise: 4 };

  const handleNavClick = (mod) => {
    if (mod.id === 'logout') {
      handleLogout();
      return;
    }
    const userLevel = planLevels[userPlan] || 1;
    const requiredLevel = planLevels[mod.minPlan] || 1;

    if (userLevel < requiredLevel) {
      setModalFeatureTitle(mod.label);
      setIsUpgradeModalOpen(true);
    } else {
      setActivePage(mod.id);
    }
  };

  const handleRunAi = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, task: 'Redigir comunicação de gabinete' })
      });
      const data = await res.json();
      setAiResult(data.response || data.error);
    } catch (e) {
      setAiResult('Erro ao consultar servidor de IA.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSendWhatsAppBroadcast = async () => {
    if (!broadcastMessage) return alert('Digite a mensagem de disparo!');
    setBroadcastStatus('Enviando via WhatsApp Business API...');
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_broadcast', targetNeighborhood: selectedNeighborhood, messageText: broadcastMessage })
      });
      const data = await res.json();
      setBroadcastStatus(`S& Disparo concluído para 1.250 números no bairro ${selectedNeighborhood}!`);
    } catch (e) {
      setBroadcastStatus('R Erro no disparo de WhatsApp.');
    }
  };

  const handleTriggerPixelEvent = async () => {
    setPixelStatus('Enviando evento CAPI para os servidores da Meta...');
    try {
      const res = await fetch('/api/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'trigger_event', pixelId, capiToken, adAccountId, eventName: 'Lead' })
      });
      const data = await res.json();
      setPixelStatus(`x} Evento registrado com sucesso no Meta Pixel ${pixelId}!`);
    } catch (e) {
      setPixelStatus('R Erro no disparo de Pixel Meta.');
    }
  };

  const handleAddCabinetTenant = () => {
    if (!newCabinetName) return alert('Digite o nome do novo Gabinete!');
    const newTenant = {
      id: `cab_0${tenantsList.length + 1}`,
      name: newCabinetName,
      party: 'IND',
      state: 'SP',
      city: 'São Paulo',
      plan: selectedTenantPlan,
      status: 'Ativo',
      mrr: 'R$ 2.900',
      votersCount: 0
    };
    setTenantsList([...tenantsList, newTenant]);
    setNewCabinetName('');
    setAdminStatusMessage(`S& Gabinete "${newCabinetName}" provisionado com sucesso no ecossistema GabinetAK!`);
  };

  const handleChangeTenantStatus = (id, currentStatus) => {
    const updated = tenantsList.map(t => {
      if (t.id === id) {
        return { ...t, status: currentStatus === 'Ativo' ? 'Suspenso' : 'Ativo' };
      }
      return t;
    });
    setTenantsList(updated);
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/lgpd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_audit_trail' })
      });
      const data = await res.json();
      setAuditLogs(data.auditLogs || []);
    } catch (e) {}
  };

  useEffect(() => {
    if (activePage === 'seguranca' || activePage === 'master_admin') fetchAuditLogs();
  }, [activePage]);

  // Data formatada em português para o Hero Banner
  const currentDateFormatted = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  // Lógica de Troca de Tema Dinâmico
  const handleThemeChange = (colorKey, colorHex, glowHex) => {
    setCurrentTheme(colorKey);
    document.documentElement.style.setProperty('--accent', colorHex);
    document.documentElement.style.setProperty('--accent-glow', glowHex);
  };

  const themeOptions = [
    { key: 'cyan', name: 'Ciano', color: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' },
    { key: 'gold', name: 'Dourado', color: '#ffd700', glow: 'rgba(255, 215, 0, 0.4)' },
    { key: 'green', name: 'Verde', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    { key: 'purple', name: 'Roxo', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
    { key: 'red', name: 'Rubi', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' }
  ];

  // Lógica de Checkout Asaas
  const handleCheckout = async (planId) => {
    try {
      setIsCheckoutLoading(true);
      const res = await fetch('/api/asaas/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          billingCycle,
          cabinetId: 'mock-cabinet-id-123'
        })
      });
      const data = await res.json();
      
      if (data.checkoutUrl) {
        alert(`Redirecionando para o Asaas Pay: ${data.checkoutUrl}`);
        // window.open(data.checkoutUrl, '_blank'); // Redirecionamento real
      } else {
        alert('Erro ao gerar link de pagamento.');
      }
    } catch (error) {
      console.error(error);
      alert('Falha na comunicação com o servidor de pagamentos.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  // ESTRUTURA DOS PLANOS E PRE!OS (BASEADO NA REFER`NCIA)
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      desc: 'GABINETE INICIAL & PRODUTIVIDADE',
      price: { mensal: '149,90', trimestral: '129,90', anual: '99,90' },
      oldPrice: { mensal: '', trimestral: '149,90', anual: '149,90' },
      features: [
        { label: 'Até 5.000 Eleitores/Leads', included: true },
        { label: 'Kanban Dinâmico de Demandas', included: true },
        { label: 'Agenda & Aniversariantes', included: true },
        { label: 'Disparo de E-mails (Resend)', included: true },
        { label: 'Geomapeamento Avançado', included: false },
        { label: 'Inteligência Artificial Gemini', included: false },
        { label: 'Automação WhatsApp & SMS', included: false },
        { label: 'Arrecadação e Doações (PIX)', included: false },
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      desc: 'GABINETE PROFISSIONAL & CRM',
      price: { mensal: '299,90', trimestral: '259,90', anual: '199,90' },
      oldPrice: { mensal: '349,90', trimestral: '299,90', anual: '299,90' },
      features: [
        { label: 'Até 25.000 Eleitores/Leads', included: true },
        { label: 'Kanban Dinâmico de Demandas', included: true },
        { label: 'Geomapeamento Avançado', included: true },
        { label: 'Integração Meta Ads (Pixel & CAPI)', included: true },
        { label: 'Inteligência Artificial Gemini', included: true },
        { label: 'Central de Relatórios BI', included: true },
        { label: 'Automação WhatsApp & SMS', included: false },
        { label: 'Arrecadação e Doações (PIX)', included: false },
      ]
    },
    {
      id: 'political',
      name: 'Political',
      desc: 'GESTÃO ELEITORAL COMPLETA',
      isPopular: true,
      price: { mensal: '499,90', trimestral: '429,90', anual: '349,90' },
      oldPrice: { mensal: '599,90', trimestral: '499,90', anual: '499,90' },
      features: [
        { label: 'Eleitores e Demandas Ilimitadas', included: true },
        { label: 'Geomapeamento Avançado', included: true },
        { label: 'WhatsApp Oficial Eleitoral & Envios', included: true },
        { label: 'Arrecadação e Doações (PIX)', included: true },
        { label: 'Módulo Legislativo Completo', included: true },
        { label: 'CRM Municipal e Prefeituras', included: true },
        { label: 'Gestão de Marketing & Campanhas', included: true },
        { label: 'API Business Avançada', included: false },
      ]
    },
    {
      id: 'enterprise',
      name: 'MAX Enterprise',
      desc: 'MAJORITÁRIAS & MULTI-GABINETE',
      isEnterprise: true,
      price: { mensal: '999,90', trimestral: '849,90', anual: '749,90' },
      oldPrice: { mensal: '1.299,90', trimestral: '999,90', anual: '999,90' },
      features: [
        { label: 'Gabinetes e Eleitores Ilimitados', included: true },
        { label: 'Painel Master Admin Multitenant', included: true },
        { label: 'WhatsApp Oficial & Ligações Auto.', included: true },
        { label: 'Mapa de Automação n8n (Webhooks)', included: true },
        { label: 'Análise de Sentimento (IA Avançada)', included: true },
        { label: 'Servidores Dedicados Isolados', included: true },
        { label: 'API Business (50.000 req/mês)', included: true },
        { label: 'Suporte VIP 24/7 (WhatsApp + Chamadas)', included: true },
      ]
    }
  ];

  if (!isAuthVerified) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0b141a', color: '#fff', fontFamily: '"Inter", sans-serif', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(14, 165, 233, 0.2)', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Verificando credenciais de acesso ao Gabinete...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* SIDEBAR RETRÁTIL COM MARCA VETORIAL GabinetAK */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        
        {/* BRANDING HEADER */}
        <div className="sidebar-header">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>
            <img 
              src={sidebarCollapsed ? "/logo/icon.svg" : "/logo/horizontal.svg"} 
              alt="GabinetAK HUB" 
              className="logo-svg"
            />
          </a>
          <button className="sidebar-toggle" onClick={() => { if(window.innerWidth <= 768) { setIsMobileOpen(!isMobileOpen); } else { setSidebarCollapsed(!sidebarCollapsed); } }}>
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>



        {/* SIDEBAR SEARCH FILTER */}
        {!sidebarCollapsed && (
          <div className="sidebar-search-container">
            <div className="sidebar-search">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Buscar no menu..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
          </div>
        )}

        {/* LISTA DE CATEGORIAS E MÓDULOS */}
        <nav className="sidebar-nav">
          <style dangerouslySetInnerHTML={{__html: `
            .sidebar-category-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.07);
              border-radius: 8px;
              padding: 0.5rem 0.75rem;
              margin: 0.35rem 0.65rem 0.25rem 0.65rem;
              cursor: pointer;
              user-select: none;
              transition: all 0.2s ease;
            }
            .sidebar-category-header:hover {
              background: rgba(255, 255, 255, 0.06);
              border-color: rgba(255, 255, 255, 0.12);
            }
            .sidebar-category-title {
              font-size: 0.72rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              color: #cbd5e1;
              display: flex;
              align-items: center;
              gap: 0.4rem;
            }
            .sidebar-category-chevron {
              color: #64748b;
              display: flex;
              align-items: center;
              transition: transform 0.2s ease;
            }
            .sidebar-tree-container {
              margin-left: 1.25rem;
              margin-right: 0.65rem;
              padding-left: 0.65rem;
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
              border-left: 1px solid rgba(255, 255, 255, 0.12);
              display: flex;
              flex-direction: column;
              gap: 4px;
            }
            .sidebar-tree-item {
              display: flex;
              align-items: center;
              gap: 0.65rem;
              padding: 0.52rem 0.75rem;
              border-radius: 8px;
              text-decoration: none;
              cursor: pointer;
              transition: all 0.15s ease;
              font-size: 0.85rem;
              font-weight: 500;
              color: #94a3b8;
              background: transparent;
              border: 1px solid transparent;
              position: relative;
            }
            .sidebar-tree-item:hover {
              background: rgba(255, 255, 255, 0.04);
              color: #f1f5f9;
              border-color: rgba(255, 255, 255, 0.06);
            }
            .sidebar-tree-item.active {
              background: rgba(217, 119, 6, 0.13) !important;
              border: 1px solid rgba(245, 158, 11, 0.35) !important;
              color: #fbbf24 !important;
              font-weight: 600 !important;
              box-shadow: 0 2px 8px rgba(245, 158, 11, 0.08);
            }
            .sidebar-tree-item.active svg {
              color: #fbbf24 !important;
            }
            .sidebar-badge {
              background: #1e2433;
              border: 1px solid rgba(255, 255, 255, 0.12);
              color: #f8fafc;
              font-size: 0.7rem;
              font-weight: 700;
              padding: 0.1rem 0.5rem;
              border-radius: 99px;
              margin-left: auto;
            }
            .sidebar-tree-item.active .sidebar-badge {
              background: rgba(245, 158, 11, 0.2);
              border-color: rgba(245, 158, 11, 0.4);
              color: #fbbf24;
            }
            .nav-item-container:hover .pin-btn { opacity: 1 !important; }
            .nav-item-container .pin-btn.is-pinned { opacity: 1 !important; }
          `}} />
          {(() => {
            const allItems = menuCategories.flatMap(c => c.items);
            const pinnedCategory = pinnedItems.length > 0 ? {
              category: 'Fixados',
              isPinnedGroup: true,
              items: pinnedItems.map(id => allItems.find(i => i.id === id)).filter(Boolean)
            } : null;
            const categoriesToRender = pinnedCategory ? [pinnedCategory, ...menuCategories] : menuCategories;

            return categoriesToRender.map((cat, idx) => {
              const filteredItems = cat.items.filter(item => 
                item.label.toLowerCase().includes(searchTerm)
              );
              if (filteredItems.length === 0) return null;

              const isSearching = searchTerm.trim().length > 0;
              const isCollapsed = !isSearching && Boolean(collapsedCategories[cat.category]);

              return (
                <div key={idx + (cat.isPinnedGroup ? '-pin' : '')} className="nav-group" style={{ padding: '0.15rem 0' }}>
                  {!sidebarCollapsed && (
                    <div 
                      className="sidebar-category-header"
                      onClick={() => toggleCategory(cat.category)}
                      style={cat.isPinnedGroup ? { borderColor: 'rgba(245, 158, 11, 0.35)', background: 'rgba(245, 158, 11, 0.05)' } : {}}
                      title="Clique para expandir/recolher"
                    >
                      <div className="sidebar-category-title" style={cat.isPinnedGroup ? { color: '#fbbf24' } : {}}>
                        {cat.isPinnedGroup && <Pin size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                        <span>{cat.category}</span>
                      </div>
                      <div className="sidebar-category-chevron">
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>
                  )}
                  {(!isCollapsed || sidebarCollapsed) && (
                    <div className={sidebarCollapsed ? "nav-collapsed-items" : "sidebar-tree-container"}>
                      {filteredItems.map((mod) => {
                        const isLockedByPlan = (planLevels[userPlan] || 1) < (planLevels[mod.minPlan] || 1);
                        const isLocked = disabledModules.includes(mod.id) || isLockedByPlan;
                        const isActive = activePage === mod.id;
                        const isPinned = pinnedItems.includes(mod.id);

                        return (
                          <div 
                            className="nav-item-container" 
                            key={mod.id + (cat.isPinnedGroup ? '-pinned' : '')} 
                            style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}
                          >
                            <div
                              className={`sidebar-tree-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                              onClick={() => handleNavClick(mod)}
                              title={sidebarCollapsed ? mod.label : undefined}
                              style={{ 
                                flex: 1, 
                                ...(sidebarCollapsed ? { justifyContent: 'center', padding: '0.65rem' } : {}) 
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {mod.icon}
                              </span>
                              {!sidebarCollapsed && (
                                <span className="nav-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {mod.label}
                                </span>
                              )}
                              {!sidebarCollapsed && mod.badge && (
                                <span className="sidebar-badge">{mod.badge}</span>
                              )}
                              {!sidebarCollapsed && isLocked && (
                                <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>🔒</span>
                              )}
                            </div>
                            {!sidebarCollapsed && !isLocked && (
                              <button 
                                className={`pin-btn ${isPinned ? 'is-pinned' : ''}`}
                                onClick={(e) => togglePin(e, mod.id)}
                                title={isPinned ? "Desafixar" : "Fixar no topo"}
                                style={{
                                  position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                                  background: 'transparent', border: 'none',
                                  color: isPinned ? '#fbbf24' : 'var(--text-muted)',
                                  cursor: 'pointer', opacity: isPinned ? 1 : 0, transition: 'opacity 0.2s',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px'
                                }}
                              >
                                <Pin size={13} fill={isPinned ? '#fbbf24' : 'none'} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            });
          })()}</nav>
      </aside>

      {/* ÁREA PRINCIPAL DA APLICAÇÃO */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
        
        {/* TOPBAR HEADER STICKY */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}><Menu size={24} /></button>
            <div className="topbar-context">
              GabinetAK HUB / <strong style={{ color: 'var(--text-primary)' }}>
                {menuCategories.flatMap(c => c.items).find(i => i.id === activePage)?.label || 'Visão Geral'}
              </strong>
            </div>
          </div>

          {/* LOGO MOBILE CENTRALIZADA */}
          <div className="mobile-topbar-logo">
            <img src="/logo/horizontal.svg" alt="GabinetAK HUB" style={{ height: '36px' }} />
          </div>

          <div className="topbar-right">
            {/* NOTIFICAÇÃO BELL WITH BADGE & PANEL */}
            <button className="topbar-btn" onClick={() => setIsNotifOpen(!isNotifOpen)} title="Notificações" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", position: "relative" }}>
              <Bell size={24} />
              <span className="notif-badge">3</span>
            </button>

            {/* PANEL DE NOTIFICAÇÕES */}
            <div className={`notif-panel ${isNotifOpen ? 'open' : ''}`}>
              <div className="notif-panel-header">
                <h3>🔔 Notificações <span className="notif-count">3 novas</span></h3>
                <div className="notif-actions">
                  <button onClick={() => { setActivePage('notificacoes'); setIsNotifOpen(false); }} style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '6px', padding: '0.2rem 0.5rem', cursor: 'pointer', fontSize: '0.75rem' }}>Ver Todas</button>
                  <button onClick={() => setIsNotifOpen(false)}>Fechar</button>
                </div>
              </div>
              <div className="notif-list">
                <div className="notif-item unread">
                  <div className="notif-item-dot"></div>
                  <div className="notif-item-content">
                    <div className="notif-title">⚡ Novo Lead via WhatsApp</div>
                    <div className="notif-meta">Marcos Silva solicitou protocolo no bairro Centro.</div>
                    <div className="notif-time">Há 5 minutos</div>
                  </div>
                </div>
                <div className="notif-item unread">
                  <div className="notif-item-dot"></div>
                  <div className="notif-item-content">
                    <div className="notif-title">🎯 Disparo CAPI Concluído</div>
                    <div className="notif-meta">Evento Lead enviado com sucesso para Meta Ads.</div>
                    <div className="notif-time">Há 22 minutos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* USER PROFILE DROPDOWN */}
            <div className="user-menu-container" style={{ position: 'relative' }}>
              <div className="user-menu" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <div className="user-avatar">EG</div>
                <div className="user-greeting mobile-hide">
                  Olá, <strong>SuperAdmin Master</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>SaaS Superuser</div>
                </div>
              </div>

              {/* DROPDOWN DE CONTA E CONFIGURAÇÕES */}
              {isUserMenuOpen && (
                <div className="user-dropdown-panel liquid-glass" style={{
                  position: 'absolute', top: '120%', right: '0', width: '300px', 
                  background: 'rgba(5, 10, 30, 0.95)', backdropFilter: 'blur(16px)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '1rem', zIndex: 9999, boxShadow: '0 10px 40px rgba(0,0,0,0.7)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="user-avatar" style={{ width: 45, height: 45, fontSize: '1rem' }}>EG</div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>GabinetAK Oficial</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@GabinetAK.com.br</div>
                      <div style={{ marginTop: '0.3rem' }}><span className="pricing-badge">{userPlan.toUpperCase()} PLAN</span></div>
                    </div>
                  </div>

                  <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.5rem' }}>Uso da Conta</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                      <span>Cadastros Eleitores</span>
                      <strong style={{ color: 'var(--text-primary)' }}>4.850 / {userPlan === 'basic' ? '5.000' : userPlan === 'pro' ? '25.000' : 'Ilimitado'}</strong>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: userPlan === 'basic' ? '97%' : userPlan === 'pro' ? '19%' : '5%', height: '100%', background: 'var(--accent)', transition: 'width 0.5s ease' }}></div>
                    </div>
                  </div>

                  <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.5rem' }}>Cor do Tema</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {themeOptions.map((theme) => (
                        <div 
                          key={theme.key}
                          onClick={() => handleThemeChange(theme.key, theme.color, theme.glow)}
                          style={{
                            width: '24px', height: '24px', borderRadius: '50%', background: theme.color,
                            cursor: 'pointer', border: currentTheme === theme.key ? '2px solid #fff' : '2px solid transparent',
                            boxShadow: currentTheme === theme.key ? `0 0 10px ${theme.glow}` : 'none',
                            transition: 'all 0.2s'
                          }}
                          title={theme.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <a href="/" style={{ textAlign: 'left', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
                      <Home size={16} /> Ver Portal do Cidadão (Site)
                    </a>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setActivePage('meu_perfil'); setIsUserMenuOpen(false); }}>
                      <User size={16} /> Meu Perfil
                    </button>
                    <button style={{ textAlign: 'left', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }} onClick={() => { setActivePage('master_admin'); setIsUserMenuOpen(false); }}>
                      <ShieldCheck size={16} /> Master Admin
                    </button>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setActivePage('preferencias'); setIsUserMenuOpen(false); }}>
                      <Crown size={16} /> Meu Plano e Faturas
                    </button>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setActivePage('ajustes_config'); setIsUserMenuOpen(false); }}>
                      <Settings size={16} /> Configurações do Gabinete
                    </button>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}>
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTAINER DA PÁGINA ATIVA */}
        <main className="page-content" ref={pageContainerRef}>
          
          {(() => {
            const currentNavMod = menuCategories.flatMap(c => c.items).find(i => i.id === activePage);
            // SuperAdmin Master possui acesso irrestrito a todos os módulos do sistema
            const isSuperAdmin = userPlan === 'enterprise';
            const isCurrentPageLocked = !isSuperAdmin && currentNavMod && !['home', 'conta_faturas', 'faturas', 'conta_assinaturas', 'meu_perfil', 'conta_perfil', 'ajustes_config', 'preferencias', 'master_admin'].includes(activePage) && (planLevels[userPlan] || 1) < (planLevels[currentNavMod.minPlan] || 1);
            if (isCurrentPageLocked) {
              return (
                <div className="section-card liquid-glass" style={{ padding: '4rem 2rem', textAlign: 'center', margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '50%', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)' }}>
                    <Lock size={44} color="#ef4444" />
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem' }}>
                    Recurso Bloqueado no Plano {userPlan.toUpperCase()}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '580px', lineHeight: '1.6', marginBottom: '2rem' }}>
                    A ferramenta <strong>"{currentNavMod?.label}"</strong> não está inclusa na sua assinatura atual. Faça um upgrade para o plano <strong>{currentNavMod?.minPlan?.toUpperCase()}</strong> ou superior para liberar este módulo no seu gabinete.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button onClick={() => setActivePage('conta_faturas')} style={{ padding: '0.8rem 1.8rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', borderRadius: '8px', cursor: 'pointer' }}>
                      <Zap size={18} color="#ffffff" /> Upgrade de Plano
                    </button>
                    <button onClick={() => setActivePage('home')} style={{ padding: '0.8rem 1.5rem', color: '#ffffff', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                      Voltar ao Início
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* HOME / DASHBOARD OVERVIEW */}
          {activePage === 'home' && (
            <div className="home-grid">
              
              <div className="home-main">
                {/* HERO BANNER DINÂMICO */}
                <div className="hero-banner" ref={heroBannerRef}>
                  <div className="hero-content">
                    <div className="hero-date" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Sparkles size={14} /> {currentDateFormatted}</div>
                    <h1 className="hero-title">
                      Bem-vindo ao GabinetAK HUB
                    </h1>
                    <p className="hero-subtitle">
                      Plataforma de inteligência eleitoral, gestão de demandas comunitárias e disparos WhatsApp em tempo real.
                    </p>
                  </div>
                </div>

                {/* HEAD DO DASHBOARD CARDS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Visão Geral</h3>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setIsEditDashboardOpen(true)}
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                  >
                    <Settings size={14} /> Personalizar Painel
                  </button>
                </div>

                {/* STATS GRID ANIMADO GSAP */}
                <div className="stats-grid" ref={statsGridRef}>
                  {allDashboardCards.filter(c => activeCards.includes(c.id)).map(card => (
                    <div key={card.id} className="stat-card liquid-glass">
                      <span className="stat-label">{card.title}</span>
                      <span className="stat-value">{card.value}</span>
                      <span style={{ fontSize: '0.75rem', color: card.subColor }}>{card.sub}</span>
                    </div>
                  ))}
                  {activeCards.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1 / -1', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius)' }}>
                      Nenhum relatório ativo. Clique em "Personalizar Painel" para exibir os cards.
                    </div>
                  )}
                </div>

                {/* ATALHOS RÁPIDOS */}
                <div className="section-card liquid-glass">
                  <div className="section-card-header">
                    <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Zap size={18} color="var(--accent)" /> Acesso Rápido a Módulos Chave</h3>
                  </div>
                  <div className="quick-access-grid">
                    <div className="qa-item" onClick={() => setActivePage('master_admin')}>
                      <div className="qa-icon"><Crown size={24} /></div>
                      <span>Master Admin</span>
                    </div>
                    <div className="qa-item" onClick={() => setActivePage('cadastros')}>
                      <div className="qa-icon"><Users size={24} /></div>
                      <span>Cadastros</span>
                    </div>
                    <div className="qa-item" onClick={() => setActivePage('demandas')}>
                      <div className="qa-icon"><ClipboardList size={24} /></div>
                      <span>Demandas</span>
                    </div>
                    <div className="qa-item" onClick={() => setActivePage('whatsapp')}>
                      <div className="qa-icon"><MessageCircle size={24} /></div>
                      <span>WhatsApp</span>
                    </div>
                    <div className="qa-item" onClick={() => setActivePage('meta')}>
                      <div className="qa-icon"><Target size={24} /></div>
                      <span>Meta Ads</span>
                    </div>
                    <div className="qa-item" onClick={() => setActivePage('ia')}>
                      <div className="qa-icon"><Sparkles size={24} /></div>
                      <span>IA Gemini</span>
                    </div>
                    <div className="qa-item" onClick={() => setActivePage('seguranca')}>
                      <div className="qa-icon"><ShieldCheck size={24} /></div>
                      <span>Segurança</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* SIDEBAR DIREITA DE WIDGETS */}
              <div className="home-sidebar">
                
                {/* CALENDÁRIO WIDGET */}
                <div className="calendar-card section-card liquid-glass">
                  <div className="calendar-header">
                    <span className="cal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CalendarDays size={16} color="var(--accent)" /> Agosto 2026</span>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      <button className="cal-nav"><ChevronLeft size={14} /></button>
                      <button className="cal-nav"><ChevronRight size={14} /></button>
                    </div>
                  </div>
                  <div className="calendar-days">
                    <div className="cal-day-name">D</div>
                    <div className="cal-day-name">S</div>
                    <div className="cal-day-name">T</div>
                    <div className="cal-day-name">Q</div>
                    <div className="cal-day-name">Q</div>
                    <div className="cal-day-name">S</div>
                    <div className="cal-day-name">S</div>
                  </div>
                  <div className="calendar-grid">
                    {[...Array(31)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`cal-day ${i + 1 === 14 ? 'today' : ''}`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ANIVERSARIANTES VIP */}
                <div className="section-card liquid-glass">
                  <div className="section-card-header">
                    <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Cake size={18} color="var(--accent)" /> Aniversariantes VIP da Semana</h3>
                  </div>
                  <div className="birthday-list">
                    <div className="birthday-item">
                      <div className="birthday-avatar">CR</div>
                      <div>
                        <div className="birthday-name">Cláudio Roberto (Liderança)</div>
                        <div className="birthday-phone" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={12} /> (11) 98877-1122 | Hoje</div>
                      </div>
                    </div>
                    <div className="birthday-item">
                      <div className="birthday-avatar">AM</div>
                      <div>
                        <div className="birthday-name">Ana Maria (Coordenadora)</div>
                        <div className="birthday-phone" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={12} /> (11) 97766-3344 | Amanhã</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* GESTÃO DE USUÁRIOS & MASTER ADMIN */}
          {['master_admin', 'admin_master'].includes(activePage) && (
            <MasterAdmin 
              disabledModules={disabledModules} 
              setDisabledModules={setDisabledModules} 
              menuCategories={menuCategories} 
            />
          )}
          {['ajustes_usuarios', 'usuarios', 'ajustes_setores'].includes(activePage) && <GestaoUsuarios />}

          {/* KANBAN DINÂMICO & TAREFAS */}
          {['kanban', 'prod_tarefas'].includes(activePage) && <KanbanDinamico />}

          {/* GESTÃO DE DEMANDAS */}
          {['demandas', 'crm_assuntos', 'crm_demandas'].includes(activePage) && <GestaoDemandas />}

          {/* GESTÃO DE CADASTROS, ELEITORES E LEADS */}
          {['cadastros', 'grupos_tags', 'leads'].includes(activePage) && <GestaoCadastros />}

          {/* AGENDA E ANIVERSARIANTES */}
          {['agenda_wa', 'agenda'].includes(activePage) && <AgendaWA />}

          {/* CRIADOR DE FORMULÁRIOS DE CAPTAÇÃO */}
          {['forms', 'formularios'].includes(activePage) && <CriadorFormularios />}

          {/* GEOMAPEAMENTO DE ELEITORES */}
          {['geomapeamento', 'map_eleitor'].includes(activePage) && <Geomapeamento />}

          {/* CENTRAL WHATSAPP & DISPAROS */}
          {['whatsapp', 'wa_oficial', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'ligacoes_auto'].includes(activePage) && <CentralWhatsApp />}

          {/* CAMPANHAS DE E-MAIL */}
          {['email_envio', 'email_mensagens', 'email_templates', 'ia_mkt', 'email_provedores'].includes(activePage) && <CampanhasEmail />}

          {/* CAMPANHAS DE SMS */}
          {['sms_envio', 'sms_mensagens'].includes(activePage) && <CampanhasSMS />}

          {/* ASSINADOR DIGITAL DE DOCUMENTOS */}
          {activePage === 'ferr_assinador' && <AssinadorDigital />}

          {/* PRODUTIVIDADE & LEGISLATIVO (PLS, EMENDAS, VERBAS, RESULTADOS) */}
          {['leg_pl', 'leg_emendas', 'leg_verbas', 'leg_resultados'].includes(activePage) && (
            <GestaoLegislativo 
              initialTab={
                activePage === 'leg_emendas' ? 'emendas' : 
                activePage === 'leg_verbas' ? 'verbas' : 
                activePage === 'leg_resultados' ? 'resultados' : 'pls'
              } 
            />
          )}

          {/* CENTRAL DE ATENDIMENTO E PROTOCOLOS */}
          {['atendimento', 'crm_atendimento', 'crm_suporte'].includes(activePage) && <AtendimentoProtocolo />}

          {/* OFÍCIOS E MEMORANDOS */}
          {['doc_oficios', 'doc_memorandos'].includes(activePage) && <DocumentosOficios />}

          {/* TEMPLATES E GERADOR DE DOCUMENTOS */}
          {['doc_templates', 'ferr_pdflab'].includes(activePage) && <GeradorDocumentos />}

          {/* GERENCIADOR DE LINKS CURTOS */}
          {activePage === 'ferr_links' && <GestaoLinksCurtos />}

          {/* GERADOR DE QR CODE */}
          {activePage === 'ferr_qr' && <GeradorQRCode onOpenIA={openIAWithContext} />}

          {/* DASHBOARD ANALÍTICO & RELATÓRIOS BI */}
          {['dashboard', 'rel_demandas', 'rel_relatorio_demandas', 'rel_cadastros', 'rel_ranking', 'rel_grupos'].includes(activePage) && (
            <RelatoriosBI 
              initialTab={
                activePage === 'rel_ranking' || activePage === 'rel_grupos' ? 'ranking' :
                activePage === 'rel_cadastros' || activePage === 'rel_relatorio_demandas' ? 'relatorio' : 'graficos'
              } 
            />
          )}

          {/* AUTOMAÇÃO N8N E FLUXOS DE MARKETING */}
          {['mkt_fluxos', 'mkt_n8n'].includes(activePage) && <AutomacaoN8N />}

          {/* MARKETING DIGITAL E GESTÃO DE CAMPANHA */}
          {['mkt_digital', 'mkt_gestao'].includes(activePage) && <IntegracaoMetaAds />}

          {/* ASSISTENTE DE IA AVANÇADO */}
          {['ia_assistente', 'ia_sentimento'].includes(activePage) && <AssistenteIA />}

          {/* GESTÃO DE FATURAS & ASSINATURAS */}
          {['conta_faturas', 'faturas', 'conta_assinaturas', 'assinaturas'].includes(activePage) && <GestaoFaturas />}

          {/* CONFIGURAÇÕES GERAIS DO GABINETE */}
          {['ajustes_config', 'preferencias', 'configuracoes'].includes(activePage) && <ConfiguracoesGerais />}

          {/* MEU PERFIL */}
          {['meu_perfil', 'conta_perfil', 'conta_minha_conta', 'conta_minhas_contas'].includes(activePage) && <MeuPerfil />}

          {/* GERADOR DE MOLDURAS / TWIBBON */}
          {activePage === 'mkt_molduras' && <GeradorMolduras />}

          {/* MALA DIRETA E ETIQUETAS */}
          {activePage === 'doc_etiquetas' && <GeradorEtiquetas />}

          {/* GESTÃO DE TIPOS DE DOCUMENTOS */}
          {activePage === 'doc_tipos' && <GestaoTiposDocumentos />}

          {/* GESTÃO DE DOCUMENTOS RECEBIDOS */}
          {activePage === 'doc_recebidos' && <GestaoDocumentosRecebidos />}

          {/* REPOSITRIO DE DOCUMENTOS / OFÍCIOS */}
          {activePage === 'doc_lista' && <GestaoDocLista onOpenIA={openIAWithContext} />}

          {/* AGENTE DE IA MODULAR CONTEXTUAL (DRAWER FLUTUANTE) */}
          <AgenteIAModular 
            isOpen={isIAModalOpen} 
            onClose={() => setIsIAModalOpen(false)} 
            contexto={iaContext} 
          />

          {/* CONSTRUTOR DE PÁGINAS BIO (ESTILO LINKTREE) */}
          {activePage === 'pag_candidato' && <GestaoPaginasBio />}

          {/* TRÁFEGO POLÍTICO PAGO (META ADS) */}
          {['mkt_trafego', 'meta'].includes(activePage) && <IntegracaoMetaAds />}

          {activePage === 'ia' && (
            <div className="section-card liquid-glass">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>S Assistente de Inteligência Artificial Google Gemini</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Gerador de discursos, respostas a ofícios e copys de campanha otimizadas.</p>
              <textarea 
                value={aiPrompt} 
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: Redija um pronunciamento sobre a entrega da nova creche no bairro Centro..."
                rows={4}
                style={{ width: '100%', padding: '1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', marginBottom: '1rem' }}
              />
              <button onClick={handleRunAi} disabled={isAiLoading} className="btn-primary">
                {isAiLoading ? 'S Gerando resposta...' : 'S Processar via Gemini AI'}
              </button>
              {aiResult && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-elevated)', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Resposta da IA:</h4>
                  <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.9rem' }}>{aiResult}</p>
                </div>
              )}
            </div>
          )}

          {activePage === 'seguranca' && (
            <div className="section-card liquid-glass">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>x:️ Proteção de Padrão Militar AES-256 & LGPD</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: 'rgba(0,230,118,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,230,118,0.3)' }}>
                  <h3 style={{ color: 'var(--success)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>x Criptografia AES-256-GCM</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Os dados identificáveis dos cidadãos são salvos criptografados com chave mestre de 32 bytes.</p>
                </div>
                <div style={{ background: 'rgba(0,240,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.3)' }}>
                  <h3 style={{ color: 'var(--accent)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>a️ Trilha de Auditoria HMAC-SHA256</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Todas as consultas e alterações registram hashes invioláveis na tabela AuditLog do PostgreSQL.</p>
                </div>
              </div>
            </div>
          )}
          {activePage === 'painel_arrecadacao' && <PainelArrecadacao />}


          {activePage === 'notificacoes' && (
            <div className="section-card liquid-glass">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                x Central de Notificações
              </h2>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Todas</button>
                <button className="btn-primary outline" style={{ padding: '0.5rem 1rem' }}>Não Lidas</button>
                <button className="btn-primary outline" style={{ padding: '0.5rem 1rem' }}>Alertas do Sistema</button>
              </div>
              <div className="donation-feed">
                {[
                  { title: 'Novo Lead via WhatsApp', meta: 'Marcos Silva solicitou protocolo no bairro Centro.', time: 'Há 5 minutos', type: 'info' },
                  { title: 'Disparo CAPI Concluído', meta: 'Evento Lead enviado com sucesso para Meta Ads.', time: 'Há 22 minutos', type: 'success' },
                  { title: 'Trilha de Auditoria LGPD', meta: 'Acesso criptografado registrado com hash HMAC-256.', time: 'Há 1 hora', type: 'security' },
                  { title: 'Limite de Disparos Atingido', meta: 'O plano Basic alcançou 95% do limite de envios.', time: 'Ontem', type: 'warning' },
                ].map((n, i) => (
                  <div key={i} className="donation-item" style={{ borderLeft: `4px solid ${n.type === 'warning' ? 'var(--danger)' : n.type === 'security' ? '#a855f7' : n.type === 'success' ? 'var(--success)' : 'var(--accent)'}` }}>
                    <div style={{ flex: 1 }}>
                      <div className="donor-info-name">{n.title}</div>
                      <div className="donor-info-meta">{n.meta}</div>
                    </div>
                    <div className="notif-time" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === 'logs_auditoria' && <LogsAuditoria />}

          {activePage === 'preferencias' && (
            <div className="section-card liquid-glass" style={{ background: 'var(--bg-base)', border: 'none', padding: 0 }}>
              
              {/* DASHBOARD DA ASSINATURA ATUAL */}
              <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                  <Crown size={20} color="var(--accent)" /> Minha Assinatura Atual
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {/* Status e Recorrência */}
                  <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Plano Ativo</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)' }}>{userPlan.toUpperCase()}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <span className="pricing-badge" style={{ background: 'rgba(0, 230, 118, 0.1)', color: 'var(--success)', border: '1px solid rgba(0,230,118,0.3)' }}>ATIVO</span>
                      <span className="pricing-badge" style={{ background: 'transparent', border: '1px solid var(--border)' }}>Renovação: 14/09/2026</span>
                    </div>
                  </div>

                  {/* Uso e Limites */}
                  <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Uso de Eleitores</div>
                    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>4.850</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {userPlan === 'basic' ? '5.000' : userPlan === 'pro' ? '25.000' : 'Ilimitado'}</span>
                    </div>
                    <div className="fund-progress-bar" style={{ height: '8px', margin: '0.5rem 0 0 0' }}>
                      <div className="fund-progress-fill" style={{ width: userPlan === 'basic' ? '97%' : userPlan === 'pro' ? '19%' : '5%', background: userPlan === 'basic' ? 'var(--danger)' : 'var(--accent)', boxShadow: 'none' }}></div>
                    </div>
                    {userPlan === 'basic' && <div style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.2rem' }}>Atenção: Você está próximo do limite do plano.</div>}
                  </div>

                  {/* Recursos Adicionais */}
                  <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Recursos Adicionais (Add-ons)</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--success)" /> +1 Número WhatsApp Oficial</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={14} color="var(--success)" /> Disparos Ilimitados (Resend)</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><X size={14} /> Espaço de Armazenamento Extra (50GB)</li>
                    </ul>
                    <button style={{ marginTop: 'auto', padding: '0.5rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      Gerenciar Add-ons
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pricing-header">
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>Planos e Preços  GabinetAK HUB</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Acesse os módulos completos de inteligência eleitoral e expanda seu gabinete.</p>
                
                <div className="pricing-toggle">
                  <button className={billingCycle === 'mensal' ? 'active' : ''} onClick={() => setBillingCycle('mensal')}>Mensal</button>
                  <button className={billingCycle === 'trimestral' ? 'active' : ''} onClick={() => setBillingCycle('trimestral')}>
                    Trimestral <span className="pricing-badge">15% OFF</span>
                  </button>
                  <button className={billingCycle === 'anual' ? 'active' : ''} onClick={() => setBillingCycle('anual')}>
                    Anual <span className="pricing-badge">30% OFF</span>
                  </button>
                </div>
              </div>

              <div className="pricing-grid">
                {pricingPlans.map((plan) => (
                  <div key={plan.id} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
                    {plan.isPopular && <div className="popular-tag">O Mais Popular</div>}
                    {plan.isEnterprise && <div className="popular-tag" style={{ background: '#10b981', color: '#000', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>Exclusivo</div>}
                    
                    <div className="pricing-plan-name">{plan.name}</div>
                    <div className="pricing-plan-desc">{plan.desc}</div>
                    
                    <div className="pricing-price-old">
                      {plan.oldPrice[billingCycle] ? `R$ ${plan.oldPrice[billingCycle]}` : '\u00A0'}
                    </div>
                    
                    <div className="pricing-price">
                      <span>R$</span> {plan.price[billingCycle]} <span>/mês</span>
                    </div>

                    <div className="pricing-features">
                      {plan.features.map((feat, i) => (
                        <div key={i} className={`pricing-feature-item ${!feat.included ? 'missing' : ''}`}>
                          {feat.included ? <CheckCircle2 size={16} /> : <span style={{ width: 16, display: 'inline-block' }}></span>}
                          <span>{feat.label}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                       className={`btn-pricing ${plan.isEnterprise ? 'enterprise' : plan.isPopular ? 'solid' : 'outline'}`}
                      onClick={() => userPlan === plan.id ? null : handleCheckout(plan.id)}
                      disabled={isCheckoutLoading}
                      style={{ opacity: userPlan === plan.id ? 0.5 : 1, cursor: userPlan === plan.id ? 'default' : 'pointer' }}
                    >
                      {userPlan === plan.id ? 'Plano Atual' : isCheckoutLoading ? 'Gerando Link...' : `Assinar ${plan.name}`}
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* FALLBACK PARA MDULOS EM CONSTRUÇÃO */}
          {!['home', 'admin-master', 'master_admin', 'admin_master', 'mkt_trafego', 'cadastros', 'demandas', 'kanban', 'forms', 'whatsapp', 'wa_oficial', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'sms_envio', 'ligacoes_auto', 'meta', 'ia', 'seguranca', 'preferencias', 'agenda_wa', 'doc_oficios', 'geomapeamento', 'email_envio', 'email_templates', 'rel_demandas', 'rel_cadastros', 'rel_ranking', 'ia_assistente', 'ia_mkt', 'ia_sentimento', 'ajustes_usuarios', 'usuarios', 'seg_acessos', 'logs_auditoria', 'ferr_assinador', 'ajustes_config', 'meu_perfil', 'conta_perfil', 'conta_faturas', 'faturas', 'conta_assinaturas', 'assinaturas', 'conta_minha_conta', 'conta_minhas_contas', 'ferr_links', 'ferr_qr', 'mkt_molduras', 'doc_etiquetas', 'doc_tipos', 'doc_recebidos', 'doc_lista', 'pag_candidato', 'atendimento', 'leads', 'crm_atendimento', 'crm_demandas', 'crm_suporte', 'crm_assuntos', 'leg_pl', 'leg_emendas', 'leg_verbas', 'leg_resultados', 'prod_tarefas', 'prod_assuntos', 'mkt_digital', 'mkt_fluxos', 'painel_arrecadacao', 'criador_doacao', 'pag_conversao', 'map_eleitor', 'notificacoes', 'dashboard'].includes(activePage) && (
            <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Módulo em Construção</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.5' }}>
                O módulo <strong>{menuCategories.flatMap(c => c.items).find(i => i.id === activePage)?.label}</strong> está sendo integrado à nova arquitetura Liquid Glass e em breve estará disponível.
              </p>
              <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setActivePage('home')}>
                Voltar para a Home
              </button>
            </div>
          )}

        </main>
      </div>

      {/* MODAL DE UPGRADE */}
      {isUpgradeModalOpen && (
        <div className="upgrade-overlay">
          <div className="upgrade-box liquid-glass" style={{ border: '1px solid var(--danger)' }}>
            <div style={{ fontSize: '2.5rem' }}>🔒</div>
            <h2>Recurso do Plano Político</h2>
            <p>
              O módulo <strong>{modalFeatureTitle}</strong> exige assinatura do Plano Político ou habilitação individual de função.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center' }}>
              <button onClick={() => { setUserPlan('political'); setIsUpgradeModalOpen(false); }} className="btn-primary">Ativar Plano Político</button>
              <button onClick={() => setIsUpgradeModalOpen(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PERSONALIZA!ÒO DO DASHBOARD */}
      {isEditDashboardOpen && (
        <div className="upgrade-overlay" style={{ zIndex: 1000 }}>
          <div className="upgrade-box liquid-glass" style={{ minWidth: '400px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Settings size={20} style={{ color: 'var(--accent)' }} /> Personalizar Painel
              </h2>
              <button onClick={() => setIsEditDashboardOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.9rem' }}>
              Selecione quais cards de relatório você deseja exibir na sua tela inicial.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {allDashboardCards.map(card => {
                const isActive = activeCards.includes(card.id);
                return (
                  <div key={card.id} onClick={() => toggleDashboardCard(card.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`, cursor: 'pointer', transition: 'var(--transition)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{card.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exemplo: {card.value}</span>
                    </div>
                    <div className={`custom-switch ${isActive ? 'active' : ''}`} style={{ width: '40px', height: '22px', background: isActive ? 'var(--accent)' : 'var(--bg-hover)', borderRadius: '20px', position: 'relative', transition: 'var(--transition)' }}>
                      <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: isActive ? '20px' : '2px', transition: 'var(--transition)' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" onClick={() => setIsEditDashboardOpen(false)}>
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


 