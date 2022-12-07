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

const showOne = (req, res) => {
    let postId = req.params.id;
    console.log('Show one ran')
    Post.findById({ _id: postId}, (err, post) => {
        if(err){
            res.status(400).json(err)
            return
        }else{
            return res.json([post])
        }
    }) 
}


const create = (req,res) =>{
    console.log('CREATE FUNCTION', req.body)
    const post = new Post(req.body)
    post.author.push(req.user.username)
    console.log(post.category)

    post.save()
    console.log(post)
    res.json(post)

    // Add post to author's posts library
    
    User.findOne({ email: req.user.email}, (err,user) =>{
        console.log('ADDED TO POSTS')
        if(err){
            res.status(400).json(err)
        }
        user.posts.push(post)
        user.save()
    })


}


module.exports = {
    showAll,
    create,
    showOne
}