const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const className = document.getElementById("className").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    if (password !== repeatPassword) {
        registerMessage.textContent = "Пароли не совпадают";
        return;
    }

    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            className
        })
    });

    const data = await response.json();

    if (response.ok) {

    registerMessage.textContent = "Регистрация выполнена";

    setTimeout(() => {
        window.location.href = "/pages/student-dashboard.html";
    }, 1000);

    }else {

    registerMessage.textContent =
        "Ошибка регистрации";

    }
    
});