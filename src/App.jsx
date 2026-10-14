import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import RoleSwitcherBar from './components/common/RoleSwitcherBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginModal from './components/public/LoginModal';

// Public Pages Suite
import HomePage from './pages/HomePage';
import AboutPages from './pages/AboutPages';
import AdministrationPages from './pages/AdministrationPages';
import AdmissionPages from './pages/AdmissionPages';
import AcademicPages from './pages/AcademicPages';
import DepartmentDetailPage from './pages/DepartmentDetailPage';
import ExamcellPages from './pages/ExamcellPages';
import PlacementPages from './pages/PlacementPages';
import IQACPages from './pages/IQACPages';
import AmenitiesPages from './pages/AmenitiesPages';
import NIRFPage from './pages/NIRFPage';
import GalleryPage from './pages/GalleryPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Portal Dashboards (PRD Portals)
import StudentDashboard from './components/student/StudentDashboard';
import FacultyDashboard from './components/faculty/FacultyDashboard';
import HODDashboard from './components/hod/HODDashboard';
import PrincipalDashboard from './components/principal/PrincipalDashboard';

import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const { currentUser, quickSwitchRole, toasts, removeToast } = useAuth();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // If path is a portal route, ensure appropriate role is active
  useEffect(() => {
    if (location.pathname.startsWith('/portal/student') && currentUser.role !== 'student') {
      quickSwitchRole('student');
    } else if (location.pathname.startsWith('/portal/faculty') && currentUser.role !== 'faculty') {
      quickSwitchRole('faculty');
    } else if (location.pathname.startsWith('/portal/hod') && currentUser.role !== 'hod') {
      quickSwitchRole('hod');
    } else if (location.pathname.startsWith('/portal/principal') && currentUser.role !== 'principal') {
      quickSwitchRole('principal');
    }
  }, [location.pathname, currentUser.role, quickSwitchRole]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Persistent Evaluator Role Switcher Bar */}
      <RoleSwitcherBar />

      {/* 2. Portal Views when a role is selected */}
      {currentUser.role === 'student' && <StudentDashboard />}
      {currentUser.role === 'faculty' && <FacultyDashboard />}
      {currentUser.role === 'hod' && <HODDashboard />}
      {currentUser.role === 'principal' && <PrincipalDashboard />}

      {/* 3. Primary Public Website Routes */}
      {currentUser.role === 'public' && (
        <>
          <Navbar />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/index-2.html" element={<Navigate to="/" replace />} />
              <Route path="/index.php" element={<Navigate to="/" replace />} />

              {/* About TEC Group */}
              <Route path="/about" element={<Navigate to="/about/society" replace />} />
              <Route path="/about/:subpage" element={<AboutPages />} />
              <Route path="/society.html" element={<Navigate to="/about/society" replace />} />
              <Route path="/management.html" element={<Navigate to="/about/management" replace />} />
              <Route path="/advisory.html" element={<Navigate to="/about/advisory" replace />} />
              <Route path="/principal.html" element={<Navigate to="/about/principal" replace />} />
              <Route path="/whytec.html" element={<Navigate to="/about/why-tec" replace />} />
              <Route path="/key_persons.html" element={<Navigate to="/about/key-persons" replace />} />
              <Route path="/bestpractices.html" element={<Navigate to="/about/best-practices" replace />} />
              <Route path="/mou.html" element={<Navigate to="/about/mous" replace />} />
              <Route path="/strengths.html" element={<Navigate to="/about/strengths" replace />} />
              <Route path="/primer_persons_visited.html" element={<Navigate to="/about/visitors" replace />} />
              <Route path="/safety.html" element={<Navigate to="/about/safety" replace />} />
              <Route path="/tecfacilities.html" element={<Navigate to="/about/facilities" replace />} />

              {/* Administration Group */}
              <Route path="/administration" element={<Navigate to="/administration/governing" replace />} />
              <Route path="/administration/:subpage" element={<AdministrationPages />} />
              <Route path="/governing.html" element={<Navigate to="/administration/governing" replace />} />
              <Route path="/nodalofficer.html" element={<Navigate to="/administration/nodal-officer" replace />} />
              <Route path="/comitees.html" element={<Navigate to="/administration/committees" replace />} />
              <Route path="/inst_cells.html" element={<Navigate to="/administration/cells" replace />} />
              <Route path="/rdcell.html" element={<Navigate to="/administration/rd-centre" replace />} />
              <Route path="/Indus_intercell.html" element={<Navigate to="/administration/industry-cell" replace />} />

              {/* Admissions Group */}
              <Route path="/admissions" element={<Navigate to="/admissions/procedure" replace />} />
              <Route path="/admissions/:subpage" element={<AdmissionPages />} />
              <Route path="/admission_procedure.html" element={<Navigate to="/admissions/procedure" replace />} />
              <Route path="/programmes.html" element={<Navigate to="/admissions/courses" replace />} />
              <Route path="/Student_List.html" element={<Navigate to="/admissions/student-lists" replace />} />
              <Route path="/admissioncontact_us.html" element={<Navigate to="/admissions/contact" replace />} />

              {/* Academics Group */}
              <Route path="/academics" element={<Navigate to="/academics/calendar" replace />} />
              <Route path="/academics/:subpage" element={<AcademicPages />} />
              <Route path="/academic_calender.html" element={<Navigate to="/academics/calendar" replace />} />
              <Route path="/syllabus.html" element={<Navigate to="/academics/syllabus" replace />} />
              <Route path="/scholorship.html" element={<Navigate to="/academics/scholarships" replace />} />
              <Route path="/financial_aid.html" element={<Navigate to="/academics/financial-aid" replace />} />

              {/* Departments */}
              <Route path="/departments" element={<DepartmentDetailPage />} />
              <Route path="/departments/:deptCode" element={<DepartmentDetailPage />} />
              <Route path="/cse_dept.html" element={<Navigate to="/departments/cse" replace />} />
              <Route path="/aiml_dept.html" element={<Navigate to="/departments/aiml" replace />} />
              <Route path="/ece_dept.html" element={<Navigate to="/departments/ece" replace />} />
              <Route path="/eee_dept.html" element={<Navigate to="/departments/eee" replace />} />
              <Route path="/mech_dept.html" element={<Navigate to="/departments/mech" replace />} />
              <Route path="/civil_dept.html" element={<Navigate to="/departments/civil" replace />} />
              <Route path="/IT_dept.html" element={<Navigate to="/departments/it" replace />} />
              <Route path="/ash_dept.html" element={<Navigate to="/departments/ash" replace />} />

              {/* Examination Cell */}
              <Route path="/examination" element={<Navigate to="/examination/notifications" replace />} />
              <Route path="/examination/:subpage" element={<ExamcellPages />} />
              <Route path="/examcell_notifications.html" element={<Navigate to="/examination/notifications" replace />} />
              <Route path="/examcell_calendar.html" element={<Navigate to="/examination/calendar" replace />} />

              {/* Placements */}
              <Route path="/placements" element={<Navigate to="/placements/overview" replace />} />
              <Route path="/placements/:subpage" element={<PlacementPages />} />
              <Route path="/tpc_dept.html" element={<Navigate to="/placements/overview" replace />} />
              <Route path="/tpc_dept.php" element={<Navigate to="/placements/overview" replace />} />
              <Route path="/tpc_faculty.html" element={<Navigate to="/placements/team" replace />} />
              <Route path="/tr_activities.html" element={<Navigate to="/placements/training" replace />} />
              <Route path="/placement_summary.html" element={<Navigate to="/placements/statistics" replace />} />
              <Route path="/placement_summary.php" element={<Navigate to="/placements/statistics" replace />} />
              <Route path="/ourrecruiters.html" element={<Navigate to="/placements/recruiters" replace />} />
              <Route path="/placement_gallery.html" element={<Navigate to="/placements/gallery" replace />} />
              <Route path="/testimonials.html" element={<Navigate to="/placements/testimonials" replace />} />
              <Route path="/infrasture.html" element={<Navigate to="/placements/infrastructure" replace />} />
              <Route path="/tpccontact.html" element={<Navigate to="/placements/contact" replace />} />

              {/* IQAC & Accreditations */}
              <Route path="/iqac" element={<Navigate to="/iqac/about" replace />} />
              <Route path="/iqac/:subpage" element={<IQACPages />} />
              <Route path="/iqac.html" element={<Navigate to="/iqac/about" replace />} />
              <Route path="/iqac_dept.html" element={<Navigate to="/iqac/about" replace />} />
              <Route path="/naac.html" element={<Navigate to="/iqac/naac" replace />} />
              <Route path="/aicte.html" element={<Navigate to="/iqac/aicte" replace />} />

              {/* Amenities & Student Life */}
              <Route path="/amenities" element={<Navigate to="/amenities/library" replace />} />
              <Route path="/amenities/:subpage" element={<AmenitiesPages />} />
              <Route path="/about_library.html" element={<Navigate to="/amenities/library" replace />} />
              <Route path="/hostel.html" element={<Navigate to="/amenities/hostel" replace />} />
              <Route path="/nssprograms.html" element={<Navigate to="/amenities/nss" replace />} />
              <Route path="/labs.html" element={<Navigate to="/amenities/labs" replace />} />
              <Route path="/apssdc.html" element={<Navigate to="/amenities/apssdc" replace />} />
              <Route path="/ped_dept.html" element={<Navigate to="/amenities/sports" replace />} />
              <Route path="/fests.html" element={<Navigate to="/amenities/fests" replace />} />
              <Route path="/alumini.html" element={<Navigate to="/amenities/alumni" replace />} />

              {/* Standalone Pages */}
              <Route path="/nirf" element={<NIRFPage />} />
              <Route path="/NIRF-2024.html" element={<Navigate to="/nirf" replace />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
              <Route path="/gallery.php" element={<Navigate to="/gallery" replace />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/stakeholderfeedback.html" element={<Navigate to="/feedback" replace />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Portal routes accessible directly */}
              <Route path="/portal/student" element={<StudentDashboard />} />
              <Route path="/portal/faculty" element={<FacultyDashboard />} />
              <Route path="/portal/hod" element={<HODDashboard />} />
              <Route path="/portal/principal" element={<PrincipalDashboard />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <LoginModal />
        </>
      )}

      {/* 4. Global Toast Notifications Queue */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />}
            {toast.type === 'error' && <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />}
            {toast.type === 'info' && <Info size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
