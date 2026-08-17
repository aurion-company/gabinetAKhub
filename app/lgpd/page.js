'use client';
import LegalLayout from '../../components/landing/LegalLayout';

export default function LGPD() {
  return (
    <LegalLayout title="Adequação à LGPD" updated="Atualizado em 17 de agosto de 2026">
      <section>
        <h2>1. Nosso Compromisso com a LGPD</h2>
        <p>A <strong>Elegiv Gestão 360</strong> está plenamente comprometida com a conformidade à <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709, de 14 de agosto de 2018 – LGPD)</strong>, que regula o tratamento de dados pessoais no Brasil.</p>
        <p>Adotamos as melhores práticas técnicas e organizacionais para garantir a privacidade, segurança e os direitos dos titulares de dados que utilizam nossa plataforma.</p>
      </section>

      <section>
        <h2>2. Bases Legais para Tratamento de Dados</h2>
        <p>Realizamos o tratamento de dados pessoais com fundamento nas seguintes bases legais previstas na LGPD (Art. 7º):</p>
        <ul>
          <li><strong>Consentimento (Art. 7º, I)</strong>: para integração com serviços de terceiros como Google e WhatsApp</li>
          <li><strong>Execução de contrato (Art. 7º, V)</strong>: para fornecer os serviços contratados (CRM, agenda, demandas)</li>
          <li><strong>Cumprimento de obrigação legal (Art. 7º, II)</strong>: para conformidade com legislação eleitoral e tributária</li>
          <li><strong>Legítimo interesse (Art. 7º, IX)</strong>: para segurança, prevenção a fraudes e melhoria dos serviços</li>
        </ul>
      </section>

      <section>
        <h2>3. Categorias de Dados Tratados</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Categoria</th>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Exemplos</th>
                <th style={{ textAlign: 'left', padding: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Finalidade</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Identificação', 'Nome, e-mail, CPF', 'Autenticação e cadastro'],
                ['Contato', 'Telefone, endereço, WhatsApp', 'Comunicação com eleitores'],
                ['Localização', 'Bairro, município, zona eleitoral', 'Geomapeamento e segmentação'],
                ['Financeiro', 'Dados de doações e pagamentos', 'Arrecadação eleitoral'],
                ['Comportamental', 'Logs de uso, acessos', 'Segurança e auditoria'],
              ].map(([cat, ex, fin]) => (
                <tr key={cat} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.8rem', color: '#e2e8f0' }}>{cat}</td>
                  <td style={{ padding: '0.8rem', color: '#94a3b8', fontSize: '0.85rem' }}>{ex}</td>
                  <td style={{ padding: '0.8rem', color: '#94a3b8', fontSize: '0.85rem' }}>{fin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>4. Direitos dos Titulares (Art. 18 da LGPD)</h2>
        <p>Os titulares de dados têm os seguintes direitos, que podem ser exercidos a qualquer momento:</p>
        <ul>
          <li>📋 <strong>Confirmação e Acesso</strong>: Saber quais dados tratamos sobre você</li>
          <li>✏️ <strong>Correção</strong>: Atualizar dados incompletos, inexatos ou desatualizados</li>
          <li>🗑️ <strong>Eliminação</strong>: Solicitar a exclusão de dados desnecessários</li>
          <li>🔒 <strong>Anonimização ou Bloqueio</strong>: Quando o tratamento for excessivo</li>
          <li>📦 <strong>Portabilidade</strong>: Receber seus dados em formato estruturado</li>
          <li>↩️ <strong>Revogação do Consentimento</strong>: A qualquer tempo, sem ônus</li>
          <li>⚖️ <strong>Oposição</strong>: Opor-se ao tratamento baseado em legítimo interesse</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>Para exercer seus direitos, envie uma solicitação para: <strong>lgpd@elegis.com.br</strong></p>
      </section>

      <section>
        <h2>5. Medidas de Segurança Implementadas</h2>
        <ul>
          <li>🔐 Criptografia de dados em trânsito (TLS 1.3) e em repouso (AES-256)</li>
          <li>🛡️ Controle de acesso por perfil (RBAC) e autenticação de dois fatores (2FA)</li>
          <li>📊 Logs de auditoria de todas as ações sensíveis no sistema</li>
          <li>🔄 Backups criptografados diários com retenção de 30 dias</li>
          <li>🧪 Testes regulares de segurança e análise de vulnerabilidades</li>
          <li>📋 Plano de Resposta a Incidentes com notificação à ANPD em até 72h</li>
        </ul>
      </section>

      <section>
        <h2>6. Encarregado de Dados (DPO)</h2>
        <p>Nosso Encarregado pelo Tratamento de Dados Pessoais (Data Protection Officer) está disponível para esclarecimentos e solicitações:</p>
        <ul>
          <li><strong>E-mail:</strong> dpo@elegis.com.br</li>
          <li><strong>Telefone:</strong> (62) 3251-0558</li>
          <li><strong>Endereço:</strong> Rua 72, nº 223, Sala 1507, Jardim Goiás, Goiânia-GO, CEP 74.805-480</li>
        </ul>
      </section>

      <section>
        <h2>7. Autoridade Nacional de Proteção de Dados (ANPD)</h2>
        <p>Caso você não esteja satisfeito com a nossa resposta, você tem o direito de apresentar uma reclamação diretamente à <strong>ANPD</strong> pelo site <a href="https://www.gov.br/anpd" target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>www.gov.br/anpd</a>.</p>
      </section>
    </LegalLayout>
  );
}
