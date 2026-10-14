import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, Calendar, Upload, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FacultySubjects() {
  const { currentUser, setActiveTab } = useAuth();
  const faculty = currentUser.profile || {};
  const subjects = faculty.assignedSubjects || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #10b981' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            Teaching Portfolio
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Assigned Subjects & Teaching Workload
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Authorized courses under JNTUK curriculum mapping for ODD Semester 2026-27.
          </p>
        </div>
      </div>

      {/* Courses Cards */}
      <div className="grid-2">
        {subjects.map((sub, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary">{sub.code}</span>
                <span className="badge badge-accent">{sub.period}</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.4rem' }}>
                {sub.name}
              </h3>

              <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
                Class: <strong style={{ color: '#0f172a' }}>{sub.class}</strong> • Enrolled Strength: <strong style={{ color: '#0f172a' }}>{sub.studentsCount} Students</strong>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#64748b' }}>Curriculum Units Delivered:</span>
                  <strong style={{ color: '#1d4ed8' }}>4 of 5 Units (85%)</strong>
                </div>
                <div className="attendance-progress-bar">
                  <div className="attendance-progress-fill fill-safe" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
              <button 
                onClick={() => setActiveTab('uploads')}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                <Upload size={14} /> Upload Sheet
              </button>
              <button 
                onClick={() => setActiveTab('students')}
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                <Users size={14} /> View Students
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
