import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Award } from 'lucide-react';
import PlacementsSection from '../components/home/PlacementsSection';
import LatestNewsSection from '../components/home/LatestNewsSection';

export default function HomePage() {
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [campusRevealed, setCampusRevealed] = useState(false);
  const heroImgRef = useRef(null);

  useEffect(() => {
    // 1. Text & CTA entrance animations
    const textTimer = setTimeout(() => {
      setHeroAnimated(true);
    }, 280);

    // 2. Automatic mobile campus reveal animation
    // On mobile phone load or reload, begins zoomed in on the white college building
    // and smoothly, automatically pulls back to reveal the complete campus.
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      return () => clearTimeout(textTimer);
    }

    let revealTimer;
    const triggerCampusReveal = () => {
      // 350ms delay gives time for initial paint / brand loader fade before pulling back
      revealTimer = setTimeout(() => {
        setCampusRevealed(true);
      }, 350);
    };

    const img = heroImgRef.current;
    if (img && img.complete) {
      triggerCampusReveal();
    } else if (img) {
      img.addEventListener('load', triggerCampusReveal, { once: true });
    } else {
      triggerCampusReveal();
    }

    return () => {
      clearTimeout(textTimer);
      if (revealTimer) clearTimeout(revealTimer);
      if (img) img.removeEventListener('load', triggerCampusReveal);
    };
  }, []);

  const scrollToPrincipal = (e) => {
    e.preventDefault();
    const elem = document.getElementById('principal-section');
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="tec-homepage-root" style={{ width: '100%', overflowX: 'hidden' }}>
      {/* 1. CAMPUS HERO WITH INTEGRATED RESPONSIVE CONTENT OVERLAY */}
      <section 
        className={`tec-homepage-fullwidth-hero ${heroAnimated ? 'hero-animated' : ''} ${campusRevealed ? 'campus-revealed' : ''}`}
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 135px)',
          minHeight: '540px',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#0a1d37',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
        aria-label="Tirumala Engineering College Campus Panorama"
      >
        {/* Ambient background blur layer for mobile portrait composition */}
        <img
          src="/campus_panorama.png"
          alt=""
          aria-hidden="true"
          className="tec-hero-panorama-bg"
        />

        {/* Single primary campus panorama image */}
        <img
          ref={heroImgRef}
          src="/campus_panorama.png"
          alt="Tirumala Engineering College Campus Panorama"
          className="tec-hero-panorama-img"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '35% 28%',
            display: 'block',
            margin: 0,
            padding: 0,
            border: 'none',
            zIndex: 1
          }}
        />

        {/* Directional gradient overlay ensuring readability while keeping the building & sunlight sunny and clear */}
        <div 
          className="tec-hero-gradient-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(5, 20, 45, 0.72) 0%, rgba(5, 20, 45, 0.45) 45%, rgba(5, 20, 45, 0.05) 85%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Hero Content rendered cleanly on both desktop and mobile */}
        <div 
          className="container tec-hero-content-wrapper"
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 'clamp(1.5rem, 4vh, 3.5rem)',
            paddingBottom: 'clamp(1.5rem, 4vh, 3.5rem)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ maxWidth: '640px', color: '#ffffff' }}>
            {/* Top Pill Badge */}
            <div 
              className="hero-anim-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(5, 29, 59, 0.65)',
                border: '1px solid rgba(245, 158, 11, 0.55)',
                borderRadius: '9999px',
                marginBottom: '0.85rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                boxSizing: 'border-box'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block', flexShrink: 0 }} />
              <span 
                className="tec-hero-pill-text-desktop"
                style={{
                  fontSize: 'clamp(0.66rem, 1.3vw, 0.78rem)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#ffffff'
                }}
              >
                TIRUMALA ENGINEERING COLLEGE • AUTONOMOUS • EAPCET CODE: TMLN
              </span>
              <span 
                className="tec-hero-pill-text-mobile"
                style={{
                  display: 'none',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#ffffff'
                }}
              >
                AUTONOMOUS • EAPCET: TMLN
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className="hero-anim-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.65rem, 3.8vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: '0 0 0.85rem 0',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.75)'
              }}
            >
              Engineering Education<br />
              <span style={{ color: '#fbbf24' }}>with Discipline and Purpose</span>
            </h1>

            {/* Supporting Description */}
            <p 
              className="hero-anim-desc"
              style={{
                fontSize: 'clamp(0.85rem, 1.25vw, 0.98rem)',
                lineHeight: 1.55,
                color: '#faf9f6',
                margin: '0 0 1.35rem 0',
                maxWidth: '560px',
                fontWeight: 500,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)'
              }}
            >
              Affiliated with JNTUK and accredited by NAAC and NBA. We offer practical laboratory training, ₹60L annual merit scholarships, and focused placement preparation that secured 910 offers in 2025–2026.
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
                  gap: '0.5rem',
                  justifyContent: 'center',
                  backgroundColor: '#f59e0b',
                  color: '#051d3b',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  padding: '0.7rem 1.4rem',
                  minHeight: '44px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Explore B.Tech Courses</span>
                <ArrowRight size={17} />
              </Link>

              {/* Secondary CTA */}
              <button
                onClick={scrollToPrincipal}
                className="tec-btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  justifyContent: 'center',
                  backgroundColor: '#0a1d37',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  padding: '0.7rem 1.35rem',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: '1px solid #e5e2dc',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Principal's Message</span>
                <ChevronDown size={17} />
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
          <div className="tec-quicklinks-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9e9a91', fontSize: '0.82rem', fontWeight: 600 }}>
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
          backgroundColor: '#fbfaf8',
          padding: 'clamp(1.5rem, 3vh, 2.5rem) 0',
          borderTop: '1px solid #e5e2dc',
          borderBottom: '1px solid #e5e2dc',
          position: 'relative',
          scrollMarginTop: '135px'
        }}
        aria-label="Principal's Message"
      >
        <div className="container">
          {/* Section Heading - Clean without redundant eyebrow label */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)' }}>
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
              color: '#524f49',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.5
            }}>
              Guiding students with academic discipline, practical industry skills, and ethical values.
            </p>
            <div style={{ width: '48px', height: '3px', backgroundColor: '#f59e0b', margin: '0.9rem auto 0 auto', borderRadius: '2px' }} />
          </div>

          {/* 3-Column Desktop / Responsive Editorial Layout with Centered Portrait */}
          <div className="tec-principal-grid">
            
            {/* COLUMN 1: Left Editorial Content */}
            <div className="tec-principal-col">
              {/* Teaching and Learning */}
              <div className="tec-content-card">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: '0 0 0.45rem 0', lineHeight: 1.25 }}>
                  Teaching and Learning
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#524f49', lineHeight: 1.65, margin: 0 }}>
                  Dr. Y. V. Narayana oversees the academic standards at Tirumala Engineering College, focusing on practical laboratory coursework, autonomous curriculum updates aligned with industry demands, and continuous faculty development to ensure students understand core engineering concepts thoroughly.
                </p>
              </div>

              {/* Thin Neutral Divider */}
              <div className="tec-card-divider" />

              {/* Our Educational Mission */}
              <div className="tec-content-card">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: '0 0 0.45rem 0', lineHeight: 1.25 }}>
                  Our Educational Mission
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#524f49', lineHeight: 1.65, margin: 0 }}>
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
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e2dc',
                textAlign: 'center'
              }}>
                {/* Portrait Image */}
                <div style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0a3d78',
                  aspectRatio: '16/11',
                  maxHeight: '260px'
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
                <div style={{ padding: '0.85rem 0.5rem 0.5rem 0.5rem' }}>
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
                  <div style={{ fontSize: '0.78rem', color: '#6e6a62', fontWeight: 600, lineHeight: 1.45, marginBottom: '0.85rem' }}>
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

                  {/* Direct link to dedicated Principal Desk page */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <Link
                      to="/about/principal"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.42rem 0.9rem',
                        backgroundColor: '#0a3d78',
                        color: '#fbbf24',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                      className="tec-principal-view-full-btn"
                    >
                      <span>Read Full Message & Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Right Editorial Content */}
            <div className="tec-principal-col">
              {/* Practical Training and Student Life */}
              <div className="tec-content-card">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: '0 0 0.45rem 0', lineHeight: 1.25 }}>
                  Practical Training and Student Life
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#524f49', lineHeight: 1.65, margin: 0 }}>
                  Engineering education at TEC goes beyond textbooks. Students participate in hands-on technical workshops, department symposiums, sports, and soft-skills training designed to build real workplace readiness, team cooperation, and personal discipline.
                </p>
              </div>

              {/* Thin Neutral Divider */}
              <div className="tec-card-divider" />

              {/* Advice to Students */}
              <div className="tec-content-card">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0a3d78', margin: '0 0 0.45rem 0', lineHeight: 1.25 }}>
                  Advice to Students
                </h3>
                <blockquote style={{
                  margin: '0 0 0.65rem 0',
                  paddingLeft: '0.85rem',
                  borderLeft: '3px solid #f59e0b',
                  fontStyle: 'italic',
                  fontSize: '0.92rem',
                  color: '#211f1c',
                  fontWeight: 600,
                  lineHeight: 1.55
                }}>
                  "The only place where success comes before work is in the dictionary."
                </blockquote>
                <p style={{ fontSize: '0.92rem', color: '#524f49', lineHeight: 1.65, margin: 0 }}>
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

        .hero-anim-eyebrow,
        .hero-anim-heading,
        .hero-anim-desc,
        .hero-anim-actions {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .hero-animated .hero-anim-eyebrow {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.08s;
        }
        .hero-animated .hero-anim-heading {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        .hero-animated .hero-anim-desc {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.32s;
        }
        .hero-animated .hero-anim-actions {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.44s;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-anim-eyebrow,
          .hero-anim-heading,
          .hero-anim-desc,
          .hero-anim-actions {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Hover and Focus States for Hero CTAs - Neutral shadows only */
        .tec-btn-primary:hover {
          background-color: #d97706 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35) !important;
        }
        .tec-btn-primary:focus-visible {
          outline: 3px solid #f59e0b;
          outline-offset: 3px;
        }
        .tec-btn-secondary:hover {
          background-color: #12284c !important;
          border-color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28) !important;
        }
        .tec-btn-secondary:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 3px;
        }

        /* Principal Grid: 3-column desktop layout with centered portrait */
        .tec-principal-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr 1.15fr;
          gap: clamp(1.25rem, 2.2vw, 2.25rem);
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

        .tec-card-divider {
          height: 1px;
          background-color: #e5e2dc;
          margin: 1.25rem 0;
        }

        /* Hero Dynamic Gradient Overlay */
        .tec-hero-gradient-overlay {
          background: linear-gradient(135deg, rgba(5, 29, 59, 0.9) 0%, rgba(5, 29, 59, 0.65) 48%, rgba(5, 29, 59, 0.12) 80%);
        }

        /* Ambient mobile background layer hidden on desktop */
        .tec-hero-panorama-bg {
          display: none;
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
          color: #faf9f6;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          min-height: 40px;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.14);
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
        .tec-principal-view-full-btn:hover {
          background-color: #0e2154 !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transform: translateY(-1px);
        }

        /* Desktop: Section fills viewport perfectly with vertical centering */
        @media (min-width: 861px) {
          #principal-section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
          }
        }

        /* Responsive Breakpoints */
        /* Maintain 3-column desktop layout; only collapse on tablet/mobile <= 860px */
        @media (max-width: 860px) {
          .tec-principal-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .tec-principal-portrait-col {
            order: -1;
            max-width: 440px;
            margin: 0 auto;
            width: 100%;
          }
          .tec-card-divider {
            margin: 1rem 0;
          }
        }

        @media (max-width: 768px) {
          /* Remove Quick Links on mobile as requested */
          .tec-quicklinks-section {
            display: none !important;
          }

          .tec-hero-pill-text-desktop {
            display: none !important;
          }
          .tec-hero-pill-text-mobile {
            display: inline !important;
          }

          /* Ambient background layer: synchronized subtle pullback to unify the entire scene */
          .tec-hero-panorama-bg {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: 45.3% 35% !important;
            filter: blur(10px) brightness(0.72) saturate(1.1) !important;
            transform-origin: 45.3% 70% !important;
            transform: scale(1.22) !important;
            transition: transform 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
            z-index: 1 !important;
            pointer-events: none !important;
          }
          .campus-revealed .tec-hero-panorama-bg {
            transform: scale(1.06) !important;
          }

          /* Dynamic mobile hero: displays the complete college panorama in natural aspect ratio */
          .tec-homepage-fullwidth-hero {
            position: relative !important;
            height: auto !important;
            min-height: clamp(420px, calc(240px + 45.3vw), 530px) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
          }

          /* Sharp foreground panorama: starts with exact reference image composition (close-up building + courts) and pulls back to full panorama */
          .tec-hero-panorama-img {
            position: absolute !important;
            top: auto !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 1864 / 844 !important;
            object-fit: fill !important;
            z-index: 2 !important;
            transform-origin: 45.3% 90% !important;
            transform: scale(2.30) !important;
            will-change: transform;
            transition: transform 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.8) 32%, black 48%, black 100%) !important;
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.8) 32%, black 48%, black 100%) !important;
          }

          .campus-revealed .tec-hero-panorama-img {
            transform: scale(1.0) !important;
          }

          /* Seamless gradient overlay ensuring text contrast without layer seam */
          .tec-hero-gradient-overlay {
            position: absolute !important;
            inset: 0 !important;
            z-index: 3 !important;
            pointer-events: none !important;
            background: linear-gradient(180deg, 
              rgba(5, 29, 59, 0.82) 0%, 
              rgba(5, 29, 59, 0.45) 38%, 
              rgba(5, 29, 59, 0.10) 68%, 
              transparent 88%) !important;
          }

          /* Ensure Principal's section does not overlap */
          #principal-section {
            position: relative !important;
            z-index: 5 !important;
            clear: both !important;
          }
          .tec-hero-content-wrapper {
            padding-top: clamp(0.75rem, 2.2vh, 1.15rem) !important;
            padding-bottom: clamp(0.75rem, 2.2vh, 1.15rem) !important;
            padding-left: clamp(0.65rem, 3.5vw, 1rem) !important;
            padding-right: clamp(0.65rem, 3.5vw, 1rem) !important;
            box-sizing: border-box !important;
          }
          .hero-anim-eyebrow {
            margin-bottom: 0.4rem !important;
            padding: 0.22rem 0.6rem !important;
          }
          .hero-anim-heading {
            font-size: clamp(1.22rem, 5vw, 1.5rem) !important;
            line-height: 1.18 !important;
            margin-bottom: 0.4rem !important;
          }
          .hero-anim-desc {
            font-size: clamp(0.76rem, 2.6vw, 0.84rem) !important;
            line-height: 1.38 !important;
            margin-bottom: 0.7rem !important;
            max-width: 480px !important;
          }
          .hero-anim-actions {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 0.45rem !important;
            width: 100% !important;
          }
          .tec-btn-primary, .tec-btn-secondary {
            flex: 1 1 135px !important;
            justify-content: center !important;
            padding: 0.5rem 0.75rem !important;
            font-size: 0.8rem !important;
            min-height: 38px !important;
            border-radius: 7px !important;
          }
        }

        @media (max-width: 440px) {
          .hero-anim-eyebrow {
            white-space: normal !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tec-hero-panorama-img,
          .campus-revealed .tec-hero-panorama-img,
          .tec-hero-panorama-bg,
          .campus-revealed .tec-hero-panorama-bg {
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
