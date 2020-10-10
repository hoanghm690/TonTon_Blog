const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const User = new Schema(
    {
        // _id: { type: Number },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        gender: { type: String, required: false },
        avatar: { type: String, required: true },
        birthday: { type: String, required: false },
        role: { type: Number, default: 0 },
    },
    {   
        // _id: false,
        timestamps: true 
    },
);
User.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
};

// User.plugin(AutoIncrement);
// User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('User', User);
