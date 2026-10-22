import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck, GraduationCap, Briefcase, Building2, Globe } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/mockData';

export default function RoleSwitcherBar() {
  const { currentUser, quickSwitchRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = (role) => {
    quickSwitchRole(role);
    if (role === 'public') {
      navigate('/');
    } else {
      navigate(`/portal/${role}`);
    }
  };

  return (
    <div className="role-switcher-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#fbbf24' }}>
          <ShieldCheck size={16} />
          EAPCET Code: {COLLEGE_INFO.eamcetCode}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <span style={{ color: '#cbd5e1' }}>
          {COLLEGE_INFO.shortName} Narasaraopet: Integrated Portal Reviewer Suite
        </span>
      </div>

      <div className="role-btn-group">
        <span style={{ color: '#94a3b8', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.25rem' }}>
          Live View:
        </span>

        <button
          className={`role-tag-btn ${currentUser.role === 'public' ? 'active' : ''}`}
          onClick={() => handleSwitch('public')}
          title="College Public Website"
        >
          <Globe size={13} />
          Public Site
        </button>

        <button
          className={`role-tag-btn ${currentUser.role === 'student' ? 'active' : ''}`}
          onClick={() => handleSwitch('student')}
          title="Student Dashboard (21TML0501)"
        >
          <GraduationCap size={13} />
          Student (Sai Vardhan)
        </button>

        <button
          className={`role-tag-btn ${currentUser.role === 'faculty' ? 'active' : ''}`}
          onClick={() => handleSwitch('faculty')}
          title="Faculty Dashboard (Sri Ch. Mahesh Babu)"
        >
          <Briefcase size={13} />
          Faculty (Mahesh Babu)
        </button>

        <button
          className={`role-tag-btn ${currentUser.role === 'hod' ? 'active' : ''}`}
          onClick={() => handleSwitch('hod')}
          title="HOD Dashboard (Dr. K. Srinivasa Rao)"
        >
          <Building2 size={13} />
          HOD (CSE Dept)
        </button>

        <button
          className={`role-tag-btn ${currentUser.role === 'principal' ? 'active' : ''}`}
          onClick={() => handleSwitch('principal')}
          title="Principal Dashboard (Dr. V. Narayana)"
        >
          <UserCheck size={13} />
          Principal (Dr. V. Narayana)
        </button>
      </div>
    </div>
  );
}
