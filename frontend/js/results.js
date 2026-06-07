// Results table
const resultsTable = document.getElementById("resultsTable");

// Modal elements
const resultModal = document.getElementById("resultModal");
const resultClose = document.getElementById("resultClose");
const modalStudent = document.getElementById("modalStudent");
const modalTest = document.getElementById("modalTest");
const modalAnswer = document.getElementById("modalAnswer");

// Load all results from database
async function loadResults() {

    const response =
        await fetch("/api/tests/results/all");

    const results =
        await response.json();

    resultsTable.innerHTML = "";

    if (results.length === 0) {

        resultsTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-data">
                    Результатов пока нет
                </td>
            </tr>
        `;

        return;
    }

    results.forEach((result) => {

        const student =
            result.first_name
                ? result.first_name + " " + result.last_name
                : result.guest_name || "Гость";

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${student}</td>
            <td>${result.title}</td>
            <td>${result.percent_result}%</td>
            <td>${result.grade}</td>
            <td>${new Date(result.created_at).toLocaleDateString()}</td>
            <td>
                <button
                    class="small-button detail-button"
                    data-student="${student}"
                    data-test="${result.title}"
                    data-answer="${result.student_answer}">
                    Подробнее
                </button>
            </td>
        `;

        resultsTable.appendChild(row);
    });

    const detailButtons =
        document.querySelectorAll(".detail-button");

    detailButtons.forEach((button) => {

        button.addEventListener("click", () => {

            modalStudent.textContent =
                "Ученик: " + button.dataset.student;

            modalTest.textContent =
                "Тест: " + button.dataset.test;

            modalAnswer.textContent =
                button.dataset.answer;

            resultModal.style.display = "block";
        });
    });
}

// Close modal
if (resultClose) {
    resultClose.addEventListener("click", () => {
        resultModal.style.display = "none";
    });
}

// Close modal by background click
window.addEventListener("click", (event) => {
    if (event.target === resultModal) {
        resultModal.style.display = "none";
    }
});

loadResults();