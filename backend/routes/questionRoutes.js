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

module.exports = router;