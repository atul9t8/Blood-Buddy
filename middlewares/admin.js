module.exports = function(req, res, next){
    if(req.user.role !== "admin"){
        res.send("Forbidden!!!")
    }
    next();
}