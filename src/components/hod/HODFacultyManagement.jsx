import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FACULTY_MEMBERS } from '../../data/mockData';
import { Users, Mail, Phone, BookOpen, Clock, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

export default function HODFacultyManagement() {
  const { showToast } = useAuth();
  const [facultyList] = useState(FACULTY_MEMBERS);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #1d4ed8' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Academic Faculty Roster
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            CSE Department Faculty Members & Workload
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Faculty teaching assignments and attendance submission compliance.
          </p>
        </div>

        <button 
          onClick={() => showToast("Faculty invitation email dispatched.", "info")}
          className="btn btn-primary"
        >
          <PlusCircle size={16} /> Allocate New Staff Member
        </button>
      </div>

      {/* Faculty Cards */}
      <div className="grid-2">
        {facultyList.map(fac => (
          <div key={fac.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>{fac.staffId}</span>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>{fac.name}</h3>
                  <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600 }}>{fac.designation}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{fac.qualification} • {fac.experience} Experience</div>
                </div>

                <span className={`badge ${fac.pendingUploads > 0 ? 'badge-warning' : 'badge-success'}`}>
                  {fac.pendingUploads > 0 ? 'Pending Upload' : 'Compliant'}
                </span>
              </div>

              {/* Teaching Assignments */}
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Assigned Teaching Subjects ({fac.assignedSubjects.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {fac.assignedSubjects.map((sub, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>{sub.code}:</strong> {sub.name}</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{sub.class}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} style={{ color: '#2563eb' }} />
                  <span>{fac.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} style={{ color: '#059669' }} />
                  <span>{fac.phone}</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem', marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Workload: 16 Hours/Week</span>
              <button 
                onClick={() => showToast(`Sent submission reminder notification to ${fac.name}`, "info")}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
              >
                Send Reminder
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
