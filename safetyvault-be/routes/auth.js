const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../routes/user');

// Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const minPasswordLength = 8;

        if (password.length < minPasswordLength) {
            return res.status(400).json({ message: `Password must be at least ${minPasswordLength} characters long` });
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one letter, one number, and one special character' });
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
            return res.status(400).json({ message: 'Invalid username or password!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password!' });
        }

        req.session.user = { id: user._id, username: user.username };
        res.json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Change password
router.patch('/changepassword', async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'New password is required' });
        }

        if (!req.session.user || !req.session.user.id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.session.user.id;

        const minPasswordLength = 8;

        if (password.length < minPasswordLength) {
            return res.status(400).json({ message: `Password must be at least ${minPasswordLength} characters long` });
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one letter, one number, and one special character' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedPassword = await User.findOneAndUpdate(
            { _id: userId },
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedPassword) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Password updated successfully', updatedPassword);
        res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password' });
    }
});


router.get('/homepage', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json({ message: `Welcome ${req.session.user.username}` });
});

module.exports = router;
