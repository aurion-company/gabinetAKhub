import React, { useState } from 'react';
import { Mails, Printer, Filter, Users, LayoutTemplate, Plus, Search, CheckSquare, Settings, Download } from 'lucide-react';

export default function GeradorEtiquetas() {
  const [etiquetas] = useState([
    { id: 1, nome: 'Marcos Silva', endereco: 'Rua das Flores, 123 - Centro', cep: '70000-000', cidade: 'Brasília/DF' },
    { id: 2, nome: 'Ana Paula Rocha', endereco: 'Av. Paulista, 1500 - Bela Vista', cep: '01310-100', cidade: 'São Paulo/SP' },
    { id: 3, nome: 'Carlos Eduardo', endereco: 'Rua 7 de Setembro, 45 - Bairro Novo', cep: '30000-000', cidade: 'Belo Horizonte/MG' },
    { id: 4, nome: 'Fernanda Lima', endereco: 'Quadra 204 Sul, Lote 15', cep: '77000-000', cidade: 'Palmas/TO' },
    { id: 5, nome: 'João Pedro', endereco: 'Av. Brasil, 5000', cep: '20000-000', cidade: 'Rio de Janeiro/RJ' },
    { id: 6, nome: 'Associação de Moradores', endereco: 'Rua Principal, S/N', cep: '70000-111', cidade: 'Brasília/DF' },
  ]);

  const [formato, setFormato] = useState('pimaco_6280'); // pimaco_6280, avery_5160
  
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1.5rem' }}>
      
      {/* HEADER GERAL */}
      <div className="section-card liquid-glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Mails color="var(--accent)" /> Mala Direta e Etiquetas
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Exportar Excel
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Printer size={16} /> Imprimir Etiquetas
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
        
        {/* BARRA LATERAL - FILTROS E CONFIGURAÇÃO */}
        <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
          
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} /> Filtrar Destinatários
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Segmento / Tag</label>
                <select style={inputStyle}>
                  <option>Todos os Contatos</option>
                  <option>Aniversariantes do Mês</option>
                  <option>Lideranças de Bairro</option>
                  <option>Apoiadores Ouro</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Cidade / Região</label>
                <select style={inputStyle}>
                  <option>Todas as Cidades</option>
                  <option>Brasília</option>
                  <option>São Paulo</option>
                </select>
              </div>
              <button className="btn-primary outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)' }}>Aplicar Filtros</button>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LayoutTemplate size={18} /> Formato da Folha
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <label style={radioContainerStyle(formato === 'pimaco_6280')}>
                <input type="radio" name="formato" checked={formato === 'pimaco_6280'} onChange={() => setFormato('pimaco_6280')} style={{ display: 'none' }} />
                <div>
                  <strong style={{ display: 'block', color: '#fff' }}>Pimaco 6280 (A4)</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>3 colunas x 10 linhas (30/folha)</span>
                </div>
                {formato === 'pimaco_6280' && <CheckSquare size={18} color="var(--accent)" />}
              </label>
              
              <label style={radioContainerStyle(formato === 'pimaco_6081')}>
                <input type="radio" name="formato" checked={formato === 'pimaco_6081'} onChange={() => setFormato('pimaco_6081')} style={{ display: 'none' }} />
                <div>
                  <strong style={{ display: 'block', color: '#fff' }}>Pimaco 6081 (A4)</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2 colunas x 10 linhas (20/folha)</span>
                </div>
                {formato === 'pimaco_6081' && <CheckSquare size={18} color="var(--accent)" />}
              </label>

              <label style={radioContainerStyle(formato === 'carta_personal')}>
                <input type="radio" name="formato" checked={formato === 'carta_personal'} onChange={() => setFormato('carta_personal')} style={{ display: 'none' }} />
                <div>
                  <strong style={{ display: 'block', color: '#fff' }}>Carta Personalizada</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1 destinatário por página (A4)</span>
                </div>
                {formato === 'carta_personal' && <CheckSquare size={18} color="var(--accent)" />}
              </label>
            </div>
          </div>

          <div style={{ marginTop: 'auto', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid var(--accent)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>Total Selecionado:</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent)' }}>348</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Destinatários prontos para impressão. (Aprox. 12 folhas)</div>
          </div>

        </div>

        {/* ÁREA DE VISUALIZAÇÃO / PREVIEW */}
        <div className="section-card liquid-glass" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
              <Search size={16} /> Preview da Folha (Página 1)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Margens ajustadas automaticamente.</span>
            </div>
          </div>
          
          <div style={{ flex: 1, padding: '2rem', background: '#cbd5e1', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
            
            {/* MOCK DE UMA FOLHA A4 COM ETIQUETAS */}
            <div style={{ 
              width: '210mm', minHeight: '297mm', background: '#fff', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: '10mm',
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2mm', gridAutoRows: '25.4mm'
            }}>
              {/* Renderizando etiquetas fictícias baseadas no Array */}
              {Array.from({ length: 30 }).map((_, i) => {
                const dest = etiquetas[i % etiquetas.length];
                return (
                  <div key={i} style={{ border: '1px dashed #e2e8f0', padding: '4mm', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{ fontSize: '9pt', fontWeight: 'bold', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dest.nome}</div>
                    <div style={{ fontSize: '7.5pt', color: '#333', marginTop: '1mm', lineHeight: '1.2' }}>{dest.endereco}</div>
                    <div style={{ fontSize: '7.5pt', color: '#333', fontWeight: 'bold' }}>{dest.cep} - {dest.cidade}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem'
};

const radioContainerStyle = (isActive) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  border: isActive ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
  background: isActive ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0,0,0,0.2)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s'
});
