import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  ArrowRight, 
  ChevronRight, 
  Award, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Compass,
  ExternalLink,
  Users
} from 'lucide-react';

export default function HomePage() {
  const { setLoginModalOpen, setLoginModalRole } = useAuth();
  const { institution, principal, founders } = COLLEGE_AUDIT_DATA;

  const handleOpenLogin = (role = 'student') => {
    setLoginModalRole(role);
    setLoginModalOpen(true);
  };

  const chairman = founders && founders.length > 0 ? founders[0] : null;

  return (
    <div className="tec-homepage-redesign" style={{ backgroundColor: '#ffffff', color: 'var(--color-text-main)', minHeight: '100vh' }}>
      
      {/* =========================================================================
          1. CINEMATIC HERO SECTION
          ========================================================================= */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(145deg, #060e22 0%, #0c1c44 55%, #081433 100%)',
        color: '#ffffff',
        padding: '5.5rem 1.5rem 6.5rem',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Background Mesh */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 75%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Top Verification Pill */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(12px)',
              fontSize: '0.82rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: '#fef08a'
            }}>
              <Sparkles size={15} color="#f59e0b" />
              <span>Autonomous Institution • NAAC 'A' Grade • NBA Accredited • JNTUK Affiliated</span>
            </div>
          </div>

          {/* College Identity & Main Typography */}
          <div style={{ textAlign: 'center', maxWidth: '980px', margin: '0 auto 3.25rem' }}>
            <h2 style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#93c5fd',
              marginBottom: '0.75rem'
            }}>
              EAPCET / ECET Counseling Code: <strong style={{ color: '#fbbf24' }}>TMLN</strong>
            </h2>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.35rem, 5.2vw, 3.85rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              background: 'linear-gradient(180deg, #ffffff 30%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Tirumala Engineering College
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              color: '#e2e8f0',
              fontWeight: 400,
              maxWidth: '820px',
              margin: '0 auto 2.25rem'
            }}>
              Empowering rural youth with world-class technical education. Founded in 2008 by the visionaries of Tirumala Milk Products Pvt. Ltd. under the Venkata Ramana Charitable Trust.
            </p>

            {/* Hero Calls to Action */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
              <Link 
                to="/admissions/courses" 
                className="btn btn-primary btn-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <span>Explore Academic Programmes</span>
                <ArrowRight size={18} />
              </Link>

              <Link 
                to="/admissions/procedure" 
                className="btn btn-outline btn-lg"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.22)',
                  color: '#ffffff',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <span>Admissions 2026 Procedure</span>
              </Link>

              <button 
                onClick={() => handleOpenLogin('student')}
                className="btn btn-accent btn-lg"
                style={{
                  background: 'linear-gradient(135deg, #d97706, #b45309)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  boxShadow: '0 8px 20px rgba(217, 119, 6, 0.35)'
                }}
              >
                <Compass size={18} />
                <span>Portal Access</span>
              </button>
            </div>
          </div>

          {/* Principal Visual: Curated Campus Panorama Display */}
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            padding: '10px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 99, 235, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            maxWidth: '1160px',
            margin: '0 auto'
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              height: 'clamp(280px, 46vw, 480px)',
              backgroundColor: '#0a1633'
            }}>
              <img 
                src="/campus_panorama.png" 
                alt="Tirumala Engineering College Campus Panorama" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                  display: 'block'
                }}
              />
              
              {/* Subtle visual gradient edge on image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(6, 14, 34, 0.2) 0%, transparent 40%, rgba(6, 14, 34, 0.75) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Floating Panorama Badges */}
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(6, 14, 34, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                <MapPin size={16} color="#38bdf8" />
                <span>Jonnalagadda, Narasaraopet • 16+ Lush Green Acres</span>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(217, 119, 6, 0.85)',
                backdropFilter: 'blur(12px)',
                color: '#ffffff',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>
                <Award size={15} />
                <span>₹60 LAKHS ANNUAL SCHOLARSHIPS</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. INSTITUTIONAL HALLMARKS (CLEAN, MINIMAL METRIC PILLARS)
          ========================================================================= */}
      <section style={{
        marginTop: '-2.5rem',
        position: 'relative',
        zIndex: 5,
        padding: '0 1.5rem',
        maxWidth: '1240px',
        margin: '-2.5rem auto 5rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '1.75rem',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid var(--color-border)'
        }}>
          
          {/* Metric 1 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-950)' }}>
                ₹60 Lakhs
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-600)', marginBottom: '0.2rem' }}>
                Annual Merit Scholarship
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                Awarded directly to top 10 academic achievers per branch by Venkata Ramana Charitable Trust.
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-accent-50)',
              color: 'var(--color-accent-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-950)' }}>
                Autonomous
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-700)', marginBottom: '0.2rem' }}>
                JNTUK Kakinada Affiliated
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                Industry-centric R23 curriculum, continuous outcome-based evaluation & academic flexibility.
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-success-50)',
              color: 'var(--color-success-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-950)' }}>
                NAAC 'A' Grade
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-success-600)', marginBottom: '0.2rem' }}>
                NBA Accredited Departments
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                Recognized benchmark of excellence in infrastructure, laboratory standards, and teaching faculty.
              </p>
            </div>
          </div>

          {/* Metric 4 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#f3e8ff',
              color: '#7e22ce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Building2 size={24} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary-950)' }}>
                TMLN
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#7e22ce', marginBottom: '0.2rem' }}>
                State EAPCET / ECET Code
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                Top-tier technical choice in Palnadu region with 100% transparent merit-based counseling.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FOUNDING VALUES & LEADERSHIP NARRATIVE (SPACIOUS & ELEGANT)
          ========================================================================= */}
      <section style={{ padding: '2rem 1.5rem 5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Institutional Legacy */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-primary-700)',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}>
              <span>Our Roots & Philosophy</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--color-primary-950)',
              lineHeight: 1.25,
              marginBottom: '1.25rem'
            }}>
              Transforming Lives Through Technical Excellence & Integrity
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Tirumala Engineering College was established in 2008 by Sri Bolla Brahma Naidu and the pioneering promoters of Tirumala Milk Products Pvt. Ltd. through the Venkata Ramana Charitable Trust.
            </p>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Rising from rural roots, our founders understood that authentic community advancement comes through high-quality professional education. Today, TEC offers an enriching learning ecosystem combining rigor, ethical grounding, and expansive modern laboratory facilities.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--color-success-600)" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  Autonomous Outcome-Based Curriculum aligned with modern industry benchmarks
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--color-success-600)" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  State-of-the-Art Research Labs, R&D Cell, and active IIIC Industry Collaborations
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} color="var(--color-success-600)" />
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  Comprehensive transit network with college buses connecting 6 regional transit routes
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/about/society" className="btn btn-outline-primary">
                <span>Read Society & Founders Story</span>
                <ChevronRight size={16} />
              </Link>
              <Link to="/about/why-tec" className="btn btn-outline">
                <span>Why Choose TEC?</span>
              </Link>
            </div>
          </div>

          {/* Principal & Leadership Profile Card */}
          <div style={{
            position: 'relative',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid var(--color-border)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--color-primary-600)',
                flexShrink: 0,
                backgroundColor: '#ffffff'
              }}>
                <img 
                  src={principal.image || '/principal.png'} 
                  alt={principal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = '/principal.png'; }}
                />
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-950)' }}>
                  {principal.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary-700)', fontWeight: 600 }}>
                  {principal.qualification}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {principal.designation}
                </div>
              </div>
            </div>

            <blockquote style={{
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'var(--color-text-main)',
              lineHeight: 1.65,
              position: 'relative',
              paddingLeft: '1.25rem',
              borderLeft: '3px solid var(--color-accent-500)',
              marginBottom: '1.5rem'
            }}>
              "{principal.quote || 'The only place where success comes before work is in the dictionary. At TEC, we instill in our students the perseverance to turn aspirations into reality.'}"
            </blockquote>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Guided TEC to Autonomous Status & NAAC 'A'
              </span>
              <Link 
                to="/about/principal" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-primary-700)',
                  textDecoration: 'none'
                }}
              >
                <span>Principal's Desk</span>
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. INTENTIONAL GATEWAYS (MINIMAL DISCOVERY CARDS)
          ========================================================================= */}
      <section style={{
        backgroundColor: 'var(--color-bg-subtle)',
        padding: '5rem 1.5rem',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <span style={{
              color: 'var(--color-primary-700)',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Structured Academic Gateways
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 3vw, 2.4rem)',
              fontWeight: 800,
              color: 'var(--color-primary-950)',
              marginBottom: '0.85rem'
            }}>
              Explore Your Path at Tirumala
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Direct access to our verified academic branches, admission guidelines, career placements, and authenticated institutional management portals.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            
            {/* Gateway 1: Programmes */}
            <div className="card" style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}>
              <div>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-primary-50)',
                  color: 'var(--color-primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <BookOpen size={26} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--color-primary-950)' }}>
                  Academic Disciplines
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Explore 8 technical departments: CSE, AI&ML, ECE, EEE, Mechanical, Civil, IT, and Applied Sciences with autonomous R23 syllabi.
                </p>
              </div>
              <Link 
                to="/departments/cse" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--color-primary-700)',
                  textDecoration: 'none'
                }}
              >
                <span>View Departments</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Gateway 2: Admissions & Scholarships */}
            <div className="card" style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}>
              <div>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-accent-50)',
                  color: 'var(--color-accent-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Award size={26} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--color-primary-950)' }}>
                  Admissions 2026
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Convenor (Category-A) and Management (Category-B) quotas, transparent fee schedules, and the ₹60 Lakhs annual scholarship rules.
                </p>
              </div>
              <Link 
                to="/admissions/procedure" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--color-accent-600)',
                  textDecoration: 'none'
                }}
              >
                <span>Admission Guidelines</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Gateway 3: Training & Placements */}
            <div className="card" style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}>
              <div>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-success-50)',
                  color: 'var(--color-success-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Briefcase size={26} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--color-primary-950)' }}>
                  Career & Placements
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Proactive Training & Placement Cell collaborating with leading recruiters such as TCS, Wipro, Infosys, and emerging tech enterprises.
                </p>
              </div>
              <Link 
                to="/placements/overview" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--color-success-600)',
                  textDecoration: 'none'
                }}
              >
                <span>Placement Overview</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Gateway 4: Management Portals */}
            <div className="card" style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              border: '1.5px solid var(--color-primary-200, #bfdbfe)',
              boxShadow: '0 6px 24px rgba(37, 99, 235, 0.08)'
            }}>
              <div>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#eff6ff',
                  color: 'var(--color-primary-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Users size={26} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--color-primary-950)' }}>
                  College Portals
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Unified access for Student, Faculty, HOD, and Principal management dashboards with instant attendance, marks, and approvals.
                </p>
              </div>
              <button 
                onClick={() => handleOpenLogin('student')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--color-primary-600)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <span>Launch Portal Login</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SUBTLE CLOSING INVITATION & LOCATION SNAPSHOT
          ========================================================================= */}
      <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'var(--color-primary-950)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(8, 18, 41, 0.3)'
        }}>
          {/* Subtle Decorative Circle */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
            color: '#fbbf24'
          }}>
            <MapPin size={15} />
            <span>Jonnalagadda, Narasaraopet, Palnadu District, AP - 522601</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            maxWidth: '750px',
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Experience the Vibrant Campus Life at Tirumala Engineering College
          </h2>

          <p style={{
            fontSize: '1rem',
            color: '#cbd5e1',
            maxWidth: '650px',
            lineHeight: 1.6,
            marginBottom: '2.25rem'
          }}>
            Located just 5 km from Narasaraopet Bus Station, our eco-friendly 16+ acre campus provides an ideal environment for scholarly growth and technological innovation.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link 
              to="/admissions/contact" 
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: 'var(--color-primary-600)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>Contact Admissions Cell</span>
              <ArrowRight size={18} />
            </Link>

            <Link 
              to="/gallery" 
              className="btn btn-outline btn-lg"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <span>View Campus Gallery</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
