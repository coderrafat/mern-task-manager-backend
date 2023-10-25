const { Schema, model } = require('mongoose');

const taskSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    email: {
        type: String,
        required: true
    }


}, { timestamps: true, versionKey: false });

const taskModel = model('tasks', taskSchema);

module.exports = taskModel;