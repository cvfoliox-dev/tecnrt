import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DEPARTMENTS, FACULTY_MEMBERS } from '../../data/mockData';
import StatCard from '../common/StatCard';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Percent, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  FileCheck 
} from 'lucide-react';

export default function HODOverview() {
  const { currentUser, setActiveTab, uploadHistory, auditLogs } = useAuth();
  const cseDept = DEPARTMENTS.find(d => d.id === 'CSE') || DEPARTMENTS[0];

  const pendingApprovals = auditLogs.filter(l => l.action === 'CORRECTION_APPROVAL');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Department Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #09142b 0%, #1e3a8a 100%)', 
        borderRadius: '16px', 
        padding: '1.75rem', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-md)',
        borderLeft: '5px solid #a855f7'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.25)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              Department Head Office
            </span>
            <span style={{ color: '#93c5fd', fontSize: '0.8rem' }}>
              Dept Code: {cseDept.code} • Established {cseDept.establishedYear}
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
            {cseDept.name} Administration
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Head of Department: <strong>{cseDept.hod}</strong> • Tirumala Engineering College, Narasaraopet
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('attendance-overview')} 
            className="btn btn-accent btn-sm"
          >
            <Percent size={15} /> Student Attendance
          </button>
          <button 
            onClick={() => setActiveTab('academic-admin')} 
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <FileCheck size={15} /> Correction Queue
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid-4">
        <StatCard 
          title="Total Department Students"
          value={`${cseDept.studentsCount}`}
          subtitle="4 Academic Batches (I-IV)"
          icon={Users}
          color="primary"
          badgeText="Active Roster"
          badgeType="primary"
        />

        <StatCard 
          title="Faculty Strength"
          value={`${cseDept.facultyCount}`}
          subtitle="Professors & Asst. Profs"
          icon={BookOpen}
          color="purple"
          badgeText="Full Strength"
          badgeType="primary"
        />

        <StatCard 
          title="Dept Avg Attendance"
          value={`${cseDept.avgAttendance}%`}
          subtitle="ODD Semester 2026-27"
          icon={Percent}
          color="success"
          badgeText="Above Benchmark"
          badgeType="success"
        />

        <StatCard 
          title="Semester Pass Rate"
          value={`${cseDept.passRate}%`}
          subtitle="JNTUK University Results"
          icon={Award}
          color="accent"
          badgeText="Top Ranked"
          badgeType="success"
        />
      </div>

      {/* Faculty Submission Compliance & Class Summaries */}
      <div className="grid-2">
        {/* Faculty Upload Compliance Monitor (PRD 4.3 & 6.7) */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Faculty Upload Compliance Tracker</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>September 2026 Monthly Spreadsheet Submissions</p>
            </div>
            <button 
              onClick={() => setActiveTab('faculty-management')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              All Faculty <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FACULTY_MEMBERS.map(fac => {
              const isPending = fac.pendingUploads > 0;
              return (
                <div key={fac.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{fac.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{fac.designation} • ID: {fac.staffId}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${isPending ? 'badge-warning' : 'badge-success'}`}>
                      {isPending ? '1 Upload Pending' : 'Up to Date'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Batch-wise Attendance Overview */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Class Batch Performance</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Sections across current academic years</p>
            </div>
            <button 
              onClick={() => setActiveTab('students-classes')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              Class Roster <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700 }}>IV Year B.Tech CSE (Sec A & B)</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>88.5% Avg</span>
              </div>
              <div className="attendance-progress-bar">
                <div className="attendance-progress-fill fill-safe" style={{ width: '88.5%' }}></div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>133 Students • 4 Under Condonation Alert</div>
            </div>

            <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700 }}>III Year B.Tech CSE (Sec A & B)</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>86.2% Avg</span>
              </div>
              <div className="attendance-progress-bar">
                <div className="attendance-progress-fill fill-safe" style={{ width: '86.2%' }}></div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>142 Students • 2 Under Condonation Alert</div>
            </div>

            <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700 }}>II Year B.Tech CSE (Sec A, B & C)</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>85.0% Avg</span>
              </div>
              <div className="attendance-progress-bar">
                <div className="attendance-progress-fill fill-safe" style={{ width: '85%' }}></div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>210 Students • 6 Under Condonation Alert</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
