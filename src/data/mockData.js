// Tirumala Engineering College (TEC), Narasaraopet - Master Mock Data & State Store
// EAMCET / EAPCET Code: TMLN | Permanently Affiliated to JNTUK | AICTE Approved | NAAC 'A' Grade

export const COLLEGE_INFO = {
  name: "Tirumala Engineering College",
  shortName: "TEC",
  eamcetCode: "TMLN",
  counselingCode: "TMLN",
  tagline: "Empowering Minds, Engineering the Future",
  established: 2008,
  affiliations: [
    "Permanently Affiliated to JNTUK, Kakinada",
    "Approved by AICTE, New Delhi",
    "Accredited by NAAC with 'A' Grade",
    "NBA Accredited for Eligible B.Tech Programs"
  ],
  campus: {
    address: "Jonnalagadda Village, Narasaraopet Mandal, Palnadu District, Andhra Pradesh - 522601",
    email: "principal@tecnrt.org",
    admissionsEmail: "admissions@tecnrt.org",
    phones: ["+91 8647 218255", "+91 9440 218256", "+91 9848 123456"],
    website: "https://www.tecnrt.org",
    campusArea: "25+ Lush Green Acres",
    studentStrength: 3450,
    facultyStrength: 185,
    placementRate: "88.4%",
    highestPackage: "18.5 LPA",
    averagePackage: "4.8 LPA"
  },
  principal: {
    name: "Dr. V. Narayana",
    qualification: "M.Tech, Ph.D, FIE",
    experience: "25+ Years in Technical Education & Administration",
    email: "principal@tecnrt.org"
  }
};

export const DEPARTMENTS = [
  {
    id: "CSE",
    code: "05",
    name: "Computer Science & Engineering",
    hod: "Dr. K. Srinivasa Rao",
    hodEmail: "hod.cse@tecnrt.org",
    intake: 180,
    studentsCount: 720,
    facultyCount: 38,
    labsCount: 8,
    avgAttendance: 86.4,
    passRate: 91.2,
    establishedYear: 2008,
    description: "Equipped with state-of-the-art computing labs, NVIDIA AI hardware, cloud infrastructure, and active industry partnerships.",
    specializations: ["Software Engineering", "Full Stack Development", "Cloud Architecture", "Cybersecurity"]
  },
  {
    id: "AIML",
    code: "42",
    name: "CSE (Artificial Intelligence & Machine Learning)",
    hod: "Dr. M. Rama Krishna",
    hodEmail: "hod.aiml@tecnrt.org",
    intake: 120,
    studentsCount: 480,
    facultyCount: 24,
    labsCount: 5,
    avgAttendance: 88.2,
    passRate: 93.0,
    establishedYear: 2020,
    description: "Focuses on deep learning algorithms, computer vision, natural language processing, and neural network computing.",
    specializations: ["Deep Learning", "Generative AI", "Computer Vision", "Robotics Perception"]
  },
  {
    id: "AIDS",
    code: "54",
    name: "CSE (Artificial Intelligence & Data Science)",
    hod: "Dr. S. Bhavani Shankar",
    hodEmail: "hod.aids@tecnrt.org",
    intake: 120,
    studentsCount: 480,
    facultyCount: 22,
    labsCount: 4,
    avgAttendance: 85.1,
    passRate: 89.8,
    establishedYear: 2021,
    description: "Comprehensive curriculum combining big data engineering, predictive analytics, business intelligence, and statistics.",
    specializations: ["Big Data Analytics", "Data Warehousing", "Statistical Modeling", "Predictive Analytics"]
  },
  {
    id: "IT",
    code: "12",
    name: "Information Technology",
    hod: "Dr. T. Venkata Reddy",
    hodEmail: "hod.it@tecnrt.org",
    intake: 60,
    studentsCount: 240,
    facultyCount: 16,
    labsCount: 4,
    avgAttendance: 83.9,
    passRate: 88.5,
    establishedYear: 2008,
    description: "Prepares students in system administration, distributed systems, information security, and enterprise software.",
    specializations: ["DevOps", "Database Administration", "Network Systems", "Information Security"]
  },
  {
    id: "ECE",
    code: "04",
    name: "Electronics & Communication Engineering",
    hod: "Dr. P. Venkateswarlu",
    hodEmail: "hod.ece@tecnrt.org",
    intake: 180,
    studentsCount: 720,
    facultyCount: 36,
    labsCount: 7,
    avgAttendance: 84.7,
    passRate: 89.4,
    establishedYear: 2008,
    description: "Cutting-edge VLSI Design, Embedded Systems, IoT incubation center, and Advanced Signal Processing laboratories.",
    specializations: ["VLSI Design", "Embedded IoT", "Wireless Communications", "Signal Processing"]
  },
  {
    id: "EEE",
    code: "02",
    name: "Electrical & Electronics Engineering",
    hod: "Dr. G. Suresh Babu",
    hodEmail: "hod.eee@tecnrt.org",
    intake: 60,
    studentsCount: 240,
    facultyCount: 18,
    labsCount: 5,
    avgAttendance: 82.5,
    passRate: 86.2,
    establishedYear: 2008,
    description: "Focus on renewable energy systems, electric vehicle powertrain tech, smart grids, and industrial drive automation.",
    specializations: ["EV Systems", "Renewable Energy", "Smart Grid Control", "Power Electronics"]
  },
  {
    id: "MECH",
    code: "03",
    name: "Mechanical Engineering",
    hod: "Dr. B. Prasad",
    hodEmail: "hod.mech@tecnrt.org",
    intake: 60,
    studentsCount: 240,
    facultyCount: 17,
    labsCount: 6,
    avgAttendance: 81.3,
    passRate: 85.0,
    establishedYear: 2008,
    description: "Features Advanced Robotics Control lab, CNC machining center, 3D printing research facility, and thermal engineering labs.",
    specializations: ["Applied Robotics", "Additive Manufacturing", "Automotive Dynamics", "CAD/CAM/CAE"]
  },
  {
    id: "CIVIL",
    code: "01",
    name: "Civil Engineering",
    hod: "Dr. N. Chandrasekhar",
    hodEmail: "hod.civil@tecnrt.org",
    intake: 60,
    studentsCount: 210,
    facultyCount: 15,
    labsCount: 5,
    avgAttendance: 80.8,
    passRate: 84.6,
    establishedYear: 2009,
    description: "Geotechnical testing facilities, Total Station survey kits, environmental engineering lab, and STAAD Pro structural suite.",
    specializations: ["Structural Engineering", "Geotechnical Tech", "GIS & Remote Sensing", "Transportation Infra"]
  },
  {
    id: "ASH",
    code: "00",
    name: "Applied Sciences & Humanities",
    hod: "Dr. Ch. Anjaneyulu",
    hodEmail: "hod.ash@tecnrt.org",
    intake: 0,
    studentsCount: 880,
    facultyCount: 28,
    labsCount: 4,
    avgAttendance: 89.6,
    passRate: 94.1,
    establishedYear: 2008,
    description: "Foundation for first-year engineering students in Engineering Mathematics, Applied Physics, Chemistry, and English Communication.",
    specializations: ["Engineering Mathematics", "Applied Physics", "Green Chemistry", "Professional English"]
  }
];

