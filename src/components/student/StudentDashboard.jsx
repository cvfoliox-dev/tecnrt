import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PortalHeader from '../common/PortalHeader';
import StudentOverview from './StudentOverview';
import StudentProfile from './StudentProfile';
import SemesterSubjects from './SemesterSubjects';
import AttendanceView from './AttendanceView';
import ExaminationsView from './ExaminationsView';
import FeesPaymentView from './FeesPaymentView';
import StudentSettings from './StudentSettings';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Percent, 
  FileText, 
  CreditCard, 
  Settings 
} from 'lucide-react';

export default function StudentDashboard() {
  const { activeTab, setActiveTab } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'subjects', label: 'Semester & Subjects', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Percent },
    { id: 'exams', label: 'Examinations & Supplies', icon: FileText },
    { id: 'fees', label: 'Fees & Payment', icon: CreditCard },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', display: 'flex', flexDirection: 'column' }}>
      <PortalHeader />

      <div className="container-wide" style={{ padding: '1.5rem', flex: 1, display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar Navigation */}
        <aside style={{ width: '250px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '0.75rem', flexShrink: 0, position: 'sticky', top: '100px' }} className="portal-sidebar">
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', padding: '0.5rem 0.75rem 0.25rem' }}>
            Student Navigation
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
                    background: isActive ? '#eff6ff' : 'transparent',
                    color: isActive ? '#1d4ed8' : '#475569',
                    border: 'none',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={17} style={{ color: isActive ? '#1d4ed8' : '#64748b' }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'overview' && <StudentOverview />}
          {activeTab === 'profile' && <StudentProfile />}
          {activeTab === 'subjects' && <SemesterSubjects />}
          {activeTab === 'attendance' && <AttendanceView />}
          {activeTab === 'exams' && <ExaminationsView />}
          {activeTab === 'fees' && <FeesPaymentView />}
          {activeTab === 'settings' && <StudentSettings />}
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
