const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please provide the task details"]
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
})

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;