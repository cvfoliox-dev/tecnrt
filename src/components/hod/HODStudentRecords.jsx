import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Search, 
  UserCheck, 
  Key, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  Edit3, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  X, 
  Copy, 
  UserPlus, 
  GraduationCap
} from 'lucide-react';
import { 
  PROFILE_STATUSES, 
  ACCOUNT_STATUSES, 
  calculateProfileCompletion,
  normalizeSemesterCode,
  getSemesterProgressionInfo
} from '../../data/mockData';

export default function HODStudentRecords() {
  const { 
    currentUser, 
    students, 
    createStudent,
    updateStudentProfile,
    provisionStudentAccount,
    batchProvisionAccounts,
    promoteStudent,
    showToast 
  } = useAuth();

  const assignedBranch = currentUser?.profile?.department || 'CSE';

  // Filters & Search state
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [profileStatusFilter, setProfileStatusFilter] = useState('ALL');
  const [accountStatusFilter, setAccountStatusFilter] = useState('ALL');

  // Selected student for detail inspection / review modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('personal'); // personal, contact, parent, admission, academic, review

  // HOD Edit Official Fields State inside modal
  const [isEditingOfficial, setIsEditingOfficial] = useState(false);
  const [officialEditForm, setOfficialEditForm] = useState({});

  // Simplified Quick Register Student Modal State
  const [showQuickRegisterModal, setShowQuickRegisterModal] = useState(false);
  const [quickForm, setQuickForm] = useState({
    rollNumber: '',
    name: '',
    year: 'IV Year',
    semester: 'VII Semester',
    section: 'A'
  });
  const [quickError, setQuickError] = useState('');

  // Department Students List
  const deptStudents = useMemo(() => {
    return students.filter(s => s.department === assignedBranch);
  }, [students, assignedBranch]);

  // Derived Dynamic Summary Metrics calculated from actual frontend data store (Requirement 2)
  const summary = useMemo(() => {
    const total = deptStudents.length;
    const completed = deptStudents.filter(s => s.profileStatus === PROFILE_STATUSES.COMPLETE || s.profileStatus === 'Complete').length;
    const incomplete = deptStudents.filter(s => s.profileStatus === PROFILE_STATUSES.INCOMPLETE || s.profileStatus === 'Incomplete').length;
    const accountsProvisioned = deptStudents.filter(s => 
      s.accountStatus === ACCOUNT_STATUSES.PROVISIONED || 
      s.accountStatus === ACCOUNT_STATUSES.ACTIVE
    ).length;
    const accountsPending = deptStudents.filter(s => s.accountStatus === ACCOUNT_STATUSES.PENDING).length;

    return {
      total,
      completed,
      incomplete,
      accountsProvisioned,
      accountsPending
    };
  }, [deptStudents]);

  // Filtered Students Table Data
  const filteredStudents = useMemo(() => {
    return deptStudents.filter(s => {
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || 
        s.rollNumber.toLowerCase().includes(q) || 
        s.name.toLowerCase().includes(q) ||
        (s.admissionNumber && s.admissionNumber.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q));

      const matchesYear = yearFilter === 'ALL' || s.year === yearFilter;
      const matchesSection = sectionFilter === 'ALL' || s.section === sectionFilter;
      
      let matchesProfile = true;
      if (profileStatusFilter === 'Complete') {
        matchesProfile = s.profileStatus === PROFILE_STATUSES.COMPLETE || s.profileStatus === 'Complete';
      } else if (profileStatusFilter === 'Incomplete') {
        matchesProfile = s.profileStatus === PROFILE_STATUSES.INCOMPLETE || s.profileStatus === 'Incomplete';
      }

      const matchesAccount = accountStatusFilter === 'ALL' || s.accountStatus === accountStatusFilter;

      return matchesSearch && matchesYear && matchesSection && matchesProfile && matchesAccount;
    });
  }, [deptStudents, search, yearFilter, sectionFilter, profileStatusFilter, accountStatusFilter]);

  // Handlers for modal selection
  const handleOpenStudentDetail = (student, tab = 'personal') => {
    setSelectedStudent(student);
    setActiveDetailTab(tab);
    setReviewNotes(student.profileFeedback || '');
    setCorrectionFeedback('');
    setIsEditingOfficial(false);
    setOfficialEditForm({
      section: student.section || 'A',
      semester: student.semester || 'VII Semester',
      year: student.year || 'IV Year',
      admissionNumber: student.admissionNumber || '',
      admissionType: student.admissionType || 'Convener Quota (EAPCET)',
      admissionQuota: student.admissionQuota || 'Convener Quota'
    });
  };

  const handleCloseStudentDetail = () => {
    setSelectedStudent(null);
    setIsEditingOfficial(false);
  };


  // HOD Provisions Single Account
  const handleProvisionStudent = (rollNumber) => {
    const res = provisionStudentAccount(rollNumber);
    if (res.success && selectedStudent && selectedStudent.rollNumber === rollNumber) {
      setSelectedStudent(res.student);
    }
  };

  // HOD Saves Official Field Edits
  const handleSaveOfficialEdits = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    const res = updateStudentProfile(selectedStudent.rollNumber, officialEditForm, true);
    if (res.success && res.student) {
      setSelectedStudent(res.student);
      setIsEditingOfficial(false);
      showToast("Official academic records updated successfully.", "success");
    }
  };

  // Simplified Quick Register Modal Handlers
  const handleOpenQuickRegister = () => {
    const nextRollPrefix = quickForm.year === 'I Year' ? '24TML05' : 
                           quickForm.year === 'II Year' ? '23TML05' : 
                           quickForm.year === 'III Year' ? '22TML05' : '21TML05';
    const sampleSuffix = Math.floor(80 + Math.random() * 19);
    setQuickForm({
      rollNumber: `${nextRollPrefix}${sampleSuffix}`,
      name: '',
      year: 'IV Year',
      semester: 'VII Semester',
      section: 'A'
    });
    setQuickError('');
    setShowQuickRegisterModal(true);
  };

  const handleSaveQuickRegister = (e) => {
    e.preventDefault();
    setQuickError('');
    const roll = quickForm.rollNumber.trim().toUpperCase();
    const name = quickForm.name.trim();

    if (!roll || !name) {
      setQuickError("Student Roll Number and Full Name are mandatory.");
      return;
    }

    const res = createStudent({
      rollNumber: roll,
      name,
      department: assignedBranch,
      year: quickForm.year,
      semester: quickForm.semester,
      section: quickForm.section
    });

    if (res.success) {
      setShowQuickRegisterModal(false);
      if (res.student) {
        handleOpenStudentDetail(res.student, 'personal');
      }
    } else {
      setQuickError(res.message || "Failed to register student record.");
    }
  };

  // Helper for Badge Rendering (Requirement 2: Complete or Incomplete)
  const renderProfileBadge = (status) => {
    const isComplete = status === PROFILE_STATUSES.COMPLETE || status === 'Complete';
    if (isComplete) {
      return (
        <span className="badge badge-success" style={{ fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
          <CheckCircle2 size={13} /> Complete
        </span>
      );
    }
    return (
      <span className="badge badge-warning" style={{ fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
        <Clock size={13} /> Incomplete
      </span>
    );
  };

  const renderAccountBadge = (accountStatus, tempPassword) => {
    switch (accountStatus) {
      case ACCOUNT_STATUSES.ACTIVE:
        return (
          <span className="badge badge-success" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <ShieldCheck size={12} /> Active (Secured)
          </span>
        );
      case ACCOUNT_STATUSES.PROVISIONED:
        return (
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
            <span className="badge badge-warning" style={{ fontSize: '0.68rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Key size={11} /> Provisioned
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.66rem', color: '#92400e', background: '#fef3c7', padding: '1px 5px', borderRadius: '4px', border: '1px solid #fde68a' }}>
              {tempPassword}
            </span>
          </div>
        );
      case ACCOUNT_STATUSES.PENDING:
      default:
        return (
          <span className="badge badge-danger" style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={11} /> Pending Provisioning
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner / Department Records Context */}
      <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #1d4ed8', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">Institutional Records Repository</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>•</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Department of {assignedBranch}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#0e2154', margin: 0 }}>
              {assignedBranch} Student Profile & Administrative Records
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.35rem 0 0 0' }}>
              Central student directory managing complete profiles, verification workflows, official record corrections, and portal account provisioning.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {summary.accountsPending > 0 && (
              <button 
                onClick={() => batchProvisionAccounts(assignedBranch)}
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem' }}
                title={`Provision all ${summary.accountsPending} pending student accounts at once`}
              >
                <Key size={15} style={{ color: '#d97706' }} /> Provision All Pending ({summary.accountsPending})
              </button>
            )}
            <button 
              onClick={handleOpenQuickRegister} 
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.84rem' }}
            >
              <UserPlus size={16} /> Register New Student
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Summary Cards (calculated from actual frontend data store) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        
        <div className="card" style={{ padding: '1rem 1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Total Registered</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0e2154', marginTop: '0.25rem' }}>
            {summary.total}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
            Department of {assignedBranch}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#059669' }}>Complete Profiles</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '0.25rem' }}>
            {summary.completed}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
            All required fields completed
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#d97706' }}>Incomplete Profiles</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706', marginTop: '0.25rem' }}>
            {summary.incomplete}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
            Awaiting student profile entry
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#16a34a' }}>Accounts Provisioned</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a', marginTop: '0.25rem' }}>
            {summary.accountsProvisioned}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
            Credentials issued / Active
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: '#dc2626' }}>Accounts Pending</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', marginTop: '0.25rem' }}>
            {summary.accountsPending}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>
            Awaiting provisioning
          </div>
        </div>

      </div>

      {/* Search and Multi-Criteria Filter Bar */}
      <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder={`Search ${assignedBranch} students by Roll No, Name, Admission No, or Email...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.4rem', fontSize: '0.85rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Academic Year Filter */}
            <select
              className="form-select"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
            >
              <option value="ALL">All Academic Years</option>
              <option value="I Year">I Year</option>
              <option value="II Year">II Year</option>
              <option value="III Year">III Year</option>
              <option value="IV Year">IV Year</option>
            </select>

            {/* Section Filter */}
            <select
              className="form-select"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
            >
              <option value="ALL">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>

            {/* Profile Status Filter (Requirement 2) */}
            <select
              className="form-select"
              value={profileStatusFilter}
              onChange={(e) => setProfileStatusFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
            >
              <option value="ALL">All Profile Statuses</option>
              <option value="Complete">Complete Profiles ({summary.completed})</option>
              <option value="Incomplete">Incomplete Profiles ({summary.incomplete})</option>
            </select>

            {/* Account Status Filter */}
            <select
              className="form-select"
              value={accountStatusFilter}
              onChange={(e) => setAccountStatusFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
            >
              <option value="ALL">All Account Statuses</option>
              <option value={ACCOUNT_STATUSES.ACTIVE}>Active</option>
              <option value={ACCOUNT_STATUSES.PROVISIONED}>Provisioned</option>
              <option value={ACCOUNT_STATUSES.PENDING}>Pending Provisioning</option>
            </select>
          </div>

        </div>

        {/* Active Filter Pills indicator */}
        {(yearFilter !== 'ALL' || sectionFilter !== 'ALL' || profileStatusFilter !== 'ALL' || accountStatusFilter !== 'ALL' || search) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', fontSize: '0.75rem', color: '#64748b', paddingTop: '0.25rem' }}>
            <span>Showing {filteredStudents.length} of {deptStudents.length} students.</span>
            <button
              onClick={() => {
                setSearch('');
                setYearFilter('ALL');
                setSectionFilter('ALL');
                setProfileStatusFilter('ALL');
                setAccountStatusFilter('ALL');
              }}
              style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Main Student Records Directory Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div className="table-responsive">
          <table className="data-table" style={{ margin: 0 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ width: '130px' }}>Roll Number</th>
                <th>Student Name & Info</th>
                <th style={{ width: '130px' }}>Academic Class</th>
                <th style={{ textAlign: 'center', width: '140px' }}>Profile Completion</th>
                <th style={{ textAlign: 'center', width: '150px' }}>Profile Status</th>
                <th style={{ textAlign: 'center', width: '160px' }}>Account Status</th>
                <th style={{ textAlign: 'right', width: '150px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={36} style={{ color: '#cbd5e1' }} />
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>
                        {deptStudents.length === 0 ? "No student records in department" : "No students found matching current filters"}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '420px' }}>
                        {deptStudents.length === 0 
                          ? `No student records registered under Department of ${assignedBranch}. Click "Register New Student" above to enroll students.`
                          : "Try adjusting your search query, academic year, section, or status filters above."}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const completion = student.profileCompletion !== undefined 
                    ? student.profileCompletion 
                    : calculateProfileCompletion(student);
                  
                  const hasPendingCorrection = student.correctionRequest && student.correctionRequest.status === 'PENDING';

                  return (
                    <tr key={student.id || student.rollNumber}>
                      <td>
                        <button
                          onClick={() => handleOpenStudentDetail(student, 'personal')}
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#1d4ed8', 
                            fontWeight: 700, 
                            fontSize: '0.88rem', 
                            letterSpacing: '0.02em', 
                            cursor: 'pointer',
                            padding: 0,
                            textAlign: 'left'
                          }}
                          title="Open detailed student profile"
                        >
                          {student.rollNumber}
                        </button>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {student.name}
                          {student.shortName && (
                            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500, marginLeft: '0.35rem' }}>
                              ({student.shortName})
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          Adm: {student.admissionNumber || '—'} • {student.email}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>
                          {student.year} • Sec {student.section}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {student.semester}
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', width: '90px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: completion >= 80 ? '#059669' : completion >= 50 ? '#d97706' : '#64748b' }}>
                            {completion}%
                          </span>
                          <div style={{ width: '100%', height: '5px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${completion}%`, 
                                height: '100%', 
                                background: completion >= 80 ? '#10b981' : completion >= 50 ? '#f59e0b' : '#64748b',
                                transition: 'width 0.3s ease'
                              }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                          {renderProfileBadge(student.profileStatus)}
                          {hasPendingCorrection && (
                            <span 
                              style={{ 
                                fontSize: '0.64rem', 
                                background: '#fee2e2', 
                                color: '#b91c1c', 
                                padding: '1px 5px', 
                                borderRadius: '4px',
                                fontWeight: 700,
                                border: '1px solid #fecaca'
                              }}
                            >
                              Correction Pending
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {renderAccountBadge(student.accountStatus, student.tempPassword)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                          {student.accountStatus === ACCOUNT_STATUSES.PENDING && (
                            <button
                              onClick={() => handleProvisionStudent(student.rollNumber)}
                              className="btn btn-sm btn-primary"
                              style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                              title="Provision Student Portal Account"
                            >
                              <Key size={12} /> Provision
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenStudentDetail(student, hasPendingCorrection ? 'review' : 'personal')}
                            className="btn btn-sm btn-outline"
                            style={{ fontSize: '0.74rem', padding: '0.25rem 0.55rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                            title="View complete record & review profile"
                          >
                            <Eye size={12} /> View
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

      {/* ========================================================================= */}
      {/* MODAL 1: INDIVIDUAL STUDENT COMPLETE PROFILE & REVIEW WORKFLOW            */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large" style={{ maxWidth: '840px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Modal Header */}
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#1d4ed8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {selectedStudent.name ? selectedStudent.name.charAt(0) : 'S'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                    {selectedStudent.name} ({selectedStudent.rollNumber})
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                    {selectedStudent.department} • {selectedStudent.year} ({selectedStudent.semester}) • Section {selectedStudent.section}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCloseStudentDetail} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Sub-header Tabs Navigation (5 Organized Categories) */}
            <div style={{ display: 'flex', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '0.35rem 1rem', gap: '0.35rem', overflowX: 'auto', flexShrink: 0 }}>
              {[
                { id: 'personal', label: '1. Student Details' },
                { id: 'contact', label: '2. Contact Details' },
                { id: 'parent', label: '3. Parent / Guardian' },
                { id: 'admission', label: '4. Admission Details' },
                { id: 'academic', label: '5. Academic & Attendance' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: activeDetailTab === tab.id ? 700 : 500,
                    background: activeDetailTab === tab.id ? '#0e2154' : 'transparent',
                    color: activeDetailTab === tab.id ? '#ffffff' : '#475569',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body with Scrollable content */}
            <div className="modal-body" style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
              
              {/* Profile Completion & Account Status Strip */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Profile Completion</span>
                    <strong style={{ fontSize: '1rem', color: '#0e2154' }}>
                      {selectedStudent.profileCompletion || calculateProfileCompletion(selectedStudent)}%
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Profile Status</span>
                    {renderProfileBadge(selectedStudent.profileStatus)}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>Portal Account</span>
                    {renderAccountBadge(selectedStudent.accountStatus, selectedStudent.tempPassword)}
                  </div>
                </div>

                {selectedStudent.accountStatus === ACCOUNT_STATUSES.PENDING && (
                  <button
                    onClick={() => handleProvisionStudent(selectedStudent.rollNumber)}
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Key size={13} /> Provision Account Now
                  </button>
                )}
              </div>

              {/* TAB 1: BASIC STUDENT DETAILS */}
              {activeDetailTab === 'personal' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0e2154' }}>A. Basic Student Identification</h4>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Protected Institutional Core Identifiers</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', fontSize: '0.82rem' }}>
                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>College Roll Number (Permanent ID)</span>
                      <strong style={{ color: '#0e2154', fontFamily: 'monospace' }}>{selectedStudent.rollNumber}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Official Full Legal Name</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.name}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Short Name / Call Sign</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.shortName || '—'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Institutional Admission Number</span>
                      <strong style={{ color: '#1d4ed8' }}>{selectedStudent.admissionNumber || '—'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Date of Birth</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.dob || 'Pending Student Entry'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Gender & Blood Group</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.gender || 'Not Specified'} • {selectedStudent.bloodGroup || 'Not Specified'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Course & Branch</span>
                      <strong style={{ color: '#0e2154' }}>{selectedStudent.course || 'B.Tech'} — {selectedStudent.department}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Academic Year & Section</span>
                      <strong style={{ color: '#0e2154' }}>{selectedStudent.year} ({selectedStudent.semester}) • Sec {selectedStudent.section}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CONTACT DETAILS */}
              {activeDetailTab === 'contact' && (
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#0e2154' }}>B. Contact & Residential Details</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', fontSize: '0.82rem' }}>
                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Student Mobile Number</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.phone || 'Pending Entry'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Institutional Email</span>
                      <strong style={{ color: '#1d4ed8' }}>{selectedStudent.email || '—'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Father's / Guardian Mobile</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.fatherPhone || 'Pending Entry'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Father's / Guardian Email</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.fatherEmail || '—'}</span>
                    </div>

                    <div style={{ gridColumn: 'span 2', background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Current Residential Address</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.currentAddress || selectedStudent.address || 'Pending Entry'}</span>
                    </div>

                    <div style={{ gridColumn: 'span 2', background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Permanent Residential Address</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.permanentAddress || selectedStudent.address || 'Pending Entry'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PARENT / GUARDIAN DETAILS */}
              {activeDetailTab === 'parent' && (
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#0e2154' }}>C. Parent & Guardian Identification</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', fontSize: '0.82rem' }}>
                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Father's Full Name</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.fatherName || 'Pending Entry'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Father's Occupation</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.fatherOccupation || 'Pending Entry'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Mother's Full Name</span>
                      <strong style={{ color: '#0f172a' }}>{selectedStudent.motherName || 'Pending Entry'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Mother's Occupation</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.motherOccupation || 'Pending Entry'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Designated Guardian (Optional)</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.guardianName || '—'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Guardian Contact (Optional)</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.guardianContact || '—'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ADMISSION INFORMATION */}
              {activeDetailTab === 'admission' && (
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#0e2154' }}>D. Institutional Admission & Financial Allotment</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', fontSize: '0.82rem' }}>
                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Admission Batch Year</span>
                      <strong style={{ color: '#0e2154' }}>{selectedStudent.admissionYear || '—'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Official Admission Date</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.admissionDate || '—'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Admission Allotment Type</span>
                      <strong style={{ color: '#059669' }}>{selectedStudent.admissionType || 'Convener Quota (EAPCET)'}</strong>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Caste / Reservation Category</span>
                      <span style={{ color: '#0f172a' }}>{selectedStudent.casteCategory || 'Institutional Record'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>State Scholarship Status</span>
                      <span className="badge badge-accent" style={{ fontSize: '0.72rem' }}>{selectedStudent.scholarshipStatus || 'Pending Verification'}</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '0.65rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>Fee Reimbursement Status</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{selectedStudent.feeReimbursementStatus || 'Pending Verification'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ACADEMIC & ATTENDANCE RECORD */}
              {activeDetailTab === 'academic' && (
                <div>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#0e2154' }}>5. Academic Standing & Attendance Records</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1rem', textAlign: 'center' }}>
                    <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                      <span style={{ fontSize: '0.72rem', color: '#1e40af' }}>Overall Attendance</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a' }}>{selectedStudent.attendanceOverall}%</div>
                    </div>
                    <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                      <span style={{ fontSize: '0.72rem', color: '#065f46' }}>Classes Attended</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>{selectedStudent.totalClassesAttended || 0}</div>
                    </div>
                    <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', border: '1px solid #fecaca' }}>
                      <span style={{ fontSize: '0.72rem', color: '#991b1b' }}>Classes Absent</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b91c1c' }}>{selectedStudent.totalClassesAbsent || 0}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.72rem', color: '#475569' }}>Cumulative CGPA</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{selectedStudent.cgpa || '8.0'}</div>
                    </div>
                  </div>

                  {/* Academic Progression & Promotion Section */}
                  {(() => {
                    const currentSem = normalizeSemesterCode(selectedStudent.semester);
                    const prog = getSemesterProgressionInfo(currentSem);
                    return (
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                            Academic Semester Progression
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginTop: '0.15rem' }}>
                            Current: <strong>Sem {currentSem} ({selectedStudent.year})</strong> → Next: <strong>{prog.canPromote ? `Sem ${prog.nextSem} (${prog.nextYear})` : 'Final Semester Completed'}</strong>
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#15803d', marginTop: '0.1rem' }}>
                            Historical attendance registers across all 8 semesters remain permanently preserved.
                          </div>
                        </div>

                        {prog.canPromote && (
                          <button
                            type="button"
                            onClick={() => {
                              const res = promoteStudent(selectedStudent.rollNumber, {
                                destinationYear: prog.nextYear,
                                destinationSemester: prog.nextSem,
                                destinationSection: selectedStudent.section
                              });
                              if (res.success && res.student) {
                                setSelectedStudent(res.student);
                              }
                            }}
                            className="btn btn-sm btn-primary"
                            style={{ background: '#16a34a', borderColor: '#16a34a', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <GraduationCap size={14} /> Promote to {prog.nextSem}
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* Allow HOD to edit authorized official fields */}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#0e2154' }}>Official Academic Allocation Editing</strong>
                      {!isEditingOfficial ? (
                        <button 
                          onClick={() => setIsEditingOfficial(true)} 
                          className="btn btn-sm btn-outline"
                          style={{ fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Edit3 size={12} /> Edit Official Section / Admission No
                        </button>
                      ) : (
                        <button 
                          onClick={() => setIsEditingOfficial(false)} 
                          className="btn btn-sm btn-outline"
                          style={{ fontSize: '0.72rem' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {isEditingOfficial && (
                      <form onSubmit={handleSaveOfficialEdits} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.75rem' }}>Assigned Section</label>
                            <select
                              className="form-select"
                              value={officialEditForm.section}
                              onChange={(e) => setOfficialEditForm({ ...officialEditForm, section: e.target.value })}
                              style={{ fontSize: '0.8rem' }}
                            >
                              <option value="A">Section A</option>
                              <option value="B">Section B</option>
                              <option value="C">Section C</option>
                              <option value="D">Section D</option>
                            </select>
                          </div>

                          <div className="form-group" style={{ margin: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.75rem' }}>Admission Number</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              value={officialEditForm.admissionNumber}
                              onChange={(e) => setOfficialEditForm({ ...officialEditForm, admissionNumber: e.target.value })}
                              style={{ fontSize: '0.8rem' }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.85rem' }}>
                          <button type="submit" className="btn btn-sm btn-primary">
                            Save Official Updates
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
              <button 
                type="button" 
                onClick={handleCloseStudentDetail} 
                className="btn btn-sm btn-primary"
              >
                Close Record
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SIMPLIFIED QUICK STUDENT REGISTRATION (Requirement 3)             */}
      {/* ========================================================================= */}
      {showQuickRegisterModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={18} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Register Student — Dept of {assignedBranch}
                </h3>
              </div>
              <button 
                onClick={() => setShowQuickRegisterModal(false)} 
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveQuickRegister}>
              <div className="modal-body" style={{ padding: '1.25rem' }}>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.78rem', color: '#1e40af', marginBottom: '1rem' }}>
                  <strong>Simplified Enrollment:</strong> Branch is automatically assigned as <strong>{assignedBranch}</strong>. The student will complete their personal, contact, and admission details upon portal login.
                </div>

                {quickError && (
                  <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
                    {quickError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Student Roll Number *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. 21TML0588"
                    value={quickForm.rollNumber}
                    onChange={(e) => setQuickForm({ ...quickForm, rollNumber: e.target.value.toUpperCase() })}
                  />
                  <small style={{ color: '#64748b', fontSize: '0.7rem' }}>Must be unique across the institutional registry.</small>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Student Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g. G. Harika"
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Academic Year *</label>
                    <select 
                      className="form-select"
                      value={quickForm.year}
                      onChange={(e) => {
                        const y = e.target.value;
                        const sem = y === 'I Year' ? 'I Semester' : y === 'II Year' ? 'III Semester' : y === 'III Year' ? 'V Semester' : 'VII Semester';
                        setQuickForm({ ...quickForm, year: y, semester: sem });
                      }}
                      style={{ fontSize: '0.78rem' }}
                    >
                      <option value="I Year">I Year</option>
                      <option value="II Year">II Year</option>
                      <option value="III Year">III Year</option>
                      <option value="IV Year">IV Year</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Semester *</label>
                    <select 
                      className="form-select"
                      value={quickForm.semester}
                      onChange={(e) => setQuickForm({ ...quickForm, semester: e.target.value })}
                      style={{ fontSize: '0.78rem' }}
                    >
                      <option value="I Semester">I Semester</option>
                      <option value="II Semester">II Semester</option>
                      <option value="III Semester">III Semester</option>
                      <option value="IV Semester">IV Semester</option>
                      <option value="V Semester">V Semester</option>
                      <option value="VI Semester">VI Semester</option>
                      <option value="VII Semester">VII Semester</option>
                      <option value="VIII Semester">VIII Semester</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Section *</label>
                    <select 
                      className="form-select"
                      value={quickForm.section}
                      onChange={(e) => setQuickForm({ ...quickForm, section: e.target.value })}
                      style={{ fontSize: '0.78rem' }}
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '0.85rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowQuickRegisterModal(false)} 
                  className="btn btn-sm btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-sm btn-primary"
                >
                  <UserPlus size={14} /> Create Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
