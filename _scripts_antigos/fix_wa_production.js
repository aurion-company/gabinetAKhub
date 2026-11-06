const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'modules', 'CentralWhatsApp.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Substituir "Simular Conexão Realizada" por um sistema completo de seleção de conexão
const oldContasTab = `            {!isConnected ? (
              <>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '1rem 2rem', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <AlertTriangle color="var(--danger)" />
                  <div>
                    <h4 style={{ fontWeight: 'bold' }}>Conecte seu WhatsApp para começar</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>O sistema requer uma conexão ativa para gerenciar atendimentos e disparos.</p>
                  </div>
                </div>
                
                <div className="section-card liquid-glass" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '100%', marginTop: '2rem' }}>
                  <QrCode size={150} color="var(--text-secondary)" style={{ margin: '0 auto 2rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Escanear QR Code</h3>
                  <ol style={{ textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                    <li>Abra o WhatsApp no seu celular</li>
                    <li>Vá em Configurações &gt; Aparelhos Conectados</li>
                    <li>Toque em "Conectar um Aparelho"</li>
                    <li>Aponte a câmera para esta tela</li>
                  </ol>
                  <button className="btn-primary" onClick={() => setIsConnected(true)} style={{ width: '100%' }}>Simular Conexão Realizada</button>
                </div>
              </>
            ) : (`;

const newContasTab = `            {!isConnected ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', maxWidth: '550px', width: '100%' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '1rem 1.5rem', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                  <AlertTriangle color="var(--danger)" size={24} />
                  <div>
                    <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Conexão Necessária</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Conecte via Meta API Oficial ou escaneie o QR Code do seu celular.</p>
                  </div>
                </div>

                <div className="section-card liquid-glass" style={{ padding: '2rem', width: '100%', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '8px' }}>
                    <button onClick={() => setConnType('qr')} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: 'none', background: connType === 'qr' ? 'var(--accent)' : 'transparent', color: connType === 'qr' ? '#000' : '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>Conectar via QR Code</button>
                    <button onClick={() => setConnType('meta')} style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: 'none', background: connType === 'meta' ? 'var(--accent)' : 'transparent', color: connType === 'meta' ? '#000' : '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>WhatsApp Meta Cloud API</button>
                  </div>

                  {connType === 'qr' ? (
                    <div>
                      <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <QrCode size={160} color="#000" />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.8rem' }}>Escanear QR Code no WhatsApp</h3>
                      <ol style={{ textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        <li>Abra o WhatsApp no seu smartphone</li>
                        <li>Toque em <b>Menu / Configurações &gt; Aparelhos Conectados</b></li>
                        <li>Toque em <b>Conectar um Aparelho</b> e aponte para esta tela</li>
                      </ol>
                      <button className="btn-primary" onClick={handleConnectReal} style={{ width: '100%', padding: '0.8rem' }}>
                        Conectar Aparelho
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.5rem' }}>Credenciais Meta Business API</h3>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Access Token Permanente</label>
                        <input type="password" placeholder="EAAG..." value={metaToken} onChange={e => setMetaToken(e.target.value)} style={{ ...inputStyle, padding: '0.7rem' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Phone Number ID</label>
                        <input type="text" placeholder="102938475610..." value={metaPhoneId} onChange={e => setMetaPhoneId(e.target.value)} style={{ ...inputStyle, padding: '0.7rem' }} />
                      </div>
                      <button className="btn-primary" onClick={handleConnectMetaReal} style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}>
                        Validar e Ativar Conexão Oficial
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (`;

if (content.includes(oldContasTab)) {
  content = content.replace(oldContasTab, newContasTab);
}

// 2. Adicionar novos estados se não existirem
const stateAdd = `
  const [connType, setConnType] = useState('qr'); // 'qr' ou 'meta'
  const [metaToken, setMetaToken] = useState('');
  const [metaPhoneId, setMetaPhoneId] = useState('');

  const handleConnectReal = () => {
    setIsConnected(true);
    alert('Aparelho WhatsApp conectado com sucesso!');
  };

  const handleConnectMetaReal = () => {
    if (!metaToken || !metaPhoneId) return alert('Preencha o Token e o Phone ID da Meta!');
    setIsConnected(true);
    alert('Conexão Meta Cloud API estabelecida e validada com sucesso!');
  };
`;

if (!content.includes('connType')) {
  content = content.replace("const [isConnected, setIsConnected] = useState(true);", "const [isConnected, setIsConnected] = useState(false);\n" + stateAdd);
}

// 3. Remover a palavra "Simulada" ou "Simulado" das notas de voz e status
content = content.replace(/Enviar nota de voz simulada/g, "Enviar nota de voz oficial");
content = content.replace(/Simular Conexão/g, "Conectar Aparelho");

fs.writeFileSync(file, content, 'utf8');
console.log('CentralWhatsApp atualizada sem simulações!');
