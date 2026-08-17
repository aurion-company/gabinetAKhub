'use client';

import React, { useState, useEffect } from 'react';
import { Target, Activity, Share2, AlertCircle, RefreshCcw, Save, Server, Loader2, CheckCircle2 } from 'lucide-react';

export default function IntegracaoMetaAds() {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pixelId, setPixelId] = useState('');
  const [capiToken, setCapiToken] = useState('');
  const [adAccountId, setAdAccountId] = useState('');
  const [message, setMessage] = useState('');
  const [testResult, setTestResult] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        const pixel = data.find(s => s.key === 'META_PIXEL_ID');
        const token = data.find(s => s.key === 'META_CAPI_TOKEN');
        const account = data.find(s => s.key === 'META_AD_ACCOUNT_ID');
        if (pixel) setPixelId(pixel.value);
        if (token) setCapiToken(token.value);
        if (account) setAdAccountId(account.value);
      }
    } catch (e) {
      console.error('Erro ao buscar chaves no banco:', e);
    }
  };

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status' })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStatus(data.metaStatus);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchStatus();
  }, []);

  const handleSaveConfig = async () => {
    setMessage('Salvando configurações...');
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'META_PIXEL_ID', value: pixelId })
      });
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'META_CAPI_TOKEN', value: capiToken })
      });
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'META_AD_ACCOUNT_ID', value: adAccountId })
      });

      setMessage('✅ Chaves de Integração CAPI e Pixel salvas com sucesso no banco de dados isolado.');
      fetchStatus();
      setTimeout(() => setMessage(''), 4000);
    } catch (e) {
      setMessage('❌ Erro ao salvar chaves no banco de dados.');
    }
  };

  const handleTestEvent = async () => {
    setTestResult('Enviando evento de teste...');
    try {
      const res = await fetch('/api/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger_event',
          eventName: 'TestEvent_GP360',
          pixelId,
          capiToken
        })
      });
      const data = await res.json();
      if (data.success) {
        setTestResult(data.simulated 
          ? `⚠️ Evento disparado em modo simulação: Falta token CAPI. (${data.message})`
          : '✅ Evento disparado via CAPI Server-to-Server com sucesso!');
      } else {
        setTestResult('❌ Erro ao disparar evento.');
      }
    } catch (e) {
      setTestResult('❌ Falha na comunicação com API Meta.');
    }
  };

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1877F2' }}>
            <Target size={28} /> Tráfego Político Pago (Meta Ads & CAPI)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Integração nativa com a API de Conversões do Meta (CAPI). Acompanhe eventos server-side, 
            contorne o bloqueio de cookies do iOS 14+ e otimize campanhas com 100% de precisão.
          </p>
        </div>
        {status?.pixelConnected ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,255,170,0.1)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--success)', fontWeight: 'bold', fontSize: '0.85rem' }}>
            <CheckCircle2 size={16} /> API Conectada
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,23,68,0.1)', color: 'var(--danger)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--danger)', fontWeight: 'bold', fontSize: '0.85rem' }}>
            <AlertCircle size={16} /> Não Configurado
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* CONFIGURAÇÃO DE CHAVES */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={18} color="var(--accent)" /> Configuração Server-Side
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>Meta Pixel ID</label>
              <input 
                type="text" 
                placeholder="Ex: 123456789012345" 
                value={pixelId} 
                onChange={(e) => setPixelId(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>Meta CAPI Token (Token de Acesso à API)</label>
              <input 
                type="password" 
                placeholder="Ex: EAAC_meta_capi_token_secret..." 
                value={capiToken} 
                onChange={(e) => setCapiToken(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>Ad Account ID (Opcional)</label>
              <input 
                type="text" 
                placeholder="Ex: act_9876543210" 
                value={adAccountId} 
                onChange={(e) => setAdAccountId(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff' }}
              />
            </div>

            <button onClick={handleSaveConfig} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <Save size={18} /> Salvar Integração
            </button>

            {message && <div style={{ fontSize: '0.85rem', color: 'var(--success)', marginTop: '0.5rem', fontWeight: 'bold' }}>{message}</div>}
          </div>
        </div>

        {/* ESTATÍSTICAS E TESTE DE EVENTOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="var(--success)" /> Saúde da Integração
              </h3>
              <button onClick={fetchStatus} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', cursor: 'pointer' }} title="Atualizar">
                <RefreshCcw size={16} className={isLoading ? "spinner" : ""} />
              </button>
            </div>

            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <Loader2 className="spinner" size={24} color="var(--accent)" />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pixel Conectado:</span>
                  <span style={{ fontWeight: 'bold', color: status?.pixelConnected ? 'var(--success)' : 'var(--text-muted)' }}>{status?.pixelId || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Conta de Anúncios:</span>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{status?.adAccountId || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Campanhas Ativas:</span>
                  <span style={{ fontWeight: 'bold', color: '#fff' }}>{status?.activeCampaigns || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Alcance Mensal Estimado:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{status?.monthlyReach || '0'}</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem', flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Share2 size={18} color="var(--warning)" /> Teste de Disparo CAPI
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Dispare um evento simulado (TestEvent_GP360) para o endpoint oficial do Facebook Graph API e valide a dedupicação server-side.
            </p>
            <button onClick={handleTestEvent} style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px dashed var(--warning)', color: 'var(--warning)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Disparar Evento CAPI Agora
            </button>
            {testResult && (
              <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '0.8rem', color: testResult.includes('❌') ? 'var(--danger)' : 'var(--success)' }}>
                {testResult}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
