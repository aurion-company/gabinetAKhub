const fs = require('fs');
let content = fs.readFileSync('c:/Users/felipe.azevedo/Desktop/BK/Apps/drive-App Politico V2/Appweb/app/app/page.js', 'utf8');

content = content.replace(
  /<button className="topbar-btn" onClick=\{\(\) => setIsNotifOpen\(\!isNotifOpen\)\} title="Notifica[^>]+>[\s\S]*?<span className="notif-badge">3<\/span>\s*<\/button>/,
  '<button className="topbar-btn" onClick={() => setIsNotifOpen(!isNotifOpen)} title="Notificações" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", position: "relative" }}><Bell size={24} /><span className="notif-badge">3</span></button>'
);

content = content.replace(
  /<div className="user-greeting">\s*Ol[^,]+,\s*<strong>SuperAdmin Master<\/strong>/,
  '<div className="user-greeting mobile-hide">\n                  Olá, <strong>SuperAdmin Master</strong>'
);

fs.writeFileSync('c:/Users/felipe.azevedo/Desktop/BK/Apps/drive-App Politico V2/Appweb/app/app/page.js', content, 'utf8');
