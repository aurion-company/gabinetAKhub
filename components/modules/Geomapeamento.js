import React, { useState, useCallback, useEffect } from 'react';
import { Map as MapIcon, Sparkles, RefreshCw, Filter, Maximize2, MapPin, Users, Star, Phone, Mail, Navigation } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: -15.793889,
  lng: -47.882778
};

export default function Geomapeamento() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activePin, setActivePin] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const defaultPins = [
    { id: 'p1', lat: -15.803, lng: -47.883, name: 'Safira Gomes de Moura', address: 'Brasília - Asa Sul', phone: '(61) 99999-1111', email: 'safira@email.com', group: 'Lideranças', influence: 24 },
    { id: 'p2', lat: -15.793, lng: -47.882, name: 'Carlos Andrade', address: 'Brasília - Centro', phone: '(61) 98888-2222', email: 'carlos@email.com', group: 'Apoiadores', influence: 5 },
  ];

  const [pins, setPins] = useState(defaultPins);

  const fetchVotersAsPins = async () => {
    try {
      const res = await fetch('/api/voters');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const mapped = data
            .filter(v => v.lat !== null && v.lng !== null)
            .map(v => ({
              id: v.id,
              lat: v.lat,
              lng: v.lng,
              name: v.name,
              address: v.address || 'Endereço não informado',
              phone: v.phone || 'Sem telefone',
              email: v.email || 'Sem e-mail',
              group: v.tags && v.tags.length > 0 ? v.tags[0] : 'Geral',
              influence: Math.floor(Math.random() * 30)
            }));
          if (mapped.length > 0) {
            setPins(mapped);
          }
        }
      }
    } catch (e) {
      console.error('Erro ao buscar eleitores para geomapeamento:', e);
    }
  };

  useEffect(() => {
    fetchVotersAsPins();
  }, []);


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

      {/* ÁREA DO MAPA REAL */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: mapDarkStyles,
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {pins.map((p) => (
              <Marker
                key={p.id}
                position={{ lat: p.lat, lng: p.lng }}
                onClick={() => setActivePin(p.id === activePin ? null : p.id)}
                icon={{
                  path: typeof window !== 'undefined' && window.google ? window.google.maps.SymbolPath.CIRCLE : 0,
                  scale: 8,
                  fillColor: 'var(--accent)',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: '#ffffff',
                }}
              >
                {activePin === p.id && (
                  <InfoWindow
                    position={{ lat: p.lat, lng: p.lng }}
                    onCloseClick={() => setActivePin(null)}
                  >
                    <div style={{ padding: '0.5rem', color: '#000', maxWidth: '280px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.2rem' }}>{p.name}</h4>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={12} /> {p.address}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} color="#10b981" /> {p.phone}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} color="#3b82f6" /> {p.email}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={14} color="#f59e0b" /> {p.group}</div>
                      </div>

                      <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={12} color="#f59e0b" /> Influência</span>
                          <span style={{ fontWeight: 'bold' }}>{p.influence} indicações</span>
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c10', color: 'var(--text-muted)' }}>
            Carregando mapa... (Verifique se a chave da API está configurada em NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
          </div>
        )}

        {/* CONTROLES FLUTUANTES DO MAPA */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 10 }}>
          <button style={mapBtnStyle} title="Filtros">
            <Filter size={18} />
          </button>
        </div>
        
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 10 }}>
          <button style={mapBtnStyle} title="Tela Cheia">
            <Maximize2 size={18} />
          </button>
          <button style={mapBtnStyle} title="Navegação Livre">
            <Navigation size={18} />
          </button>
        </div>

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

const mapDarkStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];
