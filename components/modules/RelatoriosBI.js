import React, { useState } from 'react';
import { 
  BarChart3, PieChart, LineChart, Sparkles, Filter, Download, Printer, ChevronDown, 
  Activity, Map, ListTodo, Users, Award, QrCode, Copy, ExternalLink, Check, Search, 
  ChevronRight, ZoomIn, ZoomOut, FileSpreadsheet, Layers, ShieldCheck, Tag, ArrowUpRight, 
  Sliders, Calendar, UserCheck, HelpCircle, X, CheckSquare, Square
} from 'lucide-react';

export default function RelatoriosBI({ initialTab = 'graficos' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'graficos', 'demandas', 'cadastros', 'ranking_indicacoes', 'ranking_grupos'
  
  // ESTADO DO LINK DE APOIADOR (MODAL / SUBTELA)
  const [selectedLeaderModal, setSelectedLeaderModal] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSizeZoom, setFontSizeZoom] = useState(100);

  // SUB-ABAS DO RANKING DE GRUPOS (6 PERSPECTIVAS DA MD)
  const [grupoSubTab, setGrupoSubTab] = useState('por_grupo'); // 'por_grupo', 'indicadores', 'distribuicao', 'sem_indicacao', 'origem', 'matriz'

  // FILTROS DE DEMANDAS
  const [colunasSelecionadasDemandas, setColunasSelecionadasDemandas] = useState({
    protocolo: true, nome: true, assunto: true, status: true, fase: true,
    endereco: true, bairro: true, cidade: true, assessor: true, dataInicio: true,
    contato: true, solicitante: false, complemento: false, indicacao: false, descricao: false
  });
  const [mostrarColunasDemandas, setMostrarColunasDemandas] = useState(true);

  // FILTROS DE CADASTROS
  const [colunasSelecionadasCadastros, setColunasSelecionadasCadastros] = useState({
    nome: true, grupo: true, indicacaoPai: true, cidade: true, uf: true,
    sexo: true, bairro: true, dataCadastro: true, usuarioCadastrou: true, telefone: true
  });
  const [mostrarColunasCadastros, setMostrarColunasCadastros] = useState(true);

  // BUSCA E PESQUISA
  const [searchTerm, setSearchTerm] = useState('');

  // DADOS DE MOCK PARA LIDERANÇAS (LINK DE APOIADOR)
  const liderancasMock = [
    { id: 1, nome: 'Anísio Fontinelli', ddi: '+55', cel: '(61) 98426-9304', loc: 'VICENTE PIRES / DF', indicados: 30, tag: 'Liderança Comunitária', slug: 'anisio-fontinelli' },
    { id: 2, nome: 'AK RUA (Coletivo Juventude)', ddi: '+55', cel: '(11) 97123-4567', loc: 'SÃO PAULO / SP', indicados: 48, tag: 'Jovens & Esporte', slug: 'ak-rua' },
    { id: 3, nome: 'Anderson Alves Pereira', ddi: '+55', cel: '(11) 98888-1122', loc: 'CAMPINAS / SP', indicados: 25, tag: 'Empresários', slug: 'anderson-alves' },
    { id: 4, nome: 'Iolanda Maria Tenório', ddi: '+55', cel: '(61) 99111-4455', loc: 'TAGUATINGA / DF', indicados: 19, tag: 'Ação Social', slug: 'iolanda-tenãorio' },
    { id: 5, nome: 'Tais Rosa', ddi: '+55', cel: '(21) 98222-3344', loc: 'NITERÓI / RJ', indicados: 14, tag: 'Saúde & Mulher', slug: 'tais-rosa' }
  ];

  // DADOS DE MOCK PARA DEMANDAS
  const demandasMock = [
    { id: '#PROT-0142', nome: 'Maria Joaquina', endereco: 'Rua das Flores, 123', bairro: 'Centro', cidade: 'São Paulo', assunto: 'Solicitação de Poda de Árvore', status: 'Pendente', fase: 'Triagem', assessor: 'Carlos Silva', dataInicio: '10/08/2026', celular: '(11) 98888-7777', ultimoAndamento: 'Encaminhado para a Secretaria de Obras' },
    { id: '#PROT-0143', nome: 'José Pedro Santos', endereco: 'Av. Principal, 1000', bairro: 'Bela Vista', cidade: 'São Paulo', assunto: 'Recapeamento Asfáltico', status: 'Concluído', fase: 'Atendido', assessor: 'Amanda Costa', dataInicio: '05/08/2026', celular: '(11) 97777-6666', ultimoAndamento: 'Serviço executado em 12/08/2026' },
    { id: '#PROT-0144', nome: 'Ana Paula Ferreira', endereco: 'Rua 7 de Setembro, 45', bairro: 'Vila Esperança', cidade: 'Campinas', assunto: 'Consulta Médica Especializada', status: 'Em Andamento', fase: 'Agendamento', assessor: 'Roberto Alves', dataInicio: '12/08/2026', celular: '(19) 99111-2233', ultimoAndamento: 'Aguardando vaga na rede municipal' }
  ];

  // DADOS DE MOCK PARA GRUPOS & ORIGEM (REF: MD RANKING DE GRUPOS)
  const gruposOrigemMock = [
    { grupo: 'Apoiadores Fortes', indicacao: 1420, semIndicacao: 380, total: 1800, pctIndicacao: '78.8%' },
    { grupo: 'Lideranças Bairro Centro', indicacao: 850, semIndicacao: 150, total: 1000, pctIndicacao: '85.0%' },
    { grupo: 'Comerciantes & Parceiros', indicacao: 420, semIndicacao: 280, total: 700, pctIndicacao: '60.0%' },
    { grupo: 'Voluntários da Saúde', indicacao: 630, semIndicacao: 90, total: 720, pctIndicacao: '87.5%' },
    { grupo: 'Juventude Conectada', indicacao: 910, semIndicacao: 490, total: 1400, pctIndicacao: '65.0%' }
  ];

  const handleCopyLink = (slug) => {
    const url = `https://GabinetAK.com.br/parceria/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleColunaDemanda = (col) => {
    setColunasSelecionadasDemandas(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const marcarTodasColunasDemandas = () => {
    const novoEstado = {};
    Object.keys(colunasSelecionadasDemandas).forEach(k => novoEstado[k] = true);
    setColunasSelecionadasDemandas(novoEstado);
  };

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh', padding: '1.5rem', gap: '1.5rem' }}>
      
      {/* HEADER PRINCIPAL E SELETOR DE ABAS DO MD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
            <BarChart3 color="var(--accent)" size={28} /> Central de Relatórios BI & Inteligência Eleitoral
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
            Extração de relatórios, gráficos de atendimento, ranking de lideranças e análise de grupos.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem' }}>
            <Sparkles size={16} /> Assistente IA
          </button>
          <button className="btn-primary outline" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem' }}>
            <Printer size={16} /> Imprimir
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.3rem', background: 'var(--success)', borderColor: 'var(--success)' }}>
            <FileSpreadsheet size={16} /> Exportar Excel
          </button>
        </div>
      </div>

      {/* ABAS SUPERIORES CONFORME DOCUMENTAÇÃO MD ENEGIS */}
      <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.8rem' }}>
        {[
          { id: 'graficos', label: '1. Gráfico de Atendimentos', icon: <PieChart size={17} /> },
          { id: 'demandas', label: '2. Relatório de Demandas', icon: <ListTodo size={17} /> },
          { id: 'cadastros', label: '3. Relatório de Cadastros & Links', icon: <Users size={17} /> },
          { id: 'ranking_indicacoes', label: '4. Ranking de Indicações', icon: <Award size={17} /> },
          { id: 'ranking_grupos', label: '5. Ranking de Grupos (Tags)', icon: <Layers size={17} /> }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '0.65rem 1.1rem', borderRadius: '10px', whitespace: 'nowrap',
                border: isActive ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255,255,255,0.02)',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: GRÁFICO DE DEMANDAS / ATENDIMENTOS (REF: modulo_grafico_demandas_crm.md) */}
      {/* ========================================================================= */}
      {activeTab === 'graficos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* FILTROS GLOBAIS DA MD: Exercícios, Assuntos, Cidades */}
          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', flex: 1 }}>
              <div>
                <label style={labelStyle}>Exercício (Anão)</label>
                <select style={inputStyle}>
                  <option>Todos os Exercícios</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Assuntos / Pautas</label>
                <select style={inputStyle}>
                  <option>Todos os Assuntos</option>
                  <option>Saúde Pública</option>
                  <option>Infraestrutura Viária</option>
                  <option>Segurança Urbana</option>
                  <option>Educação & Vagas</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Cidade / Região</label>
                <select style={inputStyle}>
                  <option>Todas as Cidades</option>
                  <option>São Paulo - SP</option>
                  <option>Campinas - SP</option>
                  <option>Brasília - DF</option>
                </select>
              </div>
            </div>
            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', alignSelf: 'flex-end', height: '42px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} /> Aplicar Filtros
            </button>
          </div>

          {/* CARTOES KPIs SOLICITADOS NA MD: Total Atendimentos, Total Assuntos, Total Cidades */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--accent)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ListTodo size={16} color="var(--accent)" /> Total de Atendimentos
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#fff', marginTop: '0.4rem' }}>1.432</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.2rem' }}>+14.2% em relação a 2025</div>
            </div>

            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--warning)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--warning)" /> Total de Assuntos
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#fff', marginTop: '0.4rem' }}>48</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Categorias registradas não gabinete</div>
            </div>

            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--success)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Map size={16} color="var(--success)" /> Total de Cidades
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#fff', marginTop: '0.4rem' }}>22</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.2rem' }}>Capilaridade regional</div>
            </div>
          </div>

          {/* 4 GRANDES BLOCOS DE GRÁFICOS SOLICITADOS NA MD */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            {/* Bloco 1: Atendimentos por Anão/Mês */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LineChart size={18} color="var(--accent)" /> Atendimentos por Mês (Evolução 2026)
              </h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem', height: '210px', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {[35, 55, 42, 85, 60, 95, 80, 110, 90, 125, 140, 130].map((val, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: '700' }}>{val}</span>
                    <div style={{ width: '85%', height: `${(val / 140) * 100}%`, background: 'linear-gradient(180deg, var(--accent), #00a8ff)', borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>M{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco 2: Status dos Atendimentos */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PieChart size={18} color="var(--warning)" /> Status dos Atendimentos
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center', height: '210px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#fff', fontWeight: '600' }}>Concluídos / Atendidos</span>
                    <span style={{ color: 'var(--success)', fontWeight: '800' }}>930 (65%)</span>
                  </div>
                  <div className="fund-progress-bar" style={{ height: '12px' }}>
                    <div className="fund-progress-fill" style={{ width: '65%', background: 'var(--success)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#fff', fontWeight: '600' }}>Em Andamento / Em Tramitação</span>
                    <span style={{ color: 'var(--warning)', fontWeight: '800' }}>358 (25%)</span>
                  </div>
                  <div className="fund-progress-bar" style={{ height: '12px' }}>
                    <div className="fund-progress-fill" style={{ width: '25%', background: 'var(--warning)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#fff', fontWeight: '600' }}>Pendentes / Triagem</span>
                    <span style={{ color: 'var(--danger)', fontWeight: '800' }}>144 (10%)</span>
                  </div>
                  <div className="fund-progress-bar" style={{ height: '12px' }}>
                    <div className="fund-progress-fill" style={{ width: '10%', background: 'var(--danger)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco 3: Top 10 Assuntos */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Top 10 Assuntos Mais Solicitados</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { n: 'Infraestrutura & Asfalto', v: 340 },
                  { n: 'Consultas e Exames (Saúde)', v: 290 },
                  { n: 'Iluminação Pública (Manutenção)', v: 210 },
                  { n: 'Vagas em Creches', v: 185 },
                  { n: 'Segurança & Policiamento', v: 140 }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>{i+1}º. {item.n}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent)' }}>{item.v} solicitações</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco 4: Top 10 Cidades / Bairros */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>Top 10 Cidades / Bairros</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { n: 'São Paulo - Zona Leste (Vila Esperança)', v: 480 },
                  { n: 'São Paulo - Centro Histórico', v: 320 },
                  { n: 'Campinas - Região Nãorte', v: 210 },
                  { n: 'Brasília - Taguatinga / Vicente Pires', v: 195 },
                  { n: 'Santos - Baixada Santista', v: 140 }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500' }}>{i+1}º. {item.n}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--warning)' }}>{item.v} solicitações</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: RELATÓRIO DE DEMANDAS (REF: modulo_relatorio_demandas_crm.md) */}
      {/* ========================================================================= */}
      {activeTab === 'demandas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* SELETOR DE COLUNAS COLAPSÁVEL CONFORME MD */}
          <div className="section-card liquid-glass" style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={18} color="var(--accent)" />
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#fff' }}>Colunas do Relatório</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>(Selecione as colunas que deseja exibir e exportar)</span>
              </div>
              <button 
                onClick={marcarTodasColunasDemandas} 
                style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.35rem 0.9rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Marcar Todos
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', fontSize: '0.82rem' }}>
              {[
                { k: 'protocolo', label: 'Protocolo' }, { k: 'nome', label: 'Nome Solicitante' },
                { k: 'assunto', label: 'Assunto' }, { k: 'status', label: 'Status' },
                { k: 'fase', label: 'Fase da Demanda' }, { k: 'endereco', label: 'Endereço' },
                { k: 'bairro', label: 'Bairro' }, { k: 'cidade', label: 'Cidade' },
                { k: 'assessor', label: 'Assessor Responsável' }, { k: 'dataInicio', label: 'Data Inicial' },
                { k: 'contato', label: 'Contato (Celular)' }, { k: 'solicitante', label: 'Solicitante' },
                { k: 'complemento', label: 'Complemento' }, { k: 'indicacao', label: 'Indicação' },
                { k: 'descricao', label: 'Descrição' }
              ].map(col => (
                <label key={col.k} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: colunasSelecionadasDemandas[col.k] ? '#fff' : 'var(--text-muted)' }}>
                  <input type="checkbox" checked={colunasSelecionadasDemandas[col.k]} onChange={() => toggleColunaDemanda(col.k)} />
                  {col.label}
                </label>
              ))}
            </div>
          </div>

          {/* PAINEL DE FILTROS AVANÇADOS DA MD */}
          <div className="section-card liquid-glass" style={{ padding: '1.2rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} /> Painel de Filtros Avançados
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
              <div><label style={labelStyle}>Status</label><select style={inputStyle}><option>Todos os Status</option><option>Pendente</option><option>Em Andamento</option><option>Concluído</option></select></div>
              <div><label style={labelStyle}>Fase da Demanda</label><select style={inputStyle}><option>Todas as Fases</option><option>Triagem</option><option>Atendimento</option><option>Encaminhado</option></select></div>
              <div><label style={labelStyle}>Responsável Atual</label><select style={inputStyle}><option>Todos os Responsáveis</option><option>Carlos Silva</option><option>Amanda Costa</option></select></div>
              <div><label style={labelStyle}>Assessor</label><select style={inputStyle}><option>Todos os Assessores</option></select></div>
              <div><label style={labelStyle}>Cidade</label><select style={inputStyle}><option>Todas as Cidades</option><option>São Paulo</option><option>Campinas</option></select></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.8rem' }}>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', textDecoration: 'underline' }}>Limpar filtros</button>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input type="text" placeholder="Pesquisa rápida..." style={{ padding: '0.5rem 0.9rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '0.82rem' }} />
                <button className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Aplicar filtros</button>
              </div>
            </div>
          </div>

          {/* TABELA DE DEMANDAS */}
          <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}>
                  {colunasSelecionadasDemandas.protocolo && <th style={{ padding: '0.9rem' }}>Protocolo</th>}
                  {colunasSelecionadasDemandas.nome && <th style={{ padding: '0.9rem' }}>Solicitante</th>}
                  {colunasSelecionadasDemandas.assunto && <th style={{ padding: '0.9rem' }}>Assunto</th>}
                  {colunasSelecionadasDemandas.bairro && <th style={{ padding: '0.9rem' }}>Bairro / Cidade</th>}
                  {colunasSelecionadasDemandas.assessor && <th style={{ padding: '0.9rem' }}>Assessor</th>}
                  {colunasSelecionadasDemandas.status && <th style={{ padding: '0.9rem' }}>Status</th>}
                </tr>
              </thead>
              <tbody>
                {demandasMock.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    {colunasSelecionadasDemandas.protocolo && <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--accent)' }}>{d.id}</td>}
                    {colunasSelecionadasDemandas.nome && <td style={{ padding: '1rem', fontWeight: '700', color: '#fff' }}>{d.nome}</td>}
                    {colunasSelecionadasDemandas.assunto && <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.assunto}</td>}
                    {colunasSelecionadasDemandas.bairro && <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.bairro} - {d.cidade}</td>}
                    {colunasSelecionadasDemandas.assessor && <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.assessor}</td>}
                    {colunasSelecionadasDemandas.status && (
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700',
                          background: d.status === 'Concluído' ? 'rgba(34, 197, 94, 0.15)' : d.status === 'Em Andamento' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: d.status === 'Concluído' ? 'var(--success)' : d.status === 'Em Andamento' ? 'var(--warning)' : 'var(--danger)',
                          border: `1px solid ${d.status === 'Concluído' ? 'var(--success)' : d.status === 'Em Andamento' ? 'var(--warning)' : 'var(--danger)'}`
                        }}>
                          {d.status}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: RELATÓRIO DE CADASTROS & LINKS DE APOIADOR (REF: modulo_relatorio_cadastros_crm.md) */}
      {/* ========================================================================= */}
      {activeTab === 'cadastros' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 240, 255, 0.05)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <QrCode color="var(--accent)" /> Gestão de Links de Apoiadores & Lideranças
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Gere links exclusivos e QR Codes para suas lideranças ampliarem a captação de eleitores.
              </p>
            </div>

            <button 
              className="btn-primary"
              onClick={() => setSelectedLeaderModal(liderancasMock[0])}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.5rem' }}
            >
              <QrCode size={18} /> Abrir Painel de Links de Apoiador
            </button>
          </div>

          {/* SELEÇÃO DE LIDERANÇAS EM CARDS (REF: MD ITEM 4) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            {liderancasMock.map(lider => (
              <div key={lider.id} className="section-card liquid-glass" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(0, 240, 255, 0.3)', fontWeight: '700' }}>
                      {lider.tag}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--success)' }}>
                      {lider.indicados} indicados
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginTop: '0.8rem' }}>{lider.nome}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{lider.cel} • {lider.loc}</div>
                </div>

                <button 
                  onClick={() => setSelectedLeaderModal(lider)}
                  style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                >
                  <QrCode size={16} color="var(--accent)" /> Gerenciar Link & QR Code
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: RANKING DE INDICAÇÕES (REF: modulo_ranking_indicacoes_crm.md) */}
      {/* ========================================================================= */}
      {activeTab === 'ranking_indicacoes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* LEGENDA DE BADGES COLORIDOS DA MD */}
          <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#fff' }}>TOTAL GERAL (Métricas da Rede):</span>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', background: 'rgba(0, 168, 255, 0.15)', color: '#00a8ff', border: '1px solid #00a8ff', fontSize: '0.78rem', fontWeight: '700' }}>
                🔵 Indicações Diretas
              </span>
              <span style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', border: '1px solid #a855f7', fontSize: '0.78rem', fontWeight: '700' }}>
                🟣 Total da Rede (Descendentes)
              </span>
              <span style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid #ef4444', fontSize: '0.78rem', fontWeight: '700' }}>
                🔴 Rede + Líder
              </span>
              <span style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)', border: '1px solid var(--success)', fontSize: '0.78rem', fontWeight: '700' }}>
                🟢 Rede não Grupo
              </span>
            </div>
          </div>

          {/* TABELA DE CLASSIFICAÇÃO (RANKING EM CARDS CONFORME MD) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { pos: '1º', nome: 'AK RUA (Coletivo Juventude)', diretas: 48, totalRede: 142, grupo: 190 },
              { pos: '2º', nome: 'ANDERSON ALVES PEREIRA', diretas: 30, totalRede: 85, grupo: 115 },
              { pos: '3º', nome: 'IOLANDA MARIA TENORIO', diretas: 25, totalRede: 60, grupo: 85 },
              { pos: '4º', nome: 'ROYAL TULIP PARCEIROS', diretas: 19, totalRede: 42, grupo: 61 },
              { pos: '5º', nome: 'TAIS ROSA SAÚDE', diretas: 14, totalRede: 31, grupo: 45 }
            ].map(r => (
              <div key={r.pos} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '900', color: r.pos === '1º' ? 'var(--warning)' : r.pos === '2º' ? '#e2e8f0' : 'var(--accent)' }}>
                    {r.pos}
                  </span>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>{r.nome}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Liderança com link ativo</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(0, 168, 255, 0.12)', color: '#00a8ff', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800' }}>
                    🔵 {r.diretas} Diretas
                  </span>
                  <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800' }}>
                    🟣 {r.totalRede} Descendentes
                  </span>
                  <span style={{ padding: '0.4rem 0.8rem', background: 'rgba(34, 197, 94, 0.12)', color: 'var(--success)', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800' }}>
                    🟢 {r.grupo} Total não Grupo
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 5: RANKING DE GRUPOS (REF: modulo_ranking_grupos_crm.md - 6 PERSPECTIVAS) */}
      {/* ========================================================================= */}
      {activeTab === 'ranking_grupos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* NAVEGAÇÃO PELAS 6 PERSPECTIVAS ANALÍTICAS DA MD */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '10px', overflowX: 'auto' }}>
            {[
              { id: 'por_grupo', label: 'A. Por Grupo' },
              { id: 'indicadores', label: 'B. Indicadores' },
              { id: 'distribuicao', label: 'C. Distribuição' },
              { id: 'sem_indicacao', label: 'D. Sem Indicação' },
              { id: 'origem', label: 'E. Origem (% Indicação)' },
              { id: 'matriz', label: 'F. Top Indicadores x Grupos' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setGrupoSubTab(sub.id)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '6px', border: 'none',
                  background: grupoSubTab === sub.id ? 'var(--accent)' : 'transparent',
                  color: grupoSubTab === sub.id ? '#000' : 'var(--text-secondary)',
                  fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', whitespace: 'nowrap'
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* EXIBIÇÃO DA SUB-ABA E: ORIGEM POR GRUPO CONFORME MD */}
          {grupoSubTab === 'origem' && (
            <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '1rem' }}>Grupo (Tag)</th>
                    <th style={{ padding: '1rem' }}>Por Indicação</th>
                    <th style={{ padding: '1rem' }}>Sem Indicação (Orgânico)</th>
                    <th style={{ padding: '1rem' }}>Total não Grupo</th>
                    <th style={{ padding: '1rem' }}>% Taxa de Indicação</th>
                  </tr>
                </thead>
                <tbody>
                  {gruposOrigemMock.map((g, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '1rem', fontWeight: '800', color: '#fff' }}>{g.grupo}</td>
                      <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent)' }}>{g.indicacao}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{g.semIndicacao}</td>
                      <td style={{ padding: '1rem', fontWeight: '700', color: '#fff' }}>{g.total}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.65rem', borderRadius: '6px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)', fontWeight: '800', border: '1px solid var(--success)', fontSize: '0.8rem' }}>
                          {g.pctIndicacao}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VISÃO PADRÃO DAS OUTRAS SUB-ABAS DE GRUPO */}
          {grupoSubTab !== 'origem' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem' }}>
              {gruposOrigemMock.map((g, i) => (
                <div key={i} className="section-card liquid-glass" style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>{g.grupo}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{g.total} cadastros totais</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--accent)' }}>{g.indicacao} indicados</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>{g.pctIndicacao} via liderança</div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL / SUBTELA: LINK DE APOIADOR (REF: MD ITEM 4 DETALHADO) */}
      {/* ========================================================================= */}
      {selectedLeaderModal && (
        <div style={{ fixed: 'inset', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="section-card liquid-glass" style={{ width: '100%', maxWidth: '680px', padding: '2rem', border: '1px solid var(--accent)', background: 'rgba(10, 15, 30, 0.95)' }}>
            
            {/* HEADER DO MODAL DE LINK DE APOIADOR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(0, 240, 255, 0.15)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '800' }}>
                  LINK DE APOIADOR EXCLUSIVO
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '0.4rem' }}>
                  {selectedLeaderModal.nome}
                </h3>
              </div>
              
              <button onClick={() => setSelectedLeaderModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}>
                <X size={24} />
              </button>
            </div>

            {/* CONTEÚDO DO CARTÃO DE LIDERANÇA (REF: MD ITEM 4) */}
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              
              {/* QR CODE GERADO */}
              <div style={{ background: '#fff', padding: '0.8rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                  src={`https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent(`https://GabinetAK.com.br/parceria/${selectedLeaderModal.slug}`)}&config=${encodeURIComponent(JSON.stringify({ body: 'round', eye: 'frame13', eyeBall: 'ball15', bodyColor: '#000000', bgColor: '#FFFFFF' }))}`} 
                  alt="QR Code Liderança" 
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <span style={{ fontSize: '0.68rem', color: '#000', fontWeight: '800', marginTop: '0.4rem' }}>SCAN ME</span>
              </div>

              {/* DADOS E AÇÕES DO LINK */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>URL Customizada de Indicação:</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      readOnly 
                      value={`https://GabinetAK.com.br/parceria/${selectedLeaderModal.slug}`}
                      style={{ flex: 1, padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--accent)', borderRadius: '6px', color: 'var(--accent)', fontSize: '0.82rem', fontWeight: '700' }}
                    />
                    <button 
                      onClick={() => handleCopyLink(selectedLeaderModal.slug)}
                      className="btn-primary" 
                      style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                      {copiedLink ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <div><b>Telefone:</b> {selectedLeaderModal.ddi} {selectedLeaderModal.cel}</div>
                  <div><b>Localização:</b> {selectedLeaderModal.loc}</div>
                </div>

                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--success)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>Desempenho de Captação:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--success)' }}>{selectedLeaderModal.indicados} indicado(s)</span>
                </div>
              </div>

            </div>

            {/* BARRAS DE CONTROLE E IMPRESSÃO (REF: MD ITEM 4) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tamanho da Fonte:</span>
                <button onClick={() => setFontSizeZoom(prev => Math.max(80, prev - 10))} style={zoomBtnStyle}>-</button>
                <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '700' }}>{fontSizeZoom}%</span>
                <button onClick={() => setFontSizeZoom(prev => Math.min(130, prev + 10))} style={zoomBtnStyle}>+</button>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button className="btn-primary outline" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem' }}>
                  <Printer size={16} /> Imprimir Cartão
                </button>
                <a 
                  href={`https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent(`https://GabinetAK.com.br/parceria/${selectedLeaderModal.slug}`)}`}
                  target="_blank"
                  rel="nãoreferrer"
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', textDecoration: 'none' }}
                >
                  <Download size={16} /> Baixar QR Code PNG
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.3rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.82rem',
  outline: 'none'
};

const zoomBtnStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '0.2rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '800'
};
