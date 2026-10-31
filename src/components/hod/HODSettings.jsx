import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Key, Shield, Building2 } from 'lucide-react';

export default function HODSettings() {
  const { currentUser, updatePassword, showToast } = useAuth();
  const profile = currentUser.profile || {};

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPwd.length < 6) {
      showToast("Password must be at least 6 characters long.", "error");
      return;
    }
    if (newPwd !== confirmPwd) {
      showToast("Passwords do not match.", "error");
      return;
    }
    updatePassword(newPwd);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '800px' }}>
      
      {/* Account Info */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={18} style={{ color: '#7e22ce' }} />
          HOD Administrative Account (PRD 4.3)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Restricted departmental authority under institutional role-based access control.
        </p>

        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          <div>HOD Name: <strong>{profile.name || currentUser?.name || "Department Head"}</strong></div>
          <div>Department: <strong>{profile.departmentName || profile.department || "Engineering"}</strong></div>
          <div>Email: <strong>{profile.email || currentUser?.username || "hod@tecnrt.org"}</strong></div>
          <div>Designation: <strong>Professor & Head of Department</strong></div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label className="form-label">Current Administrative Password</label>
            <input 
              type="password" 
              className="form-input" 
              required 
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-input" 
                required 
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                className="form-input" 
                required 
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            <Key size={15} /> Update HOD Password
          </button>
        </form>
      </div>

    </div>
  );
}
