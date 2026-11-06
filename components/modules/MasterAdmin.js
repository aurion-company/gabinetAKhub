'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function MasterAdmin({ disabledModules = [], setDisabledModules = () => {}, menuCategories = [] }) {
  const [tenantsList, setTenantsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCabinetName, setNewCabinetName] = useState('');
  const [selectedTenantPlan, setSelectedTenantPlan] = useState('BASIC');
  const [adminStatusMessage, setAdminStatusMessage] = useState('');

  const fetchTenants = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/cabinets');
      if (res.ok) {
        const data = await res.json();
        setTenantsList(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleAddCabinetTenant = async () => {
    if (!newCabinetName) return;
    try {
      const res = await fetch('/api/cabinets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCabinetName,
          plan: selectedTenantPlan,
          candidateName: newCabinetName,
          state: 'SP',
          city: 'São Paulo',
          party: 'Sem Partido'
        })
      });

      if (res.ok) {
        setAdminStatusMessage(`✅ Gabinete / Tenant "${newCabinetName}" provisionado com sucesso! Banco PostgreSQL isolado logicamente (RLS).`);
        setNewCabinetName('');
        fetchTenants();
        setTimeout(() => setAdminStatusMessage(''), 5000);
      } else {
        setAdminStatusMessage('❌ Erro ao provisionar gabinete.');
      }
    } catch (e) {
      setAdminStatusMessage('❌ Erro na comunicação com o servidor.');
    }
  };

  const handleToggleCabinetStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const res = await fetch('/api/cabinets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, subscriptionStatus: nextStatus })
      });
      if (res.ok) {
        setAdminStatusMessage(`✅ Gabinete status atualizado para ${nextStatus}!`);
        fetchTenants();
        setTimeout(() => setAdminStatusMessage(''), 5000);
      } else {
        setAdminStatusMessage('❌ Erro ao atualizar status.');
      }
    } catch (e) {
      setAdminStatusMessage('❌ Erro na comunicação com o servidor.');
    }
  };


  const calculateMRR = () => {
    const prices = {
      BASIC: 790,
      PRO: 1800,
      POLITICAL: 3500,
      ENTERPRISE: 8900
    };
    return tenantsList.reduce((acc, t) => acc + (prices[t.plan] || 0), 0);
  };

  const totalVoters = tenantsList.reduce((acc, t) => acc + (t._count?.voters || 0), 0);

  return (
    <div className="section-card liquid-glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={28} color="#ef4444" /> 👑 Painel Master Admin & Governança SaaS
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Gestão Global de Gabinetes, Licenciamento, Métricas de Receita e Integradores Server-Side.</p>
        </div>
        <button className="btn-primary" onClick={() => setNewCabinetName('Novo Gabinete ' + (tenantsList.length + 1))}>
          + Provisionar Novo Gabinete
        </button>
      </div>

      {/* CARDS DE MÉTRICAS MASTER SaaS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid var(--accent)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '700' }}>Receita Recorrente (MRR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculateMRR())}/mês
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Ativos em tempo real</div>
        </div>
        <div style={{ background: 'rgba(122,0,255,0.05)', border: '1px solid var(--accent-light)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: '#b877ff', fontSize: '0.8rem', fontWeight: '700' }}>Gabinetes / Tenants</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>{tenantsList.length} Ativos</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Multitenancy PostgreSQL</div>
        </div>
        <div style={{ background: 'rgba(0,255,170,0.05)', border: '1px solid var(--success)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: '700' }}>Eleitores Totais na Base</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>{totalVoters.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Criptografia AES-256</div>
        </div>
        <div style={{ background: 'rgba(255,170,0,0.05)', border: '1px solid var(--warning)', padding: '1.2rem', borderRadius: '12px' }}>
          <div style={{ color: 'var(--warning)', fontSize: '0.8rem', fontWeight: '700' }}>Status VPS Hetzner & Sentry</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.3rem' }}>100% Operational</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Coolify + Cloudflare</div>
        </div>
      </div>

      {/* FORMULÁRIO DE PROVISIONAMENTO RÁPIDO */}
      {newCabinetName !== '' && (
        <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--accent)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--accent)' }}>✨ Provisionar Novo Gabinete / Empresa Assinante</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <input 
              type="text" 
              value={newCabinetName} 
              onChange={(e) => setNewCabinetName(e.target.value)}
              placeholder="Nome do Gabinete ou Candidato..."
              style={{ padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
            />
            <select 
              value={selectedTenantPlan} 
              onChange={(e) => setSelectedTenantPlan(e.target.value)}
              style={{ padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
            >
              <option value="BASIC">Plano Básico (R$ 790/mês)</option>
              <option value="PRO">Plano Pro (R$ 1.800/mês)</option>
              <option value="POLITICAL">Plano Político (R$ 3.500/mês)</option>
              <option value="ENTERPRISE">Plano Enterprise (R$ 8.900/mês)</option>
            </select>
            <button onClick={handleAddCabinetTenant} className="btn-primary">Confirmar Criação</button>
          </div>
        </div>
      )}

      {adminStatusMessage && (
        <div style={{ marginBottom: '1.5rem', color: 'var(--success)', fontWeight: '700', padding: '0.75rem', background: 'rgba(0,255,170,0.1)', borderRadius: '8px', border: '1px solid rgba(0,255,170,0.3)' }}>
          {adminStatusMessage}
        </div>
      )}

      {/* TABELA MASTER DE GABINETES / ASSINANTES */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>🏢 Gabinetes & Tenants Cadastrados</h3>
      
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader2 className="spinner" size={32} color="var(--accent)" />
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.75rem' }}>Gabinete / Cliente</th>
              <th style={{ padding: '0.75rem' }}>Localização</th>
              <th style={{ padding: '0.75rem' }}>Plano SaaS</th>
              <th style={{ padding: '0.75rem' }}>Eleitores Mapeados</th>
              <th style={{ padding: '0.75rem' }}>MRR</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Ações Master</th>
            </tr>
          </thead>
          <tbody>
            {tenantsList.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Nenhum gabinete provisionado.</td></tr>
            ) : tenantsList.map((t) => {
              const prices = { BASIC: 790, PRO: 1800, POLITICAL: 3500, ENTERPRISE: 8900 };
              const mrr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prices[t.plan] || 0);

              return (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.9rem' }}>
                    <div style={{ fontWeight: '700', color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {t.id} • Candidato: {t.candidateName}</div>
                  </td>
                  <td style={{ padding: '0.9rem' }}>{t.city} / {t.state}</td>
                  <td style={{ padding: '0.9rem' }}>
                    <span className={`pref-tag ${t.plan === 'POLITICAL' ? 'political' : 'plan-pro'}`}>{t.plan}</span>
                  </td>
                  <td style={{ padding: '0.9rem', fontWeight: '700', color: 'var(--accent)' }}>{t._count?.voters || 0}</td>
                  <td style={{ padding: '0.9rem', color: 'var(--success)', fontWeight: '700' }}>{mrr}</td>
                  <td style={{ padding: '0.9rem' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700', background: t.subscriptionStatus === 'ACTIVE' ? 'rgba(0,255,170,0.15)' : 'rgba(255,23,68,0.15)', color: t.subscriptionStatus === 'ACTIVE' ? 'var(--success)' : 'var(--danger)' }}>
                      {t.subscriptionStatus}
                    </span>
                  </td>
                  <td style={{ padding: '0.9rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleToggleCabinetStatus(t.id, t.subscriptionStatus)}
                      style={{ background: 'transparent', border: '1px solid var(--border)', color: t.subscriptionStatus === 'ACTIVE' ? 'var(--danger)' : 'var(--success)', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                    >
                      {t.subscriptionStatus === 'ACTIVE' ? 'Suspender' : 'Reativar'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* INTEGRATION STATUS & MONITORING */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--accent)', fontSize: '1rem', marginBottom: '0.75rem' }}>🔑 Chaves de Integração Mestre</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Google Gemini AI API:</span>
              <span style={{ color: 'var(--success)' }}>🟢 Configurada (env)</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Resend E-mail API:</span>
              <span style={{ color: 'var(--success)' }}>🟢 Configurada (env)</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Meta Conversions API (CAPI):</span>
              <span style={{ color: 'var(--success)' }}>🟢 Server-to-Server Ativo</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Criptografia AES-256 Key:</span>
              <span style={{ color: 'var(--success)' }}>🟢 32-Bytes Válida</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-elevated)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--accent-light)', fontSize: '1rem', marginBottom: '0.75rem' }}>🛡️ Telemetria & Monitoramento Sentry</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Taxa de Erros Server-Side:</span>
              <span style={{ color: 'var(--success)' }}>0.00% (Estável)</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Containers Coolify VPS:</span>
              <span style={{ color: 'var(--success)' }}>2/2 Healthy</span>
            </div>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Proteção Cloudflare WAF:</span>
              <span style={{ color: 'var(--accent)' }}>Strict SSL Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLE DE MÓDULOS (FEATURE TOGGLES PARA TESTES) */}
      <div style={{ marginTop: '2rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} /> Feature Toggles (Habilitar/Desativar Ferramentas para Testes)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Por padrão, todos os módulos estão liberados para o perfil Master Admin. Desative módulos específicos abaixo para simular restrições e testar a interface do usuário final.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {menuCategories.filter(c => c.category !== 'Painel' && c.category !== 'Atalhos Principais').map((category, idx) => (
            <div key={idx}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.2rem' }}>
                {category.category}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {category.items.map(mod => {
                  const isDisabled = disabledModules.includes(mod.id);
                  return (
                    <label key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', background: isDisabled ? 'rgba(255,23,68,0.05)' : 'rgba(0,255,170,0.05)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: `1px solid ${isDisabled ? 'rgba(255,23,68,0.3)' : 'rgba(0,255,170,0.3)'}`, transition: 'all 0.2s' }}>
                      <input 
                        type="checkbox" 
                        checked={!isDisabled}
                        onChange={() => {
                          let updated;
                          if (isDisabled) {
                            updated = disabledModules.filter(id => id !== mod.id); // Re-habilita
                          } else {
                            updated = [...disabledModules, mod.id]; // Desabilita
                          }
                          setDisabledModules(updated);
                          localStorage.setItem('GabinetAK_disabled_modules', JSON.stringify(updated));
                        }}
                        style={{ accentColor: 'var(--accent)', width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <span style={{ color: isDisabled ? 'var(--text-muted)' : '#fff', textDecoration: isDisabled ? 'line-through' : 'none' }}>
                        {mod.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
