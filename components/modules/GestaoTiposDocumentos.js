import React, { useState } from 'react';
import { FileBox, Plus, Search, Edit, Trash2, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function GestaoTiposDocumentos() {
  const [view, setView] = useState('list'); // 'list' | 'create'
  
  const [tipos, setTipos] = useState([
    { id: 1, nome: 'Ofício', numInicial: 1, reiniciaAnão: true },
    { id: 2, nome: 'Memorando', numInicial: 1, reiniciaAnão: true },
    { id: 3, nome: 'Requerimento', numInicial: 100, reiniciaAnão: false },
  ]);

  const renderContent = () => {
    switch (view) {
      case 'list':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
            
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="text" placeholder="Pesquisar..." style={{ ...inputStyle, paddingLeft: '2.5rem', width: '250px' }} />
                  </div>
                  <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    <Sparkles size={16} /> Assistente IA
                  </button>
                </div>
                <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> Adicionar
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Nome</th>
                      <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tipos.map(t => (
                      <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="table-row-hover">
                        <td style={{ padding: '1rem', color: '#fff', fontWeight: '500' }}>{t.nome}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Editar"><Edit size={14} /></button>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem', color: 'var(--danger)' }} title="Excluir"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Criar Tipo de Documento</h3>
            </div>

            {/* Configurações Gerais */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Nome do Tipo *</label>
                <input type="text" placeholder="Ex: Requerimento" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Número inicial *</label>
                <input type="number" defaultValue="1" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                  Reiniciar numeração anualmente
                </label>
              </div>
            </div>

            {/* Assinante Padrão */}
            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem' }}>Assinante Padrão</h4>
              </div>
              <div>
                <label style={labelStyle}>Nome do Assinante</label>
                <input type="text" placeholder="João da Silva" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Cargo do Assinante</label>
                <input type="text" placeholder="Vereador" style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Imagem da Assinatura</label>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)', padding: '2rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                  <ImageIcon size={24} style={{ color: 'var(--accent)', margin: '0 auto 1rem' }} />
                  <strong style={{ display: 'block', color: '#fff' }}>Arraste e solte os arquivos ou Clique aqui</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tamanho máximo: 2MB.</span>
                </div>
              </div>
            </div>

            {/* Identidade Visual */}
            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem' }}>Identidade Visual</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                A imagem do cabeçalho deve possuir exatamente 2.480x354 pixels de resolução (21cm x 3cm - 72 a 300dpi). Altura máxima 345 pixels, peso até 2MB.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Imagem do Cabeçalho</label>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)', padding: '1.5rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                    <ImageIcon size={20} style={{ color: 'var(--text-muted)', margin: '0 auto 0.5rem' }} />
                    <span style={{ fontSize: '0.8rem', color: '#fff' }}>Clique para Enviar</span>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <input type="checkbox" style={{ width: '14px', height: '14px' }} /> Cabeçalho ocupa largura total
                  </label>
                </div>
                <div>
                  <label style={labelStyle}>Imagem do Rodapé</label>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)', padding: '1.5rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                    <ImageIcon size={20} style={{ color: 'var(--text-muted)', margin: '0 auto 0.5rem' }} />
                    <span style={{ fontSize: '0.8rem', color: '#fff' }}>Clique para Enviar</span>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <input type="checkbox" style={{ width: '14px', height: '14px' }} /> Rodapé ocupa largura total
                  </label>
                </div>
              </div>
            </div>

            {/* Margens do Documento */}
            <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem' }}>Margens do Documento (mm)</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Padrão ABNT: 30mm para superior, 25mm para inferior, 25mm para esquerda e 25mm para direita.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', maxWidth: '600px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Margem Superior</label>
                  <input type="number" defaultValue="30" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Margem Inferior</label>
                  <input type="number" defaultValue="25" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Margem Esquerda</label>
                  <input type="number" defaultValue="25" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Margem Direita</label>
                  <input type="number" defaultValue="25" style={inputStyle} />
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
            <FileBox color="var(--accent)" /> Tipos de Documentos
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
