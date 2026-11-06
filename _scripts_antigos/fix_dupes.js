const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'app', 'app', 'page.js');
let pageContent = fs.readFileSync(pageFile, 'utf8');
const lines = pageContent.split('\n');

const s = lines.findIndex(l => l.includes("activePage === 'agenda_wa' && <AgendaWA />"));
const e = lines.findIndex(l => l.includes("FALLBACK PARA M"));

if (s > 0 && e > 0 && e > s) {
  // We want to delete the block that repeats these modules.
  // The first occurrence of agenda_wa is on line 1096, but we only want to delete the second one which is in the block near the end.
  // Let's find the last occurrence of agenda_wa
  
  const lastIndexAgendaWa = lines.findLastIndex(l => l.includes("activePage === 'agenda_wa' && <AgendaWA />"));
  if (lastIndexAgendaWa > 1100 && e > lastIndexAgendaWa) {
     lines.splice(lastIndexAgendaWa - 1, e - (lastIndexAgendaWa - 1));
     fs.writeFileSync(pageFile, lines.join('\n'), 'utf8');
     console.log('Duplicatas fixadas.');
  } else {
     console.log('Indices inválidos:', lastIndexAgendaWa, e);
  }
} else {
  console.log('Não encontrou os blocos:', s, e);
}
