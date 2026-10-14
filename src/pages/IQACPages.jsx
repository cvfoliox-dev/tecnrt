import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  FileText, 
  Users, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function IQACPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'about';
  if (path.includes('members') || path.includes('coordinator')) currentSection = 'members';
  else if (path.includes('minutes') || path.includes('aqar')) currentSection = 'minutes';
  else if (path.includes('naac') || path.includes('nba')) currentSection = 'naac';
  else if (path.includes('aicte')) currentSection = 'aicte';
  else if (path.includes('autonomous') || path.includes('ugc')) currentSection = 'autonomous';

  const { accreditations } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'about', label: 'About IQAC & Objectives', path: '/iqac/about' },
    { id: 'members', label: 'IQAC Composition & Coordinator', path: '/iqac/members' },
    { id: 'minutes', label: 'Minutes of Meeting & AQAR', path: '/iqac/minutes' },
    { id: 'naac', label: 'NAAC "A" Grade & NBA Accreditation', path: '/iqac/naac' },
    { id: 'aicte', label: 'AICTE Approvals (EOA)', path: '/iqac/aicte' },
    { id: 'autonomous', label: 'Autonomous Status & UGC 12(B)', path: '/iqac/autonomous' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>IQAC & Accreditation</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Internal Quality Assurance Cell (IQAC)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Upholding NAAC 'A' Grade, NBA Accreditation, Autonomous Rigor, and Academic Quality.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="iqac-layout-grid">
          {/* Subnav Sidebar */}
          <aside style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            height: 'fit-content',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0e2154', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.5rem 0.75rem', borderBottom: '1px solid #f1f5f9', marginBottom: '0.5rem' }}>
              IQAC Submenus
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    style={{
                      display: 'block',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#0e2154' : '#475569',
                      background: isActive ? '#eff6ff' : 'transparent',
                      borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                      textDecoration: 'none'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#eff6ff', borderRadius: '10px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>NAAC ACCREDITATION</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0e2154' }}>'A' GRADE</div>
              <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, marginTop: '0.2rem' }}>Valid up to 2027</div>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {/* 1. About IQAC */}
            {currentSection === 'about' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>QUALITY BENCHMARKING</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    About Internal Quality Assurance Cell (IQAC)
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2563eb', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
                  <p style={{ margin: 0 }}>
                    In pursuance of National Assessment and Accreditation Council (NAAC) guidelines, the IQAC at Tirumala Engineering College was established as a nodal agency for coordinating quality-related activities, developing pedagogical benchmarks, promoting academic audits, and fostering research culture across all academic departments.
                  </p>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Primary Objectives of IQAC:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.25rem' }}>Outcome-Based Education</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Systematic mapping of Course Outcomes (COs) with Program Outcomes (POs) and PSOs using rubrics.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.25rem' }}>Stakeholder Feedback System</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Collection and analysis of feedback from students, faculty, employers, parents, and alumni.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.25rem' }}>Annual Quality Audits</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Conducting internal and external academic and administrative audits (AAA) to sustain excellence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Members */}
            {currentSection === 'members' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>QUALITY COUNCIL</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    IQAC Committee Composition & Coordinator
                  </h2>
                </div>

                <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '1.15rem' }}>IQAC Coordinator: Dr. P. V. Ramana</div>
                  <div style={{ color: '#1e3a8a', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                    Professor, Department of Applied Science & Humanities • Phone: 9248443456 • Email: iqac@tecnrt.org
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  IQAC Executive Members
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Name</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Dr. Y. V. Narayana</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#d97706', fontWeight: 600 }}>Chairperson</td>
                        <td style={{ padding: '0.75rem 1rem' }}>Principal, TEC</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Sri. R. Satyanarayana</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb', fontWeight: 600 }}>Management Representative</td>
                        <td style={{ padding: '0.75rem 1rem' }}>Secretary & Correspondent</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Dr. K. Satish</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>Senior Faculty</td>
                        <td style={{ padding: '0.75rem 1rem' }}>Professor & HOD, CSE</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Dr. Jagadeesh Thati</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>Senior Faculty</td>
                        <td style={{ padding: '0.75rem 1rem' }}>Professor & HOD, ECE</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Mr. Ch. Nageswara Rao</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>Administrative Officer</td>
                        <td style={{ padding: '0.75rem 1rem' }}>Associate Professor, CSE</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Alumni Nominee</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#16a34a', fontWeight: 600 }}>Alumni Representative</td>
                        <td style={{ padding: '0.75rem 1rem' }}>Senior Software Engineer, TCS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. Minutes & AQAR */}
            {currentSection === 'minutes' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>AQAR ARCHIVE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    IQAC Minutes of Meetings & AQAR Reports
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Annual Quality Assurance Report (AQAR) 2023-2024</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Submitted to NAAC portal covering all 7 criteria</div>
                    </div>
                    <a href="/college_assets/docs/Result Analysis.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download AQAR PDF
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Academic Audit Report (2022-2023)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>External peer committee evaluation of teaching learning</div>
                    </div>
                    <a href="/college_assets/docs/Quality factors.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download Audit PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 4. NAAC & NBA */}
            {currentSection === 'naac' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>NATIONAL ACCREDITATION</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    NAAC 'A' Grade & NBA Accreditations
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontWeight: 900, color: '#166534', fontSize: '1.3rem', marginBottom: '0.3rem' }}>
                      NAAC 'A' Grade
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: 1.6, marginBottom: '1rem' }}>
                      Accredited by National Assessment and Accreditation Council (NAAC) with high institutional CGPA. Certificate valid up to 2027.
                    </div>
                    <a href="/college_assets/docs/NAAC certificate2027.pdf" target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#16a34a', color: '#ffffff', fontWeight: 700 }}>
                      <Download size={14} /> View NAAC Certificate
                    </a>
                  </div>

                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontWeight: 900, color: '#1e40af', fontSize: '1.3rem', marginBottom: '0.3rem' }}>
                      NBA Accredited
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.6, marginBottom: '1rem' }}>
                      Eligible Undergraduate B.Tech Programs accredited by National Board of Accreditation (NBA) under Tier-II Outcome Based Education.
                    </div>
                    <a href="/college_assets/docs/41-NBA-NAAC.pdf" target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#2563eb', color: '#ffffff', fontWeight: 700 }}>
                      <Download size={14} /> View NBA Documents
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 5. AICTE */}
            {currentSection === 'aicte' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>APEX TECHNICAL COUNCIL</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    AICTE Approvals (Extension of Approval - EOA)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Tirumala Engineering College has received continuous Extension of Approval (EOA) from AICTE, New Delhi since its inception in 2008 for all B.Tech and M.Tech programmes.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>AICTE Extension of Approval (EOA 2025-2026)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Sanctioned strength of 1,350+ seats</div>
                    </div>
                    <a href="/college_assets/docs/INTAKE AND FEE DETAILS 2025-26.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <Download size={14} /> Download EOA PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Autonomous & UGC 12(B) */}
            {currentSection === 'autonomous' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>UGC RECOGNITIONS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Autonomous Status, UGC 12(B) & JNTUK Permanent Affiliation
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.3rem' }}>UGC Autonomous Status</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
                      Conferred autonomous status by University Grants Commission (UGC) granting academic freedom to formulate R23 and R20 curriculum.
                    </p>
                    <a href="/college_assets/docs/UGC AUTONUMUS.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> View UGC Autonomous Order
                    </a>
                  </div>

                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.3rem' }}>UGC Section 12(B) & 2(f)</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
                      Recognized under section 12(B) and 2(f) of the UGC Act 1956 making TEC eligible for central research and developmental grants.
                    </p>
                    <a href="/college_assets/docs/UGC 12 B 4-4-2025.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> View 12(B) Notification
                    </a>
                  </div>

                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.3rem' }}>JNTUK Permanent Affiliation</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
                      Permanent affiliation orders issued by Jawaharlal Nehru Technological University Kakinada.
                    </p>
                    <a href="/college_assets/docs/Permanent.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> View Affiliation Order
                    </a>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .iqac-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
