import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Search, Filter, Eye, X } from 'lucide-react';

export default function PrincipalStudentOverview() {
  const { students } = useAuth();
  const [selectedDept, setSelectedDept] = useState('All');
  const [search, setSearch] = useState('');
  const [activeStudentModal, setActiveStudentModal] = useState(null);

  const filtered = students.filter(s => {
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    const matchesSearch = s.rollNumber.toLowerCase().includes(search.toLowerCase()) || 
                          s.name.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #2563eb' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Institution Records
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            College-Wide Student Enrollment Registry
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            PRD 4.4 Authorized student-level drill-down across all 8 branches.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search Roll Number or Student Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'CSE', 'AIML', 'AIDS', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'].map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`btn btn-sm ${selectedDept === dept ? 'btn-primary' : 'btn-outline'}`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Year & Semester</th>
              <th>Section</th>
              <th>Attendance %</th>
              <th>CGPA</th>
              <th>Standing</th>
              <th>Action</th>
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
                  </td>
                  <td><span className="badge badge-primary">{s.department}</span></td>
                  <td>{s.year} ({s.semester})</td>
                  <td>Sec {s.section}</td>
                  <td>
                    <strong style={{ color: isDetained ? '#dc2626' : isCondonation ? '#d97706' : '#059669' }}>
                      {s.attendanceOverall}%
                    </strong>
                  </td>
                  <td><strong>{s.cgpa}</strong></td>
                  <td>
                    <span className={`badge ${isDetained ? 'badge-danger' : isCondonation ? 'badge-warning' : 'badge-success'}`}>
                      {isDetained ? 'Detention Warning' : isCondonation ? 'Condonation' : 'Eligible'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setActiveStudentModal(s)}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    >
                      <Eye size={12} /> View File
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Authorized Drill-down Student File Modal (PRD 4.4) */}
      {activeStudentModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Official Student Confidential Record</h3>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
                  Roll Number: {activeStudentModal.rollNumber} • {activeStudentModal.department}
                </div>
              </div>
              <button onClick={() => setActiveStudentModal(null)} style={{ background: 'none', border: 'none', color: '#cbd5e1' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <div>Legal Name: <strong>{activeStudentModal.name}</strong></div>
                <div>Parent: <strong>{activeStudentModal.fatherName}</strong></div>
                <div>Branch: <strong>{activeStudentModal.department}</strong></div>
                <div>Semester: <strong>{activeStudentModal.semester}</strong></div>
                <div>Admission: <strong>{activeStudentModal.admissionType}</strong></div>
                <div>Contact: <strong>{activeStudentModal.phone}</strong></div>
                <div>Attendance: <strong style={{ color: activeStudentModal.attendanceOverall >= 75 ? '#059669' : '#dc2626' }}>{activeStudentModal.attendanceOverall}%</strong></div>
                <div>Cumulative CGPA: <strong>{activeStudentModal.cgpa}</strong></div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#475569' }}>
                Address: {activeStudentModal.address}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setActiveStudentModal(null)} className="btn btn-primary">Close File</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
