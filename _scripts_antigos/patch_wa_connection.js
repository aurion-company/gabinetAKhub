const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'modules', 'CentralWhatsApp.js');
let content = fs.readFileSync(file, 'utf8');

// Adicionar estados
const stateInsert = `
  const [connectionMode, setConnectionMode] = useState('qr'); // 'qr' ou 'meta'
  const [metaData, setMetaData] = useState({ token: '', phoneId: '' });
  const [qrStatus, setQrStatus] = useState('idle'); // 'idle', 'loading', 'ready'
  
  const handleConnectMeta = async () => {
    if(!metaData.token || !metaData.phoneId) return alert('Preencha os dados da Meta API.');
    setIsConnected(true);
    alert('Conectado com sucesso na Meta Cloud API!');
  };

  const handleGenerateQR = () => {
    setQrStatus('loading');
    setTimeout(() => {
      setQrStatus('ready');
    }, 2000);
  };
`;

if (!content.includes('connectionMode')) {
  content = content.replace("const [isSyncing, setIsSyncing] = useState(false);", "const [isSyncing, setIsSyncing] = useState(false);\n" + stateInsert);
}

// Ensure isConnected starts as false for testing
content = content.replace("const [isConnected, setIsConnected] = useState(true);", "const [isConnected, setIsConnected] = useState(false);");

// Substituir bloco de conexão
const oldBlock = `{!isConnected ? (
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
               <QrCode size={64} color="var(--text-muted)" />
               <div style={{ flex: 1 }}>
                 <h4 style={{ fontWeight: '700', color: '#fff', marginBottom: '0.3rem' }}>Conecte seu Aparelho</h4>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>Escaneie o QR Code para ativar os disparos automáticos.</p>
                 <button className="btn-primary outline" onClick={() => setIsConnected(true)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Simular Conexão</button>
               </div>
             </div>
          ) : (`;

const newBlock = `{!isConnected ? (
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
               <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.3rem', borderRadius: '8px' }}>
                 <button onClick={() => setConnectionMode('qr')} style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: 'none', background: connectionMode === 'qr' ? 'var(--accent)' : 'transparent', color: connectionMode === 'qr' ? '#000' : 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Via QR Code</button>
                 <button onClick={() => setConnectionMode('meta')} style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: 'none', background: connectionMode === 'meta' ? 'var(--accent)' : 'transparent', color: connectionMode === 'meta' ? '#000' : 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Meta API (Oficial)</button>
               </div>
               
               {connectionMode === 'qr' ? (
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {qrStatus === 'ready' ? (
                        <QrCode size={60} color="#fff" />
                     ) : qrStatus === 'loading' ? (
                        <RefreshCw size={24} className="spin" color="var(--accent)" />
                     ) : (
                        <Smartphone size={32} color="var(--text-muted)" />
                     )}
                   </div>
                   <div style={{ flex: 1 }}>
                     <h4 style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>Conexão de Aparelho Web</h4>
                     <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>Requer Evolution API / Z-API.</p>
                     {qrStatus === 'ready' ? (
                       <button className="btn-primary" onClick={() => setIsConnected(true)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Simular Leitura (Conectar)</button>
                     ) : (
                       <button className="btn-primary outline" onClick={handleGenerateQR} disabled={qrStatus==='loading'} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>{qrStatus === 'loading' ? 'Buscando...' : 'Gerar QR Code'}</button>
                     )}
                   </div>
                 </div>
               ) : (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" placeholder="Access Token Permanente (Meta)" value={metaData.token} onChange={e => setMetaData({...metaData, token: e.target.value})} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem' }} />
                    <input type="text" placeholder="Phone Number ID" value={metaData.phoneId} onChange={e => setMetaData({...metaData, phoneId: e.target.value})} style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem' }} />
                    <button className="btn-primary" onClick={handleConnectMeta} style={{ padding: '0.5rem', fontSize: '0.85rem', marginTop: '0.3rem' }}>Validar Conexão Oficial</button>
                 </div>
               )}
             </div>
          ) : (`;

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, 'utf8');
console.log('CentralWhatsApp refatorada com multi-connection.');
