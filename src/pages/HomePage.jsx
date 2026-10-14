import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Compass, 
  Building2, 
  Quote, 
  ArrowRight, 
  ChevronDown, 
  Award
} from 'lucide-react';

export default function HomePage() {
  const scrollToPrincipal = (e) => {
    e.preventDefault();
    const elem = document.getElementById('principal-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="tec-homepage-root" style={{ width: '100%', overflowX: 'hidden' }}>
      {/* 1. CAMPUS HERO WITH ANIMATED TEXT OVERLAY */}
      <section 
        className="tec-homepage-fullwidth-hero"
        style={{
          position: 'relative',
          width: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#0a1633',
          lineHeight: 1
        }}
        aria-label="Campus Hero"
      >
        {/* Full-width panorama image */}
        <img
          src="/campus_panorama.png"
          alt="Tirumala Engineering College Campus Panorama"
          style={{
            width: '100%',
            height: 'calc(100vh - 96px)',
            minHeight: '520px',
            maxHeight: '900px',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            display: 'block',
            margin: 0,
            padding: 0,
            border: 'none'
          }}
        />

        {/* Subtle, restrained gradient overlay specifically targeting the top-left sky area to preserve text contrast */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(10, 22, 51, 0.46) 0%, rgba(10, 22, 51, 0.2) 42%, rgba(10, 22, 51, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Hero Animated Text Overlay (Positioned higher in the open sky area to clear all buildings) */}
        <div 
          className="tec-hero-content-overlay"
          style={{
            position: 'absolute',
            top: 'clamp(50px, 8vh, 85px)',
            left: 'clamp(1.5rem, 6vw, 5.5rem)',
            maxWidth: '620px',
            zIndex: 10,
            color: '#ffffff',
            paddingRight: '1rem'
          }}
        >
          {/* Eyebrow */}
          <div 
            className="hero-anim-eyebrow"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(8, 20, 50, 0.65)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              marginBottom: '0.85rem'
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
            <span style={{
              fontSize: 'clamp(0.68rem, 1.4vw, 0.76rem)',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fef3c7'
            }}>
              WELCOME TO TIRUMALA ENGINEERING COLLEGE
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="hero-anim-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 0.85rem 0',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)'
            }}
          >
            Shaping Knowledge.<br />
            <span style={{ color: '#fbbf24' }}>Building Futures.</span>
          </h1>

          {/* Supporting Text */}
          <p 
            className="hero-anim-desc"
            style={{
              fontSize: 'clamp(0.88rem, 1.5vw, 1.02rem)',
              lineHeight: 1.6,
              color: '#f1f5f9',
              margin: '0 0 1.35rem 0',
              maxWidth: '540px',
              fontWeight: 400,
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.55)'
            }}
          >
            Fostering technical innovation, ethical discipline, and outcome-based engineering education under UGC Autonomous status at Narasaraopet.
          </p>

          {/* CTAs */}
          <div 
            className="hero-anim-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.85rem'
            }}
          >
            {/* Primary CTA */}
            <Link
              to="/departments/cse"
              className="tec-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#f59e0b',
                color: '#0e2154',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '0.7rem 1.35rem',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Explore Departments</span>
              <ArrowRight size={16} />
            </Link>

            {/* Secondary CTA */}
            <button
              onClick={scrollToPrincipal}
              className="tec-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.92rem',
                padding: '0.7rem 1.3rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Principal's Message</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. SOPHISTICATED EDITORIAL-STYLE PRINCIPAL'S SECTION */}
      <section 
        id="principal-section"
        style={{
          width: '100%',
          backgroundColor: '#f8fafc',
          padding: 'clamp(4rem, 8vw, 6.5rem) 1.5rem',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          scrollMarginTop: '80px'
        }}
        aria-label="Principal's Desk and Institutional Leadership"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section Eyebrow & Heading */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              color: '#d97706', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              <span>INSTITUTIONAL LEADERSHIP & GUIDANCE</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
              fontWeight: 800,
              color: '#0e2154',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              From the Principal's Desk
            </h2>
            <div style={{ width: '48px', height: '3px', backgroundColor: '#f59e0b', margin: '0.9rem auto 0 auto', borderRadius: '2px' }} />
          </div>

          {/* 3-Column Desktop / Responsive Layout with Centered Portrait */}
          <div className="tec-principal-grid">
            
            {/* COLUMN 1: Left Content (Upper-Left & Lower-Left) */}
            <div className="tec-principal-col">
              {/* Upper-Left: Academic Leadership */}
              <div className="tec-content-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#eef2ff',
                    color: '#1e40af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      ACADEMIC LEADERSHIP
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', margin: 0, lineHeight: 1.25 }}>
                      Excellence in Pedagogy & Quality
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  Under the stewardship of the Principal, Tirumala Engineering College upholds rigorous teaching standards and outcome-based curriculum delivery. Continuous faculty development initiatives, sponsored research projects, and active participation in national symposiums ensure that classrooms stay aligned with contemporary technical education benchmarks.
                </p>
              </div>

              {/* Elegant Thin Divider */}
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }} />

              {/* Lower-Left: Institutional Vision */}
              <div className="tec-content-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      INSTITUTIONAL VISION
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', margin: 0, lineHeight: 1.25 }}>
                      Value-Driven Engineering Education
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  Founded with the committed vision of delivering disciplined, accessible, and high-caliber technical education to the Palnadu region, the institution focuses on nurturing students from rural and semi-urban backgrounds into competent, ethical engineers prepared for challenging professional careers across national and global domains.
                </p>
              </div>
            </div>

            {/* COLUMN 2: Centered Prominent Portrait of Principal Sir */}
            <div className="tec-principal-portrait-col">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '0.85rem',
                boxShadow: '0 10px 30px rgba(14, 33, 84, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                {/* Portrait Image */}
                <div style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0e2154',
                  aspectRatio: '16/10'
                }}>
                  <img 
                    src="/college_assets/Principal1.png"
                    alt="Dr. Y. V. Narayana, Principal of Tirumala Engineering College"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 35%',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Portrait Caption & Credentials */}
                <div style={{ padding: '1.2rem 0.5rem 0.6rem 0.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#0e2154',
                    margin: '0 0 0.25rem 0',
                    lineHeight: 1.2
                  }}>
                    Dr. Y. V. Narayana
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d97706', marginBottom: '0.45rem' }}>
                    Principal & Professor
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, lineHeight: 1.45, marginBottom: '0.85rem' }}>
                    M.Tech., Ph.D., MISTE, MIE, MCSI (UK)<br />
                    <span>28+ Years of Academic & Administrative Leadership</span>
                  </div>

                  {/* Institutional Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    color: '#334155',
                    fontWeight: 700
                  }}>
                    <Award size={13} style={{ color: '#f59e0b' }} />
                    <span>Founder Principal • UGC Autonomous</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Right Content (Upper-Right & Lower-Right) */}
            <div className="tec-principal-col">
              {/* Upper-Right: Student Development */}
              <div className="tec-content-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Compass size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      STUDENT DEVELOPMENT
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', margin: 0, lineHeight: 1.25 }}>
                      Technical Mastery & Discipline
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  A holistic educational environment balances technical knowledge with structured discipline, problem-solving habits, and hands-on laboratory immersion. Through student chapters, dedicated skill development modules, and co-curricular pursuits, learners are guided to cultivate the self-reliance and technical agility demanded by modern engineering workplaces.
                </p>
              </div>

              {/* Elegant Thin Divider */}
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }} />

              {/* Lower-Right: Message from the Principal */}
              <div className="tec-content-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    color: '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Quote size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      MESSAGE FROM THE PRINCIPAL
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', margin: 0, lineHeight: 1.25 }}>
                      A Word to Aspiring Engineers
                    </h3>
                  </div>
                </div>
                <blockquote style={{
                  margin: '0 0 0.65rem 0',
                  paddingLeft: '0.85rem',
                  borderLeft: '3px solid #f59e0b',
                  fontStyle: 'italic',
                  fontSize: '0.92rem',
                  color: '#1e293b',
                  fontWeight: 600,
                  lineHeight: 1.55
                }}>
                  "The only place where success comes before work is in the dictionary."
                </blockquote>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  Students are urged to recognize the value of continuous learning, responsible conduct, and persistent effort. By approaching each academic challenge with curiosity and commitment, young engineers build not only prosperous careers but also meaningful contributions to society and national progress.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Scoped CSS for Animations and Responsive Layout */}
      <style>{`
        /* Smooth Entrance Animations for Hero Text */
        @keyframes heroFadeRise {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-anim-eyebrow {
          animation: heroFadeRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .hero-anim-heading {
          animation: heroFadeRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }
        .hero-anim-desc {
          animation: heroFadeRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }
        .hero-anim-actions {
          animation: heroFadeRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-anim-eyebrow,
          .hero-anim-heading,
          .hero-anim-desc,
          .hero-anim-actions {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Hover and Focus States for Hero CTAs */
        .tec-btn-primary:hover {
          background-color: #d97706 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45) !important;
        }
        .tec-btn-primary:focus-visible {
          outline: 3px solid #fbbf24;
          outline-offset: 3px;
        }
        .tec-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.22) !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          transform: translateY(-2px);
        }
        .tec-btn-secondary:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 3px;
        }

        /* Principal Grid: 3-column desktop layout with centered portrait */
        .tec-principal-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr 1.15fr;
          gap: 2.75rem;
          align-items: center;
        }

        .tec-principal-col {
          display: flex;
          flex-direction: column;
        }

        .tec-principal-portrait-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .tec-principal-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .tec-principal-portrait-col {
            order: -1;
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .tec-hero-content-overlay {
            top: clamp(65px, 11vh, 100px) !important;
            left: 1.25rem !important;
            right: 1.25rem !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
