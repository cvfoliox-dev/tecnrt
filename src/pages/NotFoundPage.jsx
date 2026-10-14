import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, GraduationCap } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: '#ffffff', borderRadius: '20px', padding: '3rem', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 900, fontSize: '2rem' }}>
          404
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.75rem' }}>
          Page Not Found
        </h1>

        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page or resource you requested could not be located. It may have moved or been updated during the website migration.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-md" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/about/society" className="btn btn-outline-primary btn-md" style={{ fontWeight: 600 }}>
            About TEC
          </Link>
          <Link to="/departments/cse" className="btn btn-outline-primary btn-md" style={{ fontWeight: 600 }}>
            Departments
          </Link>
          <Link to="/contact" className="btn btn-outline-primary btn-md" style={{ fontWeight: 600 }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
