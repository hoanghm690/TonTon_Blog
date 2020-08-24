const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    createdDate: { type: Date, default: Date.now },
    full_name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', User);
