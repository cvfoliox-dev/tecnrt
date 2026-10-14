import React, { useState } from 'react';
import { ANNOUNCEMENTS } from '../../data/mockData';
import { Bell, Calendar, Tag, ChevronRight, X, AlertCircle } from 'lucide-react';

export default function AnnouncementsSection() {
  const [filter, setFilter] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const categories = ['All', 'Examinations', 'Placements', 'Academic', 'Attendance'];

  const filtered = filter === 'All' 
    ? ANNOUNCEMENTS 
    : ANNOUNCEMENTS.filter(a => a.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="announcements" style={{ padding: '5rem 1.5rem', background: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1d4ed8', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <Bell size={16} />
            Institutional Notice Board
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0e2154', marginBottom: '1rem' }}>
            Latest Circulars & Academic Alerts
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>
            Official notices regarding JNTUK examinations, campus placement schedules, semester registration, and attendance thresholds.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '9999px', padding: '0.4rem 1rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(notice => (
            <div 
              key={notice.id} 
              className="card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}
              onClick={() => setSelectedNotice(notice)}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {notice.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#64748b' }}>
                    <Calendar size={13} />
                    <span>{notice.date}</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {notice.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {notice.content}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#2563eb', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Read Full Circular</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-primary">{selectedNotice.category}</span>
                <span className="badge badge-accent">Priority: {selectedNotice.priority}</span>
              </div>
              <button onClick={() => setSelectedNotice(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                <Calendar size={14} />
                <span>Published on: {selectedNotice.date}</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#0e2154', marginBottom: '1rem', lineHeight: 1.3 }}>
                {selectedNotice.title}
              </h3>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', lineHeight: 1.7 }}>
                {selectedNotice.content}
              </div>

              <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: '#64748b' }}>
                Issued by: <strong>Office of the Principal & Academic Examination Section</strong>, Tirumala Engineering College.
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedNotice(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
