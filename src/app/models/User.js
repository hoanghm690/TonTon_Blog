const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        gender: { type: String, required: true },
        birthday: { type: String, required: true },
    },
    { timestamps: true },
);
module.exports = mongoose.model('User', User);
