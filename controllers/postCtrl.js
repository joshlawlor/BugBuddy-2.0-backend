const Post = require('../models/postModel')
const User = require('../models/userModel')


const showAll = (req, res) => {

    Post.find({}, (err, posts) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.json(posts)
    })
}

const showOne = (req, res) => {
    let postId = req.params.id;
    // console.log('Show one ran')
    Post.findById({ _id: postId }, (err, post) => {
        if (err) {
            res.status(400).json(err)
            return
        } else {
            return res.json([post])
        }
    })
}


const create = (req, res) => {
    console.log('CREATE FUNCTION', req.body)
    const post = new Post(req.body)
    post.author.push(req.user.username)
    console.log(post.category)

    post.save()
    res.json(post)

    // Add post to author's posts library

    User.findOne({ email: req.user.email }, (err, user) => {
        console.log('ADDED TO POSTS')
        if (err) {
            res.status(400).json(err)
        }
        user.posts.push(post)
        user.save()
    })


}
const deletePost = (req, res) => {
    console.log('deleted')
    Post.findByIdAndDelete({ _id: req.params.id }, (err, post) => {
        if (err) {
            res.status(400).json(err)
        }
        res.json({ msg: 'Post Deleted' })
    })
    User.findOne({ email: req.user.email }, (err, user) => {
        if (err) {
            res.status(400).json(err)
        }
        Post.findById({ _id: req.params.id }, (err, userPost) => {
            user.posts.pop(userPost)
            console.log(user.posts)
            user.save()
        })
    })

}

const updatePost = (req, res) => {
    User.findOne({ email: req.user.email }, (err, user) => {
        Post.findById({ _id: req.params.id }, (err, userPost) => {
            user.posts.pop(userPost)
            user.save()
        })
        Post.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, post) => {
            if (err) {
                res.status(400).json()
                return
            }
            res.json(post)
            post.save()
            User.findOne({ email: req.user.email }, (err, user) => {
                user.posts.push(post)
                user.posts.map((p) => {
                    let id = p._id.toString()

                    if (id == req.params.id) {
                        post.title = req.body.title
                        post.content = req.body.content
                        post.category = req.body.category
                    }
                })
                user.save()
            })
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