const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (request, response) => {
    const { username, password } = request.body;
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query("SELECT * FROM users WHERE name = ?", [username]);
        if (rows.length > 0) {
            response.status(400).send("Username has already been used!");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await conn.query("INSERT INTO users (name, password) VALUES (?, ?)", [username, hashedPassword]);
            response.status(201).send("User registered successfully!");
        }
        conn.release();
    } catch (error) {
        response.status(500).send("Internal server error");
    }
});

router.post("/login", async (request, response) => {
    const { username, password } = request.body;
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query("SELECT * FROM users WHERE name = ?", [username]);
        if (rows.length === 0) {
            return response.status(400).send("User doesn't exist!");
        }
        const user = rows[0];
        if (await bcrypt.compare(password, user.password)) {
            response.send("Success!");
        } else {
            response.send("Not allowed");
        }
        conn.release();
    } catch (error) {
        response.status(500).send("Internal server error");
    }
});

module.exports = router;
