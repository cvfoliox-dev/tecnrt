import React, { useState, useMemo, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  generateOverallAttendanceTemplate, 
  parseAndValidateOverallAttendanceCSV,
  getSampleValidOverallCSV,
  getSampleProblematicOverallCSV
} from '../../data/sampleSpreadsheet';
import { 
  UploadCloud, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileSpreadsheet, 
  ArrowRight, 
  Check, 
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  BookOpen,
  Users,
  ShieldCheck,
  Clock,
  Plus,
  Trash2,
  FileCheck,
  Building2,
  RefreshCw
} from 'lucide-react';

export default function HODAttendanceUpload() {
  const { students, currentUser, submitAttendanceUpload, uploadHistory, showToast } = useAuth();
  const fileInputRef = useRef(null);

  // Requirement 1: Branch is locked to the logged-in HOD's assigned department
  const assignedBranch = currentUser?.profile?.department || 'CSE';
  const assignedBranchName = currentUser?.profile?.departmentName || 'Computer Science & Engineering';

  // Workflow steps: 1 = Setup & Template, 2 = Upload & Validate, 3 = Publish & Archive
  const [currentStep, setCurrentStep] = useState(1);

  // Requirement 2: Three default sections: Section A, Section B, Section C + Add Section support
  const [sections, setSections] = useState(['A', 'B', 'C']);
  const [newSectionInput, setNewSectionInput] = useState('');
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);

  // Requirement 1: Attendance Period – Dynamic & Manual Entry (No hardcoded months)
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });
  const currentYearNum = new Date().getFullYear();
  const [attendancePeriods, setAttendancePeriods] = useState([
    `${currentMonthName} ${currentYearNum}`,
    `Semester Cumulative ${currentYearNum}-${(currentYearNum + 1).toString().slice(2)}`
  ]);
  const [showAddPeriodModal, setShowAddPeriodModal] = useState(false);
  const [periodForm, setPeriodForm] = useState({
    mode: 'monthly', // 'monthly' | 'cumulative' | 'custom'
    month: currentMonthName,
    year: currentYearNum.toString(),
    customName: '',
    cumulativeYear: `${currentYearNum}-${(currentYearNum + 1).toString().slice(2)}`
  });

  // Context selection
  const [context, setContext] = useState({
    year: 'II Year',
    semester: 'III Semester',
    section: 'A',
    period: `${currentMonthName} ${currentYearNum}`
  });

  // Requirement 2: Manage ALL subjects for selected academic year and semester
  const DEFAULT_CURRICULUM = {
    'I Year': [
      { code: 'CS101PC', name: 'Programming in C' },
      { code: 'MA101BS', name: 'Linear Algebra & Calculus' },
      { code: 'PH101BS', name: 'Engineering Physics' },
      { code: 'EE101ES', name: 'Basic Electrical Engineering' }
    ],
    'II Year': [
      { code: 'CS301PC', name: 'Data Structures & Algorithms' },
      { code: 'CS302PC', name: 'Discrete Mathematics' },
      { code: 'CS303PC', name: 'Digital Logic Design' },
      { code: 'CS304PC', name: 'Python Programming' }
    ],
    'III Year': [
      { code: 'CS501PC', name: 'Database Management Systems' },
      { code: 'CS502PC', name: 'Operating Systems' },
      { code: 'CS503PC', name: 'Computer Networks' },
      { code: 'CS504PC', name: 'Software Engineering' }
    ],
    'IV Year': [
      { code: 'CS701PC', name: 'Cloud Computing & Distributed Systems' },
      { code: 'CS702PC', name: 'Cryptography & Network Security' },
      { code: 'CS711PE', name: 'Full Stack Web Development' },
      { code: 'CS712PE', name: 'Machine Learning & Applications' }
    ]
  };

  const [subjectsByYear, setSubjectsByYear] = useState(DEFAULT_CURRICULUM);
  const [newSubjectCode, setNewSubjectCode] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [showAddSubjectForm, setShowAddSubjectForm] = useState(false);

  const currentSubjects = subjectsByYear[context.year] || [];

  const handleYearChange = (yr) => {
    let sem = 'III Semester';
    if (yr === 'I Year') sem = 'I Semester';
    else if (yr === 'II Year') sem = 'III Semester';
    else if (yr === 'III Year') sem = 'V Semester';
    else if (yr === 'IV Year') sem = 'VII Semester';

    setContext(prev => ({
      ...prev,
      year: yr,
      semester: sem
    }));
  };

  const handleAddSection = () => {
    const raw = newSectionInput.trim();
    if (!raw) {
      showToast("Please enter a valid section letter or name (e.g. D)", "warning");
      return;
    }
    const cleaned = raw.replace(/^section\s+/i, '').trim().toUpperCase() || raw.toUpperCase();
    if (sections.includes(cleaned)) {
      showToast(`Section ${cleaned} already exists.`, "warning");
      return;
    }
    setSections(prev => [...prev, cleaned]);
    setContext(prev => ({ ...prev, section: cleaned }));
    setNewSectionInput('');
    setShowAddSectionModal(false);
    showToast(`Section ${cleaned} added successfully!`, "success");
  };

  // Requirement 1: Manual Period addition handler
  const handleAddPeriod = (e) => {
    if (e) e.preventDefault();
    let formatted = '';
    if (periodForm.mode === 'monthly') {
      const m = periodForm.month.trim();
      const y = periodForm.year.trim();
      if (!m || !y) {
        showToast("Please provide both Month and Year.", "warning");
        return;
      }
      formatted = `${m} ${y}`;
    } else if (periodForm.mode === 'cumulative') {
      const cy = periodForm.cumulativeYear.trim();
      formatted = cy ? `Semester Cumulative ${cy}` : `Semester Cumulative ${currentYearNum}-${(currentYearNum + 1).toString().slice(2)}`;
    } else {
      formatted = periodForm.customName.trim();
      if (!formatted) {
        showToast("Please enter a valid period name.", "warning");
        return;
      }
    }

    if (!attendancePeriods.includes(formatted)) {
      setAttendancePeriods(prev => [formatted, ...prev]);
    }
    setContext(prev => ({ ...prev, period: formatted }));
    setShowAddPeriodModal(false);
    showToast(`Attendance period set to "${formatted}"!`, "success");
  };

  // Subject management
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectCode.trim() || !newSubjectName.trim()) {
      showToast("Please enter both Subject Code and Subject Name.", "warning");
      return;
    }
    const code = newSubjectCode.trim().toUpperCase();
    const name = newSubjectName.trim();

    if (currentSubjects.some(s => s.code === code)) {
      showToast(`Subject with code ${code} already exists for ${context.year}.`, "warning");
      return;
    }

    setSubjectsByYear(prev => ({
      ...prev,
      [context.year]: [...(prev[context.year] || []), { code, name }]
    }));
    setNewSubjectCode('');
    setNewSubjectName('');
    setShowAddSubjectForm(false);
    showToast(`Added ${code}: ${name} to ${context.year} curriculum!`, "success");
  };

  const handleRemoveSubject = (codeToRemove) => {
    if (currentSubjects.length <= 1) {
      showToast("At least one subject must remain in the section curriculum.", "warning");
      return;
    }
    setSubjectsByYear(prev => ({
      ...prev,
      [context.year]: prev[context.year].filter(s => s.code !== codeToRemove)
    }));
    showToast(`Subject ${codeToRemove} removed from active sheet configuration.`, "info");
  };

  const handleResetSubjects = () => {
    setSubjectsByYear(prev => ({
      ...prev,
      [context.year]: DEFAULT_CURRICULUM[context.year] || []
    }));
    showToast(`Reset ${context.year} subjects to official college curriculum.`, "info");
  };

  // Active section students from registered roster for the HOD's branch
  const activeSectionStudents = useMemo(() => {
    return students.filter(s => 
      s.department === assignedBranch && 
      s.year === context.year && 
      s.section === context.section
    );
  }, [students, assignedBranch, context.year, context.section]);

  // Uploaded file and validation state
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [activePreviewTab, setActivePreviewTab] = useState('ALL'); // ALL, VALID, WARNING, REJECTED
  const [submissionType, setSubmissionType] = useState('new'); // new, replace
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Requirement 3: Download section-specific CSV template populated with current subjects
  const handleDownloadTemplate = () => {
    const classLabel = `${context.year} ${assignedBranch}-${context.section}`;
    const csvData = generateOverallAttendanceTemplate(
      activeSectionStudents,
      currentSubjects,
      assignedBranch,
      classLabel,
      context.period
    );

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Attendance_${assignedBranch}_${context.year.replace(/\s+/g, '')}_Sec${context.section}_${context.period.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded template with ${currentSubjects.length} subjects for ${assignedBranch} Sec ${context.section}!`, "success");
  };

  // Process Overall CSV
  const processCSV = (name, text, fileObj = null) => {
    setFileName(name);
    if (fileObj) setSelectedFile(fileObj);

    const res = parseAndValidateOverallAttendanceCSV(text, {
      department: assignedBranch,
      section: context.section,
      year: context.year,
      semester: context.semester,
      subjects: currentSubjects,
      period: context.period,
      students: students
    });

    setValidationResult(res);
    setCurrentStep(2);
    if (res.isValid) {
      showToast(`Sheet validated: ${res.summary.validRows} students across ${res.subjectNames.length} subjects ready to publish.`, "success");
    } else {
      showToast(`Validation flagged ${res.summary.rejectedRows} rejected records needing inspection.`, "warning");
    }
  };

  // File upload input handler
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      processCSV(file.name, event.target.result, file);
    };
    reader.readAsText(file);
    // Reset file input value so re-selecting same file triggers change
    e.target.value = '';
  };

  // Drag and Drop handlers
  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.name.toLowerCase().endsWith('.csv')) {
        showToast("Please upload a valid comma-separated (*.csv) file.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        processCSV(file.name, event.target.result, file);
      };
      reader.readAsText(file);
    }
  };

  // Fast test loaders matching active configured subjects
  const handleLoadValidSample = () => {
    const validCsv = getSampleValidOverallCSV(currentSubjects, {
      department: assignedBranch,
      section: context.section,
      students
    });
    processCSV(`${assignedBranch}_${context.year.replace(/\s+/g, '')}_Sec${context.section}_ALL_SUBJECTS_VALID.csv`, validCsv);
  };

  const handleLoadErrorSample = () => {
    const errorCsv = getSampleProblematicOverallCSV(currentSubjects, {
      department: assignedBranch,
      section: context.section,
      students
    });
    processCSV(`${assignedBranch}_${context.year.replace(/\s+/g, '')}_Sec${context.section}_WITH_ERRORS.csv`, errorCsv);
  };

  // Commit & Publish to student portals
  const handleConfirmPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setConfirmModalOpen(false);

      const validRows = validationResult.rows.filter(r => r.status !== 'REJECTED');
      submitAttendanceUpload({
        fileName,
        validRows,
        submissionType,
        context: {
          branch: assignedBranch,
          year: context.year,
          section: context.section,
          classSection: `${context.year} ${assignedBranch}-${context.section}`,
          period: context.period,
          subjectsSummary: `${currentSubjects.length} Subjects (${currentSubjects.map(s => s.code).join(', ')})`
        }
      });

      setCurrentStep(3);
    }, 600);
  };

  const filteredPreviewRows = validationResult ? validationResult.rows.filter(r => {
    if (activePreviewTab === 'ALL') return true;
    return r.status === activePreviewTab;
  }) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header Banner - Requirement 1: Displays assigned HOD branch territory */}
      <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-accent">
              HOD Administration
            </span>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.78rem', 
              fontWeight: 700, 
              color: '#0a3d78',
              backgroundColor: '#e0f2fe',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              border: '1px solid #bae6fd'
            }}>
              <Building2 size={13} /> Assigned Branch: {assignedBranch} ({assignedBranchName})
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#0e2154', margin: 0 }}>
            Overall Section Attendance Upload & Publishing
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0 0' }}>
            Configure section subjects, download unified multi-subject CSV templates, and broadcast verified attendance directly into Student Portals.
          </p>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
          <span style={{ 
            padding: '0.35rem 0.75rem', 
            borderRadius: '9999px', 
            background: currentStep === 1 ? '#0e2154' : '#e2e8f0', 
            color: currentStep === 1 ? '#ffffff' : '#64748b', 
            fontWeight: 700 
          }}>
            1. Section & Subjects
          </span>
          <span style={{ color: '#94a3b8' }}>→</span>
          <span style={{ 
            padding: '0.35rem 0.75rem', 
            borderRadius: '9999px', 
            background: currentStep === 2 ? '#0e2154' : '#e2e8f0', 
            color: currentStep === 2 ? '#ffffff' : '#64748b', 
            fontWeight: 700 
          }}>
            2. Validate & Review
          </span>
          <span style={{ color: '#94a3b8' }}>→</span>
          <span style={{ 
            padding: '0.35rem 0.75rem', 
            borderRadius: '9999px', 
            background: currentStep === 3 ? '#059669' : '#e2e8f0', 
            color: currentStep === 3 ? '#ffffff' : '#64748b', 
            fontWeight: 700 
          }}>
            3. Published Live
          </span>
        </div>
      </div>

      {/* STEP 1: CONFIGURE ATTENDANCE DETAILS & SUBJECT LIST */}
      {currentStep === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} style={{ color: '#f59e0b' }} />
              Step 1: Configure Section Attendance Details
            </h3>

            {/* Academic Year, Section & Period */}
            <div className="grid-3" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Academic Year & Semester</label>
                <select 
                  className="form-select"
                  value={context.year}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="I Year">I Year (I Semester)</option>
                  <option value="II Year">II Year (III Semester)</option>
                  <option value="III Year">III Year (V Semester)</option>
                  <option value="IV Year">IV Year (VII Semester)</option>
                </select>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label className="form-label" style={{ marginBottom: 0, fontWeight: 600 }}>Section</label>
                  <button
                    type="button"
                    onClick={() => setShowAddSectionModal(true)}
                    style={{ background: 'none', border: 'none', color: '#0a3d78', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    <Plus size={13} /> Add Section
                  </button>
                </div>
                <select 
                  className="form-select"
                  value={context.section}
                  onChange={(e) => setContext({ ...context, section: e.target.value })}
                >
                  {sections.map(sec => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label className="form-label" style={{ marginBottom: 0, fontWeight: 600 }}>Attendance Period</label>
                  <button
                    type="button"
                    onClick={() => setShowAddPeriodModal(true)}
                    style={{ background: 'none', border: 'none', color: '#0a3d78', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                    title="Add or configure a new monthly or cumulative period"
                  >
                    <Plus size={13} /> Add Period
                  </button>
                </div>
                <select 
                  className="form-select"
                  value={context.period}
                  onChange={(e) => {
                    if (e.target.value === '__ADD_NEW__') {
                      setShowAddPeriodModal(true);
                    } else {
                      setContext({ ...context, period: e.target.value });
                    }
                  }}
                >
                  {attendancePeriods.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                  <option value="__ADD_NEW__">+ Enter Custom Month & Year...</option>
                </select>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Select or add any monthly cycle or semester cumulative period.
                </div>
              </div>
            </div>

            {/* Requirement 2: Display and manage ALL subjects together */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0e2154', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>Active Section Subjects ({currentSubjects.length})</span>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>
                      — All subjects will be included in the unified attendance sheet
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowAddSubjectForm(!showAddSubjectForm)}
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Plus size={13} /> {showAddSubjectForm ? 'Close Subject Form' : 'Add Subject to Section'}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleResetSubjects}
                    className="btn btn-sm btn-outline"
                    title="Reset to default department curriculum"
                    style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <RefreshCw size={12} /> Reset
                  </button>
                </div>
              </div>

              {/* Add Subject Inline Form */}
              {showAddSubjectForm && (
                <form onSubmit={handleAddSubject} style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 120px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Code (e.g. CS305PC)"
                      value={newSubjectCode}
                      onChange={(e) => setNewSubjectCode(e.target.value)}
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                    />
                  </div>
                  <div style={{ flex: '2 1 220px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Subject Name (e.g. Advanced Java Programming)"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-sm btn-primary" style={{ fontSize: '0.8rem' }}>
                    <Plus size={14} /> Add
                  </button>
                </form>
              )}

              {/* Subjects Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.65rem' }}>
                {currentSubjects.map((sub, idx) => (
                  <div 
                    key={sub.code}
                    style={{ 
                      background: '#f8fafc', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px', 
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0a3d78', background: '#dbeafe', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          {sub.code}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Column {idx + 3}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {sub.name}
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveSubject(sub.code)}
                      title={`Remove ${sub.code}`}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Overview Banner & Template Download */}
            <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Users size={18} style={{ color: '#0a3d78' }} />
                <span style={{ fontSize: '0.85rem', color: '#1e293b' }}>
                  Target: <strong>{assignedBranch} {context.year} Section {context.section}</strong> ({activeSectionStudents.length} registered students in active roster)
                </span>
              </div>
              <button 
                type="button" 
                onClick={handleDownloadTemplate}
                className="btn btn-sm btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: '#0a3d78', color: '#0a3d78', fontWeight: 600 }}
              >
                <Download size={14} /> Download Overall Attendance CSV Template
              </button>
            </div>
          </div>

          {/* STEP 2: IMPROVED CLICKABLE FILE UPLOAD UI */}
          <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UploadCloud size={20} style={{ color: '#f59e0b' }} />
              Step 2: Upload Completed Section Attendance File
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Upload the CSV sheet containing attendance for all {currentSubjects.length} subjects. The system will match students by roll number, enforce section boundaries, and compute overall attendance.
            </p>

            {/* Hidden native input */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".csv,text/csv" 
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />

            {/* Clickable and Drag-and-Drop Area without browser default button */}
            {!selectedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                style={{ 
                  border: isDragging ? '2px dashed #0a3d78' : '2px dashed #cbd5e1', 
                  borderRadius: '12px', 
                  padding: '2.5rem 1.5rem', 
                  textAlign: 'center', 
                  background: isDragging ? '#eff6ff' : '#f8fafc',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', color: '#0a3d78', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
                  <UploadCloud size={30} />
                </div>
                <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0e2154', marginBottom: '0.35rem' }}>
                  Click anywhere or drag and drop your attendance file here
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  Supported Format: Comma-Separated Values (*.csv)
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
                  <CheckCircle2 size={12} /> Expected columns: Roll Number, Student Name, {currentSubjects.map(s => s.name || s.code).join(', ')}, Overall Attendance
                </div>
              </div>
            ) : (
              /* Selected File Card */
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileSpreadsheet size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0e2154' }}>
                      {fileName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {(selectedFile.size / 1024).toFixed(1)} KB • CSV Sheet Ready for Multi-Subject Processing
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.78rem' }}
                  >
                    Replace File
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setSelectedFile(null);
                      setFileName('');
                    }}
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.78rem', color: '#dc2626', borderColor: '#fca5a5' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Quick Demo Testing Loaders */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                <Sparkles size={14} style={{ display: 'inline', color: '#f59e0b', marginRight: '4px' }} />
                <strong>Fast Review Testing:</strong> Load multi-subject sample CSVs directly:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={handleLoadValidSample} 
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.78rem', color: '#059669', borderColor: '#059669' }}
                >
                  <CheckCircle2 size={13} /> Load 100% Valid Section CSV
                </button>
                <button 
                  type="button" 
                  onClick={handleLoadErrorSample} 
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: '0.78rem', color: '#dc2626', borderColor: '#dc2626' }}
                >
                  <AlertTriangle size={13} /> Load CSV with Sample Errors
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* STEP 2: MULTI-SUBJECT VALIDATION REPORT & PREVIEW TABLE */}
      {currentStep === 2 && validationResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Summary Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="card" style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>TOTAL RECORDS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0e2154', marginTop: '0.2rem' }}>
                {validationResult.summary.totalRows}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>From {fileName}</div>
            </div>

            <div className="card" style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>VALID & READY</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
                {validationResult.summary.validRows}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Matched roll numbers</div>
            </div>

            <div className="card" style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706' }}>ATTENDANCE ALERTS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#d97706', marginTop: '0.2rem' }}>
                {validationResult.summary.warningRows}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>&lt;75% condonation / detention</div>
            </div>

            <div className="card" style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626' }}>REJECTED RECORDS</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626', marginTop: '0.2rem' }}>
                {validationResult.summary.rejectedRows}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Will NOT be committed</div>
            </div>
          </div>

          {/* Validation Status Alert */}
          {validationResult.isValid ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1rem 1.25rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={22} style={{ color: '#059669' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#065f46', fontSize: '0.92rem' }}>
                    Multi-Subject Sheet Validated: All {validationResult.summary.validRows} students mapped!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                    All student roll numbers belong to {assignedBranch} Section {context.section} and all subject percentages are verified.
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setConfirmModalOpen(true)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <CheckCircle2 size={16} /> Confirm & Broadcast to Students
              </button>
            </div>
          ) : (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem 1.25rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <AlertTriangle size={22} style={{ color: '#dc2626' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#991b1b', fontSize: '0.92rem' }}>
                    Validation Alerts: {validationResult.summary.rejectedRows} records rejected!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#b91c1c' }}>
                    Only {validationResult.summary.validRows} valid records can be published. Mismatched or invalid rows will be excluded.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-outline"
                  style={{ fontSize: '0.8rem' }}
                >
                  <RotateCcw size={14} /> Back to Section & Re-upload
                </button>
                {validationResult.summary.validRows > 0 && (
                  <button 
                    onClick={() => setConfirmModalOpen(true)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Publish Valid Only ({validationResult.summary.validRows})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Records Table with Filter Tabs */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0e2154' }}>
                Multi-Subject Sheet Inspection ({filteredPreviewRows.length} displayed)
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {[
                  { id: 'ALL', label: `All (${validationResult.rows.length})` },
                  { id: 'VALID', label: `Valid (${validationResult.summary.validRows})` },
                  { id: 'WARNING', label: `Warnings (${validationResult.summary.warningRows})` },
                  { id: 'REJECTED', label: `Rejected (${validationResult.summary.rejectedRows})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: activePreviewTab === tab.id ? '#0e2154' : '#ffffff',
                      color: activePreviewTab === tab.id ? '#ffffff' : '#475569',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table" style={{ margin: 0, fontSize: '0.8rem' }}>
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    {validationResult.subjectNames.map((sName, sIdx) => (
                      <th key={sIdx}>{sName}</th>
                    ))}
                    <th>Overall %</th>
                    <th>Status</th>
                    <th>Validation Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPreviewRows.map((r, i) => (
                    <tr key={i} style={{ background: r.status === 'REJECTED' ? '#fef2f2' : r.status === 'WARNING' ? '#fffbeb' : 'transparent' }}>
                      <td>{r.rowNumber}</td>
                      <td><strong style={{ color: '#0a3d78' }}>{r.rollNumber || 'MISSING'}</strong></td>
                      <td>{r.name || 'Unknown'}</td>
                      {r.subjects.map((sub, sIdx) => (
                        <td key={sIdx}>
                          <span style={{ fontWeight: 600, color: sub.attendancePct >= 75 ? '#059669' : '#dc2626' }}>
                            {sub.attendancePct}%
                          </span>
                        </td>
                      ))}
                      <td>
                        <strong style={{ color: r.overallAttendance >= 75 ? '#059669' : '#dc2626', fontSize: '0.85rem' }}>
                          {r.overallAttendance}%
                        </strong>
                      </td>
                      <td>
                        {r.status === 'VALID' && <span className="badge badge-success">Valid</span>}
                        {r.status === 'WARNING' && <span className="badge badge-warning">Warning</span>}
                        {r.status === 'REJECTED' && <span className="badge badge-danger">Rejected</span>}
                      </td>
                      <td style={{ fontSize: '0.75rem', color: r.status === 'REJECTED' ? '#dc2626' : r.status === 'WARNING' ? '#b45309' : '#059669' }}>
                        {r.errors.length > 0 ? r.errors.join('; ') : r.warnings.length > 0 ? r.warnings.join('; ') : 'Verified against student record'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* STEP 3: PUBLISHED SUCCESS SCREEN */}
      {currentStep === 3 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154', marginBottom: '0.5rem' }}>
            Overall Attendance Published Successfully!
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
            The verified overall attendance and subject-wise details for <strong>{assignedBranch} {context.year} Section {context.section}</strong> ({currentSubjects.length} subjects) have been written to student records and broadcast to the Student Portals.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                setCurrentStep(1);
                setValidationResult(null);
                setFileName('');
                setSelectedFile(null);
              }}
              className="btn btn-outline"
            >
              Upload Another Section Attendance
            </button>
          </div>
        </div>
      )}

      {/* UPLOAD AUDIT HISTORY TABLE */}
      <div className="card" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} style={{ color: '#64748b' }} />
          Recent HOD Attendance Upload & Publishing Audit Log
        </h3>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Upload Date</th>
                <th>Class & Section</th>
                <th>Subject Configuration</th>
                <th>Period</th>
                <th>Records</th>
                <th>Publishing Status</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '1.75rem', color: '#64748b' }}>
                    No attendance upload batches processed yet. Upload and publish your first section attendance file above.
                  </td>
                </tr>
              ) : (
                uploadHistory.slice(0, 5).map(hist => (
                  <tr key={hist.id}>
                    <td><span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{hist.id}</span></td>
                    <td>{hist.uploadDate}</td>
                    <td><strong>{hist.class}</strong></td>
                    <td>{hist.subject}</td>
                    <td>{hist.academicPeriod}</td>
                    <td><span className="badge badge-primary">{hist.validRows} students</span></td>
                    <td>
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> {hist.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD SECTION MODAL */}
      {showAddSectionModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '400px' }}>
            <div className="modal-header" style={{ background: '#0a3d78', color: '#ffffff' }}>
              <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>Add New Academic Section</h3>
              <button 
                onClick={() => setShowAddSectionModal(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Section Identifier</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. D or Section D"
                  value={newSectionInput}
                  onChange={(e) => setNewSectionInput(e.target.value)}
                  maxLength={10}
                  autoFocus
                />
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Default sections are A, B, and C. You can add D, E, or specialized division tags.
                </div>
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

      {/* ADD ATTENDANCE PERIOD MODAL - Requirement 1: Manual Month & Year / Cumulative entry */}
      {showAddPeriodModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '440px' }}>
            <div className="modal-header" style={{ background: '#0a3d78', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>Configure Attendance Period</h3>
              </div>
              <button 
                onClick={() => setShowAddPeriodModal(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddPeriod}>
              <div className="modal-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.25rem', borderRadius: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPeriodForm({ ...periodForm, mode: 'monthly' })}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: periodForm.mode === 'monthly' ? '#ffffff' : 'transparent',
                      color: periodForm.mode === 'monthly' ? '#0a3d78' : '#64748b',
                      boxShadow: periodForm.mode === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    Monthly Period
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriodForm({ ...periodForm, mode: 'cumulative' })}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: periodForm.mode === 'cumulative' ? '#ffffff' : 'transparent',
                      color: periodForm.mode === 'cumulative' ? '#0a3d78' : '#64748b',
                      boxShadow: periodForm.mode === 'cumulative' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    Semester Cumulative
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriodForm({ ...periodForm, mode: 'custom' })}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: periodForm.mode === 'custom' ? '#ffffff' : 'transparent',
                      color: periodForm.mode === 'custom' ? '#0a3d78' : '#64748b',
                      boxShadow: periodForm.mode === 'custom' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    Custom Label
                  </button>
                </div>

                {periodForm.mode === 'monthly' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Month</label>
                      <select
                        className="form-select"
                        value={periodForm.month}
                        onChange={(e) => setPeriodForm({ ...periodForm, month: e.target.value })}
                      >
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.78rem' }}>Year</label>
                      <input
                        type="number"
                        className="form-input"
                        value={periodForm.year}
                        onChange={(e) => setPeriodForm({ ...periodForm, year: e.target.value })}
                        min="2020"
                        max="2035"
                      />
                    </div>
                  </div>
                )}

                {periodForm.mode === 'cumulative' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Academic Year Cycle</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 2026-27"
                      value={periodForm.cumulativeYear}
                      onChange={(e) => setPeriodForm({ ...periodForm, cumulativeYear: e.target.value })}
                    />
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Result: Semester Cumulative {periodForm.cumulativeYear || '2026-27'}
                    </div>
                  </div>
                )}

                {periodForm.mode === 'custom' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Custom Period Identifier</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Unit-1 Register (Aug 2026) or Mid-1 Assessment"
                      value={periodForm.customName}
                      onChange={(e) => setPeriodForm({ ...periodForm, customName: e.target.value })}
                      autoFocus
                    />
                  </div>
                )}

                <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#334155' }}>
                  Period will be saved as: <strong>
                    {periodForm.mode === 'monthly' ? `${periodForm.month} ${periodForm.year}` : periodForm.mode === 'cumulative' ? `Semester Cumulative ${periodForm.cumulativeYear || '2026-27'}` : periodForm.customName || '(enter name)'}
                  </strong>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddPeriodModal(false)}
                  className="btn btn-sm btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-sm btn-primary"
                >
                  Save & Select Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL BEFORE PUBLISHING */}
      {confirmModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Confirm Overall Section Attendance Publication
                </h3>
              </div>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.82rem', color: '#1e40af' }}>
                You are publishing official overall attendance for <strong>{assignedBranch} {context.year} Section {context.section}</strong> across <strong>{currentSubjects.length} subjects</strong>.
              </div>

              <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                <div>• Total Student Records: <strong>{validationResult.summary.totalRows}</strong></div>
                <div>• Valid Records to Publish: <strong>{validationResult.summary.validRows}</strong></div>
                <div>• Rejected Records (Excluded): <strong>{validationResult.summary.rejectedRows}</strong></div>
                <div>• Subjects: <strong>{currentSubjects.map(s => s.code).join(', ')}</strong></div>
                <div>• Attendance Period: <strong>{context.period}</strong></div>
              </div>

              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label">Submission Mode</label>
                <select 
                  className="form-select"
                  value={submissionType}
                  onChange={(e) => setSubmissionType(e.target.value)}
                >
                  <option value="new">New Period Submission (Apply to student portals)</option>
                  <option value="replace">Replacement / Correction (Override existing records)</option>
                </select>
              </div>

              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                Once published, students logging into their Student Portals will immediately see both the overall attendance percentage and the subject-wise breakdown.
              </p>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
              <button 
                type="button" 
                onClick={() => setConfirmModalOpen(false)} 
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleConfirmPublish} 
                disabled={isPublishing}
                className="btn btn-primary"
              >
                {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
