import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  GraduationCap, 
  Building2, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Briefcase, 
  Bus 
} from 'lucide-react';

export default function HomePage() {
  const { setLoginModalOpen, setLoginModalRole } = useAuth();

  const handleOpenLogin = (role = 'student') => {
    setLoginModalRole(role);
    setLoginModalOpen(true);
  };

  const { institution, founders, principal, bestPractices, departments, placements } = COLLEGE_AUDIT_DATA;

  return (
    <div className="home-page-container">
      {/* 1. Hero Banner with Campus Panorama */}
      <section className="hero-panorama-section" style={{
        position: 'relative',
        minHeight: '85vh',
        background: `linear-gradient(180deg, rgba(14, 33, 84, 0.88) 0%, rgba(10, 20, 50, 0.94) 100%), url('/campus_panorama.png') center/cover no-repeat`,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 1.5rem',
        overflow: 'hidden'
      }}>
        {/* Subtle grid pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              {/* Accreditations Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <span style={{ 
                  background: 'rgba(245, 158, 11, 0.2)', 
                  border: '1px solid #f59e0b', 
                  color: '#fbbf24', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  padding: '0.35rem 0.8rem', 
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Award size={14} /> AUTONOMOUS INSTITUTION
                </span>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.2)', 
                  border: '1px solid #10b981', 
                  color: '#34d399', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  padding: '0.35rem 0.8rem', 
                  borderRadius: '999px' 
                }}>
                  NAAC 'A' GRADE
                </span>
                <span style={{ 
                  background: 'rgba(59, 130, 246, 0.2)', 
                  border: '1px solid #3b82f6', 
                  color: '#93c5fd', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  padding: '0.35rem 0.8rem', 
                  borderRadius: '999px' 
                }}>
                  NBA ACCREDITED
                </span>
                <span style={{ 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  color: '#ffffff', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  padding: '0.35rem 0.8rem', 
                  borderRadius: '999px' 
                }}>
                  EAPCET CODE: TMLN
                </span>
              </div>

              <h1 style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
                fontWeight: 900, 
                lineHeight: 1.15, 
                color: '#ffffff',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                Tirumala Engineering College
              </h1>

              <p style={{ 
                fontSize: '1.15rem', 
                color: '#cbd5e1', 
                marginBottom: '1.75rem', 
                lineHeight: 1.6,
                maxWidth: '620px'
              }}>
                Founded in 2008 by the entrepreneurs of <strong>Tirumala Milk Products Pvt. Ltd.</strong> under Venkata Ramana Charitable Trust. Spread across 16 lush green picturesque acres in Jonnalagadda, Narasaraopet.
              </p>

              {/* Special Scholarship Callout */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                borderLeft: '4px solid #f59e0b',
                padding: '0.85rem 1.25rem',
                borderRadius: '0 8px 8px 0',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}>
                <Sparkles size={24} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#fef3c7', fontSize: '0.95rem' }}>
                    {institution.meritScholarshipCorpus}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    Awarded by Founders to recognize and reward rural academic talent.
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/admissions/procedure" className="btn btn-accent btn-lg" style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Admissions 2026</span>
                  <ArrowRight size={18} />
                </Link>

                <button 
                  onClick={() => handleOpenLogin('student')}
                  className="btn btn-outline-white btn-lg"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff' }}
                >
                  <GraduationCap size={18} />
                  <span>College Portal</span>
                </button>

                <Link to="/about/society" className="btn btn-outline-white btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff' }}>
                  <span>Origin Story</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Quick Institutional Highlights & Live Stats */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={20} style={{ color: '#38bdf8' }} />
                <span>Institutional Credentials</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f59e0b' }}>864+</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Record Placements / Yr</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#38bdf8' }}>₹60 L</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Annual Scholarships</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#10b981' }}>16 Acres</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Green Campus</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#a855f7' }}>35+</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Fleet Buses</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                  <strong>Key Affiliations & Approvals:</strong>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                    Permanently Affiliated to JNTUK Kakinada
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                    AICTE Approved & UGC 2(f) & 12(B) Recognized
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                    Applied Robot Control (ARC) Center of Excellence
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/about/principal" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  color: '#93c5fd',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  <span>Meet Principal Dr. Y. V. Narayana</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Urgent Live Bulletins & Circulars Ticker */}
      <section style={{ background: '#0e2154', color: '#ffffff', padding: '0.85rem 1.5rem', borderBottom: '3px solid #f59e0b' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ 
            background: '#ef4444', 
            color: '#ffffff', 
            fontWeight: 800, 
            fontSize: '0.75rem', 
            padding: '0.25rem 0.6rem', 
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            flexShrink: 0
          }}>
            <Sparkles size={13} /> LATEST UPDATES
          </div>
          <div style={{ flex: 1, fontSize: '0.85rem', color: '#e2e8f0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            <span>Proud to announce <strong>426+ Placements</strong> in MNCs this academic year!</span>
            <span style={{ margin: '0 0.8rem', color: '#f59e0b' }}>•</span>
            <span>JNTUK Sponsored FDP on Diffusion Models & Generative AI</span>
            <span style={{ margin: '0 0.8rem', color: '#f59e0b' }}>•</span>
            <span>B.Tech Category-B NRI / Management Quota Admissions Open</span>
            <span style={{ margin: '0 0.8rem', color: '#f59e0b' }}>•</span>
            <span>Pariksha Pe Charcha 2025 Celebrations with Hon'ble PM</span>
          </div>
          <Link to="/examination/notifications" style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <span>View All Notices</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* 3. Origin of the College — The Dairy Heritage & Gratitude to Rural Brethren */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              OUR FOUNDING HERITAGE
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 900, color: '#0e2154', marginTop: '0.5rem' }}>
              Origin of Tirumala Engineering College
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#f59e0b', margin: '1rem auto' }} />
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Founded in 2008 by five humble sons of the soil, the founders of <strong>Tirumala Milk Products Pvt. Ltd.</strong>, driven by deep gratitude to the dairy farmers who formed the backbone of their ₹1,500 Crore enterprise.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Transforming Rural Futures
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Once a dry and bleak area, Narasaraopet Division transformed itself into a vast lush green vista thanks to the Nagarjuna Sagar waters. The agricultural green revolution spawned a dairy white revolution, which the founders channeled into a knowledge revolution.
                </p>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  Through <strong>Venkata Ramana Charitable Trust</strong>, the management established this institution on a 16-acre picturesque landscape in Jonnalagadda. Today, with full autonomous status, NAAC 'A' grade, and an annual ₹60 Lakhs scholarship corpus, TEC stands as a beacon of academic excellence.
                </p>
              </div>

              {/* Unique Features List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={20} style={{ color: '#d97706', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>₹60 Lakhs Annual Merit Scholarships</span>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Briefcase size={20} style={{ color: '#2563eb', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>864+ Record Campus Placements</span>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Cpu size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>ARC Applied Robotics Center</span>
                </div>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bus size={20} style={{ color: '#7c3aed', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>35+ Buses Across 6 Corridors</span>
                </div>
              </div>
            </div>

            {/* Founders Showcase */}
            <div>
              <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154' }}>
                    Venkata Ramana Charitable Trust
                  </h3>
                  <Link to="/about/society" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}>
                    View All Trustees →
                  </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                  {founders.map((f, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                      <img 
                        src={f.image} 
                        alt={f.name}
                        style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.5rem', border: '2px solid #f59e0b' }}
                        onError={(e) => { e.target.src = '/college_assets/Picture5chairman.jpg'; }}
                      />
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0e2154' }}>{f.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 600 }}>{f.role}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#eff6ff', borderRadius: '8px', fontSize: '0.85rem', color: '#1e40af', lineHeight: 1.5 }}>
                  <strong>Trust Philanthropy:</strong> The founders believe that technical education should never be out of reach for a deserving child. Top 10 rankers in each branch receive cash scholarships directly from the trust.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Spotlight — Principal's Desk */}
      <section className="section" style={{ background: '#ffffff', padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ 
            background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', 
            borderRadius: '24px', 
            color: '#ffffff', 
            padding: '3.5rem', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(14, 33, 84, 0.25)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={principal.image} 
                    alt={principal.name}
                    style={{ 
                      width: '240px', 
                      height: '280px', 
                      objectFit: 'cover', 
                      borderRadius: '16px', 
                      border: '4px solid #f59e0b',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
                    }}
                    onError={(e) => { e.target.src = '/college_assets/Principal1.png'; }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#f59e0b',
                    color: '#0e2154',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap'
                  }}>
                    FOUNDER PRINCIPAL
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.2rem' }}>
                    {principal.name}
                  </h3>
                  <div style={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: 600 }}>
                    {principal.qualification}
                  </div>
                  <div style={{ color: '#93c5fd', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {principal.designation}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ 
                  background: 'rgba(245, 158, 11, 0.2)', 
                  color: '#fbbf24', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  MESSAGE FROM THE PRINCIPAL'S DESK
                </span>

                <blockquote style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#fef3c7', margin: '1.5rem 0', lineHeight: 1.6, fontWeight: 500 }}>
                  "{principal.quote}"
                </blockquote>

                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {principal.message}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Link to="/about/principal" className="btn btn-accent" style={{ fontWeight: 700 }}>
                    Read Complete Profile & Vision →
                  </Link>
                  <Link to="/about/why-tec" className="btn btn-outline-white" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff' }}>
                    Why Choose TEC?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Academic Departments Showcase */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              EXCELLENCE ACROSS DISCIPLINES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 900, color: '#0e2154', marginTop: '0.5rem' }}>
              Academic Departments & Programmes
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#2563eb', margin: '1rem auto' }} />
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Offering B.Tech & M.Tech programmes with modern laboratories, licensed software, and outcome-based curriculum.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {departments.map((dept) => (
              <div key={dept.code} style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.75rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}>
                      {dept.code.toUpperCase()}
                    </div>
                    <span style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px'
                    }}>
                      Intake: {dept.intake} Seats
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                    {dept.name}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                    <strong>HOD:</strong> {dept.hod.name} ({dept.hod.qual})
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {dept.vision.slice(0, 110)}...
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                    {dept.laboratories?.length || 4} Specialized Labs
                  </span>
                  <Link 
                    to={`/departments/${dept.code}`}
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: '#2563eb', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Explore</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Placement Track Record & Top Recruiters */}
      <section className="section" style={{ background: '#ffffff', padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              TRAINING & PLACEMENT CELL
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 900, color: '#0e2154', marginTop: '0.5rem' }}>
              Industry Placement Milestones
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#16a34a', margin: '1rem auto' }} />
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Transforming rural youth into corporate-ready engineers with consistent high-volume hiring and tier-1 packages.
            </p>
          </div>

          {/* Year-on-Year Placement Statistics Bar */}
          <div style={{ 
            background: '#0e2154', 
            borderRadius: '16px', 
            padding: '2.5rem', 
            color: '#ffffff', 
            marginBottom: '3rem',
            boxShadow: '0 10px 30px rgba(14, 33, 84, 0.15)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center', color: '#f59e0b' }}>
              Verified Campus Placements Track Record (Year on Year)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
              {placements.yearOnYear.slice(0, 8).map((p, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem 0.5rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#38bdf8' }}>{p.count}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem' }}>{p.year}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.3rem' }}>{p.highlight.slice(0, 24)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiters Carousel Grid */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
              Our Esteemed Corporate Recruiters
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Top multinational tech leaders and core engineering industries hiring TecnoCrats every year.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {placements.topRecruiters.slice(0, 8).map((rec, i) => (
              <div key={i} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {rec.name}
                  </div>
                  <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>
                    Package: {rec.package}
                  </div>
                </div>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                  <span>{rec.type}</span>
                  <span style={{ fontWeight: 700, color: '#2563eb' }}>{rec.selected} Selected</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/placements/statistics" className="btn btn-outline-primary btn-lg" style={{ fontWeight: 700 }}>
              View All Placement Records & Companies →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Best Practices & Campus Hallmarks */}
      <section className="section" style={{ background: '#f8fafc', padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <span style={{ color: '#9333ea', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              DISCIPLINE & HOLISTIC VALUES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 900, color: '#0e2154', marginTop: '0.5rem' }}>
              Institutional Best Practices & Hallmarks
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#9333ea', margin: '1rem auto' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {bestPractices.map((bp) => (
              <div key={bp.id} style={{
                background: '#ffffff',
                padding: '1.75rem',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(147, 51, 234, 0.1)',
                  color: '#9333ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  0{bp.id}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                  {bp.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
                  {bp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action / Admissions 2026 */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0e2154 0%, #1e40af 100%)', 
        color: '#ffffff', 
        padding: '4.5rem 1.5rem', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ 
            background: 'rgba(245, 158, 11, 0.2)', 
            color: '#fbbf24', 
            fontWeight: 800, 
            fontSize: '0.8rem', 
            padding: '0.35rem 0.9rem', 
            borderRadius: '999px',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            AP EAPCET / ECET COUNSELING CODE: TMLN
          </span>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
            Begin Your Engineering Journey at TEC
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Join 3,500+ aspiring engineers on a 16-acre serene campus with autonomous learning, tier-1 campus hiring, and ₹60 Lakhs merit scholarships.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/admissions/procedure" className="btn btn-accent btn-lg" style={{ fontWeight: 800 }}>
              Admissions Procedure & Quotas
            </Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg" style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff' }}>
              Contact Admissions Helpdesk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
