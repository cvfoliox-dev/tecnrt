import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  Building2, 
  Users, 
  Award, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Mail,
  Zap,
  Droplets,
  Sun,
  ShieldAlert
} from 'lucide-react';

export default function AboutPages() {
  const location = useLocation();
  const path = location.pathname;

  // Determine current active section
  let currentSection = 'society';
  if (path.includes('management')) currentSection = 'management';
  else if (path.includes('advisory')) currentSection = 'advisory';
  else if (path.includes('principal')) currentSection = 'principal';
  else if (path.includes('why-tec') || path.includes('whytec')) currentSection = 'why-tec';
  else if (path.includes('key-persons')) currentSection = 'key-persons';
  else if (path.includes('best-practices')) currentSection = 'best-practices';
  else if (path.includes('mous') || path.includes('mou')) currentSection = 'mous';
  else if (path.includes('strengths')) currentSection = 'strengths';
  else if (path.includes('visitors')) currentSection = 'visitors';
  else if (path.includes('safety')) currentSection = 'safety';
  else if (path.includes('facilities')) currentSection = 'facilities';

  const { institution, founders, principal, bestPractices } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'society', label: 'Society & Founders', path: '/about/society' },
    { id: 'management', label: "Management's Message", path: '/about/management' },
    { id: 'advisory', label: 'College Advisory Board', path: '/about/advisory' },
    { id: 'principal', label: "Principal's Desk", path: '/about/principal' },
    { id: 'why-tec', label: 'Why TEC? (Uniqueness)', path: '/about/why-tec' },
    { id: 'key-persons', label: 'Leadership & Key Persons', path: '/about/key-persons' },
    { id: 'best-practices', label: 'Best Practices & Hallmarks', path: '/about/best-practices' },
    { id: 'mous', label: 'MOUs & Collaborations', path: '/about/mous' },
    { id: 'strengths', label: 'SWOT & Strengths', path: '/about/strengths' },
    { id: 'visitors', label: 'Premier Persons Visited', path: '/about/visitors' },
    { id: 'safety', label: 'Safety & Discipline Policy', path: '/about/safety' },
    { id: 'facilities', label: 'Campus Facilities', path: '/about/facilities' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>About TEC</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            About Tirumala Engineering College
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Established in 2008 by the founders of Tirumala Milk Products Pvt. Ltd. under Venkata Ramana Charitable Trust.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="about-layout-grid">
          {/* Left Subnav Sidebar */}
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
              About Navigation
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
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>EAPCET / ECET CODE</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0e2154' }}>TMLN</div>
              <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, marginTop: '0.2rem' }}>Autonomous Institution</div>
            </div>
          </aside>

          {/* Right Main Content Panel */}
          <main style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {/* 1. Society & Founders */}
            {currentSection === 'society' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>FOUNDATIONAL TRUST</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Venkata Ramana Charitable Trust
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2563eb', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
                  <h4 style={{ color: '#0e2154', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Why "Venkata Ramana Charitable Trust"?
                  </h4>
                  <p style={{ margin: 0 }}>
                    After building <strong>Tirumala Milk Products Pvt. Ltd.</strong> into a major regional dairy enterprise, the founders created the Venkata Ramana Charitable Trust in 2008 to expand higher education opportunities in their native region. To support students from rural and agricultural backgrounds, the trust founded Tirumala Engineering College in Narasaraopet and instituted an annual merit scholarship corpus of <strong>₹60 Lakhs</strong> for top academic achievers.
                  </p>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '1.25rem' }}>
                  The Five Founders of the College
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {founders.map((f, i) => (
                    <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1rem', background: '#ffffff' }}>
                      <img 
                        src={f.image} 
                        alt={f.name}
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #f59e0b' }}
                        onError={(e) => { e.target.src = '/college_assets/Picture5chairman.jpg'; }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem' }}>{f.name}</div>
                        <div style={{ color: '#d97706', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>{f.role}</div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{f.message.slice(0, 110)}...</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '1rem' }}>Original Trust Documents</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Official legal deed and registration records of Venkata Ramana Charitable Trust</div>
                  </div>
                  <a href="/college_assets/docs/NEW TRUST DEED.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Download size={14} /> Download Trust Deed
                  </a>
                </div>
              </div>
            )}

            {/* 2. Management's Message */}
            {currentSection === 'management' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>MESSAGE FROM THE CHAIRMAN</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Management's Message
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src="/college_assets/Picture5chairman.jpg" 
                      alt="Sri Bolla Brahma Naidu" 
                      style={{ width: '180px', height: '220px', objectFit: 'cover', borderRadius: '12px', border: '3px solid #f59e0b', margin: '0 auto 1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                      onError={(e) => { e.target.src = '/college_assets/chairman.jpg'; }}
                    />
                    <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0e2154' }}>Sri Bolla Brahma Naidu</div>
                    <div style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem' }}>Chairman, Tirumala Engineering College</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>Founder, Tirumala Milk Products Pvt. Ltd.</div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                      Nurturing Talent from the Grassroots
                    </h3>
                    <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1rem' }}>
                      "When we founded Tirumala Engineering College in 2008, our ambition was not merely to construct buildings of brick and mortar, but to construct pathways to prosperous careers for our regional sons and daughters. We recognized that talent knows no geographical boundary; what rural students required was infrastructure on par with metropolitan institutes."
                    </p>
                    <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
                      "With permanent affiliation from JNTUK, autonomous governance, NAAC 'A' grade accreditation, and NBA recognition, TEC has validated that vision. We congratulate our students who achieved over 864+ placements in top multinational firms and invite aspiring engineers to make Tirumala their launchpad."
                    </p>
                  </div>
                </div>

                {/* Management Council Table */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Governing Management Council Members
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>S.No</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Name</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Designation</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {founders.map((f, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>{f.name}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#d97706', fontWeight: 600 }}>{f.role}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{f.phone} | {f.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. College Advisory Board */}
            {currentSection === 'advisory' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>ACADEMIC & INDUSTRIAL GUIDANCE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    College Advisory Board
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  The College Advisory Board comprises eminent academicians from premier universities, veteran corporate industrialists, and senior management trustees who convene periodically to steer curriculum modernization, R&D priorities, and industry internships.
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  1. Management Trustees
                </h3>
                <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.65rem 1rem' }}>Name</th>
                        <th style={{ padding: '0.65rem 1rem' }}>Designation in Board</th>
                        <th style={{ padding: '0.65rem 1rem' }}>Organization</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 700 }}>Sri. B. Brahma Naidu</td>
                        <td style={{ padding: '0.65rem 1rem', color: '#d97706', fontWeight: 600 }}>Chairman</td>
                        <td style={{ padding: '0.65rem 1rem' }}>Tirumala Engineering College</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 700 }}>Sri. B. Nageswara Rao</td>
                        <td style={{ padding: '0.65rem 1rem', color: '#d97706', fontWeight: 600 }}>Vice Chairman</td>
                        <td style={{ padding: '0.65rem 1rem' }}>Tirumala Engineering College</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 700 }}>Sri. R. Satyanarayana</td>
                        <td style={{ padding: '0.65rem 1rem', color: '#d97706', fontWeight: 600 }}>Secretary & Correspondent</td>
                        <td style={{ padding: '0.65rem 1rem' }}>Tirumala Engineering College</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 700 }}>Sri. D. Brahmanandam</td>
                        <td style={{ padding: '0.65rem 1rem', color: '#d97706', fontWeight: 600 }}>Treasurer</td>
                        <td style={{ padding: '0.65rem 1rem' }}>Tirumala Engineering College</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  2. Distinguished Academic Advisors & Experts
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154' }}>Dr. P. Udaya Bhaskar</div>
                    <div style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 600 }}>Former Chairman, APPSC & Professor, JNTUK</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>Academic Council Advisor</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154' }}>Dr. K. Hemachandra Reddy</div>
                    <div style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 600 }}>Chairman, APSCHE</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>Higher Education Policy Mentor</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154' }}>Dr. Y. V. Narayana</div>
                    <div style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 600 }}>Principal & Professor, TEC</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>Member Secretary</div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Principal's Desk */}
            {currentSection === 'principal' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INSTITUTIONAL HEAD</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Principal's Desk & Profile
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem', marginBottom: '2.5rem' }} className="principal-profile-grid">
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={principal.image} 
                      alt={principal.name}
                      style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '14px', border: '4px solid #f59e0b', boxShadow: '0 12px 25px rgba(0,0,0,0.1)' }}
                      onError={(e) => { e.target.src = '/college_assets/Principal1.png'; }}
                    />
                    <div style={{ marginTop: '1rem', textAlign: 'left', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', marginBottom: '0.4rem' }}>
                        <Phone size={14} style={{ color: '#2563eb' }} />
                        <span>08647 - 218164</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569' }}>
                        <Mail size={14} style={{ color: '#2563eb' }} />
                        <span>principal@tecnrt.org</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0e2154', marginBottom: '0.2rem' }}>
                      {principal.name}
                    </h3>
                    <div style={{ color: '#d97706', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                      {principal.qualification}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                      Principal, Tirumala Engineering College • Fellow of Institution of Engineers (FIE)
                    </div>

                    <blockquote style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#1e3a8a', background: '#eff6ff', padding: '1rem 1.25rem', borderRadius: '8px', borderLeft: '4px solid #2563eb', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      "{principal.quote}"
                    </blockquote>

                    <h4 style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                      Principal's Message to Students:
                    </h4>
                    <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1rem' }}>
                      {principal.message}
                    </p>
                    <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
                      At TEC, our academic work connects classroom instruction with practical laboratory experience. Our campus organizes annual technical symposiums (Prayaga), industrial robotics practice, IEEE student branch activities, and digital library resources to help students build solid technical foundations.
                    </p>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.75rem' }}>
                    Key Institutional Milestones Achieved Under Dr. Y. V. Narayana's Tenure:
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem' }}>
                    <li>Conferred Autonomous Status by UGC and Affiliated University JNTUK.</li>
                    <li>Accredited with 'A' Grade by National Assessment and Accreditation Council (NAAC).</li>
                    <li>National Board of Accreditation (NBA) recognition for eligible B.Tech programmes.</li>
                    <li>Highest campus placement tally crossing 864+ selections in a single academic year.</li>
                    <li>Establishment of APSSDC Skill Hub and European standard Applied Robot Control (ARC) Lab.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 5. Why TEC? */}
            {currentSection === 'why-tec' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>DISTINCTIVE EXCELLENCE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Why Tirumala Engineering College?
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem' }}>
                  In what way is TEC different? What makes it the preferred destination for EAPCET rankers and career-conscious faculty?
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={20} style={{ color: '#d97706' }} />
                      <span>₹60 Lakhs Merit Scholarship Corpus</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      No other institution in Palnadu / Guntur region offers a dedicated ₹60 Lakhs annual cash merit scholarship awarded directly to top 10 branch rankers without any middlemen.
                    </p>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Zap size={20} style={{ color: '#2563eb' }} />
                      <span>Outcome-Based Autonomous Curriculum</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Autonomous flexibility enables TEC to continually update syllabi (R23, R20) with AI, Full Stack Development, Cloud Computing, and EV Technologies in line with industry requirements.
                    </p>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldCheck size={20} style={{ color: '#16a34a' }} />
                      <span>Discipline & Focus Campus Culture</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Vande Mataram at 8:55 AM, Jana Gana Mana at 4:30 PM, prohibition of mobile phones in classrooms, and dedicated faculty proctors ensuring high moral and academic standards.
                    </p>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={20} style={{ color: '#9333ea' }} />
                      <span>Dedicated CRT from 2nd Year</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Continuous training by veteran corporate trainers in quantitative aptitude, soft skills, coding, and mock technical interviews leading to 864+ placement selections.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Leadership & Key Persons */}
            {currentSection === 'key-persons' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>ADMINISTRATIVE DIRECTORY</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Key Administrative Persons & Leadership Team
                  </h2>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>S.No</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Name & Designation</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Phone Number</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Official Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>1</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Sri Bolla Brahma Naidu (Chairman)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9848157536</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>tecnrt@gmail.com</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>2</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Sri B. Nageswara Rao (Vice Chairman)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9347101064</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>tecnrt@gmail.com</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>3</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Sri R. Satyanarayana (Secretary & Correspondent)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9848157583</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>sectec@tecnrt.org</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>4</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Dr. N. Venkata Rao (Joint Secretary)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9440273798</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>tecnrt@gmail.com</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>5</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Sri D. Brahmanandam (Treasurer)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9440263636</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>tecnrt@gmail.com</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>6</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Dr. Y. V. Narayana (Principal)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>08647-218164 / 9248752999</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>principal@tecnrt.org</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>7</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Administrative Officer (AO)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9133300228 / 9849803585</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>tec-ao@tecnrt.org</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>8</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>Controller of Examinations (CE)</td>
                        <td style={{ padding: '0.75rem 1rem' }}>9121214725 / 9705518818</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#2563eb' }}>tec-ce@tecnrt.org</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. Best Practices */}
            {currentSection === 'best-practices' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INSTITUTIONAL PRACTICES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Best Practices & Institutional Hallmarks
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bestPractices.map((bp) => (
                    <div key={bp.id} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0e2154', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, flexShrink: 0 }}>
                        {bp.id}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{bp.title}</div>
                        <div style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>{bp.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. MOUs & Collaborations */}
            {currentSection === 'mous' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INDUSTRY BRIDGES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Memorandums of Understanding (MOUs)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Our college has signed active MOUs with premier corporate houses, multinational technology leaders, and skill development bodies to conduct student internships, faculty development programs, and industrial certifications.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {[
                    { partner: "APSSDC (AP State Skill Dev. Corp.)", area: "Technical Certifications & CM Excellence Center", year: "Active Partner" },
                    { partner: "European Applied Robot Control (ARC)", area: "Industrial Robotics & Mechatronics Lab", year: "International MOU" },
                    { partner: "AWS Academy", area: "Cloud Architecture & Machine Learning Foundations", year: "Active Partner" },
                    { partner: "Red Hat Academy", area: "Enterprise Linux & Containerization Certifications", year: "Active Partner" },
                    { partner: "Oracle Academy", area: "Database Design, PL/SQL & Java Programming", year: "Active Partner" },
                    { partner: "Cisco Networking Academy", area: "CCNA, Cyber Ops & IoT Infrastructure", year: "Active Partner" },
                    { partner: "TCS iON", area: "Digital Assessment & Soft Skills Employability", year: "Active Partner" },
                    { partner: "Delphi TVS", area: "Core Mechanical & Electrical On-Site Internships", year: "Active Partner" }
                  ].map((mou, i) => (
                    <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem', marginBottom: '0.3rem' }}>{mou.partner}</div>
                      <div style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 600 }}>{mou.area}</div>
                      <div style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.5rem' }}>{mou.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. SWOT & Strengths */}
            {currentSection === 'strengths' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INSTITUTIONAL APPRAISAL</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Institutional Strengths & SWOT Analysis
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <h3 style={{ color: '#166534', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                      Strengths (S)
                    </h3>
                    <ul style={{ paddingLeft: '1.25rem', color: '#14532d', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                      <li>Spacious 16-acre built-up green campus with modern laboratories.</li>
                      <li>Visionary management backing with ₹60 Lakhs annual student scholarships.</li>
                      <li>Autonomous status enabling modern R23 & R20 curriculum alignment.</li>
                      <li>Proven placement track record with 864+ selections in a single year.</li>
                      <li>Comprehensive fleet of 35+ buses covering all major rural towns.</li>
                    </ul>
                  </div>

                  <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                    <h3 style={{ color: '#1e40af', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                      Opportunities (O)
                    </h3>
                    <ul style={{ paddingLeft: '1.25rem', color: '#1e3a8a', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                      <li>Rising demand for CSE (AI & ML) and specialized computing graduates.</li>
                      <li>Expansion of incubation cell to nurture rural agro-tech startups.</li>
                      <li>Collaborative research grants from AICTE, DST, and state bodies.</li>
                      <li>International student exchange and European robotics certifications.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 10. Premier Persons Visited */}
            {currentSection === 'visitors' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>EMINENT GUESTS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Premier Persons & Dignitaries Visited
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {[
                    { name: "Dr. P. Udaya Bhaskar", role: "Chairman, APPSC", occasion: "Annual Day & Academic Council Address" },
                    { name: "Dr. Addanki Sridhar", role: "Joint Collector, Guntur District", occasion: "Youth Leadership Summit" },
                    { name: "Kantilal Dande IAS", role: "Collector & District Magistrate, Guntur", occasion: "Campus Inauguration & Skill Conclave" },
                    { name: "J. Sathyanarayana", role: "Former Secretary, Ministry of Electronics & IT", occasion: "National IT Symposium" },
                    { name: "Dr. Yandamuri Veerendranath", role: "Renowned Author, Chartered Accountant & Motivational Speaker", occasion: "Campus Personality Development Workshop" }
                  ].map((v, i) => (
                    <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>{v.name}</div>
                      <div style={{ color: '#d97706', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>{v.role}</div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>{v.occasion}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. Safety & Rules */}
            {currentSection === 'safety' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CAMPUS PROTOCOLS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Safety, Security & Discipline Policy
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: '#fff1f2', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9f1239', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                      <ShieldAlert size={20} />
                      <span>Fire & Emergency Safety</span>
                    </div>
                    <p style={{ color: '#881337', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      Accommodated certified 2 Kg Fire Extinguishers on every floor corner, laboratories, server rooms, and hostels. Monthly safety inspections conducted and fire evacuation drills executed regularly.
                    </p>
                  </div>

                  <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                      <ShieldCheck size={20} />
                      <span>24x7 Security & CCTV Monitoring</span>
                    </div>
                    <p style={{ color: '#14532d', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      Full campus perimeter under 24x7 gated security guards and continuous IP CCTV surveillance. Visitor logbooks and automated boom barriers stationed at the main gate.
                    </p>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0e2154' }}>Official College Rules Book (Version 3.0)</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Comprehensive code of conduct, examination rules, and disciplinary procedures</div>
                  </div>
                  <a href="/college_assets/docs/Final Rules Book version-3.0.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Download size={14} /> Download Rules Book PDF
                  </a>
                </div>
              </div>
            )}

            {/* 12. Facilities Overview */}
            {currentSection === 'facilities' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CAMPUS INFRASTRUCTURE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Campus Facilities & Green Energy
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Sun size={24} style={{ color: '#f59e0b', marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.4rem' }}>Rooftop Solar Plant</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      100 kW grid-connected solar power installation supplying eco-friendly clean electricity to all academic blocks.
                    </p>
                  </div>

                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Droplets size={24} style={{ color: '#0284c7', marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.4rem' }}>Central RO Mineral Water</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Comprehensive Reverse Osmosis (RO) water purification plant with continuous dispensing coolers in all blocks and hostels.
                    </p>
                  </div>

                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Zap size={24} style={{ color: '#8b5cf6', marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.4rem' }}>100% Power Back-Up</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Heavy-duty 125 kVA silent acoustic diesel generators guaranteeing unhindered lab sessions and computer examinations.
                    </p>
                  </div>

                  <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Building2 size={24} style={{ color: '#16a34a', marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.4rem' }}>Divyangan Barrier-Free</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Dedicated accessibility ramps, elevators, and specially designed restrooms for differently-abled students and staff.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-layout-grid { grid-template-columns: 1fr !important; }
          .principal-profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
