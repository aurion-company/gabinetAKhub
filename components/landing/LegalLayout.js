'use client';
import { useRouter } from 'next/navigation';

export default function LegalLayout({ title, updated, children }) {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: '#070b14', color: '#fff', fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', background: 'rgba(7,11,20,0.9)', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src="/logo/horizontal.svg" alt="Elegiv Gestão 360" style={{ height: 32, objectFit: 'contain' }} />
        </button>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => router.back()} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>← Voltar</button>
          <button onClick={() => router.push('/acessar')} style={{ padding: '0.5rem 1.2rem', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Acessar</button>
        </div>
      </nav>

      {/* HERO DA PÁGINA LEGAL */}
      <div style={{ padding: '4rem 5% 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg,rgba(59,130,246,0.05) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600, marginBottom: '1rem' }}>📄 DOCUMENTO LEGAL</div>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '0.5rem' }}>{title}</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{updated}</p>
        </div>
      </div>

      {/* CONTEÚDO LEGAL */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 5% 6rem' }}>
        <style>{`
          h2 { font-size: 1.3rem; font-weight: 700; color: #e2e8f0; margin: 2.5rem 0 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; }
          h3 { font-size: 1rem; font-weight: 600; color: #94a3b8; margin: 1.5rem 0 0.5rem; }
          p { color: #94a3b8; line-height: 1.8; margin-bottom: 1rem; font-size: 0.95rem; }
          ul { color: #94a3b8; line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem; }
          li { margin-bottom: 0.4rem; font-size: 0.95rem; }
          code { background: rgba(59,130,246,0.1); color: #60a5fa; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.85rem; }
          table { border-collapse: collapse; width: 100%; }
          th, td { padding: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.9rem; }
          strong { color: #e2e8f0; }
          section { margin-bottom: 1rem; }
        `}</style>
        {children}
      </div>

      {/* FOOTER SIMPLIFICADO */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <img src="/logo/horizontal.svg" alt="Elegiv Gestão 360" style={{ height: 24, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[['Política de Privacidade','/politica-de-privacidade'],['Termos de Uso','/termos-de-uso'],['APIs Google','/uso-apis-google'],['LGPD','/lgpd']].map(([l,h]) => (
            <button key={l} onClick={() => router.push(h)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer' }}>{l}</button>
          ))}
        </div>
        <span style={{ fontSize: '0.8rem', color: '#475569' }}>© 2026 Elegiv Gestão 360</span>
      </footer>
    </div>
  );
}
