const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.next' || file === '.git') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(__dirname);

const corrections = {
    'Banknote': 'Banknote',
    'isNotifOpen': 'isNotifOpen',
    'setIsNotifOpen': 'setIsNotifOpen',
    'Novos': 'Novos',
    'nos': 'nos',
    'nome': 'nome',
    'novo': 'novo',
    'Ciano': 'Ciano',
    'nowrap': 'nowrap',
    'none': 'none',
    'Notifica': 'Notifica',
    'notif': 'notif',
    'novas': 'novas',
    'notificacoes': 'notificacoes',
    'Novo': 'Novo',
    'Plano': 'Plano',
    'Nova': 'Nova',
    'nova': 'nova',
    'plano': 'plano',
    'donor': 'donor',
    'Renova': 'Renova',
    'Planos': 'Planos',
    'node': 'node',
    'Node': 'Node',
    'normal': 'normal',
    'Normal': 'Normal',
    'not': 'not',
    'Not': 'Not',
    'now': 'now',
    'Now': 'Now',
    'button': 'button',
    'technology': 'technology'
};

let filesChanged = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    for (const [wrong, right] of Object.entries(corrections)) {
        const regex = new RegExp(wrong, 'g');
        content = content.replace(regex, right);
    }
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Reverted in:', file);
        filesChanged++;
    }
});

console.log('Total files reverted:', filesChanged);
