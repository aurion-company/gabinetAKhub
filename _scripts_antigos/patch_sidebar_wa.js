const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'app', 'app', 'page.js');
let pageContent = fs.readFileSync(pageFile, 'utf8');

const findBlock = `    {
      category: 'Whatsapp',
      items: [
        { id: 'whatsapp', label: 'Whatsapp', minPlan: 'political', icon: <Smartphone size={18} /> },
        { id: 'wa_eleitoral', label: 'Disparo WhatsApp Eleitoral', minPlan: 'political', icon: <Smartphone size={18} /> },
        { id: 'wa_campanha', label: 'WhatsApp para Campanha', minPlan: 'political', icon: <Megaphone size={18} /> },
        { id: 'wa_massa', label: 'WhatsApp Envios (Massa)', minPlan: 'political', icon: <Rss size={18} /> },
        { id: 'wa_auto', label: 'Automação WhatsApp', minPlan: 'pro', icon: <Zap size={18} /> },
        { id: 'ligacoes_auto', label: 'Disparo Ligações Auto.', minPlan: 'enterprise', icon: <Smartphone size={18} /> },
      ]
    },
    {
      category: 'Whatsapp Oficial',
      items: [
        { id: 'wa_oficial', label: 'Whatsapp Oficial', minPlan: 'political', icon: <MessageCircle size={18} /> },
      ]
    },`;

const replaceBlock = `    {
      category: 'Whatsapp',
      items: [
        { id: 'whatsapp', label: 'Central do WhatsApp Oficial', minPlan: 'political', icon: <MessageCircle size={18} /> },
      ]
    },`;

pageContent = pageContent.replace(findBlock, replaceBlock);
fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('Sidebar do page.js limpa e consolidada com sucesso!');
