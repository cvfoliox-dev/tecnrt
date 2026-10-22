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

  const isHomePage = location.pathname === '/' || 
    location.pathname === '/index.html' || 
    location.pathname === '/index-2.html' || 
    location.pathname === '/index.php';

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* Top micro-bar: Verified College Contact Info */}
      <div style={{ background: '#0e2154', color: '#e2e8f0', fontSize: '0.78rem', padding: '0.4rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} style={{ color: '#f59e0b' }} />
              Jonnalagadda, Narasaraopet, Palnadu Dt, AP - 522601
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <PhoneCall size={13} style={{ color: '#f59e0b' }} />
              08647 - 218164, 218255
            </span>
          </div>
        </div>
      </div>

      {/* Main Branding & Institutional Accreditation Logos Bar */}
      <div 
        style={{ 
          padding: '0.65rem 1.25rem', 
          borderBottom: isHomePage ? 'none' : '1px solid #f1f5f9', 
          background: '#ffffff',
          width: '100%'
        }}
        className="tec-main-header-strip"
      >
        <div 
          className="container-fluid" 
          style={{ 
            maxWidth: '1580px',
            margin: '0 auto',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1rem'
          }}
        >
          {/* College Identity */}
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              textDecoration: 'none', 
              minWidth: 0, 
              flexShrink: 0 
            }}
          >
            <img 
              src="/college_assets/tec_crest.png" 
              alt="Tirumala Engineering College Emblem" 
              style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 900, 
                fontSize: 'clamp(0.92rem, 2vw, 1.25rem)', 
                color: '#0e2154', 
                letterSpacing: '-0.02em', 
                lineHeight: 1.15,
                whiteSpace: 'nowrap'
              }}>
                TIRUMALA ENGINEERING COLLEGE
              </div>
              <div style={{ 
                fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)', 
                color: '#64748b', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.35rem', 
                marginTop: '0.15rem',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ color: '#d97706' }}>NARASARAOPET</span>
                <span>•</span>
                <span>ESTD. 2008</span>
                <span>•</span>
                <span style={{ color: '#15803d' }}>AUTONOMOUS</span>
              </div>
            </div>
          </Link>

          {/* Four Institutional Accreditation Logos (Centered) */}
          <div 
            className="tec-header-logos-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.65rem, 1.6vw, 1.6rem)',
              justifyContent: 'center',
              flex: '1 1 auto'
            }}
          >
            {/* 1. Tirumala Recognition / NAAC A+ Plaque (Replaced with images.jpg) */}
            <img 
              src="/college_assets/logos/images.jpg" 
              alt="Tirumala Engineering College NAAC A+ Recognition" 
              style={{
                height: '46px',
                width: 'auto',
                maxWidth: '75px',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            {/* 2. NAAC Logo (Replaced with NAAC_LOGO.png) */}
            <img 
              src="/college_assets/logos/NAAC_LOGO.png" 
              alt="NAAC - National Assessment and Accreditation Council" 
              style={{
                height: '46px',
                width: 'auto',
                maxWidth: '55px',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            {/* 3. NBA Logo (Preserved) */}
            <img 
              src="/college_assets/logos/logo_nba.png" 
              alt="NBA - National Board of Accreditation" 
              style={{
                height: '40px',
                width: 'auto',
                maxWidth: '65px',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            {/* 4. ISO 9001:2015 Logo (Preserved) */}
            <img 
              src="/college_assets/logos/logo_iso.png" 
              alt="ISO 9001:2015 Certified Institution" 
              style={{
                height: '38px',
                width: 'auto',
                maxWidth: '48px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Extreme Right: Restored Portal Login & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }} className="header-actions">
            <button 
              onClick={() => handleOpenLogin('student')}
              className="btn btn-outline-primary btn-sm portal-login-btn"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                fontWeight: 700, 
                whiteSpace: 'nowrap', 
                padding: '0.45rem 0.85rem', 
                fontSize: '0.82rem',
                color: '#0e2154',
                borderColor: '#0e2154',
                borderWidth: '1.5px',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                transition: 'all 0.15s ease'
              }}
              title="Access College Management Portals"
            >
              <LogIn size={15} />
              <span className="portal-btn-label">Portal Login</span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', color: '#0a3d78', cursor: 'pointer', padding: '0.4rem' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Desktop Dropdown Navigation Bar */}
      <nav 
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 850,
          background: '#0e2154',
          borderBottom: '2px solid #f59e0b',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
        }} 
        className="desktop-navbar-strip"
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: '0.15rem' }}>
            <Link 
              to="/" 
              style={{ 
                color: location.pathname === '/' ? '#fbbf24' : '#ffffff', 
                padding: '0.45rem 0.65rem', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                textDecoration: 'none',
                background: location.pathname === '/' ? 'rgba(255,255,255,0.14)' : 'transparent',
                borderRadius: '6px',
                display: 'block',
                whiteSpace: 'nowrap',
                textShadow: isHomePage ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
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
                  onFocus={() => setOpenDropdown(menu.title)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setOpenDropdown(null);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <Link
                    to={menu.path}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    style={{
                      color: isMenuActive ? '#fbbf24' : '#ffffff',
                      padding: '0.45rem 0.55rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      background: isMenuOpen ? 'rgba(255,255,255,0.18)' : 'transparent',
                      borderRadius: '6px',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                      textShadow: isHomePage ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
                    }}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown size={11} style={{ opacity: 0.85 }} />
                  </Link>

                  {/* Dropdown Menu Container */}
                  {isMenuOpen && (
                    <div 
                      role="menu"
                      aria-label={`${menu.title} Submenu`}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: '#ffffff',
                        minWidth: '260px',
                        borderRadius: '0 0 10px 10px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0',
                        borderTop: '3px solid #f59e0b',
                        zIndex: 1000,
                        padding: '0.4rem 0'
                      }}
                    >
                      {menu.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          role="menuitem"
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
              style={{ 
                color: location.pathname === '/nirf' ? '#fbbf24' : '#ffffff', 
                padding: '0.45rem 0.55rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textDecoration: 'none',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                textShadow: isHomePage ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
              }}
            >
              NIRF
            </Link>

            <Link 
              to="/gallery" 
              style={{ 
                color: location.pathname === '/gallery' ? '#fbbf24' : '#ffffff', 
                padding: '0.45rem 0.55rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textDecoration: 'none',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                textShadow: isHomePage ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
              }}
            >
              Gallery
            </Link>

            <Link 
              to="/feedback" 
              style={{ 
                color: location.pathname === '/feedback' ? '#d4a955' : '#ffffff', 
                padding: '0.45rem 0.55rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textDecoration: 'none',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                textShadow: isHomePage ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
              }}
            >
              Feedback
            </Link>

            <Link 
              to="/contact" 
              style={{ 
                color: location.pathname === '/contact' ? '#d4a955' : '#ffffff', 
                padding: '0.45rem 0.55rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textDecoration: 'none',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                textShadow: isHomePage ? '0 1px 2px rgba(0,0,0,0.6)' : 'none'
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ 
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#ffffff', 
          borderTop: '1px solid #e2e8f0', 
          padding: '1rem', 
          maxHeight: '80vh', 
          overflowY: 'auto',
          boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0a3d78', textDecoration: 'none' }}>
              Home
            </Link>
            
            {navMenus.map((menu, mIdx) => (
              <div key={mIdx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0a3d78', padding: '0.4rem 0.5rem' }}>
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

            <Link to="/nirf" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0a3d78', textDecoration: 'none' }}>NIRF</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0a3d78', textDecoration: 'none' }}>Gallery</Link>
            <Link to="/feedback" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0a3d78', textDecoration: 'none' }}>Feedback</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem', fontWeight: 700, color: '#0a3d78', textDecoration: 'none' }}>Contact</Link>

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
        @media (max-width: 1180px) {
          .desktop-navbar-strip { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
        @media (max-width: 1040px) {
          .tec-main-header-strip { padding: 0.55rem 0.85rem !important; }
          .tec-main-header-strip .container-fluid { flex-wrap: wrap !important; }
          .tec-header-logos-container { 
            order: 3; 
            width: 100%; 
            margin-top: 0.4rem; 
            justify-content: center !important; 
          }
        }
        @media (max-width: 600px) {
          .tec-header-logos-container img {
            height: 32px !important;
          }
          .tec-header-logos-container {
            gap: 0.65rem !important;
          }
        }
        @media (max-width: 480px) {
          .portal-btn-label { display: none !important; }
          .portal-login-btn { padding: 0.4rem 0.55rem !important; }
          .tec-header-logos-container img {
            height: 26px !important;
          }
          .tec-header-logos-container {
            gap: 0.45rem !important;
          }
        }
      `}</style>
    </header>
  );
}
