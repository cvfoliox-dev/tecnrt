import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  Download, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function AcademicPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'calendar';
  if (path.includes('syllabus')) currentSection = 'syllabus';
  else if (path.includes('scholarship')) currentSection = 'scholarships';
  else if (path.includes('financial-aid')) currentSection = 'financial-aid';
  else if (path.includes('curriculum') || path.includes('quality')) currentSection = 'curriculum';

  const { institution } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'calendar', label: 'Academic Calendars', path: '/academics/calendar' },
    { id: 'syllabus', label: 'Regulations & Syllabus (R23/R20)', path: '/academics/syllabus' },
    { id: 'scholarships', label: 'Founders Merit Scholarship (₹60L)', path: '/academics/scholarships' },
    { id: 'financial-aid', label: 'Financial Aid & JVD Schemes', path: '/academics/financial-aid' },
    { id: 'curriculum', label: 'Curricular Planning & Quality Factors', path: '/academics/curriculum' }
  ];

  const syllabusDownloads = [
    { reg: "R23", title: "1st Year B.Tech Semester I Syllabus (All Branches)", file: "/college_assets/docs/1-1 syllubus.pdf" },
    { reg: "R23", title: "1st Year B.Tech Semester II Syllabus (All Branches)", file: "/college_assets/docs/1-2 syllubus.pdf" },
    { reg: "R23", title: "CSE II Year (Sem I & II) Syllabus", file: "/college_assets/docs/CSE II-I & II-II SYLLABUS.pdf" },
    { reg: "R23", title: "CSE III Year (Sem I & II) Syllabus", file: "/college_assets/docs/CSE III-I & III-II SYLLABUS.pdf" },
    { reg: "R23", title: "AIML II Year (Sem I & II) Syllabus", file: "/college_assets/docs/AIML II-I & II-II SYLLABUS.pdf" },
    { reg: "R23", title: "AIML III Year Syllabus", file: "/college_assets/docs/AIML-R23-III YEAR SYLLABUS.pdf" },
    { reg: "R23", title: "ECE II Year (Sem I & II) Syllabus", file: "/college_assets/docs/ECE II-I & II-II SYLLABUS.pdf" },
    { reg: "R23", title: "ECE III Year Syllabus", file: "/college_assets/docs/III B.Tech I & II Sem R23 ECE Syllabus-final.pdf" },
    { reg: "R23", title: "EEE II Year (Sem I & II) Syllabus", file: "/college_assets/docs/EEE-II-I & II-II SYLLABUS.pdf" },
    { reg: "R23", title: "EEE III Year Syllabus", file: "/college_assets/docs/EEE-R23-III YEAR SYLLABUS.pdf" },
    { reg: "R23", title: "IT II Year Syllabus", file: "/college_assets/docs/IT II-I & II-II SYLLABUS.pdf" },
    { reg: "R23", title: "IT III Year Syllabus", file: "/college_assets/docs/3-1 IT.pdf" },
    { reg: "R20", title: "R20 Autonomous Complete Curriculum & Syllabi", file: "/college_assets/docs/R20 syllabus.pdf" },
    { reg: "R16", title: "Civil Engineering R16 Course Outcomes & Syllabus", file: "/college_assets/docs/R16_CIVIL.pdf" }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Academics</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Academics & Curricular Excellence
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Autonomous outcome-based education, continuous evaluation, and generous merit scholarships.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="academics-layout-grid">
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
              Academic Submenus
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

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400e' }}>MERIT SCHOLARSHIP CORPUS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#b45309' }}>₹60 Lakhs / Year</div>
              <div style={{ fontSize: '0.7rem', color: '#78350f', marginTop: '0.2rem' }}>Top 10 Rankers per Branch</div>
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
            {/* 1. Academic Calendars */}
            {currentSection === 'calendar' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>SEMESTER SCHEDULES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Academic Calendars (Autonomous & JNTUK)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  The academic calendars approved by the College Academic Committee (CAC) dictate commencement of class work, continuous internal assessments (CIE), laboratory examinations, and semester-end examinations (SEE).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Autonomous Academic Calendar 2025-2026</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>B.Tech II, III & IV Year All Engineering Branches</div>
                    </div>
                    <a href="/college_assets/docs/Academic Calendar.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <Download size={14} /> Download Calendar PDF
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Semester-I Academic Schedule (2022-2023)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Archive schedule for odd semester</div>
                    </div>
                    <a href="/college_assets/docs/SEM1-202223.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Semester-II Academic Schedule (2022-2023)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Archive schedule for even semester</div>
                    </div>
                    <a href="/college_assets/docs/SEM2-202223.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Regulations & Syllabus */}
            {currentSection === 'syllabus' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>CURRICULAR STRUCTURE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Regulations & Course Syllabi (R23, R20, R16)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Download official course structures, course outcomes (COs), program outcomes (POs), and detailed subject-wise syllabi.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {syllabusDownloads.map((s, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ background: '#eff6ff', color: '#1e40af', fontWeight: 800, fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          Regulation: {s.reg}
                        </span>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '0.95rem', margin: '0.6rem 0' }}>
                          {s.title}
                        </div>
                      </div>
                      <a href={s.file} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                        <Download size={14} /> Download Syllabus PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Founders Merit Scholarship */}
            {currentSection === 'scholarships' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>STUDENT SCHOLARSHIPS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Founders Merit Scholarships (₹60 Lakhs Annual Corpus)
                  </h2>
                </div>

                <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b', marginBottom: '2rem', color: '#92400e', lineHeight: 1.7 }}>
                  <h4 style={{ fontWeight: 800, color: '#78350f', marginBottom: '0.5rem' }}>
                    Annual ₹60,00,000 Cash Merit Award Scheme
                  </h4>
                  <p style={{ margin: 0 }}>
                    Instituted in 2008 by the founders of <strong>Tirumala Milk Products Pvt. Ltd.</strong> under the Venkata Ramana Charitable Trust. An annual corpus of ₹60 Lakhs is awarded directly to the <strong>Top 10 academic achievers</strong> of every B.Tech department, encouraging strong academic performance and assisting families with educational costs.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                      Branch Topper Concessions
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Students achieving rank 1 in their branch semester exams receive gold medals along with direct fee waivers and cash awards of up to ₹25,000.
                    </p>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#ffffff' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                      Ranks 2 to 10 Merit Awards
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Ranks 2 through 10 in every branch receive substantial cash awards and recognition certificates at the grand Annual Day celebration.
                    </p>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569' }}>
                  <strong>Scholarship In-Charge Contact:</strong> Administrative Officer & Scholarship Desk (Phone: 9133300228 / 9642612013 | Email: scholarships@tecnrt.org).
                </div>
              </div>
            )}

            {/* 4. Financial Aid & JVD Schemes */}
            {currentSection === 'financial-aid' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>STATE & CENTRAL SCHEMES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Government Financial Aid & Reimbursement
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  The college welfare section facilitates seamless disbursement of all Andhra Pradesh State Welfare and Central Government Scholarship schemes:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.3rem' }}>
                      Jagananna Vidya Deevena (JVD): Full Tuition Reimbursement
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      100% full tuition fee reimbursement credited directly to eligible students' mothers' accounts by the Government of Andhra Pradesh for SC, ST, BC, EBC, Minority, and Kapu students.
                    </p>
                  </div>

                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.3rem' }}>
                      Jagananna Vasathi Deevena (JVD Vasathi)
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      Annual grant of ₹20,000 per year towards hostel and mess maintenance charges for polytechnic and engineering undergraduates.
                    </p>
                  </div>

                  <div style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.3rem' }}>
                      AICTE Pragati & Saksham Fellowships
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                      AICTE fellowships of ₹50,000 per annum for meritorious girl students (Pragati) and differently-abled students (Saksham).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Curricular Planning & Quality Factors */}
            {currentSection === 'curriculum' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>PEDAGOGY & ACADEMIC AUDIT</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Curricular Planning & Quality Parameters
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem', lineHeight: 1.7, color: '#475569' }}>
                  <h4 style={{ color: '#0e2154', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Systematic Curricular Delivery Mechanism
                  </h4>
                  <p style={{ margin: 0 }}>
                    Course curriculum is planned well ahead of each semester through Board of Studies (BOS) meetings in consultation with university representatives, corporate tech leads, and alumni. Detailed lesson plans, question banks, course files, and lab manuals are audited by the Internal Quality Assurance Cell (IQAC).
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Curricular Planning & Implementation Document</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Official BOS and CAC curricular execution guidelines</div>
                    </div>
                    <a href="/college_assets/docs/Curricular Planning and Implementation.docx" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download Document
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Quality Factors & Parameters (IQAC Compliance)</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Assessment metrics for laboratory, lecture, and student outcomes</div>
                    </div>
                    <a href="/college_assets/docs/Quality factors.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <Download size={14} /> Download Quality Factors PDF
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
          .academics-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
