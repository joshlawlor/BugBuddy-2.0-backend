const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = function(req,res, next) {
    //CHECK FOR TOKEN
    let token = req.get('Authorization') || req.query.token || req.body.token;

    if(token){
        token = token.replace('Bearer ', '')

        //CHECK IF VALID / EXPIRED
        jwt.verify(token, SECRET, function(err,decoded) {
            if(err){
                next(err)
            }else{
                // console.log('AUTHORIZED', decoded.user.username)
                
                req.user = decoded.user;
                next()
            }
        })
    }else {
        next();
    }
}