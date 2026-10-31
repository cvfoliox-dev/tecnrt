import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Download
} from 'lucide-react';

// Original 28 placement images from the original website marquee
const PLACEMENT_IMAGES = [
  { file: 'HCLAWARD1.jpeg', label: 'HCL Award Recognition' },
  { file: 'OVERALL PHOTO2.jpg', label: 'Overall Campus Placements' },
  { file: 'All SEC.jpeg', label: 'Engineering Selections' },
  { file: 'ALTIMEPRIK.jpeg', label: 'Altimeprik Technologies' },
  { file: 'ALTIMEPRIK1.jpeg', label: 'Altimeprik Drive' },
  { file: 'HCL.jpeg', label: 'HCL Technologies' },
  { file: 'HITACHI VANTARA.jpeg', label: 'Hitachi Vantara' },
  { file: 'HITACHI VANTARA1.jpeg', label: 'Hitachi Vantara Drive' },
  { file: 'INFOSYS.jpeg', label: 'Infosys Selections' },
  { file: 'KPIT HEXAWARE.jpg', label: 'KPIT Hexaware' },
  { file: 'Mindtree.jpeg', label: 'Mindtree Corporate' },
  { file: 'MPHASIS 1.jpeg', label: 'Mphasis Engineering' },
  { file: 'MPHASIS.jpeg', label: 'Mphasis Selections' },
  { file: 'REVATURE 1.jpeg', label: 'Revature Software' },
  { file: 'REVATURE.jpeg', label: 'Revature Placements' },
  { file: 'SNOVASYS SOFTWARE SOLUTIONS Ltd.jpeg', label: 'Snovasys Software Solutions' },
  { file: 'sonata software.jpeg', label: 'Sonata Software' },
  { file: 'TCS PHOTO.jpg', label: 'Tata Consultancy Services' },
  { file: 'TCS.jpeg', label: 'TCS Selections' },
  { file: 'Tech Mahindra 1.jpeg', label: 'Tech Mahindra Corporate' },
  { file: 'Tech Mahindra2.jpeg', label: 'Tech Mahindra Placements' },
  { file: 'TOLLPLUS.jpeg', label: 'TollPlus Global' },
  { file: 'Tvarana1.jpeg', label: 'Tvarana Systems' },
  { file: 'WILEY MTHREE.jpeg', label: 'Wiley mthree' },
  { file: 'WIPRO (1).jpeg', label: 'Wipro Technologies' },
  { file: 'WIPRO PHOTO.jpg', label: 'Wipro Campus Drive' },
  { file: 'WIPRO1.jpeg', label: 'Wipro Elite Selections' },
  { file: 'WIPRO2.jpeg', label: 'Wipro Placements' }
];

