'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual JWT secret

// Register function
async function register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    return newUser.save();
}

// Login function
async function login(username, password) {
    const user = await User.findOne({ username: username });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
}

module.exports = { register, login };