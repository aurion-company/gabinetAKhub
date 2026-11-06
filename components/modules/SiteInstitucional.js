'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft, 
  Building2, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  CreditCard,
  Lock,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SiteInstitucional({ onLogin }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estados para troca obrigatória de senha no primeiro acesso (Funcionários do Gabinete)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao autenticar.');
      }

      // Se o usuário entrou com a senha padrão de gabinete (primeiro acesso)
      if (data.mustChangePassword) {
        setShowChangePasswordModal(true);
        return;
      }

      if (onLogin) onLogin();
      else router.push('/app');

    } catch (err) {
      setError(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNewPassword = async (e) => {
    e.preventDefault();
    setChangePasswordError('');

    if (newPassword.length < 8) {
      setChangePasswordError('A nova senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('As senhas digitadas não conferem.');
      return;
    }

    setIsChangingPassword(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          currentPassword: password,
          newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setChangePasswordError(data.error || 'Erro ao atualizar a senha.');
        setIsChangingPassword(false);
        return;
      }

      setChangePasswordSuccess(true);

      setTimeout(() => {
        setShowChangePasswordModal(false);
        if (onLogin) onLogin();
        else router.push('/app');
      }, 1200);

    } catch (err) {
      setChangePasswordError('Erro ao conectar com o servidor. Tente novamente.');
      setIsChangingPassword(false);
    }
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
      
      {/* LADO ESQUERDO: Branding e Comunicação (Azul GabinetAK HUB) */}
      <div className="login-left">
        
        {/* Glows decorativos */}
        <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* LOGO OFICIAL GABINETAK - CORES NATURAIS NÍTIDAS */}
        <div style={{ zIndex: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img 
            src="/logo/horizontal.svg" 
            alt="GabinetAK HUB" 
            style={{ 
              height: '56px', 
              objectFit: 'contain', 
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
              Módulos Chave do Ecossistema GabinetAK HUB
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
        <div style={{ zIndex: 10, fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
          © GabinetAK HUB · Tecnologia para Mandatos e Campanhas
        </div>

      </div>

      {/* LADO DIREITO: Área de Autenticação (Dark Mode) */}
      <div className="login-right">
        
        {/* Link Voltar para o Site (Portal do Cidadão) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <a 
            href="/"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#94a3b8', 
              fontSize: '0.88rem', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontWeight: '600', 
              transition: 'color 0.2s',
              textDecoration: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >
            <ArrowLeft size={16} /> Voltar para o site
          </a>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          
          {/* LOGO NO LOGIN - ÍCONE OFICIAL GABINETAK */}
          <div style={{ marginBottom: '1.8rem', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#12141C', border: '1px solid rgba(255,255,255,0.1)', margin: '0 auto 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              <img src="/logo/icon.svg" alt="GabinetAK HUB Icon" style={{ height: '42px', width: '42px', objectFit: 'contain' }} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem', letterSpacing: '-0.5px' }}>Faça seu login</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.4 }}>
              Acesso exclusivo para <strong>parlamentares e equipe do gabinete</strong> credenciada.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>E-mail corporativo *</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="assessor@gabinete.com.br"
                style={{ width: '100%', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Senha */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>Senha *</label>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Enviada por e-mail</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="PIN / Senha de acesso"
                  style={{ width: '100%', padding: '0.85rem 1rem', paddingRight: '2.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
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
              <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: '#0ea5e9', cursor: 'pointer' }} /> Manter conectado no dispositivo
            </label>

            {/* Botão Submit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                type="submit" 
                disabled={isLoading}
                style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'opacity 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 14px rgba(14,165,233,0.3)' }}
              >
                {isLoading ? <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : 'Entrar no Sistema'}
              </button>
            </div>

            {/* Divisor Cidadão */}
            <div style={{ marginTop: '1rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                É cidadão ou eleitor?
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginTop: '0.6rem' }}>
                <a href="/" style={{ fontSize: '0.85rem', color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>
                  Acessar Portal do Cidadão &rarr;
                </a>
                <span style={{ color: '#475569' }}>·</span>
                <a href="/cadastro" style={{ fontSize: '0.85rem', color: '#38bdf8', textDecoration: 'none', fontWeight: '700' }}>
                  Criar Conta Cidadã
                </a>
              </div>
            </div>
            
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Ambiente criptografado com LGPD. Sujeito aos <a href="/termos-de-uso" style={{ color: '#64748b', textDecoration: 'underline' }}>Termos de Uso</a>.
          </p>
        </div>
      </div>

      {/* MODAL DE PRIMEIRO ACESSO — TROCA OBRIGATÓRIA DE SENHA PADRÃO */}
      {showChangePasswordModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#121824',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '20px',
            maxWidth: '460px',
            width: '100%',
            padding: '2.2rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            color: '#fff',
            fontFamily: '"Inter", sans-serif'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <KeyRound size={24} color="#38bdf8" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: '#fff' }}>Primeiro Acesso</h3>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '600' }}>Definição Obrigatória de Senha</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Você entrou com a senha temporária padrão enviada por e-mail. Por políticas de segurança do Gabinete, defina uma nova senha pessoal definitiva para continuar.
            </p>

            {changePasswordError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.75rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} /> {changePasswordError}
              </div>
            )}

            {changePasswordSuccess ? (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#22c55e', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                <strong>Senha alterada com sucesso!</strong>
                <p style={{ fontSize: '0.82rem', margin: '0.3rem 0 0', color: '#86efac' }}>Redirecionando para o painel do gabinete...</p>
              </div>
            ) : (
              <form onSubmit={handleSaveNewPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1' }}>Nova Senha Pessoal *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      placeholder="Mínimo de 8 caracteres"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      style={{ width: '100%', padding: '0.8rem 1rem', paddingRight: '2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1' }}>Confirmar Nova Senha *</label>
                  <input 
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="Repita a nova senha"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isChangingPassword}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: isChangingPassword ? 'not-allowed' : 'pointer',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isChangingPassword ? 'Salvando...' : 'Salvar Nova Senha e Acessar'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      
    </div>
    </>
  );
}