export const PROFILE_STATUSES = {
  COMPLETE: 'Complete',
  INCOMPLETE: 'Incomplete'
};

export const ACCOUNT_STATUSES = {
  PENDING: 'PENDING',
  PROVISIONED: 'PROVISIONED',
  ACTIVE: 'ACTIVE'
};

export const REQUIRED_PROFILE_FIELDS = [
  'name',
  'dob',
  'gender',
  'bloodGroup',
  'phone',
  'email',
  'fatherName',
  'fatherPhone',
  'motherName',
  'currentAddress',
  'permanentAddress',
  'admissionYear',
  'admissionType'
];

export const isProfileComplete = (student) => {
  if (!student) return false;
  for (const key of REQUIRED_PROFILE_FIELDS) {
    const val = student[key];
    if (!val || typeof val !== 'string' || val.trim() === '' || val === 'Not Specified') {
      return false;
    }
  }
  const phoneDigits = (student.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) return false;

  const fatherPhoneDigits = (student.fatherPhone || '').replace(/\D/g, '');
  if (fatherPhoneDigits.length < 10) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(student.email || '')) return false;

  return true;
};

export const getProfileStatus = (student) => {
  return isProfileComplete(student) ? PROFILE_STATUSES.COMPLETE : PROFILE_STATUSES.INCOMPLETE;
};

export const calculateProfileCompletion = (student) => {
  if (!student) return 0;
  const fields = [
    student.name,
    student.dob,
    student.gender,
    student.bloodGroup,
    student.phone,
    student.email,
    student.fatherName,
    student.fatherPhone,
    student.motherName,
    student.currentAddress,
    student.permanentAddress,
    student.admissionYear,
    student.admissionType
  ];
  const filled = fields.filter(f => f && typeof f === 'string' && f.trim() !== '' && f !== 'Not Specified').length;
  return Math.round((filled / fields.length) * 100);
};

// =========================================================================
// CANONICAL ACADEMIC SEMESTER STRUCTURE & PROGRESSION (Shared Single Truth)
// =========================================================================
export const SEMESTER_STRUCTURE = [
  { code: '1-1', label: '1-1', fullName: '1st Year I Semester (1-1)', year: '1st Year', yearCode: 'I Year', semesterNumber: 1 },
  { code: '1-2', label: '1-2', fullName: '1st Year II Semester (1-2)', year: '1st Year', yearCode: 'I Year', semesterNumber: 2 },
  { code: '2-1', label: '2-1', fullName: '2nd Year I Semester (2-1)', year: '2nd Year', yearCode: 'II Year', semesterNumber: 3 },
  { code: '2-2', label: '2-2', fullName: '2nd Year II Semester (2-2)', year: '2nd Year', yearCode: 'II Year', semesterNumber: 4 },
  { code: '3-1', label: '3-1', fullName: '3rd Year I Semester (3-1)', year: '3rd Year', yearCode: 'III Year', semesterNumber: 5 },
  { code: '3-2', label: '3-2', fullName: '3rd Year II Semester (3-2)', year: '3rd Year', yearCode: 'III Year', semesterNumber: 6 },
  { code: '4-1', label: '4-1', fullName: '4th Year I Semester (4-1)', year: '4th Year', yearCode: 'IV Year', semesterNumber: 7 },
  { code: '4-2', label: '4-2', fullName: '4th Year II Semester (4-2)', year: '4th Year', yearCode: 'IV Year', semesterNumber: 8 }
];

