const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'app', 'page.js');
let content = fs.readFileSync(file, 'utf8');

// 1. Remove duplicates
const startMarker = "{/* M DULO AGENDA WA */}";
const endMarker = "{/* FALLBACK PARA MÓDULOS EM CONSTRUÇÃO */}";

if (content.includes(startMarker) && content.includes(endMarker)) {
  const beforeStr = content.split(startMarker)[0];
  const afterStr = endMarker + content.split(endMarker)[1];
  content = beforeStr + afterStr;
}

// 2. Add grupos_tags to fallback exclusion
const fallbackSearch = "!['home', 'admin-master', 'master_admin', 'admin_master', 'mkt_trafego', 'cadastros', 'demandas', 'kanban', 'forms', 'whatsapp', 'wa_oficial', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'sms_envio', 'ligacoes_auto', 'meta', 'ia', 'seguranca', 'preferencias', 'agenda_wa', 'doc_oficios', 'geomapeamento', 'email_envio', 'email_templates', 'rel_demandas', 'rel_cadastros', 'rel_ranking', 'ia_assistente', 'ia_mkt', 'ia_sentimento', 'ajustes_usuarios', 'seg_acessos', 'logs_auditoria', 'ferr_assinador', 'ajustes_config', 'meu_perfil', 'conta_perfil', 'ferr_links', 'ferr_qr', 'mkt_molduras', 'doc_etiquetas', 'doc_tipos', 'doc_recebidos', 'doc_lista', 'pag_candidato', 'atendimento', 'leads', 'crm_atendimento', 'crm_demandas', 'crm_suporte', 'crm_assuntos', 'leg_pl', 'leg_emendas', 'leg_verbas', 'leg_resultados', 'prod_tarefas', 'prod_assuntos', 'mkt_digital', 'mkt_fluxos', 'painel_arrecadacao', 'criador_doacao', 'pag_conversao', 'map_eleitor', 'notificacoes', 'dashboard'].includes(activePage) && (";
const fallbackReplace = "!['home', 'admin-master', 'master_admin', 'admin_master', 'mkt_trafego', 'cadastros', 'demandas', 'kanban', 'forms', 'whatsapp', 'wa_oficial', 'wa_eleitoral', 'wa_campanha', 'wa_massa', 'wa_auto', 'sms_envio', 'ligacoes_auto', 'meta', 'ia', 'seguranca', 'preferencias', 'agenda_wa', 'doc_oficios', 'geomapeamento', 'email_envio', 'email_templates', 'rel_demandas', 'rel_cadastros', 'rel_ranking', 'ia_assistente', 'ia_mkt', 'ia_sentimento', 'ajustes_usuarios', 'seg_acessos', 'logs_auditoria', 'ferr_assinador', 'ajustes_config', 'meu_perfil', 'conta_perfil', 'ferr_links', 'ferr_qr', 'mkt_molduras', 'doc_etiquetas', 'doc_tipos', 'doc_recebidos', 'doc_lista', 'pag_candidato', 'atendimento', 'leads', 'crm_atendimento', 'crm_demandas', 'crm_suporte', 'crm_assuntos', 'leg_pl', 'leg_emendas', 'leg_verbas', 'leg_resultados', 'prod_tarefas', 'prod_assuntos', 'mkt_digital', 'mkt_fluxos', 'painel_arrecadacao', 'criador_doacao', 'pag_conversao', 'map_eleitor', 'notificacoes', 'dashboard', 'grupos_tags', 'rel_grupos'].includes(activePage) && (";

content = content.replace(fallbackSearch, fallbackReplace);

// 3. Fix Mapeamento de Eleitor buttons and input
const btnSearch = `<button className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>`;
const btnReplace = `<button onClick={() => alert('Filtros Avançados ativados!')} className="btn-primary outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>`;
content = content.replace(btnSearch, btnReplace);

const btn2Search = `<button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>`;
const btn2Replace = `<button onClick={() => setActivePage('cadastros')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>`;
content = content.replace(btn2Search, btn2Replace);

const inputSearch = `<input type="text" placeholder="Buscar eleitor por nome, telefone ou CPF..." className="form-input" style={{ width: '100%' }} />`;
const inputReplace = `<div style={{ position: 'relative', width: '100%' }}>
                        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Buscar eleitor por nome, telefone ou CPF..." style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--accent)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                      </div>`;
content = content.replace(inputSearch, inputReplace);

fs.writeFileSync(file, content, 'utf8');
console.log('UI Fixes applied successfully');
