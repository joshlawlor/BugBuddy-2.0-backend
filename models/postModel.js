const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String,
    author:[],
    },
    { 
        timestamps: true
    })


    const postSchema = new mongoose.Schema({
        title: String,
        summary: String,
        content: String,
        category: String,
        comments: [commentSchema],
        author: String,
        userId : String,
    }, 
    {
        timestamps: true
    })

    module.exports = mongoose.model('Post' , postSchema)