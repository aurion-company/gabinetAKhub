'use client';
import LegalLayout from '../../components/landing/LegalLayout';

export default function TermosDeUso() {
  return (
    <LegalLayout title="Termos de Uso" updated="Atualizado em 17 de agosto de 2026">
      <section>
        <h2>1. Aceitação dos Termos</h2>
        <p>Ao criar uma conta ou utilizar qualquer funcionalidade da plataforma <strong>Elegiv Gestão 360</strong>, você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com alguma condição, interrompa imediatamente o uso da plataforma.</p>
      </section>

      <section>
        <h2>2. Descrição do Serviço</h2>
        <p>O Elegiv Gestão 360 é uma plataforma SaaS (Software as a Service) voltada à gestão política e administrativa, oferecendo:</p>
        <ul>
          <li>Gestão de gabinete: ofícios, demandas, agenda e atendimento ao cidadão</li>
          <li>CRM eleitoral: cadastro e segmentação de eleitores, lideranças e apoiadores</li>
          <li>Módulo de Campanhas Eleitorais e gestão de mandatos</li>
          <li>Envios via WhatsApp Business API Oficial e SMS</li>
          <li>Arrecadação eleitoral com PIX, cartão e boleto</li>
          <li>Relatórios, dashboards e geomapeamento</li>
          <li>Automação via n8n e Inteligência Artificial (Gemini)</li>
        </ul>
      </section>

      <section>
        <h2>3. Cadastro e Responsabilidades do Usuário</h2>
        <ul>
          <li>Você é responsável por manter a confidencialidade das credenciais de acesso</li>
          <li>É proibido compartilhar a conta com pessoas não autorizadas pelo contrato</li>
          <li>Os dados inseridos na plataforma são de responsabilidade exclusiva do contratante</li>
          <li>O usuário deve fornecer informações verídicas no cadastro e manter seus dados atualizados</li>
          <li>É proibido usar a plataforma para fins ilícitos, especialmente práticas vedadas pela legislação eleitoral</li>
        </ul>
      </section>

      <section>
        <h2>4. Planos, Pagamento e Cancelamento</h2>
        <p>Os serviços são oferecidos em diferentes planos com cobrança recorrente (mensal ou anual). O cancelamento pode ser feito a qualquer momento pelo painel do usuário, sem multas, porém sem direito a reembolso proporcional do período em curso, exceto nos casos previstos pelo Código de Defesa do Consumidor (Lei nº 8.078/1990).</p>
      </section>

      <section>
        <h2>5. Propriedade Intelectual</h2>
        <p>Todo o conteúdo da plataforma — incluindo código-fonte, design, logotipos, interfaces e documentação — é de propriedade exclusiva da Elegiv Gestão 360 e protegido por lei. É vedada a reprodução, distribuição ou engenharia reversa sem autorização prévia e por escrito.</p>
        <p>Os dados inseridos pelo usuário permanecem de propriedade do contratante.</p>
      </section>

      <section>
        <h2>6. Limitação de Responsabilidade</h2>
        <p>O Elegiv Gestão 360 não se responsabiliza por:</p>
        <ul>
          <li>Uso inadequado da plataforma em desacordo com a legislação eleitoral</li>
          <li>Dados inseridos incorretamente pelo usuário</li>
          <li>Falhas em serviços de terceiros (WhatsApp, Google, operadoras de SMS)</li>
          <li>Danos indiretos ou lucros cessantes decorrentes do uso da plataforma</li>
        </ul>
      </section>

      <section>
        <h2>7. Disponibilidade e SLA</h2>
        <p>Nos comprometemos com disponibilidade mínima de <strong>99,5% ao mês</strong>, exceto durante janelas de manutenção previamente comunicadas. Em casos de indisponibilidade fora do SLA, créditos poderão ser aplicados na fatura seguinte, conforme análise caso a caso.</p>
      </section>

      <section>
        <h2>8. Alterações nos Termos</h2>
        <p>Podemos atualizar estes Termos a qualquer momento. Você será notificado por e-mail e/ou aviso na plataforma com antecedência mínima de 15 dias para alterações relevantes.</p>
      </section>

      <section>
        <h2>9. Foro e Legislação Aplicável</h2>
        <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de <strong>Goiânia – GO</strong> para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro.</p>
      </section>
    </LegalLayout>
  );
}
