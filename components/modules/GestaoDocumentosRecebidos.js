import React, { useState } from 'react';
import { Inbox, LayoutGrid, List, Plus, Search, Sparkles, Upload, File, FileText, ArrowLeft, Download, Paperclip } from 'lucide-react';

export default function GestaoDocumentosRecebidos() {
  const [view, setView] = useState('list'); // 'list' | 'grid' | 'create'
  
  const [documentos, setDocumentos] = useState([
    { id: 1, data: '15/08/2026', descricao: 'Ofício nº 45 - Associação de Moradores do Centro 📄', usuario: 'João Pedro', arquivo: 'oficio_45.pdf', tamanho: '1.2MB' },
    { id: 2, data: '12/08/2026', descricao: 'Requerimento de Asfalto - Rua 7', usuario: 'Ana Paula', arquivo: 'requerimento_asfalto.docx', tamanho: '800KB' },
    { id: 3, data: '10/08/2026', descricao: 'Projeto de Lei 02/2026 🏛️', usuario: 'Marcos Silva', arquivo: 'projeto_lei_2026.pdf', tamanho: '3.5MB' },
  ]);

  const renderContent = () => {
    switch (view) {
      case 'list':
      case 'grid':
        return (
          <div className="fade-in section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                  <Sparkles size={16} /> Assistente IA
                </button>
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setView('list')} 
                    style={{ padding: '0.5rem', background: view === 'list' ? 'var(--accent)' : 'transparent', color: view === 'list' ? '#000' : 'var(--text-muted)', border: 'none', cursor: 'pointer' }}
                    title="Ver em lista"
                  >
                    <List size={18} />
                  </button>
                  <button 
                    onClick={() => setView('grid')} 
                    style={{ padding: '0.5rem', background: view === 'grid' ? 'var(--accent)' : 'transparent', color: view === 'grid' ? '#000' : 'var(--text-muted)', border: 'none', cursor: 'pointer' }}
                    title="Ver em grade"
                  >
                    <LayoutGrid size={18} />
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" placeholder="Pesquisar..." style={{ ...inputStyle, paddingLeft: '2.5rem', width: '250px' }} />
                </div>
                <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> Adicionar
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {view === 'list' ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Data</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Descrição</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Documento</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentos.map(d => (
                      <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="table-row-hover">
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{d.data}</td>
                        <td style={{ padding: '1rem', color: '#fff', fontWeight: '500' }}>{d.descricao}</td>
                        <td style={{ padding: '1rem' }}>
                          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <File size={14} /> Anexo ({d.tamanho})
                          </button>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{d.usuario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {documentos.map(d => (
                    <div key={d.id} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', height: '120px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        <FileText size={48} />
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>{d.data} • {d.usuario}</div>
                      <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem', lineHeight: '1.4' }}>{d.descricao}</h4>
                      <button className="btn-primary outline" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', borderColor: 'rgba(255,255,255,0.1)' }}>
                        <Download size={14} /> Baixar Arquivo
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'create':
        return (
          <div className="fade-in section-card liquid-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', flex: 1 }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setView('list')}>
                <ArrowLeft size={20} />
              </button>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Criar Documento Recebido</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Descrição do documento</label>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '1rem' }} title="Inserir Emoji">😊</button>
                </div>
                <textarea rows={4} placeholder="Ex: Ofício nº 45 solicitando asfalto..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
              </div>
              <div>
                <label style={labelStyle}>Data *</label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Arquivo *</label>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)', padding: '3rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}>
                <Upload size={32} style={{ color: 'var(--accent)', margin: '0 auto 1rem' }} />
                <strong style={{ display: 'block', color: '#fff', fontSize: '1.1rem' }}>Arraste e solte os arquivos ou Clique aqui</strong>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                Tamanho máximo: 5MB. Aceita PDF, imagens, CSV, Word (.doc/.docx), Excel (.xls/.xlsx), PowerPoint e outros documentos do Microsoft Office.
              </p>
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
      {(view === 'list' || view === 'grid') && (
        <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Inbox color="var(--accent)" /> Documentos Recebidos
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
