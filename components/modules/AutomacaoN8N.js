import React, { useState, useEffect } from 'react';
import { Cpu, Network, Zap, Webhook, Activity, Database, Key, Send, Copy, Settings, CheckCircle2 } from 'lucide-react';

export default function AutomacaoN8N() {
  const [activeTab, setActiveTab] = useState('canvas');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const webhooks = [
    { name: 'Novo Eleitor Cadastrado', url: 'https://n8n.elegis.com.br/webhook/eleitor-novo', method: 'POST' },
    { name: 'Demanda Concluída', url: 'https://n8n.elegis.com.br/webhook/demanda-fim', method: 'POST' },
    { name: 'Recebimento de PIX', url: 'https://n8n.elegis.com.br/webhook/pix-recebido', method: 'POST' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)', background: '#070b14', color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      {/* BACKGROUND ANIMADO (LINHAS CONECTANDO NÓS) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.6 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Paths Animados */}
          <path d="M 100 200 C 300 200, 400 400, 600 400" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="10 10">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M 100 600 C 300 600, 400 400, 600 400" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="10 10">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M 600 400 C 800 400, 900 200, 1100 200" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="10 10">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
          </path>
          <path d="M 600 400 C 800 400, 900 700, 1100 700" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeDasharray="10 10">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3.5s" repeatCount="indefinite" />
          </path>

          {/* Partículas nos nós de fundo */}
          <circle cx="100" cy="200" r="40" fill="url(#nodeGlow)">
            <animate attributeName="r" values="30;50;30" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="600" r="40" fill="url(#nodeGlow)">
             <animate attributeName="r" values="30;50;30" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="400" r="60" fill="url(#nodeGlow)">
            <animate attributeName="r" values="50;70;50" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="1100" cy="200" r="40" fill="url(#nodeGlow)" />
          <circle cx="1100" cy="700" r="40" fill="url(#nodeGlow)" />
        </svg>
      </div>

      {/* HEADER DA PÁGINA */}
      <div style={{ padding: '2rem 3rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(180deg, rgba(7,11,20,0.9) 0%, rgba(7,11,20,0) 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234, 88, 12, 0.15)', color: '#ea580c', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem', border: '1px solid rgba(234, 88, 12, 0.3)' }}>
            <Network size={16} /> Integração Oficial n8n
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px', margin: 0, textShadow: '0 4px 20px rgba(234, 88, 12, 0.2)' }}>
            Automação Visual de Workflows
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem', maxWidth: '600px', lineHeight: 1.5 }}>
            Conecte o Elegiv Gestão 360 a centenas de aplicativos externos. Crie regras, dispare webhooks e automatize seu gabinete sem escrever código.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setActiveTab('canvas')} style={{ padding: '0.8rem 1.5rem', background: activeTab === 'canvas' ? 'rgba(255,255,255,0.1)' : 'transparent', color: '#fff', border: '1px solid', borderColor: activeTab === 'canvas' ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
            <Activity size={18} /> Editor de Fluxos
          </button>
          <button onClick={() => setActiveTab('webhooks')} style={{ padding: '0.8rem 1.5rem', background: activeTab === 'webhooks' ? 'rgba(255,255,255,0.1)' : 'transparent', color: '#fff', border: '1px solid', borderColor: activeTab === 'webhooks' ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
            <Webhook size={18} /> API & Webhooks
          </button>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO */}
      <div style={{ flex: 1, position: 'relative', zIndex: 10, padding: '2rem 3rem', overflowY: 'auto' }}>
        
        {activeTab === 'canvas' ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            {/* CANVAS MOCKUP (Glassmorphism Flow) */}
            <div style={{ width: '100%', maxWidth: '1200px', height: '600px', background: 'rgba(7, 11, 20, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              
              {/* Toolbar do Canvas */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(234, 88, 12, 0.2)', color: '#ea580c', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>Workflow: Engajamento PIX</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>Última execução: há 2 minutos</div>
                </div>
                <button style={{ background: '#ea580c', color: '#fff', border: 'none', padding: '0.4rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={16} /> Execute Workflow
                </button>
              </div>

              {/* NÓS DO CANVAS */}
              <div style={{ position: 'relative', width: '100%', height: '100%', top: '60px' }}>
                
                {/* NÓ 1: Webhook Trigger */}
                <div style={{ position: 'absolute', top: '200px', left: '100px', width: '220px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.2s', cursor: 'grab' }} className="node-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                      <Webhook size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Webhook</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quando recebe PIX</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>Ativo e Escutando</div>
                  {/* Conector Output */}
                  <div style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '50%', border: '2px solid #070b14' }}></div>
                </div>

                {/* NÓ 2: Elegiv CRM Action */}
                <div style={{ position: 'absolute', top: '150px', left: '450px', width: '240px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.2s', cursor: 'grab' }} className="node-card">
                  {/* Conector Input */}
                  <div style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', border: '2px solid #070b14' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                      <Database size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Elegiv CRM</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Criar Registro / Eleitor</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Ação: Inserir Contato</div>
                  {/* Conector Output */}
                  <div style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', border: '2px solid #070b14' }}></div>
                </div>

                {/* NÓ 3: Elegiv WhatsApp Action */}
                <div style={{ position: 'absolute', top: '300px', left: '450px', width: '240px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.2s', cursor: 'grab' }} className="node-card">
                  {/* Conector Input */}
                  <div style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', background: '#06b6d4', borderRadius: '50%', border: '2px solid #070b14' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <div style={{ width: '36px', height: '36px', background: 'rgba(6, 182, 212, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
                      <Send size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>Central WhatsApp</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Enviar Agradecimento PIX</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Disparo: Template Aprovado</div>
                </div>

                {/* SVG Lines connecting nodes (mock) */}
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }}>
                  <path d="M 320 236 C 385 236, 385 186, 450 186" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.5" />
                  <path d="M 320 236 C 385 236, 385 336, 450 336" fill="none" stroke="#06b6d4" strokeWidth="3" opacity="0.5" />
                </svg>

              </div>
            </div>
          </div>
        ) : (
          /* ABA DE WEBHOOKS & CREDENCIAIS */
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={20} color="#ea580c" /> Credenciais de API n8n
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Utilize as credenciais abaixo para configurar o Node do Elegiv Gestão 360 na sua instância n8n.
              </p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', marginBottom: '0.3rem', display: 'block' }}>URL Base da API</label>
                  <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.8rem 1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                    <code style={{ color: '#38bdf8', fontSize: '0.9rem' }}>https://api.elegis.com.br/v1</code>
                    <button onClick={() => copyToClipboard('https://api.elegis.com.br/v1')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      {copied === 'https://api.elegis.com.br/v1' ? <CheckCircle2 size={18} color="#22c55e" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', marginBottom: '0.3rem', display: 'block' }}>Bearer Token (Chave de API)</label>
                  <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.8rem 1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                    <code style={{ color: '#fff', fontSize: '0.9rem' }}>elegiv_live_938xj28dhx812jd...</code>
                    <button onClick={() => copyToClipboard('elegiv_live_938xj28dhx812jd...')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                      {copied === 'elegiv_live_938xj28dhx812jd...' ? <CheckCircle2 size={18} color="#22c55e" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Webhook size={20} color="#3b82f6" /> Webhooks de Entrada Ativos
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                O Elegiv Gestão 360 está disparando eventos para estas URLs configuradas no seu n8n.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {webhooks.map((wh, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        {wh.name} <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem' }}>{wh.method}</span>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace' }}>{wh.url}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button style={{ width: '100%', padding: '1rem', background: 'rgba(234, 88, 12, 0.1)', border: '1px dashed rgba(234, 88, 12, 0.3)', color: '#ea580c', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
                  + Adicionar Novo Webhook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .node-card:hover { transform: translateY(-3px) !important; border-color: rgba(255,255,255,0.2) !important; }
      `}} />
    </div>
  );
}
