import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_INFO } from '../../data/mockData';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  UserCheck, 
  Key, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  LogIn, 
  HelpCircle 
} from 'lucide-react';

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, loginModalRole, setLoginModalRole, loginWithCredentials } = useAuth();

  const [activeTab, setActiveTab] = useState(loginModalRole || 'student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [requireMfa, setRequireMfa] = useState(false);

  useEffect(() => {
    if (loginModalRole) {
      setActiveTab(loginModalRole);
      applyDemoCredentials(loginModalRole);
    }
  }, [loginModalRole, loginModalOpen]);

  const applyDemoCredentials = (role) => {
    setError('');
    setShowForgotNotice(false);
    setRequireMfa(false);

    if (role === 'student') {
      setUsername('21TML0501');
      setPassword('21TML0501'); // Tests the first-time password change requirement!
    } else if (role === 'faculty') {
      setUsername('TEC-FAC-042');
      setPassword('Faculty@2026');
    } else if (role === 'hod') {
      setUsername('hod.cse@tecnrt.org');
      setPassword('HOD_CSE#2026');
    } else if (role === 'principal') {
      setUsername('principal@tecnrt.org');
      setPassword('Principal#TMLN26');
    }
  };

  const handleTabChange = (role) => {
    setActiveTab(role);
    setLoginModalRole(role);
    applyDemoCredentials(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError("Please fill in both identifier and password fields.");
      return;
    }

    if (requireMfa && mfaCode.trim() !== '123456') {
      setError("Invalid 6-digit MFA verification code. (Hint: Use 123456 for demo)");
      return;
    }

    loginWithCredentials({
      role: activeTab,
      username,
      password
    });
  };

  if (!loginModalOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog" style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Tirumala Portal Authentication</h3>
              <div style={{ fontSize: '0.72rem', color: '#93c5fd' }}>
                Secure Institutional Access (EAPCET: {COLLEGE_INFO.eamcetCode})
              </div>
            </div>
          </div>
          <button 
            onClick={() => setLoginModalOpen(false)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '0.35rem 0.5rem' }}>
          <button
            type="button"
            onClick={() => handleTabChange('student')}
            style={{
              padding: '0.65rem 0.25rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'student' ? 700 : 500,
              background: activeTab === 'student' ? '#ffffff' : 'transparent',
              color: activeTab === 'student' ? '#1d4ed8' : '#64748b',
              borderRadius: '6px',
              border: activeTab === 'student' ? '1px solid #cbd5e1' : 'none',
              boxShadow: activeTab === 'student' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <GraduationCap size={16} />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('faculty')}
            style={{
              padding: '0.65rem 0.25rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'faculty' ? 700 : 500,
              background: activeTab === 'faculty' ? '#ffffff' : 'transparent',
              color: activeTab === 'faculty' ? '#d97706' : '#64748b',
              borderRadius: '6px',
              border: activeTab === 'faculty' ? '1px solid #cbd5e1' : 'none',
              boxShadow: activeTab === 'faculty' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Briefcase size={16} />
            <span>Faculty</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('hod')}
            style={{
              padding: '0.65rem 0.25rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'hod' ? 700 : 500,
              background: activeTab === 'hod' ? '#ffffff' : 'transparent',
              color: activeTab === 'hod' ? '#7e22ce' : '#64748b',
              borderRadius: '6px',
              border: activeTab === 'hod' ? '1px solid #cbd5e1' : 'none',
              boxShadow: activeTab === 'hod' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Building2 size={16} />
            <span>HOD</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('principal')}
            style={{
              padding: '0.65rem 0.25rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'principal' ? 700 : 500,
              background: activeTab === 'principal' ? '#ffffff' : 'transparent',
              color: activeTab === 'principal' ? '#b45309' : '#64748b',
              borderRadius: '6px',
              border: activeTab === 'principal' ? '1px solid #cbd5e1' : 'none',
              boxShadow: activeTab === 'principal' ? 'var(--shadow-sm)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <UserCheck size={16} />
            <span>Principal</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ padding: '1.5rem' }}>
            {/* PRD Role Specific Guidance */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#1e40af' }}>
              {activeTab === 'student' && (
                <div>
                  <strong>PRD 4.1 Notice:</strong> Student login identifier is your 10-digit College Roll Number. Initial password is set to Roll Number (first login requires updating password).
                </div>
              )}
              {activeTab === 'faculty' && (
                <div>
                  <strong>PRD 4.2 Notice:</strong> Faculty login uses official Staff Identifier (e.g., <code>TEC-FAC-042</code>). Supports spreadsheet uploads and attendance authorization.
                </div>
              )}
              {activeTab === 'hod' && (
                <div>
                  <strong>PRD 4.3 Notice:</strong> Head of Department portal for academic monitoring, subject allocations, and attendance oversight.
                </div>
              )}
              {activeTab === 'principal' && (
                <div>
                  <strong>PRD 4.4 Notice:</strong> Institutional executive oversight across all 8 academic departments, student rosters, and audit trails.
                </div>
              )}
            </div>

            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                {activeTab === 'student' ? 'College Roll Number (Identifier)' : activeTab === 'faculty' ? 'Staff Identifier / Username' : 'Official Email / Administrator ID'}
              </label>
              <input 
                type="text" 
                className="form-input" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={activeTab === 'student' ? 'e.g., 21TML0501' : 'e.g., TEC-FAC-042'}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotNotice(!showForgotNotice)}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password" 
                className="form-input" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            {/* Simulated MFA Option for Faculty/Admin (PRD 4.2) */}
            {(activeTab === 'faculty' || activeTab === 'hod' || activeTab === 'principal') && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={requireMfa}
                    onChange={(e) => setRequireMfa(e.target.checked)}
                  />
                  <span>Enable Privileged Multi-Factor Authentication (MFA) check</span>
                </label>
                {requireMfa && (
                  <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Enter 6-Digit Authenticator Code (Hint: 123456):</div>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="123456" 
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Forgot Password Flow (PRD 4.1 Account Recovery) */}
            {showForgotNotice && (
              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <strong>Account Recovery Workflow (PRD 4.1 & 7.2):</strong>
                <p style={{ marginTop: '0.25rem', color: '#78350f', fontSize: '0.78rem' }}>
                  Contact your designated Department HOD or College Examination Section with your original College ID card and verified mobile OTP to reset your login credentials.
                </p>
              </div>
            )}

            {/* Quick Demo Pre-fill helper */}
            <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748b' }}>
                <Sparkles size={14} style={{ color: '#f59e0b' }} />
                <span>Need test credentials?</span>
              </div>
              <button 
                type="button" 
                onClick={() => applyDemoCredentials(activeTab)}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}
              >
                Auto-fill Demo
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button 
              type="button" 
              onClick={() => setLoginModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ padding: '0.6rem 1.5rem' }}
            >
              <LogIn size={16} /> Authenticate & Access Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
