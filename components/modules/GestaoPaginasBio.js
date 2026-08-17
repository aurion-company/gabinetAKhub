'use client';

import React, { useState } from 'react';
import { 
  LayoutTemplate, Plus, Search, Filter, Globe, Image as ImageIcon, 
  MapPin, Eye, Edit3, Trash2, Copy, Sparkles, Check, Link as LinkIcon, 
  Smartphone, Share2, Palette, ArrowUpRight, ToggleLeft, ToggleRight
} from 'lucide-react';

export default function GestaoPaginasBio() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'editor'
  const [search, setSearch] = useState('');
  const [selectedBio, setSelectedBio] = useState(null);

  // Form State
  const [title, setTitle] = useState('Carlos Eduardo - Vereador');
  const [urlSlug, setUrlSlug] = useState('carlos-eduardo-2024');
  const [bioText, setBioText] = useState('Lutando por saúde, educação de qualidade e inovação para o nosso município.');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
  const [layoutMode, setLayoutMode] = useState('card');
  const [showSocialFooter, setShowSocialFooter] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [bgColor, setBgColor] = useState('#0f172a');
  const [cardBgColor, setCardBgColor] = useState('#1e293b');
  const [btnColor, setBtnColor] = useState('#3b82f6');
  const [btnTextColor, setBtnTextColor] = useState('#ffffff');
  const [useGradient, setUseGradient] = useState(true);
  const [locationText, setLocationText] = useState('Gabinete 302, Câmara Municipal - São Paulo, SP');

  // Links List
  const [links, setLinks] = useState([
    { id: '1', label: '💚 Apoiar Campanha (PIX)', url: 'https://elegis.com.br/doar', active: true, icon: 'Pix' },
    { id: '2', label: '💬 Fale Comigo no WhatsApp', url: 'https://wa.me/5511999999999', active: true, icon: 'WhatsApp' },
    { id: '3', label: '📜 Conheça Minhas Propostas de Governo', url: 'https://carlos.com.br/propostas', active: true, icon: 'Document' },
    { id: '4', label: '📸 Siga meu perfil no Instagram', url: 'https://instagram.com/carlos', active: true, icon: 'Instagram' }
  ]);

  // Mocked Pages List
  const [bioPages, setBioPages] = useState([
    {
      id: '1',
      title: 'Carlos Eduardo - Bio Oficial',
      url: 'https://elegis.app/bio/carlos-eduardo-2024',
      layout: 'Modo Card Glass',
      active: true,
      updatedAt: '16/08/2026 18:30',
      views: 4520,
      clicks: 1890,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      title: 'Campanha de Saúde nos Bairros',
      url: 'https://elegis.app/bio/saude-nos-bairros',
      layout: 'Minimalista Sólido',
      active: true,
      updatedAt: '14/08/2026 11:15',
      views: 1280,
      clicks: 640,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddLink = () => {
    const newLink = {
      id: Date.now().toString(),
      label: '🔗 Novo Link Útil',
      url: 'https://',
      active: true,
      icon: 'Link'
    };
    setLinks([...links, newLink]);
  };

  const handleRemoveLink = (id) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const handleUpdateLink = (id, field, value) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  return (
    <div className="section-card liquid-glass" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* CABEÇALHO DO MÓDULO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <LayoutTemplate color="var(--accent)" size={24} /> Páginas Bio (Estilo Linktree & Bio do Insta)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Crie e gerencie landing pages de alta conversão para redes sociais com suporte a PIX, localização e links.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          {activeTab === 'editor' ? (
            <button 
              onClick={() => setActiveTab('list')}
              className="btn-primary outline" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              ⬅️ Voltar à Lista
            </button>
          ) : (
            <button 
              onClick={() => { setSelectedBio(null); setActiveTab('editor'); }}
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={18} /> + Criar Nova Página Bio
            </button>
          )}
        </div>
      </div>

      {/* TELA 1: LISTAGEM DE PÁGINAS BIO */}
      {activeTab === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 0.8rem' }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Pesquisar por título ou URL da página..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', padding: '0.7rem', color: '#fff', width: '100%', outline: 'none' }}
              />
            </div>
            <button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} /> Filtrar Status
            </button>
          </div>

          <div style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem' }}>Foto</th>
                  <th style={{ padding: '1rem' }}>Título da Página</th>
                  <th style={{ padding: '1rem' }}>URL Pública</th>
                  <th style={{ padding: '1rem' }}>Métricas (Views / Clicks)</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Atualizado em</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {bioPages.map((page) => (
                  <tr key={page.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '0.8rem 1rem' }}>
                      <img 
                        src={page.avatar} 
                        alt="Avatar" 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} 
                      />
                    </td>
                    <td style={{ padding: '0.8rem 1rem', fontWeight: '700', color: '#fff' }}>
                      {page.title}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{page.layout}</div>
                    </td>
                    <td style={{ padding: '0.8rem 1rem' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Globe size={14} /> {page.url}
                      </span>
                    </td>
                    <td style={{ padding: '0.8rem 1rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>
                        👁️ {page.views.toLocaleString()} <span style={{ color: 'var(--text-muted)', margin: '0 0.3rem' }}>|</span> 🖱️ {page.clicks.toLocaleString()}
                      </div>
                    </td>
                    <td style={{ padding: '0.8rem 1rem' }}>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', background: page.active ? 'rgba(0,230,118,0.15)' : 'rgba(255,255,255,0.1)', color: page.active ? 'var(--success)' : 'var(--text-muted)', border: `1px solid ${page.active ? 'var(--success)' : 'var(--border)'}` }}>
                        {page.active ? '🟢 Ativa Online' : '⚪ Rascunho'}
                      </span>
                    </td>
                    <td style={{ padding: '0.8rem 1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {page.updatedAt}
                    </td>
                    <td style={{ padding: '0.8rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleCopy(page.url, page.id)}
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                          title="Copiar Link"
                        >
                          {copiedId === page.id ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                        </button>
                        <button 
                          onClick={() => { setSelectedBio(page); setActiveTab('editor'); }}
                          style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                          title="Editar Página"
                        >
                          <Edit3 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TELA 2: FORMULÁRIO DE CRIAÇÃO / EDIÇÃO COM MOCKUP LIVE */}
      {activeTab === 'editor' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '2rem', flex: 1 }}>
          {/* LADO ESQUERDO: CONFIGURAÇÕES E FORMULÁRIO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', maxHeight: '75vh', paddingRight: '0.5rem' }}>
            
            {/* SEÇÃO 1: PERFIL */}
            <div style={{ background: 'var(--bg-elevated)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👤 Perfil e Identidade Visual
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Nome / Título Principal *</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="form-input" 
                    style={{ width: '100%', marginTop: '0.3rem' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>URL Slug Única *</label>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.3rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 0.6rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>elegis.app/bio/</span>
                    <input 
                      type="text" 
                      value={urlSlug} 
                      onChange={(e) => setUrlSlug(e.target.value)} 
                      style={{ background: 'transparent', border: 'none', padding: '0.6rem 0.3rem', color: '#fff', width: '100%', outline: 'none' }} 
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Biografia ou Descrição Curta</label>
                <textarea 
                  value={bioText} 
                  onChange={(e) => setBioText(e.target.value)} 
                  rows={2} 
                  className="form-input" 
                  style={{ width: '100%', marginTop: '0.3rem', resize: 'none' }} 
                />
              </div>

              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>URL da Foto de Perfil</label>
                <input 
                  type="text" 
                  value={avatarUrl} 
                  onChange={(e) => setAvatarUrl(e.target.value)} 
                  className="form-input" 
                  style={{ width: '100%', marginTop: '0.3rem' }} 
                />
              </div>
            </div>

            {/* SEÇÃO 2: SEÇÕES E LINKS */}
            <div style={{ background: 'var(--bg-elevated)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔗 Botões e Links da Página
                </h3>
                <button 
                  onClick={handleAddLink}
                  className="btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  + Adicionar Link
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {links.map((item, index) => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <input 
                        type="text" 
                        value={item.label} 
                        onChange={(e) => handleUpdateLink(item.id, 'label', e.target.value)}
                        placeholder="Título do Botão" 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.4rem 0.6rem', color: '#fff', fontSize: '0.85rem' }} 
                      />
                      <input 
                        type="text" 
                        value={item.url} 
                        onChange={(e) => handleUpdateLink(item.id, 'url', e.target.value)}
                        placeholder="https://..." 
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.4rem 0.6rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }} 
                      />
                    </div>
                    <button 
                      onClick={() => handleRemoveLink(item.id)}
                      style={{ background: 'rgba(255,50,50,0.1)', color: 'var(--danger)', border: '1px solid rgba(255,50,50,0.3)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO 3: APARÊNCIA E CORES */}
            <div style={{ background: 'var(--bg-elevated)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Palette size={18} /> Cores e Personalização
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cor dos Botões</label>
                  <input type="color" value={btnColor} onChange={(e) => setBtnColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Texto dos Botões</label>
                  <input type="color" value={btnTextColor} onChange={(e) => setBtnTextColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cor de Fundo</label>
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '6px', cursor: 'pointer', border: 'none' }} />
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ padding: '0.9rem', fontSize: '1rem', fontWeight: '700' }}>
              💾 Salvar e Publicar Página Bio
            </button>
          </div>

          {/* LADO DIREITO: MOCKUP DE CELULAR AO VIVO */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              📱 Pré-visualização ao Vivo
            </h4>

            {/* MOCKUP CONTAINER */}
            <div style={{ width: '310px', height: '620px', background: '#000', borderRadius: '40px', border: '10px solid #1e293b', boxShadow: '0 20px 50px rgba(0,0,0,0.8)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* NOTCH */}
              <div style={{ width: '130px', height: '22px', background: '#1e293b', borderRadius: '0 0 16px 16px', margin: '0 auto', zIndex: 10 }}></div>

              {/* TELA DO CELULAR */}
              <div style={{ flex: 1, background: bgColor, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflowY: 'auto' }}>
                <img 
                  src={avatarUrl} 
                  alt="Avatar" 
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }} 
                />

                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginTop: '0.8rem' }}>
                  {title || 'Seu Nome Aqui'}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                  {bioText || 'Sua biografia...' }
                </p>

                {/* BOTÕES LINKS */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '1.5rem' }}>
                  {links.filter(l => l.active).map(l => (
                    <a 
                      key={l.id} 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      style={{ background: btnColor, color: btnTextColor, padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>
                  Desenvolvido por Elegis CRM
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
