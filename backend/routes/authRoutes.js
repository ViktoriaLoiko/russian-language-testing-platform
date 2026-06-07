const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/register", (req, res) => {
    const { firstName, lastName, email, password, className } = req.body;

    const sql = `
        INSERT INTO users 
        (first_name, last_name, email, password, role, class_name)
        VALUES (?, ?, ?, ?, 'student', ?)
    `;

    db.query(sql, [firstName, lastName, email, password, className], (error) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Registration error" });
            return;
        }

        res.json({ message: "User registered successfully" });
    });
});

module.exports = router;