import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Search, UserPlus, Filter, Award } from 'lucide-react';

export default function HODStudentsAndClasses({ onOpenAddStudent }) {
  const { students } = useAuth();
  const [selectedYear, setSelectedYear] = useState('All');
  const [search, setSearch] = useState('');

  const cseStudents = students.filter(s => s.department === 'CSE');

  const filtered = cseStudents.filter(s => {
    const matchesYear = selectedYear === 'All' || s.year === selectedYear;
    const matchesSearch = s.rollNumber.toLowerCase().includes(search.toLowerCase()) || 
                          s.name.toLowerCase().includes(search.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #f59e0b' }}>
        <div>
          <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
            Departmental Enrollment
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            CSE Students & Class Sections Directory
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Manage authorized student cohorts across Sections A, B, and C.
          </p>
        </div>

        <button onClick={onOpenAddStudent} className="btn btn-primary">
          <UserPlus size={16} /> Enroll New Student (PRD 7.1)
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search Roll No or Student Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'IV Year', 'III Year', 'II Year', 'I Year'].map(yr => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`btn btn-sm ${selectedYear === yr ? 'btn-primary' : 'btn-outline'}`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Year & Semester</th>
              <th>Section</th>
              <th>Overall Attendance %</th>
              <th>Current CGPA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><strong style={{ color: '#1d4ed8' }}>{s.rollNumber}</strong></td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{s.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Father: {s.fatherName}</div>
                </td>
                <td>{s.year} ({s.semester})</td>
                <td><span className="badge badge-primary">Sec {s.section}</span></td>
                <td>
                  <strong style={{ color: s.attendanceOverall >= 75 ? '#059669' : s.attendanceOverall >= 65 ? '#d97706' : '#dc2626' }}>
                    {s.attendanceOverall}%
                  </strong>
                </td>
                <td><strong>{s.cgpa}</strong></td>
                <td>
                  <span className={`badge ${s.attendanceOverall >= 75 ? 'badge-success' : s.attendanceOverall >= 65 ? 'badge-warning' : 'badge-danger'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
