const Post = require('../models/postModel')


const create = (req,res) => {
    console.log('Comment', req.body)
    //Need to add an author
    //Need to add comment to User's version
    Post.findById({ _id: req.params.id}, (err,post) => {
        if(err){
            res.status(400).json(err)
        }
        post.comments.push(req.body)
        console.log(post.comments)
        post.save()
        res.json(post.comments)
    })

}

module.exports = {
    create,
}