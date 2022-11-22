const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
function createJWT(user) {
    console.log('JWT FUNCTION ', user)
    try {
        return jwt.sign(
            { user },
            SECRET,
            { expiresIn: '24h' }
        )
    } catch (err) {
        console.log(err)
    }
}

const signUp = (req, res) => {
    const user = new User(req.body);
    user.save()
    const token = createJWT(user)
    console.log('Signup Function ', user)
    res.json({ token })
}

async function login(req, res) {

    try {
        console.log('BODY', req.body)
        const user = await User.findOne({ email: req.body.email }).select('+password');
        console.log(user)
        if (!user) return res.status(401).json({ err: 'bad credentials' });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user)
                res.json({ token })
            } else {
                return res.status(401).json({ err: 'bad credentials' })
            }
        })
    } catch (err) {
        return res.status(400).json({err: 'Line 41'})
    }
    


}

const showAll = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.json(users)
    })

}

module.exports = {
    showAll,
    signUp,
    login
}