const express = require("express");
const router = express.Router();

const db = require("../config/db");
const QRCode = require("qrcode");

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

    const testCode = "RUS" + Math.floor(100000 + Math.random() * 900000);

    const sql = `
        INSERT INTO tests
        (teacher_id, title, instruction, task_text, correct_answer, test_code)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

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

        const qrData =
            `http://localhost:3000/pages/test.html?code=${testCode}`;

        const qrCode = await QRCode.toDataURL(qrData);

        res.json({
            message: "Тест сохранён",
            testCode: testCode,
            qrCode: qrCode
        });

    }
);
});

router.get("/teacher/:teacherId", (req, res) => {
    const teacherId = req.params.teacherId;

    const sql = `
        SELECT id, title, test_code, created_at
        FROM tests
        WHERE teacher_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [teacherId], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Tests load error" });
            return;
        }

        res.json(results);
    });
});


 router.get("/qr/:testCode", async (req, res) => {
    const testCode = req.params.testCode;

    const qrData =
        `http://localhost:3000/pages/test.html?code=${testCode}`;

    const qrCode = await QRCode.toDataURL(qrData);

    res.json({
        testCode: testCode,
        qrCode: qrCode
    });
});

module.exports = router;