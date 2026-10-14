import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_INFO } from '../../data/mockData';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Droplet, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

export default function StudentProfile() {
  const { currentUser } = useAuth();
  const student = currentUser.profile || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Profile Header Banner */}
      <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            width: '84px', 
            height: '84px', 
            borderRadius: '20px', 
            background: 'linear-gradient(135deg, #0e2154 0%, #1d4ed8 100%)', 
            color: '#ffffff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800,
            boxShadow: '0 8px 16px rgba(14,33,84,0.2)',
            border: '3px solid #f59e0b'
          }}>
            {student.name ? student.name.charAt(0) : 'S'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#0e2154' }}>{student.name}</h2>
              <span className="badge badge-success">Verified Enrolled Student</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span>Roll Number: <strong style={{ color: '#0f172a' }}>{student.rollNumber}</strong></span>
              <span>•</span>
              <span>Branch: <strong style={{ color: '#0f172a' }}>{student.department}</strong></span>
              <span>•</span>
              <span>Section: <strong style={{ color: '#0f172a' }}>{student.section}</strong></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}>
            AP EAPCET CODE: {COLLEGE_INFO.eamcetCode}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Affiliated to JNTUK (R20 Regulations)
          </span>
        </div>
      </div>

      {/* Two Column Profile Breakdown */}
      <div className="grid-2">
        {/* Personal Details Card */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: '#2563eb' }} />
            Personal Identification
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Full Legal Name</span>
              <strong style={{ color: '#0f172a' }}>{student.name}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Parent / Father's Name</span>
              <strong style={{ color: '#0f172a' }}>{student.fatherName || "M. Venkata Subbaiah"}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Date of Birth</span>
              <strong style={{ color: '#0f172a' }}>{student.dob || "2003-08-14"}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Gender / Blood Group</span>
              <strong style={{ color: '#0f172a' }}>{student.gender || "Male"} ({student.bloodGroup || "O+"})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Registered Email</span>
              <strong style={{ color: '#2563eb' }}>{student.email}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Student Contact Phone</span>
              <strong style={{ color: '#0f172a' }}>{student.phone}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem' }}>
              <span style={{ color: '#64748b' }}>Residential Address</span>
              <strong style={{ color: '#0f172a', textAlign: 'right', maxWidth: '60%' }}>{student.address}</strong>
            </div>
          </div>
        </div>

        {/* Academic Enrollment & Security Record */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} style={{ color: '#d97706' }} />
            Academic Enrollment Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Institution</span>
              <strong style={{ color: '#0f172a' }}>Tirumala Engineering College, Narasaraopet</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Course & Branch</span>
              <strong style={{ color: '#0f172a' }}>B.Tech - {student.department}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Admission Category</span>
              <strong style={{ color: '#059669' }}>{student.admissionType}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Current Semester & Year</span>
              <strong style={{ color: '#0f172a' }}>{student.year} ({student.semester})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Curriculum Regulation</span>
              <strong style={{ color: '#0f172a' }}>JNTUK R20 Academic Regulations</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
              <span style={{ color: '#64748b' }}>Overall CGPA / Last SGPA</span>
              <strong style={{ color: '#2563eb' }}>{student.cgpa} / {student.sgpaLast}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem' }}>
              <span style={{ color: '#64748b' }}>Portal Identity Status</span>
              <span className="badge badge-success">Linked & Authorized</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRD Data Security Compliance Card */}
      <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#475569' }}>
        <Lock size={20} style={{ color: '#2563eb', flexShrink: 0 }} />
        <div>
          <strong>PRD Section 4.1 & 14.2 Authorization Protection:</strong> Students may view only their authorized institutional records. Private student identifiers are protected on backend endpoints against unauthorized access or modification.
        </div>
      </div>

    </div>
  );
}
