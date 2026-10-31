import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_INFO } from '../../data/mockData';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  TrendingUp, 
  ChevronRight, 
  LogIn, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  Building2
} from 'lucide-react';

export default function HeroSection() {
  const { setLoginModalOpen, setLoginModalRole, quickSwitchRole } = useAuth();

  return (
    <section id="home" style={{ 
      position: 'relative', 
      background: '#0A1D37', 
      color: '#ffffff', 
      padding: '4.5rem 1.5rem 5.5rem', 
      overflow: 'hidden' 
    }}>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Hero Content */}
          <div>
            {/* Badges row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="badge badge-accent" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', fontWeight: 800 }}>
                <ShieldCheck size={15} /> AP EAPCET CODE: {COLLEGE_INFO.eamcetCode}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', color: '#93c5fd', border: '1px solid rgba(255,255,255,0.2)', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={14} style={{ color: '#10b981' }} /> NAAC 'A' Grade • NBA Accredited
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
              Excellence in Engineering & Technical Education
            </h1>

            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '580px' }}>
              Permanently affiliated to <strong>JNTUK, Kakinada</strong> and approved by <strong>AICTE</strong>. Fostering future innovators with 25+ acres of modern infrastructure, industry incubation, and the unified digital management portal.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button 
                onClick={() => { setLoginModalRole('student'); setLoginModalOpen(true); }}
                className="btn btn-primary btn-lg"
                style={{ boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
              >
                <LogIn size={18} />
                Access College Portal
              </button>

              <a 
                href="#departments" 
                className="btn btn-outline btn-lg"
                style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}
              >
                <BookOpen size={18} />
                Explore 8 B.Tech Programs
              </a>
            </div>

            {/* Quick trust metrics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Autonomous Student Workflow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Spreadsheet Attendance Engine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Role-Based Access Control</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div>
            <div style={{ 
              background: '#0e2154', 
              borderRadius: '24px', 
              border: '1px solid #1e3a6d', 
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Institution Emblem Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', border: '2px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={28} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff' }}>TIRUMALA ENGINEERING COLLEGE</div>
                    <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 600 }}>NARASARAOPET • COUNSELING CODE: TMLN</div>
                  </div>
                </div>
                <span className="badge badge-success">ACTIVE PORTAL</span>
              </div>

              {/* 4 Quick Role Portal Launchers */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  Interactive Role Portals (PRD Compliant)
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <button 
                    onClick={() => quickSwitchRole('student')}
                    style={{ textAlign: 'left', padding: '0.85rem', background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '12px', color: '#ffffff', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#93c5fd', marginBottom: '0.2rem' }}>
                      <GraduationCap size={16} /> Student View
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Attendance, Exam, Fees</div>
                  </button>

                  <button 
                    onClick={() => quickSwitchRole('faculty')}
                    style={{ textAlign: 'left', padding: '0.85rem', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', color: '#ffffff', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#fcd34d', marginBottom: '0.2rem' }}>
                      <Briefcase size={16} /> Faculty View
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Spreadsheet Uploads</div>
                  </button>

                  <button 
                    onClick={() => quickSwitchRole('hod')}
                    style={{ textAlign: 'left', padding: '0.85rem', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '12px', color: '#ffffff', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#d8b4fe', marginBottom: '0.2rem' }}>
                      <Building2 size={16} /> HOD View
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Department Oversight</div>
                  </button>

                  <button 
                    onClick={() => quickSwitchRole('principal')}
                    style={{ textAlign: 'left', padding: '0.85rem', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', color: '#ffffff', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#6ee7b7', marginBottom: '0.2rem' }}>
                      <Award size={16} /> Principal Suite
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Institution Analytics</div>
                  </button>
                </div>
              </div>

              {/* Institution Key Statistics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>
                    18.5 LPA
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Highest Package</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#3b82f6' }}>
                    88.4%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Placement Rate</div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                    3,450+
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Enrolled Scholars</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
