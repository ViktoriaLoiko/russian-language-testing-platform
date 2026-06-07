const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "russian_testing"
});

db.connect((error) => {
    if (error) {
        console.log("Database connection error:", error);
        return;
    }

    console.log("Database connected");
});

module.exports = db;