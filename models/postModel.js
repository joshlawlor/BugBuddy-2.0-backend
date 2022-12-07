const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    },
    { 
        timestamps: true
    })


    const postSchema = new mongoose.Schema({
        title: String,
        content: String,
        category: String,
        comments: [commentSchema],
        author: [],
    }, 
    {
        timestamps: true
    })

    module.exports = mongoose.model('Post' , postSchema)