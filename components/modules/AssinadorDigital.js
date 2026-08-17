import React, { useState } from 'react';
import { PenLine, FileSignature, UploadCloud, Eye, EyeOff, Save, ShieldCheck, FileText, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export default function AssinadorDigital() {
  const [hasCertificate, setHasCertificate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [signedDocs, setSignedDocs] = useState([]);

  const handleSaveCertificate = () => {
    if (password) {
      setHasCertificate(true);
    }
  };

  const handleSignDocument = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setSignedDocs([{ id: Date.now(), name: 'Ofício_042_Prefeitura.pdf', date: 'Agora mesmo' }, ...signedDocs]);
    }, 2000);
  };

  return (
    <div className="section-card liquid-glass" style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh', gap: '1.5rem' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <PenLine color="var(--accent)" /> Assinador Digital ICP-Brasil
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Assine documentos PDF com validade jurídica utilizando seu certificado digital A1.</p>
        </div>
        <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <Sparkles size={16} /> Assistente IA
        </button>
      </div>

      {!hasCertificate ? (
        /* TELA DE CONFIGURAÇÃO DO CERTIFICADO */
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <div className="section-card liquid-glass" style={{ width: '100%', maxWidth: '600px', padding: '2rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', background: 'rgba(0, 240, 255, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                <ShieldCheck size={40} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>Configurar Certificado Digital</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Anexe o seu certificado A1 uma única vez. Ele fica guardado com segurança criptográfica para as próximas assinaturas.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Certificado A1 (.pfx ou .p12) *</label>
                <div style={{ 
                  border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '2rem', 
                  textAlign: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.2)', transition: 'all 0.2s'
                }} onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent)'} onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}>
                  <UploadCloud size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Arraste o arquivo ou <b>clique para fazer upload</b></span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Senha do Certificado *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Digite a senha de instalação"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: '2.8rem', paddingRight: '2.8rem' }}
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={12} /> O arquivo e a senha são gravados criptografados.
                </div>
              </div>

              <button 
                className="btn-primary" 
                onClick={handleSaveCertificate}
                disabled={!password}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', marginTop: '1rem', opacity: password ? 1 : 0.5 }}
              >
                <Save size={18} /> Salvar Certificado
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* TELA DE ASSINATURA DE DOCUMENTOS */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flex: 1 }}>
          
          <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent)' }}>Assinar Novo Documento</h3>
              <span style={{ fontSize: '0.75rem', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={14} /> Certificado Ativo
              </span>
            </div>

            <div style={{ 
              flex: 1, border: '2px dashed rgba(0,240,255,0.3)', borderRadius: '12px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', background: 'rgba(0,240,255,0.02)', padding: '2rem', gap: '1rem'
            }}>
              <FileSignature size={48} color="var(--accent)" />
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem' }}>Arraste um PDF para assinar</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>A assinatura eletrônica possui validade jurídica automática.</p>
              </div>
              <button 
                className="btn-primary outline" 
                onClick={handleSignDocument}
                disabled={isUploading}
                style={{ padding: '0.8rem 2rem', marginTop: '1rem' }}
              >
                {isUploading ? 'Processando assinatura...' : 'Selecionar Documento PDF'}
              </button>
            </div>
          </div>

          <div className="section-card liquid-glass" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Últimos Documentos Assinados</h3>
            </div>
            
            {signedDocs.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-muted)' }}>
                <FileText size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '0.9rem' }}>Nenhum documento assinado recentemente.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {signedDocs.map(doc => (
                  <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                        <CheckCircle2 size={18} color="var(--success)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.date}</div>
                      </div>
                    </div>
                    <button style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>
                      Baixar PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '0.9rem'
};
