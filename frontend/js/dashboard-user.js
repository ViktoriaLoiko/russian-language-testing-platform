const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "/pages/login.html";
}

const userName = document.getElementById("userName");
const userAvatar = document.getElementById("userAvatar");
const logoutButton = document.getElementById("logoutButton");

if (userName && userAvatar) {
    userName.textContent = `${user.first_name} ${user.last_name}`;
    userAvatar.textContent =
        user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase();
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "/pages/login.html";
    });
}