import React from 'react';
import { COLLEGE_INFO } from '../../data/mockData';
import { 
  Building, 
  Award, 
  Target, 
  Compass, 
  ShieldCheck, 
  CheckCircle, 
  BookOpen, 
  Cpu, 
  Users 
} from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1d4ed8', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <Award size={16} />
            Institutional Legacy & Affiliation
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0e2154', marginBottom: '1rem' }}>
            About Tirumala Engineering College
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>
            Founded in 2008 at Jonnalagadda, Narasaraopet, Tirumala Engineering College has developed into a premier technical institution in Andhra Pradesh, committed to academic rigor, hands-on engineering, and character building.
          </p>
        </div>

        {/* 3 Core Highlight Blocks */}
        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          <div className="card" style={{ borderTop: '4px solid #2563eb' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Compass size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#0f172a' }}>Our Vision</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
              To emerge as a center of technical brilliance in rural and semi-urban Andhra Pradesh, shaping globally competitive engineering professionals rooted in research, ethical values, and societal progress.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#0f172a' }}>Our Mission</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
              Deliver industry-aligned engineering education with modern lab infrastructure, foster entrepreneurial mindsets through technology incubation, and maintain transparent, student-centric academic governance.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#0f172a' }}>Accreditation & Approvals</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
              Permanently affiliated to <strong>JNTU Kakinada (JNTUK)</strong>, approved by <strong>AICTE New Delhi</strong>, accredited with <strong>NAAC 'A' Grade</strong>, and certified by <strong>NBA</strong> for B.Tech programs.
            </p>
          </div>
        </div>

        {/* Principal's Desk Message */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0e2154, #1d4ed8)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.5rem', border: '3px solid #f59e0b' }}>
                VN
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem', color: '#0e2154', marginBottom: '0.2rem' }}>{COLLEGE_INFO.principal.name}</h4>
                <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700 }}>Principal & Head of Institution</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{COLLEGE_INFO.principal.qualification} • {COLLEGE_INFO.principal.experience}</div>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.25rem' }}>
              "At Tirumala Engineering College, we prioritize experiential technical education where student talent meets cutting-edge industry training. Our centralized Management Portal represents our dedication to modern governance—giving students transparent access to attendance and grades, empowering faculty with spreadsheet workflows, and equipping leadership with data-driven oversight."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>Official Correspondence:</span>
              <a href="mailto:principal@tecnrt.org" style={{ textDecoration: 'underline' }}>principal@tecnrt.org</a>
            </div>
          </div>

          {/* Key Campus Infrastructure Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1d4ed8' }}>25+</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Lush Campus Acres</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>State-of-the-art academic blocks at Jonnalagadda</div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#d97706' }}>40+</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Specialized Laboratories</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Robotics, NVIDIA AI, VLSI & IoT centers</div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#059669' }}>185+</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Distinguished Faculty</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Ph.D & M.Tech researchers with industry background</div>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#7e22ce' }}>30+</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>College Bus Routes</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Direct transit across Guntur, Vinukonda, Chilakaluripet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
