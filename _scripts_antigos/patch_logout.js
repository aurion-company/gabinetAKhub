const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

const logoutLogic = `
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      window.location.href = '/acessar';
    } catch (error) {
      console.error('Erro ao sair:', error);
      window.location.href = '/acessar';
    }
  };

  const handleNavClick`;

content = content.replace('  const handleNavClick', logoutLogic);
content = content.replace(`if (mod.id === 'logout') {`, `if (mod.id === 'logout') {`); // dummy

// In handleNavClick
content = content.replace(
  '  const handleNavClick = (mod) => {',
  `  const handleNavClick = (mod) => {\n    if (mod.id === 'logout') { handleLogout(); return; }`
);

// In the dropdown Sair button
const targetBtn = `<button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <LogOut size={16} /> Sair
                    </button>`;
const replacementBtn = `<button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}>
                      <LogOut size={16} /> Sair
                    </button>`;

content = content.replace(targetBtn, replacementBtn);
// Also replace other 'none' instances in styles to 'none'
content = content.replace(/border: 'none'/g, "border: 'none'");
content = content.replace(/boxShadow: currentTheme === theme.key \? \`0 0 10px \${theme.glow}\` : 'none'/g, "boxShadow: currentTheme === theme.key ? `0 0 10px ${theme.glow}` : 'none'");

fs.writeFileSync(file, content, 'utf8');
console.log('Patch applied successfully.');
