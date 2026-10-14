import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentCreationModal({ isOpen, onClose, defaultDepartment = "CSE" }) {
  const { createStudent, showToast } = useAuth();

  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    department: defaultDepartment,
    year: 'IV Year',
    semester: 'VII Semester',
    section: 'A',
    email: '',
    phone: '',
    fatherName: '',
    gender: 'Male',
    dob: '2004-01-15',
    bloodGroup: 'O+',
    admissionType: 'Convener Quota (EAPCET)',
    cgpa: '8.2',
    attendance: '85.0'
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.rollNumber.trim() || !formData.name.trim()) {
      setError("Roll Number and Student Name are required.");
      return;
    }

    const res = createStudent(formData);
    if (res.success) {
      onClose();
      // Reset form
      setFormData({
        rollNumber: '',
        name: '',
        department: defaultDepartment,
        year: 'IV Year',
        semester: 'VII Semester',
        section: 'A',
        email: '',
        phone: '',
        fatherName: '',
        gender: 'Male',
        dob: '2004-01-15',
        bloodGroup: 'O+',
        admissionType: 'Convener Quota (EAPCET)',
        cgpa: '8.2',
        attendance: '85.0'
      });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog modal-dialog-large">
        <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus size={20} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
              Add New Student Record (PRD 5.2 & 7.1)
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#cbd5e1' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Authorized administrative workflow for enrolling students. The system validates roll number uniqueness and enforces departmental boundaries.
            </p>

            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">College Roll Number * (Must be Unique)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g., 22TML0588"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Student Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  placeholder="e.g., K. Suresh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Department *</label>
                <select 
                  className="form-select"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="CSE">CSE</option>
                  <option value="AIML">CSE (AI & ML)</option>
                  <option value="AIDS">CSE (AI & DS)</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Academic Year</label>
                <select 
                  className="form-select"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option value="IV Year">IV Year</option>
                  <option value="III Year">III Year</option>
                  <option value="II Year">II Year</option>
                  <option value="I Year">I Year</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Section</label>
                <select 
                  className="form-select"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Parent / Father's Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Parent legal name"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="+91 98480 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select 
                  className="form-select"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Attendance %</label>
                <input 
                  type="number" 
                  step="0.1" 
                  className="form-input" 
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial CGPA</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="form-input" 
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} /> Validate & Create Student Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
