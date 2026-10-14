// Attendance Spreadsheet Helpers, Template Generator, and Validation Engine (PRD Section 6)
import { INITIAL_STUDENTS } from './mockData';

export const ATTENDANCE_COLUMNS = [
  "Student Roll Number",
  "Student Name",
  "Department",
  "Academic Year",
  "Semester",
  "Subject Code",
  "Attendance Period",
  "Total Classes Held",
  "Classes Attended",
  "Classes Absent",
  "Attendance Percentage"
];

// Generate standard CSV template for a given class
export function generateAttendanceTemplate(department = "CSE", classSection = "IV B.Tech CSE-A", subjectCode = "CS711PE", period = "September 2026") {
  const filteredStudents = INITIAL_STUDENTS.filter(s => s.department === department);
  const rows = [
    ATTENDANCE_COLUMNS.join(","),
    ...filteredStudents.map(s => {
      return `"${s.rollNumber}","${s.name}","${department}","2026-2027","VII","${subjectCode}","${period}",40,,,""`;
    })
  ];
  return rows.join("\n");
}

// Pre-packaged test datasets for demo convenience
export function getSampleValidCSV() {
  return [
    ATTENDANCE_COLUMNS.join(","),
    `"21TML0501","M. Sai Vardhan","CSE","2026-2027","VII","CS711PE","September 2026",38,35,3,92.1`,
    `"21TML0502","K. Pravallika","CSE","2026-2027","VII","CS711PE","September 2026",38,37,1,97.3`,
    `"21TML0503","B. Yaswanth Kumar","CSE","2026-2027","VII","CS711PE","September 2026",38,28,10,73.6`,
    `"21TML0504","G. Haritha","CSE","2026-2027","VII","CS711PE","September 2026",38,33,5,86.8`,
    `"21TML0505","P. Tarun Teja","CSE","2026-2027","VII","CS711PE","September 2026",38,24,14,63.1`
  ].join("\n");
}

export function getSampleProblematicCSV() {
  return [
    ATTENDANCE_COLUMNS.join(","),
    `"21TML0501","M. Sai Vardhan","CSE","2026-2027","VII","CS711PE","September 2026",38,35,3,92.1`,
    // Inconsistent totals: 36 + 5 != 38
    `"21TML0502","K. Pravallika","CSE","2026-2027","VII","CS711PE","September 2026",38,36,5,94.7`,
    // Unknown roll number
    `"21TML9999","Unknown Person","CSE","2026-2027","VII","CS711PE","September 2026",38,30,8,78.9`,
    // Duplicate roll number (21TML0501 again)
    `"21TML0501","M. Sai Vardhan (Duplicate)","CSE","2026-2027","VII","CS711PE","September 2026",38,35,3,92.1`,
    // Attended exceeds total held: 42 > 38
    `"21TML0504","G. Haritha","CSE","2026-2027","VII","CS711PE","September 2026",38,42,-4,110.5`,
    // Negative numbers
    `"21TML0505","P. Tarun Teja","CSE","2026-2027","VII","CS711PE","September 2026",-10,20,5,0`
  ].join("\n");
}

// PRD Section 6.3 & 6.5 Comprehensive Validation Engine
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

  // Parse header
  const header = lines[0].split(",").map(h => h.replace(/^["']|["']$/g, "").trim().toLowerCase());
  
  const parsedRows = [];
  const seenRollNumbers = new Set();
  let validCount = 0;
  let rejectedCount = 0;
  let warningCount = 0;

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
    const subject = cleanCells[5] || "";
    const period = cleanCells[6] || "";
    const totalHeldStr = cleanCells[7];
    const attendedStr = cleanCells[8];
    const absentStr = cleanCells[9];

    const errors = [];
    const warnings = [];

    // Rule 1: Missing required roll number
    if (!rollNumber) {
      errors.push("Missing Student Roll Number");
    } else {
      // Rule 2: Unknown student in college roster
      const studentMatch = INITIAL_STUDENTS.find(s => s.rollNumber.toUpperCase() === rollNumber.toUpperCase());
      if (!studentMatch) {
        errors.push(`Unknown Roll Number [${rollNumber}] not registered in college roster`);
      } else {
        // Rule 3: Student belongs to different department
        if (context.department && studentMatch.department !== context.department) {
          errors.push(`Roll Number belongs to [${studentMatch.department}], outside authorized department [${context.department}]`);
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
    } else if (totalHeld < 0) {
      errors.push("Total Classes Held cannot be negative");
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
      department: dept,
      academicYear: year,
      semester: sem,
      subjectCode: subject,
      period,
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
