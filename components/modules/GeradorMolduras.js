import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Link as LinkIcon, Download, Users, Copy, Edit, Trash2, Camera, Circle, Square, ArrowRight, Share2 } from 'lucide-react';

export default function GeradorMolduras() {
  const [view, setView] = useState('list'); // 'list' | 'create'
  
  const [campanhas] = useState([
    { id: 1, titulo: 'Acelera Norte', slug: 'acelera-norte', acessos: 1240, geradas: 850, formato: 'Redondo', status: 'Ativo', criacao: '16 Ago 2026' },
    { id: 2, titulo: 'Campanha de Filiação', slug: 'filiacao-2026', acessos: 530, geradas: 215, formato: 'Quadrado', status: 'Ativo', criacao: '10 Ago 2026' },
    { id: 3, titulo: 'Apoio à Saúde', slug: 'apoio-saude', acessos: 3200, geradas: 2800, formato: 'Redondo', status: 'Inativo', criacao: '05 Jul 2026' },
  ]);

  const [formato, setFormato] = useState('redondo'); // redondo ou quadrado
  
  const renderContent = () => {
    switch (view) {
      case 'list':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total de Campanhas (Molduras)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>14</div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Fotos de Perfil Geradas</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>3.865</div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Taxa de Conversão Média</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>78%</div>
              </div>
            </div>

            {/* Listagem */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Suas Campanhas de Avatar</h3>
                <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> Nova Campanha
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Campanha / URL</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Formato</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Engajamento</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campanhas.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="table-row-hover">
                        <td style={{ padding: '1rem' }}>
                          <strong style={{ display: 'block', fontSize: '1.05rem', color: '#fff' }}>{c.titulo}</strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                            <LinkIcon size={12} /> elegiv.com.br/apoiar/{c.slug}
                            <Copy size={12} style={{ cursor: 'pointer', marginLeft: '0.5rem', color: 'var(--text-muted)' }} title="Copiar URL" />
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', width: 'fit-content' }}>
                            {c.formato === 'Redondo' ? <Circle size={12} /> : <Square size={12} />} {c.formato}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontSize: '0.9rem', color: '#fff' }}><strong>{c.geradas}</strong> Avatares</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>De {c.acessos} visitas</div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: c.status === 'Ativo' ? 'var(--success)' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>{c.status}</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem', color: 'var(--accent)' }} title="Acessar Página"><ArrowRight size={14} /></button>
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
          <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem', height: '100%', overflow: 'hidden' }}>
            
            {/* COLUNA ESQUERDA: FORMULÁRIO */}
            <div className="section-card liquid-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>Configuração da Campanha (Twibbon)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Personalize fotos de perfil dos seus apoiadores e fortaleça sua campanha.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Título da Campanha *</label>
                  <input type="text" placeholder="Ex: Acelera Norte 2026" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>URL (Slug) *</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '8px 0 0 8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>.../apoiar/</span>
                    <input type="text" placeholder="acelera-norte" style={{ ...inputStyle, borderRadius: '0 8px 8px 0' }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Texto de Incentivo (Aparece na página pública)</label>
                <textarea rows={3} placeholder="Mostre que você está com a gente! Gere sua foto oficial da campanha..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
              </div>

              {/* UPLOAD E FORMATO */}
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Design da Moldura</h4>
                
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div 
                    onClick={() => setFormato('redondo')}
                    style={{ flex: 1, padding: '1rem', border: formato === 'redondo' ? '2px solid var(--accent)' : '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: formato === 'redondo' ? 'rgba(0, 240, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}
                  >
                    <Circle size={32} color={formato === 'redondo' ? 'var(--accent)' : 'var(--text-muted)'} style={{ margin: '0 auto 0.5rem' }} />
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: formato === 'redondo' ? '#fff' : 'var(--text-muted)' }}>Círculo (WhatsApp/Insta)</strong>
                  </div>
                  <div 
                    onClick={() => setFormato('quadrado')}
                    style={{ flex: 1, padding: '1rem', border: formato === 'quadrado' ? '2px solid var(--accent)' : '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: formato === 'quadrado' ? 'rgba(0, 240, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}
                  >
                    <Square size={32} color={formato === 'quadrado' ? 'var(--accent)' : 'var(--text-muted)'} style={{ margin: '0 auto 0.5rem' }} />
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: formato === 'quadrado' ? '#fff' : 'var(--text-muted)' }}>Quadrado (Facebook)</strong>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Arquivo PNG da Moldura (Fundo Vazado Transparente) *</label>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)', padding: '2rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                    <Download size={24} style={{ color: 'var(--accent)', margin: '0 auto 1rem' }} />
                    <strong style={{ display: 'block', color: '#fff', fontSize: '0.95rem' }}>Clique para Enviar a Moldura</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'block' }}>Tamanho recomendado: 1080x1080px (PNG)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1rem' }}>
                <button className="btn-primary outline" onClick={() => setView('list')} style={{ borderColor: 'transparent', color: 'var(--text-muted)' }}>Cancelar</button>
                <button className="btn-primary" onClick={() => setView('list')} style={{ padding: '0.8rem 2rem' }}>Publicar Moldura</button>
              </div>

            </div>

            {/* COLUNA DIREITA: PREVIEW DO APP */}
            <div className="section-card liquid-glass" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 'bold' }}>Visão do Apoiador (Celular)</span>
              </div>
              
              <div style={{ flex: 1, padding: '2rem 1.5rem', background: '#e8f4fe', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Mock do App Apoiar */}
                <h2 style={{ color: '#1e3a8a', fontSize: '1.2rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem' }}>Acelera Norte 2026</h2>
                <p style={{ color: '#475569', fontSize: '0.85rem', textAlign: 'center', marginBottom: '2rem' }}>Mostre que você está com a gente! Gere sua foto oficial da campanha.</p>
                
                <div style={{ 
                  width: '200px', height: '200px', 
                  borderRadius: formato === 'redondo' ? '50%' : '12px', 
                  background: '#cbd5e1', 
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}>
                  <Camera size={40} color="#94a3b8" />
                  
                  {/* Overlay Mock da Moldura */}
                  <div style={{ 
                    position: 'absolute', inset: 0, 
                    border: '12px solid #3b82f6', 
                    borderRadius: formato === 'redondo' ? '50%' : '12px',
                    pointerEvents: 'none',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem'
                  }}>
                    <div style={{ background: '#3b82f6', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '0.2rem', textAlign: 'center', borderRadius: '4px' }}>
                      #AceleraNorte
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '2rem' }}>
                  <button style={{ flex: 1, padding: '0.8rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> Baixar Foto
                  </button>
                  <button style={{ padding: '0.8rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Share2 size={16} />
                  </button>
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
      {/* HEADER GERAL */}
      {view === 'list' && (
        <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ImageIcon color="var(--accent)" /> Gerador de Molduras (Avatares)
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
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};
