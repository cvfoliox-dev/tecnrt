import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_INFO, PROFILE_STATUSES, calculateProfileCompletion } from '../../data/mockData';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Edit3, 
  Save, 
  Clock, 
  FileText, 
  AlertCircle 
} from 'lucide-react';

export default function StudentProfile() {
  const { currentUser, updateStudentProfile, showToast } = useAuth();
  const student = currentUser.profile || {};

  // Display mode: 'view' or 'edit'
  const isComplete = student.profileStatus === PROFILE_STATUSES.COMPLETE || student.profileStatus === 'Complete';
  const [mode, setMode] = useState(isComplete ? 'view' : 'edit');

  // Form State initialized from student profile
  const [form, setForm] = useState({
    name: student.name || '',
    shortName: student.shortName || '',
    dob: student.dob || '',
    gender: student.gender && student.gender !== 'Not Specified' ? student.gender : 'Male',
    bloodGroup: student.bloodGroup && student.bloodGroup !== 'Not Specified' ? student.bloodGroup : 'O+',
    phone: student.phone || '',
    email: student.email || '',
    fatherPhone: student.fatherPhone || '',
    fatherEmail: student.fatherEmail || '',
    currentAddress: student.currentAddress || student.address || '',
    permanentAddress: student.permanentAddress || student.address || '',
    fatherName: student.fatherName || '',
    fatherOccupation: student.fatherOccupation || '',
    motherName: student.motherName || '',
    motherOccupation: student.motherOccupation || '',
    guardianName: student.guardianName || '',
    guardianContact: student.guardianContact || '',
    admissionYear: student.admissionYear || '2021',
    admissionDate: student.admissionDate || '',
    admissionType: student.admissionType || 'Convener Quota (EAPCET)',
    admissionQuota: student.admissionQuota || 'Convener Quota',
    casteCategory: student.casteCategory || '',
    scholarshipStatus: student.scholarshipStatus || 'Eligible',
    feeReimbursementStatus: student.feeReimbursementStatus || 'Full (JVD)'
  });

  // Re-sync form state when student profile updates
  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || '',
        shortName: student.shortName || '',
        dob: student.dob || '',
        gender: student.gender && student.gender !== 'Not Specified' ? student.gender : 'Male',
        bloodGroup: student.bloodGroup && student.bloodGroup !== 'Not Specified' ? student.bloodGroup : 'O+',
        phone: student.phone || '',
        email: student.email || '',
        fatherPhone: student.fatherPhone || '',
        fatherEmail: student.fatherEmail || '',
        currentAddress: student.currentAddress || student.address || '',
        permanentAddress: student.permanentAddress || student.address || '',
        fatherName: student.fatherName || '',
        fatherOccupation: student.fatherOccupation || '',
        motherName: student.motherName || '',
        motherOccupation: student.motherOccupation || '',
        guardianName: student.guardianName || '',
        guardianContact: student.guardianContact || '',
        admissionYear: student.admissionYear || '2021',
        admissionDate: student.admissionDate || '',
        admissionType: student.admissionType || 'Convener Quota (EAPCET)',
        admissionQuota: student.admissionQuota || 'Convener Quota',
        casteCategory: student.casteCategory || '',
        scholarshipStatus: student.scholarshipStatus || 'Eligible',
        feeReimbursementStatus: student.feeReimbursementStatus || 'Full (JVD)'
      });
    }
  }, [student]);

  const [sameAddress, setSameAddress] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Live calculation of completion percentage as student enters data
  const liveCompletion = useMemo(() => {
    const previewMerged = { ...student, ...form };
    return calculateProfileCompletion(previewMerged);
  }, [student, form]);

  // Handle "Same as Current Address"
  const handleToggleSameAddress = (checked) => {
    setSameAddress(checked);
    if (checked) {
      setForm(prev => ({
        ...prev,
        permanentAddress: prev.currentAddress
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const errs = {};
    if (form.phone && form.phone.trim() && !/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }

    if (form.email && form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    if (form.fatherPhone && form.fatherPhone.trim() && !/^[0-9+\s-]{10,15}$/.test(form.fatherPhone.trim())) {
      errs.fatherPhone = "Enter a valid mobile number";
    }

    if (form.fatherEmail && form.fatherEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.fatherEmail.trim())) {
      errs.fatherEmail = "Enter a valid email address";
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Immediate Save Profile (Requirement 1 & 6: Saves directly without HOD approval)
  const handleSaveProfile = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validateForm()) {
      showToast("Please correct the invalid mobile or email format before saving.", "error");
      return;
    }

    const res = updateStudentProfile(student.rollNumber, form);
    if (res && res.success) {
      if (res.isComplete) {
        showToast("Profile saved successfully! Your profile status is Complete.", "success");
      } else {
        showToast("Profile saved! Please fill in all required fields (*) to mark your profile as Complete.", "info");
      }
      setMode('view');
    }
  };

  // Badge renderer: exactly two states (Complete or Incomplete)
  const renderStatusBadge = () => {
    const isCompleted = student.profileStatus === PROFILE_STATUSES.COMPLETE || student.profileStatus === 'Complete';
    if (isCompleted) {
      return (
        <span className="badge badge-success" style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <CheckCircle2 size={13} /> Complete
        </span>
      );
    }
    return (
      <span className="badge badge-warning" style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
        <Clock size={13} /> Incomplete
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner Alert based on Profile Status: Complete or Incomplete (Requirement 1 & 6) */}
      {(student.profileStatus === PROFILE_STATUSES.COMPLETE || student.profileStatus === 'Complete') ? (
        <div className="card" style={{ background: '#ecfdf5', borderLeft: '4px solid #10b981', padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#065f46', fontSize: '0.9rem' }}>
                Profile Status: Complete
              </strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#047857' }}>
                All mandatory profile details are completed and saved. You can update your details at any time by clicking "Edit & Complete Profile".
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Clock size={20} style={{ color: '#d97706', flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#92400e', fontSize: '0.9rem' }}>
                Profile Status: Incomplete
              </strong>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#b45309' }}>
                Your profile is currently incomplete. Please fill in the required fields marked with an asterisk (<span style={{ color: '#dc2626', fontWeight: 'bold' }}>*</span>) below and click "Save Profile".
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Profile Header Card with Completion Meter */}
      <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ 
              width: '74px', 
              height: '74px', 
              borderRadius: '16px', 
              background: 'linear-gradient(135deg, #0e2154 0%, #1d4ed8 100%)', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 800,
              boxShadow: '0 6px 14px rgba(14,33,84,0.18)',
              border: '3px solid #f59e0b'
            }}>
              {student.name ? student.name.charAt(0) : 'S'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#0e2154', margin: 0 }}>{student.name}</h2>
                {renderStatusBadge()}
              </div>
              <div style={{ fontSize: '0.84rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <span>Roll No: <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{student.rollNumber}</strong></span>
                <span>•</span>
                <span>Branch: <strong style={{ color: '#0f172a' }}>{student.department}</strong></span>
                <span>•</span>
                <span>{student.year} ({student.semester}) • Sec {student.section}</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Meter */}
          <div style={{ minWidth: '220px', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Profile Completion</span>
              <strong style={{ fontSize: '0.88rem', color: liveCompletion >= 100 ? '#059669' : liveCompletion >= 50 ? '#d97706' : '#64748b' }}>
                {liveCompletion}%
              </strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${liveCompletion}%`, 
                  height: '100%', 
                  background: liveCompletion >= 100 ? '#10b981' : liveCompletion >= 50 ? '#f59e0b' : '#3b82f6',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {liveCompletion >= 100 ? 'All required fields completed' : 'Complete required fields (*) to mark Complete'}
            </div>
          </div>

        </div>

        {/* Action Toggle Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setMode('view')}
              className={`btn btn-sm ${mode === 'view' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem' }}
            >
              <FileText size={14} /> View Complete Profile
            </button>
            <button
              type="button"
              onClick={() => setMode('edit')}
              className={`btn btn-sm ${mode === 'edit' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem' }}
            >
              <Edit3 size={14} /> Edit & Complete Profile
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: READ-ONLY VIEW COMPLETE PROFILE                                   */}
      {/* ========================================================================= */}
      {mode === 'view' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="grid-2">
            {/* Section A: Personal Identification */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} style={{ color: '#2563eb' }} />
                A. Personal Identification
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Full Legal Name</span>
                  <strong style={{ color: '#0f172a' }}>{student.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Short Name / Known As</span>
                  <span style={{ color: '#0f172a' }}>{student.shortName || '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Date of Birth</span>
                  <strong style={{ color: '#0f172a' }}>{student.dob || 'Pending Entry'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Gender / Blood Group</span>
                  <strong style={{ color: '#0f172a' }}>{student.gender || 'Male'} ({student.bloodGroup || 'O+'})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Student Mobile</span>
                  <strong style={{ color: '#0f172a' }}>{student.phone || 'Pending Entry'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Institutional Email</span>
                  <strong style={{ color: '#2563eb' }}>{student.email}</strong>
                </div>
              </div>
            </div>

            {/* Section B: Contact & Residential Details */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} style={{ color: '#059669' }} />
                B. Contact & Residential Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Father's Contact Phone</span>
                  <strong style={{ color: '#0f172a' }}>{student.fatherPhone || 'Pending Entry'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Father's Email</span>
                  <span style={{ color: '#0f172a' }}>{student.fatherEmail || '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Current Residential Address</span>
                  <span style={{ color: '#0f172a', textAlign: 'right', maxWidth: '60%' }}>
                    {student.currentAddress || student.address || 'Pending Entry'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Permanent Residential Address</span>
                  <span style={{ color: '#0f172a', textAlign: 'right', maxWidth: '60%' }}>
                    {student.permanentAddress || student.address || 'Pending Entry'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-2">
            {/* Section C: Parent / Guardian Information */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} style={{ color: '#d97706' }} />
                C. Parent / Guardian Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Father's Full Name</span>
                  <strong style={{ color: '#0f172a' }}>{student.fatherName || 'Pending Entry'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Father's Occupation</span>
                  <span style={{ color: '#0f172a' }}>{student.fatherOccupation || 'Pending Entry'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Mother's Full Name</span>
                  <strong style={{ color: '#0f172a' }}>{student.motherName || 'Pending Entry'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Mother's Occupation</span>
                  <span style={{ color: '#0f172a' }}>{student.motherOccupation || 'Pending Entry'}</span>
                </div>
                {student.guardianName && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Designated Guardian</span>
                    <span style={{ color: '#0f172a' }}>{student.guardianName} ({student.guardianContact || '—'})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section D: Admission & Institutional Financial Allotment */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={18} style={{ color: '#7c3aed' }} />
                D. Admission & Institutional Allotment
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Academic Admission Batch</span>
                  <strong style={{ color: '#0f172a' }}>{student.admissionYear || '2021'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Admission Allotment Type</span>
                  <strong style={{ color: '#059669' }}>{student.admissionType || 'Convener Quota (EAPCET)'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Allotment Quota Category</span>
                  <span style={{ color: '#0f172a' }}>{student.admissionQuota || 'Convener Quota'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>Caste / Reservation Category</span>
                  <span style={{ color: '#0f172a' }}>{student.casteCategory || 'Institutional Record'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '0.45rem' }}>
                  <span style={{ color: '#64748b' }}>State Scholarship Status</span>
                  <span className="badge badge-accent" style={{ fontSize: '0.72rem' }}>{student.scholarshipStatus || 'Eligible'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Fee Reimbursement Status</span>
                  <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{student.feeReimbursementStatus || 'Full (JVD)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section E: Protected Official Academic Identifiers */}
          <div className="card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={16} style={{ color: '#64748b' }} />
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0e2154' }}>
                  Protected Official Academic Identifiers
                </h4>
              </div>
              <span className="badge" style={{ background: '#e2e8f0', color: '#475569', fontSize: '0.72rem' }}>
                Locked for Institutional Integrity
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Permanent Roll No</span>
                <strong style={{ fontFamily: 'monospace', color: '#0e2154' }}>{student.rollNumber}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Admission No</span>
                <strong style={{ color: '#1d4ed8' }}>{student.admissionNumber || 'ADM-2021-0501'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Department / Branch</span>
                <strong style={{ color: '#0f172a' }}>{student.department}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Class & Section</span>
                <strong style={{ color: '#0f172a' }}>{student.year} • Sec {student.section}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>Current Semester</span>
                <strong style={{ color: '#0f172a' }}>{student.semester}</strong>
              </div>
            </div>
            
            <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.74rem', color: '#64748b' }}>
              Official academic fields cannot be altered directly by students. If there is a typographical error in your official name, admission number, or assigned section, click "Request Official Record Correction" above to submit an administrative change request to your department HOD.
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: EDIT & COMPLETE PROFILE FORM                                      */}
      {/* ========================================================================= */}
      {mode === 'edit' && (
        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Section 1: Personal Details */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} style={{ color: '#2563eb' }} />
              1. Personal Details
            </h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>
                  Official Full Legal Name <Lock size={12} style={{ color: '#94a3b8', verticalAlign: 'middle' }} />
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.name} 
                  disabled 
                  title="Official legal name is locked. To correct, use 'Request Official Record Correction'."
                  style={{ background: '#f1f5f9', cursor: 'not-allowed', color: '#475569' }}
                />
                <small style={{ color: '#64748b', fontSize: '0.7rem' }}>Protected official institutional record.</small>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Short Name (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sai Vardhan"
                  value={form.shortName} 
                  onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Date of Birth *</label>
                <input 
                  type="date" 
                  className={`form-input ${formErrors.dob ? 'input-error' : ''}`}
                  value={form.dob} 
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
                {formErrors.dob && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.dob}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Gender *</label>
                  <select 
                    className="form-select"
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Blood Group *</label>
                  <select 
                    className="form-select"
                    value={form.bloodGroup}
                    onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Residential Details */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} style={{ color: '#059669' }} />
              2. Contact & Residential Details
            </h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Student Mobile Number *</label>
                <input 
                  type="tel" 
                  className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                  placeholder="e.g. +91 98480 12345"
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {formErrors.phone && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.phone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Student Email Address *</label>
                <input 
                  type="email" 
                  className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                  placeholder="e.g. rollnumber@tecnrt.org"
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {formErrors.email && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Father's Mobile Number *</label>
                <input 
                  type="tel" 
                  className={`form-input ${formErrors.fatherPhone ? 'input-error' : ''}`}
                  placeholder="e.g. +91 94401 23456"
                  value={form.fatherPhone} 
                  onChange={(e) => setForm({ ...form, fatherPhone: e.target.value })}
                />
                {formErrors.fatherPhone && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.fatherPhone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Father's Email Address (Optional)</label>
                <input 
                  type="email" 
                  className={`form-input ${formErrors.fatherEmail ? 'input-error' : ''}`}
                  placeholder="e.g. father.parent@gmail.com"
                  value={form.fatherEmail} 
                  onChange={(e) => setForm({ ...form, fatherEmail: e.target.value })}
                />
                {formErrors.fatherEmail && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.fatherEmail}</div>}
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Current Residential Address *</label>
                <textarea 
                  className={`form-input ${formErrors.currentAddress ? 'input-error' : ''}`}
                  rows={2}
                  placeholder="Plot/Flat number, Street name, City, District, State & Pincode"
                  value={form.currentAddress} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      currentAddress: val,
                      permanentAddress: sameAddress ? val : prev.permanentAddress
                    }));
                  }}
                />
                {formErrors.currentAddress && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.currentAddress}</div>}
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" style={{ fontSize: '0.78rem', margin: 0 }}>Permanent Residential Address *</label>
                  <label style={{ fontSize: '0.75rem', color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={sameAddress} 
                      onChange={(e) => handleToggleSameAddress(e.target.checked)} 
                    />
                    Same as Current Address
                  </label>
                </div>
                <textarea 
                  className={`form-input ${formErrors.permanentAddress ? 'input-error' : ''}`}
                  rows={2}
                  placeholder="Permanent native home address with district and postal code"
                  value={form.permanentAddress} 
                  onChange={(e) => setForm({ ...form, permanentAddress: e.target.value })}
                  disabled={sameAddress}
                />
                {formErrors.permanentAddress && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.permanentAddress}</div>}
              </div>
            </div>
          </div>

          {/* Section 3: Parent / Guardian Details */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: '#d97706' }} />
              3. Parent / Guardian Details
            </h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Father's Full Name *</label>
                <input 
                  type="text" 
                  className={`form-input ${formErrors.fatherName ? 'input-error' : ''}`}
                  placeholder="e.g. M. Venkata Subbaiah"
                  value={form.fatherName} 
                  onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                />
                {formErrors.fatherName && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.fatherName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Father's Occupation *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Agriculture / Private Business / Govt Service"
                  value={form.fatherOccupation} 
                  onChange={(e) => setForm({ ...form, fatherOccupation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Mother's Full Name *</label>
                <input 
                  type="text" 
                  className={`form-input ${formErrors.motherName ? 'input-error' : ''}`}
                  placeholder="e.g. M. Lakshmi Devi"
                  value={form.motherName} 
                  onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                />
                {formErrors.motherName && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{formErrors.motherName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Mother's Occupation *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Homemaker / Teacher / Business"
                  value={form.motherOccupation} 
                  onChange={(e) => setForm({ ...form, motherOccupation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Guardian Name (Optional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Designated local guardian if living away from home"
                  value={form.guardianName} 
                  onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Guardian Contact Number (Optional)</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="e.g. +91 99887 76655"
                  value={form.guardianContact} 
                  onChange={(e) => setForm({ ...form, guardianContact: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Admission & Institutional Details */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', color: '#0e2154', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} style={{ color: '#7c3aed' }} />
              4. Admission & Institutional Information
            </h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Admission Batch Year</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.admissionYear} 
                  onChange={(e) => setForm({ ...form, admissionYear: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Official Admission Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={form.admissionDate} 
                  onChange={(e) => setForm({ ...form, admissionDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Admission Allotment Type</label>
                <select
                  className="form-select"
                  value={form.admissionType}
                  onChange={(e) => setForm({ ...form, admissionType: e.target.value })}
                >
                  <option value="Convener Quota (EAPCET)">Convener Quota (EAPCET)</option>
                  <option value="Management Quota">Management Quota</option>
                  <option value="Lateral Entry (ECET)">Lateral Entry (ECET)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Caste / Reservation Category (Optional)</label>
                <select
                  className="form-select"
                  value={form.casteCategory}
                  onChange={(e) => setForm({ ...form, casteCategory: e.target.value })}
                >
                  <option value="">Select if applicable</option>
                  <option value="OC">OC (Open Category)</option>
                  <option value="BC-A">BC-A</option>
                  <option value="BC-B">BC-B</option>
                  <option value="BC-C">BC-C</option>
                  <option value="BC-D">BC-D</option>
                  <option value="BC-E">BC-E</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>State Scholarship Status</label>
                <select
                  className="form-select"
                  value={form.scholarshipStatus}
                  onChange={(e) => setForm({ ...form, scholarshipStatus: e.target.value })}
                >
                  <option value="Eligible">Eligible</option>
                  <option value="Applied">Applied</option>
                  <option value="Disbursed">Disbursed</option>
                  <option value="Not Eligible">Not Eligible</option>
                  <option value="Pending Verification">Pending Verification</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Fee Reimbursement Status (JVD)</label>
                <select
                  className="form-select"
                  value={form.feeReimbursementStatus}
                  onChange={(e) => setForm({ ...form, feeReimbursementStatus: e.target.value })}
                >
                  <option value="Full (JVD)">Full Fee Reimbursement (JVD Scheme)</option>
                  <option value="Partial">Partial Reimbursement</option>
                  <option value="Self Financed">Self Financed</option>
                  <option value="Pending Verification">Pending Verification</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions Footer (Requirement 1 & 6) */}
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                Profile Completion: <strong>{liveCompletion}%</strong> {liveCompletion >= 100 ? '(All required fields complete)' : '(Fill remaining required fields marked * to reach 100%)'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setMode('view')}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', fontWeight: 600, padding: '0.55rem 1.25rem' }}
              >
                <Save size={16} /> Save Profile
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
