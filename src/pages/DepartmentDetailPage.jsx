import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  Building2, 
  Users, 
  Cpu, 
  BookOpen, 
  Download, 
  Mail, 
  Phone, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function DepartmentDetailPage() {
  const { deptCode } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  const { departments } = COLLEGE_AUDIT_DATA;

  // Find department or default to 'cse'
  const currentDept = departments.find(d => d.code.toLowerCase() === (deptCode || 'cse').toLowerCase()) || departments[0];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/departments/cse" style={{ color: '#93c5fd', textDecoration: 'none' }}>Departments</Link>
            <span>/</span>
            <span>{currentDept.code.toUpperCase()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '999px', marginBottom: '0.75rem' }}>
                <Award size={13} /> {currentDept.degrees}
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
                Department of {currentDept.name}
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '700px', margin: 0 }}>
                Estd. {currentDept.established} • AICTE Sanctioned Intake: {currentDept.intake} Seats • Autonomous Curriculum
              </p>
            </div>

            {/* Quick HOD Pill */}
            <div style={{ background: '#0e2154', border: '1px solid #1e3a6d', padding: '1rem 1.25rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}>
              <div style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>HEAD OF DEPARTMENT</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.15rem' }}>{currentDept.hod.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#d4cfc5' }}>{currentDept.hod.qual}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }} className="dept-layout-grid">
          {/* Left Navigation: All Departments Switcher */}
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
              All Departments
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {departments.map((d) => {
                const isSelected = d.code === currentDept.code;
                return (
                  <Link
                    key={d.code}
                    to={`/departments/${d.code}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 800 : 500,
                      color: isSelected ? '#0e2154' : '#475569',
                      background: isSelected ? '#eff6ff' : 'transparent',
                      borderLeft: isSelected ? '3px solid #2563eb' : '3px solid transparent',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{d.code.toUpperCase()}</span>
                    <span style={{ fontSize: '0.7rem', color: isSelected ? '#2563eb' : '#94a3b8', fontWeight: 600 }}>
                      {d.intake} Seats
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#eff6ff', borderRadius: '10px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>EAPCET / ECET CODE</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0e2154' }}>TMLN</div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {/* Top Interactive Tabs */}
            <div 
              role="tablist"
              aria-label="Department sections"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem' }}
            >
              {[
                { id: 'about', label: 'Vision & Mission' },
                { id: 'hod', label: 'HOD Profile' },
                { id: 'faculty', label: 'Faculty Roster' },
                { id: 'labs', label: 'Laboratories & Facilities' },
                { id: 'syllabus', label: 'Curriculum & Syllabi' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? '#0e2154' : '#f8fafc',
                    color: activeTab === tab.id ? '#ffffff' : '#475569',
                    border: '1px solid',
                    borderColor: activeTab === tab.id ? '#0e2154' : '#e2e8f0',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Vision & Mission */}
            {activeTab === 'about' && (
              <div>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} style={{ color: '#f59e0b' }} />
                    <span>Department Vision</span>
                  </h3>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2563eb', color: '#334155', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {currentDept.vision}
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Layers size={20} style={{ color: '#10b981' }} />
                    <span>Department Mission</span>
                  </h3>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', color: '#334155', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {currentDept.mission}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                    Program Educational Objectives (PEOs)
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                        <strong>PEO 1 (Technical Proficiency):</strong> Graduates demonstrate solid analytical and technical foundations to architect, design, and deploy practical engineering solutions.
                      </div>
                    </div>
                    <div style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                        <strong>PEO 2 (Professional Adaptability):</strong> Graduates adapt to evolving technological disruptions through continuous professional learning, certifications, and research inquiry.
                      </div>
                    </div>
                    <div style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', gap: '0.75rem' }}>
                      <CheckCircle2 size={18} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                        <strong>PEO 3 (Ethics & Societal Impact):</strong> Graduates practice engineering with high ethical standards, environmental stewardship, and leadership directed toward rural and national progress.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: HOD Profile */}
            {activeTab === 'hod' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '14px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#0e2154', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '2.5rem', margin: '0 auto 1rem', border: '3px solid #f59e0b' }}>
                      {currentDept.hod.name.slice(3, 4)}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0e2154' }}>
                      {currentDept.hod.name}
                    </h3>
                    <div style={{ color: '#d97706', fontWeight: 700, fontSize: '0.88rem', marginTop: '0.2rem' }}>
                      {currentDept.hod.qual}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      Professor & Head of Department
                    </div>

                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#475569' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Phone size={14} style={{ color: '#2563eb' }} />
                        <span>{currentDept.hod.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={14} style={{ color: '#2563eb' }} />
                        <span>{currentDept.hod.email}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                      HOD's Desk & Experience:
                    </h4>
                    <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1rem' }}>
                      {currentDept.hod.experience}. Welcome to the Department of {currentDept.name} at Tirumala Engineering College. Our curriculum is tailored to develop problem-solving competencies through experiential learning in modern laboratories.
                    </p>
                    <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem' }}>
                      Students participate in hackathons, paper presentation symposiums, and corporate placement bootcamps. We take pride in our robust faculty team, research publications, and consistent campus placements in top multinational firms.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Faculty Roster */}
            {activeTab === 'faculty' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', margin: 0 }}>
                    Faculty Members: Department of {currentDept.code.toUpperCase()}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                    Faculty Roster
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>S.No</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Faculty Name</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Designation</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Qualification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDept.facultyHighlights.map((fac, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{idx + 1}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>{fac.name}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#2563eb', fontWeight: 600 }}>{fac.desig}</td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{fac.qual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4: Laboratories & Facilities */}
            {activeTab === 'labs' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', marginBottom: '1.25rem' }}>
                  Specialized Laboratories & Computing Facilities
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {currentDept.laboratories.map((lab, i) => (
                    <div key={i} style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                        {lab.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.3rem' }}>
                        Hardware: {lab.systems}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Software / Tools: {lab.software}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Syllabus & Curriculum */}
            {activeTab === 'syllabus' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0e2154', marginBottom: '1.25rem' }}>
                  Curriculum & Syllabi Downloads ({currentDept.name})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentDept.syllabusLinks.map((syl, i) => (
                    <div key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>{syl.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Official ratified syllabus PDF for Department of {currentDept.code.toUpperCase()}</div>
                      </div>
                      <a href={syl.file} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        <Download size={14} /> Download PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dept-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
