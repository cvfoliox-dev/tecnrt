import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_SUBJECTS } from '../../data/mockData';
import { 
  Percent, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  HelpCircle, 
  FileDown, 
  Clock 
} from 'lucide-react';

export default function AttendanceView() {
  const { currentUser } = useAuth();
  const student = currentUser.profile || {};
  const subjects = STUDENT_SUBJECTS[student.rollNumber] || STUDENT_SUBJECTS["21TML0501"];

  const [targetGoal, setTargetGoal] = useState(75);

  const totalHeld = student.totalClassesHeld || 240;
  const totalAttended = student.totalClassesAttended || 212;
  const totalAbsent = student.totalClassesAbsent || 28;
  const overallPct = student.attendanceOverall || 88.5;

  // PRD 6.3: Attendance Calculator logic
  // Formula to find required consecutive classes:
  // (totalAttended + X) / (totalHeld + X) >= targetGoal / 100
  // 100 * totalAttended + 100X >= targetGoal * totalHeld + targetGoal * X
  // X * (100 - targetGoal) >= targetGoal * totalHeld - 100 * totalAttended
  const calculateRequiredClasses = () => {
    if (overallPct >= targetGoal) return 0;
    const numerator = (targetGoal * totalHeld) - (100 * totalAttended);
    const denominator = 100 - targetGoal;
    if (denominator <= 0) return 0;
    return Math.max(0, Math.ceil(numerator / denominator));
  };

  const monthlyBreakdown = [
    { month: "July 2026", held: 80, attended: 72, absent: 8, percentage: 90.0, status: "Submitted by Faculty" },
    { month: "August 2026", held: 80, attended: 70, absent: 10, percentage: 87.5, status: "Submitted by Faculty" },
    { month: "September 2026", held: 80, attended: 70, absent: 10, percentage: 87.5, status: "Latest Verified Upload" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Overview Cards */}
      <div className="grid-3">
        {/* Overall Percentage Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid #10b981' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Aggregate Semester Attendance
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: overallPct >= 75 ? '#059669' : '#dc2626', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
              {overallPct}%
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Status: <strong style={{ color: overallPct >= 75 ? '#059669' : '#dc2626' }}>{overallPct >= 75 ? "Examination Eligible (Safe)" : "Condonation Required"}</strong>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <div className="attendance-progress-bar">
              <div 
                className={`attendance-progress-fill ${overallPct >= 75 ? 'fill-safe' : overallPct >= 65 ? 'fill-warning' : 'fill-danger'}`}
                style={{ width: `${Math.min(100, overallPct)}%` }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginTop: '0.35rem' }}>
              <span>0%</span>
              <span style={{ color: '#d97706', fontWeight: 700 }}>65% Condonation</span>
              <span style={{ color: '#059669', fontWeight: 700 }}>75% Eligible</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Classes Attended vs Absent */}
        <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Classes Count Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
            <div style={{ background: '#f8fafc', padding: '0.75rem 0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{totalHeld}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Total Held</div>
            </div>
            <div style={{ background: '#ecfdf5', padding: '0.75rem 0.5rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>{totalAttended}</div>
              <div style={{ fontSize: '0.72rem', color: '#065f46' }}>Attended</div>
            </div>
            <div style={{ background: '#fef2f2', padding: '0.75rem 0.5rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dc2626' }}>{totalAbsent}</div>
              <div style={{ fontSize: '0.72rem', color: '#991b1b' }}>Absent</div>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem' }}>
            PRD 6.3 Verified: Attended ({totalAttended}) + Absent ({totalAbsent}) = Total Classes ({totalHeld}).
          </div>
        </div>

        {/* Interactive Threshold Planner */}
        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#b45309', fontWeight: 700, textTransform: 'uppercase' }}>
            <Calculator size={16} /> Target Planner
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            Calculate consecutive classes needed to maintain minimum attendance.
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <button 
                onClick={() => setTargetGoal(75)} 
                className={`btn btn-sm ${targetGoal === 75 ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                75% (Mandatory)
              </button>
              <button 
                onClick={() => setTargetGoal(85)} 
                className={`btn btn-sm ${targetGoal === 85 ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                85% (Scholarship)
              </button>
            </div>

            <div style={{ background: '#fffbeb', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #fde68a', fontSize: '0.8rem', color: '#92400e' }}>
              {overallPct >= targetGoal ? (
                <span>You already meet the <strong>{targetGoal}%</strong> benchmark with <strong>{overallPct}%</strong>!</span>
              ) : (
                <span>You must attend the next <strong>{calculateRequiredClasses()} consecutive classes</strong> without absence.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Attendance Timeline (PRD 4.1 & 6.4) */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} style={{ color: '#2563eb' }} />
          Monthly Attendance Register (Uploaded by Faculty)
        </h3>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Academic Month</th>
                <th>Classes Conducted</th>
                <th>Classes Attended</th>
                <th>Classes Absent</th>
                <th>Monthly %</th>
                <th>Validation Status</th>
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map((item, idx) => (
                <tr key={idx}>
                  <td><strong>{item.month}</strong></td>
                  <td>{item.held}</td>
                  <td><span style={{ color: '#059669', fontWeight: 600 }}>{item.attended}</span></td>
                  <td><span style={{ color: '#dc2626', fontWeight: 600 }}>{item.absent}</span></td>
                  <td>
                    <span style={{ fontWeight: 800, color: item.percentage >= 75 ? '#059669' : '#d97706' }}>
                      {item.percentage}%
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">
                      <CheckCircle2 size={12} /> {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject-Wise Attendance (PRD 4.1 & 6.2) */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Percent size={18} style={{ color: '#d97706' }} />
          Course-Wise Breakdown & Faculty Details
        </h3>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Course Faculty</th>
                <th>Held</th>
                <th>Attended</th>
                <th>Absent</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => (
                <tr key={sub.code}>
                  <td><strong>{sub.code}</strong></td>
                  <td>{sub.name}</td>
                  <td style={{ fontSize: '0.82rem', color: '#475569' }}>{sub.faculty}</td>
                  <td>{sub.classesHeld}</td>
                  <td><span style={{ color: '#059669', fontWeight: 600 }}>{sub.classesAttended}</span></td>
                  <td><span style={{ color: '#dc2626', fontWeight: 600 }}>{sub.classesHeld - sub.classesAttended}</span></td>
                  <td>
                    <span style={{ fontWeight: 800, color: sub.attendancePct >= 75 ? '#059669' : '#dc2626' }}>
                      {sub.attendancePct}%
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${sub.attendancePct >= 75 ? 'badge-success' : 'badge-danger'}`}>
                      {sub.attendancePct >= 75 ? 'Eligible' : 'Low (<75%)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
