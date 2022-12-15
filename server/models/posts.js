const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: {
            _id: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            }
        },
        required: true,
    },
    post: {
        type: String,
        reuired: true,
    },

}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)