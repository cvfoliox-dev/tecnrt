import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Download, Printer, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function FacultyReports() {
  const { students, showToast } = useAuth();
  const cseStudents = students.filter(s => s.department === 'CSE');

  const [selectedReport, setSelectedReport] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  const lowAttendanceStudents = cseStudents.filter(s => s.attendanceOverall < 75);

  const handleExportCSV = () => {
    const headers = "Roll Number,Student Name,Department,Section,Attended,Held,Attendance %\n";
    const rows = cseStudents.map(s => `"${s.rollNumber}","${s.name}","${s.department}","${s.section}",${s.totalClassesAttended},${s.totalClassesHeld},${s.attendanceOverall}%`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Faculty_Attendance_Report_${selectedMonth.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Faculty Attendance Report exported as CSV!", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #7e22ce' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Academic Reporting Module
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Class Attendance & Compliance Reports
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Generate official monthly registers and condonation warning notices for HOD review.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleExportCSV} className="btn btn-outline-primary">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={() => window.print()} className="btn btn-primary">
            <Printer size={15} /> Print Report
          </button>
        </div>
      </div>

      {/* Low Attendance Warning Letter Notice */}
      <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={20} style={{ color: '#dc2626' }} />
            <h3 style={{ fontSize: '1.05rem', color: '#991b1b' }}>
              Condonation & Detention Shortfall Notice ({lowAttendanceStudents.length} Students)
            </h3>
          </div>
          <span className="badge badge-danger">Threshold &lt; 75%</span>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
          Under JNTUK attendance regulations, the following students in IV B.Tech CSE-A are at risk of condonation fees or examination detention if absences continue.
        </p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Classes Attended</th>
                <th>Total Classes</th>
                <th>Attendance %</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lowAttendanceStudents.map(s => {
                const isDetained = s.attendanceOverall < 65;
                return (
                  <tr key={s.id}>
                    <td><strong style={{ color: '#1d4ed8' }}>{s.rollNumber}</strong></td>
                    <td>{s.name}</td>
                    <td>{s.totalClassesAttended}</td>
                    <td>{s.totalClassesHeld}</td>
                    <td>
                      <strong style={{ color: isDetained ? '#dc2626' : '#d97706' }}>
                        {s.attendanceOverall}%
                      </strong>
                    </td>
                    <td>
                      <span className={`badge ${isDetained ? 'badge-danger' : 'badge-warning'}`}>
                        {isDetained ? 'Detention Risk (<65%)' : 'Condonation (65-74%)'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => showToast(`Sent parent intimation SMS to ${s.phone}`, "info")}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                      >
                        Intimate Parent
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
