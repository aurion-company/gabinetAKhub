'use client';
import LegalLayout from '../../components/landing/LegalLayout';

export default function PoliticaPrivacidade() {
  return (
    <LegalLayout title="Política de Privacidade" updated="Atualizado em 17 de agosto de 2026">
      <section>
        <h2>1. Introdução</h2>
        <p>A <strong>Elegiv Gestão 360</strong> ("Elegiv Gestão 360", "nós") respeita a sua privacidade e está comprometida em proteger os dados pessoais que você compartilha ao utilizar nossa plataforma de gestão política e administrativa.</p>
        <p>Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD)</strong>.</p>
      </section>

      <section>
        <h2>2. Dados que Coletamos</h2>
        <h3>2.1 Dados fornecidos diretamente por você</h3>
        <ul>
          <li>Nome completo e e-mail para criação e autenticação da conta</li>
          <li>Dados do gabinete ou organização (nome, cargo, CNPJ)</li>
          <li>Dados de eleitores, apoiadores e lideranças cadastrados no CRM</li>
          <li>Documentos, ofícios e demandas inseridos na plataforma</li>
        </ul>
        <h3>2.2 Dados coletados automaticamente</h3>
        <ul>
          <li>Endereço IP, tipo de navegador e sistema operacional</li>
          <li>Páginas acessadas, tempo de sessão e interações na plataforma</li>
          <li>Logs de autenticação e atividade para fins de segurança e auditoria</li>
        </ul>
      </section>

      <section>
        <h2>3. Como Usamos seus Dados</h2>
        <ul>
          <li>Fornecer, manter e melhorar os serviços da plataforma</li>
          <li>Autenticar usuários e garantir a segurança das contas</li>
          <li>Processar pagamentos e emitir faturas e recibos</li>
          <li>Enviar comunicações relacionadas ao serviço (atualizações, alertas)</li>
          <li>Gerar relatórios e análises para os administradores da conta</li>
          <li>Cumprir obrigações legais e responder a autoridades competentes</li>
        </ul>
      </section>

      <section>
        <h2>4. Compartilhamento de Dados</h2>
        <p>Não vendemos seus dados pessoais. Podemos compartilhá-los com terceiros apenas nas seguintes situações:</p>
        <ul>
          <li><strong>Provedores de serviço</strong>: parceiros que nos auxiliam na operação da plataforma (hospedagem, pagamentos, e-mail transacional), sujeitos a acordos de confidencialidade</li>
          <li><strong>Integração com APIs</strong>: quando você opta por conectar serviços de terceiros (ex.: Google Calendar, WhatsApp Business API), os dados são transmitidos conforme as políticas desses provedores</li>
          <li><strong>Obrigação legal</strong>: quando exigido por lei, decreto ou ordem judicial</li>
        </ul>
      </section>

      <section>
        <h2>5. Armazenamento e Segurança</h2>
        <p>Seus dados são armazenados em servidores seguros localizados no Brasil, com as seguintes proteções:</p>
        <ul>
          <li>Criptografia em trânsito (TLS/HTTPS) e em repouso (AES-256)</li>
          <li>Controle de acesso por perfil e autenticação multifator</li>
          <li>Backups automáticos e planos de recuperação de desastres</li>
          <li>Auditorias regulares de segurança e testes de penetração</li>
        </ul>
      </section>

      <section>
        <h2>6. Seus Direitos (LGPD)</h2>
        <p>Você tem o direito de:</p>
        <ul>
          <li>Confirmar a existência de tratamento dos seus dados</li>
          <li>Acessar, corrigir ou atualizar seus dados</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
          <li>Revogar o consentimento a qualquer momento</li>
          <li>Solicitar a portabilidade dos seus dados</li>
        </ul>
        <p>Para exercer esses direitos, entre em contato: <strong>privacidade@elegis.com.br</strong></p>
      </section>

      <section>
        <h2>7. Retenção de Dados</h2>
        <p>Mantemos seus dados pelo período necessário à prestação dos serviços ou pelo tempo exigido pela legislação aplicável. Após o encerramento do contrato, os dados são anonimizados ou excluídos em até 90 dias, salvo obrigação legal de retenção.</p>
      </section>

      <section>
        <h2>8. Contato do Encarregado (DPO)</h2>
        <p>Nossa encarregada pelo tratamento de dados pessoais pode ser contatada através do e-mail: <strong>dpo@elegis.com.br</strong> ou pelo telefone <strong>(62) 3251-0558</strong>.</p>
      </section>
    </LegalLayout>
  );
}
