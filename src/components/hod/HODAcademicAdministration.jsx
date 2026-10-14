import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, CheckCircle2, XCircle, Clock, FileText, UserPlus } from 'lucide-react';

export default function HODAcademicAdministration({ onOpenAddStudent }) {
  const { auditLogs, logAction, showToast } = useAuth();

  const [correctionRequests, setCorrectionRequests] = useState([
    {
      id: "REQ-2026-081",
      submittedBy: "Sri Ch. Mahesh Babu (Faculty)",
      date: "2026-09-28 14:10",
      rollNumber: "21TML0503",
      studentName: "B. Yaswanth Kumar",
      subject: "CS711PE - Full Stack Web Dev",
      oldValue: "28 / 38 Classes (73.6%)",
      requestedValue: "30 / 38 Classes (78.9%)",
      reason: "Student submitted authenticated Medical Duty certificate for viral fever during mid-terms",
      status: "Pending Approval"
    },
    {
      id: "REQ-2026-079",
      submittedBy: "Prof. K. Vijaya Lakshmi (Faculty)",
      date: "2026-09-25 11:30",
      rollNumber: "21TML0501",
      studentName: "M. Sai Vardhan",
      subject: "CS701PC - Cloud Computing",
      oldValue: "42 / 48 Classes (87.5%)",
      requestedValue: "44 / 48 Classes (91.7%)",
      reason: "Attended Smart India Hackathon zonal round representing Tirumala Engineering College",
      status: "Approved by HOD"
    }
  ]);

  const handleApprove = (req) => {
    setCorrectionRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "Approved by HOD" } : r));
    logAction({
      action: "ATTENDANCE_CORRECTION_APPROVED",
      details: `HOD approved correction ${req.id} for ${req.rollNumber} (${req.reason})`,
      affectedClass: req.rollNumber
    });
    showToast(`Approved attendance correction for ${req.studentName} (${req.rollNumber})!`, "success");
  };

  const handleReject = (req) => {
    setCorrectionRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "Rejected by HOD" } : r));
    logAction({
      action: "ATTENDANCE_CORRECTION_REJECTED",
      details: `HOD rejected correction ${req.id} for ${req.rollNumber}`,
      affectedClass: req.rollNumber,
      status: "Rejected"
    });
    showToast(`Rejected correction request for ${req.rollNumber}.`, "info");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #7e22ce' }}>
        <div>
          <span className="badge" style={{ background: '#f3e8ff', color: '#6b21a8', marginBottom: '0.4rem' }}>
            PRD 4.3 Department Governance
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Academic Administration & Correction Approvals
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Review faculty adjustment requests and manage departmental student enrollments.
          </p>
        </div>

        <button onClick={onOpenAddStudent} className="btn btn-primary">
          <UserPlus size={16} /> Enroll Student Record
        </button>
      </div>

      {/* Attendance Correction Requests Queue */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} style={{ color: '#1d4ed8' }} />
          Faculty Attendance Correction Queue (PRD 4.3 & 6.6)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {correctionRequests.map(req => {
            const isPending = req.status === "Pending Approval";
            return (
              <div key={req.id} style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: isPending ? '1.5px solid #f59e0b' : '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>{req.id}</span>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{req.studentName} ({req.rollNumber})</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                      Submitted by: {req.submittedBy} • {req.date}
                    </div>
                  </div>

                  <span className={`badge ${isPending ? 'badge-warning' : req.status.includes('Approved') ? 'badge-success' : 'badge-danger'}`}>
                    {req.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', background: '#ffffff', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                  <div>Subject: <strong>{req.subject}</strong></div>
                  <div>Current In Register: <strong style={{ color: '#dc2626' }}>{req.oldValue}</strong></div>
                  <div>Proposed Correction: <strong style={{ color: '#059669' }}>{req.requestedValue}</strong></div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem' }}>
                  <strong>Justification:</strong> {req.reason}
                </div>

                {isPending && (
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                    <button 
                      onClick={() => handleReject(req)}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#dc2626', borderColor: '#fca5a5' }}
                    >
                      <XCircle size={14} /> Reject Request
                    </button>
                    <button 
                      onClick={() => handleApprove(req)}
                      className="btn btn-primary btn-sm"
                    >
                      <CheckCircle2 size={14} /> Approve & Update Register
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
