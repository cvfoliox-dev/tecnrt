import React from 'react';
import { Award, TrendingUp, CheckCircle2, ShieldCheck, Download, Printer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PrincipalAcademicReports() {
  const { showToast } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderLeft: '4px solid #f59e0b' }}>
        <div>
          <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
            Executive Intelligence
          </span>
          <h2 style={{ fontSize: '1.4rem', color: '#0e2154' }}>
            Academic Performance & Accreditation Indices
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
            Comprehensive institutional evaluation metrics for NAAC, NBA, and JNTUK audits.
          </p>
        </div>

        <button onClick={() => showToast("Generated comprehensive Institutional Dossier PDF", "success")} className="btn btn-primary">
          <Download size={15} /> Export Executive Summary
        </button>
      </div>

      {/* 3 Major Audit Index Cards */}
      <div className="grid-3">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Award size={20} style={{ color: '#059669' }} />
            <h4 style={{ fontSize: '1rem', color: '#0f172a' }}>NAAC 'A' Grade Status</h4>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
            Institutional CGPA of 3.12 / 4.0. Strong ratings in Teaching-Learning Resources (Criterion II) and Governance Leadership (Criterion VI).
          </p>
          <span className="badge badge-success">Valid through 2028</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ShieldCheck size={20} style={{ color: '#2563eb' }} />
            <h4 style={{ fontSize: '1rem', color: '#0f172a' }}>NBA Accreditation</h4>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
            Tier-II outcome based education accreditation for eligible B.Tech programs (CSE, ECE, EEE, MECH).
          </p>
          <span className="badge badge-primary">Compliant Outcome Metrics</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <TrendingUp size={20} style={{ color: '#d97706' }} />
            <h4 style={{ fontSize: '1rem', color: '#0f172a' }}>JNTUK Pass Trends</h4>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
            Average graduating pass percentage across all 8 branches is 88.6%, placing Tirumala in top tier of Palnadu/Guntur colleges.
          </p>
          <span className="badge badge-accent">88.6% Graduation Rate</span>
        </div>
      </div>

    </div>
  );
}
