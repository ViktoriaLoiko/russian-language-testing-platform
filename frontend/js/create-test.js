const createTestForm = document.getElementById("createTestForm");
const createTestMessage = document.getElementById("createTestMessage");
const testCodeText = document.getElementById("testCodeText");
const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");

createTestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/pages/login.html";
        return;
    }

    const title = document.getElementById("testTitle").value;
    const instruction = document.getElementById("instruction").value;
    const taskText = document.getElementById("taskText").value;
    const correctAnswer = document.getElementById("correctAnswer").value;

    const grade5 = document.getElementById("grade5").value || 90;
    const grade4 = document.getElementById("grade4").value || 75;
    const grade3 = document.getElementById("grade3").value || 50;

    const response = await fetch("/api/tests/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            teacherId: user.id,
            title,
            instruction,
            taskText,
            correctAnswer,
            grade5,
            grade4,
            grade3
        })
    });

    const data = await response.json();

    if (response.ok) {
        createTestMessage.textContent = data.message;

        testCodeText.textContent =
            "Код теста: " + data.testCode;

        qrText.textContent =
            "QR-код создан";

        qrImage.src = data.qrCode;
        qrImage.style.display = "block";
    } else {
        createTestMessage.textContent = data.message;
    }
});