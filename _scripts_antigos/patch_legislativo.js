const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'modules', 'GestaoLegislativo.js');
let content = fs.readFileSync(file, 'utf8');

// Adicionar icones adicionais se precisar
if (!content.includes('RefreshCw')) {
  content = content.replace("import { \n  BookOpen", "import { \n  BookOpen, RefreshCw");
}
if (!content.includes('X, ')) {
  content = content.replace("import { \n  BookOpen", "import { \n  X, BookOpen");
}

// Inserir os estados para modais após a linha 11
const statesCode = `
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showTseSyncModal, setShowTseSyncModal] = useState(false);
  const [showNovoVotoModal, setShowNovoVotoModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleExportPDF = () => {
    alert('Iniciando geração de PDF do relatório...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleSyncTSE = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setShowTseSyncModal(false);
      alert('Sincronização com o Tribunal Superior Eleitoral (TSE) concluída com sucesso!');
    }, 2500);
  };

  const handleNovoRegistroSubmit = (e) => {
    e.preventDefault();
    alert('Novo registro salvo com sucesso!');
    setShowNovoModal(false);
  };
`;
if (!content.includes('showNovoModal')) {
  content = content.replace('// DADOS DE MOCK: PROJETOS DE LEI', statesCode + '\n  // DADOS DE MOCK: PROJETOS DE LEI');
}

// Trocar o botão "Novo Registro"
content = content.replace(
  `<button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.3rem' }}>`,
  `<button onClick={() => setShowNovoModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.3rem' }}>`
);

// Trocar botão Exportar PDF
content = content.replace(
  `<button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.55rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>`,
  `<button onClick={handleExportPDF} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.55rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>`
);

// Trocar botão Detalhes PL
content = content.replace(
  /`<button style={{ background: 'rgba\(255,255,255,0\.05\)', border: '1px solid rgba\(255,255,255,0\.1\)', color: '#fff', padding: '0\.4rem 0\.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0\.78rem' }}>\s*Detalhes\s*<\/button>`/g,
  `<button onClick={() => setShowDetalhesModal(pl)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>
    Detalhes
  </button>`
);
// fallback simple replace for Detalhes:
content = content.split("Detalhes").join("Detalhes"); // to just keep it normal if needed, let's just do a specific string replace.

const btnDetalhesFind = `<button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>
                      Detalhes
                    </button>`;
const btnDetalhesReplace = `<button onClick={() => setShowDetalhesModal(pl)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem' }}>
                      Detalhes
                    </button>`;
content = content.replace(btnDetalhesFind, btnDetalhesReplace);

// Adicionar botões no Resultados Eleitorais
const headerResultadosFind = `<h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
              <Vote size={20} /> Votação Histórica por Bairro (Última Eleição)
            </h3>`;
const headerResultadosReplace = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <Vote size={20} /> Votação Histórica por Bairro (Última Eleição)
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setShowTseSyncModal(true)} style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
                  <RefreshCw size={14} /> Sincronizar TSE
                </button>
                <button onClick={() => setShowNovoVotoModal(true)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Plus size={14} /> Incluir Informação
                </button>
              </div>
            </div>`;
content = content.replace(headerResultadosFind, headerResultadosReplace);


// Add Modals to the end before the last </div>
const modaisHTML = `
      {/* MODAL: NOVO REGISTRO UNIFICADO */}
      {showNovoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Adicionar {activeTab === 'pls' ? 'Projeto de Lei' : activeTab === 'emendas' ? 'Emenda' : 'Verba'}</h3>
              <button onClick={() => setShowNovoModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleNovoRegistroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Título / Objeto</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeTab === 'verbas' ? 'Valor (R$)' : 'Detalhes / Autoria'}</label>
                <input type="text" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Salvar Registro</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETALHES PL */}
      {showDetalhesModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent)' }}>{showDetalhesModal.id}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{showDetalhesModal.titulo}</p>
              </div>
              <button onClick={() => setShowDetalhesModal(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <p><strong>Autor:</strong> {showDetalhesModal.autor}</p>
              <p><strong>Comissão:</strong> {showDetalhesModal.comissao}</p>
              <p><strong>Status:</strong> <span style={{ color: 'var(--accent)' }}>{showDetalhesModal.status}</span></p>
              <p><strong>Relator:</strong> {showDetalhesModal.relator}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SINCRONIZAR TSE */}
      {showTseSyncModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '400px', padding: '2rem', textAlign: 'center' }}>
            <Vote size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Sincronização DivulgaCand TSE</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>O sistema buscará as votações consolidadas por Zona e Seção não repositório aberto do Tribunal Superior Eleitoral.</p>
            <button onClick={handleSyncTSE} disabled={isSyncing} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              {isSyncing ? <RefreshCw className="spin" size={16} /> : 'Iniciar Sincronização Segura'}
            </button>
            <button onClick={() => setShowTseSyncModal(false)} disabled={isSyncing} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL: INCLUIR INFO MANUAL */}
      {showNovoVotoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card liquid-glass" style={{ width: '400px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Adicionar Local de Votação</h3>
              <button onClick={() => setShowNovoVotoModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Nome do Bairro / Colégio Eleitoral" style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <input type="number" placeholder="Quantidade de Votos" style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <button onClick={() => { alert('Dado inserido localmente!'); setShowNovoVotoModal(false); }} className="btn-primary" style={{ marginTop: '0.5rem' }}>Salvar Dados</button>
            </div>
          </div>
        </div>
      )}
`;

if (!content.includes('MODAL: NOVO REGISTRO UNIFICADO')) {
  // Find the last </div>
  const lastIndex = content.lastIndexOf('</div>');
  content = content.substring(0, lastIndex) + modaisHTML + '\n    ' + content.substring(lastIndex);
}

fs.writeFileSync(file, content, 'utf8');
console.log('GestaoLegislativo patched.');
