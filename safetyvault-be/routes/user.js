// This defines the model/schema for the user
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
