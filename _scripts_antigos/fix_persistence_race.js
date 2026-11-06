const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

const oldBlock = `  const [activePage, setActivePage] = useState('home');

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

const newBlock = `  // Persistência robusta no F5 (URL query param + localStorage)
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

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, 'utf8');
console.log('Persistência corrigida com URL e State Initializer.');
