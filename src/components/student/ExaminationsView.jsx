import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_EXAMS, COLLEGE_INFO } from '../../data/mockData';
import { 
  Award, 
  Calendar, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Printer, 
  X, 
  AlertCircle,
  Info
} from 'lucide-react';

export default function ExaminationsView() {
  const { currentUser, publishedTimetables = [], showToast } = useAuth();
  const student = currentUser.profile || {};
  const exams = STUDENT_EXAMS[student.rollNumber] || STUDENT_EXAMS["21TML0501"] || {
    currentSemester: `${student.year || "IV Year"} ${student.semester || "VII Semester"} Regular (JNTUK)`,
    examStatus: "Hall Ticket Available",
    hallTicketNo: student.rollNumber || "21TML0501",
    centerName: "Tirumala Engineering College, Narasaraopet (Center Code: TMLN)",
    schedule: [],
    supplementaryRecords: []
  };

  const [showHallTicketModal, setShowHallTicketModal] = useState(false);

  // Dynamic published timetables for this student's branch & year
  const regularTimetable = useMemo(() => {
    return publishedTimetables.find(t => 
      t.branch === (student.department || 'CSE') && 
      t.year === (student.year || 'IV Year') && 
      t.examType.toLowerCase() === 'regular'
    );
  }, [publishedTimetables, student.department, student.year]);

  const supplementaryTimetable = useMemo(() => {
    return publishedTimetables.find(t => 
      t.branch === (student.department || 'CSE') && 
      t.year === (student.year || 'IV Year') && 
      t.examType.toLowerCase() === 'supplementary'
    );
  }, [publishedTimetables, student.department, student.year]);

  const activeRegularSchedule = regularTimetable?.schedule || exams.schedule || [];

  const handlePrint = () => {
    window.print();
  };

  const attendancePct = parseFloat(student.attendanceOverall) || 85.0;
  const isEligible = attendancePct >= 75;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner & Hall Ticket Download */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #1d4ed8' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-primary">JNTUK Examination Authority</span>
            {regularTimetable && (
              <span className="badge badge-success">
                <CheckCircle2 size={12} /> HOD Published
              </span>
            )}
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154', margin: 0 }}>
            {regularTimetable?.title || `${student.year || 'IV Year'} ${student.semester || 'VII Sem'} Regular Examination Center`}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem', marginBottom: 0 }}>
            Center: <strong>{exams.centerName}</strong> • Hall Ticket No: <strong>{student.rollNumber || exams.hallTicketNo}</strong>
          </p>
        </div>

        <button 
          onClick={() => setShowHallTicketModal(true)}
          className="btn btn-primary"
        >
          <FileText size={16} /> View & Print Hall Ticket
        </button>
      </div>

      {/* Instructions Note if Published by HOD */}
      {regularTimetable?.instructions && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1.25rem', borderRadius: '10px', fontSize: '0.82rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Info size={18} style={{ color: '#059669', flexShrink: 0 }} />
          <div>
            <strong>Department Examination Circular:</strong> {regularTimetable.instructions}
          </div>
        </div>
      )}

      {/* Regular Exam Timetable */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} style={{ color: '#2563eb' }} />
            {student.department || 'CSE'} — {student.year || 'IV Year'} Regular Theory Exam Schedule
          </h3>
          <span className="badge badge-primary">Regular Examinations</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Assigned Hall</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeRegularSchedule.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    No regular examination schedule released yet for this semester.
                  </td>
                </tr>
              ) : (
                activeRegularSchedule.map((ex, i) => (
                  <tr key={i}>
                    <td><strong>{ex.date}</strong></td>
                    <td>{ex.time}</td>
                    <td><span style={{ fontWeight: 700, color: '#1d4ed8' }}>{ex.code}</span></td>
                    <td>{ex.subject}</td>
                    <td><span className="badge badge-primary">{ex.hall}</span></td>
                    <td>
                      <span className="badge badge-success">
                        <Clock size={12} /> {ex.status || "Upcoming"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Published Supplementary Examination Timetable (Clearly Separated) */}
      {supplementaryTimetable && (
        <div className="card" style={{ borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-warning">Supplementary Schedule</span>
                <span className="badge badge-success"><CheckCircle2 size={12} /> Published by HOD</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
                {supplementaryTimetable.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem', marginBottom: 0 }}>
                {supplementaryTimetable.instructions}
              </p>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Published: {supplementaryTimetable.publishedDate}
            </span>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Assigned Hall</th>
                </tr>
              </thead>
              <tbody>
                {supplementaryTimetable.schedule.map((slot, i) => (
                  <tr key={i}>
                    <td><strong>{slot.date}</strong></td>
                    <td>{slot.time}</td>
                    <td><span style={{ fontWeight: 700, color: '#d97706' }}>{slot.code}</span></td>
                    <td><strong>{slot.subject}</strong></td>
                    <td><span className="badge badge-warning">{slot.hall}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Supplementary Examination History */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Supplementary Examinations History</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Cleared backlogs and previous attempts verified by JNTUK</p>
          </div>
          <span className="badge badge-success">No Active Standing Backlogs (All Clear)</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Status</th>
                <th>Grade Obtained</th>
                <th>Credits Earned</th>
                <th>Notification Date</th>
              </tr>
            </thead>
            <tbody>
              {(exams.supplementaryRecords || []).length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>
                    No supplementary records on file. Student has passed all semester subjects on first attempt.
                  </td>
                </tr>
              ) : (
                exams.supplementaryRecords.map((rec, i) => (
                  <tr key={i}>
                    <td><strong>{rec.semester}</strong></td>
                    <td><span style={{ fontWeight: 700, color: '#1d4ed8' }}>{rec.code}</span></td>
                    <td>{rec.subject}</td>
                    <td>
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> {rec.status}
                      </span>
                    </td>
                    <td><strong>{rec.grade}</strong></td>
                    <td>{rec.credits}</td>
                    <td>{rec.resultPublished}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hall Ticket Printable Preview Modal */}
      {showHallTicketModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: '#1d4ed8' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#0e2154' }}>JNTUK Official Examination Hall Ticket</h3>
              </div>
              <button onClick={() => setShowHallTicketModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '2rem' }}>
              {/* Official Hall Ticket Format */}
              <div style={{ border: '2px solid #0e2154', padding: '1.5rem', borderRadius: '12px', background: '#ffffff' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid #0e2154', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0e2154' }}>
                    JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY KAKINADA
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1d4ed8' }}>
                    TIRUMALA ENGINEERING COLLEGE, NARASARAOPET (COLLEGE CODE: TMLN)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                    HALL TICKET FOR B.TECH {student.year?.toUpperCase() || 'IV YEAR'} {student.semester?.toUpperCase() || 'VII SEMESTER'} REGULAR EXAMINATIONS
                  </div>
                </div>

                {/* Candidate Information Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem' }}>
                    <div>Hall Ticket No: <strong style={{ fontSize: '0.95rem', color: '#0e2154' }}>{student.rollNumber || exams.hallTicketNo}</strong></div>
                    <div>Candidate Name: <strong style={{ color: '#0e2154' }}>{student.name}</strong></div>
                    <div>Branch & Sem: <strong>{student.department} - {student.semester || 'VII Sem'} (Sec {student.section || 'A'})</strong></div>
                    <div>Father's Name: <strong>{student.fatherName || "M. Venkata Subbaiah"}</strong></div>
                    <div>Center of Exam: <strong>{exams.centerName}</strong></div>
                    <div>Attendance Clearance: <strong style={{ color: isEligible ? '#059669' : '#d97706' }}>{isEligible ? `Eligible (${attendancePct}%)` : `Condonation Required (${attendancePct}%)`}</strong></div>
                  </div>

                  {/* Photo & Signature Placeholder */}
                  <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.5rem', textAlign: 'center', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '90px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.72rem', fontWeight: 600 }}>
                      PHOTO
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.35rem', borderTop: '1px dashed #cbd5e1', paddingTop: '0.2rem', width: '100%' }}>
                      Candidate Sign
                    </div>
                  </div>
                </div>

                {/* Subjects Registered */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem' }}>Date</th>
                      <th style={{ padding: '0.5rem' }}>Time</th>
                      <th style={{ padding: '0.5rem' }}>Subject Code & Title</th>
                      <th style={{ padding: '0.5rem' }}>Invigilator Sign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRegularSchedule.map((ex, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.5rem' }}>{ex.date}</td>
                        <td style={{ padding: '0.5rem' }}>{ex.time}</td>
                        <td style={{ padding: '0.5rem' }}><strong>{ex.code}</strong> - {ex.subject}</td>
                        <td style={{ padding: '0.5rem', color: '#94a3b8' }}>_______________</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Signatures */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', fontSize: '0.78rem', color: '#475569' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div>(Candidate Signature)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div>(Officer In-Charge, Exams)</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#0e2154' }}>Dr. V. Narayana</div>
                    <div>Principal & Chief Superintendent</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowHallTicketModal(false)} className="btn btn-outline">
                Close
              </button>
              <button onClick={handlePrint} className="btn btn-primary">
                <Printer size={16} /> Print Official Hall Ticket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
