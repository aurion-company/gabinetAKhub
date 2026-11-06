'use client';
import LegalLayout from '../../components/landing/LegalLayout';

export default function ApisGoogle() {
  return (
    <LegalLayout title="Uso das APIs do Google" updated="Atualizado em 17 de agosto de 2026">
      <section>
        <h2>1. Escopo desta Política</h2>
        <p>Esta página descreve como o <strong>GabinetAK HUB</strong> solicita, usa e protege as informações obtidas por meio das APIs do Google, em conformidade com a <strong>Política de Dados do Usuário dos Serviços de API do Google</strong>, incluindo os requisitos de <em>Uso Limitado (Limited Use)</em>.</p>
        <p>O GabinetAK HUB solicita acesso à conta Google <strong>apenas quando você opta voluntariamente</strong> por essas integrações. Não exigimos login com Google para navegar neste site nem para conhecer o sistema.</p>
      </section>

      <section>
        <h2>2. Login com Google (OAuth 2.0)</h2>
        <p>Se você escolher autenticar-se com Google, coletamos somente:</p>
        <ul>
          <li><strong>Nome completo</strong> — para identificação e personalização não sistema</li>
          <li><strong>Endereço de e-mail</strong> — usado como identificador único da conta</li>
          <li><strong>Foto de perfil</strong> — exibida na interface do usuário</li>
        </ul>
        <p>Esses dados são usados exclusivamente para autenticar usuários que já possuem conta contratada não GabinetAK HUB. <strong>Não criamos contas automaticamente via Google</strong> e não usamos esses dados para marketing ou venda a terceiros.</p>
      </section>

      <section>
        <h2>3. Google Calendar (Integração de Agenda)</h2>
        <p>Se você optar por conectar o Google Calendar, solicitamos os seguintes escopos:</p>
        <ul>
          <li><code>https://www.googleapis.com/auth/calendar.events</code> — para criar e editar eventos</li>
          <li><code>https://www.googleapis.com/auth/calendar.readonly</code> — para exibir eventos do seu calendário não GabinetAK HUB</li>
        </ul>
        <h3>O que fazemos com esse acesso:</h3>
        <ul>
          <li>Criar eventos de compromissos e prazos do sistema não seu Google Calendar</li>
          <li>Exibir eventos do Google Calendar dentro da interface de Agenda do GabinetAK HUB</li>
          <li>Sincronizar alterações em eventos entre as duas plataformas (bidirecional)</li>
        </ul>
        <h3>O que NÃO fazemos:</h3>
        <ul>
          <li>Não utilizamos dados do calendário para publicidade ou marketing</li>
          <li>Não compartilhamos eventos com terceiros além dos servidores do próprio GabinetAK HUB</li>
          <li>Não usamos os dados além do escopo declarado e aprovado pelo usuário</li>
        </ul>
      </section>

      <section>
        <h2>4. Retenção e Revogação</h2>
        <p>Os tokens de acesso às APIs do Google são armazenados de forma criptografada e utilizados apenas enquanto a integração estiver ativa. Você pode revogar o acesso a qualquer momento através das <a href="https://myaccount.google.com/permissions" target="_blank" rel="nãoreferrer" style={{ color: '#60a5fa' }}>permissões da sua conta Google</a> ou diretamente pelo painel do GabinetAK HUB em <strong>Ajustes → Integrações</strong>.</p>
        <p>Após a revogação, os tokens são imediatamente descartados dos nossos servidores.</p>
      </section>

      <section>
        <h2>5. Conformidade com o Google API Services User Data Policy</h2>
        <p>O uso pelo GabinetAK HUB de informações recebidas das APIs do Google obedece à <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="nãoreferrer" style={{ color: '#60a5fa' }}>Política de Dados do Usuário dos Serviços de API do Google</a>, incluindo os requisitos de Uso Limitado (Limited Use).</p>
      </section>

      <section>
        <h2>6. Contato</h2>
        <p>Dúvidas sobre o uso das APIs do Google pelo GabinetAK HUB: <strong>privacidade@GabinetAK.com.br</strong></p>
      </section>
    </LegalLayout>
  );
}
