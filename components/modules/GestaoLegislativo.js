import React, { useState } from 'react';
import { 
  X, BookOpen, RefreshCw, ScrollText, Banknote, Vote, Plus, Search, Filter, Download, 
  CheckCircle2, Clock, AlertTriangle, FileText, ChevronRight, BarChart2,
  Building2, Landmark, PieChart, Sparkles, UserCheck, Calendar
} from 'lucide-react';

export default function GestaoLegislativo({ initialTab = 'pls' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'pls', 'emendas', 'verbas', 'resultados'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showTseSyncModal, setShowTseSyncModal] = useState(false);
  const [showNovoVotoModal, setShowNovoVotoModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleExportPDF = () => {
    alert('Iniciando geração de PDF do relatório...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleSyncTSE = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setShowTseSyncModal(false);
      alert('Sincronização com o Tribunal Superior Eleitoral (TSE) concluída com sucesso!');
    }, 2500);
  };

  const handleNovoRegistroSubmit = (e) => {
    e.preventDefault();
    alert('Novo registro salvo com sucesso!');
    setShowNovoModal(false);
  };

  // DADOS DE MOCK: PROJETOS DE LEI
  const [projetosLei, setProjetosLei] = useState([
    {
      id: 'PL-042/2026',
      titulo: 'Dispõe sobre a criação do Programa de Tecnãologia e Robótica nas Escolas Municipais',
      autor: 'Gabinete Dep. Silva / Ver. Marcos',
      comissao: 'Constituição e Justiça (CCJ)',
      status: 'Em Tramitação',
      dataApresentacao: '12/03/2026',
      relator: 'Ver. Amanda Costa',
      parecer: 'Favorável'
    },
    {
      id: 'PL-038/2026',
      titulo: 'Institui a obrigatoriedade de atendimento prioritário a cuidadores de PWD não serviço público',
      autor: 'Gabinete Dep. Silva',
      comissao: 'Saúde e Direitos Humanos',
      status: 'Aprovado',
      dataApresentacao: '05/02/2026',
      relator: 'Ver. Roberto Alves',
      parecer: 'Aprovado por Unanimidade'
    },
    {
      id: 'PL-019/2026',
      titulo: 'Estabelece a política municipal de incentivo à instalação de energia solar em prédios públicos',
      autor: 'Gabinete Dep. Silva',
      comissao: 'Meio Ambiente e Infraestrutura',
      status: 'Sancionado',
      dataApresentacao: '15/01/2026',
      relator: 'Ver. Paulo Ramos',
      parecer: 'Sancionado pelo Executivo (Lei nº 4.821/26)'
    }
  ]);

  // DADOS DE MOCK: EMENDAS PARLAMENTARES
  const [emendas, setEmendas] = useState([
    {
      codigo: 'EM-2026-001',
      municipio: 'São Paulo - Zona Leste',
      objeto: 'Reforma e Equipamentos da UBS Vila Esperança',
      valorEmpenhado: 450000,
      valorPago: 300000,
      status: 'Em Execução',
      orgao: 'Secretaria Municipal de Saúde'
    },
    {
      codigo: 'EM-2026-002',
      municipio: 'Campinas - SP',
      objeto: 'Instalação de Iluminação LED na Praça Central',
      valorEmpenhado: 180000,
      valorPago: 180000,
      status: 'Concluído',
      orgao: 'Secretaria de Obras e Serviços'
    },
    {
      codigo: 'EM-2026-003',
      municipio: 'Santos - SP',
      objeto: 'Aquisição de Ônibus para Transporte Escolar Adaptado',
      valorEmpenhado: 320000,
      valorPago: 0,
      status: 'Aguardando Liberação',
      orgao: 'Secretaria de Educação'
    }
  ]);

  // DADOS DE MOCK: VERBAS INDENIZATÓRIAS / COTA PARLAMENTAR
  const [verbas, setVerbas] = useState([
    {
      id: 'REC-1042',
      data: '10/08/2026',
      categoria: 'Combustível & Lubrificantes',
      fornecedor: 'Posto Central SP Ltda',
      cnpj: '12.345.678/0001-90',
      valor: 2450.00,
      status: 'Aprovado'
    },
    {
      id: 'REC-1041',
      data: '04/08/2026',
      categoria: 'Divulgação da Atividade Parlamentar',
      fornecedor: 'Gráfica & Editora Alfa',
      cnpj: '98.765.432/0001-11',
      valor: 5800.00,
      status: 'Aprovado'
    },
    {
      id: 'REC-1040',
      data: '01/08/2026',
      categoria: 'Consultoria e Assessoramento Técnico',
      fornecedor: 'Lex Consultoria Jurídica',
      cnpj: '45.123.789/0001-55',
      valor: 8500.00,
      status: 'Em Análise'
    }
  ]);

  // CÁLCULOS TOTAIS
  const totalEmendasEmpenhadas = emendas.reduce((acc, curr) => acc + curr.valorEmpenhado, 0);
  const totalEmendasPagas = emendas.reduce((acc, curr) => acc + curr.valorPago, 0);
  const totalVerbasMes = verbas.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '85vh' }}>
      
      {/* CABEÇALHO DO MÓDULO LEGISLATIVO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff' }}>
            <Landmark color="var(--accent)" size={28} /> Gestão Legislativa & Parlamentar
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
            Acompanhe projetos de lei em tramitação, destinação de emendas e controle de cota indenizatória.
          </p>
        </div>
        
        <button onClick={() => setShowNovoModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.3rem' }}>
          <Plus size={18} /> Novo Registro
        </button>
      </div>

      {/* ABAS DE NAVEGAÇÃO INTERNAS */}
      <div style={{ display: 'flex', gap: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.8rem' }}>
        {[
          { id: 'pls', label: 'Projetos de Lei', icon: <BookOpen size={17} />, count: projetosLei.length },
          { id: 'emendas', label: 'Emendas Parlamentares', icon: <ScrollText size={17} />, count: emendas.length },
          { id: 'verbas', label: 'Verbas Indenizatórias', icon: <Banknote size={17} />, count: verbas.length },
          { id: 'resultados', label: 'Resultados Eleitorais', icon: <Vote size={17} /> }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 1.1rem', borderRadius: '10px',
                border: isActive ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
                background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255,255,255,0.02)',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span style={{ 
                  background: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.1)', 
                  color: isActive ? '#000' : '#fff',
                  borderRadius: '10px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: '800' 
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Buscar por código, título, cidade ou fornecedor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.88rem', width: '100%', outline: 'none' }}
          />
        </div>

        <button onClick={handleExportPDF} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.55rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
          <Download size={15} /> Exportar Relatório (PDF)
        </button>
      </div>

      {/* METRICS DASHBOARD CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div className="stat-card liquid-glass" style={{ padding: '1rem 1.2rem' }}>
          <span className="stat-label">Projetos de Lei Apresentados</span>
          <span className="stat-value" style={{ fontSize: '1.8rem' }}>14</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>3 Sancionados em 2026</span>
        </div>

        <div className="stat-card liquid-glass" style={{ padding: '1rem 1.2rem' }}>
          <span className="stat-label">Total Emendas Empenhadas</span>
          <span className="stat-value" style={{ fontSize: '1.8rem', color: 'var(--accent)' }}>
            R$ {(totalEmendasEmpenhadas / 1000).toFixed(0)}k
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Pago: R$ {(totalEmendasPagas / 1000).toFixed(0)}k
          </span>
        </div>

        <div className="stat-card liquid-glass" style={{ padding: '1rem 1.2rem' }}>
          <span className="stat-label">Cota Indenizatória não Mês</span>
          <span className="stat-value" style={{ fontSize: '1.8rem', color: '#a855f7' }}>
            R$ {totalVerbasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Dentro do teto aprovado</span>
        </div>
      </div>

      {/* CONTEÚDO DA ABA 1: PROJETOS DE LEI */}
      {activeTab === 'pls' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '0.9rem' }}>Código PL</th>
                <th style={{ padding: '0.9rem' }}>Título / Ementa</th>
                <th style={{ padding: '0.9rem' }}>Comissão Atual</th>
                <th style={{ padding: '0.9rem' }}>Relator</th>
                <th style={{ padding: '0.9rem' }}>Status</th>
                <th style={{ padding: '0.9rem', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projetosLei.map(pl => (
                <tr key={pl.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--accent)' }}>{pl.id}</td>
                  <td style={{ padding: '1rem', maxWidth: '380px' }}>
                    <div style={{ color: '#fff', fontWeight: '600', lineHeight: '1.3' }}>{pl.titulo}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Apresentado em: {pl.dataApresentacao}</div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{pl.comissao}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{pl.relator}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700',
                      background: pl.status === 'Sancionado' ? 'rgba(34, 197, 94, 0.15)' : pl.status === 'Aprovado' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: pl.status === 'Sancionado' ? 'var(--success)' : pl.status === 'Aprovado' ? 'var(--accent)' : 'var(--warning)',
                      border: `1px solid ${pl.status === 'Sancionado' ? 'var(--success)' : pl.status === 'Aprovado' ? 'var(--accent)' : 'var(--warning)'}`
                    }}>
                      {pl.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => setShowDetalhesModal(pl)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTEÚDO DA ABA 2: EMENDAS PARLAMENTARES */}
      {activeTab === 'emendas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '0.9rem' }}>Código Emenda</th>
                <th style={{ padding: '0.9rem' }}>Município / Destinão</th>
                <th style={{ padding: '0.9rem' }}>Objeto da Emenda</th>
                <th style={{ padding: '0.9rem' }}>Valor Empenhado</th>
                <th style={{ padding: '0.9rem' }}>Valor Pago</th>
                <th style={{ padding: '0.9rem' }}>Status Liberação</th>
              </tr>
            </thead>
            <tbody>
              {emendas.map(em => (
                <tr key={em.codigo} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--accent)' }}>{em.codigo}</td>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#fff' }}>{em.municipio}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>{em.objeto}</td>
                  <td style={{ padding: '1rem', fontWeight: '700', color: '#fff' }}>
                    R$ {em.valorEmpenhado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--success)' }}>
                    R$ {em.valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700',
                      background: em.status === 'Concluído' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0, 240, 255, 0.15)',
                      color: em.status === 'Concluído' ? 'var(--success)' : 'var(--accent)',
                      border: `1px solid ${em.status === 'Concluído' ? 'var(--success)' : 'var(--accent)'}`
                    }}>
                      {em.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTEÚDO DA ABA 3: VERBAS INDENIZATÓRIAS */}
      {activeTab === 'verbas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '0.9rem' }}>Nº Comprovante</th>
                <th style={{ padding: '0.9rem' }}>Data Emissão</th>
                <th style={{ padding: '0.9rem' }}>Categoria Despesa</th>
                <th style={{ padding: '0.9rem' }}>Fornecedor / CNPJ</th>
                <th style={{ padding: '0.9rem' }}>Valor Reembolsado</th>
                <th style={{ padding: '0.9rem' }}>Status Análise</th>
              </tr>
            </thead>
            <tbody>
              {verbas.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--accent)' }}>{v.id}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{v.data}</td>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#fff' }}>{v.categoria}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: '#fff', fontWeight: '500' }}>{v.fornecedor}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.cnpj}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '800', color: '#fff' }}>
                    R$ {v.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700',
                      background: v.status === 'Aprovado' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: v.status === 'Aprovado' ? 'var(--success)' : 'var(--warning)',
                      border: `1px solid ${v.status === 'Aprovado' ? 'var(--success)' : 'var(--warning)'}`
                    }}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTEÚDO DA ABA 4: RESULTADOS ELEITORAIS HISTÓRICOS */}
      {activeTab === 'resultados' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>
          <div className="section-card liquid-glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <Vote size={20} /> Votação Histórica por Bairro (Última Eleição)
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setShowTseSyncModal(true)} style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
                  <RefreshCw size={14} /> Sincronizar TSE
                </button>
                <button onClick={() => setShowNovoVotoModal(true)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Plus size={14} /> Incluir Informação
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { bairro: 'Centro', votos: 4850, pct: 42.5 },
                { bairro: 'Vila Esperança', votos: 3210, pct: 28.1 },
                { bairro: 'Jardim Primavera', votos: 2190, pct: 19.2 },
                { bairro: 'Alto do Ipê', votos: 1140, pct: 10.2 }
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#fff', fontWeight: '600' }}>{b.bairro}</span>
                    <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{b.votos.toLocaleString()} votos ({b.pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${b.pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), #00a8ff)', borderRadius: '10px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card liquid-glass" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <PieChart size={48} color="var(--accent)" style={{ opacity: 0.8, marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>Desempenho Geral do Mandato</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '320px' }}>
              Total de 11.400 votos consolidados nas zonas eleitorais prioritárias do município.
            </p>
          </div>
        </div>
      )}

    
      {/* MODAL: NOVO REGISTRO UNIFICADO */}
      {showNovoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Adicionar {activeTab === 'pls' ? 'Projeto de Lei' : activeTab === 'emendas' ? 'Emenda' : 'Verba'}</h3>
              <button onClick={() => setShowNovoModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleNovoRegistroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Título / Objeto</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeTab === 'verbas' ? 'Valor (R$)' : 'Detalhes / Autoria'}</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Salvar Registro</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETALHES PL */}
      {showDetalhesModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent)' }}>{showDetalhesModal.id}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{showDetalhesModal.titulo}</p>
              </div>
              <button onClick={() => setShowDetalhesModal(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <p><strong>Autor:</strong> {showDetalhesModal.autor}</p>
              <p><strong>Comissão:</strong> {showDetalhesModal.comissao}</p>
              <p><strong>Status:</strong> <span style={{ color: 'var(--accent)' }}>{showDetalhesModal.status}</span></p>
              <p><strong>Relator:</strong> {showDetalhesModal.relator}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SINCRONIZAR TSE */}
      {showTseSyncModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '400px', padding: '2rem', textAlign: 'center' }}>
            <Vote size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Sincronização DivulgaCand TSE</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>O sistema buscará as votações consolidadas por Zona e Seção não repositório aberto do Tribunal Superior Eleitoral.</p>
            <button onClick={handleSyncTSE} disabled={isSyncing} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              {isSyncing ? <RefreshCw className="spin" size={16} /> : 'Iniciar Sincronização Segura'}
            </button>
            <button onClick={() => setShowTseSyncModal(false)} disabled={isSyncing} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL: INCLUIR INFO MANUAL */}
      {showNovoVotoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '400px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Adicionar Local de Votação</h3>
              <button onClick={() => setShowNovoVotoModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Nome do Bairro / Colégio Eleitoral" style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <input type="number" placeholder="Quantidade de Votos" style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <button onClick={() => { alert('Dado inserido localmente!'); setShowNovoVotoModal(false); }} className="btn-primary" style={{ marginTop: '0.5rem' }}>Salvar Dados</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
