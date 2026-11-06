const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

const regex = /<button style=\{\{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0\.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0\.5rem' \}\}>\s*<LogOut size=\{16\} \/> Sair\s*<\/button>/;

const replacement = `<button style={{ textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { handleLogout(); setIsUserMenuOpen(false); }}>
                      <LogOut size={16} /> Sair
                    </button>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Botao de Sair corrigido.');
} else {
  console.log('Nao encontrou o botao.');
}
