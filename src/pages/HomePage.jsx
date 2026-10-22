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
import PlacementsSection from '../components/home/PlacementsSection';
import LatestNewsSection from '../components/home/LatestNewsSection';

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
      {/* 1. CAMPUS HERO WITH NATURAL RESPONSIVE PROPORTIONS */}
      <section 
        className="tec-homepage-fullwidth-hero"
        style={{
          position: 'relative',
          width: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#001833',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'clamp(460px, 60vh, 580px)'
        }}
        aria-label="Campus Hero"
      >
        {/* Full-width panorama image */}
        <img
          src="/campus_panorama.png"
          alt="Tirumala Engineering College Campus Panorama"
          className="tec-hero-panorama-img"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
            margin: 0,
            padding: 0,
            border: 'none',
            zIndex: 1
          }}
        />

        {/* Dynamic gradient overlay to ensure readable contrast while keeping sunlight on the campus building */}
        <div 
          className="tec-hero-gradient-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Hero Content in normal document flow inside unified 1600px container */}
        <div 
          className="container tec-hero-content-wrapper"
          style={{
            position: 'relative',
            zIndex: 10,
            paddingTop: 'clamp(2.5rem, 6vh, 4.5rem)',
            paddingBottom: 'clamp(2.5rem, 6vh, 4.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div style={{ maxWidth: '640px', color: '#ffffff' }}>
            {/* Eyebrow */}
            <div 
              className="hero-anim-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(5, 29, 59, 0.88)',
                border: '1px solid rgba(245, 158, 11, 0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                marginBottom: '0.85rem'
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
              <span 
                className="tec-eyebrow-desktop"
                style={{
                  fontSize: 'clamp(0.66rem, 1.3vw, 0.76rem)',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#fef3c7'
                }}
              >
                Tirumala Engineering College • Autonomous • EAPCET Code: TMLN
              </span>
              <span 
                className="tec-eyebrow-mobile"
                style={{
                  display: 'none',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#fef3c7'
                }}
              >
                Autonomous • EAPCET: TMLN
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className="hero-anim-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.7rem, 3.4vw, 2.75rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: '0 0 0.75rem 0',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)'
              }}
            >
              Engineering Education<br />
              <span style={{ color: '#fbbf24' }}>with Discipline and Purpose</span>
            </h1>

            {/* Supporting Text: Full on desktop, simple crisp summary on mobile */}
            <p 
              className="hero-anim-desc tec-hero-desc-desktop"
              style={{
                fontSize: 'clamp(0.85rem, 1.25vw, 0.96rem)',
                lineHeight: 1.55,
                color: '#f1f5f9',
                margin: '0 0 1.25rem 0',
                maxWidth: '540px',
                fontWeight: 400,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
              }}
            >
              Affiliated with JNTUK and accredited by NAAC and NBA. We offer practical laboratory training, ₹60L annual merit scholarships, and focused placement preparation that secured 910 offers in 2025–2026.
            </p>
            <p 
              className="hero-anim-desc tec-hero-desc-mobile"
              style={{
                display: 'none',
                fontSize: '0.8rem',
                lineHeight: 1.4,
                color: '#fef3c7',
                margin: '0 0 0.85rem 0',
                fontWeight: 600,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.85)'
              }}
            >
              NAAC A+ & NBA Accredited Institution • 910 Placements
            </p>

            {/* Hero CTAs */}
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
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#f59e0b',
                  color: '#051d3b',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  padding: '0.7rem 1.35rem',
                  minHeight: '44px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Explore B.Tech Courses</span>
                <ArrowRight size={16} />
              </Link>

              {/* Secondary CTA */}
              <button
                onClick={scrollToPrincipal}
                className="tec-btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  padding: '0.7rem 1.3rem',
                  minHeight: '44px',
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
        </div>
      </section>

      {/* QUICK TASK BAR FOR STUDENTS & PARENTS */}
      <section
        className="tec-quicklinks-section"
        style={{
          width: '100%',
          backgroundColor: '#051d3b',
          borderBottom: '1px solid #0d4a91',
          padding: '0.85rem 0',
          position: 'relative',
          zIndex: 5
        }}
        aria-label="Quick Task Navigation"
      >
        <div 
          className="container tec-quicklinks-container"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div className="tec-quicklinks-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>
            <span style={{ color: '#fbbf24', fontWeight: 800 }}>Quick Links:</span>
            <span className="tec-quicklinks-desc">Direct access for students, parents, and recruiters</span>
          </div>

          <div className="tec-quicklinks-grid">
            <Link
              to="/admissions/procedure"
              className="tec-quicklink-btn"
            >
              <span>Admissions 2026</span>
            </Link>

            <Link
              to="/departments/cse"
              className="tec-quicklink-btn"
            >
              <span>B.Tech Programs</span>
            </Link>

            <a
              href="http://www.tecnrt.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="tec-quicklink-btn tec-quicklink-btn-accent"
            >
              <span>Exam Portal (tecnrt.ac.in)</span>
            </a>

            <Link
              to="/placements/statistics"
              className="tec-quicklink-btn"
            >
              <span>Placement Records</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL PRINCIPAL'S SECTION */}
      <section 
        id="principal-section"
        style={{
          width: '100%',
          backgroundColor: '#fbfbfd',
          padding: 'clamp(4rem, 8vw, 6.5rem) 0',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          scrollMarginTop: '80px'
        }}
        aria-label="Principal's Message"
      >
        <div className="container">
          {/* Section Eyebrow & Heading */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              color: '#d97706', 
              fontSize: '0.82rem', 
              fontWeight: 800, 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              <span>Principal's Message</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
              fontWeight: 800,
              color: '#0a3d78',
              letterSpacing: '-0.02em',
              margin: '0 0 0.5rem 0'
            }}>
              From the Principal's Desk
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#475569',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.5
            }}>
              Guiding students with academic discipline, practical industry skills, and ethical values.
            </p>
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
                    backgroundColor: '#e0f0fe',
                    color: '#0a3d78',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      ACADEMICS
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: 0, lineHeight: 1.25 }}>
                      Teaching and Learning
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  Dr. Y. V. Narayana oversees the academic standards at Tirumala Engineering College, focusing on practical laboratory coursework, autonomous curriculum updates aligned with industry demands, and continuous faculty development to ensure students understand core engineering concepts thoroughly.
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
                    backgroundColor: '#d1e7dd',
                    color: '#0f5132',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      OUR MISSION
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: 0, lineHeight: 1.25 }}>
                      Our Educational Mission
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  Founded to bring quality engineering education to students across the Palnadu region, TEC pairs affordable college education with disciplined campus life, modern computing labs, and active faculty mentorship so graduates can build stable, rewarding technical careers.
                </p>
              </div>
            </div>

            {/* COLUMN 2: Centered Prominent Portrait of Principal Sir */}
            <div className="tec-principal-portrait-col">
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '0.85rem',
                boxShadow: '0 10px 30px rgba(10, 61, 120, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                {/* Portrait Image */}
                <div style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0a3d78',
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
                    color: '#0a3d78',
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
                    backgroundColor: '#f0f7ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    color: '#0a3d78',
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
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: 0, lineHeight: 1.25 }}>
                      Practical Training and Student Life
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  Engineering education at TEC goes beyond textbooks. Students participate in hands-on technical workshops, department symposiums, sports, and soft-skills training designed to build real workplace readiness, team cooperation, and personal discipline.
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
                    backgroundColor: '#f0f7ff',
                    color: '#0a3d78',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Quote size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                      MESSAGE TO STUDENTS
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: 0, lineHeight: 1.25 }}>
                      Advice to Students
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
                  We advise our students to stay curious, attend classes regularly, and make full use of our campus labs and campus placement training. With consistent practice, honest effort, and respectful conduct, every student can achieve their career goals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CAMPUS PLACEMENTS STATISTICS */}
      <PlacementsSection />

      {/* 4. LATEST NEWS & UPDATES */}
      <LatestNewsSection />

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
          background-color: #a97519 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(192, 151, 72, 0.45) !important;
        }
        .tec-btn-primary:focus-visible {
          outline: 3px solid #d4a955;
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

        /* Hero Dynamic Gradient Overlay */
        .tec-hero-gradient-overlay {
          background: linear-gradient(135deg, rgba(5, 29, 59, 0.9) 0%, rgba(5, 29, 59, 0.65) 48%, rgba(5, 29, 59, 0.12) 80%);
        }

        /* Quick Links Grid */
        .tec-quicklinks-grid {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tec-quicklink-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          background-color: rgba(255, 255, 255, 0.08);
          color: #f8fafc;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          min-height: 40px;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .tec-quicklink-btn:hover {
          background-color: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }

        .tec-quicklink-btn-accent {
          background-color: rgba(245, 158, 11, 0.18) !important;
          color: #fbbf24 !important;
          font-weight: 700 !important;
          border: 1px solid rgba(245, 158, 11, 0.45) !important;
        }
        .tec-quicklink-btn-accent:hover {
          background-color: rgba(245, 158, 11, 0.28) !important;
          border-color: #fbbf24 !important;
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

        @media (max-width: 768px) {
          .tec-eyebrow-desktop {
            display: none !important;
          }
          .tec-eyebrow-mobile {
            display: inline !important;
          }
          .tec-hero-desc-desktop {
            display: none !important;
          }
          .tec-hero-desc-mobile {
            display: none !important; /* Decreased matter: kept very simple on mobile view only per user instruction */
          }
          /* College photo prominently visible with building in frame and clean fit without dead space */
          .tec-homepage-fullwidth-hero {
            min-height: auto !important;
            height: clamp(300px, 43vh, 350px) !important;
          }
          .tec-hero-panorama-img {
            transform: scale(1.68) !important;
            transform-origin: 82% 52% !important;
          }
          .tec-hero-gradient-overlay {
            background: linear-gradient(180deg, rgba(5, 29, 59, 0.72) 0%, rgba(5, 29, 59, 0.12) 45%, rgba(5, 29, 59, 0.65) 100%) !important;
          }
          .tec-hero-content-wrapper {
            padding-top: 1.15rem !important;
            padding-bottom: 1.15rem !important;
          }
          .hero-anim-heading {
            font-size: clamp(1.28rem, 5vw, 1.6rem) !important;
            line-height: 1.18 !important;
            margin-bottom: 0.85rem !important;
          }
        }

        @media (max-width: 640px) {
          .tec-quicklinks-container {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .tec-quicklinks-header {
            justify-content: space-between !important;
          }
          .tec-quicklinks-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }
          .tec-quicklink-btn {
            width: 100% !important;
            text-align: center !important;
            padding: 0.5rem 0.4rem !important;
            font-size: 0.78rem !important;
            white-space: normal !important;
          }
          .hero-anim-actions {
            gap: 0.55rem !important;
          }
          .tec-btn-primary, .tec-btn-secondary {
            padding: 0.6rem 0.95rem !important;
            font-size: 0.84rem !important;
            min-height: 42px !important;
          }
        }

        @media (max-width: 440px) {
          .hero-anim-eyebrow {
            white-space: normal !important;
          }
          .hero-anim-actions {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
          .tec-btn-primary, .tec-btn-secondary {
            flex: 1 1 auto !important;
            min-width: 140px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
