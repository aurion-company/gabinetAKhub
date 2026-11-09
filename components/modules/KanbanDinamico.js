import React, { useState, useEffect } from 'react';
import { Kanban, Plus, AlertCircle, HelpCircle, Sparkles, MessageCircle, MoreVertical, X, Mail, MapPin, Calendar, Clock, Edit2, Trash2, Search, Loader2 } from 'lucide-react';

export default function KanbanDinamico() {
  const [activePipeline, setActivePipeline] = useState('Funil de Atendimento Comunitário');
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock pipelines list
  const pipelines = ['Funil de Atendimento Comunitário', 'Lideranças de Bairro', 'Cobrança de Ofícios'];

  const defaultColumns = [
    { 
      id: 'ABERTO', 
      title: 'Triagem (Novos)', 
      count: 2, 
      color: 'var(--warning)', 
      cards: [
        { id: '1', name: 'Manutenção de Iluminação Pública', initials: 'IP', city: 'Ceilândia Centro', phone: 'REQ-2026-X89A', timeInCol: '2 dias' },
        { id: '2', name: 'Reforma de Quadra Poliesportiva', initials: 'QP', city: 'Taguatinga Norte', phone: 'REQ-2026-M41B', timeInCol: 'Hoje' }
      ] 
    },
    { 
      id: 'EM_ANDAMENTO', 
      title: 'Em Atendimento', 
      count: 2, 
      color: 'var(--accent)', 
      cards: [
        { id: '3', name: 'Ofício p/ Secretaria de Obras', initials: 'SO', city: 'Samambaia Sul', phone: 'REQ-2026-F90C', timeInCol: '5 dias' },
        { id: '4', name: 'Instalação de Quebra-Molas', initials: 'QM', city: 'Águas Claras', phone: 'REQ-2026-P12D', timeInCol: '3 dias' }
      ] 
    },
    { 
      id: 'CONCLUIDO', 
      title: 'Concluído / Resolvido', 
      count: 1, 
      color: 'var(--success)', 
      cards: [
        { id: '5', name: 'Asfaltamento da Rua 12', initials: 'AR', city: 'Vicente Pires', phone: 'REQ-2026-Z77E', timeInCol: 'Concluído' }
      ] 
    }
  ];

  const [columns, setColumns] = useState(defaultColumns);

  const fetchDemands = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/demands');
      if (res.ok) {
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // Group demands by status
          const cols = [
            { id: 'ABERTO', title: 'Triagem (Novos)', count: 0, color: 'var(--warning)', cards: [] },
            { id: 'EM_ANDAMENTO', title: 'Em Atendimento', count: 0, color: 'var(--accent)', cards: [] },
            { id: 'CONCLUIDO', title: 'Concluído / Resolvido', count: 0, color: 'var(--success)', cards: [] }
          ];

          data.forEach(demand => {
            let colId = demand.status;
            if (!cols.find(c => c.id === colId)) colId = 'ABERTO'; // fallback

            const col = cols.find(c => c.id === colId);
            col.cards.push({
              id: demand.id,
              name: demand.title,
              initials: demand.title.substring(0, 2).toUpperCase(),
              city: demand.category,
              phone: demand.protocol,
              timeInCol: new Date(demand.createdAt).toLocaleDateString(),
              raw: demand
            });
            col.count++;
          });

          setColumns(cols);
        }
      }
    } catch (error) {
      console.warn('Usando dados locais demonstrativos para o Kanban:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, [activePipeline]);

  // Manipuladores de Drag and Drop
  const onDragStart = (e, cardId, sourceColId) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceColId', sourceColId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e, targetColId) => {
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColId = e.dataTransfer.getData('sourceColId');

    if (sourceColId === targetColId) return;

    // Atualização otimista
    setColumns(prev => {
      const newCols = prev.map(c => ({...c, cards: [...c.cards]}));
      const sourceCol = newCols.find(c => c.id === sourceColId);
      const targetCol = newCols.find(c => c.id === targetColId);
      
      const cardIndex = sourceCol.cards.findIndex(c => c.id === cardId);
      const [card] = sourceCol.cards.splice(cardIndex, 1);
      
      targetCol.cards.push(card);
      sourceCol.count--;
      targetCol.count++;
      
      return newCols;
    });

    // Request pro Banco
    try {
      await fetch('/api/demands', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cardId, status: targetColId })
      });
    } catch (error) {
      console.error('Erro ao mover card', error);
      fetchDemands(); // Reverter se der erro
    }
  };

  
  const handleNovoPipeline = () => {
    const nome = prompt('Digite o nome do novo Pipeline:');
    if (nome) alert('Pipeline "' + nome + '" criado com sucesso!');
  };

  const handleEditarPipeline = () => {
    const nome = prompt('Editando o pipeline atual:', activePipeline);
    if (nome && nome !== activePipeline) {
      setActivePipeline(nome);
      alert('Pipeline renomeado para "' + nome + '"!');
    }
  };

  const handleExcluirPipeline = () => {
    if (confirm('Tem certeza que deseja excluir o pipeline "' + activePipeline + '"? Todos os dados serão perdidos!')) {
      alert('Pipeline excluído.');
      setActivePipeline('Geral');
    }
  };

  const handleAdicionarGrupo = () => {
    const nome = prompt('Digite o nome do novo grupo (coluna):');
    if (nome) {
      setColumns(prev => [...prev, {
        id: nome.toUpperCase().replace(/ /g, '_'),
        title: nome,
        count: 0,
        color: '#a855f7',
        cards: []
      }]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', gap: '1.5rem' }}>
      
      {/* CABEÇALHO DO MÓDULO */}
      <div className="section-card liquid-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Kanban color="var(--accent)" /> Kanban Dinâmico
          </h2>
          
          <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pipeline:</span>
            <select style={{ ...inputStyle, width: '300px', padding: '0.5rem' }} value={activePipeline} onChange={(e) => setActivePipeline(e.target.value)}>
              {pipelines.map((p, i) => <option key={i}>{p}</option>)}
            </select>
            <button onClick={handleEditarPipeline} style={iconBtnStyle} title="Editar Pipeline"><Edit2 size={16} /></button>
            <button onClick={handleExcluirPipeline} style={{ ...iconBtnStyle, color: 'var(--danger)' }} title="Excluir Pipeline"><Trash2 size={16} /></button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => alert('Bem-vindo ao Kanban Dinâmico! Arraste e solte os cartões entre as colunas para atualizar os status.')} style={iconBtnStyle} title="Tutorial e Ajuda"><HelpCircle size={18} /></button>
          <button onClick={() => alert('Dica de IA: Você tem 3 tarefas na coluna Triagem que estão paradas há mais de 48 horas!')} style={{ ...iconBtnStyle, color: 'var(--warning)' }} title="Dicas de IA"><Sparkles size={18} /></button>
          <button onClick={handleNovoPipeline} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Plus size={16} /> Novo Pipeline
          </button>
        </div>
      </div>

      {/* ÁREA DO BOARD (COLUNAS) */}
      {isLoading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
          <Loader2 className="spinner" size={32} />
        </div>
      ) : (
      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflowX: 'auto', paddingBottom: '1rem' }}>
        
        {columns.map(col => (
          <div 
            key={col.id}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
            style={{ 
              minWidth: '320px', width: '320px', display: 'flex', flexDirection: 'column', gap: '1rem',
              background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem' 
            }}
          >
            {/* Header da Coluna */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: `2px solid ${col.color}` }}>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {col.title}
              </div>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 'bold' }}>
                {col.count}
              </span>
            </div>

            {/* Busca Interna da Coluna */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Buscar na coluna..." style={{ ...inputStyle, padding: '0.5rem 0.5rem 0.5rem 2rem', fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)' }} />
            </div>

            {/* Lista de Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, overflowY: 'auto' }}>
              {col.cards.map(card => (
                <div 
                  key={card.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, card.id, col.id)}
                  onClick={() => setSelectedCard({...card, colName: col.title})}
                  className="section-card liquid-glass"
                  style={{ 
                    padding: '1rem', cursor: 'grab', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.2s', ':hover': { borderColor: 'var(--accent)', transform: 'translateY(-2px)' }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: col.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#000' }}>
                        {card.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{card.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                          <MapPin size={10} /> {card.city}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Na coluna há {card.timeInCol}</span>
                    <button style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: 'var(--success)', padding: '0.3rem', borderRadius: '50%', cursor: 'pointer', display: 'flex' }} title="Falar não WhatsApp">
                      <MessageCircle size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}

        {/* Botão Nova Coluna */}
        <div onClick={handleAdicionarGrupo} style={{ minWidth: '320px', width: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Plus size={24} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Adicionar Grupo</span>
          </div>
        </div>

      </div>
      )}

      {/* MODAL DETALHES DO CARD */}
      {selectedCard && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '450px', padding: '0', overflow: 'hidden', animation: 'fadeIn 0.2s ease-out' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#000' }}>
                  {selectedCard.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>{selectedCard.name}</h3>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Grupo: {selectedCard.colName}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCard(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <MessageCircle size={16} color="var(--success)" /> <span style={{ color: '#fff' }}>{selectedCard.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Mail size={16} /> <span>{selectedCard.name.split(' ')[0].toLowerCase()}@email.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <MapPin size={16} /> <span>{selectedCard.city}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Calendar size={16} /> <span>Cadastrado em 15/05/2026</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Clock size={16} /> <span>Na coluna atual há: {selectedCard.timeInCol}</span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" style={{ flex: 1, background: 'var(--success)', borderColor: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem' }}>
                <MessageCircle size={18} /> Falar não WhatsApp
              </button>
              <button className="btn-primary outline" style={{ padding: '0.8rem' }} title="Editar Cadastro">
                <Edit2 size={18} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

const inputStyle = {
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  outline: 'none'
};

const iconBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-secondary)',
  padding: '0.5rem',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s'
};
