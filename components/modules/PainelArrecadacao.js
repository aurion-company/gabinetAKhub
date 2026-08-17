'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Banknote, QrCode, Share2, Activity, Loader2 } from 'lucide-react';

export default function PainelArrecadacao() {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/donations');
      if (res.ok) {
        const data = await res.json();
        setDonations(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const totalRaised = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const goal = 500000;
  const progressPercent = Math.min((totalRaised / goal) * 100, 100).toFixed(1);
  const ticketMedio = donations.length > 0 ? (totalRaised / donations.length) : 0;

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="section-card liquid-glass" style={{ background: 'transparent', border: 'none', padding: 0 }}>
      
      <div className="fund-goal-container liquid-glass">
        <div className="fund-goal-glow"></div>
        <div className="fund-goal-header">
          <div>
            <div className="fund-goal-title">Progresso da Campanha (PIX)</div>
            <div className="fund-goal-value">{formatCurrency(totalRaised)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="fund-goal-target">Meta: {formatCurrency(goal)}</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>{progressPercent}%</div>
          </div>
        </div>
        <div className="fund-progress-bar">
          <div className="fund-progress-fill" style={{ width: `${progressPercent}%` }}>
            <div className="fund-progress-glow"></div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>R$ 0</span>
          <span>R$ {(goal / 2).toLocaleString('pt-BR')}</span>
          <span>R$ {goal.toLocaleString('pt-BR')}</span>
        </div>
      </div>

      <div className="fund-stats-grid">
        <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Users size={18} /> <span style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total de Doadores</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff' }}>{donations.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><TrendingUp size={12} /> Campanha Ativa</div>
        </div>

        <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Banknote size={18} /> <span style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Ticket Médio</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff' }}>{formatCurrency(ticketMedio)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Média por CPF</div>
        </div>

        <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <QrCode size={20} /> Gerar QR Code PIX
          </button>
          <button style={{ width: '100%', padding: '1rem', fontSize: '1rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <Share2 size={20} /> Link de Doação
          </button>
        </div>
      </div>

      <div className="section-card liquid-glass">
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="var(--accent)" /> Feed de Doações (Tempo Real)
        </h3>
        
        {isLoading ? (
          <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Loader2 className="spinner" size={32} color="var(--accent)" />
          </div>
        ) : (
          <div className="donation-feed">
            {donations.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>Nenhuma doação registrada ainda.</p>
            ) : (
              donations.map((d) => (
                <div key={d.id} className="donation-item">
                  <div className="donation-user">
                    <div className="donor-avatar">{d.donorName ? d.donorName.charAt(0).toUpperCase() : '?'}</div>
                    <div>
                      <div className="donor-info-name">{d.donorName}</div>
                      <div className="donor-info-meta">
                        <span>CPF: {d.donorCpf}</span> • <span>{new Date(d.createdAt).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {d.amount >= 1000 && <span className="donation-badge">Alto Valor</span>}
                    <div className="donation-value">+{formatCurrency(d.amount)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}
