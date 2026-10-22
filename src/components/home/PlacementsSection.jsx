import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, ArrowRight } from 'lucide-react';

const PLACEMENT_STATS = [
  { year: '2015–2016', count: 174 },
  { year: '2016–2017', count: 195 },
  { year: '2017–2018', count: 220 },
  { year: '2018–2019', count: 426 },
  { year: '2019–2020', count: 493 },
  { year: '2020–2021', count: 603 },
  { year: '2021–2022', count: 800 },
  { year: '2022–2023', count: 812 },
  { year: '2023–2024', count: 885 },
  { year: '2024–2025', count: 891 },
  { year: '2025–2026...', count: 910 }
];

export default function PlacementsSection() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(PLACEMENT_STATS.map(item => item.count));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          if (prefersReducedMotion) {
            setCounts(PLACEMENT_STATS.map(item => item.count));
            return;
          }

          const duration = 2000; // 2 seconds smooth easing
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic curve: 1 - (1 - progress)^3
            const ease = 1 - Math.pow(1 - progress, 3);

            if (progress < 1) {
              setCounts(
                PLACEMENT_STATS.map(item => Math.min(item.count, Math.round(item.count * ease)))
              );
              requestAnimationFrame(animate);
            } else {
              // Ensure exact target numbers at completion
              setCounts(PLACEMENT_STATS.map(item => item.count));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="placements-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#071739',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(30, 64, 130, 0.35), transparent 70%), linear-gradient(180deg, #05142b 0%, #071739 50%, #0a1f46 100%)',
        color: '#ffffff',
        overflow: 'hidden'
      }}
      aria-label="Campus Placements Statistics"
    >
      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(3.5rem, 6vw, 5.5rem) 1.5rem'
        }}
      >
        {/* Original Marquee Announcement Banner */}
        <div
          style={{
            backgroundColor: 'rgba(7, 23, 57, 0.85)',
            border: '1.5px solid rgba(245, 158, 11, 0.55)',
            borderRadius: '9999px',
            padding: '0.6rem 1.25rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: '#f59e0b',
              color: '#071739',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              flexShrink: 0
            }}
          >
            <Award size={13} />
            <span>Placement Update</span>
          </div>

          <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div className="tec-marquee-scroll">
              <Link
                to="/placements/statistics"
                style={{
                  color: '#fef3c7',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'inline-block'
                }}
              >
                Proud to Announce 192+ Placements in Various Multi National Companies till date : Congratulations to all the Students who are selected
              </Link>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#fbbf24',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}
          >
            <TrendingUp size={16} />
            <span>Placements</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: '0 0 0.8rem 0'
            }}
          >
            Campus Placements
          </h2>

          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#f59e0b',
              margin: '0 auto 1rem auto',
              borderRadius: '2px'
            }}
          />

          <p
            style={{
              color: '#cbd5e1',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.02rem)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Year-wise placement records of Tirumala Engineering College students across leading multinational and engineering companies.
          </p>
        </div>

        {/* 11 Placement Counters Responsive Grid */}
        <div
          className="tec-placement-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {PLACEMENT_STATS.map((stat, index) => {
            const isLatest = index >= 8;
            return (
              <div
                key={stat.year}
                className="tec-counter-card"
                style={{
                  backgroundColor: isLatest ? 'rgba(14, 33, 84, 0.75)' : 'rgba(8, 23, 50, 0.65)',
                  border: isLatest
                    ? '1.5px solid rgba(245, 158, 11, 0.75)'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: isLatest
                    ? '0 10px 25px -4px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 8px 20px -4px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Academic Year Label */}
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: isLatest ? '#fbbf24' : '#cbd5e1',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                  }}
                >
                  {stat.year}
                </div>

                {/* Animated Placement Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.2rem, 3.8vw, 2.85rem)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.2rem',
                    margin: '0.2rem 0'
                  }}
                >
                  <span
                    className="tec-counter-value"
                    data-year={stat.year}
                    data-target={stat.count}
                  >
                    {counts[index]}
                  </span>
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#fbbf24'
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Counter Sub-label */}
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '0.35rem'
                  }}
                >
                  Offers
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Placement CTA */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <Link
            to="/placements/overview"
            className="tec-btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#f59e0b',
              color: '#051d3b',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '0.75rem 1.6rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>View Placement Cell and Recruiter List</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Scoped CSS for Marquee & Card Hover */}
      <style>{`
        .tec-counter-card:hover {
          transform: translateY(-4px);
          background-color: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(192, 151, 72, 0.6) !important;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .tec-marquee-scroll {
          display: inline-block;
          white-space: nowrap;
          animation: marqueeScroll 28s linear infinite;
        }

        .tec-marquee-scroll:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .tec-marquee-scroll {
            animation: none !important;
            transform: none !important;
          }
        }

        @media (max-width: 640px) {
          .tec-placement-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
        }

        @media (max-width: 360px) {
          .tec-placement-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
