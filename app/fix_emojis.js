const fs = require('fs');
const filePath = 'c:/Users/felipe.azevedo/Desktop/BK/Apps/drive-App Politico V2/Appweb/app/app/page.js';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/<div className="notif-title">.*Nova Demanda Recebida<\/div>/, '<div className="notif-title">📢 Nova Demanda Recebida</div>');
content = content.replace(/<div className="notif-title">.*Disparo CAPI Concluído<\/div>/, '<div className="notif-title">🎯 Disparo CAPI Concluído</div>');
content = content.replace(/<div className="notif-title">.*Trilha de Auditoria LGPD<\/div>/, '<div className="notif-title">🛡️ Trilha de Auditoria LGPD</div>');

content = content.replace(/<h3 className="section-title">.*Aniversariantes VIP da Semana<\/h3>/, '<h3 className="section-title">🎂 Aniversariantes VIP da Semana</h3>');

content = content.replace(/<div style=\{\{ fontSize: '3rem', marginBottom: '1rem' \}\}>.*<\/div>/, "<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>");
content = content.replace(/<div style=\{\{ fontSize: '2\.5rem' \}\}>.*<\/div>/, "<div style={{ fontSize: '2.5rem' }}>🔒</div>");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Mangled emojis fixed in page.js');
