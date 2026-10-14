import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DEPARTMENTS } from '../../data/mockData';
import { Building2, Users, BookOpen, Percent, Award, ArrowRight, Eye, X } from 'lucide-react';

export default function PrincipalDeptManagement() {
  const { showToast } = useAuth();
  const [selectedDept, setSelectedDept] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #1d4ed8' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Institutional Organization
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Academic Departments Oversight (All 8 B.Tech Branches + AS&H)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            College-wide oversight of department assignments, student distribution, and academic health.
          </p>
        </div>
      </div>

      {/* Departments Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Dept Code</th>
              <th>Department Name</th>
              <th>Head of Department (HOD)</th>
              <th>Enrolled Students</th>
              <th>Faculty Strength</th>
              <th>Avg Attendance</th>
              <th>Pass Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {DEPARTMENTS.map(dept => (
              <tr key={dept.id}>
                <td><strong style={{ color: '#1d4ed8' }}>{dept.code} ({dept.id})</strong></td>
                <td><strong>{dept.name}</strong></td>
                <td>{dept.hod}</td>
                <td>{dept.studentsCount} Students</td>
                <td>{dept.facultyCount} Faculty</td>
                <td>
                  <strong style={{ color: dept.avgAttendance >= 85 ? '#059669' : '#d97706' }}>
                    {dept.avgAttendance}%
                  </strong>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{dept.passRate}%</span>
                </td>
                <td>
                  <button 
                    onClick={() => setSelectedDept(dept)}
                    className="btn btn-outline-primary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
                  >
                    <Eye size={13} /> Drill-down
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drilldown Modal (PRD 4.4: Principal may navigate to a department according to institutional permissions) */}
      {selectedDept && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large">
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>{selectedDept.name} ({selectedDept.id})</h3>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
                  Institutional Oversight Drill-down • HOD: {selectedDept.hod}
                </div>
              </div>
              <button onClick={() => setSelectedDept(null)} style={{ background: 'none', border: 'none', color: '#cbd5e1' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1d4ed8' }}>{selectedDept.studentsCount}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Scholars Enrolled</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>{selectedDept.facultyCount}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Faculty Headcount</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d97706' }}>{selectedDept.avgAttendance}%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Average Attendance</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#7e22ce' }}>{selectedDept.passRate}%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>JNTUK Pass Ratio</div>
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.5rem' }}>Department Description & Infrastructure</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                {selectedDept.description}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedDept.specializations.map((spec, i) => (
                  <span key={i} className="badge badge-primary">{spec}</span>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedDept(null)} className="btn btn-outline">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
