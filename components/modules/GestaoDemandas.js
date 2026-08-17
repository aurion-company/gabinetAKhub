import React, { useState, useEffect } from 'react';
import { ClipboardList, Plus, FileBarChart, Search, Filter, AlertCircle, CheckCircle2, Clock, Inbox, FileText, Download, Printer } from 'lucide-react';

export default function GestaoDemandas() {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'create', 'report'
  const [loading, setLoading] = useState(true);
  const [demandas, setDemandas] = useState([]);

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const response = await fetch('/api/demands');
        if (response.ok) {
          const data = await response.json();
          // Mapeia para o formato visual
          const mappedData = data.map(demand => ({
            id: demand.id,
            protocolo: demand.protocol,
            cadastro: demand.voterId || 'Não Vinculado',
            assunto: demand.title,
            responsavel: 'Assessor Geral', // Simulando a ausência do Join no MVP
            status: demand.status,
            prioridade: demand.priority,
            prazo: new Date(demand.createdAt).toLocaleDateString('pt-BR')
          }));
          setDemandas(mappedData);
        }
      } catch (error) {
        console.error('Erro ao buscar demandas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemands();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      
      {/* HEADER E NAVEGAÇÃO */}
      <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <ClipboardList color="var(--accent)" /> Gestão de Demandas
        </h2>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {view === 'dashboard' && (
            <>
              <button className="btn-primary outline" onClick={() => setView('report')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                <FileBarChart size={16} /> Relatórios Avançados
              </button>
              <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={16} /> Nova Demanda
              </button>
            </>
          )}
          {(view === 'create' || view === 'report') && (
            <button className="btn-primary outline" onClick={() => setView('dashboard')}>Voltar ao Dashboard</button>
          )}
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (DASHBOARD) */}
      {view === 'dashboard' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
          
          {/* KPI CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Minhas Demandas</span>
                <Inbox size={20} color="#3b82f6" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>24</div>
            </div>
            
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Demandas em Aberto</span>
                <Clock size={20} color="var(--warning)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>142</div>
            </div>
            
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Prazo para Hoje</span>
                <AlertCircle size={20} color="var(--danger)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>8</div>
            </div>
            
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Total Geral</span>
                <CheckCircle2 size={20} color="var(--success)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '800' }}>894</div>
            </div>
          </div>

          {/* ÁREA DA TABELA E FILTROS */}
          <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Abas e Filtros */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ ...pillStyle, background: 'var(--accent)', color: '#000' }}>Todas</button>
                <button style={pillStyle}>Minhas demandas</button>
                <button style={pillStyle}>Abertas</button>
                <button style={pillStyle}>Finalizadas</button>
              </div>
              <div style={{ display: 'flex', gap: '1rem', width: '400px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" placeholder="Buscar por protocolo ou nome..." style={{ ...inputStyle, paddingLeft: '2.5rem', borderRadius: '20px' }} />
                </div>
                <button style={iconBtnStyle}><Filter size={16} /> Filtros</button>
              </div>
            </div>

            {/* Tabela de Demandas */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Protocolo</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Cadastro</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Assunto</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Responsável</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Prioridade</th>
                  </tr>
                </thead>
                <tbody>
                  {demandas.map((d, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} className="table-row-hover">
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--accent)' }}>{d.protocolo}</td>
                      <td style={{ padding: '1rem', color: '#fff' }}>{d.cadastro}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.assunto}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.responsavel}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{d.status}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ color: d.prioridade === 'Alta' ? 'var(--danger)' : d.prioridade === 'Média' ? 'var(--warning)' : 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.85rem' }}>{d.prioridade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FORMULÁRIO DE NOVA DEMANDA */}
      {view === 'create' && (
        <div className="fade-in section-card liquid-glass" style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Cadastrar Nova Demanda</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h4 style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold' }}>INFORMAÇÕES BÁSICAS</h4>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Interessado (Cidadão) *</label>
                  <input type="text" placeholder="Busque um cadastro existente..." style={inputStyle} />
                </div>
                <button className="btn-primary" style={{ padding: '0.8rem', height: '42px', display: 'flex', alignItems: 'center' }}><Plus size={16}/></button>
              </div>

              <div>
                <label style={labelStyle}>Assunto da Demanda *</label>
                <select style={inputStyle}>
                  <option>Selecione o tema principal...</option>
                  <option>Saúde / Marcação de Exames</option>
                  <option>Infraestrutura / Asfalto</option>
                  <option>Jurídico</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Descrição Detalhada *</label>
                <textarea rows={4} placeholder="Relato completo da solicitação..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              
              <div>
                <label style={labelStyle}>Observações Internas (Opcional)</label>
                <input type="text" placeholder="Anotações para a equipe..." style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h4 style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 'bold' }}>CLASSIFICAÇÃO E PRAZOS</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Fase da Demanda</label>
                  <select style={inputStyle}>
                    <option>Em Aberto (Triagem)</option>
                    <option>Em Andamento</option>
                    <option>Aguardando Retorno (Órgão)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Assessor Responsável</label>
                  <select style={inputStyle}>
                    <option>Atribuir a mim</option>
                    <option>Equipe Externa Norte</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Prioridade *</label>
                  <select style={inputStyle}>
                    <option>Normal (Baixa)</option>
                    <option>Importante (Média)</option>
                    <option>Urgente (Alta)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Prazo Limite</label>
                  <input type="date" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Valor Envolvido (R$)</label>
                <input type="text" placeholder="R$ 0,00" style={inputStyle} />
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button className="btn-primary" style={{ flex: 1, padding: '1rem' }}>Criar Demanda</button>
                <button className="btn-primary outline" onClick={() => setView('dashboard')} style={{ flex: 1, padding: '1rem', borderColor: 'transparent', color: 'var(--text-muted)' }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO DE RELATÓRIOS */}
      {view === 'report' && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
          
          <div className="section-card liquid-glass" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent)' }}>Filtros de Extração Hiper-Detalhados</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', borderColor: 'var(--success)', padding: '0.5rem 1rem' }}><Download size={16} /> Exportar Excel</button>
                <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', borderColor: 'var(--border)', padding: '0.5rem 1rem' }}><Printer size={16} /> Imprimir</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <select style={inputStyle}><option>Status</option></select>
              <select style={inputStyle}><option>Fase da Demanda</option></select>
              <select style={inputStyle}><option>Assunto</option></select>
              <select style={inputStyle}><option>Bairro / Cidade</option></select>
              <select style={inputStyle}><option>Responsável Atual</option></select>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
              <label style={labelStyle}>Colunas a Exportar:</label>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><input type="checkbox" defaultChecked /> Marcar Todas</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><input type="checkbox" defaultChecked /> Protocolo</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><input type="checkbox" defaultChecked /> Interessado</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><input type="checkbox" /> Telefone/Contato</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><input type="checkbox" /> Endereço Completo</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><input type="checkbox" defaultChecked /> Último Andamento</label>
              </div>
            </div>
          </div>

          <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Pré-visualização da Extração</h4>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
              <FileText size={48} opacity={0.2} style={{ margin: '0 auto 1rem' }} />
              <p>Aplique os filtros acima para visualizar a prévia dos dados.</p>
            </div>
          </div>

        </div>
      )}

      <style dangerouslySetInnerHTML={{__html:`
        .table-row-hover:hover {
          background: rgba(255,255,255,0.05);
        }
      `}} />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem'
};

const iconBtnStyle = {
  background: 'var(--bg-elevated)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  transition: 'all 0.2s',
  fontSize: '0.85rem'
};

const pillStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-secondary)',
  padding: '0.4rem 1rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: '600',
  cursor: 'pointer'
};
