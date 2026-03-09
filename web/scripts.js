// Project scripts - all JavaScript for this site goes here.

/**
 * Grade weights (must sum to 1).
 * Homework: 15% total, applied to the average of the 3 homework assignments.
 */
var WEIGHTS = {
  midTerm: 0.20,
  final: 0.30,
  project: 0.20,
  homework: 0.15,
  presentation: 0.15
};

/**
 * Standard letter grade thresholds (min score for each letter).
 * Replace or extend when database/backend is defined.
 */
var LETTER_GRADES = [
  { min: 93, letter: "A" },
  { min: 90, letter: "A-" },
  { min: 87, letter: "B+" },
  { min: 83, letter: "B" },
  { min: 80, letter: "B-" },
  { min: 77, letter: "C+" },
  { min: 73, letter: "C" },
  { min: 70, letter: "C-" },
  { min: 67, letter: "D+" },
  { min: 63, letter: "D" },
  { min: 60, letter: "D-" },
  { min: 0, letter: "F" }
];

/**
 * Mock data: structure compatible with a future database/API.
 * Each class has an array of students; each student has raw grades only.
 * finalGrade and letterGrade are computed and not stored here.
 */
var CLASS_STUDENTS = {
  "MCH 4951": [
    {
      firstName: "Jordan",
      lastName: "Lee",
      studentNumber: "1001234",
      email: "jordan.lee@university.edu",
      midTerm: 88,
      final: 85,
      project: 90,
      homework: [82, 88, 85],
      presentation: 92
    },
    {
      firstName: "Sam",
      lastName: "Kim",
      studentNumber: "1002345",
      email: "sam.kim@university.edu",
      midTerm: 76,
      final: 80,
      project: 78,
      homework: [75, 80, 72],
      presentation: 85
    },
    {
      firstName: "Alex",
      lastName: "Rivera",
      studentNumber: "1003456",
      email: "alex.rivera@university.edu",
      midTerm: 92,
      final: 94,
      project: 91,
      homework: [90, 92, 88],
      presentation: 95
    }
  ],
  "MCH 4952": [
    {
      firstName: "Casey",
      lastName: "Nguyen",
      studentNumber: "2001234",
      email: "casey.nguyen@university.edu",
      midTerm: 70,
      final: 72,
      project: 68,
      homework: [65, 70, 72],
      presentation: 75
    },
    {
      firstName: "Morgan",
      lastName: "Taylor",
      studentNumber: "2002345",
      email: "morgan.taylor@university.edu",
      midTerm: 95,
      final: 93,
      project: 96,
      homework: [94, 92, 95],
      presentation: 94
    }
  ]
};

/**
 * Compute weighted final grade from raw scores.
 * @param {Object} student - Student with midTerm, final, project, homework[], presentation
 * @returns {number} Final grade 0–100
 */
function computeFinalGrade(student) {
  var hwAvg =
    (student.homework[0] + student.homework[1] + student.homework[2]) / 3;
  return (
    student.midTerm * WEIGHTS.midTerm +
    student.final * WEIGHTS.final +
    student.project * WEIGHTS.project +
    hwAvg * WEIGHTS.homework +
    student.presentation * WEIGHTS.presentation
  );
}

/**
 * Get letter grade for a numeric score (0–100).
 * @param {number} score
 * @returns {string} Letter grade
 */
function getLetterGrade(score) {
  for (var i = 0; i < LETTER_GRADES.length; i++) {
    if (score >= LETTER_GRADES[i].min) return LETTER_GRADES[i].letter;
  }
  return "F";
}

/**
 * Add computed finalGrade and letterGrade to each student (does not mutate if already set).
 * @param {Object[]} students - Array of student objects
 * @returns {Object[]} Same array with finalGrade and letterGrade set
 */
function attachComputedGrades(students) {
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    if (s.finalGrade == null) s.finalGrade = computeFinalGrade(s);
    if (s.letterGrade == null) s.letterGrade = getLetterGrade(s.finalGrade);
  }
  return students;
}

