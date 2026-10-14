import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PortalHeader from '../common/PortalHeader';
import PrincipalOverview from './PrincipalOverview';
import PrincipalDeptManagement from './PrincipalDeptManagement';
import PrincipalHODManagement from './PrincipalHODManagement';
import PrincipalFacultyOverview from './PrincipalFacultyOverview';
import PrincipalStudentOverview from './PrincipalStudentOverview';
import PrincipalCollegeWideAttendance from './PrincipalCollegeWideAttendance';
import PrincipalAcademicReports from './PrincipalAcademicReports';
import PrincipalAuditTrail from './PrincipalAuditTrail';
import PrincipalSettings from './PrincipalSettings';
import { 
  Building2, 
  Users, 
  UserCheck, 
  GraduationCap, 
  Percent, 
  Award, 
  ShieldCheck, 
  Settings,
  LayoutDashboard 
} from 'lucide-react';

export default function PrincipalDashboard() {
  const { activeTab, setActiveTab } = useAuth();

  const navItems = [
    { id: 'college-overview', label: 'College Overview', icon: LayoutDashboard },
    { id: 'dept-management', label: 'Department Management', icon: Building2 },
    { id: 'hod-management', label: 'HOD Leadership', icon: UserCheck },
    { id: 'faculty-overview', label: 'Faculty Overview', icon: Users },
    { id: 'student-overview', label: 'Student Overview', icon: GraduationCap },
    { id: 'college-attendance', label: 'College-Wide Attendance', icon: Percent },
    { id: 'academic-reports', label: 'Academic & Accreditation', icon: Award },
    { id: 'audit-trail', label: 'Administrative Audit Trail', icon: ShieldCheck },
    { id: 'settings', label: 'Institutional Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', display: 'flex', flexDirection: 'column' }}>
      <PortalHeader />

      <div className="container-wide" style={{ padding: '1.5rem', flex: 1, display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar Navigation */}
        <aside style={{ width: '270px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '0.75rem', flexShrink: 0, position: 'sticky', top: '100px' }} className="portal-sidebar">
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', padding: '0.5rem 0.75rem 0.25rem' }}>
            Principal Executive
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? '#fef3c7' : 'transparent',
                    color: isActive ? '#92400e' : '#475569',
                    border: 'none',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={17} style={{ color: isActive ? '#d97706' : '#64748b' }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'college-overview' && <PrincipalOverview />}
          {activeTab === 'dept-management' && <PrincipalDeptManagement />}
          {activeTab === 'hod-management' && <PrincipalHODManagement />}
          {activeTab === 'faculty-overview' && <PrincipalFacultyOverview />}
          {activeTab === 'student-overview' && <PrincipalStudentOverview />}
          {activeTab === 'college-attendance' && <PrincipalCollegeWideAttendance />}
          {activeTab === 'academic-reports' && <PrincipalAcademicReports />}
          {activeTab === 'audit-trail' && <PrincipalAuditTrail />}
          {activeTab === 'settings' && <PrincipalSettings />}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .portal-sidebar { width: 100% !important; position: static !important; }
          .container-wide { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
