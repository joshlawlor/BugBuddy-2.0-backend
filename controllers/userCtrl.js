const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

function createJWT(user) {
    console.log('JWT FUNCTION ', user)
    try {
        return jwt.sign(
            {user},
            {expiresIn: '24h'}
        )
    }catch(err){
        console.log(err)
    }
}

const signUp = (req, res) => {
    const user = new User(req.body);
    user.save()
    // const token = createJWT(user)
    console.log('Signup Function ', user)
    // res.json({token})
}

const showAll = (req, res) => {
    User.find({}, (err, users) => {
        if(err){ 
            res.status(400).json(err)
            return
        }
        res.json(users)
    })

}

module.exports = {
    showAll,
    signUp
}