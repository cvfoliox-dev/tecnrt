import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE_AUDIT_DATA } from '../data/collegeAuditData';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Send, 
  Clock, 
  Navigation, 
  Building2, 
  CheckCircle2, 
  Search 
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useAuth();
  const { institution, contactDirectory } = COLLEGE_AUDIT_DATA;
  const [searchTerm, setSearchTerm] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admissions Enquiry',
    message: ''
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    addToast('Your enquiry has been submitted to the TEC Administrative Office. We will contact you shortly!', 'success');
    setFormState({
      name: '',
      email: '',
      phone: '',
      subject: 'Admissions Enquiry',
      message: ''
    });
  };

  const filteredDirectory = contactDirectory.filter(c => 
    c.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Contact & Department Directory
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Reach out to our administrative, admission, academic, and department heads. EAPCET Code: <strong>TMLN</strong>.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '2.5rem auto 0', padding: '0 1.5rem' }}>
        {/* Top 3 Quick Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <MapPin size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>Campus Address</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              {institution.location.address}
            </p>
            <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, marginTop: '0.75rem' }}>
              EAMCET / EAPCET CODE: TMLN
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <PhoneCall size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>Telephonic Contacts</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              <strong>Office:</strong> {institution.contacts.phone}<br />
              <strong>Admissions:</strong> 9133300228, 8985298550<br />
              <strong>Fax:</strong> {institution.contacts.fax}
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Mail size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>Official Emails</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              <strong>General:</strong> tecnrt@gmail.com<br />
              <strong>Principal:</strong> principal@tecnrt.org<br />
              <strong>Secretary:</strong> sectec@tecnrt.org<br />
              <strong>Alumni:</strong> tecnrt.alumni@gmail.com
            </p>
          </div>
        </div>

        {/* Transit Distances Banner */}
        <div style={{ background: '#0e2154', color: '#ffffff', borderRadius: '14px', padding: '1.75rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f59e0b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Navigation size={18} />
            <span>Transit & Proximity Distances to Campus</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.88rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <strong>Narasaraopet Bus Stand:</strong> 5.0 Km
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <strong>Railway Station:</strong> 5.5 Km
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <strong>State Bank of India:</strong> 4.5 Km
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <strong>Gannavaram Airport:</strong> 111 Km
            </div>
          </div>
        </div>

        {/* Master Contact Directory Table */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#0e2154', margin: 0 }}>
                Comprehensive Institutional Directory
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.2rem 0 0' }}>
                Direct contact phone numbers and email addresses of all campus cells and departments.
              </p>
            </div>

            {/* Directory Search */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text"
                placeholder="Search department, name, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem 0.55rem 2.25rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#0e2154', color: '#ffffff' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Department / Cell</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Key Person / HOD</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Phone Numbers</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Official Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredDirectory.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0e2154' }}>{item.dept}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#2563eb', fontWeight: 600 }}>{item.person}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>{item.phone}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#059669', fontWeight: 500 }}>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Enquiry Form */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0e2154', marginBottom: '0.5rem' }}>
            Send an Enquiry to Administrative Office
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Fill out the form below and our counseling and administrative team will respond within 24 hours.
          </p>

          <form onSubmit={handleSendMessage} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Your Name *
              </label>
              <input 
                type="text" 
                required 
                placeholder="Full Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Email Address *
              </label>
              <input 
                type="email" 
                required 
                placeholder="name@example.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Phone Number *
              </label>
              <input 
                type="tel" 
                required 
                placeholder="10-digit mobile number"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Subject of Enquiry
              </label>
              <select 
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              >
                <option value="Admissions Enquiry">B.Tech Admissions 2026</option>
                <option value="Category-B Management Quota">Category-B / NRI Quota</option>
                <option value="Examination / Transcripts">Examination / Transcripts</option>
                <option value="Placement Campus Drive">Corporate Placement Drive</option>
                <option value="Hostel & Transport">Hostel & Transport Accommodation</option>
                <option value="Other">General Administration</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                Message
              </label>
              <textarea 
                rows="3" 
                placeholder="Write your message or inquiry here..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <Send size={18} />
                <span>Submit Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