export const SEMESTER_PROGRESSION = {
  '1-1': { nextSem: '1-2', nextYear: '1st Year' },
  '1-2': { nextSem: '2-1', nextYear: '2nd Year' },
  '2-1': { nextSem: '2-2', nextYear: '2nd Year' },
  '2-2': { nextSem: '3-1', nextYear: '3rd Year' },
  '3-1': { nextSem: '3-2', nextYear: '3rd Year' },
  '3-2': { nextSem: '4-1', nextYear: '4th Year' },
  '4-1': { nextSem: '4-2', nextYear: '4th Year' },
  '4-2': { nextSem: null, nextYear: 'Graduated / Programme Completed' }
};

export const normalizeSemesterCode = (sem) => {
  if (!sem) return '1-1';
  const s = String(sem).trim();
  if (s === '1-1' || s.includes('1-1') || s.startsWith('I Sem') || s === '1' || s === 'I') return '1-1';
  if (s === '1-2' || s.includes('1-2') || s.startsWith('II Sem') || s === '2' || s === 'II') return '1-2';
  if (s === '2-1' || s.includes('2-1') || s.startsWith('III Sem') || s === '3' || s === 'III') return '2-1';
  if (s === '2-2' || s.includes('2-2') || s.startsWith('IV Sem') || s === '4' || s === 'IV') return '2-2';
  if (s === '3-1' || s.includes('3-1') || s.startsWith('V Sem') || s === '5' || s === 'V') return '3-1';
  if (s === '3-2' || s.includes('3-2') || s.startsWith('VI Sem') || s === '6' || s === 'VI') return '3-2';
  if (s === '4-1' || s.includes('4-1') || s.startsWith('VII Sem') || s === '7' || s === 'VII') return '4-1';
  if (s === '4-2' || s.includes('4-2') || s.startsWith('VIII Sem') || s === '8' || s === 'VIII') return '4-2';
  return s;
};

export const normalizeYear = (yr) => {
  if (!yr) return '1st Year';
  const y = String(yr).trim();
  if (y.includes('1') || y.startsWith('I ') || y === 'I Year') return '1st Year';
  if (y.includes('2') || y.startsWith('II ') || y === 'II Year') return '2nd Year';
  if (y.includes('3') || y.startsWith('III ') || y === 'III Year') return '3rd Year';
  if (y.includes('4') || y.startsWith('IV ') || y === 'IV Year') return '4th Year';
  return yr;
};

export const getSemesterProgressionInfo = (currentSem) => {
  const code = normalizeSemesterCode(currentSem);
  const prog = SEMESTER_PROGRESSION[code];
  return {
    currentCode: code,
    nextSem: prog?.nextSem || null,
    nextYear: prog?.nextYear || null,
    canPromote: !!prog?.nextSem
  };
};

