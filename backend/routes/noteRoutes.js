const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Create new note
router.post("/create", (req, res) => {

    const {
        userId,
        title,
        noteText
    } = req.body;

    const sql = `
        INSERT INTO notes
        (user_id, title, note_text)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            title,
            noteText
        ],
        (error) => {

            if (error) {

                console.log(error);

                res.status(500).json({
                    message: "Note save error"
                });

                return;
            }

            res.json({
                message: "Note saved"
            });
        }
    );
});

// Load notes for user
router.get("/user/:userId", (req, res) => {

    const userId = req.params.userId;

    const sql = `
        SELECT *
        FROM notes
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (error, results) => {

        if (error) {

            console.log(error);

            res.status(500).json({
                message: "Notes load error"
            });

            return;
        }

        res.json(results);
    });
});

// Delete note
router.delete("/delete/:id", (req, res) => {

    const noteId = req.params.id;

    const sql = `
        DELETE FROM notes
        WHERE id = ?
    `;

    db.query(sql, [noteId], (error) => {

        if (error) {

            console.log(error);

            res.status(500).json({
                message: "Note delete error"
            });

            return;
        }

        res.json({
            message: "Note deleted"
        });
    });
});

module.exports = router;