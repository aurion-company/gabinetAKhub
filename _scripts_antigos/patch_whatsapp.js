const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'modules', 'CentralWhatsApp.js');
let content = fs.readFileSync(file, 'utf8');

// Add new state for the menu
if (!content.includes('isMenuOpen')) {
  content = content.replace("const [activeTab, setActiveTab] = useState('automacao');", "const [activeTab, setActiveTab] = useState('automacao');\n  const [isMenuOpen, setIsMenuOpen] = useState(false);");
}

// Ensure Menu is imported from lucide-react if not present
if (!content.includes('Menu,') && !content.includes(' Menu ')) {
  content = content.replace("import { MessageCircle, QrCode", "import { Menu, MessageCircle, QrCode");
}

const findTabs = `<div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => setActiveTab('contas')}
            style={{ ...tabBtnStyle, background: activeTab === 'contas' ? 'var(--accent)' : 'transparent', color: activeTab === 'contas' ? '#000' : 'var(--text-muted)' }}
          ><QrCode size={16} /> Contas</button>
          
          <button 
            onClick={() => setActiveTab('conversas')}
            style={{ ...tabBtnStyle, background: activeTab === 'conversas' ? 'var(--accent)' : 'transparent', color: activeTab === 'conversas' ? '#000' : 'var(--text-muted)' }}
          ><MessageCircle size={16} /> Conversas</button>
          
          <button 
            onClick={() => setActiveTab('campanhas')}
            style={{ ...tabBtnStyle, background: activeTab === 'campanhas' ? 'var(--accent)' : 'transparent', color: activeTab === 'campanhas' ? '#000' : 'var(--text-muted)' }}
          ><Send size={16} /> Disparos Rápidos</button>
          
          <button 
            onClick={() => setActiveTab('sincronizar')}
            style={{ ...tabBtnStyle, background: activeTab === 'sincronizar' ? 'var(--accent)' : 'transparent', color: activeTab === 'sincronizar' ? '#000' : 'var(--text-muted)' }}
          ><RefreshCw size={16} /> Sincronizar</button>

          <button 
            onClick={() => setActiveTab('automacao')}
            style={{ ...tabBtnStyle, background: activeTab === 'automacao' ? 'var(--accent)' : 'transparent', color: activeTab === 'automacao' ? '#000' : 'var(--text-muted)' }}
          ><Network size={16} /> Automação</button>
        </div>`;

const replaceDropdown = `<div style={{ position: 'relative' }}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1.2rem', borderRadius: '8px', fontSize: '0.9rem' }}
          >
            <Menu size={18} /> Menu WhatsApp <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>
          
          {isMenuOpen && (
            <div className="liquid-glass fade-in" style={{ 
              position: 'absolute', top: '120%', right: 0, width: '220px', 
              background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px', padding: '0.5rem', zIndex: 100, 
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)' 
            }}>
              {[
                { id: 'contas', label: 'Contas', icon: <QrCode size={16} /> },
                { id: 'conversas', label: 'Conversas', icon: <MessageCircle size={16} /> },
                { id: 'campanhas', label: 'Disparos Rápidos', icon: <Send size={16} /> },
                { id: 'sincronizar', label: 'Sincronizar', icon: <RefreshCw size={16} /> },
                { id: 'automacao', label: 'Automação', icon: <Network size={16} /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = activeTab === item.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent'}
                  style={{
                    width: '100%', textAlign: 'left', padding: '0.8rem', 
                    background: activeTab === item.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                    border: 'none', 
                    color: activeTab === item.id ? 'var(--accent)' : '#fff', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', 
                    borderRadius: '8px', transition: 'all 0.2s',
                    fontWeight: activeTab === item.id ? '700' : '500'
                  }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          )}
        </div>`;

content = content.replace(findTabs, replaceDropdown);
fs.writeFileSync(file, content, 'utf8');
console.log('CentralWhatsApp refatorada.');