export const SAMPLE_MULTI_SEMESTER_ATTENDANCE = {
  "1-1": {
    conducted: 220,
    attended: 200,
    absent: 20,
    percentage: "90.91",
    monthlyAttendance: [
      { month: "September 2023", classesConducted: 55, classesAttended: 51, classesAbsent: 4, attendancePercentage: "92.73" },
      { month: "October 2023", classesConducted: 55, classesAttended: 50, classesAbsent: 5, attendancePercentage: "90.91" },
      { month: "November 2023", classesConducted: 55, classesAttended: 50, classesAbsent: 5, attendancePercentage: "90.91" },
      { month: "December 2023", classesConducted: 55, classesAttended: 49, classesAbsent: 6, attendancePercentage: "89.09" }
    ]
  },
  "1-2": {
    conducted: 230,
    attended: 206,
    absent: 24,
    percentage: "89.57",
    monthlyAttendance: [
      { month: "February 2024", classesConducted: 58, classesAttended: 52, classesAbsent: 6, attendancePercentage: "89.66" },
      { month: "March 2024", classesConducted: 60, classesAttended: 54, classesAbsent: 6, attendancePercentage: "90.00" },
      { month: "April 2024", classesConducted: 56, classesAttended: 50, classesAbsent: 6, attendancePercentage: "89.29" },
      { month: "May 2024", classesConducted: 56, classesAttended: 50, classesAbsent: 6, attendancePercentage: "89.29" }
    ]
  },
  "2-1": {
    conducted: 240,
    attended: 218,
    absent: 22,
    percentage: "90.83",
    monthlyAttendance: [
      { month: "July 2024", classesConducted: 60, classesAttended: 55, classesAbsent: 5, attendancePercentage: "91.67" },
      { month: "August 2024", classesConducted: 60, classesAttended: 55, classesAbsent: 5, attendancePercentage: "91.67" },
      { month: "September 2024", classesConducted: 60, classesAttended: 54, classesAbsent: 6, attendancePercentage: "90.00" },
      { month: "October 2024", classesConducted: 60, classesAttended: 54, classesAbsent: 6, attendancePercentage: "90.00" }
    ]
  },
  "2-2": {
    conducted: 235,
    attended: 210,
    absent: 25,
    percentage: "89.36",
    monthlyAttendance: [
      { month: "January 2025", classesConducted: 58, classesAttended: 52, classesAbsent: 6, attendancePercentage: "89.66" },
      { month: "February 2025", classesConducted: 58, classesAttended: 52, classesAbsent: 6, attendancePercentage: "89.66" },
      { month: "March 2025", classesConducted: 60, classesAttended: 54, classesAbsent: 6, attendancePercentage: "90.00" },
      { month: "April 2025", classesConducted: 59, classesAttended: 52, classesAbsent: 7, attendancePercentage: "88.14" }
    ]
  },
  "3-1": {
    conducted: 240,
    attended: 212,
    absent: 28,
    percentage: "88.33",
    monthlyAttendance: [
      { month: "July 2025", classesConducted: 60, classesAttended: 54, classesAbsent: 6, attendancePercentage: "90.00" },
      { month: "August 2025", classesConducted: 60, classesAttended: 53, classesAbsent: 7, attendancePercentage: "88.33" },
      { month: "September 2025", classesConducted: 60, classesAttended: 53, classesAbsent: 7, attendancePercentage: "88.33" },
      { month: "October 2025", classesConducted: 60, classesAttended: 52, classesAbsent: 8, attendancePercentage: "86.67" }
    ]
  },
  "3-2": {
    conducted: 230,
    attended: 204,
    absent: 26,
    percentage: "88.70",
    monthlyAttendance: [
      { month: "January 2026", classesConducted: 55, classesAttended: 49, classesAbsent: 6, attendancePercentage: "89.09" },
      { month: "February 2026", classesConducted: 55, classesAttended: 49, classesAbsent: 6, attendancePercentage: "89.09" },
      { month: "March 2026", classesConducted: 60, classesAttended: 53, classesAbsent: 7, attendancePercentage: "88.33" },
      { month: "April 2026", classesConducted: 60, classesAttended: 53, classesAbsent: 7, attendancePercentage: "88.33" }
    ]
  },
  "4-1": {
    conducted: 240,
    attended: 212,
    absent: 28,
    percentage: "88.33",
    monthlyAttendance: [
      { month: "July 2026", classesConducted: 56, classesAttended: 50, classesAbsent: 6, attendancePercentage: "89.29" },
      { month: "August 2026", classesConducted: 64, classesAttended: 58, classesAbsent: 6, attendancePercentage: "90.63" },
      { month: "September 2026", classesConducted: 60, classesAttended: 52, classesAbsent: 8, attendancePercentage: "86.67" },
      { month: "October 2026", classesConducted: 60, classesAttended: 52, classesAbsent: 8, attendancePercentage: "86.67" }
    ]
  }
};

export const getStudentSemesterAttendance = (student, semCode) => {
  const code = normalizeSemesterCode(semCode);

  // 1. Check if student has explicit multi-semester attendance records
  if (student?.semesterAttendance?.[code]) {
    const semData = student.semesterAttendance[code];
    const monthly = semData.monthlyAttendance || [];
    const conducted = semData.conducted ?? (monthly.length > 0 ? monthly.reduce((s, m) => s + (m.classesConducted || m.held || 0), 0) : 0);
    const attended = semData.attended ?? (monthly.length > 0 ? monthly.reduce((s, m) => s + (m.classesAttended || m.attended || 0), 0) : 0);
    const absent = semData.absent ?? Math.max(0, conducted - attended);
    const percentage = conducted > 0 ? ((attended / conducted) * 100).toFixed(2) : "0.00";

    return {
      hasData: conducted > 0,
      conducted,
      attended,
      absent,
      percentage,
      monthlyAttendance: monthly
    };
  }

  // 2. If semCode matches student's active semester and has root data
  const currentSem = normalizeSemesterCode(student?.semester || '1-1');
  if (code === currentSem && (student?.monthlyAttendance?.length > 0 || student?.totalClassesHeld > 0)) {
    const monthly = student.monthlyAttendance || [];
    const conducted = monthly.length > 0
      ? monthly.reduce((s, m) => s + (m.classesConducted || m.held || 0), 0)
      : (student.totalClassesHeld || 0);
    const attended = monthly.length > 0
      ? monthly.reduce((s, m) => s + (m.classesAttended || m.attended || 0), 0)
      : (student.totalClassesAttended || 0);
    const absent = monthly.length > 0
      ? monthly.reduce((s, m) => s + (m.classesAbsent || m.absent || 0), 0)
      : (student.totalClassesAbsent ?? Math.max(0, conducted - attended));
    const percentage = conducted > 0 ? ((attended / conducted) * 100).toFixed(2) : "0.00";

    return {
      hasData: conducted > 0,
      conducted,
      attended,
      absent,
      percentage,
      monthlyAttendance: monthly
    };
  }

  // 3. Clean empty state for un-commenced / empty semesters
  return {
    hasData: false,
    conducted: 0,
    attended: 0,
    absent: 0,
    percentage: "0.00",
    monthlyAttendance: []
  };
};