export default function LatestNewsSection() {
  const [activePlacementIdx, setActivePlacementIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance placement images in Column 3
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActivePlacementIdx((prev) => (prev + 1) % PLACEMENT_IMAGES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevPlacement = () => {
    setActivePlacementIdx((prev) => (prev - 1 + PLACEMENT_IMAGES.length) % PLACEMENT_IMAGES.length);
  };

  const handleNextPlacement = () => {
    setActivePlacementIdx((prev) => (prev + 1) % PLACEMENT_IMAGES.length);
  };

  return (
    <section
      id="latest-news-section"
      style={{
        width: '100%',
        backgroundColor: '#faf9f6',
        borderTop: '1px solid #e5e2dc',
        borderBottom: '1px solid #e5e2dc',
        padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
        position: 'relative'
      }}
      aria-label="Latest News and Updates"
    >
      <div className="container">
        {/* Section Heading - Clean without redundant eyebrow label */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 3.6vw, 2.6rem)',
              fontWeight: 800,
              color: '#0a3d78',
              letterSpacing: '-0.02em',
              margin: '0 0 0.4rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <span>Latest News & Updates</span>
            <a
              href="https://www.facebook.com/tecnrt.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                fontWeight: 700,
                color: '#125bb2',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              aria-label="Visit Tirumala Engineering College Facebook Page"
            >
              <span>(Facebook Page)</span>
              <ExternalLink size={16} />
            </a>
          </h2>

          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#f59e0b',
              margin: '0.9rem auto 0 auto',
              borderRadius: '2px'
            }}
          />
        </div>

        {/* 3-Column Workbench Grid */}
        <div className="tec-news-grid">
          
          {/* COLUMN 1: Examination Notices & Portal Workbench */}
          <div className="tec-news-card">
            <div className="tec-news-card-header">
              <h3 className="tec-news-card-title">Examination Notices</h3>
            </div>

            <div className="tec-news-card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Real ExamCell.png clickable portal screenshot */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <a
                    href="http://www.tecnrt.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #e5e2dc',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#faf9f6',
                      height: '185px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    className="tec-exam-banner"
                    title="Visit Examination Portal tecnrt.ac.in"
                  >
                    <img
                      src="/college_assets/ExamCell.png"
                      alt="Tirumala Engineering College Exam Cell Portal"
                      loading="lazy"
                      decoding="async"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain'
                      }}
                    />
                  </a>
                </div>

                {/* Information Callout */}
                <div
                  style={{
                    backgroundColor: '#faf9f6',
                    border: '1px solid #e5e2dc',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0a3d78', marginBottom: '0.35rem' }}>
                    Autonomous & JNTUK Examination Portal
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#524f49', lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                    Access end-semester examination timetables, regular and supplementary notification schedules, student hall tickets, and verified semester grade reports.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
                <a
                  href="http://www.tecnrt.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tec-btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#0a3d78',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Open Exam Portal (tecnrt.ac.in)</span>
                  <ExternalLink size={15} />
                </a>

                <Link
                  to="/examination/notifications"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    color: '#524f49',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '0.4rem'
                  }}
                >
                  <span>Browse Internal Exam Notifications</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMN 2: College Notices */}
          <div className="tec-news-card">
            <div className="tec-news-card-header">
              <h3 className="tec-news-card-title">College Notices</h3>
            </div>

            {/* Scrollable list of 9 original notices with original wording and dates */}
            <div className="tec-news-card-body tec-scroll-container">
              <ul className="tec-chat-list">
                
                {/* 1. Pariksha Pe Charcha 2025 */}
                <li className="tec-chat-item">
                  <div style={{ textAlign: 'center', marginBottom: '0.65rem' }}>
                    <img
                      src="/college_assets/gallery/Pariksha Pe Charcha 2025.jpg"
                      alt="Pariksha Pe Charcha 2025"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        border: '1px solid #e5e2dc',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  </div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#211f1c', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                    Let us join hands in celebrating the Utsav of examinations, "Pariksha Pe Charcha 2025" as envisioned by our Hon'ble Prime minister in order to make learning more joyful for our future nation builders.
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <a
                      href="https://innovateindia1.mygov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#0a3d78',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Application Form</span>
                      <ExternalLink size={13} />
                    </a>
                    <span className="tec-badge-new">New</span>
                  </div>
                </li>

                {/* 2. NRI Notification 2021-2022 */}
                <li className="tec-chat-item">
                  <div style={{ textAlign: 'center', marginBottom: '0.65rem' }}>
                    <img
                      src="/college_assets/gallery/NRI Notification 2021-2022.jpeg"
                      alt="Notification for NRI Seats"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        border: '1px solid #e5e2dc',
                        backgroundColor: '#ffffff'
                      }}
                    />
                  </div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#211f1c', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                    Notification for Admission into First Year B.Tech. (2021-2022) Category B: NRI / NRI Sponsored Seats
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <a
                      href="/college_assets/docs/NRI Application.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#0a3d78',
                        textDecoration: 'none'
                      }}
                    >
                      <Download size={13} />
                      <span>Application Form</span>
                    </a>
                    <span className="tec-badge-new">New</span>
                  </div>
                </li>

                {/* 3. Centre of Excellence */}
                <li className="tec-chat-item">
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/college_assets/gallery/news.jpg"
                      alt="centre of excellance"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        border: '1px solid #e5e2dc'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#524f49', marginTop: '0.4rem' }}>
                      Centre of Excellence
                    </div>
                  </div>
                </li>

                {/* 4. Welcome to Chief Guests */}
                <li className="tec-chat-item">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.35rem' }}>
                      <span className="tec-badge-new">New</span>
                    </div>
                    <img
                      src="/college_assets/gallery/cgf.jpg"
                      alt="welcome to chief guests"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        border: '1px solid #e5e2dc'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#524f49', marginTop: '0.4rem' }}>
                      Welcome to Chief Guests
                    </div>
                  </div>
                </li>

                {/* 5. Fest Day 1 Invitation */}
                <li className="tec-chat-item">
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/college_assets/gallery/day1.jpg"
                      alt="fest day1 invitation"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        border: '1px solid #e5e2dc'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#524f49', marginTop: '0.4rem' }}>
                      College Fest: Day 1 Invitation
                    </div>
                  </div>
                </li>

                {/* 6. Vikas Inauguration */}
                <li className="tec-chat-item">
                  <div style={{ color: '#6e6a62', fontSize: '0.74rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    <span>05/01/2018</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="/college_assets/gallery/vikas.jpg"
                      alt="vikas inaugaration"
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '180px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        border: '1px solid #e5e2dc'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#524f49', marginTop: '0.4rem' }}>
                      Vikas Inauguration
                    </div>
                  </div>
                </li>

                {/* 7. Personality Development Programme By Dr. Yandamuri Veerendranath */}
                <li className="tec-chat-item">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ color: '#6e6a62', fontSize: '0.74rem', fontWeight: 600 }}>
                      <span>03/01/2018</span>
                    </div>
                    <span className="tec-badge-new">New</span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                    <Link
                      to="/gallery"
                      style={{ color: '#0a3d78', textDecoration: 'none' }}
                      className="tec-link-hover"
                    >
                      Personality Developement Programme By Dr. Yandamuri Veerendranath
                    </Link>
                  </h4>
                </li>

                {/* 8. Congratulations to TEC Cricket Team */}
                <li className="tec-chat-item">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ color: '#6e6a62', fontSize: '0.74rem', fontWeight: 600 }}>
                      <span>13/12/2017</span>
                    </div>
                    <span className="tec-badge-new">New</span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                    <span style={{ color: '#0a3d78' }}>
                      Congratulations to TEC Cricket Team for Winning the Cup in A.M Reddy Engg College
                    </span>
                  </h4>
                </li>

                {/* 9. IEEE day celebrations */}
                <li className="tec-chat-item" style={{ borderBottom: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <div style={{ color: '#6e6a62', fontSize: '0.74rem', fontWeight: 600 }}>
                      <span>06/10/2017</span>
                    </div>
                    <span className="tec-badge-new">New</span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                    <Link
                      to="/gallery"
                      style={{ color: '#0a3d78', textDecoration: 'none' }}
                      className="tec-link-hover"
                    >
                      IEEE day celebrations
                    </Link>
                  </h4>
                </li>

              </ul>
            </div>
          </div>

          {/* COLUMN 3: Placement Spotlights */}
          <div className="tec-news-card">
            <div className="tec-news-card-header">
              <h3 className="tec-news-card-title">Placement Spotlights</h3>
            </div>

            <div
              className="tec-news-card-body"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div>
                {/* HCL Award Label Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#d97706', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    HCL Award and Recent Selections
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6e6a62', fontWeight: 600 }}>
                    {activePlacementIdx + 1} of {PLACEMENT_IMAGES.length}
                  </div>
                </div>

                {/* Active Placement Showcase Display */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '215px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#051d3b',
                    border: '1px solid #e5e2dc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <img
                    src={`/college_assets/placementwhatsapp/${encodeURIComponent(PLACEMENT_IMAGES[activePlacementIdx].file)}`}
                    alt={PLACEMENT_IMAGES[activePlacementIdx].label}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />

                  {/* Previous / Next Solid Controls without frosted blur */}
                  <button
                    onClick={handlePrevPlacement}
                    aria-label="Previous placement record"
                    style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#0a3d78',
                      color: '#ffffff',
                      border: '1px solid #f59e0b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={handleNextPlacement}
                    aria-label="Next placement record"
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#0a3d78',
                      color: '#ffffff',
                      border: '1px solid #f59e0b',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)'
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Caption of Active Slide */}
                <div style={{ textAlign: 'center', marginTop: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0a3d78' }}>
                    {PLACEMENT_IMAGES[activePlacementIdx].label}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#6e6a62' }}>
                    Recruitment drives and institutional citations
                  </div>
                </div>

                {/* Miniature Horizontal Strip of 5 Neighboring Photos */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.4rem',
                    overflowX: 'auto',
                    paddingBottom: '0.35rem',
                    justifyContent: 'center'
                  }}
                >
                  {PLACEMENT_IMAGES.slice(0, 6).map((img, idx) => (
                    <button
                      key={img.file}
                      onClick={() => setActivePlacementIdx(idx)}
                      style={{
                        border: activePlacementIdx === idx ? '2px solid #f59e0b' : '1px solid #e5e2dc',
                        borderRadius: '6px',
                        padding: 0,
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        width: '38px',
                        height: '38px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        opacity: activePlacementIdx === idx ? 1 : 0.65,
                        transition: 'all 0.2s ease'
                      }}
                      title={img.label}
                    >
                      <img
                        src={`/college_assets/placementwhatsapp/${encodeURIComponent(img.file)}`}
                        alt={img.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Placement Hub Link - High Visibility Solid Button */}
              <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e2dc', paddingTop: '0.85rem' }}>
                <Link
                  to="/placements/gallery"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    backgroundColor: '#0a3d78',
                    color: '#ffffff',
                    border: '1px solid #0d4a91',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    padding: '0.8rem 1.25rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.01em'
                  }}
                  className="tec-btn-solid-primary"
                  title="Explore all 28 verified campus recruitment drives and citations"
                >
                  <span>View Full Placement Gallery (28 Records)</span>
                  <ChevronRight size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scoped Styling for News Grid & Panels */}
      <style>{`
        .tec-news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          align-items: stretch;
        }

        .tec-news-card {
          background-color: #ffffff;
          border-radius: 14px;
          border: 1px solid #e5e2dc;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 560px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }        .tec-news-card:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .tec-news-card-header {
          background-color: #0a3d78;
          color: #ffffff;
          padding: 0.9rem 1.25rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          border-bottom: 3px solid #f59e0b;
        }

        .tec-news-card-title {
          font-family: var(--font-heading);
          font-size: 1.12rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .tec-news-card-body {
          padding: 1.25rem;
          flex: 1;
          overflow: hidden;
        }

        .tec-scroll-container {
          overflow-y: auto;
        }

        /* Slim professional scrollbar matching brand */
        .tec-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .tec-scroll-container::-webkit-scrollbar-track {
          background: #faf9f6;
        }
        .tec-scroll-container::-webkit-scrollbar-thumb {
          background: #e5e2dc;
          border-radius: 3px;
        }
        .tec-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #9e9a91;
        }

        .tec-pill-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .tec-chat-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .tec-chat-item {
          padding: 0.85rem 0;
          border-bottom: 1px dotted #e5e2dc;
        }

        .tec-chat-item:first-child {
          padding-top: 0;
        }

        .tec-badge-new {
          background-color: #dc2626;
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: inline-block;
        }

        .tec-exam-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12) !important;
        }

        .tec-link-hover:hover {
          color: #d97706 !important;
          text-decoration: underline !important;
        }

        .tec-btn-solid-primary:hover {
          background-color: #0d4a91 !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25) !important;
          transform: translateY(-1px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .tec-news-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .tec-news-card {
            height: auto;
            max-height: none;
          }
          .tec-scroll-container {
            max-height: 480px;
          }
        }
      `}</style>
    </section>
  );
}
