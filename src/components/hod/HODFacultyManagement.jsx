import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Mail, 
  Phone, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Briefcase, 
  GraduationCap, 
  Building2 
} from 'lucide-react';

export default function HODFacultyManagement() {
  const { currentUser, facultyList = [], addFacultyMember, updateFacultyMember, showToast } = useAuth();
  const assignedBranch = currentUser?.profile?.department || 'CSE';
  const deptFaculty = facultyList.filter(f => f.department === assignedBranch);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const [form, setForm] = useState({
    staffId: '',
    name: '',
    designation: 'Assistant Professor',
    qualification: '',
    experience: '',
    email: '',
    phone: '',
    weeklyHours: 16,
    assignedSubjects: [
      { code: '', name: '', year: 'III Year', section: 'A', hours: 4 }
    ]
  });

  const [errors, setErrors] = useState({});

  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedStaffId(null);
    setForm({
      staffId: '',
      name: '',
      designation: 'Assistant Professor',
      qualification: '',
      experience: '',
      email: '',
      phone: '',
      weeklyHours: 16,
      assignedSubjects: [
        { code: 'CS501PC', name: 'Operating Systems', year: 'III Year', section: 'A', hours: 4 }
      ]
    });
    setErrors({});
    setShowModal(true);
  };

  const handleOpenEdit = (fac) => {
    setIsEditing(true);
    setSelectedStaffId(fac.staffId);
    
    // Map existing subjects or initialize with default structure
    const subjects = (fac.assignedSubjects && fac.assignedSubjects.length > 0)
      ? fac.assignedSubjects.map(s => {
          // Extract year/section from class string like "IV B.Tech CSE-A" if present
          let yr = 'IV Year';
          let sec = 'A';
          if (s.class) {
            if (s.class.includes('I B.Tech')) yr = 'I Year';
            else if (s.class.includes('II B.Tech')) yr = 'II Year';
            else if (s.class.includes('III B.Tech')) yr = 'III Year';
            else if (s.class.includes('IV B.Tech')) yr = 'IV Year';
            const m = s.class.match(/-([A-D])/);
            if (m) sec = m[1];
          }
          return {
            code: s.code || '',
            name: s.name || '',
            year: s.year || yr,
            section: s.section || sec,
            hours: s.hours || 4
          };
        })
      : [{ code: '', name: '', year: 'IV Year', section: 'A', hours: 4 }];

    setForm({
      staffId: fac.staffId,
      name: fac.name,
      designation: fac.designation || 'Assistant Professor',
      qualification: fac.qualification || '',
      experience: fac.experience || '',
      email: fac.email || '',
      phone: fac.phone || '',
      weeklyHours: fac.weeklyHours || (subjects.reduce((sum, s) => sum + (Number(s.hours) || 0), 0) || 16),
      assignedSubjects: subjects
    });
    setErrors({});
    setShowModal(true);
  };

  const handleAddSubjectRow = () => {
    setForm(prev => {
      const updated = [
        ...prev.assignedSubjects,
        { code: 'CS701PC', name: 'Cloud Computing Architecture', year: 'IV Year', section: 'B', hours: 4 }
      ];
      const totalHrs = updated.reduce((sum, s) => sum + (Number(s.hours) || 0), 0);
      return {
        ...prev,
        assignedSubjects: updated,
        weeklyHours: totalHrs
      };
    });
  };

  const handleRemoveSubjectRow = (index) => {
    if (form.assignedSubjects.length <= 1) {
      showToast("At least one subject allocation is required for faculty teaching assignment.", "warning");
      return;
    }
    setForm(prev => {
      const updated = prev.assignedSubjects.filter((_, idx) => idx !== index);
      const totalHrs = updated.reduce((sum, s) => sum + (Number(s.hours) || 0), 0);
      return {
        ...prev,
        assignedSubjects: updated,
        weeklyHours: totalHrs
      };
    });
  };

  const handleSubjectFieldChange = (index, field, value) => {
    setForm(prev => {
      const updated = [...prev.assignedSubjects];
      updated[index] = { ...updated[index], [field]: value };
      const totalHrs = updated.reduce((sum, s) => sum + (Number(s.hours) || 0), 0);
      return {
        ...prev,
        assignedSubjects: updated,
        weeklyHours: totalHrs
      };
    });
  };

  const validateForm = () => {
    const errs = {};
    if (!form.staffId.trim()) errs.staffId = "Staff ID is required (e.g. TEC-FAC-045)";
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.qualification.trim()) errs.qualification = "Qualification is required (e.g. M.Tech, Ph.D)";
    if (!form.experience.trim()) errs.experience = "Experience is required (e.g. 5 Years)";
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errs.email = "Valid institutional or professional email is required";
    }

    // Phone validation
    const cleanPhone = form.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = "Valid 10-digit phone number is required";
    }

    // Duplicate Staff ID validation (when adding)
    if (!isEditing) {
      const exists = facultyList.some(f => f.staffId.toUpperCase() === form.staffId.trim().toUpperCase());
      if (exists) {
        errs.staffId = `Staff ID ${form.staffId.trim()} is already assigned in college directory`;
      }
    }

    // Subject validation
    const hasInvalidSubject = form.assignedSubjects.some(s => !s.code.trim() || !s.name.trim());
    if (hasInvalidSubject) {
      errs.subjects = "Please provide both Course Code and Subject Name for all assigned courses";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please correct the validation errors in the form.", "error");
      return;
    }

    // Format subjects with institutional class string
    const formattedSubjects = form.assignedSubjects.map(s => ({
      code: s.code.trim().toUpperCase(),
      name: s.name.trim(),
      class: `${s.year} B.Tech ${assignedBranch}-${s.section}`,
      year: s.year,
      section: s.section,
      hours: Number(s.hours) || 4,
      period: "ODD 2026",
      studentsCount: 65
    }));

    if (isEditing) {
      updateFacultyMember(selectedStaffId, {
        name: form.name.trim(),
        designation: form.designation,
        department: assignedBranch,
        qualification: form.qualification.trim(),
        experience: form.experience.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        assignedSubjects: formattedSubjects,
        weeklyHours: Number(form.weeklyHours) || 16
      });
      setShowModal(false);
    } else {
      const res = addFacultyMember({
        staffId: form.staffId.trim().toUpperCase(),
        name: form.name.trim(),
        designation: form.designation,
        department: assignedBranch,
        qualification: form.qualification.trim(),
        experience: form.experience.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        assignedSubjects: formattedSubjects,
        weeklyHours: Number(form.weeklyHours) || 16
      });
      if (res.success) {
        setShowModal(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #1d4ed8' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-primary">
              Academic Faculty Roster
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              Department: <strong>{assignedBranch}</strong> ({deptFaculty.length} Allocated)
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            {assignedBranch} Faculty Members & Workload Directory
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Manage staff course allocations, weekly teaching credits, and attendance authorization for {assignedBranch}.
          </p>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
        >
          <PlusCircle size={16} /> Allocate New Staff Member
        </button>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid-2">
        {deptFaculty.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1.5rem', background: '#ffffff', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <Users size={26} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0e2154', marginBottom: '0.25rem' }}>
              No faculty members allocated yet
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '440px', margin: '0 auto 1.25rem auto' }}>
              There are currently no staff members allocated to the Department of {assignedBranch}. Click &quot;Allocate New Staff Member&quot; to assign faculty teaching workloads.
            </p>
            <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
              <PlusCircle size={14} /> Allocate First Staff Member
            </button>
          </div>
        ) : (
          deptFaculty.map(fac => (
            <div key={fac.id || fac.staffId} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
              <div>
                {/* Staff Top Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <span className="badge badge-primary" style={{ fontWeight: 700 }}>{fac.staffId}</span>
                      <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>{fac.department}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, margin: 0 }}>{fac.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 600, marginTop: '0.15rem' }}>{fac.designation}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {fac.qualification} • {fac.experience}
                    </div>
                  </div>

                  <span className={`badge ${fac.pendingUploads > 0 ? 'badge-warning' : 'badge-success'}`} style={{ whiteSpace: 'nowrap' }}>
                    {fac.pendingUploads > 0 ? 'Pending Upload' : 'Active & Compliant'}
                  </span>
                </div>

                {/* Assigned Subjects Matrix */}
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Teaching Assignments ({fac.assignedSubjects ? fac.assignedSubjects.length : 0})
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                      {fac.weeklyHours || 16} Hrs/Week
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {(fac.assignedSubjects || []).map((sub, idx) => (
                      <div key={idx} style={{ fontSize: '0.8rem', color: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #eef2f6' }}>
                        <div>
                          <strong style={{ color: '#1d4ed8' }}>{sub.code}</strong>
                          <span style={{ color: '#334155', marginLeft: '0.35rem' }}>{sub.name}</span>
                        </div>
                        <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                          {sub.class || `${sub.year || 'IV Year'} ${sub.section || 'A'}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Mail size={14} style={{ color: '#2563eb', flexShrink: 0 }} />
                    <a href={`mailto:${fac.email}`} style={{ color: '#475569', textDecoration: 'none' }}>{fac.email}</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={14} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>{fac.phone}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem', marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Workload: <strong>{fac.weeklyHours || 16} Hours/Week</strong>
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleOpenEdit(fac)}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    title="View and edit faculty teaching allocation"
                  >
                    <Edit3 size={13} /> Edit Allocation
                  </button>
                  <button 
                    onClick={() => showToast(`Sent submission reminder notification to ${fac.name}`, "info")}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                  >
                    Reminder
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ALLOCATE / EDIT STAFF MEMBER MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog" style={{ maxWidth: '680px', width: '100%', maxHeight: '92vh', overflowY: 'auto' }}>
            
            <div className="modal-header" style={{ background: '#0a3d78', color: '#ffffff', position: 'sticky', top: 0, zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} style={{ color: '#fbbf24' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                    {isEditing ? `Edit Staff Allocation — ${form.name}` : `Allocate New Staff Member`}
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: '#93c5fd', marginTop: '0.15rem' }}>
                    Assigned Department: <strong>{assignedBranch}</strong> (Institutional Governance)
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '0.35rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Section A: Staff Information */}
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#0a3d78', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Briefcase size={14} /> 1. Staff Identification & Credentials
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <div>
                      <label className="form-label">Staff ID *</label>
                      <input 
                        type="text" 
                        className={`form-input ${errors.staffId ? 'input-error' : ''}`}
                        placeholder="e.g. TEC-FAC-045"
                        value={form.staffId}
                        onChange={(e) => setForm({ ...form, staffId: e.target.value.toUpperCase() })}
                        disabled={isEditing}
                        required
                      />
                      {errors.staffId && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{errors.staffId}</div>}
                    </div>

                    <div>
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="e.g. Dr. A. Ramesh Babu"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                      {errors.name && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{errors.name}</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem', marginTop: '0.85rem' }}>
                    <div>
                      <label className="form-label">Designation *</label>
                      <select 
                        className="form-select"
                        value={form.designation}
                        onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      >
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Professor">Professor</option>
                        <option value="Professor & HOD">Professor & HOD</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Qualification *</label>
                      <input 
                        type="text" 
                        className={`form-input ${errors.qualification ? 'input-error' : ''}`}
                        placeholder="e.g. M.Tech, Ph.D"
                        value={form.qualification}
                        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                        required
                      />
                      {errors.qualification && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{errors.qualification}</div>}
                    </div>

                    <div>
                      <label className="form-label">Experience *</label>
                      <input 
                        type="text" 
                        className={`form-input ${errors.experience ? 'input-error' : ''}`}
                        placeholder="e.g. 8 Years"
                        value={form.experience}
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        required
                      />
                      {errors.experience && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{errors.experience}</div>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.85rem' }}>
                    <div>
                      <label className="form-label">Institutional Email *</label>
                      <input 
                        type="email" 
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="e.g. ramesh.a@tecnrt.org"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                      {errors.email && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{errors.email}</div>}
                    </div>

                    <div>
                      <label className="form-label">Contact Phone Number *</label>
                      <input 
                        type="text" 
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="e.g. +91 98480 12345"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                      />
                      {errors.phone && <div style={{ fontSize: '0.72rem', color: '#dc2626', marginTop: '0.2rem' }}>{errors.phone}</div>}
                    </div>
                  </div>
                </div>

                {/* Section B: Academic Course & Section Allocation */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#0a3d78', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GraduationCap size={14} /> 2. Academic Allocation & Teaching Load ({assignedBranch})
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddSubjectRow}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Plus size={13} /> Add Another Subject & Section
                    </button>
                  </div>

                  {errors.subjects && (
                    <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                      {errors.subjects}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {form.assignedSubjects.map((sub, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem', display: 'grid', gridTemplateColumns: '110px 1fr 100px 90px 75px 36px', gap: '0.5rem', alignItems: 'center' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '0.2rem' }}>Code *</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="CS501PC"
                            value={sub.code}
                            onChange={(e) => handleSubjectFieldChange(idx, 'code', e.target.value.toUpperCase())}
                            style={{ fontSize: '0.8rem', padding: '0.35rem 0.5rem', fontWeight: 700 }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '0.2rem' }}>Subject Name *</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g. Operating Systems"
                            value={sub.name}
                            onChange={(e) => handleSubjectFieldChange(idx, 'name', e.target.value)}
                            style={{ fontSize: '0.8rem', padding: '0.35rem 0.5rem' }}
                            required
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '0.2rem' }}>Year</label>
                          <select 
                            className="form-select"
                            value={sub.year}
                            onChange={(e) => handleSubjectFieldChange(idx, 'year', e.target.value)}
                            style={{ fontSize: '0.78rem', padding: '0.35rem 0.4rem' }}
                          >
                            <option value="I Year">I Year</option>
                            <option value="II Year">II Year</option>
                            <option value="III Year">III Year</option>
                            <option value="IV Year">IV Year</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '0.2rem' }}>Section</label>
                          <select 
                            className="form-select"
                            value={sub.section}
                            onChange={(e) => handleSubjectFieldChange(idx, 'section', e.target.value)}
                            style={{ fontSize: '0.78rem', padding: '0.35rem 0.4rem' }}
                          >
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                            <option value="D">Section D</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '0.2rem' }}>Hrs/Wk</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="20"
                            className="form-input" 
                            value={sub.hours}
                            onChange={(e) => handleSubjectFieldChange(idx, 'hours', e.target.value)}
                            style={{ fontSize: '0.8rem', padding: '0.35rem 0.4rem', textAlign: 'center' }}
                          />
                        </div>

                        <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSubjectRow(idx)}
                            style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0.25rem' }}
                            title="Remove subject row"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Workload Summary Bar */}
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.75rem 1rem', borderRadius: '8px', marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#166534', fontWeight: 600 }}>
                      <Clock size={16} style={{ color: '#16a34a' }} />
                      <span>Total Allocated Teaching Workload:</span>
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#15803d' }}>
                      {form.weeklyHours} Hours / Week
                    </span>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Allocated under <strong>{assignedBranch}</strong> HOD oversight.
                </span>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <CheckCircle2 size={16} /> {isEditing ? "Save & Update Allocation" : "Complete Staff Allocation"}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
