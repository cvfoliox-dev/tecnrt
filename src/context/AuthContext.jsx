import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_STUDENTS, 
  FACULTY_MEMBERS, 
  DEPARTMENTS, 
  AUDIT_LOGS, 
  COLLEGE_INFO,
  ATTENDANCE_UPLOAD_HISTORY 
} from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Current user / active view
  // role: 'public' | 'student' | 'faculty' | 'hod' | 'principal'
  const [currentUser, setCurrentUser] = useState({
    role: 'public',
    isAuthenticated: false,
    profile: null,
    mustChangePassword: false
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);
  const [uploadHistory, setUploadHistory] = useState(ATTENDANCE_UPLOAD_HISTORY);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState('student');
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add audit log
  const logAction = ({ action, details, affectedClass = "N/A", status = "Success" }) => {
    const newLog = {
      id: `AUD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentUser.profile?.name || "System User",
      role: currentUser.role ? currentUser.role.toUpperCase() : "ANONYMOUS",
      action,
      academicPeriod: "ODD 2026-27",
      affectedClass,
      details,
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Quick Switcher for seamless evaluation between all roles
  const quickSwitchRole = (role) => {
    if (role === 'public') {
      setCurrentUser({
        role: 'public',
        isAuthenticated: false,
        profile: null,
        mustChangePassword: false
      });
      setActiveTab('overview');
      showToast("Switched to Tirumala Public Website", "info");
      return;
    }

    if (role === 'student') {
      const student = students[0]; // 21TML0501 M. Sai Vardhan
      setCurrentUser({
        role: 'student',
        isAuthenticated: true,
        profile: student,
        mustChangePassword: false
      });
      setActiveTab('overview');
      showToast(`Logged in as Student: ${student.name} (${student.rollNumber})`, "success");
    } else if (role === 'faculty') {
      const faculty = FACULTY_MEMBERS[0]; // Sri Ch. Mahesh Babu
      setCurrentUser({
        role: 'faculty',
        isAuthenticated: true,
        profile: faculty,
        mustChangePassword: false
      });
      setActiveTab('overview');
      showToast(`Logged in as Faculty: ${faculty.name} (${faculty.department})`, "success");
    } else if (role === 'hod') {
      const cseDept = DEPARTMENTS.find(d => d.id === 'CSE');
      setCurrentUser({
        role: 'hod',
        isAuthenticated: true,
        profile: {
          name: cseDept.hod,
          email: cseDept.hodEmail,
          department: "CSE",
          departmentName: cseDept.name,
          designation: "Head of the Department, CSE"
        },
        mustChangePassword: false
      });
      setActiveTab('department-overview');
      showToast(`Logged in as HOD: ${cseDept.hod} (${cseDept.name})`, "success");
    } else if (role === 'principal') {
      setCurrentUser({
        role: 'principal',
        isAuthenticated: true,
        profile: {
          name: COLLEGE_INFO.principal.name,
          qualification: COLLEGE_INFO.principal.qualification,
          email: COLLEGE_INFO.principal.email,
          designation: "Principal & Institutional Head",
          institution: COLLEGE_INFO.name
        },
        mustChangePassword: false
      });
      setActiveTab('college-overview');
      showToast(`Logged in as Principal: ${COLLEGE_INFO.principal.name}`, "success");
    }
  };

  // Explicit login with credentials simulation
  const loginWithCredentials = ({ role, username, password }) => {
    if (role === 'student') {
      const found = students.find(s => s.rollNumber.toUpperCase() === username.trim().toUpperCase());
      const studentObj = found || students[0];
      // Check if first-time password (matching roll number)
      const isInitialPassword = password.trim().toUpperCase() === studentObj.rollNumber.toUpperCase();
      
      setCurrentUser({
        role: 'student',
        isAuthenticated: true,
        profile: studentObj,
        mustChangePassword: isInitialPassword
      });
      setActiveTab('overview');
      setLoginModalOpen(false);
      logAction({
        action: "STUDENT_LOGIN",
        details: `Student logged in with Roll No: ${studentObj.rollNumber}`,
        affectedClass: `${studentObj.year} ${studentObj.department}-${studentObj.section}`
      });
      showToast(`Welcome back, ${studentObj.name}!`, "success");
      return { success: true, mustChange: isInitialPassword };
    }

    if (role === 'faculty') {
      const fac = FACULTY_MEMBERS.find(f => f.staffId.toLowerCase() === username.trim().toLowerCase()) || FACULTY_MEMBERS[0];
      setCurrentUser({
        role: 'faculty',
        isAuthenticated: true,
        profile: fac,
        mustChangePassword: false
      });
      setActiveTab('overview');
      setLoginModalOpen(false);
      logAction({
        action: "FACULTY_LOGIN",
        details: `Faculty logged in: ${fac.name} (${fac.staffId})`,
        affectedClass: fac.department
      });
      showToast(`Welcome Professor ${fac.name}!`, "success");
      return { success: true };
    }

    if (role === 'hod') {
      const dept = DEPARTMENTS.find(d => d.id === 'CSE');
      setCurrentUser({
        role: 'hod',
        isAuthenticated: true,
        profile: {
          name: dept.hod,
          email: dept.hodEmail,
          department: "CSE",
          departmentName: dept.name,
          designation: "Head of Department (CSE)"
        },
        mustChangePassword: false
      });
      setActiveTab('department-overview');
      setLoginModalOpen(false);
      logAction({
        action: "HOD_LOGIN",
        details: `HOD logged in: ${dept.hod} (CSE Dept)`,
        affectedClass: "CSE Department"
      });
      showToast(`Welcome Dr. ${dept.hod}!`, "success");
      return { success: true };
    }

    if (role === 'principal') {
      setCurrentUser({
        role: 'principal',
        isAuthenticated: true,
        profile: {
          name: COLLEGE_INFO.principal.name,
          designation: "Principal",
          email: COLLEGE_INFO.principal.email
        },
        mustChangePassword: false
      });
      setActiveTab('college-overview');
      setLoginModalOpen(false);
      logAction({
        action: "PRINCIPAL_LOGIN",
        details: `Principal logged in: ${COLLEGE_INFO.principal.name}`,
        affectedClass: "All Departments"
      });
      showToast(`Welcome Principal ${COLLEGE_INFO.principal.name}!`, "success");
      return { success: true };
    }
  };

  const logout = () => {
    logAction({
      action: "USER_LOGOUT",
      details: `${currentUser.profile?.name || "User"} signed out`
    });
    setCurrentUser({
      role: 'public',
      isAuthenticated: false,
      profile: null,
      mustChangePassword: false
    });
    setActiveTab('overview');
    showToast("Signed out successfully", "info");
  };

  // Change password method
  const updatePassword = (newPassword) => {
    setCurrentUser(prev => ({ ...prev, mustChangePassword: false }));
    showToast("Password updated successfully and encrypted in session.", "success");
    logAction({
      action: "PASSWORD_CHANGE",
      details: "Temporary password changed and secured"
    });
  };

  // Student creation by Faculty or HOD (PRD 5.2 & 7.1)
  const createStudent = (newStudentData) => {
    // Uniqueness check
    const exists = students.some(s => s.rollNumber.toUpperCase() === newStudentData.rollNumber.trim().toUpperCase());
    if (exists) {
      showToast(`Roll Number ${newStudentData.rollNumber} already exists in the registry!`, "error");
      return { success: false, message: "Duplicate Roll Number" };
    }

    const created = {
      id: `std-${Date.now()}`,
      rollNumber: newStudentData.rollNumber.trim().toUpperCase(),
      name: newStudentData.name.trim(),
      department: newStudentData.department,
      year: newStudentData.year || "IV Year",
      semester: newStudentData.semester || "VII Semester",
      section: newStudentData.section || "A",
      email: newStudentData.email || `${newStudentData.rollNumber.toLowerCase()}@tecnrt.org`,
      phone: newStudentData.phone || "+91 99999 88888",
      gender: newStudentData.gender || "Male",
      dob: newStudentData.dob || "2003-01-01",
      fatherName: newStudentData.fatherName || "Parent / Guardian",
      address: newStudentData.address || "Narasaraopet, AP",
      bloodGroup: newStudentData.bloodGroup || "O+",
      admissionType: newStudentData.admissionType || "Convener Quota (EAPCET)",
      cgpa: parseFloat(newStudentData.cgpa) || 8.0,
      sgpaLast: 8.0,
      attendanceOverall: parseFloat(newStudentData.attendance) || 85.0,
      status: "Active",
      accountSetup: false,
      totalClassesHeld: 200,
      totalClassesAttended: Math.round(200 * ((parseFloat(newStudentData.attendance) || 85) / 100)),
      totalClassesAbsent: 200 - Math.round(200 * ((parseFloat(newStudentData.attendance) || 85) / 100)),
      feeStatus: "Pending",
      feeDue: 65000,
      totalFee: 65000
    };

    setStudents(prev => [created, ...prev]);
    logAction({
      action: "STUDENT_RECORD_CREATED",
      details: `Created new student: ${created.name} (${created.rollNumber}) in ${created.department}`,
      affectedClass: `${created.year} ${created.department}-${created.section}`
    });
    showToast(`Student ${created.name} (${created.rollNumber}) added to roster!`, "success");
    return { success: true, student: created };
  };

  // Submit attendance from spreadsheet upload (PRD 6.4 & 6.6)
  const submitAttendanceUpload = ({ fileName, validRows, submissionType, context }) => {
    // Update student attendance records
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        const match = validRows.find(r => r.rollNumber.toUpperCase() === student.rollNumber.toUpperCase());
        if (match) {
          const updatedAttended = match.attended;
          const updatedHeld = match.totalHeld;
          const updatedPct = match.calculatedPercentage;
          const status = updatedPct < 65 ? "Detained Warning (<65%)" : updatedPct < 75 ? "Active (Condonation Alert)" : "Active";
          return {
            ...student,
            totalClassesHeld: updatedHeld,
            totalClassesAttended: updatedAttended,
            totalClassesAbsent: match.absent,
            attendanceOverall: updatedPct,
            status
          };
        }
        return student;
      });
    });

    const auditRef = `AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const historyItem = {
      id: `UPL-${Math.floor(1000 + Math.random() * 9000)}`,
      fileName,
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      uploadedBy: `${currentUser.profile?.name || "Faculty Member"}`,
      academicPeriod: context.period || "September 2026",
      class: context.classSection || "IV B.Tech CSE-A",
      subject: context.subject || "CS711PE - Full Stack Web Dev",
      totalRows: validRows.length,
      validRows: validRows.length,
      rejectedRows: 0,
      status: "Verified & Applied to Dashboards",
      nature: submissionType === 'new' ? "New Period Submission" : submissionType === 'replace' ? "Replacement / Correction" : "Update Records",
      auditRef
    };

    setUploadHistory(prev => [historyItem, ...prev]);

    logAction({
      action: "ATTENDANCE_UPLOAD_COMMITTED",
      details: `${submissionType.toUpperCase()}: ${fileName} processed for ${validRows.length} students. Updated dashboards instantly.`,
      affectedClass: context.classSection || "IV B.Tech CSE-A"
    });

    showToast(`Successfully published attendance for ${validRows.length} students!`, "success");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        students,
        createStudent,
        submitAttendanceUpload,
        uploadHistory,
        auditLogs,
        logAction,
        quickSwitchRole,
        loginWithCredentials,
        logout,
        updatePassword,
        loginModalOpen,
        setLoginModalOpen,
        loginModalRole,
        setLoginModalRole,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
