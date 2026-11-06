const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'app', 'app', 'page.js');
let pageContent = fs.readFileSync(pageFile, 'utf8');

const findMenu = `{
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

const replaceMenu = `{
      category: 'Integrações e Comunicação',
      items: [
        { id: 'whatsapp', label: 'Central do WhatsApp', minPlan: 'political', icon: <MessageCircle size={18} /> },
      ]
    },`;

pageContent = pageContent.replace(findMenu, replaceMenu);
fs.writeFileSync(pageFile, pageContent, 'utf8');

console.log('Sidebar do page.js limpa!');

// Agora atualizar o dropdown no CentralWhatsApp.js
const waFile = path.join(__dirname, 'components', 'modules', 'CentralWhatsApp.js');
let waContent = fs.readFileSync(waFile, 'utf8');

const findDropdownArray = `[
                { id: 'contas', label: 'Contas', icon: <QrCode size={16} /> },
                { id: 'conversas', label: 'Conversas', icon: <MessageCircle size={16} /> },
                { id: 'campanhas', label: 'Disparos Rápidos', icon: <Send size={16} /> },
                { id: 'sincronizar', label: 'Sincronizar', icon: <RefreshCw size={16} /> },
                { id: 'automacao', label: 'Automação', icon: <Network size={16} /> }
              ]`;

const replaceDropdownArray = `[
                { id: 'contas', label: 'Contas & Aparelhos', icon: <QrCode size={16} /> },
                { id: 'conversas', label: 'Conversas & Caixa de Entrada', icon: <MessageCircle size={16} /> },
                { id: 'campanhas', label: 'Disparo WhatsApp Eleitoral', icon: <Send size={16} /> },
                { id: 'campanhas', label: 'WhatsApp para Campanha', icon: <Send size={16} /> },
                { id: 'campanhas', label: 'WhatsApp Envios (Massa)', icon: <Send size={16} /> },
                { id: 'automacao', label: 'Automação WhatsApp', icon: <Network size={16} /> },
                { id: 'campanhas', label: 'Disparo Ligações Auto.', icon: <Mic size={16} /> },
                { id: 'sincronizar', label: 'Sincronizar Contatos', icon: <RefreshCw size={16} /> }
              ]`;

waContent = waContent.replace(findDropdownArray, replaceDropdownArray);
fs.writeFileSync(waFile, waContent, 'utf8');

console.log('CentralWhatsApp atualizada!');
