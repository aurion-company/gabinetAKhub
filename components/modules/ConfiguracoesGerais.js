import React, { useState } from 'react';
import { Settings, Globe, Database, ListTodo, KeyRound, Save, Copy, Key, Plus, Sparkles, Check, Hash } from 'lucide-react';

export default function ConfiguracoesGerais() {
  const [activeTab, setActiveTab] = useState('gerais');

  const tabs = [
    { id: 'gerais', label: 'Gerais', icon: <Globe size={16} /> },
    { id: 'cadastros', label: 'Cadastros', icon: <Database size={16} /> },
    { id: 'demandas', label: 'Demandas', icon: <ListTodo size={16} /> },
    { id: 'api', label: 'API Keys', icon: <KeyRound size={16} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gerais':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Configurações Globais</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={labelStyle}>Fuso Horário *</label>
                <select style={inputStyle}>
                  <option>America/Sao_Paulo (GMT-03:00)</option>
                  <option>America/Manaus (GMT-04:00)</option>
                  <option>America/Rio_Branco (GMT-05:00)</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Código do País *</label>
                <select style={inputStyle}>
                  <option>Brasil +55</option>
                  <option>Estados Unidos +1</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 2rem' }}>
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </div>
        );
      
      case 'cadastros':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Regras de Cadastro</h3>
              <button style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>Marcar todos</button>
            </div>
            
            <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Campos Obrigatórios no Formulário de Cadastro Externo</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', fontSize: '0.85rem' }}>
                {['Nome Completo', 'E-mail', 'CPF / CNPJ', 'Telefone Fixo', 'Celular (WhatsApp)', 'CEP', 'Endereço', 'Número', 'Bairro', 'Cidade', 'UF', 'Complemento'].map((col, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <input type="checkbox" defaultChecked={i === 0 || i === 4 || i === 9} /> {col}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Regras de Duplicidade</h4>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  Permitir cadastro duplicado via link externo
                </label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '2.2rem' }}>Se desativado, o sistema bloqueará envios com o mesmo E-mail ou CPF.</p>
              </div>

              <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Mensagem Padrão de Link (WhatsApp)</h4>
                <textarea 
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  defaultValue="Olá, {nome}&#10;Acompanhe as ações do nosso mandato nas redes sociais!"
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Use a tag <code style={{ color: 'var(--accent)' }}>{`{nome}`}</code> para inserir o primeiro nome da pessoa.</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 2rem' }}>
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </div>
        );

      case 'demandas':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Parâmetros de Demandas</h3>
            
            <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Configurações de Formulário (Andamentos)</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                Exibir campo <b>"Data do Fato"</b> em andamentos
              </label>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '2.2rem' }}>Quando ativo, este campo permite registrar a data exata em que uma ação ocorreu no histórico da demanda.</p>
            </div>

            <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Permissões Especiais de Andamentos</h4>
                <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Plus size={14} /> Adicionar Usuário Privilegiado
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Usuários nesta lista podem editar ou excluir qualquer andamento, sobrepondo as regras padrão de bloqueio.</p>
              
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>C</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Carlos Administrador</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>carlos@elegis.com.br</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 2rem' }}>
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Chaves de API & Integrações</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Conecte sistemas externos ao seu CRM usando a API REST.</p>
              </div>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                <Key size={16} /> Gerar Nova Chave
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '4px solid var(--accent)', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.5rem' }}>Seu ID Cliente</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <code style={{ fontSize: '1.2rem', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '4px', flex: 1 }}>CLI-8A9B-4C2D-1E0F</code>
                  <button style={iconBtnStyle} title="Copiar ID Cliente"><Copy size={18} /></button>
                </div>
              </div>
              <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.3)', borderLeft: '4px solid var(--warning)', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.5rem' }}>Seu ID Usuário</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <code style={{ fontSize: '1.2rem', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '4px', flex: 1 }}>USR-X7Y8-Z9W0-K1L2</code>
                  <button style={iconBtnStyle} title="Copiar ID Usuário"><Copy size={18} /></button>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Hash size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Atenção Desenvolvedores:</strong> Todas as requisições para a API devem incluir os parâmetros de cabeçalho obrigatórios <code style={{ color: 'var(--accent)' }}>cliente_id</code> e <code style={{ color: 'var(--accent)' }}>user_id</code> correspondentes às chaves acima.
              </div>
            </div>

            <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem' }}>Nome da Integração</th>
                    <th style={{ padding: '1rem' }}>Token/Key</th>
                    <th style={{ padding: '1rem' }}>Criado em</th>
                    <th style={{ padding: '1rem' }}>Último Uso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#fff' }}>Integração Typeform</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--warning)' }}>sk_live_8F2...A9B</td>
                    <td style={{ padding: '1rem' }}>10/08/2026</td>
                    <td style={{ padding: '1rem', color: 'var(--success)' }}>Hoje às 14:32</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#fff' }}>Automação n8n (Demandas)</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--warning)' }}>sk_live_C4D...E1F</td>
                    <td style={{ padding: '1rem' }}>05/08/2026</td>
                    <td style={{ padding: '1rem', color: 'var(--success)' }}>Há 2 dias</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh', gap: '1.5rem', padding: '1.5rem' }}>
      
      {/* HEADER GERAL */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Settings color="var(--accent)" /> Configurações do Sistema
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ajuste os parâmetros globais, regras de cadastro e chaves de API.</p>
        </div>
        <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <Sparkles size={16} /> Assistente IA
        </button>
      </div>

      {/* ABAS */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        {tabs.map(t => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem',
              background: activeTab === t.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
              color: activeTab === t.id ? 'var(--accent)' : 'var(--text-muted)',
              border: 'none', borderBottom: activeTab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
              borderRadius: '8px 8px 0 0', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO DA ABA ATIVA */}
      <div style={{ flex: 1 }}>
        {renderTabContent()}
      </div>

    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem'
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

const iconBtnStyle = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'var(--text-secondary)',
  padding: '0.5rem',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};