/**
 * Get CSS class for letter grade (for color).
 * @param {string} letter
 * @returns {string} Class name
 */
function letterGradeClass(letter) {
  if (!letter) return "";
  var first = letter.charAt(0);
  return "letter-" + first;
}

/**
 * Render the student list for a given class code.
 * @param {string} classCode - e.g. "MCH 4951"
 */
function renderStudentList(classCode) {
  var container = document.getElementById("student-list");
  var titleEl = document.querySelector(".student-list-title");
  var hintEl = document.getElementById("no-class-hint");

  if (!classCode) {
    container.innerHTML = "";
    titleEl.textContent = "";
    hintEl.style.display = "";
    return;
  }

  var students = CLASS_STUDENTS[classCode];
  if (!students || students.length === 0) {
    container.innerHTML = "<p class=\"no-class-hint\">No students in this class.</p>";
    titleEl.textContent = classCode + " – Students";
    hintEl.style.display = "none";
    return;
  }

  students = attachComputedGrades(students);
  titleEl.textContent = classCode + " – Students";
  hintEl.style.display = "none";

  var table = document.createElement("div");
  table.className = "student-table-wrap";
  table.innerHTML =
    "<table class=\"student-table\" role=\"table\">" +
    "<thead><tr>" +
    "<th>First name</th>" +
    "<th>Last name</th>" +
    "<th>Student #</th>" +
    "<th>Email</th>" +
    "<th class=\"num\">Mid-term</th>" +
    "<th class=\"num\">Final</th>" +
    "<th class=\"num\">Project</th>" +
    "<th class=\"num\">HW1</th>" +
    "<th class=\"num\">HW2</th>" +
    "<th class=\"num\">HW3</th>" +
    "<th class=\"num\">Present.</th>" +
    "<th class=\"num final-grade\">Final %</th>" +
    "<th class=\"letter-grade\">Letter</th>" +
    "</tr></thead><tbody></tbody></table>";

  var tbody = table.querySelector("tbody");
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + escapeHtml(s.firstName) + "</td>" +
      "<td>" + escapeHtml(s.lastName) + "</td>" +
      "<td class=\"num\">" + escapeHtml(String(s.studentNumber)) + "</td>" +
      "<td><a href=\"mailto:" + escapeHtml(s.email) + "\">" + escapeHtml(s.email) + "</a></td>" +
      "<td class=\"num\">" + formatNum(s.midTerm) + "</td>" +
      "<td class=\"num\">" + formatNum(s.final) + "</td>" +
      "<td class=\"num\">" + formatNum(s.project) + "</td>" +
      "<td class=\"num\">" + formatNum(s.homework[0]) + "</td>" +
      "<td class=\"num\">" + formatNum(s.homework[1]) + "</td>" +
      "<td class=\"num\">" + formatNum(s.homework[2]) + "</td>" +
      "<td class=\"num\">" + formatNum(s.presentation) + "</td>" +
      "<td class=\"num final-grade\">" + formatNum(s.finalGrade) + "</td>" +
      "<td class=\"letter-grade " + letterGradeClass(s.letterGrade) + "\">" + escapeHtml(s.letterGrade) + "</td>";
    tbody.appendChild(tr);
  }

  container.innerHTML = "";
  container.appendChild(table);
}

function formatNum(n) {
  if (n == null || n !== n) return "—";
  return Number(n).toFixed(1);
}

function escapeHtml(str) {
  if (str == null) return "";
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Set active class box and show that class's students.
 */
function selectClass(classCode) {
  var boxes = document.querySelectorAll(".class-box");
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    var isSelected = box.getAttribute("data-class") === classCode;
    box.setAttribute("aria-pressed", isSelected ? "true" : "false");
  }
  renderStudentList(classCode);
}

function init() {
  var boxes = document.querySelectorAll(".class-box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
      var classCode = this.getAttribute("data-class");
      selectClass(classCode);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
