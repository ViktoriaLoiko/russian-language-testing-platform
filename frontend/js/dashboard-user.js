const user = JSON.parse(localStorage.getItem("user"));

const protectedPages = [
    "teacher-dashboard.html",
    "student-dashboard.html",
    "notes.html",
    "create-test.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (!user && protectedPages.includes(currentPage)) {
    window.location.href = "/pages/login.html";
}

const userName = document.getElementById("userName");
const userAvatar = document.getElementById("userAvatar");
const logoutButton = document.getElementById("logoutButton");
const loginLink = document.getElementById("loginLink");

if (user && userName && userAvatar) {
    userName.textContent = `${user.first_name} ${user.last_name}`;
    userAvatar.textContent =
        user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase();

    if (loginLink) {
        loginLink.style.display = "none";
    }

    if (logoutButton) {
        logoutButton.style.display = "inline-block";
    }
}

if (!user && userName && userAvatar) {
    userName.textContent = "Гость";
    userAvatar.textContent = "G";

    if (loginLink) {
        loginLink.style.display = "inline-block";
    }

    if (logoutButton) {
        logoutButton.style.display = "none";
    }
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/pages/login.html";
    });
}