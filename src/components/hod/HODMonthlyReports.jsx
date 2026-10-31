import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Download, Printer, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function HODMonthlyReports() {
  const { showToast, uploadHistory = [], currentUser } = useAuth();
  const assignedBranch = currentUser?.profile?.department || 'CSE';
  const [selectedMonth, setSelectedMonth] = useState('');

  const deptUploads = (uploadHistory || []).filter(u => !u.department || u.department === assignedBranch);

  const monthlyStats = deptUploads.map(u => ({
    month: u.academicPeriod || 'Academic Period',
    held: u.classesHeld || u.totalClasses || '—',
    avgAtt: u.avgAttendance != null ? u.avgAttendance : (u.records?.length ? Math.round(u.records.reduce((acc, r) => acc + (parseFloat(r.percentage) || 0), 0) / u.records.length) : '—'),
    condonationCount: u.records ? u.records.filter(r => (parseFloat(r.percentage) || 0) < 75 && (parseFloat(r.percentage) || 0) >= 65).length : 0,
    detainedCount: u.records ? u.records.filter(r => (parseFloat(r.percentage) || 0) < 65).length : 0,
    complianceStatus: u.status || "Published"
  }));

  const handleExport = () => {
    const csvContent = "Month,Classes Held,Dept Avg %,Condonation Risk,Detention Risk,Status\n" + 
      monthlyStats.map(s => `"${s.month}",${s.held},${s.avgAtt === '—' ? '—' : s.avgAtt + '%'},${s.condonationCount},${s.detainedCount},"${s.complianceStatus}"`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${assignedBranch}_Department_Monthly_Attendance_Report.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`${assignedBranch} Department Monthly Report exported successfully!`, "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #f59e0b' }}>
        <div>
          <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
            Departmental Analytics
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Monthly Attendance Analytics & Statutory Registers
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Preserves monthly periods and historical records per PRD Section 6.4.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleExport} className="btn btn-outline-primary">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={() => window.print()} className="btn btn-primary">
            <Printer size={15} /> Print Register
          </button>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Academic Month</th>
              <th>Classes Conducted</th>
              <th>Department Average %</th>
              <th>Condonation Count (&lt;75%)</th>
              <th>Detention Warnings (&lt;65%)</th>
              <th>Institutional Approval</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {monthlyStats.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No monthly statutory registers generated yet. Monthly reports will populate automatically upon attendance uploads.
                </td>
              </tr>
            ) : (
              monthlyStats.map((st, i) => (
              <tr key={i}>
                <td><strong>{st.month}</strong></td>
                <td>{st.held !== '—' ? `${st.held} Sessions` : '—'}</td>
                <td>
                  <strong style={{ color: '#059669', fontSize: '0.95rem' }}>
                    {st.avgAtt !== '—' ? `${st.avgAtt}%` : '—'}
                  </strong>
                </td>
                <td>
                  <span className="badge badge-warning">{st.condonationCount} Students</span>
                </td>
                <td>
                  <span className="badge badge-danger">{st.detainedCount} Student</span>
                </td>
                <td>
                  <span className={`badge ${st.complianceStatus.includes('Approved') ? 'badge-success' : 'badge-primary'}`}>
                    {st.complianceStatus}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => showToast(`Loaded detailed audit for ${st.month}`, "info")}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  >
                    View Audit
                  </button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
