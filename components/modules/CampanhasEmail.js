import React, { useState } from 'react';
import { Mail, Search, Plus, Sparkles, Filter, Send, Image as ImageIcon, Type, Square, AlignJustify, ArrowLeft, Save, X, Settings2, Inbox, SendHorizontal, Star, Loader2 } from 'lucide-react';

export default function CampanhasEmail() {
  const [view, setView] = useState('list'); // 'list' ou 'create'
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox', 'sent'
  const [searchTerm, setSearchTerm] = useState('');

  // Formulário de Envio
  const [formData, setFormData] = useState({
    nome: '',
    assunto: '',
    para: '',
    html: '<p>Mensagem gerada via Central de Emails da Plataforma.</p>'
  });
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  // Mock de Campanhas
  const [campanhas] = useState([
    { id: 1, nome: 'Boletim Semanal 14/08', assunto: 'Resumo das Atividades do Mandato', grupo: 'Apoiadores, Lideranças', status: 'Enviada', data: '14/08/2026' },
    { id: 2, nome: 'Convite Evento Beneficente', assunto: 'Você é nosso convidado especial', grupo: 'Todos os Contatos', status: 'Em fila', data: '15/08/2026' },
    { id: 3, nome: 'Alerta de Chuvas', assunto: 'Defesa Civil: Atenção para fortes chuvas', grupo: 'Moradores Zona Sul', status: 'Falha', data: '12/08/2026' },
  ]);

  // Mock de Inbox
  const [inbox] = useState([
    { id: 101, sender: 'João Ramos', email: 'joaoramos@email.com', subject: 'Dúvida sobre o IPTU', date: 'Hoje, 09:42', isRead: false },
    { id: 102, sender: 'Maria Liderança', email: 'maria.lider@email.com', subject: 'Reunião confirmada não bairro', date: 'Ontem, 16:30', isRead: true },
    { id: 103, sender: 'Câmara Municipal', email: 'contato@camara.gov.br', subject: 'Pauta da próxima sessão', date: '12/08/2026', isRead: true },
  ]);

  const handleSend = async () => {
    if (!formData.para || !formData.assunto) {
      setSendResult({ type: 'error', msg: 'Preencha o Destinatário e o Assunto.' });
      return;
    }
    
    setIsSending(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.para,
          subject: formData.assunto,
          html: formData.html
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setSendResult({ type: 'success', msg: '✅ E-mail disparado com sucesso!' });
        setTimeout(() => setView('list'), 2000);
      } else {
        setSendResult({ type: 'error', msg: '❌ Erro ao enviar: ' + (data.error || 'Falha na API') });
      }
    } catch (error) {
      setSendResult({ type: 'error', msg: '❌ Erro de comunicação com o servidor.' });
    } finally {
      setIsSending(false);
    }
  };

  if (view === 'create') {
    return (
      <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '85vh', padding: '1.5rem', gap: '1.5rem' }}>
        
        {/* HEADER DE CRIAÇÃO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setView('list')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={20} />
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail color="var(--accent)" /> Nova Campanha de E-mail
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              Preview (Olhadinha)
            </button>
            <button 
              className="btn-primary" 
              onClick={handleSend} 
              disabled={isSending}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', opacity: isSending ? 0.7 : 1 }}
            >
              {isSending ? <Loader2 size={16} className="spinner" /> : <Send size={16} />}
              {isSending ? 'Enviando...' : 'Disparar Campanha'}
            </button>
          </div>
        </div>

        {sendResult && (
          <div style={{ padding: '1rem', borderRadius: '8px', background: sendResult.type === 'success' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: sendResult.type === 'success' ? 'var(--success)' : 'var(--danger)', border: `1px solid ${sendResult.type === 'success' ? 'var(--success)' : 'var(--danger)'}` }}>
            {sendResult.msg}
          </div>
        )}

        {/* INFORMAÇÕES BÁSICAS E ROTEAMENTO */}
        <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Nome da Campanha *</label>
              <input type="text" placeholder="Ex: Newsletter de Agosto" style={inputStyle} value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Assunto do Email *</label>
              <input type="text" placeholder="Ex: Confira as nãovidades do mandato" style={inputStyle} value={formData.assunto} onChange={e => setFormData({...formData, assunto: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Destinatário (Para) *</label>
              <input type="email" placeholder="Ex: eleitor@email.com" style={inputStyle} value={formData.para} onChange={e => setFormData({...formData, para: e.target.value})} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div><label style={labelStyle}>Email do Remetente (Configurado não Servidor) *</label><input type="email" readOnly style={{...inputStyle, opacity: 0.7, cursor: 'not-allowed'}} value="gabinete@gestaopolitica360.com.br" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Grupo ou Tag</label>
                <select style={inputStyle}><option>Envio Avulso (Use campo Destinatário)</option><option>Todos os Contatos</option><option>Lideranças</option></select>
              </div>
              <div>
                <label style={labelStyle}>Provedor de E-mail *</label>
                <select style={inputStyle}><option>Padrão GabinetAK (Resend)</option><option>AWS SES Próprio</option><option>SendGrid</option></select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Template</label>
              <select style={inputStyle}><option>Criar do Zero</option><option>Boletim Quinzenal</option><option>Aviso Urgente</option></select>
            </div>
          </div>
        </div>

        {/* CONSTRUTOR VISUAL (DRAG & DROP) */}
        <div style={{ flex: 1, display: 'flex', gap: '1rem', minHeight: '500px' }}>
          
          {/* Barra Lateral: Content Blocks */}
          <div style={{ width: '220px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Blocos (Arraste)</h4>
            <div style={blockStyle}><Type size={18} /> Texto</div>
            <div style={blockStyle}><ImageIcon size={18} /> Imagem</div>
            <div style={blockStyle}><Square size={18} /> Botão</div>
            <div style={blockStyle}><AlignJustify size={18} /> Separador</div>
            <div style={{ ...blockStyle, opacity: 0.5 }}>[ Espaço ]</div>
            <div style={{ ...blockStyle, opacity: 0.5 }}>|| Colunas ||</div>
          </div>

          {/* Canvas Central */}
          <div style={{ flex: 1, background: '#f4f4f5', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', overflowY: 'auto', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: '#000', fontSize: '0.8rem', fontWeight: 'bold' }}>Canvas de E-mail</div>
            <div style={{ width: '100%', maxWidth: '600px', background: '#fff', minHeight: '400px', border: '1px dashed #ccc', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
              <div style={{ width: '80%', height: '120px', background: '#e5e7eb', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>[ Banner Principal ]</div>
              <div style={{ width: '80%', height: '20px', background: '#f3f4f6', marginBottom: '0.5rem' }}></div>
              <div style={{ width: '80%', height: '20px', background: '#f3f4f6', marginBottom: '0.5rem' }}></div>
              <div style={{ width: '60%', height: '20px', background: '#f3f4f6', marginBottom: '2rem' }}></div>
              <div style={{ padding: '0.8rem 2rem', background: '#3b82f6', color: '#fff', borderRadius: '4px' }}>Call to Action</div>
            </div>
          </div>

          {/* Propriedades Laterais */}
          <div style={{ width: '250px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Settings2 size={16} /> Propriedades</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>
              Clique em um elemento não canvas para editar cores, links e margens.
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
          <Mail color="var(--accent)" /> Campanhas de E-mail
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} /> Assistente IA
          </button>
          <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem' }}>
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </div>

      {/* TAB MENU */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('inbox')}
          style={{ ...tabStyle, ...(activeTab === 'inbox' ? activeTabStyle : {}) }}>
          <Inbox size={16} /> Caixa de Entrada
        </button>
        <button 
          onClick={() => setActiveTab('sent')}
          style={{ ...tabStyle, ...(activeTab === 'sent' ? activeTabStyle : {}) }}>
          <SendHorizontal size={16} /> Enviados (Campanhas em Massa)
        </button>
      </div>

      {activeTab === 'sent' && (
        <>
          {/* DASHBOARD KPIs */}
          <div className="fund-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div className="section-card liquid-glass" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Campanhas Criadas</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>24</div>
            </div>
            <div className="section-card liquid-glass" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Enviadas (Sucesso)</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--success)' }}>21 <span style={{ fontSize: '0.9rem' }}>(87%)</span></div>
            </div>
            <div className="section-card liquid-glass" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Em Fila / Enviando</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--warning)' }}>2</div>
            </div>
            <div className="section-card liquid-glass" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Falhas</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--danger)' }}>1</div>
            </div>
          </div>
        </>
      )}

      {/* PESQUISA */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="input-group" style={{ flex: 1, margin: 0, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou assunto da campanha..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.8rem' }}
          />
        </div>
      </div>

      {/* TABELA DE CONTEÚDO */}
      <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        
        {activeTab === 'sent' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Nome da Campanha</th>
                <th style={{ padding: '1rem' }}>Assunto</th>
                <th style={{ padding: '1rem' }}>Grupo / Tag</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {campanhas.filter(c => c.nome.toLowerCase().includes(searchTerm.toLowerCase())).map((campanha) => (
                <tr key={campanha.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '700', color: '#fff' }}>{campanha.nome}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{campanha.assunto}</td>
                  <td style={{ padding: '1rem' }}><span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.8rem' }}>{campanha.grupo}</span></td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700',
                      background: campanha.status === 'Enviada' ? 'rgba(0, 230, 118, 0.1)' : campanha.status === 'Falha' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 215, 0, 0.1)',
                      color: campanha.status === 'Enviada' ? 'var(--success)' : campanha.status === 'Falha' ? 'var(--danger)' : 'var(--warning)',
                    }}>
                      {campanha.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{campanha.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem 1.5rem', width: '40px' }}><Star size={16} /></th>
                <th style={{ padding: '1rem' }}>Remetente</th>
                <th style={{ padding: '1rem', width: '50%' }}>Assunto</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {inbox.filter(i => i.subject.toLowerCase().includes(searchTerm.toLowerCase())).map((msg) => (
                <tr key={msg.id} style={{ 
                  borderBottom: '1px solid rgba(255,255,255,0.02)', 
                  transition: 'background 0.2s', cursor: 'pointer',
                  background: msg.isRead ? 'transparent' : 'rgba(255,255,255,0.04)'
                }}>
                  <td style={{ padding: '1rem 1.5rem', color: msg.isRead ? 'var(--text-muted)' : 'var(--warning)' }}>
                    <Star size={16} fill={!msg.isRead ? 'var(--warning)' : 'none'} />
                  </td>
                  <td style={{ padding: '1rem', color: msg.isRead ? 'var(--text-secondary)' : '#fff', fontWeight: msg.isRead ? 'normal' : '700' }}>
                    {msg.sender} <br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.email}</span>
                  </td>
                  <td style={{ padding: '1rem', color: msg.isRead ? 'var(--text-secondary)' : '#fff', fontWeight: msg.isRead ? 'normal' : '700' }}>{msg.subject}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-muted)' }}>{msg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

const blockStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.8rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  cursor: 'grab',
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  transition: 'all 0.2s'
};

const tabStyle = {
  background: 'transparent',
  border: 'none',
  color: 'var(--text-muted)',
  padding: '0.5rem 1rem',
  fontSize: '0.9rem',
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  borderBottom: '2px solid transparent',
  transition: 'all 0.2s'
};

const activeTabStyle = {
  color: 'var(--accent)',
  borderBottom: '2px solid var(--accent)'
};
