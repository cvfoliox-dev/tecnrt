import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  FileText, 
  Download, 
  Star 
} from 'lucide-react';

export default function FeedbackPage() {
  const { addToast } = useAuth();
  const [activeForm, setActiveForm] = useState('student');
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 'CSE',
    year: 'IV Year',
    ratingTeaching: '5',
    ratingLabs: '5',
    ratingCurriculum: '5',
    ratingPlacements: '5',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Thank you! Your feedback has been recorded for the IQAC Action Taken Report.', 'success');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: 'CSE',
        year: 'IV Year',
        ratingTeaching: '5',
        ratingLabs: '5',
        ratingCurriculum: '5',
        ratingPlacements: '5',
        comments: ''
      });
    }, 3000);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0e2154 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Feedback</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
            Stakeholder Feedback & Action Taken Report
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '750px', marginTop: '0.5rem' }}>
            Continuous quality improvement driven by constructive inputs from students, faculty, employers, parents, and alumni.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1000px', margin: '2.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          {/* Stakeholder Selector Tabs */}
          <div 
            role="tablist"
            aria-label="Stakeholder feedback categories"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '2rem' }}
          >
            {[
              { id: 'student', label: "Student's Feedback" },
              { id: 'teacher', label: "Teacher / Faculty Feedback" },
              { id: 'alumni', label: "Alumni Feedback" },
              { id: 'employer', label: "Employer / Recruiter Feedback" },
              { id: 'parent', label: "Parent's Feedback" }
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeForm === tab.id}
                onClick={() => setActiveForm(tab.id)}
                style={{
                  background: activeForm === tab.id ? '#0e2154' : '#f8fafc',
                  color: activeForm === tab.id ? '#ffffff' : '#475569',
                  border: '1px solid',
                  borderColor: activeForm === tab.id ? '#0e2154' : '#e2e8f0',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0e2154', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
              {activeForm} Evaluation Questionnaire
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label htmlFor="feedback-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Full Name *
                </label>
                <input 
                  id="feedback-name"
                  type="text" 
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label htmlFor="feedback-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Email Address *
                </label>
                <input 
                  id="feedback-email"
                  type="email" 
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label htmlFor="feedback-branch" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Department / Branch
                </label>
                <select 
                  id="feedback-branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="AIML">CSE - Artificial Intelligence & ML (AIML)</option>
                  <option value="ECE">Electronics & Communication Engg (ECE)</option>
                  <option value="EEE">Electrical & Electronics Engg (EEE)</option>
                  <option value="MECH">Mechanical Engineering (MECH)</option>
                  <option value="CIVIL">Civil Engineering (CIVIL)</option>
                  <option value="IT">Information Technology (IT)</option>
                </select>
              </div>

              <div>
                <label htmlFor="feedback-regulation" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Academic Regulation
                </label>
                <select 
                  id="feedback-regulation"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  <option value="R23">R23 Autonomous Regulations</option>
                  <option value="R20">R20 Autonomous Regulations</option>
                  <option value="R19">R19 JNTUK Regulations</option>
                  <option value="R16">R16 JNTUK Regulations</option>
                </select>
              </div>
            </div>

            {/* Rating Metrics */}
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 800, color: '#0e2154', fontSize: '1rem', marginBottom: '1rem' }}>
                Please Rate the Institutional Metrics (1 to 5 Stars):
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                    1. Quality of Curricular Syllabus & Bos Relevance:
                  </label>
                  <select 
                    value={formData.ratingCurriculum}
                    onChange={(e) => setFormData({ ...formData, ratingCurriculum: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="5">5 - Excellent (Highly Industry Aligned)</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good (Satisfactory)</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Needs Improvement</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                    2. Practical Laboratory Equipment & Infrastructure:
                  </label>
                  <select 
                    value={formData.ratingLabs}
                    onChange={(e) => setFormData({ ...formData, ratingLabs: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="5">5 - Excellent (State-of-the-Art)</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Needs Improvement</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                    3. Faculty Teaching Rigor & Mentoring:
                  </label>
                  <select 
                    value={formData.ratingTeaching}
                    onChange={(e) => setFormData({ ...formData, ratingTeaching: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="5">5 - Outstanding Mentorship</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Average</option>
                    <option value="1">1 - Unsatisfactory</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                    4. Placement Training (CRT) & Opportunities:
                  </label>
                  <select 
                    value={formData.ratingPlacements}
                    onChange={(e) => setFormData({ ...formData, ratingPlacements: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  >
                    <option value="5">5 - Exceptional Placement Drives</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Average</option>
                    <option value="1">1 - Needs Improvement</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Suggestions & Qualitative Comments
              </label>
              <textarea 
                rows="4" 
                placeholder="Please share any specific suggestions to further elevate the college's standards..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}
            >
              <Send size={18} />
              <span>Submit Official Feedback</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
