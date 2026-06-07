const express = require("express");
const router = express.Router();

const db = require("../config/db");
const QRCode = require("qrcode");

// Create new test
router.post("/create", (req, res) => {
    const {
        teacherId,
        title,
        instruction,
        taskText,
        correctAnswer,
        grade5,
        grade4,
        grade3
    } = req.body;

    // Generate simple test code
    const testCode = "RUS" + Math.floor(100000 + Math.random() * 900000);

    const sql = `
        INSERT INTO tests
        (teacher_id, title, instruction, task_text, correct_answer, test_code)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Save test to database
    db.query(
        sql,
        [teacherId, title, instruction, taskText, correctAnswer, testCode],
        async (error) => {
            if (error) {
                console.log(error);

                res.status(500).json({
                    message: "Test save error"
                });

                return;
            }

            // Link that will be stored inside QR code
            const qrData =
                `http://localhost:3000/pages/test.html?code=${testCode}`;

            // Generate QR code image
            const qrCode = await QRCode.toDataURL(qrData);

            res.json({
                message: "Тест сохранён",
                testCode: testCode,
                qrCode: qrCode
            });
        }
    );
});

// Get all tests created by teacher
router.get("/teacher/:teacherId", (req, res) => {
    const teacherId = req.params.teacherId;

    const sql = `
        SELECT id, title, test_code, created_at
        FROM tests
        WHERE teacher_id = ?
        ORDER BY created_at DESC
    `;

    // Load teacher tests from database
    db.query(sql, [teacherId], (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                message: "Tests load error"
            });

            return;
        }

        res.json(results);
    });
});

// Generate QR code for existing test
router.get("/qr/:testCode", async (req, res) => {
    const testCode = req.params.testCode;

    // Link for student test page
    const qrData =
        `http://localhost:3000/pages/test.html?code=${testCode}`;

    const qrCode = await QRCode.toDataURL(qrData);

    res.json({
        testCode: testCode,
        qrCode: qrCode
    });
});

// Get test by test code
router.get("/code/:testCode", (req, res) => {
    const testCode = req.params.testCode;

    const sql = `
        SELECT
            id,
            title,
            instruction,
            task_text,
            correct_answer,
            test_code
        FROM tests
        WHERE test_code = ?
    `;

    // Load test from database
    db.query(sql, [testCode], (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                message: "Test load error"
            });

            return;
        }

        // Test was not found
        if (results.length === 0) {
            res.status(404).json({
                message: "Test not found"
            });

            return;
        }

        // Return test data
        res.json(results[0]);
    });
});

// Save test result
router.post("/result", (req, res) => {
    const {
        testId,
        studentId,
        guestName,
        guestClass,
        studentAnswer,
        percentResult,
        grade,
        mistakes
    } = req.body;

    const sql = `
        INSERT INTO results
        (test_id, student_id, guest_name, guest_class, student_answer, percent_result, grade, mistakes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            testId,
            studentId,
            guestName,
            guestClass,
            studentAnswer,
            percentResult,
            grade,
            mistakes
        ],
        (error) => {
            if (error) {
                console.log(error);

                res.status(500).json({
                    message: "Result save error"
                });

                return;
            }

            res.json({
                message: "Result saved"
            });
        }
    );
});

// Get results for student
router.get("/results/student/:studentId", (req, res) => {
    const studentId = req.params.studentId;

    const sql = `
        SELECT
            results.id,
            tests.title,
            results.percent_result,
            results.grade,
            results.created_at
        FROM results
        JOIN tests ON results.test_id = tests.id
        WHERE results.student_id = ?
        ORDER BY results.created_at DESC
    `;

    db.query(sql, [studentId], (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                message: "Student results load error"
            });

            return;
        }

        res.json(results);
    });
});

// Load all test results for teacher
router.get("/results/all", (req, res) => {

    const sql = `
        SELECT
            results.id,
            results.student_answer,
            results.percent_result,
            results.grade,
            results.created_at,
            tests.title,
            users.first_name,
            users.last_name,
            results.guest_name
        FROM results
        JOIN tests ON results.test_id = tests.id
        LEFT JOIN users ON results.student_id = users.id
        ORDER BY results.created_at DESC
    `;

    db.query(sql, (error, results) => {

        if (error) {
            console.log(error);

            res.status(500).json({
                message: "Results load error"
            });

            return;
        }

        res.json(results);
    });
});

module.exports = router;