const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

const oldBlock = `  // Persistência robusta no F5 (URL query param + localStorage)
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      if (pageParam) return pageParam;
      const saved = localStorage.getItem('elegiv_active_page');
      if (saved) return saved;
    }
    return 'home';
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && activePage) {
      localStorage.setItem('elegiv_active_page', activePage);
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get('page') !== activePage) {
          url.searchParams.set('page', activePage);
          window.history.replaceState(null, '', url.pathname + url.search);
        }
      } catch (e) {}
    }
  }, [activePage]);`;

const newBlock = `  const [activePage, setActivePage] = useState('home');
  const [mounted, setMounted] = useState(false);

  // Carregar estado salvo apenas no cliente após a hidratação (Evita erro de Hydration do Next.js)
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      const saved = localStorage.getItem('elegiv_active_page');
      if (pageParam) {
        setActivePage(pageParam);
      } else if (saved) {
        setActivePage(saved);
      }
    }
  }, []);

  // Salvar no localStorage e atualizar URL ao trocar de página
  useEffect(() => {
    if (mounted && activePage) {
      localStorage.setItem('elegiv_active_page', activePage);
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get('page') !== activePage) {
          url.searchParams.set('page', activePage);
          window.history.replaceState(null, '', url.pathname + url.search);
        }
      } catch (e) {}
    }
  }, [activePage, mounted]);`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, 'utf8');
console.log('Erro de hidratação corrigido!');
