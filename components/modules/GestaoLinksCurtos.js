import React, { useState } from 'react';
import { Link as LinkIcon, Plus, Copy, QrCode, BarChart2, Edit, Trash2, Settings, Shield, Smartphone, Activity, Target, Download } from 'lucide-react';

export default function LinksCurtos() {
  const [view, setView] = useState('list'); // 'list' | 'create'
  const [activeTab, setActiveTab] = useState('detalhes'); // 'detalhes', 'seguranca', 'app', 'rastreamento', 'marketing', 'qrcode'

  const [links] = useState([
    { id: 1, url: 'elegis.com.br/s/AK', destino: 'https://wa.me/5561999991111?text=Olá', cliques: 9, unicos: 4, qr: 0, criacao: '16 Ago 2026', status: 'Ativo', tipo: '302' },
    { id: 2, url: 'elegis.com.br/s/PLEN', destino: 'https://camara.leg.br/sessao-aovivo', cliques: 142, unicos: 98, qr: 15, criacao: '14 Ago 2026', status: 'Ativo', tipo: '302' },
    { id: 3, url: 'elegis.com.br/s/PESQ', destino: 'https://forms.google.com/exemplo', cliques: 45, unicos: 40, qr: 5, criacao: '10 Ago 2026', status: 'Expirado', tipo: '302' },
  ]);

  const renderContent = () => {
    switch (view) {
      case 'list':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Links Curtos Gerados</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  128 <span style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: '600' }}>85% Ativos</span>
                </div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total de Visitas (Cliques)</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>14.590</div>
              </div>
              <div className="section-card liquid-glass" style={{ padding: '1.5rem', borderLeft: '4px solid #a855f7' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Visitantes Únicos</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>9.102</div>
              </div>
            </div>

            {/* Listagem */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Gerenciador de Redirecionamentos</h3>
                <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> Adicionar Link
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Link Curto / Destino</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Métricas de Acesso</th>
                      <th style={{ padding: '1rem', fontWeight: '600' }}>Criação e Status</th>
                      <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map(l => (
                      <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} className="table-row-hover">
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                            <strong style={{ color: 'var(--accent)', fontSize: '1.05rem' }}>{l.url}</strong>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Copiar"><Copy size={14}/></button>
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                            ↳ {l.destino}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{l.cliques} Cliques</span>
                            <span style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{l.unicos} Únicos</span>
                            <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>{l.qr} Leitura QR</span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontSize: '0.85rem', color: '#fff' }}>{l.criacao}</div>
                          <div style={{ fontSize: '0.8rem', color: l.status === 'Ativo' ? 'var(--success)' : 'var(--text-muted)' }}>{l.status} • {l.tipo}</div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Estatísticas Avançadas"><BarChart2 size={14} /></button>
                          <button style={{ ...iconBtnStyle, padding: '0.5rem' }} title="Gerar/Ver QR Code"><QrCode size={14} /></button>
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
          <div className="fade-in section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 0, overflow: 'hidden' }}>
            {/* Nav Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
              <button className={`form-tab ${activeTab === 'detalhes' ? 'active' : ''}`} onClick={() => setActiveTab('detalhes')} style={formTabStyle(activeTab === 'detalhes')}><LinkIcon size={16}/> Detalhes</button>
              <button className={`form-tab ${activeTab === 'seguranca' ? 'active' : ''}`} onClick={() => setActiveTab('seguranca')} style={formTabStyle(activeTab === 'seguranca')}><Shield size={16}/> Segurança</button>
              <button className={`form-tab ${activeTab === 'app' ? 'active' : ''}`} onClick={() => setActiveTab('app')} style={formTabStyle(activeTab === 'app')}><Smartphone size={16}/> Vínculo App</button>
              <button className={`form-tab ${activeTab === 'rastreamento' ? 'active' : ''}`} onClick={() => setActiveTab('rastreamento')} style={formTabStyle(activeTab === 'rastreamento')}><Activity size={16}/> Rastreamento</button>
              <button className={`form-tab ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => setActiveTab('marketing')} style={formTabStyle(activeTab === 'marketing')}><Target size={16}/> Marketing (Pixels)</button>
              <button className={`form-tab ${activeTab === 'qrcode' ? 'active' : ''}`} onClick={() => setActiveTab('qrcode')} style={formTabStyle(activeTab === 'qrcode')}><QrCode size={16}/> Gerador QR</button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {activeTab === 'detalhes' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#fff', background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                    <input type="checkbox" /> <strong>Gerar link direto do WhatsApp (wa.me)</strong>
                  </label>

                  <div>
                    <label style={labelStyle}>URL de Destino Original *</label>
                    <input type="text" placeholder="https://..." style={inputStyle} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}>Chave Curta Personalizada</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '8px 0 0 8px', color: 'var(--text-muted)' }}>elegis.com.br/s/</span>
                        <input type="text" placeholder="minha-campanha" style={{ ...inputStyle, borderRadius: '0 8px 8px 0' }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Código de Redirecionamento *</label>
                      <select style={inputStyle}>
                        <option>302 - Redirecionamento Temporário</option>
                        <option>301 - Movido Permanentemente</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> Status Ativo</label>
                    <label style={toggleLabel}><input type="checkbox" /> Encaminhar Parâmetros (UTM)</label>
                    <label style={toggleLabel}><input type="checkbox" /> Definir Validade (Datas)</label>
                    <label style={toggleLabel}><input type="checkbox" /> Uso Único (Queima ao clicar)</label>
                  </div>

                  <div>
                    <label style={labelStyle}>Notas Internas (Equipe)</label>
                    <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Para que serve este link?"></textarea>
                  </div>
                </div>
              )}

              {activeTab === 'seguranca' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                  <div style={{ background: 'rgba(255, 171, 0, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--warning)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>
                      <input type="checkbox" /> Proteger com Senha
                    </label>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem', marginLeft: '1.8rem' }}>Exige uma senha na tela antes de redirecionar para a URL final.</p>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>
                      <input type="checkbox" /> Página de Aviso de Redirecionamento (Anti-Phishing)
                    </label>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem', marginLeft: '1.8rem' }}>Exibe uma tela intermediária "Você está saindo do nosso site..." para maior segurança do usuário.</p>
                  </div>
                </div>
              )}

              {activeTab === 'rastreamento' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0, 240, 255, 0.1)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid var(--accent)' }}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1rem' }}>Ativar Rastreamento Analítico</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Coleta dados detalhados de cada visitante que clicar neste link.</p>
                    </div>
                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--accent)', borderRadius: '34px' }}></span>
                    </label>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> Endereço IP Analisado</label>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> Navegador (Chrome, Safari, etc)</label>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> Sistema Operacional</label>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> Tipo de Dispositivo (Mobile/PC)</label>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> URL de Origem (Referer)</label>
                    <label style={toggleLabel}><input type="checkbox" defaultChecked /> Idioma do Usuário</label>
                  </div>
                </div>
              )}

              {activeTab === 'marketing' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                  <h4 style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Integração de Pixels & Webhooks</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Adicione scripts de conversão que serão disparados silenciosamente quando o usuário passar por este link curto.</p>

                  <div>
                    <label style={labelStyle}>Pixels de Retargeting (Facebook/Meta, Google Ads)</label>
                    <select style={{ ...inputStyle, height: '150px' }} multiple>
                      <option value="fb1">Pixel Meta Ads - Captação 2026</option>
                      <option value="fb2">Pixel Meta Ads - Remarketing Geral</option>
                      <option value="ga">Google Analytics G4</option>
                      <option value="tk">TikTok Pixel - Orgânico</option>
                    </select>
                    <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>Segure CTRL (Windows) ou CMD (Mac) para selecionar múltiplos pixels.</small>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <label style={labelStyle}>Disparo de Webhook (URL POST)</label>
                    <input type="text" placeholder="https://n8n.meudominio.com/webhook/clique" style={inputStyle} />
                    <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>Enviaremos um JSON com os dados do clique para esta URL (Ideal para automações via n8n).</small>
                  </div>
                </div>
              )}

              {activeTab === 'qrcode' && (
                <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', height: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4 style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Estilização Dinâmica do QR Code</h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div><label style={labelStyle}>Tamanho (px)</label><input type="number" defaultValue={500} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Margem de Erro (Nível L, M, Q, H)</label><select style={inputStyle}><option>Alto (H) - Melhor para incluir logo</option><option>Médio (M)</option></select></div>
                    </div>

                    <div>
                      <label style={labelStyle}>Cor do Fundo</label>
                      <input type="color" defaultValue="#ffffff" style={{ width: '100%', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
                    </div>
                    
                    <div>
                      <label style={labelStyle}>Cor dos Pontos Frontais</label>
                      <input type="color" defaultValue="#000000" style={{ width: '100%', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
                    </div>

                    <div>
                      <label style={labelStyle}>Upload de Logo Central (Opcional)</label>
                      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', padding: '2rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                        <Upload size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Arraste um PNG ou JPG (Máx 2MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* LIVE PREVIEW QR CODE */}
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Preview em Tempo Real</span>
                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                      <QrCode size={160} color="#000" />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                      <button className="btn-primary" style={{ flex: 1, padding: '0.8rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}><Download size={14}/> Baixar PNG</button>
                      <button className="btn-primary outline" style={{ flex: 1, padding: '0.8rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}><Download size={14}/> SVG Vetor</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé Form */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.2)' }}>
              <button className="btn-primary outline" onClick={() => setView('list')} style={{ borderColor: 'transparent', color: 'var(--text-muted)' }}>Cancelar</button>
              <button className="btn-primary" onClick={() => setView('list')} style={{ padding: '0.8rem 2rem' }}>Criar Link Curto</button>
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
            <LinkIcon color="var(--accent)" /> Encurtador de Links e Rastreador
          </h2>
        </div>
      )}

      {renderContent()}
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

const formTabStyle = (isActive) => ({
  flex: 1,
  padding: '1rem',
  background: isActive ? 'transparent' : 'transparent',
  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
  border: 'none',
  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.85rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  transition: 'all 0.2s'
});

const toggleLabel = {
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
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};
