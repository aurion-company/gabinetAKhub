'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import AgendaWA from '../components/modules/AgendaWA';
import DocumentosOficios from '../components/modules/DocumentosOficios';
import Geomapeamento from '../components/modules/Geomapeamento';
import CampanhasEmail from '../components/modules/CampanhasEmail';
import RelatoriosBI from '../components/modules/RelatoriosBI';
import AssistenteIA from '../components/modules/AssistenteIA';
import GestaoUsuarios from '../components/modules/GestaoUsuarios';
import AssinadorDigital from '../components/modules/AssinadorDigital';
import ConfiguracoesGerais from '../components/modules/ConfiguracoesGerais';
import KanbanDinamico from '../components/modules/KanbanDinamico';
import CriadorFormularios from '../components/modules/CriadorFormularios';
import CentralWhatsApp from '../components/modules/CentralWhatsApp';
import GeradorDocumentos from '../components/modules/GeradorDocumentos';
import GestaoDemandas from '../components/modules/GestaoDemandas';
import GestaoCadastros from '../components/modules/GestaoCadastros';
import GestaoLinksCurtos from '../components/modules/GestaoLinksCurtos';
import MeuPerfil from '../components/modules/MeuPerfil';
import GeradorMolduras from '../components/modules/GeradorMolduras';
import GeradorEtiquetas from '../components/modules/GeradorEtiquetas';
import GestaoTiposDocumentos from '../components/modules/GestaoTiposDocumentos';
import GestaoDocumentosRecebidos from '../components/modules/GestaoDocumentosRecebidos';
import GestaoDocLista from '../components/modules/GestaoDocLista';
import AgenteIAModular from '../components/modules/AgenteIAModular';
import GeradorQRCode from '../components/modules/GeradorQRCode';
import GestaoLegislativo from '../components/modules/GestaoLegislativo';
import GestaoPaginasBio from '../components/modules/GestaoPaginasBio';
import { 
  Home, Users, ClipboardList, Kanban, Inbox, CalendarDays, CheckSquare, FileText,
  MessageCircle, Target, Mail, Megaphone, FileSignature, Map, MapPin, Sparkles,
  Network, LineChart, Zap, HandCoins, Scale, Landmark, ShieldCheck, Wrench, Key, Settings, Crown, Search,
  LayoutDashboard, Coins, PenTool, LayoutTemplate, BoxSelect, UsersRound, Fingerprint, PieChart, Focus, Briefcase, FileSearch, HelpCircle, FileClock, Info, LayoutList, CheckCircle2, TrendingUp, UserCheck, Share2, Smartphone, Rss, BookOpen, ScrollText, Banknote, Vote, Goal, Tags, Contact, FileBox, Mails, FileBadge2, Cpu, Activity, BarChart3, Medal, QrCode, PenLine, Link, UserCog, LogOut, User, Camera, X
} from 'lucide-react';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('home');
  const [userPlan, setUserPlan] = useState('political');
  const [billingCycle, setBillingCycle] = useState('mensal'); // mensal, trimestral, anual
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isIAModalOpen, setIsIAModalOpen] = useState(false);
  const [iaContext, setIaContext] = useState('Geral');

  const openIAWithContext = (contextName) => {
    setIaContext(contextName || menuCategories.flatMap(c => c.items).find(i => i.id === activePage)?.label || 'Geral');
    setIsIAModalOpen(true);
  };
  // Modais e alertas
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [modalFeatureTitle, setModalFeatureTitle] = useState('');

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

  // ESTRUTURA DOS 25+ MÓDULOS ORGANIZADOS POR CATEGORIAS
  const menuCategories = [
    {
      category: 'Home',
      items: [
        { id: 'home', label: 'Home / Dashboard', minPlan: 'basic', icon: <Home size={18} /> },
        { id: 'agenda_wa', label: 'Agenda com WhatsApp', minPlan: 'basic', icon: <CalendarDays size={18} />, badge: '3' },
        { id: 'atendimento', label: 'Atendimento/Protocolo', minPlan: 'basic', icon: <Inbox size={18} /> },
        { id: 'cadastros', label: 'Cadastros', minPlan: 'basic', icon: <Users size={18} /> },
        { id: 'demandas', label: 'Demandas', minPlan: 'basic', icon: <ClipboardList size={18} /> },
        { id: 'leads', label: 'Leads', minPlan: 'basic', icon: <Target size={18} /> },
        { id: 'kanban', label: 'Kanban Dinâmico', minPlan: 'basic', icon: <Kanban size={18} /> },
      ]
    },
    {
      category: 'Painel',
      items: [
        { id: 'dashboard', label: 'Dashboard', minPlan: 'basic', icon: <LayoutDashboard size={18} /> },
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
      category: 'Construtor de Páginas',
      items: [
        { id: 'pag_candidato', label: 'Página do Candidato', minPlan: 'pro', icon: <LayoutTemplate size={18} /> },
        { id: 'pag_conversao', label: 'Páginas de Conversão', minPlan: 'pro', icon: <Focus size={18} /> },
      ]
    },
    {
      category: 'Eleitorado',
      items: [
        { id: 'map_eleitor', label: 'Mapeamento de Eleitor', minPlan: 'political', icon: <MapPin size={18} /> },
        { id: 'grupos_tags', label: 'Grupos (tags)', minPlan: 'basic', icon: <Tags size={18} /> },
        { id: 'geomapeamento', label: 'Geomapeamento', minPlan: 'pro', icon: <Map size={18} /> },
        { id: 'forms', label: 'Formulários', minPlan: 'basic', icon: <FileSignature size={18} /> },
      ]
    },
    {
      category: 'CRM Municipal',
      items: [
        { id: 'crm_atendimento', label: 'Central Atendimento', minPlan: 'political', icon: <Contact size={18} /> },
        { id: 'crm_suporte', label: 'Suporte 18h', minPlan: 'political', icon: <HelpCircle size={18} /> },
        { id: 'crm_demandas', label: 'Demandas', minPlan: 'political', icon: <FileSearch size={18} /> },
        { id: 'crm_assuntos', label: 'Assuntos', minPlan: 'political', icon: <Info size={18} /> },
      ]
    },
    {
      category: 'Legislativo',
      items: [
        { id: 'leg_pl', label: 'Projetos de Lei', minPlan: 'political', icon: <BookOpen size={18} /> },
        { id: 'leg_emendas', label: 'Emendas Parlamentares', minPlan: 'political', icon: <ScrollText size={18} /> },
        { id: 'leg_verbas', label: 'Verbas Indenizatórias', minPlan: 'political', icon: <Banknote size={18} /> },
        { id: 'leg_resultados', label: 'Resultados das eleições', minPlan: 'political', icon: <Vote size={18} /> },
      ]
    },
    {
      category: 'Produtividade',
      items: [
        { id: 'prod_tarefas', label: 'Tarefas', minPlan: 'basic', icon: <CheckSquare size={18} /> },
        { id: 'prod_assuntos', label: 'Assuntos', minPlan: 'basic', icon: <Info size={18} /> },
      ]
    },
    {
      category: 'Central WhatsApp & SMS',
      items: [
        { id: 'wa_oficial', label: 'WhatsApp Oficial', minPlan: 'political', icon: <MessageCircle size={18} /> },
        { id: 'wa_eleitoral', label: 'Disparo WhatsApp Eleitoral', minPlan: 'political', icon: <Smartphone size={18} /> },
        { id: 'wa_campanha', label: 'WhatsApp para Campanha', minPlan: 'political', icon: <Megaphone size={18} /> },
        { id: 'wa_massa', label: 'WhatsApp Envios (Massa)', minPlan: 'political', icon: <Rss size={18} /> },
        { id: 'wa_auto', label: 'Automação WhatsApp', minPlan: 'pro', icon: <Zap size={18} /> },
        { id: 'sms_envio', label: 'Envio de SMS', minPlan: 'pro', icon: <Mail size={18} /> },
        { id: 'ligacoes_auto', label: 'Disparo Ligações Auto.', minPlan: 'enterprise', icon: <Smartphone size={18} /> },
      ]
    },
    {
      category: 'Marketing & Campanhas',
      items: [
        { id: 'mkt_molduras', label: 'Gerador de Molduras', minPlan: 'basic', icon: <Camera size={18} /> },
        { id: 'mkt_digital', label: 'Marketing Político Digital', minPlan: 'political', icon: <Megaphone size={18} /> },
        { id: 'mkt_trafego', label: 'Tráfego Político Pago', minPlan: 'pro', icon: <Target size={18} /> },
        { id: 'mkt_gestao', label: 'Gestão de Campanha', minPlan: 'political', icon: <Briefcase size={18} /> },
        { id: 'mkt_fluxos', label: 'Fluxos & Automação', minPlan: 'pro', icon: <Network size={18} /> },
        { id: 'mkt_n8n', label: 'Mapa de Automação (n8n)', minPlan: 'enterprise', icon: <Cpu size={18} /> },
      ]
    },
    {
      category: 'Gestão de Documentos',
      items: [
        { id: 'doc_tipos', label: 'Tipos de Documentos', minPlan: 'basic', icon: <FileBox size={18} /> },
        { id: 'doc_lista', label: 'Documentos', minPlan: 'basic', icon: <FileText size={18} /> },
        { id: 'doc_oficios', label: 'Ofícios / Memorando', minPlan: 'basic', icon: <FileSignature size={18} /> },
        { id: 'doc_recebidos', label: 'Doc. Recebidos', minPlan: 'basic', icon: <Inbox size={18} /> },
        { id: 'doc_etiquetas', label: 'Mala Direta / Etiquetas', minPlan: 'basic', icon: <Mails size={18} /> },
      ]
    },
    {
      category: 'E-mail',
      items: [
        { id: 'email_envio', label: 'Envio de Emails', minPlan: 'basic', icon: <Mail size={18} /> },
        { id: 'email_templates', label: 'Templates de E-mail', minPlan: 'basic', icon: <LayoutTemplate size={18} /> },
      ]
    },
    {
      category: 'Inteligência Artificial',
      items: [
        { id: 'ia_mkt', label: 'Modo de Marketing IA', minPlan: 'pro', icon: <Sparkles size={18} /> },
        { id: 'ia_assistente', label: 'Assistente Virtual', minPlan: 'pro', icon: <Cpu size={18} /> },
        { id: 'ia_sentimento', label: 'Análise de Sentimento', minPlan: 'enterprise', icon: <Activity size={18} /> },
      ]
    },
    {
      category: 'Central de Relatórios',
      items: [
        { id: 'rel_demandas', label: 'Gráficos Demandas', minPlan: 'pro', icon: <BarChart3 size={18} /> },
        { id: 'rel_cadastros', label: 'Relatório de Cadastros', minPlan: 'pro', icon: <LineChart size={18} /> },
        { id: 'rel_ranking', label: 'Ranking de Indicações', minPlan: 'political', icon: <Medal size={18} /> },
      ]
    },
    {
      category: 'Ferramentas',
      items: [
        { id: 'ferr_qr', label: 'Gerador QR Code', minPlan: 'basic', icon: <QrCode size={18} /> },
        { id: 'ferr_assinador', label: 'Assinador Digital', minPlan: 'pro', icon: <PenLine size={18} /> },
        { id: 'ferr_links', label: 'Links Curtos', minPlan: 'basic', icon: <Link size={18} /> },
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
      category: 'Ajustes',
      items: [
        { id: 'ajustes_config', label: 'Configurações', minPlan: 'basic', icon: <Settings size={18} /> },
        { id: 'ajustes_usuarios', label: 'Usuários', minPlan: 'basic', icon: <UserCog size={18} /> },
        { id: 'preferencias', label: 'Módulos & Preferências', minPlan: 'basic', icon: <Settings size={18} /> },
      ]
    },
    {
      category: 'Minha Conta',
      items: [
        { id: 'conta_perfil', label: 'Meu Perfil', minPlan: 'basic', icon: <UserCheck size={18} /> },
        { id: 'logout', label: 'Sair / Logout', minPlan: 'basic', icon: <LogOut size={18} /> },
      ]
    }
  ];

  const planLevels = { basic: 1, pro: 2, political: 3, enterprise: 4 };

  const handleNavClick = (mod) => {
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
      setBroadcastStatus(`✅ Disparo concluído para 1.250 números no bairro ${selectedNeighborhood}!`);
    } catch (e) {
      setBroadcastStatus('❌ Erro no disparo de WhatsApp.');
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
      setPixelStatus(`🎯 Evento registrado com sucesso no Meta Pixel ${pixelId}!`);
    } catch (e) {
      setPixelStatus('❌ Erro no disparo de Pixel Meta.');
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
    setAdminStatusMessage(`✅ Gabinete "${newCabinetName}" provisionado com sucesso no ecossistema Elegiv!`);
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
    if (activePage === 'seguranca' || activePage === 'admin-master') fetchAuditLogs();
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

  // ESTRUTURA DOS PLANOS E PREÇOS (BASEADO NA REFERÊNCIA)
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

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* SIDEBAR RETRÁTIL COM MARCA VETORIAL ELEGIV */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        
        {/* BRANDING HEADER */}
        <div className="sidebar-header">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>
            <img 
              src={sidebarCollapsed ? "/logo/icon.svg" : "/logo/horizontal.svg"} 
              alt="Elegiv Gestão 360" 
              className="logo-svg"
            />
          </a>
          <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? '❯' : '❮'}
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
          {menuCategories.map((cat, idx) => {
            const filteredItems = cat.items.filter(item => 
              item.label.toLowerCase().includes(searchTerm)
            );
            if (filteredItems.length === 0) return null;

            return (
              <div key={idx} className="nav-group">
                {!sidebarCollapsed && (
                  <div className="nav-group-title">{cat.category}</div>
                )}
                {filteredItems.map((mod) => {
                  const isLocked = (planLevels[userPlan] || 1) < (planLevels[mod.minPlan] || 1);
                  const isActive = activePage === mod.id;

                  return (
                    <div
                      key={mod.id}
                      className={`nav-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                      onClick={() => handleNavClick(mod)}
                      title={sidebarCollapsed ? mod.label : undefined}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{mod.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="nav-label" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {mod.label}
                        </span>
                      )}
                      {!sidebarCollapsed && mod.badge && (
                        <span className="nav-badge">{mod.badge}</span>
                      )}
                      {!sidebarCollapsed && isLocked && (
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>🔒</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL DA APLICAÇÃO */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
        
        {/* TOPBAR HEADER STICKY */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-context">
              Elegiv Gestão 360 / <strong style={{ color: 'var(--text-primary)' }}>
                {menuCategories.flatMap(c => c.items).find(i => i.id === activePage)?.label || 'Visão Geral'}
              </strong>
            </div>
          </div>

          <div className="topbar-right">
            {/* NOTIFICAÇÃO BELL WITH BADGE & PANEL */}
            <button className="topbar-btn" onClick={() => setIsNotifOpen(!isNotifOpen)} title="Notificações">
              🔔
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
                    <div className="notif-title">💬 Novo Lead via WhatsApp</div>
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
                <div className="notif-item unread">
                  <div className="notif-item-dot"></div>
                  <div className="notif-item-content">
                    <div className="notif-title">🛡️ Trilha de Auditoria LGPD</div>
                    <div className="notif-meta">Acesso criptografado registrado com hash HMAC-256.</div>
                    <div className="notif-time">Há 1 hora</div>
                  </div>
                </div>
              </div>
            </div>

            {/* USER PROFILE DROPDOWN */}
            <div className="user-menu-container" style={{ position: 'relative' }}>
              <div className="user-menu" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                <div className="user-avatar">EG</div>
                <div className="user-greeting">
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
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Elegiv Oficial</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@elegiv.com.br</div>
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
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setActivePage('meu_perfil'); setIsUserMenuOpen(false); }}>
                      <User size={16} /> Meu Perfil
                    </button>
                    <button style={{ textAlign: 'left', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }} onClick={() => { setActivePage('admin_master'); setIsUserMenuOpen(false); }}>
                      <ShieldCheck size={16} /> Master Admin
                    </button>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setActivePage('preferencias'); setIsUserMenuOpen(false); }}>
                      <Crown size={16} /> Meu Plano e Faturas
                    </button>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { setActivePage('ajustes_config'); setIsUserMenuOpen(false); }}>
                      <Settings size={16} /> Configurações do Gabinete
                    </button>
                    <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          
          {/* HOME / DASHBOARD OVERVIEW */}
          {activePage === 'home' && (
            <div className="home-grid">
              
              <div className="home-main">
                {/* HERO BANNER DINÂMICO */}
                <div className="hero-banner" ref={heroBannerRef}>
                  <div className="hero-content">
                    <div className="hero-date">📅 {currentDateFormatted}</div>
                    <h1 className="hero-title">
                      Bem-vindo ao Elegiv Gestão 360
                    </h1>
                    <p className="hero-subtitle">
                      Plataforma de inteligência eleitoral, gestão de demandas comunitárias e disparos WhatsApp em tempo real.
                    </p>
                  </div>
                </div>

                {/* STATS GRID ANIMADO GSAP */}
                <div className="stats-grid" ref={statsGridRef}>
                  <div className="stat-card liquid-glass">
                    <span className="stat-label">Eleitores / Clientes</span>
                    <span className="stat-value">4.850</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>+12% este mês</span>
                  </div>
                  <div className="stat-card liquid-glass">
                    <span className="stat-label">Demandas Concluídas</span>
                    <span className="stat-value">142</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>SLA 98.4%</span>
                  </div>
                  <div className="stat-card liquid-glass">
                    <span className="stat-label">Doações (PIX)</span>
                    <span className="stat-value">R$ 48,5k</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Transparência</span>
                  </div>
                  <div className="stat-card liquid-glass">
                    <span className="stat-label">Disparos WhatsApp</span>
                    <span className="stat-value">18.400</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-light)' }}>Bairro Target</span>
                  </div>
                </div>

                {/* ATALHOS RÁPIDOS */}
                <div className="section-card liquid-glass">
                  <div className="section-card-header">
                    <h3 className="section-title">⚡ Acesso Rápido a Módulos Chave</h3>
                  </div>
                  <div className="quick-access-grid">
                    <div className="qa-item" onClick={() => setActivePage('admin-master')}>
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
                    <span className="cal-title">📅 Agosto 2026</span>
                    <div>
                      <button className="cal-nav">‹</button>
                      <button className="cal-nav">›</button>
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
                    <h3 className="section-title">🎂 Aniversariantes VIP da Semana</h3>
                  </div>
                  <div className="birthday-list">
                    <div className="birthday-item">
                      <div className="birthday-avatar">CR</div>
                      <div>
                        <div className="birthday-name">Cláudio Roberto (Liderança)</div>
                        <div className="birthday-phone">📱 (11) 98877-1122 • Hoje</div>
                      </div>
                    </div>
                    <div className="birthday-item">
                      <div className="birthday-avatar">AM</div>
                      <div>
                        <div className="birthday-name">Ana Maria (Coordenadora)</div>
                        <div className="birthday-phone">📱 (11) 97766-3344 • Amanhã</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* PÁGINA: PAINEL MASTER ADMIN (SaaS GOVERNANCE & TENANTS) */}
          {activePage === 'admin-master' && (
            <div className="section-card liquid-glass">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>👑 Painel Master Admin & Governança SaaS</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Gestão Global de Gabinetes, Licenciamento, Métricas de Receita e Integradores Server-Side.</p>
                </div>
                <button className="btn-primary" onClick={() => setNewCabinetName('Novo Gabinete ' + (tenantsList.length + 1))}>
                  + Provisionar Novo Gabinete
                </button>
              </div>

              {/* CARDS DE MÉTRICAS MASTER SaaS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid var(--accent)', padding: '1.2rem', borderRadius: '12px' }}>
                  <div style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '700' }}>Receita Recorrente (MRR)</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>R$ 14.990/mês</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>+18.5% este mês</div>
                </div>
                <div style={{ background: 'rgba(122,0,255,0.05)', border: '1px solid var(--accent-light)', padding: '1.2rem', borderRadius: '12px' }}>
                  <div style={{ color: '#b877ff', fontSize: '0.8rem', fontWeight: '700' }}>Gabinetes / Tenants</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>{tenantsList.length} Ativos</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Multitenancy PostgreSQL</div>
                </div>
                <div style={{ background: 'rgba(0,255,170,0.05)', border: '1px solid var(--success)', padding: '1.2rem', borderRadius: '12px' }}>
                  <div style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: '700' }}>Eleitores Totais na Base</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>64.350</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Criptografia AES-256</div>
                </div>
                <div style={{ background: 'rgba(255,170,0,0.05)', border: '1px solid var(--warning)', padding: '1.2rem', borderRadius: '12px' }}>
                  <div style={{ color: 'var(--warning)', fontSize: '0.8rem', fontWeight: '700' }}>Status VPS Hetzner & Sentry</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>100% Operational</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Coolify + Cloudflare</div>
                </div>
              </div>

              {/* FORMULÁRIO DE PROVISIONAMENTO RÁPIDO */}
              {newCabinetName !== '' && (
                <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--accent)', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--accent)' }}>✨ Provisionar Novo Gabinete / Empresa Assinante</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input 
                      type="text" 
                      value={newCabinetName} 
                      onChange={(e) => setNewCabinetName(e.target.value)}
                      placeholder="Nome do Gabinete ou Candidato..."
                      style={{ padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
                    />
                    <select 
                      value={selectedTenantPlan} 
                      onChange={(e) => setSelectedTenantPlan(e.target.value)}
                      style={{ padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
                    >
                      <option value="BASIC">Plano Básico (R$ 790/mês)</option>
                      <option value="PRO">Plano Pro (R$ 1.800/mês)</option>
                      <option value="POLITICAL">Plano Político (R$ 3.500/mês)</option>
                      <option value="ENTERPRISE">Plano Enterprise (R$ 8.900/mês)</option>
                    </select>
                    <button onClick={handleAddCabinetTenant} className="btn-primary">Confirmar Criação</button>
                  </div>
                </div>
              )}

              {adminStatusMessage && (
                <div style={{ marginBottom: '1.5rem', color: 'var(--success)', fontWeight: '700', padding: '0.75rem', background: 'rgba(0,255,170,0.1)', borderRadius: '8px', border: '1px solid rgba(0,255,170,0.3)' }}>
                  {adminStatusMessage}
                </div>
              )}

              {/* TABELA MASTER DE GABINETES / ASSINANTES */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>🏢 Gabinetes & Tenants Cadastrados</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', marginBottom: '2rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Gabinete / Cliente</th>
                    <th style={{ padding: '0.75rem' }}>Localização</th>
                    <th style={{ padding: '0.75rem' }}>Plano SaaS</th>
                    <th style={{ padding: '0.75rem' }}>Eleitores Mapeados</th>
                    <th style={{ padding: '0.75rem' }}>MRR</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Ações Master</th>
                  </tr>
                </thead>
                <tbody>
                  {tenantsList.map((t) => (
                    <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.9rem' }}>
                        <div style={{ fontWeight: '700', color: '#fff' }}>{t.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {t.id} • Party: {t.party}</div>
                      </td>
                      <td style={{ padding: '0.9rem' }}>{t.city} / {t.state}</td>
                      <td style={{ padding: '0.9rem' }}>
                        <span className={`pref-tag ${t.plan === 'POLITICAL' ? 'political' : 'plan-pro'}`}>{t.plan}</span>
                      </td>
                      <td style={{ padding: '0.9rem', fontWeight: '700', color: 'var(--accent)' }}>{t.votersCount.toLocaleString()}</td>
                      <td style={{ padding: '0.9rem', color: 'var(--success)', fontWeight: '700' }}>{t.mrr}</td>
                      <td style={{ padding: '0.9rem' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700', background: t.status === 'Ativo' ? 'rgba(0,255,170,0.15)' : 'rgba(255,23,68,0.15)', color: t.status === 'Ativo' ? 'var(--success)' : 'var(--danger)' }}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.9rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleChangeTenantStatus(t.id, t.status)}
                          style={{ background: 'transparent', border: '1px solid var(--border)', color: t.status === 'Ativo' ? 'var(--danger)' : 'var(--success)', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                        >
                          {t.status === 'Ativo' ? 'Suspender' : 'Reativar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* INTEGRATION STATUS & MONITORING */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <h4 style={{ color: 'var(--accent)', fontSize: '1rem', marginBottom: '0.75rem' }}>🔑 Chaves de Integração Mestre</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Google Gemini AI API:</span>
                      <span style={{ color: 'var(--success)' }}>🟢 Configurada (env)</span>
                    </div>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Resend E-mail API:</span>
                      <span style={{ color: 'var(--success)' }}>🟢 Configurada (env)</span>
                    </div>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Meta Conversions API (CAPI):</span>
                      <span style={{ color: 'var(--success)' }}>🟢 Server-to-Server Ativo</span>
                    </div>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Criptografia AES-256 Key:</span>
                      <span style={{ color: 'var(--success)' }}>🟢 32-Bytes Válida</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <h4 style={{ color: 'var(--accent-light)', fontSize: '1rem', marginBottom: '0.75rem' }}>🛡️ Telemetria & Monitoramento Sentry</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Taxa de Erros Server-Side:</span>
                      <span style={{ color: 'var(--success)' }}>0.00% (Estável)</span>
                    </div>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Containers Coolify VPS:</span>
                      <span style={{ color: 'var(--success)' }}>2/2 Healthy</span>
                    </div>
                    <div style={{ display: 'flex', justify: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Proteção Cloudflare WAF:</span>
                      <span style={{ color: 'var(--accent)' }}>Strict SSL Active</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}



          {activePage === 'map_eleitor' && (
            <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '80vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin color="var(--accent)" /> Mapeamento de Eleitor (CRM)
                </h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <Search size={16} /> Filtros Avançados
                  </button>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <Users size={16} /> Novo Contato
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
                {/* Tabela CRM */}
                <div className="section-card liquid-glass" style={{ padding: '0', overflowY: 'auto' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem' }}>
                    <div className="input-group" style={{ flex: 1, margin: 0 }}>
                      <input type="text" placeholder="Buscar eleitor por nome, telefone ou CPF..." className="form-input" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '1rem' }}>Eleitor</th>
                        <th style={{ padding: '1rem' }}>Telefone</th>
                        <th style={{ padding: '1rem' }}>Bairro</th>
                        <th style={{ padding: '1rem' }}>Tag / Apoio</th>
                        <th style={{ padding: '1rem' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Maria das Graças', tel: '(11) 98888-7777', bairro: 'Vila Esperança', tag: 'Apoiador Forte', tagColor: 'var(--success)' },
                        { name: 'João Carlos', tel: '(11) 97777-6666', bairro: 'Centro', tag: 'Indeciso', tagColor: 'var(--warning)' },
                        { name: 'Ana Paula Silva', tel: '(11) 96666-5555', bairro: 'Jardim Primavera', tag: 'Liderança', tagColor: '#a855f7' },
                      ].map((c, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s', cursor: 'pointer' }}>
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#fff' }}>{c.name}</td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{c.tel}</td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{c.bairro}</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', border: `1px solid ${c.tagColor}`, color: c.tagColor, background: 'rgba(0,0,0,0.3)' }}>
                              {c.tag}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                            <button style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--success)', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }} title="WhatsApp"><MessageCircle size={14} /></button>
                            <button style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }} title="Nova Demanda"><ClipboardList size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mapa Mock */}
                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                  <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase' }}>Visão Geográfica</h3>
                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
                    <div style={{ textAlign: 'center', zIndex: 1 }}>
                      <Map size={48} color="var(--accent)" style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mapa de Calor Ativado<br/>(Requer Chave API Google Maps)</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Maior Concentração:</span>
                      <span style={{ fontWeight: '600', color: 'var(--accent)' }}>Vila Esperança</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONSTRUTOR DE PÁGINAS BIO E CONVERSÃO / DOAÇÕES */}
          {['pag_candidato', 'pag_conversao', 'criador_doacao'].includes(activePage) && <GestaoPaginasBio />}

          {/* GABINETE DINÂMICO (KANBAN E DEMANDAS) */}
          {['kanban', 'prod_tarefas'].includes(activePage) && <KanbanDinamico />}
          {['demandas', 'crm_suporte', 'prod_assuntos'].includes(activePage) && <GestaoDemandas />}

          {/* AGENDA COM WHATSAPP */}
          {activePage === 'agenda_wa' && <AgendaWA />}

          {/* CRM ELEITORAL (CADASTROS) */}
          {['cadastros', 'atendimento', 'leads', 'crm_atendimento', 'crm_demandas'].includes(activePage) && <GestaoCadastros />}

          {/* ENCURTADOR DE LINKS */}
          {activePage === 'ferr_links' && <GestaoLinksCurtos />}

          {/* GERADOR DE QR CODE */}
          {activePage === 'ferr_qr' && <GeradorQRCode onOpenIA={openIAWithContext} />}

          {/* ASSINADOR DIGITAL ICP-BRASIL */}
          {activePage === 'ferr_assinador' && <AssinadorDigital />}

          {/* GESTÃO LEGISLATIVA (PLs, EMENDAS, VERBAS, RESULTADOS) */}
          {activePage === 'leg_pl' && <GestaoLegislativo initialTab="pls" />}
          {activePage === 'leg_emendas' && <GestaoLegislativo initialTab="emendas" />}
          {activePage === 'leg_verbas' && <GestaoLegislativo initialTab="verbas" />}
          {activePage === 'leg_resultados' && <GestaoLegislativo initialTab="resultados" />}

          {/* GEOMAPEAMENTO ELEITORAL */}
          {['geomapeamento', 'crm_assuntos'].includes(activePage) && <Geomapeamento />}

          {/* CAMPANHAS DE E-MAIL & MARKETING DIGITAL */}
          {['email_envio', 'email_templates', 'mkt_digital', 'mkt_fluxos'].includes(activePage) && <CampanhasEmail />}

          {/* RELATÓRIOS BI & RANKING (CONFORME DOCUMENTAÇÃO MD) */}
          {activePage === 'rel_demandas' && <RelatoriosBI initialTab="demandas" />}
          {activePage === 'rel_cadastros' && <RelatoriosBI initialTab="cadastros" />}
          {activePage === 'rel_ranking' && <RelatoriosBI initialTab="ranking_indicacoes" />}
          {['rel_grupos', 'grupos_tags'].includes(activePage) && <RelatoriosBI initialTab="ranking_grupos" />}
          {['rel_graficos', 'relatorios', 'dashboard'].includes(activePage) && <RelatoriosBI initialTab="graficos" />}

          {/* CENTRAL WHATSAPP, TRÁFEGO & AUTOMAÇÕES */}
          {['wa_oficial', 'whatsapp', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'sms_envio', 'ligacoes_auto', 'mkt_trafego', 'mkt_gestao', 'mkt_n8n'].includes(activePage) && <CentralWhatsApp />}

          {/* ASSISTENTE DE IA */}
          {['ia_assistente', 'ia_mkt', 'ia_sentimento'].includes(activePage) && <AssistenteIA />}

          {/* CRIADOR DE FORMULÁRIOS */}
          {activePage === 'forms' && <CriadorFormularios />}

          {/* OFÍCIOS & GERADOR DE DOCUMENTOS */}
          {['doc_oficios', 'gerador_doc'].includes(activePage) && <DocumentosOficios />}

          {/* GESTÃO DE USUÁRIOS & MASTER ADMIN */}
          {activePage === 'admin_master' && <GestaoUsuarios />}

          {/* CONFIGURAÇÕES GERAIS DO GABINETE */}
          {['ajustes_config', 'preferencias', 'configuracoes'].includes(activePage) && <ConfiguracoesGerais />}

          {/* MEU PERFIL */}
          {['meu_perfil', 'conta_perfil'].includes(activePage) && <MeuPerfil />}

          {/* GERADOR DE MOLDURAS / TWIBBON */}
          {activePage === 'mkt_molduras' && <GeradorMolduras />}

          {/* MALA DIRETA E ETIQUETAS */}
          {activePage === 'doc_etiquetas' && <GeradorEtiquetas />}

          {/* GESTÃO DE TIPOS DE DOCUMENTOS */}
          {activePage === 'doc_tipos' && <GestaoTiposDocumentos />}

          {/* GESTÃO DE DOCUMENTOS RECEBIDOS */}
          {activePage === 'doc_recebidos' && <GestaoDocumentosRecebidos />}

          {/* REPOSITÓRIO DE DOCUMENTOS / OFÍCIOS */}
          {activePage === 'doc_lista' && <GestaoDocLista onOpenIA={openIAWithContext} />}

          {/* AGENTE DE IA MODULAR CONTEXTUAL (DRAWER FLUTUANTE) */}
          <AgenteIAModular 
            isOpen={isIAModalOpen} 
            onClose={() => setIsIAModalOpen(false)} 
            contexto={iaContext} 
          />

          {/* CENTRAL DO WHATSAPP OFICIAL */}
          {['wa_oficial', 'whatsapp', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'sms_envio', 'ligacoes_auto'].includes(activePage) && <CentralWhatsApp />}

          {/* CONSTRUTOR DE PÁGINAS BIO (ESTILO LINKTREE) */}
          {activePage === 'pag_candidato' && <GestaoPaginasBio />}

          {activePage === 'meta' && (
            <div className="section-card liquid-glass">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>🎯 Meta Ads, Pixel & Conversions API (CAPI)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', margin: '1.5rem 0' }}>
                <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Meta Pixel ID:</label>
                  <input type="text" value={pixelId} onChange={(e) => setPixelId(e.target.value)} style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }} />
                </div>
                <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Token Conversions API (CAPI):</label>
                  <input type="password" value={capiToken} onChange={(e) => setCapiToken(e.target.value)} style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }} />
                </div>
                <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID Conta de Anúncios Meta:</label>
                  <input type="text" value={adAccountId} onChange={(e) => setAdAccountId(e.target.value)} style={{ width: '100%', marginTop: '0.3rem', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }} />
                </div>
              </div>
              <button onClick={handleTriggerPixelEvent} className="btn-primary">⚡ Testar Disparo CAPI Server-to-Server</button>
              {pixelStatus && <div style={{ marginTop: '1rem', color: 'var(--accent)', fontWeight: '600' }}>{pixelStatus}</div>}
            </div>
          )}

          {activePage === 'ia' && (
            <div className="section-card liquid-glass">
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>✨ Assistente de Inteligência Artificial Google Gemini</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Gerador de discursos, respostas a ofícios e copys de campanha otimizadas.</p>
              <textarea 
                value={aiPrompt} 
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: Redija um pronunciamento sobre a entrega da nova creche no bairro Centro..."
                rows={4}
                style={{ width: '100%', padding: '1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', marginBottom: '1rem' }}
              />
              <button onClick={handleRunAi} disabled={isAiLoading} className="btn-primary">
                {isAiLoading ? '✨ Gerando resposta...' : '✨ Processar via Gemini AI'}
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
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>🛡️ Proteção de Padrão Militar AES-256 & LGPD</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1.5rem 0' }}>
              <div style={{ background: 'rgba(0,230,118,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,230,118,0.3)' }}>
                  <h3 style={{ color: 'var(--success)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>🔐 Criptografia AES-256-GCM</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Os dados identificáveis dos cidadãos são salvos criptografados com chave mestre de 32 bytes.</p>
                </div>
                <div style={{ background: 'rgba(0,240,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.3)' }}>
                  <h3 style={{ color: 'var(--accent)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>⚖️ Trilha de Auditoria HMAC-SHA256</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Todas as consultas e alterações registram hashes invioláveis na tabela AuditLog do PostgreSQL.</p>
                </div>
              </div>
            </div>
          )}
          {activePage === 'painel_arrecadacao' && (
            <div className="section-card liquid-glass" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              
              <div className="fund-goal-container liquid-glass">
                <div className="fund-goal-glow"></div>
                <div className="fund-goal-header">
                  <div>
                    <div className="fund-goal-title">Progresso da Campanha (PIX)</div>
                    <div className="fund-goal-value">R$ 142.550,00</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="fund-goal-target">Meta: R$ 500.000,00</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>28%</div>
                  </div>
                </div>
                <div className="fund-progress-bar">
                  <div className="fund-progress-fill" style={{ width: '28%' }}>
                    <div className="fund-progress-glow"></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>R$ 0</span>
                  <span>R$ 250k</span>
                  <span>R$ 500k</span>
                </div>
              </div>

              <div className="fund-stats-grid">
                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Users size={18} /> <span style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total de Doadores</span>
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff' }}>1.284</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><TrendingUp size={12} /> +42 esta semana</div>
                </div>

                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Banknote size={18} /> <span style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Ticket Médio</span>
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff' }}>R$ 111,02</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Média por CPF</div>
                </div>

                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                  <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <QrCode size={20} /> Gerar QR Code PIX
                  </button>
                  <button style={{ width: '100%', padding: '1rem', fontSize: '1rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <Share2 size={20} /> Link de Doação
                  </button>
                </div>
              </div>

              <div className="section-card liquid-glass">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={20} color="var(--accent)" /> Feed de Doações (Tempo Real)
                </h3>
                
                <div className="donation-feed">
                  {[
                    { name: 'Maria Santos', cpf: '***.456.789-**', val: 'R$ 50,00', time: 'Agora mesmo' },
                    { name: 'João P.', cpf: '***.123.456-**', val: 'R$ 200,00', time: 'Há 5 min' },
                    { name: 'Carlos E.', cpf: '***.987.654-**', val: 'R$ 1.000,00', time: 'Há 12 min', badge: 'Alto Valor' },
                    { name: 'Ana Silva', cpf: '***.333.222-**', val: 'R$ 20,00', time: 'Há 28 min' },
                  ].map((d, i) => (
                    <div key={i} className="donation-item">
                      <div className="donation-user">
                        <div className="donor-avatar">{d.name.charAt(0)}</div>
                        <div>
                          <div className="donor-info-name">{d.name}</div>
                          <div className="donor-info-meta">
                            <span>CPF: {d.cpf}</span> • <span>{d.time}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {d.badge && <span className="donation-badge">{d.badge}</span>}
                        <div className="donation-value">+{d.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}


          {activePage === 'notificacoes' && (
            <div className="section-card liquid-glass">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🔔 Central de Notificações
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

          {activePage === 'logs_auditoria' && (
            <div className="section-card liquid-glass">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck color="var(--accent)" /> Trilha de Auditoria (Logs do Gabinete)
                </h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <Search size={16} /> Pesquisar
                  </button>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                    <FileText size={16} /> Exportar Relatório
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem' }}>Data / Hora</th>
                      <th style={{ padding: '1rem' }}>Operador</th>
                      <th style={{ padding: '1rem' }}>Ação</th>
                      <th style={{ padding: '1rem' }}>Recurso</th>
                      <th style={{ padding: '1rem' }}>Autenticação / IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: '14/08/26 19:10:22', user: 'Ana (Coordenadora)', action: 'Exportar Lista', resource: 'Eleitores', ip: '189.44.xx.xx (Auth: 2FA)', color: 'var(--accent)' },
                      { time: '14/08/26 18:45:10', user: 'SuperAdmin Master', action: 'Alterar Config', resource: 'Integração Asaas', ip: '177.10.xx.xx (HMAC-V)', color: 'var(--danger)' },
                      { time: '14/08/26 15:20:00', user: 'Carlos (Assessor)', action: 'Disparo Massa', resource: 'WhatsApp', ip: '192.168.x.x', color: 'var(--success)' },
                    ].map((log, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{log.time}</td>
                        <td style={{ padding: '1rem', fontWeight: '600' }}>{log.user}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: `rgba(0, 0, 0, 0.3)`, border: `1px solid ${log.color}`, color: log.color, fontSize: '0.75rem', fontWeight: '700' }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>{log.resource}</td>
                        <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage === 'admin_master' && (
            <div className="section-card liquid-glass" style={{ borderTop: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
                  <ShieldCheck size={28} /> MASTER ADMIN (Visão Global)
                </h2>
                <span className="pricing-badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444' }}>ACESSO RESTRITO</span>
              </div>

              <div className="fund-stats-grid">
                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Gabinetes Ativos</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>142</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--success)' }}>+8 este mês</div>
                </div>
                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Faturamento (MRR)</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>R$ 78.4K</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--success)' }}>Asaas Sincronizado</div>
                </div>
                <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Carga do Servidor</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ef4444' }}>42%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hetzner / Coolify (Estável)</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '2rem 0 1rem 0', color: 'var(--text-secondary)' }}>
                System-Wide Audit Log (Todas as Contas)
              </h3>
              
              <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.8rem' }}>Data</th>
                      <th style={{ padding: '0.8rem' }}>Tenant (Gabinete)</th>
                      <th style={{ padding: '0.8rem' }}>Ação do Sistema</th>
                      <th style={{ padding: '0.8rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: '19:22:10', tenant: 'Gabinete SP-Centro', action: 'Renovação de Assinatura (Webhook Asaas)', status: 'SUCCESS' },
                      { time: '19:15:00', tenant: 'Campanha Pref. 2026', action: 'Disparo WhatsApp API (10.000 msgs)', status: 'PROCESSING' },
                      { time: '18:50:11', tenant: 'Gabinete MG-02', action: 'Falha de Login (Brute Force IP: 45.x.x.x)', status: 'BLOCKED' },
                      { time: '18:10:05', tenant: 'Elegiv Oficial', action: 'Atualização Variável de Ambiente (.env)', status: 'WARNING' },
                    ].map((log, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '0.8rem', color: 'var(--text-muted)' }}>{log.time}</td>
                        <td style={{ padding: '0.8rem', fontWeight: '600' }}>{log.tenant}</td>
                        <td style={{ padding: '0.8rem' }}>{log.action}</td>
                        <td style={{ padding: '0.8rem' }}>
                          <span style={{ 
                            padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700',
                            background: log.status === 'SUCCESS' ? 'rgba(0,230,118,0.1)' : log.status === 'BLOCKED' ? 'rgba(239,68,68,0.1)' : log.status === 'WARNING' ? 'rgba(255,215,0,0.1)' : 'rgba(0,240,255,0.1)',
                            color: log.status === 'SUCCESS' ? 'var(--success)' : log.status === 'BLOCKED' ? '#ef4444' : log.status === 'WARNING' ? '#ffd700' : 'var(--accent)'
                          }}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
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
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>Planos e Preços — Elegiv Gestão 360</h2>
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

          {/* MÓDULO AGENDA WA */}
          {activePage === 'agenda_wa' && <AgendaWA />}

          {/* MÓDULO OFÍCIOS */}
          {activePage === 'doc_oficios' && <DocumentosOficios />}

          {/* MÓDULO GEOMAPEAMENTO */}
          {activePage === 'geomapeamento' && <Geomapeamento />}

          {/* MÓDULO CAMPANHAS EMAIL */}
          {['email_envio', 'email_templates'].includes(activePage) && <CampanhasEmail />}

          {/* CENTRAL DE RELATÓRIOS BI */}
          {['rel_demandas', 'rel_cadastros', 'rel_ranking'].includes(activePage) && <RelatoriosBI />}

          {/* ASSISTENTE DE IA */}
          {['ia_assistente', 'ia_mkt', 'ia_sentimento'].includes(activePage) && <AssistenteIA />}

          {/* GESTÃO DE USUÁRIOS E ACESSOS */}
          {['ajustes_usuarios', 'seg_acessos', 'logs_auditoria'].includes(activePage) && <GestaoUsuarios />}

          {/* ASSINADOR DIGITAL */}
          {activePage === 'ferr_assinador' && <AssinadorDigital />}

          {/* CONFIGURAÇÕES GERAIS */}
          {['ajustes_config', 'preferencias'].includes(activePage) && <ConfiguracoesGerais />}

          {/* CRIADOR DE FORMULÁRIOS */}
          {activePage === 'forms' && <CriadorFormularios />}

          {activePage === 'doc_oficios' && <GeradorDocumentos />}

          {/* FALLBACK PARA MÓDULOS EM CONSTRUÇÃO */}
          {!['home', 'admin-master', 'cadastros', 'demandas', 'kanban', 'forms', 'whatsapp', 'wa_oficial', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'sms_envio', 'ligacoes_auto', 'meta', 'ia', 'seguranca', 'preferencias', 'agenda_wa', 'doc_oficios', 'geomapeamento', 'email_envio', 'email_templates', 'rel_demandas', 'rel_cadastros', 'rel_ranking', 'ia_assistente', 'ia_mkt', 'ia_sentimento', 'ajustes_usuarios', 'seg_acessos', 'logs_auditoria', 'ferr_assinador', 'ajustes_config', 'meu_perfil', 'conta_perfil', 'ferr_links', 'ferr_qr', 'mkt_molduras', 'doc_etiquetas', 'doc_tipos', 'doc_recebidos', 'doc_lista', 'pag_candidato'].includes(activePage) && (
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

    </div>
  );
}
