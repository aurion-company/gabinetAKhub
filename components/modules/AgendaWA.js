import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, MessageCircle, ChevronLeft, ChevronRight, Plus, Bell, Filter, Loader2, MoreVertical, Share2, Printer, Settings } from 'lucide-react';

export default function AgendaWA() {
  const [view, setView] = useState('list'); // Default to list so events show up properly
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Erro ao carregar eventos', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', height: '80vh', gap: '1.5rem' }}>

      {/* HEADER DA AGENDA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ background: isSidebarOpen ? 'var(--success)' : 'rgba(255,255,255,0.1)', color: isSidebarOpen ? '#000' : '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
          >
            Agendas
          </button>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon color="var(--accent)" /> Agenda & Lembretes WhatsApp
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.2rem' }}>
            <button className={`btn-tab ${view === 'day' ? 'active' : ''}`} onClick={() => setView('day')} style={tabStyle(view === 'day')}>Dia</button>
            <button className={`btn-tab ${view === '4days' ? 'active' : ''}`} onClick={() => setView('4days')} style={tabStyle(view === '4days')}>4 Dias</button>
            <button className={`btn-tab ${view === 'week' ? 'active' : ''}`} onClick={() => setView('week')} style={tabStyle(view === 'week')}>Semana</button>
            <button className={`btn-tab ${view === 'month' ? 'active' : ''}`} onClick={() => setView('month')} style={tabStyle(view === 'month')}>Mês</button>
            <button className={`btn-tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} style={tabStyle(view === 'list')}>Lista</button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', padding: '0 0.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Compartilhar"><Share2 size={18} /></button>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Imprimir"><Printer size={18} /></button>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Configurações"><Settings size={18} /></button>
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px' }} className="hover-bg-alpha">
              <MoreVertical size={20} />
            </button>
            {isMoreMenuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, width: '220px', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.5rem', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', marginTop: '0.5rem' }}>
                <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#fff', padding: '0.5rem', cursor: 'pointer', borderRadius: '4px', fontSize: '0.85rem' }} className="hover-bg-alpha">Integrar com Google</button>
                <button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }} className="hover-bg-alpha">Excluir eventos por período</button>
              </div>
            )}
          </div>

          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}>
            <Plus size={16} /> Evento
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isSidebarOpen ? '250px 1fr' : '1fr', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR ESQUERDA (Gerenciamento de Agendas) */}
        {isSidebarOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div className="section-card liquid-glass" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Minhas Agendas</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Plus size={18} /></button>
                  <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
                </div>
              </div>

            <input type="text" placeholder="Buscar Agenda..." style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> <span style={{ color: 'var(--accent)' }}>●</span> Exibir todas
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> <span style={{ color: 'var(--success)' }}>●</span> GERAL
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> <span style={{ color: 'var(--warning)' }}>●</span> Reuniões Externas
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> <span style={{ color: '#a855f7' }}>●</span> Pessoal
              </label>
            </div>

            {/* Mini Calendário */}
            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Agosto 2026</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ChevronLeft size={16} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
                  <ChevronRight size={16} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.3rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
                {Array.from({ length: 31 }).map((_, i) => (
                  <div key={i} style={{ padding: '0.3rem', borderRadius: '4px', background: i === 13 ? 'var(--accent)' : 'transparent', color: i === 13 ? '#000' : 'inherit', cursor: 'pointer' }}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        )}

        {/* ÁREA CENTRAL (Visualização da Agenda) */}
        <div className="section-card liquid-glass" style={{ padding: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}><ChevronRight size={16} /></button>
              </div>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Hoje</button>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginLeft: '1rem' }}>09 - 15 de Agosto 2026</h3>
            </div>
          </div>

          {isLoading ? (
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Loader2 className="spinner" size={32} color="var(--accent)" />
            </div>
          ) : view === 'week' ? (
            /* GRADE DO CALENDÁRIO (SEMANA) */
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Header Days */}
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}></div>
                {['DOM 09', 'SEG 10', 'TER 11', 'QUA 12', 'QUI 13', 'SEX 14', 'SÁB 15'].map((day, i) => (
                  <div key={i} style={{ padding: '1rem 0', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '600', fontSize: '0.85rem', color: i === 5 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {day}
                  </div>
                ))}

                {/* Grid Body */}
                <div style={{ gridColumn: '1 / -1', display: 'flex', height: '600px', overflowY: 'auto', position: 'relative' }}>
                  <div style={{ width: '60px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} style={{ height: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', paddingTop: '0.2rem' }}>
                        {8 + i}:00
                      </div>
                    ))}
                  </div>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', position: 'relative' }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} style={{ borderRight: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                        {Array.from({ length: 12 }).map((_, j) => (
                          <div key={j} style={{ height: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}></div>
                        ))}
                      </div>
                    ))}

                    {/* Event Blocks */}
                    <div style={{ position: 'absolute', top: '60px', left: '14.28%', width: '13%', background: 'rgba(34, 197, 94, 0.2)', borderLeft: '4px solid var(--success)', borderRadius: '4px', padding: '0.5rem', fontSize: '0.75rem' }}>
                      <strong style={{ color: '#fff', display: 'block' }}>Reunião Lideranças</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>09:00 - 11:00</span>
                    </div>

                    <div style={{ position: 'absolute', top: '360px', left: '71.4%', width: '13%', background: 'rgba(0, 240, 255, 0.2)', borderLeft: '4px solid var(--accent)', borderRadius: '4px', padding: '0.5rem', fontSize: '0.75rem' }}>
                      <strong style={{ color: '#fff', display: 'block' }}>Visita Comunidade</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>14:00 - 16:30</span>
                    </div>

                    <div style={{ position: 'absolute', top: '600px', left: '42.84%', width: '13%', background: 'rgba(255, 171, 0, 0.2)', borderLeft: '4px solid var(--warning)', borderRadius: '4px', padding: '0.5rem', fontSize: '0.75rem' }}>
                      <strong style={{ color: '#fff', display: 'block' }}>Sessão Plenária</strong>
                      <span style={{ color: 'var(--text-secondary)' }}>18:00 - 21:00</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                💡 use as setas &lt;- e -&gt; para navegar entre as datas
              </div>
            </div>
          ) : (
            /* VIEW DE LISTA (Fallback) */
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {events.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  Nenhum evento agendado.
                </div>
              ) : (
                events.map(ev => {
                  const dataInicio = new Date(ev.startDate);
                  const dataFim = new Date(ev.endDate);
                  const horarioInicio = `${dataInicio.getHours().toString().padStart(2, '0')}:${dataInicio.getMinutes().toString().padStart(2, '0')}`;
                  const horarioFim = `${dataFim.getHours().toString().padStart(2, '0')}:${dataFim.getMinutes().toString().padStart(2, '0')}`;
                  
                  return (
                    <div key={ev.id} className="event-card" style={{
                      display: 'flex', gap: '1.5rem', padding: '1.2rem',
                      background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '12px', borderLeft: `4px solid ${ev.category === 'reuniao' ? 'var(--warning)' : 'var(--accent)'}`,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      <div style={{ width: '100px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{horarioInicio}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Até {horarioFim}</span>
                      </div>

                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{ev.title}</h4>
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} /> {ev.location || 'Sem local'}</span>
                        </div>
                      </div>

                      {/* Ícones de Integração WhatsApp */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div title="Notificações Push" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '50%' }}>
                          <Bell size={18} />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

const tabStyle = (isActive) => ({
  background: isActive ? 'var(--accent)' : 'transparent',
  color: isActive ? '#000' : 'var(--text-secondary)',
  border: 'none',
  padding: '0.4rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.85rem',
  transition: 'all 0.2s'
});
