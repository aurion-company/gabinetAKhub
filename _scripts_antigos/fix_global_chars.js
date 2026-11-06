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

const replaceMap = {
    'Gestão': 'Gestão',
    'gestão': 'gestão',
    'Gest': 'Gestão',
    'Acesso Cidadão': 'Acesso Cidadão',
    'Acessar Serviços': 'Acessar Serviços',
    'Alteraes': 'Alterações',
    ' ': ' ',
    '': 'ã',
    '': 'ã', // This is dangerous but usually  is ã or ç in this context. It's safer to map specific words.
};

let filesChanged = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // First specific words
    content = content.replace(/Gestão/g, 'Gestão');
    content = content.replace(/gestão/g, 'gestão');
    content = content.replace(/Visão/g, 'Visão');
    content = content.replace(/Eleições/g, 'Eleições');
    content = content.replace(/eleições/g, 'eleições');
    content = content.replace(/Autenticação/g, 'Autenticação');
    content = content.replace(/Configurações/g, 'Configurações');
    content = content.replace(/Notificações/g, 'Notificações');
    content = content.replace(/Ação/g, 'Ação');
    content = content.replace(/Não/g, 'Não');
    content = content.replace(/não/g, 'não');
    content = content.replace(/Usuários/g, 'Usuários');
    content = content.replace(/Módulos/g, 'Módulos');
    content = content.replace(/público/g, 'público');
    content = content.replace(/Arrecadação/g, 'Arrecadação');
    content = content.replace(/Doações/g, 'Doações');
    content = content.replace(/Página/g, 'Página');
    content = content.replace(/Eletrônico/g, 'Eletrônico');
    content = content.replace(/Histórico/g, 'Histórico');
    content = content.replace(/Atuação/g, 'Atuação');
    content = content.replace(/Informações/g, 'Informações');
    content = content.replace(/Relatórios/g, 'Relatórios');
    content = content.replace(/Métricas/g, 'Métricas');
    content = content.replace(/Concluído/g, 'Concluído');
    content = content.replace(/Estatísticas/g, 'Estatísticas');
    content = content.replace(/Dinâmico/g, 'Dinâmico');
    content = content.replace(/Cidadão/g, 'Cidadão');
    content = content.replace(/Serviços/g, 'Serviços');
    content = content.replace(/Permissões/g, 'Permissões');
    content = content.replace(/ /g, ' '); // Sometimes it's a random space
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed:', file);
        filesChanged++;
    }
});

console.log('Total files fixed:', filesChanged);
