import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_SUBJECTS, STUDENT_EXAMS, STUDENT_FEES } from '../../data/mockData';
import StatCard from '../common/StatCard';
import { 
  Percent, 
  Award, 
  BookOpen, 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function StudentOverview() {
  const { currentUser, setActiveTab } = useAuth();
  const student = currentUser.profile || {};
  const subjects = STUDENT_SUBJECTS[student.rollNumber] || STUDENT_SUBJECTS["21TML0501"];
  const exams = STUDENT_EXAMS[student.rollNumber] || STUDENT_EXAMS["21TML0501"];
  const fees = STUDENT_FEES[student.rollNumber] || STUDENT_FEES["21TML0501"];

  const attendancePct = student.attendanceOverall || 88.5;
  const isCondonation = attendancePct < 75 && attendancePct >= 65;
  const isDetained = attendancePct < 65;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Welcome Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0e2154 0%, #1d4ed8 100%)', 
        borderRadius: '16px', 
        padding: '1.75rem', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '0.15rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
              {student.year} • {student.semester}
            </span>
            <span style={{ color: '#93c5fd', fontSize: '0.8rem' }}>
              Roll No: {student.rollNumber}
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
            Welcome back, {student.name}!
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Department of {student.department} • Section {student.section} • Tirumala Engineering College
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => setActiveTab('attendance')} 
            className="btn btn-accent btn-sm"
          >
            <Percent size={15} /> View Attendance Log
          </button>
          <button 
            onClick={() => setActiveTab('fees')} 
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <CreditCard size={15} /> Fee Clearance
          </button>
        </div>
      </div>

      {/* Attendance Warning Alert if applicable (PRD 4.1) */}
      {isCondonation && (
        <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#92400e' }}>
          <AlertCircle size={22} style={{ color: '#d97706', flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem' }}>
            <strong>Condonation Alert (PRD Policy):</strong> Your aggregate attendance is <strong>{attendancePct}%</strong> (threshold is 75%). Please submit approved medical certificates to CSE HOD for exam eligibility.
          </div>
        </div>
      )}

      {isDetained && (
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#991b1b' }}>
          <AlertCircle size={22} style={{ color: '#dc2626', flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem' }}>
            <strong>Detention Alert:</strong> Aggregate attendance has dropped to <strong>{attendancePct}%</strong>. Under JNTUK regulations, students with attendance &lt;65% are liable for detention.
          </div>
        </div>
      )}

      {/* Top Metric Stat Cards */}
      <div className="grid-4">
        <StatCard 
          title="Overall Attendance"
          value={`${attendancePct}%`}
          subtitle={`${student.totalClassesAttended || 212} / ${student.totalClassesHeld || 240} classes`}
          icon={Percent}
          color={isDetained ? "danger" : isCondonation ? "accent" : "success"}
          badgeText={isDetained ? "Detained" : isCondonation ? "Condonation" : "Eligible"}
          badgeType={isDetained ? "danger" : isCondonation ? "warning" : "success"}
        />

        <StatCard 
          title="Academic Standing"
          value={`${student.cgpa || 8.64}`}
          subtitle={`Last Sem SGPA: ${student.sgpaLast || 8.90}`}
          icon={Award}
          color="primary"
          badgeText="First Class with Dist."
          badgeType="primary"
        />

        <StatCard 
          title="Enrolled Subjects"
          value="6 Courses"
          subtitle="18.5 JNTUK R20 Credits"
          icon={BookOpen}
          color="purple"
          badgeText="VII Semester"
          badgeType="primary"
        />

        <StatCard 
          title="Fee Obligations"
          value={fees.dueAmount === 0 ? "All Clear" : `₹${fees.dueAmount.toLocaleString()}`}
          subtitle={fees.dueAmount === 0 ? "No pending college dues" : "Due Date: Oct 30, 2026"}
          icon={CreditCard}
          color={fees.dueAmount === 0 ? "success" : "accent"}
          badgeText={fees.dueAmount === 0 ? "Settled" : "Dues Pending"}
          badgeType={fees.dueAmount === 0 ? "success" : "warning"}
        />
      </div>

      {/* Two Column Layout: Enrolled Courses & Upcoming Exams */}
      <div className="grid-2">
        {/* Left: Active Semester Subjects Breakdown */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Current Enrolled Subjects</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Attendance & Mid Performance</p>
            </div>
            <button 
              onClick={() => setActiveTab('subjects')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              All Subjects <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {subjects.slice(0, 4).map((sub) => (
              <div key={sub.code} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', background: '#e2e8f0', color: '#475569', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>
                      {sub.code}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', marginTop: '0.2rem' }}>
                      {sub.name}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: sub.attendancePct >= 75 ? '#059669' : '#dc2626' }}>
                      {sub.attendancePct}%
                    </span>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{sub.classesAttended}/{sub.classesHeld}</div>
                  </div>
                </div>

                <div className="attendance-progress-bar">
                  <div 
                    className={`attendance-progress-fill ${sub.attendancePct >= 75 ? 'fill-safe' : 'fill-danger'}`}
                    style={{ width: `${sub.attendancePct}%` }}
                  ></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>Faculty: {sub.faculty}</span>
                  <span style={{ color: '#1d4ed8', fontWeight: 600 }}>Syllabus: {sub.syllabusCompleted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Examinations & Hall Ticket Schedule */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>JNTUK Semester Exams</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>{exams.currentSemester}</p>
            </div>
            <button 
              onClick={() => setActiveTab('exams')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              Exam Details <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} style={{ color: '#1d4ed8' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e40af' }}>Hall Ticket Released</div>
                <div style={{ fontSize: '0.72rem', color: '#3b82f6' }}>Examination Center: TMLN Narasaraopet</div>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('exams')}
              className="btn btn-outline-primary btn-sm"
              style={{ background: '#ffffff', fontSize: '0.75rem' }}
            >
              Download
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {exams.schedule.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1d4ed8' }}>{ex.date}</span>
                    <span style={{ color: '#94a3b8' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{ex.time}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a', marginTop: '0.15rem' }}>
                    {ex.subject}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{ex.hall}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
