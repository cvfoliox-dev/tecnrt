import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  LogIn, 
  Menu, 
  X, 
  Award, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  PhoneCall, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const { setLoginModalOpen, setLoginModalRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const handleOpenLogin = (role = 'student') => {
    setLoginModalRole(role);
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navMenus = [
    {
      title: "About TEC",
      path: "/about/society",
      dropdown: [
        { label: "Society & Founders", path: "/about/society" },
        { label: "Management's Message", path: "/about/management" },
        { label: "College Advisory Board", path: "/about/advisory" },
        { label: "Principal's Desk & Message", path: "/about/principal" },
        { label: "Why TEC? (Uniqueness)", path: "/about/why-tec" },
        { label: "Leadership & Key Persons", path: "/about/key-persons" },
        { label: "Best Practices & Hallmarks", path: "/about/best-practices" },
        { label: "MOUs & Collaborations", path: "/about/mous" },
        { label: "SWOT & Strengths", path: "/about/strengths" },
        { label: "Premier Persons Visited", path: "/about/visitors" },
        { label: "Safety & Discipline Policy", path: "/about/safety" },
        { label: "Campus Facilities Overview", path: "/about/facilities" }
      ]
    },
    {
      title: "Administration",
      path: "/administration/governing",
      dropdown: [
        { label: "Governing Body", path: "/administration/governing" },
        { label: "Administrative Manual", path: "/administration/manual" },
        { label: "Nodal Officer & RTI Act", path: "/administration/nodal-officer" },
        { label: "Institutional Committees", path: "/administration/committees" },
        { label: "Statutory & Welfare Cells", path: "/administration/cells" },
        { label: "Research & Development (R&D)", path: "/administration/rd-centre" },
        { label: "Industry Interaction Cell (IIIC)", path: "/administration/industry-cell" }
      ]
    },
    {
      title: "Admissions",
      path: "/admissions/procedure",
      dropdown: [
        { label: "Admission Procedure & Quotas", path: "/admissions/procedure" },
        { label: "Courses Offered & Intake", path: "/admissions/courses" },
        { label: "Approved Student Lists", path: "/admissions/student-lists" },
        { label: "Intake & Fee Structure", path: "/admissions/fee-details" },
        { label: "Contact Admissions Helpdesk", path: "/admissions/contact" }
      ]
    },
    {
      title: "Academics",
      path: "/academics/calendar",
      dropdown: [
        { label: "Academic Calendars", path: "/academics/calendar" },
        { label: "Curriculum & Syllabus (R23/R20)", path: "/academics/syllabus" },
        { label: "Founders Merit Scholarship (₹60L)", path: "/academics/scholarships" },
        { label: "Financial Aid & JVD Schemes", path: "/academics/financial-aid" },
        { label: "Curricular Planning & Quality", path: "/academics/curriculum" }
      ]
    },
    {
      title: "Departments",
      path: "/departments/cse",
      dropdown: [
        { label: "Computer Science & Engg (CSE)", path: "/departments/cse" },
        { label: "CSE - AI & ML (AIML)", path: "/departments/aiml" },
        { label: "Electronics & Communication (ECE)", path: "/departments/ece" },
        { label: "Electrical & Electronics (EEE)", path: "/departments/eee" },
        { label: "Mechanical Engineering (MECH)", path: "/departments/mech" },
        { label: "Civil Engineering (CIVIL)", path: "/departments/civil" },
        { label: "Information Technology (IT)", path: "/departments/it" },
        { label: "Applied Science & Humanities (AS&H)", path: "/departments/ash" }
      ]
    },
    {
      title: "Exam Cell",
      path: "/examination/notifications",
      dropdown: [
        { label: "Notifications & Schedules", path: "/examination/notifications" },
        { label: "JNTUK Exam Calendar", path: "/examination/calendar" },
        { label: "Results & Autonomous Portal", path: "/examination/results" }
      ]
    },
    {
      title: "Placements",
      path: "/placements/overview",
      dropdown: [
        { label: "About T&P Cell", path: "/placements/overview" },
        { label: "Placement Officers & Team", path: "/placements/team" },
        { label: "Training & CRT Activities", path: "/placements/training" },
        { label: "Year-on-Year Statistics", path: "/placements/statistics" },
        { label: "Our Premier Recruiters", path: "/placements/recruiters" },
        { label: "Placement Gallery", path: "/placements/gallery" },
        { label: "Student Testimonials", path: "/placements/testimonials" },
        { label: "T&P Infrastructure", path: "/placements/infrastructure" },
        { label: "Contact Placement Cell", path: "/placements/contact" }
      ]
    },
    {
      title: "IQAC",
      path: "/iqac/about",
      dropdown: [
        { label: "About IQAC & Objectives", path: "/iqac/about" },
        { label: "IQAC Members & Coordinator", path: "/iqac/members" },
        { label: "Minutes of Meeting & AQAR", path: "/iqac/minutes" },
        { label: "NAAC 'A' Grade & NBA", path: "/iqac/naac" },
        { label: "AICTE Approvals (EOA)", path: "/iqac/aicte" },
        { label: "Autonomous Status & UGC 12(B)", path: "/iqac/autonomous" }
      ]
    },
    {
      title: "Amenities",
      path: "/amenities/library",
      dropdown: [
        { label: "Central Library (Bee-Hive)", path: "/amenities/library" },
        { label: "Campus Hostels (Boys & Girls)", path: "/amenities/hostel" },
        { label: "Transport & Bus Routes", path: "/amenities/transport" },
        { label: "Applied Robot Control (ARC) Lab", path: "/amenities/robotics" },
        { label: "Central Computing & Core Labs", path: "/amenities/labs" },
        { label: "Physical Education & Sports", path: "/amenities/sports" },
        { label: "National Service Scheme (NSS)", path: "/amenities/nss" },
        { label: "APSSDC Skill Centre", path: "/amenities/apssdc" },
        { label: "Prayaga Annual Fests", path: "/amenities/fests" },
        { label: "Alumni Association", path: "/amenities/alumni" }
      ]
    }
  ];

  return (
    <header style={{ position: 'sticky', top: '38px', zIndex: 900, background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* Top micro-bar */}
      <div style={{ background: '#0e2154', color: '#e2e8f0', fontSize: '0.76rem', padding: '0.35rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={12} style={{ color: '#f59e0b' }} />
              Jonnalagadda, Narasaraopet, Palnadu Dt, AP - 522601
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <PhoneCall size={12} style={{ color: '#f59e0b' }} />
              08647 - 218164, 218255
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
              EAPCET CODE: TMLN
            </span>
            <span style={{ color: '#93c5fd' }}>
              NAAC 'A' Grade • NBA Accredited • UGC Autonomous
            </span>
          </div>
        </div>
      </div>

      {/* Main Branding Header Bar */}
      <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#ffffff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* College Identity */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <div style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, #0e2154 0%, #1d4ed8 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(14,33,84,0.3)',
              border: '2px solid #f59e0b'
            }}>
              <GraduationCap size={26} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.25rem', color: '#0e2154', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                TIRUMALA ENGINEERING COLLEGE
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                <span style={{ color: '#d97706' }}>NARASARAOPET</span>
                <span>•</span>
                <span>ESTD. 2008</span>
                <span>•</span>
                <span style={{ color: '#16a34a' }}>AUTONOMOUS</span>
              </div>
            </div>
          </Link>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="header-actions">
            <Link to="/admissions/procedure" className="btn btn-accent btn-sm" style={{ fontWeight: 800 }}>
              Admissions 2026
            </Link>

            <button 
              onClick={() => handleOpenLogin('student')}
              className="btn btn-outline-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <LogIn size={14} />
              Portal Login
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', color: '#0e2154', cursor: 'pointer', padding: '0.4rem' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Dropdown Navigation Bar */}
      <nav style={{ background: '#0e2154', borderBottom: '2px solid #f59e0b' }} className="desktop-navbar-strip">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/" 
              style={{ 
                color: location.pathname === '/' ? '#fbbf24' : '#ffffff', 
                padding: '0.65rem 1rem', 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                textDecoration: 'none',
                background: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
                display: 'block'
              }}
            >
              Home
            </Link>

            {navMenus.map((menu, idx) => {
              const isMenuOpen = openDropdown === menu.title;
              const isMenuActive = location.pathname.startsWith(menu.path.split('/')[1] ? `/${menu.path.split('/')[1]}` : '---');

              return (
                <div 
                  key={idx} 
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDropdown(menu.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={menu.path}
                    style={{
                      color: isMenuActive ? '#fbbf24' : '#ffffff',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      background: isMenuOpen ? 'rgba(255,255,255,0.12)' : 'transparent',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown size={12} style={{ opacity: 0.8 }} />
                  </Link>

                  {/* Dropdown Menu Container */}
                  {isMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#ffffff',
                      minWidth: '260px',
                      borderRadius: '0 0 10px 10px',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                      border: '1px solid #e2e8f0',
                      borderTop: '3px solid #f59e0b',
                      zIndex: 1000,
                      padding: '0.5rem 0'
                    }}>
                      {menu.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          onClick={() => setOpenDropdown(null)}
                          style={{
                            display: 'block',
                            padding: '0.55rem 1.15rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#334155',
                            textDecoration: 'none',
                            transition: 'all 0.1s ease',
                            borderBottom: sIdx === menu.dropdown.length - 1 ? 'none' : '1px solid #f8fafc'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#f1f5f9';
                            e.target.style.color = '#0e2154';
                            e.target.style.paddingLeft = '1.35rem';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#334155';
                            e.target.style.paddingLeft = '1.15rem';
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link 
              to="/nirf" 
              style={{ color: location.pathname === '/nirf' ? '#fbbf24' : '#ffffff', padding: '0.65rem 0.85rem', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
            >
              NIRF
            </Link>

            <Link 
              to="/gallery" 
              style={{ color: location.pathname === '/gallery' ? '#fbbf24' : '#ffffff', padding: '0.65rem 0.85rem', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
            >
              Gallery
            </Link>

            <Link 
              to="/feedback" 
              style={{ color: location.pathname === '/feedback' ? '#fbbf24' : '#ffffff', padding: '0.65rem 0.85rem', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
            >
              Feedback
            </Link>

            <Link 
              to="/contact" 
              style={{ color: location.pathname === '/contact' ? '#fbbf24' : '#ffffff', padding: '0.65rem 0.85rem', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '1rem', maxHeight: '80vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0e2154', textDecoration: 'none' }}>
              Home
            </Link>
            
            {navMenus.map((menu, mIdx) => (
              <div key={mIdx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0e2154', padding: '0.4rem 0.5rem' }}>
                  {menu.title}
                </div>
                <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {menu.dropdown.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ padding: '0.35rem 0', fontSize: '0.8rem', color: '#475569', textDecoration: 'none' }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link to="/nirf" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0e2154', textDecoration: 'none' }}>NIRF</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0e2154', textDecoration: 'none' }}>Gallery</Link>
            <Link to="/feedback" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0e2154', textDecoration: 'none' }}>Feedback</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0e2154', textDecoration: 'none' }}>Contact</Link>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => handleOpenLogin('student')}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <LogIn size={16} /> Open College Portal
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-navbar-strip { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
