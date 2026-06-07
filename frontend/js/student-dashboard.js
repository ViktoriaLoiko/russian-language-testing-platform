// Welcome message
const welcomeStudent =
    document.getElementById("welcomeStudent");

// Cards counters
const notesCount =
    document.getElementById("notesCount");

const questionsCount =
    document.getElementById("questionsCount");

// Table for student results
const studentResultsTable =
    document.getElementById("studentResultsTable");

// Block for student questions
const studentQuestionsList =
    document.getElementById("studentQuestionsList");

// Get current user
const currentStudent =
    JSON.parse(localStorage.getItem("user"));

// Show current student name
if (currentStudent) {

    welcomeStudent.textContent =
        `Добро пожаловать, ${currentStudent.first_name}!`;
}

// Load student results from database
async function loadStudentResults() {

    if (!currentStudent) {
        window.location.href = "/pages/login.html";
        return;
    }

    const response =
        await fetch(`/api/tests/results/student/${currentStudent.id}`);

    const results =
        await response.json();

    studentResultsTable.innerHTML = "";

    if (results.length === 0) {
        studentResultsTable.innerHTML = `
            <tr>
                <td colspan="3" class="empty-data">
                    У вас пока нет результатов тестов.
                </td>
            </tr>
        `;

        return;
    }

    results.forEach((result) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.title}</td>
            <td>${result.percent_result}% / ${result.grade}</td>
            <td>${new Date(result.created_at).toLocaleDateString()}</td>
        `;

        studentResultsTable.appendChild(row);
    });
}

// Load number of student notes
async function loadNotesCount() {

    const response =
        await fetch(`/api/notes/user/${currentStudent.id}`);

    const notes =
        await response.json();

    notesCount.textContent =
        notes.length;
}

// Load student questions from database
async function loadStudentQuestions() {

    const response =
        await fetch(`/api/questions/student/${currentStudent.id}`);

    const questions =
        await response.json();

    questionsCount.textContent =
        questions.length;

    studentQuestionsList.innerHTML = "";

    if (questions.length === 0) {

        studentQuestionsList.innerHTML = `
            <div class="participants-placeholder">
                У вас пока нет вопросов.
            </div>
        `;

        return;
    }

    questions.forEach((question) => {

        const questionBlock =
            document.createElement("div");

        questionBlock.className =
            "question-row";

        questionBlock.innerHTML = `
            <h3>${question.question_text}</h3>

            <p>
                <strong>Тема:</strong> ${question.topic}
                · ${new Date(question.created_at).toLocaleDateString()}
            </p>

            <p>
                <strong>Ответ преподавателя:</strong>
                ${question.answer_text || "Ответ пока не добавлен."}
            </p>
        `;

        studentQuestionsList.appendChild(questionBlock);
    });
}

// Load data after page is opened
loadStudentResults();
loadNotesCount();
loadStudentQuestions();