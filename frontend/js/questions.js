// Open correct dashboard page
const cabinetLink = document.getElementById("cabinetLink");

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