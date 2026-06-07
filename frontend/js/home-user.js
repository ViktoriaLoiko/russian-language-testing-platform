// Block with login/register buttons
const headerButtons =
    document.getElementById("headerButtons");

// Get current user from localStorage
const user =
    JSON.parse(localStorage.getItem("user"));

// Replace buttons if user is logged in
if (user && headerButtons) {

    // Select correct dashboard page
    const dashboardPage =
        user.role === "teacher"
            ? "pages/teacher-dashboard.html"
            : "pages/student-dashboard.html";

    // Show dashboard and logout buttons
    headerButtons.innerHTML = `
        <a href="${dashboardPage}">
            <button class="auth-button">
                Кабинет
            </button>
        </a>

        <button
            class="auth-button"
            id="logoutButton">
            Выйти
        </button>
    `;

    // Logout button
    const logoutButton =
        document.getElementById("logoutButton");

    // Clear localStorage and reload page
    logoutButton.addEventListener("click", () => {

        localStorage.removeItem("user");

        window.location.reload();
    });
}