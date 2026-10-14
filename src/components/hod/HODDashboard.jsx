import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PortalHeader from '../common/PortalHeader';
import HODOverview from './HODOverview';
import HODFacultyManagement from './HODFacultyManagement';
import HODStudentsAndClasses from './HODStudentsAndClasses';
import HODSubjectsAndAssignments from './HODSubjectsAndAssignments';
import HODAttendanceOverview from './HODAttendanceOverview';
import HODMonthlyReports from './HODMonthlyReports';
import HODAcademicAdministration from './HODAcademicAdministration';
import HODSettings from './HODSettings';
import StudentCreationModal from '../faculty/StudentCreationModal';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  Settings 
} from 'lucide-react';

export default function HODDashboard() {
  const { activeTab, setActiveTab } = useAuth();
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  const navItems = [
    { id: 'department-overview', label: 'Department Overview', icon: Building2 },
    { id: 'faculty-management', label: 'Faculty Management', icon: Users },
    { id: 'students-classes', label: 'Students & Classes', icon: GraduationCap },
    { id: 'subjects-assignments', label: 'Subjects & Assignments', icon: BookOpen },
    { id: 'attendance-overview', label: 'Attendance Overview (PRD)', icon: Percent },
    { id: 'monthly-reports', label: 'Monthly Reports', icon: Calendar },
    { id: 'academic-admin', label: 'Academic Administration', icon: ShieldCheck },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', display: 'flex', flexDirection: 'column' }}>
      <PortalHeader />

      <div className="container-wide" style={{ padding: '1.5rem', flex: 1, display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar Navigation */}
        <aside style={{ width: '270px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '0.75rem', flexShrink: 0, position: 'sticky', top: '100px' }} className="portal-sidebar">
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', padding: '0.5rem 0.75rem 0.25rem' }}>
            HOD Administration
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
                    background: isActive ? '#f3e8ff' : 'transparent',
                    color: isActive ? '#6b21a8' : '#475569',
                    border: 'none',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={17} style={{ color: isActive ? '#6b21a8' : '#64748b' }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'department-overview' && <HODOverview />}
          {activeTab === 'faculty-management' && <HODFacultyManagement />}
          {activeTab === 'students-classes' && <HODStudentsAndClasses onOpenAddStudent={() => setAddStudentOpen(true)} />}
          {activeTab === 'subjects-assignments' && <HODSubjectsAndAssignments />}
          {activeTab === 'attendance-overview' && <HODAttendanceOverview />}
          {activeTab === 'monthly-reports' && <HODMonthlyReports />}
          {activeTab === 'academic-admin' && <HODAcademicAdministration onOpenAddStudent={() => setAddStudentOpen(true)} />}
          {activeTab === 'settings' && <HODSettings />}
        </main>
      </div>

      <StudentCreationModal 
        isOpen={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
        defaultDepartment="CSE"
      />

      <style>{`
        @media (max-width: 900px) {
          .portal-sidebar { width: 100% !important; position: static !important; }
          .container-wide { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
