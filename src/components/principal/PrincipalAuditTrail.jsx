import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Search, Filter, Download, Clock, CheckCircle2 } from 'lucide-react';

export default function PrincipalAuditTrail() {
  const { auditLogs, showToast } = useAuth();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filtered = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(search.toLowerCase()) || 
                          log.user.toLowerCase().includes(search.toLowerCase()) ||
                          log.id.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const handleExportLogs = () => {
    const headers = "Audit ID,Timestamp,Actor,Role,Action,Period,Target,Details,Status\n";
    const rows = auditLogs.map(l => `"${l.id}","${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.academicPeriod}","${l.affectedClass}","${l.details}","${l.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TEC_Institutional_Audit_Trail_${new Date().toISOString().substring(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Audit Trail exported as signed CSV report", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #1d4ed8' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            PRD 4.4, 6.6 & 13.15 Compliance
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            System-Wide Administrative Audit Logs
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Immutable logging of sensitive administrative operations, spreadsheet submissions, and attendance corrections.
          </p>
        </div>

        <button onClick={handleExportLogs} className="btn btn-outline-primary">
          <Download size={15} /> Export Signed Audit Trail
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search Action, User, or Ref ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'ATTENDANCE_UPLOAD', 'CORRECTION_APPROVAL', 'STUDENT_CREATION', 'FEE_PAYMENT_SUCCESS'].map(act => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`btn btn-sm ${actionFilter === act ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {act === 'ALL' ? 'All Events' : act.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Audit Identifier</th>
              <th>Timestamp</th>
              <th>Responsible User</th>
              <th>Role</th>
              <th>Operation / Action</th>
              <th>Affected Class / Target</th>
              <th>Detailed Description</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id}>
                <td><strong style={{ color: '#1d4ed8', fontSize: '0.82rem' }}>{log.id}</strong></td>
                <td style={{ fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                <td><strong>{log.user}</strong></td>
                <td><span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{log.role}</span></td>
                <td>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.8rem' }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem' }}>{log.affectedClass}</td>
                <td style={{ fontSize: '0.82rem', color: '#334155', maxWidth: '320px' }}>
                  {log.details}
                </td>
                <td>
                  <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                    <CheckCircle2 size={11} /> {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
