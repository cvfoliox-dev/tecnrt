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

export const INITIAL_STUDENTS = [
  {
    id: "std-001",
    rollNumber: "21TML0501",
    name: "M. Sai Vardhan",
    department: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    email: "21tml0501@tecnrt.org",
    phone: "+91 98480 12345",
    gender: "Male",
    dob: "2003-08-14",
    fatherName: "M. Venkata Subbaiah",
    address: "Plot 42, Arundelpet, Guntur, AP",
    bloodGroup: "O+",
    admissionType: "Convener Quota (EAPCET Rank: 18420)",
    cgpa: 8.64,
    sgpaLast: 8.90,
    attendanceOverall: 88.5,
    status: "Active",
    accountSetup: true,
    totalClassesHeld: 240,
    totalClassesAttended: 212,
    totalClassesAbsent: 28,
    feeStatus: "Partial",
    feeDue: 15000,
    totalFee: 65000
  },
  {
    id: "std-002",
    rollNumber: "21TML0502",
    name: "K. Pravallika",
    department: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    email: "21tml0502@tecnrt.org",
    phone: "+91 97010 45678",
    gender: "Female",
    dob: "2003-11-22",
    fatherName: "K. Srinivasa Murthy",
    address: "D.No 5-21, Prakash Nagar, Narasaraopet, AP",
    bloodGroup: "B+",
    admissionType: "Convener Quota (EAPCET Rank: 15300)",
    cgpa: 9.12,
    sgpaLast: 9.40,
    attendanceOverall: 94.2,
    status: "Active",
    accountSetup: true,
    totalClassesHeld: 240,
    totalClassesAttended: 226,
    totalClassesAbsent: 14,
    feeStatus: "Paid",
    feeDue: 0,
    totalFee: 65000
  },
  {
    id: "std-003",
    rollNumber: "21TML0503",
    name: "B. Yaswanth Kumar",
    department: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    email: "21tml0503@tecnrt.org",
    phone: "+91 99890 33445",
    gender: "Male",
    dob: "2003-05-19",
    fatherName: "B. Anjaneyulu",
    address: "Main Road, Vinukonda, Palnadu Dist, AP",
    bloodGroup: "A+",
    admissionType: "Convener Quota (EAPCET Rank: 24100)",
    cgpa: 7.42,
    sgpaLast: 7.10,
    attendanceOverall: 71.3,
    status: "Active (Condonation Alert)",
    accountSetup: true,
    totalClassesHeld: 240,
    totalClassesAttended: 171,
    totalClassesAbsent: 69,
    feeStatus: "Pending",
    feeDue: 35000,
    totalFee: 65000
  },
  {
    id: "std-004",
    rollNumber: "21TML0504",
    name: "G. Haritha",
    department: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    email: "21tml0504@tecnrt.org",
    phone: "+91 94411 98765",
    gender: "Female",
    dob: "2003-09-02",
    fatherName: "G. Raghava Rao",
    address: "Sai Baba Colony, Chilakaluripet, AP",
    bloodGroup: "AB+",
    admissionType: "Management Quota",
    cgpa: 8.25,
    sgpaLast: 8.40,
    attendanceOverall: 84.6,
    status: "Active",
    accountSetup: true,
    totalClassesHeld: 240,
    totalClassesAttended: 203,
    totalClassesAbsent: 37,
    feeStatus: "Paid",
    feeDue: 0,
    totalFee: 75000
  },
  {
    id: "std-005",
    rollNumber: "21TML0505",
    name: "P. Tarun Teja",
    department: "CSE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    email: "21tml0505@tecnrt.org",
    phone: "+91 96180 77665",
    gender: "Male",
    dob: "2003-01-30",
    fatherName: "P. Mallikarjuna Rao",
    address: "Brodipet 3rd Line, Guntur, AP",
    bloodGroup: "O+",
    admissionType: "Convener Quota (EAPCET Rank: 19800)",
    cgpa: 6.95,
    sgpaLast: 6.80,
    attendanceOverall: 64.2,
    status: "Detained Warning (<65%)",
    accountSetup: true,
    totalClassesHeld: 240,
    totalClassesAttended: 154,
    totalClassesAbsent: 86,
    feeStatus: "Pending",
    feeDue: 45000,
    totalFee: 65000
  },
  {
    id: "std-006",
    rollNumber: "22TML0512",
    name: "V. Lakshmi Prasanna",
    department: "CSE",
    year: "III Year",
    semester: "V Semester",
    section: "B",
    email: "22tml0512@tecnrt.org",
    phone: "+91 95530 11223",
    gender: "Female",
    dob: "2004-03-12",
    fatherName: "V. Samba Siva Rao",
    address: "RTC Colony, Narasaraopet, AP",
    bloodGroup: "A+",
    admissionType: "Convener Quota (EAPCET Rank: 14200)",
    cgpa: 8.85,
    sgpaLast: 9.05,
    attendanceOverall: 91.0,
    status: "Active",
    accountSetup: true,
    totalClassesHeld: 210,
    totalClassesAttended: 191,
    totalClassesAbsent: 19,
    feeStatus: "Paid",
    feeDue: 0,
    totalFee: 65000
  },
  {
    id: "std-007",
    rollNumber: "22TML4201",
    name: "D. Siva Rama Krishna",
    department: "AIML",
    year: "III Year",
    semester: "V Semester",
    section: "A",
    email: "22tml4201@tecnrt.org",
    phone: "+91 91770 44556",
    gender: "Male",
    dob: "2004-06-25",
    fatherName: "D. Tirupathi Rao",
    address: "Sattenapalli Road, Narasaraopet, AP",
    bloodGroup: "B+",
    admissionType: "Convener Quota (EAPCET Rank: 16800)",
    cgpa: 8.52,
    sgpaLast: 8.70,
    attendanceOverall: 87.6,
    status: "Active",
    accountSetup: true,
    totalClassesHeld: 210,
    totalClassesAttended: 184,
    totalClassesAbsent: 26,
    feeStatus: "Paid",
    feeDue: 0,
    totalFee: 65000
  },
  {
    id: "std-008",
    rollNumber: "21TML0401",
    name: "N. Anitha",
    department: "ECE",
    year: "IV Year",
    semester: "VII Semester",
    section: "A",
    email: "21tml0401@tecnrt.org",
    phone: "+91 96420 88990",
    gender: "Female",
    dob: "2003-04-18",
    fatherName: "N. Sambasiva Rao",
    address: "Kothapet, Guntur, AP",
    bloodGroup: "O+",
    admissionType: "Convener Quota (EAPCET Rank: 17200)",
    cgpa: 8.70,
    sgpaLast: 8.80,
    attendanceOverall: 89.2,
    status: "Active",
    accountSetup: true,
    totalClassesHeld: 240,
    totalClassesAttended: 214,
    totalClassesAbsent: 26,
    feeStatus: "Paid",
    feeDue: 0,
    totalFee: 65000
  }
];

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

