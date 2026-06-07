// Elements for test search
const startTestButton =
    document.getElementById("startTestButton");

const testCodeInput =
    document.getElementById("testCodeInput");

// Open test by code
startTestButton.addEventListener("click", async () => {

    const testCode =
        testCodeInput.value.trim();

    if (!testCode) {
        alert("Введите код теста");
        return;
    }

    try {

        const response =
            await fetch(`/api/tests/code/${testCode}`);

        if (!response.ok) {
            alert("Тест не найден");
            return;
        }

        // Open test page
        window.location.href =
            `/pages/test.html?code=${testCode}`;

    } catch (error) {

        console.log(error);

        alert("Ошибка загрузки теста");
    }
});