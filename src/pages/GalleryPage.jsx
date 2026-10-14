import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon, Award, Sparkles, Filter, X } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { title: "NAAC 'A+' Certificate Awarded to TEC", category: "accreditation", image: "/college_assets/gallery/NAAC A+ CERTIFICATE.JPG" },
    { title: "UGC Autonomous Conferred Orders", category: "accreditation", image: "/college_assets/gallery/TEC AUTONOMOUS1.jpeg" },
    { title: "Autonomous Implementation Ceremony", category: "accreditation", image: "/college_assets/gallery/TEC AUTONOMOUS3.jpeg" },
    { title: "Gold Medal in ECE University Examinations", category: "honours", image: "/college_assets/gallery/GOLDMEDAL ECE.jpeg" },
    { title: "University Gold Medal Felicitations", category: "honours", image: "/college_assets/gallery/GOLDMEDAL.jpeg" },
    { title: "Pillars of Nation Institutional Award", category: "honours", image: "/college_assets/gallery/pillers of nation award.jpeg" },
    { title: "APSCHE Leadership Visit & Conclave", category: "events", image: "/college_assets/gallery/APSCHE.jpg" },
    { title: "Campus Panorama Overview", category: "campus", image: "/campus_panorama.png" },
    { title: "Founder Principal Dr. Y. V. Narayana", category: "campus", image: "/principal.png" },
    { title: "Pariksha Pe Charcha 2025 Celebrations", category: "events", image: "/college_assets/gallery/Pariksha Pe Charcha 2025.jpg" },
    { title: "TCS Placed Technocrats", category: "placements", image: "/college_assets/placementwhatsapp/TCS.jpeg" },
    { title: "Wipro Elite Selections", category: "placements", image: "/college_assets/placementwhatsapp/WIPRO1.jpeg" },
    { title: "Infosys Campus Selections", category: "placements", image: "/college_assets/placementwhatsapp/INFOSYS.jpeg" },
    { title: "HCL Placed Candidates", category: "placements", image: "/college_assets/placementwhatsapp/HCL.jpeg" },
    { title: "Tech Mahindra Engineering Selections", category: "placements", image: "/college_assets/placementwhatsapp/Tech Mahindra 1.jpeg" },
    { title: "Hitachi Vantara Campus Drive", category: "placements", image: "/college_assets/placementwhatsapp/HITACHI VANTARA.jpeg" },
    { title: "Mphasis Software Placed Students", category: "placements", image: "/college_assets/placementwhatsapp/MPHASIS.jpeg" },
    { title: "Revature Global Software Selections", category: "placements", image: "/college_assets/placementwhatsapp/REVATURE.jpeg" },
    { title: "10th Annual Day Celebrations", category: "events", image: "/college_assets/gallery/slide2.jpg" },
    { title: "Engineering Day & Project Expo", category: "events", image: "/college_assets/gallery/slide4.jpg" }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'accreditation', label: 'Accreditation & Autonomous' },
    { id: 'placements', label: 'Campus Placements' },
    { id: 'honours', label: 'Gold Medals & Awards' },
    { id: 'events', label: 'Events & Annual Days' },
    { id: 'campus', label: 'Campus Infrastructure' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Gallery</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Campus Life & Events Photo Gallery
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Visual milestones celebrating academic honors, campus events, accreditations, and placement success.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2.5rem auto 0', padding: '0 1.5rem' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              style={{
                background: activeCategory === c.id ? '#0e2154' : '#ffffff',
                color: activeCategory === c.id ? '#ffffff' : '#475569',
                border: '1px solid',
                borderColor: activeCategory === c.id ? '#0e2154' : '#e2e8f0',
                padding: '0.6rem 1.25rem',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: activeCategory === c.id ? '0 4px 10px rgba(14,33,84,0.2)' : 'none'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImage(item)}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden', background: '#0e2154' }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onError={(e) => { e.target.src = '/campus_panorama.png'; }}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '0.9rem', lineHeight: 1.4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, marginTop: '0.4rem', textTransform: 'uppercase' }}>
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Zoom View */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '850px', maxHeight: '90vh', background: '#0e2154', borderRadius: '16px', overflow: 'hidden', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block', margin: '0 auto', borderRadius: '8px' }}
            />
            <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
