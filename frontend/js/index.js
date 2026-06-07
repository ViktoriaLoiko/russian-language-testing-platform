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

// News block
const newsList = document.getElementById("news-list");

// Load news from database
async function loadNews() {

    const response =
        await fetch("/api/news");

    const news =
        await response.json();

    newsList.innerHTML = "";

    if (news.length === 0) {
        newsList.innerHTML =
            "<p>Новости пока не добавлены.</p>";

        return;
    }

    news.forEach((item) => {

        const newsItem =
            document.createElement("div");

        newsItem.className =
            "news-item";

        newsItem.innerHTML = `
            <p>${item.news_text}</p>
            <span>${new Date(item.created_at).toLocaleDateString()}</span>
        `;

        newsList.appendChild(newsItem);
    });
}

// Load news when main page is opened
loadNews();