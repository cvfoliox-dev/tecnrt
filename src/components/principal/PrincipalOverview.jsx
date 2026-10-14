import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_INFO, DEPARTMENTS } from '../../data/mockData';
import StatCard from '../common/StatCard';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  Percent, 
  Award, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function PrincipalOverview() {
  const { currentUser, setActiveTab, auditLogs } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Principal Executive Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #09142b 0%, #0e2154 50%, #17337f 100%)', 
        borderRadius: '16px', 
        padding: '1.75rem', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-lg)',
        borderLeft: '5px solid #f59e0b'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-accent">
              Principal Executive Suite
            </span>
            <span style={{ color: '#93c5fd', fontSize: '0.8rem' }}>
              EAPCET Code: {COLLEGE_INFO.eamcetCode} • JNTUK Permanent Affiliation
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
            Institutional Governance & Oversight
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Principal: <strong>{COLLEGE_INFO.principal.name}</strong> ({COLLEGE_INFO.principal.qualification}) • Tirumala Engineering College
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('college-attendance')} 
            className="btn btn-accent btn-sm"
          >
            <Percent size={15} /> College Attendance Matrix
          </button>
          <button 
            onClick={() => setActiveTab('audit-trail')} 
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <ShieldCheck size={15} /> System Audit Trail
          </button>
        </div>
      </div>

      {/* College-wide KPIs */}
      <div className="grid-4">
        <StatCard 
          title="Total Student Body"
          value="3,450"
          subtitle="8 B.Tech Branches + AS&H"
          icon={GraduationCap}
          color="primary"
          badgeText="Active Scholars"
          badgeType="primary"
        />

        <StatCard 
          title="College Faculty Roster"
          value="185"
          subtitle="Across 8 Engineering Depts"
          icon={Users}
          color="purple"
          badgeText="Verified Staff"
          badgeType="primary"
        />

        <StatCard 
          title="College Attendance Avg"
          value="85.2%"
          subtitle="Mandatory JNTUK Benchmark"
          icon={Percent}
          color="success"
          badgeText="Institutional Safe"
          badgeType="success"
        />

        <StatCard 
          title="Campus Placements"
          value="88.4%"
          subtitle="624 Offers (Highest 18.5 LPA)"
          icon={Award}
          color="accent"
          badgeText="2025-26 Batch"
          badgeType="success"
        />
      </div>

      {/* Cross-Department Comparison Table & Recent Audit Logs */}
      <div className="grid-2">
        {/* Department Comparison (PRD 4.4 & 5.4) */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Department Academic Standing</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Comparative attendance and enrollment metrics</p>
            </div>
            <button 
              onClick={() => setActiveTab('dept-management')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              All Depts <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {DEPARTMENTS.slice(0, 5).map(dept => (
              <div key={dept.id} style={{ padding: '0.75rem 0.85rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>
                    {dept.name} ({dept.id})
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    HOD: {dept.hod} • {dept.studentsCount} Students
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: dept.avgAttendance >= 85 ? '#059669' : '#d97706' }}>
                    {dept.avgAttendance}%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Avg Attendance</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Institutional Audit Feed (PRD 4.4 & 13.15) */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Institutional Audit Stream</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Real-time log of administrative and attendance actions</p>
            </div>
            <button 
              onClick={() => setActiveTab('audit-trail')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              Full Trail <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, color: '#1d4ed8' }}>{log.action}</span>
                  <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{log.timestamp}</span>
                </div>
                <div style={{ color: '#334155', lineHeight: 1.4 }}>
                  {log.details}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', color: '#64748b', fontSize: '0.7rem' }}>
                  <span>Actor: <strong>{log.user}</strong> ({log.role})</span>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
