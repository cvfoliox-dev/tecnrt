import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  Briefcase, 
  Users, 
  Award, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

export default function PlacementPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'overview';
  if (path.includes('team') || path.includes('faculty')) currentSection = 'team';
  else if (path.includes('training') || path.includes('activities')) currentSection = 'training';
  else if (path.includes('statistics') || path.includes('summary')) currentSection = 'statistics';
  else if (path.includes('recruiters')) currentSection = 'recruiters';
  else if (path.includes('gallery')) currentSection = 'gallery';
  else if (path.includes('testimonials')) currentSection = 'testimonials';
  else if (path.includes('infrastructure') || path.includes('infrasture')) currentSection = 'infrastructure';
  else if (path.includes('contact') || path.includes('tpccontact')) currentSection = 'contact';

  const { placements } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'overview', label: 'About T&P Cell', path: '/placements/overview' },
    { id: 'team', label: 'Placement Officers & Team', path: '/placements/team' },
    { id: 'training', label: 'Training & CRT Activities', path: '/placements/training' },
    { id: 'statistics', label: 'Year-on-Year Statistics', path: '/placements/statistics' },
    { id: 'recruiters', label: 'Our Recruiters & Partners', path: '/placements/recruiters' },
    { id: 'gallery', label: 'Placement Success Gallery', path: '/placements/gallery' },
    { id: 'testimonials', label: 'Student Testimonials', path: '/placements/testimonials' },
    { id: 'infrastructure', label: 'T&P Infrastructure', path: '/placements/infrastructure' },
    { id: 'contact', label: 'Contact Placement Cell', path: '/placements/contact' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Placements</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Training & Placement Cell (T&P)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Preparing students for engineering and technical careers through structured training and on-campus recruitment.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="placement-layout-grid">
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
              Placements Menu
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

            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>RECORD PLACEMENTS</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#15803d' }}>864+</div>
              <div style={{ fontSize: '0.75rem', color: '#14532d', marginTop: '0.2rem' }}>Selections in Single Year</div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {/* 1. Overview */}
            {currentSection === 'overview' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>GATEWAY TO GLOBAL CAREERS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    About Training & Placement Cell
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #16a34a', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
                  <p style={{ margin: 0 }}>
                    The Training and Placement Department helps students build analytical skills, develop professional habits, and prepare for campus recruitment drives across IT and core engineering companies.
                  </p>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Key Pillars of the T&P Department
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.3rem' }}>Sophomore Year Onwards CRT</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Aptitude, quantitative analysis, logical reasoning, and programming sprints integrated right from 3rd semester.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.3rem' }}>Industry Mock Drives</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Simulated technical interviews conducted by alumni working in Google, Amazon, Microsoft, TCS, and Cognizant.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.3rem' }}>Core & Product Engineering</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      Equal focus on core engineering recruiters including Delphi TVS, Gestamp, and Siemens Automation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Team */}
            {currentSection === 'team' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CORPORATE RELATIONS HEADS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Placement Team & Coordinators
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.15rem' }}>Head, Training & Placements</div>
                    <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Training & Placement Cell</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.8 }}>
                      <div><strong>Phone:</strong> 7731004567 / 8008322338</div>
                      <div><strong>Email:</strong> placements@tecnrt.org</div>
                      <div><strong>Office:</strong> T&P Block, Ground Floor</div>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.15rem' }}>Department Placement Coordinators</div>
                    <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Faculty In-Charges Across Branches</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.8 }}>
                      <div>CSE & AIML: Dr. K. Satish / Mr. Ch. Nageswara Rao</div>
                      <div>ECE & EEE: Dr. Jagadeesh Thati / Mr. B. Rambabu</div>
                      <div>MECH & CIVIL: Dr. S. Rama Rao / Mr. K. Midhun Kumar</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Training & CRT Activities */}
            {currentSection === 'training' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#9333ea', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>EMPLOYABILITY RIGOR</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Training Activities & Campus Recruitment Training (CRT)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Training activities begin from the 2nd year and intensify through the 3rd and final years to prepare students for national level qualifier tests (TCS NQT, Infosys InfyTQ, Wipro Elite, Cognizant GenC Next).
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {[
                    { sem: "Semester III & IV (2nd Year)", focus: "Fundamental Aptitude & Soft Skills", desc: "Quantitative basics, verbal ability, grammar, vocabulary enrichment, and public speaking." },
                    { sem: "Semester V (3rd Year)", focus: "Data Structures, Algorithms & Full Stack", desc: "Intensive coding bootcamps in Python, Java, C++, and database queries." },
                    { sem: "Semester VI (3rd Year)", focus: "Company-Specific Mock Drills", desc: "Pattern-based mock online tests simulating HackerRank, AMCAT, and CoCubes platforms." },
                    { sem: "Semester VII & VIII (4th Year)", focus: "Live On-Campus Corporate Drives", desc: "HR interview grooming, technical panel reviews, resume building, and continuous placement drives." }
                  ].map((t, i) => (
                    <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <span style={{ background: '#eff6ff', color: '#1e40af', fontWeight: 800, fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {t.sem}
                      </span>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '0.95rem', margin: '0.5rem 0 0.25rem' }}>{t.focus}</div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Statistics */}
            {currentSection === 'statistics' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>VERIFIED PLACEMENT DATA</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Year-on-Year Placement Statistics
                  </h2>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Academic Year</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Selected Technocrats</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Highlights & Milestones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placements.yearOnYear.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>{item.year}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#16a34a', fontSize: '1.05rem' }}>{item.count}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{item.highlight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Recruiters */}
            {currentSection === 'recruiters' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CORPORATE PARTNERS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Our Premier Campus Recruiters
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {placements.topRecruiters.map((rec, i) => (
                    <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem' }}>{rec.name}</div>
                      <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.2rem' }}>Package: {rec.package}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.4rem' }}>
                        <span>Drive: {rec.type}</span>
                        <span style={{ fontWeight: 700, color: '#2563eb' }}>{rec.selected} Placed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Placement Gallery */}
            {currentSection === 'gallery' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>HALL OF FAME</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Placement Success Banners & Highlights
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  {placements.galleryBanners.map((banner, idx) => (
                    <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#ffffff', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                      <img 
                        src={banner.image} 
                        alt={banner.title} 
                        style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/college_assets/placementwhatsapp/TCS.jpeg'; }}
                      />
                      <div style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0e2154', fontSize: '0.85rem', textAlign: 'center' }}>
                        {banner.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Testimonials */}
            {currentSection === 'testimonials' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>ALUMNI VOICES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Placed Students Testimonials
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { name: "K. Sai Praneeth", branch: "B.Tech CSE", company: "Cognizant (6.75 LPA)", text: "TEC provided hands-on coding training from second year itself. The faculty gave mock interviews that helped me clear the GenC Next round with confidence!" },
                    { name: "P. Lakshmi Tejaswi", branch: "B.Tech ECE", company: "TCS Digital (7.00 LPA)", text: "The dedicated faculty proctors and CRT trainers cleared every technical doubt. I am deeply thankful to the management for their scholarships and guidance." },
                    { name: "M. Rajesh", branch: "B.Tech Mechanical", company: "Delphi TVS (3.20 LPA)", text: "The core lab facilities, CNC machines, and industry visits arranged by IIIC prepared us thoroughly for our technical and practical rounds." }
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                        "{item.text}"
                      </p>
                      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '0.95rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>{item.branch}</div>
                        <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, marginTop: '0.2rem' }}>Placed in: {item.company}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Infrastructure */}
            {currentSection === 'infrastructure' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CAMPUS DRIVE VENUES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Placement Infrastructure & Drive Facilities
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.3rem' }}>Air-Conditioned Auditorium</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      600-seater modern acoustic seminar hall with 4K projection for pre-placement talks (PPT).
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.3rem' }}>Online Assessment Center</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      500+ interconnected networked systems with gigabit LAN and uninterruptible power backup.
                    </p>
                  </div>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.3rem' }}>Group Discussion & Interview Cabins</div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                      8 dedicated air-conditioned interview cubicles and 2 circular round-table GD chambers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 9. Contact */}
            {currentSection === 'contact' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INVITING CORPORATES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Contact Placement Cell
                  </h2>
                </div>

                <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.5rem' }}>
                    Head, Training & Placement Cell
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: '#1e3a8a', lineHeight: 1.8 }}>
                    <div><strong>Mobile:</strong> 7731004567, 8008322338</div>
                    <div><strong>Email:</strong> placements@tecnrt.org, tecnrt@gmail.com</div>
                    <div><strong>Address:</strong> Training & Placement Cell, Tirumala Engineering College, Jonnalagadda, Narasaraopet, Palnadu District, AP - 522601.</div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .placement-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
