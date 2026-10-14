import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileCheck2, 
  Calendar, 
  ExternalLink, 
  Download, 
  PhoneCall, 
  Mail, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function ExamcellPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'notifications';
  if (path.includes('calendar')) currentSection = 'calendar';
  else if (path.includes('results') || path.includes('autonomous')) currentSection = 'results';

  const navItems = [
    { id: 'notifications', label: 'Exam Notifications & Timetables', path: '/examination/notifications' },
    { id: 'calendar', label: 'JNTUK Examination Calendars', path: '/examination/calendar' },
    { id: 'results', label: 'Results & Autonomous Portal', path: '/examination/results' }
  ];

  const examNotices = [
    { date: "15 Oct 2026", title: "Notification for B.Tech IV Year I Semester Regular & Supplementary Examinations Dec 2026", type: "Regular / Supply", feeDate: "Last date without fine: 05 Nov 2026" },
    { date: "12 Oct 2026", title: "Time Table for B.Tech III Year II Semester Supplementary Autonomous Examinations Nov 2026", type: "Time Table", feeDate: "Exams commence: 18 Nov 2026" },
    { date: "08 Oct 2026", title: "Revaluation / Challenge Valuation Results for B.Tech II Year I Semester (R20 / R23)", type: "Results Notice", feeDate: "Available in Autonomous Portal" },
    { date: "01 Oct 2026", title: "Pre-Ph.D / Research Methodology Examination Schedule for Registered Research Scholars", type: "R&D Exam", feeDate: "Venue: Central Exam Hall" },
    { date: "24 Sep 2026", title: "Notification for M.Tech II Semester Regular Examinations Oct 2026", type: "PG Notice", feeDate: "Last date with fine: 15 Oct 2026" }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Examination Cell</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Examination Cell (Autonomous)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Confidential evaluation, continuous assessments, and autonomous examination administration.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="exam-layout-grid">
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
              Examcell Menu
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
                Controller of Exams (CE):
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0e2154' }}>
                9121214725
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb' }}>
                9705518818
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
                tec-ce@tecnrt.org
              </div>
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
            {/* 1. Notifications */}
            {currentSection === 'notifications' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>OFFICIAL CIRCULARS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Exam Notifications & Schedules
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {examNotices.map((n, i) => (
                    <div key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <span style={{ background: '#eff6ff', color: '#1e40af', fontWeight: 800, fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            {n.type}
                          </span>
                          <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                            {n.date}
                          </span>
                        </div>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem', lineHeight: 1.5 }}>
                          {n.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, marginTop: '0.4rem' }}>
                          {n.feeDate}
                        </div>
                      </div>
                      <a href="/college_assets/docs/Result Analysis.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                        <Download size={14} /> Download Circular
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. JNTUK Calendars */}
            {currentSection === 'calendar' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>UNIVERSITY SCHEDULES</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    JNTUK Academic & Examination Calendar
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Schedules for end examinations, central spot evaluations, and supplementary schedules as promulgated by the Directorate of Evaluation, JNTUK Kakinada.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>JNTUK Annual Examination Calendar 2025-26</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Complete university timeline for UG & PG semester exams</div>
                    </div>
                    <a href="/college_assets/docs/Academic Calendar.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Results & Autonomous Portal */}
            {currentSection === 'results' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>EXAM OUTCOMES & PORTALS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Results & Autonomous Examination Systems
                  </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 900, color: '#0e2154', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        Autonomous Examination Portal
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        Dedicated portal for autonomous students to check internal marks, download hall tickets, view semester results, and apply for recount/revaluation.
                      </p>
                    </div>
                    <a href="https://www.tecnrtautonomous.org/" target="_blank" rel="noreferrer" className="btn btn-primary btn-md" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <span>Visit tecnrtautonomous.org</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>

                  <div style={{ padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 900, color: '#0e2154', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        College Results Web Server
                      </div>
                      <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        Institutional web server publishing branch-wise result analyses, grade cards, and cumulative grade point averages (CGPA).
                      </p>
                    </div>
                    <a href="http://www.tecnrt.ac.in/" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-md" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <span>Visit tecnrt.ac.in Server</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af' }}>Historical Result Analysis Document</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Comprehensive pass percentage and distinction statistics across all departments</div>
                  </div>
                  <a href="/college_assets/docs/Result Analysis.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    <Download size={14} /> Download Result Analysis PDF
                  </a>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exam-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
