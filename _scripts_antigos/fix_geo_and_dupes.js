const fs = require('fs');
const path = require('path');

// 1. Remover duplicações no page.js
const pageFile = path.join(__dirname, 'app', 'app', 'page.js');
let pageContent = fs.readFileSync(pageFile, 'utf8');

const lines = pageContent.split('\n');
const startIdx = lines.findIndex(l => l.includes("M DULO AGENDA WA") || l.includes("MÓDULO AGENDA WA"));
const endIdx = lines.findIndex(l => l.includes("FALLBACK PARA MÓDULOS EM CONSTRUÇÃO") || l.includes("FALLBACK PARA MÓDULOS EM CONSTRUÇÃO"));

if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
  // Remove as linhas duplicadas
  lines.splice(startIdx, endIdx - startIdx);
  fs.writeFileSync(pageFile, lines.join('\n'), 'utf8');
  console.log('Duplicatas no page.js removidas com sucesso.');
} else {
  console.log('Marcadores não encontrados no page.js ou já removidos.');
}


// 2. Adicionar os modais e alertas no Geomapeamento.js
const geoFile = path.join(__dirname, 'components', 'modules', 'Geomapeamento.js');
let geoContent = fs.readFileSync(geoFile, 'utf8');

// O botão de Assistente IA
const assistenteFind = `<button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} /> Assistente IA
          </button>`;

const assistenteReplace = `<button onClick={() => alert('O Assistente IA sugere: A zona Leste possui maior engajamento. Considere intensificar as campanhas no bairro Vila Esperança.')} className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} /> Assistente IA
          </button>`;

geoContent = geoContent.replace(assistenteFind, assistenteReplace);

// O botão Atualizar Mapa (já aciona o setShowUpdateModal(true), só precisa de um alert ao concluir
const handleUpdateFind = `  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowUpdateModal(false);
    }, 2000);
  };`;

const handleUpdateReplace = `  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setShowUpdateModal(false);
      alert('Sincronização com sucesso: 2.216 cadastros atualizados no mapa.');
    }, 2000);
  };`;

geoContent = geoContent.replace(handleUpdateFind, handleUpdateReplace);

fs.writeFileSync(geoFile, geoContent, 'utf8');
console.log('Geomapeamento.js corrigido.');
