import React, { useState } from 'react';
import { FileSignature, Plus, Layout, Eye, Settings, Share2, Type, Hash, Calendar, UploadCloud, ChevronDown, Trash2, Code, Mail, MessageCircle, Lock } from 'lucide-react';

export default function CriadorFormularios() {
  const [view, setView] = useState('list'); // 'list' | 'editor'
  
  // Dados de formulários existentes
  const [forms, setForms] = useState([
    { id: 1, title: 'Cadastro Geral Apoiadores', type: 'Geral', isDefault: true, createdAt: '10/08/2026' },
    { id: 2, title: 'Inscrição Evento Saúde', type: 'Evento', isDefault: false, createdAt: '12/08/2026' },
    { id: 3, title: 'Ouvidoria e Denúncias', type: 'Demanda', isDefault: false, createdAt: '14/08/2026' },
  ]);

  // Estado do Editor
  const [formConfig, setFormConfig] = useState({
    title: 'Novo Formulário Público',
    description: 'Preencha os dados abaixo para se cadastrar em nossa base.',
    btnText: 'Enviar Dados',
    requireApproval: true,
    sendWaNotification: false
  });

  const [formFields, setFormFields] = useState([
    { id: 'f1', label: 'Nome Completo', type: 'text', required: true },
    { id: 'f2', label: 'Telefone Celular (WhatsApp)', type: 'phone', required: true },
    { id: 'f3', label: 'Bairro', type: 'text', required: false }
  ]);

  const removeField = (id) => {
    setFormFields(formFields.filter(f => f.id !== id));
  };

  const addField = (type, label) => {
    setFormFields([...formFields, { id: `new_${Date.now()}`, label, type, required: false }]);
  };

  // VISTA LISTAGEM
  if (view === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '85vh' }}>
        <div className="section-card liquid-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <FileSignature color="var(--accent)" /> Gerenciador de Formulários
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Crie e gerencie as interfaces públicas de captação de dados.</p>
          </div>
          <button className="btn-primary" onClick={() => setView('editor')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}>
            <Plus size={16} /> Criar Formulário
          </button>
        </div>

        <div className="section-card liquid-glass" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>Título do Formulário</th>
                <th style={{ padding: '1rem' }}>Tipo</th>
                <th style={{ padding: '1rem' }}>Padrão (Link Bio)</th>
                <th style={{ padding: '1rem' }}>Criado em</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(form => (
                <tr key={form.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#fff' }}>{form.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>{form.type}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {form.isDefault ? 
                      <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{width:8,height:8,background:'var(--success)',borderRadius:'50%'}}></div> Sim</span> : 
                      <span style={{ color: 'var(--text-muted)' }}>Não</span>}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{form.createdAt}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button style={iconBtnStyle} title="Visualizar Link Público"><Share2 size={16} /></button>
                      <button style={iconBtnStyle} title="Editar Formulário" onClick={() => setView('editor')}><Settings size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // VISTA EDITOR (SPLIT SCREEN)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      
      {/* HEADER EDITOR */}
      <div className="section-card liquid-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={iconBtnStyle} onClick={() => setView('list')}>Voltar</button>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Editando: {formConfig.title}</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={16} /> Ver Tela Cheia
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSignature size={16} /> Salvar Formulário
          </button>
        </div>
      </div>

      {/* SPLIT SCREEN BODY */}
      <div style={{ display: 'flex', gap: '1rem', flex: 1, overflow: 'hidden' }}>
        
        {/* LADO ESQUERDO: BUILDER */}
        <div className="section-card liquid-glass" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Configurações Visuais Basicas */}
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layout size={16} /> Cabeçalho e Textos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer', background: 'rgba(0,0,0,0.2)' }}>
                <UploadCloud size={24} style={{ margin: '0 auto 0.5rem' }} />
                <span>Upload de Imagem/Banner (Opcional)</span>
              </div>
              <input 
                type="text" 
                style={inputStyle} 
                value={formConfig.title} 
                onChange={e => setFormConfig({...formConfig, title: e.target.value})}
                placeholder="Título do Formulário" 
              />
              <textarea 
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} 
                value={formConfig.description}
                onChange={e => setFormConfig({...formConfig, description: e.target.value})}
                placeholder="Descrição de introdução..."
              />
            </div>
          </div>

          {/* Gerenciamento de Campos */}
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layout size={16} /> Campos do Formulário
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {formFields.map((field, index) => (
                <div key={field.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ cursor: 'grab', color: 'var(--text-muted)' }}>⋮⋮</div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#fff' }}>{field.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Tipo: {field.type.toUpperCase()}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input type="checkbox" checked={field.required} onChange={(e) => {
                        const newFields = [...formFields];
                        newFields[index].required = e.target.checked;
                        setFormFields(newFields);
                      }} /> Obrigatório*
                    </label>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => removeField(field.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Inclusão de Novos Campos */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button style={tagBtnStyle} onClick={() => addField('email', 'E-mail')}><Mail size={14}/> E-mail</button>
              <button style={tagBtnStyle} onClick={() => addField('text', 'CPF/CNPJ')}><Hash size={14}/> CPF/CNPJ</button>
              <button style={tagBtnStyle} onClick={() => addField('date', 'Data de Nascimento')}><Calendar size={14}/> Nascimento</button>
              <button style={{ ...tagBtnStyle, borderStyle: 'dashed', borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={() => addField('select', 'Nova Opção de Escolha')}><Plus size={14}/> Campo Customizado</button>
            </div>
          </div>

          {/* Configurações Avançadas (Bottom Section) */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={16} /> Comportamento e Rastreamento
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: '#fff' }}>
                  <input type="checkbox" checked={formConfig.requireApproval} onChange={e => setFormConfig({...formConfig, requireApproval: e.target.checked})} style={{ width: '16px', height: '16px' }} />
                  Aprovar Lead Manualmente
                </label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '1.8rem' }}>Impede que spams ou contatos falsos entrem direto na base do CRM sem revisão da equipe.</p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', color: '#fff' }}>
                  <input type="checkbox" checked={formConfig.sendWaNotification} onChange={e => setFormConfig({...formConfig, sendWaNotification: e.target.checked})} style={{ width: '16px', height: '16px' }} />
                  Enviar Notificação não WhatsApp
                </label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '1.8rem' }}>Dispara mensagem de boas-vindas logo após o preenchimento.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={14} /> Pixel do Facebook / Scripts de Conversão (Header)
              </label>
              <textarea 
                style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.75rem', minHeight: '60px', color: 'var(--warning)' }} 
                placeholder="<!-- Cole seu script aqui -->"
              />
            </div>

          </div>
        </div>

        {/* LADO DIREITO: PREVIEW EM TEMPO REAL */}
        <div className="section-card liquid-glass" style={{ width: '45%', padding: '0', display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={14} /> Preview Público
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            
            {/* O "Celular" ou Tela Renderizada */}
            <div style={{ width: '100%', maxWidth: '400px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* Fake Banner */}
              <div style={{ height: '80px', background: 'linear-gradient(135deg, var(--accent) 0%, #1e3a8a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', opacity: 0.5 }}>BANNER AQUI</span>
              </div>

              <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div style={{ textAlign: 'center' }}>
                  <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>{formConfig.title || 'Título Aqui'}</h1>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>{formConfig.description || 'Descrição aqui.'}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {formFields.map(field => (
                    <div key={field.id}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.4rem' }}>
                        {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                      </label>
                      <input 
                        type="text" 
                        placeholder={`Digite seu ${field.label.toLowerCase()}`}
                        disabled
                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc', color: '#94a3b8' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Bloco LGPD Fixo */}
                <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '6px', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', cursor: 'not-allowed' }}>
                    <input type="checkbox" disabled checked style={{ marginTop: '3px' }} />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>
                      <Lock size={10} style={{ display: 'inline', marginRight: '2px' }} />
                      Autorizo o armazenamento dos meus dados em conformidade com a Lei Geral de Proteção de Dados (LGPD) para receber comunicações futuras.
                    </span>
                  </label>
                </div>

                <button style={{ width: '100%', padding: '1rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.5rem', cursor: 'not-allowed', opacity: 0.9 }}>
                  {formConfig.btnText}
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
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
  outline: 'none'
};

const iconBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-secondary)',
  padding: '0.5rem',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  fontWeight: '600',
  fontSize: '0.85rem',
  gap: '0.4rem'
};

const tagBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-secondary)',
  padding: '0.4rem 0.8rem',
  borderRadius: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.8rem',
  transition: 'all 0.2s',
  ':hover': { background: 'rgba(255,255,255,0.1)' }
};
