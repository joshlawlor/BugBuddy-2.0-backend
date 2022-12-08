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
const deletePost = (req,res) => {
    console.log('deleted')
    Post.findByIdAndDelete({_id: req.params.id}, (err,post) => {
        if(err) {
            res.status(400).json(err)
        }
        res.json({msg: 'Post Deleted'})
    })
    User.findOne({email: req.user.email}, (err, user) => {
        if(err){
            res.status(400).json(err)
        }
        Post.findById({_id: req.params.id}, (err,post) => {
            user.posts.pop(post)
            user.save()
        })
    })

}

const updatePost = (req,res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, post) =>{
        if(err){
            res.status(400).json()
            return
        }
        res.json(post)
    })   
 
    User.findOne({ email: req.user.email }, (err,user) => {
        if(err){
            res.status(400).json(err)
        }
        user.posts.map((post) => {
            const id = post._id.toString()
            if(id == req.params.id){
                console.log('BEFORE UPDATE', post.title, post.content)
                post.title = req.body.title
                post.content = req.body.content

                console.log(`POST:`,user.posts)
                console.log('AFTER UPDATE', post.title, post.content)
                user.save()


            }else{
                console.log(post._id)
                console.log(req.params.id)
            }

        })  
       


    })
}


module.exports = {
    showAll,
    create,
    showOne,
    updatePost,
    deletePost
}