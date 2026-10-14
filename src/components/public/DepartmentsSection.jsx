import React, { useState } from 'react';
import { DEPARTMENTS } from '../../data/mockData';
import { 
  Cpu, 
  Binary, 
  Database, 
  Network, 
  Radio, 
  Zap, 
  Cog, 
  Building, 
  BookOpen, 
  ArrowRight, 
  Users, 
  FlaskConical, 
  X, 
  CheckCircle2,
  Mail 
} from 'lucide-react';

export default function DepartmentsSection() {
  const [selectedDept, setSelectedDept] = useState(null);

  const getDeptIcon = (id) => {
    switch (id) {
      case 'CSE': return <Cpu size={26} />;
      case 'AIML': return <Binary size={26} />;
      case 'AIDS': return <Database size={26} />;
      case 'IT': return <Network size={26} />;
      case 'ECE': return <Radio size={26} />;
      case 'EEE': return <Zap size={26} />;
      case 'MECH': return <Cog size={26} />;
      case 'CIVIL': return <Building size={26} />;
      case 'ASH': return <FlaskConical size={26} />;
      default: return <BookOpen size={26} />;
    }
  };

  return (
    <section id="departments" style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1d4ed8', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <Cpu size={16} />
            Academic Programs & Departments
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0e2154', marginBottom: '1rem' }}>
            Undergraduate & Foundation Branches
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>
            Tirumala Engineering College offers AICTE-approved B.Tech programs affiliated with JNTUK Kakinada, equipped with specialized domain laboratories and industry certification tracks.
          </p>
        </div>

        {/* Department Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {DEPARTMENTS.map(dept => (
            <div 
              key={dept.id} 
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => setSelectedDept(dept)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '12px', 
                    background: '#eff6ff', 
                    color: '#1d4ed8', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid #bfdbfe'
                  }}>
                    {getDeptIcon(dept.id)}
                  </div>
                  <span className="badge badge-primary">
                    Code: {dept.code}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {dept.name}
                </h3>

                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {dept.description}
                </p>

                {/* Key stats pill row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    Intake: <strong>{dept.intake || 'N/A'}</strong>
                  </span>
                  <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    Labs: <strong>{dept.labsCount}</strong>
                  </span>
                  <span style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    HOD: <strong>{dept.hod}</strong>
                  </span>
                </div>

                {/* Specializations pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {dept.specializations.map((spec, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#2563eb', fontSize: '0.82rem', fontWeight: 600 }}>
                <span>View Labs & Curriculum</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-dialog-large">
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                  {getDeptIcon(selectedDept.id)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>{selectedDept.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
                    Department Code: {selectedDept.code} • Established: {selectedDept.establishedYear}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedDept(null)} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.75rem' }}>
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedDept.description}
              </p>

              {/* Metrics Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1d4ed8' }}>{selectedDept.intake || 'Foundation'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Approved Annual Intake</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{selectedDept.studentsCount}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Enrolled Students</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{selectedDept.facultyCount}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Faculty Strength</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706' }}>{selectedDept.labsCount}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Dedicated Labs</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7e22ce' }}>{selectedDept.avgAttendance}%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Dept Avg Attendance</div>
                </div>
              </div>

              {/* HOD Information */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 700 }}>
                  Head of the Department
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e3a8a' }}>{selectedDept.hod}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Professor & HOD, {selectedDept.name}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', fontSize: '0.8rem' }}>
                    <Mail size={14} />
                    <span>{selectedDept.hodEmail}</span>
                  </div>
                </div>
              </div>

              {/* Specializations and Key Laboratories */}
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem', fontWeight: 700 }}>
                  Key Specializations & Industry Focus
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {selectedDept.specializations.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                      <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedDept(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
