import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Search, 
  UserPlus, 
  FileSpreadsheet, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  X, 
  Download, 
  Upload, 
  Sparkles, 
  Percent, 
  ShieldAlert,
  ArrowRight,
  Plus,
  Building2,
  Key,
  ShieldCheck,
  Copy,
  Check,
  Calendar,
  GraduationCap,
  Clock,
  Eye
} from 'lucide-react';
import { 
  generateStudentRegistrationTemplate, 
  parseAndValidateStudentCSV 
} from '../../data/sampleSpreadsheet';
import { 
  SEMESTER_STRUCTURE, 
  normalizeSemesterCode, 
  normalizeYear, 
  getSemesterProgressionInfo,
  getStudentSemesterAttendance 
} from '../../data/mockData';

export default function HODStudentsAndClasses() {
  const { 
    currentUser, 
    students, 
    createStudent, 
    importStudentsToSection, 
    updateManualAttendance, 
    promoteStudent,
    batchPromoteStudents,
    showToast 
  } = useAuth();

  // HOD Branch strictly based on login context
  const assignedBranch = currentUser?.profile?.department || 'CSE';
  const selectedBranch = assignedBranch;

  // Active sub-view toggle: 'attendance' (Overview & Register) vs 'roster' (Directory & Promotion)
  const [activeSubTab, setActiveSubTab] = useState('attendance'); // 'attendance' | 'roster'

  // Section Management
  const [sectionsByYear, setSectionsByYear] = useState({
    '1st Year': ['A', 'B', 'C'],
    '2nd Year': ['A', 'B', 'C'],
    '3rd Year': ['A', 'B', 'C'],
    '4th Year': ['A', 'B', 'C']
  });
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionInput, setNewSectionInput] = useState('');

  // Canonical Academic Year and Semester Selectors
  const ACADEMIC_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const [selectedYear, setSelectedYear] = useState('4th Year');
  const [selectedSemester, setSelectedSemester] = useState('4-1');
  const [selectedSection, setSelectedSection] = useState('A');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, ELIGIBLE, CONDONATION, SHORTAGE

  // Multi-student selection for promotion
  const [selectedRolls, setSelectedRolls] = useState([]);

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);
  const [manualAttendanceStudent, setManualAttendanceStudent] = useState(null);
  const [newlyProvisionedModal, setNewlyProvisionedModal] = useState(null);
  const [promotionModalData, setPromotionModalData] = useState(null);
  const [inspectedStudent, setInspectedStudent] = useState(null);
  const [inspectedSemCode, setInspectedSemCode] = useState('4-1');
  const [copiedKey, setCopiedKey] = useState(false);

  // Semesters for the chosen academic year
  const currentSemesters = useMemo(() => {
    return SEMESTER_STRUCTURE.filter(s => s.year === selectedYear);
  }, [selectedYear]);

  const currentSections = sectionsByYear[selectedYear] || ['A', 'B', 'C'];

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const available = SEMESTER_STRUCTURE.filter(s => s.year === year);
    if (available.length > 0) {
      setSelectedSemester(available[0].code);
    }
    const yrSecs = sectionsByYear[year] || ['A', 'B', 'C'];
    if (!yrSecs.includes(selectedSection)) {
      setSelectedSection(yrSecs[0]);
    }
    setSelectedRolls([]);
  };

  const handleSemesterChange = (semCode) => {
    setSelectedSemester(semCode);
    setSelectedRolls([]);
  };

  const handleAddSection = () => {
    const raw = newSectionInput.trim();
    if (!raw) {
      showToast("Please enter a valid section letter or name (e.g. D)", "warning");
      return;
    }
    const cleaned = raw.replace(/^section\s+/i, '').trim().toUpperCase() || raw.toUpperCase();
    if (currentSections.includes(cleaned)) {
      showToast(`Section ${cleaned} already exists for ${assignedBranch} ${selectedYear}.`, "warning");
      return;
    }
    setSectionsByYear(prev => ({
      ...prev,
      [selectedYear]: [...(prev[selectedYear] || ['A', 'B', 'C']), cleaned]
    }));
    setSelectedSection(cleaned);
    setNewSectionInput('');
    setShowAddSectionModal(false);
    showToast(`Section ${cleaned} added to ${assignedBranch} ${selectedYear}!`, "success");
  };

  // Filter students for the chosen Branch -> Year -> Semester -> Section
  const sectionStudents = useMemo(() => {
    const targetSem = normalizeSemesterCode(selectedSemester);
    const targetYr = normalizeYear(selectedYear);
    return students.filter(s => 
      s.department === selectedBranch && 
      normalizeYear(s.year) === targetYr && 
      normalizeSemesterCode(s.semester) === targetSem &&
      s.section === selectedSection
    );
  }, [students, selectedBranch, selectedYear, selectedSemester, selectedSection]);

  // Section Attendance Aggregation & Analytics (Formula: (Total Attended / Total Conducted) * 100)
  const sectionAttendanceMetrics = useMemo(() => {
    const semCode = normalizeSemesterCode(selectedSemester);
    if (sectionStudents.length === 0) {
      return {
        hasData: false,
        totalConducted: 0,
        totalAttended: 0,
        totalAbsent: 0,
        overallPercentage: '0.00',
        monthlyData: [],
        lowAttendanceCount: 0,
        condonationCount: 0,
        eligibleCount: 0
      };
    }

    const studentRecords = sectionStudents.map(s => ({
      student: s,
      attendance: getStudentSemesterAttendance(s, semCode)
    }));

    const maxConducted = Math.max(...studentRecords.map(r => r.attendance.conducted), 0);
    const totalConducted = maxConducted;
    const totalAttended = studentRecords.reduce((sum, r) => sum + r.attendance.attended, 0);
    const totalPossible = totalConducted * sectionStudents.length;
    const totalAbsent = Math.max(0, totalPossible - totalAttended);

    const overallPercentage = totalPossible > 0
      ? ((totalAttended / totalPossible) * 100).toFixed(2)
      : '0.00';

    // Aggregate monthly attendance records
    const monthMap = {};
    studentRecords.forEach(r => {
      (r.attendance.monthlyAttendance || []).forEach(m => {
        if (!monthMap[m.month]) {
          monthMap[m.month] = {
            month: m.month,
            classesConducted: m.classesConducted || m.held || 0,
            classesAttended: 0,
            classesAbsent: 0
          };
        }
        monthMap[m.month].classesAttended += (m.classesAttended || m.attended || 0);
        monthMap[m.month].classesAbsent += (m.classesAbsent || m.absent || 0);
      });
    });

    const monthlyData = Object.values(monthMap).map(m => {
      const conducted = m.classesConducted;
      const possible = conducted * sectionStudents.length;
      const attended = m.classesAttended;
      const absent = possible > 0 ? Math.max(0, possible - attended) : m.classesAbsent;
      const pct = possible > 0
        ? ((attended / possible) * 100).toFixed(2)
        : conducted > 0 ? ((attended / conducted) * 100).toFixed(2) : '0.00';
      return {
        month: m.month,
        classesConducted: conducted,
        classesAttended: attended,
        classesAbsent: absent,
        attendancePercentage: pct
      };
    });

    const eligibleCount = studentRecords.filter(r => r.attendance.hasData && parseFloat(r.attendance.percentage) >= 75).length;
    const condonationCount = studentRecords.filter(r => r.attendance.hasData && parseFloat(r.attendance.percentage) >= 65 && parseFloat(r.attendance.percentage) < 75).length;
    const lowAttendanceCount = studentRecords.filter(r => r.attendance.hasData && parseFloat(r.attendance.percentage) < 65).length;

    return {
      hasData: totalConducted > 0,
      totalConducted,
      totalAttended,
      totalAbsent,
      overallPercentage,
      monthlyData,
      eligibleCount,
      condonationCount,
      lowAttendanceCount
    };
  }, [sectionStudents, selectedSemester]);

  // Apply search and status filters to student list
  const filteredStudents = useMemo(() => {
    const semCode = normalizeSemesterCode(selectedSemester);
    return sectionStudents.filter(s => {
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || 
        s.rollNumber.toLowerCase().includes(q) || 
        s.name.toLowerCase().includes(q) ||
        (s.fatherName && s.fatherName.toLowerCase().includes(q));

      const semAtt = getStudentSemesterAttendance(s, semCode);
      const pct = semAtt.hasData ? parseFloat(semAtt.percentage) : null;

      let matchesStatus = true;
      if (statusFilter === 'ELIGIBLE') {
        matchesStatus = pct !== null && pct >= 75;
      } else if (statusFilter === 'CONDONATION') {
        matchesStatus = pct !== null && pct >= 65 && pct < 75;
      } else if (statusFilter === 'SHORTAGE') {
        matchesStatus = pct !== null && pct < 65;
      }

      return matchesSearch && matchesStatus;
    });
  }, [sectionStudents, selectedSemester, search, statusFilter]);

  // Selection helpers
  const toggleSelectStudent = (roll) => {
    setSelectedRolls(prev => prev.includes(roll) ? prev.filter(r => r !== roll) : [...prev, roll]);
  };

  const toggleSelectAll = () => {
    if (selectedRolls.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedRolls([]);
    } else {
      setSelectedRolls(filteredStudents.map(s => s.rollNumber));
    }
  };

  // Promotion Handlers
  const handleOpenPromoteSingle = (student) => {
    const currentSem = normalizeSemesterCode(student.semester);
    const prog = getSemesterProgressionInfo(currentSem);
    if (!prog.canPromote) {
      showToast(`Student ${student.name} (${student.rollNumber}) has completed the final semester (4-2).`, "warning");
      return;
    }
    setPromotionModalData({
      isBulk: false,
      students: [student],
      currentSemester: currentSem,
      currentYear: student.year,
      currentSection: student.section,
      destinationYear: prog.nextYear,
      destinationSemester: prog.nextSem,
      destinationSection: student.section || selectedSection
    });
  };

  const handleOpenPromoteBulk = () => {
    const selectedStudents = sectionStudents.filter(s => selectedRolls.includes(s.rollNumber));
    if (!selectedStudents.length) return;

    const currentSem = normalizeSemesterCode(selectedSemester);
    const prog = getSemesterProgressionInfo(currentSem);

    setPromotionModalData({
      isBulk: true,
      students: selectedStudents,
      currentSemester: currentSem,
      currentYear: selectedYear,
      currentSection: selectedSection,
      destinationYear: prog.nextYear || selectedYear,
      destinationSemester: prog.nextSem || currentSem,
      destinationSection: selectedSection
    });
  };

  const handleConfirmPromotion = () => {
    if (!promotionModalData) return;

    if (promotionModalData.isBulk) {
      const rolls = promotionModalData.students.map(s => s.rollNumber);
      batchPromoteStudents(rolls);
      setSelectedRolls([]);
    } else {
      const s = promotionModalData.students[0];
      promoteStudent(s.rollNumber, {
        destinationYear: promotionModalData.destinationYear,
        destinationSemester: promotionModalData.destinationSemester,
        destinationSection: promotionModalData.destinationSection
      });
      setSelectedRolls(prev => prev.filter(r => r !== s.rollNumber));
    }

    setPromotionModalData(null);
  };

  // ===================== MANUAL ADD STUDENT STATE =====================
  const [addForm, setAddForm] = useState({ rollNumber: '', name: '' });
  const [addError, setAddError] = useState('');

  const handleOpenAddStudent = () => {
    const nextRollPrefix = selectedYear === '1st Year' ? '24TML05' : 
                           selectedYear === '2nd Year' ? '23TML05' : 
                           selectedYear === '3rd Year' ? '22TML05' : '21TML05';
    const sampleSuffix = Math.floor(80 + Math.random() * 19);
    setAddForm({ rollNumber: `${nextRollPrefix}${sampleSuffix}`, name: '' });
    setAddError('');
    setIsAddStudentOpen(true);
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    setAddError('');
    const roll = addForm.rollNumber.trim().toUpperCase();
    const name = addForm.name.trim();

    if (!roll || !name) {
      setAddError("Roll Number and Student Name are mandatory fields.");
      return;
    }

    const payload = {
      rollNumber: roll,
      name,
      department: selectedBranch,
      year: selectedYear,
      semester: selectedSemester,
      section: selectedSection
    };

    const res = createStudent(payload);
    if (res.success) {
      setIsAddStudentOpen(false);
      setNewlyProvisionedModal({ student: res.student, tempPassword: res.tempPassword });
    } else {
      setAddError(res.message || "Failed to register student");
    }
  };

  // ===================== CSV REGISTRATION IMPORT STATE =====================
  const [csvFileName, setCsvFileName] = useState('');
  const [csvResult, setCsvResult] = useState(null);
  const [csvTab, setCsvTab] = useState('ALL');

  const handleDownloadRegTemplate = () => {
    const csv = generateStudentRegistrationTemplate(selectedBranch, selectedYear, selectedSemester, selectedSection);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Student_Registration_${selectedBranch}_${selectedYear.replace(/\s+/g, '')}_${selectedSemester}_Sec${selectedSection}_Template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Template downloaded for ${selectedBranch} ${selectedYear} ${selectedSemester} Sec ${selectedSection}!`, "success");
  };

  const handleProcessCsvText = (filename, content) => {
    setCsvFileName(filename);
    const context = { branch: selectedBranch, year: selectedYear, semester: selectedSemester, section: selectedSection };
    const parsed = parseAndValidateStudentCSV(content, students, context);
    setCsvResult(parsed);
    if (parsed.isValid) {
      showToast(`${parsed.summary.validRows} students ready to import into ${selectedBranch} ${selectedYear} Sec ${selectedSection}!`, "success");
    } else {
      showToast(`CSV has ${parsed.summary.rejectedRows} issues needing correction before import.`, "warning");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => handleProcessCsvText(file.name, evt.target.result);
    reader.readAsText(file);
  };

  const handleLoadSampleCsv = () => {
    const prefix = selectedYear === '1st Year' ? '24TML05' : selectedYear === '2nd Year' ? '23TML05' : selectedYear === '3rd Year' ? '22TML05' : '21TML05';
    const sample = `Roll Number,Student Name
"${prefix}93","Ch. Naga Sai"
"${prefix}94","V. Sri Divya"
"${prefix}95","P. Hemanth Kumar"`;
    handleProcessCsvText(`Sample_Enrollment_${selectedBranch}_${selectedYear.replace(/\s+/g, '')}_Sec${selectedSection}.csv`, sample);
  };

  const handleConfirmBatchImport = () => {
    if (!csvResult || csvResult.summary.validRows === 0) return;
    const validStudents = csvResult.rows.filter(r => r.status === 'VALID');
    importStudentsToSection({
      branch: selectedBranch,
      year: selectedYear,
      semester: selectedSemester,
      section: selectedSection,
      newStudents: validStudents
    });
    setIsImportCSVOpen(false);
    setCsvResult(null);
    setCsvFileName('');
  };

  // ===================== MANUAL ATTENDANCE UPDATE STATE =====================
  const [attendanceForm, setAttendanceForm] = useState({
    subject: 'CS701PC - Cloud Computing',
    period: 'October 2026',
    held: 240,
    attended: 212,
    reason: 'Medical Leave certificate validated by HOD'
  });

  const handleOpenManualAttendance = (student) => {
    setManualAttendanceStudent(student);
    const semAtt = getStudentSemesterAttendance(student, selectedSemester);
    setAttendanceForm({
      subject: `Semester ${selectedSemester} Core Course`,
      period: 'Cumulative Semester 2026',
      held: semAtt.conducted || 240,
      attended: semAtt.attended || 212,
      reason: 'Physical attendance register reconciliation'
    });
  };

  const liveAttendancePct = useMemo(() => {
    const h = parseInt(attendanceForm.held, 10);
    const a = parseInt(attendanceForm.attended, 10);
    if (isNaN(h) || isNaN(a) || h <= 0 || a < 0 || a > h) return null;
    return parseFloat(((a / h) * 100).toFixed(1));
  }, [attendanceForm.held, attendanceForm.attended]);

  const handleSaveManualAttendance = (e) => {
    e.preventDefault();
    if (!manualAttendanceStudent) return;
    const res = updateManualAttendance({
      rollNumber: manualAttendanceStudent.rollNumber,
      classesHeld: attendanceForm.held,
      classesAttended: attendanceForm.attended,
      reason: attendanceForm.reason,
      subject: attendanceForm.subject,
      period: attendanceForm.period
    });
    if (res.success) {
      setManualAttendanceStudent(null);
    }
  };

  const numericOverall = parseFloat(sectionAttendanceMetrics.overallPercentage);
  const isSectionEligible = sectionAttendanceMetrics.hasData && numericOverall >= 75;
  const isSectionCondonation = sectionAttendanceMetrics.hasData && numericOverall >= 65 && numericOverall < 75;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ========================================================================= */}
      {/* TOP HEADER & ACADEMIC CONTEXT SELECTOR                                    */}
      {/* ========================================================================= */}
      <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #f59e0b', padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-accent">HOD Academic Administration</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>•</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>All-Semester Attendance & Student Academic Promotion</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: '#0e2154', margin: 0 }}>
              {selectedBranch} — {selectedYear} (Semester {selectedSemester}) • Section {selectedSection}
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0 0' }}>
              Department attendance oversight, monthly register monitoring, and official academic semester progression for B.Tech students.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleOpenAddStudent} 
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem' }}
            >
              <UserPlus size={16} /> Add Student
            </button>
            <button 
              onClick={() => {
                setCsvResult(null);
                setCsvFileName('');
                setIsImportCSVOpen(true);
              }}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', borderColor: '#0e2154', color: '#0e2154' }}
            >
              <FileSpreadsheet size={16} /> Import (CSV)
            </button>
          </div>
        </div>

        {/* Canonical Year, Semester & Section Navigation */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
          
          {/* Assigned Branch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Branch:</span>
            <span style={{ 
              background: '#0e2154', 
              color: '#ffffff', 
              padding: '0.35rem 0.85rem', 
              borderRadius: '6px', 
              fontSize: '0.82rem', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Building2 size={14} style={{ color: '#f59e0b' }} />
              {assignedBranch}
            </span>
          </div>

          {/* Academic Year Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Year:</span>
            <div style={{ display: 'flex', background: '#f8fafc', padding: '0.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              {ACADEMIC_YEARS.map(yr => (
                <button
                  key={yr}
                  onClick={() => handleYearChange(yr)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedYear === yr ? '#0e2154' : 'transparent',
                    color: selectedYear === yr ? '#ffffff' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Canonical Semester Selector (1-1 to 4-2) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Semester:</span>
            <div style={{ display: 'flex', background: '#f8fafc', padding: '0.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.25rem' }}>
              {currentSemesters.map(sem => (
                <button
                  key={sem.code}
                  onClick={() => handleSemesterChange(sem.code)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedSemester === sem.code ? '#2563eb' : 'transparent',
                    color: selectedSemester === sem.code ? '#ffffff' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Sem {sem.code}
                </button>
              ))}
            </div>
          </div>

          {/* Section Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Section:</span>
            <div style={{ display: 'flex', background: '#f8fafc', padding: '0.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', gap: '0.25rem', alignItems: 'center' }}>
              {currentSections.map(sec => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedSection === sec ? '#f59e0b' : 'transparent',
                    color: selectedSection === sec ? '#0e2154' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Sec {sec}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowAddSectionModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: '1px dashed #0a3d78',
                  background: '#ffffff',
                  color: '#0a3d78',
                  cursor: 'pointer'
                }}
                title="Add a new section for this academic year"
              >
                <Plus size={13} /> Add Sec
              </button>
            </div>
          </div>

        </div>

        {/* View Switcher Tabs */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setActiveSubTab('attendance')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: activeSubTab === 'attendance' ? '2px solid #0e2154' : '1px solid #e2e8f0',
                background: activeSubTab === 'attendance' ? '#0e2154' : '#ffffff',
                color: activeSubTab === 'attendance' ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Percent size={16} /> Section Attendance & Monthly Register
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('roster')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: activeSubTab === 'roster' ? '2px solid #0e2154' : '1px solid #e2e8f0',
                background: activeSubTab === 'roster' ? '#0e2154' : '#ffffff',
                color: activeSubTab === 'roster' ? '#ffffff' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <GraduationCap size={16} /> Student Academic Promotion & Roster ({sectionStudents.length})
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Selected: <strong>{assignedBranch} • {selectedYear} (Sem {selectedSemester}) Sec {selectedSection}</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SECTION ATTENDANCE & MONTHLY REGISTER (Matching Student Portal UI) */}
      {/* ========================================================================= */}
      {activeSubTab === 'attendance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Card 1: Overall Semester Attendance Summary */}
          <div className="card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
                  <Percent size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#0e2154', fontWeight: 700, margin: 0 }}>
                    Overall Semester Attendance
                  </h2>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                    Aggregate section attendance for {selectedYear} • Semester {selectedSemester} ({selectedBranch}-{selectedSection}) • {sectionStudents.length} Students
                  </p>
                </div>
              </div>

              {/* Regulatory Status Badge */}
              <div>
                {!sectionAttendanceMetrics.hasData ? (
                  <span className="badge" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} /> No Attendance Recorded Yet
                  </span>
                ) : isSectionEligible ? (
                  <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={14} /> Section Target Compliant (≥75%)
                  </span>
                ) : isSectionCondonation ? (
                  <span className="badge badge-warning" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertTriangle size={14} /> Condonation Range (65%–74%)
                  </span>
                ) : (
                  <span className="badge badge-danger" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertCircle size={14} /> Attendance Shortage Alert (&lt;65%)
                  </span>
                )}
              </div>
            </div>

            {/* 4 Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              
              {/* 1. Total Classes Conducted */}
              <div style={{ background: '#f8fafc', padding: '1rem 1.1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Classes Conducted
                </span>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
                  {sectionAttendanceMetrics.hasData ? sectionAttendanceMetrics.totalConducted : '—'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  Total sessions scheduled in Semester {selectedSemester}
                </div>
              </div>

              {/* 2. Total Classes Attended */}
              <div style={{ background: '#ecfdf5', padding: '1rem 1.1rem', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Classes Attended
                </span>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
                  {sectionAttendanceMetrics.hasData ? sectionAttendanceMetrics.totalAttended : '—'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#047857', marginTop: '0.2rem' }}>
                  Cumulative present sessions across section
                </div>
              </div>

              {/* 3. Total Classes Absent */}
              <div style={{ background: '#fef2f2', padding: '1rem 1.1rem', borderRadius: '10px', border: '1px solid #fecaca' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Classes Absent
                </span>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-heading)', marginTop: '0.25rem' }}>
                  {sectionAttendanceMetrics.hasData ? sectionAttendanceMetrics.totalAbsent : '—'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#b91c1c', marginTop: '0.2rem' }}>
                  Cumulative absences recorded in section
                </div>
              </div>

              {/* 4. Overall Semester Percentage */}
              <div style={{ 
                background: !sectionAttendanceMetrics.hasData ? '#f8fafc' : isSectionEligible ? '#f0fdf4' : isSectionCondonation ? '#fffbeb' : '#fef2f2', 
                padding: '1rem 1.1rem', 
                borderRadius: '10px', 
                border: `1px solid ${!sectionAttendanceMetrics.hasData ? '#e2e8f0' : isSectionEligible ? '#86efac' : isSectionCondonation ? '#fde68a' : '#fca5a5'}` 
              }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  color: !sectionAttendanceMetrics.hasData ? '#64748b' : isSectionEligible ? '#166534' : isSectionCondonation ? '#92400e' : '#991b1b', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.04em' 
                }}>
                  Overall Semester Percentage
                </span>
                <div style={{ 
                  fontSize: '1.85rem', 
                  fontWeight: 800, 
                  color: !sectionAttendanceMetrics.hasData ? '#64748b' : isSectionEligible ? '#059669' : isSectionCondonation ? '#d97706' : '#dc2626', 
                  fontFamily: 'var(--font-heading)', 
                  marginTop: '0.25rem' 
                }}>
                  {sectionAttendanceMetrics.hasData ? `${sectionAttendanceMetrics.overallPercentage}%` : '—'}
                </div>
                <div style={{ fontSize: '0.72rem', color: isSectionEligible ? '#15803d' : '#b45309', marginTop: '0.2rem' }}>
                  {sectionAttendanceMetrics.hasData ? `(${sectionAttendanceMetrics.totalAttended} / ${sectionAttendanceMetrics.totalConducted * sectionStudents.length}) × 100` : 'Not yet calculated'}
                </div>
              </div>
            </div>

            {/* Progress Bar & Scale */}
            {sectionAttendanceMetrics.hasData && (
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Section Attendance Progress</span>
                  <strong style={{ color: isSectionEligible ? '#059669' : isSectionCondonation ? '#d97706' : '#dc2626' }}>
                    {sectionAttendanceMetrics.overallPercentage}% Average ({sectionAttendanceMetrics.eligibleCount} Eligible, {sectionAttendanceMetrics.lowAttendanceCount} Shortage)
                  </strong>
                </div>
                <div className="attendance-progress-bar" style={{ height: '10px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div 
                    className={`attendance-progress-fill ${isSectionEligible ? 'fill-safe' : isSectionCondonation ? 'fill-warning' : 'fill-danger'}`}
                    style={{ width: `${Math.min(100, Math.max(0, numericOverall))}%`, height: '100%', transition: 'width 0.4s ease' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '0.35rem' }}>
                  <span>0%</span>
                  <span style={{ color: '#d97706', fontWeight: 600 }}>65% Condonation Limit</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>75% Mandatory Eligibility</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Monthly Attendance Register for Selected Semester */}
          <div className="card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#0e2154', fontWeight: 700, margin: 0 }}>
                    Monthly Attendance Register — Semester {selectedSemester}
                  </h3>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                    Section monthly attendance breakdown for {selectedBranch} {selectedYear} (Semester {selectedSemester}) Section {selectedSection}
                  </p>
                </div>
              </div>

              {sectionAttendanceMetrics.monthlyData.length > 0 && (
                <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#f8fafc', padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontWeight: 500 }}>
                  {sectionAttendanceMetrics.monthlyData.length} Academic Months Recorded
                </span>
              )}
            </div>

            {sectionAttendanceMetrics.monthlyData.length === 0 ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#64748b' }}>
                  <Calendar size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, margin: '0 0 0.35rem 0' }}>
                  No Monthly Attendance Records Available for Semester {selectedSemester}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '440px', margin: '0 auto' }}>
                  Monthly registers for Semester {selectedSemester} have not yet been uploaded for this section. Upload registers through "Attendance Upload & Publish".
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
                    {sectionAttendanceMetrics.monthlyData.map((item, idx) => {
                      const isMonthEligible = Number(item.attendancePercentage) >= 75;
                      return (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.9rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Calendar size={15} style={{ color: '#2563eb' }} />
                              <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>{item.month}</strong>
                            </div>
                          </td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 1rem', fontSize: '0.88rem', color: '#0f172a', fontWeight: 600 }}>
                            {item.classesConducted}
                          </td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 1rem' }}>
                            <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.88rem', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                              {item.classesAttended}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 1rem' }}>
                            <span style={{ color: item.classesAbsent > 0 ? '#dc2626' : '#64748b', fontWeight: 700, fontSize: '0.88rem', background: item.classesAbsent > 0 ? '#fef2f2' : '#f8fafc', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                              {item.classesAbsent}
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
                              {item.attendancePercentage}%
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

          {/* Low Attendance Identification Alert Bar */}
          {sectionAttendanceMetrics.lowAttendanceCount > 0 && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem 1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.9rem' }}>
                    {sectionAttendanceMetrics.lowAttendanceCount} Student(s) with Low Attendance Shortage (&lt;65%) Identified!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#b91c1c' }}>
                    Students falling below 65% are at severe risk of examination detention under university regulations.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('SHORTAGE');
                  setActiveSubTab('roster');
                }}
                className="btn btn-sm btn-danger"
                style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                Inspect Shortage Students <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STUDENT ACADEMIC PROMOTION & ROSTER                                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'roster' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Quick Filter & Bulk Action Toolbar */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '340px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder={`Search ${selectedBranch} ${selectedYear} Sec ${selectedSection}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.4rem', fontSize: '0.85rem', width: '100%' }}
              />
            </div>

            {/* Attendance Status Filter Chips */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>ATTENDANCE FILTER:</span>
              {[
                { id: 'ALL', label: `All (${sectionStudents.length})` },
                { id: 'ELIGIBLE', label: `Eligible ≥75% (${sectionAttendanceMetrics.eligibleCount})` },
                { id: 'CONDONATION', label: `Condonation (${sectionAttendanceMetrics.condonationCount})` },
                { id: 'SHORTAGE', label: `Shortage <65% (${sectionAttendanceMetrics.lowAttendanceCount})` }
              ].map(flt => (
                <button
                  key={flt.id}
                  type="button"
                  onClick={() => setStatusFilter(flt.id)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    border: statusFilter === flt.id ? '1px solid #0e2154' : '1px solid #e2e8f0',
                    background: statusFilter === flt.id ? '#0e2154' : '#ffffff',
                    color: statusFilter === flt.id ? '#ffffff' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {flt.label}
                </button>
              ))}
            </div>

            {/* Bulk Promote Action Button */}
            {selectedRolls.length > 0 && (
              <button
                type="button"
                onClick={handleOpenPromoteBulk}
                className="btn btn-primary"
                style={{ 
                  background: '#16a34a', 
                  borderColor: '#16a34a',
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.45rem', 
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.25)'
                }}
              >
                <GraduationCap size={16} /> Promote Selected ({selectedRolls.length}) to Next Semester
              </button>
            )}
          </div>

          {/* Student Roster Table with Academic Promotion Info */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div className="table-responsive">
              <table className="data-table" style={{ margin: 0 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ width: '40px', textAlign: 'center' }}>
                      <input 
                        type="checkbox"
                        checked={filteredStudents.length > 0 && selectedRolls.length === filteredStudents.length}
                        onChange={toggleSelectAll}
                        style={{ cursor: 'pointer' }}
                        title="Select All Students"
                      />
                    </th>
                    <th style={{ width: '125px' }}>Roll Number</th>
                    <th>Student Name</th>
                    <th>Current Academic Year</th>
                    <th style={{ textAlign: 'center' }}>Current Semester</th>
                    <th style={{ textAlign: 'center' }}>Current Section</th>
                    <th style={{ textAlign: 'center' }}>Sem {selectedSemester} Attendance %</th>
                    <th style={{ textAlign: 'center' }}>Next Eligible Semester</th>
                    <th style={{ textAlign: 'center' }}>Promotion Status</th>
                    <th style={{ textAlign: 'right', width: '180px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={10} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <Users size={36} style={{ color: '#cbd5e1' }} />
                          <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>
                            {sectionStudents.length === 0 ? "No students in this section" : "No students matching current filters"}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '420px' }}>
                            {sectionStudents.length === 0 
                              ? `No student records enrolled in ${assignedBranch} ${selectedYear} Semester ${selectedSemester} Section ${selectedSection}. Click "Add Student" or "Import (CSV)" above.`
                              : "Adjust your search query or attendance status filter above."}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => {
                      const semAtt = getStudentSemesterAttendance(student, selectedSemester);
                      const isSelected = selectedRolls.includes(student.rollNumber);
                      const currentSemCode = normalizeSemesterCode(student.semester);
                      const prog = getSemesterProgressionInfo(currentSemCode);

                      const pct = semAtt.hasData ? parseFloat(semAtt.percentage) : null;
                      const isEligible = pct !== null && pct >= 75;
                      const isCondonation = pct !== null && pct >= 65 && pct < 75;

                      return (
                        <tr key={student.id} style={{ background: isSelected ? '#f0fdf4' : 'transparent' }}>
                          <td style={{ textAlign: 'center' }}>
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectStudent(student.rollNumber)}
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                          <td>
                            <strong style={{ color: '#1d4ed8', fontSize: '0.88rem', letterSpacing: '0.02em' }}>
                              {student.rollNumber}
                            </strong>
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{student.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                              {student.phone || student.email || 'Registered student'}
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                              {student.year || selectedYear}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{ 
                              background: '#eff6ff', 
                              color: '#1d4ed8', 
                              fontWeight: 700, 
                              fontSize: '0.8rem', 
                              padding: '2px 8px', 
                              borderRadius: '6px' 
                            }}>
                              Sem {currentSemCode}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                            Section {student.section || selectedSection}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {pct !== null ? (
                              <span 
                                style={{ 
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '9999px',
                                  fontWeight: 800,
                                  fontSize: '0.82rem',
                                  background: isEligible ? '#ecfdf5' : isCondonation ? '#fffbeb' : '#fef2f2',
                                  color: isEligible ? '#059669' : isCondonation ? '#d97706' : '#dc2626',
                                  border: `1px solid ${isEligible ? '#a7f3d0' : isCondonation ? '#fde68a' : '#fecaca'}`
                                }}
                              >
                                {isEligible ? <CheckCircle2 size={12} /> : isCondonation ? <AlertTriangle size={12} /> : <AlertCircle size={12} />}
                                {pct}%
                              </span>
                            ) : (
                              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {prog.canPromote ? (
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontWeight: 700, fontSize: '0.82rem' }}>
                                <span>Sem {prog.nextSem}</span>
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>({prog.nextYear})</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.74rem', color: '#64748b', fontStyle: 'italic' }}>
                                Programme Completed
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {prog.canPromote ? (
                              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                                Eligible for Promotion
                              </span>
                            ) : (
                              <span className="badge" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.7rem' }}>
                                Final Semester (4-2)
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center' }}>
                              {prog.canPromote && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenPromoteSingle(student)}
                                  className="btn btn-sm"
                                  style={{ 
                                    background: '#0e2154', 
                                    color: '#ffffff', 
                                    fontSize: '0.74rem', 
                                    padding: '0.3rem 0.65rem', 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '0.3rem',
                                    fontWeight: 700,
                                    border: 'none'
                                  }}
                                  title={`Promote ${student.name} to Semester ${prog.nextSem}`}
                                >
                                  <GraduationCap size={13} /> Promote
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setInspectedStudent(student);
                                  setInspectedSemCode(currentSemCode);
                                }}
                                className="btn btn-sm btn-outline"
                                style={{ fontSize: '0.74rem', padding: '0.3rem 0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                title="Inspect Student All-Semester Attendance"
                              >
                                <Eye size={13} /> View
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenManualAttendance(student)}
                                className="btn btn-sm btn-outline"
                                style={{ fontSize: '0.74rem', padding: '0.3rem 0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                title="Adjust Attendance"
                              >
                                <Edit3 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: STUDENT ACADEMIC PROMOTION CONFIRMATION                            */}
      {/* ========================================================================= */}
      {promotionModalData && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '620px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={22} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                  Confirm Student Academic Promotion
                </h3>
              </div>
              <button 
                onClick={() => setPromotionModalData(null)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Promotion Flow Comparison Card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center', background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                
                {/* Current Academic Details */}
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>CURRENT STANDING</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginTop: '0.25rem' }}>
                    Semester {promotionModalData.currentSemester}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.2rem' }}>
                    {promotionModalData.currentYear} • Sec {promotionModalData.currentSection}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.4rem' }}>
                    Department: <strong>{assignedBranch}</strong>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0e2154', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={18} />
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0e2154' }}>PROMOTION</span>
                </div>

                {/* Destination Academic Details */}
                <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase' }}>DESTINATION STANDING</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669', marginTop: '0.25rem' }}>
                    Semester {promotionModalData.destinationSemester}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.2rem' }}>
                    {promotionModalData.destinationYear} • Sec {promotionModalData.destinationSection}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#065f46', marginTop: '0.4rem' }}>
                    Progression: <strong>Verified</strong>
                  </div>
                </div>

              </div>

              {/* Students to be promoted */}
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0e2154', marginBottom: '0.5rem' }}>
                  Student(s) Selected for Promotion ({promotionModalData.students.length}):
                </div>
                <div style={{ maxHeight: '140px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem', background: '#f8fafc' }}>
                  {promotionModalData.students.map(s => (
                    <div key={s.rollNumber} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0.5rem', borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
                      <span><strong style={{ color: '#1d4ed8' }}>{s.rollNumber}</strong> — {s.name}</span>
                      <span style={{ color: '#64748b' }}>Current: Sem {normalizeSemesterCode(s.semester)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Preservation Guarantee Banner */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.8rem', color: '#1e40af', lineHeight: 1.5, display: 'flex', gap: '0.65rem' }}>
                <ShieldCheck size={20} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Institutional Data Preservation Guarantee:</strong>
                  <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.1rem', fontSize: '0.76rem' }}>
                    <li>All previous semester attendance records and monthly registers remain permanently intact.</li>
                    <li>Student personal profile, contact information, and authentication credentials remain unaffected.</li>
                    <li>No duplicate student records will be created; progression updates the student's active semester.</li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <button 
                type="button" 
                onClick={() => setPromotionModalData(null)} 
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleConfirmPromotion} 
                className="btn btn-primary"
                style={{ background: '#16a34a', borderColor: '#16a34a' }}
              >
                <CheckCircle2 size={16} /> Confirm & Promote ({promotionModalData.students.length} Student{promotionModalData.students.length > 1 ? 's' : ''})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INSPECT INDIVIDUAL STUDENT ALL-SEMESTER ATTENDANCE                 */}
      {/* ========================================================================= */}
      {inspectedStudent && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large" style={{ maxWidth: '820px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Percent size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  All-Semester Attendance Record — {inspectedStudent.name} ({inspectedStudent.rollNumber})
                </h3>
              </div>
              <button 
                onClick={() => setInspectedStudent(null)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* 8-Semester Switcher */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', background: '#f8fafc', padding: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                {SEMESTER_STRUCTURE.map(sem => {
                  const isSel = inspectedSemCode === sem.code;
                  const data = getStudentSemesterAttendance(inspectedStudent, sem.code);
                  return (
                    <button
                      key={sem.code}
                      type="button"
                      onClick={() => setInspectedSemCode(sem.code)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: isSel ? '2px solid #0e2154' : '1px solid #cbd5e1',
                        background: isSel ? '#0e2154' : '#ffffff',
                        color: isSel ? '#ffffff' : '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      Sem {sem.code} {data.hasData && `(${data.percentage}%)`}
                    </button>
                  );
                })}
              </div>

              {/* Inspected Semester Attendance Details */}
              {(() => {
                const data = getStudentSemesterAttendance(inspectedStudent, inspectedSemCode);
                const isElg = data.hasData && parseFloat(data.percentage) >= 75;
                const isCnd = data.hasData && parseFloat(data.percentage) >= 65 && parseFloat(data.percentage) < 75;
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                      <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>CONDUCTED</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{data.hasData ? data.conducted : '—'}</div>
                      </div>
                      <div style={{ background: '#ecfdf5', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                        <span style={{ fontSize: '0.72rem', color: '#065f46', fontWeight: 600 }}>ATTENDED</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>{data.hasData ? data.attended : '—'}</div>
                      </div>
                      <div style={{ background: '#fef2f2', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
                        <span style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 600 }}>ABSENT</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>{data.hasData ? data.absent : '—'}</div>
                      </div>
                      <div style={{ background: isElg ? '#ecfdf5' : isCnd ? '#fffbeb' : '#fef2f2', padding: '0.75rem 1rem', borderRadius: '8px', border: `1px solid ${isElg ? '#a7f3d0' : isCnd ? '#fde68a' : '#fecaca'}` }}>
                        <span style={{ fontSize: '0.72rem', color: isElg ? '#065f46' : '#92400e', fontWeight: 600 }}>PERCENTAGE</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isElg ? '#059669' : isCnd ? '#d97706' : '#dc2626' }}>
                          {data.hasData ? `${data.percentage}%` : '—'}
                        </div>
                      </div>
                    </div>

                    {/* Monthly table */}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                      <table className="data-table" style={{ margin: 0, fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc' }}>
                            <th>Academic Month</th>
                            <th style={{ textAlign: 'center' }}>Conducted</th>
                            <th style={{ textAlign: 'center' }}>Attended</th>
                            <th style={{ textAlign: 'center' }}>Absent</th>
                            <th style={{ textAlign: 'right' }}>Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.monthlyAttendance.length === 0 ? (
                            <tr>
                              <td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>
                                No monthly breakdown recorded for Semester {inspectedSemCode}.
                              </td>
                            </tr>
                          ) : (
                            data.monthlyAttendance.map((m, idx) => (
                              <tr key={idx}>
                                <td><strong>{m.month}</strong></td>
                                <td style={{ textAlign: 'center' }}>{m.classesConducted || m.held}</td>
                                <td style={{ textAlign: 'center', color: '#059669', fontWeight: 700 }}>{m.classesAttended || m.attended}</td>
                                <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{m.classesAbsent || m.absent}</td>
                                <td style={{ textAlign: 'right', fontWeight: 800, color: Number(m.attendancePercentage) >= 75 ? '#059669' : '#d97706' }}>
                                  {m.attendancePercentage}%
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>
                );
              })()}

            </div>

            <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => setInspectedStudent(null)} 
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: MANUAL ADD STUDENT (Direct inside section)                       */}
      {/* ========================================================================= */}
      {isAddStudentOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large" style={{ maxWidth: '640px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Add Student Record — {selectedBranch} {selectedYear} Sec {selectedSection}
                </h3>
              </div>
              <button 
                onClick={() => setIsAddStudentOpen(false)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStudent}>
              <div className="modal-body" style={{ padding: '1.5rem' }}>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.8rem', color: '#1e40af', marginBottom: '1.25rem' }}>
                  <strong>Auto-Assigned Section:</strong> Branch: <strong>{selectedBranch}</strong> • Year: <strong>{selectedYear}</strong> (Semester {selectedSemester}) • Section: <strong>Section {selectedSection}</strong>
                </div>

                {addError && (
                  <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={16} />
                    <span>{addError}</span>
                  </div>
                )}

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">College Roll Number *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. 23TML0588"
                      value={addForm.rollNumber}
                      onChange={(e) => setAddForm({ ...addForm, rollNumber: e.target.value.toUpperCase() })}
                    />
                    <small style={{ color: '#64748b', fontSize: '0.72rem' }}>Must be unique across institutional registry.</small>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Student Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required 
                      placeholder="e.g. P. Sai Teja"
                      value={addForm.name}
                      onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.78rem', color: '#475569', marginTop: '0.5rem' }}>
                  <strong style={{ color: '#0e2154', display: 'block', marginBottom: '0.2rem' }}>Profile Completion Workflow:</strong>
                  Detailed personal, contact, parent/guardian, and admission records will be completed by the student through the Student Portal upon account provisioning.
                </div>

              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddStudentOpen(false)} 
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <UserPlus size={16} /> Save Student to Section {selectedSection}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EXCEL / CSV BATCH STUDENT REGISTRATION                           */}
      {/* ========================================================================= */}
      {isImportCSVOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large" style={{ maxWidth: '820px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileSpreadsheet size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Batch Student Enrollment via Excel / CSV — Sec {selectedSection}
                </h3>
              </div>
              <button 
                onClick={() => setIsImportCSVOpen(false)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.82rem', color: '#166534' }}>
                <strong>Section Assignment:</strong> All imported students will be registered into <strong>{selectedBranch} — {selectedYear} (Semester {selectedSemester}) Section {selectedSection}</strong>. Duplicate roll numbers will be automatically flagged and rejected.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0e2154' }}>Official 2-Column Enrollment Template</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Download pre-formatted columns (Roll Number, Student Name only)</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    onClick={handleDownloadRegTemplate} 
                    className="btn btn-sm btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Download size={14} /> Download Template (.CSV)
                  </button>
                  <button 
                    type="button" 
                    onClick={handleLoadSampleCsv} 
                    className="btn btn-sm btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Sparkles size={14} /> Load 3 Demo Students
                  </button>
                </div>
              </div>

              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', background: '#f8fafc' }}>
                <Upload size={28} style={{ color: '#64748b', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                  Select or drag a CSV file with student records
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                  Contains only 2 columns: Roll Number, Student Name
                </div>
                <input 
                  type="file" 
                  accept=".csv,text/csv" 
                  onChange={handleFileSelect}
                  style={{ fontSize: '0.82rem' }}
                />
              </div>

              {csvResult && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 1rem', background: csvResult.isValid ? '#ecfdf5' : '#fffbeb', borderRadius: '8px', border: `1px solid ${csvResult.isValid ? '#a7f3d0' : '#fde68a'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {csvResult.isValid ? <CheckCircle2 size={18} style={{ color: '#059669' }} /> : <AlertTriangle size={18} style={{ color: '#d97706' }} />}
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: csvResult.isValid ? '#065f46' : '#92400e' }}>
                        Validation Report: {csvResult.summary.validRows} valid records, {csvResult.summary.rejectedRows} rejected records.
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {['ALL', 'VALID', 'REJECTED'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setCsvTab(tab)}
                          style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            background: csvTab === tab ? '#0e2154' : '#ffffff',
                            color: csvTab === tab ? '#ffffff' : '#475569'
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <table className="data-table" style={{ margin: 0, fontSize: '0.78rem' }}>
                      <thead>
                        <tr>
                          <th>Row</th>
                          <th>Roll Number</th>
                          <th>Student Name</th>
                          <th>Target Section</th>
                          <th>Status</th>
                          <th>Remarks / Validation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvResult.rows
                          .filter(r => csvTab === 'ALL' || r.status === csvTab)
                          .map((row, idx) => (
                            <tr key={idx} style={{ background: row.status === 'REJECTED' ? '#fef2f2' : 'transparent' }}>
                              <td>{row.rowNumber}</td>
                              <td><strong style={{ color: '#1d4ed8' }}>{row.rollNumber || '—'}</strong></td>
                              <td>{row.name || '—'}</td>
                              <td>{selectedBranch} {selectedYear} ({selectedSemester}) Sec {selectedSection}</td>
                              <td>
                                {row.status === 'VALID' ? (
                                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Valid</span>
                                ) : (
                                  <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>Rejected</span>
                                )}
                              </td>
                              <td style={{ color: row.status === 'REJECTED' ? '#dc2626' : '#059669', fontSize: '0.72rem' }}>
                                {row.errors.length > 0 ? row.errors.join('; ') : 'Ready for enrollment'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <button 
                type="button" 
                onClick={() => setIsImportCSVOpen(false)} 
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="button" 
                disabled={!csvResult || csvResult.summary.validRows === 0}
                onClick={handleConfirmBatchImport} 
                className="btn btn-primary"
                style={{ opacity: (!csvResult || csvResult.summary.validRows === 0) ? 0.6 : 1 }}
              >
                <CheckCircle2 size={16} /> Confirm Import ({csvResult ? csvResult.summary.validRows : 0} Students)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: MANUAL ATTENDANCE ADJUSTMENT                                      */}
      {/* ========================================================================= */}
      {manualAttendanceStudent && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '540px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={18} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
                  Update Student Attendance Record
                </h3>
              </div>
              <button 
                onClick={() => setManualAttendanceStudent(null)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveManualAttendance}>
              <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>STUDENT DETAILS</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0e2154' }}>
                      {manualAttendanceStudent.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#1d4ed8', fontWeight: 700 }}>
                      Roll No: {manualAttendanceStudent.rollNumber}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>SEMESTER ATTENDANCE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>
                      {getStudentSemesterAttendance(manualAttendanceStudent, selectedSemester).percentage}%
                    </div>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Total Classes Held *</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      required 
                      min="1"
                      value={attendanceForm.held}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, held: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Classes Attended *</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      required 
                      min="0"
                      max={attendanceForm.held}
                      value={attendanceForm.attended}
                      onChange={(e) => setAttendanceForm({ ...attendanceForm, attended: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ padding: '0.85rem 1rem', borderRadius: '8px', background: liveAttendancePct !== null ? (liveAttendancePct >= 75 ? '#ecfdf5' : liveAttendancePct >= 65 ? '#fffbeb' : '#fef2f2') : '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569' }}>NEW COMPUTED ATTENDANCE</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: liveAttendancePct !== null ? (liveAttendancePct >= 75 ? '#059669' : liveAttendancePct >= 65 ? '#d97706' : '#dc2626') : '#94a3b8' }}>
                      {liveAttendancePct !== null ? `${liveAttendancePct}%` : 'Invalid Numbers'}
                    </div>
                  </div>
                  <div>
                    {liveAttendancePct !== null && (
                      <span className={`badge ${liveAttendancePct >= 75 ? 'badge-success' : liveAttendancePct >= 65 ? 'badge-warning' : 'badge-danger'}`}>
                        {liveAttendancePct >= 75 ? 'Eligible for Exams' : liveAttendancePct >= 65 ? 'Condonation Required' : 'Detained Status'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Official Reason / Justification *</label>
                  <textarea 
                    className="form-input" 
                    rows={2}
                    required
                    placeholder="e.g. Medical certificate verified / Institutional attendance reconciliation"
                    value={attendanceForm.reason}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, reason: e.target.value })}
                  />
                </div>

              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <button 
                  type="button" 
                  onClick={() => setManualAttendanceStudent(null)} 
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={liveAttendancePct === null}
                  className="btn btn-primary"
                  style={{ opacity: liveAttendancePct === null ? 0.6 : 1 }}
                >
                  <CheckCircle2 size={16} /> Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SECTION MODAL */}
      {showAddSectionModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '420px' }}>
            <div className="modal-header" style={{ background: '#0a3d78', color: '#ffffff' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>Add Academic Section</h3>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd', marginTop: '0.2rem' }}>
                  {assignedBranch} • {selectedYear} (Semester {selectedSemester})
                </div>
              </div>
              <button 
                onClick={() => setShowAddSectionModal(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Section Identifier / Letter</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. D"
                  value={newSectionInput}
                  onChange={(e) => setNewSectionInput(e.target.value)}
                  maxLength={10}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setShowAddSectionModal(false)}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleAddSection}
                className="btn btn-sm btn-primary"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROVISIONED ACCOUNT MODAL */}
      {newlyProvisionedModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} style={{ color: '#10b981' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Student Account Provisioned
                </h3>
              </div>
              <button 
                onClick={() => { setNewlyProvisionedModal(null); setCopiedKey(false); }} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                  <Key size={24} />
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontSize: '1.1rem' }}>
                  {newlyProvisionedModal.student.name}
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                  {newlyProvisionedModal.student.department} • {newlyProvisionedModal.student.year} Sec {newlyProvisionedModal.student.section}
                </p>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.82rem' }}>
                  <span style={{ color: '#64748b' }}>Roll Number (Username):</span>
                  <strong style={{ color: '#0e2154', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {newlyProvisionedModal.student.rollNumber}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#64748b' }}>Temporary Key:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <code style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', border: '1px solid #fde68a' }}>
                      {newlyProvisionedModal.tempPassword}
                    </code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(newlyProvisionedModal.tempPassword);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="btn btn-sm btn-outline"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      {copiedKey ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                      {copiedKey ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => { setNewlyProvisionedModal(null); setCopiedKey(false); }} 
                className="btn btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
