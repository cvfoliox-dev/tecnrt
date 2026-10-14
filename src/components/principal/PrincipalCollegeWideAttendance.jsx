import React from 'react';
import { DEPARTMENTS } from '../../data/mockData';
import { Percent, CheckCircle2, AlertTriangle, Download, Printer } from 'lucide-react';

export default function PrincipalCollegeWideAttendance() {
  const overallCollegeAvg = 85.2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #059669' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            JNTUK Statutory Compliance
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            College-Wide Institutional Attendance Analytics
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Comparative attendance metrics across all engineering disciplines for ODD Semester 2026-27.
          </p>
        </div>

        <div style={{ background: '#ecfdf5', padding: '0.75rem 1.25rem', borderRadius: '10px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>
            {overallCollegeAvg}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#065f46', fontWeight: 700 }}>
            Institutional Aggregate
          </div>
        </div>
      </div>

      {/* Comparative Department Progress Bars */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem' }}>
          Department-Wise Attendance Performance Matrix (PRD 4.4 & 6.7)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {DEPARTMENTS.map(dept => {
            const isSafe = dept.avgAttendance >= 80;
            return (
              <div key={dept.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-primary">{dept.id}</span>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{dept.name}</strong>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '1.1rem', color: isSafe ? '#059669' : '#d97706' }}>
                      {dept.avgAttendance}%
                    </strong>
                  </div>
                </div>

                <div className="attendance-progress-bar" style={{ height: '10px' }}>
                  <div 
                    className={`attendance-progress-fill ${isSafe ? 'fill-safe' : 'fill-warning'}`}
                    style={{ width: `${dept.avgAttendance}%` }}
                  ></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
                  <span>HOD: {dept.hod}</span>
                  <span>Enrolled: {dept.studentsCount} Students • {dept.facultyCount} Faculty</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
