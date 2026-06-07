// Card with number of created tests
const testsCount = document.getElementById("testsCount");

// Table for displaying teacher tests
const teacherTestsTable = document.getElementById("teacherTestsTable");

// QR modal elements
const qrModal = document.getElementById("qrModal");
const qrClose = document.getElementById("qrClose");
const modalQrImage = document.getElementById("modalQrImage");
const modalTestCode = document.getElementById("modalTestCode");

// Get current user from localStorage
const currentUser = JSON.parse(localStorage.getItem("user"));

// Load teacher tests from database
async function loadTeacherTests() {

    // Redirect to login page if user is not logged in
    if (!currentUser) {
        window.location.href = "/pages/login.html";
        return;
    }

    // Request teacher tests from backend
    const response =
        await fetch(`/api/tests/teacher/${currentUser.id}`);

    const tests = await response.json();

    // Show total number of tests
    testsCount.textContent = tests.length;

    // Clear table before loading data
    teacherTestsTable.innerHTML = "";

    // Show message if teacher has no tests
    if (tests.length === 0) {

        teacherTestsTable.innerHTML = `
            <tr>
                <td colspan="4" class="empty-data">
                    Tests have not been created yet
                </td>
            </tr>
        `;

        return;
    }

    // Create table rows for every test
    tests.forEach((test) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${test.title}</td>
            <td>${new Date(test.created_at).toLocaleDateString()}</td>
            <td>${test.test_code}</td>
            <td>
                <button
                    class="small-button show-qr-button"
                    data-code="${test.test_code}">
                    Show QR
                </button>
            </td>
        `;

        teacherTestsTable.appendChild(row);
    });

    // Add click events for QR buttons
    const qrButtons =
        document.querySelectorAll(".show-qr-button");

    qrButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            // Get test code from button
            const testCode = button.dataset.code;

            // Request QR code from backend
            const response =
                await fetch(`/api/tests/qr/${testCode}`);

            const data = await response.json();

            // Show QR code inside modal window
            modalTestCode.textContent =
                "Test code: " + data.testCode;

            modalQrImage.src = data.qrCode;

            qrModal.style.display = "block";
        });
    });
}

// Close modal by close button
if (qrClose) {

    qrClose.addEventListener("click", () => {
        qrModal.style.display = "none";
    });
}

// Close modal when clicking outside content area
window.addEventListener("click", (event) => {

    if (event.target === qrModal) {
        qrModal.style.display = "none";
    }
});

// Load tests after page is opened
loadTeacherTests();