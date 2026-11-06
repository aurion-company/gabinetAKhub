'use client';
import { useRouter } from 'next/navigation';

export default function FooterSection() {
  const router = useRouter();
  const legalLinks = [
    { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    { label: 'Termos de Uso', href: '/termos-de-uso' },
    { label: 'Uso das APIs Google', href: '/uso-apis-google' },
    { label: 'LGPD', href: '/lgpd' },
  ];
  const platformLinks = ['Funcionalidades','Planos','Cases','Blog','Cursos'];
  const supportLinks = ['Base de Conhecimento','Conexão API WhatsApp','Integração Google Agenda','Importar Cadastros'];

  return (
    <>
      {/* CTA Banner */}
      <section style={{ padding: '5rem 5%', textAlign: 'center', background: 'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(6,182,212,0.08))' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3.5rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem' }}>
          Pronto para transformar seu{' '}
          <span style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>mandato</span>?
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>Gestão política inteligente com IA, geomapeamento e automação integrados.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/acessar')} style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}>
            Começar Gratuitamente
          </button>
          <a href="https://wa.me/556232510558" target="_blank" rel="nãoreferrer" style={{ padding: '1rem 2.5rem', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            💬 Falar não WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 5% 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <img src="/logo/horizontal.svg" alt="GabinetAK HUB" style={{ height: 32, objectFit: 'contain', marginBottom: '1rem' }} />
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 260 }}>A plataforma completa para gestão de gabinetes, campanhas eleitorais e arrecadação.</p>
            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
              <div>📍 Rua 72, nº 223 · Sala 1507</div>
              <div>Jardim Goiás, Goiânia-GO</div>
              <div style={{ marginTop: '0.5rem' }}>📞 (62) 3251-0558</div>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plataforma</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {platformLinks.map(i => <a key={i} href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem' }}>{i}</a>)}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Suporte</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {supportLinks.map(i => <a key={i} href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.85rem' }}>{i}</a>)}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#e2e8f0', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {legalLinks.map(l => (
                <button key={l.label} onClick={() => router.push(l.href)} style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}>{l.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#475569' }}>© 2026 GabinetAK HUB. Todos os direitos reservados.</span>
          <span style={{ fontSize: '0.8rem', color: '#475569' }}>Gestão política inteligente há mais de uma década 🇧🇷</span>
        </div>
      </footer>
    </>
  );
}
