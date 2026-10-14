import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { 
  Library, 
  Home, 
  Bus, 
  Cpu, 
  Layers, 
  Activity, 
  Heart, 
  Sparkles, 
  Users, 
  Download,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';

export default function AmenitiesPages() {
  const location = useLocation();
  const path = location.pathname;

  let currentSection = 'library';
  if (path.includes('hostel')) currentSection = 'hostel';
  else if (path.includes('transport')) currentSection = 'transport';
  else if (path.includes('robotics') || path.includes('arc')) currentSection = 'robotics';
  else if (path.includes('labs')) currentSection = 'labs';
  else if (path.includes('sports') || path.includes('ped')) currentSection = 'sports';
  else if (path.includes('nss')) currentSection = 'nss';
  else if (path.includes('apssdc')) currentSection = 'apssdc';
  else if (path.includes('fests') || path.includes('prayaga')) currentSection = 'fests';
  else if (path.includes('alumni') || path.includes('alumini')) currentSection = 'alumni';

  const { amenities } = COLLEGE_AUDIT_DATA;

  const navItems = [
    { id: 'library', label: 'Central Library (Bee-Hive)', path: '/amenities/library' },
    { id: 'hostel', label: 'Campus Hostels (Boys & Girls)', path: '/amenities/hostel' },
    { id: 'transport', label: 'Transport & Fleet Routes', path: '/amenities/transport' },
    { id: 'robotics', label: 'Applied Robot Control (ARC) Lab', path: '/amenities/robotics' },
    { id: 'labs', label: 'Central Computer & Core Labs', path: '/amenities/labs' },
    { id: 'sports', label: 'Physical Education & Sports', path: '/amenities/sports' },
    { id: 'nss', label: 'National Service Scheme (NSS)', path: '/amenities/nss' },
    { id: 'apssdc', label: 'APSSDC Skill Centre', path: '/amenities/apssdc' },
    { id: 'fests', label: 'Prayaga National Fests', path: '/amenities/fests' },
    { id: 'alumni', label: 'Alumni Association', path: '/amenities/alumni' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Campus Amenities</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Campus Amenities & Student Life
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            16-acre vibrant green ecosystem providing premier infrastructure, recreation, library resources, and holistic development.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }} className="amenities-layout-grid">
          {/* Subnav Sidebar */}
          <aside style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            height: 'fit-content',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0e2154', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.5rem 0.75rem', borderBottom: '1px solid #f1f5f9', marginBottom: '0.5rem' }}>
              Amenities Submenu
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    style={{
                      display: 'block',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#0e2154' : '#475569',
                      background: isActive ? '#eff6ff' : 'transparent',
                      borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
                      textDecoration: 'none'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>CAMPUS AREA</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0e2154' }}>16 Acres</div>
              <div style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700, marginTop: '0.2rem' }}>Lush Green Vista</div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            {/* 1. Library */}
            {currentSection === 'library' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>KNOWLEDGE REPOSITORY</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Central Library — "Bee-Hive of Knowledge"
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2563eb', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
                  <p style={{ margin: 0 }}>
                    As a centre of intense intellectual inquiry, the central library envisions becoming a vibrant learning centre providing knowledge support to research scholars, faculty, and students. Headed by <strong>Sk. Moulla (Library In-Charge)</strong>, the library operates on an open-access system with automated OPAC search terminals.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e40af' }}>{amenities.library.volumes}</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700 }}>Volumes in Stock</div>
                  </div>
                  <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#166534' }}>{amenities.library.titles}</div>
                    <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 700 }}>Distinct Titles</div>
                  </div>
                  <div style={{ background: '#fef3c7', padding: '1.25rem', borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#b45309' }}>{amenities.library.journals}</div>
                    <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 700 }}>Print Journals</div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.75rem' }}>
                    Library Working Hours:
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem', margin: 0 }}>
                    <li><strong>Working Days:</strong> 8:00 AM to 8:00 PM</li>
                    <li><strong>Book Circulation Desk:</strong> 9:00 AM to 4:30 PM</li>
                    <li><strong>Reference & Reading Hall:</strong> 9:00 AM to 7:00 PM</li>
                    <li><strong>Sundays & Holidays:</strong> 9:00 AM to 1:00 PM</li>
                  </ul>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {amenities.library.features.map((feat, i) => (
                    <div key={i} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Hostels */}
            {currentSection === 'hostel' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>SAFE RESIDENTIAL LIVING</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Campus Hostels (Boys & Girls)
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Established in 2016 right inside the campus perimeter, the college provides secure, hygienic, and comfortable residential accommodation for outstation students with separate hostel blocks for boys and girls.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  {amenities.hostels.facilities.map((fac, i) => (
                    <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', gap: '0.75rem' }}>
                      <Home size={20} style={{ color: '#2563eb', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{fac}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '1.25rem', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe', fontSize: '0.85rem', color: '#1e40af' }}>
                  <strong>Resident Wardens & Security:</strong> 24x7 resident wardens, female security staff for girls' hostel, bio-metric attendance logging, and emergency hospital vehicle on standby.
                </div>
              </div>
            )}

            {/* 3. Transport */}
            {currentSection === 'transport' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>REGIONAL CONNECTIVITY</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    College Bus Network & Transit Routes
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                    Fleet of {amenities.transport.fleet}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                    Providing safe, comfortable, and punctual transit for day-scholar students and faculty covering six arterial regional transit corridors across Palnadu, Guntur, and Prakasam districts.
                  </p>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Active Bus Corridors:
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {amenities.transport.corridors.map((c, i) => (
                    <div key={i} style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Bus size={18} style={{ color: '#2563eb', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>{c}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af' }}>Official Transport Policy & Bus Passes</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Route timings, boarding points, and bus pass fare schedule</div>
                  </div>
                  <a href="/college_assets/docs/transport.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    <Download size={14} /> Download Transport Details
                  </a>
                </div>
              </div>
            )}

            {/* 4. Applied Robot Control (ARC) Lab */}
            {currentSection === 'robotics' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>EUROPEAN INDUSTRIAL AUTOMATION</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Applied Robot Control (ARC) Laboratory
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #7c3aed', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
                  <p style={{ margin: 0 }}>
                    In collaboration with European automation leaders, the ARC Laboratory at TEC is an advanced centre of excellence established to train students in real-world industrial robot kinematics, PLC programming, SCARA robot pick-and-place automation, and smart manufacturing.
                  </p>
                </div>

                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '2rem', textAlign: 'center', background: '#ffffff' }}>
                  <Cpu size={40} style={{ color: '#7c3aed', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                    ARC Website Profile & Training Modules (Official Record)
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                    Detailed documentation of robotics equipment, trainer arm specifications, and student certification cohorts.
                  </p>
                  <a href="/college_assets/docs/ARC WEBSITE FILE ON 30-05-2022 - FINAL.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={18} /> Download ARC Center PDF
                  </a>
                </div>
              </div>
            )}

            {/* 5. Central Labs */}
            {currentSection === 'labs' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>COMPUTING & EXPERIMENTATION</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Central Computing & Engineering Laboratories
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  TEC houses 45+ departmental laboratories equipped with licensed software (Oracle, MATLAB, Xilinx, Cadence, SolidWorks, STAAD.Pro) and uninterrupted power back-up from 125 kVA generator units.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Comprehensive Lab Maintenance & Asset Register</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Complete list of calibrated machines, test benches, and software licenses</div>
                    </div>
                    <a href="/college_assets/docs/ALL LAB MAINTENANCE.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <Download size={14} /> Download Register PDF
                    </a>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem' }}>Central Server Room & Network Core</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Blade servers, firewall security, and 1 Gbps high-speed leased line internet</div>
                    </div>
                    <a href="/college_assets/docs/SERVER-ROOM.pdf" target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                      <Download size={14} /> Download Server Specs
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Sports & PED */}
            {currentSection === 'sports' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>PHYSICAL WELL-BEING</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Physical Education & Sports
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Tirumala Engineering College strongly believes in students' integral growth, which comprises a sound physical constitution coupled with a well-balanced mind. Headed by the <strong>Physical Director (pdtec@tecnrt.org / 9441947476)</strong>.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  {amenities.sports.grounds.map((g, i) => (
                    <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Activity size={20} style={{ color: '#16a34a', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#0e2154', fontWeight: 700 }}>{g}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af' }}>Sports Facilities & Tournament Records</div>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>JNTUK Inter-Collegiate Cricket Trophy victories and sports infrastructure</div>
                  </div>
                  <a href="/college_assets/docs/Sports.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    <Download size={14} /> Download Sports PDF
                  </a>
                </div>
              </div>
            )}

            {/* 7. NSS Programs */}
            {currentSection === 'nss' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>COMMUNITY UPLIFTMENT</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    National Service Scheme (NSS Unit)
                  </h2>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem', lineHeight: 1.7, color: '#475569' }}>
                  <p>
                    The National Service Scheme (NSS) at TEC conducts mega blood donation camps, adopted village sanitation campaigns in Jonnalagadda, free rural medical health checkups, environmental tree plantations, and digital literacy drives for village school children.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>NSS Program Officer:</strong> Mr. K. V. Rama Rao (Phone: 9052966526 / 9949311310 | Email: nsstec@tecnrt.org).
                  </p>
                </div>
              </div>
            )}

            {/* 8. APSSDC Skill Centre */}
            {currentSection === 'apssdc' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>INDUSTRY READINESS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    APSSDC Skill Excellence Centre & CM's Centre
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Established in partnership with the Andhra Pradesh State Skill Development Corporation, the skill centre provides certified training in industry-relevant technologies.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  {amenities.skillCentre.programs.map((prog, i) => (
                    <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0e2154', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} style={{ color: '#2563eb', display: 'inline', marginRight: '0.5rem' }} />
                      {prog}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. Fests (Prayaga) */}
            {currentSection === 'fests' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>ANNUAL NATIONAL CONCLAVE</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Prayaga — Annual National Tech & Cultural Symposium
                  </h2>
                </div>

                <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b', marginBottom: '2rem', color: '#92400e', lineHeight: 1.7 }}>
                  <p style={{ margin: 0 }}>
                    <strong>Prayaga</strong> is TEC's marquee annual national symposium bringing together over 3,000+ engineering delegates from South India. Features robotics warfare, project expos, hackathons, and vibrant evening cultural concerts.
                  </p>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0e2154', marginBottom: '1rem' }}>
                  Major Prayaga Competitive Segments:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {amenities.fest.events.map((ev, i) => (
                    <div key={i} style={{ padding: '1rem', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, color: '#0e2154' }}>
                      <Sparkles size={16} style={{ color: '#f59e0b', display: 'inline', marginRight: '0.5rem' }} />
                      {ev}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. Alumni Association */}
            {currentSection === 'alumni' && (
              <div>
                <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>GLOBAL TECNOCRATS</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154' }}>
                    Tirumala Engineering College Alumni Association
                  </h2>
                </div>

                <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Registered under the Societies Registration Act, the TEC Alumni Association connects over 12,000+ graduates working across Silicon Valley, Europe, Singapore, Hyderabad, Bangalore, and Chennai.
                </p>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
                    Alumni Mentorship & Contributions:
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.9rem', margin: 0 }}>
                    <li>Conducting weekend virtual mock coding interviews for final year students.</li>
                    <li>Providing referrals and direct placement drives for qualified batchmates.</li>
                    <li>Annual Alumni Homecoming Meet held on campus in the month of December.</li>
                  </ul>
                </div>

                <div style={{ padding: '1.25rem', background: '#eff6ff', borderRadius: '10px', fontSize: '0.85rem', color: '#1e40af' }}>
                  <strong>Alumni Coordinator:</strong> Phone: 9705518818 | Email: tecnrt.alumni@gmail.com
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .amenities-layout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