export const INITIAL_STUDENTS = [
  {
    id: "std-001",
    rollNumber: "21TML0501",
    name: "M. Sai Vardhan",
    shortName: "Sai Vardhan",
    course: "B.Tech",
    department: "CSE",
    branch: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    admissionNumber: "ADM-2021-0501",
    dob: "2003-08-14",
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98480 12345",
    email: "21tml0501@tecnrt.org",
    fatherPhone: "+91 94401 23456",
    fatherEmail: "venkatasubbaiah.m@gmail.com",
    currentAddress: "Plot 42, Arundelpet, Guntur, AP - 522002",
    permanentAddress: "Plot 42, Arundelpet, Guntur, AP - 522002",
    fatherName: "M. Venkata Subbaiah",
    fatherOccupation: "Agriculture / Enterprise",
    motherName: "M. Lakshmi Devi",
    motherOccupation: "Homemaker",
    guardianName: "",
    guardianContact: "",
    admissionYear: "2021",
    admissionDate: "2021-09-15",
    admissionType: "Convener Quota (EAPCET)",
    admissionQuota: "Convener Quota (Rank: 18420)",
    casteCategory: "BC-A",
    scholarshipStatus: "Eligible",
    feeReimbursementStatus: "Full (JVD)",
    profileStatus: PROFILE_STATUSES.COMPLETE,
    profileCompletion: 100,
    cgpa: 8.64,
    sgpaLast: 8.90,
    attendanceOverall: 88.5,
    status: "Active",
    accountSetup: true,
    accountStatus: "ACTIVE",
    tempPassword: "TEC#0501@2026",
    mustChangePassword: false,
    provisionedAt: "2026-10-31 10:00",
    totalClassesHeld: 240,
    totalClassesAttended: 212,
    totalClassesAbsent: 28,
    monthlyAttendance: [
      {
        month: "July 2026",
        classesConducted: 56,
        classesAttended: 50,
        classesAbsent: 6,
        attendancePercentage: 89.29
      },
      {
        month: "August 2026",
        classesConducted: 64,
        classesAttended: 58,
        classesAbsent: 6,
        attendancePercentage: 90.63
      },
      {
        month: "September 2026",
        classesConducted: 60,
        classesAttended: 52,
        classesAbsent: 8,
        attendancePercentage: 86.67
      },
      {
        month: "October 2026",
        classesConducted: 60,
        classesAttended: 52,
        classesAbsent: 8,
        attendancePercentage: 86.67
      }
    ],
    feeStatus: "Partial",
    feeDue: 15000,
    totalFee: 65000,
    semesterAttendance: { ...SAMPLE_MULTI_SEMESTER_ATTENDANCE }
  },
  {
    id: "std-002",
    rollNumber: "21TML0502",
    name: "K. Ananya",
    shortName: "Ananya",
    course: "B.Tech",
    department: "CSE",
    branch: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    admissionNumber: "ADM-2021-0502",
    dob: "2003-11-20",
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 97011 44556",
    email: "21tml0502@tecnrt.org",
    fatherPhone: "+91 98492 55667",
    fatherEmail: "subbarao.k@gmail.com",
    currentAddress: "D.No 4-12, Main Road, Narasaraopet, Palnadu Dt - 522601",
    permanentAddress: "D.No 4-12, Main Road, Narasaraopet, Palnadu Dt - 522601",
    fatherName: "K. Subba Rao",
    fatherOccupation: "Government Employee",
    motherName: "K. Parvathi",
    motherOccupation: "School Teacher",
    guardianName: "",
    guardianContact: "",
    admissionYear: "2021",
    admissionDate: "2021-09-18",
    admissionType: "Convener Quota (EAPCET)",
    admissionQuota: "Convener Quota (Rank: 12150)",
    casteCategory: "OC",
    scholarshipStatus: "Applied",
    feeReimbursementStatus: "Pending Verification",
    profileStatus: PROFILE_STATUSES.COMPLETE,
    profileCompletion: 100,
    cgpa: 8.85,
    sgpaLast: 9.10,
    attendanceOverall: 92.0,
    status: "Active",
    accountSetup: true,
    accountStatus: "PROVISIONED",
    tempPassword: "TEC#0502@2026",
    mustChangePassword: true,
    provisionedAt: "2026-10-31 10:00",
    totalClassesHeld: 240,
    totalClassesAttended: 221,
    totalClassesAbsent: 19,
    monthlyAttendance: [
      {
        month: "July 2026",
        classesConducted: 56,
        classesAttended: 52,
        classesAbsent: 4,
        attendancePercentage: 92.86
      },
      {
        month: "August 2026",
        classesConducted: 64,
        classesAttended: 60,
        classesAbsent: 4,
        attendancePercentage: 93.75
      },
      {
        month: "September 2026",
        classesConducted: 60,
        classesAttended: 55,
        classesAbsent: 5,
        attendancePercentage: 91.67
      },
      {
        month: "October 2026",
        classesConducted: 60,
        classesAttended: 54,
        classesAbsent: 6,
        attendancePercentage: 90.00
      }
    ],
    feeStatus: "Paid",
    feeDue: 0,
    totalFee: 65000,
    semesterAttendance: { ...SAMPLE_MULTI_SEMESTER_ATTENDANCE }
  },
  {
    id: "std-003",
    rollNumber: "21TML0503",
    name: "B. Karthik",
    shortName: "Karthik",
    course: "B.Tech",
    department: "CSE",
    branch: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    admissionNumber: "ADM-2021-0503",
    dob: "2003-05-12",
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 99890 22113",
    email: "21tml0503@tecnrt.org",
    fatherPhone: "+91 94412 88990",
    fatherEmail: "ramana.b@gmail.com",
    currentAddress: "Flat 202, Sri Sai Towers, Chilakaluripet, AP - 522616",
    permanentAddress: "Flat 202, Sri Sai Towers, Chilakaluripet, AP - 522616",
    fatherName: "B. Venkata Ramana",
    fatherOccupation: "Private Sector Executive",
    motherName: "B. Satyavathi",
    motherOccupation: "",
    guardianName: "",
    guardianContact: "",
    admissionYear: "2021",
    admissionDate: "2021-09-22",
    admissionType: "Management Quota",
    admissionQuota: "Management Quota",
    casteCategory: "BC-D",
    scholarshipStatus: "Not Eligible",
    feeReimbursementStatus: "Self Financed",
    profileStatus: PROFILE_STATUSES.COMPLETE,
    profileCompletion: 100,
    cgpa: 7.92,
    sgpaLast: 8.05,
    attendanceOverall: 78.5,
    status: "Active",
    accountSetup: true,
    accountStatus: "PROVISIONED",
    tempPassword: "TEC#0503@2026",
    mustChangePassword: true,
    provisionedAt: "2026-10-31 10:00",
    totalClassesHeld: 240,
    totalClassesAttended: 188,
    totalClassesAbsent: 52,
    monthlyAttendance: [
      {
        month: "July 2026",
        classesConducted: 56,
        classesAttended: 46,
        classesAbsent: 10,
        attendancePercentage: 82.14
      },
      {
        month: "August 2026",
        classesConducted: 64,
        classesAttended: 50,
        classesAbsent: 14,
        attendancePercentage: 78.13
      },
      {
        month: "September 2026",
        classesConducted: 60,
        classesAttended: 46,
        classesAbsent: 14,
        attendancePercentage: 76.67
      },
      {
        month: "October 2026",
        classesConducted: 60,
        classesAttended: 46,
        classesAbsent: 14,
        attendancePercentage: 76.67
      }
    ],
    feeStatus: "Partial",
    feeDue: 25000,
    totalFee: 85000,
    semesterAttendance: { ...SAMPLE_MULTI_SEMESTER_ATTENDANCE }
  },
  {
    id: "std-004",
    rollNumber: "21TML0504",
    name: "T. Sandeep",
    shortName: "",
    course: "B.Tech",
    department: "CSE",
    branch: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "B",
    admissionNumber: "ADM-2021-0504",
    dob: "",
    gender: "Male",
    bloodGroup: "Not Specified",
    phone: "",
    email: "21tml0504@tecnrt.org",
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
    admissionYear: "2021",
    admissionDate: "",
    admissionType: "Convener Quota (EAPCET)",
    admissionQuota: "Convener Quota",
    casteCategory: "",
    scholarshipStatus: "Pending Verification",
    feeReimbursementStatus: "Pending Verification",
    profileStatus: PROFILE_STATUSES.INCOMPLETE,
    profileCompletion: 23,
    cgpa: 7.50,
    sgpaLast: 7.50,
    attendanceOverall: 76.0,
    status: "Active",
    accountSetup: false,
    accountStatus: "PENDING",
    tempPassword: "TEC#0504@2026",
    mustChangePassword: true,
    provisionedAt: null,
    totalClassesHeld: 0,
    totalClassesAttended: 0,
    totalClassesAbsent: 0,
    monthlyAttendance: [],
    feeStatus: "Pending",
    feeDue: 65000,
    totalFee: 65000,
    semesterAttendance: {}
  }
];

