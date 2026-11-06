import React, { useState, useEffect } from 'react';
import { 
  Inbox, Plus, Search, Filter, MessageCircle, FileText, ChevronDown, CheckCircle2, 
  AlertCircle, Clock, Send, Printer, User, HelpCircle, Phone, ArrowLeft, Loader2
} from 'lucide-react';

export default function AtendimentoProtocolo() {
  const [view, setView] = useState('list'); // 'list' | 'create'
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [atendimentos, setAtendimentos] = useState([]);
  const [voters, setVoters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [voterSearchText, setVoterSearchText] = useState('');
  const [showVoterDropdown, setShowVoterDropdown] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Saúde',
    channel: 'Presencial',
    priority: 'MEDIA',
    status: 'ABERTO'
  });

  const channels = ['Presencial', 'WhatsApp', 'Telefonema', 'Redes Sociais', 'E-mail'];
  const categories = ['Saúde', 'Obras / Infraestrutura', 'Segurança', 'Educação', 'Social / Cidadania', 'Outros'];

  // Fetch Atendimentos (Demands in the DB) and Voters
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch demands/protocols
      const demandsRes = await fetch('/api/demands');
      const votersRes = await fetch('/api/voters');
      
      if (demandsRes.ok) {
        const demandsData = await demandsRes.json();
        setAtendimentos(demandsData);
      }
      
      if (votersRes.ok) {
        const votersData = await votersRes.json();
        setVoters(votersData);
      }
    } catch (e) {
      console.error('Erro ao buscar dados de atendimento:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Por favor, informe o assunto do atendimento!');
    
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: `[Canal: ${formData.channel}] ${formData.description}`,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        voterId: selectedVoter ? selectedVoter.id : null
      };

      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'Saúde',
          channel: 'Presencial',
          priority: 'MEDIA',
          status: 'ABERTO'
        });
        setSelectedVoter(null);
        setVoterSearchText('');
        setView('list');
        fetchData();
      } else {
        alert('Erro ao registrar protocolo de atendimento.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Falha na conexão com o servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  const getVoterName = (voterId) => {
    const voter = voters.find(v => v.id === voterId);
    return voter ? voter.name : 'Cidadão Não Identificado';
  };

  const getVoterPhone = (voterId) => {
    const voter = voters.find(v => v.id === voterId);
    return voter ? voter.phone : '';
  };

  // Filtered Voters for Autocomplete
  const filteredVoters = voters.filter(v => 
    v.name.toLowerCase().includes(voterSearchText.toLowerCase())
  );

  // Stats
  const stats = {
    total: atendimentos.length,
    abertos: atendimentos.filter(a => a.status === 'ABERTO').length,
    emAndamento: atendimentos.filter(a => a.status === 'EM_ANDAMENTO').length,
    concluidos: atendimentos.filter(a => a.status === 'CONCLUIDO').length
  };

  // Filtered List
  const filteredAtendimentos = atendimentos.filter(a => {
    const citizenName = getVoterName(a.voterId).toLowerCase();
    const matchesSearch = 
      a.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizenName.includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sendWhatsAppReceipt = (a) => {
    const name = getVoterName(a.voterId);
    const phone = getVoterPhone(a.voterId);
    if (!phone) return alert('Cidadão não possui telefone cadastrado.');
    
    const message = `Olá, ${name}! Seu atendimento foi registrado não Gabinete. Protocolo: *${a.protocol}*. Assunto: ${a.title}. Status atual: ${a.status}.`;
    const cleanPhone = phone.replace(/\D/g, '');
    const url = `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh', color: 'var(--accent)' }}>
        <Loader2 size={32} className="animate-spin" />
        <span style={{ marginLeft: '1rem' }}>Carregando atendimentos e protocolos...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', gap: '1.5rem' }}>
      
      {/* HEADER DE MÓDULO */}
      <div className="section-card liquid-glass" style={{ padding: '1.2rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Inbox color="var(--accent)" /> Central de Atendimento & Protocolos
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Registre as solicitações dos cidadãos, emita protocolos e acompanhe o andamento das demandas.
          </p>
        </div>
        <div>
          {view === 'list' ? (
            <button className="btn-primary" onClick={() => setView('create')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Novo Atendimento (Protocolo)
            </button>
          ) : (
            <button className="btn-primary outline" onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Voltar à Listagem
            </button>
          )}
        </div>
      </div>

      {view === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* KPI CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--accent)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Atendimentos Registrados</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stats.total}</div>
            </div>
            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--danger)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Aguardando Triagem</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stats.abertos}</div>
            </div>
            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--warning)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Em Tramitação</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stats.emAndamento}</div>
            </div>
            <div className="section-card liquid-glass" style={{ padding: '1.2rem', borderLeft: '4px solid var(--success)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Finalizados / Concluídos</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>{stats.concluidos}</div>
            </div>
          </div>

          {/* LIST OF RECENT PROTOCOLS */}
          <div className="section-card liquid-glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Últimos Protocolos Emitidos</h3>
              <div style={{ display: 'flex', gap: '1rem', width: '350px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Filtrar por protocolo ou cidadão..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '2.5rem', borderRadius: '20px' }} 
                  />
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Protocolo</th>
                    <th style={{ padding: '1rem' }}>Cidadão / Eleitor</th>
                    <th style={{ padding: '1rem' }}>Assunto / Demanda</th>
                    <th style={{ padding: '1rem' }}>Data Registro</th>
                    <th style={{ padding: '1rem' }}>Prioridade</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAtendimentos.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Nenhum atendimento ou protocolo encontrado.
                      </td>
                    </tr>
                  ) : (
                    filteredAtendimentos.map((a) => (
                      <tr key={a.id} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.85rem' }}>
                        <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent)' }}>
                          {a.protocol}
                        </td>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>
                          {getVoterName(a.voterId)}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '600', color: '#fff' }}>{a.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                            {a.description}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                          {new Date(a.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.7rem', 
                            fontWeight: '700',
                            background: a.priority === 'URGENTE' ? 'rgba(239, 68, 68, 0.15)' : a.priority === 'ALTA' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.05)',
                            color: a.priority === 'URGENTE' ? 'var(--danger)' : a.priority === 'ALTA' ? 'var(--warning)' : 'var(--text-secondary)',
                            border: `1px solid ${a.priority === 'URGENTE' ? 'var(--danger)' : a.priority === 'ALTA' ? 'var(--warning)' : 'rgba(255,255,255,0.1)'}`
                          }}>
                            {a.priority}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.7rem', 
                            fontWeight: '700',
                            background: a.status === 'CONCLUIDO' ? 'rgba(16, 185, 129, 0.15)' : a.status === 'EM_ANDAMENTO' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                            color: a.status === 'CONCLUIDO' ? 'var(--success)' : a.status === 'EM_ANDAMENTO' ? '#3b82f6' : 'var(--warning)'
                          }}>
                            {a.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => sendWhatsAppReceipt(a)}
                            className="btn-primary" 
                            style={{ padding: '0.4rem', background: 'rgba(0,230,118,0.15)', color: 'var(--success)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            title="Enviar Comprovante via WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </button>
                          <button 
                            onClick={() => alert(`Comprovante de Protocolo ${a.protocol} enviado para fila de impressão.`)}
                            className="btn-primary outline" 
                            style={{ padding: '0.4rem', borderColor: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}
                            title="Imprimir Protocolo"
                          >
                            <Printer size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      ) : (
        /* CREATE PROTOCOL FORM */
        <form onSubmit={handleRegister} className="section-card liquid-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
            Emitir Novo Protocolo de Atendimento
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            {/* Citizen Autocomplete Picker */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Cidadão / Solicitante *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Pesquisar eleitor cadastrado..." 
                  value={voterSearchText}
                  onChange={(e) => {
                    setVoterSearchText(e.target.value);
                    setShowVoterDropdown(true);
                  }}
                  onFocus={() => setShowVoterDropdown(true)}
                  style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                />
              </div>

              {selectedVoter && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 240, 255, 0.1)', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--accent)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Cidadão Selecionado: <strong>{selectedVoter.name}</strong> ({selectedVoter.celular || 'Sem Tel'})</span>
                  <button 
                    type="button" 
                    onClick={() => { setSelectedVoter(null); setVoterSearchText(''); }}
                    style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Remover
                  </button>
                </div>
              )}

              {showVoterDropdown && voterSearchText && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', maxHeight: '180px', overflowY: 'auto', zIndex: 10 }}>
                  {filteredVoters.length === 0 ? (
                    <div style={{ padding: '0.8rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nenhum eleitor encontrado</div>
                  ) : (
                    filteredVoters.map(v => (
                      <div 
                        key={v.id} 
                        onClick={() => {
                          setSelectedVoter(v);
                          setVoterSearchText(v.name);
                          setShowVoterDropdown(false);
                        }}
                        style={{ padding: '0.8rem 1rem', fontSize: '0.85rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }}
                        className="table-row-hover"
                      >
                        {v.name} {v.phone ? `(${v.phone})` : ''}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Atendimento Channel */}
            <div>
              <label style={labelStyle}>Canal de Atendimento</label>
              <select 
                value={formData.channel} 
                onChange={(e) => setFormData({...formData, channel: e.target.value})}
                style={inputStyle}
              >
                {channels.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            {/* Category */}
            <div>
              <label style={labelStyle}>Categoria / Área da Solicitação</label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={inputStyle}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label style={labelStyle}>Prioridade</label>
              <select 
                value={formData.priority} 
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                style={inputStyle}
              >
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>

          </div>

          {/* Subject / Title */}
          <div>
            <label style={labelStyle}>Assunto / Resumo da Solicitação *</label>
            <input 
              type="text" 
              placeholder="Ex: Troca de iluminação pública na Rua das Flores" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={inputStyle}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Relato Detalhado do Atendimento</label>
            <textarea 
              placeholder="Descreva aqui os detalhes informados pelo cidadão..." 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              type="button" 
              className="btn-primary outline" 
              onClick={() => setView('list')}
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={submitting}
              style={{ padding: '0.6rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Send size={16} /> Emitir Protocolo
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <style dangerouslySetInnerHTML={{__html:`
        .table-row-hover:hover {
          background: rgba(255,255,255,0.05);
        }
      `}} />
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
  transition: 'border-color 0.2s'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.5rem'
};
