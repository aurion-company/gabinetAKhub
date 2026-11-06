'use client';
import { useState } from 'react';
import { Check, X, ThumbsUp, ThumbsDown, Sparkles, Scale, Users, ChevronRight } from 'lucide-react';

export default function TinderLegislativo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userVotes, setUserVotes] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const bills = [
    {
      id: 1,
      numero: 'PL 412/2026',
      titulo: 'Fim da taxa de ilumina��o p�blica para ruas sem postes de LED',
      categoria: 'Tributa��o & Infraestrutura',
      resumo: 'Isenta moradores de bairros que n�o contam com ilumina��o p�blica adequada de pagar a taxa de luz na fatura mensal at� que o servi�o seja restabelecido.',
      votoDeputado: 'A Favor',
      deputadoJustificativa: 'N�o � justo o cidad�o pagar por um servi�o que a prefeitura n�o entrega na porta da casa dele.',
      popularAprovacao: 88,
      traducaoSimples: {
        pratica: 'Se sua rua for escura e sem poste em frente, voc� n�o paga a contribui��o de ilumina��o.',
        beneficiados: 'Mais de 45 mil fam�lias de regi�es perif�ricas e �reas rurais.',
        custo: 'Economia m�dia de R$ 28/m�s na conta de luz da fam�lia.'
      }
    },
    {
      id: 2,
      numero: 'PL 589/2026',
      titulo: 'Bot�o do P�nico e c�meras com reconhecimento em escolas p�blicas',
      categoria: 'Seguran�a & Educa��o',
      resumo: 'Obriga a instala��o de sistema de alarme direto com a Pol�cia Militar e c�meras de monitoramento nos port�es de todas as escolas p�blicas.',
      votoDeputado: 'A Favor',
      deputadoJustificativa: 'A seguran�a dos nossos filhos e professores nas escolas � prioridade inegoci�vel.',
      popularAprovacao: 94,
      traducaoSimples: {
        pratica: 'Qualquer ocorr�ncia na escola aciona a viatura da PM em menos de 3 minutos.',
        beneficiados: 'Alunos, pais e comunidade escolar de mais de 600 escolas p�blicas.',
        custo: 'Recursos j� previstos no Fundo de Seguran�a P�blica.'
      }
    },
    {
      id: 3,
      numero: 'PL 620/2026',
      titulo: 'Aumento de 30% na verba de publicidade institucional do governo',
      categoria: 'Or�amento & Transpar�ncia',
      resumo: 'Proposta do Executivo para expandir o limite de gastos de propaganda e marketing em anos eleitorais.',
      votoDeputado: 'Contra',
      deputadoJustificativa: 'Em vez de gastar milh�es com propaganda do governo, esse dinheiro tem que ir para rem�dio nas UPAs.',
      popularAprovacao: 12,
      traducaoSimples: {
        pratica: 'O governo gastaria mais dinheiro p�blico em comerciais de TV e redes sociais.',
        beneficiados: 'Ag�ncias de propaganda e imagem de governantes.',
        custo: 'R$ 60 milh�es a menos nos cofres p�blicos da sa�de e asfalto.'
      }
    }
  ];

  const currentBill = bills[currentIndex];

  const handleVote = (vote) => {
    setUserVotes(prev => ({ ...prev, [currentBill.id]: vote }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setExplanation(null);
    if (currentIndex < bills.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Reinicia ciclo
    }
  };

  const handleTranslateIA = () => {
    setTranslating(true);
    setTimeout(() => {
      setExplanation(currentBill.traducaoSimples);
      setTranslating(false);
    }, 600);
  };

  return (
    <div className="tinder-container">
      <style jsx>{`
        .tinder-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 680px;
          margin: 0 auto;
          width: 100%;
        }

        .tinder-header {
          text-align: center;
        }

        .tinder-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(124, 58, 237, 0.15);
          color: #A78BFA;
          border: 1px solid rgba(124, 58, 237, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .tinder-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
        }

        .tinder-desc {
          color: #94A3B8;
          font-size: 0.88rem;
          margin: 0.35rem 0 0 0;
        }

        /* CARD DE VOTA��O */
        .bill-card {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 20px;
          padding: 1.75rem;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .bill-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1E2230;
          padding-bottom: 0.75rem;
        }

        .bill-number {
          font-size: 0.85rem;
          font-weight: 700;
          color: #38BDF8;
        }

        .bill-cat {
          font-size: 0.72rem;
          background: #1A1D27;
          color: #94A3B8;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
        }

        .bill-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #F8FAFC;
          line-height: 1.35;
          margin: 0;
        }

        .bill-summary {
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.5;
          margin: 0;
        }

        /* BOT�O TRADUTOR DE JURIDIQU�S COM IA */
        .btn-translate-ia {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
          border: 1px solid rgba(14, 165, 233, 0.3);
          color: #38BDF8;
          padding: 0.5rem 0.85rem;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }

        .btn-translate-ia:hover {
          border-color: #38BDF8;
          background: rgba(14, 165, 233, 0.2);
        }

        .ia-explanation-box {
          background: #0E1017;
          border: 1px solid #24293D;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.82rem;
        }

        .ia-topic {
          color: #CBD5E1;
          display: flex;
          gap: 0.4rem;
        }

        .ia-topic strong {
          color: #38BDF8;
          min-width: 140px;
        }

        /* BOT�ES DE VOTO SWIPE */
        .vote-actions-row {
          display: flex;
          gap: 1rem;
          width: 100%;
        }

        .btn-vote {
          flex: 1;
          padding: 0.85rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .btn-contra {
          background: rgba(239, 68, 68, 0.15);
          color: #F87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .btn-contra:hover {
          background: #EF4444;
          color: #FFFFFF;
        }

        .btn-favor {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .btn-favor:hover {
          background: #10B981;
          color: #FFFFFF;
        }

        /* RESULTADO / COMPARA��O COM O DEPUTADO */
        .vote-result-box {
          background: #0C0E14;
          border: 1px solid #1E2230;
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
        }

        .deputado-card {
          background: #161A28;
          border: 1px solid #2563EB;
          border-radius: 10px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .btn-next-bill {
          background: #2563EB;
          color: #fff;
          border: none;
          padding: 0.75rem;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
      `}</style>

      <div className="tinder-header">
        <span className="tinder-badge">
          <Scale size={13} />
          Voc� � o Deputado
        </span>
        <h2 className="tinder-title">Como Voc� Votaria Hoje?</h2>
        <p className="tinder-desc">
          Vote nos projetos de lei em pauta e compare com a posi��o oficial do parlamentar.
        </p>
      </div>

      <div className="bill-card">
        <div className="bill-meta-row">
          <span className="bill-number">{currentBill.numero}</span>
          <span className="bill-cat">{currentBill.categoria}</span>
        </div>

        <h3 className="bill-title">{currentBill.titulo}</h3>
        <p className="bill-summary">{currentBill.resumo}</p>

        {/* TRADUTOR DE JURIDIQU�S */}
        {!explanation ? (
          <button 
            className="btn-translate-ia"
            onClick={handleTranslateIA}
          >
            <Sparkles size={14} />
            {translating ? 'Traduzindo texto jur�dico...' : '( Explicar como isso afeta meu bolso'}
          </button>
        ) : (
          <div className="ia-explanation-box">
            <div className="ia-topic">
              <strong>Na pr�tica:</strong>
              <span>{explanation.pratica}</span>
            </div>
            <div className="ia-topic">
              <strong>Quem ganha:</strong>
              <span>{explanation.beneficiados}</span>
            </div>
            <div className="ia-topic">
              <strong>Impacto no bolso:</strong>
              <span>{explanation.custo}</span>
            </div>
          </div>
        )}

        {/* BOT�ES DE VOTO */}
        {!showResult ? (
          <div className="vote-actions-row">
            <button 
              className="btn-vote btn-contra"
              onClick={() => handleVote('Contra')}
            >
              <ThumbsDown size={18} />
              Votar CONTRA
            </button>
            <button 
              className="btn-vote btn-favor"
              onClick={() => handleVote('A Favor')}
            >
              <ThumbsUp size={18} />
              Votar A FAVOR
            </button>
          </div>
        ) : (
          /* RESULTADO & ALINHAMENTO COM O DEPUTADO */
          <div className="vote-result-box">
            <div className="result-row">
              <span>Seu voto:</span>
              <strong style={{ color: userVotes[currentBill.id] === 'A Favor' ? '#10B981' : '#EF4444' }}>
                {userVotes[currentBill.id]}
              </strong>
            </div>

            <div className="result-row">
              <span>Popula��o da cidade:</span>
              <strong style={{ color: '#38BDF8' }}>
                {currentBill.popularAprovacao}% votaram A Favor
              </strong>
            </div>

            <div className="deputado-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Posi��o Oficial do Deputado:</span>
                <strong style={{ color: currentBill.votoDeputado === 'A Favor' ? '#10B981' : '#EF4444', fontSize: '0.88rem' }}>
                  {currentBill.votoDeputado}
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#E2E8F0', fontStyle: 'italic' }}>
                "{currentBill.deputadoJustificativa}"
              </p>
            </div>

            <button className="btn-next-bill" onClick={handleNext}>
              Pr�ximo Projeto de Lei
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

