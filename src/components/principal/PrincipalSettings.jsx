import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Shield, Lock, CheckCircle2, Save } from 'lucide-react';

export default function PrincipalSettings() {
  const { showToast } = useAuth();

  const [minAttendanceThreshold, setMinAttendanceThreshold] = useState(75);
  const [condonationMin, setCondonationMin] = useState(65);
  const [lockAttendanceDate, setLockAttendanceDate] = useState('2026-10-31');

  const handleSavePolicy = (e) => {
    e.preventDefault();
    showToast("Institutional Academic Policy parameters updated.", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '850px' }}>
      
      {/* Policy Settings Form */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={18} style={{ color: '#1d4ed8' }} />
          College Attendance & Academic Threshold Policy (PRD 6.3 & 6.6)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Configure university compliance thresholds enforced across all 8 engineering departments.
        </p>

        <form onSubmit={handleSavePolicy}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Mandatory Regular Eligibility Threshold (%)</label>
              <input 
                type="number" 
                className="form-input" 
                value={minAttendanceThreshold}
                onChange={(e) => setMinAttendanceThreshold(e.target.value)}
              />
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>JNTUK Standard: 75%</span>
            </div>

            <div className="form-group">
              <label className="form-label">Condonation Permissible Minimum (%)</label>
              <input 
                type="number" 
                className="form-input" 
                value={condonationMin}
                onChange={(e) => setCondonationMin(e.target.value)}
              />
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Below this threshold, student is liable for detention (&lt;65%)</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Monthly Attendance Submission Deadline / Locking Date</label>
            <input 
              type="date" 
              className="form-input" 
              value={lockAttendanceDate}
              onChange={(e) => setLockAttendanceDate(e.target.value)}
            />
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>After this date, faculty spreadsheet uploads require HOD re-authorization.</span>
          </div>

          <button type="submit" className="btn btn-primary">
            <Save size={15} /> Save Institutional Rules
          </button>
        </form>
      </div>

      {/* Role-Based Access Control Matrix (PRD Section 13.2 & 14.2) */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} style={{ color: '#059669' }} />
          Role-Based Access Control (RBAC) Matrix
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Enforced strictly at Spring Boot REST API endpoints and PostgreSQL Supabase schemas.
        </p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Operation / Capability</th>
                <th>Student</th>
                <th>Faculty</th>
                <th>HOD</th>
                <th>Principal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>View Personal Attendance & Fees</td>
                <td><strong style={{ color: '#059669' }}>✓ Yes</strong></td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Upload Monthly Attendance Spreadsheet</td>
                <td>✕ Denied</td>
                <td><strong style={{ color: '#059669' }}>✓ Assigned Class</strong></td>
                <td><strong style={{ color: '#059669' }}>✓ Department</strong></td>
                <td><strong style={{ color: '#059669' }}>✓ Oversight</strong></td>
              </tr>
              <tr>
                <td>Approve Attendance Correction</td>
                <td>✕ Denied</td>
                <td>✕ Request Only</td>
                <td><strong style={{ color: '#059669' }}>✓ Department</strong></td>
                <td><strong style={{ color: '#059669' }}>✓ Institution</strong></td>
              </tr>
              <tr>
                <td>Create New Student Record</td>
                <td>✕ Denied</td>
                <td><strong style={{ color: '#059669' }}>✓ Authorized</strong></td>
                <td><strong style={{ color: '#059669' }}>✓ Authorized</strong></td>
                <td><strong style={{ color: '#059669' }}>✓ Full</strong></td>
              </tr>
              <tr>
                <td>College-Wide Cross Department Oversight</td>
                <td>✕ Denied</td>
                <td>✕ Denied</td>
                <td>✕ Denied</td>
                <td><strong style={{ color: '#059669' }}>✓ Full Institution</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
