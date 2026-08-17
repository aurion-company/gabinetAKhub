'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, ArrowLeft, Building2, Users, ClipboardList, MessageSquare, Compass, Sparkles, ShieldCheck, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SiteInstitucional({ onLogin }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickModules = [
    { icon: Building2, label: 'Gabinete' },
    { icon: Users, label: 'Eleitores' },
    { icon: ClipboardList, label: 'Demandas' },
    { icon: MessageSquare, label: 'WhatsApp' },
    { icon: Compass, label: 'Geomapa' },
    { icon: Sparkles, label: 'IA Gemini' },
    { icon: ShieldCheck, label: 'Segurança' },
    { icon: CreditCard, label: 'Arrecadação' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'fmdigitalagency.job@gmail.com' && password === '807522') {
        if (onLogin) onLogin();
        else router.push('/app');
      } 
      else if (email === 'admin@elegis.com' && password === 'admin') {
        if (onLogin) onLogin();
        else router.push('/app');
      }
      else {
        setError('E-mail ou senha inválidos.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .login-wrapper { display: flex; width: 100vw; min-height: 100vh; overflow-x: hidden; font-family: "Inter", sans-serif; background-color: #0b141a; }
        .login-left { flex: 1; background-color: #0284c7; position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 3.5rem 4rem; color: #fff; overflow: hidden; }
        .login-right { flex: 0 0 520px; background-color: #0b141a; display: flex; flex-direction: column; padding: 3.5rem 3rem; position: relative; border-left: 1px solid rgba(255,255,255,0.05); }
        @media (max-width: 900px) {
          .login-wrapper { flex-direction: column; }
          .login-left { padding: 2rem !important; }
          .login-right { flex: 1; width: 100%; max-width: 100%; padding: 2rem !important; border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
        }
      `}} />
    <div className="login-wrapper">
      
      {/* LADO ESQUERDO: Branding e Comunicação (Azul Elegiv Gestão 360) */}
      <div className="login-left">
        
        {/* Glows decorativos */}
        <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* LOGO ALINHADA À ESQUERDA - 100% BRANCA E MAIOR */}
        <div style={{ zIndex: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img 
            src="/logo/horizontal.svg" 
            alt="Elegiv Gestão 360" 
            style={{ 
              height: '56px', 
              objectFit: 'contain', 
              filter: 'brightness(0) invert(1)', 
              display: 'block' 
            }} 
          />
        </div>

        {/* COPY PRINCIPAL E MODULOS ESTILO SISTEMA */}
        <div style={{ zIndex: 10, maxWidth: '580px', margin: '2rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.18)', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1.5rem', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ background: '#22c55e', padding: '2px 8px', borderRadius: '12px', marginRight: '8px', color: '#fff', fontSize: '0.75rem', fontWeight: '700' }}>Novo!</span>
            Plataforma Completa para Campanhas e Mandatos Políticos
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3.4rem)', fontWeight: '900', lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-1px', textShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
            Gestão de Gabinete, Campanhas Eleitorais e Arrecadação de Doações!
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            A solução de inteligência política mais robusta para gerenciar eleitores, demandas comunitárias e mandatos em tempo real.
          </p>

          {/* ICONES ESTILO SISTEMA (QUADRADOS VIDRO ESCURO DE 1 COR ÚNICA) */}
          <div style={{ background: 'rgba(7, 16, 26, 0.45)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '1.2rem 1.5rem', backdropFilter: 'blur(16px)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)', marginBottom: '0.8rem' }}>
              Módulos Chave do Ecossistema Elegiv Gestão 360
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
              {quickModules.map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.4rem', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', transition: 'transform 0.2s' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponent size={18} color="#ffffff" />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#ffffff', whiteSpace: 'nowrap' }}>{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rodapé do lado esquerdo */}
        <div style={{ zIndex: 10, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
          © Elegiv Gestão 360 · Tecnologia para Mandatos e Campanhas
        </div>

      </div>

      {/* LADO DIREITO: Área de Autenticação (Dark Mode) */}
      <div className="login-right">
        
        {/* Link Voltar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >
            <ArrowLeft size={16} /> Voltar para o site
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '380px', margin: '0 auto', width: '100%' }}>
          
          {/* LOGO NO LOGIN - 100% BRANCO E MAIOR */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', margin: '0 auto 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(14,165,233,0.15)' }}>
              <img src="/logo/icon.svg" alt="Elegiv Gestão 360 Icon" style={{ height: '36px', width: '36px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem', letterSpacing: '-0.5px' }}>Faça seu login</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Bem-vindo de volta! Insira seus dados para acessar o sistema.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>E-mail *</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="fmdigitalagency.job@gmail.com"
                style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Senha */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>Senha *</label>
                <a href="#" style={{ fontSize: '0.8rem', color: '#38bdf8', textDecoration: 'none' }}>Esqueceu sua senha?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="PIN / Senha"
                  style={{ width: '100%', padding: '0.85rem 1rem', paddingRight: '2.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#94a3b8', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#0ea5e9', cursor: 'pointer' }} /> Lembre de mim
            </label>

            {/* Botão Submit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                type="submit" 
                disabled={isLoading}
                style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 14px rgba(14,165,233,0.3)' }}
              >
                {isLoading ? <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}></div> : 'Login'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.2rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>OU</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
              </div>

              <button 
                type="button" 
                style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Entrar com Google
              </button>
            </div>
            
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'auto' }}>
          <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Protegido por reCAPTCHA e sujeito à <a href="/politica-de-privacidade" style={{ color: '#64748b', textDecoration: 'underline' }}>Política de Privacidade</a>.
          </p>
        </div>
      </div>
      
    </div>
    </>
  );
}
