import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Check, X, Calendar, Clock, Save, UserCheck } from 'lucide-react';

export default function ManualAttendance() {
  const { students, showToast, logAction } = useAuth();
  const cseStudents = students.filter(s => s.department === 'CSE');

  // Track status for each student: 'Present' or 'Absent'
  const [attendanceMap, setAttendanceMap] = useState(() => {
    const initial = {};
    cseStudents.forEach(s => {
      initial[s.rollNumber] = 'Present'; // default present
    });
    return initial;
  });

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [subject, setSubject] = useState('CS711PE - Full Stack Web Dev');
  const [period, setPeriod] = useState('Period 1 (09:30 - 10:20 AM)');

  const toggleStatus = (rollNumber) => {
    setAttendanceMap(prev => ({
      ...prev,
      [rollNumber]: prev[rollNumber] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const markAllPresent = () => {
    const allP = {};
    cseStudents.forEach(s => { allP[s.rollNumber] = 'Present'; });
    setAttendanceMap(allP);
    showToast("All students marked Present", "info");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const presentCount = Object.values(attendanceMap).filter(v => v === 'Present').length;
    const absentCount = Object.values(attendanceMap).filter(v => v === 'Absent').length;

    logAction({
      action: "MANUAL_ATTENDANCE_RECORDED",
      details: `Daily session attendance for ${subject} (${period}) on ${date}: ${presentCount} Present, ${absentCount} Absent.`,
      affectedClass: "IV B.Tech CSE-A"
    });

    showToast(`Attendance recorded! ${presentCount} Present, ${absentCount} Absent.`, "success");
  };

  const presentCount = Object.values(attendanceMap).filter(v => v === 'Present').length;
  const absentCount = Object.values(attendanceMap).filter(v => v === 'Absent').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #10b981' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            Daily Attendance Entry
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Interactive Period Attendance Register
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Fast attendance toggle for ongoing lecture sessions.
          </p>
        </div>

        <button onClick={markAllPresent} className="btn btn-outline btn-sm">
          <UserCheck size={15} /> Mark All Present
        </button>
      </div>

      {/* Session Context Bar */}
      <div className="card" style={{ background: '#f8fafc', padding: '1.25rem' }}>
        <div className="grid-3">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date of Session</label>
            <input 
              type="date" 
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Teaching Course</label>
            <select 
              className="form-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="CS711PE - Full Stack Web Dev">CS711PE - Full Stack Web Dev (IV CSE-A)</option>
              <option value="CS503PC - Web Tech Lab">CS503PC - Web Tech Lab (III CSE-B)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Time Slot / Period</label>
            <select 
              className="form-select"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="Period 1 (09:30 - 10:20 AM)">Period 1 (09:30 - 10:20 AM)</option>
              <option value="Period 2 (10:20 - 11:10 AM)">Period 2 (10:20 - 11:10 AM)</option>
              <option value="Period 3 (11:20 - 12:10 PM)">Period 3 (11:20 - 12:10 PM)</option>
              <option value="Lab Session (01:40 - 04:10 PM)">Lab Session (01:40 - 04:10 PM)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
          <div>Total Enrolled: <strong>{cseStudents.length}</strong></div>
          <div style={{ color: '#059669' }}>Present: <strong>{presentCount}</strong></div>
          <div style={{ color: '#dc2626' }}>Absent: <strong>{absentCount}</strong></div>
        </div>
      </div>

      {/* Student Toggle Grid */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {cseStudents.map(student => {
            const isPresent = attendanceMap[student.rollNumber] === 'Present';
            return (
              <div 
                key={student.rollNumber}
                onClick={() => toggleStatus(student.rollNumber)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: isPresent ? '1.5px solid #10b981' : '1.5px solid #ef4444',
                  background: isPresent ? '#ecfdf5' : '#fef2f2',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                    {student.rollNumber}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {student.name}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  color: isPresent ? '#047857' : '#b91c1c',
                  background: isPresent ? '#d1fae5' : '#fee2e2',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '9999px'
                }}>
                  {isPresent ? <Check size={14} /> : <X size={14} />}
                  <span>{isPresent ? 'Present' : 'Absent'}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          <Save size={18} /> Submit Daily Session Attendance
        </button>
      </form>

    </div>
  );
}
