const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/postCtrl')


router.get('/', postCtrl.showAll)
router.get('/:id', postCtrl.showOne)
router.put('/:id/edit', postCtrl.updatePost)
router.delete('/:id', postCtrl.deletePost)
router.post('/', postCtrl.create)



module.exports = router