export const STUDENT_EXAMS = {
  "21TML0501": {
    currentSemester: "B.Tech IV-I Regular (JNTUK R20)",
    examStatus: "Hall Ticket Released",
    hallTicketNo: "21TML0501",
    centerName: "Tirumala Engineering College, Narasaraopet (Center Code: TMLN)",
    schedule: [
      {
        date: "2026-11-16",
        time: "10:00 AM - 01:00 PM",
        code: "CS701PC",
        subject: "Cloud Computing & Distributed Architecture",
        hall: "Block-B 204",
        status: "Upcoming"
      },
      {
        date: "2026-11-18",
        time: "10:00 AM - 01:00 PM",
        code: "CS702PC",
        subject: "Cryptography & Network Security",
        hall: "Block-B 204",
        status: "Upcoming"
      },
      {
        date: "2026-11-21",
        time: "10:00 AM - 01:00 PM",
        code: "CS711PE",
        subject: "Full Stack Web Development (MERN)",
        hall: "Block-B 204",
        status: "Upcoming"
      },
      {
        date: "2026-11-24",
        time: "10:00 AM - 01:00 PM",
        code: "CS721PE",
        subject: "Machine Learning Foundations",
        hall: "Block-B 204",
        status: "Upcoming"
      }
    ],
    supplementaryRecords: [
      {
        semester: "III-II Supplementary (May 2026)",
        code: "CS602PC",
        subject: "Compiler Design",
        status: "Cleared",
        grade: "B",
        credits: 3,
        resultPublished: "2026-07-12"
      }
    ],
    openSupplies: [] // Currently no active backlog
  }
};

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

