// Attendance Spreadsheet Helpers, Template Generator, and Validation Engine (PRD Section 6)
import { INITIAL_STUDENTS } from './mockData';

export const ATTENDANCE_COLUMNS = [
  "Student Roll Number",
  "Student Name",
  "Department",
  "Academic Year",
  "Semester",
  "Section",
  "Subject Code",
  "Attendance Period",
  "Total Classes Held",
  "Classes Attended",
  "Classes Absent",
  "Attendance Percentage"
];

export const STUDENT_REGISTRATION_COLUMNS = [
  "Roll Number",
  "Student Name"
];

// Generate standard CSV template for a given section & subject
export function generateAttendanceTemplate(studentsList = [], department = "CSE", classSection = "IV B.Tech CSE-A", subjectCode = "CS711PE", period = "October 2026") {
  const source = studentsList.length > 0 ? studentsList : INITIAL_STUDENTS.filter(s => s.department === department);
  const rows = [
    ATTENDANCE_COLUMNS.join(","),
    ...source.map(s => {
      return `"${s.rollNumber}","${s.name}","${s.department}","${s.year}","${s.semester}","${s.section}","${subjectCode}","${period}",40,,,""`;
    })
  ];
  return rows.join("\n");
}

// Generate blank 2-column student registration template for a given academic context
export function generateStudentRegistrationTemplate(branch = "CSE", year = "IV Year", semester = "VII Semester", section = "A") {
  const prefix = year === 'I Year' ? '24' : year === 'II Year' ? '23' : year === 'III Year' ? '22' : '21';
  const sampleRows = [
    STUDENT_REGISTRATION_COLUMNS.join(","),
    `"${prefix}TML0591","Sample Student 1"`,
    `"${prefix}TML0592","Sample Student 2"`
  ];
  return sampleRows.join("\n");
}

// Pre-packaged test datasets for demo convenience
export function getSampleValidCSV() {
  return [
    ATTENDANCE_COLUMNS.join(","),
    `"21TML0501","M. Sai Vardhan","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,35,3,92.1`,
    `"21TML0502","K. Pravallika","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,37,1,97.3`,
    `"21TML0503","B. Yaswanth Kumar","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,28,10,73.6`,
    `"21TML0504","G. Haritha","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,33,5,86.8`,
    `"21TML0505","P. Tarun Teun","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,24,14,63.1`
  ].join("\n");
}

export function getSampleProblematicCSV() {
  return [
    ATTENDANCE_COLUMNS.join(","),
    `"21TML0501","M. Sai Vardhan","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,35,3,92.1`,
    // Inconsistent totals: 36 + 5 != 38
    `"21TML0502","K. Pravallika","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,36,5,94.7`,
    // Unknown roll number
    `"21TML9999","Unknown Person","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,30,8,78.9`,
    // Duplicate roll number (21TML0501 again)
    `"21TML0501","M. Sai Vardhan (Duplicate)","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,35,3,92.1`,
    // Attended exceeds total held: 42 > 38
    `"21TML0504","G. Haritha","CSE","IV Year","VII Semester","A","CS711PE","October 2026",38,42,-4,110.5`,
    // Negative numbers
    `"21TML0505","P. Tarun Teja","CSE","IV Year","VII Semester","A","CS711PE","October 2026",-10,20,5,0`
  ].join("\n");
}

