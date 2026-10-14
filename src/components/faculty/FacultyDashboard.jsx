import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PortalHeader from '../common/PortalHeader';
import FacultyOverview from './FacultyOverview';
import FacultyTimetable from './FacultyTimetable';
import FacultySubjects from './FacultySubjects';
import FacultyStudents from './FacultyStudents';
import ManualAttendance from './ManualAttendance';
import AttendanceUploadWorkflow from './AttendanceUploadWorkflow';
import FacultyReports from './FacultyReports';
import FacultySettings from './FacultySettings';
import StudentCreationModal from './StudentCreationModal';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Users, 
  CheckSquare, 
  Upload, 
  FileSpreadsheet, 
  Settings 
} from 'lucide-react';

export default function FacultyDashboard() {
  const { activeTab, setActiveTab } = useAuth();
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'timetable', label: 'My Timetable', icon: Calendar },
    { id: 'subjects', label: 'My Subjects & Classes', icon: BookOpen },
    { id: 'students', label: 'Students Roster', icon: Users },
    { id: 'manual-attendance', label: 'Manual Attendance', icon: CheckSquare },
    { id: 'uploads', label: 'Attendance Uploads (PRD)', icon: Upload },
    { id: 'reports', label: 'Reports & Compliance', icon: FileSpreadsheet },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', display: 'flex', flexDirection: 'column' }}>
      <PortalHeader />

      <div className="container-wide" style={{ padding: '1.5rem', flex: 1, display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Sidebar Navigation */}
        <aside style={{ width: '260px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '0.75rem', flexShrink: 0, position: 'sticky', top: '100px' }} className="portal-sidebar">
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', padding: '0.5rem 0.75rem 0.25rem' }}>
            Faculty Workspace
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
          {activeTab === 'overview' && <FacultyOverview onOpenAddStudent={() => setAddStudentOpen(true)} />}
          {activeTab === 'timetable' && <FacultyTimetable />}
          {activeTab === 'subjects' && <FacultySubjects />}
          {activeTab === 'students' && <FacultyStudents onOpenAddStudent={() => setAddStudentOpen(true)} />}
          {activeTab === 'manual-attendance' && <ManualAttendance />}
          {activeTab === 'uploads' && <AttendanceUploadWorkflow />}
          {activeTab === 'reports' && <FacultyReports />}
          {activeTab === 'settings' && <FacultySettings />}
        </main>
      </div>

      {/* Reusable Student Creation Dialog */}
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
