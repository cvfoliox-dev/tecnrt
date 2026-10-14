import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../../data/collegeAuditData';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  ExternalLink,
  PhoneCall,
  Clock
} from 'lucide-react';

export default function Footer() {
  const { quickSwitchRole } = useAuth();
  const { institution, departments } = COLLEGE_AUDIT_DATA;

  return (
    <footer style={{ background: '#09142b', color: '#cbd5e1', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '4px solid #f59e0b' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
          {/* Col 1: College Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '10px', 
                background: '#1d4ed8', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#ffffff',
                border: '1.5px solid #f59e0b'
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  TIRUMALA
                </div>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>
                  ENGINEERING COLLEGE
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Established in 2008 by the founders of Tirumala Milk Products Pvt. Ltd. under Venkata Ramana Charitable Trust. An autonomous institution committed to rural empowerment.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                <span>Jonnalagadda (V), Narasaraopet (M), Palnadu District, AP - 522601</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>08647 - 218164, 218255</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <span>tecnrt@gmail.com / principal@tecnrt.org</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Departments */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.25rem', borderLeft: '3px solid #f59e0b', paddingLeft: '0.5rem', textTransform: 'uppercase' }}>
              B.Tech Departments
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              {departments.map(dept => (
                <li key={dept.code}>
                  <Link to={`/departments/${dept.code}`} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                    <ChevronRight size={13} style={{ color: '#3b82f6' }} />
                    <span>{dept.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.25rem', borderLeft: '3px solid #f59e0b', paddingLeft: '0.5rem', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li>
                <Link to="/about/society" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>Society & Founders</span>
                </Link>
              </li>
              <li>
                <Link to="/admissions/procedure" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>Admissions 2026</span>
                </Link>
              </li>
              <li>
                <Link to="/academics/scholarships" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>₹60L Founders Scholarship</span>
                </Link>
              </li>
              <li>
                <Link to="/placements/statistics" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>Placement Statistics</span>
                </Link>
              </li>
              <li>
                <Link to="/examination/notifications" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>Examcell Notifications</span>
                </Link>
              </li>
              <li>
                <Link to="/amenities/library" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>Central Library (Bee-Hive)</span>
                </Link>
              </li>
              <li>
                <Link to="/iqac/naac" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>NAAC 'A' & NBA Approvals</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronRight size={13} style={{ color: '#f59e0b' }} />
                  <span>Stakeholder Feedback</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Helplines */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.25rem', borderLeft: '3px solid #f59e0b', paddingLeft: '0.5rem', textTransform: 'uppercase' }}>
              Campus Portals (PRD)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button 
                onClick={() => quickSwitchRole('student')}
                style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem' }}>Student Portal</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Attendance, exams & fee payments</div>
              </button>

              <button 
                onClick={() => quickSwitchRole('faculty')}
                style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem' }}>Faculty Portal</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Spreadsheet validator & attendance</div>
              </button>

              <button 
                onClick={() => quickSwitchRole('hod')}
                style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem' }}>HOD Management</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Dept roster & attendance audit</div>
              </button>

              <button 
                onClick={() => quickSwitchRole('principal')}
                style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
              >
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem' }}>Principal Suite</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>College-wide audit trail & metrics</div>
              </button>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.78rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: 800 }}>EAMCET CODE: TMLN</div>
              <div style={{ color: '#cbd5e1', marginTop: '0.2rem' }}>Anti-Ragging Helpline: 9989706744</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#64748b' }}>
          <div>
            © {new Date().getFullYear()} Tirumala Engineering College, Narasaraopet. All rights reserved.
            <span style={{ marginLeft: '0.8rem', color: '#f59e0b' }}>Last Updated on 26-11-2025</span>
          </div>
          <div>
            Permanently Affiliated to JNTUK • AICTE Approved • Autonomous • NAAC 'A' Grade
          </div>
        </div>
      </div>
    </footer>
  );
}
