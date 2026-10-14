import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Mail, 
  Download, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Award,
  AlertTriangle
} from 'lucide-react';

export default function AdministrationPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'governing';
  if (path.includes('manual')) currentSection = 'manual';
  else if (path.includes('nodal-officer') || path.includes('rti')) currentSection = 'nodal-officer';
  else if (path.includes('committees') || path.includes('comitees')) currentSection = 'committees';
  else if (path.includes('cells') || path.includes('inst_cells')) currentSection = 'cells';
  else if (path.includes('rd-centre') || path.includes('rdcell')) currentSection = 'rd-centre';
  else if (path.includes('industry-cell') || path.includes('Indus_intercell')) currentSection = 'industry-cell';

  const { governingBody, institutionalCells } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'governing', label: 'Governing Body', path: '/administration/governing' },
    { id: 'manual', label: 'Administrative Manual', path: '/administration/manual' },
    { id: 'nodal-officer', label: 'Nodal Officer & RTI Act', path: '/administration/nodal-officer' },
    { id: 'committees', label: 'Institutional Committees', path: '/administration/committees' },
    { id: 'cells', label: 'Statutory & Welfare Cells', path: '/administration/cells' },
    { id: 'rd-centre', label: 'Research & Development (R&D)', path: '/administration/rd-centre' },
    { id: 'industry-cell', label: 'Industry Interaction Cell (IIIC)', path: '/administration/industry-cell' }
  ];

  const committeesList = [
    { name: "College Academic Committee (CAC)", chair: "Principal & Senior Professors", role: "Centralized apex council responsible for academic curricula, academic calendar approval, teaching audits, and exam schedules." },
    { name: "Discipline & Anti-Ragging Committee", chair: "Dr. Y. V. Narayana & HODs", role: "Ensures 100% ragging-free campus. Conducts daily flying squad patrols across bus bays, canteen, and hostels." },
    { name: "Grievance Redressal Committee", chair: "Prof. Academic Council", role: "Dedicated statutory mechanism to receive, investigate, and address grievances from students, faculty, and parents." },
    { name: "Training & Placement Committee", chair: "Placement Officer & Faculty In-Charges", role: "Plans CRT calendar, coordinates with HR teams of recruiters, and supervises on-campus drives." },
    { name: "Examination & Evaluation Committee", chair: "Controller of Examinations", role: "Manages confidential question paper generation, continuous internal evaluations (CIE), and semester end exams." },
    { name: "Student Welfare & Mentoring Committee", chair: "Dean of Student Affairs", role: "Coordinates student clubs, sports meets, cultural fests, health insurance, and psychological wellness counseling." }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Administration</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Institutional Governance & Administration
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Democratic, autonomous, and transparent administrative framework aligned with UGC, AICTE, and JNTUK guidelines.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="admin-layout-grid">
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
              Governance Submenus
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

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>GOVERNING BODY MINUTES</div>
              <a href="/college_assets/docs/GB 2025-26 1 & 2.pdf" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem', textDecoration: 'none' }}>
                <Download size={14} /> Download Minutes PDF
              </a>
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
            {/* 1. Governing Body */}
            {currentSection === 'governing' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>APEX REGULATORY AUTHORITY</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Governing Body (GB)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  The Governing Body of Tirumala Engineering College functions under the statutes of UGC Autonomous Colleges and JNTUK. It oversees financial budgets, infrastructural expansions, academic regulations, faculty appointments, and strategic growth.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>S.No</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Name of Member</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Designation & Organization</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Position in GB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {governingBody.map((gb, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{gb.sno}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>{gb.name}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{gb.role}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{ 
                              background: gb.position === 'Chairperson' ? '#eff6ff' : gb.position === 'Member Secretary' ? '#f0fdf4' : '#f8fafc',
                              color: gb.position === 'Chairperson' ? '#1e40af' : gb.position === 'Member Secretary' ? '#166534' : '#475569',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '999px'
                            }}>
                              {gb.position}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ padding: '1.25rem', background: '#eff6ff', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af' }}>Governing Body Resolution Archive</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Official documented minutes of meeting for academic year 2025-2026</div>
                  </div>
                  <a href="/college_assets/docs/GB 2025-26 1 & 2.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    <Download size={14} /> Download Resolutions PDF
                  </a>
                </div>
              </div>
            )}

            {/* 2. Administrative Manual */}
            {currentSection === 'manual' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>OFFICIAL SERVICE CODE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Administrative Manual & Service Rules
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem', lineHeight: 1.7, color: '#475569' }}>
                  <p>
                    The Administrative Manual of Tirumala Engineering College provides clear operational guidelines regarding recruitment, roles and responsibilities of statutory officers (Principal, Deans, HODs, Section Officers), code of conduct, leave rules, faculty research incentives, performance appraisals, and student grievance procedures.
                  </p>
                  <p style={{ margin: 0 }}>
                    Promulgated on 31.05.2022 by the Governing Body, this manual guarantees transparency and equitable service conditions across all departments.
                  </p>
                </div>

                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: '#ffffff' }}>
                  <FileText size={40} style={{ color: '#2563eb', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                    Official Administrative Manual (Version 31.05.2022)
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                    Complete verified PDF containing all institutional policies, service regulations, and administrative hierarchies.
                  </p>
                  <a href="/college_assets/docs/ADMINISTRATIVE MANUAL-31.05.22.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={18} /> Download Administrative Manual (PDF)
                  </a>
                </div>
              </div>
            )}

            {/* 3. Nodal Officer & RTI Act */}
            {currentSection === 'nodal-officer' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>STATUTORY COMPLIANCE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Nodal Officer & Right to Information (RTI) Act – 2005
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  In accordance with the Right to Information Act 2005 (Section 4(1)(b)) and AICTE/UGC guidelines, Tirumala Engineering College has designated statutory public information officers to facilitate public scrutiny and transparency.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                      First Appellate Authority (FAA)
                    </div>
                    <div style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Dr. Y. V. Narayana
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Principal, Tirumala Engineering College</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>Phone: 08647-218164 | Email: principal@tecnrt.org</div>
                  </div>

                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                      Public Information Officer (PIO)
                    </div>
                    <div style={{ color: '#d97706', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Administrative Officer (AO)
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Office of Administration, TEC</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>Phone: 9133300228 | Email: tec-ao@tecnrt.org</div>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af' }}>Statutory Declaration under RTI Act 2005</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Official public disclosure document signed by the Head of Institution</div>
                  </div>
                  <a href="/college_assets/docs/satutary declaration.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    <Download size={14} /> Download Declaration PDF
                  </a>
                </div>
              </div>
            )}

            {/* 4. Institutional Committees */}
            {currentSection === 'committees' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INTERNAL GOVERNANCE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Institutional Committees
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {committeesList.map((c, i) => (
                    <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.3rem' }}>
                          {c.name}
                        </h3>
                        <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700, marginBottom: '0.75rem' }}>
                          Convener: {c.chair}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                          {c.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Statutory & Welfare Cells */}
            {currentSection === 'cells' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>STUDENT WELFARE & REDRESSAL</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Institutional Statutory & Welfare Cells
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {institutionalCells.map((cell, i) => (
                    <div key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ maxWidth: '600px' }}>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem' }}>{cell.cell}</div>
                        <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>{cell.desc}</div>
                        <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600, marginTop: '0.4rem' }}>
                          In-Charge: {cell.incharge}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0e2154' }}>{cell.phone}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{cell.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Research & Development */}
            {currentSection === 'rd-centre' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INNOVATION ECOSYSTEM</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Research & Development (R&D) Centre
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  The R&D Centre fosters innovation, patent filings, SCI/Scopus journal publications, and funded projects from agencies like AICTE (MODROBS, RPS) and DST. Faculty and students are supported with research grants, conference travel aid, and software tools.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#7c3aed' }}>180+</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0e2154' }}>Scopus / SCI Papers</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#2563eb' }}>24+</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0e2154' }}>Patents Published</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#16a34a' }}>₹45 L+</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0e2154' }}>Sponsored Grants</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  R&D Publication Records & Documents
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href="/college_assets/docs/23-24 publications.pdf" target="_blank" rel="noreferrer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', color: '#0e2154', fontWeight: 600 }}>
                    <span>Research Publications (2023 - 2024 Scopus Compendium)</span>
                    <Download size={16} style={{ color: '#2563eb' }} />
                  </a>
                  <a href="/college_assets/docs/2021-2022 publication.pdf" target="_blank" rel="noreferrer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', color: '#0e2154', fontWeight: 600 }}>
                    <span>Faculty Journals & Conferences (2021 - 2022 Archive)</span>
                    <Download size={16} style={{ color: '#2563eb' }} />
                  </a>
                </div>
              </div>
            )}

            {/* 7. Industry Interaction Cell */}
            {currentSection === 'industry-cell' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CORPORATE ALLIANCES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Industry Institute Interaction Cell (IIIC)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  The Industry Institute Interaction Cell bridges academic learning with corporate realities. IIIC facilitates student industrial visits, 6-month capstone internships, guest lectures by Fortune 500 technologists, and joint consultancy projects.
                </p>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.75rem' }}>
                    IIIC Primary Responsibilities:
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem', margin: 0 }}>
                    <li>Signing active Memorandums of Understanding (MOUs) with core and IT software enterprises.</li>
                    <li>Organizing industrial visits to power plants, manufacturing units, and software technology parks.</li>
                    <li>Inviting industry experts for specialized weekend workshops on cloud architecture, AI, and robotics.</li>
                    <li>Facilitating faculty immersion programs in industry during semester vacations.</li>
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
