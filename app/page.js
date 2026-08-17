'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PlansSection from '../components/landing/PlansSection';
import CasesSection from '../components/landing/CasesSection';
import FooterSection from '../components/landing/FooterSection';

export default function LandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#070b14', color: '#fff', fontFamily: '"Inter", sans-serif', overflowX: 'hidden', width: '100%' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: `
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        @media (max-width: 768px) {
          .nav-links a { display: none; }
        }
      `}} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', backdropFilter: 'blur(20px)', background: 'rgba(7,11,20,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo/horizontal.svg" alt="Elegiv Gestão 360" style={{ height: 36, objectFit: 'contain' }} />
        </div>
        <div className="nav-links">
          {['Funcionalidades','Planos','Cases','Contato'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: '0.2s' }}>{item}</a>
          ))}
          <button onClick={() => router.push('/acessar')} style={{ padding: '0.55rem 1.4rem', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>Acessar</button>
        </div>
      </nav>

      <div style={{ paddingTop: '80px' }}>
        <HeroSection onCTA={() => router.push('/acessar')} />
        <FeaturesSection />
        <PlansSection onCTA={() => router.push('/acessar')} />
        <CasesSection />
        <FooterSection />
      </div>
    </div>
  );
}