// PRD Section 6.3 & 6.5 Comprehensive Attendance Validation Engine
export function parseAndValidateCSV(csvContent, context = {}) {
  const lines = csvContent.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    return {
      isValid: false,
      summary: { totalRows: 0, validRows: 0, rejectedRows: 0, warningRows: 0 },
      rows: [],
      generalError: "File is empty or does not contain a valid header row."
    };
  }

  const parsedRows = [];
  const seenRollNumbers = new Set();
  let validCount = 0;
  let rejectedCount = 0;
  let warningCount = 0;

  // Use dynamic registered students list if provided in context
  const activeRoster = context.students && context.students.length > 0 ? context.students : INITIAL_STUDENTS;

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Split on commas not inside quotes
    const cells = rawLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rawLine.split(",");
    const cleanCells = cells.map(c => c.replace(/^["']|["']$/g, "").trim());

    const rollNumber = cleanCells[0] || "";
    const name = cleanCells[1] || "";
    const dept = cleanCells[2] || "";
    const year = cleanCells[3] || "";
    const sem = cleanCells[4] || "";
    const sec = cleanCells[5] || "";
    const subject = cleanCells[6] || "";
    const period = cleanCells[7] || "";
    const totalHeldStr = cleanCells[8] || cleanCells[7];
    const attendedStr = cleanCells[9] || cleanCells[8];
    const absentStr = cleanCells[10] || cleanCells[9];

    const errors = [];
    const warnings = [];

    // Rule 1: Missing required roll number
    if (!rollNumber) {
      errors.push("Missing Student Roll Number");
    } else {
      // Rule 2: Unknown student in college roster
      const studentMatch = activeRoster.find(s => s.rollNumber.toUpperCase() === rollNumber.toUpperCase());
      if (!studentMatch) {
        errors.push(`Unknown Roll Number [${rollNumber}] not registered in college roster`);
      } else {
        // Rule 3: Department mismatch
        if (context.department && studentMatch.department !== context.department) {
          errors.push(`Roll Number belongs to [${studentMatch.department}], outside selected department [${context.department}]`);
        }
        // Rule 3b: Section mismatch check if target section is specified
        if (context.section && studentMatch.section !== context.section) {
          errors.push(`Student is enrolled in Section [${studentMatch.section}], not the target Section [${context.section}]`);
        }
      }

      // Rule 4: Duplicate row in same submission
      if (seenRollNumbers.has(rollNumber.toUpperCase())) {
        errors.push(`Duplicate row for Roll Number [${rollNumber}] in this spreadsheet`);
      } else {
        seenRollNumbers.add(rollNumber.toUpperCase());
      }
    }

    // Numeric checks
    const totalHeld = parseInt(totalHeldStr, 10);
    const attended = parseInt(attendedStr, 10);
    const absent = parseInt(absentStr, 10);

    if (isNaN(totalHeld)) {
      errors.push("Total Classes Held must be a valid integer");
    } else if (totalHeld <= 0) {
      errors.push("Total Classes Held must be greater than zero");
    }

    if (isNaN(attended)) {
      errors.push("Classes Attended must be a valid integer");
    } else if (attended < 0) {
      errors.push("Classes Attended cannot be negative");
    }

    if (isNaN(absent)) {
      errors.push("Classes Absent must be a valid integer");
    } else if (absent < 0) {
      errors.push("Classes Absent cannot be negative");
    }

    if (!isNaN(totalHeld) && !isNaN(attended)) {
      if (attended > totalHeld) {
        errors.push(`Classes Attended (${attended}) exceeds Total Classes Held (${totalHeld})`);
      }
    }

    // Mathematical consistency: Attended + Absent == Total Held
    if (!isNaN(totalHeld) && !isNaN(attended) && !isNaN(absent)) {
      if (attended + absent !== totalHeld) {
        errors.push(`Sum of Attended (${attended}) + Absent (${absent}) = ${attended + absent}, does not match Total Held (${totalHeld})`);
      }
    }

    // Calculation (Backend re-computation per PRD 6.3)
    let calculatedPct = 0;
    if (!isNaN(totalHeld) && !isNaN(attended) && totalHeld > 0) {
      calculatedPct = parseFloat(((attended / totalHeld) * 100).toFixed(1));
    }

    // Warning for low attendance
    if (calculatedPct < 65) {
      warnings.push(`Detention Alert: Attendance (${calculatedPct}%) is below 65% mandatory threshold`);
    } else if (calculatedPct < 75) {
      warnings.push(`Condonation Required: Attendance (${calculatedPct}%) is between 65% and 75%`);
    }

    const rowStatus = errors.length > 0 ? "REJECTED" : warnings.length > 0 ? "WARNING" : "VALID";
    if (rowStatus === "VALID") validCount++;
    else if (rowStatus === "WARNING") {
      validCount++;
      warningCount++;
    } else {
      rejectedCount++;
    }

    parsedRows.push({
      rowNumber: i,
      rollNumber,
      name,
      department: dept || context.department || "CSE",
      academicYear: year || context.year || "IV Year",
      semester: sem || context.semester || "VII Semester",
      section: sec || context.section || "A",
      subjectCode: subject || context.subject || "CS711PE",
      period: period || context.period || "October 2026",
      totalHeld: isNaN(totalHeld) ? totalHeldStr : totalHeld,
      attended: isNaN(attended) ? attendedStr : attended,
      absent: isNaN(absent) ? absentStr : absent,
      calculatedPercentage: calculatedPct,
      status: rowStatus,
      errors,
      warnings
    });
  }

  return {
    isValid: rejectedCount === 0,
    summary: {
      totalRows: lines.length - 1,
      validRows: validCount,
      rejectedRows: rejectedCount,
      warningRows: warningCount
    },
    rows: parsedRows
  };
}

// Student Batch Registration CSV Parser & Validator (Simplified 2-Column Format)
export function parseAndValidateStudentCSV(csvContent, existingStudents = [], context = {}) {
  const lines = csvContent.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    return {
      isValid: false,
      summary: { totalRows: 0, validRows: 0, rejectedRows: 0 },
      rows: [],
      generalError: "File is empty or does not contain records."
    };
  }

  const seenRolls = new Set();
  const parsedRows = [];
  let validCount = 0;
  let rejectedCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Split on commas while respecting quotes
    const cells = rawLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rawLine.split(",");
    const cleanCells = cells.map(c => c.replace(/^["']|["']$/g, "").trim());

    const rollNumber = (cleanCells[0] || "").toUpperCase();
    const name = cleanCells[1] || "";

    const errors = [];

    if (!rollNumber) {
      errors.push("Missing Roll Number");
    } else {
      if (existingStudents.some(s => s.rollNumber.toUpperCase() === rollNumber)) {
        errors.push(`Roll Number [${rollNumber}] already exists in institutional registry`);
      }
      if (seenRolls.has(rollNumber)) {
        errors.push(`Duplicate Roll Number [${rollNumber}] inside spreadsheet`);
      } else {
        seenRolls.add(rollNumber);
      }
    }

    if (!name) {
      errors.push("Missing Student Name");
    }

    const isRowValid = errors.length === 0;
    if (isRowValid) validCount++;
    else rejectedCount++;

    parsedRows.push({
      rowNumber: i,
      rollNumber,
      name,
      department: context.branch || context.department || "CSE",
      year: context.year || "IV Year",
      semester: context.semester || "VII Semester",
      section: context.section || "A",
      status: isRowValid ? "VALID" : "REJECTED",
      errors
    });
  }

  return {
    isValid: rejectedCount === 0 && validCount > 0,
    summary: {
      totalRows: lines.length - 1,
      validRows: validCount,
      rejectedRows: rejectedCount
    },
    rows: parsedRows
  };
}

// Generate Overall Attendance CSV Template (Multi-Subject in One Sheet)
export function generateOverallAttendanceTemplate(
  studentsList = [],
  subjects = [],
  department = "CSE",
  classSection = "II Year CSE-A",
  period = "October 2026"
) {
  const subjectHeaders = subjects.map(s => s.name || s.code);
  const headers = ["Roll Number", "Student Name", ...subjectHeaders, "Overall Attendance"];
  
  let rows = [];
  if (studentsList && studentsList.length > 0) {
    rows = studentsList.map(s => {
      const subjectValues = subjects.map(() => "85%");
      return `"${s.rollNumber}","${s.name}",${subjectValues.join(",")},"85%"`;
    });
  } else {
    const deptCode = department === 'CSE' ? '05' : department === 'ECE' ? '04' : '05';
    rows = [
      `"23TML${deptCode}01","A. Rahul Kumar",${subjects.map((_, i) => `${85 + (i % 3) * 5}%`).join(",")},"88.3%"`,
      `"23TML${deptCode}02","K. Snigdha",${subjects.map((_, i) => `${90 + (i % 2) * 5}%`).join(",")},"92.5%"`,
      `"23TML${deptCode}03","B. Sai Charan",${subjects.map((_, i) => `${72 + (i % 4) * 2}%`).join(",")},"75.0%"`
    ];
  }
  return [headers.join(","), ...rows].join("\n");
}

// Overall Attendance CSV Parser & Multi-Subject Validator
export function parseAndValidateOverallAttendanceCSV(csvContent, context = {}) {
  const lines = csvContent.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    return {
      isValid: false,
      summary: { totalRows: 0, validRows: 0, rejectedRows: 0, warningRows: 0 },
      rows: [],
      generalError: "File is empty or does not contain a valid header row."
    };
  }

  // Parse Header
  const headerCells = lines[0].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[0].split(",");
  const cleanHeader = headerCells.map(c => c.replace(/^["']|["']$/g, "").trim());

  if (cleanHeader.length < 3) {
    return {
      isValid: false,
      summary: { totalRows: 0, validRows: 0, rejectedRows: 0, warningRows: 0 },
      rows: [],
      generalError: "CSV must have at least 3 columns: Roll Number, Student Name, and at least one Subject column."
    };
  }

  const lastColIsOverall = cleanHeader[cleanHeader.length - 1].toLowerCase().includes("overall");
  const subjectEndIndex = lastColIsOverall ? cleanHeader.length - 1 : cleanHeader.length;
  const headerSubjectNames = cleanHeader.slice(2, subjectEndIndex);

  const parsedRows = [];
  const seenRollNumbers = new Set();
  let validCount = 0;
  let rejectedCount = 0;
  let warningCount = 0;

  const activeRoster = context.students && context.students.length > 0 ? context.students : INITIAL_STUDENTS;
  const configuredSubjects = context.subjects && context.subjects.length > 0 ? context.subjects : [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    const cells = rawLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rawLine.split(",");
    const cleanCells = cells.map(c => c.replace(/^["']|["']$/g, "").trim());

    const rollNumber = (cleanCells[0] || "").toUpperCase();
    const name = cleanCells[1] || "";
    const errors = [];
    const warnings = [];

    // 1. Roll number validation
    if (!rollNumber) {
      errors.push("Missing Student Roll Number");
    } else {
      if (seenRollNumbers.has(rollNumber)) {
        errors.push(`Duplicate row for Roll Number [${rollNumber}] in this spreadsheet`);
      } else {
        seenRollNumbers.add(rollNumber);
      }

      // Check against roster
      const studentMatch = activeRoster.find(s => s.rollNumber.toUpperCase() === rollNumber);
      if (!studentMatch) {
        errors.push(`Unknown Roll Number [${rollNumber}] not registered in college roster`);
      } else {
        if (context.department && studentMatch.department !== context.department) {
          errors.push(`Roll Number belongs to [${studentMatch.department}], outside assigned department [${context.department}]`);
        }
        if (context.section && studentMatch.section !== context.section) {
          errors.push(`Student is enrolled in Section [${studentMatch.section}], not target Section [${context.section}]`);
        }
      }
    }

    // 2. Subject columns validation
    const rowSubjects = [];
    let sumPercentage = 0;
    let validSubjectCount = 0;

    for (let sIdx = 0; sIdx < headerSubjectNames.length; sIdx++) {
      const colName = headerSubjectNames[sIdx];
      const valStr = cleanCells[2 + sIdx] || "";
      const numStr = valStr.replace(/%/g, "").trim();
      const numVal = parseFloat(numStr);

      const matchedConfig = configuredSubjects.find(cs => 
        (cs.name && cs.name.toLowerCase() === colName.toLowerCase()) || 
        (cs.code && cs.code.toLowerCase() === colName.toLowerCase())
      ) || configuredSubjects[sIdx] || { code: `SUB${sIdx + 1}`, name: colName };

      if (valStr === "" || isNaN(numVal)) {
        errors.push(`Missing or invalid percentage value for subject [${colName}]`);
      } else if (numVal < 0 || numVal > 100) {
        errors.push(`Attendance percentage for [${colName}] (${valStr}) must be between 0% and 100%`);
      } else {
        sumPercentage += numVal;
        validSubjectCount++;
        rowSubjects.push({
          code: matchedConfig.code || `SUB${sIdx + 1}`,
          name: matchedConfig.name || colName,
          attendancePct: parseFloat(numVal.toFixed(1))
        });
      }
    }

    // 3. Overall calculation
    let calculatedOverall = 0;
    if (validSubjectCount > 0) {
      calculatedOverall = parseFloat((sumPercentage / validSubjectCount).toFixed(1));
    }

    if (lastColIsOverall && cleanCells[cleanHeader.length - 1]) {
      const explicitOverall = parseFloat(cleanCells[cleanHeader.length - 1].replace(/%/g, "").trim());
      if (!isNaN(explicitOverall) && Math.abs(explicitOverall - calculatedOverall) > 1.5) {
        warnings.push(`Provided overall (${explicitOverall}%) differs from computed subject average (${calculatedOverall}%) — calculated average used`);
      }
    }

    if (calculatedOverall < 65) {
      warnings.push(`Detention Alert: Aggregate attendance (${calculatedOverall}%) is below 65% mandatory threshold`);
    } else if (calculatedOverall < 75) {
      warnings.push(`Condonation Required: Aggregate attendance (${calculatedOverall}%) is between 65% and 75%`);
    }

    const rowStatus = errors.length > 0 ? "REJECTED" : warnings.length > 0 ? "WARNING" : "VALID";
    if (rowStatus === "VALID") validCount++;
    else if (rowStatus === "WARNING") {
      validCount++;
      warningCount++;
    } else {
      rejectedCount++;
    }

    parsedRows.push({
      rowNumber: i,
      rollNumber,
      name,
      department: context.department || "CSE",
      year: context.year || "II Year",
      section: context.section || "A",
      period: context.period || "October 2026",
      subjects: rowSubjects,
      overallAttendance: calculatedOverall,
      status: rowStatus,
      errors,
      warnings
    });
  }

  return {
    isValid: rejectedCount === 0,
    summary: {
      totalRows: lines.length - 1,
      validRows: validCount,
      rejectedRows: rejectedCount,
      warningRows: warningCount
    },
    rows: parsedRows,
    subjectNames: headerSubjectNames
  };
}

// Sample Valid Overall Attendance CSV
export function getSampleValidOverallCSV(subjects = [], context = {}) {
  const dept = context.department || 'CSE';
  const sec = context.section || 'A';
  const subjectList = subjects.length > 0 ? subjects : [
    { code: 'CS301PC', name: 'Data Structures & Algorithms' },
    { code: 'CS302PC', name: 'Discrete Mathematics' },
    { code: 'CS303PC', name: 'Digital Logic Design' },
    { code: 'CS304PC', name: 'Python Programming' }
  ];
  const headers = ["Roll Number", "Student Name", ...subjectList.map(s => s.name), "Overall Attendance"];
  
  const roster = context.students && context.students.length > 0 ? context.students : INITIAL_STUDENTS;
  let targetStudents = roster.filter(s => s.department === dept && (context.section ? s.section === sec : true));
  
  if (targetStudents.length === 0) {
    targetStudents = roster.slice(0, 3);
  }

  const sampleScores = [
    [92, 88, 85, 90, 89],
    [95, 92, 94, 96, 91],
    [78, 80, 74, 82, 79],
    [85, 84, 86, 88, 85]
  ];

  const rows = targetStudents.map((s, idx) => {
    const scores = sampleScores[idx % sampleScores.length];
    const pcts = subjectList.map((_, sIdx) => scores[sIdx % scores.length]);
    const avg = (pcts.reduce((a, b) => a + b, 0) / pcts.length).toFixed(1);
    return `"${s.rollNumber}","${s.name}",${pcts.map(p => `${p}%`).join(",")},"${avg}%"`;
  });

  return [headers.join(","), ...rows].join("\n");
}

// Sample Problematic Overall Attendance CSV
export function getSampleProblematicOverallCSV(subjects = [], context = {}) {
  const subjectList = subjects.length > 0 ? subjects : [
    { code: 'CS301PC', name: 'Data Structures & Algorithms' },
    { code: 'CS302PC', name: 'Discrete Mathematics' },
    { code: 'CS303PC', name: 'Digital Logic Design' },
    { code: 'CS304PC', name: 'Python Programming' }
  ];
  const headers = ["Roll Number", "Student Name", ...subjectList.map(s => s.name), "Overall Attendance"];
  
  const roster = context.students && context.students.length > 0 ? context.students : INITIAL_STUDENTS;
  const firstStudent = roster[0] || { rollNumber: "21TML0501", name: "M. Sai Vardhan" };

  return [
    headers.join(","),
    // 1. Valid row
    `"${firstStudent.rollNumber}","${firstStudent.name}",${subjectList.map(() => '88%').join(",")},"88.0%"`,
    // 2. Unknown student roll number
    `"23TML9999","Unknown Student",${subjectList.map(() => '82%').join(",")},"82.0%"`,
    // 3. Out-of-bounds percentage (125%)
    `"${firstStudent.rollNumber}","Duplicate Row with 125%",${subjectList.map((_, i) => i === 0 ? '125%' : '80%').join(",")},"89.0%"`,
    // 4. Negative percentage (-10%)
    `"21TML0502","Invalid Negative Score",${subjectList.map((_, i) => i === 0 ? '-10%' : '75%').join(",")},"53.8%"`,
    // 5. Condonation / Detention Warning (<65%)
    `"21TML0503","Low Attendance Student",${subjectList.map(() => '58%').join(",")},"58.0%"`
  ].join("\n");
}
