const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (error, results) => {

        if (error) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Неверный email или пароль"
            });
        }

        res.json(results[0]);

    });

});

module.exports = router;