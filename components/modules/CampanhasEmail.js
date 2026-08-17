import React, { useState } from 'react';
import { Mail, Search, Plus, Sparkles, Filter, Send, Image as ImageIcon, Type, Square, AlignJustify, ArrowLeft, Save, X, Settings2 } from 'lucide-react';

export default function CampanhasEmail() {
  const [view, setView] = useState('list'); // 'list' ou 'create'
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de Campanhas
  const [campanhas] = useState([
    { id: 1, nome: 'Boletim Semanal 14/08', assunto: 'Resumo das Atividades do Mandato', grupo: 'Apoiadores, Lideranças', status: 'Enviada', data: '14/08/2026' },
    { id: 2, nome: 'Convite Evento Beneficente', assunto: 'Você é nosso convidado especial', grupo: 'Todos os Contatos', status: 'Em fila', data: '15/08/2026' },
    { id: 3, nome: 'Alerta de Chuvas', assunto: 'Defesa Civil: Atenção para fortes chuvas', grupo: 'Moradores Zona Sul', status: 'Falha', data: '12/08/2026' },
  ]);

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
            <button className="btn-primary" onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem' }}>
              <Send size={16} /> Disparar Campanha
            </button>
          </div>
        </div>

        {/* INFORMAÇÕES BÁSICAS E ROTEAMENTO */}
        <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div><label style={labelStyle}>Nome da Campanha *</label><input type="text" placeholder="Ex: Newsletter de Agosto" style={inputStyle} /></div>
            <div><label style={labelStyle}>Assunto do Email *</label><input type="text" placeholder="Ex: Confira as novidades do mandato" style={inputStyle} /></div>
            <div><label style={labelStyle}>Nome do Remetente *</label><input type="text" placeholder="Ex: Deputado Carlos" style={inputStyle} defaultValue="Equipe Elegiv" /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div><label style={labelStyle}>Email do Remetente *</label><input type="email" placeholder="contato@seudominio.com.br" style={inputStyle} defaultValue="contato@elegis.com.br" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Grupo ou Tag</label>
                <select style={inputStyle}><option>Todos os Contatos (Deixar Vazio)</option><option>Lideranças</option><option>Apoiadores</option></select>
              </div>
              <div>
                <label style={labelStyle}>Provedor de E-mail *</label>
                <select style={inputStyle}><option>Padrão Elegiv (Resend)</option><option>AWS SES Próprio</option><option>SendGrid</option></select>
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
              Clique em um elemento no canvas para editar cores, links e margens.
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

      {/* TABELA DE CAMPANHAS */}
      <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
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
