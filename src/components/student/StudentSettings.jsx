import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Key, Bell, Shield, UserCheck, CheckCircle2, Lock } from 'lucide-react';

export default function StudentSettings() {
  const { currentUser, updatePassword, showToast, logAction } = useAuth();
  const student = currentUser.profile || {};

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);

  const handlePasswordUpdate = (e) => {
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

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    showToast("Notification preferences updated successfully.", "success");
    logAction({
      action: "PREFERENCES_UPDATE",
      details: "Updated SMS and email alert preferences",
      affectedClass: student.rollNumber
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '800px' }}>
      
      {/* Password Security Card */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Key size={18} style={{ color: '#2563eb' }} />
          Change Portal Password (PRD 4.1 & 7.2)
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Update your student login password. College roll numbers identify students but are not treated as secret credentials.
        </p>

        <form onSubmit={handlePasswordUpdate}>
          <div className="form-group">
            <label className="form-label">Current / Temporary Password</label>
            <input 
              type="password" 
              className="form-input" 
              required 
              placeholder="Enter current password or roll number"
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">New Secure Password</label>
              <input 
                type="password" 
                className="form-input" 
                required 
                placeholder="At least 6 characters"
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
                placeholder="Re-type new password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            <Lock size={15} /> Update Password
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={18} style={{ color: '#f59e0b' }} />
          Communication & Alert Preferences
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
          Manage automated communications regarding daily attendance updates and examination schedules.
        </p>

        <form onSubmit={handleSaveNotifications}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
              />
              <span>Send SMS alerts to registered parent phone when daily attendance is absent</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
              />
              <span>Email monthly attendance summaries and JNTUK examination circulars</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={attendanceAlerts}
                onChange={(e) => setAttendanceAlerts(e.target.checked)}
              />
              <span>Automated warning alerts if aggregate attendance falls below 75%</span>
            </label>
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Save Notification Preferences
          </button>
        </form>
      </div>

    </div>
  );
}
