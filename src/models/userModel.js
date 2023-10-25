const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        default: 'unverified',
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        code: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
        }
    },
    photo: {
        type: String,
    }

}, { timestamps: true, versionKey: false });


const userModel = model('users', userSchema);

module.exports = userModel;