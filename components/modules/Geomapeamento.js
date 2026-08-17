import React, { useState } from 'react';
import { Map as MapIcon, Sparkles, RefreshCw, Filter, Maximize2, MapPin, Users, Star, Phone, Mail, Navigation } from 'lucide-react';

export default function Geomapeamento() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activePin, setActivePin] = useState(null);

  // Mock data para simular pinos e clusters
  const clusters = [
    { id: 'c1', x: '30%', y: '40%', count: 7048, color: 'var(--danger)', size: 80 },
    { id: 'c2', x: '60%', y: '35%', count: 437, color: 'var(--warning)', size: 60 },
    { id: 'c3', x: '45%', y: '65%', count: 80, color: 'var(--success)', size: 45 },
  ];

  const pins = [
    { id: 'p1', x: '55%', y: '50%', name: 'Safira Gomes de Moura', address: 'Brasília - Asa Sul', phone: '(61) 99999-1111', email: 'safira@email.com', group: 'Lideranças', influence: 24 },
    { id: 'p2', x: '52%', y: '55%', name: 'Carlos Andrade', address: 'Brasília - Centro', phone: '(61) 98888-2222', email: 'carlos@email.com', group: 'Apoiadores', influence: 5 },
  ];

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowUpdateModal(false);
    }, 2000);
  };

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', height: '85vh', padding: 0, overflow: 'hidden' }}>
      
      {/* HEADER DA TELA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <MapIcon color="var(--accent)" /> Geomapeamento
          </h2>
          
          {/* LEGENDA */}
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={12} color="var(--warning)" /> Indicações</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={12} color="var(--accent)" /> Cadastros</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={12} color="var(--success)" /> Grupos</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} /> Assistente IA
          </button>
          <button className="btn-primary" onClick={() => setShowUpdateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <RefreshCw size={16} className={isUpdating ? 'spin' : ''} /> Atualizar Mapa
          </button>
        </div>
      </div>

      {/* ÁREA DO MAPA (Simulação Visual) */}
      <div style={{ flex: 1, position: 'relative', background: 'radial-gradient(circle at center, #1a1f35 0%, #0a0c10 100%)', overflow: 'hidden' }}>
        
        {/* Grid de fundo para simular mapa */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* CONTROLES FLUTUANTES DO MAPA */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button style={mapBtnStyle} title="Filtros">
            <Filter size={18} />
          </button>
        </div>
        
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button style={mapBtnStyle} title="Tela Cheia">
            <Maximize2 size={18} />
          </button>
          <button style={mapBtnStyle} title="Navegação Livre">
            <Navigation size={18} />
          </button>
        </div>

        {/* CLUSTERS MOCKADOS */}
        {clusters.map((c) => (
          <div key={c.id} style={{ 
            position: 'absolute', left: c.x, top: c.y, transform: 'translate(-50%, -50%)',
            width: c.size, height: c.size, background: `radial-gradient(circle at center, ${c.color} 0%, rgba(0,0,0,0.8) 100%)`,
            border: `2px solid ${c.color}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px ${c.color}40`, color: '#fff', fontWeight: '800', fontSize: c.size > 50 ? '1.2rem' : '0.9rem', cursor: 'pointer',
            transition: 'transform 0.2s', zIndex: 10
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}>
            {c.count}
          </div>
        ))}

        {/* PINOS INDIVIDUAIS MOCKADOS */}
        {pins.map((p) => (
          <div key={p.id} onClick={() => setActivePin(p.id === activePin ? null : p.id)} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -100%)', cursor: 'pointer', zIndex: activePin === p.id ? 50 : 20 }}>
            {/* Pino Customizado */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', filter: activePin === p.id ? 'drop-shadow(0 0 10px var(--accent))' : 'none', transition: 'all 0.2s' }}>
              <div style={{ background: 'var(--accent)', borderRadius: '50% 50% 50% 0', width: '30px', height: '30px', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                <span style={{ transform: 'rotate(45deg)', color: '#000', fontWeight: 'bold', fontSize: '12px' }}>e</span>
              </div>
              <div style={{ width: '6px', height: '6px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', marginTop: '2px' }}></div>
            </div>

            {/* POPUP DE CONTATO (Card Flutuante) */}
            {activePin === p.id && (
              <div className="liquid-glass" style={{ position: 'absolute', bottom: '45px', left: '50%', transform: 'translateX(-50%)', width: '280px', padding: '1rem', border: '1px solid var(--accent)', borderRadius: '12px', zIndex: 100, cursor: 'default' }} onClick={(e) => e.stopPropagation()}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#fff', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={12} /> {p.address}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} color="var(--success)" /> {p.phone}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} color="var(--accent)" /> {p.email}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={14} color="var(--warning)" /> {p.group}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '6px', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={12} color="var(--warning)" /> Influência</span>
                    <span style={{ fontWeight: 'bold' }}>{p.influence} indicações</span>
                  </div>
                  <div className="fund-progress-bar" style={{ height: '4px' }}>
                    <div className="fund-progress-fill" style={{ width: '60%', background: 'var(--warning)', boxShadow: 'none' }}></div>
                  </div>
                </div>

                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>
                  Arraste o marcador no mapa para corrigir a posição
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL DE ATUALIZAÇÃO */}
      {showUpdateModal && (
        <div className="upgrade-overlay" style={{ zIndex: 1000 }}>
          <div className="upgrade-box liquid-glass" style={{ border: '1px solid var(--accent)', maxWidth: '400px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
            <h2 style={{ fontSize: '1.2rem' }}>Atualização Geográfica</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Identificamos <strong>2.216 cadastros</strong> sem coordenadas. O sistema buscará os locais exatos no Google Geocoding em segundo plano.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button onClick={handleUpdate} className="btn-primary" disabled={isUpdating}>
                {isUpdating ? 'Processando...' : 'Iniciar Sincronização'}
              </button>
              <button onClick={() => setShowUpdateModal(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} disabled={isUpdating}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ESTILOS CSS INLINE PARA ANIMAÇÃO SPIN */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

const mapBtnStyle = {
  background: 'rgba(0,0,0,0.6)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  padding: '0.6rem',
  borderRadius: '8px',
  cursor: 'pointer',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s'
};
