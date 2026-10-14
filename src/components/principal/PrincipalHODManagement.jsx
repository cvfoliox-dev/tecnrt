import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DEPARTMENTS } from '../../data/mockData';
import { UserCheck, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';

export default function PrincipalHODManagement() {
  const { showToast } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #f59e0b' }}>
        <div>
          <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
            Academic Leadership
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Heads of Department (HOD) Directory & Performance
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Direct leadership contacts and departmental compliance governance.
          </p>
        </div>

        <button 
          onClick={() => showToast("Dispatched all-HOD institutional meeting notice.", "info")}
          className="btn btn-primary"
        >
          Dispatch HOD Circular
        </button>
      </div>

      {/* HOD Cards Grid */}
      <div className="grid-3">
        {DEPARTMENTS.map(dept => (
          <div key={dept.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary">{dept.id} HOD</span>
                <span className="badge badge-success">Active Appointment</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                {dept.hod}
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600, marginBottom: '0.75rem' }}>
                Head of Department, {dept.name}
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={13} style={{ color: '#2563eb' }} />
                  <span style={{ color: '#1d4ed8' }}>{dept.hodEmail}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                  <span style={{ color: '#64748b' }}>Students under supervision:</span>
                  <strong>{dept.studentsCount}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Faculty under supervision:</span>
                  <strong>{dept.facultyCount}</strong>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
              <span style={{ color: '#059669', fontWeight: 700 }}>Avg Attendance: {dept.avgAttendance}%</span>
              <button 
                onClick={() => showToast(`Initiated direct correspondence with ${dept.hod}`, "info")}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
              >
                Contact HOD
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
