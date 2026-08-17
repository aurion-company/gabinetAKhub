import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, ChevronDown, Download, Upload, Trash2, Link as LinkIcon, QrCode, Phone, UserCheck, Merge, AlertTriangle, FileText, Settings, Smartphone } from 'lucide-react';

export default function GestaoCadastros() {
  const [view, setView] = useState('list'); // 'list' | 'export' | 'links' | 'duplicates'
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await fetch('/api/voters');
        if (response.ok) {
          const data = await response.json();
          // Mapeia os dados do banco para o formato visual esperado pela tabela
          const mappedData = data.map(voter => ({
            id: voter.id,
            nome: voter.name,
            grupo: voter.tags && voter.tags.length > 0 ? voter.tags[0] : 'Sem Grupo',
            criado: new Date(voter.createdAt).toLocaleDateString('pt-BR'),
            celular: voter.phone || 'N/A',
            cidade: voter.city || 'N/A'
          }));
          setCadastros(mappedData);
        }
      } catch (error) {
        console.error('Erro ao buscar eleitores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'list':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total de Cadastros</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>4.250</div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Com Grupos</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>3.100</div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Indicações</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>850</div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Com Rede</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>1.200</div>
              </div>
            </div>

            {/* Listagem Central */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', width: '400px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="text" placeholder="Buscar por nome, telefone ou CPF..." style={{ ...inputStyle, paddingLeft: '2.5rem', borderRadius: '20px' }} />
                  </div>
                  <button style={iconBtnStyle}><Filter size={16} /> Filtros</button>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> Adicionar
                  </button>
                  <button className="btn-primary outline" onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    Avançado <ChevronDown size={16} />
                  </button>

                  {/* Dropdown Avançado */}
                  {showMenu && (
                    <div style={{ position: 'absolute', top: '110%', right: 0, background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.5rem', zIndex: 100, minWidth: '220px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                      <button onClick={() => { setView('duplicates'); setShowMenu(false); }} style={dropdownItemStyle}><Merge size={16}/> Gestão de Duplicidades</button>
                      <button onClick={() => { setView('links'); setShowMenu(false); }} style={dropdownItemStyle}><LinkIcon size={16}/> Link de Apoiador</button>
                      <button onClick={() => { setView('export'); setShowMenu(false); }} style={dropdownItemStyle}><Download size={16}/> Relatórios e Exportação</button>
                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>
                      <button style={dropdownItemStyle}><Upload size={16}/> Importar Planilha</button>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Nome</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Grupo (Tag)</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Criado em</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Celular</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Cidade</th>
                      <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cadastros.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} className="table-row-hover">
                        <td style={{ padding: '1rem', color: '#fff', fontWeight: 'bold' }}>{c.nome}</td>
                        <td style={{ padding: '1rem' }}><span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--accent)' }}>{c.grupo}</span></td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{c.criado}</td>
                        <td style={{ padding: '1rem', color: '#fff' }}>{c.celular}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{c.cidade}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem', background: 'rgba(0, 230, 118, 0.1)', color: 'var(--success)', borderColor: 'transparent' }} title="Ligar / WhatsApp"><Phone size={14} /></button>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Exibir Perfil"><UserCheck size={14} /></button>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Editar"><Settings size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', height: '100%', overflow: 'hidden' }}>
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={20}/> Exportação Granular</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div><label style={labelStyle}>Filtrar por Grupo</label><select style={inputStyle}><option>Todos os Grupos</option></select></div>
                <div><label style={labelStyle}>Filtrar por Cidade</label><select style={inputStyle}><option>Todas as Cidades</option></select></div>
                <div><label style={labelStyle}>Agrupar Por</label><select style={inputStyle}><option>Nenhum (Lista Plana)</option><option>Bairro</option></select></div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <label style={{ ...labelStyle, fontSize: '1rem', color: '#fff' }}>Quais colunas devem entrar no Excel?</label>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <label style={checkboxLabel}><input type="checkbox" defaultChecked /> Nome Completo</label>
                  <label style={checkboxLabel}><input type="checkbox" defaultChecked /> Celular / WhatsApp</label>
                  <label style={checkboxLabel}><input type="checkbox" /> E-mail</label>
                  <label style={checkboxLabel}><input type="checkbox" defaultChecked /> Bairro</label>
                  <label style={checkboxLabel}><input type="checkbox" defaultChecked /> Cidade</label>
                  <label style={checkboxLabel}><input type="checkbox" /> CPF / CNPJ</label>
                  <label style={checkboxLabel}><input type="checkbox" /> Data de Nascimento</label>
                  <label style={checkboxLabel}><input type="checkbox" /> Redes Sociais</label>
                  <label style={checkboxLabel}><input type="checkbox" /> Formulário: Maior problema do Bairro</label>
                </div>
              </div>
            </div>

            <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(0,240,255,0.1)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px dashed var(--accent)' }}>
                <FileText size={40} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ color: '#fff', fontWeight: 'bold' }}>Resumo da Exportação</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Baseado nos filtros, 3.100 contatos serão exportados com 4 colunas ativas.</p>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Baixar Excel (.xlsx)</button>
                <button className="btn-primary outline" style={{ width: '100%', padding: '1rem', borderColor: 'transparent' }}>Baixar CSV</button>
              </div>
            </div>
          </div>
        );

      case 'links':
        return (
          <div className="fade-in section-card liquid-glass" style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={20}/> Links de Apoiador (Captação Externa)</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Gere URLs exclusivas para suas lideranças cadastrarem novos apoiadores nos bairros.</p>
              </div>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16}/> Novo Link</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[1, 2].map(i => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1.5rem' }}>
                  <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={64} color="#000" />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ color: '#fff' }}>Equipe Zona Norte (Carlos)</strong>
                      <span style={{ background: 'var(--success)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>42 captados</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)', background: 'rgba(0,240,255,0.1)', padding: '0.4rem', borderRadius: '4px', fontFamily: 'monospace' }}>
                      https://app.elegis.com.br/carlos-zn
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                      <button style={{ ...iconBtnStyle, fontSize: '0.75rem', padding: '0.3rem 0.8rem', flex: 1 }}>Acessar</button>
                      <button style={{ ...iconBtnStyle, fontSize: '0.75rem', padding: '0.3rem 0.8rem', flex: 1 }}>Copiar</button>
                      <button style={{ ...iconBtnStyle, fontSize: '0.75rem', padding: '0.3rem 0.8rem', flex: 1 }}>Baixar QR</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'duplicates':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', overflow: 'hidden' }}>
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Merge size={20}/> Gestão de Duplicidades (Higienização)</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Detecte e mescle contatos que foram importados mais de uma vez.</p>
                </div>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.2rem' }}>
                  <button className="btn-tab active" style={{ ...tabStyle(true) }}>Celular</button>
                  <button className="btn-tab" style={{ ...tabStyle(false) }}>Nome + Celular</button>
                  <button className="btn-tab" style={{ ...tabStyle(false) }}>Nome + CPF</button>
                  <button className="btn-tab" style={{ ...tabStyle(false) }}>Nome Exato</button>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>João Vitor da Silva</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Telefone (61) 99999-1111 está vinculado a <strong>3 registros</strong>.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Ignorar</button>
                    <button className="btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Merge size={16}/> Mesclar Registros</button>
                  </div>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Marcos Antônio</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>Telefone (61) 98888-7777 está vinculado a <strong>2 registros</strong>.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Ignorar</button>
                    <button className="btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Merge size={16}/> Mesclar Registros</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      
      {/* HEADER GERAL (Só mostra se não for LIST, para manter o design clean ou condicional) */}
      {view !== 'list' && (
        <div className="section-card liquid-glass fade-in" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Users color="var(--accent)" /> Base de Cadastros
          </h2>
          <button className="btn-primary outline" onClick={() => setView('list')}>Voltar para Listagem Principal</button>
        </div>
      )}

      {/* ÁREA DE CONTEÚDO (FLEX GERAL) */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {view === 'list' && (
          <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Users color="var(--accent)" /> CRM Eleitoral - Base de Cadastros
            </h2>
          </div>
        )}
        {renderContent()}
      </div>

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

const checkboxLabel = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  color: '#fff',
  cursor: 'pointer'
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

const dropdownItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.8rem 1rem',
  width: '100%',
  background: 'transparent',
  border: 'none',
  color: '#fff',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '0.85rem',
  borderRadius: '8px',
  transition: 'background 0.2s'
};

const tabStyle = (isActive) => ({
  background: isActive ? 'var(--accent)' : 'transparent',
  color: isActive ? '#000' : 'var(--text-secondary)',
  border: 'none',
  padding: '0.4rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.85rem',
  transition: 'all 0.2s'
});
