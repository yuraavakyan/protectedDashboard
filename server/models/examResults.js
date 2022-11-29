const mongoose = require('mongoose');

const ExamResultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('ExamResult', ExamResultSchema)