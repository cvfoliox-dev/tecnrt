import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_SUBJECTS } from '../../data/mockData';
import { BookOpen, User, Percent, Award, CheckCircle2, ChevronRight, X, Clock } from 'lucide-react';

export default function SemesterSubjects() {
  const { currentUser } = useAuth();
  const student = currentUser.profile || {};
  const defaultSubjects = STUDENT_SUBJECTS[student.rollNumber] || STUDENT_SUBJECTS["21TML0501"] || [];
  const subjects = (student.subjectAttendance && student.subjectAttendance.length > 0)
    ? student.subjectAttendance.map((sub, idx) => {
        const fallback = defaultSubjects.find(s => s.code?.toLowerCase() === sub.code?.toLowerCase() || s.name?.toLowerCase() === sub.name?.toLowerCase()) || defaultSubjects[idx] || {};
        return {
          ...fallback,
          ...sub,
          credits: fallback.credits || 3,
          mid1Marks: fallback.mid1Marks || 26,
          mid2Marks: fallback.mid2Marks || 27,
          syllabusCompleted: fallback.syllabusCompleted || "85% Covered",
          units: fallback.units || ["Unit 1: Fundamentals", "Unit 2: Implementation", "Unit 3: Advanced Concepts"]
        };
      })
    : defaultSubjects;
  const [selectedSubject, setSelectedSubject] = useState(null);

  const totalCredits = subjects.reduce((sum, s) => sum + (s.credits || 3), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header bar */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Academic Year 2026-2027 • ODD Semester
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            {student.year} - {student.semester} Enrolled Courses
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Curriculum Regulation: <strong>JNTUK R20 B.Tech Syllabus</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1d4ed8' }}>{subjects.length}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Subjects</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{totalCredits}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Credits</div>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Faculty Assigned</th>
              <th>Credits</th>
              <th>Classes (Held / Attended)</th>
              <th>Attendance %</th>
              <th>Mid Marks (M1 / M2)</th>
              <th>Syllabus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.code}>
                <td>
                  <span style={{ fontWeight: 700, color: '#1d4ed8' }}>{sub.code}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{sub.name}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{sub.faculty}</div>
                </td>
                <td>
                  <span className="badge badge-primary">{sub.credits}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem' }}>{sub.classesAttended} / {sub.classesHeld}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: sub.attendancePct >= 75 ? '#059669' : '#dc2626' }}>
                      {sub.attendancePct}%
                    </span>
                    <span className={`badge ${sub.attendancePct >= 75 ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                      {sub.attendancePct >= 75 ? 'Eligible' : 'Warning'}
                    </span>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{sub.mid1Marks} / {sub.mid2Marks} (30)</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#1e3a8a', fontWeight: 600 }}>{sub.syllabusCompleted}</span>
                  </div>
                </td>
                <td>
                  <button 
                    onClick={() => setSelectedSubject(sub)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subject Syllabus Detail Modal */}
      {selectedSubject && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div>
                <span className="badge badge-primary">{selectedSubject.code}</span>
                <h3 style={{ fontSize: '1.15rem', color: '#0e2154', marginTop: '0.25rem' }}>
                  {selectedSubject.name}
                </h3>
              </div>
              <button onClick={() => setSelectedSubject(null)} style={{ background: 'none', border: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div>Faculty: <strong>{selectedSubject.faculty}</strong></div>
                <div>Credits: <strong>{selectedSubject.credits} JNTUK Credits</strong></div>
                <div>Attendance: <strong>{selectedSubject.attendancePct}% ({selectedSubject.classesAttended}/{selectedSubject.classesHeld})</strong></div>
                <div>Internal Score: <strong>{selectedSubject.internalTotal} / 30 Marks</strong></div>
              </div>

              <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                Course Units & Curriculum Progress ({selectedSubject.syllabusCompleted} Covered)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                <div style={{ padding: '0.65rem', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Unit I: Fundamental Principles & Architecture</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Completed</span>
                </div>
                <div style={{ padding: '0.65rem', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Unit II: Practical Implementations & Algorithmic Design</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Completed</span>
                </div>
                <div style={{ padding: '0.65rem', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Unit III: Advanced Protocols, Security & Scalability</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Completed</span>
                </div>
                <div style={{ padding: '0.65rem', background: '#fffbeb', borderRadius: '6px', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Unit IV: Industry Case Studies & Enterprise Integration</span>
                  <span style={{ color: '#d97706', fontWeight: 700 }}>In Progress (70%)</span>
                </div>
                <div style={{ padding: '0.65rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Unit V: Emerging Trends & Final Revision</span>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Scheduled Next Week</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedSubject(null)} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
