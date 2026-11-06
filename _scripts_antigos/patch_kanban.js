const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'modules', 'KanbanDinamico.js');
let content = fs.readFileSync(file, 'utf8');

// Adicionar import para os alertas
if (!content.includes('AlertCircle')) {
  content = content.replace("import { Kanban, Plus", "import { Kanban, Plus, AlertCircle");
}

// Inserir os event handlers após a linha 102 (antes do return)
const handlersCode = `
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
`;
if (!content.includes('handleNovoPipeline')) {
  content = content.replace('return (', handlersCode + '\n  return (');
}

// Trocar botões do cabeçalho (Pipeline)
content = content.replace(
  `<button style={iconBtnStyle} title="Editar Pipeline"><Edit2 size={16} /></button>`,
  `<button onClick={handleEditarPipeline} style={iconBtnStyle} title="Editar Pipeline"><Edit2 size={16} /></button>`
);
content = content.replace(
  `<button style={{ ...iconBtnStyle, color: 'var(--danger)' }} title="Excluir Pipeline"><Trash2 size={16} /></button>`,
  `<button onClick={handleExcluirPipeline} style={{ ...iconBtnStyle, color: 'var(--danger)' }} title="Excluir Pipeline"><Trash2 size={16} /></button>`
);
content = content.replace(
  `<button style={iconBtnStyle} title="Tutorial e Ajuda"><HelpCircle size={18} /></button>`,
  `<button onClick={() => alert('Bem-vindo ao Kanban Dinâmico! Arraste e solte os cartões entre as colunas para atualizar os status.')} style={iconBtnStyle} title="Tutorial e Ajuda"><HelpCircle size={18} /></button>`
);
content = content.replace(
  `<button style={{ ...iconBtnStyle, color: 'var(--warning)' }} title="Dicas de IA"><Sparkles size={18} /></button>`,
  `<button onClick={() => alert('Dica de IA: Você tem 3 tarefas na coluna Triagem que estão paradas há mais de 48 horas!')} style={{ ...iconBtnStyle, color: 'var(--warning)' }} title="Dicas de IA"><Sparkles size={18} /></button>`
);
content = content.replace(
  `<button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>`,
  `<button onClick={handleNovoPipeline} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>`
);

// Trocar botão Nova Coluna
content = content.replace(
  `<div style={{ minWidth: '320px', width: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)', cursor: 'pointer' }}>`,
  `<div onClick={handleAdicionarGrupo} style={{ minWidth: '320px', width: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)', cursor: 'pointer' }}>`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Kanban UI Patched.');
