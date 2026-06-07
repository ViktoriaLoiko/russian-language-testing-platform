// Result page data
const lastResult = JSON.parse(localStorage.getItem("lastResult"));
const user = JSON.parse(localStorage.getItem("user"));

if (lastResult) {
    document.getElementById("resultStudentName").textContent =
        user ? user.first_name + " " + user.last_name : "Гость";

    document.getElementById("resultTestTitle").textContent =
        lastResult.testTitle;

    document.getElementById("resultPercent").textContent =
        lastResult.percentResult + "%";

    document.getElementById("resultGrade").textContent =
        "Оценка: " + lastResult.grade;

    document.getElementById("resultTaskText").textContent =
        lastResult.taskText || "Текст задания";

    document.getElementById("resultStudentAnswer").textContent =
        lastResult.studentAnswer;

    document.getElementById("resultCorrectAnswer").textContent =
        lastResult.correctAnswer;

    document.getElementById("resultMistakes").textContent =
        lastResult.mistakes;
}