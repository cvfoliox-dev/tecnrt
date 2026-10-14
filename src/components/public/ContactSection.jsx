import React, { useState } from 'react';
import { COLLEGE_INFO } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export default function ContactSection() {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestDept: 'CSE',
    eapcetRank: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Please enter your name and contact phone number.", "error");
      return;
    }
    setSubmitted(true);
    showToast("Admissions Enquiry submitted! An academic counselor will contact you.", "success");
  };

  return (
    <section id="contact" style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1d4ed8', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <MapPin size={16} />
            Campus Location & Admissions
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0e2154', marginBottom: '1rem' }}>
            Get in Touch & Admissions Helpdesk
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>
            Visit our 25-acre campus at Jonnalagadda, Narasaraopet, or connect with our admissions cell for Convener (EAPCET Code: <strong>TMLN</strong>) and Management quota guidance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Left Column: Campus Information */}
          <div>
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0e2154', marginBottom: '1.25rem' }}>
                Campus Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>College Campus Address</div>
                    <div style={{ color: '#64748b', marginTop: '0.2rem', lineHeight: 1.5 }}>
                      Tirumala Engineering College, Jonnalagadda Village, Narasaraopet Mandal, Palnadu District, Andhra Pradesh - 522601
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Phone Lines</div>
                    <div style={{ color: '#64748b', marginTop: '0.2rem' }}>
                      +91 8647 218255 / +91 9440 218256 / +91 9848 123456
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Official Email IDs</div>
                    <div style={{ color: '#64748b', marginTop: '0.2rem' }}>
                      principal@tecnrt.org • admissions@tecnrt.org
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fdf4ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Administrative Timings</div>
                    <div style={{ color: '#64748b', marginTop: '0.2rem' }}>
                      Monday – Saturday: 09:00 AM to 05:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EAPCET Counseling Pill */}
            <div id="admissions" style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1d4ed8 100%)', color: '#ffffff', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={28} style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  AP EAPCET 2026 Counseling
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  College Code: TMLN
                </div>
                <div style={{ fontSize: '0.75rem', color: '#e2e8f0', marginTop: '0.2rem' }}>
                  Enter code TMLN during AP EAPCET Convener web options selection.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Admission Form */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0e2154', marginBottom: '0.5rem' }}>
              Admissions & General Enquiry Form
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Fill in your details below for personalized counseling regarding B.Tech branch availability, fee concessions, and transport routes.
            </p>

            {submitted ? (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={48} style={{ color: '#059669', margin: '0 auto 1rem' }} />
                <h4 style={{ color: '#065f46', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Enquiry Received!</h4>
                <p style={{ color: '#047857', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Our admissions counselor will contact you at <strong>{formData.phone}</strong> with counseling details for <strong>{formData.interestDept}</strong>.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', interestDept: 'CSE', eapcetRank: '', message: '' }); }}
                  className="btn btn-primary btn-sm"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="e.g., K. Suresh Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      required 
                      placeholder="+91 98480 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Interested Branch</label>
                    <select 
                      className="form-select"
                      value={formData.interestDept}
                      onChange={(e) => setFormData({ ...formData, interestDept: e.target.value })}
                    >
                      <option value="CSE">Computer Science & Engg (CSE)</option>
                      <option value="AIML">CSE - Artificial Intelligence & ML</option>
                      <option value="AIDS">CSE - AI & Data Science</option>
                      <option value="IT">Information Technology (IT)</option>
                      <option value="ECE">Electronics & Comm Engg (ECE)</option>
                      <option value="EEE">Electrical & Electronics (EEE)</option>
                      <option value="MECH">Mechanical Engineering</option>
                      <option value="CIVIL">Civil Engineering</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">AP EAPCET Rank (If any)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="e.g., 24500"
                      value={formData.eapcetRank}
                      onChange={(e) => setFormData({ ...formData, eapcetRank: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Questions / Message</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    placeholder="Inquire about hostel facility, college buses, fee concession..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                  <Send size={16} /> Submit Admission Request
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
