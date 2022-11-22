const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userCtrl')

router.get('/show', userCtrl.showAll)
router.post('/signup', userCtrl.signUp)



module.exports = router