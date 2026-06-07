const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Create new question
router.post("/create", (req, res) => {

    const {
        userId,
        guestName,
        topic,
        questionText
    } = req.body;

    const sql = `
        INSERT INTO questions
        (user_id, guest_name, topic, question_text)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            guestName,
            topic,
            questionText
        ],
        (error) => {

            if (error) {

                console.log(error);

                res.status(500).json({
                    message: "Question save error"
                });

                return;
            }

            res.json({
                message: "Question sent successfully"
            });
        }
    );
});

// Load all questions
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM questions
        ORDER BY created_at DESC
    `;

    db.query(sql, (error, results) => {

        if (error) {

            console.log(error);

            res.status(500).json({
                message: "Questions load error"
            });

            return;
        }

        res.json(results);
    });
});

// Load questions without answers
router.get("/unanswered", (req, res) => {

    const sql = `
        SELECT *
        FROM questions
        WHERE answer_text IS NULL
        ORDER BY created_at DESC
    `;

    db.query(sql, (error, results) => {

        if (error) {

            console.log(error);

            res.status(500).json({
                message: "Unanswered questions load error"
            });

            return;
        }

        res.json(results);
    });
});


// Save teacher answer
router.put("/answer/:id", (req, res) => {

    const questionId = req.params.id;

    const {
        answerText
    } = req.body;

    const sql = `
        UPDATE questions
        SET answer_text = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            answerText,
            questionId
        ],
        (error) => {

            if (error) {

                console.log(error);

                res.status(500).json({
                    message: "Answer save error"
                });

                return;
            }

            res.json({
                message: "Answer saved"
            });
        }
    );
});

// Load questions for one student
router.get("/student/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT *
        FROM questions
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (error, results) => {

        if (error) {

            console.log(error);

            res.status(500).json({
                message: "Student questions load error"
            });

            return;
        }

        res.json(results);
    });
});

module.exports = router;