const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
<<<<<<< HEAD
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
=======
const User = require('../routes/user');

// Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
>>>>>>> efce576cbac74a95820933ffd058771613c31a6e

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.user = { id: user._id, username: user.username };
        res.json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// After successfully logged in
router.get('/homepage', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json({ message: `Welcome ${req.session.user.username}` });
});

module.exports = router;
