// Open correct dashboard page
const cabinetLink = document.getElementById("cabinetLink");

// List for public questions
const questionsList =
    document.getElementById("questionsList");

// Question form elements
const questionForm =
    document.getElementById("questionForm");

const questionTopic =
    document.getElementById("questionTopic");

const questionText =
    document.getElementById("questionText");

const questionMessage =
    document.getElementById("questionMessage");

if (cabinetLink) {

    cabinetLink.addEventListener("click", (event) => {

        event.preventDefault();

        const user =
            JSON.parse(localStorage.getItem("user"));

        if (!user) {

            window.location.href =
                "/pages/login.html";

            return;
        }

        if (user.role === "teacher") {

            window.location.href =
                "/pages/teacher-dashboard.html";

        } else {

            window.location.href =
                "/pages/student-dashboard.html";
        }
    });
}

// Load questions from database
async function loadQuestions() {

    const response =
        await fetch("/api/questions");

    const questions =
        await response.json();

    questionsList.innerHTML = "";

    if (questions.length === 0) {

        questionsList.innerHTML = `
            <div class="question-card">
                <div class="question-card-header">
                    <span class="question-icon">?</span>

                    <div>
                        <h3>Вопросов пока нет</h3>
                        <p>После отправки вопросы появятся здесь.</p>
                    </div>
                </div>
            </div>
        `;

        return;
    }

    questions.forEach((question) => {

        const card =
            document.createElement("div");

        card.className =
            "question-card";

        card.innerHTML = `
            <div class="question-card-header">
                <span class="question-icon">?</span>

                <div>
                    <h3>${question.question_text}</h3>
                    <p>
                        Тема: ${question.topic}
                        · ${new Date(question.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div class="answer-box">
                <strong>Ответ преподавателя:</strong>
                <p>
                    ${question.answer_text || "Ответ пока не добавлен."}
                </p>
            </div>
        `;

        questionsList.appendChild(card);
    });
}

// Send question
if (questionForm) {

    questionForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const user =
            JSON.parse(localStorage.getItem("user"));

        // Only registered users can send questions
        if (!user) {

            questionMessage.textContent =
                "Для отправки вопроса необходимо войти в систему.";

            return;
        }

        if (!questionText.value.trim()) {

            questionMessage.textContent =
                "Введите текст вопроса.";

            return;
        }

        const response =
            await fetch("/api/questions/create", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    userId: user.id,
                    guestName: null,

                    topic:
                        questionTopic.value,

                    questionText:
                        questionText.value
                })
            });

        const data =
            await response.json();

        if (response.ok) {

            questionMessage.textContent =
                "Вопрос успешно отправлен.";

            questionForm.reset();

            // Reload question list after sending
            loadQuestions();

        } else {

            questionMessage.textContent =
                data.message;
        }
    });
}

// Load questions when page is opened
loadQuestions();