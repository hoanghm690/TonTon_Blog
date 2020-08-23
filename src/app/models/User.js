const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    ObjectId: ObjectId,
    createdDate: { type: Date, default: Date.now },
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', User);