export const FACULTY_TIMETABLE = [
  { day: "Monday", time: "09:30 - 10:20 AM", subject: "Full Stack Web Development", class: "IV CSE-A", room: "B-204" },
  { day: "Monday", time: "11:20 - 12:10 PM", subject: "Web Technologies Tutorial", class: "III CSE-B", room: "B-102" },
  { day: "Tuesday", time: "10:20 - 11:10 AM", subject: "Full Stack Web Development", class: "IV CSE-A", room: "B-204" },
  { day: "Tuesday", time: "01:40 - 04:10 PM", subject: "Web Tech Lab Batch-1", class: "III CSE-B", room: "Computer Center 3" },
  { day: "Wednesday", time: "09:30 - 10:20 AM", subject: "Full Stack Web Development", class: "IV CSE-A", room: "B-204" },
  { day: "Thursday", time: "11:20 - 12:10 PM", subject: "Full Stack Web Development", class: "IV CSE-A", room: "B-204" },
  { day: "Friday", time: "01:40 - 04:10 PM", subject: "Web Tech Lab Batch-2", class: "III CSE-B", room: "Computer Center 3" },
  { day: "Saturday", time: "10:20 - 11:10 AM", subject: "Technical Seminar Mentoring", class: "IV CSE-A", room: "Seminar Hall 1" }
];

export const ATTENDANCE_UPLOAD_HISTORY = [
  {
    id: "UPL-8821",
    fileName: "CSE_IV_Year_SecA_Aug2026_CS711PE.xlsx",
    uploadDate: "2026-09-01 16:30",
    uploadedBy: "Sri Ch. Mahesh Babu (TEC-FAC-042)",
    academicPeriod: "August 2026",
    class: "IV B.Tech CSE-A",
    subject: "CS711PE - Full Stack Web Dev",
    totalRows: 68,
    validRows: 68,
    rejectedRows: 0,
    status: "Processed & Verified",
    nature: "New Period Submission",
    auditRef: "AUD-2026-9901"
  },
  {
    id: "UPL-8610",
    fileName: "CSE_IV_Year_SecA_Jul2026_CS711PE.csv",
    uploadDate: "2026-08-01 14:15",
    uploadedBy: "Sri Ch. Mahesh Babu (TEC-FAC-042)",
    academicPeriod: "July 2026",
    class: "IV B.Tech CSE-A",
    subject: "CS711PE - Full Stack Web Dev",
    totalRows: 68,
    validRows: 67,
    rejectedRows: 1,
    status: "Processed with 1 Correction",
    nature: "Replacement / Correction",
    auditRef: "AUD-2026-8714"
  }
];

export const AUDIT_LOGS = [
  {
    id: "AUD-2026-9901",
    timestamp: "2026-09-01 16:30:24",
    user: "Sri Ch. Mahesh Babu",
    role: "Faculty (CSE)",
    action: "ATTENDANCE_UPLOAD",
    academicPeriod: "August 2026",
    affectedClass: "IV B.Tech CSE - Section A",
    details: "Uploaded monthly attendance spreadsheet for CS711PE (68 records processed, 0 errors)",
    status: "Success"
  },
  {
    id: "AUD-2026-9844",
    timestamp: "2026-08-28 11:14:02",
    user: "Dr. K. Srinivasa Rao",
    role: "HOD (CSE)",
    action: "CORRECTION_APPROVAL",
    academicPeriod: "July 2026",
    affectedClass: "IV B.Tech CSE - Section A (Roll: 21TML0503)",
    details: "Approved attendance correction from 16 to 18 classes attended for Medical Leave certificate verification",
    status: "Approved"
  },
  {
    id: "AUD-2026-9712",
    timestamp: "2026-08-20 10:05:40",
    user: "Dr. V. Narayana",
    role: "Principal",
    action: "ACADEMIC_OVERSIGHT",
    academicPeriod: "ODD Semester 2026-27",
    affectedClass: "All Departments",
    details: "Reviewed mid-term institutional attendance summary and generated JNTUK compliance report",
    status: "Completed"
  },
  {
    id: "AUD-2026-9502",
    timestamp: "2026-08-10 14:22:15",
    user: "Dr. K. Srinivasa Rao",
    role: "HOD (CSE)",
    action: "STUDENT_CREATION",
    academicPeriod: "2026-2027",
    affectedClass: "III B.Tech CSE - Section B",
    details: "Authorized lateral entry enrollment for roll number 22TML05L01 (Transfer student)",
    status: "Created"
  }
];

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
