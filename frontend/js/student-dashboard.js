// Welcome message
const welcomeStudent =
    document.getElementById("welcomeStudent");

// Table for student results
const studentResultsTable =
    document.getElementById("studentResultsTable");

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

loadStudentResults();