import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_STUDENTS, 
  FACULTY_MEMBERS, 
  DEPARTMENTS, 
  AUDIT_LOGS, 
  COLLEGE_INFO,
  ATTENDANCE_UPLOAD_HISTORY,
  INITIAL_EXAM_TIMETABLES,
  calculateProfileCompletion,
  isProfileComplete,
  PROFILE_STATUSES,
  ACCOUNT_STATUSES,
  SEMESTER_STRUCTURE,
  SEMESTER_PROGRESSION,
  normalizeSemesterCode,
  normalizeYear,
  getSemesterProgressionInfo
} from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Current user / active view
  // role: 'public' | 'student' | 'hod' | 'principal' (Faculty completely removed)
  const [currentUser, setCurrentUser] = useState({
    role: 'public',
    isAuthenticated: false,
    profile: null,
    mustChangePassword: false
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [facultyList, setFacultyList] = useState(FACULTY_MEMBERS);
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);
  const [uploadHistory, setUploadHistory] = useState(ATTENDANCE_UPLOAD_HISTORY);
  const [publishedTimetables, setPublishedTimetables] = useState(INITIAL_EXAM_TIMETABLES);
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

  // Quick Switcher for evaluating Student and HOD portals
  const quickSwitchRole = (role, branch) => {
    if (role === 'faculty') {
      showToast("The Faculty Portal has been permanently discontinued.", "warning");
      return;
    }

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
      const student = students.find(s => s.rollNumber === '21TML0501') || students[0];
      setCurrentUser({
        role: 'student',
        isAuthenticated: true,
        profile: student,
        mustChangePassword: false
      });
      setActiveTab('overview');
      showToast(`Logged in as Student: ${student.name} (${student.rollNumber})`, "success");
    } else if (role === 'hod') {
      const branchId = branch || 'CSE';
      const dept = DEPARTMENTS.find(d => d.id === branchId) || DEPARTMENTS.find(d => d.id === 'CSE') || DEPARTMENTS[0];
      setCurrentUser({
        role: 'hod',
        isAuthenticated: true,
        profile: {
          name: dept.hod,
          email: dept.hodEmail,
          department: dept.id,
          departmentName: dept.name,
          designation: `Head of the Department, ${dept.id}`
        },
        mustChangePassword: false
      });
      setActiveTab('department-overview');
      showToast(`Logged in as HOD: ${dept.hod} (${dept.name})`, "success");
    }
  };

  // Explicit login with credentials simulation
  const loginWithCredentials = ({ role, username, password, branch }) => {
    if (role === 'faculty') {
      return { success: false, message: "Faculty Portal has been permanently discontinued." };
    }

    if (role === 'student') {
      const found = students.find(s => s.rollNumber.toUpperCase() === username.trim().toUpperCase());
      if (!found) {
        showToast(`Roll Number ${username} not found in registered records.`, "error");
        return { success: false, message: "Student roll number not registered in college records." };
      }

      // Check Account Provisioning State
      if (found.accountStatus === ACCOUNT_STATUSES.PENDING) {
        showToast(`Account for ${found.rollNumber} is pending provisioning. Please request temporary credential from department HOD.`, "warning");
        return { success: false, message: "Account pending institutional provisioning by HOD." };
      }

      // Check credentials:
      // 1. Permanent private password set by student
      const isCustomPassword = found.password && password.trim() === found.password;
      // 2. Temporary password issued through the provisioning process
      const isTempPassword = found.tempPassword && password.trim() === found.tempPassword;
      // 3. Fallback to roll number if provisioned with default key
      const isInitialPassword = password.trim().toUpperCase() === found.rollNumber.toUpperCase();

      if (!isCustomPassword && !isTempPassword && !isInitialPassword) {
        showToast("Incorrect password or temporary access key.", "error");
        return { success: false, message: "Invalid credentials." };
      }

      // First login requires setting a private password
      const mustChange = (found.mustChangePassword !== false && (isTempPassword || isInitialPassword)) || found.accountStatus !== 'ACTIVE';
      
      setCurrentUser({
        role: 'student',
        isAuthenticated: true,
        profile: found,
        mustChangePassword: mustChange
      });
      setActiveTab('overview');
      setLoginModalOpen(false);
      logAction({
        action: "STUDENT_LOGIN",
        details: `Student logged in with Roll No: ${found.rollNumber}`,
        affectedClass: `${found.year} ${found.department}-${found.section}`
      });
      showToast(`Welcome back, ${found.name}!`, "success");
      return { success: true, mustChange };
    }

    if (role === 'hod') {
      const branchId = branch || 'CSE';
      const dept = DEPARTMENTS.find(d => d.id === branchId) || DEPARTMENTS.find(d => d.id === 'CSE') || DEPARTMENTS[0];
      setCurrentUser({
        role: 'hod',
        isAuthenticated: true,
        profile: {
          name: dept.hod,
          email: username.trim() || dept.hodEmail,
          department: dept.id,
          departmentName: dept.name,
          designation: `Head of Department (${dept.id})`
        },
        mustChangePassword: false
      });
      setActiveTab('department-overview');
      setLoginModalOpen(false);
      logAction({
        action: "HOD_LOGIN",
        details: `HOD logged in: ${dept.hod} (${dept.id} Dept)`,
        affectedClass: `${dept.id} Department`
      });
      showToast(`Welcome Dr. ${dept.hod} (${dept.id})!`, "success");
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
    if (currentUser.role === 'student' && currentUser.profile) {
      const roll = currentUser.profile.rollNumber;
      setStudents(prev => prev.map(s => 
        s.rollNumber === roll 
          ? { ...s, password: newPassword, accountStatus: "ACTIVE", mustChangePassword: false }
          : s
      ));
      setCurrentUser(prev => ({
        ...prev,
        mustChangePassword: false,
        profile: {
          ...prev.profile,
          password: newPassword,
          accountStatus: "ACTIVE",
          mustChangePassword: false
        }
      }));
    } else {
      setCurrentUser(prev => ({ ...prev, mustChangePassword: false }));
    }
    showToast("Password updated successfully and encrypted in session.", "success");
    logAction({
      action: "PASSWORD_CHANGE",
      details: "Temporary password changed and private password secured"
    });
  };

  // Student creation by Faculty or HOD (PRD 5.2 & 7.1)
  const createStudent = (newStudentData) => {
    // Uniqueness check
    const rollClean = newStudentData.rollNumber.trim().toUpperCase();
    const exists = students.some(s => s.rollNumber.toUpperCase() === rollClean);
    if (exists) {
      showToast(`Roll Number ${newStudentData.rollNumber} already exists in the institutional registry!`, "error");
      return { success: false, message: "Duplicate Roll Number" };
    }

    const tempPass = `TEC#${rollClean.slice(-4) || '2026'}@2026`;
    const admYear = newStudentData.year === 'I Year' ? '2024' : newStudentData.year === 'II Year' ? '2023' : newStudentData.year === 'III Year' ? '2022' : '2021';
    const admNum = `ADM-${admYear}-${rollClean.slice(-4) || '0001'}`;

    const created = {
      id: `std-${Date.now()}`,
      rollNumber: rollClean,
      name: newStudentData.name.trim(),
      shortName: newStudentData.shortName || "",
      course: "B.Tech",
      department: newStudentData.department,
      branch: newStudentData.department,
      year: newStudentData.year || "IV Year",
      semester: newStudentData.semester || "VII Semester",
      section: newStudentData.section || "A",
      admissionNumber: admNum,
      dob: newStudentData.dob || "",
      gender: newStudentData.gender || "Not Specified",
      bloodGroup: newStudentData.bloodGroup || "Not Specified",
      phone: newStudentData.phone || "",
      email: newStudentData.email || `${rollClean.toLowerCase()}@tecnrt.org`,
      fatherPhone: newStudentData.fatherPhone || "",
      fatherEmail: newStudentData.fatherEmail || "",
      currentAddress: newStudentData.currentAddress || "",
      permanentAddress: newStudentData.permanentAddress || "",
      fatherName: newStudentData.fatherName || "",
      fatherOccupation: newStudentData.fatherOccupation || "",
      motherName: newStudentData.motherName || "",
      motherOccupation: newStudentData.motherOccupation || "",
      guardianName: newStudentData.guardianName || "",
      guardianContact: newStudentData.guardianContact || "",
      admissionYear: admYear,
      admissionDate: newStudentData.admissionDate || "",
      admissionType: newStudentData.admissionType || "Convener Quota (EAPCET)",
      admissionQuota: newStudentData.admissionQuota || "Convener Quota",
      casteCategory: newStudentData.casteCategory || "",
      scholarshipStatus: newStudentData.scholarshipStatus || "Pending Verification",
      feeReimbursementStatus: newStudentData.feeReimbursementStatus || "Pending Verification",
      profileStatus: PROFILE_STATUSES.INCOMPLETE,
      profileCompletion: 15,
      cgpa: parseFloat(newStudentData.cgpa) || 8.0,
      sgpaLast: 8.0,
      attendanceOverall: newStudentData.attendance ? parseFloat(newStudentData.attendance) : null,
      status: "Active",
      accountSetup: false,
      accountStatus: ACCOUNT_STATUSES.PENDING,
      tempPassword: tempPass,
      mustChangePassword: true,
      provisionedAt: null,
      totalClassesHeld: 0,
      totalClassesAttended: 0,
      totalClassesAbsent: 0,
      feeStatus: "Pending",
      feeDue: 65000,
      totalFee: 65000
    };

    setStudents(prev => [created, ...prev]);
    logAction({
      action: "STUDENT_RECORD_CREATED",
      details: `Created new student: ${created.name} (${created.rollNumber}) in ${created.department} - Profile Incomplete, Account Pending`,
      affectedClass: `${created.year} ${created.department}-${created.section}`
    });
    showToast(`Student ${created.name} (${created.rollNumber}) registered! Profile Incomplete, Account pending.`, "success");
    return { success: true, student: created, tempPassword: tempPass };
  };

  // Update Student Profile (Student enters permitted info, saves immediately without HOD review)
  const updateStudentProfile = (rollNumber, updatedFields) => {
    let updatedStudent = null;
    let isComplete = false;

    setStudents(prev => prev.map(s => {
      if (s.rollNumber.toUpperCase() === rollNumber.toUpperCase()) {
        const merged = { ...s, ...updatedFields };
        isComplete = isProfileComplete(merged);
        const newPct = calculateProfileCompletion(merged);
        const newStatus = isComplete ? PROFILE_STATUSES.COMPLETE : PROFILE_STATUSES.INCOMPLETE;

        updatedStudent = {
          ...merged,
          profileCompletion: newPct,
          profileStatus: newStatus
        };
        return updatedStudent;
      }
      return s;
    }));

    if (currentUser?.profile?.rollNumber?.toUpperCase() === rollNumber.toUpperCase() && updatedStudent) {
      setCurrentUser(prev => ({
        ...prev,
        profile: updatedStudent
      }));
    }

    logAction({
      action: "PROFILE_SAVED",
      details: `Student ${rollNumber} saved profile. Status: ${isComplete ? 'Complete' : 'Incomplete'}.`,
      affectedClass: updatedStudent ? `${updatedStudent.year} ${updatedStudent.department}-${updatedStudent.section}` : "Student Profile"
    });

    if (isComplete) {
      showToast("Profile saved successfully! Status: Complete.", "success");
    } else {
      showToast("Profile saved! Status: Incomplete (fill all required fields).", "info");
    }

    return { success: true, student: updatedStudent, isComplete };
  };

  // Optional Direct record update helper
  const reviewStudentProfile = (rollNumber, { status }) => {
    let updatedStudent = null;
    setStudents(prev => prev.map(s => {
      if (s.rollNumber.toUpperCase() === rollNumber.toUpperCase()) {
        updatedStudent = {
          ...s,
          profileStatus: status || s.profileStatus
        };
        return updatedStudent;
      }
      return s;
    }));
    return { success: true, student: updatedStudent };
  };

  const requestProfileCorrection = () => ({ success: true });
  const reviewCorrectionRequest = () => ({ success: true });

  // Account Provisioning
  const provisionStudentAccount = (rollNumber) => {
    let tempKey = `TEC#${rollNumber.slice(-4) || '2026'}@2026`;
    let updatedStudent = null;

    setStudents(prev => prev.map(s => {
      if (s.rollNumber.toUpperCase() === rollNumber.toUpperCase()) {
        tempKey = s.tempPassword || tempKey;
        updatedStudent = {
          ...s,
          accountStatus: ACCOUNT_STATUSES.PROVISIONED,
          tempPassword: tempKey,
          mustChangePassword: true,
          provisionedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        return updatedStudent;
      }
      return s;
    }));

    logAction({
      action: "ACCOUNT_PROVISIONED",
      details: `HOD issued provisioning credentials for student ${rollNumber}`,
      affectedClass: updatedStudent ? `${updatedStudent.year} ${updatedStudent.department}-${updatedStudent.section}` : "Security"
    });

    showToast(`Account provisioned for ${rollNumber}! Temporary access key generated.`, "success");
    return { success: true, tempPassword: tempKey, student: updatedStudent };
  };

  // Batch provision all pending accounts in department
  const batchProvisionAccounts = (department) => {
    let count = 0;
    setStudents(prev => prev.map(s => {
      if (s.department === department && s.accountStatus === ACCOUNT_STATUSES.PENDING) {
        count++;
        return {
          ...s,
          accountStatus: ACCOUNT_STATUSES.PROVISIONED,
          tempPassword: `TEC#${s.rollNumber.slice(-4) || '2026'}@2026`,
          mustChangePassword: true,
          provisionedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
      }
      return s;
    }));

    if (count > 0) {
      logAction({
        action: "BATCH_ACCOUNTS_PROVISIONED",
        details: `HOD provisioned ${count} student portal accounts in ${department}`,
        affectedClass: `${department} Accounts`
      });
      showToast(`Provisioned ${count} pending student accounts in ${department}!`, "success");
    } else {
      showToast("No pending student accounts found to provision in this department.", "info");
    }
    return { success: true, count };
  };

  // Submit attendance from spreadsheet upload (Overall Multi-Subject & Single Subject)
  const submitAttendanceUpload = ({ fileName, validRows, submissionType, context }) => {
    // Update student attendance records
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        const match = validRows.find(r => r.rollNumber.toUpperCase() === student.rollNumber.toUpperCase());
        if (match) {
          const updatedPct = match.overallAttendance !== undefined ? match.overallAttendance : match.calculatedPercentage;
          const status = updatedPct < 65 ? "Detained Warning (<65%)" : updatedPct < 75 ? "Active (Condonation Alert)" : "Active";
          
          let totalHeld = match.totalHeld;
          let totalAttended = match.attended;
          let totalAbsent = match.absent;
          let subjectAttendance = student.subjectAttendance;

          if (match.subjects && match.subjects.length > 0) {
            subjectAttendance = match.subjects.map(sub => {
              const held = 40;
              const attended = Math.round(held * (sub.attendancePct / 100));
              return {
                code: sub.code,
                name: sub.name,
                faculty: "Department Faculty",
                classesHeld: held,
                classesAttended: attended,
                attendancePct: sub.attendancePct
              };
            });
            totalHeld = subjectAttendance.reduce((acc, s) => acc + s.classesHeld, 0) || 240;
            totalAttended = subjectAttendance.reduce((acc, s) => acc + s.classesAttended, 0) || Math.round(totalHeld * (updatedPct / 100));
            totalAbsent = totalHeld - totalAttended;
          }

          return {
            ...student,
            totalClassesHeld: totalHeld || 240,
            totalClassesAttended: totalAttended || 212,
            totalClassesAbsent: totalAbsent ?? ((totalHeld || 240) - (totalAttended || 212)),
            attendanceOverall: updatedPct,
            subjectAttendance: subjectAttendance || student.subjectAttendance,
            status
          };
        }
        return student;
      });
    });

    // Sync active student profile if currently viewing student portal
    setCurrentUser(curr => {
      if (curr.role === 'student' && curr.profile) {
        const match = validRows.find(r => r.rollNumber.toUpperCase() === curr.profile.rollNumber.toUpperCase());
        if (match) {
          const updatedPct = match.overallAttendance !== undefined ? match.overallAttendance : match.calculatedPercentage;
          const status = updatedPct < 65 ? "Detained Warning (<65%)" : updatedPct < 75 ? "Active (Condonation Alert)" : "Active";
          
          let totalHeld = match.totalHeld;
          let totalAttended = match.attended;
          let totalAbsent = match.absent;
          let subjectAttendance = curr.profile.subjectAttendance;

          if (match.subjects && match.subjects.length > 0) {
            subjectAttendance = match.subjects.map(sub => {
              const held = 40;
              const attended = Math.round(held * (sub.attendancePct / 100));
              return {
                code: sub.code,
                name: sub.name,
                faculty: "Department Faculty",
                classesHeld: held,
                classesAttended: attended,
                attendancePct: sub.attendancePct
              };
            });
            totalHeld = subjectAttendance.reduce((acc, s) => acc + s.classesHeld, 0) || 240;
            totalAttended = subjectAttendance.reduce((acc, s) => acc + s.classesAttended, 0) || Math.round(totalHeld * (updatedPct / 100));
            totalAbsent = totalHeld - totalAttended;
          }

          return {
            ...curr,
            profile: {
              ...curr.profile,
              totalClassesHeld: totalHeld || 240,
              totalClassesAttended: totalAttended || 212,
              totalClassesAbsent: totalAbsent ?? ((totalHeld || 240) - (totalAttended || 212)),
              attendanceOverall: updatedPct,
              subjectAttendance: subjectAttendance || curr.profile.subjectAttendance,
              status
            }
          };
        }
      }
      return curr;
    });

    const auditRef = `AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const historyItem = {
      id: `UPL-${Math.floor(1000 + Math.random() * 9000)}`,
      fileName,
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      uploadedBy: `${currentUser.profile?.name || "HOD Office"}`,
      academicPeriod: context.period || "October 2026",
      class: context.classSection || `${context.year || "II Year"} ${context.branch || "CSE"}-${context.section || "A"}`,
      subject: context.subjectsSummary || context.subject || "All Subjects (Overall Section Attendance)",
      totalRows: validRows.length,
      validRows: validRows.length,
      rejectedRows: 0,
      status: "Published & Active on Student Portals",
      nature: submissionType === 'new' ? "New Period Submission" : submissionType === 'replace' ? "Replacement / Correction" : "Update Records",
      auditRef
    };

    setUploadHistory(prev => [historyItem, ...prev]);

    logAction({
      action: "ATTENDANCE_UPLOAD_COMMITTED",
      details: `HOD Published ${submissionType.toUpperCase()}: ${fileName} for ${validRows.length} students in ${context.classSection || "Target Section"}.`,
      affectedClass: context.classSection || "Target Section"
    });

    showToast(`Successfully published overall attendance for ${validRows.length} students!`, "success");
  };

  // Manual Attendance Update for individual student (PRD Requirement 5)
  const updateManualAttendance = ({ rollNumber, classesHeld, classesAttended, reason, subject, period }) => {
    const held = parseInt(classesHeld, 10);
    const attended = parseInt(classesAttended, 10);

    if (isNaN(held) || isNaN(attended) || held <= 0 || attended < 0 || attended > held) {
      showToast("Invalid attendance values: Attended must not exceed classes held.", "error");
      return { success: false, message: "Invalid numbers" };
    }

    const absent = held - attended;
    const calculatedPercentage = parseFloat(((attended / held) * 100).toFixed(1));
    const status = calculatedPercentage < 65 ? "Detained Warning (<65%)" : calculatedPercentage < 75 ? "Active (Condonation Alert)" : "Active";

    let targetStudent = null;

    setStudents(prev => prev.map(s => {
      if (s.rollNumber.toUpperCase() === rollNumber.toUpperCase()) {
        targetStudent = s;
        return {
          ...s,
          totalClassesHeld: held,
          totalClassesAttended: attended,
          totalClassesAbsent: absent,
          attendanceOverall: calculatedPercentage,
          status
        };
      }
      return s;
    }));

    // Sync active student profile if currently viewing student portal
    setCurrentUser(curr => {
      if (curr.role === 'student' && curr.profile?.rollNumber?.toUpperCase() === rollNumber.toUpperCase()) {
        return {
          ...curr,
          profile: {
            ...curr.profile,
            totalClassesHeld: held,
            totalClassesAttended: attended,
            totalClassesAbsent: absent,
            attendanceOverall: calculatedPercentage,
            status
          }
        };
      }
      return curr;
    });

    logAction({
      action: "MANUAL_ATTENDANCE_RECORDED",
      details: `HOD manual adjustment for ${rollNumber}: ${attended}/${held} (${calculatedPercentage}%). Reason: ${reason || "Administrative adjustment"}.`,
      affectedClass: targetStudent ? `${targetStudent.year} ${targetStudent.department}-${targetStudent.section}` : rollNumber
    });

    showToast(`Attendance updated for student ${rollNumber} to ${calculatedPercentage}%!`, "success");
    return { success: true };
  };

  // Batch Student Import via Excel / CSV into a specific section (Requirement 4)
  const importStudentsToSection = ({ branch, year, semester, section, newStudents }) => {
    const valid = [];
    const rejected = [];
    const admYear = year === 'I Year' ? '2024' : year === 'II Year' ? '2023' : year === 'III Year' ? '2022' : '2021';

    newStudents.forEach(st => {
      const roll = (st.rollNumber || "").trim().toUpperCase();
      const name = (st.name || "").trim();

      if (!roll || !name) {
        rejected.push({ ...st, reason: "Missing Roll Number or Student Name" });
        return;
      }

      // Check duplicate against active state and current batch
      const exists = students.some(s => s.rollNumber.toUpperCase() === roll) || valid.some(s => s.rollNumber === roll);
      if (exists) {
        rejected.push({ ...st, reason: `Roll Number [${roll}] already exists in institutional roster` });
        return;
      }

      valid.push({
        id: `std-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        rollNumber: roll,
        name,
        shortName: "",
        course: "B.Tech",
        department: branch || "CSE",
        branch: branch || "CSE",
        year: year || "IV Year",
        semester: semester || "VII Semester",
        section: section || "A",
        admissionNumber: `ADM-${admYear}-${roll.slice(-4) || '0001'}`,
        dob: "",
        gender: "Not Specified",
        bloodGroup: "Not Specified",
        phone: "",
        email: `${roll.toLowerCase()}@tecnrt.org`,
        fatherPhone: "",
        fatherEmail: "",
        currentAddress: "",
        permanentAddress: "",
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        guardianName: "",
        guardianContact: "",
        admissionYear: admYear,
        admissionDate: "",
        admissionType: "Convener Quota (EAPCET)",
        admissionQuota: "Convener Quota",
        casteCategory: "",
        scholarshipStatus: "Pending Verification",
        feeReimbursementStatus: "Pending Verification",
        profileStatus: PROFILE_STATUSES.INCOMPLETE,
        profileCompletion: 15,
        cgpa: 8.0,
        sgpaLast: 8.0,
        attendanceOverall: null,
        status: "Active",
        accountSetup: false,
        accountStatus: ACCOUNT_STATUSES.PENDING,
        tempPassword: `TEC#${roll.slice(-4) || '2026'}@2026`,
        mustChangePassword: true,
        provisionedAt: null,
        totalClassesHeld: 0,
        totalClassesAttended: 0,
        totalClassesAbsent: 0,
        feeStatus: "Pending",
        feeDue: 65000,
        totalFee: 65000
      });
    });

    if (valid.length > 0) {
      setStudents(prev => [...valid, ...prev]);
      logAction({
        action: "BATCH_STUDENTS_IMPORTED",
        details: `Imported ${valid.length} students into ${year} ${branch}-${section} (${semester})`,
        affectedClass: `${year} ${branch}-${section}`
      });
      showToast(`Imported ${valid.length} students successfully into ${year} ${branch}-${section}!`, "success");
    }

    if (rejected.length > 0) {
      showToast(`${rejected.length} rows were skipped due to validation errors.`, "warning");
    }

    return { 
      success: valid.length > 0, 
      count: valid.length, 
      importedCount: valid.length, 
      rejectedCount: rejected.length, 
      rejected 
    };
  };

  // Publish Examination Timetables (Requirement 8)
  const publishTimetable = ({ branch, year, semester, examType, title, instructions, schedule }) => {
    const id = `TT-${(examType || "REG").substring(0, 3).toUpperCase()}-${branch || "CSE"}-${(year || "IV").replace(/\s+/g, '')}-${(semester || "VII").replace(/\s+/g, '')}`;
    
    const newEntry = {
      id,
      branch: branch || "CSE",
      year: year || "IV Year",
      semester: semester || "VII Semester",
      examType: examType || "Regular",
      title: title || `B.Tech ${year} ${semester} ${examType} Examination Schedule`,
      publishedDate: new Date().toISOString().substring(0, 10),
      publishedBy: `${currentUser.profile?.name || "Dr. K. Srinivasa Rao"} (HOD, ${branch || "CSE"})`,
      status: "Published",
      instructions: instructions || "Students must carry official JNTUK Hall Tickets and College Identity Cards. Mobile phones are prohibited.",
      schedule: schedule || []
    };

    setPublishedTimetables(prev => {
      const filtered = prev.filter(t => t.id !== id);
      return [newEntry, ...filtered];
    });

    logAction({
      action: "EXAM_TIMETABLE_PUBLISHED",
      details: `HOD published ${examType} Exam Timetable for ${branch} ${year} (${semester}) with ${schedule.length} subjects.`,
      affectedClass: `${branch} ${year}`
    });

    showToast(`Published ${examType} examination timetable for ${branch} ${year}! Visible to students.`, "success");
    return { success: true, timetable: newEntry };
  };

  // Faculty Directory & Workload Allocation
  const addFacultyMember = (memberData) => {
    const exists = facultyList.some(f => f.staffId.toUpperCase() === memberData.staffId.trim().toUpperCase());
    if (exists) {
      showToast(`Staff ID ${memberData.staffId} already exists in faculty directory!`, "error");
      return { success: false, message: "Duplicate Staff ID" };
    }

    const newFaculty = {
      id: `fac-${Date.now()}`,
      staffId: memberData.staffId.trim().toUpperCase(),
      name: memberData.name.trim(),
      designation: memberData.designation || "Assistant Professor",
      department: memberData.department,
      qualification: memberData.qualification.trim(),
      experience: memberData.experience.trim(),
      email: memberData.email.trim().toLowerCase(),
      phone: memberData.phone.trim(),
      assignedSubjects: memberData.assignedSubjects || [],
      weeklyHours: Number(memberData.weeklyHours) || 16,
      pendingUploads: 0,
      attendanceStatus: "Active & Compliant"
    };

    setFacultyList(prev => [newFaculty, ...prev]);
    logAction({
      action: "FACULTY_ALLOCATED",
      details: `HOD allocated new staff member ${newFaculty.name} (${newFaculty.staffId}) to ${newFaculty.department}`,
      affectedClass: `${newFaculty.department} Faculty`
    });
    showToast(`Staff member ${newFaculty.name} (${newFaculty.staffId}) successfully allocated!`, "success");
    return { success: true, faculty: newFaculty };
  };

  const updateFacultyMember = (staffId, updatedData) => {
    setFacultyList(prev => prev.map(f => {
      if (f.staffId.toUpperCase() === staffId.toUpperCase() || f.id === staffId) {
        return { ...f, ...updatedData };
      }
      return f;
    }));
    logAction({
      action: "FACULTY_ALLOCATION_UPDATED",
      details: `HOD updated workload and allocation for ${updatedData.name || staffId}`,
      affectedClass: `${updatedData.department || 'Department'} Faculty`
    });
    showToast(`Workload and allocation updated for ${updatedData.name || staffId}.`, "success");
    return { success: true };
  };

  // Student Academic Progression / Promotion
  const promoteStudent = (rollNumber, { destinationYear, destinationSemester, destinationSection } = {}) => {
    const student = students.find(s => s.rollNumber.toUpperCase() === rollNumber.trim().toUpperCase());
    if (!student) {
      showToast(`Student ${rollNumber} not found.`, "error");
      return { success: false, message: "Student not found" };
    }

    const currentSemCode = normalizeSemesterCode(student.semester);
    const progression = getSemesterProgressionInfo(currentSemCode);

    if (!progression.canPromote && !destinationSemester) {
      showToast(`Student ${student.name} (${student.rollNumber}) has completed the final semester (4-2).`, "warning");
      return { success: false, message: "Student has completed final semester" };
    }

    const nextSem = destinationSemester || progression.nextSem;
    const nextYear = destinationYear || progression.nextYear;
    const nextSection = destinationSection || student.section || 'A';

    // Preserve historical attendance records in semesterAttendance map
    const existingSemAttendance = student.semesterAttendance || {};
    const updatedSemAttendance = {
      ...existingSemAttendance,
      [currentSemCode]: existingSemAttendance[currentSemCode] || {
        conducted: student.totalClassesHeld || 0,
        attended: student.totalClassesAttended || 0,
        absent: student.totalClassesAbsent ?? Math.max(0, (student.totalClassesHeld || 0) - (student.totalClassesAttended || 0)),
        percentage: student.attendanceOverall ? String(student.attendanceOverall) : "0.00",
        monthlyAttendance: student.monthlyAttendance ? [...student.monthlyAttendance] : []
      }
    };

    const promotionRecord = {
      promotedAt: new Date().toISOString(),
      promotedBy: currentUser.profile?.name || "HOD",
      fromSemester: currentSemCode,
      fromYear: student.year,
      fromSection: student.section,
      toSemester: nextSem,
      toYear: nextYear,
      toSection: nextSection
    };

    const updatedStudent = {
      ...student,
      year: nextYear,
      semester: nextSem,
      section: nextSection,
      semesterAttendance: updatedSemAttendance,
      promotionHistory: [...(student.promotionHistory || []), promotionRecord]
    };

    setStudents(prev => prev.map(s => (s.rollNumber.toUpperCase() === rollNumber.trim().toUpperCase() ? updatedStudent : s)));

    // Synchronize current logged in student profile if applicable
    if (currentUser.role === 'student' && currentUser.profile?.rollNumber?.toUpperCase() === rollNumber.trim().toUpperCase()) {
      setCurrentUser(prev => ({
        ...prev,
        profile: updatedStudent
      }));
    }

    logAction({
      action: "STUDENT_PROMOTED",
      details: `Student ${student.name} (${student.rollNumber}) promoted from ${currentSemCode} (${student.year}) to ${nextSem} (${nextYear}) - Section ${nextSection}`,
      affectedClass: `${nextYear} ${student.department || 'CSE'}-${nextSection}`
    });

    showToast(`Successfully promoted ${student.name} to ${nextSem} (${nextYear})!`, "success");
    return { success: true, student: updatedStudent };
  };

  const batchPromoteStudents = (rollNumbers = []) => {
    if (!rollNumbers.length) {
      showToast("No students selected for promotion.", "warning");
      return { success: false, message: "No students selected" };
    }

    let promotedCount = 0;
    const updatedStudentsList = students.map(student => {
      const isSelected = rollNumbers.some(rn => rn.toUpperCase() === student.rollNumber.toUpperCase());
      if (!isSelected) return student;

      const currentSemCode = normalizeSemesterCode(student.semester);
      const progression = getSemesterProgressionInfo(currentSemCode);
      if (!progression.canPromote) return student;

      const nextSem = progression.nextSem;
      const nextYear = progression.nextYear;
      const nextSection = student.section || 'A';

      const existingSemAttendance = student.semesterAttendance || {};
      const updatedSemAttendance = {
        ...existingSemAttendance,
        [currentSemCode]: existingSemAttendance[currentSemCode] || {
          conducted: student.totalClassesHeld || 0,
          attended: student.totalClassesAttended || 0,
          absent: student.totalClassesAbsent ?? Math.max(0, (student.totalClassesHeld || 0) - (student.totalClassesAttended || 0)),
          percentage: student.attendanceOverall ? String(student.attendanceOverall) : "0.00",
          monthlyAttendance: student.monthlyAttendance ? [...student.monthlyAttendance] : []
        }
      };

      promotedCount++;
      return {
        ...student,
        year: nextYear,
        semester: nextSem,
        section: nextSection,
        semesterAttendance: updatedSemAttendance,
        promotionHistory: [
          ...(student.promotionHistory || []),
          {
            promotedAt: new Date().toISOString(),
            promotedBy: currentUser.profile?.name || "HOD",
            fromSemester: currentSemCode,
            fromYear: student.year,
            fromSection: student.section,
            toSemester: nextSem,
            toYear: nextYear,
            toSection: nextSection
          }
        ]
      };
    });

    setStudents(updatedStudentsList);

    if (currentUser.role === 'student' && currentUser.profile?.rollNumber) {
      const activeUpdated = updatedStudentsList.find(s => s.rollNumber.toUpperCase() === currentUser.profile.rollNumber.toUpperCase());
      if (activeUpdated) {
        setCurrentUser(prev => ({ ...prev, profile: activeUpdated }));
      }
    }

    logAction({
      action: "BATCH_STUDENTS_PROMOTED",
      details: `HOD batch-promoted ${promotedCount} students to their next semester progression`,
      affectedClass: `Multiple Sections`
    });

    showToast(`Successfully promoted ${promotedCount} student(s) to next semester!`, "success");
    return { success: true, count: promotedCount };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        students,
        setStudents,
        createStudent,
        updateStudentProfile,
        reviewStudentProfile,
        requestProfileCorrection,
        reviewCorrectionRequest,
        provisionStudentAccount,
        batchProvisionAccounts,
        importStudentsToSection,
        updateManualAttendance,
        submitAttendanceUpload,
        promoteStudent,
        batchPromoteStudents,
        facultyList,
        setFacultyList,
        addFacultyMember,
        updateFacultyMember,
        publishedTimetables,
        publishTimetable,
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

