const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6;


const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: {
        type: String,
        select: false
    },
    posts: [],
    comments: []
}, {
    timestamps: true
})

userSchema.pre('sace', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next()
    })
})


userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, cb);
}

module.exports = mongoose.model('User', userSchema)