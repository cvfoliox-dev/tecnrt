import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  GraduationCap, 
  CheckCircle2, 
  Download, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  Award,
  AlertCircle
} from 'lucide-react';

export default function AdmissionPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'procedure';
  if (path.includes('courses') || path.includes('programmes')) currentSection = 'courses';
  else if (path.includes('student-lists') || path.includes('Student_List')) currentSection = 'student-lists';
  else if (path.includes('fee-details') || path.includes('tecfee')) currentSection = 'fee-details';
  else if (path.includes('contact') || path.includes('admissioncontact_us')) currentSection = 'contact';

  const { admissions, institution } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'procedure', label: 'Admission Procedure & Quotas', path: '/admissions/procedure' },
    { id: 'courses', label: 'Courses Offered & Seat Intake', path: '/admissions/courses' },
    { id: 'student-lists', label: 'Approved Student Lists', path: '/admissions/student-lists' },
    { id: 'fee-details', label: 'Intake & Fee Structure', path: '/admissions/fee-details' },
    { id: 'contact', label: 'Admissions Helpdesk & Contact', path: '/admissions/contact' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Admissions</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Admissions 2026 - 2027
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Admissions information for undergraduate and postgraduate engineering programs. AP EAPCET / ECET Counseling Code: <strong>TMLN</strong>.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="admissions-layout-grid">
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
              Admissions Submenu
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

            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                Admissions Helpline:
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0e2154' }}>
                9133300228
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>
                8985298550
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                Jonnalagadda, Narasaraopet
              </div>
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
            {/* 1. Admission Procedure */}
            {currentSection === 'procedure' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>ELIGIBILITY & QUOTAS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Admission Procedure (B.Tech & M.Tech)
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2563eb', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
                  <strong>Common Entrance Examinations followed for Admissions:</strong>
                  <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                    <li><strong>B.Tech 1st Year:</strong> AP EAPCET (Engineering, Agriculture & Pharmacy Common Entrance Test) conducted by APSCHE.</li>
                    <li><strong>B.Tech 2nd Year (Lateral Entry):</strong> AP ECET (Engineering Common Entrance Test) for Diploma and B.Sc holders.</li>
                    <li><strong>M.Tech Programmes:</strong> AP PGECET / Valid GATE Score.</li>
                  </ul>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Seat Allotment Breakdown
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {admissions.categories.map((cat, i) => (
                    <div key={i} style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.1rem', color: '#0e2154', marginBottom: '0.4rem' }}>
                        <CheckCircle2 size={18} style={{ color: '#16a34a' }} />
                        <span>{cat.quota}</span>
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                        {cat.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af' }}>Category-B / NRI Application Form 2026-27</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Download official printable application for Management Quota seats</div>
                  </div>
                  <a href="/college_assets/docs/NRI Application.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    <Download size={14} /> Download NRI Application Form
                  </a>
                </div>
              </div>
            )}

            {/* 2. Courses Offered & Seat Intake */}
            {currentSection === 'courses' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>AICTE APPROVED INTAKE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Courses Offered & Sanctioned Seat Strength
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  All programmes are approved by the All India Council for Technical Education (AICTE), New Delhi, and permanently affiliated to JNTUK Kakinada under autonomous regulations. Total engineering intake exceeds <strong>1,350 seats</strong>.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Programme Name</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Branch Code</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Sanctioned Intake (2025-26)</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.seatsMatrix.map((item, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>{item.course}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#d97706' }}>{item.code}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#2563eb' }}>{item.intake2025} Seats</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{item.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. Approved Student Lists */}
            {currentSection === 'student-lists' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>OFFICIAL ARCHIVES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Approved Student Lists (By Directorate of Admissions)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Official ratified lists of students admitted under Convener Quota (Category A) and Management Quota (Category B) as approved by APSCHE and JNTUK.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Approved Student List (Academic Year 2024-2025)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Ratified lists for B.Tech CSE, ECE, EEE, MECH, CIVIL, IT, AIML</div>
                    </div>
                    <a href="/college_assets/docs/SL24-25.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Approved Student List (Academic Year 2023-2024)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Official council admission records</div>
                    </div>
                    <a href="/college_assets/docs/SL23-24.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Approved Student List (Academic Year 2022-2023)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Official council admission records</div>
                    </div>
                    <a href="/college_assets/docs/SL22-23.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Intake & Fee Structure */}
            {currentSection === 'fee-details' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>TUITION & FEE DETAILS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Intake & Fee Structure (2025-2026)
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem', lineHeight: 1.7, color: '#475569' }}>
                  <p>
                    Tuition fees for B.Tech courses are fixed transparently by the Andhra Pradesh Higher Education Regulatory and Monitoring Commission (APHERMC).
                  </p>
                  <p style={{ margin: 0 }}>
                    Students eligible under government welfare schemes receive 100% full tuition reimbursement under Jagananna Vidya Deevena (JVD). In addition, top 10 academic achievers per branch receive the <strong>₹60 Lakhs Founders Merit Scholarship</strong>.
                  </p>
                </div>

                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: '#ffffff' }}>
                  <FileText size={40} style={{ color: '#2563eb', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                    Official Intake & Fee Notification 2025-26
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                    Detailed government orders, branch-wise tuition fees, examination fees, and scholarship eligibility criteria.
                  </p>
                  <a href="/college_assets/docs/INTAKE AND FEE DETAILS 2025-26.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={18} /> Download Official Fee Details (PDF)
                  </a>
                </div>
              </div>
            )}

            {/* 5. Admissions Contact */}
            {currentSection === 'contact' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>GET IN TOUCH</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Admissions Helpdesk & Counseling Center
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <PhoneCall size={18} style={{ color: '#2563eb' }} />
                      <span>Telephonic Counseling</span>
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.8 }}>
                      <div><strong>Admissions Officer:</strong> 9133300228</div>
                      <div><strong>Counsellor Desk:</strong> 8985298550</div>
                      <div><strong>Guntur City Office:</strong> 9885510039 / 9248752999</div>
                      <div><strong>College Office:</strong> 08647 - 218164, 218255</div>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={18} style={{ color: '#2563eb' }} />
                      <span>Email & Office Timings</span>
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.8 }}>
                      <div><strong>Email:</strong> tecnrt@gmail.com</div>
                      <div><strong>Principal:</strong> principal@tecnrt.org</div>
                      <div><strong>Admissions Desk:</strong> admissions@tecnrt.org</div>
                      <div><strong>Working Hours:</strong> Mon - Sat: 9:00 AM - 5:00 PM</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontWeight: 800, color: '#1e40af', marginBottom: '0.4rem' }}>
                    Physical Address for Admissions Verification:
                  </div>
                  <div style={{ color: '#334155', fontSize: '0.9rem' }}>
                    Tirumala Engineering College, Jonnalagadda Village, Narasaraopet Mandal, Palnadu District, AP - 522601. (5 Km from Narasaraopet Bus Stand & 5.5 Km from Railway Station).
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admissions-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
