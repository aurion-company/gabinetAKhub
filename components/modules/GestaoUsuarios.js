import React, { useState } from 'react';
import { Users, Search, Plus, Sparkles, Filter, ShieldCheck, KeyRound, Edit, Eye, ArrowLeft, Save, X, Check, ToggleLeft, ToggleRight } from 'lucide-react';

export default function GestaoUsuarios() {
  const [view, setView] = useState('list'); // 'list' ou 'create'
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de Usuários
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Carlos Administrador', email: 'carlos@GabinetAK.com.br', telefone: '(61) 99999-0000', setor: 'Gabinete', perfil: 'Master', criadoEm: '10/08/2026', ativo: true },
    { id: 2, nome: 'Ana Comunicação', email: 'ana@GabinetAK.com.br', telefone: '(61) 98888-1111', setor: 'Comunicação', perfil: 'Usuário', criadoEm: '12/08/2026', ativo: true },
    { id: 3, nome: 'João Atendimento', email: 'joao@GabinetAK.com.br', telefone: '(61) 97777-2222', setor: 'Atendimento', perfil: 'Usuário Restrito', criadoEm: '14/08/2026', ativo: false },
  ]);

  const toggleStatus = (id) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, ativo: !u.ativo } : u));
  };

  const modulos = ['Cadastros', 'Geomapeamento', 'Demandas', 'WhatsApp', 'Ofícios', 'Campanhas de E-mail', 'Relatórios', 'IA Assistente'];

  if (view === 'create') {
    return (
      <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh', padding: '1.5rem', gap: '1.5rem' }}>
        
        {/* HEADER DE CRIAÇÃO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setView('list')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={20} />
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck color="var(--accent)" /> {view === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary outline" onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              <X size={16} /> Cancelar
            </button>
            <button className="btn-primary" onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem' }}>
              <Save size={16} /> Salvar e Enviar Credenciais
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          {/* DADOS CADASTRAIS */}
          <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--accent)' }}>Dados do Colaborador</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={labelStyle}>Usuário Vinculado ao Cadastro? *</label>
                <select style={inputStyle}><option>Sim (Buscar cadastro existente)</option><option>Não (Criar usuário isolado)</option></select>
              </div>
              <div>
                <label style={labelStyle}>Nome Completo *</label>
                <input type="text" placeholder="Ex: Maria Souza" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Contato (WhatsApp) *</label>
                <input type="text" placeholder="(00) 00000-0000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>E-mail (Login) *</label>
                <input type="email" placeholder="email@dominio.com" style={inputStyle} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                  A senha será enviada para este e-mail após a validação.
                </span>
              </div>
              <div>
                <label style={labelStyle}>Setor de Lotação</label>
                <select style={inputStyle}><option>Gabinete Central</option><option>Comunicação</option><option>Atendimento / Recepção</option><option>Jurídico</option></select>
              </div>
            </div>
          </div>

          {/* MATRIZ DE PERMISSÕES */}
          <div className="section-card liquid-glass" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--warning)' }}>Matriz de Permissões</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: 'rgba(0,240,255,0.1)', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Marcar Todos</button>
                <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Desmarcar Todos</button>
              </div>
            </div>

            <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
                <thead style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-muted)' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Módulo do Sistema</th>
                    <th style={{ padding: '1rem' }}>Ver</th>
                    <th style={{ padding: '1rem' }}>Criar</th>
                    <th style={{ padding: '1rem' }}>Editar</th>
                    <th style={{ padding: '1rem' }}>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {modulos.map((mod, i) => (
                    <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>{mod}</td>
                      <td style={{ padding: '1rem' }}><input type="checkbox" defaultChecked /></td>
                      <td style={{ padding: '1rem' }}><input type="checkbox" defaultChecked={i % 2 === 0} /></td>
                      <td style={{ padding: '1rem' }}><input type="checkbox" defaultChecked={i === 0 || i === 2} /></td>
                      <td style={{ padding: '1rem' }}><input type="checkbox" defaultChecked={i === 0} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed rgba(239, 68, 68, 0.3)', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--danger)', marginBottom: '0.5rem', fontWeight: '700' }}>Permissões Avançadas (Risco)</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <input type="checkbox" /> Pode exportar banco de dados (Excel/CSV)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                <input type="checkbox" /> Pode acessar Configurações Financeiras / Asaas
              </label>
            </div>

          </div>
        </div>

      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh', gap: '1.5rem' }}>
      
      {/* HEADER DA LISTAGEM */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users color="var(--accent)" /> Gestão de Usuários
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} /> Auditoria IA
          </button>
          <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem' }}>
            <Plus size={16} /> Adicionar Usuário
          </button>
        </div>
      </div>

      {/* PESQUISA E FILTROS */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="input-group" style={{ flex: 1, margin: 0, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.8rem' }}
          />
        </div>
        <select style={{ ...inputStyle, width: '200px' }}>
          <option>Todos os Setores</option>
          <option>Gabinete Central</option>
          <option>Atendimento</option>
          <option>Comunicação</option>
        </select>
        <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: '#fff', padding: '0 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Filter size={16} /> Filtrar
        </button>
      </div>

      {/* TABELA DE USUÁRIOS */}
      <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Nome do Colaborador</th>
              <th style={{ padding: '1rem' }}>E-mail</th>
              <th style={{ padding: '1rem' }}>Setor</th>
              <th style={{ padding: '1rem' }}>Perfil</th>
              <th style={{ padding: '1rem' }}>Ativo</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.filter(u => u.nome.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '700', color: '#fff' }}>{user.nome}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>{user.setor}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700',
                    background: user.perfil === 'Master' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: user.perfil === 'Master' ? 'var(--accent)' : 'var(--text-secondary)',
                  }}>
                    {user.perfil}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ cursor: 'pointer' }} onClick={() => toggleStatus(user.id)}>
                    {user.ativo ? <ToggleRight size={28} color="var(--success)" /> : <ToggleLeft size={28} color="var(--text-muted)" />}
                  </div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button title="Exibir Detalhes" style={actionBtnStyle}><Eye size={16} /></button>
                  <button title="Editar Usuário" style={actionBtnStyle} onClick={() => setView('create')}><Edit size={16} /></button>
                  <button title="Redefinir Senha" style={{ ...actionBtnStyle, color: 'var(--warning)' }}><KeyRound size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.9rem'
};

const actionBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  padding: '0.4rem',
  marginLeft: '0.5rem',
  transition: 'color 0.2s'
};
