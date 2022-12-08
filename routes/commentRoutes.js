const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/commentCtrl')


router.post('/:id/comments', commentCtrl.create)
// router.delete('/posts/:id/comments/:commentId', commentCtrl.deleteComment)


module.exports = router