import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Search, Filter, AlertTriangle, CheckCircle2, UserPlus, Phone, Mail } from 'lucide-react';

export default function FacultyStudents({ onOpenAddStudent }) {
  const { students } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter students
  const filtered = students.filter(s => {
    const matchesSearch = s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'Condonation') {
      return matchesSearch && s.attendanceOverall < 75 && s.attendanceOverall >= 65;
    }
    if (filterStatus === 'Detention') {
      return matchesSearch && s.attendanceOverall < 65;
    }
    if (filterStatus === 'Eligible') {
      return matchesSearch && s.attendanceOverall >= 75;
    }
    return matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header with Search and Actions */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Class Student Roster (IV B.Tech CSE)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Authorized students enrolled in your teaching sections.
          </p>
        </div>

        <button onClick={onOpenAddStudent} className="btn btn-primary">
          <UserPlus size={16} /> Add Student Record (PRD 5.2)
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by Roll No or Student Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setFilterStatus('All')} 
            className={`btn btn-sm ${filterStatus === 'All' ? 'btn-primary' : 'btn-outline'}`}
          >
            All Students ({students.length})
          </button>
          <button 
            onClick={() => setFilterStatus('Eligible')} 
            className={`btn btn-sm ${filterStatus === 'Eligible' ? 'btn-primary' : 'btn-outline'}`}
          >
            Eligible (≥75%)
          </button>
          <button 
            onClick={() => setFilterStatus('Condonation')} 
            className={`btn btn-sm ${filterStatus === 'Condonation' ? 'btn-accent' : 'btn-outline'}`}
          >
            Condonation (65-74%)
          </button>
          <button 
            onClick={() => setFilterStatus('Detention')} 
            className={`btn btn-sm ${filterStatus === 'Detention' ? 'btn-danger' : 'btn-outline'}`}
            style={{ color: filterStatus === 'Detention' ? '#ffffff' : '#dc2626' }}
          >
            Detention Alert (&lt;65%)
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Dept / Sec</th>
              <th>Year / Sem</th>
              <th>Classes (Attended / Held)</th>
              <th>Attendance %</th>
              <th>Academic Status</th>
              <th>Contact Info</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const isDetained = s.attendanceOverall < 65;
              const isCondonation = s.attendanceOverall < 75 && s.attendanceOverall >= 65;
              return (
                <tr key={s.id}>
                  <td><strong style={{ color: '#1d4ed8' }}>{s.rollNumber}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{s.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Father: {s.fatherName}</div>
                  </td>
                  <td>{s.department} - {s.section}</td>
                  <td>{s.year} ({s.semester})</td>
                  <td>
                    <span>{s.totalClassesAttended} / {s.totalClassesHeld}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 800, color: isDetained ? '#dc2626' : isCondonation ? '#d97706' : '#059669' }}>
                        {s.attendanceOverall}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${isDetained ? 'badge-danger' : isCondonation ? 'badge-warning' : 'badge-success'}`}>
                      {isDetained ? 'Detention Warning' : isCondonation ? 'Condonation' : 'Eligible'}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                      <div>{s.phone}</div>
                      <div style={{ color: '#2563eb' }}>{s.email}</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