export const INITIAL_EXAM_TIMETABLES = [];

export const STUDENT_SUBJECTS = {
  "21TML0501": [
    {
      code: "CS701PC",
      name: "Cloud Computing & Distributed Architecture",
      faculty: "Prof. K. Vijaya Lakshmi",
      credits: 3,
      classesHeld: 48,
      classesAttended: 44,
      attendancePct: 91.7,
      mid1Marks: 27,
      mid2Marks: 28,
      internalTotal: 28,
      syllabusCompleted: "85%"
    },
    {
      code: "CS702PC",
      name: "Cryptography & Network Security",
      faculty: "Dr. K. Srinivasa Rao",
      credits: 3,
      classesHeld: 46,
      classesAttended: 40,
      attendancePct: 87.0,
      mid1Marks: 25,
      mid2Marks: 26,
      internalTotal: 26,
      syllabusCompleted: "80%"
    },
    {
      code: "CS711PE",
      name: "Full Stack Web Development (MERN)",
      faculty: "Sri Ch. Mahesh Babu",
      credits: 3,
      classesHeld: 50,
      classesAttended: 46,
      attendancePct: 92.0,
      mid1Marks: 29,
      mid2Marks: 29,
      internalTotal: 29,
      syllabusCompleted: "90%"
    },
    {
      code: "CS721PE",
      name: "Machine Learning Foundations",
      faculty: "Smt. T. Anupama",
      credits: 3,
      classesHeld: 44,
      classesAttended: 38,
      attendancePct: 86.4,
      mid1Marks: 24,
      mid2Marks: 27,
      internalTotal: 26,
      syllabusCompleted: "80%"
    },
    {
      code: "CS703PC",
      name: "Cloud & Security Laboratory",
      faculty: "Prof. K. Vijaya Lakshmi & Lab Asst.",
      credits: 1.5,
      classesHeld: 26,
      classesAttended: 23,
      attendancePct: 88.5,
      mid1Marks: 28,
      mid2Marks: 29,
      internalTotal: 29,
      syllabusCompleted: "95%"
    },
    {
      code: "CS704PR",
      name: "Project Work Phase-I & Technical Seminar",
      faculty: "Department Review Committee",
      credits: 3,
      classesHeld: 26,
      classesAttended: 21,
      attendancePct: 80.8,
      mid1Marks: 26,
      mid2Marks: 28,
      internalTotal: 27,
      syllabusCompleted: "75%"
    }
  ]
};

