// News modal elements
const openNewsModal =
    document.getElementById("openNewsModal");

const newsModal =
    document.getElementById("newsModal");

const newsClose =
    document.getElementById("newsClose");

const newsText =
    document.getElementById("newsText");

const saveNewsButton =
    document.getElementById("saveNewsButton");

const newsMessage =
    document.getElementById("newsMessage");

// Card with number of created tests
const testsCount = document.getElementById("testsCount");

// Card with number of unanswered questions
const unansweredCount =
    document.getElementById("unansweredCount");

// Table for displaying teacher tests
const teacherTestsTable =
    document.getElementById("teacherTestsTable");

// Block for unanswered questions
const unansweredQuestions =
    document.getElementById("unansweredQuestions");

// QR modal elements
const qrModal = document.getElementById("qrModal");
const qrClose = document.getElementById("qrClose");
const modalQrImage = document.getElementById("modalQrImage");
const modalTestCode = document.getElementById("modalTestCode");

// Get current user from localStorage
const currentUser = JSON.parse(localStorage.getItem("user"));

// Load teacher tests from database
async function loadTeacherTests() {

    // Redirect to login page if user is not logged in
    if (!currentUser) {
        window.location.href = "/pages/login.html";
        return;
    }

    // Request teacher tests from backend
    const response =
        await fetch(`/api/tests/teacher/${currentUser.id}`);

    const tests = await response.json();

    // Show total number of tests
    testsCount.textContent = tests.length;

    // Clear table before loading data
    teacherTestsTable.innerHTML = "";

    // Show message if teacher has no tests
    if (tests.length === 0) {

        teacherTestsTable.innerHTML = `
            <tr>
                <td colspan="4" class="empty-data">
                    Tests have not been created yet
                </td>
            </tr>
        `;

        return;
    }

    // Create table rows for every test
    tests.forEach((test) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${test.title}</td>
            <td>${new Date(test.created_at).toLocaleDateString()}</td>
            <td>${test.test_code}</td>
            <td>
                <button
                    class="small-button show-qr-button"
                    data-code="${test.test_code}">
                    Show QR
                </button>
            </td>
        `;

        teacherTestsTable.appendChild(row);
    });

    // Add click events for QR buttons
    const qrButtons =
        document.querySelectorAll(".show-qr-button");

    qrButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            // Get test code from button
            const testCode = button.dataset.code;

            // Request QR code from backend
            const response =
                await fetch(`/api/tests/qr/${testCode}`);

            const data = await response.json();

            // Show QR code inside modal window
            modalTestCode.textContent =
                "Test code: " + data.testCode;

            modalQrImage.src = data.qrCode;

            qrModal.style.display = "block";
        });
    });
}

// Load unanswered questions from database
async function loadUnansweredQuestions() {

    const response =
        await fetch("/api/questions/unanswered");

    const questions =
        await response.json();

    // Show number of unanswered questions
    unansweredCount.textContent = questions.length;

    unansweredQuestions.innerHTML = "";

    if (questions.length === 0) {

        unansweredQuestions.innerHTML = `
            <div class="empty-data">
                Вопросов без ответа пока нет
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

            <textarea
                class="answer-input"
                placeholder="Введите ответ преподавателя"
            ></textarea>

            <button
                class="small-button save-answer-button"
                data-id="${question.id}">
                Сохранить ответ
            </button>
        `;

        unansweredQuestions.appendChild(questionBlock);
    });

    // Add click events for save answer buttons
    const answerButtons =
        document.querySelectorAll(".save-answer-button");

    answerButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const questionId =
                button.dataset.id;

            const answerInput =
                button.previousElementSibling;

            const answerText =
                answerInput.value.trim();

            if (!answerText) {
                alert("Введите ответ");
                return;
            }

            const response =
                await fetch(`/api/questions/answer/${questionId}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        answerText: answerText
                    })
                });

            if (response.ok) {
                alert("Ответ сохранён");

                // Reload unanswered questions after saving answer
                loadUnansweredQuestions();

            } else {
                alert("Ошибка сохранения ответа");
            }
        });
    });
}

// Close modal by close button
if (qrClose) {

    qrClose.addEventListener("click", () => {
        qrModal.style.display = "none";
    });
}

// Close modal when clicking outside content area
window.addEventListener("click", (event) => {

    if (event.target === qrModal) {
        qrModal.style.display = "none";
    }
});

// Open news modal
if (openNewsModal) {

    openNewsModal.addEventListener("click", () => {
        newsModal.style.display = "block";
    });
}

// Close news modal
if (newsClose) {

    newsClose.addEventListener("click", () => {
        newsModal.style.display = "none";
    });
}

// Save news to database
if (saveNewsButton) {

    saveNewsButton.addEventListener("click", async () => {

        const text =
            newsText.value.trim();

        if (!text) {
            newsMessage.textContent =
                "Введите текст новости.";
            return;
        }

        const response =
            await fetch("/api/news/create", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    teacherId: currentUser.id,
                    newsText: text
                })
            });

        const data =
            await response.json();

        if (response.ok) {

            newsMessage.textContent =
                "Новость сохранена.";

            newsText.value = "";

        } else {

            newsMessage.textContent =
                data.message;
        }
    });
}

// Load data after page is opened
loadTeacherTests();
loadUnansweredQuestions();