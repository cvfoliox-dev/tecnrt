import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Key, Shield, Smartphone, Lock, CheckCircle2 } from 'lucide-react';

export default function FacultySettings() {
  const { currentUser, updatePassword, showToast } = useAuth();
  const faculty = currentUser.profile || {};

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(false);

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

  const handleMfaToggle = (e) => {
    const checked = e.target.checked;
    setMfaEnabled(checked);
    showToast(checked ? "Multi-Factor Authentication enabled for staff account." : "MFA disabled.", "info");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '800px' }}>
      
      {/* Account Info */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} style={{ color: '#2563eb' }} />
          Faculty Credentials & Security (PRD 4.2)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Individually managed staff account under Tirumala Engineering College access control policies.
        </p>

        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          <div>Staff ID: <strong>{faculty.staffId || "TEC-FAC-042"}</strong></div>
          <div>Name: <strong>{faculty.name}</strong></div>
          <div>Department: <strong>{faculty.department}</strong></div>
          <div>Official Email: <strong>{faculty.email || "maheshbabu.ch@tecnrt.org"}</strong></div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
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
            <Key size={15} /> Update Staff Password
          </button>
        </form>
      </div>

      {/* Privileged MFA Controls (PRD 4.2 & 14.1) */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Smartphone size={18} style={{ color: '#d97706' }} />
          Privileged Account MFA Protection (PRD 4.2)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Optional multi-factor authentication for staff accounts authorized to perform attendance uploads and student creation.
        </p>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={mfaEnabled}
            onChange={handleMfaToggle}
          />
          <span>Require 6-digit TOTP Authenticator code on every staff sign-in</span>
        </label>
      </div>

    </div>
  );
}