// Populate subjects, exam and fees for other sample students
["21TML0502", "21TML0503", "21TML0504"].forEach(roll => {
  STUDENT_SUBJECTS[roll] = STUDENT_SUBJECTS["21TML0501"].map(s => ({ ...s }));
});

export const STUDENT_EXAMS = {
  "21TML0501": {
    currentSemester: "B.Tech IV-I Regular (JNTUK R20)",
    examStatus: "No Active Schedule",
    hallTicketNo: "21TML0501",
    centerName: "Tirumala Engineering College, Narasaraopet (Center Code: TMLN)",
    schedule: [],
    supplementaryRecords: [],
    openSupplies: []
  }
};
["21TML0502", "21TML0503", "21TML0504"].forEach(roll => {
  STUDENT_EXAMS[roll] = { ...STUDENT_EXAMS["21TML0501"], hallTicketNo: roll };
});

export const STUDENT_FEES = {
  "21TML0501": {
    academicYear: "2026-2027",
    studentName: "M. Sai Vardhan",
    rollNumber: "21TML0501",
    department: "CSE - IV Year",
    totalAnnualFee: 65000,
    paidAmount: 50000,
    dueAmount: 15000,
    items: [
      { id: "fee-1", name: "Tuition Fee (Annual)", amount: 50000, paid: 50000, status: "Paid", dueDate: "2026-08-31" },
      { id: "fee-2", name: "University & Exam Registration Fee", amount: 5000, paid: 0, status: "Pending", dueDate: "2026-10-30" },
      { id: "fee-3", name: "College Transport (Bus Route 4 - Vinukonda)", amount: 7000, paid: 0, status: "Pending", dueDate: "2026-11-15" },
      { id: "fee-4", name: "Library & Digital Learning Access", amount: 3000, paid: 0, status: "Pending", dueDate: "2026-11-15" }
    ],
    transactions: [
      {
        refId: "TXN-TMLN-2026-88421",
        date: "2026-08-14 11:24 AM",
        category: "Tuition Fee - Term I",
        amount: 30000,
        gateway: "SBI Collect / Campus Pay",
        mode: "UPI (Google Pay)",
        status: "Success",
        receiptNo: "REC-2026-0941"
      },
      {
        refId: "TXN-TMLN-2026-92144",
        date: "2026-09-02 03:15 PM",
        category: "Tuition Fee - Term II",
        amount: 20000,
        gateway: "SBI Collect / Campus Pay",
        mode: "Net Banking (HDFC)",
        status: "Success",
        receiptNo: "REC-2026-1218"
      }
    ]
  }
};

