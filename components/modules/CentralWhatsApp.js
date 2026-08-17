import React, { useState } from 'react';
import { MessageCircle, QrCode, Smartphone, Users, Inbox, RefreshCw, Plus, Calendar, Sparkles, Image as ImageIcon, Send, Search, CheckCircle2, AlertTriangle, ArrowRightLeft, Tag } from 'lucide-react';

export default function CentralWhatsApp() {
  const [activeTab, setActiveTab] = useState('conversas'); // 'contas' | 'conversas' | 'campanhas' | 'sincronizar'
  
  // Mocks de dados
  const [isConnected, setIsConnected] = useState(true);
  const [activeChat, setActiveChat] = useState(null);

  const mockChats = [
    { id: 1, name: 'João Silva', phone: '+55 61 9999-1111', lastMsg: '[Áudio - 22s]', status: 'ATENDENDO: VOCÊ', unread: 0 },
    { id: 2, name: 'Ana Souza', phone: '+55 61 8888-2222', lastMsg: 'Bom dia, gostaria de saber sobre...', status: 'AGUARDANDO', unread: 2 },
    { id: 3, name: 'Carlos Prefeito', phone: '+55 61 7777-3333', lastMsg: 'Ok, combinado.', status: 'ATENDENDO: MÁRCIA', unread: 0 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contas':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
            {!isConnected ? (
              <>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '1rem 2rem', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <AlertTriangle color="var(--danger)" />
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Conecte seu WhatsApp para começar</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>O sistema requer uma conexão ativa para gerenciar atendimentos e disparos.</p>
                  </div>
                </div>
                
                <div className="section-card liquid-glass" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '100%', marginTop: '2rem' }}>
                  <QrCode size={150} color="var(--text-secondary)" style={{ margin: '0 auto 2rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Escanear QR Code</h3>
                  <ol style={{ textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                    <li>Abra o WhatsApp no seu celular</li>
                    <li>Vá em Configurações &gt; Aparelhos Conectados</li>
                    <li>Toque em "Conectar um Aparelho"</li>
                    <li>Aponte a câmera para esta tela</li>
                  </ol>
                  <button className="btn-primary" onClick={() => setIsConnected(true)} style={{ width: '100%' }}>Simular Conexão Realizada</button>
                </div>
              </>
            ) : (
              <div className="section-card liquid-glass" style={{ padding: '2rem', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Smartphone size={40} color="var(--success)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>Aparelho Conectado</h3>
                <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>+55 (61) 9988-7766</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Status da API Z-API: Operante e sincronizada.</p>
                <button className="btn-primary outline" onClick={() => setIsConnected(false)} style={{ width: '100%', color: 'var(--danger)', borderColor: 'var(--danger)' }}>Desconectar Aparelho</button>
              </div>
            )}
          </div>
        );

      case 'conversas':
        if (!isConnected) return <div style={{textAlign:'center', padding:'3rem', color:'var(--text-muted)'}}>Conecte o aparelho na aba Contas primeiro.</div>;
        
        return (
          <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1rem', height: '100%', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
            
            {/* Sidebar Conversas */}
            <div style={{ background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" placeholder="Buscar contatos..." style={{ ...inputStyle, padding: '0.6rem 0.6rem 0.6rem 2rem', fontSize: '0.8rem', borderRadius: '20px' }} />
                </div>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {mockChats.map(chat => (
                  <div 
                    key={chat.id} 
                    onClick={() => setActiveChat(chat)}
                    style={{ 
                      padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer', 
                      background: activeChat?.id === chat.id ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
                      borderLeft: activeChat?.id === chat.id ? '3px solid var(--accent)' : '3px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{chat.name}</strong>
                      {chat.unread > 0 && <span style={{ background: 'var(--accent)', color: '#000', fontSize: '0.65rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{chat.unread}</span>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{chat.lastMsg}</span>
                    </div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: chat.status.includes('AGUARDANDO') ? 'var(--warning)' : 'var(--text-muted)', marginTop: '0.4rem' }}>
                      {chat.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Chat Area */}
            {activeChat ? (
              <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.1)' }}>
                {/* Chat Header */}
                <div style={{ padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                      {activeChat.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{activeChat.name}</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activeChat.phone}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={iconBtnStyle} title="Adicionar Tag"><Tag size={16} /> Tags</button>
                    <button style={iconBtnStyle} title="Transferir para outro Atendente"><ArrowRightLeft size={16} /> Transferir</button>
                    <button className="btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)', padding: '0.5rem 1rem' }}>Finalizar</button>
                  </div>
                </div>

                {/* Chat Body */}
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ alignSelf: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.3rem 1rem', borderRadius: '12px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hoje</div>
                  
                  <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px 12px 12px 0', maxWidth: '70%', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.9rem', color: '#fff', lineHeight: '1.4' }}>{activeChat.lastMsg}</p>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textAlign: 'right', marginTop: '0.5rem' }}>09:41</span>
                  </div>
                </div>

                {/* Chat Input */}
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button style={{ ...iconBtnStyle, border: 'none', background: 'transparent' }}><ImageIcon size={20} /></button>
                  <input type="text" placeholder="Digite uma mensagem..." style={{ ...inputStyle, flex: 1, borderRadius: '20px' }} />
                  <button className="btn-primary" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexDirection: 'column', gap: '1rem' }}>
                <MessageCircle size={48} opacity={0.2} />
                <p>Selecione uma conversa para iniciar o atendimento.</p>
              </div>
            )}
          </div>
        );

      case 'campanhas':
        if (!isConnected) return <div style={{textAlign:'center', padding:'3rem', color:'var(--text-muted)'}}>Conecte o aparelho na aba Contas primeiro.</div>;

        return (
          <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', height: '100%', overflow: 'hidden' }}>
            {/* Esquerda: Configurações da Campanha */}
            <div className="section-card liquid-glass" style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                  <MessageCircle color="var(--accent)" /> Nova Campanha (Disparo em Massa)
                </h3>
              </div>
              
              <div>
                <label style={labelStyle}>Nome da Campanha *</label>
                <input type="text" placeholder="Ex: Convite Reunião Bairro Centro" style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Conta de WhatsApp *</label>
                  <select style={inputStyle}>
                    <option>+55 (61) 9988-7766 (Oficial)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Tipo de Alvo *</label>
                  <select style={inputStyle}>
                    <option>Grupo de Contatos (Tags)</option>
                    <option>Pessoas Específicas</option>
                    <option>Números Avulsos</option>
                  </select>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={labelStyle}>Mensagem do Disparo</label>
                  <button style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <Sparkles size={12} /> Variação com IA
                  </button>
                </div>
                <textarea 
                  style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                  defaultValue="Olá {nome}! Gostaria de te convidar para o nosso encontro amanhã..."
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)', cursor: 'pointer' }}>{`{nome}`}</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)', cursor: 'pointer' }}>+ Imagem/Mídia</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Intervalo Base (Anti-Spam) *</label>
                  <select style={inputStyle}>
                    <option>20 a 40 segundos (Rápido)</option>
                    <option>1 a 3 minutos (Seguro)</option>
                    <option>5 a 10 minutos (Lento)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Agendamento</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '42px', padding: '0 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <input type="checkbox" /> <span style={{ fontSize: '0.85rem', color: '#fff' }}>Agendar envio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direita: Mobile Preview */}
            <div className="section-card liquid-glass" style={{ padding: '0', display: 'flex', flexDirection: 'column', background: '#0b141a', overflow: 'hidden', border: '8px solid #111', borderRadius: '30px' }}>
              <div style={{ background: '#202c33', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#ccc' }}></div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>João (Exemplo)</div>
              </div>
              <div style={{ flex: 1, background: '#0b141a', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', opacity: 0.9 }}>
                <div style={{ background: '#005c4b', color: '#e9edef', padding: '0.5rem 1rem', borderRadius: '12px 0 12px 12px', alignSelf: 'flex-end', maxWidth: '85%', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '1rem', position: 'relative' }}>
                  Olá João! Gostaria de te convidar para o nosso encontro amanhã...
                  <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', display: 'block', textAlign: 'right', marginTop: '0.3rem' }}>10:42</span>
                </div>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.8)' }}>
                <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>🚀 Criar Disparo</button>
              </div>
            </div>
          </div>
        );

      case 'sincronizar':
        return (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem 0' }}>
            <div className="section-card liquid-glass" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <RefreshCw size={40} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: '#fff' }}>Sincronizar Contatos</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Esta ação irá importar todos os contatos salvos no seu aparelho celular para a base principal do CRM.
              </p>
              
              <div style={{ background: 'rgba(255, 171, 0, 0.1)', border: '1px solid var(--warning)', padding: '1rem', borderRadius: '8px', color: 'var(--warning)', fontSize: '0.8rem', textAlign: 'left', marginBottom: '2rem', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                <span><strong>Atenção:</strong> Contatos com o mesmo celular já cadastrado serão ignorados automaticamente para evitar duplicidade.</span>
              </div>

              <button className="btn-primary" disabled={!isConnected} style={{ width: '100%', padding: '1rem', fontSize: '1rem', opacity: isConnected ? 1 : 0.5 }}>
                {isConnected ? 'Iniciar Sincronização Segura' : 'Conecte o WhatsApp Primeiro'}
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem' }}>
      
      {/* CABEÇALHO E ABAS */}
      <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <MessageCircle color="var(--success)" /> Central do WhatsApp Oficial
        </h2>

        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => setActiveTab('contas')}
            style={{ ...tabBtnStyle, background: activeTab === 'contas' ? 'var(--accent)' : 'transparent', color: activeTab === 'contas' ? '#000' : 'var(--text-muted)' }}
          ><QrCode size={16} /> Contas</button>
          
          <button 
            onClick={() => setActiveTab('conversas')}
            style={{ ...tabBtnStyle, background: activeTab === 'conversas' ? 'var(--accent)' : 'transparent', color: activeTab === 'conversas' ? '#000' : 'var(--text-muted)' }}
          ><MessageCircle size={16} /> Conversas</button>
          
          <button 
            onClick={() => setActiveTab('campanhas')}
            style={{ ...tabBtnStyle, background: activeTab === 'campanhas' ? 'var(--accent)' : 'transparent', color: activeTab === 'campanhas' ? '#000' : 'var(--text-muted)' }}
          ><Send size={16} /> Disparos Rápidos</button>
          
          <button 
            onClick={() => setActiveTab('sincronizar')}
            style={{ ...tabBtnStyle, background: activeTab === 'sincronizar' ? 'var(--accent)' : 'transparent', color: activeTab === 'sincronizar' ? '#000' : 'var(--text-muted)' }}
          ><RefreshCw size={16} /> Sincronizar</button>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO (FLEX GERAL) */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {renderTabContent()}
      </div>

    </div>
  );
}

const tabBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1.2rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

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

const iconBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-secondary)',
  padding: '0.4rem 0.8rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  fontWeight: '600',
  fontSize: '0.8rem',
  gap: '0.4rem'
};
