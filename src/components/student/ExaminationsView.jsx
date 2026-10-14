import React, { useState } from 'react';
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
  AlertCircle 
} from 'lucide-react';

export default function ExaminationsView() {
  const { currentUser, showToast } = useAuth();
  const student = currentUser.profile || {};
  const exams = STUDENT_EXAMS[student.rollNumber] || STUDENT_EXAMS["21TML0501"];

  const [showHallTicketModal, setShowHallTicketModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner & Hall Ticket Download */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #1d4ed8' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            JNTUK Examination Authority
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            {exams.currentSemester} Examination Center
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Center: <strong>{exams.centerName}</strong> • Hall Ticket No: <strong>{exams.hallTicketNo}</strong>
          </p>
        </div>

        <button 
          onClick={() => setShowHallTicketModal(true)}
          className="btn btn-primary"
        >
          <FileText size={16} /> View & Print Hall Ticket
        </button>
      </div>

      {/* Regular Exam Timetable */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} style={{ color: '#2563eb' }} />
          B.Tech IV-I Regular Theory Exam Schedule
        </h3>

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
              {exams.schedule.map((ex, i) => (
                <tr key={i}>
                  <td><strong>{ex.date}</strong></td>
                  <td>{ex.time}</td>
                  <td><span style={{ fontWeight: 700, color: '#1d4ed8' }}>{ex.code}</span></td>
                  <td>{ex.subject}</td>
                  <td><span className="badge badge-primary">{ex.hall}</span></td>
                  <td>
                    <span className="badge badge-success">
                      <Clock size={12} /> {ex.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplementary Examination Information (PRD Section 9) */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Supplementary Examinations History</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Cleared backlogs and previous attempts verified by JNTUK</p>
          </div>
          <span className="badge badge-success">No Active Backlogs (All Clear)</span>
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
              {exams.supplementaryRecords.map((rec, i) => (
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
              ))}
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
              <button onClick={() => setShowHallTicketModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8' }}>
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
                    HALL TICKET FOR B.TECH IV YEAR I SEMESTER REGULAR EXAMINATIONS — NOVEMBER 2026
                  </div>
                </div>

                {/* Candidate Information Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem' }}>
                    <div>Hall Ticket No: <strong style={{ fontSize: '0.95rem', color: '#0e2154' }}>{exams.hallTicketNo}</strong></div>
                    <div>Candidate Name: <strong style={{ color: '#0e2154' }}>{student.name}</strong></div>
                    <div>Branch & Sem: <strong>{student.department} - VII Sem</strong></div>
                    <div>Father's Name: <strong>{student.fatherName || "M. Venkata Subbaiah"}</strong></div>
                    <div>Center of Exam: <strong>{exams.centerName}</strong></div>
                    <div>Attendance Clearance: <strong style={{ color: '#059669' }}>Eligible (88.5%)</strong></div>
                  </div>

                  {/* Photo & Signature Placeholder */}
                  <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.5rem', textAlign: 'center', background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '90px', background: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.72rem', fontWeight: 600 }}>
                      STUDENT PHOTO
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
                    {exams.schedule.map((ex, i) => (
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
