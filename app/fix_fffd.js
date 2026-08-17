const fs = require('fs');
const filePath = 'c:/Users/felipe.azevedo/Desktop/BK/Apps/drive-App Politico V2/Appweb/app/app/page.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace standard Unicode Replacement Character
content = content.replace(/\uFFFD/g, '');

// Clean up remaining broken sequences identified in the screenshot
content = content.replace(/xL& /g, '✨ ');
content = content.replace(/xa  /g, '📢 ');
content = content.replace(/a /g, '⚡ ');
content = content.replace(/x\| /g, '📱 ');
content = content.replace(/M DULO/g, 'MÓDULO');
content = content.replace(/M dulo/g, 'Módulo');
content = content.replace(/constru Òo/g, 'construção');
content = content.replace(/Gest Òo/g, 'Gestão');
content = content.replace(/Ol,/g, 'Olá,');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed all unicode replacement characters');
