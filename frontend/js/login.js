const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const user = await response.json();

    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "teacher") {
            window.location.href = "/pages/teacher-dashboard.html";
        } else {
            window.location.href = "/pages/student-dashboard.html";
        }
    } else {
        loginMessage.textContent = user.message;
    }
});