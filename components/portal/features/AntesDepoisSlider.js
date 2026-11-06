'use client';
import { useState } from 'react';
import { Sliders, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function AntesDepoisSlider() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="slider-wrapper">
      <style jsx>{`
        .slider-wrapper {
          background: #12141C;
          border: 1px solid #1E2230;
          border-radius: 18px;
          padding: 1.75rem;
          width: 100%;
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1E2230;
          padding-bottom: 1rem;
        }

        .slider-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
        }

        .slider-container {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 14px;
          overflow: hidden;
          user-select: none;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .img-before, .img-after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .img-after-wrap {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          overflow: hidden;
          width: ${sliderPos}%;
        }

        .slider-divider-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: ${sliderPos}%;
          width: 4px;
          background: #38BDF8;
          box-shadow: 0 0 12px #38BDF8;
          cursor: ew-resize;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-handle-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2563EB;
          border: 2px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .badge-before {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(239, 68, 68, 0.85);
          color: #FFFFFF;
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 5;
        }

        .badge-after {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(16, 185, 129, 0.85);
          color: #FFFFFF;
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 5;
        }

        .slider-info-box {
          background: #0E1017;
          border: 1px solid #1E2230;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>

      <div className="slider-header">
        <div>
          <h3 className="slider-title">Antes & Depois da Ação do Gabinete</h3>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Arraste a barra para comparar a transformação</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>✓ Obra Concluída</span>
      </div>

      <div 
        className="slider-container"
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            setSliderPos((x / rect.width) * 100);
          }
        }}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const touch = e.touches[0];
          const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
          setSliderPos((x / rect.width) * 100);
        }}
      >
        {/* IMAGEM ANTES (FUNDO COMPLETO) */}
        <img 
          src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000&auto=format&fit=crop&q=80" 
          alt="Antes da obra" 
          className="img-before" 
        />
        <span className="badge-before">ANTES: Buracos & Escuridão</span>

        {/* IMAGEM DEPOIS (RECORTADA PELO SLIDER) */}
        <div className="img-after-wrap">
          <img 
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000&auto=format&fit=crop&q=80" 
            alt="Depois da obra" 
            className="img-after" 
          />
          <span className="badge-after">DEPOIS: Asfalto Novo e LED</span>
        </div>

        {/* LINHA DIVISÓRIA COM PEGADOR */}
        <div className="slider-divider-line">
          <div className="slider-handle-circle">↔</div>
        </div>
      </div>

      <div className="slider-info-box">
        <div>
          <strong style={{ color: '#F8FAFC', fontSize: '0.92rem' }}>Avenida Principal • Ceilândia Norte</strong>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#94A3B8' }}>Atendido via Ofício nº 402/2026 após 142 apoios de moradores locais.</p>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Entregue em 15 dias</span>
      </div>
    </div>
  );
}

