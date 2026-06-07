// Test page elements
const testTitle = document.getElementById("testTitle");
const testInstruction = document.getElementById("testInstruction");
const testCode = document.getElementById("testCode");
const taskText = document.getElementById("taskText");
const testMessage = document.getElementById("testMessage");
const studentTestForm = document.getElementById("studentTestForm");
const studentAnswer = document.getElementById("studentAnswer");

const registeredStudentBox =
    document.getElementById("registeredStudentBox");

const guestStudentBox =
    document.getElementById("guestStudentBox");

const studentName =
    document.getElementById("studentName");

const studentClass =
    document.getElementById("studentClass");

// Get code from URL
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

// Get logged user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Load test from database
async function loadTest() {

    if (!code) {
        testMessage.textContent = "Код теста не указан";
        return;
    }

    const response =
        await fetch(`/api/tests/code/${code}`);

    const test = await response.json();

    if (!response.ok) {
        testMessage.textContent = test.message;
        return;
    }

    testTitle.textContent = test.title;
    testInstruction.textContent = test.instruction;
    testCode.textContent = test.test_code;
    taskText.textContent = test.task_text;

    localStorage.setItem("currentTest", JSON.stringify(test));
}

// Show student data or guest fields
function showStudentInfo() {

    if (user && user.role === "student") {

        registeredStudentBox.style.display = "block";
        guestStudentBox.style.display = "none";

        studentName.textContent =
            user.first_name + " " + user.last_name;

        studentClass.textContent =
            user.class_name || "-";

    } else {

        registeredStudentBox.style.display = "none";
        guestStudentBox.style.display = "block";
    }
}

// Simple result calculation by words
function calculateResult(studentText, correctText) {

    const answerWords =
        studentText.trim().toLowerCase().split(/\s+/);

    const correctWords =
        correctText.trim().toLowerCase().split(/\s+/);

    let correctCount = 0;

    correctWords.forEach((word, index) => {
        if (answerWords[index] === word) {
            correctCount++;
        }
    });

    const percent =
        Math.round((correctCount / correctWords.length) * 100);

    return percent;
}

// Get grade from percent
function calculateGrade(percent) {

    if (percent >= 90) {
        return 5;
    }

    if (percent >= 75) {
        return 4;
    }

    if (percent >= 50) {
        return 3;
    }

    return 2;
}

// Save test result
studentTestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const currentTest =
        JSON.parse(localStorage.getItem("currentTest"));

    if (!currentTest) {
        testMessage.textContent = "Тест не загружен";
        return;
    }

    const answer =
        studentAnswer.value;

    if (!answer.trim()) {
        testMessage.textContent = "Введите ответ";
        return;
    }

    let guestName = null;
    let guestClass = null;
    let studentId = null;

    if (user && user.role === "student") {
        studentId = user.id;
    } else {
        guestName = document.getElementById("guestName").value;
        guestClass = document.getElementById("guestClass").value;

        if (!guestName.trim()) {
            testMessage.textContent = "Введите имя";
            return;
        }
    }

    const percentResult =
        calculateResult(answer, currentTest.correct_answer);

    const grade =
        calculateGrade(percentResult);

    const mistakes =
        percentResult === 100
            ? "Ошибок не найдено"
            : "Ответ отличается от правильного варианта";

    const response = await fetch("/api/tests/result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            testId: currentTest.id,
            studentId,
            guestName,
            guestClass,
            studentAnswer: answer,
            percentResult,
            grade,
            mistakes
        })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("lastResult", JSON.stringify({
            testTitle: currentTest.title,
            taskText: currentTest.task_text,
            studentAnswer: answer,
            correctAnswer: currentTest.correct_answer,
            percentResult,
            grade,
            mistakes
        }));

        window.location.href = "/pages/result.html";
    } else {
        testMessage.textContent = data.message;
    }
});

showStudentInfo();
loadTest();