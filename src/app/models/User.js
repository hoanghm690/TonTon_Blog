const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        gender: { type: String },
        birthday: { type: String },
    },
    { timestamps: true },
);
module.exports = mongoose.model('User', User);
