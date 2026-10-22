import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function NIRFPage() {
  const reports = [
    { year: "NIRF 2025", title: "National Institutional Ranking Framework (NIRF) 2025 Data Submission", doc: "/college_assets/docs/NIRF-2025.pdf", status: "Submitted to Ministry of Education" },
    { year: "NIRF 2024", title: "National Institutional Ranking Framework (NIRF) 2024 Official Report", doc: "/college_assets/docs/NIRF-2023.pdf", status: "Published Data Disclosure" },
    { year: "NIRF 2023", title: "National Institutional Ranking Framework (NIRF) 2023 Engineering Discipline", doc: "/college_assets/docs/NIRF-2023.pdf", status: "Published Data Disclosure" }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>NIRF</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            National Institutional Ranking Framework (NIRF)
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Ministry of Education, Government of India: Official Institutional Data Disclosures.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1000px', margin: '2.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #2563eb', marginBottom: '2rem', lineHeight: 1.7, color: '#334155' }}>
            <p style={{ margin: 0 }}>
              The National Institutional Ranking Framework (NIRF) was approved by the MHRD and launched by the Hon'ble Minister of Human Resource Development. In compliance with the transparency norms, Tirumala Engineering College submits comprehensive institutional metrics covering Teaching, Learning & Resources (TLR), Research and Professional Practice (RPC), Graduation Outcomes (GO), Outreach and Inclusivity (OI), and Peer Perception.
            </p>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '1.25rem' }}>
            NIRF Annual Submissions & Data Disclosures
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {reports.map((r, i) => (
              <div key={i} style={{ padding: '1.5rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ background: '#eff6ff', color: '#1e40af', fontWeight: 800, fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {r.year}
                  </span>
                  <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1.05rem', margin: '0.4rem 0 0.2rem' }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                    <CheckCircle2 size={13} style={{ display: 'inline', marginRight: '0.3rem' }} />
                    {r.status}
                  </div>
                </div>

                <a href={r.doc} target="_blank" rel="noreferrer" className="btn btn-primary btn-md" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Download size={15} />
                  <span>Download Report (PDF)</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
