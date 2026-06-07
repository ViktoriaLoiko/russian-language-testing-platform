const express = require("express");
const router = express.Router();

const db = require("../config/db");

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
        (error) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Test save error" });
                return;
            }

            res.json({
                message: "Тест сохранён",
                testCode: testCode
            });
        }
    );
});

module.exports = router;