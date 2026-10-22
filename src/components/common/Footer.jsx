import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../../data/collegeAuditData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const { departments } = COLLEGE_AUDIT_DATA;

  return (
    <footer 
      className="tec-main-footer"
      style={{ 
        backgroundColor: '#051d3b', 
        color: '#cbd5e1', 
        paddingTop: '4rem', 
        paddingBottom: '2rem', 
        borderTop: '4px solid #f59e0b',
        position: 'relative',
        width: '100%',
        overflowX: 'hidden'
      }}
      aria-label="Website Footer"
    >
      <div className="container">
        
        {/* 4-Column Balanced Grid */}
        <div className="tec-footer-grid">
          
          {/* Column 1: College Identity & Overview */}
          <div className="tec-footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.15rem' }}>
              <img 
                src="/college_assets/tec_crest.png" 
                alt="Tirumala Engineering College Crest" 
                style={{ 
                  width: '46px', 
                  height: '46px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }} 
              />
              <div>
                <div style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontWeight: 900, 
                  fontSize: '1.05rem', 
                  color: '#ffffff', 
                  letterSpacing: '0.04em',
                  lineHeight: 1.15
                }}>
                  TIRUMALA
                </div>
                <div style={{ 
                  fontSize: '0.74rem', 
                  color: '#f59e0b', 
                  fontWeight: 800, 
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  ENGINEERING COLLEGE
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
                  NARASARAOPET • AUTONOMOUS
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Established in 2008 by the founders of Tirumala Milk Products Pvt. Ltd. under Venkata Ramana Charitable Trust. An autonomous institution committed to technical excellence and rural youth empowerment.
            </p>

            {/* EAMCET Code & Status Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.45rem', 
                  backgroundColor: 'rgba(245, 158, 11, 0.15)', 
                  border: '1px solid rgba(245, 158, 11, 0.45)', 
                  padding: '0.4rem 0.75rem', 
                  borderRadius: '6px', 
                  width: 'fit-content' 
                }}
              >
                <Award size={14} style={{ color: '#fbbf24' }} />
                <span style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 800, letterSpacing: '0.04em' }}>
                  EAPCET / EAMCET CODE: TMLN
                </span>
              </div>

              <div style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <span style={{ color: '#fbbf24', fontWeight: 700 }}>Autonomous</span> • NAAC 'A+' Grade • NBA Accredited • ISO 9001:2015
              </div>
            </div>
          </div>

          {/* Column 2: Academic B.Tech Departments */}
          <div className="tec-footer-col">
            <h4 className="tec-footer-heading">
              B.Tech Departments
            </h4>
            <ul className="tec-footer-links">
              {departments.map((dept) => (
                <li key={dept.code}>
                  <Link 
                    to={`/departments/${dept.code}`} 
                    className="tec-footer-link"
                  >
                    <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <span>{dept.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation Links */}
          <div className="tec-footer-col">
            <h4 className="tec-footer-heading">
              Quick Links
            </h4>
            <ul className="tec-footer-links">
              <li>
                <Link to="/about/society" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Society & Founders</span>
                </Link>
              </li>
              <li>
                <Link to="/admissions/procedure" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Admissions 2026</span>
                </Link>
              </li>
              <li>
                <Link to="/academics/scholarships" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>₹60L Merit Scholarships</span>
                </Link>
              </li>
              <li>
                <Link to="/placements/statistics" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Placement Statistics</span>
                </Link>
              </li>
              <li>
                <Link to="/examination/notifications" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Exam Cell Notifications</span>
                </Link>
              </li>
              <li>
                <Link to="/amenities/library" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Central Library (Bee-Hive)</span>
                </Link>
              </li>
              <li>
                <Link to="/iqac/about" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>IQAC & Accreditations</span>
                </Link>
              </li>
              <li>
                <Link to="/nirf" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>NIRF Disclosures</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Campus Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="tec-footer-link">
                  <ChevronRight size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>Stakeholder Feedback</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campus Location */}
          <div className="tec-footer-col">
            <h4 className="tec-footer-heading">
              Contact & Location
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
              {/* Campus Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                <MapPin size={16} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ color: '#cbd5e1', lineHeight: 1.55 }}>
                  Jonnalagadda (V), Narasaraopet (M), Palnadu District, Andhra Pradesh - 522601
                </span>
              </div>

              {/* Direct Phone Numbers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Phone size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <a 
                  href="tel:08647218164" 
                  style={{ color: '#cbd5e1', textDecoration: 'none' }}
                  className="tec-footer-contact-link"
                >
                  08647 - 218164, 218255
                </a>
              </div>

              {/* Verified Emails */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                <Mail size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '3px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <a 
                    href="mailto:tecnrt@gmail.com" 
                    style={{ color: '#cbd5e1', textDecoration: 'none' }}
                    className="tec-footer-contact-link"
                  >
                    tecnrt@gmail.com
                  </a>
                  <a 
                    href="mailto:principal@tecnrt.org" 
                    style={{ color: '#cbd5e1', textDecoration: 'none' }}
                    className="tec-footer-contact-link"
                  >
                    principal@tecnrt.org
                  </a>
                </div>
              </div>

              {/* Anti-Ragging Helpline */}
              <div 
                style={{ 
                  marginTop: '0.35rem',
                  padding: '0.65rem 0.85rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.04)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d4a955', fontWeight: 700, fontSize: '0.78rem' }}>
                  <ShieldCheck size={14} />
                  <span>Anti-Ragging Helpline</span>
                </div>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.88rem', marginTop: '0.2rem' }}>
                  +91 99897 06744
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                <Clock size={13} />
                <span>Mon – Sat: 9:00 AM – 4:45 PM</span>
              </div>

              {/* Direct Link to Contact Page */}
              <div style={{ marginTop: '0.4rem' }}>
                <Link 
                  to="/contact" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.35rem', 
                    color: '#d4a955', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    textDecoration: 'none' 
                  }}
                  className="tec-footer-contact-link"
                >
                  <span>View Route Map & Transport Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Statutory Details */}
        <div 
          style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            marginTop: '3.5rem', 
            paddingTop: '1.75rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            fontSize: '0.8rem', 
            color: '#94a3b8' 
          }}
        >
          <div>
            © {new Date().getFullYear()} Tirumala Engineering College, Narasaraopet. All rights reserved.
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
            Permanently Affiliated to JNTUK • Approved by AICTE • UGC Autonomous • NAAC 'A+' Grade
          </div>
        </div>

      </div>

      {/* Scoped CSS for Footer Links & Responsive Layout */}
      <style>{`
        .tec-footer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1fr 1.25fr;
          gap: 2.5rem;
          margin-bottom: 1rem;
        }

        .tec-footer-col {
          display: flex;
          flex-direction: column;
        }

        .tec-footer-heading {
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          margin: 0 0 1.25rem 0;
          border-left: 3px solid #f59e0b;
          padding-left: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .tec-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.85rem;
        }

        .tec-footer-link {
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .tec-footer-link:hover {
          color: #fbbf24 !important;
          transform: translateX(3px);
        }

        .tec-footer-contact-link:hover {
          color: #fbbf24 !important;
          text-decoration: underline !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .tec-footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.25rem !important;
          }
        }

        @media (max-width: 640px) {
          .tec-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
