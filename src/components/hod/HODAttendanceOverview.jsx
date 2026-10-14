import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_SUBJECTS } from '../../data/mockData';
import { Percent, Search, Filter, Eye, X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function HODAttendanceOverview() {
  const { students, showToast, logAction } = useAuth();
  const cseStudents = students.filter(s => s.department === 'CSE');

  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('OVERALL');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [searchRoll, setSearchRoll] = useState('');
  const [detailModalStudent, setDetailModalStudent] = useState(null);

  // Filter students
  const filtered = cseStudents.filter(s => {
    const matchesRoll = s.rollNumber.toLowerCase().includes(searchRoll.toLowerCase()) ||
                        s.name.toLowerCase().includes(searchRoll.toLowerCase());
    const matchesClass = selectedClassFilter === 'ALL' || s.section === selectedClassFilter;
    return matchesRoll && matchesClass;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header with PRD 4.3 Design Guidance */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #059669' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            PRD 4.3 & 5.3 Simple Overview Architecture
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Department Attendance Monitoring Overview
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Simplified, uncluttered executive overview focused on student roll numbers and attendance percentages.
          </p>
        </div>

        <div style={{ background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
            86.4%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Department Aggregate</div>
        </div>
      </div>

      {/* Filter and Subject Selector Bar */}
      <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Filter Roll Number..."
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              style={{ paddingLeft: '2rem', paddingRight: '0.75rem', fontSize: '0.82rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Section:</span>
            <select 
              className="form-select"
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              style={{ width: 'auto', fontSize: '0.82rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Sections (A & B)</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Metric View:</span>
            <select 
              className="form-select"
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              style={{ width: 'auto', fontSize: '0.82rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="OVERALL">Overall Aggregate Attendance %</option>
              <option value="CS711PE">CS711PE - Full Stack Web Dev %</option>
              <option value="CS701PC">CS701PC - Cloud Computing %</option>
              <option value="CS702PC">CS702PC - Cryptography & Security %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Uncluttered HOD Attendance Table (PRD 4.3 specification) */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Roll Number</th>
              <th>Student Name</th>
              <th>Section</th>
              <th>Year / Sem</th>
              <th>Attendance Percentage</th>
              <th>Status Category</th>
              <th>Inspection</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => {
              const pct = student.attendanceOverall;
              const isDetained = pct < 65;
              const isCondonation = pct < 75 && pct >= 65;

              return (
                <tr key={student.id}>
                  <td>
                    <strong style={{ color: '#1d4ed8', fontSize: '0.92rem' }}>
                      {student.rollNumber}
                    </strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{student.name}</div>
                  </td>
                  <td><span className="badge badge-primary">Sec {student.section}</span></td>
                  <td>{student.year} ({student.semester})</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '1.05rem', color: isDetained ? '#dc2626' : isCondonation ? '#d97706' : '#059669' }}>
                        {pct}%
                      </strong>
                      <div style={{ width: '60px' }} className="attendance-progress-bar">
                        <div 
                          className={`attendance-progress-fill ${isDetained ? 'fill-danger' : isCondonation ? 'fill-warning' : 'fill-safe'}`}
                          style={{ width: `${Math.min(100, pct)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${isDetained ? 'badge-danger' : isCondonation ? 'badge-warning' : 'badge-success'}`}>
                      {isDetained ? 'Detention Warning (<65%)' : isCondonation ? 'Condonation (65-74%)' : 'Eligible (≥75%)'}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setDetailModalStudent(student)}
                      className="btn btn-outline-primary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                    >
                      <Eye size={13} /> Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PRD 4.3 Separate Detail View for Verification or Authorized Correction */}
      {detailModalStudent && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large">
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Percent size={20} style={{ color: '#f59e0b' }} />
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                    Granular Attendance Verification & Correction
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
                    Roll Number: {detailModalStudent.rollNumber} • {detailModalStudent.name}
                  </div>
                </div>
              </div>
              <button onClick={() => setDetailModalStudent(null)} style={{ background: 'none', border: 'none', color: '#cbd5e1' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{detailModalStudent.totalClassesHeld}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Classes Held</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{detailModalStudent.totalClassesAttended}</div>
                  <div style={{ fontSize: '0.72rem', color: '#065f46' }}>Classes Attended</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626' }}>{detailModalStudent.totalClassesAbsent}</div>
                  <div style={{ fontSize: '0.72rem', color: '#991b1b' }}>Classes Absent</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1d4ed8' }}>{detailModalStudent.attendanceOverall}%</div>
                  <div style={{ fontSize: '0.72rem', color: '#1e40af' }}>Aggregate %</div>
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                Subject-Wise Granular Verification
              </h4>

              <div className="table-responsive" style={{ marginBottom: '1.5rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject Code & Title</th>
                      <th>Faculty</th>
                      <th>Classes Held</th>
                      <th>Attended</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(STUDENT_SUBJECTS[detailModalStudent.rollNumber] || STUDENT_SUBJECTS["21TML0501"]).map(s => (
                      <tr key={s.code}>
                        <td><strong>{s.code}:</strong> {s.name}</td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.faculty}</td>
                        <td>{s.classesHeld}</td>
                        <td><span style={{ color: '#059669', fontWeight: 600 }}>{s.classesAttended}</span></td>
                        <td><strong>{s.attendancePct}%</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* HOD Authorized Correction Tool (PRD 4.3 & 6.6) */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} /> Authorized HOD Attendance Adjustment
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#78350f', marginBottom: '0.75rem' }}>
                  Per PRD Section 6.6, corrections are recorded with full audit logging, timestamp, and justification reason.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => {
                      logAction({
                        action: "ATTENDANCE_CORRECTION_APPLIED",
                        details: `HOD authorized +2 attendance credits for ${detailModalStudent.rollNumber} for NSS / College Sports Duty certificate.`,
                        affectedClass: detailModalStudent.rollNumber
                      });
                      showToast(`Authorized attendance credit applied for ${detailModalStudent.rollNumber}!`, "success");
                      setDetailModalStudent(null);
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Grant On-Duty / NSS Attendance Credit (+2 Classes)
                  </button>

                  <button 
                    onClick={() => {
                      logAction({
                        action: "CONDONATION_WAIVER_PROCESSED",
                        details: `HOD recommended medical condonation waiver for ${detailModalStudent.rollNumber} to Principal.`,
                        affectedClass: detailModalStudent.rollNumber
                      });
                      showToast(`Condonation waiver recommended for ${detailModalStudent.name}.`, "info");
                      setDetailModalStudent(null);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    Recommend Medical Condonation
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setDetailModalStudent(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
