const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Atualizar o estado inicial ou adicionar useEffect para carregar o localStorage
const oldState = "const [activePage, setActivePage] = useState('home');";

const newState = `const [activePage, setActivePage] = useState('home');

  // Persistência no F5 (localStorage)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('elegiv_active_page');
      if (savedPage) {
        setActivePage(savedPage);
      }
    }
  }, []);

  const changePage = (page) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      localStorage.setItem('elegiv_active_page', page);
    }
  };`;

content = content.replace(oldState, newState);

// 2. Substituir chamadas setActivePage(...) pela nova função changePage(...) para persistir ao clicar
// Mas para ser 100% seguro sem quebrar chamadas internas, podemos sincronizar via useEffect no activePage!
const oldStateClean = `const [activePage, setActivePage] = useState('home');

  // Persistência no F5 (localStorage)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem('elegiv_active_page');
      if (savedPage) {
        setActivePage(savedPage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && activePage) {
      localStorage.setItem('elegiv_active_page', activePage);
    }
  }, [activePage]);`;

content = content.replace(newState, oldStateClean);

fs.writeFileSync(file, content, 'utf8');
console.log('Persistência de página no F5 ativada em page.js.');
