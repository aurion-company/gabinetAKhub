import React, { useState } from 'react';
import { FileText, Search, Plus, Filter, FileDigit, Download, Sparkles, UploadCloud, File, Trash2, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export default function GeradorDocumentos() {
  const [view, setView] = useState('list'); // 'list' | 'create'
  
  const [documents] = useState([
    { id: 1, title: 'Ofício para Secretaria de Obras - Buraco Rua 10', type: 'Ofício', number: '045/2026', date: '15/08/2026', status: 'Assinado' },
    { id: 2, title: 'Memorando Internão - Reunião de Pauta', type: 'Memorando', number: '012/2026', date: '14/08/2026', status: 'Rascunho' },
    { id: 3, title: 'Requerimento de Informação - Saúde', type: 'Requerimento', number: '089/2026', date: '10/08/2026', status: 'Enviado' },
  ]);

  const [formContent, setFormContent] = useState('');

  const handleTemplateSelect = (e) => {
    if (e.target.value === 'encaminhamento') {
      setFormContent('Vimos por meio deste solicitar providências urgentes acerca da demanda registrada não nosso sistema de atendimento sob o protocolo...\n\nO cidadão relata que...\n\nCertos de contarmos com a habitual presteza, renovamos votos de estima e consideração.');
    } else {
      setFormContent('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      
      {/* HEADER */}
      <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <FileText color="var(--accent)" /> Gerador de Ofícios e Documentos
        </h2>

        {view === 'list' ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              <Sparkles size={16} /> Assistente IA
            </button>
            <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Adicionar Novo
            </button>
          </div>
        ) : (
          <button className="btn-primary outline" onClick={() => setView('list')}>Voltar para Lista</button>
        )}
      </div>

      {view === 'list' ? (
        /* LISTAGEM */
        <div className="section-card liquid-glass fade-in" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '400px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Pesquisar documento..." style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
              </div>
              <button style={iconBtnStyle}><Filter size={16} /> Filtros</button>
            </div>
            
            <select style={{ ...inputStyle, width: '200px' }}>
              <option value="">Tipo de Documento</option>
              <option value="Ofício">Ofícios</option>
              <option value="Memorando">Memorandos</option>
              <option value="Requerimento">Requerimentos</option>
            </select>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Número</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Título do Documento</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Tipo</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Data</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s', cursor: 'pointer' }} className="table-row-hover">
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--accent)' }}>{doc.number}</td>
                    <td style={{ padding: '1rem', color: '#fff' }}>{doc.title}</td>
                    <td style={{ padding: '1rem' }}><span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{doc.type}</span></td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{doc.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        color: doc.status === 'Assinado' ? 'var(--success)' : doc.status === 'Enviado' ? 'var(--info)' : 'var(--warning)',
                        fontSize: '0.85rem', fontWeight: 'bold'
                      }}>
                        {doc.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button style={{ ...iconBtnStyle, padding: '0.5rem', display: 'inline-flex' }}><Download size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CONSTRUTOR SPLIT SCREEN */
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
          
          {/* Lado Esquerdo: Redação e Anexos */}
          <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
            <div>
              <label style={labelStyle}>Título do Documento *</label>
              <input type="text" placeholder="Ex: Ofício para Secretaria de Obras - Buraco Rua 10" style={inputStyle} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Conteúdo (Redação Oficial)</label>
              <div style={{ display: 'flex', gap: '0.2rem', background: 'var(--bg-elevated)', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', borderRadius: '8px 8px 0 0' }}>
                <button style={toolbarBtnStyle}><Bold size={14} /></button>
                <button style={toolbarBtnStyle}><Italic size={14} /></button>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
                <button style={toolbarBtnStyle}><AlignLeft size={14} /></button>
                <button style={toolbarBtnStyle}><AlignCenter size={14} /></button>
                <button style={toolbarBtnStyle}><AlignRight size={14} /></button>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
                <button style={toolbarBtnStyle}><List size={14} /></button>
              </div>
              <textarea 
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Digite o conteúdo do documento aqui..." 
                style={{ ...inputStyle, flex: 1, borderRadius: '0 0 8px 8px', resize: 'none', lineHeight: '1.6', fontFamily: 'serif', fontSize: '1rem' }} 
              />
            </div>

            <div>
              <label style={labelStyle}>Anexos (Comprovantes, Fotos, PDFs)</label>
              <div style={{ border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover-highlight">
                <UploadCloud size={32} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: '#fff', fontWeight: 'bold', marginBottom: '0.5rem' }}>Arraste arquivos aqui ou clique para selecionar</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Suporta PDF, JPG, PNG (Máx 2MB por arquivo)</p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Configurações de Emissão */}
          <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileDigit size={18} color="var(--accent)" /> Configurações de Emissão
            </h3>

            <div>
              <label style={labelStyle}>Tipo de Documento (Molde) *</label>
              <select style={inputStyle}>
                <option value="">Selecione o papel timbrado...</option>
                <option value="oficio">Ofício (Externão)</option>
                <option value="memorando">Memorando (Internão)</option>
                <option value="requerimento">Requerimento Legislativo</option>
                <option value="projeto_lei">Projeto de Lei</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                O tipo define o cabeçalho, rodapé e a regra de numeração sequencial automática.
              </p>
            </div>

            <div>
              <label style={labelStyle}>Template Base (Recheio)</label>
              <select style={inputStyle} onChange={handleTemplateSelect}>
                <option value="">Documento em Branco</option>
                <option value="encaminhamento">Encaminhamento de Demanda Padrão</option>
                <option value="agradecimento">Agradecimento de Votos/Apoio</option>
                <option value="convite">Convite Oficial para Evento</option>
              </select>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Numeração Prevista:</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--success)' }}>Ofício nº 046/2026</p>
              </div>

              <button className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Gerar PDF Final</button>
              <button className="btn-primary outline" onClick={() => setView('list')} style={{ width: '100%', borderColor: 'transparent', color: 'var(--text-muted)' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html:`
        .table-row-hover:hover {
          background: rgba(255,255,255,0.05);
        }
        .hover-highlight:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: var(--accent) !important;
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

const toolbarBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-secondary)',
  padding: '0.4rem',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
