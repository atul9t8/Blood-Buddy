const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    let token = req.header("Authorization");
    if(!token){
        res.send("Access Denied! No Token Provided.")
    }
    else{
        token = token.split(' ')[1].trim();
        try{
            const decoded = jwt.verify(token, process.env.KEY);
            req.user = decoded;   
        }
        catch(err){
            res.send("Invalid Token!")
        }   
    }
    next();
}