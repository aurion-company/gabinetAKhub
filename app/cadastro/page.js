'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

const CIDADES_DF = [
  'Ceilândia',
  'Taguatinga',
  'Samambaia',
  'Plano Piloto',
  'Águas Claras',
  'Guará',
  'Gama',
  'Santa Maria',
  'Sobradinho',
  'Planaltina',
  'Recanto das Emas',
  'Vicente Pires',
  'Riacho Fundo',
  'São Sebastião',
  'Outra Região do DF'
];

export default function CadastroCidadaoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Ceilândia',
    password: '',
    confirmPassword: '',
    lgpd: true
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password.length < 6) {
      setErrorMsg('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('As senhas digitadas não conferem.');
      return;
    }

    if (!formData.lgpd) {
      setErrorMsg('É necessário concordar com os termos de privacidade para continuar.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register-citizen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Erro ao realizar cadastro.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      try {
        localStorage.setItem('gabinetak_citizen_user', JSON.stringify(data.user || { name: formData.name, email: formData.email, city: formData.city }));
      } catch (e) {}
      setTimeout(() => {
        router.push('/');
      }, 1200);
    } catch (err) {
      setErrorMsg('Erro de conexão com o servidor. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <style jsx>{`
        .register-container {
          min-height: 100vh;
          background: #F8FAFC;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          font-family: 'Inter', sans-serif;
          position: relative;
        }

        .back-nav {
          position: absolute;
          top: 24px;
          left: 24px;
        }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          color: #334155;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          text-decoration: none;
        }

        .btn-back:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .register-card {
          width: 100%;
          max-width: 520px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 2.5rem 2.2rem;
          box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }

        .brand-icon-box {
          width: 34px;
          height: 34px;
          background: #0038FF;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 56, 255, 0.25);
        }

        .brand-icon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.03em;
        }

        .brand-accent {
          color: #0038FF;
          font-weight: 900;
        }

        .brand-tag {
          font-size: 0.65rem;
          font-weight: 900;
          background: #EEF2FF;
          color: #0038FF;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .register-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .register-subtitle {
          font-size: 0.9rem;
          color: #64748B;
          margin: 0 0 1.75rem 0;
          line-height: 1.5;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.1rem;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1E293B;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #94A3B8;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.45rem;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #0F172A;
          background: #F8FAFC;
          font-family: inherit;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #0038FF;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(0, 56, 255, 0.1);
        }

        .form-select {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.45rem;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #0F172A;
          background: #F8FAFC;
          font-family: inherit;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
          cursor: pointer;
        }

        .form-select:focus {
          border-color: #0038FF;
          background: #FFFFFF;
        }

        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          margin: 1.25rem 0;
          font-size: 0.82rem;
          color: #475569;
          line-height: 1.4;
        }

        .checkbox-input {
          margin-top: 0.15rem;
          cursor: pointer;
        }

        .btn-submit {
          width: 100%;
          background: #0038FF;
          color: #FFFFFF;
          border: none;
          padding: 0.85rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 12px rgba(0, 56, 255, 0.25);
        }

        .btn-submit:hover:not(:disabled) {
          background: #0028CC;
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .alert-error {
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #B91C1C;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
        }

        .alert-success {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #065F46;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-footer {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #F1F5F9;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          text-align: center;
          font-size: 0.82rem;
          color: #64748B;
        }

        .link-text {
          color: #0038FF;
          font-weight: 700;
          text-decoration: none;
        }

        .link-text:hover {
          text-decoration: underline;
        }

        .staff-note {
          background: #F1F5F9;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.78rem;
          color: #475569;
          line-height: 1.4;
          margin-top: 0.5rem;
        }
      `}</style>

      <div className="back-nav">
        <a href="/" className="btn-back">
          <ArrowLeft size={15} />
          <span>Voltar ao Portal</span>
        </a>
      </div>

      <div className="register-card">
        <div className="brand-header">
          <div className="brand-icon-box">
            <img src="/logo/icon.svg" alt="GabinetAK" className="brand-icon-img" />
          </div>
          <span className="brand-name">
            gabinet<span className="brand-accent">ak</span>
          </span>
          <span className="brand-tag">HUB</span>
        </div>

        <h1 className="register-title">Crie sua Conta Cidadã</h1>
        <p className="register-subtitle">
          Salve suas demandas, acompanhe o trabalho parlamentar e tenha acesso ao histórico de conversas com a IA.
        </p>

        {errorMsg && <div className="alert-error">{errorMsg}</div>}
        {success && (
          <div className="alert-success">
            <CheckCircle2 size={18} />
            <span>Cadastro realizado! Redirecionando para a Home...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo *</label>
            <div className="input-wrapper">
              <User size={16} className="input-icon" />
              <input 
                type="text"
                className="form-input"
                placeholder="Ex: João da Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">E-mail *</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-icon" />
              <input 
                type="email"
                className="form-input"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp com DDD</label>
            <div className="input-wrapper">
              <Phone size={16} className="input-icon" />
              <input 
                type="tel"
                className="form-input"
                placeholder="(61) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Sua Cidade / Região do DF *</label>
            <div className="input-wrapper">
              <MapPin size={16} className="input-icon" />
              <select 
                className="form-select"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {CIDADES_DF.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Senha de Acesso *</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input 
                type="password"
                className="form-input"
                placeholder="Mínimo de 6 dígitos"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Senha *</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-icon" />
              <input 
                type="password"
                className="form-input"
                placeholder="Repita sua senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="checkbox-row">
            <input 
              type="checkbox"
              id="lgpd"
              className="checkbox-input"
              checked={formData.lgpd}
              onChange={(e) => setFormData({ ...formData, lgpd: e.target.checked })}
            />
            <label htmlFor="lgpd">
              Concordo com a coleta e tratamento seguro de dados pelo GabinetAK HUB em conformidade com a LGPD.
            </label>
          </div>

          <button type="submit" className="btn-submit" disabled={loading || success}>
            {loading ? 'Criando Conta...' : 'Criar Conta Cidadã Gratuita'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="card-footer">
          <div>
            Já tem uma conta cidadã? <a href="/acessar" className="link-text">Fazer Login</a>
          </div>

          <div className="staff-note">
            🏛️ <strong>Atenção Funcionários do Gabinete:</strong><br />
            O acesso ao sistema interno administrativo (App) é liberado via e-mail corporativo com senha padrão. 
            <a href="/acessar" className="link-text" style={{ display: 'block', marginTop: '4px' }}>
              Acessar Login do Gabinete →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
