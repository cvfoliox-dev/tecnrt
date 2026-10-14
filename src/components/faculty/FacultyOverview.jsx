import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FACULTY_TIMETABLE } from '../../data/mockData';
import StatCard from '../common/StatCard';
import { 
  Users, 
  BookOpen, 
  FileSpreadsheet, 
  Percent, 
  Calendar, 
  Clock, 
  Upload, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight 
} from 'lucide-react';

export default function FacultyOverview({ onOpenAddStudent }) {
  const { currentUser, setActiveTab, uploadHistory } = useAuth();
  const faculty = currentUser.profile || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Faculty Welcome Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', 
        borderRadius: '16px', 
        padding: '1.75rem', 
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-accent">
              Staff ID: {faculty.staffId || "TEC-FAC-042"}
            </span>
            <span style={{ color: '#93c5fd', fontSize: '0.8rem' }}>
              {faculty.qualification || "M.Tech (JNTUK)"}
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
            Welcome, {faculty.name}!
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            {faculty.designation} • Department of {faculty.department} • Tirumala Engineering College
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('uploads')} 
            className="btn btn-accent btn-sm"
          >
            <Upload size={15} /> Upload Attendance Sheet
          </button>
          <button 
            onClick={onOpenAddStudent} 
            className="btn btn-sm"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <PlusCircle size={15} /> Add Student Record
          </button>
        </div>
      </div>

      {/* Pending Upload Warning Callout (PRD 4.2 & 6.4) */}
      <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', color: '#92400e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={22} style={{ color: '#d97706', flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem' }}>
            <strong>Action Required:</strong> Attendance spreadsheet for <strong>September 2026 (IV B.Tech CSE-A / CS711PE)</strong> is pending submission.
          </div>
        </div>
        <button 
          onClick={() => setActiveTab('uploads')}
          className="btn btn-accent btn-sm"
          style={{ fontSize: '0.78rem' }}
        >
          Launch Upload Workflow
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <StatCard 
          title="Teaching Load"
          value="2 Courses"
          subtitle="IV CSE-A & III CSE-B"
          icon={BookOpen}
          color="primary"
          badgeText="Active Term"
          badgeType="primary"
        />

        <StatCard 
          title="Students Taught"
          value="133 Students"
          subtitle="68 in Sec A • 65 in Sec B"
          icon={Users}
          color="purple"
          badgeText="Registered"
          badgeType="primary"
        />

        <StatCard 
          title="Pending Uploads"
          value="1 Sheet"
          subtitle="September 2026 Cycle"
          icon={FileSpreadsheet}
          color="accent"
          badgeText="Due this week"
          badgeType="warning"
        />

        <StatCard 
          title="Class Avg Attendance"
          value="87.2%"
          subtitle="CS711PE Web Development"
          icon={Percent}
          color="success"
          badgeText="Satisfactory"
          badgeType="success"
        />
      </div>

      {/* Two Column Layout: Today's Schedule & Recent Submissions */}
      <div className="grid-2">
        {/* Today's Schedule */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Teaching Schedule (Today)</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Assigned lecture slots & laboratory batches</p>
            </div>
            <button 
              onClick={() => setActiveTab('timetable')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              Full Timetable <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FACULTY_TIMETABLE.slice(0, 4).map((slot, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{slot.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{slot.class} • Room {slot.room}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{slot.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Status & History */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Spreadsheet Submissions</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>History of uploaded Excel / CSV files</p>
            </div>
            <button 
              onClick={() => setActiveTab('uploads')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
            >
              Upload Manager <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {uploadHistory.slice(0, 3).map((item, i) => (
              <div key={i} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
                    {item.fileName}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                    {item.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.class} • {item.subject}</span>
                  <span>{item.uploadDate}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#2563eb', marginTop: '0.3rem', fontWeight: 600 }}>
                  Audit Ref: {item.auditRef} • {item.validRows} students updated
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
