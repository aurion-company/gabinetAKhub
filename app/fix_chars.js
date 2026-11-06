const fs = require('fs');
const filePath = 'c:/Users/felipe.azevedo/Desktop/BK/Apps/drive-App Politico V2/Appweb/app/app/page.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace corrupted emojis
content = content.replace(/📅 segunda-feira/g, '✨ segunda-feira');
content = content.replace(/📅 Agosto/g, '📅 Agosto');
content = content.replace(/a Acesso Rápido/g, '⚡ Acesso Rápido');
content = content.replace(/x\| \(11\)/g, '📱 (11)');
content = content.replace(/x\| \(11\)/g, '📱 (11)');

// Replace corrupted characters
content = content.replace(/Ol,/g, 'Olá,');
content = content.replace(/GestÒO/g, 'Gestão');
content = content.replace(/CONSTRUÇÃO/g, 'CONSTRUÇÃO');
content = content.replace(/PERSONALIZA!ÒO/g, 'PERSONALIZAÇÃO');

// There are a few others that might be messed up
content = content.replace(/M DULO/g, 'MÓDULO');
content = content.replace(/RELATÓRIOS/g, 'RELATÓRIOS');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed more mangled characters in page.js');
