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
  FileCheck,
  FileSpreadsheet,
  GraduationCap,
  UserCheck
} from 'lucide-react';

export default function HODOverview() {
  const { currentUser, students = [], setActiveTab, uploadHistory = [], auditLogs = [] } = useAuth();
  
  // Requirement 2: HOD Branch strictly based on login context
  const assignedBranch = currentUser?.profile?.department || 'CSE';
  const deptObj = DEPARTMENTS.find(d => d.id === assignedBranch) || {
    id: assignedBranch,
    code: assignedBranch,
    name: currentUser?.profile?.departmentName || `${assignedBranch} Department`,
    hod: currentUser?.profile?.name || "Head of Department",
    establishedYear: 2008
  };

  // Requirement 4: Real data derived from actual registered roster
  const deptStudents = students.filter(s => s.department === assignedBranch);
  const studentsWithAtt = deptStudents.filter(s => s.attendanceOverall !== undefined && s.attendanceOverall !== null);
  const deptAvgAtt = studentsWithAtt.length > 0 
    ? (studentsWithAtt.reduce((sum, s) => sum + (parseFloat(s.attendanceOverall) || 0), 0) / studentsWithAtt.length).toFixed(1) + '%'
    : '—';

  const pendingApprovals = auditLogs.filter(l => l.action === 'CORRECTION_APPROVAL');

  // Compute actual batch data
  const batches = ['IV Year', 'III Year', 'II Year', 'I Year'].map(yr => {
    const batchList = deptStudents.filter(s => s.year === yr);
    const withAtt = batchList.filter(s => s.attendanceOverall !== undefined && s.attendanceOverall !== null);
    const avg = withAtt.length > 0
      ? (withAtt.reduce((sum, s) => sum + (parseFloat(s.attendanceOverall) || 0), 0) / withAtt.length).toFixed(1)
      : null;
    const condonation = batchList.filter(s => s.attendanceOverall >= 65 && s.attendanceOverall < 75).length;
    return {
      year: yr,
      count: batchList.length,
      avg,
      condonation
    };
  });

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
              Dept Code: {deptObj.code} • Established {deptObj.establishedYear}
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
            {deptObj.name} Administration
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Head of Department: <strong>{currentUser?.profile?.name || deptObj.hod}</strong> • Tirumala Engineering College, Narasaraopet
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('attendance-upload')} 
            className="btn btn-accent btn-sm"
          >
            <FileSpreadsheet size={15} /> Upload Attendance
          </button>
          <button 
            onClick={() => setActiveTab('student-records')} 
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <UserCheck size={15} /> Student Records
          </button>
          <button 
            onClick={() => setActiveTab('students-classes')} 
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <GraduationCap size={15} /> Student Directory
          </button>
        </div>
      </div>

      {/* Metric Cards - Real Data & Clean Empty States */}
      <div className="grid-4">
        <StatCard 
          title="Total Department Students"
          value={`${deptStudents.length}`}
          subtitle={deptStudents.length > 0 ? "Active Enrolled Roster" : "No students registered yet"}
          icon={Users}
          color="primary"
          badgeText={deptStudents.length > 0 ? "Active Roster" : "Empty"}
          badgeType={deptStudents.length > 0 ? "primary" : "neutral"}
        />

        <StatCard 
          title="Faculty Strength"
          value={FACULTY_MEMBERS.length ? `${FACULTY_MEMBERS.length}` : "—"}
          subtitle="Department Faculty Roster"
          icon={BookOpen}
          color="purple"
          badgeText="Active Staff"
          badgeType="primary"
        />

        <StatCard 
          title="Dept Avg Attendance"
          value={deptAvgAtt}
          subtitle={studentsWithAtt.length > 0 ? "From published registers" : "No attendance recorded yet"}
          icon={Percent}
          color="success"
          badgeText={studentsWithAtt.length > 0 ? "Verified" : "Pending"}
          badgeType={studentsWithAtt.length > 0 ? "success" : "neutral"}
        />

        <StatCard 
          title="Semester Pass Rate"
          value="—"
          subtitle="Awaiting Semester Results"
          icon={Award}
          color="accent"
          badgeText="Official"
          badgeType="neutral"
        />
      </div>

      {/* Faculty Submission Compliance & Class Summaries */}
      <div className="grid-2">
        {/* Faculty Upload Compliance Monitor (PRD 4.3 & 6.7) */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Faculty Upload Compliance Tracker</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Department Monthly Spreadsheet Submissions</p>
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

        {/* Batch-wise Attendance Overview - Real Data / Clean Empty State */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Class Batch Performance</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Real section averages in {assignedBranch}</p>
            </div>
            <button 
              onClick={() => setActiveTab('students-classes')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              Class Roster <ArrowRight size={14} />
            </button>
          </div>

          {deptStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <Users size={28} style={{ color: '#94a3b8', margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.95rem' }}>No students registered yet</div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                Batch averages will display automatically once students are enrolled in {assignedBranch}.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {batches.filter(b => b.count > 0).map(b => (
                <div key={b.year} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700 }}>{b.year} B.Tech {assignedBranch}</span>
                    <span style={{ fontWeight: 800, color: b.avg && parseFloat(b.avg) >= 75 ? '#059669' : '#d97706' }}>
                      {b.avg ? `${b.avg}% Avg` : 'No attendance yet'}
                    </span>
                  </div>
                  {b.avg && (
                    <div className="attendance-progress-bar">
                      <div className={`attendance-progress-fill ${parseFloat(b.avg) >= 75 ? 'fill-safe' : 'fill-warning'}`} style={{ width: `${b.avg}%` }}></div>
                    </div>
                  )}
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>
                    {b.count} Student{b.count === 1 ? '' : 's'} enrolled • {b.condonation} Under Condonation Alert
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
