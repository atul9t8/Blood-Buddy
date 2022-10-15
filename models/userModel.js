const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    mobile:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cPassword:{
        type: String
    },
    verified:{
        type: String,
        require: true,
        default: "0"
    }
}, {timestamps:true})

registrationSchema.methods.generateJWT = function(){
    const token = jwt.sign({_id: this._id, mobile: this.mobile}, process.env.KEY)
    return token;
}

const user = mongoose.model("User", registrationSchema)
module.exports = user;