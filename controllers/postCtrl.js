const Post = require('../models/postModel')
const User = require('../models/userModel')


const showAll = (req,res) =>{

    Post.find({}, (err, posts) => {
        if(err) {
            res.status(400).json(err)
            return
        }
        res.json(posts)
    })
}


const create = (req,res) =>{
    console.log('CREATE FUNCTION')
    const post = new Post(req.body)
    // post.author.push(req.user.username)
    post.save()
    res.json(post)

}


module.exports = {
    showAll,
    create
}