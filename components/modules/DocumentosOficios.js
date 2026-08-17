import React, { useState } from 'react';
import { FileSignature, Search, Plus, Sparkles, Filter, MoreVertical, FileText, UploadCloud, ArrowLeft, Save, X } from 'lucide-react';

export default function DocumentosOficios() {
  const [view, setView] = useState('list'); // 'list' ou 'create'
  const [searchTerm, setSearchTerm] = useState('');

  // Dados Mockados para a Listagem de Ofícios
  const [oficios] = useState([
    { id: 1, numero: 'OF-0142/2026', data: '14/08/2026', assunto: 'Solicitação de Recapeamento Asfáltico', destinatario: 'Secretaria de Obras', status: 'Enviado' },
    { id: 2, numero: 'OF-0141/2026', data: '12/08/2026', assunto: 'Requerimento de Informações Básicas', destinatario: 'Prefeitura Municipal', status: 'Aguardando' },
    { id: 3, numero: 'OF-0140/2026', data: '10/08/2026', assunto: 'Indicação para Poda de Árvores', destinatario: 'Secretaria de Meio Ambiente', status: 'Respondido' },
    { id: 4, numero: 'OF-0139/2026', data: '05/08/2026', assunto: 'Apoio a Projeto Cultural', destinatario: 'Fundação de Cultura', status: 'Enviado' },
  ]);

  if (view === 'create') {
    return (
      <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '80vh' }}>
        
        {/* HEADER DE CRIAÇÃO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setView('list')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={20} />
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileSignature color="var(--accent)" /> Redigir Novo Ofício
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary outline" onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
              <X size={16} /> Cancelar
            </button>
            <button className="btn-primary" onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem' }}>
              <Save size={16} /> Criar Ofício
            </button>
          </div>
        </div>

        {/* ÁREA DE FORMULÁRIO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', flex: 1 }}>
          
          {/* Lado Esquerdo: Identificação e Redação */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Tratamento *</label>
                <input type="text" placeholder="Ex: Ao Ilmo. Sr." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Nome do Destinatário *</label>
                <input type="text" placeholder="Ex: João da Silva" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Local Destino / Título da Pessoa</label>
                <input type="text" placeholder="Ex: Secretaria de Obras" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Assunto *</label>
                <input type="text" placeholder="Ex: Solicitação de Manutenção" style={inputStyle} />
              </div>
            </div>

            {/* MOCKUP DO RICH TEXT EDITOR */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>B</span>
                <span style={{ fontStyle: 'italic', cursor: 'pointer' }}>I</span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>U</span>
                <span style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></span>
                <span style={{ cursor: 'pointer' }}>Listas</span>
                <span style={{ cursor: 'pointer' }}>Tabelas</span>
              </div>
              <textarea 
                placeholder="Escreva o conteúdo do ofício aqui..." 
                style={{ flex: 1, padding: '1rem', background: 'transparent', border: 'none', color: '#fff', resize: 'none', minHeight: '300px', fontSize: '0.9rem', lineHeight: '1.6' }}
              />
            </div>

            {/* ÁREA DE ANEXOS */}
            <div style={{ border: '1px dashed var(--border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s', marginTop: '1rem' }}>
              <UploadCloud size={32} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>Arraste e solte arquivos aqui</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ou clique para selecionar (Máximo 2MB)</div>
            </div>
          </div>

          {/* Lado Direito: Informações e Configurações */}
          <div className="section-card liquid-glass" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
              Informações do Ofício
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={labelStyle}>Data de Emissão</label>
                <input type="date" style={inputStyle} defaultValue="2026-08-14" />
              </div>
              
              <div>
                <label style={labelStyle}>Prioridade</label>
                <select style={inputStyle}>
                  <option>Normal</option>
                  <option>Urgente</option>
                  <option>Alta Prioridade</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Template Base</label>
                <select style={inputStyle}>
                  <option>Nenhum (Em branco)</option>
                  <option>Template Padrão da Câmara</option>
                  <option>Pedido de Informação</option>
                </select>
              </div>

              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0, 240, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--accent)', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <Sparkles size={16} /> Rascunho com IA
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                  Descreva brevemente o que você precisa e nossa IA preencherá o conteúdo no tom oficial do mandato.
                </p>
                <button className="btn-primary outline" style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}>Gerar Texto</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      
      {/* HEADER DA LISTAGEM */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileSignature color="var(--accent)" /> Gestão de Ofícios
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} /> Assistente IA
          </button>
          <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Plus size={16} /> Novo Ofício
          </button>
        </div>
      </div>

      {/* BARRA DE PESQUISA E FILTROS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="input-group" style={{ flex: 1, margin: 0, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Pesquisar por número, assunto ou destinatário..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.8rem' }}
          />
        </div>
        <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: '#fff', padding: '0 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Filter size={16} /> Filtrar
        </button>
      </div>

      {/* TABELA DE OFÍCIOS */}
      <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Número</th>
              <th style={{ padding: '1rem' }}>Data</th>
              <th style={{ padding: '1rem' }}>Assunto</th>
              <th style={{ padding: '1rem' }}>Destinatário</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {oficios.filter(o => o.assunto.toLowerCase().includes(searchTerm.toLowerCase()) || o.numero.toLowerCase().includes(searchTerm.toLowerCase())).map((oficio) => (
              <tr key={oficio.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{oficio.numero}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{oficio.data}</td>
                <td style={{ padding: '1rem', fontWeight: '600' }}>{oficio.assunto}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{oficio.destinatario}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700',
                    background: oficio.status === 'Enviado' ? 'rgba(0, 230, 118, 0.1)' : oficio.status === 'Respondido' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 215, 0, 0.1)',
                    color: oficio.status === 'Enviado' ? 'var(--success)' : oficio.status === 'Respondido' ? 'var(--accent)' : 'var(--warning)',
                    border: `1px solid ${oficio.status === 'Enviado' ? 'rgba(0,230,118,0.3)' : oficio.status === 'Respondido' ? 'rgba(0,240,255,0.3)' : 'rgba(255,215,0,0.3)'}`
                  }}>
                    {oficio.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}>
                    <FileText size={18} />
                  </button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem', marginLeft: '0.5rem' }}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Paginação Mockada */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', padding: '0 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <span>Exibindo 1-4 de 42 ofícios</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Anterior</button>
          <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Próxima</button>
        </div>
      </div>

    </div>
  );
}

// Estilos Reutilizáveis do Formulário
const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.9rem'
};
