import React, { useState } from 'react';
import { User, Lock, Bell, Smartphone, Upload, Camera, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MeuPerfil() {
  const [activeTab, setActiveTab] = useState('dados'); // dados, seguranca, preferencias

  const [formData, setFormData] = useState({
    nome: 'SuperAdmin Master',
    email: 'admin@elegiv.com.br',
    celular: '(61) 99999-0000',
    cargo: 'SaaS Superuser'
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      {/* HEADER */}
      <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <User color="var(--accent)" /> Meu Perfil
        </h2>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Save size={16} /> Salvar Alterações
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
        
        {/* SIDEBAR TABS */}
        <div className="section-card liquid-glass" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('dados')}
            style={tabStyle(activeTab === 'dados')}
          >
            <User size={16} /> Dados Pessoais
          </button>
          <button 
            onClick={() => setActiveTab('seguranca')}
            style={tabStyle(activeTab === 'seguranca')}
          >
            <Lock size={16} /> Segurança
          </button>
          <button 
            onClick={() => setActiveTab('preferencias')}
            style={tabStyle(activeTab === 'preferencias')}
          >
            <Bell size={16} /> Preferências
          </button>
        </div>

        {/* CONTEÚDO DAS TABS */}
        <div className="section-card liquid-glass" style={{ padding: '2rem', overflowY: 'auto' }}>
          
          {activeTab === 'dados' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Foto Perfil */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    width: '100px', height: '100px', borderRadius: '50%', 
                    background: 'var(--accent)', color: '#000', fontSize: '2rem', fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    EG
                  </div>
                  <button style={{ 
                    position: 'absolute', bottom: 0, right: 0, background: '#fff', color: '#000', 
                    border: 'none', borderRadius: '50%', width: '32px', height: '32px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}>
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Foto do Perfil</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Recomendado: 500x500px, máx 2MB (JPG ou PNG).</p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn-primary outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Fazer Upload</button>
                    <button className="btn-primary outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderColor: 'transparent', color: 'var(--danger)' }}>Remover Foto</button>
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

              {/* Formulário */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Nome Completo</label>
                  <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Celular (WhatsApp)</label>
                  <input type="text" value={formData.celular} onChange={(e) => setFormData({...formData, celular: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Cargo / Função</label>
                  <input type="text" value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} style={inputStyle} />
                </div>
              </div>
              
            </div>
          )}

          {activeTab === 'seguranca' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Alterar Senha</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Mantenha sua senha forte e não compartilhe com outras pessoas da equipe.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
                  <div>
                    <label style={labelStyle}>Senha Atual</label>
                    <input type="password" placeholder="••••••••" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nova Senha</label>
                    <input type="password" placeholder="••••••••" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Confirmar Nova Senha</label>
                    <input type="password" placeholder="••••••••" style={inputStyle} />
                  </div>
                  <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Atualizar Senha</button>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

              <div style={{ background: 'rgba(255, 171, 0, 0.1)', border: '1px solid var(--warning)', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <AlertCircle size={32} color="var(--warning)" />
                <div>
                  <h4 style={{ fontWeight: 'bold', color: '#fff' }}>Autenticação em Dois Fatores (2FA)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Adicione uma camada extra de segurança usando o Google Authenticator ou código SMS.</p>
                </div>
                <button className="btn-primary" style={{ marginLeft: 'auto', background: 'var(--warning)', color: '#000', borderColor: 'var(--warning)' }}>Configurar 2FA</button>
              </div>
            </div>
          )}

          {activeTab === 'preferencias' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Notificações</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Escolha como deseja ser avisado sobre atualizações no CRM.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={toggleRowStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Notificações Push (Navegador)</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avisos em tempo real na tela do sistema.</span>
                    </div>
                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--accent)', borderRadius: '34px' }}></span>
                    </label>
                  </label>

                  <label style={toggleRowStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Lembretes no WhatsApp</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Para reuniões da agenda e alertas urgentes de demandas.</span>
                    </div>
                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--accent)', borderRadius: '34px' }}></span>
                    </label>
                  </label>

                  <label style={toggleRowStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Resumo Diário por E-mail</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Um e-mail toda manhã com suas tarefas e compromissos do dia.</span>
                    </div>
                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                      <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '34px' }}></span>
                    </label>
                  </label>
                </div>
              </div>

            </div>
          )}

        </div>
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

const tabStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '1rem',
  width: '100%',
  background: isActive ? 'var(--accent)' : 'transparent',
  color: isActive ? '#000' : 'var(--text-secondary)',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.9rem',
  transition: 'all 0.2s',
  textAlign: 'left'
});

const toggleRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '8px',
  cursor: 'pointer'
};
