import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LogIn, 
  Menu, 
  X, 
  MapPin, 
  PhoneCall, 
  ChevronDown 
} from 'lucide-react';

export default function Navbar() {
  const { setLoginModalOpen, setLoginModalRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const location = useLocation();

  const handleOpenLogin = (role = 'student') => {
    setLoginModalRole(role);
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleAccordion = (title) => {
    setOpenAccordion(prev => prev === title ? null : title);
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
    <header className="tec-site-header" style={{ position: 'sticky', top: 0, zIndex: 900, background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* 1. Desktop Top Micro-bar: Verified College Contact Info & EAPCET Badge (as in user screenshot) */}
      <div className="tec-top-contact-bar" style={{ background: '#0e2154', color: '#e2e8f0', fontSize: '0.78rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <span>Jonnalagadda, Narasaraopet, Palnadu Dt, AP - 522601</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <PhoneCall size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <span>08647 – 218164, 218255</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <span 
              style={{
                display: 'inline-block',
                backgroundColor: '#b45309',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                padding: '0.18rem 0.55rem',
                borderRadius: '4px'
              }}
            >
              EAPCET CODE: TMLN
            </span>
            <span style={{ color: '#e0f0fe', fontSize: '0.75rem', fontWeight: 600 }}>
              NAAC 'A' Grade • NBA Accredited • UGC Autonomous
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main College Branding Header */}
      <div 
        className="tec-main-header-strip"
        style={{ 
          padding: '0.65rem 0', 
          borderBottom: isHomePage ? 'none' : '1px solid #f1f5f9', 
          background: '#ffffff',
          width: '100%'
        }}
      >
        <div 
          className="container tec-branding-container"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '0.75rem'
          }}
        >
          {/* College Identity (Crest + Name) */}
          <Link 
            to="/" 
            className="tec-brand-link"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.65rem', 
              textDecoration: 'none', 
              minWidth: 0, 
              flexShrink: 1
            }}
            aria-label="Tirumala Engineering College Home"
          >
            <img 
              src="/college_assets/tec_crest.png" 
              alt="Tirumala Engineering College Emblem" 
              className="tec-brand-crest"
              style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div style={{ minWidth: 0, flexShrink: 1 }}>
              <div 
                className="tec-brand-title"
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontWeight: 900, 
                  fontSize: 'clamp(0.82rem, 1.8vw, 1.25rem)', 
                  color: '#0e2154', 
                  letterSpacing: '-0.02em', 
                  lineHeight: 1.15
                }}
              >
                TIRUMALA ENGINEERING COLLEGE
              </div>
              <div 
                className="tec-brand-subtitle"
                style={{ 
                  fontSize: 'clamp(0.6rem, 1.1vw, 0.72rem)', 
                  color: '#64748b', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  marginTop: '0.12rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: '#d97706' }}>NARASARAOPET</span>
                <span>•</span>
                <span className="tec-estd-tag">ESTD. 2008</span>
                <span className="tec-estd-tag">•</span>
                <span style={{ color: '#15803d' }}>AUTONOMOUS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Accreditation Logos (Centered) - Hidden on Mobile */}
          <div 
            className="tec-header-logos-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.6rem, 1.5vw, 1.5rem)',
              justifyContent: 'center',
              flex: '1 1 auto'
            }}
          >
            {/* 1. Tirumala Recognition / NAAC A+ Plaque */}
            <img 
              src="/college_assets/logos/images.jpg" 
              alt="NAAC A+ Recognition" 
              style={{ height: '44px', width: 'auto', maxWidth: '72px', objectFit: 'contain', display: 'block' }}
            />
            {/* 2. NAAC Logo */}
            <img 
              src="/college_assets/logos/NAAC_LOGO.png" 
              alt="NAAC" 
              style={{ height: '44px', width: 'auto', maxWidth: '52px', objectFit: 'contain', display: 'block' }}
            />
            {/* 3. NBA Logo */}
            <img 
              src="/college_assets/logos/logo_nba.png" 
              alt="NBA Accredited" 
              style={{ height: '38px', width: 'auto', maxWidth: '62px', objectFit: 'contain', display: 'block' }}
            />
            {/* 4. ISO 9001:2015 Logo */}
            <img 
              src="/college_assets/logos/logo_iso.png" 
              alt="ISO 9001:2015 Certified" 
              style={{ height: '36px', width: 'auto', maxWidth: '46px', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* Header Actions (Portal Login & Mobile Hamburger) */}
          <div 
            className="tec-header-actions"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              flexShrink: 0 
            }}
          >
            {/* Portal Login Button */}
            <button 
              onClick={() => handleOpenLogin('student')}
              className="btn btn-outline-primary portal-login-btn"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.4rem', 
                fontWeight: 700, 
                whiteSpace: 'nowrap', 
                padding: '0.45rem 0.85rem', 
                minHeight: '44px',
                fontSize: '0.82rem',
                color: '#0e2154',
                borderColor: '#0e2154',
                borderWidth: '1.5px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                transition: 'all 0.15s ease'
              }}
              title="Access College Management Portals"
              aria-label="Student & Faculty Portal Login"
            >
              <LogIn size={16} style={{ flexShrink: 0 }} />
              <span className="portal-btn-label">Portal Login</span>
              <span className="portal-btn-label-mobile">Portal</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ 
                display: 'none', 
                background: '#f8fafc', 
                border: '1.5px solid #cbd5e1', 
                borderRadius: '8px',
                color: '#0e2154', 
                cursor: 'pointer', 
                padding: '0.4rem',
                minWidth: '44px',
                minHeight: '44px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="tec-mobile-menu-drawer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Accreditation Strip (Compact 28px Bar Under Main Header - Hidden on Desktop) */}
      <div 
        className="tec-mobile-accreditation-strip" 
        aria-label="College Accreditations"
        style={{
          width: '100%',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.3rem 0.5rem',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="tec-mobile-logos-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            width: '100%',
            gap: 'clamp(0.75rem, 3.5vw, 1.5rem)'
          }}
        >
          <img 
            src="/college_assets/logos/images.jpg" 
            alt="NAAC A+ Recognition" 
            style={{ height: '22px', width: 'auto', maxWidth: '38px', objectFit: 'contain', display: 'block' }}
          />
          <img 
            src="/college_assets/logos/NAAC_LOGO.png" 
            alt="NAAC" 
            style={{ height: '22px', width: 'auto', maxWidth: '30px', objectFit: 'contain', display: 'block' }}
          />
          <img 
            src="/college_assets/logos/logo_nba.png" 
            alt="NBA Accredited" 
            style={{ height: '20px', width: 'auto', maxWidth: '38px', objectFit: 'contain', display: 'block' }}
          />
          <img 
            src="/college_assets/logos/logo_iso.png" 
            alt="ISO 9001:2015 Certified" 
            style={{ height: '20px', width: 'auto', maxWidth: '28px', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>

      {/* 4. Desktop Dropdown Navigation Bar (Full Width 1600px) */}
      <nav 
        style={{
          position: 'relative',
          width: '100%',
          zIndex: 850,
          background: 'rgba(14, 33, 84, 0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
        }} 
        className="desktop-navbar-strip"
        aria-label="Main Navigation"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: '0.15rem' }}>
            <Link 
              to="/" 
              style={{ 
                color: location.pathname === '/' ? '#fbbf24' : '#ffffff', 
                padding: '0.45rem 0.65rem', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                textDecoration: 'none',
                background: 'transparent',
                borderRadius: '6px',
                display: 'block',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease'
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
                      background: 'transparent',
                      borderRadius: '6px',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap'
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
                background: 'transparent',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease'
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
                background: 'transparent',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease'
              }}
            >
              Gallery
            </Link>

            <Link 
              to="/feedback" 
              style={{ 
                color: location.pathname === '/feedback' ? '#fbbf24' : '#ffffff', 
                padding: '0.45rem 0.55rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textDecoration: 'none',
                background: 'transparent',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease'
              }}
            >
              Feedback
            </Link>

            <Link 
              to="/contact" 
              style={{ 
                color: location.pathname === '/contact' ? '#fbbf24' : '#ffffff', 
                padding: '0.45rem 0.55rem', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textDecoration: 'none',
                background: 'transparent',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease'
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* 5. Mobile Drawer Backdrop Scrim */}
      {mobileMenuOpen && (
        <div 
          className="tec-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 6. Polished Accessible Mobile Navigation Drawer */}
      <div 
        id="tec-mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`tec-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
      >
        <div className="tec-mobile-drawer-content">
          {/* Quick Header Inside Drawer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0e2154', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Navigation Menu
            </span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', padding: '0.25rem', color: '#64748b', cursor: 'pointer', display: 'flex' }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`tec-mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            
            {/* Accordion Submenus */}
            {navMenus.map((menu, mIdx) => {
              const isAccordionOpen = openAccordion === menu.title;
              const isMenuActive = location.pathname.startsWith(menu.path.split('/')[1] ? `/${menu.path.split('/')[1]}` : '---');

              return (
                <div key={mIdx} className="tec-mobile-accordion-group">
                  <button 
                    onClick={() => toggleAccordion(menu.title)}
                    className={`tec-mobile-accordion-btn ${isMenuActive ? 'active' : ''}`}
                    aria-expanded={isAccordionOpen}
                    aria-controls={`sub-${mIdx}`}
                  >
                    <span>{menu.title}</span>
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: '#64748b'
                      }} 
                    />
                  </button>

                  {isAccordionOpen && (
                    <div id={`sub-${mIdx}`} className="tec-mobile-accordion-panel">
                      {menu.dropdown.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`tec-mobile-sublink ${location.pathname === sub.path ? 'active' : ''}`}
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
              onClick={() => setMobileMenuOpen(false)} 
              className={`tec-mobile-nav-link ${location.pathname === '/nirf' ? 'active' : ''}`}
            >
              NIRF
            </Link>
            <Link 
              to="/gallery" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`tec-mobile-nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
            >
              Gallery
            </Link>
            <Link 
              to="/feedback" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`tec-mobile-nav-link ${location.pathname === '/feedback' ? 'active' : ''}`}
            >
              Feedback
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`tec-mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>

            {/* Portal CTA at Drawer Base */}
            <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => handleOpenLogin('student')}
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  fontSize: '0.88rem', 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogIn size={16} /> Open College Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop vs Mobile Toggle Points */
        .portal-btn-label-mobile { display: none; }
        .tec-mobile-accreditation-strip { display: none; }
        .tec-mobile-drawer { display: none; }
        .tec-mobile-backdrop { display: none; }

        @media (min-width: 1181px) {
          .desktop-navbar-strip { display: block !important; }
          .mobile-nav-toggle { display: none !important; }
        }

        .desktop-navbar-strip a {
          background: transparent !important;
          transition: color 0.15s ease !important;
        }
        .desktop-navbar-strip a:hover {
          background: transparent !important;
          color: #fbbf24 !important;
        }

        @media (min-width: 993px) {
          .tec-branding-container {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .tec-brand-link {
            flex-shrink: 0 !important;
          }
          .tec-header-logos-desktop {
            display: none !important;
          }
          .tec-header-actions {
            flex-shrink: 0 !important;
          }
        }

        @media (max-width: 1180px) {
          .desktop-navbar-strip { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }

        /* Mobile Header Optimization (<= 992px) */
        @media (max-width: 992px) {
          .tec-top-contact-bar {
            display: none !important;
          }
          .tec-main-header-strip {
            padding: 0.35rem 0 !important;
          }
          .tec-branding-container {
            padding-left: clamp(0.5rem, 2.5vw, 0.85rem) !important;
            padding-right: clamp(0.5rem, 2.5vw, 0.85rem) !important;
            gap: 0.35rem !important;
          }
          .tec-brand-link {
            min-width: 0 !important;
            flex: 1 1 auto !important;
            overflow: hidden !important;
            gap: 0.45rem !important;
          }
          .tec-brand-crest {
            width: 34px !important;
            height: 34px !important;
            flex-shrink: 0 !important;
          }
          .tec-brand-title {
            font-size: clamp(0.72rem, 3.2vw, 0.92rem) !important;
            line-height: 1.15 !important;
            white-space: normal !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .tec-brand-subtitle {
            font-size: clamp(0.52rem, 2.2vw, 0.65rem) !important;
            margin-top: 0.1rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            gap: 0.2rem !important;
            max-width: 100% !important;
          }
          .tec-header-logos-desktop {
            display: none !important;
          }
          .tec-header-actions {
            display: flex !important;
            align-items: center !important;
            gap: 0.35rem !important;
            flex-shrink: 0 !important;
          }
          .portal-btn-label { display: none !important; }
          .portal-btn-label-mobile { display: inline !important; }
          .tec-estd-tag { display: none !important; }
          .portal-login-btn {
            padding: 0.35rem 0.55rem !important;
            min-height: 38px !important;
            font-size: 0.76rem !important;
            gap: 0.25rem !important;
            border-radius: 6px !important;
            flex-shrink: 0 !important;
          }
          .mobile-nav-toggle {
            min-width: 38px !important;
            min-height: 38px !important;
            padding: 0.3rem !important;
            border-radius: 6px !important;
            flex-shrink: 0 !important;
          }
          .tec-mobile-accreditation-strip {
            display: flex !important;
            align-items: center;
            justifyContent: center;
            background: #f8fafc;
            border-top: 1px solid #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            padding: 0.18rem 0.4rem !important;
            min-height: 24px !important;
            width: 100%;
            box-sizing: border-box !important;
          }
          .tec-mobile-logos-track {
            display: flex;
            align-items: center;
            justifyContent: center;
            gap: clamp(0.6rem, 3.5vw, 1.25rem) !important;
            width: 100%;
          }
          .tec-mobile-logos-track img {
            height: 18px !important;
            max-width: 32px !important;
            object-fit: contain !important;
          }
        }

        @media (max-width: 370px) {
          .portal-btn-label-mobile { display: none !important; }
          .portal-login-btn {
            padding: 0.35rem !important;
            min-width: 36px !important;
            justify-content: center !important;
          }
          .mobile-nav-toggle {
            min-width: 36px !important;
            min-height: 36px !important;
          }
          .tec-brand-crest {
            width: 30px !important;
            height: 30px !important;
          }
          .tec-brand-title {
            font-size: 0.72rem !important;
          }
          .tec-brand-subtitle {
            font-size: 0.52rem !important;
          }
        }

        /* Mobile Drawer & Backdrop */
        .tec-mobile-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 29, 59, 0.45);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          z-index: 998;
          display: block;
          animation: tecBackdropFade 0.2s ease-out forwards;
        }

        .tec-mobile-drawer {
          display: block;
          position: fixed;
          top: 0;
          right: 0;
          width: min(340px, 86vw);
          height: 100vh;
          background: #ffffff;
          z-index: 999;
          box-shadow: -4px 0 25px rgba(0, 0, 0, 0.18);
          transform: translateX(100%);
          visibility: hidden;
          pointer-events: none;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.24s;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .tec-mobile-drawer.is-open {
          transform: translateX(0);
          visibility: visible;
          pointer-events: auto;
        }

        .tec-mobile-drawer-content {
          padding: 1.25rem 1rem 2rem 1rem;
          display: flex;
          flex-direction: column;
          min-height: 100%;
        }

        .tec-mobile-nav-link {
          display: block;
          padding: 0.65rem 0.75rem;
          font-weight: 700;
          font-size: 0.88rem;
          color: #0e2154;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.15s ease;
        }
        .tec-mobile-nav-link:hover, .tec-mobile-nav-link.active {
          background: #f1f5f9;
          color: #2563eb;
        }

        .tec-mobile-nav-link:focus-visible,
        .tec-mobile-accordion-btn:focus-visible,
        .tec-mobile-sublink:focus-visible,
        .mobile-nav-toggle:focus-visible,
        .portal-login-btn:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        .tec-mobile-accordion-group {
          border-bottom: 1px solid #f1f5f9;
        }

        .tec-mobile-accordion-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.75rem;
          font-weight: 700;
          font-size: 0.88rem;
          color: #0e2154;
          background: transparent;
          border: none;
          border-radius: 6px;
          text-align: left;
          cursor: pointer;
        }
        .tec-mobile-accordion-btn:hover, .tec-mobile-accordion-btn.active {
          background: #f8fafc;
        }

        .tec-mobile-accordion-panel {
          padding: 0.25rem 0 0.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          background: #fbfbfd;
          border-radius: 6px;
          margin-bottom: 0.35rem;
        }

        .tec-mobile-sublink {
          display: block;
          padding: 0.45rem 0.6rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 4px;
        }
        .tec-mobile-sublink:hover, .tec-mobile-sublink.active {
          color: #0e2154;
          font-weight: 700;
          background: #e2e8f0;
        }

        @keyframes tecBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tec-mobile-drawer {
            transition: none !important;
          }
          .tec-mobile-backdrop {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  );
}
