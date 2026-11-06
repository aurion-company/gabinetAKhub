const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'modules', 'CentralWhatsApp.js');
let content = fs.readFileSync(file, 'utf8');

// Certificar que os ícones adicionais (Megaphone, Rss, Zap, Phone, etc) estejam importados de lucide-react
if (!content.includes('Megaphone')) {
  content = content.replace("import { MessageCircle,", "import { Megaphone, Rss, Zap, Phone, ShieldCheck, MessageCircle,");
}

// Inserir os Cards acima do renderTabContent ou dentro do topo da tela
const cardsGridJSX = `
      {/* GRID DE CARDS DAS MODALIDADES WHATSAPP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { id: 'eleitoral', title: 'Disparo WhatsApp Eleitoral', desc: 'Envios segmentados por bairro e perfil', icon: <Smartphone size={22} color="var(--accent)" />, tab: 'campanhas' },
          { id: 'campanha', title: 'WhatsApp para Campanha', desc: 'Divulgação de materiais e agenda', icon: <Megaphone size={22} color="#ec4899" />, tab: 'campanhas' },
          { id: 'massa', title: 'WhatsApp Envios (Massa)', desc: 'Fila de disparos com intervalo anti-spam', icon: <Rss size={22} color="#eab308" />, tab: 'campanhas' },
          { id: 'auto', title: 'Automação WhatsApp', desc: 'Robôs de atendimento e funis 24/7', icon: <Zap size={22} color="#a855f7" />, tab: 'automacao' },
          { id: 'ligacoes', title: 'Disparo Ligações Auto.', desc: 'Chamadas de voz automáticas (URA)', icon: <Phone size={22} color="#3b82f6" />, tab: 'campanhas' },
          { id: 'oficial', title: 'WhatsApp Oficial (Meta)', desc: 'Validação de Token e Phone ID da Meta', icon: <ShieldCheck size={22} color="var(--success)" />, tab: 'contas' },
        ].map(card => (
          <div 
            key={card.id}
            onClick={() => setActiveTab(card.tab)}
            className="section-card liquid-glass"
            style={{ 
              padding: '1.2rem', cursor: 'pointer', transition: 'all 0.2s', 
              border: activeTab === card.tab ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
              background: activeTab === card.tab ? 'rgba(0, 240, 255, 0.05)' : 'rgba(255,255,255,0.02)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)' }}>{card.icon}</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>{card.title}</h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>{card.desc}</p>
          </div>
        ))}
      </div>
`;

// Inserir os cards logo após o cabeçalho "Central do WhatsApp Oficial"
if (!content.includes('GRID DE CARDS DAS MODALIDADES WHATSAPP')) {
  content = content.replace(
    `<h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>Central do WhatsApp Oficial</h2>`,
    `<h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>Central do WhatsApp Oficial</h2>`
  );
  
  // Inserir no retorno JSX antes das abas ou após a barra de abas
  const findTabHeader = `<div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>`;
  content = content.replace(findTabHeader, cardsGridJSX + '\n        ' + findTabHeader);
}

fs.writeFileSync(file, content, 'utf8');
console.log('CentralWhatsApp atualizada com os Cards e Abas mantidos!');
