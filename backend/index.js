const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const loginRoutes = require("./routes/loginRoutes");
const testRoutes = require("./routes/testRoutes");
const questionRoutes = require("./routes/questionRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", loginRoutes);
app.use("/api/tests", testRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});