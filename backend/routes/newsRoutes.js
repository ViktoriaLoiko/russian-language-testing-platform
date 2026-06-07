const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Create news
router.post("/create", (req, res) => {

    const {
        teacherId,
        newsText
    } = req.body;

    const sql = `
        INSERT INTO news
        (teacher_id, news_text)
        VALUES (?, ?)
    `;

    db.query(sql, [teacherId, newsText], (error) => {

        if (error) {
            console.log(error);

            res.status(500).json({
                message: "News save error"
            });

            return;
        }

        res.json({
            message: "News saved"
        });
    });
});

// Load news
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM news
        ORDER BY created_at DESC
    `;

    db.query(sql, (error, results) => {

        if (error) {
            console.log(error);

            res.status(500).json({
                message: "News load error"
            });

            return;
        }

        res.json(results);
    });
});

module.exports = router;