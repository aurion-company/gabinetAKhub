import React, { useState } from 'react';
import { FileText, Plus, Search, Edit, Trash2, ArrowLeft, Sparkles, Paperclip, Eye, Download, MoreVertical } from 'lucide-react';

export default function GestaoDocLista({ onOpenIA }) {
  const [view, setView] = useState('list'); // 'list' | 'create'
  
  const [oficios, setOficios] = useState([
    { id: 1, numero: 'OF-001/2026', data: '16/08/2026', assunto: 'Solicitação de Reforma na Escola Municipal Norte', destinatario: 'Secretaria de Educação | Prefeitura' },
    { id: 2, numero: 'OF-002/2026', data: '14/08/2026', assunto: 'Pedido de Recapeamento Asfáltico Bairro Centro', destinatario: 'Secretaria de Obras | Carlos Silva' },
    { id: 3, numero: 'OF-003/2026', data: '10/08/2026', assunto: 'Indicação de Verba para Posto de Saúde', destinatario: 'Ministério da Saúde | Chefia de Gabinete' },
  ]);

  const renderContent = () => {
    switch (view) {
      case 'list':
        return (
          <div className="fade-in section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" placeholder="Pesquisar..." style={{ ...inputStyle, paddingLeft: '2.5rem', width: '250px' }} />
                </div>
                <button 
                  onClick={() => onOpenIA && onOpenIA('Redação e Gestão de Documentos')}
                  className="btn-primary outline" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  <Sparkles size={16} /> Assistente IA
                </button>
              </div>

              <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={16} /> Novo Ofício
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Número</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Data</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Assunto</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>Destinatário</th>
                    <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {oficios.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="table-row-hover">
                      <td style={{ padding: '1rem', color: 'var(--accent)', fontWeight: 'bold' }}>{o.numero}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{o.data}</td>
                      <td style={{ padding: '1rem', color: '#fff', fontWeight: '500' }}>{o.assunto}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{o.destinatario}</td>
                      <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Visualizar"><Eye size={14} /></button>
                        <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Editar"><Edit size={14} /></button>
                        <button style={{ ...iconBtnStyle, padding: '0.5rem', color: 'var(--danger)' }} title="Excluir"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'create':
        return (
          <div className="fade-in section-card liquid-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', flex: 1 }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setView('list')}>
                  <ArrowLeft size={20} />
                </button>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Criar Ofício Formal</h3>
              </div>
              <button 
                onClick={() => onOpenIA && onOpenIA('Redação de Ofício')}
                className="btn-primary outline" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                <Sparkles size={16} /> Gerar Texto com IA
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
              
              {/* FORMULÁRIO PRINCIPAL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Tratamento *</label>
                    <input type="text" defaultValue="Ao Ilmo. Sr." style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nome do Destinatário *</label>
                    <input type="text" placeholder="Ex: Dr. Carlos Eduardo" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Local Destino ou Título da Pessoa</label>
                  <input type="text" placeholder="Ex: Prefeitura Municipal | Secretaria de Obras" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Assunto *</label>
                  <input type="text" placeholder="Ex: Pedido de Recapeamento Asfáltico" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Conteúdo do Ofício *</label>
                  <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem', fontSize: '0.85rem' }}>
                      <button style={toolbarBtnStyle}><b>B</b></button>
                      <button style={toolbarBtnStyle}><i>I</i></button>
                      <button style={toolbarBtnStyle}><u>U</u></button>
                      <span style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.3rem' }}></span>
                      <button style={toolbarBtnStyle}>Alinhar à Esquerda</button>
                      <button style={toolbarBtnStyle}>Justificar</button>
                    </div>
                    <textarea rows={10} placeholder="Cumprimentando-o cordialmente, vimos por meio deste solicitar..." style={{ ...inputStyle, border: 'none', background: 'transparent', resize: 'vertical' }}></textarea>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Anexos (Máx 2MB)</label>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)', padding: '1.5rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                    <Paperclip size={20} style={{ color: 'var(--text-muted)', margin: '0 auto 0.5rem' }} />
                    <span style={{ fontSize: '0.85rem', color: '#fff' }}>Clique ou arraste imagens e documentos de evidência</span>
                  </div>
                </div>
              </div>

              {/* PAINEL LATERAL INFORMAÇÕES */}
              <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>Informações do Documento</h4>
                <div>
                  <label style={labelStyle}>Tipo de Documento</label>
                  <select style={inputStyle}>
                    <option>Ofício Padrão</option>
                    <option>Ofício de Gabinete</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Número Sequencial</label>
                  <input type="text" defaultValue="OF-004/2026" disabled style={{ ...inputStyle, opacity: 0.7 }} />
                </div>
                <div>
                  <label style={labelStyle}>Assinante</label>
                  <input type="text" defaultValue="Dep. SuperAdmin Master" style={inputStyle} />
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start', marginTop: '1rem' }}>
              <button className="btn-primary" onClick={() => setView('list')} style={{ padding: '0.8rem 2rem' }}>Criar</button>
              <button className="btn-primary outline" onClick={() => setView('list')} style={{ borderColor: 'transparent', color: 'var(--text-muted)' }}>Cancelar</button>
            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      {/* HEADER GERAL */}
      {view === 'list' && (
        <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <FileText color="var(--accent)" /> Repositório de Documentos / Ofícios
          </h2>
        </div>
      )}

      {renderContent()}

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
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};

const toolbarBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px'
};
