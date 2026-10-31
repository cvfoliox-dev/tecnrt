import React from 'react';

/**
 * TecLogoMotion — Choreographed Tirumala Engineering College Emblem
 * Designed with Pixel2Motion v2 applying Disney's 12 Animation Principles:
 * - Anticipation: Precision golden calibration arc
 * - Action: Official crimson seal draw-on (cubic-bezier(0.16, 1, 0.3, 1))
 * - Follow-Through: Specular light-sweep shimmer and subtle crest overshoot
 * - Settle: Golden resonance pulse dissolving into final static resting state
 * - Final Frame Contract: 100% identical to official emblem
 */
export default function TecLogoMotion({
  size = 180,
  variant = 'hero', // 'hero' | 'inline'
  className = '',
  style = {},
  showCaption = false,
  captionText = 'Tirumala Engineering College',
  subCaption = 'Technology • Excellence • Commitment'
}) {
  const isInline = variant === 'inline';
  const duration = isInline ? '1.4s' : '1.8s';

  return (
    <div
      className={`tec-logo-motion-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        ...style
      }}
      role="img"
      aria-label="Tirumala Engineering College Emblem"
    >
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          width="100%"
          height="100%"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(0 8px 24px rgba(11, 37, 69, 0.08))'
          }}
        >
          <defs>
            {/* Ambient Radial Backlight */}
            <radialGradient id="tec-motion-ambient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#133E87" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#0B2545" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0B2545" stopOpacity="0" />
            </radialGradient>

            {/* Shimmer Light-Sweep Gradient */}
            <linearGradient id="tec-motion-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Circular Clip for Inner Emblem */}
            <clipPath id="tec-motion-clip">
              <circle cx="510.5" cy="509" r="506" />
            </clipPath>
          </defs>

          {/* 1. Ambient collegiate halo */}
          <circle
            className="tec-halo"
            cx="512"
            cy="512"
            r="510"
            fill="url(#tec-motion-ambient)"
          />

          {/* 2. Golden resonance pulse ring (Settle) */}
          <circle
            className="tec-pulse"
            cx="512"
            cy="512"
            r="500"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="4"
          />

          {/* 3. Gold precision calibration ring (Anticipation) */}
          <circle
            className="tec-calibration"
            cx="510.5"
            cy="509"
            r="500"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray="12 8"
            pathLength="1"
          />

          {/* 4. Subtle inner navy accent ring */}
          <circle
            cx="510.5"
            cy="509"
            r="488"
            fill="none"
            stroke="#133E87"
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* 5. Core Authentic Master Emblem */}
          <g clipPath="url(#tec-motion-clip)" className="tec-core-emblem">
            <image
              href="/college_assets/tec_official_seal_clean.png"
              x="0"
              y="0"
              width="1024"
              height="1024"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>

          {/* 6. Vector Draw-On Official Crimson Seal Ring */}
          <circle
            className="tec-seal-stroke"
            cx="510.5"
            cy="509"
            r="499"
            fill="none"
            stroke="#D20057"
            strokeWidth="14"
            pathLength="1"
            strokeLinecap="round"
          />

          {/* 7. Diagonal Specular Shimmer Sweep */}
          <rect
            className="tec-shimmer-sweep"
            x="-512"
            y="-512"
            width="2048"
            height="2048"
            fill="url(#tec-motion-shimmer)"
            clipPath="url(#tec-motion-clip)"
            pointerEvents="none"
          />

          {/* 8. Crest apex glint sparkle */}
          <circle
            className="tec-glint-point"
            cx="502"
            cy="148"
            r="8"
            fill="#FFF9D2"
          />
        </svg>
      </div>

      {showCaption && (
        <div className="tec-motion-text" style={{ marginTop: '1.25rem' }}>
          <h2
            style={{
              fontSize: isInline ? '0.95rem' : '1.15rem',
              fontWeight: 700,
              color: '#0B2545',
              letterSpacing: '0.04em',
              margin: 0,
              textTransform: 'uppercase',
              fontFamily: "var(--font-heading)"
            }}
          >
            {captionText}
          </h2>
          {subCaption && (
            <p
              style={{
                fontSize: isInline ? '0.75rem' : '0.825rem',
                color: '#6e6a62',
                fontWeight: 600,
                letterSpacing: '0.08em',
                margin: '0.35rem 0 0 0',
                textTransform: 'uppercase',
                fontFamily: "var(--font-body)"
              }}
            >
              {subCaption}
            </p>
          )}
        </div>
      )}

      {/* Scoped CSS with literal de Casteljau cubic-bezier timings */}
      <style>{`
        .tec-halo {
          transform-box: fill-box;
          transform-origin: 512px 512px;
          animation: ${isInline ? 'tecHaloAnim 1.6s ease-in-out infinite alternate' : `tecHaloAnim ${duration} both`};
        }
        @keyframes tecHaloAnim {
          0% {
            opacity: 0.15;
            transform: scale(0.88);
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }
          65% {
            opacity: 0.85;
            transform: scale(1.0);
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }
          100% {
            opacity: 0.80;
            transform: scale(1.0);
          }
        }

        .tec-calibration {
          transform-box: fill-box;
          transform-origin: 510.5px 509px;
          animation: ${isInline ? 'tecCalibSpin 3s linear infinite' : `tecCalibAnim ${duration} both`};
          opacity: ${isInline ? '0.7' : 'undefined'};
        }
        @keyframes tecCalibSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes tecCalibAnim {
          0% {
            opacity: 0;
            stroke-dashoffset: 1;
            transform: rotate(-35deg);
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          20% {
            opacity: 0.9;
            stroke-dashoffset: 0;
            transform: rotate(0deg);
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }
          40% {
            opacity: 0.65;
            transform: rotate(10deg);
          }
          55% {
            opacity: 0;
            transform: rotate(18deg);
          }
          100% {
            opacity: 0;
          }
        }

        .tec-seal-stroke {
          transform-box: fill-box;
          transform-origin: 510.5px 509px;
          stroke-dasharray: 1;
          animation: tecSealAnim ${duration} both;
        }
        @keyframes tecSealAnim {
          0% {
            opacity: 0;
            stroke-dashoffset: 1;
          }
          20% {
            opacity: 1;
            stroke-dashoffset: 1;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 1;
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .tec-core-emblem {
          transform-box: fill-box;
          transform-origin: 510.5px 509px;
          animation: tecEmblemAnim ${duration} both;
        }
        @keyframes tecEmblemAnim {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(8px);
          }
          20% {
            opacity: 0.2;
            transform: scale(0.93) translateY(7px);
            animation-timing-function: cubic-bezier(0.34, 1.25, 0.64, 1);
          }
          65% {
            opacity: 1;
            transform: scale(1.012) translateY(-1.5px);
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }
          85% {
            opacity: 1;
            transform: scale(1.0) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1.0) translateY(0);
          }
        }

        .tec-shimmer-sweep {
          animation: tecShimmerAnim ${duration} both;
        }
        @keyframes tecShimmerAnim {
          0%, 45% {
            opacity: 0;
            transform: translate(-1000px, -1000px) rotate(-30deg);
          }
          48% {
            opacity: 0.7;
            animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          72% {
            opacity: 0.7;
            transform: translate(650px, 650px) rotate(-30deg);
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }
          80% {
            opacity: 0;
            transform: translate(900px, 900px) rotate(-30deg);
          }
          100% {
            opacity: 0;
          }
        }

        .tec-glint-point {
          transform-box: fill-box;
          transform-origin: 502px 148px;
          animation: tecGlintAnim ${duration} both;
        }
        @keyframes tecGlintAnim {
          0%, 58% {
            opacity: 0;
            transform: scale(0);
          }
          64% {
            opacity: 1;
            transform: scale(1.8);
            animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
          }
          76% {
            opacity: 0;
            transform: scale(0.2);
          }
          100% {
            opacity: 0;
          }
        }

        .tec-pulse {
          transform-box: fill-box;
          transform-origin: 512px 512px;
          animation: tecPulseAnim ${duration} both;
        }
        @keyframes tecPulseAnim {
          0%, 67% {
            opacity: 0;
            transform: scale(0.96);
          }
          68% {
            opacity: 0.85;
            transform: scale(0.98);
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }
          94% {
            opacity: 0;
            transform: scale(1.045);
          }
          100% {
            opacity: 0;
          }
        }

        .tec-motion-text {
          animation: tecTextFade ${duration} both;
        }
        @keyframes tecTextFade {
          0%, 35% {
            opacity: 0;
            transform: translateY(6px);
          }
          70% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Accessibility / prefers-reduced-motion fallback */
        @media (prefers-reduced-motion: reduce) {
          .tec-halo,
          .tec-calibration,
          .tec-seal-stroke,
          .tec-core-emblem,
          .tec-shimmer-sweep,
          .tec-glint-point,
          .tec-pulse,
          .tec-motion-text {
            animation: none !important;
          }
          .tec-core-emblem {
            opacity: 1 !important;
            transform: none !important;
          }
          .tec-seal-stroke {
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
          .tec-halo {
            opacity: 0.8 !important;
          }
          .tec-calibration,
          .tec-shimmer-sweep,
          .tec-glint-point,
          .tec-pulse {
            display: none !important;
          }
          .tec-motion-text {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
