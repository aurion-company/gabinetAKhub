'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, FileText, Loader2 } from 'lucide-react';

export default function LogsAuditoria() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuditLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      }
    } catch (error) {
      console.error('Erro ao carregar logs de auditoria:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return (
    <div className="section-card liquid-glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck color="var(--accent)" /> Trilha de Auditoria (Logs do Gabinete)
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Search size={16} /> Pesquisar
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <FileText size={16} /> Exportar Relatório
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {isLoading ? (
          <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Loader2 className="spinner" size={32} color="var(--accent)" />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>Data / Hora</th>
                <th style={{ padding: '1rem' }}>Operador</th>
                <th style={{ padding: '1rem' }}>Ação</th>
                <th style={{ padding: '1rem' }}>Recurso</th>
                <th style={{ padding: '1rem' }}>Autenticação / IP</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhum log encontrado.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{new Date(log.timestamp).toLocaleString()}</td>
                    <td style={{ padding: '1rem', fontWeight: '600' }}>{log.userId || 'Sistema'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: `rgba(0, 0, 0, 0.3)`, border: `1px solid var(--accent)`, color: 'var(--accent)', fontSize: '0.75rem', fontWeight: '700' }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{log.resource || log.tableName}</td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.ipAddress || 'IP Interno'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
