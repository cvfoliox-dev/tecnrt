import React from 'react';
import { PLACEMENT_STATS } from '../../data/mockData';
import { 
  Briefcase, 
  TrendingUp, 
  Building, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Bus, 
  Wifi, 
  Dumbbell 
} from 'lucide-react';

export default function AcademicHighlights() {
  return (
    <section id="placements" style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1d4ed8', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <TrendingUp size={16} />
            Career Placements & Campus Life
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0e2154', marginBottom: '1rem' }}>
            Empowering Careers & Campus Infrastructure
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>
            Tirumala Engineering College maintains an active Training and Placement Cell (T&P) partnering with global IT majors, engineering multinationals, and regional core industries.
          </p>
        </div>

        {/* 4 Big Placement Highlights */}
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid #1d4ed8' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1d4ed8', fontFamily: 'var(--font-heading)' }}>
              18.5 LPA
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginTop: '0.25rem' }}>
              Highest Package
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
              Secured in Tech Cloud & Security
            </div>
          </div>

          <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid #f59e0b' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--font-heading)' }}>
              624+
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginTop: '0.25rem' }}>
              Campus Job Offers
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
              Academic Year 2025-2026 Batch
            </div>
          </div>

          <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid #10b981' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)' }}>
              88.4%
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginTop: '0.25rem' }}>
              Placement Clearance
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
              Across all eligible B.Tech students
            </div>
          </div>

          <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid #7e22ce' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#7e22ce', fontFamily: 'var(--font-heading)' }}>
              4.8 LPA
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginTop: '0.25rem' }}>
              Average CTC Package
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
              Consistent institutional median
            </div>
          </div>
        </div>

        {/* Corporate Recruiters Logos Grid */}
        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', textAlign: 'center', marginBottom: '1.5rem' }}>
            Prominent Hiring Partners & Recruiters
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
            {PLACEMENT_STATS.topRecruiters.map((rec, i) => (
              <div 
                key={i} 
                style={{ 
                  background: '#ffffff', 
                  padding: '1rem', 
                  borderRadius: '10px', 
                  border: '1px solid #e2e8f0', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0e2154' }}>
                  {rec.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, marginTop: '0.2rem' }}>
                  {rec.offers} Recruits
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase' }}>
                  {rec.tier}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Life & Facilities Section */}
        <div id="campus" style={{ paddingTop: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#0e2154', textAlign: 'center', marginBottom: '2.5rem' }}>
            Campus Facilities & Infrastructure
          </h3>

          <div className="grid-4">
            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <BookOpen size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#0f172a' }}>Central Digital Library</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                45,000+ volumes, IEEE Xplore, DELNET, ScienceDirect access, and 100+ high-speed digital research terminals.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Bus size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#0f172a' }}>Fleet Transport (30+ Buses)</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                Safe daily transit covering Guntur, Narasaraopet town, Vinukonda, Chilakaluripet, Sattenapalli, and surrounding mandals.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Wifi size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#0f172a' }}>Gigabit Wi-Fi Campus</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                1 Gbps optical fiber backbone providing uninterrupted connectivity throughout academic blocks, labs, and student halls.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#fdf4ff', color: '#c026d3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Dumbbell size={20} />
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#0f172a' }}>Sports & Fitness Arena</h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                Spacious athletic track, cricket pavilion, basketball courts, badminton indoor stadium, and modern student gymnasium.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
