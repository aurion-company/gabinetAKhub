const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Adicionar import dinâmico
if (!content.includes('GestaoFaturas')) {
  content = content.replace(
    "const GestaoUsuarios = dynamic(() => import('../../components/modules/GestaoUsuarios'), { ssr: false });",
    "const GestaoUsuarios = dynamic(() => import('../../components/modules/GestaoUsuarios'), { ssr: false });\nconst GestaoFaturas = dynamic(() => import('../../components/modules/GestaoFaturas'), { ssr: false });"
  );
}

// 2. Adicionar ao menu da Sidebar em Ajustes
const findSidebarCat = `category: 'Ajustes & Sistema',
      items: [`;
const replaceSidebarCat = `category: 'Ajustes & Sistema',
      items: [
        { id: 'faturas', label: 'Faturas & Assinatura', minPlan: 'free', icon: <FileText size={18} /> },`;

if (!content.includes("id: 'faturas'")) {
  content = content.replace(findSidebarCat, replaceSidebarCat);
}

// 3. Adicionar FileText nas importações do lucide-react se necessário
if (!content.includes('FileText,')) {
  content = content.replace("import { Smartphone,", "import { FileText, Smartphone,");
}

// 4. Renderizar o componente
if (!content.includes("activePage === 'faturas'")) {
  content = content.replace(
    "{activePage === 'ajustes_config' && <ConfiguracoesGerais />}",
    "{activePage === 'ajustes_config' && <ConfiguracoesGerais />}\n          {activePage === 'faturas' && <GestaoFaturas />}"
  );
}

// 5. Adicionar 'faturas' na whitelist de páginas válidas
content = content.replace("'dashboard', 'grupos_tags'", "'dashboard', 'faturas', 'grupos_tags'");

fs.writeFileSync(file, content, 'utf8');
console.log('page.js atualizado com o módulo de Faturas.');
