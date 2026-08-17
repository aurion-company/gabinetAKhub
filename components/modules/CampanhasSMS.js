import React, { useState } from 'react';
import { Mail, Plus, Search, Sparkles, Send, AlertTriangle, Users, User, Phone, CheckCircle2, MoreVertical, Calendar } from 'lucide-react';

export default function CampanhasSMS() {
  const [activeTab, setActiveTab] = useState('listagem'); // 'listagem' | 'nova'
  
  // States para Nova Campanha
  const [campaignName, setCampaignName] = useState('');
  const [targetType, setTargetType] = useState('grupo'); // 'grupo' | 'pessoa' | 'avulso'
  const [message, setMessage] = useState('');

  // Mocks de Listagem
  const mockCampaigns = [
    { id: 1, name: 'Lembrete de Reunião Bairro Centro', status: 'Concluído', date: '14/08/2026 14:30', targets: 1250 },
    { id: 2, name: 'Aviso Urgente - Mudança de Local', status: 'Processando', date: '17/08/2026 09:15', targets: 480 },
    { id: 3, name: 'Pesquisa de Opinião Relâmpago', status: 'Agendado', date: '18/08/2026 10:00', targets: 5000 },
  ];

  const handleAddNameVar = () => {
    setMessage(prev => prev + '{nome} ');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      
      {/* CABEÇALHO DO MÓDULO */}
      <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Mail color="var(--accent)" /> Campanhas SMS (Disparo em Massa)
        </h2>

        {activeTab === 'listagem' ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              <Sparkles size={16} /> Assistente IA
            </button>
            <button className="btn-primary" onClick={() => setActiveTab('nova')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              <Plus size={16} /> Adicionar
            </button>
          </div>
        ) : (
          <button className="btn-primary outline" onClick={() => setActiveTab('listagem')} style={{ padding: '0.5rem 1rem' }}>
            Voltar para Listagem
          </button>
        )}
      </div>

      {/* ÁREA DE CONTEÚDO */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        
        {activeTab === 'listagem' && (
          <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Pesquisar campanhas..." style={{ ...inputStyle, paddingLeft: '2.5rem', borderRadius: '20px' }} />
              </div>
            </div>

            <div className="section-card liquid-glass" style={{ flex: 1, padding: '0', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem' }}>Nome da Campanha</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Envios Estimados</th>
                    <th style={{ padding: '1rem' }}>Created at</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((camp) => (
                    <tr key={camp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s', cursor: 'pointer' }} className="hover-bg-alpha">
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#fff' }}>{camp.name}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                          background: camp.status === 'Concluído' ? 'rgba(34, 197, 94, 0.1)' : camp.status === 'Processando' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                          color: camp.status === 'Concluído' ? 'var(--success)' : camp.status === 'Processando' ? 'var(--warning)' : 'var(--accent)'
                        }}>
                          {camp.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{camp.targets.toLocaleString()}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={14} /> {camp.date}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'nova' && (
          <div className="fade-in section-card liquid-glass" style={{ height: '100%', padding: '2rem', overflowY: 'auto' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>Criar Campanha SMS</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Envio de mensagens de texto tradicionais via operadora (Alta taxa de abertura).</p>
              </div>

              {/* IDENTIFICAÇÃO */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <label style={labelStyle}>Nome da Campanha *</label>
                <input 
                  type="text" 
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Ex: Alerta Mutirão de Saúde Vila Nova" 
                  style={inputStyle} 
                />
              </div>

              {/* SEGMENTAÇÃO (TIPO DE ALVO) */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <label style={{ ...labelStyle, marginBottom: '1rem' }}>Segmentação (Tipo de Alvo) *</label>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div 
                    onClick={() => setTargetType('grupo')}
                    style={{ ...radioCardStyle, borderColor: targetType === 'grupo' ? 'var(--accent)' : 'rgba(255,255,255,0.1)' }}
                  >
                    <Users size={20} color={targetType === 'grupo' ? 'var(--accent)' : 'var(--text-muted)'} />
                    <span style={{ fontWeight: '600', color: targetType === 'grupo' ? '#fff' : 'var(--text-secondary)' }}>Grupo de Tags</span>
                  </div>
                  <div 
                    onClick={() => setTargetType('pessoa')}
                    style={{ ...radioCardStyle, borderColor: targetType === 'pessoa' ? 'var(--accent)' : 'rgba(255,255,255,0.1)' }}
                  >
                    <User size={20} color={targetType === 'pessoa' ? 'var(--accent)' : 'var(--text-muted)'} />
                    <span style={{ fontWeight: '600', color: targetType === 'pessoa' ? '#fff' : 'var(--text-secondary)' }}>Pessoa (Individual)</span>
                  </div>
                  <div 
                    onClick={() => setTargetType('avulso')}
                    style={{ ...radioCardStyle, borderColor: targetType === 'avulso' ? 'var(--accent)' : 'rgba(255,255,255,0.1)' }}
                  >
                    <Phone size={20} color={targetType === 'avulso' ? 'var(--accent)' : 'var(--text-muted)'} />
                    <span style={{ fontWeight: '600', color: targetType === 'avulso' ? '#fff' : 'var(--text-secondary)' }}>Número Avulso</span>
                  </div>
                </div>

                {/* Seletores Dinâmicos */}
                {targetType === 'grupo' && (
                  <div>
                    <label style={labelStyle}>Selecione a Tag/Grupo *</label>
                    <select style={inputStyle}>
                      <option value="">Selecione...</option>
                      <option value="liderancas">Lideranças Comunitárias (850)</option>
                      <option value="apoiadores">Apoiadores (12.400)</option>
                      <option value="bairro_centro">Moradores - Bairro Centro (3.200)</option>
                    </select>
                  </div>
                )}
                {targetType === 'pessoa' && (
                  <div>
                    <label style={labelStyle}>Buscar Pessoa Cadastrada *</label>
                    <input type="text" placeholder="Digite nome, CPF ou Telefone..." style={inputStyle} />
                  </div>
                )}
                {targetType === 'avulso' && (
                  <div>
                    <label style={labelStyle}>Digite os números separados por vírgula *</label>
                    <input type="text" placeholder="Ex: 61999991111, 11988882222" style={inputStyle} />
                  </div>
                )}
              </div>

              {/* COMPOSIÇÃO DA MENSAGEM */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{...labelStyle, margin: 0}}>Mensagem SMS *</label>
                  <button 
                    onClick={handleAddNameVar}
                    style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    + Adicionar {'{nome}'}
                  </button>
                </div>
                
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Olá {nome}, lembramos que..."
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: message.length > 160 ? 'var(--warning)' : 'var(--text-secondary)' }}>
                    Caracteres: <strong>{message.length}</strong> {message.length > 160 && '(Isso consumirá mais de 1 crédito SMS por pessoa)'}
                  </span>
                </div>
              </div>

              {/* ALERTA TÉCNICO MD */}
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid var(--warning)', padding: '1.2rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <AlertTriangle size={24} color="var(--warning)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: 'var(--warning)', fontWeight: 'bold', marginBottom: '0.3rem', fontSize: '0.95rem' }}>Atenção Técnica de Performance</h4>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    É importante ressaltar que a inclusão de <strong>links (URLs)</strong> no corpo do texto (template) exige mais processamento das operadoras e diminui consideravelmente a velocidade de envio da campanha de SMS. Evite links muito longos ou, se possível, prefira alertas de texto simples.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn-primary outline" onClick={() => setActiveTab('listagem')} style={{ padding: '0.8rem 2rem' }}>Cancelar</button>
                <button className="btn-primary" style={{ padding: '0.8rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Send size={18} /> Criar e Disparar Campanha
                </button>
              </div>

            </div>
          </div>
        )}

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

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem'
};

const radioCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '1rem',
  background: 'rgba(0,0,0,0.3)',
  border: '2px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s'
};
