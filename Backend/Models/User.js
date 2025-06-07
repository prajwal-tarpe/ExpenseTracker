const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expenses : [
        {
            amount:{
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ['income', 'expense'],
                default: 'expense',
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;