export const FACULTY_MEMBERS = [
  {
    id: "fac-101",
    staffId: "TEC-FAC-042",
    name: "Sri Ch. Mahesh Babu",
    designation: "Assistant Professor",
    department: "CSE",
    qualification: "M.Tech (JNTUK), (Ph.D)",
    experience: "9 Years",
    email: "maheshbabu.ch@tecnrt.org",
    phone: "+91 98492 88771",
    assignedSubjects: [
      { code: "CS711PE", name: "Full Stack Web Development", class: "IV B.Tech CSE-A", period: "ODD 2026", studentsCount: 68 },
      { code: "CS503PC", name: "Web Technologies Lab", class: "III B.Tech CSE-B", period: "ODD 2026", studentsCount: 65 }
    ],
    pendingUploads: 1,
    attendanceStatus: "Pending September 2026 Upload"
  },
  {
    id: "fac-102",
    staffId: "TEC-FAC-015",
    name: "Prof. K. Vijaya Lakshmi",
    designation: "Associate Professor",
    department: "CSE",
    qualification: "M.Tech, Ph.D",
    experience: "14 Years",
    email: "vijayalakshmi.k@tecnrt.org",
    phone: "+91 94401 55223",
    assignedSubjects: [
      { code: "CS701PC", name: "Cloud Computing & Distributed Arch", class: "IV B.Tech CSE-A", period: "ODD 2026", studentsCount: 68 },
      { code: "CS703PC", name: "Cloud & Security Lab", class: "IV B.Tech CSE-A", period: "ODD 2026", studentsCount: 68 }
    ],
    pendingUploads: 0,
    attendanceStatus: "Up to date"
  },
  {
    id: "fac-103",
    staffId: "TEC-FAC-008",
    name: "Dr. K. Srinivasa Rao",
    designation: "Professor & HOD",
    department: "CSE",
    qualification: "Ph.D (IIT Madras)",
    experience: "21 Years",
    email: "hod.cse@tecnrt.org",
    phone: "+91 98481 00223",
    assignedSubjects: [
      { code: "CS702PC", name: "Cryptography & Network Security", class: "IV B.Tech CSE-A", period: "ODD 2026", studentsCount: 68 }
    ],
    pendingUploads: 0,
    attendanceStatus: "Up to date"
  },
  {
    id: "fac-104",
    staffId: "TEC-FAC-031",
    name: "Smt. T. Anupama",
    designation: "Assistant Professor",
    department: "CSE",
    qualification: "M.Tech",
    experience: "7 Years",
    email: "anupama.t@tecnrt.org",
    phone: "+91 97003 44112",
    assignedSubjects: [
      { code: "CS721PE", name: "Machine Learning Foundations", class: "IV B.Tech CSE-A", period: "ODD 2026", studentsCount: 68 }
    ],
    pendingUploads: 0,
    attendanceStatus: "Up to date"
  }
];

export const FACULTY_TIMETABLE = [];

export const ATTENDANCE_UPLOAD_HISTORY = [];

export const AUDIT_LOGS = [];

export const ANNOUNCEMENTS = [
  {
    id: "anc-1",
    title: "JNTUK B.Tech IV-I Regular End Semester Examination Time-Table Release",
    date: "October 12, 2026",
    category: "Examinations",
    priority: "High",
    content: "The University examination center has released the official schedule for B.Tech IV Year I Semester Regular & Supplementary Examinations starting November 16, 2026. Hall tickets will be issued via the student portal."
  },
  {
    id: "anc-2",
    title: "Campus Placement Drive: TCS Digital, Cognizant & Tech Mahindra",
    date: "October 08, 2026",
    category: "Placements",
    priority: "High",
    content: "Final Year B.Tech students (CSE, IT, ECE, EEE) who have maintained minimum 75% attendance and no active standing backlogs are eligible to appear for the pooled recruitment drive on October 24, 2026."
  },
  {
    id: "anc-3",
    title: "AICTE Sponsored National Conference on Next-Gen Generative AI & Cloud",
    date: "September 29, 2026",
    category: "Academic",
    priority: "Medium",
    content: "Department of CSE and AI&ML is organizing a two-day national level conference on November 28-29, 2026. Faculty and student researchers are invited to submit papers."
  },
  {
    id: "anc-4",
    title: "Attendance Review for Condonation / Detention - ODD Semester 2026",
    date: "September 25, 2026",
    category: "Attendance",
    priority: "High",
    content: "Students having attendance between 65% and 75% on medical grounds must submit authentic medical certificates counter-signed by the parent to their respective HOD before October 28."
  }
];

export const PLACEMENT_STATS = {
  academicYear: "2025-2026 (Ongoing 2026-27)",
  totalOffers: 624,
  highestPackage: "18.5 LPA",
  averagePackage: "4.8 LPA",
  placementPercentage: "88.4%",
  topRecruiters: [
    { name: "TCS", offers: 142, tier: "MNC" },
    { name: "Cognizant", offers: 98, tier: "MNC" },
    { name: "Wipro", offers: 76, tier: "MNC" },
    { name: "Infosys", offers: 64, tier: "MNC" },
    { name: "Tech Mahindra", offers: 55, tier: "MNC" },
    { name: "Capgemini", offers: 48, tier: "MNC" },
    { name: "Hyundai Transys", offers: 24, tier: "Core" },
    { name: "Kia Motors India", offers: 18, tier: "Core" },
    { name: "Efftronics Systems", offers: 22, tier: "Product/Embedded" },
    { name: "Virtusa", offers: 32, tier: "MNC" }
  ]
};
