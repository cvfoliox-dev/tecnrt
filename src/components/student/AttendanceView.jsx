import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Percent, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock,
  GraduationCap,
  Info
} from 'lucide-react';
import { 
  SEMESTER_STRUCTURE, 
  normalizeSemesterCode, 
  getStudentSemesterAttendance 
} from '../../data/mockData';

export default function AttendanceView() {
  const { currentUser, students } = useAuth();
  const student = students?.find(s => s.rollNumber === currentUser?.profile?.rollNumber) || currentUser?.profile || {};

  // Normalize student's current active semester
  const currentSemCode = normalizeSemesterCode(student.semester || '4-1');

  // Currently viewed semester (defaults to student's active semester)
  const [selectedSemCode, setSelectedSemCode] = useState(currentSemCode);

  // Keep in sync if student's active semester updates (e.g., after promotion)
  useEffect(() => {
    if (student.semester) {
      const code = normalizeSemesterCode(student.semester);
      if (!selectedSemCode) {
        setSelectedSemCode(code);
      }
    }
  }, [student.semester]);

  // Retrieve attendance data for the selected semester
  const semAttendance = getStudentSemesterAttendance(student, selectedSemCode);
  const selectedSemMeta = SEMESTER_STRUCTURE.find(s => s.code === selectedSemCode) || SEMESTER_STRUCTURE[0];

  const { hasData, conducted, attended, absent, percentage, monthlyAttendance } = semAttendance;

  const numericPercentage = parseFloat(percentage);
  const isEligible = hasData && numericPercentage >= 75;
  const isCondonation = hasData && numericPercentage >= 65 && numericPercentage < 75;
  const isShortage = hasData && numericPercentage < 65;

  const isCurrentActiveSemester = selectedSemCode === currentSemCode;

  // Group semesters by academic year for intuitive navigation
  const academicYears = [
    { year: '1st Year', semesters: SEMESTER_STRUCTURE.filter(s => s.year === '1st Year') },
    { year: '2nd Year', semesters: SEMESTER_STRUCTURE.filter(s => s.year === '2nd Year') },
    { year: '3rd Year', semesters: SEMESTER_STRUCTURE.filter(s => s.year === '3rd Year') },
    { year: '4th Year', semesters: SEMESTER_STRUCTURE.filter(s => s.year === '4th Year') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* ========================================================================= */}
      {/* 8-SEMESTER NAVIGATION INTERFACE                                           */}
      {/* ========================================================================= */}
      <div className="card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <GraduationCap size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#0e2154', fontWeight: 700, margin: 0 }}>
                B.Tech All-Semester Attendance Navigation
              </h3>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                Select any of the 8 academic semesters to inspect historical registers or active semester progress.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Current Semester:</span>
            <span style={{ 
              background: '#0e2154', 
              color: '#ffffff', 
              padding: '0.25rem 0.65rem', 
              borderRadius: '6px', 
              fontSize: '0.78rem', 
              fontWeight: 700 
            }}>
              Semester {currentSemCode} ({student.year || '4th Year'})
            </span>
          </div>
        </div>

        {/* 4-Year Semester Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
          {academicYears.map(({ year, semesters }) => (
            <div 
              key={year} 
              style={{ 
                background: '#f8fafc', 
                borderRadius: '10px', 
                padding: '0.65rem 0.75rem', 
                border: '1px solid #e2e8f0' 
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.45rem', letterSpacing: '0.04em' }}>
                {year}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {semesters.map(sem => {
                  const isSelected = selectedSemCode === sem.code;
                  const isCurrent = currentSemCode === sem.code;
                  const semData = getStudentSemesterAttendance(student, sem.code);

                  return (
                    <button
                      key={sem.code}
                      type="button"
                      onClick={() => setSelectedSemCode(sem.code)}
                      style={{
                        padding: '0.5rem 0.5rem',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #0e2154' : '1px solid #cbd5e1',
                        background: isSelected ? '#0e2154' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#0f172a',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 6px -1px rgba(14, 33, 84, 0.15)' : 'none',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.25rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                          Sem {sem.code}
                        </span>
                        {isCurrent && (
                          <span style={{ 
                            fontSize: '0.62rem', 
                            padding: '1px 5px', 
                            borderRadius: '4px', 
                            fontWeight: 700,
                            background: isSelected ? '#f59e0b' : '#fef3c7', 
                            color: isSelected ? '#0e2154' : '#92400e' 
                          }}>
                            Active
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.68rem', marginTop: '0.2rem', color: isSelected ? '#e2e8f0' : semData.hasData ? '#059669' : '#94a3b8', fontWeight: semData.hasData ? 700 : 500 }}>
                        {semData.hasData ? `${semData.percentage}% Attendance` : 'No Records'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: OVERALL SEMESTER ATTENDANCE SUMMARY FOR SELECTED SEMESTER          */}
      {/* ========================================================================= */}
      <div className="card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <Percent size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#0e2154', fontWeight: 700, margin: 0 }}>
                  Overall Semester Attendance
                </h2>
                <span style={{ 
                  background: isCurrentActiveSemester ? '#fef3c7' : '#f1f5f9', 
                  color: isCurrentActiveSemester ? '#92400e' : '#475569', 
                  fontSize: '0.72rem', 
                  padding: '2px 8px', 
                  borderRadius: '999px', 
                  fontWeight: 700 
                }}>
                  {isCurrentActiveSemester ? 'Current Active Semester' : 'Archived / Historical Record'}
                </span>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                {selectedSemMeta.fullName} • {student.department || 'CSE'}-{student.section || 'A'} ({student.rollNumber})
              </p>
            </div>
          </div>

          {/* JNTUK Regulatory Eligibility Status Badge */}
          <div>
            {!hasData ? (
              <span className="badge" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} /> Semester Not Commenced / No Data
              </span>
            ) : isEligible ? (
              <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={14} /> Examination Eligible (≥75%)
              </span>
            ) : isCondonation ? (
              <span className="badge badge-warning" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <AlertTriangle size={14} /> Condonation Required (65%–74%)
              </span>
            ) : (
              <span className="badge badge-danger" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <AlertCircle size={14} /> Attendance Shortage (&lt;65%)
              </span>
            )}
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          
          {/* 1. Total Classes Conducted */}
          <div style={{ background: '#f8fafc', padding: '1rem 1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Classes Conducted
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
              {hasData ? conducted : '—'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Total sessions scheduled in Semester {selectedSemCode}
            </div>
          </div>

          {/* 2. Total Classes Attended */}
          <div style={{ background: '#ecfdf5', padding: '1rem 1.1rem', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Classes Attended
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
              {hasData ? attended : '—'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#047857', marginTop: '0.2rem' }}>
              Present sessions officially verified
            </div>
          </div>

          {/* 3. Total Classes Absent */}
          <div style={{ background: '#fef2f2', padding: '1rem 1.1rem', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Classes Absent
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
              {hasData ? absent : '—'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#b91c1c', marginTop: '0.2rem' }}>
              Absences recorded in Semester {selectedSemCode}
            </div>
          </div>

          {/* 4. Overall Semester Attendance Percentage */}
          <div style={{ 
            background: !hasData ? '#f8fafc' : isEligible ? '#f0fdf4' : isCondonation ? '#fffbeb' : '#fef2f2', 
            padding: '1rem 1.1rem', 
            borderRadius: '10px', 
            border: `1px solid ${!hasData ? '#e2e8f0' : isEligible ? '#86efac' : isCondonation ? '#fde68a' : '#fca5a5'}` 
          }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: !hasData ? '#64748b' : isEligible ? '#166534' : isCondonation ? '#92400e' : '#991b1b', 
              textTransform: 'uppercase', 
              letterSpacing: '0.04em' 
            }}>
              Overall Semester Percentage
            </span>
            <div style={{ 
              fontSize: '1.85rem', 
              fontWeight: 800, 
              color: !hasData ? '#64748b' : isEligible ? '#059669' : isCondonation ? '#d97706' : '#dc2626', 
              fontFamily: 'var(--font-heading)', 
              marginTop: '0.25rem' 
            }}>
              {hasData ? `${percentage}%` : '—'}
            </div>
            <div style={{ fontSize: '0.72rem', color: isEligible ? '#15803d' : '#b45309', marginTop: '0.2rem' }}>
              {hasData ? `(${attended} / ${conducted}) × 100` : 'Not yet calculated'}
            </div>
          </div>
        </div>

        {/* Progress Bar & Scale */}
        {hasData ? (
          <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>Semester {selectedSemCode} Attendance Progress</span>
              <strong style={{ color: isEligible ? '#059669' : isCondonation ? '#d97706' : '#dc2626' }}>
                {attended} of {conducted} Classes Attended ({percentage}%)
              </strong>
            </div>
            <div className="attendance-progress-bar" style={{ height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                className={`attendance-progress-fill ${isEligible ? 'fill-safe' : isCondonation ? 'fill-warning' : 'fill-danger'}`}
                style={{ width: `${Math.min(100, Math.max(0, numericPercentage))}%`, height: '100%', transition: 'width 0.4s ease' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '0.35rem' }}>
              <span>0%</span>
              <span style={{ color: '#d97706', fontWeight: 600 }}>65% Condonation Limit</span>
              <span style={{ color: '#059669', fontWeight: 700 }}>75% Mandatory Eligibility</span>
              <span>100%</span>
            </div>
          </div>
        ) : (
          <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#64748b', fontSize: '0.82rem' }}>
            <Info size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />
            <span>Attendance records for Semester {selectedSemCode} have not yet commenced. Progress tracking will unlock upon official department attendance entry.</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW 2: MONTHLY ATTENDANCE REGISTER FOR SELECTED SEMESTER                 */}
      {/* ========================================================================= */}
      <div className="card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <Calendar size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#0e2154', fontWeight: 700, margin: 0 }}>
                Monthly Attendance Register — Semester {selectedSemCode}
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                Academic month-by-month attendance breakdown for {selectedSemMeta.fullName}
              </p>
            </div>
          </div>

          {monthlyAttendance.length > 0 && (
            <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#f8fafc', padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontWeight: 500 }}>
              {monthlyAttendance.length} Academic Months Recorded
            </span>
          )}
        </div>

        {monthlyAttendance.length === 0 ? (
          /* Clean Empty State */
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#64748b' }}>
              <Calendar size={28} />
            </div>
            <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, margin: '0 0 0.35rem 0' }}>
              No Monthly Attendance Records Available for Semester {selectedSemCode}
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '440px', margin: '0 auto' }}>
              {hasData 
                ? 'Individual monthly registers have not been itemized for this semester yet.' 
                : `Classes for Semester ${selectedSemCode} (${selectedSemMeta.fullName}) have not yet commenced. Monthly attendance will appear once officially uploaded by the department.`}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ padding: '0.85rem 1rem' }}>Academic Month</th>
                  <th style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>Total Classes Conducted</th>
                  <th style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>Classes Attended</th>
                  <th style={{ textAlign: 'center', padding: '0.85rem 1rem' }}>Classes Absent</th>
                  <th style={{ textAlign: 'right', padding: '0.85rem 1rem' }}>Attendance Percentage</th>
                </tr>
              </thead>
              <tbody>
                {monthlyAttendance.map((item, idx) => {
                  const itemConducted = item.classesConducted ?? item.totalClassesConducted ?? item.held ?? 0;
                  const itemAttended = item.classesAttended ?? item.attended ?? 0;
                  const itemAbsent = item.classesAbsent ?? item.absent ?? Math.max(0, itemConducted - itemAttended);
                  const pct = item.attendancePercentage != null 
                    ? Number(item.attendancePercentage).toFixed(2)
                    : itemConducted > 0 ? ((itemAttended / itemConducted) * 100).toFixed(2) : '0.00';
                  const isMonthEligible = Number(pct) >= 75;

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={15} style={{ color: '#2563eb' }} />
                          <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>{item.month}</strong>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', padding: '0.9rem 1rem', fontSize: '0.88rem', color: '#0f172a', fontWeight: 600 }}>
                        {itemConducted}
                      </td>
                      <td style={{ textAlign: 'center', padding: '0.9rem 1rem' }}>
                        <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.88rem', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                          {itemAttended}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', padding: '0.9rem 1rem' }}>
                        <span style={{ color: itemAbsent > 0 ? '#dc2626' : '#64748b', fontWeight: 700, fontSize: '0.88rem', background: itemAbsent > 0 ? '#fef2f2' : '#f8fafc', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                          {itemAbsent}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', padding: '0.9rem 1rem' }}>
                        <span style={{ 
                          fontWeight: 800, 
                          fontSize: '0.92rem', 
                          color: isMonthEligible ? '#059669' : '#d97706',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}>
                          {isMonthEligible ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                          {pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
